import LearnLayout from "@/components/learn/LearnLayout";

export default function ORBPage() {
  return (
    <LearnLayout
      title="Opening Range Breakout (ORB)"
      description="Trade the first hour like a pro. Catch morning momentum with configurable ORB zones that persist until the next session."
      icon="⏰"
      difficulty="Beginner"
      readTime="6 min"
      prevGuide={{ slug: "momentum-ma", title: "Neon Glow Momentum MA" }}
      nextGuide={{ slug: "pd-levels", title: "Previous Day Levels" }}
    >
      {/* What Is ORB */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">What Is Opening Range Breakout?</h2>
        <p className="text-gray-300 mb-4">
          The Opening Range is the high and low established during the first X minutes of the trading session. 
          A breakout above or below this range often leads to a sustained move in that direction.
        </p>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
          <p className="text-emerald-400">
            💡 <strong>Why ORB Works:</strong> The open is when institutional traders establish their positions 
            for the day. The range they create becomes a battleground — the breakout reveals who won.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">🎯 How TouchGrass ORB Works</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-lime-500 flex items-center justify-center text-black font-bold shrink-0">1</div>
            <div>
              <h4 className="font-semibold text-white mb-1">Session Starts (9:30 EST default)</h4>
              <p className="text-gray-400">The indicator begins tracking the high and low. Box draws in real-time.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-lime-500 flex items-center justify-center text-black font-bold shrink-0">2</div>
            <div>
              <h4 className="font-semibold text-white mb-1">ORB Period Ends (9:45 default, configurable)</h4>
              <p className="text-gray-400">High and low are locked in. Labels show exact ORB H and ORB L values.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-lime-500 flex items-center justify-center text-black font-bold shrink-0">3</div>
            <div>
              <h4 className="font-semibold text-white mb-1">Box Persists Until Next 9:30</h4>
              <p className="text-gray-400">The ORB zone stays visible all day (and overnight) until the next session opens.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How to Trade */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">📈 How to Trade ORB</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h4 className="font-bold text-green-400 mb-3">🚀 Breakout Long</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Price breaks ABOVE ORB High</li>
              <li>• Wait for candle CLOSE above</li>
              <li>• Entry: On close or retest of ORB H</li>
              <li>• Stop: Below ORB midline or ORB Low</li>
              <li>• Target: 1-2x the ORB range height</li>
            </ul>
          </div>

          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <h4 className="font-bold text-red-400 mb-3">📉 Breakout Short</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Price breaks BELOW ORB Low</li>
              <li>• Wait for candle CLOSE below</li>
              <li>• Entry: On close or retest of ORB L</li>
              <li>• Stop: Above ORB midline or ORB High</li>
              <li>• Target: 1-2x the ORB range height</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
          <h4 className="font-bold text-purple-400 mb-2">🔄 Fade Strategy (Advanced)</h4>
          <p className="text-gray-300 text-sm">
            On range-bound days, the ORB levels act as support/resistance. Fade the extremes when price 
            touches ORB H or ORB L but fails to break. Look for rejection wicks and use the midline as target.
          </p>
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
                <th className="py-3 text-gray-400 font-medium">Options</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-3">ORB Session</td>
                <td className="py-3 text-emerald-400">0930-0945</td>
                <td className="py-3">15-60 min window. Common: 0930-1000, 0930-1030</td>
              </tr>
              <tr>
                <td className="py-3">Timezone</td>
                <td className="py-3 text-emerald-400">America/New_York</td>
                <td className="py-3">Chicago, Los Angeles, London, UTC</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-300 text-sm">
            💡 <strong>Tip:</strong> For crypto (24/7 markets), use a custom session like 0000-0100 UTC 
            or align with major market opens (London 0800, NY 1300 UTC).
          </p>
        </div>
      </div>

      {/* Best Practices */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">✅ Best Practices</h2>
        
        <ul className="space-y-3 text-gray-300">
          <li className="flex gap-3">
            <span className="text-emerald-400">✓</span>
            <span><strong>Wait for confirmation.</strong> Don&apos;t enter on the first wick above/below. Wait for a candle close.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400">✓</span>
            <span><strong>Check the MA color.</strong> Breakout longs work best when the Momentum MA is green.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400">✓</span>
            <span><strong>Use the midline.</strong> It often acts as the first support/resistance after a breakout.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400">✓</span>
            <span><strong>Combine with PD levels.</strong> If ORB H aligns with PDH, that&apos;s a stronger level.</span>
          </li>
        </ul>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-lime-500/10 to-emerald-500/10 border border-lime-500/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">📋 Quick Summary</h2>
        <ul className="space-y-2 text-gray-300">
          <li>• <strong>ORB</strong> = High and Low of first X minutes of session</li>
          <li>• <strong>Breakout above ORB H</strong> = potential long opportunity</li>
          <li>• <strong>Breakout below ORB L</strong> = potential short opportunity</li>
          <li>• <strong>Always wait for confirmation</strong> (candle close)</li>
          <li>• <strong>Box persists until next 9:30</strong> — levels stay relevant all day</li>
        </ul>
      </div>
    </LearnLayout>
  );
}
