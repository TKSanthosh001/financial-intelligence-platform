/**
 * QualityScoreEngine - Institutional Quality & Health Scoring System (0-100)
 */

export class QualityScoreEngine {
  evaluateQuality(companyData) {
    const fin = companyData.financials || {};
    const growth = companyData.growth || {};
    const mgmt = companyData.management || {};

    // 1. Debt Score
    let debtScore = 100;
    if (fin.debtToEquity > 0.5) debtScore -= 30;
    if (fin.debtToEquity > 1.0) debtScore -= 40;
    if (mgmt.promoterPledge > 0) debtScore -= (mgmt.promoterPledge * 2);

    // 2. Profitability Score
    let profitScore = 90;
    if (fin.roe >= 30) profitScore = 98;
    else if (fin.roe >= 20) profitScore = 88;
    else if (fin.roe < 15) profitScore = 65;

    // 3. Cash Flow Score
    let cashFlowScore = fin.fcfCr > 10000 ? 95 : fin.fcfCr > 2000 ? 82 : 70;

    // 4. Growth Score
    let growthScore = 75;
    if (growth.revenueCagr3Y > 15) growthScore = 95;
    else if (growth.revenueCagr3Y > 10) growthScore = 85;

    // 5. Capital Allocation Score
    let capitalScore = (fin.roce > 35) ? 96 : (fin.roce > 20) ? 86 : 72;

    // 6. Management & Governance Score
    let mgmtScore = 90;
    if (mgmt.promoterPledge > 0) mgmtScore -= 25;

    // 7. Business Quality Score
    let businessScore = companyData.moat?.score || 85;

    // 8. Financial Health Score
    let healthScore = Math.round((debtScore * 0.4) + (profitScore * 0.3) + (cashFlowScore * 0.3));

    const overall = Math.round(
      healthScore * 0.20 +
      businessScore * 0.20 +
      profitScore * 0.15 +
      growthScore * 0.15 +
      capitalScore * 0.10 +
      mgmtScore * 0.10 +
      cashFlowScore * 0.10
    );

    return {
      overall,
      rating: overall >= 85 ? 'AAA - Institutional Grade' : overall >= 75 ? 'AA - Quality Investment' : 'A - Moderate Quality',
      scores: {
        financialHealth: healthScore,
        businessQuality: businessScore,
        profitability: profitScore,
        growth: growthScore,
        capitalAllocation: capitalScore,
        management: mgmtScore,
        debt: debtScore,
        cashFlow: cashFlowScore,
      },
      summary: `${companyData.name} scores ${overall}/100 in institutional quality audit. High ROE (${fin.roe}%), zero promoter pledge, and strong free cash flow generation (₹${(fin.fcfCr || 0).toLocaleString()} Cr) make it a core portfolio asset.`,
    };
  }
}

export const qualityScoreEngine = new QualityScoreEngine();
export default qualityScoreEngine;
