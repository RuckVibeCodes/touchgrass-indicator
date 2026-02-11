import LearnLayout from "@/components/learn/LearnLayout";

export default function VWAPPage() {
  return (
    <LearnLayout
      title="VWAP + Standard Deviation Bands"
      description="Trade with the institutions. VWAP reveals fair value and the bands show extremes worth fading."
      icon="📈"
      difficulty="Intermediate"
      readTime="7 min"
      prevGuide={{ slug: "pd-levels", title: "Previous Day Levels" }}
      nextGuide={{ slug: "signals", title: "BULLISH/BEARISH Signals" }}
    >
      {/* What Is VWAP */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">What Is VWAP?</h2>
        <p className="text-gray-300 mb-4">
          VWAP (Volume Weighted Average Price) is the average price weighted by volume throughout the trading day. 
          It resets at market open and represents the &quot;fair value&quot; of the asset for that session.
        </p>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
          <p className="text-emerald-400">
            💡 <strong>Why Institutions Use VWAP:</strong> Big players use VWAP as a benchmark. They aim to 
            buy below VWAP and sell above it. When you trade with VWAP awareness, you&apos;re trading with the institutions.
          </p>
        </div>
      </div>

      {/* The Math */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">🧮 How It&apos;s Calculated</h2>
        
        <div className="p-4 bg-gray-800/50 rounded-lg font-mono text-center mb-4">
          <span className="text-cyan-400">VWAP = Σ(Price × Volume) / Σ(Volume)</span>
        </div>
        
        <p className="text-gray-300">
          Unlike a simple moving average, VWAP gives more weight to prices where more volume traded. 
          This makes it a more accurate representation of where &quot;real money&quot; changed hands.
        </p>
      </div>

      {/* VWAP Bands */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">📊 Standard Deviation Bands</h2>
        <p className="text-gray-300 mb-4">
          TouchGrass plots VWAP with ±1 standard deviation bands. These bands show when price has moved 
          &quot;too far&quot; from fair value.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-center">
            <h4 className="font-bold text-cyan-400 mb-2">Upper Band (+1σ)</h4>
            <p className="text-gray-300 text-sm">Price is extended. Potential mean reversion short zone.</p>
          </div>
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center">
            <h4 className="font-bold text-yellow-400 mb-2">VWAP</h4>
            <p className="text-gray-300 text-sm">Fair value. Acts as dynamic support/resistance.</p>
          </div>
          <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-center">
            <h4 className="font-bold text-cyan-400 mb-2">Lower Band (-1σ)</h4>
            <p className="text-gray-300 text-sm">Price is compressed. Potential mean reversion long zone.</p>
          </div>
        </div>
      </div>

      {/* How to Trade */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">🎯 How to Trade VWAP</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-emerald-400 mb-3">1. Trend Days</h3>
            <p className="text-gray-300 mb-2">
              On strong trend days, price stays on one side of VWAP and uses it as support (uptrend) or resistance (downtrend).
            </p>
            <ul className="text-gray-400 text-sm space-y-1 ml-4">
              <li>• <strong>Bullish trend:</strong> Buy dips to VWAP, target upper band</li>
              <li>• <strong>Bearish trend:</strong> Sell rallies to VWAP, target lower band</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-3">2. Mean Reversion Days</h3>
            <p className="text-gray-300 mb-2">
              On choppy/range days, price oscillates around VWAP. The bands become targets and fade zones.
            </p>
            <ul className="text-gray-400 text-sm space-y-1 ml-4">
              <li>• <strong>At upper band:</strong> Look for shorts back to VWAP</li>
              <li>• <strong>At lower band:</strong> Look for longs back to VWAP</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">3. VWAP as Reference</h3>
            <p className="text-gray-300 mb-2">
              Use VWAP to gauge who&apos;s in control. Above VWAP = buyers winning. Below VWAP = sellers winning.
            </p>
          </div>
        </div>
      </div>

      {/* Day Type Recognition */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">📅 Recognizing the Day Type</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h4 className="font-bold text-green-400 mb-3">📈 Trend Day Signs</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Opens near HOD or LOD</li>
              <li>• Rarely touches VWAP after first hour</li>
              <li>• Momentum MA stays one color all day</li>
              <li>• Clear ORB breakout with follow-through</li>
            </ul>
          </div>

          <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <h4 className="font-bold text-purple-400 mb-3">↔️ Range Day Signs</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Opens near VWAP</li>
              <li>• Crosses VWAP multiple times</li>
              <li>• MA color flips back and forth</li>
              <li>• ORB breakout fails and reverses</li>
            </ul>
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
                <td className="py-3">Show VWAP</td>
                <td className="py-3 text-emerald-400">On</td>
                <td className="py-3">The main VWAP line</td>
              </tr>
              <tr>
                <td className="py-3">Show VWAP Bands</td>
                <td className="py-3 text-emerald-400">On</td>
                <td className="py-3">±1 standard deviation bands</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">📋 Quick Summary</h2>
        <ul className="space-y-2 text-gray-300">
          <li>• <strong className="text-yellow-400">VWAP</strong> = Fair value for the day. Institutional benchmark.</li>
          <li>• <strong className="text-cyan-400">Above VWAP</strong> = Bullish control. Look for longs.</li>
          <li>• <strong className="text-cyan-400">Below VWAP</strong> = Bearish control. Look for shorts.</li>
          <li>• <strong>Bands</strong> = ±1 standard deviation. Fade extremes on range days.</li>
          <li>• <strong>First, identify the day type</strong> — trend days trade WITH VWAP, range days fade TO VWAP.</li>
        </ul>
      </div>
    </LearnLayout>
  );
}
