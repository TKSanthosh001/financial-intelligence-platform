/**
 * MarketBrainEngine - Continuous Intelligence Engine Facade
 */

import TRACKED_STOCKS_PROFILES from './LiveStockProfile';
import consensusEngine from './ConsensusEngine';
import opportunityRankingEngine from './OpportunityRankingEngine';
import selfEvaluationEngine from './SelfEvaluationEngine';
import dailyNarrativeEngine from './DailyNarrativeEngine';

class MarketBrainEngine {
  getMarketBrainSnapshot(userRiskProfile = 'BALANCED') {
    const trackedProfiles = Object.values(TRACKED_STOCKS_PROFILES);
    const consensusTcs = consensusEngine.evaluateConsensus('TCS');
    const rankings = opportunityRankingEngine.rankOpportunities(userRiskProfile);
    const trackRecord = selfEvaluationEngine.getTrackRecord();
    const narrative = dailyNarrativeEngine.generateDailyStory();

    return {
      trackedProfiles,
      consensus: consensusTcs,
      rankings,
      trackRecord,
      narrative,
      timestamp: new Date().toISOString()
    };
  }
}

export const marketBrainEngine = new MarketBrainEngine();
export default marketBrainEngine;
