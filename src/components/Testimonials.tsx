const testimonials = [
  {
    name: "Alex Chen",
    role: "Crypto Trader",
    avatar: "AC",
    rating: 5,
    content: "TouchGrass has completely transformed my trading. The opening range breakout signals are incredibly accurate. I've increased my win rate by 35% in just 2 months.",
  },
  {
    name: "Sarah Johnson",
    role: "Swing Trader",
    avatar: "SJ",
    rating: 5,
    content: "The RSI/MACD divergence detection is spot on. It catches reversals that I would have missed. Worth every penny of the subscription.",
  },
  {
    name: "Mike Williams",
    role: "Day Trader",
    avatar: "MW",
    rating: 5,
    content: "Best TradingView indicator I've used. The alerts are fast and reliable. Finally, an indicator that actually works as advertised.",
  },
  {
    name: "Emily Davis",
    role: "Algorithmic Trader",
    avatar: "ED",
    rating: 5,
    content: "The VWAP bands are perfect for my scalping strategy. Clean signals, no repaint, and great support team.",
  },
  {
    name: "James Park",
    role: "Crypto Investor",
    avatar: "JP",
    rating: 5,
    content: "Great for identifying entry points. The premium/discount levels help me avoid buying at the top. Highly recommended!",
  },
  {
    name: "Lisa Thompson",
    role: "Full-time Trader",
    avatar: "LT",
    rating: 5,
    content: "Pro version is a game changer. The backtesting feature alone is worth the upgrade. My systematic trading has never been better.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-card-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Trusted by <span className="text-gradient">10,000+</span> Traders
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of traders who have improved their results with TouchGrass.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-background border border-card-border rounded-xl hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-60">
          {["TradingView", "CryptoCompare", "CoinDesk", "CoinTelegraph", "Messari"].map((brand) => (
            <span key={brand} className="text-xl font-bold text-gray-500">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
