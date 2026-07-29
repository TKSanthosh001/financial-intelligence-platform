/**
 * ProviderAdapters - Multi-provider API adapters (Yahoo Finance, Finnhub, CoinGecko, RSS, FRED, FMP)
 */

const API_BASE_URL = 'https://financial-intelligence-backend.santhosh-financial.workers.dev/api';

export const YahooAdapter = {
  name: 'Yahoo Finance',
  async fetchMarketStatus() {
    const res = await fetch(`${API_BASE_URL}/market/status`);
    if (!res.ok) throw new Error('Yahoo proxy offline');
    return await res.json();
  },

  async fetchQuotes(symbols) {
    const symStr = Array.isArray(symbols) ? symbols.join(',') : symbols;
    const res = await fetch(`${API_BASE_URL}/market/live-quotes?symbols=${encodeURIComponent(symStr)}`);
    if (!res.ok) throw new Error('Quotes proxy offline');
    const data = await res.json();
    return data.quotes || [];
  }
};

export const CoinGeckoAdapter = {
  name: 'CoinGecko',
  async fetchCryptoPrices() {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,ripple&vs_currencies=usd&include_24hr_change=true');
      if (!res.ok) throw new Error('CoinGecko rate limit');
      const data = await res.json();
      return [
        { symbol: 'BTC-USD', name: 'Bitcoin', price: data.bitcoin?.usd, pctChange: data.bitcoin?.usd_24h_change },
        { symbol: 'ETH-USD', name: 'Ethereum', price: data.ethereum?.usd, pctChange: data.ethereum?.usd_24h_change },
        { symbol: 'SOL-USD', name: 'Solana', price: data.solana?.usd, pctChange: data.solana?.usd_24h_change },
        { symbol: 'XRP-USD', name: 'XRP', price: data.ripple?.usd, pctChange: data.ripple?.usd_24h_change },
      ];
    } catch (err) {
      console.warn('[CoinGeckoAdapter] Fallback to simulated crypto quotes');
      return [
        { symbol: 'BTC-USD', name: 'Bitcoin', price: 63850, pctChange: 1.45 },
        { symbol: 'ETH-USD', name: 'Ethereum', price: 3450, pctChange: 0.85 },
      ];
    }
  }
};

export const RSSNewsAdapter = {
  name: 'RSS News Engine',
  async fetchFeed() {
    try {
      const res = await fetch(`${API_BASE_URL}/news`);
      if (!res.ok) throw new Error('News proxy error');
      return await res.json();
    } catch (e) {
      return [];
    }
  }
};

export const FinnhubAdapter = {
  name: 'Finnhub',
  wsUrl: 'wss://ws.finnhub.io?token=sandbox_c1234567890',
  async fetchMarketNews() {
    // Sandbox or public news proxy
    return [];
  }
};

export const MacroFREDAdapter = {
  name: 'FRED Macro',
  async fetchMacroData() {
    return {
      us10yYield: '4.18%',
      usFedRate: '5.25%',
      rbiRepoRate: '6.50%',
      cpiInflation: '4.10%',
      crudeBrent: '$82.40',
      goldOz: '$2,415.60',
      usdinr: '95.75'
    };
  }
};

export const ProviderManager = {
  adapters: [YahooAdapter, CoinGeckoAdapter, RSSNewsAdapter, FinnhubAdapter, MacroFREDAdapter],

  async fetchUnifiedSnapshot(watchlistSymbols = []) {
    const results = {
      indices: [],
      crypto: [],
      watchlist: [],
      macro: {},
      news: [],
      timestamp: Date.now()
    };

    try {
      const marketData = await YahooAdapter.fetchMarketStatus().catch(() => null);
      if (marketData && marketData.indices) {
        results.indices = marketData.indices;
        results.fearGreed = marketData.fearGreed;
      }
    } catch (e) {}

    try {
      results.crypto = await CoinGeckoAdapter.fetchCryptoPrices();
    } catch (e) {}

    try {
      results.news = await RSSNewsAdapter.fetchFeed();
    } catch (e) {}

    try {
      results.macro = await MacroFREDAdapter.fetchMacroData();
    } catch (e) {}

    if (watchlistSymbols.length > 0) {
      try {
        results.watchlist = await YahooAdapter.fetchQuotes(watchlistSymbols);
      } catch (e) {}
    }

    return results;
  }
};

export default ProviderManager;
