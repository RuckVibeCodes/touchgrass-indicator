// API route for Market Movers data (global stats, trending, gainers)
import { NextResponse } from 'next/server';

interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  market_cap: number;
  total_volume: number;
}

interface TrendingCoin {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
    data?: {
      price: number;
      price_change_percentage_24h?: {
        usd?: number;
      };
    };
  };
}

interface GlobalData {
  data: {
    total_market_cap: { usd: number };
    total_volume: { usd: number };
    market_cap_percentage: { btc: number; eth: number };
    market_cap_change_percentage_24h_usd: number;
  };
}

export interface MarketMoversData {
  global: {
    totalMarketCap: number;
    marketCapChange24h: number;
    totalVolume: number;
    btcDominance: number;
    ethDominance: number;
  };
  trending: {
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    image: string;
  }[];
  gainers: {
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    image: string;
  }[];
  lastUpdated: string;
}

export async function GET() {
  try {
    // Fetch global market data, trending, and top coins in parallel
    const [globalResponse, trendingResponse, marketResponse] = await Promise.all([
      fetch('https://api.coingecko.com/api/v3/global', { next: { revalidate: 120 } }),
      fetch('https://api.coingecko.com/api/v3/search/trending', { next: { revalidate: 120 } }),
      fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h',
        { next: { revalidate: 120 } }
      ),
    ]);

    // Process global data
    let global: MarketMoversData['global'] = {
      totalMarketCap: 0,
      marketCapChange24h: 0,
      totalVolume: 0,
      btcDominance: 0,
      ethDominance: 0,
    };

    if (globalResponse.ok) {
      const globalData: GlobalData = await globalResponse.json();
      global = {
        totalMarketCap: globalData.data.total_market_cap.usd,
        marketCapChange24h: Number(globalData.data.market_cap_change_percentage_24h_usd.toFixed(1)),
        totalVolume: globalData.data.total_volume.usd,
        btcDominance: Number(globalData.data.market_cap_percentage.btc.toFixed(1)),
        ethDominance: Number(globalData.data.market_cap_percentage.eth.toFixed(1)),
      };
    }

    // Process trending coins with price data
    let trending: MarketMoversData['trending'] = [];
    if (trendingResponse.ok) {
      const trendingData = await trendingResponse.json();

      // Get trending coin IDs to fetch their current prices
      const trendingIds = trendingData.coins.slice(0, 3).map((c: TrendingCoin) => c.item.id);

      // Fetch prices for trending coins
      const trendingPricesResponse = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${trendingIds.join(',')}&vs_currencies=usd&include_24hr_change=true`,
        { next: { revalidate: 120 } }
      );

      let trendingPrices: Record<string, { usd: number; usd_24h_change: number }> = {};
      if (trendingPricesResponse.ok) {
        trendingPrices = await trendingPricesResponse.json();
      }

      trending = trendingData.coins.slice(0, 3).map((coin: TrendingCoin) => ({
        symbol: coin.item.symbol.toUpperCase(),
        name: coin.item.name,
        image: coin.item.small,
        price: trendingPrices[coin.item.id]?.usd || 0,
        change24h: Number((trendingPrices[coin.item.id]?.usd_24h_change || 0).toFixed(1)),
      }));
    }

    // Process gainers from market data
    let gainers: MarketMoversData['gainers'] = [];
    if (marketResponse.ok) {
      const marketData: CoinMarketData[] = await marketResponse.json();

      const validCoins = marketData.filter(
        (coin) => coin.price_change_percentage_24h !== null && coin.price_change_percentage_24h !== undefined
      );

      const sortedByChange = [...validCoins].sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
      );

      gainers = sortedByChange.slice(0, 3).map((coin) => ({
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: coin.current_price,
        change24h: Number(coin.price_change_percentage_24h.toFixed(1)),
        image: coin.image,
      }));
    }

    const response: MarketMoversData = {
      global,
      trending,
      gainers,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Market movers error:', error);

    const fallback: MarketMoversData = {
      global: {
        totalMarketCap: 0,
        marketCapChange24h: 0,
        totalVolume: 0,
        btcDominance: 0,
        ethDominance: 0,
      },
      trending: [],
      gainers: [],
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(fallback);
  }
}
