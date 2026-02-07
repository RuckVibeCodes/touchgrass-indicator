"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

interface TradeIdea {
  setupName: string;
  tradeType: string;
  direction: "Long" | "Short";
  entryZone: string;
  invalidationLevel: string;
  targets: string[];
  reasoning: string;
}

interface ChartAnalysis {
  marketStructure: string;
  sentiment: "Buy" | "Sell" | "Range";
  liquidityZones: string[];
  keyLevels: {
    pdh?: string;
    pdl?: string;
    vwap?: string;
    orbHigh?: string;
    orbLow?: string;
  };
  riskNotes: string[];
  tradeIdeas: TradeIdea[];
  timestamp: string;
}

export default function AnalyzePage() {
  const [image, setImage] = useState<string | null>(null);
  const [tradeType, setTradeType] = useState<string>("Day trade");
  const [symbol, setSymbol] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ChartAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setAnalysis(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setAnalysis(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image,
          tradeType,
          symbol: symbol || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Analysis failed");
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const sentimentColor = {
    Buy: "text-emerald-400",
    Sell: "text-red-400",
    Range: "text-yellow-400",
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0a0a0f]/80 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-lg">
                🌿
              </div>
              <span className="text-xl font-bold">TouchGrass</span>
            </Link>
            <Link
              href="/#pricing"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
            >
              Get Pro
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            AI Chart Analysis
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Upload a chart screenshot and get instant AI analysis with key levels,
            trade ideas, and risk notes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            {/* Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                image
                  ? "border-emerald-500/50 bg-emerald-500/5"
                  : "border-gray-700 hover:border-gray-600"
              }`}
            >
              {image ? (
                <div className="space-y-4">
                  <img
                    src={image}
                    alt="Chart"
                    className="max-h-64 mx-auto rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setImage(null);
                      setAnalysis(null);
                    }}
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Remove image
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-5xl">📊</div>
                  <div>
                    <p className="text-lg font-medium">
                      Drop your chart here
                    </p>
                    <p className="text-sm text-gray-500">
                      or click to browse
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Trade Type
                </label>
                <select
                  value={tradeType}
                  onChange={(e) => setTradeType(e.target.value)}
                  className="w-full bg-[#111118] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Scalp">Scalp</option>
                  <option value="Day trade">Day Trade</option>
                  <option value="Swing trade">Swing Trade</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Symbol (optional)
                </label>
                <input
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  placeholder="BTC, ETH, ES..."
                  className="w-full bg-[#111118] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={!image || loading}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-colors ${
                !image || loading
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                "Analyze Chart"
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                {error}
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {analysis ? (
              <>
                {/* Sentiment */}
                <div className="bg-[#111118] border border-gray-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Market Sentiment</h3>
                    <span
                      className={`text-2xl font-bold ${
                        sentimentColor[analysis.sentiment]
                      }`}
                    >
                      {analysis.sentiment}
                    </span>
                  </div>
                  <p className="text-gray-400">{analysis.marketStructure}</p>
                </div>

                {/* Key Levels */}
                <div className="bg-[#111118] border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Key Levels</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {analysis.keyLevels.pdh && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">PDH</span>
                        <span className="text-emerald-400 font-mono">
                          {analysis.keyLevels.pdh}
                        </span>
                      </div>
                    )}
                    {analysis.keyLevels.pdl && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">PDL</span>
                        <span className="text-red-400 font-mono">
                          {analysis.keyLevels.pdl}
                        </span>
                      </div>
                    )}
                    {analysis.keyLevels.vwap && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">VWAP</span>
                        <span className="text-purple-400 font-mono">
                          {analysis.keyLevels.vwap}
                        </span>
                      </div>
                    )}
                    {analysis.keyLevels.orbHigh && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">ORB High</span>
                        <span className="text-lime-400 font-mono">
                          {analysis.keyLevels.orbHigh}
                        </span>
                      </div>
                    )}
                    {analysis.keyLevels.orbLow && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">ORB Low</span>
                        <span className="text-orange-400 font-mono">
                          {analysis.keyLevels.orbLow}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Liquidity Zones */}
                <div className="bg-[#111118] border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Liquidity Zones</h3>
                  <ul className="space-y-2">
                    {analysis.liquidityZones.map((zone, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300">
                        <span className="text-yellow-400">◆</span>
                        {zone}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Trade Ideas */}
                {analysis.tradeIdeas.length > 0 && (
                  <div className="bg-[#111118] border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Trade Ideas</h3>
                    <div className="space-y-4">
                      {analysis.tradeIdeas.map((idea, i) => (
                        <div
                          key={i}
                          className="border border-gray-700 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">{idea.setupName}</span>
                            <span
                              className={`px-2 py-1 rounded text-sm font-medium ${
                                idea.direction === "Long"
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {idea.direction}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                            <div>
                              <span className="text-gray-500">Entry: </span>
                              <span className="text-gray-300">{idea.entryZone}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Stop: </span>
                              <span className="text-red-400">
                                {idea.invalidationLevel}
                              </span>
                            </div>
                          </div>
                          <div className="text-sm mb-3">
                            <span className="text-gray-500">Targets: </span>
                            <span className="text-emerald-400">
                              {idea.targets.join(" → ")}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">{idea.reasoning}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Risk Notes */}
                {analysis.riskNotes.length > 0 && (
                  <div className="bg-[#111118] border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4 text-yellow-400">
                      ⚠️ Risk Notes
                    </h3>
                    <ul className="space-y-2">
                      {analysis.riskNotes.map((note, i) => (
                        <li key={i} className="text-gray-400">
                          • {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-[#111118] border border-gray-800 rounded-xl p-12 text-center">
                <div className="text-5xl mb-4">🔮</div>
                <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
                <p className="text-gray-400">
                  Upload a chart screenshot to get AI-powered analysis with
                  TouchGrass indicator levels.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Pro CTA */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-emerald-500/20 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Want unlimited analysis + the full indicator?
          </h2>
          <p className="text-gray-400 mb-6">
            Pro members get unlimited AI analysis, the TouchGrass TradingView
            indicator, and priority support.
          </p>
          <Link
            href="/#pricing"
            className="inline-block px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-colors"
          >
            Upgrade to Pro
          </Link>
        </div>
      </main>
    </div>
  );
}
