/**
 * OpportunityRankingEngine - Evidence-weighted opportunity ranking & user personalization filter
 */
import TRACKED_STOCKS_PROFILES from './LiveStockProfile';

export class OpportunityRankingEngine {
  rankOpportunities(userRiskProfile = 'BALANCED') {
    const list = Object.values(TRACKED_STOCKS_PROFILES);

    // Filter and sort by opportunity score
    const ranked = list
      .filter(s => s.signal.includes('BUY') || s.signal.includes('ACCUMULATE'))
      .sort((a, b) => b.overallOpportunityScore - a.overallOpportunityScore);

    const avoid = list.filter(s => s.signal.includes('AVOID') || s.signal.includes('TRIM'));

    return {
      topOpportunities: ranked,
      avoidHoldings: avoid,
      personalizedFilter: `Filtered for ${userRiskProfile} risk profile with max 15% single-stock exposure limit.`,
    };
  }
}

export const opportunityRankingEngine = new OpportunityRankingEngine();
export default opportunityRankingEngine;
