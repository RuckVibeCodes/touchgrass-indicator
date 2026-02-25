"use client";

import { useState } from "react";

type Plan = "monthly" | "annual" | "lifetime";

const plans = {
  monthly: {
    price: "$19",
    period: "/month",
    badge: null,
    url: process.env.NEXT_PUBLIC_WHOP_MONTHLY_URL || "https://whop.com/touchgrass",
  },
  annual: {
    price: "$149",
    period: "/year",
    badge: "Save 35%",
    url: process.env.NEXT_PUBLIC_WHOP_ANNUAL_URL || "https://whop.com/touchgrass",
  },
  lifetime: {
    price: "$349",
    period: "one-time",
    badge: "Best Value",
    url: process.env.NEXT_PUBLIC_WHOP_LIFETIME_URL || "https://whop.com/touchgrass",
  },
};

const features = [
  "Neon Glow Momentum MA",
  "BULLISH / BEARISH Signals",
  "Momentum-Based Divergences",
  "Previous Day Levels (PDH/PDL)",
  "Opening Range Breakout Zones",
  "VWAP + StdDev Bands",
  "Momentum Bar Coloring",
  "All Smart Alerts",
  "Priority Support",
  "Future Updates Included",
];

export default function PricingSection() {
  const [selected, setSelected] = useState<Plan>("annual");

  const current = plans[selected];

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-gradient-to-b from-emerald-500/10 to-[#0a0a0f] border border-emerald-500/30 rounded-2xl p-8 relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-sm font-medium rounded-full whitespace-nowrap">
          Full Access — All Features
        </div>

        <div className="text-center mb-8 mt-2">
          <h3 className="text-2xl font-bold mb-1">TouchGrass</h3>
          <p className="text-gray-400 text-sm">The only crypto indicator you need</p>
        </div>

        {/* Plan selector */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {(Object.entries(plans) as [Plan, typeof plans.monthly][]).map(
            ([key, plan]) => (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className={`relative rounded-xl p-4 text-center transition-all border ${
                  selected === key
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-gray-700 bg-[#0a0a0f] hover:border-gray-600"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}
                <div
                  className={`text-2xl font-bold ${
                    selected === key ? "text-white" : "text-gray-300"
                  }`}
                >
                  {plan.price}
                </div>
                <div className="text-gray-500 text-xs mt-0.5">{plan.period}</div>
              </button>
            )
          )}
        </div>

        {/* Feature list */}
        <ul className="space-y-3 mb-8">
          {features.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-emerald-400 font-bold flex-shrink-0">✓</span>
              <span className="text-gray-300 text-sm">{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={current.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white rounded-xl font-semibold text-lg text-center transition-colors cursor-pointer select-none"
        >
          Get TouchGrass — {current.price}
          {selected !== "lifetime" ? current.period : ""}
        </a>

        <p className="text-center text-gray-500 text-sm mt-4">
          7-day money-back guarantee · Instant access after checkout
        </p>
      </div>
    </div>
  );
}
