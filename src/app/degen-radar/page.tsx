'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import DegenCard from '@/components/degen-radar/DegenCard';
import { DegenToken } from '@/lib/types';
import { Radar, AlertTriangle, Zap, HelpCircle, RefreshCw, Flame, Rocket } from 'lucide-react';

// Demo data - will be replaced with API fetch
const DEMO_TRENDING: DegenToken[] = [
  {
    id: '1',
    address: '0x123...',
    symbol: 'PEPE',
    name: 'Pepe Coin',
    chain: 'ethereum',
    logoUrl: null,
    priceUsd: 0.0000089,
    change1h: 12.5,
    change4h: 25.3,
    change24h: 45.2,
    liquidityUsd: 2500000,
    volume24h: 8500000,
    marketCapUsd: 3500000000,
    createdAt: null,
    ageHours: null,
    pairAddress: null,
    dexUrl: 'https://dexscreener.com/ethereum/pepe',
    source: 'dexscreener',
    fetchedAt: new Date().toISOString(),
    bondingProgress: null,
    isPumpfun: false,
    degenScore: 55,
    degenLabel: 'MODERATE',
    riskHints: ['High volume'],
    momentumBias: 'Strong bullish momentum',
    rugRisk: {
      score: 25,
      level: 'low',
      factors: { lpLocked: true, contractVerified: true, liquidityDepth: 'deep', ownershipRenounced: true, honeypotRisk: false },
    },
    entry: { zone: 'rotation', distanceFromAth: 35, momentum1h: 12, isTrending: true, socialPresence: true },
    exit: null,
  },
  {
    id: '2',
    address: 'pump123...',
    symbol: 'WOJAK',
    name: 'Wojak Token',
    chain: 'solana',
    logoUrl: null,
    priceUsd: 0.00234,
    change1h: -5.2,
    change4h: 15.8,
    change24h: 120.5,
    liquidityUsd: 450000,
    volume24h: 1200000,
    marketCapUsd: null,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    ageHours: 6,
    pairAddress: null,
    dexUrl: 'https://pump.fun/wojak',
    source: 'pumpfun',
    fetchedAt: new Date().toISOString(),
    bondingProgress: 72,
    isPumpfun: true,
    degenScore: 75,
    degenLabel: 'DEGEN',
    riskHints: ['New launch', 'High volatility'],
    momentumBias: 'Cooling after pump',
    rugRisk: {
      score: 45,
      level: 'medium',
      factors: { lpLocked: false, contractVerified: false, liquidityDepth: 'moderate', ownershipRenounced: false, honeypotRisk: false },
    },
    entry: { zone: 'extended', distanceFromAth: 8, momentum1h: -5, isTrending: true, socialPresence: true },
    exit: null,
  },
];

const DEMO_NEW_LAUNCHES: DegenToken[] = [
  {
    id: '3',
    address: 'new123...',
    symbol: 'FRESH',
    name: 'Fresh Launch',
    chain: 'base',
    logoUrl: null,
    priceUsd: 0.000012,
    change1h: 250,
    change4h: null,
    change24h: null,
    liquidityUsd: 85000,
    volume24h: 320000,
    marketCapUsd: null,
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    ageHours: 0.75,
    pairAddress: null,
    dexUrl: 'https://dexscreener.com/base/fresh',
    source: 'dexscreener',
    fetchedAt: new Date().toISOString(),
    bondingProgress: null,
    isPumpfun: false,
    degenScore: 85,
    degenLabel: 'EXTREME',
    riskHints: ['Very new', 'Low liquidity'],
    momentumBias: 'Launch momentum',
    rugRisk: {
      score: 65,
      level: 'high',
      factors: { lpLocked: false, contractVerified: false, liquidityDepth: 'shallow', ownershipRenounced: false, honeypotRisk: false },
    },
    entry: { zone: 'extended', distanceFromAth: 5, momentum1h: 250, isTrending: false, socialPresence: false },
    exit: null,
  },
];

export default function DegenRadarPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const userTier = 'free' as 'free' | 'pro'; // TODO: Get from auth

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
            <Radar className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            Degen Radar
          </h1>
          <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
            Early plays, meme momentum, breakouts
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mb-4 sm:mb-6 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-2 sm:gap-3">
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm min-w-0">
            <p className="text-yellow-400 font-medium">High Risk Warning</p>
            <p className="text-yellow-400/80 leading-relaxed">
              Degen tokens are extremely volatile. Most lose value quickly.
              <span className="hidden sm:inline"> Never invest more than you can afford to lose.</span> DYOR.
            </p>
          </div>
        </div>

        {/* 3 Pillars Info */}
        <div className="mb-4 sm:mb-6 grid grid-cols-3 gap-2 sm:gap-3">
          <div className="group relative p-2 sm:p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-green-500/50 transition-colors cursor-help">
            <h3 className="text-xs sm:text-sm font-semibold text-green-400 flex items-center gap-1 sm:gap-2">
              <span className="text-sm sm:text-lg">🛡️</span>
              <span className="hidden sm:inline">Don&apos;t Get</span> Rugged
              <HelpCircle className="w-3 h-3 opacity-50 group-hover:opacity-100" />
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 hidden sm:block">Rug risk scorecard</p>
          </div>

          <div className="group relative p-2 sm:p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-colors cursor-help">
            <h3 className="text-xs sm:text-sm font-semibold text-yellow-400 flex items-center gap-1 sm:gap-2">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Don&apos;t Be</span> Late
              <HelpCircle className="w-3 h-3 opacity-50 group-hover:opacity-100" />
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 hidden sm:block">Entry zone + momentum</p>
          </div>

          <div className="group relative p-2 sm:p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-colors cursor-help">
            <h3 className="text-xs sm:text-sm font-semibold text-purple-400 flex items-center gap-1 sm:gap-2">
              <span className="text-sm sm:text-lg">🎯</span>
              <span className="hidden sm:inline">Don&apos;t</span> Round-Trip
              <HelpCircle className="w-3 h-3 opacity-50 group-hover:opacity-100" />
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 hidden sm:block">
              Exit radar
              {userTier === 'free' && <span className="text-yellow-400 ml-1">(Pro)</span>}
            </p>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Trending Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Trending</h2>
            <span className="text-sm text-gray-500">({DEMO_TRENDING.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEMO_TRENDING.map(token => (
              <DegenCard key={token.id} token={token} variant="full" isProUser={userTier === 'pro'} />
            ))}
          </div>
        </section>

        {/* New Launches Section */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Rocket className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">New Launches</h2>
            <span className="text-sm text-gray-500">({DEMO_NEW_LAUNCHES.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEMO_NEW_LAUNCHES.map(token => (
              <DegenCard key={token.id} token={token} variant="full" isProUser={userTier === 'pro'} />
            ))}
          </div>
        </section>

        {/* Footer Disclaimer */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-xs text-gray-500 text-center max-w-2xl mx-auto px-2 leading-relaxed">
            Degen Radar is for informational purposes only. Scores are algorithmic estimates, not financial advice.
            <span className="hidden sm:inline"> Past performance does not indicate future results.</span> DYOR.
          </p>
        </div>
      </main>
    </div>
  );
}
