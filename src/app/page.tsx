import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import PricingSection from "@/components/PricingSection";
import MobileNav from "@/components/MobileNav";

const features = [
  {
    icon: "✨",
    title: "Neon Glow Momentum MA",
    description:
      "9-period SMA with dynamic glow. Green when bullish, red when bearish. See trend direction instantly.",
    tier: "Free",
  },
  {
    icon: "🎯",
    title: "Smart BULLISH/BEARISH Signals",
    description:
      "Powered by 9/21 MA crossover. Clear entry labels with exact price. No more guessing.",
    tier: "Free",
  },
  {
    icon: "🔄",
    title: "Momentum-Based Divergences",
    description:
      "ChartPrime-style detection using momentum RSI. Catches reversals other indicators miss.",
    tier: "Pro",
  },
  {
    icon: "📊",
    title: "Previous Day Levels",
    description:
      "PDH/PDL rectangle zone with dotted midline. Know exactly where yesterday ended.",
    tier: "Free",
  },
  {
    icon: "⏰",
    title: "Opening Range Breakout",
    description:
      "Auto-detected ORB zone with midline. Configurable session times. Catch the morning momentum.",
    tier: "Free",
  },
  {
    icon: "📈",
    title: "VWAP + Bands",
    description:
      "Institutional fair value with ±1 SD bands. See where the big players actually trade.",
    tier: "Pro",
  },
  {
    icon: "🎨",
    title: "Momentum Bar Coloring",
    description:
      "Candles tinted by trend direction. Instant visual feedback on market bias.",
    tier: "Free",
  },
  {
    icon: "🔔",
    title: "Smart Alerts",
    description:
      "Get notified on signals, divergences, and level breaks. Never miss a setup again.",
    tier: "Pro",
  },
];

const benefits = [
  {
    title: "See the Trend Instantly",
    description:
      "The neon glow MA changes color based on momentum. No analysis needed — green means go, red means caution.",
    icon: "👁️",
  },
  {
    title: "Catch Reversals Early",
    description:
      "Our momentum-based divergence detection spots exhaustion before price confirms. Same tech as premium indicators.",
    icon: "🔮",
  },
  {
    title: "Trade Key Levels",
    description:
      "PD levels, ORB zones, and VWAP bands — all the institutional levels in one clean view.",
    icon: "🏦",
  },
  {
    title: "Reduce Chart Clutter",
    description:
      "One indicator replaces five. Clean design with toggle controls. Show only what you need.",
    icon: "✨",
  },
];

const testimonials = [
  {
    name: "Alex T.",
    role: "Day Trader",
    quote:
      "The divergence detection alone paid for itself. Caught a reversal that saved my whole week.",
    avatar: "🧑‍💼",
  },
  {
    name: "Sarah M.",
    role: "Crypto Trader",
    quote:
      "Finally, one indicator that does it all. My charts are so much cleaner now.",
    avatar: "👩‍💻",
  },
  {
    name: "Marcus J.",
    role: "Futures Trader",
    quote: "The ORB + VWAP combo is lethal on ES. Win rate jumped noticeably.",
    avatar: "👨‍💼",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-lg">
                🌿
              </div>
              <span className="text-xl font-bold">TouchGrass</span>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {[
                ["/learn", "Learn"],
                ["#features", "Features"],
                ["#benefits", "Benefits"],
                ["#pricing", "Pricing"],
                ["#faq", "FAQ"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="hidden sm:block px-4 py-2 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 rounded-lg font-medium transition-colors"
              >
                Launch App
              </Link>
              <Link
                href="#pricing"
                className="hidden sm:block px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
              >
                Get Started
              </Link>
              {/* Mobile menu toggle — client component */}
              <MobileNav />
            </div>
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
            Momentum. Levels. Divergences.
            <br />
            <span className="text-emerald-400">One Clean Indicator.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            TouchGrass combines a neon glow momentum MA, smart signals,
            PD/ORB zones, VWAP bands, and ChartPrime-style divergence
            detection — all in one clutter-free package.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#pricing"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-xl font-semibold text-lg transition-colors"
            >
              🚀 Get TouchGrass
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 rounded-xl font-semibold text-lg transition-colors"
            >
              Launch App Free
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
                <span className="ml-4 text-gray-500 text-sm">
                  BTCUSD · 15m · TouchGrass v1.9
                </span>
                <span className="ml-auto text-emerald-400 text-xs font-medium">
                  ● LIVE SIGNALS
                </span>
              </div>
              {/* Simulated chart bars */}
              <div className="aspect-video bg-[#0a0a0f] rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-end justify-around px-6 pb-8 gap-1">
                  {[55,48,62,58,70,65,72,68,80,75,70,76,85,79,88,83,78,90,86,92].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        background: i > 13 ? 'rgba(16,185,129,0.7)' : i > 8 ? 'rgba(245,158,11,0.5)' : 'rgba(239,68,68,0.5)',
                      }}
                    />
                  ))}
                </div>
                {/* Signal labels */}
                <div className="absolute top-6 left-1/4 bg-emerald-500/90 text-white text-xs px-2 py-1 rounded font-bold">
                  BULLISH ▲ $65,420
                </div>
                <div className="absolute top-14 right-1/4 bg-red-500/80 text-white text-xs px-2 py-1 rounded font-bold">
                  BEARISH ▼ $67,100
                </div>
                {/* VWAP line simulation */}
                <div className="absolute bottom-1/3 left-0 right-0 h-px bg-blue-400/50" style={{transform: 'rotate(-2deg)'}} />
                <div className="absolute bottom-1/3 right-4 text-blue-400 text-[10px]">VWAP</div>
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
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      feature.tier === "Pro"
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
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
                <div className="text-4xl flex-shrink-0">{benefit.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — client component handles plan selection + checkout */}
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
          <PricingSection />
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
                <div className="flex mb-3 gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <span key={s} className="text-emerald-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — client component for accordion */}
      <section id="faq" className="py-20 px-4 bg-[#111118]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Trade with Clarity?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join traders who ditched the indicator clutter for one clean,
            powerful tool.
          </p>
          <Link
            href="#pricing"
            className="inline-block px-8 py-4 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-xl font-semibold text-lg transition-colors"
          >
            Get TouchGrass Now →
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
