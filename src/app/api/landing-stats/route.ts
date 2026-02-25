import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      "https://touchgrass.trade/api/signals?limit=5",
      { next: { revalidate: 300 } } // cache 5 min
    );

    if (!res.ok) throw new Error("signals API error");

    const data = await res.json();
    const { stats, signals } = data;

    const recent = (signals || []).slice(0, 5).map((s: {
      direction: string;
      entry_price: number;
      status: string;
      r_multiple: number;
      signal_time: string;
      exit_reason: string;
    }) => ({
      direction: s.direction,
      entry: s.entry_price,
      status: s.status,
      r: s.r_multiple,
      time: s.signal_time,
      exitReason: s.exit_reason,
    }));

    return NextResponse.json({
      winRate: stats?.win_rate ?? 0,
      totalR: stats?.total_r ?? 0,
      totalSignals: stats?.total_signals ?? 0,
      profitFactor: stats?.profit_factor ?? 0,
      trackingSince: stats?.tracking_since ?? null,
      recent,
    });
  } catch {
    // Return safe fallback — never break the landing page
    return NextResponse.json({
      winRate: 52,
      totalR: 30.01,
      totalSignals: 54,
      profitFactor: 2.25,
      trackingSince: "2026-01-15T07:00:00Z",
      recent: [],
    });
  }
}
