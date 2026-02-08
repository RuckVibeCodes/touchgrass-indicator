/**
 * Whop API Integration for TouchGrass
 * 
 * Environment variables required:
 * - WHOP_API_KEY: Your Whop API key
 * - WHOP_COMPANY_ID: Your Whop company ID
 * - WHOP_WEBHOOK_SECRET: Webhook signing secret
 * - NEXT_PUBLIC_WHOP_MONTHLY_LINK: Checkout link for monthly plan
 * - NEXT_PUBLIC_WHOP_ANNUAL_LINK: Checkout link for annual plan
 * - NEXT_PUBLIC_WHOP_LIFETIME_LINK: Checkout link for lifetime plan
 */

const WHOP_API_BASE = 'https://api.whop.com/api/v2';

export interface WhopUser {
  id: string;
  email: string;
  username?: string;
  profile_pic_url?: string;
}

export interface WhopMembership {
  id: string;
  user: WhopUser;
  product_id: string;
  status: 'active' | 'canceled' | 'expired' | 'past_due';
  created_at: string;
  renewal_period_start: string;
  renewal_period_end: string;
  plan_id: string;
  quantity: number;
  affiliate_page_id?: string; // Affiliate tracking
}

export interface WhopProduct {
  id: string;
  name: string;
  visibility: 'visible' | 'hidden' | 'archived';
  pricing: number;
  currency: string;
  billing_period?: 'monthly' | 'yearly' | 'lifetime';
}

export interface WhopAffiliate {
  id: string;
  user: WhopUser;
  page_id: string;
  total_earnings: number;
  pending_balance: number;
  referral_count: number;
  conversion_rate: number;
}

// Webhook event types
export type WhopWebhookEvent = 
  | 'membership.went_valid'
  | 'membership.went_invalid'
  | 'membership.created'
  | 'membership.updated'
  | 'payment.succeeded'
  | 'payment.failed';

export interface WhopWebhookPayload {
  event: WhopWebhookEvent;
  data: {
    membership?: WhopMembership;
    payment?: {
      id: string;
      amount: number;
      currency: string;
      membership_id: string;
    };
  };
  timestamp: string;
}

// API Client
class WhopClient {
  private apiKey: string;
  private companyId: string;

  constructor() {
    this.apiKey = process.env.WHOP_API_KEY || '';
    this.companyId = process.env.WHOP_COMPANY_ID || '';
  }

  private get headers() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  async getMembership(membershipId: string): Promise<WhopMembership | null> {
    try {
      const res = await fetch(`${WHOP_API_BASE}/memberships/${membershipId}`, {
        headers: this.headers,
      });
      if (!res.ok) return null;
      return res.json();
    } catch (error) {
      console.error('Whop getMembership error:', error);
      return null;
    }
  }

  async getUserMemberships(userId: string): Promise<WhopMembership[]> {
    try {
      const res = await fetch(
        `${WHOP_API_BASE}/memberships?user_id=${userId}&company_id=${this.companyId}`,
        { headers: this.headers }
      );
      if (!res.ok) return [];
      const data = await res.json();
      return data.data || [];
    } catch (error) {
      console.error('Whop getUserMemberships error:', error);
      return [];
    }
  }

  async checkAccess(userId: string): Promise<{ hasAccess: boolean; tier: 'free' | 'pro' }> {
    const memberships = await this.getUserMemberships(userId);
    const activeMembership = memberships.find(m => m.status === 'active');
    
    return {
      hasAccess: !!activeMembership,
      tier: activeMembership ? 'pro' : 'free',
    };
  }

  async getAffiliateStats(affiliatePageId: string): Promise<WhopAffiliate | null> {
    try {
      const res = await fetch(
        `${WHOP_API_BASE}/affiliate_pages/${affiliatePageId}`,
        { headers: this.headers }
      );
      if (!res.ok) return null;
      return res.json();
    } catch (error) {
      console.error('Whop getAffiliateStats error:', error);
      return null;
    }
  }

  async getProducts(): Promise<WhopProduct[]> {
    try {
      const res = await fetch(
        `${WHOP_API_BASE}/products?company_id=${this.companyId}`,
        { headers: this.headers }
      );
      if (!res.ok) return [];
      const data = await res.json();
      return data.data || [];
    } catch (error) {
      console.error('Whop getProducts error:', error);
      return [];
    }
  }
}

export const whop = new WhopClient();

// Webhook signature verification
export async function verifyWhopWebhook(
  payload: string,
  signature: string
): Promise<boolean> {
  const secret = process.env.WHOP_WEBHOOK_SECRET;
  if (!secret) return false;

  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const signatureBuffer = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(payload)
    );
    const computedSignature = Buffer.from(signatureBuffer).toString('hex');
    return computedSignature === signature;
  } catch (error) {
    console.error('Webhook verification error:', error);
    return false;
  }
}

// Checkout link generators
export function getCheckoutLink(
  plan: 'monthly' | 'annual' | 'lifetime',
  affiliateCode?: string
): string {
  const links = {
    monthly: process.env.NEXT_PUBLIC_WHOP_MONTHLY_LINK || '#',
    annual: process.env.NEXT_PUBLIC_WHOP_ANNUAL_LINK || '#',
    lifetime: process.env.NEXT_PUBLIC_WHOP_LIFETIME_LINK || '#',
  };

  let url = links[plan];
  
  // Append affiliate code if provided
  if (affiliateCode && url !== '#') {
    const separator = url.includes('?') ? '&' : '?';
    url = `${url}${separator}ref=${affiliateCode}`;
  }

  return url;
}

// Helper to determine plan type from product
export function getPlanType(productId: string): 'monthly' | 'annual' | 'lifetime' | null {
  // These will be set based on actual Whop product IDs
  const productMap: Record<string, 'monthly' | 'annual' | 'lifetime'> = {
    // Example: 'prod_xxxxx': 'monthly'
    // Will be configured based on actual Whop setup
  };

  return productMap[productId] || null;
}
