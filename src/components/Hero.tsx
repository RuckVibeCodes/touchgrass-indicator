export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Now Available on TradingView
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Trade Crypto with{" "}
            <span className="text-gradient">Precision</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            The ultimate TradingView indicator combining premium/discount levels,
            opening range breakouts, VWAP bands, and RSI/MACD divergences with
            real-time buy/sell signals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#pricing"
              className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold text-lg transition-all hover:scale-105 glow-green"
            >
              Start Free Trial
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 border border-card-border hover:border-primary/50 text-foreground rounded-xl font-semibold text-lg transition-colors"
            >
              View Features
            </a>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl opacity-30" />
          <div className="relative bg-card-bg border border-card-border rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-card-border bg-background/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-background text-xs text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  BTC/USDT - TouchGrass Indicator
                </div>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex h-64 gap-4">
                <div className="flex flex-col justify-between text-xs text-gray-500 py-1">
                  <span>98,000</span>
                  <span>97,000</span>
                  <span>96,000</span>
                  <span>95,000</span>
                  <span>94,000</span>
                </div>
                
                <div className="flex-1 relative bg-background/30 rounded-lg overflow-hidden">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, #1e1e2e 19px, #1e1e2e 20px)`,
                  }} />
                  
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 240" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,200 Q50,180 100,190 T200,150 T300,170 T400,120"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,200 Q50,180 100,190 T200,150 T300,170 T400,120 L400,240 L0,240 Z"
                      fill="url(#chartGradient)"
                    />
                  </svg>
                  
                  <svg className="absolute inset-0 w-full h-full opacity-50">
                    <path d="M0,140 Q100,150 200,130 T400,100" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="4,4" />
                    <path d="M0,160 Q100,170 200,150 T400,120" fill="none" stroke="#6366f1" strokeWidth="1" />
                    <path d="M0,180 Q100,190 200,170 T400,140" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="4,4" />
                  </svg>
                  
                  <div className="absolute top-4 left-4 right-4 flex justify-between text-xs">
                    <span className="text-red-400 bg-red-500/10 px-2 py-1 rounded">Premium Zone</span>
                    <span className="text-green-400 bg-green-500/10 px-2 py-1 rounded">Discount Zone</span>
                  </div>
                  
                  <div className="absolute" style={{ left: '15%', top: '35%' }}>
                    <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-8 border-b-green-500" />
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-green-400 text-xs font-bold">BUY</div>
                  </div>
                  <div className="absolute" style={{ left: '60%', top: '45%' }}>
                    <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-8 border-b-green-500" />
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-green-400 text-xs font-bold">BUY</div>
                  </div>
                  
                  <div className="absolute" style={{ left: '80%', top: '25%' }}>
                    <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-t-red-500" />
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-red-400 text-xs font-bold">SELL</div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 w-16 h-24 bg-card-bg border border-card-border rounded-lg p-2">
                    <div className="text-xs text-gray-500 mb-1">RSI</div>
                    <div className="flex-1 flex flex-col justify-end gap-1">
                      <div className="h-8 bg-red-500/50 rounded" />
                      <div className="h-6 bg-red-500/30 rounded" />
                      <div className="h-4 bg-green-500/30 rounded" />
                      <div className="h-6 bg-green-500/50 rounded" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>00:00</span>
                <span>04:00</span>
                <span>08:00</span>
                <span>12:00</span>
                <span>16:00</span>
                <span>20:00</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
          {[
            { value: "10K+", label: "Active Traders" },
            { value: "$2B+", label: "Traded Volume" },
            { value: "99.2%", label: "Uptime" },
            { value: "4.9/5", label: "User Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
