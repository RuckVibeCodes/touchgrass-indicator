import { NextResponse } from 'next/server';
import { openai, MODEL } from '@/lib/openai';
import type { BriefingResponse } from '@/lib/types';

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0];

    const systemPrompt = `You are a crypto market analyst. Generate a morning market briefing for ${today}.

Return JSON with this structure:
{
  "date": "${today}",
  "marketOverview": "<2-3 sentence market summary>",
  "assets": [
    { "symbol": "BTC", "outlook": "<brief outlook>" },
    { "symbol": "ETH", "outlook": "<brief outlook>" },
    { "symbol": "SOL", "outlook": "<brief outlook>" }
  ],
  "sentiment": "bullish" | "bearish" | "neutral",
  "keyEvents": ["<event 1>", "<event 2>"],
  "recommendation": "<overall trading recommendation for the day>"
}

Be concise but insightful. Focus on actionable information.`;

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'Generate today\'s crypto market briefing.' },
      ],
      max_tokens: 800,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    const briefing = JSON.parse(content);
    const result: BriefingResponse = {
      ...briefing,
      generatedAt: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Briefing error:', error);
    return NextResponse.json(
      { error: 'Failed to generate briefing', details: String(error) },
      { status: 500 }
    );
  }
}
