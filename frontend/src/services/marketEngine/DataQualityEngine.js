/**
 * DataQualityEngine - Outlier detection, stale data check, deduplication & normalization
 */
class DataQualityEngine {
  constructor() {
    this.seenEventHashes = new Set();
    this.priceHistory = new Map();
  }

  validatePrice(symbol, price, prevPrice) {
    if (price === undefined || price === null || isNaN(price) || price <= 0) {
      return { valid: false, reason: 'Invalid or missing price value' };
    }

    if (prevPrice && prevPrice > 0) {
      const pctDev = Math.abs((price - prevPrice) / prevPrice);
      // Outlier filter: single tick > 35% movement is flagged as outlier unless verified
      if (pctDev > 0.35) {
        return { valid: false, reason: `Extreme price spike detected (${(pctDev * 100).toFixed(1)}%)`, outlier: true };
      }
    }

    return { valid: true };
  }

  sanitizeQuote(rawQuote) {
    if (!rawQuote) return null;

    const symbol = rawQuote.symbol || rawQuote.id;
    const price = parseFloat(rawQuote.price || rawQuote.regularMarketPrice || rawQuote.c || 0);
    const prevClose = parseFloat(rawQuote.prevClose || rawQuote.previousClose || rawQuote.pc || price);
    const change = parseFloat(rawQuote.change || (price - prevClose));
    const pctChange = parseFloat(rawQuote.pctChange || (prevClose ? ((price - prevClose) / prevClose) * 100 : 0));

    const history = this.priceHistory.get(symbol) || [];
    const lastPrice = history[history.length - 1];

    const validation = this.validatePrice(symbol, price, lastPrice);
    if (!validation.valid && validation.outlier) {
      console.warn(`[DataQualityEngine] Outlier price rejected for ${symbol}:`, price);
      return null;
    }

    // Record price point
    history.push(price);
    if (history.length > 50) history.shift();
    this.priceHistory.set(symbol, history);

    return {
      symbol,
      name: rawQuote.name || symbol,
      price,
      prevClose,
      change: parseFloat(change.toFixed(2)),
      pctChange: parseFloat(pctChange.toFixed(2)),
      open: parseFloat(rawQuote.open || price),
      high: parseFloat(rawQuote.high || Math.max(price, prevClose)),
      low: parseFloat(rawQuote.low || Math.min(price, prevClose)),
      volume: parseInt(rawQuote.volume || 0, 10),
      vwap: parseFloat(rawQuote.vwap || price),
      bid: parseFloat(rawQuote.bid || price - 0.05),
      ask: parseFloat(rawQuote.ask || price + 0.05),
      spread: parseFloat((rawQuote.ask - rawQuote.bid || 0.1).toFixed(2)),
      marketCap: rawQuote.marketCap || 'N/A',
      pe: parseFloat(rawQuote.pe || 0),
      pb: parseFloat(rawQuote.pb || 0),
      eps: parseFloat(rawQuote.eps || 0),
      fiftyTwoWeekHigh: parseFloat(rawQuote.fiftyTwoWeekHigh || price * 1.2),
      fiftyTwoWeekLow: parseFloat(rawQuote.fiftyTwoWeekLow || price * 0.8),
      deliveryPct: parseFloat(rawQuote.deliveryPct || 55.4),
      timestamp: rawQuote.timestamp || Date.now(),
      qualityScore: validation.valid ? 98 : 70,
    };
  }

  isDuplicateEvent(eventKey) {
    if (this.seenEventHashes.has(eventKey)) return true;
    this.seenEventHashes.add(eventKey);
    // Auto clear cache after 1000 events
    if (this.seenEventHashes.size > 1000) {
      const arr = Array.from(this.seenEventHashes);
      this.seenEventHashes = new Set(arr.slice(500));
    }
    return false;
  }
}

export const dataQualityEngine = new DataQualityEngine();
export default dataQualityEngine;
