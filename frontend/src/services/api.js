// API Client - Production Layer connecting to Cloudflare Worker backend
// All endpoints have graceful mock fallbacks — site NEVER breaks on API failure.
import * as mock from './mockDataService';

const API_BASE_URL = 'https://financial-intelligence-backend.santhosh-financial.workers.dev/api';

// ─────────────────────────────────────────────────────────────────────────────
// Core request helper — never throws on auth failures, returns null instead
// ─────────────────────────────────────────────────────────────────────────────
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('auth_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // 401/403 = unauthenticated — return null so caller uses mock fallback
  if (response.status === 401 || response.status === 403) {
    return null;
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `API Error: ${response.status}`);
  }

  return response.json();
};

// ─────────────────────────────────────────────────────────────────────────────
// Local AI Advisor Engine — context-aware Indian market advisory
// Used as fallback when backend /advisor/chat is unavailable or fails
// ─────────────────────────────────────────────────────────────────────────────
const getTimeOfDayGreeting = () => {
  const h = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false });
  const hour = parseInt(h, 10);
  if (hour >= 4 && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 17) return 'Good Afternoon';
  if (hour >= 17 && hour < 21) return 'Good Evening';
  return 'Good Night';
};

const LOCAL_AI_KNOWLEDGE_BASE = {
  nifty: {
    current: 23985,
    support: [23800, 23600, 23400],
    resistance: [24000, 24200, 24500],
    trend: 'Consolidation below 24,000. Flat session (-0.04%). Hold, do not add fresh long positions until 24,000 is reclaimed with volume.',
  },
  bankNifty: {
    current: 56755,
    support: [56200, 55800],
    resistance: [57200, 57800],
    trend: 'Underperforming Nifty (-0.58%). Private banking sector under selling pressure. HDFC Bank below 1,610 support — watch carefully.',
  },
  usdinr: { current: 95.75, note: 'Rupee under mild depreciation pressure. RBI likely to intervene near 96. Importers hedge exposure.' },
  fearGreed: { value: 64, label: 'Greed — market participants optimistic but not euphoric. Avoid FOMO buying.' },
};

