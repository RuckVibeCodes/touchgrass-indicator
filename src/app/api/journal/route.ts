import { NextRequest, NextResponse } from 'next/server';
import { openai, MODEL } from '@/lib/openai';
import { TradeEntry, JournalAnalysis } from '@/lib/types';
import { promises as fs } from 'fs';
import path from 'path';

const JOURNAL_FILE = path.join(process.cwd(), 'data', 'journal.json');

async function ensureJournalFile(): Promise<TradeEntry[]> {
  try {
    const data = await fs.readFile(JOURNAL_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    // File doesn't exist or is invalid, create empty array
    await fs.mkdir(path.dirname(JOURNAL_FILE), { recursive: true });
    await fs.writeFile(JOURNAL_FILE, '[]');
    return [];
  }
}

async function saveJournal(entries: TradeEntry[]): Promise<void> {
  await fs.mkdir(path.dirname(JOURNAL_FILE), { recursive: true });
  await fs.writeFile(JOURNAL_FILE, JSON.stringify(entries, null, 2));
}

// GET - Retrieve journal entries with optional AI analysis
export async function GET(request: NextRequest) {
  try {
    const entries = await ensureJournalFile();
    const searchParams = request.nextUrl.searchParams;
    const analyze = searchParams.get('analyze') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');
    const status = searchParams.get('status'); // 'open' | 'closed' | 'all'

    let filteredEntries = entries;
    if (status && status !== 'all') {
      filteredEntries = entries.filter(e => e.status === status);
    }

    // Sort by date descending and limit
    filteredEntries = filteredEntries
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);

    if (!analyze || entries.length < 3) {
      return NextResponse.json({ 
        entries: filteredEntries,
        total: entries.length 
      });
    }

    // AI Analysis of trading patterns
    const closedTrades = entries.filter(e => e.status === 'closed' && e.pnl !== undefined);
    
    if (closedTrades.length < 3) {
      return NextResponse.json({ 
        entries: filteredEntries,
        total: entries.length,
        analysis: null,
        message: 'Need at least 3 closed trades for analysis'
      });
    }

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { 
          role: 'system', 
          content: `You are a trading coach analyzing a trader's journal. Identify patterns, mistakes, and provide actionable suggestions.

Return ONLY valid JSON:
{
  "totalTrades": number,
  "winRate": number (percentage 0-100),
  "avgWin": number,
  "avgLoss": number,
  "patterns": ["Observed patterns in trading behavior"],
  "mistakes": ["Common mistakes identified"],
  "suggestions": ["Actionable improvement suggestions"]
}`
        },
        { 
          role: 'user', 
          content: `Analyze these trades:\n${JSON.stringify(closedTrades.slice(-20), null, 2)}\n\nReturn ONLY valid JSON.`
        }
      ],
      max_tokens: 1000,
      temperature: 0.5,
    });

    const content = response.choices[0]?.message?.content;
    let analysis: JournalAnalysis | null = null;
    
    if (content) {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      }
    }

    return NextResponse.json({ 
      entries: filteredEntries,
      total: entries.length,
      analysis 
    });
  } catch (error) {
    console.error('Journal GET error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to retrieve journal' },
      { status: 500 }
    );
  }
}

// POST - Log a new trade
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.symbol || !body.side || body.entryPrice === undefined) {
      return NextResponse.json(
        { error: 'symbol, side, and entryPrice are required' },
        { status: 400 }
      );
    }

    const entries = await ensureJournalFile();
    
    const newEntry: TradeEntry = {
      id: `trade_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      symbol: body.symbol.toUpperCase(),
      side: body.side,
      entryPrice: parseFloat(body.entryPrice),
      exitPrice: body.exitPrice ? parseFloat(body.exitPrice) : undefined,
      size: body.size ? parseFloat(body.size) : undefined,
      notes: body.notes || undefined,
      tags: body.tags || [],
      entryTime: body.entryTime || new Date().toISOString(),
      exitTime: body.exitTime || undefined,
      pnl: undefined,
      status: body.exitPrice ? 'closed' : 'open',
      createdAt: new Date().toISOString(),
    };

    // Calculate PnL if trade is closed
    if (newEntry.exitPrice && newEntry.entryPrice) {
      const diff = newEntry.exitPrice - newEntry.entryPrice;
      newEntry.pnl = newEntry.side === 'long' ? diff : -diff;
      if (newEntry.size) {
        newEntry.pnl *= newEntry.size;
      }
    }

    entries.push(newEntry);
    await saveJournal(entries);

    return NextResponse.json({ 
      success: true, 
      entry: newEntry 
    });
  } catch (error) {
    console.error('Journal POST error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to log trade' },
      { status: 500 }
    );
  }
}

// PATCH - Update a trade (e.g., close it)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { error: 'Trade id is required' },
        { status: 400 }
      );
    }

    const entries = await ensureJournalFile();
    const index = entries.findIndex(e => e.id === body.id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Trade not found' },
        { status: 404 }
      );
    }

    const entry = entries[index];
    
    // Update allowed fields
    if (body.exitPrice !== undefined) {
      entry.exitPrice = parseFloat(body.exitPrice);
      entry.exitTime = body.exitTime || new Date().toISOString();
      entry.status = 'closed';
      
      // Recalculate PnL
      const diff = entry.exitPrice - entry.entryPrice;
      entry.pnl = entry.side === 'long' ? diff : -diff;
      if (entry.size) {
        entry.pnl *= entry.size;
      }
    }
    if (body.notes !== undefined) entry.notes = body.notes;
    if (body.tags !== undefined) entry.tags = body.tags;

    entries[index] = entry;
    await saveJournal(entries);

    return NextResponse.json({ 
      success: true, 
      entry 
    });
  } catch (error) {
    console.error('Journal PATCH error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update trade' },
      { status: 500 }
    );
  }
}

// DELETE - Remove a trade
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Trade id is required as query parameter' },
        { status: 400 }
      );
    }

    const entries = await ensureJournalFile();
    const index = entries.findIndex(e => e.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Trade not found' },
        { status: 404 }
      );
    }

    const deleted = entries.splice(index, 1)[0];
    await saveJournal(entries);

    return NextResponse.json({ 
      success: true, 
      deleted 
    });
  } catch (error) {
    console.error('Journal DELETE error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete trade' },
      { status: 500 }
    );
  }
}
