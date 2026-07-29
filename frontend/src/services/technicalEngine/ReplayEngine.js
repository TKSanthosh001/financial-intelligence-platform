/**
 * ReplayEngine - Interactive Chart Replay & AI Prediction Accuracy Tracker
 */

export class ReplayEngine {
  constructor() {
    this.currentIndex = 0;
    this.candles = [];
    this.predictions = [];
  }

  loadCandles(candles = []) {
    this.candles = candles;
    this.currentIndex = Math.min(20, candles.length - 1);
    this.predictions = [];
  }

  getCurrentCandles() {
    return this.candles.slice(0, this.currentIndex + 1);
  }

  stepForward() {
    if (this.currentIndex < this.candles.length - 1) {
      this.currentIndex++;
      return true;
    }
    return false;
  }

  stepBack() {
    if (this.currentIndex > 5) {
      this.currentIndex--;
      return true;
    }
    return false;
  }

  predictNextMove() {
    const current = this.candles[this.currentIndex];
    const nextReal = this.candles[this.currentIndex + 1];

    const isBullishSetup = current.close > current.open;
    const predictedDirection = isBullishSetup ? 'BULLISH (+1.2% Target)' : 'BEARISH (-0.8% Target)';

    let actualDirection = 'N/A';
    let isAccurate = false;
    if (nextReal) {
      actualDirection = nextReal.close >= current.close ? 'BULLISH' : 'BEARISH';
      isAccurate = (isBullishSetup && nextReal.close >= current.close) || (!isBullishSetup && nextReal.close < current.close);
    }

    const predictionRecord = {
      stepIndex: this.currentIndex,
      priceAtPrediction: current.close,
      predictedDirection,
      actualDirection,
      isAccurate,
      confidence: 84,
      timestamp: Date.now()
    };

    this.predictions.push(predictionRecord);
    return predictionRecord;
  }

  getAccuracyStats() {
    if (this.predictions.length === 0) return { total: 0, accurate: 0, accuracyPct: 0 };
    const accurateCount = this.predictions.filter(p => p.isAccurate).length;
    return {
      total: this.predictions.length,
      accurate: accurateCount,
      accuracyPct: Math.round((accurateCount / this.predictions.length) * 100)
    };
  }
}

export const replayEngine = new ReplayEngine();
export default replayEngine;
