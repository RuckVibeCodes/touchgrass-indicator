/**
 * AI Types for TouchGrass Indicator
 */

/** Model selection */
export type AIModel = 'gpt-4o' | 'gpt-4o-mini'

/** Standard AI error */
export interface AIError {
  code: 'PARSE_ERROR' | 'API_ERROR' | 'VALIDATION_ERROR' | 'RATE_LIMIT' | 'TIMEOUT'
  message: string
  details?: string
}

/** Standard AI response wrapper */
export interface AIResponse<T> {
  success: boolean
  data?: T
  error?: AIError
  meta: {
    model: AIModel
    tokensUsed?: number
    latencyMs: number
    timestamp: string
  }
}

/** Trade idea from chart analysis */
export interface ChartTradeIdea {
  setupName: string
  tradeType: 'Scalp' | 'Day trade' | 'Swing trade'
  direction: 'Long' | 'Short'
  entryZone: string
  invalidationLevel: string
  targets: string[]
  reasoning: string
}

/** Full chart analysis output */
export interface ChartAnalysis {
  marketStructure: string
  sentiment: 'Buy' | 'Sell' | 'Range'
  liquidityZones: string[]
  keyLevels: {
    pdh?: string
    pdl?: string
    vwap?: string
    orbHigh?: string
    orbLow?: string
  }
  riskNotes: string[]
  tradeIdeas: ChartTradeIdea[]
  timestamp: string
}

/** Options for chart analysis */
export interface ChartAnalysisOptions {
  tradeType?: 'Scalp' | 'Day trade' | 'Swing trade'
  description?: string
  symbol?: string
  timeframe?: string
}
