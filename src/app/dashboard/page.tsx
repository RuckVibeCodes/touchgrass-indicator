'use client';

import { useState } from 'react';
import Link from 'next/link';
import MarketMoversBar from '@/components/MarketMoversBar';
import MarketSnapshot from '@/components/MarketSnapshot';
import { Upload, Sparkles, ArrowRight, TrendingUp, Flame, BookOpen, Youtube } from 'lucide-react';

export default function DashboardPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [tradeType, setTradeType] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Market Movers Bar */}
      <MarketMoversBar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart Analysis Card */}
            <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Chart Analysis</h2>
                  <p className="text-sm text-gray-400">Upload a chart or describe your setup</p>
                </div>
              </div>

              {/* How to use */}
              <div className="bg-gray-900/50 rounded-xl p-4 mb-6 border border-gray-700/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-yellow-400">💡</span>
                  <span className="text-sm font-medium text-gray-300">How to use:</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">•</span>
                    <span><span className="text-white">Upload an image</span> for AI vision analysis of your chart</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">•</span>
                    <span><span className="text-white">Add a description</span> for detailed context and breakdown</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500">•</span>
                    <span><span className="text-white">Select trade type</span> to get specific trade ideas tailored to your timeframe</span>
                  </li>
                </ul>
              </div>

              {/* Trade Type Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Trade Type (Optional - for trade ideas)
                </label>
                <select
                  value={tradeType}
                  onChange={(e) => setTradeType(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Select a trade type to receive tailored trade setup ideas</option>
                  <option value="scalp">Scalp – 1-15 minute setup</option>
                  <option value="day">Day trade – 1-6 hour setup</option>
                  <option value="swing">Swing – 1-7 day setup</option>
                  <option value="position">Position – weeks to months</option>
                </select>
              </div>

              {/* Upload Zone */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Upload Chart Image (Optional)
                </label>
                <div className="relative">
                  {imagePreview ? (
                    <div className="relative rounded-xl overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imagePreview} alt="Chart preview" className="w-full max-h-64 object-contain bg-gray-900" />
                      <button
                        onClick={() => setImagePreview(null)}
                        className="absolute top-2 right-2 px-3 py-1 bg-red-500/80 hover:bg-red-500 text-white text-sm rounded-lg"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer hover:border-purple-500/50 transition-colors">
                      <Upload className="w-8 h-8 text-gray-500 mb-2" />
                      <span className="text-gray-400 text-sm">Click to upload chart image</span>
                      <span className="text-gray-500 text-xs mt-1">PNG, JPG up to 10MB</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your chart setup, timeframe, key levels, or what you're seeing..."
                  rows={3}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none resize-none"
                />
              </div>

              {/* Analyze Button */}
              <Link
                href="/analyze"
                className="flex items-center justify-center gap-2 w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                Analyze Chart
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="text-center text-gray-500 text-xs mt-3">
                Free: 1 analysis per day • Pro: Unlimited
              </p>
            </div>

            {/* Quick Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/signals"
                className="bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-emerald-500/50 rounded-xl p-4 transition-all group"
              >
                <TrendingUp className="w-6 h-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white text-sm">Signals</h3>
                <p className="text-xs text-gray-500">Live trade signals</p>
              </Link>

              <Link
                href="/degen-radar"
                className="bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-orange-500/50 rounded-xl p-4 transition-all group"
              >
                <Flame className="w-6 h-6 text-orange-400 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white text-sm">Degen Radar</h3>
                <p className="text-xs text-gray-500">Hot tokens & plays</p>
              </Link>

              <Link
                href="/journal"
                className="bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-blue-500/50 rounded-xl p-4 transition-all group"
              >
                <BookOpen className="w-6 h-6 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white text-sm">Journal</h3>
                <p className="text-xs text-gray-500">Track your trades</p>
              </Link>

              <Link
                href="/video-analysis"
                className="bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-red-500/50 rounded-xl p-4 transition-all group"
              >
                <Youtube className="w-6 h-6 text-red-400 mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white text-sm">Video Analysis</h3>
                <p className="text-xs text-gray-500">Analyze YT videos</p>
              </Link>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <MarketSnapshot />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-4">
            <p className="text-center text-sm text-gray-400 leading-relaxed">
              <span className="font-semibold text-gray-300">Disclaimer:</span> TouchGrass provides AI-generated market analysis for educational and informational purposes only. This is not financial advice. Cryptocurrency trading involves substantial risk of loss. Always DYOR.
            </p>
          </div>
          <p className="text-center text-xs text-gray-600">
            © {new Date().getFullYear()} Blockstone Labs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
