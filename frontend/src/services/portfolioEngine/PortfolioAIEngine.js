/**
 * PortfolioAIEngine - AI Personal Portfolio Advisor & Intelligence Facade
 */

import DEFAULT_USER_PORTFOLIO from './PortfolioDatabase';
import portfolioRiskEngine from './PortfolioRiskEngine';
import diversificationHealthEngine from './DiversificationHealthEngine';
import goalPlannerEngine from './GoalPlannerEngine';
import rebalancingEngine from './RebalancingEngine';
import taxDividendEngine from './TaxDividendEngine';

class PortfolioAIEngine {
  getPortfolioDossier() {
    const portfolio = DEFAULT_USER_PORTFOLIO;
    const risk = portfolioRiskEngine.calculateRiskMetrics(portfolio);
    const health = diversificationHealthEngine.evaluateHealth(portfolio);
    const goals = goalPlannerEngine.getGoals(portfolio.summary.currentValue);
    const rebalance = rebalancingEngine.generateRebalancingPlan(portfolio);
    const taxAndDiv = taxDividendEngine.calculateTaxAndDividends(portfolio);

    const morningBriefing = {
      date: new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', month: 'long', day: 'numeric', year: 'numeric' }),
      greeting: 'Good Morning, Santhosh! Here is your AI Portfolio Intelligence Briefing:',
      topPerformer: 'NVIDIA (+45.8% Return)',
      topRisk: 'IT Sector Overweight (24.8% weight across TCS & Infosys)',
      aiVerdict: `Your total portfolio net worth stands at ₹${portfolio.summary.currentValue.toLocaleString('en-IN')} with an overall unrealized profit of +₹${portfolio.summary.unrealizedProfit.toLocaleString('en-IN')} (+${portfolio.summary.absoluteReturnPct}%). Your 18.6% XIRR significantly beats the Nifty benchmark. All 4 financial goals remain ON TRACK with an average 91% success probability.`,
      actionItems: [
        'Execute tax-free 4% trim on Infosys to reallocate into HDFC Bank.',
        'Set up Tax Loss Harvesting for Reliance to save ₹1,275 in short-term tax.',
        'Upcoming TCS Dividend payout of ₹2,800 scheduled for August 12.'
      ]
    };

    return {
      portfolio,
      risk,
      health,
      goals,
      rebalance,
      taxAndDiv,
      morningBriefing,
      timestamp: new Date().toISOString()
    };
  }
}

export const portfolioAIEngine = new PortfolioAIEngine();
export default portfolioAIEngine;
