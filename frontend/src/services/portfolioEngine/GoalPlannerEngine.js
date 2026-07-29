/**
 * GoalPlannerEngine - Multi-Goal Financial Planning & Success Probability Engine
 */

export class GoalPlannerEngine {
  getGoals(currentPortfolioValue = 3185400) {
    return [
      {
        id: 'emergency-fund',
        title: 'Emergency Fund',
        category: 'Safety',
        targetAmount: 500000,
        currentAllocated: 500000,
        targetYear: 2024,
        progressPct: 100,
        monthlySipNeeded: 0,
        probabilityPct: 100,
        status: 'FULLY ACHIEVED',
        statusColor: 'success',
        aiAdvice: 'Emergency fund fully funded in liquid FDs & savings. Maintain 6 months of living expenses touchless.'
      },
      {
        id: 'house-purchase',
        title: 'Luxury Home Down Payment',
        category: 'Real Estate',
        targetAmount: 15000000,
        currentAllocated: 6300000,
        targetYear: 2029,
        progressPct: 42,
        monthlySipNeeded: 45000,
        probabilityPct: 88,
        status: 'ON TRACK',
        statusColor: 'primary',
        aiAdvice: 'Increase monthly SIP by ₹5,000 in Large Cap / Index ETF to boost success probability to 95%.'
      },
      {
        id: 'financial-freedom',
        title: 'Retirement & Financial Freedom',
        category: 'Independence',
        targetAmount: 50000000,
        currentAllocated: 14000000,
        targetYear: 2038,
        progressPct: 28,
        monthlySipNeeded: 65000,
        probabilityPct: 92,
        status: 'STRONG TRACK',
        statusColor: 'success',
        aiAdvice: 'Compounding at 14.5% projected return will achieve ₹5.2 Crore net worth by age 52.'
      },
      {
        id: 'child-education',
        title: 'Children Overseas Education',
        category: 'Education',
        targetAmount: 10000000,
        currentAllocated: 3500000,
        targetYear: 2032,
        progressPct: 35,
        monthlySipNeeded: 25000,
        probabilityPct: 85,
        status: 'ON TRACK',
        statusColor: 'info',
        aiAdvice: 'Allocate 20% of education SIP to US Equities (NVDA / Nasdaq ETF) as USD hedge.'
      }
    ];
  }
}

export const goalPlannerEngine = new GoalPlannerEngine();
export default goalPlannerEngine;
