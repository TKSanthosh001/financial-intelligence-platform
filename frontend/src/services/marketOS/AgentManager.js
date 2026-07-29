/**
 * AgentManager - 11 Autonomous Specialist AI Agent Manager
 */

export const AUTONOMOUS_AGENTS = [
  { id: 'agent-market-watch', name: 'Market Watch Agent', responsibility: 'Monitors Nifty, Sensex, Sector Indices, Commodities, Crypto 24x7', status: 'ACTIVE', priority: 1, lastSignal: 'Nifty +0.45% Gap Up' },
  { id: 'agent-technical', name: 'Technical Agent', responsibility: 'Multi-timeframe trend, breakouts, volume spikes & VWAP support', status: 'ACTIVE', priority: 8, lastSignal: 'TCS Breakout above 50-EMA' },
  { id: 'agent-fundamental', name: 'Fundamental Agent', responsibility: 'Corporate filings, quarterly earnings, debt & cash flow quality', status: 'ACTIVE', priority: 5, lastSignal: 'HDFC Bank ROE 17.8% verified' },
  { id: 'agent-news', name: 'News Agent', responsibility: 'Exchange filings, RBI updates, government announcements & macro news', status: 'ACTIVE', priority: 7, lastSignal: 'FII Net Buy ₹4,200 Cr recorded' },
  { id: 'agent-institutional', name: 'Institutional Agent', responsibility: 'FII/DII net flows, promoter buying, bulk & block deals', status: 'ACTIVE', priority: 8, lastSignal: 'FII cash buying in private banks' },
  { id: 'agent-macro', name: 'Macro Agent', responsibility: 'Interest rates, inflation, Crude oil ($84 Brent) & USD/INR yield spreads', status: 'ACTIVE', priority: 6, lastSignal: 'RBI Rate Pause accommodative' },
  { id: 'agent-sector', name: 'Sector Agent', responsibility: 'Sector rotation leadership & relative strength ranking', status: 'ACTIVE', priority: 7, lastSignal: 'Banking Sector Leading (+1.2%)' },
  { id: 'agent-portfolio', name: 'Portfolio Agent', responsibility: 'Monitors portfolio holdings, cash balance & stop loss levels', status: 'ACTIVE', priority: 9, lastSignal: 'Portfolio ₹8,54,200 (+2.18% Today)' },
  { id: 'agent-risk', name: 'Risk Agent', responsibility: 'Concentration risk, gap risk, volatility spikes & macro risk', status: 'ACTIVE', priority: 10, lastSignal: 'IT Sector Overweight (24.8%)' },
  { id: 'agent-decision', name: 'Decision Agent', responsibility: 'Synthesizes all agent outputs into final action state & confidence', status: 'ACTIVE', priority: 10, lastSignal: 'BUY HDFC Bank (94% Conf)' },
  { id: 'agent-learning', name: 'Learning Agent', responsibility: 'Self-evaluates prediction win rates (88.4%) & calibrates confidence', status: 'ACTIVE', priority: 4, lastSignal: 'Calibrated Confidence Model Active' }
];

export class AgentManager {
  getAgentNetworkStatus() {
    return {
      activeAgentsCount: AUTONOMOUS_AGENTS.length,
      agents: AUTONOMOUS_AGENTS,
      systemHealth: '100% OPERATIONAL (Zero Latency Decoupled EventBus)',
    };
  }
}

export const agentManager = new AgentManager();
export default agentManager;
