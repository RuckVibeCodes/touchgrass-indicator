'use client';

import { RugRiskProfile } from '@/lib/types';
import { Shield, AlertTriangle } from 'lucide-react';

interface RugRiskBadgeProps {
  rugRisk: RugRiskProfile;
}

const LEVEL_CONFIG = {
  low: { color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30', label: 'Low Risk' },
  medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', label: 'Med Risk' },
  high: { color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/30', label: 'High Risk' },
  extreme: { color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30', label: 'Extreme' },
};

export default function RugRiskBadge({ rugRisk }: RugRiskBadgeProps) {
  const config = LEVEL_CONFIG[rugRisk.level];
  const Icon = rugRisk.level === 'low' ? Shield : AlertTriangle;

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] sm:text-xs font-medium ${config.bg} ${config.color} border ${config.border}`}
      title={`Rug Score: ${rugRisk.score}/100`}
    >
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </div>
  );
}
