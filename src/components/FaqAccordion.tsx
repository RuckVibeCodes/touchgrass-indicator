"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What markets does this work on?",
    a: "TouchGrass works on any market available on TradingView — crypto, forex, stocks, futures, and indices.",
  },
  {
    q: "What is included?",
    a: "Everything. One plan, all features: momentum MA, divergences, PD/ORB levels, VWAP bands, signals, and priority support. No gated features.",
  },
  {
    q: "How does the divergence detection work?",
    a: "We use momentum-based RSI (like ChartPrime) instead of regular RSI. This catches divergences earlier and more reliably than traditional methods.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes, we offer a 7-day money-back guarantee if you are not satisfied. No questions asked.",
  },
  {
    q: "How do I access the indicator after purchase?",
    a: "After purchase, you receive an invite to the TradingView script. Add it to any chart and you're ready to trade within minutes.",
  },
  {
    q: "Can I use this for scalping?",
    a: "Absolutely. The momentum MA and ORB zones are perfect for scalping. Many users run it on 1-5 minute charts.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="bg-[#0a0a0f] border border-gray-800 rounded-xl overflow-hidden transition-colors hover:border-gray-700"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-6 text-left"
          >
            <span className="font-semibold text-base pr-4">{faq.q}</span>
            <span
              className={`text-emerald-400 text-xl flex-shrink-0 transition-transform duration-200 ${
                open === i ? "rotate-45" : ""
              }`}
            >
              +
            </span>
          </button>
          {open === i && (
            <div className="px-6 pb-6 -mt-2">
              <p className="text-gray-400 leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
