#!/usr/bin/env node
/**
 * TouchGrass AI Confluence Backtest
 * 
 * Full indicator signals: MA crossover + RSI divergence + VWAP + AI confluence
 * 
 * Usage: node scripts/backtest.js [symbol] [timeframe] [startDate] [endDate]
 */

const https = require('https');
const fs = require('fs');

// Configuration
const CONFIG = {
  symbol: process.argv[2] || 'BTC',
  timeframe: process.argv[3] || '4h',
  startDate: process.argv[4] || '2025-06-01',
  endDate: process.argv[5] || '2026-02-09',
  initialCapital: 10000,
  positionSize: 0.1, // 10% per trade
  stopLossPercent: 2,
  takeProfitPercent: 4,
  
  // Indicator Settings (matching TouchGrass.pine)
  fastMA: 9,
  slowMA: 21,
  rsiLength: 14,
  momLength: 10,
  
  // Confluence Requirements
  requireMACross: true,      // MA crossover signal
  requireRSIConfirm: true,   // RSI not overbought/oversold against trade
  requireVWAPConfirm: true,  // Price position relative to VWAP
  requireDivergence: false,  // Divergence (optional, stricter)
  requireAIConfluence: true, // AI sentiment alignment
  
  apiBaseUrl: 'https://touchgrass.trade'
};

