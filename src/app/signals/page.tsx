'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { Radio, Lock, Crown, TrendingUp, Target, Activity, Award, Bell } from 'lucide-react';

// Demo stats for the track record
const DEMO_STATS = {
  totalSignals: 47,
  wins: 32,
  losses: 12,
  breakevens: 3,
  winRate: 68.1,
  averageRMultiple: 1.24,
  profitFactor: 2.35,
  currentStreak: { type: 'win', count: 3 },
};

// Demo equity curve data points
const EQUITY_POINTS = [
  { x: 1, y: 0 }, { x: 5, y: 2 }, { x: 10, y: 1 }, { x: 15, y: 4 },
  { x: 20, y: 3 }, { x: 25, y: 6 }, { x: 30, y: 8 }, { x: 35, y: 7 },
  { x: 40, y: 10 }, { x: 47, y: 12 },
];

function HighlightCard({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: 'green' | 'yellow' | 'blue' }) {
  const colorClasses = {
    green: 'text-green-400 bg-green-400/10 border-green-400/30',
    yellow: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    blue: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  };

  return (
    <div className={`rounded-xl border p-4 ${colorClasses[color]}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default function SignalsPage() {
  const userTier = 'free' as 'free' | 'pro'; // TODO: Get from auth
  const hasAccess = userTier === 'pro';

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Radio className="w-6 h-6 text-green-400" />
              Signal Track Record
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              1H BTC signals with confluence detection
            </p>
          </div>
        </div>

        {/* Equity Curve Preview - visible to everyone */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Equity Curve (Cumulative R)</h2>
          <div className="h-48 flex items-end justify-between gap-1 px-4">
            {EQUITY_POINTS.map((point, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-green-500 to-emerald-400 rounded-t w-full"
                style={{ height: `${(point.y / 12) * 100}%`, minHeight: '4px' }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2 px-4">
            <span>Trade 1</span>
            <span>Trade {DEMO_STATS.totalSignals}</span>
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">
            +12R total return across {DEMO_STATS.totalSignals} signals
          </p>
        </div>

        {/* Performance Stats - visible to everyone */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <HighlightCard
            label="Win Rate"
            value={`${DEMO_STATS.winRate.toFixed(1)}%`}
            icon={<Target className="w-5 h-5" />}
            color="green"
          />
          <HighlightCard
            label="Profit Factor"
            value={DEMO_STATS.profitFactor.toFixed(2)}
            icon={<Activity className="w-5 h-5" />}
            color="green"
          />
          <HighlightCard
            label="Avg R/Trade"
            value={`+${DEMO_STATS.averageRMultiple.toFixed(2)}R`}
            icon={<Award className="w-5 h-5" />}
            color="yellow"
          />
          <HighlightCard
            label="Total Signals"
            value={DEMO_STATS.totalSignals.toString()}
            icon={<Radio className="w-5 h-5" />}
            color="blue"
          />
        </div>

        {/* Upgrade CTA for free users */}
        {!hasAccess && (
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700 mb-4">
              <Lock className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Unlock Live Signals</h2>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              See the track record above? Get access to the actual trade signals as they happen.
              Entry, stop loss, and targets delivered in real-time.
            </p>

            <div className="bg-gray-700/50 rounded-lg p-4 max-w-sm mx-auto mb-6">
              <h3 className="font-semibold text-white mb-3 flex items-center justify-center gap-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                Pro Access Includes:
              </h3>
              <ul className="text-left text-sm text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  Live BTC signals with entry/stop/targets
                </li>
                <li className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue-400" />
                  Instant Telegram alerts
                </li>
                <li className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-purple-400" />
                  Full signal history & outcomes
                </li>
              </ul>
            </div>

            <Link
              href="/#pricing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
            >
              <Crown className="w-5 h-5" />
              Upgrade to Pro
            </Link>
          </div>
        )}

        {/* Pro users would see actual signals here */}
        {hasAccess && (
          <div className="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700">
            <Radio className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Waiting for signals...</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Signals are generated when BTC shows confluence on the 1H timeframe.
              Check back soon or enable Telegram notifications.
            </p>
          </div>
        )}

        {/* Telegram CTA */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-blue-400" />
            <div>
              <p className="text-white font-medium">Get instant Telegram alerts</p>
              <p className="text-sm text-gray-400">Never miss a trade signal</p>
            </div>
          </div>
          <a
            href="#"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Coming Soon
          </a>
        </div>
      </main>
    </div>
  );
}
