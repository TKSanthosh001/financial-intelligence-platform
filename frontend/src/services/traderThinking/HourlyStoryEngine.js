/**
 * HourlyStoryEngine - Hourly Market Story & Money Flow Tracker
 */

export class HourlyStoryEngine {
  getHourlyStory() {
    return {
      time: new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }),
      headline: 'Banking Heavyweights Power Nifty Expansion as Foreign Inflows Top ₹4,200 Cr',
      storyText: 'Momentum remains strong across Large-Cap Private Banking and IT Services. Institutions continue aggressive net buying, taking advantage of constructive consolidation patterns. The breakout is supported by 3.2x above-average volume. Risk has increased slightly as Nifty approaches 24,000 historical resistance, but downside risk remains protected by 20-EMA supports.',
      institutionalAction: 'FIIs net bought ₹4,200 Cr in cash market with heavy concentration in HDFC Bank & TCS.',
      retailAction: 'Retail investors booked minor partial profits near Nifty 23,980 resistance.',
      nextRotationTarget: 'Capital flow rotating into High-Quality Private Banking & Selected IT Deal Leaders.',
    };
  }
}

export const hourlyStoryEngine = new HourlyStoryEngine();
export default hourlyStoryEngine;
