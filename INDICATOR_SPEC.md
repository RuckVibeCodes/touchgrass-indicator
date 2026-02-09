# TouchGrass Trading Indicator
## TradingView Pine Script Specification

**Version:** 1.0
**Platform:** TradingView (Pine Script v5)
**Author:** Matt Rucker / Blockstone Labs

---

## 🎯 Product Overview

An all-in-one day trading indicator combining structure-based levels with momentum analysis. Designed for traders who want clear reference points, bias confirmation, and actionable signals.

**Target Markets:** Crypto, Forex, Futures, Stocks
**Primary Timeframes:** 1m, 5m, 15m (entries) / 1H, 4H, 1D (context)

---

## 📊 Core Features

### 1. Previous Day Levels (PD)

| Level | Description | Default Color |
|-------|-------------|---------------|
| PDH | Previous Day High | Green |
| PDL | Previous Day Low | Red |
| PD Midline | (PDH + PDL) / 2 | Yellow |

**Purpose:** 
- Liquidity/magnet levels
- Stop run targets
- Mean reversion reference
- Directional bias framework

**Logic:**
```
PDH = high of previous daily candle
PDL = low of previous daily candle
PD_Mid = (PDH + PDL) / 2
```

---

### 2. Opening Range Breakout (ORB)

| Level | Description | Default Color |
|-------|-------------|---------------|
| ORB High | High of opening range window | Lime |
| ORB Low | Low of opening range window | Red |
| ORB Midline | (ORB High + ORB Low) / 2 | Yellow |

**Default Window:** NY 09:30 - 09:45 ET (configurable)

**Purpose:**
- Opening impulse range
- Breakout/fakeout detection
- Early session direction

**Logic:**
```
ORB_High = highest high during 09:30-09:45 ET
ORB_Low = lowest low during 09:30-09:45 ET
ORB_Mid = (ORB_High + ORB_Low) / 2
```

---

### 3. VWAP (Volume Weighted Average Price)

| Level | Description | Default Color |
|-------|-------------|---------------|
| VWAP | Session VWAP | Purple |
| Upper Band 1 | VWAP + 1 StdDev | Light Purple |
| Lower Band 1 | VWAP - 1 StdDev | Light Purple |
| Upper Band 2 | VWAP + 2 StdDev (optional) | Lighter Purple |
| Lower Band 2 | VWAP - 2 StdDev (optional) | Lighter Purple |

**Purpose:**
- Institutional fair value
- Mean reversion anchor
- Trend filter (price above/below VWAP)
- Band extremes for reversals

**Logic:**
```
VWAP = cumulative(volume * hlc3) / cumulative(volume)
StdDev bands calculated from VWAP deviation
Reset: Daily session start (configurable for crypto 24/7)
```

---

### 4. Bull/Bear Divergences

**Regular Divergence (Reversal Signals):**
| Type | Price Action | RSI/Momentum |
|------|--------------|--------------|
| Bullish | Lower Low | Higher Low |
| Bearish | Higher High | Lower High |

**Hidden Divergence (Continuation Signals):**
| Type | Price Action | RSI/Momentum |
|------|--------------|--------------|
| Bullish | Higher Low | Lower Low |
| Bearish | Lower High | Higher High |

**Visual:**
- Lines connecting pivot points
- Labels: "Bull Div" / "Bear Div"
- Optional background highlight

**Settings:**
- Source: RSI (default), MACD, or custom
- Lookback period: 5-50 bars (default 14)
- Pivot detection sensitivity

---

## ⚡ AlgoSniper-Inspired Features

### 5. Buy/Sell Signals

Visual alerts when key conditions align:

**Buy Signal Conditions (configurable):**
- Price breaks above ORB High + holds
- Price reclaims VWAP from below
- Bullish divergence + price above PD Mid
- Break above PDH with momentum

**Sell Signal Conditions (configurable):**
- Price breaks below ORB Low + holds
- Price loses VWAP from above
- Bearish divergence + price below PD Mid
- Break below PDL with momentum

**Visual:** 
- Triangle/arrow below candle (buy)
- Triangle/arrow above candle (sell)
- Configurable colors

---

### 6. Trend Bands (Optional)

Keltner/ATR-based bands showing trend direction:

| Zone | Meaning | Color |
|------|---------|-------|
| Above upper band | Strong bullish | Green background |
| Between bands | Neutral/ranging | No fill |
| Below lower band | Strong bearish | Red background |

---

### 7. Momentum Shift Alerts

Detect when momentum is shifting before price confirms:

- RSI crossing 50 level
- MACD histogram flip
- Volume spike detection

**Visual:** Small dot or icon on chart

---

