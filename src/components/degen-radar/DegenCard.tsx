'use client';

import { DegenToken } from '@/lib/types';
import ChainBadge from './ChainBadge';
import DegenScoreBadge from './DegenScoreBadge';
import RugRiskBadge from './RugRiskBadge';
import EntryZoneBadge from './EntryZoneBadge';
import ExitRadarBadge from './ExitRadarBadge';
import { ExternalLink, Clock, Droplets, BarChart3 } from 'lucide-react';

interface DegenCardProps {
  token: DegenToken;
  variant?: 'compact' | 'full';
  isProUser?: boolean;
}

function formatPrice(price: number): string {
  if (price >= 1) return `$${price.toFixed(2)}`;
  if (price >= 0.01) return `$${price.toFixed(4)}`;
  if (price >= 0.0001) return `$${price.toFixed(6)}`;
  return `$${price.toExponential(2)}`;
}

function formatCompact(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

function formatAge(hours: number | null): string {
  if (hours === null) return 'Unknown';
  if (hours < 1) return `${Math.round(hours * 60)}m`;
  if (hours < 24) return `${hours.toFixed(1)}h`;
  return `${Math.round(hours / 24)}d`;
}

export default function DegenCard({ token, variant = 'compact', isProUser = false }: DegenCardProps) {
  const isCompact = variant === 'compact';

  return (
    <div
      className={`${
        isCompact ? 'min-w-[240px] sm:min-w-[280px]' : 'w-full'
      } bg-gray-800 rounded-xl border border-gray-700 p-3 sm:p-4 hover:border-gray-600 transition-colors`}
    >
      {/* Header: Logo + Name + Chain */}
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        {/* Logo */}
        {token.logoUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={token.logoUrl}
            alt={token.symbol}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-700 flex-shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
            {token.symbol.slice(0, 2)}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-bold text-white text-sm sm:text-base truncate">{token.symbol}</span>
            <ChainBadge chain={token.chain} />
            {token.isPumpfun && (
              <span className="text-[9px] sm:text-[10px] px-1 py-0.5 bg-green-500/20 text-green-400 rounded flex-shrink-0">
                PF
              </span>
            )}
          </div>
          <span className="text-[10px] sm:text-xs text-gray-400 truncate block">{token.name}</span>
        </div>

        {/* External link */}
        {token.dexUrl && (
          <a
            href={token.dexUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-300 transition-colors p-1 flex-shrink-0"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Price & Change */}
      <div className="flex justify-between items-center mb-1.5 sm:mb-2">
        <span className="text-gray-400 text-xs sm:text-sm">Price</span>
        <span className="text-white font-medium text-xs sm:text-sm">{formatPrice(token.priceUsd)}</span>
      </div>

      <div className="flex justify-between items-center mb-1.5 sm:mb-2">
        <span className="text-gray-400 text-xs sm:text-sm">1h</span>
        <span
          className={`font-medium text-xs sm:text-sm ${
            (token.change1h ?? 0) > 0
              ? 'text-green-400'
              : (token.change1h ?? 0) < 0
              ? 'text-red-400'
              : 'text-gray-400'
          }`}
        >
          {token.change1h !== null
            ? `${token.change1h > 0 ? '+' : ''}${token.change1h.toFixed(1)}%`
            : '--'}
        </span>
      </div>

      {/* Liquidity & Volume */}
      <div className="flex justify-between items-center mb-1.5 sm:mb-2">
        <span className="text-gray-400 text-xs sm:text-sm flex items-center gap-1">
          <Droplets className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          Liq
        </span>
        <span className="text-white text-xs sm:text-sm">{formatCompact(token.liquidityUsd)}</span>
      </div>

      <div className="flex justify-between items-center mb-1.5 sm:mb-2">
        <span className="text-gray-400 text-xs sm:text-sm flex items-center gap-1">
          <BarChart3 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          Vol
        </span>
        <span className="text-white text-xs sm:text-sm">{formatCompact(token.volume24h)}</span>
      </div>

      {/* Age */}
      {token.ageHours !== null && token.ageHours < 48 && (
        <div className="flex justify-between items-center mb-1.5 sm:mb-2">
          <span className="text-gray-400 text-xs sm:text-sm flex items-center gap-1">
            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Age
          </span>
          <span className="text-purple-400 text-xs sm:text-sm font-medium">
            {formatAge(token.ageHours)}
          </span>
        </div>
      )}

      {/* Pump.fun Bonding Progress */}
      {token.isPumpfun && token.bondingProgress !== null && (
        <div className="mb-2 sm:mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-400 text-[10px] sm:text-xs">Bonding</span>
            <span className="text-green-400 text-[10px] sm:text-xs">{token.bondingProgress.toFixed(0)}%</span>
          </div>
          <div className="h-1 sm:h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
              style={{ width: `${Math.min(100, token.bondingProgress)}%` }}
            />
          </div>
        </div>
      )}

      {/* 3 Pillars Section */}
      <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-700 space-y-1.5 sm:space-y-2">
        {/* 3 Pillars Row */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          <RugRiskBadge rugRisk={token.rugRisk} />
          <EntryZoneBadge entry={token.entry} />
          <ExitRadarBadge exit={token.exit} isProUser={isProUser} />
        </div>

        {/* Degen Score */}
        <DegenScoreBadge score={token.degenScore} label={token.degenLabel} />

        {/* Risk Hints */}
        {token.riskHints.length > 0 && !isCompact && (
          <div className="text-[9px] sm:text-[10px] text-gray-500 flex flex-wrap gap-1">
            {token.riskHints.slice(0, 2).map((hint, i) => (
              <span key={i} className="bg-gray-700/50 px-1 sm:px-1.5 py-0.5 rounded truncate max-w-[100px]">
                {hint}
              </span>
            ))}
          </div>
        )}

        {/* Momentum Bias */}
        {token.momentumBias && (
          <p className="text-[9px] sm:text-[10px] text-purple-400 italic truncate">{token.momentumBias}</p>
        )}
      </div>
    </div>
  );
}
