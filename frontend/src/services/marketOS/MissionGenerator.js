/**
 * MissionGenerator - Generates 24x7 Actionable AI Mission Cards
 */

export class MissionGenerator {
  getActiveMissions() {
    return [
      {
        id: 'mission-1',
        type: 'BUY_CANDIDATE',
        symbol: 'HDFC Bank',
        confidencePct: 94,
        status: 'HIGH CONVICTION BUY',
        entryZone: '₹2058 - ₹2065',
        targetZone: '₹2175',
        riskLevel: 'Low Risk',
        nextReview: 'Immediate Execution',
        whyNow: 'Breakout confirmed on 3.2x volume following strong credit growth metrics.',
        whyNotAnother: 'Banking outperforming IT & Oil sectors by +1.8% today.',
        invalidation: 'Close below ₹2010',
        badgeColor: 'success'
      },
      {
        id: 'mission-2',
        type: 'EXIT_WATCH',
        symbol: 'ABC Ltd',
        confidencePct: 88,
        status: 'EXIT WATCH',
        entryZone: 'N/A',
        targetZone: 'Target Reached',
        riskLevel: 'Momentum Weakening',
        nextReview: '15 Minutes',
        whyNow: 'Target zone ₹245 reached. Relative Strength Index dropping below 45.',
        whyNotAnother: 'Locking profits before upcoming earnings announcement.',
        invalidation: 'N/A',
        badgeColor: 'warning'
      },
      {
        id: 'mission-3',
        type: 'REVIEW_PORTFOLIO',
        symbol: 'Portfolio Rebalance',
        confidencePct: 90,
        status: 'ATTENTION REQUIRED',
        entryZone: 'N/A',
        targetZone: 'N/A',
        riskLevel: 'Sector Overweight',
        nextReview: 'End of Session',
        whyNow: 'IT Services sector concentration reached 24.8% (TCS + INFY).',
        whyNotAnother: 'Tax-free LTCG exemption allows 4% trim on Infosys with ₹0 tax liability.',
        invalidation: 'N/A',
        badgeColor: 'error'
      },
      {
        id: 'mission-4',
        type: 'WAIT_DIRECTIVE',
        symbol: 'Nifty Market Open',
        confidencePct: 95,
        status: 'WAIT DIRECTIVE',
        entryZone: 'N/A',
        targetZone: 'N/A',
        riskLevel: 'First 15 Mins Caution',
        nextReview: '09:30 AM',
        whyNow: 'Avoid chasing opening gap-up breakouts during initial 15-minute price discovery.',
        whyNotAnother: 'Institutional volume settles after 09:30 AM.',
        invalidation: 'N/A',
        badgeColor: 'info'
      }
    ];
  }
}

export const missionGenerator = new MissionGenerator();
export default missionGenerator;
