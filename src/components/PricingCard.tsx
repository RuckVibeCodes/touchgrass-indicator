'use client';

import { Check, Sparkles, Zap, Crown } from 'lucide-react';
import { getCheckoutLink } from '@/lib/whop';
import { TIER_PRICING, PRO_FEATURES } from '@/lib/tiers';

interface PricingCardProps {
  plan: 'monthly' | 'annual' | 'lifetime';
  affiliateCode?: string;
  highlighted?: boolean;
}

const planIcons = {
  monthly: Zap,
  annual: Sparkles,
  lifetime: Crown,
};

const planDescriptions = {
  monthly: 'Perfect for trying out',
  annual: 'Best value for committed traders',
  lifetime: 'One-time payment, forever access',
};

export default function PricingCard({ plan, affiliateCode, highlighted }: PricingCardProps) {
  const pricing = TIER_PRICING[plan];
  const Icon = planIcons[plan];
  const checkoutUrl = getCheckoutLink(plan, affiliateCode);

  const handleCheckout = () => {
    if (checkoutUrl === '#') {
      // Whop not configured - show message
      alert('Payments coming soon! Join our waitlist.');
      return;
    }
    window.location.href = checkoutUrl;
  };

  return (
    <div
      className={`relative rounded-2xl p-6 ${
        highlighted
          ? 'bg-gradient-to-b from-emerald-500/20 to-transparent border-2 border-emerald-500'
          : 'bg-gray-900 border border-gray-800'
      }`}
    >
      {/* Popular Badge */}
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            MOST POPULAR
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <div
          className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center ${
            highlighted ? 'bg-emerald-500/20' : 'bg-gray-800'
          }`}
        >
          <Icon className={`w-6 h-6 ${highlighted ? 'text-emerald-400' : 'text-gray-400'}`} />
        </div>
        <h3 className="text-xl font-bold mb-1">{pricing.description}</h3>
        <p className="text-gray-400 text-sm">{planDescriptions[plan]}</p>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold">${pricing.price}</span>
          <span className="text-gray-400">
            /{pricing.period === 'once' ? 'once' : pricing.period}
          </span>
        </div>
        {pricing.savings && (
          <p className="text-emerald-400 text-sm mt-1">
            {plan === 'annual' && `Save ${pricing.savings} vs monthly`}
            {plan === 'lifetime' && 'Pay once, access forever'}
          </p>
        )}
        {plan === 'annual' && 'monthlyEquivalent' in pricing && pricing.monthlyEquivalent && (
          <p className="text-gray-500 text-xs mt-1">
            ~${pricing.monthlyEquivalent.toFixed(2)}/month
          </p>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6">
        {PRO_FEATURES.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={handleCheckout}
        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${
          highlighted
            ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
            : 'bg-gray-800 hover:bg-gray-700 text-white'
        }`}
      >
        Get Started
      </button>

      {/* Guarantee */}
      <p className="text-center text-gray-500 text-xs mt-4">
        7-day money-back guarantee
      </p>
    </div>
  );
}

// Grid of all pricing options
export function PricingGrid({ affiliateCode }: { affiliateCode?: string }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <PricingCard plan="monthly" affiliateCode={affiliateCode} />
      <PricingCard plan="annual" affiliateCode={affiliateCode} highlighted />
      <PricingCard plan="lifetime" affiliateCode={affiliateCode} />
    </div>
  );
}
