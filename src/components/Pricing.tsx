"use client";

import { useState } from "react";

const plans = [
  {
    name: "Basic",
    description: "Perfect for beginners and casual traders",
    monthlyPrice: 49,
    lifetimePrice: 499,
    features: [
      "Premium/Discount Levels",
      "Opening Range Breakout",
      "VWAP Bands",
      "Basic Buy/Sell Signals",
      "Email Alerts",
      "All Timeframes",
      "Crypto & Forex Pairs",
    ],
    notIncluded: [
      "RSI/MACD Divergences",
      "Push Notifications",
      "Priority Support",
      "Strategy Backtesting",
    ],
    popular: false,
  },
  {
    name: "Pro",
    description: "For serious traders who need every edge",
    monthlyPrice: 79,
    lifetimePrice: 799,
    features: [
      "Premium/Discount Levels",
      "Opening Range Breakout",
      "VWAP Bands",
      "RSI/MACD Divergences",
      "Advanced Buy/Sell Signals",
      "Email & Push Alerts",
      "All Timeframes",
      "Crypto, Forex & Stocks",
      "Strategy Backtesting",
      "Priority Support",
    ],
    notIncluded: [],
    popular: true,
  },
];

export default function Pricing() {
  const [isLifetime, setIsLifetime] = useState(false);

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Choose the plan that fits your trading style. Save 30% with lifetime access.
          </p>
          
          <div className="inline-flex items-center gap-4 bg-card-bg border border-card-border rounded-full p-1">
            <button
              onClick={() => setIsLifetime(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                !isLifetime
                  ? "bg-primary text-white"
                  : "text-gray-400 hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsLifetime(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                isLifetime
                  ? "bg-primary text-white"
                  : "text-gray-400 hover:text-foreground"
              }`}
            >
              Lifetime
              <span className="ml-2 text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full">
                Save 30%
              </span>
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 bg-card-bg border rounded-2xl transition-all ${
                plan.popular
                  ? "border-primary/50 shadow-lg shadow-primary/10 scale-105"
                  : "border-card-border hover:border-primary/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-primary text-white text-sm font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>
              
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-foreground">
                    ${isLifetime ? plan.lifetimePrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-500">
                    /{isLifetime ? "lifetime" : "month"}
                  </span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-gray-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-gray-500 text-sm line-through">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <a
                href="#pricing"
                className={`block w-full py-4 rounded-xl font-semibold text-center transition-all ${
                  plan.popular
                    ? "bg-primary hover:bg-primary-dark text-white"
                    : "border border-primary/50 text-primary hover:bg-primary/10"
                }`}
              >
                Get {plan.name}
              </a>
              
              <p className="text-center text-gray-500 text-xs mt-4">
                14-day money-back guarantee • Cancel anytime
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
