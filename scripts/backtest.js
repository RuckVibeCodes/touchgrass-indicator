#!/usr/bin/env node
/**
 * TouchGrass AI Confluence Backtest
 * 
 * Combines traditional technical signals with AI analysis
 * to backtest the confluence strategy.
 * 
 * Usage: node scripts/backtest.js [options]
 */

const https = require('https');
const fs = require('fs');

// Configuration
const CONFIG = {
  symbol: process.argv[2] || 'BTC',
  timeframe: process.argv[3] || '4h',
  startDate: process.argv[4] || '2025-01-01',
  endDate: process.argv[5] || '2026-02-09',
  initialCapital: 10000,
  positionSize: 0.1, // 10% per trade
  stopLossPercent: 2,
  takeProfitPercent: 4,
  aiConfluenceRequired: true, // Require AI confirmation for entries
  apiBaseUrl: 'https://touchgrass.trade'
};

// Fetch historical data from Hyperliquid
async function fetchHistoricalData(symbol, interval, startTime, endTime) {
  return new Promise((resolve, reject) => {
    // Convert interval to Hyperliquid format
    const intervalMap = {
      '1m': '1m', '5m': '5m', '15m': '15m', '1h': '1h', '4h': '4h', '1d': '1d'
    };
    const hlInterval = intervalMap[interval] || '4h';
    
    // Hyperliquid uses coin name without USDT
    const coin = symbol.replace('USDT', '').replace('PERP', '');
    
    const postData = JSON.stringify({
      type: 'candleSnapshot',
      req: {
        coin: coin,
        interval: hlInterval,
        startTime: startTime,
        endTime: endTime
      }
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
            console.log('API Response:', JSON.stringify(result).slice(0, 200));
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

// Calculate technical indicators
function calculateIndicators(candles) {
  const results = [];
  
  for (let i = 20; i < candles.length; i++) {
    const slice = candles.slice(i - 20, i + 1);
    const current = candles[i];
    
    // Fast MA (9)
    const fastMA = slice.slice(-9).reduce((sum, c) => sum + c.close, 0) / 9;
    
    // Slow MA (21)
    const slowMA = slice.reduce((sum, c) => sum + c.close, 0) / 21;
    
    // Previous values for crossover detection
    const prevSlice = candles.slice(i - 21, i);
    const prevFastMA = prevSlice.slice(-9).reduce((sum, c) => sum + c.close, 0) / 9;
    const prevSlowMA = prevSlice.reduce((sum, c) => sum + c.close, 0) / 21;
    
    // Crossover signals
    const bullishCross = prevFastMA <= prevSlowMA && fastMA > slowMA;
    const bearishCross = prevFastMA >= prevSlowMA && fastMA < slowMA;
    
    // RSI (14)
    const gains = [];
    const losses = [];
    for (let j = 1; j < 15 && i - 14 + j < candles.length; j++) {
      const change = candles[i - 14 + j].close - candles[i - 15 + j].close;
      gains.push(change > 0 ? change : 0);
      losses.push(change < 0 ? -change : 0);
    }
    const avgGain = gains.reduce((a, b) => a + b, 0) / 14;
    const avgLoss = losses.reduce((a, b) => a + b, 0) / 14;
    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));
    
    // Trend determination
    const trend = fastMA > slowMA ? 'bullish' : 'bearish';
    
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
      trend,
      bullishCross,
      bearishCross,
      signal: bullishCross ? 'BUY' : bearishCross ? 'SELL' : null
    });
  }
  
  return results;
}

// Run backtest
async function runBacktest() {
  console.log('🌿 TouchGrass AI Confluence Backtest');
  console.log('=====================================');
  console.log(`Symbol: ${CONFIG.symbol}`);
  console.log(`Timeframe: ${CONFIG.timeframe}`);
  console.log(`Period: ${CONFIG.startDate} to ${CONFIG.endDate}`);
  console.log(`Initial Capital: $${CONFIG.initialCapital}`);
  console.log(`AI Confluence Required: ${CONFIG.aiConfluenceRequired}`);
  console.log('');
  
  // Get current AI pulse for confluence
  let aiPulse;
  try {
    aiPulse = await getMarketPulse();
    console.log(`📊 Current AI Sentiment: ${aiPulse.sentiment} (Fear/Greed: ${aiPulse.fearGreedIndex})`);
  } catch (e) {
    console.log('⚠️ Could not fetch AI pulse, proceeding without AI confluence');
    aiPulse = null;
  }
  
  // Convert dates to timestamps
  const startTime = new Date(CONFIG.startDate).getTime();
  const endTime = new Date(CONFIG.endDate).getTime();
  
  console.log('\n📈 Fetching historical data...');
  
  // Fetch data in chunks (Binance limits to 1000 candles)
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
      console.error('\n❌ Error fetching data:', e.message);
      break;
    }
  }
  
  console.log(`\n✅ Loaded ${allCandles.length} candles`);
  
  if (allCandles.length < 30) {
    console.error('❌ Not enough data for backtest');
    return;
  }
  
  // Calculate indicators
  console.log('\n📊 Calculating indicators...');
  const data = calculateIndicators(allCandles);
  console.log(`✅ Calculated indicators for ${data.length} candles`);
  
  // Run backtest simulation
  console.log('\n💰 Running backtest...\n');
  
  let capital = CONFIG.initialCapital;
  let position = null;
  const trades = [];
  let wins = 0;
  let losses = 0;
  
  for (let i = 0; i < data.length; i++) {
    const candle = data[i];
    
    // Check for exit if in position
    if (position) {
      const pnlPercent = position.side === 'long' 
        ? (candle.close - position.entry) / position.entry * 100
        : (position.entry - candle.close) / position.entry * 100;
      
      // Stop loss
      if (pnlPercent <= -CONFIG.stopLossPercent) {
        const pnl = capital * CONFIG.positionSize * (pnlPercent / 100);
        capital += pnl;
        trades.push({ ...position, exit: candle.close, pnl, pnlPercent, reason: 'SL' });
        losses++;
        position = null;
      }
      // Take profit
      else if (pnlPercent >= CONFIG.takeProfitPercent) {
        const pnl = capital * CONFIG.positionSize * (pnlPercent / 100);
        capital += pnl;
        trades.push({ ...position, exit: candle.close, pnl, pnlPercent, reason: 'TP' });
        wins++;
        position = null;
      }
      // Opposite signal exit
      else if ((position.side === 'long' && candle.bearishCross) || 
               (position.side === 'short' && candle.bullishCross)) {
        const pnl = capital * CONFIG.positionSize * (pnlPercent / 100);
        capital += pnl;
        trades.push({ ...position, exit: candle.close, pnl, pnlPercent, reason: 'SIGNAL' });
        if (pnl > 0) wins++;
        else losses++;
        position = null;
      }
    }
    
    // Check for entry
    if (!position && candle.signal) {
      // AI Confluence check
      let aiConfluent = true;
      if (CONFIG.aiConfluenceRequired && aiPulse) {
        if (candle.signal === 'BUY') {
          // For longs, prefer neutral or bullish sentiment, or extreme fear (contrarian)
          aiConfluent = aiPulse.fearGreedIndex <= 25 || // Extreme fear = buy opportunity
                        aiPulse.sentiment === 'neutral' ||
                        aiPulse.sentiment === 'greed';
        } else {
          // For shorts, prefer extreme greed (contrarian) or bearish
          aiConfluent = aiPulse.fearGreedIndex >= 75 || // Extreme greed = sell opportunity
                        aiPulse.sentiment === 'neutral' ||
                        aiPulse.sentiment === 'fear';
        }
      }
      
      if (aiConfluent) {
        position = {
          side: candle.signal === 'BUY' ? 'long' : 'short',
          entry: candle.close,
          time: new Date(candle.time).toISOString(),
          aiConfluence: aiPulse ? aiPulse.sentiment : 'N/A'
        };
      }
    }
  }
  
  // Close any open position at end
  if (position) {
    const lastCandle = data[data.length - 1];
    const pnlPercent = position.side === 'long' 
      ? (lastCandle.close - position.entry) / position.entry * 100
      : (position.entry - lastCandle.close) / position.entry * 100;
    const pnl = capital * CONFIG.positionSize * (pnlPercent / 100);
    capital += pnl;
    trades.push({ ...position, exit: lastCandle.close, pnl, pnlPercent, reason: 'EOD' });
    if (pnl > 0) wins++;
    else losses++;
  }
  
  // Results
  console.log('═══════════════════════════════════════');
  console.log('📊 BACKTEST RESULTS');
  console.log('═══════════════════════════════════════');
  console.log(`Total Trades: ${trades.length}`);
  console.log(`Wins: ${wins} | Losses: ${losses}`);
  console.log(`Win Rate: ${trades.length > 0 ? (wins / trades.length * 100).toFixed(1) : 0}%`);
  console.log(`Starting Capital: $${CONFIG.initialCapital.toFixed(2)}`);
  console.log(`Final Capital: $${capital.toFixed(2)}`);
  console.log(`Total Return: ${((capital - CONFIG.initialCapital) / CONFIG.initialCapital * 100).toFixed(2)}%`);
  console.log('');
  
  // Show last 10 trades
  if (trades.length > 0) {
    console.log('📋 Recent Trades:');
    console.log('─────────────────────────────────────');
    trades.slice(-10).forEach(t => {
      const emoji = t.pnl > 0 ? '✅' : '❌';
      console.log(`${emoji} ${t.side.toUpperCase()} @ ${t.entry.toFixed(2)} → ${t.exit.toFixed(2)} | ${t.pnlPercent.toFixed(2)}% | ${t.reason}`);
    });
  }
  
  // Save results
  const results = {
    config: CONFIG,
    summary: {
      totalTrades: trades.length,
      wins,
      losses,
      winRate: trades.length > 0 ? (wins / trades.length * 100).toFixed(1) : 0,
      startingCapital: CONFIG.initialCapital,
      finalCapital: capital,
      totalReturn: ((capital - CONFIG.initialCapital) / CONFIG.initialCapital * 100).toFixed(2)
    },
    trades,
    aiPulse
  };
  
  fs.writeFileSync('/tmp/backtest_results.json', JSON.stringify(results, null, 2));
  console.log('\n💾 Full results saved to /tmp/backtest_results.json');
}

runBacktest().catch(console.error);
