/**
 * MarketDataEngine - Real-Time Unified Market Data Engine
 * =======================================================
 * Integrates WebSockets, multi-tier background polling, cache manager,
 * data quality validation, scanners, breadth calculator, and AI event triggers.
 */

import eventBus from './EventBus';
import cacheManager from './CacheManager';
import dataQualityEngine from './DataQualityEngine';
import ProviderManager from './ProviderAdapters';
import wsManager from './WebSocketManager';
import pollingManager from './PollingManager';
import marketScanner from './MarketScanner';
import marketBreadth from './MarketBreadth';
import aiEventTriggers from './AIEventTriggers';

class MarketDataEngine {
  constructor() {
    this.isInitialized = false;
    this.watchlist = ['INFY', 'TCS', 'RELIANCE', 'HDFCBANK', 'ICICIBANK'];
    this.alerts = [];
    this.setupListeners();
  }

  setupListeners() {
    // Listen for market ticks from WebSocket or Polling
    eventBus.on('market:tick', (rawTick) => {
      const sanitized = dataQualityEngine.sanitizeQuote(rawTick);
      if (sanitized) {
        cacheManager.set(`quote_${sanitized.symbol}`, sanitized, 'ticker');
        aiEventTriggers.evaluateQuote(sanitized);
        eventBus.emit('market:quote_updated', sanitized);
      }
    });

    eventBus.on('market:quote', (rawQuote) => {
      const sanitized = dataQualityEngine.sanitizeQuote(rawQuote);
      if (sanitized) {
        cacheManager.set(`quote_${sanitized.symbol}`, sanitized, 'ticker');
        aiEventTriggers.evaluateQuote(sanitized);
        eventBus.emit('market:quote_updated', sanitized);
      }
    });

    eventBus.on('market:news', (newsItems) => {
      if (Array.isArray(newsItems)) {
        newsItems.forEach(item => aiEventTriggers.evaluateNews(item));
      }
    });
  }

  async init(watchlistSymbols = []) {
    if (this.isInitialized) return;
    if (watchlistSymbols.length > 0) {
      this.watchlist = watchlistSymbols;
      pollingManager.setWatchlistSymbols(watchlistSymbols);
    }

    console.log('[MarketDataEngine] Initializing Unified Real-Time Engine...');

    // 1. Attempt WebSocket connection
    wsManager.connect();

    // 2. Start multi-tier background polling
    pollingManager.start();

    this.isInitialized = true;
    eventBus.emit('engine:ready', { timestamp: Date.now() });
  }

  getSnapshot() {
    const cachedGlobal = cacheManager.get('global_markets');
    const cachedNews = cacheManager.get('latest_news') || [];
    const cachedMacro = cacheManager.get('macro_data') || {};

    const breadthData = marketBreadth.calculateBreadth();
    const topGainers = marketScanner.scanTopGainers();
    const topLosers = marketScanner.scanTopLosers();
    const breakouts = marketScanner.scanBreakouts();

    return {
      global: cachedGlobal,
      news: cachedNews,
      macro: cachedMacro,
      breadth: breadthData,
      scans: {
        gainers: topGainers,
        losers: topLosers,
        breakouts,
      },
      watchlist: this.watchlist.map(sym => cacheManager.get(`quote_${sym}`)).filter(Boolean),
      timestamp: Date.now()
    };
  }

  setWatchlist(symbols) {
    this.watchlist = symbols;
    pollingManager.setWatchlistSymbols(symbols);
    symbols.forEach(sym => wsManager.subscribe(sym));
  }

  addWatchlistSymbol(symbol) {
    if (!this.watchlist.includes(symbol)) {
      this.watchlist.push(symbol);
      this.setWatchlist(this.watchlist);
    }
  }

  removeWatchlistSymbol(symbol) {
    this.watchlist = this.watchlist.filter(s => s !== symbol);
    this.setWatchlist(this.watchlist);
    wsManager.unsubscribe(symbol);
  }

  destroy() {
    wsManager.disconnect();
    pollingManager.stop();
    eventBus.clear();
    this.isInitialized = false;
  }
}

export const marketDataEngine = new MarketDataEngine();
export default marketDataEngine;
