"use client";

import Link from "next/link";

const features = [
  {
    icon: "✨",
    title: "Neon Glow Momentum MA",
    description: "9-period SMA with dynamic glow effect. Green when bullish, red when bearish. See trend direction at a glance.",
    tier: "Basic"
  },
  {
    icon: "🎯",
    title: "Smart BULLISH/BEARISH Signals",
    description: "Powered by 9/21 MA crossover. Clear labels with exact price. No more guessing entries.",
    tier: "Basic"
  },
  {
    icon: "🔄",
    title: "Momentum-Based Divergences",
    description: "ChartPrime-style detection using momentum RSI. Catches reversals other indicators miss.",
    tier: "Pro"
  },
  {
    icon: "📊",
    title: "Previous Day Levels",
    description: "PDH/PDL rectangle zone with dotted midline. Know exactly where yesterday ended.",
    tier: "Basic"
  },
  {
    icon: "⏰",
    title: "Opening Range Breakout",
    description: "Auto-detected ORB zone with midline. Configurable session times. Catch the morning momentum.",
    tier: "Basic"
  },
  {
    icon: "📈",
    title: "VWAP + Bands",
    description: "Institutional fair value with ±1 standard deviation bands. See where the big players trade.",
    tier: "Pro"
  },
  {
    icon: "🎨",
    title: "Momentum Bar Coloring",
    description: "Candles tinted by trend direction. Instant visual feedback on market bias.",
    tier: "Basic"
  },
  {
    icon: "🔔",
    title: "Smart Alerts",
    description: "Get notified on signals, divergences, and level breaks. Never miss a setup.",
    tier: "Pro"
  }
];

const benefits = [
  {
    title: "See the Trend Instantly",
    description: "The neon glow MA changes color based on momentum. No analysis needed — green means go, red means caution.",
    icon: "👁️"
  },
  {
    title: "Catch Reversals Early",
    description: "Our momentum-based divergence detection spots exhaustion before price confirms. Same tech as premium indicators.",
    icon: "🔮"
  },
  {
    title: "Trade Key Levels",
    description: "PD levels, ORB zones, and VWAP bands — all the institutional levels in one clean view.",
    icon: "🏦"
  },
  {
    title: "Reduce Chart Clutter",
    description: "One indicator replaces 5. Clean design with toggle controls. Show only what you need.",
    icon: "✨"
  }
];

const testimonials = [
  {
    name: "Alex T.",
    role: "Day Trader",
    quote: "The divergence detection alone paid for itself. Caught a reversal that saved my week.",
    avatar: "🧑‍💼"
  },
  {
    name: "Sarah M.",
    role: "Crypto Trader",
    quote: "Finally, one indicator that does it all. My charts are so much cleaner now.",
    avatar: "👩‍💻"
  },
  {
    name: "Marcus J.",
    role: "Futures Trader",
    quote: "The ORB + VWAP combo is lethal on ES. Win rate jumped noticeably.",
    avatar: "👨‍💼"
  }
];

