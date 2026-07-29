/**
 * FinancialIntelligenceEngine - Main Facade Orchestrating Institutional Equity Research
 */

import { getCompanyProfile } from './CompanyDatabase';
import ratioCalculator from './FinancialRatioCalculator';
import qualityScoreEngine from './QualityScoreEngine';
import valuationEngine from './ValuationEngine';
import competitorEngine from './CompetitorEngine';
import economicMoatEngine from './EconomicMoatEngine';
import financialRiskEngine from './FinancialRiskEngine';
import documentAnalyzer from './DocumentAnalyzer';

class FinancialIntelligenceEngine {
  generateResearchDossier(ticker = 'INFY') {
    const profile = getCompanyProfile(ticker);
    const ratios = ratioCalculator.calculateRatios(profile);
    const quality = qualityScoreEngine.evaluateQuality(profile);
    const valuation = valuationEngine.calculateValuation(profile);
    const peers = competitorEngine.comparePeerGroup(profile.symbol);
    const moat = economicMoatEngine.evaluateMoat(profile);
    const risk = financialRiskEngine.auditRisks(profile);
    const docAnalysis = documentAnalyzer.analyzeDocument(profile.symbol);

    return {
      profile,
      ratios,
      quality,
      valuation,
      peers,
      moat,
      risk,
      docAnalysis,
      timestamp: new Date().toISOString(),
    };
  }
}

export const financialIntelligenceEngine = new FinancialIntelligenceEngine();
export default financialIntelligenceEngine;
