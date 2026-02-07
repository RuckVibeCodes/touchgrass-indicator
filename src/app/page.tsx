"use client";

import Link from "next/link";

const features = [
  {
    icon: "📊",
    title: "Previous Day Levels",
    description: "PDH, PDL, and midline plotted automatically. Know your key liquidity zones.",
    tier: "Basic"
  },
  {
    icon: "⏰",
    title: "Opening Range Breakout",
    description: "Configurable ORB window (default 9:30-9:45 ET). Catch the opening impulse.",
    tier: "Basic"
  },
  {
    icon: "📈",
    title: "VWAP + Bands",
    description: "Session VWAP with 1 & 2 standard deviation bands. Institutional fair value.",
    tier: "Basic"
  },
  {
    icon: "🔄",
    title: "RSI Divergences",
    description: "Regular and hidden divergences auto-detected. Spot reversals before they happen.",
    tier: "Pro"
  },
  {
    icon: "⚡",
    title: "Buy/Sell Signals",
    description: "Combined signal logic: ORB breaks, VWAP crosses, PD level sweeps.",
    tier: "Pro"
  },
  {
    icon: "🔔",
    title: "Smart Alerts",
    description: "12 configurable alerts for every key event. Never miss a setup.",
    tier: "Basic"
  }
];

const testimonials = [
  {
    name: "Alex T.",
    role: "Day Trader",
    quote: "Finally, one indicator that replaces 5 others on my chart. Clean, fast, and accurate.",
    avatar: "🧑‍💼"
  },
  {
    name: "Sarah M.",
    role: "Crypto Trader",
    quote: "The divergence detection alone is worth the Pro upgrade. Caught 3 reversals last week.",
    avatar: "👩‍💻"
  },
  {
    name: "Marcus J.",
    role: "Forex Trader",
    quote: "ORB + VWAP combo is lethal on ES futures. My win rate jumped 15%.",
    avatar: "👨‍💼"
  }
];

const faqs = [
  {
    q: "What markets does this work on?",
    a: "TouchGrass works on any market available on TradingView — crypto, forex, stocks, futures, and indices."
  },
  {
    q: "What's the difference between Basic and Pro?",
    a: "Basic includes PD levels, ORB, VWAP with bands, and all alerts. Pro adds hidden divergences, buy/sell signals, trend bands, and session highlights."
  },
  {
    q: "Is this a strategy or an indicator?",
    a: "TouchGrass is an indicator that provides levels, signals, and alerts. You make the trading decisions - we give you the edge."
  },
  {
    q: "Do you offer refunds?",
    a: "Yes, we offer a 7-day money-back guarantee if you're not satisfied. No questions asked."
  },
  {
    q: "How do I access the indicator after purchase?",
    a: "After purchase, you receive access to the invite-only TradingView script. Add it to your chart and you are ready to trade."
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
              <Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="#testimonials" className="text-gray-400 hover:text-white transition-colors">
                Testimonials
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
            🚀 Now available on TradingView
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Trade with Structure,<br />
            <span className="text-emerald-400">Not Emotion</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            The all-in-one TradingView indicator combining PD levels, ORB, VWAP, divergences, 
            and smart signals. Everything you need. Nothing you don&apos;t.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#pricing"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-lg transition-colors"
            >
              Start Trading Smarter
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold text-lg transition-colors"
            >
              See Features
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
              Everything You Need to Trade
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              One indicator. Six powerful features. Zero chart clutter.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Choose monthly flexibility or save with lifetime access.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic */}
            <div className="bg-[#111118] border border-gray-800 rounded-2xl p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Basic</h3>
                <p className="text-gray-400">Essential levels and alerts</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">or $499 lifetime</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Previous Day Levels (PDH/PDL/Mid)",
                  "Opening Range Breakout",
                  "VWAP + 1 StdDev Bands",
                  "Regular Divergences",
                  "All 12 Alerts",
                  "Email Support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-colors">
                Get Basic
              </button>
            </div>

            {/* Pro */}
            <div className="bg-gradient-to-b from-emerald-500/10 to-[#111118] border border-emerald-500/30 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-sm font-medium rounded-full">
                Most Popular
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-gray-400">Full trading arsenal</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$79</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">or $799 lifetime</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Basic",
                  "Hidden Divergences",
                  "Buy/Sell Signals",
                  "Trend Bands",
                  "Session Highlights",
                  "VWAP 2 StdDev Bands",
                  "Priority Support"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-emerald-400">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-colors">
                Get Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-[#111118]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Traders Love TouchGrass
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join hundreds of traders who have upgraded their charts.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-[#0a0a0f] border border-gray-800 rounded-xl p-6"
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
      <section id="faq" className="py-20 px-4">
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
                className="bg-[#111118] border border-gray-800 rounded-xl p-6"
              >
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#111118] to-[#0a0a0f]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Trade with an Edge?
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
