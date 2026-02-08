'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  DollarSign,
  TrendingUp,
  Copy,
  Check,
  ExternalLink,
  Crown,
  Palette,
  Link2,
  BarChart3,
  CreditCard,
  Share2,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import {
  CREATOR_COMMISSION,
  generateReferralLink,
  formatCurrency,
  type Creator,
  type Referral,
} from '@/lib/affiliate';

// Mock data - will be replaced with Supabase queries
const mockCreator: Creator = {
  id: 'creator_1',
  userId: 'user_1',
  displayName: 'CryptoKing',
  slug: 'cryptoking',
  avatarUrl: undefined,
  bio: 'Crypto trader & educator. 5+ years experience.',
  socialLinks: {
    twitter: 'cryptoking',
    youtube: 'CryptoKingTV',
  },
  customization: {
    primaryColor: '#10b981',
    showTestimonial: true,
    testimonialText: 'TouchGrass helped me 10x my win rate!',
    highlightedFeatures: [
      'TouchGrass TradingView Indicator',
      'Unlimited AI Chart Analyses',
      'Signal Dashboard',
    ],
  },
  stats: {
    totalReferrals: 47,
    activeSubscribers: 32,
    totalEarnings: 1247.50,
    pendingPayout: 285.00,
    conversionRate: 12.4,
    monthlySubscribers: 18,
    annualSubscribers: 12,
    lifetimeSubscribers: 2,
  },
  payoutInfo: {
    method: 'paypal',
    email: 'king@crypto.com',
    minPayoutThreshold: 50,
    lastPayoutDate: new Date('2026-01-15'),
    lastPayoutAmount: 425.00,
  },
  createdAt: new Date('2025-11-01'),
  approvedAt: new Date('2025-11-02'),
  status: 'approved',
};

const mockReferrals: Referral[] = [
  {
    id: 'ref_1',
    creatorId: 'creator_1',
    referredUserId: 'user_a',
    referredEmail: 'jo***@gmail.com',
    plan: 'annual',
    status: 'active',
    signupDate: new Date('2026-02-05'),
    firstPaymentDate: new Date('2026-02-05'),
    commission: 74.50,
    commissionPaid: false,
  },
  {
    id: 'ref_2',
    creatorId: 'creator_1',
    referredUserId: 'user_b',
    referredEmail: 'tr***@yahoo.com',
    plan: 'monthly',
    status: 'active',
    signupDate: new Date('2026-02-03'),
    firstPaymentDate: new Date('2026-02-03'),
    commission: 9.50,
    commissionPaid: false,
  },
  {
    id: 'ref_3',
    creatorId: 'creator_1',
    referredUserId: 'user_c',
    referredEmail: 'mi***@proton.me',
    plan: 'lifetime',
    status: 'active',
    signupDate: new Date('2026-01-28'),
    firstPaymentDate: new Date('2026-01-28'),
    commission: 174.50,
    commissionPaid: true,
  },
  {
    id: 'ref_4',
    creatorId: 'creator_1',
    referredUserId: 'user_d',
    referredEmail: 'al***@gmail.com',
    plan: 'monthly',
    status: 'churned',
    signupDate: new Date('2026-01-15'),
    firstPaymentDate: new Date('2026-01-15'),
    commission: 9.50,
    commissionPaid: true,
  },
];

