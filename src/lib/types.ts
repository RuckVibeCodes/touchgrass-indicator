// Chart Analysis Types
export interface ChartAnalysisRequest {
  image?: string; // base64 encoded image
  imageUrl?: string; // URL to image
  symbol?: string;
  timeframe?: string;
}

export interface ChartAnalysisResponse {
  trend: 'bullish' | 'bearish' | 'neutral' | 'consolidating';
  confidence: number; // 0-100
  keyLevels: {
    support: number[];
    resistance: number[];
  };
  signals: string[];
  recommendation: 'buy' | 'sell' | 'hold' | 'wait';
  reasoning: string;
  timestamp: string;
}

// Daily Briefing Types
export interface BriefingResponse {
  date: string;
  marketOverview: string;
  assets: {
    symbol: string;
    price?: string;
    change24h?: string;
    outlook: string;
  }[];
  sentiment: 'bullish' | 'bearish' | 'neutral';
  keyEvents: string[];
  recommendation: string;
  generatedAt: string;
}

// Pulse Types
export interface PulseResponse {
  fearGreedIndex: number; // 0-100
  sentiment: 'extreme_fear' | 'fear' | 'neutral' | 'greed' | 'extreme_greed';
  trending: string[];
  marketMood: string;
  timestamp: string;
}

// Trade Journal Types
export interface TradeEntry {
  id: string;
  symbol: string;
  side: 'long' | 'short';
  entryPrice: number;
  exitPrice?: number;
  size?: number;
  notes?: string;
  tags?: string[];
  entryTime: string;
  exitTime?: string;
  pnl?: number;
  status: 'open' | 'closed';
  createdAt: string;
}

export interface JournalAnalysis {
  totalTrades: number;
  winRate: number;
  avgWin: number;
  avgLoss: number;
  patterns: string[];
  mistakes: string[];
  suggestions: string[];
}

// TradingView Webhook Types
export interface TradingViewSignal {
  strategy?: string;
  symbol: string;
  action: 'buy' | 'sell' | 'close';
  price?: number;
  time?: string;
  message?: string;
  [key: string]: unknown;
}