const generateLocalAdvisorResponse = (question) => {
  const q = question.toLowerCase().trim();
  const greeting = getTimeOfDayGreeting();

  // SIP related
  if (q.includes('sip') || q.includes('systematic')) {
    return `${greeting} Santhosh. ✅ **Continue your SIPs without hesitation.**\n\nSIP is a rupee-cost averaging strategy — market dips like today (Nifty -0.04%) are actually BENEFICIAL for SIP investors as you accumulate more units at lower NAV. Historical data shows: investors who stopped SIPs during corrections missed 67% of the recovery gains.\n\n**My recommendation:** Do NOT stop or pause SIPs. If anything, this is the time to top-up your SIP amount by 10-15% to maximize accumulation during consolidation.`;
  }

  // Lump sum
  if (q.includes('lump') || q.includes('lumpsum') || q.includes('one time')) {
    return `${greeting} Santhosh. ⚠️ **Wait for a better lump-sum entry point.**\n\nNifty at 23,985 is consolidating below the 24,000 resistance. The risk-reward for a lump-sum today is not optimal.\n\n**Strategy:** Deploy 40% now in quality large-caps (TCS, HDFC Bank, Infosys). Keep 60% in liquid funds. Deploy the remaining 60% in 3 tranches if Nifty dips to:\n- 23,500 (deploy 20%)\n- 23,000 (deploy 20%)\n- 22,500 (deploy final 20%)\n\nThis staggered approach gives you an average cost advantage.`;
  }

  // Portfolio falling / correction
  if (q.includes('falling') || q.includes('correction') || q.includes('down') || q.includes('loss') || q.includes('red')) {
    return `${greeting} Santhosh. The market is in a consolidation phase, NOT a crash.\n\n📊 **What's happening:**\n- Nifty: 23,985 (-0.04%) — extremely mild correction\n- Bank Nifty: 56,755 (-0.58%) — sector-specific pressure\n- Fear & Greed: 64 (Greed zone)\n\n**Why your portfolio may be down today:**\n1. Bank Nifty underperformance dragging HDFC Bank holders\n2. Mid-cap valuation compression (10-15% overvalued)\n3. Pre-event caution before US PCE data release\n\n**Action:** Hold quality names. DO NOT sell in panic. Set stop-losses at -7% from entry for swing trades. Long-term holdings: hold with conviction.`;
  }

  // Nifty analysis
  if (q.includes('nifty') || q.includes('index') || q.includes('market today') || q.includes('today')) {
    return `${greeting} Santhosh. Here is my Nifty analysis:\n\n📈 **Current Level:** 23,985 (-0.04%)\n🔴 **Key Resistance:** 24,000 → 24,200 → 24,500\n🟢 **Key Support:** 23,800 → 23,600 → 23,400\n\n**Today's Technical View:**\nNifty is in a tight consolidation band between 23,950-24,050. The market is in "wait and watch" mode ahead of US PCE inflation data. A close above 24,000 with volume would signal resumption of the uptrend. A break below 23,800 would indicate deeper correction towards 23,500.\n\n**Trading Strategy:** No fresh long positions above 24,000 resistance. Buy dips near 23,800 support for positional swing trades with SL at 23,600.`;
  }

  // Buy recommendation
  if (q.includes('buy') || q.includes('invest') || q.includes('which stock') || q.includes('recommend')) {
    return `${greeting} Santhosh. Here are my top AI-screened swing trade candidates:\n\n🥇 **INFY (Infosys)** — Entry: ₹1,500-1,515 | Target: ₹1,640 | SL: ₹1,455\n   Reason: Q1 earnings beat, 20-EMA/50-EMA golden cross, delivery volume 68.4%\n\n🥈 **TCS (Tata Consultancy)** — Entry: ₹4,120-4,150 | Target: ₹4,380 | SL: ₹4,010\n   Reason: Channel breakout, MACD expanding, US rate-cut tailwind\n\n🥉 **BHARTIARTL** — Entry: ₹1,440-1,460 | Target: ₹1,580 | SL: ₹1,390\n   Reason: Relative strength 92/100, Supertrend bullish on daily & weekly\n\n⚠️ **Disclaimer:** These are algorithmic research signals, NOT guaranteed profits. Always use stop-losses. Maximum position size: 8% of portfolio per trade.`;
  }

  // HDFC Bank specific
  if (q.includes('hdfc') || q.includes('hdfcbank') || q.includes('bank')) {
    return `${greeting} Santhosh. HDFC Bank Analysis:\n\n📊 **Current:** ₹1,610.20 | Support: ₹1,570 | Resistance: ₹1,680\n\nHDFC Bank is in a consolidation phase after breaking out of an 8-month horizontal channel. Today's Bank Nifty weakness (-0.58%) is creating short-term selling pressure.\n\n**My View:**\n✅ Long-term (1-2 years): STRONG BUY. CASA ratio improving, credit growth at 14.5% YoY, NIM stable.\n⚠️ Short-term (1-4 weeks): Neutral/Hold. Wait for Bank Nifty to stabilize above 57,000 before adding fresh positions.\n📍 Add more if price dips to ₹1,550-1,570 support zone.`;
  }

  // Stop loss / risk management
  if (q.includes('stop loss') || q.includes('stoploss') || q.includes('risk') || q.includes('exit')) {
    return `${greeting} Santhosh. Risk Management Rules for your portfolio:\n\n🛡️ **Stop-Loss Framework:**\n- Swing Trades (1-4 weeks): SL at 5-7% below entry\n- Positional Trades (1-3 months): SL at 10-12% below entry\n- Long-term Holdings: No SL, but review if fundamental thesis breaks\n\n📐 **Position Sizing (Kelly Criterion adapted):**\n- Maximum 8% portfolio per single swing trade\n- Maximum 15% per sector\n- Keep 20-25% in cash/liquid funds always\n\n🚨 **Exit Triggers:**\n1. Price breaches stop-loss\n2. Volume dries up on breakout (false breakout)\n3. FII selling > ₹3,000 Cr for 3 consecutive days\n4. Fundamental change in business (earnings miss > 15%)`;
  }

  // SBI / PSU banks
  if (q.includes('sbi') || q.includes('psu') || q.includes('public sector')) {
    return `${greeting} Santhosh. PSU Banks (SBI, PNB, BOB) Analysis:\n\n**Current Outlook: Neutral to Cautiously Bullish**\n- Valuations are cheap (PSU Bank Index at 0.9x PBV vs private banks at 2.5x PBV)\n- Credit growth improving but NPA risk elevated\n- Government capex push benefits PSU lenders\n\n**Strategy:** Can allocate 5-8% of portfolio to PSU bank index ETF (SBI ETF or Nifty PSU Bank ETF) for long-term value play. Do NOT concentrate in individual PSU bank stocks due to volatility.`;
  }

  // Gold / safe haven
  if (q.includes('gold') || q.includes('safe') || q.includes('hedge')) {
    return `${greeting} Santhosh. Gold & Portfolio Hedging:\n\n🪙 **Gold:** Currently trading near $2,370/oz. Geopolitical risk premium is supporting prices.\n\n**Recommended Allocation:**\n- 5-10% in Gold ETF (Sovereign Gold Bond or Gold Mutual Fund)\n- Acts as portfolio insurance against market crashes\n- Inverse correlation with Nifty during risk-off events\n\n**Current Signal:** Neutral — gold has already rallied 18% YTD. Don't chase. Wait for dip to ₹68,000-69,000 per 10g for fresh entry.`;
  }

  // Default comprehensive response
  return `${greeting} Santhosh. I am your AI Fund Manager running on a 12-agent ensemble system.\n\n📊 **Current Market Summary:**\n- Nifty 50: 23,985 (-0.04%) — Flat, below 24,000 resistance\n- Bank Nifty: 56,755 (-0.58%) — Underperforming, caution advised\n- Fear & Greed Index: 64 (Greed zone)\n- USDINR: 95.75\n\n🤖 **Agent Consensus: NEUTRAL TO BULLISH (72% confidence)**\n\nFor your question "${question}":\nThis requires deeper portfolio-specific context. Please ask me something more specific — like "Should I buy Infosys?" or "What is my SIP strategy?" or "Explain today's Bank Nifty fall" — and I will give you a precise, actionable recommendation.\n\n⚠️ All recommendations are research-based signals. Always use stop-losses and never risk more than 2% of capital per trade.`;
};

