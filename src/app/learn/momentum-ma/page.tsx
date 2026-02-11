import LearnLayout from "@/components/learn/LearnLayout";

export default function MomentumMAPage() {
  return (
    <LearnLayout
      title="Neon Glow Momentum MA"
      description="Master the 9-period momentum MA with dynamic glow effect. See trend direction at a glance with this signature TouchGrass feature."
      icon="✨"
      difficulty="Beginner"
      readTime="5 min"
      prevGuide={{ slug: "divergences", title: "Momentum Divergences" }}
      nextGuide={{ slug: "orb", title: "Opening Range Breakout" }}
    >
      {/* What Is It */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">What Is the Momentum MA?</h2>
        <p className="text-gray-300 mb-4">
          The Momentum MA is a 9-period Simple Moving Average (SMA) with a dynamic &quot;neon glow&quot; effect. 
          It changes color based on whether price momentum is bullish or bearish.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h4 className="font-bold text-green-400 mb-2">🟢 Green Glow</h4>
            <p className="text-gray-300 text-sm">Fast MA (9) is ABOVE Slow MA (21). Bullish momentum — trend is up.</p>
          </div>
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <h4 className="font-bold text-red-400 mb-2">🔴 Red Glow</h4>
            <p className="text-gray-300 text-sm">Fast MA (9) is BELOW Slow MA (21). Bearish momentum — trend is down.</p>
          </div>
        </div>
      </div>

      {/* The Glow Effect */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">✨ The Glow Effect</h2>
        <p className="text-gray-300 mb-4">
          The &quot;glow&quot; is created by plotting multiple lines with decreasing opacity behind the main MA. 
          This creates a neon-like visual effect that makes the trend direction instantly visible.
        </p>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <p className="text-purple-300 text-sm">
            <strong>🎨 Technical Detail:</strong> 3 additional plots at 60%, 80%, and 90% transparency with 
            widths of 8, 5, and 3 respectively, creating a layered glow effect.
          </p>
        </div>
      </div>

      {/* How to Read It */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">🎯 How to Read It</h2>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg">
            <span className="text-2xl">📈</span>
            <div>
              <h4 className="font-semibold text-white mb-1">Price Above Green MA</h4>
              <p className="text-gray-400">Strong bullish trend. Look for long entries on pullbacks to the MA.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg">
            <span className="text-2xl">📉</span>
            <div>
              <h4 className="font-semibold text-white mb-1">Price Below Red MA</h4>
              <p className="text-gray-400">Strong bearish trend. Look for short entries on rallies to the MA.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg">
            <span className="text-2xl">🔄</span>
            <div>
              <h4 className="font-semibold text-white mb-1">Color Change</h4>
              <p className="text-gray-400">When the glow switches from red to green (or vice versa), a BULLISH/BEARISH signal fires.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg">
            <span className="text-2xl">↔️</span>
            <div>
              <h4 className="font-semibold text-white mb-1">Price Hugging the MA</h4>
              <p className="text-gray-400">Sideways chop. Wait for a clear break and color confirmation before trading.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">✅ Best Practices</h2>
        
        <ul className="space-y-3 text-gray-300">
          <li className="flex gap-3">
            <span className="text-emerald-400">✓</span>
            <span><strong>Use as trend filter.</strong> Only take longs when green, shorts when red.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400">✓</span>
            <span><strong>Combine with levels.</strong> The MA + VWAP or PDH/PDL gives confluence for entries.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400">✓</span>
            <span><strong>Respect the MA as support/resistance.</strong> Price often bounces off the MA in trending markets.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400">✓</span>
            <span><strong>Check higher timeframes.</strong> If the 15m MA is green but 1H is red, be cautious on longs.</span>
          </li>
        </ul>
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
                <th className="py-3 text-gray-400 font-medium">Recommendation</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-3">Fast MA Length</td>
                <td className="py-3 text-emerald-400">9</td>
                <td className="py-3">9-12 for most traders. Lower = more signals, more noise.</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3">Slow MA Length</td>
                <td className="py-3 text-emerald-400">21</td>
                <td className="py-3">21 is standard. 50 for swing trading.</td>
              </tr>
              <tr>
                <td className="py-3">Momentum Bar Coloring</td>
                <td className="py-3 text-emerald-400">On</td>
                <td className="py-3">Colors candles to match trend. Helps visual clarity.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-emerald-500/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">📋 Quick Summary</h2>
        <ul className="space-y-2 text-gray-300">
          <li>• <strong className="text-green-400">Green glow</strong> = bullish momentum, look for longs</li>
          <li>• <strong className="text-red-400">Red glow</strong> = bearish momentum, look for shorts</li>
          <li>• <strong>Color change</strong> = potential trend reversal, wait for confirmation</li>
          <li>• <strong>Use as dynamic support/resistance</strong> in trending markets</li>
          <li>• <strong>Combine with other TouchGrass features</strong> for best results</li>
        </ul>
      </div>
    </LearnLayout>
  );
}