### 8. Session Highlights (Optional)

Background coloring for key sessions:
- Asian session
- London session
- New York session
- Overlap periods

---

## 🔔 Alerts System

TradingView alerts for all key events:

| Alert | Trigger |
|-------|---------|
| ORB High Break | Price closes above ORB High |
| ORB Low Break | Price closes below ORB Low |
| PDH Break | Price closes above PDH |
| PDL Break | Price closes below PDL |
| VWAP Cross Up | Price crosses above VWAP |
| VWAP Cross Down | Price crosses below VWAP |
| Bullish Divergence | Divergence detected |
| Bearish Divergence | Divergence detected |
| Buy Signal | Full buy conditions met |
| Sell Signal | Full sell conditions met |

---

## ⚙️ Settings Panel

### Display Toggles
```
[x] Show PD Levels
[x] Show PD Midline
[x] Show ORB Levels
[x] Show ORB Midline
[x] Show VWAP
[x] Show VWAP Bands
[ ] Show VWAP Band 2 (2 StdDev)
[x] Show Divergences
[x] Show Buy/Sell Signals
[ ] Show Trend Bands
[ ] Show Session Highlights
```

### ORB Settings
```
ORB Start Time: 09:30 (dropdown)
ORB End Time: 09:45 (dropdown)
Timezone: America/New_York
```

### VWAP Settings
```
VWAP Source: hlc3 (dropdown)
Band 1 Multiplier: 1.0
Band 2 Multiplier: 2.0
Session Reset: Daily / Weekly / None
```

### Divergence Settings
```
RSI Length: 14
Pivot Lookback: 5
Show Regular Divergence: true
Show Hidden Divergence: true
```

### Colors
```
PDH Color: green
PDL Color: red
PD Mid Color: yellow
ORB High Color: lime
ORB Low Color: red
ORB Mid Color: yellow
VWAP Color: purple
VWAP Band Color: light purple
Buy Signal Color: green
Sell Signal Color: red
Bull Div Color: teal
Bear Div Color: orange
```

---

## 📐 Display Logic

### Multi-Timeframe Consistency
All levels drawn as `line.new()` with `extend=extend.right` so they:
- Display as flat horizontal lines
- Work consistently across all timeframes
- Don't repaint or shift

### Level Visibility
- PD levels: Show on all timeframes
- ORB levels: Show after ORB window closes
- VWAP: Show during active session

---

## 🎨 Visual Hierarchy

**Primary (thicker lines):**
- PDH / PDL
- ORB High / Low
- VWAP

**Secondary (thinner lines):**
- Midlines
- VWAP bands

**Signals (shapes):**
- Buy/Sell arrows
- Divergence lines + labels

---

## 💰 Tiered Features

### Basic Tier ($49/mo or $499 lifetime)
- PD Levels (High, Low, Mid)
- ORB Levels (High, Low, Mid)
- VWAP + 1 StdDev Bands
- Basic Divergences (Regular only)
- All alerts

### Pro Tier ($79/mo or $799 lifetime)
- Everything in Basic
- Hidden Divergences
- Buy/Sell Signals
- Trend Bands
- Session Highlights
- VWAP 2 StdDev Bands
- Priority support

---

## 🛠️ Build Order

**Phase 1: Foundation**
1. [ ] PD Levels (PDH, PDL, Mid)
2. [ ] ORB Levels (High, Low, Mid)
3. [ ] Settings panel structure
4. [ ] Multi-timeframe line drawing

**Phase 2: VWAP + Divergences**
5. [ ] VWAP calculation + bands
6. [ ] RSI-based divergence detection
7. [ ] Divergence visualization

**Phase 3: Signals**
8. [ ] Buy/Sell signal logic
9. [ ] Alert conditions
10. [ ] Visual signal markers

**Phase 4: Polish**
11. [ ] Trend bands (optional)
12. [ ] Session highlights (optional)
13. [ ] Code optimization
14. [ ] Testing across assets/timeframes

---

## 📱 Landing Page Sections

1. Hero: "Trade with Structure, Not Emotion"
2. Feature showcase (screenshots)
3. How it works (video walkthrough)
4. Pricing (Basic/Pro)
5. Testimonials (beta testers)
6. FAQ
7. Whop checkout integration

---

## 🚀 Launch Checklist

- [ ] Pine Script complete and tested
- [ ] Invite-only script published on TradingView
- [ ] Whop product created
- [ ] Landing page live (touchgrass.app or subdomain)
- [ ] Tutorial video recorded
- [ ] Beta tester feedback collected
- [ ] Launch tweet thread drafted

---

*Document Version: 1.0*
*Last Updated: February 7, 2026*
