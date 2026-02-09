export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            🌿 TouchGrass Indicator
          </h1>
          <p className="text-xl text-gray-300">
            AI-Powered Trading Analysis & Market Intelligence
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <EndpointCard
            title="📊 Chart Analysis"
            endpoint="/api/analyze"
            method="POST"
            description="Upload a chart screenshot for AI-powered technical analysis. Get trend direction, key levels, signals, and trade recommendations."
            example={{
              image: "base64...",
              symbol: "BTCUSDT",
              timeframe: "4h"
            }}
          />

          <EndpointCard
            title="☀️ Daily Briefing"
            endpoint="/api/briefing"
            method="GET"
            description="Get a morning market briefing covering BTC, ETH, major altcoins, sentiment, and key events to watch."
          />

          <EndpointCard
            title="💓 Market Pulse"
            endpoint="/api/pulse"
            method="GET"
            description="Quick market sentiment check. Fear/greed indicator, trending assets, and current market mood."
          />

          <EndpointCard
            title="📝 Trade Journal"
            endpoint="/api/journal"
            method="GET/POST/PATCH"
            description="Log and track your trades. AI analysis of patterns and mistakes when you have enough data."
            example={{
              symbol: "BTCUSDT",
              side: "long",
              entryPrice: 42000,
              notes: "Breakout trade"
            }}
          />

          <EndpointCard
            title="🔔 TradingView Webhook"
            endpoint="/api/webhook/tradingview"
            method="POST"
            description="Receive and store TradingView alerts. Supports JSON and plain text formats."
            example={{
              symbol: "BTCUSDT",
              action: "buy",
              price: 42500
            }}
          />

          <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-2">🚀 Getting Started</h3>
            <div className="text-gray-300 text-sm space-y-2">
              <p>All endpoints return JSON responses.</p>
              <p>Chart analysis accepts base64 images or URLs.</p>
              <p>Journal supports full CRUD + AI analysis.</p>
              <p className="text-green-400 font-medium mt-4">
                Powered by GPT-4o-mini for cost efficiency
              </p>
            </div>
          </div>
        </div>

        <footer className="text-center mt-16 text-gray-500 text-sm">
          <p>TouchGrass Indicator • Remember to go outside sometimes 🌱</p>
        </footer>
      </div>
    </div>
  );
}

interface EndpointCardProps {
  title: string;
  endpoint: string;
  method: string;
  description: string;
  example?: Record<string, unknown>;
}

function EndpointCard({ title, endpoint, method, description, example }: EndpointCardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700 hover:border-green-500/50 transition-colors">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-1 bg-green-600/30 text-green-400 text-xs rounded font-mono">
          {method}
        </span>
        <code className="text-sm text-gray-400">{endpoint}</code>
      </div>
      <p className="text-gray-300 text-sm mb-4">{description}</p>
      {example && (
        <pre className="bg-gray-900/50 p-3 rounded text-xs text-gray-400 overflow-x-auto">
          {JSON.stringify(example, null, 2)}
        </pre>
      )}
    </div>
  );
}
