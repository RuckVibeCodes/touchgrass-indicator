# TouchGrass - SnapChart Pro Feature Porting Spec

## Overview
Porting AI trading tools from SnapChart Pro to TouchGrass indicator platform.
**NOT porting:** ChartLab (deferred to V2)

---

## Tier System

### FREE Tier
| Feature | Limit |
|---------|-------|
| **AI Analysis Dashboard** | ✅ FULL ACCESS |
| AI Chart Analysis | 1/day |
| Daily Briefing | Preview only (blurred, no links) |
| Degen Radar | Full access (hook feature) |
| **TouchGrass Indicator** | ❌ No access |
| Signals Dashboard | ❌ No access |
| Trade Journal | ❌ No access |
| Video Analysis | ❌ No access |

**Note:** The AI Analysis Dashboard (homepage) is FREE for all users. This includes:
- Market cap, 24h volume, BTC dominance
- Trending coins
- Top gainers
- Market dominance chart
- AI Pulse (sentiment analysis)
- Market Snapshot (Fear/Greed, Risk Mode, Mood, Bias)
- Live prices (BTC, ETH, SOL, etc.)
- Chart Analysis upload (1/day limit)

---

### PRO Tier Pricing

| Plan | Price | Best For |
|------|-------|----------|
| **Monthly** | $19/mo | Try it out |
| **Annual** | $149/yr | Committed traders (save 35%) |
| **Lifetime** | $349 | One-time, forever access |

### PRO Features
| Feature | Access |
|---------|--------|
| **TouchGrass TradingView Indicator** | ✅ Full access (invite to private script) |
| AI Chart Analysis | Unlimited |
| Daily Briefing | Full with clickable headlines |
| Degen Radar | Full + Smart Money tracking |
| Signals Dashboard | Full access + equity curve |
| Trade Journal | Unlimited entries + AI insights |
| Video Analysis | Unlimited |

---

## Feature Breakdown

### 1. AI Analysis Dashboard (Homepage) ✅ FREE FOR ALL

**Source Files:**
- `~/snapchart-pro/src/app/page.tsx` (main layout)
- `~/snapchart-pro/src/components/MarketMoversBar.tsx` (top stats bar)
- `~/snapchart-pro/src/components/MarketSnapshot.tsx` (sidebar)
- `~/snapchart-pro/src/components/ChartUpload.tsx` (chart upload)
- `~/snapchart-pro/src/components/AnalysisResults.tsx` (AI results)
- `~/snapchart-pro/src/app/api/market-movers/` (API)
- `~/snapchart-pro/src/app/api/market-data/` (API)

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ [Market Movers Bar]                                     │
│ Market Cap | Trending | Top Gainers | Dominance         │
│ + AI Pulse sentiment                                    │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────────────────┐ ┌─────────────────────────┐ │
│ │ Chart Analysis          │ │ Market Snapshot         │ │
│ │ - Upload image          │ │ - Fear & Greed          │ │
│ │ - Add description       │ │ - Risk Mode             │ │
│ │ - Trade type dropdown   │ │ - Mood (Capitulation)   │ │
│ │                         │ │ - Bias                  │ │
│ │ [Analysis Results]      │ │ - Live Prices           │ │
│ │                         │ │   BTC, ETH, SOL...      │ │
│ └─────────────────────────┘ └─────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**Data Sources:**
- CoinGecko API (prices, market cap, trending, gainers)
- Fear & Greed Index API
- Derivatives data (for Risk Mode/Bias)

**Free Tier:** Full access to dashboard, 1 chart analysis/day
**Pro Tier:** Unlimited chart analyses

---

### 1b. AI Chart Analysis ✅ (Already Built)
**Status:** Done - already in TouchGrass
**Location:** `/analyze` page
**Source:** `~/touchgrass-indicator-site/src/app/analyze/`

---

### 2. Daily Briefing 🔧 (Debug + Enhance)

