'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Activity, RefreshCw, Info, TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  color: string;
  logoUrl: string;
}

interface MarketSnapshot {
  cryptos: CryptoPrice[];
  fearGreedIndex: number;
  fearGreedClassification: string;
  aiComment: string;
  riskMode: string;
  mood: string;
  bias: string;
  lastUpdated: string;
}

// Info Tooltip Component
const InfoTooltip = ({ text, position = 'bottom' }: { text: string; position?: 'top' | 'bottom' | 'left' | 'right' }) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="group relative inline-flex ml-1 cursor-help z-50">
      <div className="w-4 h-4 rounded-full bg-gray-600/50 flex items-center justify-center hover:bg-gray-500/70 transition-colors">
        <Info className="w-2.5 h-2.5 text-gray-300" />
      </div>
      <div className={`absolute ${positionClasses[position]} px-3 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-xs text-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[200] w-56 leading-relaxed shadow-2xl pointer-events-none`}>
        {text}
      </div>
    </div>
  );
};

// Section Header Component
const SectionHeader = ({ icon: Icon, title, tooltip, iconColor = 'text-gray-400' }: {
  icon: React.ElementType;
  title: string;
  tooltip: string;
  iconColor?: string;
}) => (
  <div className="flex items-center gap-2 mb-3">
    <Icon className={`w-4 h-4 ${iconColor}`} />
    <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">{title}</span>
    <InfoTooltip text={tooltip} position="bottom" />
  </div>
);

