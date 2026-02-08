'use client';

import { DegenChain } from '@/lib/types';

const CHAIN_CONFIG: Record<DegenChain, { label: string; color: string; bg: string }> = {
  ethereum: { label: 'ETH', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  solana: { label: 'SOL', color: 'text-purple-400', bg: 'bg-purple-500/20' },
  base: { label: 'BASE', color: 'text-blue-300', bg: 'bg-blue-400/20' },
  arbitrum: { label: 'ARB', color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  bsc: { label: 'BSC', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  avalanche: { label: 'AVAX', color: 'text-red-400', bg: 'bg-red-500/20' },
  polygon: { label: 'MATIC', color: 'text-purple-300', bg: 'bg-purple-400/20' },
};

interface ChainBadgeProps {
  chain: DegenChain;
}

export default function ChainBadge({ chain }: ChainBadgeProps) {
  const config = CHAIN_CONFIG[chain] || { label: chain.toUpperCase(), color: 'text-gray-400', bg: 'bg-gray-500/20' };

  return (
    <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded ${config.bg} ${config.color} font-medium`}>
      {config.label}
    </span>
  );
}
