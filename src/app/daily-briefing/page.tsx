'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import {
  Newspaper,
  TrendingUp,
  Calendar,
  Target,
  Sparkles,
  Lock,
  Crown,
  Globe,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

// Demo briefing data
const DEMO_BRIEFING = {
  date: new Date().toISOString().split('T')[0],
  metadata: {
    sentiment: 'Cautiously Bullish',
    keyTakeaway: 'BTC holding above key support with declining volatility. Watch for breakout above $70k resistance.',
    generatedAt: new Date().toISOString(),
  },
  marketOverview: {
    btcPrice: 69420,
    btcChange: 2.1,
    ethPrice: 2450,
    ethChange: 3.5,
    fearGreedIndex: 62,
  },
  macroTone: 'Risk appetite returning as VIX settles below 15. SPX making new highs supports crypto correlation thesis.',
  macroData: {
    spxLevel: 5200,
    spxChange: 0.8,
    vixLevel: 14.5,
    riskMode: 'risk-on',
  },
  derivativesOverview: {
    bias: 'Bullish',
    fundingAnalysis: 'BTC funding slightly positive at 0.01%, indicating balanced positioning without excessive leverage.',
    openInterestAnalysis: 'OI increased 5% over 24h, suggesting new positions entering rather than closing.',
    btcFundingRate: '0.010%',
    ethFundingRate: '0.008%',
    btcLongShortRatio: '1.15',
  },
  keyLevels: [
    'BTC Support: $67,500 (200 EMA)',
    'BTC Resistance: $70,000 (psychological)',
    'ETH Support: $2,350',
    'ETH Resistance: $2,550',
  ],
  momentumNotes: [
    'BTC RSI at 58 - room to run before overbought',
    'ETH showing relative strength vs BTC',
    'SOL momentum turning positive after consolidation',
  ],
  volatilityExpectations: 'Expecting volatility expansion into the weekend. Watch for directional move if BTC breaks $70k or loses $67.5k.',
  eventsToday: [
    'Fed speaker at 2pm EST',
    'Weekly options expiry',
    'ETH staking unlock event',
  ],
  topHeadlines: [
    { title: 'Bitcoin ETFs see $500M inflows', source: 'Bloomberg', url: '#' },
    { title: 'Ethereum Layer 2 TVL hits new ATH', source: 'DeFiLlama', url: '#' },
    { title: 'SEC delays spot ETH ETF decision', source: 'CoinDesk', url: '#' },
  ],
  degenRadar: [
    { nameOrTicker: 'PEPE', narrative: 'Meme Revival', reason: 'Breaking out of 2-week consolidation', caution: 'High volatility, position size accordingly' },
    { nameOrTicker: 'WIF', narrative: 'Dog Season', reason: 'Solana memes showing strength', caution: 'Late in the move, wait for pullback' },
  ],
};