**Source Files:**
- `~/snapchart-pro/src/app/daily-briefing/page.tsx`
- `~/snapchart-pro/src/components/DailyBriefingContent.tsx` (838 lines)
- `~/snapchart-pro/src/lib/briefingUtils.ts`
- `~/snapchart-pro/src/app/api/daily-briefing/`

**Features:**
- Market Overview (BTC/ETH prices, Fear & Greed Index)
- Macro Tone analysis
- Macro Context (SPX, VIX, Risk Mode, Correlation) — PRO
- Derivatives Overview (Funding, OI, Positioning, Liquidation zones) — PRO
- Key Levels — PRO
- Momentum Notes — PRO
- Volatility Outlook — PRO
- Events Today — PRO
- News Analysis with **clickable headlines** — PRO (FIX NEEDED)
- Degen Radar picks — PRO
- Archive of past briefings

**Data Sources:**
- CoinGecko/CoinMarketCap (prices, fear/greed)
- Coinalyze (derivatives data)
- Hyperliquid API (funding, OI)
- Macro data API (SPX, VIX)
- News aggregator (needs fixing for clickable links)

**Free Tier:** Preview only
- Shows: Market Overview, Macro Tone, Key Takeaway
- Blurs: Everything else
- No clickable headlines

**Pro Tier:** Full content
- All sections visible
- Clickable headline links to sources

**Debug Tasks:**
- [ ] Fix news headline links (currently showing `#` or broken URLs)
- [ ] Add proper news API (CryptoPanic, NewsAPI, or similar)
- [ ] Ensure derivatives data is flowing correctly

---

### 3. Degen Radar 🎁 (Free Hook Feature)

**Source Files:**
- `~/snapchart-pro/src/app/degen-radar/page.tsx` (321 lines)
- `~/snapchart-pro/src/components/degen-radar/` (11 components)
  - `TrendingDegens.tsx`
  - `NewLaunchScanner.tsx`
  - `SmartMoneySection.tsx` — PRO only
  - `DegenCard.tsx`
  - `DegenRadarFilters.tsx`
  - `TokenSearch.tsx`
  - `RugRiskBadge.tsx`
  - `EntryZoneBadge.tsx`
  - `ExitRadarBadge.tsx` — PRO only
  - `DegenScoreBadge.tsx`
  - `ChainBadge.tsx`
- `~/snapchart-pro/src/lib/degenRadarCache.ts`
- `~/snapchart-pro/src/lib/degenScoring.ts`
- `~/snapchart-pro/src/lib/rugRiskScoring.ts`
- `~/snapchart-pro/src/lib/dexscreenerApi.ts`
- `~/snapchart-pro/src/lib/pumpfunApi.ts`
- `~/snapchart-pro/src/app/api/degen-radar/`

**Features:**
- **3 Pillars System:**
  1. 🛡️ Don't Get Rugged — Rug risk scorecard
  2. ⚡ Don't Be Late — Entry zone + momentum analysis
  3. 🎯 Don't Round-Trip — Exit radar (PRO only)

- Trending Degens (multi-chain)
- New Launch Scanner (Pump.fun, DexScreener)
- Token Search with instant analysis
- Smart Money Section (wallet tracking) — PRO only
- Chain filters (ETH, SOL, Base, Arbitrum, etc.)
- Auto-refresh every 30 seconds

**Data Sources:**
- DexScreener API (trending, new pairs)
- Pump.fun API (Solana launches)
- On-chain data for rug scoring

**Free Tier:** Full access (this is the hook)
- All trending tokens
- New launches
- Rug risk scoring
- Entry zone analysis

**Pro Tier:** Adds
- Exit Radar (distribution detection)
- Smart Money tracking

---

### 4. Signals Dashboard 📊 (Pro Only)

**Source Files:**
- `~/snapchart-pro/src/app/signals/page.tsx`
- `~/snapchart-pro/src/components/signals/` (5 components)
  - `SignalsDashboardContent.tsx` (476 lines)
  - `SignalCard.tsx`
  - `EquityCurve.tsx` ← KEY FEATURE
  - `StatsCard.tsx`
  - `WatchingPanel.tsx`