export default function CreatorDashboard() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'referrals' | 'customize' | 'payouts'>('overview');
  
  const creator = mockCreator;
  const referrals = mockReferrals;
  const referralLink = generateReferralLink(creator.slug);

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-gray-400 hover:text-white">
                ← Back to App
              </Link>
              <div className="h-6 w-px bg-gray-700" />
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <h1 className="text-xl font-bold">Creator Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Active Creator
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Referral Link Card */}
        <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-1">Your Referral Link</h2>
              <p className="text-gray-400 text-sm">Share this link to earn 50% commission on every sale</p>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 bg-gray-900 rounded-lg px-4 py-3 font-mono text-sm truncate">
                {referralLink}
              </div>
              <button
                onClick={copyLink}
                className="flex items-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-medium transition-colors whitespace-nowrap"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Users}
            label="Total Referrals"
            value={creator.stats.totalReferrals.toString()}
            subtext={`${creator.stats.activeSubscribers} active`}
            trend="+5 this month"
            trendUp
          />
          <StatCard
            icon={DollarSign}
            label="Total Earnings"
            value={formatCurrency(creator.stats.totalEarnings)}
            subtext="Lifetime"
            trend="+$285 pending"
            trendUp
          />
          <StatCard
            icon={TrendingUp}
            label="Conversion Rate"
            value={`${creator.stats.conversionRate}%`}
            subtext="Click to signup"
            trend="Above avg"
            trendUp
          />
          <StatCard
            icon={CreditCard}
            label="Pending Payout"
            value={formatCurrency(creator.stats.pendingPayout)}
            subtext="Next payout: Feb 15"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-gray-900 rounded-xl mb-6 w-fit">
          {(['overview', 'referrals', 'customize', 'payouts'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Commission Breakdown */}
            <div className="lg:col-span-2 bg-gray-900 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Commission Structure</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <CommissionCard
                  plan="Monthly"
                  price={CREATOR_COMMISSION.monthly.price}
                  commission={CREATOR_COMMISSION.monthly.creatorShare}
                  subscribers={creator.stats.monthlySubscribers}
                />
                <CommissionCard
                  plan="Annual"
                  price={CREATOR_COMMISSION.annual.price}
                  commission={CREATOR_COMMISSION.annual.creatorShare}
                  subscribers={creator.stats.annualSubscribers}
                  highlight
                />
                <CommissionCard
                  plan="Lifetime"
                  price={CREATOR_COMMISSION.lifetime.price}
                  commission={CREATOR_COMMISSION.lifetime.creatorShare}
                  subscribers={creator.stats.lifetimeSubscribers}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <QuickAction
                  icon={Share2}
                  label="Share on Twitter"
                  onClick={() => {
                    const text = encodeURIComponent(`Level up your crypto trading with TouchGrass! 🌿📈\n\nAI-powered chart analysis, signals, and more.\n\n${referralLink}`);
                    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
                  }}
                />
                <QuickAction
                  icon={Link2}
                  label="Get Promo Assets"
                  href="/creator/assets"
                />
                <QuickAction
                  icon={BarChart3}
                  label="View Analytics"
                  onClick={() => setActiveTab('referrals')}
                />
                <QuickAction
                  icon={Palette}
                  label="Customize Landing"
                  onClick={() => setActiveTab('customize')}
                />
              </div>
            </div>

            {/* Recent Referrals */}
            <div className="lg:col-span-3 bg-gray-900 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Referrals</h3>
                <button
                  onClick={() => setActiveTab('referrals')}
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-1"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <ReferralTable referrals={referrals.slice(0, 3)} />
            </div>
          </div>
        )}

        {activeTab === 'referrals' && (
          <div className="bg-gray-900 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">All Referrals</h3>
            <ReferralTable referrals={referrals} showPagination />
          </div>
        )}

        {activeTab === 'customize' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Branding */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Branding</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Primary Color</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={creator.customization.primaryColor}
                      className="w-12 h-12 rounded-lg cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={creator.customization.primaryColor}
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Tagline</label>
                  <input
                    type="text"
                    placeholder="e.g., Trade smarter with AI"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Logo URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Your Testimonial</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={creator.customization.showTestimonial}
                    className="w-5 h-5 rounded bg-gray-800 border-gray-700"
                  />
                  <span className="text-sm">Show testimonial on landing page</span>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Testimonial Text</label>
                  <textarea
                    placeholder="Share your experience with TouchGrass..."
                    rows={3}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm"
                    defaultValue={creator.customization.testimonialText}
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="lg:col-span-2 bg-gray-900 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Landing Page Preview</h3>
                <a
                  href={referralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-1"
                >
                  Open Live <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <div className="aspect-video bg-gray-800 rounded-xl flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Preview coming soon</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex justify-end">
              <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-medium transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'payouts' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Payout Settings */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Payout Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Payout Method</label>
                  <select className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm">
                    <option value="paypal">PayPal</option>
                    <option value="stripe">Bank Transfer (Stripe)</option>
                    <option value="crypto">Crypto (USDC)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">PayPal Email</label>
                  <input
                    type="email"
                    value={creator.payoutInfo.email}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Minimum Payout</label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">$</span>
                    <input
                      type="number"
                      value={creator.payoutInfo.minPayoutThreshold}
                      className="w-24 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm"
                    />
                  </div>
                </div>
                <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-medium transition-colors">
                  Save Settings
                </button>
              </div>
            </div>

            {/* Payout History */}
            <div className="bg-gray-900 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Payout History</h3>
              <div className="space-y-3">
                <PayoutRow
                  date="Jan 15, 2026"
                  amount={425.00}
                  method="PayPal"
                  status="completed"
                />
                <PayoutRow
                  date="Dec 15, 2025"
                  amount={312.50}
                  method="PayPal"
                  status="completed"
                />
                <PayoutRow
                  date="Nov 15, 2025"
                  amount={187.00}
                  method="PayPal"
                  status="completed"
                />
              </div>
            </div>

            {/* Pending */}
            <div className="lg:col-span-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Pending Payout</h3>
                  <p className="text-gray-400 text-sm">
                    Payouts are processed on the 15th of each month
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-yellow-400">
                    {formatCurrency(creator.stats.pendingPayout)}
                  </p>
                  <p className="text-sm text-gray-400">Next: Feb 15, 2026</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Sub-components
function StatCard({
  icon: Icon,
  label,
  value,
  subtext,
  trend,
  trendUp,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  subtext: string;
  trend?: string;
  trendUp?: boolean;
}) {
  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <div className="flex items-center gap-2 text-gray-400 mb-2">
        <Icon className="w-4 h-4" />
        <span className="text-sm">{label}</span>
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-500">{subtext}</span>
        {trend && (
          <span className={trendUp ? 'text-emerald-400' : 'text-gray-500'}>
            {trendUp && <ArrowUpRight className="w-3 h-3 inline" />}
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

function CommissionCard({
  plan,
  price,
  commission,
  subscribers,
  highlight,
}: {
  plan: string;
  price: number;
  commission: number;
  subscribers: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 ${
        highlight
          ? 'bg-emerald-500/20 border border-emerald-500/30'
          : 'bg-gray-800'
      }`}
    >
      <p className="text-sm text-gray-400 mb-1">{plan}</p>
      <p className="text-xl font-bold mb-2">${price}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-emerald-400">You earn: ${commission}</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">{subscribers} subscribers</p>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  label,
  href,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  href?: string;
  onClick?: () => void;
}) {
  const className =
    'flex items-center gap-3 w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-left';

  if (href) {
    return (
      <Link href={href} className={className}>
        <Icon className="w-5 h-5 text-gray-400" />
        <span>{label}</span>
        <ChevronRight className="w-4 h-4 text-gray-500 ml-auto" />
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      <Icon className="w-5 h-5 text-gray-400" />
      <span>{label}</span>
      <ChevronRight className="w-4 h-4 text-gray-500 ml-auto" />
    </button>
  );
}

function ReferralTable({
  referrals,
  showPagination,
}: {
  referrals: Referral[];
  showPagination?: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
            <th className="pb-3 font-medium">User</th>
            <th className="pb-3 font-medium">Plan</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Signup</th>
            <th className="pb-3 font-medium text-right">Commission</th>
          </tr>
        </thead>
        <tbody>
          {referrals.map((ref) => (
            <tr key={ref.id} className="border-b border-gray-800/50">
              <td className="py-3 text-sm">{ref.referredEmail}</td>
              <td className="py-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    ref.plan === 'lifetime'
                      ? 'bg-purple-500/20 text-purple-400'
                      : ref.plan === 'annual'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {ref.plan}
                </span>
              </td>
              <td className="py-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    ref.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : ref.status === 'churned'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {ref.status}
                </span>
              </td>
              <td className="py-3 text-sm text-gray-400">
                {ref.signupDate.toLocaleDateString()}
              </td>
              <td className="py-3 text-right">
                <span className={ref.commissionPaid ? 'text-gray-500' : 'text-emerald-400'}>
                  {formatCurrency(ref.commission)}
                </span>
                {ref.commissionPaid && (
                  <span className="text-xs text-gray-500 ml-1">(paid)</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showPagination && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
          <p className="text-sm text-gray-400">Showing {referrals.length} referrals</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-gray-800 rounded text-sm disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 bg-gray-800 rounded text-sm disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PayoutRow({
  date,
  amount,
  method,
  status,
}: {
  date: string;
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'failed';
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
      <div>
        <p className="text-sm font-medium">{date}</p>
        <p className="text-xs text-gray-400">{method}</p>
      </div>
      <div className="text-right">
        <p className="font-medium">{formatCurrency(amount)}</p>
        <p
          className={`text-xs ${
            status === 'completed'
              ? 'text-green-400'
              : status === 'failed'
              ? 'text-red-400'
              : 'text-yellow-400'
          }`}
        >
          {status}
        </p>
      </div>
    </div>
  );
}
