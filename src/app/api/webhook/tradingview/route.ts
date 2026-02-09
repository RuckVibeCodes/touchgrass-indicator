import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { TradingViewSignal } from '@/lib/types';

const SIGNALS_FILE = path.join(process.cwd(), 'data', 'signals.json');

interface StoredSignal extends TradingViewSignal {
  id: string;
  receivedAt: string;
}

async function getSignals(): Promise<StoredSignal[]> {
  try {
    const data = await fs.readFile(SIGNALS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSignals(signals: StoredSignal[]): Promise<void> {
  await fs.mkdir(path.dirname(SIGNALS_FILE), { recursive: true });
  // Keep only last 100 signals
  const trimmed = signals.slice(-100);
  await fs.writeFile(SIGNALS_FILE, JSON.stringify(trimmed, null, 2));
}

// POST - Receive TradingView webhook
export async function POST(request: NextRequest) {
  try {
    // TradingView can send either JSON or plain text
    const contentType = request.headers.get('content-type') || '';
    let signal: TradingViewSignal;

    if (contentType.includes('application/json')) {
      signal = await request.json();
    } else {
      // Parse plain text format: SYMBOL|ACTION|PRICE|MESSAGE
      const text = await request.text();
      const parts = text.split('|').map(p => p.trim());
      signal = {
        symbol: parts[0] || 'UNKNOWN',
        action: (parts[1]?.toLowerCase() as 'buy' | 'sell' | 'close') || 'buy',
        price: parts[2] ? parseFloat(parts[2]) : undefined,
        message: parts[3] || text,
      };
    }

    const storedSignal: StoredSignal = {
      id: `sig_${Date.now()}`,
      ...signal,
      receivedAt: new Date().toISOString(),
    };

    // Store signal
    const signals = await getSignals();
    signals.push(storedSignal);
    await saveSignals(signals);

    // Log for monitoring
    console.log('📡 TradingView Signal:', JSON.stringify(storedSignal));

    // TODO: Forward to Telegram/Discord if configured
    // await forwardToTelegram(storedSignal);

    return NextResponse.json({
      success: true,
      signalId: storedSignal.id,
      received: storedSignal,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook', details: String(error) },
      { status: 500 }
    );
  }
}

// GET - Retrieve recent signals
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const symbol = searchParams.get('symbol');

    let signals = await getSignals();

    if (symbol) {
      signals = signals.filter(s => s.symbol.toUpperCase() === symbol.toUpperCase());
    }

    // Return most recent first
    signals = signals.reverse().slice(0, limit);

    return NextResponse.json({ signals, count: signals.length });
  } catch (error) {
    console.error('Signals GET error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve signals', details: String(error) },
      { status: 500 }
    );
  }
}
