import LearnLayout from "@/components/learn/LearnLayout";

export default function PDLevelsPage() {
  return (
    <LearnLayout
      title="Previous Day Levels (PDH/PDL)"
      description="Use PDH/PDL as key support and resistance. Know where yesterday's battle was fought and trade accordingly."
      icon="📊"
      difficulty="Beginner"
      readTime="5 min"
      prevGuide={{ slug: "orb", title: "Opening Range Breakout" }}
      nextGuide={{ slug: "vwap", title: "VWAP + Bands" }}
    >
      {/* What Are PD Levels */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">What Are Previous Day Levels?</h2>
        <p className="text-gray-300 mb-4">
          PDH (Previous Day High) and PDL (Previous Day Low) are the highest and lowest prices 
          from yesterday&apos;s trading session. These levels often act as significant support and resistance.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg text-center">
            <h4 className="font-bold text-orange-400 mb-2">PDH</h4>
            <p className="text-gray-300 text-sm">Previous Day High — acts as resistance</p>
          </div>
          <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg text-center">
            <h4 className="font-bold text-orange-400 mb-2">PDL</h4>
            <p className="text-gray-300 text-sm">Previous Day Low — acts as support</p>
          </div>
          <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg text-center">
            <h4 className="font-bold text-orange-400 mb-2">PD Mid</h4>
            <p className="text-gray-300 text-sm">Midpoint — equilibrium zone</p>
          </div>
        </div>
      </div>

      {/* Why They Matter */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">💡 Why PD Levels Matter</h2>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg">
            <span className="text-2xl">🏦</span>
            <div>
              <h4 className="font-semibold text-white mb-1">Institutional Memory</h4>
              <p className="text-gray-400">Big players remember where they traded yesterday. These levels have &quot;memory&quot; — orders often cluster around them.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg">
            <span className="text-2xl">🎯</span>
            <div>
              <h4 className="font-semibold text-white mb-1">Clear Reference Points</h4>
              <p className="text-gray-400">Everyone sees the same levels. This creates self-fulfilling prophecies as traders react at PDH/PDL.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg">
            <span className="text-2xl">📐</span>
            <div>
              <h4 className="font-semibold text-white mb-1">Range Context</h4>
              <p className="text-gray-400">Are we trading above or below yesterday&apos;s range? This tells you if buyers or sellers are in control.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How to Trade */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">🎯 How to Trade PD Levels</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h4 className="font-bold text-green-400 mb-3">📈 Bullish Scenarios</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• <strong>Bounce off PDL:</strong> Price tests PDL and holds → long entry</li>
              <li>• <strong>Break above PDH:</strong> Price closes above PDH → continuation long</li>
              <li>• <strong>Trading above PD Mid:</strong> Bullish bias for the day</li>
            </ul>
          </div>

          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <h4 className="font-bold text-red-400 mb-3">📉 Bearish Scenarios</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• <strong>Rejection at PDH:</strong> Price tests PDH and fails → short entry</li>
              <li>• <strong>Break below PDL:</strong> Price closes below PDL → continuation short</li>
              <li>• <strong>Trading below PD Mid:</strong> Bearish bias for the day</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Role Reversal */}
      <div className="bg-[#111118] border border-purple-500/30 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-purple-400">🔄 Role Reversal</h2>
        <p className="text-gray-300 mb-4">
          When a level breaks, it often flips its role:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li>• <strong>PDH broken:</strong> Old resistance becomes new support. Look to buy retests of PDH.</li>
          <li>• <strong>PDL broken:</strong> Old support becomes new resistance. Look to sell retests of PDL.</li>
        </ul>
        <div className="mt-4 p-3 bg-purple-500/10 rounded-lg">
          <p className="text-purple-300 text-sm">
            This is one of the most powerful concepts in technical analysis. Failed breakdowns and breakouts 
            lead to strong moves in the opposite direction.
          </p>
        </div>
      </div>

      {/* Combining with Other Features */}
      <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">🔗 Combining with Other Features</h2>
        
        <ul className="space-y-3 text-gray-300">
          <li className="flex gap-3">
            <span className="text-emerald-400">+</span>
            <span><strong>PD + ORB:</strong> When ORB H = PDH, that&apos;s a major level. Breakout = strong signal.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400">+</span>
            <span><strong>PD + VWAP:</strong> If price tests PDL and VWAP is right there, double confluence for support.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400">+</span>
            <span><strong>PD + Momentum MA:</strong> Trading above PDH with green MA = strong bullish day.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-emerald-400">+</span>
            <span><strong>PD + Divergence:</strong> Bearish divergence at PDH = high probability short setup.</span>
          </li>
        </ul>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">📋 Quick Summary</h2>
        <ul className="space-y-2 text-gray-300">
          <li>• <strong className="text-orange-400">PDH</strong> = Resistance. Watch for rejections or breakouts.</li>
          <li>• <strong className="text-orange-400">PDL</strong> = Support. Watch for bounces or breakdowns.</li>
          <li>• <strong className="text-orange-400">PD Mid</strong> = Equilibrium. Bias shifts above/below this line.</li>
          <li>• <strong>Broken levels flip roles</strong> — support becomes resistance and vice versa.</li>
          <li>• <strong>Combine with other features</strong> for higher probability setups.</li>
        </ul>
      </div>
    </LearnLayout>
  );
}
