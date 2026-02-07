/**
 * API Route: AI Chart Analysis
 * POST /api/analyze
 */

import { NextRequest, NextResponse } from 'next/server'
import { analyzeChart } from '@/lib/ai/chart-analyzer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { image, tradeType, symbol, description } = body

    if (!image) {
      return NextResponse.json(
        { error: 'Chart image is required' },
        { status: 400 }
      )
    }

    const result = await analyzeChart(image, {
      tradeType: tradeType ?? 'Day trade',
      symbol,
      description,
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error?.message ?? 'Failed to analyze chart' },
        { status: 500 }
      )
    }

    return NextResponse.json(result.data)
  } catch (error) {
    console.error('Chart analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze chart. Please try again.' },
      { status: 500 }
    )
  }
}
