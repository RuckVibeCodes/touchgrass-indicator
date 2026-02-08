// API route for market snapshot data (prices, fear/greed, AI pulse)
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  priceChange24h: number;
  color: string;
  logoUrl: string;
}

export interface MarketSnapshot {
  cryptos: CryptoPrice[];
  fearGreedIndex: number;
  fearGreedClassification: string;
  aiComment: string;
  riskMode: string;
  mood: string;
  bias: string;
  lastUpdated: string;
}

export async function GET() {
  try {
    // Fetch cryptocurrency data from CoinGecko API
    const coinGeckoResponse = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana,ripple&order=market_cap_desc&sparkline=false&price_change_percentage=24h',
      { next: { revalidate: 60 } }
    );

    if (!coinGeckoResponse.ok) {
      throw new Error('CoinGecko API failed');
    }

    const coinGeckoData = await coinGeckoResponse.json();

    // Map CoinGecko IDs to our symbols
    const symbolMap: Record<string, { symbol: string; color: string }> = {
      bitcoin: { symbol: 'BTC', color: 'text-orange-500' },
      ethereum: { symbol: 'ETH', color: 'text-blue-500' },
      binancecoin: { symbol: 'BNB', color: 'text-yellow-500' },
      solana: { symbol: 'SOL', color: 'text-purple-500' },
      ripple: { symbol: 'XRP', color: 'text-gray-400' },
    };

    // Build array of crypto prices with logos
    const cryptos: CryptoPrice[] = coinGeckoData.map((coin: {
      id: string;
      name: string;
      current_price: number;
      price_change_percentage_24h: number;
      image: string;
    }) => ({
      symbol: symbolMap[coin.id]?.symbol || coin.id.toUpperCase(),
      name: coin.name,
      price: coin.current_price,
      priceChange24h: Number(coin.price_change_percentage_24h?.toFixed(2)) || 0,
      color: symbolMap[coin.id]?.color || 'text-gray-500',
      logoUrl: coin.image,
    }));

    // Fetch real Fear & Greed Index from Alternative.me
    const fearGreedResponse = await fetch(
      'https://api.alternative.me/fng/?limit=1',
      { next: { revalidate: 60 } }
    );

    let fearGreedIndex = 50;
    let fearGreedClassification = 'Neutral';

    if (fearGreedResponse.ok) {
      const fearGreedData = await fearGreedResponse.json();
      fearGreedIndex = parseInt(fearGreedData.data[0].value);
      fearGreedClassification = fearGreedData.data[0].value_classification;
    }

    // Calculate Risk Mode based on Fear & Greed and BTC performance
    const btcChange = cryptos.find(c => c.symbol === 'BTC')?.priceChange24h || 0;
    let riskMode = 'Neutral';
    if (fearGreedIndex >= 60 && btcChange > 0) {
      riskMode = 'Risk-On';
    } else if (fearGreedIndex <= 40 || btcChange < -3) {
      riskMode = 'Risk-Off';
    }

    // Calculate Market Mood
    let mood = 'Neutral';
    if (fearGreedIndex <= 20) {
      mood = 'Capitulation';
    } else if (fearGreedIndex <= 35) {
      mood = 'Fear';
    } else if (fearGreedIndex >= 75) {
      mood = 'Euphoria';
    } else if (fearGreedIndex >= 60) {
      mood = 'Greed';
    }

    // Calculate Bias
    const avgChange = cryptos.reduce((acc, c) => acc + c.priceChange24h, 0) / cryptos.length;
    let bias = 'Neutral';
    if (avgChange > 2) {
      bias = 'Bullish';
    } else if (avgChange < -2) {
      bias = 'Bearish';
    }

    // Generate AI Pulse comment
    let aiComment = 'Market conditions mixed; stay nimble.';
    
    if (process.env.OPENAI_API_KEY) {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a professional crypto trader who writes short, natural, actionable market commentary.'
            },
            {
              role: 'user',
              content: `Create ONE sentence (max 15 words) that gives traders an immediate "feel" for current market conditions.

Data:
- BTC: $${cryptos.find(c => c.symbol === 'BTC')?.price.toLocaleString()} (${btcChange >= 0 ? '+' : ''}${btcChange}%)
- ETH: $${cryptos.find(c => c.symbol === 'ETH')?.price.toLocaleString()}
- Fear & Greed: ${fearGreedIndex}/100 (${fearGreedClassification})
- Market Mood: ${mood}

Style: Clean, human, trader-friendly, slightly opinionated, non-robotic.

Focus on ONE idea: momentum, chop, trap risks, sentiment extremes, or trend exhaustion.

Examples:
- "BTC steady as greed rises; engineered dips likely before next leg."
- "Momentum slowing into resistance; late longs exposed."
- "Fear elevated but sellers tiring; mean reversion setup."

Return ONLY the final sentence.`
            }
          ],
          temperature: 0.9,
          max_tokens: 50,
        });

        aiComment = completion.choices[0].message.content?.trim() || aiComment;
      } catch (aiError) {
        console.error('AI comment error:', aiError);
      }
    }

    const snapshot: MarketSnapshot = {
      cryptos,
      fearGreedIndex,
      fearGreedClassification,
      aiComment,
      riskMode,
      mood,
      bias,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(snapshot);
  } catch (error) {
    console.error('Market data error:', error);

    // Fallback response if APIs fail
    const fallbackSnapshot: MarketSnapshot = {
      cryptos: [
        { symbol: 'BTC', name: 'Bitcoin', price: 69000, priceChange24h: 0, color: 'text-orange-500', logoUrl: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png' },
        { symbol: 'ETH', name: 'Ethereum', price: 2500, priceChange24h: 0, color: 'text-blue-500', logoUrl: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png' },
        { symbol: 'BNB', name: 'BNB', price: 300, priceChange24h: 0, color: 'text-yellow-500', logoUrl: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png' },
        { symbol: 'SOL', name: 'Solana', price: 100, priceChange24h: 0, color: 'text-purple-500', logoUrl: 'https://assets.coingecko.com/coins/images/4128/large/solana.png' },
        { symbol: 'XRP', name: 'XRP', price: 0.5, priceChange24h: 0, color: 'text-gray-400', logoUrl: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png' },
      ],
      fearGreedIndex: 50,
      fearGreedClassification: 'Neutral',
      aiComment: 'Market data temporarily unavailable.',
      riskMode: 'Neutral',
      mood: 'Neutral',
      bias: 'Neutral',
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(fallbackSnapshot);
  }
}
