/**
 * MemoryEngine - Contextual Market Memory & Why Now / What Changed Audits
 */

export class MemoryEngine {
  getMarketMemory() {
    return {
      whyChanged: 'FII flow flipped from net sellers to net buyers (+₹4,200 Cr in cash market), driving Banking sector breakout.',
      historicalContext: 'Nifty Bank crossed 56,700 level for the first time since June policy review.',
      failedSignalsLog: [
        { symbol: 'TATAMOTORS', reason: 'Stopped out at ₹940 (-2.1%) due to unexpected China supply chain disruption news.' }
      ],
      successfulSignalsLog: [
        { symbol: 'TCS', returnPct: 6.2, reason: 'Breakout above ₹3785 validated by 3.5x volume spike.' },
        { symbol: 'INFY', returnPct: 6.0, reason: 'Cloud deal wins drove institutional buying.' }
      ]
    };
  }
}

export const memoryEngine = new MemoryEngine();
export default memoryEngine;
