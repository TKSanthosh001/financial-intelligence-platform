/**
 * MarketScanner - Real-time market scanner engine
 */
export class MarketScanner {
  constructor() {
    this.universe = [
      { symbol: 'INFY', name: 'Infosys', price: 1512.4, change: 18.4, pctChange: 1.23, volume: 4850000, deliveryPct: 68.4, ema20: 1495, ema50: 1470, breakout: true },
      { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4150.0, change: 42.1, pctChange: 1.02, volume: 2100000, deliveryPct: 72.1, ema20: 4110, ema50: 4050, breakout: false },
      { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2580.6, change: -12.4, pctChange: -0.48, volume: 6200000, deliveryPct: 58.2, ema20: 2595, ema50: 2570, breakout: false },
      { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1610.2, change: -8.5, pctChange: -0.52, volume: 8900000, deliveryPct: 62.0, ema20: 1625, ema50: 1640, breakdown: true },
      { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1245.8, change: 14.2, pctChange: 1.15, volume: 5400000, deliveryPct: 65.4, ema20: 1230, ema50: 1210, breakout: true },
      { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 985.4, change: 24.1, pctChange: 2.51, volume: 9100000, deliveryPct: 64.2, momentum: true },
      { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1485.0, change: 16.5, pctChange: 1.12, volume: 3800000, deliveryPct: 71.0, breakout: true },
      { symbol: 'TATASTEEL', name: 'Tata Steel', price: 145.2, change: -3.4, pctChange: -2.29, volume: 14200000, deliveryPct: 44.1, breakdown: true },
    ];
  }

  scanTopGainers() {
    return [...this.universe].sort((a, b) => b.pctChange - a.pctChange).slice(0, 5);
  }

  scanTopLosers() {
    return [...this.universe].sort((a, b) => a.pctChange - b.pctChange).slice(0, 5);
  }

  scanBreakouts() {
    return this.universe.filter(s => s.breakout || s.pctChange > 1.5);
  }

  scanBreakdowns() {
    return this.universe.filter(s => s.breakdown || s.pctChange < -1.5);
  }

  scanHighDelivery() {
    return [...this.universe].sort((a, b) => b.deliveryPct - a.deliveryPct).slice(0, 5);
  }

  scanMomentum() {
    return this.universe.filter(s => s.price > s.ema20 && s.ema20 > s.ema50);
  }
}

export const marketScanner = new MarketScanner();
export default marketScanner;