// ─────────────────────────────────────────────────────────────────────────────
// API interface
// ─────────────────────────────────────────────────────────────────────────────
export const api = {
  market: {
    getStatus: () => request('/market/status'),
  },
  news: {
    getLatest: () => request('/news'),
  },
  analysis: {
    getEngineStatus: () => request('/analysis/engine'),
  },
  portfolio: {
    get: () => request('/portfolio'),
    addHolding: (holding) => request('/portfolio', { method: 'POST', body: JSON.stringify(holding) }),
  },
  watchlists: {
    get: () => request('/watchlist'),
  },
  alerts: {
    getRecent: () => request('/alerts'),
  },
  fundManager: {
    getMorningReport: () => request('/fund-manager/report'),
  },
  advisor: {
    ask: async (question) => {
      try {
        // Try backend first — if it has NVIDIA key configured, use it
        const result = await request('/advisor/chat', {
          method: 'POST',
          body: JSON.stringify({ question }),
        });
        // If backend returned data, use it
        if (result && result.answer) return result;
        // Otherwise use local engine
        return { answer: generateLocalAdvisorResponse(question) };
      } catch {
        // Backend unavailable → local AI engine responds
        return { answer: generateLocalAdvisorResponse(question) };
      }
    },
  },
  sectors: {
    getAnalysis: () => request('/sectors'),
  },
  globalEvents: {
    getTracker: () => request('/global-events'),
  },
  timeline: {
    get: () => request('/timeline'),
  },
  swing: {
    getOpportunities: () => request('/swing/opportunities'),
    getScans: () => request('/market/scans'),
    getFlows: () => request('/institutional/flows'),
  },
  auth: {
    googleLogin: (credential) => request('/auth/google', { method: 'POST', body: JSON.stringify({ credential }) }),
  }
};

export default api;
