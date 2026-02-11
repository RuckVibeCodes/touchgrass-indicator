"use client";

import Link from "next/link";

const signals = [
  {
    name: "BULLISH Signal",
    trigger: "9 MA crosses above 21 MA",
    action: "Look for long entries",
    stop: "Below recent swing low",
    target: "Next resistance (PDH, VWAP upper, ORB H)",
    confidence: "Higher when aligned with HTF trend",
    color: "green"
  },
  {
    name: "BEARISH Signal",
    trigger: "9 MA crosses below 21 MA",
    action: "Look for short entries",
    stop: "Above recent swing high",
    target: "Next support (PDL, VWAP lower, ORB L)",
    confidence: "Higher when aligned with HTF trend",
    color: "red"
  },
  {
    name: "Bull Divergence",
    trigger: "Price lower low + RSI higher low",
    action: "Potential reversal UP",
    stop: "Below the divergence low",
    target: "VWAP or previous swing high",
    confidence: "~70% on 15m+ timeframes",
    color: "teal"
  },
  {
    name: "Bear Divergence",
    trigger: "Price higher high + RSI lower high",
    action: "Potential reversal DOWN",
    stop: "Above the divergence high",
    target: "VWAP or previous swing low",
    confidence: "~70% on 15m+ timeframes",
    color: "fuchsia"
  }
];

const levels = [
  {
    name: "PDH (Previous Day High)",
    role: "Resistance",
    breakout: "Long on close above → target ORB H or next major level",
    rejection: "Short on rejection → target PD Mid or PDL",
    color: "orange"
  },
  {
    name: "PDL (Previous Day Low)",
    role: "Support",
    breakout: "Short on close below → target yesterday's support or lower",
    rejection: "Long on rejection → target PD Mid or PDH",
    color: "orange"
  },
  {
    name: "ORB High",
    role: "Breakout level",
    breakout: "Long on close above → target 1-2x ORB range",
    rejection: "Fade back to ORB Mid on rejection",
    color: "lime"
  },
  {
    name: "ORB Low",
    role: "Breakdown level",
    breakout: "Short on close below → target 1-2x ORB range",
    rejection: "Fade back to ORB Mid on rejection",
    color: "lime"
  },
  {
    name: "VWAP",
    role: "Fair value",
    breakout: "Above = bullish bias. Below = bearish bias.",
    rejection: "Acts as dynamic S/R throughout the day",
    color: "cyan"
  }
];

const rules = [
  { rule: "Always wait for candle CLOSE before entering", icon: "⏳" },
  { rule: "Check the higher timeframe before trading lower TF signals", icon: "📊" },
  { rule: "Use the Momentum MA color as your trend filter", icon: "🎨" },
  { rule: "Divergences are warnings, not entries — wait for confirmation", icon: "⚠️" },
  { rule: "Combine 2+ confluences for higher probability trades", icon: "🎯" },
  { rule: "Never risk more than 1-2% per trade", icon: "💰" },
  { rule: "Set alerts — don't stare at charts all day", icon: "🔔" },
  { rule: "Paper trade new setups before risking real money", icon: "📝" }
];

export default function CheatSheetPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-lg">
                🌿
              </div>
              <span className="text-xl font-bold">TouchGrass</span>
            </Link>
            <Link href="/learn" className="text-emerald-400 font-medium">
              ← Back to Learn
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-6xl mb-4 block">📋</span>
          <h1 className="text-4xl font-bold mb-4">TouchGrass Cheat Sheet</h1>
          <p className="text-xl text-gray-400 mb-6">
            Quick reference for all signals, levels, and trading rules.
          </p>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors"
          >
            🖨️ Print / Save as PDF
          </button>
        </div>
      </section>

      {/* Signals Table */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>🎯</span> Signal Reference
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left bg-[#111118] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-800">
                  <th className="py-3 px-4 text-gray-400 font-medium">Signal</th>
                  <th className="py-3 px-4 text-gray-400 font-medium">Trigger</th>
                  <th className="py-3 px-4 text-gray-400 font-medium">Action</th>
                  <th className="py-3 px-4 text-gray-400 font-medium">Stop</th>
                  <th className="py-3 px-4 text-gray-400 font-medium">Target</th>
                </tr>
              </thead>
              <tbody>
                {signals.map((signal, i) => (
                  <tr key={i} className="border-t border-gray-800">
                    <td className={`py-3 px-4 font-semibold text-${signal.color}-400`}>{signal.name}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{signal.trigger}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{signal.action}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{signal.stop}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{signal.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Levels Table */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>📊</span> Level Reference
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left bg-[#111118] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-800">
                  <th className="py-3 px-4 text-gray-400 font-medium">Level</th>
                  <th className="py-3 px-4 text-gray-400 font-medium">Role</th>
                  <th className="py-3 px-4 text-gray-400 font-medium">On Breakout</th>
                  <th className="py-3 px-4 text-gray-400 font-medium">On Rejection</th>
                </tr>
              </thead>
              <tbody>
                {levels.map((level, i) => (
                  <tr key={i} className="border-t border-gray-800">
                    <td className={`py-3 px-4 font-semibold text-${level.color}-400`}>{level.name}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{level.role}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{level.breakout}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{level.rejection}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quick Rules */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>📜</span> Trading Rules
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {rules.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-[#111118] border border-gray-800 rounded-xl">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-gray-300">{item.rule}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Decision Tree */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>🌳</span> Quick Decision Tree
          </h2>
          <div className="bg-[#111118] border border-gray-800 rounded-xl p-6">
            <div className="space-y-4 text-gray-300">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <strong className="text-emerald-400">1. What color is the Momentum MA?</strong>
                <p className="text-sm mt-1">Green = Bullish bias → Look for longs<br />Red = Bearish bias → Look for shorts</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <strong className="text-emerald-400">2. Where is price relative to VWAP?</strong>
                <p className="text-sm mt-1">Above VWAP = Buyers winning<br />Below VWAP = Sellers winning</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <strong className="text-emerald-400">3. Is there a key level nearby?</strong>
                <p className="text-sm mt-1">PDH/PDL or ORB levels = potential entry or exit zone</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <strong className="text-emerald-400">4. Any divergence warning?</strong>
                <p className="text-sm mt-1">Divergence against your trade = wait for more confirmation</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <strong className="text-emerald-400">5. Does higher timeframe agree?</strong>
                <p className="text-sm mt-1">HTF aligned = go for it<br />HTF opposing = smaller size or skip</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Trade?</h2>
          <div className="flex justify-center gap-4">
            <Link
              href="/learn/quiz"
              className="px-6 py-3 border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 rounded-xl font-medium transition-colors"
            >
              🎮 Test Your Knowledge
            </Link>
            <Link
              href="/#pricing"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors"
            >
              Get TouchGrass
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          © 2026 Blockstone Labs. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
