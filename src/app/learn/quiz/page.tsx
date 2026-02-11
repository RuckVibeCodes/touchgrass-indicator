"use client";

import Link from "next/link";
import { useState } from "react";

interface Question {
  id: number;
  scenario: string;
  context: string;
  options: { text: string; correct: boolean; explanation: string }[];
  feature: string;
}

const questions: Question[] = [
  {
    id: 1,
    scenario: "The Momentum MA just turned green. Price is above VWAP. A BULLISH signal just printed.",
    context: "15-minute chart, ES futures, 10:30 AM",
    feature: "Signals + MA + VWAP",
    options: [
      { text: "Enter long immediately", correct: false, explanation: "Don't chase. Wait for a pullback to the MA or VWAP for better entry." },
      { text: "Wait for pullback to MA/VWAP, then enter long", correct: true, explanation: "Correct! All signals are aligned bullish. A pullback gives better risk:reward." },
      { text: "Wait for a bearish signal to short", correct: false, explanation: "You'd be fighting the trend. Green MA + above VWAP = bullish bias." },
      { text: "Do nothing, signals are conflicting", correct: false, explanation: "Actually, all signals are aligned bullish. This is a high-conviction setup." }
    ]
  },
  {
    id: 2,
    scenario: "Price just touched PDL and bounced. The MA is red. VWAP is above current price.",
    context: "5-minute chart, BTCUSD",
    feature: "PD Levels + MA + VWAP",
    options: [
      { text: "Go long on the PDL bounce", correct: false, explanation: "MA is red and price is below VWAP. The bounce may fail. Need more confirmation." },
      { text: "Wait for MA to turn green, then consider long", correct: true, explanation: "Correct! PDL is support, but you need trend confirmation. Wait for MA color change." },
      { text: "Short immediately", correct: false, explanation: "PDL is support. Shorting into support is risky without a clear breakdown." },
      { text: "Buy the breakdown below PDL", correct: false, explanation: "That's not a valid strategy. Breakdowns are short signals, not long signals." }
    ]
  },
  {
    id: 3,
    scenario: "A 'BEAR DIV' label just appeared. The MA is still green. Price is at PDH.",
    context: "1-hour chart, SPY",
    feature: "Divergence + PD Levels",
    options: [
      { text: "Ignore it, the MA is still green", correct: false, explanation: "Divergences are early warnings. At PDH with bearish divergence = caution zone." },
      { text: "Short immediately", correct: false, explanation: "Divergence is a warning, not an entry. Wait for MA to turn or price to reject PDH." },
      { text: "Tighten stops on longs, watch for MA color change", correct: true, explanation: "Correct! Divergence at resistance = warning. Protect profits and watch for confirmation." },
      { text: "Add to longs, this is a breakout", correct: false, explanation: "Bearish divergence at resistance is a red flag. Don't add risk here." }
    ]
  },
  {
    id: 4,
    scenario: "It's 9:50 AM. Price broke above ORB High on strong volume. MA is green.",
    context: "5-minute chart, NQ futures",
    feature: "ORB + Volume",
    options: [
      { text: "Enter long with stop below ORB midline", correct: true, explanation: "Correct! ORB breakout with volume and green MA = high probability long setup." },
      { text: "Wait for price to return inside ORB", correct: false, explanation: "You'd miss the move. Breakout with volume is a signal to act, not wait." },
      { text: "Short the breakout as a fade", correct: false, explanation: "Fading a confirmed breakout with volume and trend is fighting the market." },
      { text: "Wait until end of day to decide", correct: false, explanation: "ORB setups are meant to be traded in the first 1-2 hours. Don't overthink." }
    ]
  },
  {
    id: 5,
    scenario: "Price is at VWAP upper band. MA is green but turning flat. No divergence yet.",
    context: "15-minute chart, AAPL",
    feature: "VWAP Bands + MA",
    options: [
      { text: "Add to longs — trend is strong", correct: false, explanation: "Upper band is overextended. Not the place to add. Wait for pullback." },
      { text: "Take partial profits if already long", correct: true, explanation: "Correct! Upper band is a natural profit target. Protect gains when extended." },
      { text: "Short for mean reversion to VWAP", correct: false, explanation: "MA is still green. Shorting against trend is risky. Wait for reversal signals." },
      { text: "Set a buy order above current price", correct: false, explanation: "Chasing at the upper band is poor risk:reward. Wait for pullback." }
    ]
  },
  {
    id: 6,
    scenario: "A 'BULL DIV' label appeared. MA is red. Price is at ORB Low.",
    context: "15-minute chart, ETHUSD",
    feature: "Divergence + ORB",
    options: [
      { text: "Short — the MA is red", correct: false, explanation: "Bullish divergence at support (ORB Low) = potential reversal. Don't short into it." },
      { text: "Long immediately with stop below ORB Low", correct: false, explanation: "Close, but wait for confirmation. MA is still red." },
      { text: "Wait for MA to turn green, then long with stop below ORB Low", correct: true, explanation: "Correct! Divergence is a warning. MA color change is the trigger." },
      { text: "Ignore — divergences don't work", correct: false, explanation: "Divergences have ~70% success rate on 15m+. They're worth watching." }
    ]
  },
  {
    id: 7,
    scenario: "MA just flipped from green to red. Price broke below VWAP. It's a range day with price crossing VWAP 4 times.",
    context: "5-minute chart, SPY",
    feature: "MA + VWAP + Market Context",
    options: [
      { text: "Short aggressively — new trend starting", correct: false, explanation: "It's a range day. VWAP crosses = chop. Don't expect a trend." },
      { text: "Reduce position size or sit out", correct: true, explanation: "Correct! Range days chop through signals. Reduce size or wait for clearer action." },
      { text: "Long on the next green MA flip", correct: false, explanation: "In chop, MA flips mean reversion, not trends. You'll get whipsawed." },
      { text: "Trade every VWAP cross", correct: false, explanation: "That's a recipe for overtrading and death by a thousand cuts." }
    ]
  },
  {
    id: 8,
    scenario: "15m MA is green. 1H MA is red. A BULLISH signal just printed on the 15m.",
    context: "Multi-timeframe analysis",
    feature: "Multi-Timeframe",
    options: [
      { text: "Take the long — 15m signal is valid", correct: false, explanation: "Higher TF (1H) is bearish. This 15m signal is counter-trend and risky." },
      { text: "Skip or take small size with tight stop", correct: true, explanation: "Correct! When TFs conflict, reduce exposure. The 1H trend often wins." },
      { text: "Short because 1H is red", correct: false, explanation: "You'd be shorting into a bullish signal. Wait for 15m to also turn red." },
      { text: "This is an invalid setup", correct: false, explanation: "It's not invalid, just lower probability. Can still work with proper sizing." }
    ]
  }
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = questions[currentQuestion];

  const handleSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (question.options[index].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
  };

  const getScoreMessage = () => {
    const pct = (score / questions.length) * 100;
    if (pct >= 90) return { emoji: "🏆", text: "Master Trader! You really know TouchGrass." };
    if (pct >= 70) return { emoji: "🎯", text: "Solid understanding! A few more reps and you're there." };
    if (pct >= 50) return { emoji: "📚", text: "Good start! Review the guides and try again." };
    return { emoji: "🌱", text: "Keep learning! Check the guides and come back stronger." };
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
            <Link href="/learn" className="text-emerald-400 font-medium">
              ← Back to Learn
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {!completed ? (
            <>
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all"
                    style={{ width: `${((currentQuestion + (showExplanation ? 1 : 0)) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                    {question.feature}
                  </span>
                  <span className="text-gray-500 text-xs">{question.context}</span>
                </div>
                <h2 className="text-xl font-semibold mb-4">{question.scenario}</h2>
                <p className="text-emerald-400 font-medium">What would you do?</p>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {question.options.map((option, index) => {
                  let bgColor = "bg-[#111118] border-gray-800 hover:border-gray-600";
                  if (showExplanation) {
                    if (option.correct) {
                      bgColor = "bg-green-500/10 border-green-500";
                    } else if (index === selectedAnswer) {
                      bgColor = "bg-red-500/10 border-red-500";
                    } else {
                      bgColor = "bg-[#111118] border-gray-800 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(index)}
                      disabled={showExplanation}
                      className={`w-full p-4 border rounded-xl text-left transition-all ${bgColor}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-sm shrink-0">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-gray-300">{option.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showExplanation && selectedAnswer !== null && (
                <div className={`p-4 rounded-xl mb-6 ${
                  question.options[selectedAnswer].correct 
                    ? "bg-green-500/10 border border-green-500/30" 
                    : "bg-red-500/10 border border-red-500/30"
                }`}>
                  <p className="font-semibold mb-2">
                    {question.options[selectedAnswer].correct ? "✅ Correct!" : "❌ Not quite."}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {question.options[selectedAnswer].explanation}
                  </p>
                </div>
              )}

              {/* Next Button */}
              {showExplanation && (
                <button
                  onClick={handleNext}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-colors"
                >
                  {currentQuestion < questions.length - 1 ? "Next Question →" : "See Results"}
                </button>
              )}
            </>
          ) : (
            /* Results */
            <div className="text-center">
              <div className="text-8xl mb-6">{getScoreMessage().emoji}</div>
              <h2 className="text-3xl font-bold mb-4">
                You scored {score}/{questions.length}
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                {getScoreMessage().text}
              </p>
              
              <div className="bg-[#111118] border border-gray-800 rounded-xl p-6 mb-8">
                <h3 className="font-semibold mb-4">Your Performance</h3>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-4 bg-green-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{score}</div>
                    <div className="text-gray-400 text-sm">Correct</div>
                  </div>
                  <div className="p-4 bg-red-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-red-400">{questions.length - score}</div>
                    <div className="text-gray-400 text-sm">Incorrect</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-800 rounded-xl font-medium transition-colors"
                >
                  🔄 Try Again
                </button>
                <Link
                  href="/learn"
                  className="px-6 py-3 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 rounded-xl font-medium transition-colors"
                >
                  📚 Review Guides
                </Link>
                <Link
                  href="/#pricing"
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors"
                >
                  🌿 Get TouchGrass
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          © 2026 Blockstone Labs. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
