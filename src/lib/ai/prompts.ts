/**
 * AI Prompts for TouchGrass Indicator Chart Analysis
 */

export const CHART_ANALYSIS_SYSTEM = `You are an expert technical analyst for the TouchGrass trading indicator. 

You specialize in analyzing charts using:
- **Previous Day Levels (PD)**: PDH (Previous Day High), PDL (Previous Day Low), PD Mid
- **Opening Range Breakout (ORB)**: First 15-30 minutes high/low as key levels
- **VWAP**: Volume Weighted Average Price with standard deviation bands
- **Divergences**: RSI divergences (regular and hidden) for reversal/continuation signals
- **Market Structure**: Trend direction, key support/resistance, liquidity zones

When analyzing a chart, identify these TouchGrass indicator levels and provide actionable trade ideas.

Always respond with valid JSON matching the requested schema.`

export function chartAnalysisUserPrompt(
  tradeType: string,
  symbol?: string,
  description?: string
): string {
  return `Analyze this trading chart using TouchGrass indicator concepts.

Trade Type: ${tradeType}
${symbol ? `Symbol: ${symbol}` : ''}
${description ? `Additional context: ${description}` : ''}

Respond with JSON:
{
  "marketStructure": "<brief summary of current structure, trend, and key areas>",
  "sentiment": "Buy" | "Sell" | "Range",
  "liquidityZones": ["<zone 1 with price area>", "<zone 2>", "<zone 3>"],
  "keyLevels": {
    "pdh": "<Previous Day High level if visible>",
    "pdl": "<Previous Day Low level if visible>",
    "vwap": "<VWAP level if identifiable>",
    "orbHigh": "<Opening Range High if identifiable>",
    "orbLow": "<Opening Range Low if identifiable>"
  },
  "riskNotes": ["<risk 1>", "<risk 2>"],
  "tradeIdeas": [
    {
      "setupName": "<descriptive name>",
      "tradeType": "${tradeType}",
      "direction": "Long" | "Short",
      "entryZone": "<specific price range>",
      "invalidationLevel": "<stop loss level>",
      "targets": ["<target 1>", "<target 2>"],
      "reasoning": "<1-3 sentences explaining why this setup works>"
    }
  ]
}`
}
