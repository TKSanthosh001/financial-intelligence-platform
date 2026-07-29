/**
 * CacheManager - High Speed Tiered Memory & Storage Caching Layer
 */
class CacheManager {
  constructor() {
    this.memoryCache = new Map();
    this.defaultTTL = {
      ticker: 5000,         // 5s
      movers: 15000,        // 15s
      global: 30000,        // 30s
      technicals: 60000,    // 1m
      news: 120000,         // 2m
      fundamentals: 300000, // 5m
      macro: 900000,        // 15m
      company: 3600000,     // 1h
    };
  }

  set(key, data, category = 'ticker', customTTL = null) {
    const ttl = customTTL || this.defaultTTL[category] || 15000;
    const expiresAt = Date.now() + ttl;
    const entry = { data, expiresAt, category, updatedAt: Date.now() };

    this.memoryCache.set(key, entry);

    // Save persistent categories to localStorage
    if (['fundamentals', 'company', 'watchlists', 'portfolio'].includes(category)) {
      try {
        localStorage.setItem(`aegis_cache_${key}`, JSON.stringify(entry));
      } catch (e) {
        // quota exceeded fallback
      }
    }
  }

  get(key) {
    const inMem = this.memoryCache.get(key);
    if (inMem) {
      if (Date.now() < inMem.expiresAt) {
        return inMem.data;
      }
      this.memoryCache.delete(key);
    }

    // Try localStorage fallback
    try {
      const stored = localStorage.getItem(`aegis_cache_${key}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Date.now() < parsed.expiresAt) {
          this.memoryCache.set(key, parsed);
          return parsed.data;
        }
        localStorage.removeItem(`aegis_cache_${key}`);
      }
    } catch (e) {}

    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  invalidate(key) {
    this.memoryCache.delete(key);
    try {
      localStorage.removeItem(`aegis_cache_${key}`);
    } catch (e) {}
  }

  clear() {
    this.memoryCache.clear();
  }
}

export const cacheManager = new CacheManager();
export default cacheManager;