// Fetch historical data from Hyperliquid
async function fetchHistoricalData(symbol, interval, startTime, endTime) {
  return new Promise((resolve, reject) => {
    const intervalMap = { '1m': '1m', '5m': '5m', '15m': '15m', '1h': '1h', '4h': '4h', '1d': '1d' };
    const hlInterval = intervalMap[interval] || '4h';
    const coin = symbol.replace('USDT', '').replace('PERP', '');
    
    const postData = JSON.stringify({
      type: 'candleSnapshot',
      req: { coin, interval: hlInterval, startTime, endTime }
    });
    
    const options = {
      hostname: 'api.hyperliquid.xyz',
      port: 443,
      path: '/info',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (!Array.isArray(result)) {
            resolve([]);
            return;
          }
          const candles = result.map(k => ({
            time: k.t,
            open: parseFloat(k.o),
            high: parseFloat(k.h),
            low: parseFloat(k.l),
            close: parseFloat(k.c),
            volume: parseFloat(k.v)
          }));
          resolve(candles);
        } catch (e) {
          reject(e);
        }
      });
    });
    
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Get AI market pulse
async function getMarketPulse() {
  return new Promise((resolve, reject) => {
    https.get(`${CONFIG.apiBaseUrl}/api/pulse`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Calculate RSI
function calculateRSI(closes, length) {
  if (closes.length < length + 1) return 50;
  
  let gains = 0, losses = 0;
  for (let i = closes.length - length; i < closes.length; i++) {
    const change = closes[i] - closes[i - 1];
    if (change > 0) gains += change;
    else losses -= change;
  }
  
  const avgGain = gains / length;
  const avgLoss = losses / length;
  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}

// Calculate VWAP (simple session VWAP)
function calculateVWAP(candles, lookback = 24) {
  const slice = candles.slice(-lookback);
  let cumPV = 0, cumV = 0;
  
  for (const c of slice) {
    const tp = (c.high + c.low + c.close) / 3;
    cumPV += tp * c.volume;
    cumV += c.volume;
  }
  
  return cumV > 0 ? cumPV / cumV : candles[candles.length - 1].close;
}

// Detect momentum divergence
function detectDivergence(prices, rsiValues, lookback = 10) {
  if (prices.length < lookback || rsiValues.length < lookback) return null;
  
  const recentPrices = prices.slice(-lookback);
  const recentRSI = rsiValues.slice(-lookback);
  
  // Find price lows/highs
  const priceMin = Math.min(...recentPrices);
  const priceMax = Math.max(...recentPrices);
  const priceMinIdx = recentPrices.indexOf(priceMin);
  const priceMaxIdx = recentPrices.indexOf(priceMax);
  
  const currentPrice = recentPrices[recentPrices.length - 1];
  const currentRSI = recentRSI[recentRSI.length - 1];
  
  // Bullish divergence: price makes lower low, RSI makes higher low
  if (currentPrice <= priceMin * 1.01 && currentRSI > recentRSI[priceMinIdx]) {
    return 'bullish';
  }
  
  // Bearish divergence: price makes higher high, RSI makes lower high
  if (currentPrice >= priceMax * 0.99 && currentRSI < recentRSI[priceMaxIdx]) {
    return 'bearish';
  }
  
  return null;
}

// Calculate all indicators
function calculateIndicators(candles) {
  const results = [];
  const closes = [];
  const rsiValues = [];
  
  for (let i = 0; i < candles.length; i++) {
    closes.push(candles[i].close);
    
    if (i < CONFIG.slowMA) {
      rsiValues.push(50);
      continue;
    }
    
    const slice = candles.slice(0, i + 1);
    const current = candles[i];
    
    // Moving Averages
    const fastMA = slice.slice(-CONFIG.fastMA).reduce((sum, c) => sum + c.close, 0) / CONFIG.fastMA;
    const slowMA = slice.slice(-CONFIG.slowMA).reduce((sum, c) => sum + c.close, 0) / CONFIG.slowMA;
    
    // Previous MAs for crossover
    const prevSlice = candles.slice(0, i);
    const prevFastMA = prevSlice.slice(-CONFIG.fastMA).reduce((sum, c) => sum + c.close, 0) / CONFIG.fastMA;
    const prevSlowMA = prevSlice.slice(-CONFIG.slowMA).reduce((sum, c) => sum + c.close, 0) / CONFIG.slowMA;
    
    // Crossover signals
    const bullishCross = prevFastMA <= prevSlowMA && fastMA > slowMA;
    const bearishCross = prevFastMA >= prevSlowMA && fastMA < slowMA;
    
    // RSI
    const rsi = calculateRSI(closes.slice(0, i + 1), CONFIG.rsiLength);
    rsiValues.push(rsi);
    
    // VWAP
    const vwap = calculateVWAP(slice, 24);
    const aboveVWAP = current.close > vwap;
    
    // Divergence
    const divergence = detectDivergence(
      closes.slice(0, i + 1),
      rsiValues,
      15
    );
    
    // Trend
    const trend = fastMA > slowMA ? 'bullish' : 'bearish';
    
    // Generate signal with confluence
    let signal = null;
    let confluenceScore = 0;
    let confluenceDetails = [];
    
    // Check for entry signals
    if (bullishCross || bearishCross) {
      const isBuy = bullishCross;
      
      // MA Cross (required)
      if (CONFIG.requireMACross) {
        confluenceScore++;
        confluenceDetails.push('MA✓');
      }
      
      // RSI Confirmation
      if (CONFIG.requireRSIConfirm) {
        const rsiOK = isBuy ? rsi < 70 : rsi > 30;
        if (rsiOK) {
          confluenceScore++;
          confluenceDetails.push('RSI✓');
        }
      }
      
      // VWAP Confirmation
      if (CONFIG.requireVWAPConfirm) {
        const vwapOK = isBuy ? aboveVWAP : !aboveVWAP;
        if (vwapOK) {
          confluenceScore++;
          confluenceDetails.push('VWAP✓');
        }
      }
      
      // Divergence (optional)
      if (CONFIG.requireDivergence) {
        const divOK = (isBuy && divergence === 'bullish') || (!isBuy && divergence === 'bearish');
        if (divOK) {
          confluenceScore++;
          confluenceDetails.push('DIV✓');
        }
      }
      
      // Determine required score
      let requiredScore = 1; // MA cross minimum
      if (CONFIG.requireRSIConfirm) requiredScore++;
      if (CONFIG.requireVWAPConfirm) requiredScore++;
      if (CONFIG.requireDivergence) requiredScore++;
      
      // Need at least 2/3 of required confirmations (excluding optional divergence)
      const minRequired = CONFIG.requireDivergence ? requiredScore : Math.ceil(requiredScore * 0.66);
      
      if (confluenceScore >= minRequired) {
        signal = isBuy ? 'BUY' : 'SELL';
      }
    }
    
    results.push({
      time: current.time,
      open: current.open,
      high: current.high,
      low: current.low,
      close: current.close,
      volume: current.volume,
      fastMA,
      slowMA,
      rsi,
      vwap,
      aboveVWAP,
      trend,
      divergence,
      bullishCross,
      bearishCross,
      signal,
      confluenceScore,
      confluenceDetails
    });
  }
  
  return results;
}

// Run backtest
async function runBacktest() {
  console.log('🌿 TouchGrass Full Indicator Backtest');
  console.log('=====================================');
  console.log(`Symbol: ${CONFIG.symbol}`);
  console.log(`Timeframe: ${CONFIG.timeframe}`);
  console.log(`Period: ${CONFIG.startDate} to ${CONFIG.endDate}`);
  console.log(`Initial Capital: $${CONFIG.initialCapital}`);
  console.log('');
  console.log('📊 Confluence Requirements:');
  console.log(`   MA Crossover: ${CONFIG.requireMACross ? '✓' : '✗'}`);
  console.log(`   RSI Confirm: ${CONFIG.requireRSIConfirm ? '✓' : '✗'}`);
  console.log(`   VWAP Confirm: ${CONFIG.requireVWAPConfirm ? '✓' : '✗'}`);
  console.log(`   Divergence: ${CONFIG.requireDivergence ? '✓' : '✗'}`);
  console.log(`   AI Confluence: ${CONFIG.requireAIConfluence ? '✓' : '✗'}`);
  console.log('');
  
  // Get AI pulse
  let aiPulse;
  try {
    aiPulse = await getMarketPulse();
    console.log(`🤖 AI Sentiment: ${aiPulse.sentiment} (F&G: ${aiPulse.fearGreedIndex})`);
  } catch (e) {
    console.log('⚠️ Could not fetch AI pulse');
    aiPulse = null;
  }
  
  // Fetch data
  const startTime = new Date(CONFIG.startDate).getTime();
  const endTime = new Date(CONFIG.endDate).getTime();
  
  console.log('\n📈 Fetching historical data...');
  
  let allCandles = [];
  let currentStart = startTime;
  const intervalMs = CONFIG.timeframe === '4h' ? 4 * 60 * 60 * 1000 : 
                     CONFIG.timeframe === '1h' ? 60 * 60 * 1000 :
                     CONFIG.timeframe === '15m' ? 15 * 60 * 1000 : 60 * 60 * 1000;
  
  while (currentStart < endTime) {
    const chunkEnd = Math.min(currentStart + 1000 * intervalMs, endTime);
    try {
      const candles = await fetchHistoricalData(CONFIG.symbol, CONFIG.timeframe, currentStart, chunkEnd);
      allCandles = allCandles.concat(candles);
      currentStart = chunkEnd;
      process.stdout.write('.');
    } catch (e) {
      console.error('\n❌ Error:', e.message);
      break;
    }
  }
  
  console.log(`\n✅ Loaded ${allCandles.length} candles`);
  
  if (allCandles.length < 50) {
    console.error('❌ Not enough data');
    return;
  }
  
  // Calculate indicators
  console.log('\n📊 Calculating indicators...');
  const data = calculateIndicators(allCandles);
  console.log(`✅ Processed ${data.length} candles`);
  
  // Run simulation
  console.log('\n💰 Running backtest...\n');
  
  let capital = CONFIG.initialCapital;
  let position = null;
  const trades = [];
  let wins = 0, losses = 0;
  let maxDrawdown = 0, peak = CONFIG.initialCapital;
  
  for (let i = 0; i < data.length; i++) {
    const candle = data[i];
    
    // Track drawdown
    if (capital > peak) peak = capital;
    const drawdown = (peak - capital) / peak * 100;
    if (drawdown > maxDrawdown) maxDrawdown = drawdown;
    
    // Exit logic
    if (position) {
      const pnlPercent = position.side === 'long' 
        ? (candle.close - position.entry) / position.entry * 100
        : (position.entry - candle.close) / position.entry * 100;
      
      if (pnlPercent <= -CONFIG.stopLossPercent) {
        const pnl = capital * CONFIG.positionSize * (pnlPercent / 100);
        capital += pnl;
        trades.push({ ...position, exit: candle.close, pnl, pnlPercent, reason: 'SL' });
        losses++;
        position = null;
      } else if (pnlPercent >= CONFIG.takeProfitPercent) {
        const pnl = capital * CONFIG.positionSize * (pnlPercent / 100);
        capital += pnl;
        trades.push({ ...position, exit: candle.close, pnl, pnlPercent, reason: 'TP' });
        wins++;
        position = null;
      } else if ((position.side === 'long' && candle.bearishCross) || 
                 (position.side === 'short' && candle.bullishCross)) {
        const pnl = capital * CONFIG.positionSize * (pnlPercent / 100);
        capital += pnl;
        trades.push({ ...position, exit: candle.close, pnl, pnlPercent, reason: 'SIGNAL' });
        if (pnl > 0) wins++; else losses++;
        position = null;
      }
    }
    
    // Entry logic
    if (!position && candle.signal) {
      let aiConfluent = true;
      
      if (CONFIG.requireAIConfluence && aiPulse) {
        if (candle.signal === 'BUY') {
          // Buy on fear or neutral
          aiConfluent = aiPulse.fearGreedIndex <= 40 || aiPulse.sentiment === 'neutral';
        } else {
          // Sell on greed or neutral  
          aiConfluent = aiPulse.fearGreedIndex >= 60 || aiPulse.sentiment === 'neutral';
        }
      }
      
      if (aiConfluent) {
        position = {
          side: candle.signal === 'BUY' ? 'long' : 'short',
          entry: candle.close,
          time: new Date(candle.time).toISOString(),
          confluence: candle.confluenceDetails.join(' ')
        };
      }
    }
  }
  
  // Close open position
  if (position) {
    const lastCandle = data[data.length - 1];
    const pnlPercent = position.side === 'long' 
      ? (lastCandle.close - position.entry) / position.entry * 100
      : (position.entry - lastCandle.close) / position.entry * 100;
    const pnl = capital * CONFIG.positionSize * (pnlPercent / 100);
    capital += pnl;
    trades.push({ ...position, exit: lastCandle.close, pnl, pnlPercent, reason: 'EOD' });
    if (pnl > 0) wins++; else losses++;
  }
  
  // Calculate stats
  const totalReturn = ((capital - CONFIG.initialCapital) / CONFIG.initialCapital * 100);
  const winRate = trades.length > 0 ? (wins / trades.length * 100) : 0;
  const avgWin = trades.filter(t => t.pnl > 0).reduce((sum, t) => sum + t.pnlPercent, 0) / (wins || 1);
  const avgLoss = trades.filter(t => t.pnl < 0).reduce((sum, t) => sum + Math.abs(t.pnlPercent), 0) / (losses || 1);
  const profitFactor = avgLoss > 0 ? (avgWin * wins) / (avgLoss * losses) : 0;
  
  // Results
  console.log('═══════════════════════════════════════════════════');
  console.log('📊 BACKTEST RESULTS - TouchGrass Full Confluence');
  console.log('═══════════════════════════════════════════════════');
  console.log(`Total Trades: ${trades.length}`);
  console.log(`Wins: ${wins} | Losses: ${losses}`);
  console.log(`Win Rate: ${winRate.toFixed(1)}%`);
  console.log(`Avg Win: +${avgWin.toFixed(2)}% | Avg Loss: -${avgLoss.toFixed(2)}%`);
  console.log(`Profit Factor: ${profitFactor.toFixed(2)}`);
  console.log(`Max Drawdown: ${maxDrawdown.toFixed(2)}%`);
  console.log('───────────────────────────────────────────────────');
  console.log(`Starting Capital: $${CONFIG.initialCapital.toFixed(2)}`);
  console.log(`Final Capital: $${capital.toFixed(2)}`);
  console.log(`Total Return: ${totalReturn >= 0 ? '+' : ''}${totalReturn.toFixed(2)}%`);
  console.log('═══════════════════════════════════════════════════');
  
  // Recent trades
  if (trades.length > 0) {
    console.log('\n📋 Recent Trades:');
    trades.slice(-10).forEach(t => {
      const emoji = t.pnl > 0 ? '✅' : '❌';
      console.log(`${emoji} ${t.side.toUpperCase()} @ ${t.entry.toFixed(0)} → ${t.exit.toFixed(0)} | ${t.pnlPercent >= 0 ? '+' : ''}${t.pnlPercent.toFixed(2)}% | ${t.reason} | ${t.confluence}`);
    });
  }
  
  // Save results
  const results = {
    config: CONFIG,
    summary: { trades: trades.length, wins, losses, winRate, avgWin, avgLoss, profitFactor, maxDrawdown, totalReturn, finalCapital: capital },
    trades,
    aiPulse
  };
  
  fs.writeFileSync('/tmp/backtest_results.json', JSON.stringify(results, null, 2));
  console.log('\n💾 Results saved to /tmp/backtest_results.json');
}

runBacktest().catch(console.error);
