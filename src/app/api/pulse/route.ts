import { NextResponse } from 'next/server';
import { openai, MODEL } from '@/lib/openai';
import type { PulseResponse } from '@/lib/types';

export async function GET() {
  try {
    const systemPrompt = `You are a crypto market sentiment analyzer. Assess the current market mood.

Return JSON with this structure:
{
  "fearGreedIndex": <number 0-100, where 0 is extreme fear, 100 is extreme greed>,
  "sentiment": "extreme_fear" | "fear" | "neutral" | "greed" | "extreme_greed",
  "trending": ["<trending topic 1>", "<trending topic 2>", "<trending topic 3>"],
  "marketMood": "<2-3 sentence description of current market psychology>"
}

Base this on typical crypto market conditions and sentiment indicators.`;

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'What is the current crypto market sentiment and mood?' },
      ],
      max_tokens: 400,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    const pulse = JSON.parse(content);
    const result: PulseResponse = {
      ...pulse,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Pulse error:', error);
    return NextResponse.json(
      { error: 'Failed to get market pulse', details: String(error) },
      { status: 500 }
    );
  }
}
