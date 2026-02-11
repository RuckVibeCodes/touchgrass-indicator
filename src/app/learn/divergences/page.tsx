import LearnLayout from "@/components/learn/LearnLayout";

export default function DivergencesPage() {
  return (
    <LearnLayout
      title="Momentum Divergences"
      description="Learn to spot reversals early with momentum-based RSI divergences. The same technique used by ChartPrime and other premium indicators."
      icon="🔄"
      difficulty="Intermediate"
      readTime="8 min"
      prevGuide={{ slug: "signals", title: "BULLISH/BEARISH Signals" }}
      nextGuide={{ slug: "momentum-ma", title: "Neon Glow Momentum MA" }}
    >
      {/* What Are Divergences */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">What Are Divergences?</h2>
        <p className="text-gray-300 mb-4">
          A divergence occurs when price and an indicator move in opposite directions. This signals 
          that the current trend may be losing momentum and could reverse.
        </p>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
          <p className="text-emerald-400">
            💡 <strong>Why Divergences Work:</strong> They reveal the hidden story behind price. 
            When price makes a new high but momentum doesn&apos;t confirm it, buyers are exhausted.
          </p>
        </div>
      </div>

      {/* Types Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#111118] border border-green-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3 text-green-400">📈 Bullish Divergence</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Price makes a <strong>LOWER LOW</strong></li>
            <li>• RSI makes a <strong>HIGHER LOW</strong></li>
            <li>• Signals potential reversal <strong>UP</strong></li>
            <li>• Indicates selling pressure is weakening</li>
          </ul>
          <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
            <p className="text-green-400 text-sm">
              ✅ Traders are more willing to buy at lower prices. Hidden strength building.
            </p>
          </div>
        </div>

        <div className="bg-[#111118] border border-red-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-3 text-red-400">📉 Bearish Divergence</h3>
          <ul className="space-y-2 text-gray-300">
            <li>• Price makes a <strong>HIGHER HIGH</strong></li>
            <li>• RSI makes a <strong>LOWER HIGH</strong></li>
            <li>• Signals potential reversal <strong>DOWN</strong></li>
            <li>• Indicates buying pressure is weakening</li>
          </ul>
          <div className="mt-4 p-3 bg-red-500/10 rounded-lg">
            <p className="text-red-400 text-sm">
              ⚠️ Buyers are losing conviction. The rally is running out of steam.
            </p>
          </div>
        </div>
      </div>

      {/* Why Momentum RSI */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Why Momentum RSI?</h2>
        <p className="text-gray-300 mb-4">
          TouchGrass uses <strong>RSI of Momentum</strong> instead of regular RSI. This is the same 
          approach used by ChartPrime and other premium indicators.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="font-semibold text-gray-400 mb-2">❌ Regular RSI</h4>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Based on price closes</li>
              <li>• Slower to react</li>
              <li>• More false signals</li>
              <li>• Misses early divergences</li>
            </ul>
          </div>
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
            <h4 className="font-semibold text-emerald-400 mb-2">✅ Momentum RSI</h4>
            <ul className="text-emerald-300 text-sm space-y-1">
              <li>• Based on rate of change</li>
              <li>• Faster to react</li>
              <li>• More reliable signals</li>
              <li>• Catches divergences earlier</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <p className="text-purple-300 text-sm">
            <strong>🧮 Technical Detail:</strong> We calculate <code className="bg-gray-800 px-1 rounded">ta.rsi(ta.mom(close, 10), 14)</code> — 
            the RSI of the 10-period momentum, with 14-period RSI smoothing.
          </p>
        </div>
      </div>

      {/* How to Trade */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">🎯 How to Trade Divergences</h2>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shrink-0">1</div>
            <div>
              <h4 className="font-semibold text-white mb-1">Wait for the Label</h4>
              <p className="text-gray-400">TouchGrass plots &quot;BULL DIV&quot; or &quot;BEAR DIV&quot; labels when it detects a valid divergence. Don&apos;t try to anticipate — let the indicator confirm.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shrink-0">2</div>
            <div>
              <h4 className="font-semibold text-white mb-1">Confirm with Price Action</h4>
              <p className="text-gray-400">A divergence is a warning, not an entry signal. Wait for price to confirm: a break of structure, a candle pattern, or a key level test.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shrink-0">3</div>
            <div>
              <h4 className="font-semibold text-white mb-1">Place Your Stop</h4>
              <p className="text-gray-400">
                <strong>Bull Div:</strong> Stop below the divergence low.<br />
                <strong>Bear Div:</strong> Stop above the divergence high.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shrink-0">4</div>
            <div>
              <h4 className="font-semibold text-white mb-1">Target Key Levels</h4>
              <p className="text-gray-400">Use VWAP, PDH/PDL, or ORB levels as profit targets. Divergences often lead to moves that test these key levels.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">⚙️ TouchGrass Settings</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 text-gray-400 font-medium">Setting</th>
                <th className="py-3 text-gray-400 font-medium">Default</th>
                <th className="py-3 text-gray-400 font-medium">What It Does</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-3">RSI Length</td>
                <td className="py-3 text-emerald-400">14</td>
                <td className="py-3">Smoothing period for RSI calculation</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3">Min Bars Between Pivots</td>
                <td className="py-3 text-emerald-400">5</td>
                <td className="py-3">Minimum distance between divergence points</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3">Max Bars Between Pivots</td>
                <td className="py-3 text-emerald-400">50</td>
                <td className="py-3">Maximum distance (avoids stale divergences)</td>
              </tr>
              <tr>
                <td className="py-3">Pivot Lookback</td>
                <td className="py-3 text-emerald-400">5</td>
                <td className="py-3">Bars to look back for pivot confirmation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="bg-[#111118] border border-red-500/30 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-red-400">⚠️ Common Mistakes</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex gap-3">
            <span className="text-red-400">✗</span>
            <span><strong>Trading divergences against the trend.</strong> In a strong uptrend, bearish divergences can fail repeatedly. Context matters.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-400">✗</span>
            <span><strong>Entering immediately.</strong> A divergence is a warning, not a signal. Always wait for confirmation.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-400">✗</span>
            <span><strong>Ignoring the timeframe.</strong> Divergences on higher timeframes (1H, 4H) are more reliable than on 1-5min charts.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-400">✗</span>
            <span><strong>No stop loss.</strong> Even good divergences can fail. Always protect your capital.</span>
          </li>
        </ul>
      </div>

      {/* Success Rate */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-emerald-500/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">📊 Success Rate</h2>
        <p className="text-gray-300 mb-4">
          When traded with proper confirmation and risk management, momentum-based divergences 
          have a success rate of approximately <strong className="text-emerald-400">65-75%</strong> on 15-minute 
          timeframes and higher.
        </p>
        <p className="text-gray-400 text-sm">
          * Based on backtesting data. Individual results may vary. Always use proper risk management.
        </p>
      </div>
    </LearnLayout>
  );
}
