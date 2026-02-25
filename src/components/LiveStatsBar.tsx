"use client";

import { useEffect, useState } from "react";

interface Stats {
  winRate: number;
  totalR: number;
  totalSignals: number;
  profitFactor: number;
  trackingSince: string | null;
  recent: {
    direction: string;
    entry: number;
    status: string;
    r: number;
    time: string;
    exitReason: string;
  }[];
}

function StatPill({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col items-center px-5 py-3 rounded-xl bg-[#0a0a0f] border border-gray-800 min-w-[90px]">
      <span
        className={`text-2xl font-bold tabular-nums ${
          highlight ? "text-emerald-400" : "text-white"
        }`}
      >
        {value}
      </span>
      <span className="text-xs text-gray-500 mt-0.5 text-center">{label}</span>
      {sub && <span className="text-[10px] text-gray-600 mt-0.5">{sub}</span>}
    </div>
  );
}

function SignalChip({
  direction,
  status,
  r,
}: {
  direction: string;
  status: string;
  r: number;
}) {
  const isLong = direction === "LONG";
  const isWin = status === "win";
  const isLoss = status === "loss";
  const rStr = r >= 0 ? `+${r.toFixed(2)}R` : `${r.toFixed(2)}R`;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${
        isWin
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          : isLoss
          ? "border-red-500/30 bg-red-500/10 text-red-400"
          : "border-gray-700 bg-gray-800 text-gray-400"
      }`}
    >
      <span>{isLong ? "▲" : "▼"} {direction}</span>
      <span className="text-gray-600">·</span>
      <span>{rStr}</span>
    </div>
  );
}

export default function LiveStatsBar() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/landing-stats")
      .then((r) => r.json())
      .then((d) => {
        setStats(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="inline-flex gap-2 items-center text-gray-600 text-sm">
          <span className="animate-spin">⟳</span> Loading live stats…
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const since = stats.trackingSince
    ? new Date(stats.trackingSince).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-sm font-semibold text-gray-300">
              Live Performance
            </span>
            <span className="text-xs text-gray-600">BTC · 1H · Auto-detected signals</span>
          </div>
          {since && (
            <span className="text-xs text-gray-600">Tracking since {since}</span>
          )}
        </div>

        {/* Stats pills */}
        <div className="flex gap-3 flex-wrap justify-center sm:justify-start mb-8">
          <StatPill
            label="Win Rate"
            value={`${stats.winRate}%`}
            highlight={stats.winRate >= 50}
          />
          <StatPill
            label="Total R Gained"
            value={`+${stats.totalR.toFixed(1)}R`}
            sub="since Jan 15"
            highlight
          />
          <StatPill label="Signals Fired" value={String(stats.totalSignals)} />
          <StatPill
            label="Profit Factor"
            value={stats.profitFactor.toFixed(2)}
            highlight={stats.profitFactor >= 1.5}
          />
        </div>

        {/* Recent signals */}
        {stats.recent.length > 0 && (
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">
              Most Recent Signals
            </p>
            <div className="flex gap-2 flex-wrap">
              {stats.recent.map((s, i) => (
                <SignalChip
                  key={i}
                  direction={s.direction}
                  status={s.status}
                  r={s.r}
                />
              ))}
            </div>
          </div>
        )}

        <p className="text-[11px] text-gray-700 mt-4">
          * Live results from automated signal detection. Past performance does not guarantee future results.
        </p>
      </div>
    </div>
  );
}