export default function MarketSnapshot() {
  const [snapshot, setSnapshot] = useState<MarketSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMarketData = async () => {
    try {
      const response = await fetch('/api/market-data');
      const data = await response.json();
      setSnapshot(data);
    } catch (error) {
      console.error('Failed to fetch market data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  const getFearGreedColor = (index: number) => {
    if (index < 25) return { text: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30' };
    if (index < 45) return { text: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/30' };
    if (index < 55) return { text: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' };
    if (index < 75) return { text: 'text-lime-400', bg: 'bg-lime-500/20', border: 'border-lime-500/30' };
    return { text: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30' };
  };

  const getRiskModeStyle = (mode: string) => {
    switch (mode.toLowerCase()) {
      case 'risk-on':
        return { text: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', label: 'RISK ON' };
      case 'risk-off':
        return { text: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30', label: 'RISK OFF' };
      default:
        return { text: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30', label: 'NEUTRAL' };
    }
  };

  const getMoodStyle = (mood: string) => {
    switch (mood.toLowerCase()) {
      case 'euphoria':
        return { text: 'text-green-400', bg: 'bg-green-500/15', border: 'border-green-500/30' };
      case 'greed':
        return { text: 'text-lime-400', bg: 'bg-lime-500/15', border: 'border-lime-500/30' };
      case 'fear':
        return { text: 'text-orange-400', bg: 'bg-orange-500/15', border: 'border-orange-500/30' };
      case 'capitulation':
        return { text: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30' };
      default:
        return { text: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30' };
    }
  };

  const getBiasStyle = (bias: string) => {
    switch (bias.toLowerCase()) {
      case 'bullish':
        return { text: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30' };
      case 'bearish':
        return { text: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/30' };
      default:
        return { text: 'text-gray-400', bg: 'bg-gray-500/15', border: 'border-gray-500/30' };
    }
  };

  const formatPrice = (price: number): string => {
    if (price >= 1000) return `$${price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    if (price >= 0.01) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(6)}`;
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-5">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700/50 rounded-lg w-2/3"></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-20 bg-gray-700/50 rounded-xl"></div>
            <div className="h-20 bg-gray-700/50 rounded-xl"></div>
          </div>
          <div className="space-y-2">
            <div className="h-12 bg-gray-700/50 rounded-xl"></div>
            <div className="h-12 bg-gray-700/50 rounded-xl"></div>
            <div className="h-12 bg-gray-700/50 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!snapshot) return null;

  const fearGreedStyle = getFearGreedColor(snapshot.fearGreedIndex);
  const riskStyle = getRiskModeStyle(snapshot.riskMode);
  const moodStyle = getMoodStyle(snapshot.mood);
  const biasStyle = getBiasStyle(snapshot.bias);

  return (
    <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl sticky top-4 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <h2 className="text-lg font-bold text-white tracking-tight">Market Snapshot</h2>
          </div>
          <button
            onClick={fetchMarketData}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-200 group"
            title="Refresh data"
          >
            <RefreshCw className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:rotate-180 transition-all duration-500" />
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* 4 Critical Metrics */}
        <div className="grid grid-cols-2 gap-3">
          {/* Fear & Greed */}
          <div className={`relative rounded-xl p-3 ${fearGreedStyle.bg} border ${fearGreedStyle.border}`}>
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none"></div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Fear & Greed</span>
              <InfoTooltip text="Market sentiment index (0-100). Below 25 = Extreme Fear (potential buy). Above 75 = Extreme Greed (caution)." position="bottom" />
            </div>
            <div className={`text-2xl font-bold ${fearGreedStyle.text}`}>{snapshot.fearGreedIndex}</div>
            <div className="text-[10px] text-gray-500 capitalize">{snapshot.fearGreedClassification}</div>
          </div>

          {/* Risk Mode */}
          <div className={`relative rounded-xl p-3 ${riskStyle.bg} border ${riskStyle.border}`}>
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none"></div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Risk Mode</span>
              <InfoTooltip text="Overall market risk appetite. Risk-on = bullish conditions. Risk-off = defensive." position="left" />
            </div>
            <div className={`text-lg font-bold ${riskStyle.text}`}>{riskStyle.label}</div>
            <div className="text-[10px] text-gray-500">based on sentiment</div>
          </div>

          {/* Market Mood */}
          <div className={`relative rounded-xl p-3 ${moodStyle.bg} border ${moodStyle.border}`}>
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none"></div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Mood</span>
              <InfoTooltip text="Overall market mood. Euphoria/Capitulation = extremes where reversals often occur." position="bottom" />
            </div>
            <div className={`text-lg font-bold capitalize ${moodStyle.text}`}>{snapshot.mood}</div>
            <div className="text-[10px] text-gray-500">market sentiment</div>
          </div>

          {/* Trading Bias */}
          <div className={`relative rounded-xl p-3 ${biasStyle.bg} border ${biasStyle.border}`}>
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none"></div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Bias</span>
              <InfoTooltip text="Current directional bias based on price action and sentiment signals." position="left" />
            </div>
            <div className={`text-lg font-bold ${biasStyle.text}`}>{snapshot.bias}</div>
            <div className="text-[10px] text-gray-500">directional lean</div>
          </div>
        </div>

        {/* Live Prices */}
        <div className="bg-gray-800/40 rounded-xl p-4 border border-gray-700/30">
          <SectionHeader
            icon={Activity}
            title="Live Prices"
            tooltip="Real-time prices from CoinGecko with 24h change percentage."
            iconColor="text-blue-400"
          />
          <div className="space-y-2">
            {snapshot.cryptos.map((crypto) => {
              const isPositive = crypto.priceChange24h >= 0;
              return (
                <div
                  key={crypto.symbol}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-gray-900/40 hover:bg-gray-900/60 transition-colors border border-transparent hover:border-gray-700/50"
                >
                  <div className="flex items-center gap-3">
                    {crypto.logoUrl ? (
                      <Image
                        src={crypto.logoUrl}
                        alt={`${crypto.name} logo`}
                        width={32}
                        height={32}
                        className="rounded-full ring-2 ring-gray-700/50"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm ring-2 ring-gray-700/50">
                        {crypto.symbol.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-white text-sm">{crypto.symbol}</div>
                      <div className="text-[10px] text-gray-500">{crypto.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white text-sm">{formatPrice(crypto.price)}</div>
                    <div className={`flex items-center justify-end gap-0.5 text-xs ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{isPositive ? '+' : ''}{crypto.priceChange24h.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-700/50 bg-gray-900/50">
        <p className="text-[10px] text-gray-500 text-center">
          Updated: {new Date(snapshot.lastUpdated).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
