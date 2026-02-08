'use client';

import { EntryAnalysis } from '@/lib/types';
import { Target, TrendingUp, TrendingDown } from 'lucide-react';

interface EntryZoneBadgeProps {
  entry: EntryAnalysis;
}

const ZONE_CONFIG = {
  extended: { color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30', label: 'Extended', icon: TrendingUp },
  rotation: { color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', label: 'Rotation', icon: Target },
  deep: { color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30', label: 'Deep Value', icon: TrendingDown },
};

export default function EntryZoneBadge({ entry }: EntryZoneBadgeProps) {
  const config = ZONE_CONFIG[entry.zone];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] sm:text-xs font-medium ${config.bg} ${config.color} border ${config.border}`}
      title={`${entry.distanceFromAth.toFixed(0)}% from ATH`}
    >
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </div>
  );
}
