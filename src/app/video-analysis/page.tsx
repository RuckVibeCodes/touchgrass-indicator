'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { Youtube, Lock, Crown, Sparkles, TrendingUp, Target, Clock, AlertTriangle } from 'lucide-react';

export default function VideoAnalysisPage() {
  const userTier = 'free' as 'free' | 'pro'; // TODO: Get from auth
  const hasAccess = userTier === 'pro';

  // Show paywall for free users
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navigation />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl border border-gray-700 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/20 rounded-full mb-4">
              <Lock className="w-8 h-8 text-red-400" />
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">Video Analysis</h1>

            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Paste any YouTube trading video URL and get AI-powered summaries with key levels,
              trade setups, and actionable insights.
            </p>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">What You Get:</h2>
              <ul className="text-left max-w-md mx-auto space-y-3">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-400 mt-0.5" />
                  <span className="text-gray-300">AI-generated summary of the video content</span>
                </li>
                <li className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <span className="text-gray-300">Key levels extracted (support, resistance, targets)</span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-gray-300">Trade setups with entry, stop, and targets</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-400 mt-0.5" />
                  <span className="text-gray-300">Key timestamps for important moments</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5" />
                  <span className="text-gray-300">Risk warnings and probability scenarios</span>
                </li>
              </ul>
            </div>

            <Link
              href="/#pricing"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-lg"
            >
              <Crown className="w-5 h-5" />
              Upgrade to Pro
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Pro user view - would have full video analysis functionality
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Youtube className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold text-white">Video Analysis</h1>
          </div>
          <p className="text-gray-400">
            Paste a YouTube trading video URL to get AI-powered summaries and insights
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            YouTube URL
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-purple-500 focus:outline-none"
            />
            <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              <Sparkles className="w-5 h-5" />
              Analyze
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-12 text-center">
          <Youtube className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Video Analyzed Yet</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Paste a YouTube URL above to extract trading insights, key levels, and trade setups from any trading video.
          </p>
        </div>
      </main>
    </div>
  );
}