- `~/snapchart-pro/src/lib/signals/` (13 files, ~200KB)
  - `signalDetector.ts` / `signalDetectorV2.ts`
  - `levelsEngine.ts`
  - `momentumStrategy.ts`
  - `breakoutStrategy.ts`
  - `intelligenceAlerts.ts`
  - `liveScanner.ts`
  - `outcomeAssessor.ts`
  - `signalStore.ts`
  - `strategyRouter.ts`
  - `telegram.ts` (alert delivery)
- `~/snapchart-pro/src/app/api/signals/`

**Features:**
- 5/5 Confluence Signal Detection
  1. Level Proximity
  2. Trend Alignment
  3. Momentum Confirm
  4. Volume Confirm
  5. Candle Pattern
- **Equity Curve** (cumulative R performance)
- Win Rate, Profit Factor, Avg R/Trade stats
- Open/Closed signal tracking
- Signal cards with entry/stop/targets
- "What We're Watching" panel (near-confluence setups)
- Telegram alerts integration

**TouchGrass Integration:**
- Can use Pine Script signals from the indicator
- Add AI confluence scoring on top
- Track performance over time
- Show equity curve of indicator signals

**Free Tier:** ❌ No access
- Can see stats (win rate, equity curve preview)
- Cannot see actual signals (blurred)

**Pro Tier:** Full access
- Live signals with entry/stop/targets
- Telegram alerts
- Full history

---

### 5. Trade Journal 📓 (Pro Only)

**Source Files:**
- `~/snapchart-pro/src/app/journal/page.tsx` (234 lines)
- `~/snapchart-pro/src/components/journal/` (6 components)
  - `TradeEntryForm.tsx` (639 lines) — comprehensive trade entry
  - `TradeList.tsx`
  - `TradeImageUpload.tsx` — attach chart screenshots
  - `PerformanceStats.tsx`
  - `AIInsights.tsx` — AI pattern detection
  - `ExchangeConnections.tsx` — (deferred, for auto-import)
- `~/snapchart-pro/src/lib/journalStorage.ts`
- `~/snapchart-pro/src/app/api/journal/`

**Features:**
- Manual trade entry with:
  - Symbol, direction, entry/exit price
  - Stop loss, take profits
  - Position size, leverage
  - Tags, notes, emotions
  - Chart screenshot upload
- Trade list with filtering
- Performance stats:
  - Win rate, profit factor
  - Total P&L, best/worst trade
  - Average win/loss
  - R-multiple tracking
