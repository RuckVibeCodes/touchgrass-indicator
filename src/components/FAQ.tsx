"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do I install TouchGrass on TradingView?",
    answer:
      "After purchasing, you'll receive a unique invitation link to add the indicator to your TradingView account. Simply log in, accept the invitation, and the indicator will be available in your indicators list.",
  },
  {
    question: "Does the indicator repaint?",
    answer:
      "No, TouchGrass is completely non-repainting. All signals are based on closed candles only, ensuring you get reliable, accurate signals that don't change after the fact.",
  },
  {
    question: "What timeframes does it work on?",
    answer:
      "TouchGrass works on all timeframes from 1-minute to monthly charts. Some features like Opening Range Breakout are optimized for intraday timeframes, while others like Premium/Discount levels work well on higher timeframes.",
  },
  {
    question: "Can I use it on multiple charts?",
    answer:
      "Yes! Your subscription allows you to use TouchGrass on multiple charts simultaneously. You can have it running on BTC/USDT, ETH/USD, and any other symbol you trade.",
  },
  {
    question: "What markets does it support?",
    answer:
      "Basic plan supports Crypto and Forex pairs. Pro plan adds Stocks, Indices, Commodities, and more. The indicator works on any market available on TradingView.",
  },
  {
    question: "How do alerts work?",
    answer:
      "Basic plan includes email alerts. Pro plan adds push notifications to your phone via the TradingView app. You can configure alerts for specific conditions like buy signals, sell signals, or level breaks.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! We offer a 14-day money-back guarantee. Try the indicator risk-free. If you're not satisfied, contact us for a full refund, no questions asked.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Absolutely. We stand behind our product with a 14-day money-back guarantee. If TouchGrass doesn't meet your expectations, email us within 14 days of purchase for a full refund.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-gray-400">
            Everything you need to know about TouchGrass.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card-bg border border-card-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-card-border/50 transition-colors"
              >
                <span className="font-semibold text-foreground">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
