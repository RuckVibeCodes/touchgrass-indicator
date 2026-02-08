'use client';

import { DegenScoreLabel } from '@/lib/types';

interface DegenScoreBadgeProps {
  score: number;
  label: DegenScoreLabel;
}

const LABEL_CONFIG: Record<DegenScoreLabel, { color: string; bg: string }> = {
  SAFE: { color: 'text-green-400', bg: 'bg-green-500/10' },
  MODERATE: { color: 'text-lime-400', bg: 'bg-lime-500/10' },
  RISKY: { color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  DEGEN: { color: 'text-orange-400', bg: 'bg-orange-500/10' },
  EXTREME: { color: 'text-red-400', bg: 'bg-red-500/10' },
};

export default function DegenScoreBadge({ score, label }: DegenScoreBadgeProps) {
  const config = LABEL_CONFIG[label];

  return (
    <div className={`flex items-center justify-between ${config.bg} rounded-lg px-2 py-1`}>
      <span className="text-[10px] sm:text-xs text-gray-400">Degen Score</span>
      <div className="flex items-center gap-1.5">
        <div className="w-12 sm:w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              score >= 70 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
              score >= 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
              'bg-gradient-to-r from-green-500 to-lime-500'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className={`text-[10px] sm:text-xs font-semibold ${config.color}`}>{label}</span>
      </div>
    </div>
  );
}
