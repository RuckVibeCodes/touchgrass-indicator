import LearnLayout from "@/components/learn/LearnLayout";

export default function SignalsPage() {
  return (
    <LearnLayout
      title="BULLISH/BEARISH Signals"
      description="Understand the 9/21 MA crossover signals. When to trust them, when to wait, and how to filter out the noise."
      icon="🎯"
      difficulty="Beginner"
      readTime="5 min"
      prevGuide={{ slug: "vwap", title: "VWAP + Bands" }}
      nextGuide={{ slug: "divergences", title: "Momentum Divergences" }}
    >
      {/* What Are the Signals */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">What Are BULLISH/BEARISH Signals?</h2>
        <p className="text-gray-300 mb-4">
          TouchGrass plots a signal label whenever the 9-period MA crosses the 21-period MA. This classic 
          crossover system captures momentum shifts in a visual, easy-to-read format.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h4 className="font-bold text-green-400 mb-2">🟢 BULLISH Signal</h4>
            <p className="text-gray-300 text-sm">Fast MA (9) crosses ABOVE Slow MA (21). Momentum shifting up.</p>
          </div>
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <h4 className="font-bold text-red-400 mb-2">🔴 BEARISH Signal</h4>
            <p className="text-gray-300 text-sm">Fast MA (9) crosses BELOW Slow MA (21). Momentum shifting down.</p>
          </div>
        </div>
      </div>

      {/* Signal Anatomy */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">📋 Signal Anatomy</h2>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg">
            <span className="text-2xl">🏷️</span>
            <div>
              <h4 className="font-semibold text-white mb-1">Label Position</h4>
              <p className="text-gray-400">BULLISH labels appear below the candle. BEARISH labels appear above. This keeps them out of the way of price action.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg">
            <span className="text-2xl">💰</span>
            <div>
              <h4 className="font-semibold text-white mb-1">Price Display</h4>
              <p className="text-gray-400">Each label shows the exact close price when the signal fired. Useful for setting entries and tracking performance.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg">
            <span className="text-2xl">🔔</span>
            <div>
              <h4 className="font-semibold text-white mb-1">Alerts</h4>
              <p className="text-gray-400">You can set TradingView alerts for both signal types. Get notified on your phone when a new signal fires.</p>
            </div>
          </div>
        </div>
      </div>

      {/* When to Trust */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">✅ When to Trust the Signal</h2>
        
        <ul className="space-y-3 text-gray-300">
          <li className="flex gap-3">
            <span className="text-emerald-400">✓</span>
            <span><strong>Signal aligns with higher timeframe.</strong> BULLISH on 15m while 1H MA is also green = high conviction.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400">✓</span>
            <span><strong>Signal near key level.</strong> BULLISH signal at PDL or VWAP = confluence support.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400">✓</span>
            <span><strong>Signal after consolidation.</strong> Crossover after a range = potential breakout.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400">✓</span>
            <span><strong>Volume confirmation.</strong> If volume spikes on the signal candle, more conviction.</span>
          </li>
        </ul>
      </div>

      {/* When to Wait */}
      <div className="bg-[#111118] border border-red-500/30 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-red-400">⚠️ When to Be Cautious</h2>
        
        <ul className="space-y-3 text-gray-300">
          <li className="flex gap-3">
            <span className="text-red-400">✗</span>
            <span><strong>Choppy/range market.</strong> Signals whipsaw when there&apos;s no clear trend. Wait for range break.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-400">✗</span>
            <span><strong>Counter to higher timeframe.</strong> BULLISH on 5m while 1H is red = likely to fail.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-400">✗</span>
            <span><strong>Signal at major resistance.</strong> BULLISH signal right at PDH without break = potential trap.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-red-400">✗</span>
            <span><strong>Low volume crossover.</strong> No volume = no conviction. Wait for confirmation.</span>
          </li>
        </ul>
      </div>

      {/* Trading Strategy */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">🎯 Simple Signal Strategy</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shrink-0">1</div>
            <div>
              <h4 className="font-semibold text-white mb-1">Wait for Signal</h4>
              <p className="text-gray-400">Don&apos;t anticipate. Let the BULLISH or BEARISH label appear.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shrink-0">2</div>
            <div>
              <h4 className="font-semibold text-white mb-1">Check Context</h4>
              <p className="text-gray-400">Is the higher timeframe aligned? Is price at a key level? Any divergence warnings?</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shrink-0">3</div>
            <div>
              <h4 className="font-semibold text-white mb-1">Enter on Pullback</h4>
              <p className="text-gray-400">Best entries come on the first pullback to the MA after the signal. Don&apos;t chase.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold shrink-0">4</div>
            <div>
              <h4 className="font-semibold text-white mb-1">Set Stop & Target</h4>
              <p className="text-gray-400">Stop below recent swing low (longs) or above swing high (shorts). Target next key level.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">⚙️ Settings</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 text-gray-400 font-medium">Setting</th>
                <th className="py-3 text-gray-400 font-medium">Default</th>
                <th className="py-3 text-gray-400 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-3">Show Bullish/Bearish Signals</td>
                <td className="py-3 text-emerald-400">On</td>
                <td className="py-3">Toggle signal labels on/off</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3">Fast MA Length</td>
                <td className="py-3 text-emerald-400">9</td>
                <td className="py-3">Lower = more signals, more noise</td>
              </tr>
              <tr>
                <td className="py-3">Slow MA Length</td>
                <td className="py-3 text-emerald-400">21</td>
                <td className="py-3">Higher = fewer signals, more reliable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-green-500/10 to-red-500/10 border border-green-500/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">📋 Quick Summary</h2>
        <ul className="space-y-2 text-gray-300">
          <li>• <strong className="text-green-400">BULLISH</strong> = Fast MA crosses above Slow MA</li>
          <li>• <strong className="text-red-400">BEARISH</strong> = Fast MA crosses below Slow MA</li>
          <li>• <strong>Best signals align with higher timeframe</strong> and key levels</li>
          <li>• <strong>Avoid signals in choppy markets</strong> — wait for clear trends</li>
          <li>• <strong>Enter on pullbacks</strong> for better risk:reward</li>
        </ul>
      </div>
    </LearnLayout>
  );
}
