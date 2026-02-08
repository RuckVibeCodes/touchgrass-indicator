// Core types for TouchGrass

export type DegenChain = 'ethereum' | 'solana' | 'base' | 'arbitrum' | 'bsc' | 'avalanche' | 'polygon';
export type DegenSource = 'dexscreener' | 'pumpfun' | 'coingecko';
export type DegenScoreLabel = 'SAFE' | 'MODERATE' | 'RISKY' | 'DEGEN' | 'EXTREME';

// Rug Risk Profile
export interface RugRiskProfile {
  score: number; // 0-100
  level: 'low' | 'medium' | 'high' | 'extreme';
  factors: {
    lpLocked: boolean;
    contractVerified: boolean;
    liquidityDepth: 'deep' | 'moderate' | 'shallow';
    ownershipRenounced: boolean;
    honeypotRisk: boolean;
  };
}

// Entry Zone Analysis
export interface EntryAnalysis {
  zone: 'extended' | 'rotation' | 'deep';
  distanceFromAth: number; // percentage
  momentum1h: number;
  isTrending: boolean;
  socialPresence: boolean;
}

// Exit Radar (Pro-only)
export interface ExitAnalysis {
  urgency: 'early' | 'maturing' | 'distribution';
  profitZone: '2x' | '3x' | '5x' | '10x' | null;
  volumeDivergence: boolean;
  distributionDetected: boolean;
}

// Degen Token
export interface DegenToken {
  // Identity
  id: string;
  address: string;
  symbol: string;
  name: string;
  chain: DegenChain;
  logoUrl: string | null;
  // Price & Movement
  priceUsd: number;
  change1h: number | null;
  change4h: number | null;
  change24h: number | null;
  // Liquidity & Volume
  liquidityUsd: number;
  volume24h: number;
  marketCapUsd: number | null;
  // Age & Metadata
  createdAt: string | null;
  ageHours: number | null;
  pairAddress: string | null;
  dexUrl: string | null;
  // Source & Freshness
  source: DegenSource;
  fetchedAt: string;
  // Pump.fun specific
  bondingProgress: number | null;
  isPumpfun: boolean;
  // Computed scores
  degenScore: number;
  degenLabel: DegenScoreLabel;
  riskHints: string[];
  momentumBias: string | null;
  // 3 Pillars
  rugRisk: RugRiskProfile;
  entry: EntryAnalysis;
  exit: ExitAnalysis | null;
}

// Degen Radar Snapshot
export interface DegenRadarSnapshot {
  trending: DegenToken[];
  newLaunches: DegenToken[];
  lastUpdated: string;
  sources: DegenSource[];
  errors: string[];
}

// Signal Types
export interface Signal {
  id: string;
  symbol: string;
  timeframe: string;
  direction: 'long' | 'short';
  entry_price: number;
  stop_loss: number;
  targets: number[];
  confluence_score: number;
  confluence_details: Record<string, boolean>;
  risk_reward_ratio: number;
  risk_percent: number;
  reason: string;
  status: 'open' | 'closed';
  created_at: string;
  outcome_status?: 'win' | 'loss' | 'breakeven' | 'partial';
  pnl_percent?: number;
  r_multiple?: number;
}

// Equity Curve Point
export interface EquityPoint {
  date: string;
  tradeNumber: number;
  r: number;
  cumulativeR: number;
  outcome: 'win' | 'loss' | 'breakeven';
}

// Signal Stats
export interface SignalStats {
  totalSignals: number;
  wins: number;
  losses: number;
  breakevens: number;
  winRate: number;
  averageRMultiple: number;
  profitFactor: number;
  maxDrawdown?: number;
  maxLossStreak?: number;
  currentStreak?: { type: 'win' | 'loss' | 'none'; count: number };
  last30Days: {
    signals: number;
    winRate: number;
  };
  equityCurve?: EquityPoint[];
}

// Journal Trade
export interface JournalTrade {
  id: string;
  user_id: string;
  symbol: string;
  direction: 'long' | 'short';
  entry_price: number;
  exit_price: number | null;
  stop_loss: number | null;
  take_profits: number[];
  position_size: number | null;
  leverage: number | null;
  pnl: number | null;
  r_multiple: number | null;
  tags: string[];
  notes: string | null;
  emotions: string[];
  image_url: string | null;
  created_at: string;
  closed_at: string | null;
}
