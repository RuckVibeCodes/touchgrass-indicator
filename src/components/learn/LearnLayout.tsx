"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface LearnLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  icon: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  readTime: string;
  prevGuide?: { slug: string; title: string };
  nextGuide?: { slug: string; title: string };
}

export default function LearnLayout({
  children,
  title,
  description,
  icon,
  difficulty,
  readTime,
  prevGuide,
  nextGuide
}: LearnLayoutProps) {
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
                ← Back to Learn
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
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/learn" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">
            ← Back to all guides
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">{icon}</span>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  difficulty === "Beginner" 
                    ? "bg-green-500/20 text-green-400"
                    : difficulty === "Intermediate"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : difficulty === "Advanced"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-purple-500/20 text-purple-400"
                }`}>
                  {difficulty}
                </span>
                <span className="text-gray-500 text-sm">{readTime} read</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
            </div>
          </div>
          <p className="text-xl text-gray-400">{description}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert prose-emerald max-w-none">
            {children}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto flex justify-between">
          {prevGuide ? (
            <Link
              href={`/learn/${prevGuide.slug}`}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <span>←</span>
              <div>
                <div className="text-xs text-gray-500">Previous</div>
                <div>{prevGuide.title}</div>
              </div>
            </Link>
          ) : <div />}
          {nextGuide ? (
            <Link
              href={`/learn/${nextGuide.slug}`}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-right"
            >
              <div>
                <div className="text-xs text-gray-500">Next</div>
                <div>{nextGuide.title}</div>
              </div>
              <span>→</span>
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-[#111118]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Put This Knowledge to Work
          </h2>
          <p className="text-gray-400 mb-6">
            Get the TouchGrass indicator and start trading with these concepts today.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/learn/quiz"
              className="px-6 py-3 border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 rounded-xl font-medium transition-colors"
            >
              🎮 Take the Quiz
            </Link>
            <Link
              href="/#pricing"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors"
            >
              Get TouchGrass
            </Link>
          </div>
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
