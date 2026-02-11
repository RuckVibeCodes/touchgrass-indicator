"use client";

import Link from "next/link";
import { useState } from "react";

const guides = [
  {
    slug: "divergences",
    icon: "🔄",
    title: "Momentum Divergences",
    description: "Learn to spot reversals early with momentum-based RSI divergences. The same technique used by premium indicators.",
    topics: ["Bull vs Bear Divergence", "Momentum RSI", "Entry Timing", "False Signals"],
    difficulty: "Intermediate",
    readTime: "8 min"
  },
  {
    slug: "momentum-ma",
    icon: "✨",
    title: "Neon Glow Momentum MA",
    description: "Master the 9-period momentum MA with dynamic glow. Understand trend direction at a glance.",
    topics: ["MA Basics", "Color Signals", "Trend Confirmation", "Multi-Timeframe"],
    difficulty: "Beginner",
    readTime: "5 min"
  },
  {
    slug: "orb",
    icon: "⏰",
    title: "Opening Range Breakout",
    description: "Trade the first hour like a pro. Catch morning momentum with configurable ORB zones.",
    topics: ["ORB Setup", "Breakout Entries", "Stop Placement", "Best Timeframes"],
    difficulty: "Beginner",
    readTime: "6 min"
  },
  {
    slug: "pd-levels",
    icon: "📊",
    title: "Previous Day Levels",
    description: "Use PDH/PDL as key support and resistance. Know where yesterday's battle was fought.",
    topics: ["PDH/PDL Basics", "Level Breaks", "Fade vs Follow", "Combining with ORB"],
    difficulty: "Beginner",
    readTime: "5 min"
  },
  {
    slug: "vwap",
    icon: "📈",
    title: "VWAP + Bands",
    description: "Trade with the institutions. VWAP reveals fair value and the bands show extremes.",
    topics: ["VWAP Explained", "Standard Deviation Bands", "Mean Reversion", "Trend Days vs Chop"],
    difficulty: "Intermediate",
    readTime: "7 min"
  },
  {
    slug: "signals",
    icon: "🎯",
    title: "BULLISH/BEARISH Signals",
    description: "Understand the 9/21 MA crossover signals. When to trust them and when to wait.",
    topics: ["Crossover Mechanics", "Confirmation Rules", "Avoiding Whipsaws", "Alert Setup"],
    difficulty: "Beginner",
    readTime: "5 min"
  }
];

const cheatSheet = {
  slug: "cheat-sheet",
  icon: "📋",
  title: "TouchGrass Cheat Sheet",
  description: "Quick reference for all signals, levels, and setups. Download the PDF or bookmark this page.",
  topics: ["All Signals", "Entry Rules", "Exit Rules", "Risk Management"],
  difficulty: "All Levels",
  readTime: "3 min"
};

const quiz = {
  slug: "quiz",
  icon: "🎮",
  title: "Test Your Skills",
  description: "Interactive scenarios to practice reading TouchGrass signals. Can you make the right call?",
  topics: ["Signal Recognition", "Level Trades", "Divergence Spots", "Real Charts"],
  difficulty: "All Levels",
  readTime: "10 min"
};

export default function LearnPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to email service
    setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-lg">
                🌿
              </div>
              <span className="text-xl font-bold">TouchGrass</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/learn" className="text-emerald-400 font-medium">
                Learn
              </Link>
              <Link href="/#features" className="text-gray-400 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/#pricing" className="text-gray-400 hover:text-white transition-colors">
                Pricing
              </Link>
            </div>
            <Link
              href="/#pricing"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
            >
              Get Pro
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm mb-6">
            📚 Free Education
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Learn to Trade with <span className="text-emerald-400">TouchGrass</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Master every feature of the indicator. From beginner basics to advanced setups.
            Free guides, interactive quizzes, and a downloadable cheat sheet.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
          <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-emerald-400">6+</div>
            <div className="text-gray-400 text-sm">Free Guides</div>
          </div>
          <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-emerald-400">20+</div>
            <div className="text-gray-400 text-sm">Quiz Questions</div>
          </div>
          <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-emerald-400">∞</div>
            <div className="text-gray-400 text-sm">Always Free</div>
          </div>
        </div>
      </section>

      {/* Main Guides Grid */}
      <section className="py-16 px-4 bg-[#111118]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">📖 Feature Guides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/learn/${guide.slug}`}
                className="bg-[#0a0a0f] border border-gray-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{guide.icon}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      guide.difficulty === "Beginner" 
                        ? "bg-green-500/20 text-green-400"
                        : guide.difficulty === "Intermediate"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-purple-500/20 text-purple-400"
                    }`}>
                      {guide.difficulty}
                    </span>
                    <span className="text-gray-500 text-xs">{guide.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{guide.description}</p>
                <div className="flex flex-wrap gap-2">
                  {guide.topics.map((topic, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      {topic}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cheat Sheet & Quiz */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">🎯 Quick Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Cheat Sheet */}
            <Link
              href={`/learn/${cheatSheet.slug}`}
              className="bg-gradient-to-br from-emerald-500/10 to-[#111118] border border-emerald-500/30 rounded-xl p-8 hover:border-emerald-500/50 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">{cheatSheet.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold">{cheatSheet.title}</h3>
                  <p className="text-emerald-400 text-sm">Download PDF</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">{cheatSheet.description}</p>
              <div className="flex items-center gap-2 text-emerald-400">
                <span>View Cheat Sheet</span>
                <span>→</span>
              </div>
            </Link>

            {/* Quiz */}
            <Link
              href={`/learn/${quiz.slug}`}
              className="bg-gradient-to-br from-purple-500/10 to-[#111118] border border-purple-500/30 rounded-xl p-8 hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">{quiz.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold">{quiz.title}</h3>
                  <p className="text-purple-400 text-sm">Interactive Practice</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">{quiz.description}</p>
              <div className="flex items-center gap-2 text-purple-400">
                <span>Start Quiz</span>
                <span>→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-16 px-4 bg-[#111118]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">📬 Get Trading Tips</h2>
          <p className="text-gray-400 mb-6">
            Weekly setups, indicator tips, and strategy breakdowns. No spam, unsubscribe anytime.
          </p>
          {subscribed ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
              <span className="text-emerald-400 text-lg">✓ You&apos;re in! Check your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-[#0a0a0f] border border-gray-700 rounded-xl focus:border-emerald-500 focus:outline-none text-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Apply What You&apos;ve Learned?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Get the TouchGrass indicator and start trading with clarity.
          </p>
          <Link
            href="/#pricing"
            className="inline-block px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-lg transition-colors"
          >
            Get TouchGrass
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
        </div>
      </footer>
    </div>
  );
}
