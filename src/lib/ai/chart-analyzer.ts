/**
 * AI Chart Analysis for TouchGrass Indicator
 */

import { visionCompletion } from './client'
import { CHART_ANALYSIS_SYSTEM, chartAnalysisUserPrompt } from './prompts'
import type { ChartAnalysis, ChartAnalysisOptions, AIResponse } from './types'

/**
 * Analyze a trading chart image using AI vision.
 */
export async function analyzeChart(
  imageBase64: string,
  options: ChartAnalysisOptions = {}
): Promise<AIResponse<ChartAnalysis>> {
  const tradeType = options.tradeType ?? 'Day trade'

  const userPrompt = chartAnalysisUserPrompt(
    tradeType,
    options.symbol,
    options.description
  )

  const result = await visionCompletion<Omit<ChartAnalysis, 'timestamp'>>(
    CHART_ANALYSIS_SYSTEM,
    imageBase64,
    userPrompt,
    {
      temperature: 0.7,
      maxTokens: 1200,
    }
  )

  if (!result.success || !result.data) {
    return {
      success: false,
      error: result.error ?? { code: 'API_ERROR', message: 'Failed to analyze chart' },
      meta: result.meta,
    }
  }

  return {
    success: true,
    data: {
      ...result.data,
      timestamp: new Date().toISOString(),
    },
    meta: result.meta,
  }
}
