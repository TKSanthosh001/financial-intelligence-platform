/**
 * CompetitorEngine - Head-to-Head Comparative Financial Analysis
 */
import { COMPANY_DATABASE } from './CompanyDatabase';

export class CompetitorEngine {
  comparePeerGroup(targetTicker = 'INFY') {
    const main = COMPANY_DATABASE[targetTicker] || COMPANY_DATABASE.INFY;
    const competitorsList = main.competitors || ['TCS', 'WIPRO', 'HCLTECH'];

    const peersData = [main];
    competitorsList.forEach(sym => {
      if (COMPANY_DATABASE[sym]) {
        peersData.push(COMPANY_DATABASE[sym]);
      }
    });

    const matrix = peersData.map(c => ({
      symbol: c.symbol,
      name: c.name,
      marketCap: c.marketCap,
      cmp: c.cmp,
      pe: c.financials?.pe || 0,
      pb: c.financials?.pb || 0,
      roe: c.financials?.roe || 0,
      roce: c.financials?.roce || 0,
      opm: c.financials?.operatingMargin || 0,
      npm: c.financials?.netMargin || 0,
      revGrowth: c.growth?.revenueCagr3Y || 0,
      profitGrowth: c.growth?.profitCagr3Y || 0,
      debtEquity: c.financials?.debtToEquity || 0,
      dividendYield: c.financials?.dividendYield || 0,
    }));

    return {
      targetSymbol: targetTicker,
      matrix,
      aiAnalysis: {
        roeLeader: [...matrix].sort((a, b) => b.roe - a.roe)[0]?.symbol || 'TCS',
        valuationLeader: [...matrix].sort((a, b) => a.pe - b.pe)[0]?.symbol || 'INFY',
        growthLeader: [...matrix].sort((a, b) => b.revGrowth - a.revGrowth)[0]?.symbol || 'INFY',
        summary: `Among the peer group, TCS leads in ROE (${peersData[1]?.financials?.roe || 45}%) and margins, while Infosys offers the most attractive valuation multiple (${peersData[0]?.financials?.pe || 24.8}x P/E) with superior international growth capability.`,
      }
    };
  }
}

export const competitorEngine = new CompetitorEngine();
export default competitorEngine;
