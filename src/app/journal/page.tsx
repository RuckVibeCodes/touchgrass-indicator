'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { BookOpen, Lock, Crown, Plus, BarChart3, Brain, Calendar } from 'lucide-react';

export default function JournalPage() {
  const userTier = 'free' as 'free' | 'pro'; // TODO: Get from auth
  const hasAccess = userTier === 'pro';

  // Show paywall for free users
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navigation />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl border border-gray-700 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600/20 rounded-full mb-4">
              <Lock className="w-8 h-8 text-purple-400" />
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">Trade Journal</h1>

            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Track your trades, analyze your performance, and get AI-powered insights to improve your trading.
              Journal access is available with a Pro subscription.
            </p>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Pro Features:</h2>
              <ul className="text-left max-w-md mx-auto space-y-3">
                <li className="flex items-start gap-3">
                  <Plus className="w-5 h-5 text-purple-400 mt-0.5" />
                  <span className="text-gray-300">Unlimited trade entries with detailed metadata</span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-purple-400 mt-0.5" />
                  <span className="text-gray-300">Performance statistics and win rate tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-purple-400 mt-0.5" />
                  <span className="text-gray-300">AI pattern detection and insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-purple-400 mt-0.5" />
                  <span className="text-gray-300">Calendar view and trade history</span>
                </li>
              </ul>
            </div>

            <Link
              href="/#pricing"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-lg"
            >
              <Crown className="w-5 h-5" />
              Upgrade to Pro
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Pro user view - would have full journal functionality
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <BookOpen className="w-7 h-7 sm:w-10 sm:h-10 text-purple-400 flex-shrink-0" />
            <h1 className="text-2xl sm:text-4xl font-bold text-white truncate">Trade Journal</h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-lg leading-relaxed">
            Track your trades, analyze performance, and improve with AI
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8">
          <div className="bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-700">
            <div className="text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">Total Trades</div>
            <div className="text-xl sm:text-2xl font-bold text-white">0</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-700">
            <div className="text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">Win Rate</div>
            <div className="text-xl sm:text-2xl font-bold text-gray-400">--</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-700">
            <div className="text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">Total P&L</div>
            <div className="text-xl sm:text-2xl font-bold text-gray-400">$0.00</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-700">
            <div className="text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">Profit Factor</div>
            <div className="text-xl sm:text-2xl font-bold text-gray-400">--</div>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Trades Yet</h3>
            <p className="text-gray-400 mb-4">Start tracking your trades to see performance insights</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
              Add Your First Trade
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