- **AI Insights:**
  - Pattern detection (what's working/not)
  - Emotional trading detection
  - Time-of-day analysis
  - Symbol performance breakdown
  - Personalized recommendations

**Free Tier:** ❌ No access

**Pro Tier:** Full access
- Unlimited journal entries
- AI-powered insights
- Performance analytics

---

### 6. Video Analysis 🎬 (Pro Only)

**Source Files:**
- `~/snapchart-pro/src/app/video-analysis/page.tsx` (518 lines)
- `~/snapchart-pro/src/app/api/video-analysis/route.ts`

**Features:**
- Paste YouTube URL → AI analysis
- Extracts:
  - Summary
  - Market bias (short/medium/higher TF)
  - Key levels (breakout, support, invalidation, targets)
  - Patterns discussed
  - Trade setups with entry/stop/targets
  - Probability scenarios (bull/neutral/bear %)
  - Key concepts
  - Risk warnings
  - Timestamps for key moments
- Content type detection (TA vs News vs Educational)
- Relevance scoring
- AI confidence indicator

**Free Tier:** ❌ No access

**Pro Tier:** Full access
- Unlimited video analyses

---

## API Routes to Port

| Route | Purpose |
|-------|---------|
| `/api/analyze` | ✅ Already done |
| `/api/daily-briefing` | Market briefing generation |
| `/api/daily-briefing/archive` | Historical briefings |
| `/api/degen-radar` | Token scanning |
| `/api/degen-radar/smart-money` | Wallet tracking (PRO) |
| `/api/signals` | Signal fetching |
| `/api/signals/scan` | Real-time signal detection |
| `/api/journal` | Trade CRUD |
| `/api/journal/insights` | AI pattern analysis |
| `/api/video-analysis` | YouTube transcript → AI |

---

## Database Schema (Supabase)

### Tables Needed:
```sql
-- User tier tracking
users (
  id, clerk_id, tier, created_at, updated_at
)

-- Usage tracking
usage_tracking (
  id, user_id, feature, date, count
)

-- Daily briefings cache
daily_briefings (
  id, date, content, created_at
)

-- Signals
signals (
  id, symbol, timeframe, direction, entry_price, stop_loss,
  targets, confluence_score, confluence_details, status,
  outcome_status, pnl_percent, r_multiple, created_at
)

-- Journal entries
journal_trades (
  id, user_id, symbol, direction, entry_price, exit_price,
  stop_loss, take_profits, position_size, leverage,
  pnl, r_multiple, tags, notes, emotions, image_url,
  created_at
)
```

---

## Implementation Order

### Phase 1: Foundation
1. [ ] Port AI Analysis Dashboard (homepage layout)
2. [ ] Port Market Movers Bar (trending, gainers, dominance)
3. [ ] Port Market Snapshot sidebar
4. [ ] Port tier system (`lib/tiers.ts`)
5. [ ] Port UI components (tooltips, section headers, cards)

### Phase 2: Free Features (Hooks)
6. [ ] Port Degen Radar (full access)
7. [ ] Port Daily Briefing (preview mode for free)
8. [ ] Add usage tracking (1 analysis/day limit)

### Phase 3: Pro Features
9. [ ] **TradingView Indicator Access** (invite system)
10. [ ] Port Signals Dashboard + Equity Curve
11. [ ] Port Trade Journal + AI Insights
12. [ ] Port Video Analysis
13. [ ] Fix Daily Briefing headlines (full for Pro)

### Phase 4: Monetization
14. [ ] Whop integration (payments + subscriptions)
15. [ ] Whop affiliate system (creator program)
16. [ ] Creator white-label dashboard
17. [ ] Telegram alerts for Pro users

### Phase 5: Polish
18. [ ] Mobile optimization pass
19. [ ] Loading states + error handling
20. [ ] Analytics + tracking

---

## White-Label Creator System (Affiliate Program)

### The Pitch to Creators
"Give your community a free trading dashboard. When they upgrade, you earn 50%."

### How It Works
1. Creator signs up → gets custom branded page
2. Creator shares `touchgrass.app/c/[theirSlug]` with their community
3. Community members use free features
4. When member upgrades to Pro → 50/50 revenue split via Whop

### Creator Dashboard (`/creator/dashboard`)
- **Branding:**
  - Custom logo
  - Brand colors
  - Display name
  - Community link (Discord, Telegram, etc.)
  - Affiliate links section
- **Analytics:**
  - Total referrals
  - Active free users
  - Pro conversions
  - Revenue earned (lifetime + this month)
  - Conversion rate
- **Payouts:**
  - Connected to Whop for automatic splits
  - Payout history
  - Pending earnings

### Creator Member Experience
- URL: `touchgrass.app/c/[creatorSlug]`
- Creator branding visible in header
- "Powered by TouchGrass" subtle footer
- Creator's community/affiliate links accessible
- Full free tier access
- Upgrade CTA benefits creator

### Whop Integration for Revenue Split
Whop supports affiliate/referral payouts natively:

```typescript
// When creator signs up, create Whop affiliate
const affiliate = await whop.affiliates.create({
  user_id: creatorWhopId,
  commission_percent: 50, // 50/50 split
  cookie_duration_days: 30,
});

// Creator's referral link
const referralUrl = `https://whop.com/touchgrass/?a=${affiliate.code}`;

// Or custom domain redirect
// touchgrass.app/c/[slug] → redirects with ?a=code for purchases
```

**Whop Affiliate Features:**
- Automatic commission tracking
- Automatic payouts to creator
- Dashboard for creators (or we build custom)
- Cookie-based attribution (30 days)
- Recurring commissions on subscriptions

### Database Schema
```sql
-- Creator profiles
creators (
  id UUID PRIMARY KEY,
  user_id TEXT NOT NULL, -- Clerk user ID
  whop_affiliate_id TEXT, -- Whop affiliate ID
  whop_affiliate_code TEXT, -- For referral URLs
  slug TEXT UNIQUE NOT NULL, -- URL slug
  display_name TEXT NOT NULL,
  logo_url TEXT,
  brand_color TEXT DEFAULT '#10b981', -- Green default
  community_link TEXT, -- Discord/Telegram/etc
  affiliate_links JSONB, -- Array of {name, url}
  bio TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Track referrals (for our dashboard, Whop handles payments)
referrals (
  id UUID PRIMARY KEY,
  creator_id UUID REFERENCES creators(id),
  referred_user_id TEXT NOT NULL, -- Clerk user ID
  referred_at TIMESTAMPTZ DEFAULT NOW(),
  converted_to_pro BOOLEAN DEFAULT false,
  converted_at TIMESTAMPTZ,
  first_payment_amount DECIMAL,
  lifetime_value DECIMAL DEFAULT 0
);

-- Creator analytics (aggregated daily)
creator_stats (
  id UUID PRIMARY KEY,
  creator_id UUID REFERENCES creators(id),
  date DATE NOT NULL,
  page_views INT DEFAULT 0,
  signups INT DEFAULT 0,
  conversions INT DEFAULT 0,
  revenue DECIMAL DEFAULT 0,
  UNIQUE(creator_id, date)
);
```

### Creator Onboarding Flow
1. `/creator/apply` — Application form
2. Review by admin (or auto-approve)
3. `/creator/setup` — Branding + Whop connection
4. `/creator/dashboard` — Analytics + management
5. Share `touchgrass.app/c/[slug]`

### Revenue Model (50/50 Split)
| Plan | Price | Creator Cut | Platform Cut |
|------|-------|-------------|--------------|
| Monthly | $19/mo | $9.50/mo | $9.50/mo |
| Annual | $149/yr | $74.50/yr | $74.50/yr |
| Lifetime | $349 | $174.50 | $174.50 |

**Note:** Whop handles all payment processing and affiliate payouts. We just track for our dashboard.

---

---

## UI Patterns (Reference SnapChart Pro)

### Design System to Port
The SnapChart Pro UI is **top tier** — we're keeping these patterns:

#### 1. Info Tooltips
```tsx
// Premium tooltip with position control
<InfoTooltip text="Explanation here" position="bottom" />

// Used on every metric/feature to educate users
```
- Small info icon (ℹ️) next to labels
- Hover reveals explanation
- Position: top/bottom/left/right
- Dark bg with border, good contrast

#### 2. Section Headers
```tsx
<SectionHeader 
  icon={Activity} 
  title="FEAR & GREED" 
  tooltip="Measures market sentiment..." 
  iconColor="text-green-400"
/>
```
- Icon + uppercase title + tooltip
- Consistent spacing

#### 3. Stats Cards
```tsx
// Compact stat display
<div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
  <div className="text-xs text-gray-500">Label</div>
  <div className="text-2xl font-bold text-white">$69,420</div>
  <div className="text-xs text-green-400">▲ 2.5%</div>
</div>
```

#### 4. Color Coding
| Sentiment | Color |
|-----------|-------|
| Bullish/Positive | `text-green-400`, `bg-green-500/20` |
| Bearish/Negative | `text-red-400`, `bg-red-500/20` |
| Neutral | `text-yellow-400`, `bg-yellow-500/20` |
| Info/Highlight | `text-blue-400`, `bg-blue-500/20` |
| Premium/AI | `text-purple-400`, `bg-purple-500/20` |

#### 5. Loading States
- Skeleton loaders (not spinners) for data
- Pulse animation on placeholders
- Graceful fallbacks

#### 6. Mobile-First
- Touch targets (44px min)
- Safe area insets
- Horizontal scroll for tabs
- Responsive grid (1 col mobile → 2-4 col desktop)

#### 7. Upgrade CTAs
- Lock icon + blur for gated content
- Crown icon for Pro features
- Gradient buttons (blue → purple)
- Clear value proposition

### Component Library to Port
```
~/snapchart-pro/src/components/
├── ui/                    # Base UI components
├── UpgradeModal.tsx       # Pro upgrade flow
├── Navigation.tsx         # Tab bar with icons
├── CreatorBadge.tsx       # White-label branding
└── CreatorCorner.tsx      # Creator attribution
```

---

---

## Signal Card Design (Final)

### Stats Display (4 Key Numbers)
```
┌─────────────────────────────────────────────────────────┐
│  🎯 WIN RATE        📈 PROFIT FACTOR                    │
│     67.3%              2.4x                             │
│                                                         │
│  💰 AVG RETURN      🔥 CURRENT STREAK                   │
│    +1.2R/trade         4 Wins                           │
└─────────────────────────────────────────────────────────┘
```

**Tooltips (elementary language):**
- Win Rate: "Out of 100 trades, we win about 67."
- Profit Factor: "For every $1 lost, we make $2.40 back. Above 1.5 is good."
- Avg R/Trade: "R = your risk. +1.2R means avg +$120 profit per $100 risked."
- Streak: "Are we hot or cold right now?"

### Signal Card (Clean Version)
```
┌─────────────────────────────────────────────────────────┐
│  🟢 LONG BTC/USDT                          1H Timeframe │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                         │
│  ENTRY         $69,420                                  │
│  🛑 STOP       $68,500  (-1.3%)                         │
│  🎯 TP1        $70,340  (+1.3%)  1R                     │
│  🎯 TP2        $71,260  (+2.6%)  2R                     │
│  🎯 TP3        $72,600  (+4.6%)  3.5R                   │
│                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│  CONFLUENCE: ●●●●○ 4/5                                  │
│  ✓ Trend  ✓ Momentum  ✓ Level  ✓ Volume  ○ Sentiment   │
│                                                         │
│  💡 "Bounce off support with strong momentum."          │
│  ⏰ 2 min ago                                           │
└─────────────────────────────────────────────────────────┘
```

### Telegram Alert Format
```
🟢 LONG BTC $69,420

Stop: $68,500 (-1.3%)
TP1: $70,340 (+1.3%)
TP2: $71,260 (+2.6%)
TP3: $72,600 (+4.6%)

Confluence: 4/5
"Bounce off support with momentum"

⚡ touchgrass.app/signals
```

### Signal Parameters
- **Timeframe:** 1H (confirmed)
- **Assets:** BTC initially (expand later)
- **Min Confluence:** 3/5 to fire, 4/5+ preferred
- **Min R:R:** 2:1
- **Stop Method:** ATR-based or nearest invalidation level

---

## File Count Summary

| Feature | Components | Lib Files | API Routes | Total Lines |
|---------|------------|-----------|------------|-------------|
| Daily Briefing | 1 | 2 | 2 | ~1,200 |
| Degen Radar | 11 | 4 | 2 | ~2,500 |
| Signals | 5 | 13 | 2 | ~3,500 |
| Journal | 6 | 1 | 2 | ~2,000 |
| Video Analysis | 1 | 0 | 1 | ~600 |
| **Total** | **24** | **20** | **9** | **~9,800** |

---

## Notes

- All components use Clerk for auth
- All components are mobile-responsive
- Dark theme throughout (gray-900 base)
- Existing TouchGrass site has same stack (Next.js 14, Tailwind)
- Can reuse most code with minimal changes
- Main changes: branding, pricing tiers, feature gates
