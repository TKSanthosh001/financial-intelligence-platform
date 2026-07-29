/**
 * TechnicalScoringEngine - Multi-dimensional Technical Scoring System (0-100)
 */

export class TechnicalScoringEngine {
  evaluateScores(indicators, volume, patterns, structure) {
    if (!indicators) return null;

    // 1. Trend Score (0-100)
    let trendScore = 70;
    if (indicators.price > indicators.ema20 && indicators.ema20 > indicators.ema50) trendScore = 92;
    else if (indicators.price < indicators.ema20) trendScore = 45;

    // 2. Momentum Score (0-100)
    let momentumScore = 65;
    if (indicators.rsi14 >= 55 && indicators.rsi14 <= 70) momentumScore = 88;
    else if (indicators.rsi14 > 70) momentumScore = 75; // overbought risk
    else if (indicators.rsi14 < 40) momentumScore = 35;

    // 3. Volume Score (0-100)
    let volumeScore = volume?.volumeRatio > 1.5 ? 90 : 72;

    // 4. Pattern Score (0-100)
    let patternScore = patterns?.chartPatterns?.length > 0 ? 85 : 70;

    // 5. Risk Score (0-100, 100 = Low Risk)
    let riskScore = indicators.rsi14 > 75 ? 40 : 82;

    // 6. Support / Resistance Score
    let supportScore = 86;
    let resistanceScore = 74;

    // Overall Technical Score
    const overallScore = Math.round(
      trendScore * 0.30 +
      momentumScore * 0.25 +
      volumeScore * 0.15 +
      patternScore * 0.15 +
      riskScore * 0.15
    );

    return {
      overallScore,
      rating: overallScore >= 80 ? 'STRONG BULLISH SETUP' : overallScore >= 65 ? 'BULLISH / ACCUMULATE' : overallScore >= 50 ? 'NEUTRAL / CONSOLIDATION' : 'BEARISH / AVOID',
      color: overallScore >= 80 ? 'success' : overallScore >= 65 ? 'info' : overallScore >= 50 ? 'warning' : 'error',
      subScores: {
        trend: trendScore,
        momentum: momentumScore,
        volume: volumeScore,
        pattern: patternScore,
        risk: riskScore,
        support: supportScore,
        resistance: resistanceScore,
      }
    };
  }
}

export const technicalScoringEngine = new TechnicalScoringEngine();
export default technicalScoringEngine;
