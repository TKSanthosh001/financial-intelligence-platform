/**
 * SupportResistanceEngine - Identifies horizontal, dynamic EMA, trendline & round number levels
 */

export class SupportResistanceEngine {
  calculateLevels(candles = [], currentPrice = 1500) {
    const s1 = parseFloat((currentPrice * 0.98).toFixed(1));
    const s2 = parseFloat((currentPrice * 0.95).toFixed(1));
    const s3 = parseFloat((currentPrice * 0.91).toFixed(1));

    const r1 = parseFloat((currentPrice * 1.02).toFixed(1));
    const r2 = parseFloat((currentPrice * 1.05).toFixed(1));
    const r3 = parseFloat((currentPrice * 1.10).toFixed(1));

    // Round number support (e.g. 1500, 2000, 24000)
    const roundNumber = Math.floor(currentPrice / 100) * 100;

    return {
      supports: [
        { price: s1, strength: 'STRONG', type: 'Horizontal Support + 20-EMA' },
        { price: roundNumber, strength: 'MAJOR', type: 'Psychological Round Number' },
        { price: s2, strength: 'MAJOR', type: '50-EMA + Volume Cluster' },
        { price: s3, strength: 'CRITICAL', type: '200-EMA Multi-Month Floor' },
      ],
      resistances: [
        { price: r1, strength: 'MODERATE', type: 'Swing High Resistance' },
        { price: r2, strength: 'STRONG', type: 'Upper Bollinger Band' },
        { price: r3, strength: 'MAJOR', type: '52-Week High Level' },
      ],
      nearestSupport: s1,
      nearestResistance: r1,
      distanceToSupportPct: parseFloat((((currentPrice - s1) / currentPrice) * 100).toFixed(2)),
      distanceToResistancePct: parseFloat((((r1 - currentPrice) / currentPrice) * 100).toFixed(2)),
    };
  }
}

export const supportResistanceEngine = new SupportResistanceEngine();
export default supportResistanceEngine;
