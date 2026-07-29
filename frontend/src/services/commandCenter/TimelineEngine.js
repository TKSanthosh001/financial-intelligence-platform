/**
 * TimelineEngine - Live Chronological Event Stream Engine
 */

export class TimelineEngine {
  getLiveTimeline() {
    return [
      { time: '09:45 AM', event: 'Target zone ₹2,175 reached for HDFC Bank setup (+5.6% Return)', type: 'TARGET_MET', badgeColor: 'success' },
      { time: '09:33 AM', event: 'Positive RBI monetary policy announcement maintains accommodative stance', type: 'MACRO_NEWS', badgeColor: 'primary' },
      { time: '09:21 AM', event: 'Technical breakout detected in TCS above ₹3,785 resistance on 3.5x volume', type: 'BREAKOUT', badgeColor: 'info' },
      { time: '09:18 AM', event: 'Banking sector became strongest sector leading market (+1.2% Nifty Bank)', type: 'SECTOR_ROTATION', badgeColor: 'warning' },
      { time: '09:15 AM', event: 'Market opened positive (+0.45% Nifty gap up at 23,985)', type: 'MARKET_OPEN', badgeColor: 'default' },
    ];
  }
}

export const timelineEngine = new TimelineEngine();
export default timelineEngine;
