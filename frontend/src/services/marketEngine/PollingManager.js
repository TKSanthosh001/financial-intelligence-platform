/**
 * PollingManager - Multi-tiered background scheduler for real-time market refresh
 */
import eventBus from './EventBus';
import ProviderManager from './ProviderAdapters';
import cacheManager from './CacheManager';

class PollingManager {
  constructor() {
    this.timers = {};
    this.watchlistSymbols = ['INFY', 'TCS', 'RELIANCE', 'HDFCBANK', 'ICICIBANK'];
    this.isRunning = false;
  }

  setWatchlistSymbols(symbols) {
    this.watchlistSymbols = symbols;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    console.log('[PollingManager] Starting multi-tier background services...');

    // Execute immediately on boot
    this.tickWatchlist();
    this.tickMovers();
    this.tickGlobalMarkets();
    this.tickTechnicals();
    this.tickNews();
    this.tickFundamentals();
    this.tickMacro();

    // 5s: Watchlist Prices
    this.timers['5s'] = setInterval(() => this.tickWatchlist(), 5000);

    // 15s: Market Movers
    this.timers['15s'] = setInterval(() => this.tickMovers(), 15000);

    // 30s: Global Markets & Broad Indices
    this.timers['30s'] = setInterval(() => this.tickGlobalMarkets(), 30000);

    // 1m: Technical Indicators
    this.timers['1m'] = setInterval(() => this.tickTechnicals(), 60000);

    // 2m: News Feed
    this.timers['2m'] = setInterval(() => this.tickNews(), 120000);

    // 5m: Fundamentals
    this.timers['5m'] = setInterval(() => this.tickFundamentals(), 300000);

    // 15m: Macro Indicators
    this.timers['15m'] = setInterval(() => this.tickMacro(), 900000);

    // 1h: Company Financials
    this.timers['1h'] = setInterval(() => this.tickFinancials(), 3600000);
  }

  stop() {
    Object.keys(this.timers).forEach(key => clearInterval(this.timers[key]));
    this.timers = {};
    this.isRunning = false;
    console.log('[PollingManager] Stopped background services.');
  }

  async tickWatchlist() {
    try {
      const data = await ProviderManager.fetchUnifiedSnapshot(this.watchlistSymbols);
      if (data.watchlist) {
        data.watchlist.forEach(item => {
          cacheManager.set(`quote_${item.symbol}`, item, 'ticker');
          eventBus.emit('market:quote', item);
        });
      }
    } catch (e) {}
  }

  async tickMovers() {
    try {
      const snapshot = await ProviderManager.fetchUnifiedSnapshot();
      eventBus.emit('market:movers', snapshot.indices || []);
    } catch (e) {}
  }

  async tickGlobalMarkets() {
    try {
      const snapshot = await ProviderManager.fetchUnifiedSnapshot();
      cacheManager.set('global_markets', snapshot, 'global');
      eventBus.emit('market:global', snapshot);
    } catch (e) {}
  }

  async tickTechnicals() {
    eventBus.emit('market:technicals_refreshed', { timestamp: Date.now() });
  }

  async tickNews() {
    try {
      const news = await ProviderManager.adapters[2].fetchFeed();
      cacheManager.set('latest_news', news, 'news');
      eventBus.emit('market:news', news);
    } catch (e) {}
  }

  async tickFundamentals() {
    eventBus.emit('market:fundamentals_refreshed', { timestamp: Date.now() });
  }

  async tickMacro() {
    try {
      const macro = await ProviderManager.adapters[4].fetchMacroData();
      cacheManager.set('macro_data', macro, 'macro');
      eventBus.emit('market:macro', macro);
    } catch (e) {}
  }

  async tickFinancials() {
    eventBus.emit('market:financials_refreshed', { timestamp: Date.now() });
  }
}

export const pollingManager = new PollingManager();
export default pollingManager;
