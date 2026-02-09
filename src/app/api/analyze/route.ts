import { NextRequest, NextResponse } from 'next/server';
import { openai, MODEL } from '@/lib/openai';
import type { ChartAnalysisRequest, ChartAnalysisResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: ChartAnalysisRequest = await request.json();
    const { image, imageUrl, symbol, timeframe } = body;

    if (!image && !imageUrl) {
      return NextResponse.json(
        { error: 'Either image (base64) or imageUrl is required' },
        { status: 400 }
      );
    }

    const imageContent = image
      ? { type: 'image_url' as const, image_url: { url: `data:image/png;base64,${image}` } }
      : { type: 'image_url' as const, image_url: { url: imageUrl! } };

    const systemPrompt = `You are an expert crypto/stock technical analyst. Analyze the provided chart image and return a JSON response with the following structure:
{
  "trend": "bullish" | "bearish" | "neutral" | "consolidating",
  "confidence": <number 0-100>,
  "keyLevels": {
    "support": [<prices>],
    "resistance": [<prices>]
  },
  "signals": ["<signal descriptions>"],
  "recommendation": "buy" | "sell" | "hold" | "wait",
  "reasoning": "<detailed explanation>"
}

Be specific about price levels, patterns, and indicators visible on the chart.`;

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: [
            { type: 'text', text: `Analyze this ${symbol || 'asset'} chart${timeframe ? ` on ${timeframe} timeframe` : ''}. Provide detailed technical analysis.` },
            imageContent,
          ],
        },
      ],
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    const analysis = JSON.parse(content);
    const result: ChartAnalysisResponse = {
      ...analysis,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Chart analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze chart', details: String(error) },
      { status: 500 }
    );
  }
}
