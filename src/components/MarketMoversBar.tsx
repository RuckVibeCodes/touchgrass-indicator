'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TrendingUp, Flame, Rocket, Sparkles } from 'lucide-react';

interface MarketMoversData {
  global: {
    totalMarketCap: number;
    marketCapChange24h: number;
    totalVolume: number;
    btcDominance: number;
    ethDominance: number;
  };
  trending: {
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    image: string;
  }[];
  gainers: {
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    image: string;
  }[];
  lastUpdated: string;
}

// Format large numbers (trillion, billion)
const formatMarketCap = (value: number): string => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)} Trillion`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  return `$${value.toLocaleString()}`;
};

const formatVolume = (value: number): string => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
};

// Format price with appropriate decimals
const formatPrice = (price: number): string => {
  if (price >= 1000) return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  if (price >= 1) return `$${price.toFixed(2)}`;
  if (price >= 0.01) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(6)}`;
};

export default function MarketMoversBar() {
  const [data, setData] = useState<MarketMoversData | null>(null);
  const [aiPulse, setAiPulse] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both market movers and market data (for AI pulse) in parallel
        const [moversResponse, marketDataResponse] = await Promise.all([
          fetch('/api/market-movers'),
          fetch('/api/market-data'),
        ]);

        if (moversResponse.ok) {
          const result = await moversResponse.json();
          setData(result);
        }

        if (marketDataResponse.ok) {
          const marketData = await marketDataResponse.json();
          if (marketData.aiComment) {
            setAiPulse(marketData.aiComment);
          }
        }
      } catch (error) {
        console.error('Failed to fetch market movers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 120000); // Refresh every 2 min
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-white/[0.02] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="h-24 bg-gray-800/50 rounded-xl"></div>
            <div className="h-24 bg-gray-800/50 rounded-xl"></div>
            <div className="h-24 bg-gray-800/50 rounded-xl"></div>
            <div className="h-24 bg-gray-800/50 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data || (data.global.totalMarketCap === 0 && data.trending.length === 0 && data.gainers.length === 0)) {
    return null;
  }

  return (
    <div className="bg-white/[0.02] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {/* Global Market Stats + AI Pulse */}
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {formatMarketCap(data.global.totalMarketCap)}
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-gray-500">Market Cap</span>
                  <span className={data.global.marketCapChange24h >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                    {data.global.marketCapChange24h >= 0 ? '▲' : '▼'} {Math.abs(data.global.marketCapChange24h).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-700/50">
              <span>24h Vol: {formatVolume(data.global.totalVolume)}</span>
              <span>BTC {data.global.btcDominance.toFixed(1)}%</span>
            </div>
            {/* AI Pulse */}
            {aiPulse && (
              <div className="mt-3 pt-3 border-t border-gray-700/50">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span className="text-[10px] text-purple-400 uppercase tracking-wider font-medium">AI Pulse</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed italic">{aiPulse}</p>
              </div>
            )}
          </div>

          {/* Trending Section */}
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-semibold text-gray-300">Trending</span>
            </div>
            <div className="space-y-2">
              {data.trending.map((coin) => (
                <div key={coin.symbol} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {coin.image && (
                      <Image
                        src={coin.image}
                        alt={coin.symbol}
                        width={20}
                        height={20}
                        className="rounded-full"
                        unoptimized
                      />
                    )}
                    <span className="text-sm text-white font-medium">{coin.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white">{formatPrice(coin.price)}</div>
                    <div className={`text-xs ${coin.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {coin.change24h >= 0 ? '▲' : '▼'} {Math.abs(coin.change24h).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Gainers Section */}
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-3">
              <Rocket className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-semibold text-gray-300">Top Gainers</span>
            </div>
            <div className="space-y-2">
              {data.gainers.map((coin) => (
                <div key={coin.symbol} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {coin.image && (
                      <Image
                        src={coin.image}
                        alt={coin.symbol}
                        width={20}
                        height={20}
                        className="rounded-full"
                        unoptimized
                      />
                    )}
                    <span className="text-sm text-white font-medium">{coin.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white">{formatPrice(coin.price)}</div>
                    <div className="text-xs text-emerald-400">
                      ▲ {coin.change24h.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Dominance Card */}
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold text-gray-300">Market Dominance</span>
            </div>
            <div className="space-y-3">
              {/* BTC Dominance Bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-orange-400 font-medium">BTC</span>
                  <span className="text-white font-semibold">{data.global.btcDominance.toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                    style={{ width: `${data.global.btcDominance}%` }}
                  />
                </div>
              </div>
              {/* ETH Dominance Bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-blue-400 font-medium">ETH</span>
                  <span className="text-white font-semibold">{data.global.ethDominance.toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                    style={{ width: `${data.global.ethDominance}%` }}
                  />
                </div>
              </div>
              {/* Others */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-400 font-medium">Others</span>
                  <span className="text-white font-semibold">
                    {(100 - data.global.btcDominance - data.global.ethDominance).toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                    style={{ width: `${100 - data.global.btcDominance - data.global.ethDominance}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout - Horizontal Scroll Cards */}
        <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4 min-w-max pb-2">
            {/* Market Cap + AI Pulse Card */}
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50 w-72 shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-xs text-gray-500">Market Cap</span>
              </div>
              <div className="text-xl font-bold text-white">
                {formatMarketCap(data.global.totalMarketCap)}
              </div>
              <div className={`text-xs ${data.global.marketCapChange24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {data.global.marketCapChange24h >= 0 ? '▲' : '▼'} {Math.abs(data.global.marketCapChange24h).toFixed(1)}% (24h)
              </div>
              {/* AI Pulse on mobile */}
              {aiPulse && (
                <div className="mt-2 pt-2 border-t border-gray-700/50">
                  <div className="flex items-center gap-1 mb-1">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span className="text-[10px] text-purple-400 uppercase font-medium">AI Pulse</span>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-relaxed italic line-clamp-2">{aiPulse}</p>
                </div>
              )}
            </div>

            {/* 24h Volume Card */}
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50 w-52 shrink-0">
              <div className="text-xs text-gray-500 mb-2">24h Trading Volume</div>
              <div className="text-xl font-bold text-white">
                {formatVolume(data.global.totalVolume)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                BTC: {data.global.btcDominance.toFixed(1)}% | ETH: {data.global.ethDominance.toFixed(1)}%
              </div>
            </div>

            {/* Trending Card */}
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50 w-64 shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-semibold text-gray-300">Trending</span>
              </div>
              <div className="space-y-2">
                {data.trending.slice(0, 3).map((coin) => (
                  <div key={coin.symbol} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {coin.image && (
                        <Image src={coin.image} alt={coin.symbol} width={16} height={16} className="rounded-full" unoptimized />
                      )}
                      <span className="text-xs text-white">{coin.symbol}</span>
                    </div>
                    <span className={`text-xs ${coin.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gainers Card */}
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50 w-64 shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-gray-300">Top Gainers</span>
              </div>
              <div className="space-y-2">
                {data.gainers.slice(0, 3).map((coin) => (
                  <div key={coin.symbol} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {coin.image && (
                        <Image src={coin.image} alt={coin.symbol} width={16} height={16} className="rounded-full" unoptimized />
                      )}
                      <span className="text-xs text-white">{coin.symbol}</span>
                    </div>
                    <span className="text-xs text-emerald-400">+{coin.change24h.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
