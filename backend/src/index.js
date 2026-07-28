// Cloudflare Worker API Gateway - Enterprise AI Multi-Agent Platform
import { authenticate } from './middleware/auth.js';
import { 
  handleGetPreferences, 
  handleSavePreferences, 
  handleGetPortfolio, 
  handleAddHolding, 
  handleGetAgentStatus, 
  handleQueryAdvisor 
} from './controllers/handlers.js';
import { AIOrchestrator } from './ai/AIOrchestrator.js';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// JSON response wrapper
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS
    }
  });
}

export default {
  // Cron Trigger: background AI reports generation
  async scheduled(event, env, ctx) {
    console.log(`Cron fired: ${event.cron}`);
    ctx.waitUntil(generateAndCacheMorningReport(env));
  },

  // HTTP Requests handler
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // Handle CORS preflight options
    if (method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    try {
      // Authenticate token (returns user object if valid)
      const user = await authenticate(request, env);
      request.userId = user ? user.id : null;

      // ==========================================
      // PUBLIC ENDPOINTS
      // ==========================================

      // 1. Broad Market Status (Nifty, VIX, Fear/Greed)
      if (path === '/api/market/status' && method === 'GET') {
        const status = {
          indices: [
            { id: 'nifty', name: 'Nifty 50', price: '23,985.35', change: '-10.60', pctChange: '-0.04%', trend: 'down', dailyTrend: [24010, 23990, 24020, 23970, 23985], weeklyTrend: [23800, 23950, 24020, 24100, 23985], monthlyTrend: [23500, 23650, 23900, 24150, 23985], aiSummary: 'Nifty ended flat, down 0.04%, consolidation observed below 24,000 resistance.' },
            { id: 'sensex', name: 'BSE Sensex', price: '76,765.92', change: '-69.86', pctChange: '-0.09%', trend: 'down', dailyTrend: [76900, 76800, 76720, 76765], weeklyTrend: [76200, 76600, 76900, 77100, 76765], monthlyTrend: [75400, 76100, 76700, 77300, 76765], aiSummary: 'Sensex slid marginally by 0.09% as investors exercised caution ahead of upcoming central bank decisions.' },
            { id: 'banknifty', name: 'Bank Nifty', price: '56,755.60', change: '-331.40', pctChange: '-0.58%', trend: 'down', dailyTrend: [57100, 56900, 56800, 56755], weeklyTrend: [56200, 56500, 56800, 57100, 56755], monthlyTrend: [55400, 55900, 56400, 56900, 56755], aiSummary: 'Outperformed by broad market but dragged down late session by private banking profit booking.' }
          ],
          fearGreed: { value: 64, status: 'Greed', prevValue: 58, prevStatus: 'Greed', monthlyValue: 48, monthlyStatus: 'Neutral', aiSummary: 'Fear & Greed index rose to 64, indicating market participants are turning increasingly optimistic.' }
        };
        return jsonResponse(status);
      }

      // 2. News Feed
      if (path === '/api/news' && method === 'GET') {
        return jsonResponse([
          { id: 1, title: 'RBI Proposes Securitisation Rules Amendment: ₹1 Crore Minimum Investment in Demat Form Required', source: 'Economic Times', time: '30 mins ago', type: 'RBI / Regulatory', summary: 'The Reserve Bank of India has proposed draft amendments to securitisation transaction rules, prescribing a ₹1 crore minimum investment limit.', aiAnalysis: { whatHappened: 'RBI proposed draft securitisation rules requiring demat-only issuance.', whyItMatters: 'Forces transaction transparency and mitigates retail speculation risks.', sectorsAffected: [{ name: 'Banking', impact: 'positive', reason: 'Better risk containment and structured asset books.' }], shortTermImpact: 'Neutral to slightly positive.', longTermImpact: 'Clean, transparent asset backing systems.', confidenceScore: 94 } }
        ]);
      }

      // 3. Morning Brief Report
      if (path === '/api/fund-manager/report' && method === 'GET') {
        const todayStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        return jsonResponse({
          date: todayStr,
          title: 'AI Good Morning Report',
          marketSummary: 'Global cues are highly mixed this morning. US indices closed soft yesterday due to hardware tech profit booking, but the bond yields eased, signaling an impending rate cut cycle.',
          importantEvents: [{ event: 'US Core PCE Inflation data due tomorrow.', impact: 'High' }],
          portfolioImpact: 'Your portfolio is well-positioned for today. The IT rebound will provide strength, offsetting any volatility in Reliance.',
          todayRisks: 'Rising crude oil prices may trigger intraday profit booking in auto and aviation sectors.',
          todayOpportunities: 'It is a good day to slowly accumulate defensive FMCG giants or Index ETFs during dips.',
          thingsToWatch: ['USDINR trajectory near 95.75', 'FII net flows in first 2 hours']
        });
      }

      // 4. Sector Heatmap
      if (path === '/api/sectors' && method === 'GET') {
        return jsonResponse([
          { name: 'Banking & Financials', trend: 'Bullish', strength: 'Strong', weakness: 'Deposit cost pressure', opportunities: 'Robust credit demand', risks: 'NIM contraction', news: 'Private banks show earnings beats.' },
          { name: 'IT Services', trend: 'Neutral to Bullish', strength: 'Strong dollar deals', weakness: 'US client budget delays', opportunities: 'AI transition consulting contracts', risks: 'High interest rates', news: 'IT indices rally on margin guidance upgrades.' }
        ]);
      }

      // 5. Geopolitical Tracker
      if (path === '/api/global-events' && method === 'GET') {
        return jsonResponse([
          { id: 1, title: 'Middle East Shipping Lane Conflicts', status: 'Active / Esculating', impactIndia: 'Negative: Boosts import bills (crude oil, gas) and freight costs.', impactUs: 'Neutral: Offsets inflation via domestic shale output.', impactChina: 'Negative: Disrupts trade routes and commodity supply flows.', impactEmerging: 'Negative: Elicits safe-haven flight to USD and Gold.' }
        ]);
      }

      // 6. Chronological Timeline
      if (path === '/api/timeline' && method === 'GET') {
        return jsonResponse([
          { period: 'Today', events: [
            { time: '03:30 PM', title: 'Nifty closes at 23,985.35 (-0.04%)', desc: 'Markets ended flat-to-lower. Selling in Bank Nifty (-0.58%) capped gains. Nifty held above 23,950 support zone.' },
            { time: '11:00 AM', title: 'RBI proposes Securitisation Rules — ₹1 Crore min investment', desc: 'Draft amendments to securitisation transaction rules published. Banking sector reacted positively.' }
          ]},
          { period: 'Yesterday', events: [
            { time: '05:30 PM', title: 'FIIs net buy ₹1,420 Cr; DIIs add ₹2,150 Cr', desc: 'Domestic institutions supported markets. FII flows turned positive preventing sharp correction.' },
            { time: '02:00 PM', title: 'Tata Comm × TTBS announce unified AI Platform Stack', desc: 'Strategic partnership for SMB cloud AI services drives Telecom and IT higher.' }
          ]}
        ]);
      }

      // 7. Swing Opportunities
      if (path === '/api/swing/opportunities' && method === 'GET') {
        return jsonResponse([
          { ticker: 'INFY', company: 'Infosys Limited', swing_score: 88, entry_zone: '₹1,500 - ₹1,515', exit_zone: '₹1,620 - ₹1,650', stop_loss: '₹1,455', holding_period: '5-12 Days', risk_score: 35, momentum_score: 85, volume_score: 90, confidence: 'High', reasoning: 'Golden cross 20-EMA over 50-EMA. Heavy volume breakout following positive Q1 guidance. Delivery % is 68.4%.' },
          { ticker: 'TCS', company: 'Tata Consultancy Services', swing_score: 84, entry_zone: '₹4,120 - ₹4,150', exit_zone: '₹4,380 - ₹4,420', stop_loss: '₹4,010', holding_period: '7-14 Days', risk_score: 30, momentum_score: 82, volume_score: 84, confidence: 'High', reasoning: 'Channel consolidation breakout with expanding MACD histogram. US rate-cut prospects driving tech inflows.' }
        ]);
      }

      // 8. Market Scans
      if (path === '/api/market/scans' && method === 'GET') {
        return jsonResponse([
          { id: 1, ticker: 'INFY', name: 'Infosys Limited', category: 'Volume Breakout', value: '3.4x 20-DMA Volume', price: '₹1,512.60', change: '+3.45%', rsi: 64, ema20: '₹1,480', ema50: '₹1,435', vwap: '₹1,505', deliveryPct: '68.4%', summary: 'High delivery accumulation observed. Price closed above upper Bollinger Band with ADX strength at 28.5.' }
        ]);
      }

      // 9. Institutional Flows
      if (path === '/api/institutional/flows' && method === 'GET') {
        return jsonResponse([
          { flow_date: '2026-07-28', fii_net: 1420.50, dii_net: 2150.80 },
          { flow_date: '2026-07-27', fii_net: -850.20, dii_net: 1940.30 }
        ]);
      }

      // 10. AI Advisor Queries
      if (path === '/api/advisor/chat' && method === 'POST') {
        return await handleQueryAdvisor(request, env);
      }

      // 11. Autonomous Agent Log Status
      if (path === '/api/agents/status' && method === 'GET') {
        return await handleGetAgentStatus(request, env);
      }

      // 12. Push Notification Subscription Registry
      if (path === '/api/push/subscribe' && method === 'POST') {
        const body = await request.json();
        console.log("Push subscription registered:", body.subscription);
        if (env.DB) {
          await env.DB.prepare('INSERT INTO audit_logs (action_name, actor, details) VALUES (?, ?, ?)')
            .bind('PUSH_SUBSCRIBE', request.userId || 'guest', JSON.stringify(body.subscription))
            .run();
        }
        return jsonResponse({ success: true, message: 'Subscription stored successfully' });
      }

      // 13. Push Notification Broadcast Test Trigger
      if (path === '/api/push/send' && method === 'POST') {
        const body = await request.json();
        console.log("Simulating Web Push send:", body.payload);
        return jsonResponse({ success: true, message: 'Push signal broadcast completed' });
      }

      // 10. AI Analysis Engine Status (PUBLIC - no auth needed)
      if (path === '/api/analysis/engine' && method === 'GET') {
        return jsonResponse({
          marketMood: 'Neutral to Bullish',
          moodValue: 65,
          probability: '72%',
          reasoning: 'Domestic liquidity remains strong with consistent DII support. US Fed pivot expectations act as a tailwind. However high valuations in mid/small-caps and crude oil volatility are keeping bulls in check.',
          keyRisks: [
            { title: 'Crude Spike', desc: 'Brent above $85/bbl on Strait of Hormuz concerns.' },
            { title: 'FII Outflows', desc: 'FIIs rotating to cheaper markets like China.' }
          ],
          keyOpportunities: [
            { title: 'Rate Cut Plays', desc: 'Accumulate interest-rate sensitive sectors before official cuts.' },
            { title: 'IT Rebound', desc: 'IT services showing earnings beats and positive guidance.' }
          ]
        });
      }

      // 11. Recent Alerts (PUBLIC - no auth needed)
      if (path === '/api/alerts' && method === 'GET') {
        return jsonResponse([
          { id: 1, time: '09:30 AM Today', symbol: 'INFY', title: 'Infosys jumps 4.5% at market open', type: 'Earnings Spike', explanation: 'Triggered by Q1 earnings beat and upward revision of constant-currency guidance to 3-4%.' },
          { id: 2, time: '10:15 AM Today', symbol: 'FII_ACTIVITY', title: 'FII net buy ₹1,420 Crore recorded', type: 'FII/DII Action', explanation: 'FIIs turned net buyers today. DII support remains strong at ₹2,150 Crore. Positive for market stability.' }
        ]);
      }

      // 12. Watchlist (PUBLIC with guest data - no auth needed)
      if (path === '/api/watchlist' && method === 'GET') {
        return jsonResponse([
          {
            name: 'Tech & High Growth',
            items: [
              { symbol: 'TCS',        price: '4,150.20', change: '+52.40',  pctChange: '+1.28%', aiSummary: 'Consolidating gains. Strong pipeline wins detected. Sector view: Bullish.' },
              { symbol: 'INFY',       price: '1,512.60', change: '+50.30',  pctChange: '+3.45%', aiSummary: 'Q1 earnings beat. Upward guidance revision driving momentum.' },
              { symbol: 'MUTHOOTFIN', price: '1,720.00', change: '+25.60',  pctChange: '+1.51%', aiSummary: 'Benefiting from Gold price surge. Collateral values rising.' }
            ]
          },
          {
            name: 'Macro / Commodities',
            items: [
              { symbol: 'US10Y', price: '4.18%', change: '-0.04', pctChange: '-0.95%', aiSummary: 'US 10-Year yield slipped on Fed rate cut optimism.' },
              { symbol: 'DXY',   price: '104.12', change: '-0.30', pctChange: '-0.29%', aiSummary: 'Dollar Index easing below 104.5. Positive for emerging markets.' }
            ]
          }
        ]);
      }

      // 13. Portfolio (PUBLIC guest fallback - no 401)
      if (path === '/api/portfolio' && method === 'GET') {
        if (!request.userId) {
          // Return guest demo portfolio instead of 401
          return jsonResponse({
            holdings: [
              { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', type: 'Stock', category: 'Energy/Conglomerate', avgPrice: 2450.00, currentPrice: 2580.40, qty: 50 },
              { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', type: 'Stock', category: 'Private Banking', avgPrice: 1550.00, currentPrice: 1610.20, qty: 80 },
              { symbol: 'INFY',     name: 'Infosys Ltd.', type: 'Stock', category: 'IT Services', avgPrice: 1420.00, currentPrice: 1512.60, qty: 60 }
            ],
            aiAnalysis: {
              sectorAllocation: [{ name: 'Energy', value: 35 }, { name: 'Banking', value: 35 }, { name: 'IT Services', value: 30 }],
              riskScore: 'Moderate (5.5/10)',
              diversificationStatus: 'Moderate',
              warnings: [{ type: 'Guest Mode', message: 'Sign in to track your real portfolio.' }],
              duplicateHoldings: 'Sign in to get full duplicate analysis.',
              suggestions: [{ action: 'Buy', symbol: 'Index ETFs', reason: 'Add Nifty 50 ETF for passive diversification.' }]
            }
          });
        }
        return await handleGetPortfolio(request, env);
      }

      // ==========================================
      // PRIVATE ENDPOINTS (Requires Authorization)
      // ==========================================
      if (!request.userId) {
        return jsonResponse({ error: 'Unauthorized: Auth token required for this endpoint' }, 401);
      }

      if (path === '/api/preferences' && method === 'GET') {
        return await handleGetPreferences(request, env);
      }

      if (path === '/api/preferences' && method === 'POST') {
        return await handleSavePreferences(request, env);
      }

      if (path === '/api/portfolio' && method === 'GET') {
        return await handleGetPortfolio(request, env);
      }

      if (path === '/api/portfolio/add' && method === 'POST') {
        return await handleAddHolding(request, env);
      }

      if (path === '/api/watchlist' && method === 'GET') {
        return jsonResponse([
          { name: 'My Watchlist', items: [{ symbol: 'TCS', price: '4,150.20', change: '+52.40', pctChange: '+1.28%', aiSummary: 'Consolidating gains. NVIDIA NIM detects strong pipeline wins.' }] }
        ]);
      }

      return jsonResponse({ error: 'Endpoint not found' }, 404);

    } catch (error) {
      console.error('Request processing error:', error);
      return jsonResponse({ error: error.message || 'Internal Server Error' }, 500);
    }
  }
};

// Background scheduled AI Report generator
async function generateAndCacheMorningReport(env) {
  if (!env.DB) return;
  const orchestrator = new AIOrchestrator(env);
  const prompt = "Generate a daily morning report. Include marketSummary, importantEvents (as array of objects), portfolioImpact, todayRisks, todayOpportunities, thingsToWatch.";
  const systemMsg = "You are a professional fund manager writing the daily Morning Report before stock market opening.";
  
  try {
    const reportText = await orchestrator.router.execute('decision', prompt, systemMsg);
    if (reportText) {
      // Validate that it's valid JSON before caching
      JSON.parse(reportText);
      await env.DB.prepare('INSERT OR REPLACE INTO cached_reports (report_type, content) VALUES ("morning_report", ?)')
        .bind(reportText)
        .run();
      console.log("Cron: Daily morning report generated and cached.");
    }
  } catch (err) {
    console.error("Cron: Failed to generate morning report:", err);
  }
}