const faqs = [
  {
    q: "What markets does this work on?",
    a: "TouchGrass works on any market available on TradingView — crypto, forex, stocks, futures, and indices."
  },
  {
    q: "What is included?",
    a: "Everything. One plan, all features: momentum MA, divergences, PD/ORB levels, VWAP bands, signals, AI chart analysis, and priority support. No gated features."
  },
  {
    q: "How does the divergence detection work?",
    a: "We use momentum-based RSI (like ChartPrime) instead of regular RSI. This catches divergences earlier and more reliably than traditional methods."
  },
  {
    q: "Do you offer refunds?",
    a: "Yes, we offer a 7-day money-back guarantee if you are not satisfied. No questions asked."
  },
  {
    q: "How do I access the indicator after purchase?",
    a: "After purchase, you receive access to the invite-only TradingView script. Add it to your chart and you are ready to trade."
  },
  {
    q: "Can I use this for scalping?",
    a: "Absolutely. The momentum MA and ORB zones are perfect for scalping. Many users run it on 1-5 minute charts."
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-lg">
                🌿
              </div>
              <span className="text-xl font-bold">TouchGrass</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-gray-400 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="#benefits" className="text-gray-400 hover:text-white transition-colors">
                Benefits
              </Link>
              <Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="#faq" className="text-gray-400 hover:text-white transition-colors">
                FAQ
              </Link>
            </div>
            <Link
              href="#pricing"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm mb-6">
            🔥 The all-in-one TradingView indicator
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Momentum. Levels. Divergences.<br />
            <span className="text-emerald-400">One Clean Indicator.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            TouchGrass combines a neon glow momentum MA, smart signals, PD/ORB zones, 
            VWAP bands, and ChartPrime-style divergence detection — all in one clutter-free package.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#pricing"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-lg transition-colors"
            >
              Get TouchGrass
            </Link>
            <Link
              href="/analyze"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition-colors"
            >
              🔮 Try AI Analysis Free
            </Link>
          </div>
          
          {/* Chart mockup */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-b from-emerald-500/20 to-transparent absolute inset-0 blur-3xl" />
            <div className="relative bg-[#111118] border border-gray-800 rounded-2xl p-4 max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-gray-500 text-sm">BTCUSD · 15m · TouchGrass v1.0</span>
              </div>
              <div className="aspect-video bg-[#0a0a0f] rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-gray-500">Chart Preview Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-[#111118]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need, Nothing You Don&apos;t
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              8 powerful features. One indicator. Zero clutter.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-[#0a0a0f] border border-gray-800 rounded-xl p-6 hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{feature.icon}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    feature.tier === "Pro" 
                      ? "bg-purple-500/20 text-purple-400" 
                      : "bg-gray-700 text-gray-300"
                  }`}>
                    {feature.tier}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Traders Choose TouchGrass
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex gap-4">
                <div className="text-4xl">{benefit.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-[#111118]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              One Plan. Everything Included.
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              No tiers. No gated features. Just the full indicator.
            </p>
          </div>
          
          <div className="max-w-xl mx-auto">
            <div className="bg-gradient-to-b from-emerald-500/10 to-[#0a0a0f] border border-emerald-500/30 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-sm font-medium rounded-full">
                Full Access
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">TouchGrass</h3>
                <p className="text-gray-400">The only crypto indicator you need</p>
              </div>
              
              {/* Pricing Options */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-[#0a0a0f] border border-gray-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">$19</div>
                  <div className="text-gray-400 text-sm">/month</div>
                </div>
                <div className="bg-[#0a0a0f] border border-emerald-500 rounded-xl p-4 text-center relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-emerald-500 text-white text-xs font-medium rounded">
                    Save 35%
                  </div>
                  <div className="text-2xl font-bold">$149</div>
                  <div className="text-gray-400 text-sm">/year</div>
                </div>
                <div className="bg-[#0a0a0f] border border-gray-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">$349</div>
                  <div className="text-gray-400 text-sm">lifetime</div>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Neon Glow Momentum MA",
                  "BULLISH/BEARISH Signals",
                  "Momentum-Based Divergences",
                  "Previous Day Levels (PDH/PDL)",
                  "Opening Range Breakout",
                  "VWAP + StdDev Bands",
                  "Momentum Bar Coloring",
                  "AI Chart Analysis",
                  "All Smart Alerts",
                  "Priority Support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-lg transition-colors">
                Get TouchGrass
              </button>
              <p className="text-center text-gray-500 text-sm mt-4">
                7-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Traders Love TouchGrass
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join traders who have upgraded their charts.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-[#111118] border border-gray-800 rounded-xl p-6"
              >
                <p className="text-gray-300 mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-[#111118]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-[#0a0a0f] border border-gray-800 rounded-xl p-6"
              >
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Trade with Clarity?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join traders who ditched the indicator clutter for one clean, powerful tool.
          </p>
          <Link
            href="#pricing"
            className="inline-block px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-lg transition-colors"
          >
            Get TouchGrass Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌿</span>
            <span className="font-semibold">TouchGrass</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2026 Blockstone Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
