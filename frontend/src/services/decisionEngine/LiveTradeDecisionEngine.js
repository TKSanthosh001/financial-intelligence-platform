/**
 * LiveTradeDecisionEngine - Main Facade for AI Trade Decision System
 */

import weightedConfidenceEngine from './WeightedConfidenceEngine';
import tradeEntryExitEngine from './TradeEntryExitEngine';
import tradeLearningEngine from './TradeLearningEngine';

class LiveTradeDecisionEngine {
  getDecisionDossier(symbol = 'TCS') {
    const setup = tradeEntryExitEngine.generateSetup(symbol);
    const confidence = weightedConfidenceEngine.calculateConfidence({
      technical: 94,
      volume: 95,
      trend: 96,
      institutional: 94,
      news: 88,
      sector: 90,
      macro: 85,
      risk: 88
    });
    const learning = tradeLearningEngine.getLearningMetrics();

    return {
      setup,
      confidence,
      learning,
      timestamp: new Date().toISOString()
    };
  }
}

export const liveTradeDecisionEngine = new LiveTradeDecisionEngine();
export default liveTradeDecisionEngine;
