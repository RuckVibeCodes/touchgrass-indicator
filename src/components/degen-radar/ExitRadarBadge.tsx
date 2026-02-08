'use client';

import { ExitAnalysis } from '@/lib/types';
import { Lock, Target, TrendingDown, AlertCircle } from 'lucide-react';

interface ExitRadarBadgeProps {
  exit: ExitAnalysis | null;
  isProUser?: boolean;
}

const URGENCY_CONFIG = {
  early: { color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30', label: 'Early', icon: Target },
  maturing: { color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', label: 'Maturing', icon: TrendingDown },
  distribution: { color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30', label: 'Distribution', icon: AlertCircle },
};

export default function ExitRadarBadge({ exit, isProUser = false }: ExitRadarBadgeProps) {
  // Show locked state for non-pro users
  if (!isProUser) {
    return (
      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] sm:text-xs font-medium bg-gray-700/50 text-gray-500 border border-gray-600/30 cursor-not-allowed">
        <Lock className="w-3 h-3" />
        <span>Exit</span>
      </div>
    );
  }

  // No exit data available
  if (!exit) {
    return (
      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] sm:text-xs font-medium bg-gray-700/50 text-gray-400 border border-gray-600/30">
        <Target className="w-3 h-3" />
        <span>N/A</span>
      </div>
    );
  }

  const config = URGENCY_CONFIG[exit.urgency];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] sm:text-xs font-medium ${config.bg} ${config.color} border ${config.border}`}
      title={exit.profitZone ? `Profit Zone: ${exit.profitZone}` : 'Exit Radar'}
    >
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
      {exit.profitZone && (
        <span className="text-[8px] sm:text-[9px] opacity-75">({exit.profitZone})</span>
      )}
    </div>
  );
}
