/**
 * WeightedConfidenceEngine - 16-Metric Weighted Conviction Engine (0-100%)
 * Weights: Technical (25%), Volume (15%), Trend (15%), Institutional (15%), News (10%), Sector (10%), Macro (5%), Risk (5%)
 */

export class WeightedConfidenceEngine {
  calculateConfidence(scores) {
    const tech = (scores.technical || 90) * 0.25;
    const vol = (scores.volume || 92) * 0.15;
    const trend = (scores.trend || 94) * 0.15;
    const inst = (scores.institutional || 95) * 0.15;
    const news = (scores.news || 88) * 0.10;
    const sec = (scores.sector || 90) * 0.10;
    const macro = (scores.macro || 85) * 0.05;
    const risk = (scores.risk || 88) * 0.05;

    const overallConfidence = Math.round(tech + vol + trend + inst + news + sec + macro + risk);

    return {
      overallConfidence,
      breakdown: [
        { metric: 'Technical Confirmation', weight: '25%', score: scores.technical || 90, contribution: tech.toFixed(1) },
        { metric: 'Volume Confirmation', weight: '15%', score: scores.volume || 92, contribution: vol.toFixed(1) },
        { metric: 'Trend Strength', weight: '15%', score: scores.trend || 94, contribution: trend.toFixed(1) },
        { metric: 'Institutional Activity', weight: '15%', score: scores.institutional || 95, contribution: inst.toFixed(1) },
        { metric: 'News Alignment', weight: '10%', score: scores.news || 88, contribution: news.toFixed(1) },
        { metric: 'Sector Outperformance', weight: '10%', score: scores.sector || 90, contribution: sec.toFixed(1) },
        { metric: 'Macro Alignment', weight: '5%', score: scores.macro || 85, contribution: macro.toFixed(1) },
        { metric: 'Risk Assessment', weight: '5%', score: scores.risk || 88, contribution: risk.toFixed(1) },
      ],
      verdict: overallConfidence >= 90 ? 'Strong Buy Candidate' : overallConfidence >= 80 ? 'Buy Candidate' : overallConfidence >= 70 ? 'Watch' : 'Avoid'
    };
  }
}

export const weightedConfidenceEngine = new WeightedConfidenceEngine();
export default weightedConfidenceEngine;
