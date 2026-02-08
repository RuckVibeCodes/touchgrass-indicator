// Affiliate/Creator system types and utilities

export interface Creator {
  id: string;
  userId: string;
  displayName: string;
  slug: string; // Custom referral slug (e.g., "cryptoking" -> touchgrass.app/ref/cryptoking)
  avatarUrl?: string;
  bio?: string;
  socialLinks: {
    twitter?: string;
    youtube?: string;
    discord?: string;
    telegram?: string;
  };
  customization: CreatorCustomization;
  stats: CreatorStats;
  payoutInfo: PayoutInfo;
  createdAt: Date;
  approvedAt?: Date;
  status: 'pending' | 'approved' | 'suspended';
}

export interface CreatorCustomization {
  // Branding
  primaryColor: string;
  logoUrl?: string;
  bannerUrl?: string;
  tagline?: string;
  
  // Landing page customization
  showTestimonial: boolean;
  testimonialText?: string;
  testimonialImage?: string;
  
  // Feature emphasis
  highlightedFeatures: string[];
}

export interface CreatorStats {
  totalReferrals: number;
  activeSubscribers: number;
  totalEarnings: number;
  pendingPayout: number;
  conversionRate: number;
  
  // Breakdown by plan
  monthlySubscribers: number;
  annualSubscribers: number;
  lifetimeSubscribers: number;
}

export interface PayoutInfo {
  method: 'paypal' | 'stripe' | 'crypto';
  email?: string;
  walletAddress?: string;
  minPayoutThreshold: number;
  lastPayoutDate?: Date;
  lastPayoutAmount?: number;
}

export interface Referral {
  id: string;
  creatorId: string;
  referredUserId: string;
  referredEmail?: string; // Masked for privacy
  plan: 'monthly' | 'annual' | 'lifetime';
  status: 'pending' | 'active' | 'churned' | 'refunded';
  signupDate: Date;
  firstPaymentDate?: Date;
  commission: number;
  commissionPaid: boolean;
}

// Revenue split configuration (via Whop)
export const CREATOR_COMMISSION = {
  monthly: {
    price: 19,
    creatorShare: 9.50,  // 50%
    platformShare: 9.50,
  },
  annual: {
    price: 149,
    creatorShare: 74.50,  // 50%
    platformShare: 74.50,
  },
  lifetime: {
    price: 349,
    creatorShare: 174.50,  // 50%
    platformShare: 174.50,
  },
};

// Default customization
export const DEFAULT_CUSTOMIZATION: CreatorCustomization = {
  primaryColor: '#10b981', // emerald-500
  showTestimonial: false,
  highlightedFeatures: [
    'TouchGrass TradingView Indicator',
    'Unlimited AI Chart Analyses',
    'Signal Dashboard',
  ],
};

// Helper functions
export function generateReferralLink(slug: string): string {
  return `https://touchgrass.app/ref/${slug}`;
}

export function calculateEarnings(referrals: Referral[]): number {
  return referrals
    .filter(r => r.status === 'active' && !r.commissionPaid)
    .reduce((sum, r) => sum + r.commission, 0);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  const maskedLocal = local.slice(0, 2) + '***';
  return `${maskedLocal}@${domain}`;
}