export default function DailyBriefingPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const userTier = 'free' as 'free' | 'pro'; // TODO: Get from auth
  const isTeaser = userTier === 'free';

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getSentimentColor = (sentiment: string) => {
    if (sentiment.toLowerCase().includes('bullish')) return 'bg-green-500/20 text-green-400';
    if (sentiment.toLowerCase().includes('bearish')) return 'bg-red-500/20 text-red-400';
    return 'bg-yellow-500/20 text-yellow-400';
  };

  // Teaser Overlay Component
  const TeaserOverlay = () => (
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent flex items-end justify-center pb-6 sm:pb-8 rounded-xl">
      <div className="text-center px-4 sm:px-6">
        <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 mx-auto mb-3 sm:mb-4" />
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Full Analysis Locked</h3>
        <p className="text-gray-400 mb-4 max-w-md text-sm sm:text-base">
          Upgrade to Pro for the complete daily briefing with derivatives analysis,
          key levels, and degen radar picks.
        </p>
        <Link
          href="/#pricing"
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all"
        >
          <Crown className="w-4 h-4 sm:w-5 sm:h-5" />
          Unlock Full Briefing
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <main className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2 sm:gap-3">
            <Newspaper className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            Daily Briefing
          </h1>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Date & Tier Badge */}
        <div className="flex flex-wrap items-center gap-2 text-gray-400 mb-6 sm:mb-8 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{new Date(DEMO_BRIEFING.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          {isTeaser && (
            <span className="px-2 py-0.5 bg-yellow-900/50 text-yellow-300 text-xs rounded-full">
              Preview
            </span>
          )}
        </div>

        {/* Key Takeaway Banner - Always shown */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 sm:p-6 border border-blue-800/30 mb-6 sm:mb-10">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <span className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold ${getSentimentColor(DEMO_BRIEFING.metadata.sentiment)}`}>
              {DEMO_BRIEFING.metadata.sentiment}
            </span>
            <span className="text-gray-500 text-xs sm:text-sm">
              {new Date(DEMO_BRIEFING.metadata.generatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </span>
          </div>
          <p className="text-white text-sm sm:text-lg italic leading-relaxed">&quot;{DEMO_BRIEFING.metadata.keyTakeaway}&quot;</p>
        </div>

        {/* Market Overview Section - Always shown */}
        <section className="mb-6 sm:mb-10">
          <h2 className="text-base sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            Market Overview
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
            {/* BTC Price */}
            <div className="bg-gray-800/50 rounded-xl p-3 sm:p-5 border border-gray-700">
              <div className="text-xs sm:text-sm text-gray-400 mb-1">BTC</div>
              <div className="text-lg sm:text-2xl font-bold text-white">
                ${DEMO_BRIEFING.marketOverview.btcPrice.toLocaleString()}
              </div>
              <div className={`text-xs sm:text-sm font-medium ${DEMO_BRIEFING.marketOverview.btcChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {DEMO_BRIEFING.marketOverview.btcChange >= 0 ? '+' : ''}{DEMO_BRIEFING.marketOverview.btcChange}%
              </div>
            </div>

            {/* ETH Price */}
            <div className="bg-gray-800/50 rounded-xl p-3 sm:p-5 border border-gray-700">
              <div className="text-xs sm:text-sm text-gray-400 mb-1">ETH</div>
              <div className="text-lg sm:text-2xl font-bold text-white">
                ${DEMO_BRIEFING.marketOverview.ethPrice.toLocaleString()}
              </div>
              <div className={`text-xs sm:text-sm font-medium ${DEMO_BRIEFING.marketOverview.ethChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {DEMO_BRIEFING.marketOverview.ethChange >= 0 ? '+' : ''}{DEMO_BRIEFING.marketOverview.ethChange}%
              </div>
            </div>

            {/* Fear & Greed */}
            <div className="bg-gray-800/50 rounded-xl p-3 sm:p-5 border border-gray-700 col-span-2 sm:col-span-1">
              <div className="text-xs sm:text-sm text-gray-400 mb-1">Fear & Greed</div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-lg sm:text-2xl font-bold text-white">{DEMO_BRIEFING.marketOverview.fearGreedIndex}</span>
                <span className="text-xs sm:text-sm text-gray-400">
                  {DEMO_BRIEFING.marketOverview.fearGreedIndex >= 60 ? 'Greed' : DEMO_BRIEFING.marketOverview.fearGreedIndex <= 40 ? 'Fear' : 'Neutral'}
                </span>
              </div>
              <div className="h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    DEMO_BRIEFING.marketOverview.fearGreedIndex >= 75 ? 'bg-green-500' :
                    DEMO_BRIEFING.marketOverview.fearGreedIndex >= 55 ? 'bg-lime-500' :
                    DEMO_BRIEFING.marketOverview.fearGreedIndex >= 45 ? 'bg-yellow-500' :
                    DEMO_BRIEFING.marketOverview.fearGreedIndex >= 25 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${DEMO_BRIEFING.marketOverview.fearGreedIndex}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Macro Tone - Always shown */}
        <section className="mb-6 sm:mb-10">
          <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700">
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">Macro Tone</h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{DEMO_BRIEFING.macroTone}</p>
          </div>
        </section>

        {/* PRO-ONLY CONTENT */}
        {isTeaser ? (
          <div className="relative">
            {/* Blurred preview */}
            <div className="filter blur-sm pointer-events-none select-none">
              <section className="mb-10">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  Macro Context
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 h-20" />
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 h-20" />
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 h-20" />
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 h-20" />
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                  Derivatives Overview
                </h2>
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 h-48" />
              </section>

              <section className="mb-10">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-yellow-400" />
                  Key Levels
                </h2>
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 h-32" />
              </section>
            </div>

            <TeaserOverlay />
          </div>
        ) : (
          <>
            {/* Full Pro Content would go here */}
            <section className="mb-6 sm:mb-10">
              <h2 className="text-base sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                Macro Context
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700">
                  <div className="text-[10px] sm:text-xs text-gray-500 mb-1">S&P 500</div>
                  <div className="text-base sm:text-lg font-bold text-white">{DEMO_BRIEFING.macroData.spxLevel.toLocaleString()}</div>
                  <div className={`text-[10px] sm:text-xs ${DEMO_BRIEFING.macroData.spxChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {DEMO_BRIEFING.macroData.spxChange >= 0 ? '+' : ''}{DEMO_BRIEFING.macroData.spxChange}%
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700">
                  <div className="text-[10px] sm:text-xs text-gray-500 mb-1">VIX</div>
                  <div className="text-base sm:text-lg font-bold text-white">{DEMO_BRIEFING.macroData.vixLevel}</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700">
                  <div className="text-[10px] sm:text-xs text-gray-500 mb-1">Risk Mode</div>
                  <div className="text-base sm:text-lg font-bold text-emerald-400">RISK ON</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 border border-gray-700">
                  <div className="text-[10px] sm:text-xs text-gray-500 mb-1">Correlation</div>
                  <div className="text-base sm:text-lg font-bold text-white">High</div>
                </div>
              </div>
            </section>

            {/* More Pro sections... */}
            <section className="mb-6 sm:mb-10">
              <h2 className="text-base sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                Key Levels
              </h2>
              <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-gray-700">
                <ul className="space-y-1.5 sm:space-y-2">
                  {DEMO_BRIEFING.keyLevels.map((level, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2 text-sm sm:text-base">
                      <span className="text-yellow-400 mt-0.5">•</span>
                      <span className="font-mono text-xs sm:text-sm">{level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Headlines */}
            <section className="mb-6 sm:mb-10">
              <h2 className="text-base sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <Newspaper className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                Top Headlines
              </h2>
              <div className="space-y-2">
                {DEMO_BRIEFING.topHeadlines.map((headline, i) => (
                  <a
                    key={i}
                    href={headline.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 sm:p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-white text-sm sm:text-base">{headline.title}</p>
                        <p className="text-gray-500 text-xs sm:text-sm mt-1">{headline.source}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Footer */}
        <div className="text-center text-gray-500 text-xs sm:text-sm pt-6 sm:pt-8 border-t border-gray-800">
          <p>AI-generated briefing - Not financial advice - DYOR</p>
        </div>
      </main>
    </div>
  );
}
