// Subscription tiers and feature gates for TouchGrass

export type TierType = 'free' | 'pro';

export interface TierLimits {
  // TouchGrass Indicator
  indicatorAccess: boolean;

  // AI Analysis (per day for free, unlimited for pro)
  dailyAnalyses: number | 'unlimited';

  // Daily Briefing
  dailyBriefingAccess: boolean;
  dailyBriefingTeaser: boolean; // Free users see teaser only

  // Degen Radar
  degenRadarAccess: boolean;
  smartMoneyAccess: boolean; // Pro-only smart money picks

  // Trade Journal
  journalAccess: boolean;
  journalEntries: number | 'unlimited';
  aiJournalInsights: boolean;

  // Video Analysis
  videoAnalysisAccess: boolean;
  videosPerMonth: number | 'unlimited';

  // Signal Dashboard
  signalDashboardAccess: boolean;
  telegramAlerts: boolean;
}

export const TIER_LIMITS: Record<TierType, TierLimits> = {
  free: {
    // Indicator: No access (Pro only)
    indicatorAccess: false,

    // AI Analysis: 1 per day
    dailyAnalyses: 1,

    // Daily Briefing: Teaser only
    dailyBriefingAccess: true,
    dailyBriefingTeaser: true,

    // Degen Radar: Full access (hook feature)
    degenRadarAccess: true,
    smartMoneyAccess: false,

    // Trade Journal: No access
    journalAccess: false,
    journalEntries: 0,
    aiJournalInsights: false,

    // Video Analysis: No access
    videoAnalysisAccess: false,
    videosPerMonth: 0,

    // Signal Dashboard: No access
    signalDashboardAccess: false,
    telegramAlerts: false,
  },
  pro: {
    // Indicator: Full access
    indicatorAccess: true,

    // AI Analysis: Unlimited
    dailyAnalyses: 'unlimited',

    // Daily Briefing: Full access
    dailyBriefingAccess: true,
    dailyBriefingTeaser: false,

    // Degen Radar: Full + Smart Money
    degenRadarAccess: true,
    smartMoneyAccess: true,

    // Trade Journal: Full access
    journalAccess: true,
    journalEntries: 'unlimited',
    aiJournalInsights: true,

    // Video Analysis: Full access
    videoAnalysisAccess: true,
    videosPerMonth: 'unlimited',

    // Signal Dashboard: Full access
    signalDashboardAccess: true,
    telegramAlerts: true,
  },
};

export const TIER_PRICING = {
  monthly: {
    price: 19,
    period: 'month',
    description: 'Pro Monthly',
    savings: null,
  },
  annual: {
    price: 149,
    period: 'year',
    description: 'Pro Annual',
    savings: '35%',
    monthlyEquivalent: 12.42,
  },
  lifetime: {
    price: 349,
    period: 'once',
    description: 'Pro Lifetime',
    savings: 'Forever',
  },
};

export const PRO_FEATURES = [
  'TouchGrass TradingView Indicator',
  'Unlimited AI Chart Analyses',
  'Full Daily Market Briefing',
  'Signal Dashboard + Equity Curve',
  'Trade Journal with AI Insights',
  'Video Analysis',
  'Smart Money Tracking',
  'Telegram Alerts',
];

export const FREE_FEATURES = [
  'AI Analysis Dashboard',
  '1 Chart Analysis per day',
  'Daily Briefing Preview',
  'Full Degen Radar Access',
  'Live Market Data',
];

// Helper functions
export function getTierLimits(tier: TierType): TierLimits {
  return TIER_LIMITS[tier];
}

export function canAccessFeature(tier: TierType, feature: keyof TierLimits): boolean {
  const limits = TIER_LIMITS[tier];
  const value = limits[feature];

  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'number') {
    return value > 0;
  }

  return value === 'unlimited';
}

export function hasReachedLimit(
  tier: TierType,
  feature: keyof TierLimits,
  currentUsage: number
): boolean {
  const limits = TIER_LIMITS[tier];
  const limit = limits[feature];

  if (limit === 'unlimited') {
    return false;
  }

  if (typeof limit === 'number') {
    return currentUsage >= limit;
  }

  return false;
}

export function getRemainingUsage(
  tier: TierType,
  feature: keyof TierLimits,
  currentUsage: number
): number | 'unlimited' {
  const limits = TIER_LIMITS[tier];
  const limit = limits[feature];

  if (limit === 'unlimited') {
    return 'unlimited';
  }

  if (typeof limit === 'number') {
    return Math.max(0, limit - currentUsage);
  }

  return 0;
}
