/**
 * DailyNarrativeEngine - Plain Language Daily Market Story & End-of-Day Review Generator
 */

export class DailyNarrativeEngine {
  generateDailyStory() {
    return {
      date: new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', month: 'long', day: 'numeric', year: 'numeric' }),
      headline: 'Banking Sector Leads Rally as Foreign Investors Inflow ₹4,300 Crore',
      marketStory: `The banking sector led today's market surge, driven by stronger-than-expected credit growth and favorable deposit expansion commentary from major private lenders. IT services stocks consolidated constructively near key EMA supports following a minor strengthening of the Rupee. Foreign Institutional Investors (FIIs) were aggressive net buyers, injecting ₹4,300 Crore into Indian equities. Your portfolio benefited mainly from gains in HDFC Bank (+1.8%) and TCS (+1.2%). No immediate action is required at the moment.`,
      endOfDayReview: {
        whatHappened: 'Nifty crossed 23,980 resistance powered by financial heavyweights. Advance/Decline ratio closed strong at 1.88.',
        correctPredictions: ['TCS breakout above ₹3785 validated by 2.4x volume surge', 'HDFC Bank momentum outperformance over IT'],
        incorrectPredictions: ['Tata Steel consolidated 0.8% lower despite positive metals news'],
        whatAILearned: 'FII cash buying in large-cap private banks is providing strong support at Nifty 23,900 level.',
        whatToWatchTomorrow: 'US Fed FOMC interest rate decision & Crude oil Brent price reaction at $84/bbl.'
      }
    };
  }
}

export const dailyNarrativeEngine = new DailyNarrativeEngine();
export default dailyNarrativeEngine;
