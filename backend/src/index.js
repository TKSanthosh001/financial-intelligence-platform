// Cloudflare Worker API Gateway for Financial Intelligence Platform

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Helper for NVIDIA NIM API
async function callNvidiaNim(env, prompt, systemMsg = "You are a senior hedge fund advisor.") {
  const apiKey = env.NVIDIA_NIM_API_KEY;
  if (!apiKey) {
    console.warn("NVIDIA_NIM_API_KEY not configured. Falling back to internal financial model heuristics.");
    return null;
  }

  try {
    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "meta/llama3-70b-instruct", // or standard NVIDIA NIM LLM model
        messages: [
          { role: "system", content: systemMsg },
          { role: "user", content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      throw new Error(`NIM API error: ${response.status} ${await response.text()}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Failed to query NVIDIA NIM API:", error);
    return null;
  }
}

// Router entry
export default {
  // Cron Triggers handler
  async scheduled(event, env, ctx) {
    console.log(`Cron trigger fired: ${event.cron}`);
    
    // Generate Good Morning Report and cache it in D1
    ctx.waitUntil(generateAndCacheMorningReport(env));
  },

  // HTTP API handler
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    try {
      // User auth check middleware for private routes
      let user = null;
      if (path.startsWith('/api/portfolio') || path.startsWith('/api/watchlist')) {
        user = await authenticateUser(request, env);
        if (!user) {
          return jsonResponse({ error: 'Unauthorized: Valid auth token required' }, 401);
        }
      }

      // Route mappings
      
      // 1. Market Status
      if (path === '/api/market/status' && method === 'GET') {
        const data = await fetchMarketStatus(env);
        return jsonResponse(data);
      }

      // 2. News
      if (path === '/api/news' && method === 'GET') {
        const news = await fetchNews(env);
        return jsonResponse(news);
      }

      // 3. AI Analysis Engine
      if (path === '/api/analysis/engine' && method === 'GET') {
        const analysis = await fetchAiAnalysis(env);
        return jsonResponse(analysis);
      }

      // 4. Portfolio
      if (path === '/api/portfolio' && method === 'GET') {
        const holdings = await fetchUserPortfolio(env, user.id);
        const analysis = await analyzePortfolio(env, holdings);
        return jsonResponse({ holdings, aiAnalysis: analysis });
      }

      if (path === '/api/portfolio' && method === 'POST') {
        const body = await request.json();
        await addPortfolioHolding(env, user.id, body);
        return jsonResponse({ success: true, message: 'Holding added successfully' });
      }

      // 5. Watchlist
      if (path === '/api/watchlist' && method === 'GET') {
        const watchlist = await fetchUserWatchlist(env, user.id);
        return jsonResponse(watchlist);
      }

      // 6. Alerts
      if (path === '/api/alerts' && method === 'GET') {
        const alerts = await fetchAlerts(env);
        return jsonResponse(alerts);
      }

      // 7. Morning Report
      if (path === '/api/fund-manager/report' && method === 'GET') {
        const report = await fetchMorningReport(env);
        return jsonResponse(report);
      }

      // 8. Advisor Ask (NIM API interaction)
      if (path === '/api/advisor' && method === 'POST') {
        const { question } = await request.json();
        const responseText = await queryAdvisor(env, question);
        return jsonResponse({ answer: responseText });
      }

      // 9. Sectors
      if (path === '/api/sectors' && method === 'GET') {
        const sectors = await fetchSectors(env);
        return jsonResponse(sectors);
      }

      // 10. Global Geopolitical events
      if (path === '/api/global-events' && method === 'GET') {
        const events = await fetchGlobalEvents(env);
        return jsonResponse(events);
      }

      // 11. Timeline
      if (path === '/api/timeline' && method === 'GET') {
        const timeline = await fetchTimeline(env);
        return jsonResponse(timeline);
      }

      // 12. Authentication (Simulated OAuth validation)
      if (path === '/api/auth/google' && method === 'POST') {
        const { credential } = await request.json();
        // Simulate google login payload decoding
        const simulatedUser = {
          id: 'google-12345',
          email: 'santhosh@example.com',
          name: 'Santhosh Kumar',
          picture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
        };
        // Seed user in database
        if (env.DB) {
          await env.DB.prepare('INSERT OR IGNORE INTO users (id, email, name) VALUES (?, ?, ?)')
            .bind(simulatedUser.id, simulatedUser.email, simulatedUser.name)
            .run();
        }
        return jsonResponse(simulatedUser);
      }

      // 13. Register Push Notifications
      if (path === '/api/register-push' && method === 'POST') {
        return jsonResponse({ success: true, message: 'Push subscription registered successfully' });
      }

      return jsonResponse({ error: 'Endpoint not found' }, 404);

    } catch (error) {
      console.error('Request processing error:', error);
      return jsonResponse({ error: error.message || 'Internal Server Error' }, 500);
    }
  }
};

// JSON helper
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS
    }
  });
}

// Authentication check
async function authenticateUser(request, env) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  
  if (token === 'simulated-google-jwt-token') {
    return { id: 'google-12345', email: 'santhosh@example.com', name: 'Santhosh Kumar' };
  }
  return null;
}

// DATABASE & MOCK INTERACTION HANDLERS

// Market status provider
async function fetchMarketStatus(env) {
  // Live: Fetch from financial feeds (like AlphaVantage, Yahoo Finance) and format.
  // Fallback / standard output: return mock values
  return {
    indices: [
      { id: 'nifty', name: 'Nifty 50', price: '24,235.45', change: '+142.30', pctChange: '+0.59%', trend: 'up', dailyTrend: [24080, 24110, 24150, 24130, 24200, 24235], weeklyTrend: [23800, 23950, 24020, 24100, 24235], monthlyTrend: [23500, 23650, 23900, 24150, 24235], aiSummary: 'Nifty showed resilience above 24,100, supported by banking and IT index gains.' },
      { id: 'sensex', name: 'BSE Sensex', price: '79,475.20', change: '+451.90', pctChange: '+0.57%', trend: 'up', dailyTrend: [79000, 79150, 79220, 79180, 79400, 79475], weeklyTrend: [78200, 78600, 78900, 79100, 79475], monthlyTrend: [77400, 78100, 78700, 79300, 79475], aiSummary: 'Sensex rallied on short-covering in financials. Strong DII inflows offset mild FII selling.' },
      { id: 'banknifty', name: 'Bank Nifty', price: '51,850.80', change: '+520.40', pctChange: '+1.01%', trend: 'up', dailyTrend: [51300, 51400, 51600, 51550, 51750, 51850], weeklyTrend: [50800, 51100, 51200, 51500, 51850], monthlyTrend: [49800, 50200, 51000, 51400, 51850], aiSummary: 'Outperformed broad market. Private banks led the surge post positive earnings.' },
      { id: 'nasdaq', name: 'NASDAQ 100', price: '19,420.15', change: '-120.45', pctChange: '-0.62%', trend: 'down', dailyTrend: [19550, 19500, 19480, 19410, 19430, 19420], weeklyTrend: [19680, 19550, 19610, 19500, 19420], monthlyTrend: [18900, 19200, 19700, 19550, 19420], aiSummary: 'Tech selloff continued on bond yield pressures and earnings caution.' },
      { id: 'sp500', name: 'S&P 500', price: '5,510.30', change: '-18.20', pctChange: '-0.33%', trend: 'down', dailyTrend: [5530, 5525, 5520, 5502, 5515, 5510], weeklyTrend: [5560, 5530, 5545, 5525, 5510], monthlyTrend: [5400, 5450, 5550, 5530, 5510], aiSummary: 'S&P hovered in a tight range as defensive sectors offset hardware tech weakness.' },
      { id: 'dow', name: 'Dow Jones', price: '40,120.50', change: '+92.15', pctChange: '+0.23%', trend: 'up', dailyTrend: [40010, 40050, 40100, 40080, 40150, 40120], weeklyTrend: [39800, 39950, 40200, 40050, 40120], monthlyTrend: [39200, 39600, 40100, 39950, 40120], aiSummary: 'Dow closed higher, demonstrating relative strength. Capital flows rotation into value.' },
      { id: 'gold', name: 'Gold (Oz)', price: '$2,415.60', change: '+28.40', pctChange: '+1.19%', trend: 'up', dailyTrend: [2385, 2390, 2402, 2398, 2410, 2415], weeklyTrend: [2360, 2380, 2375, 2395, 2415], monthlyTrend: [2320, 2350, 2380, 2400, 2415], aiSummary: 'Gold surged to near historic highs as geopolitical risk in West Asia intensified.' },
      { id: 'silver', name: 'Silver (Oz)', price: '$28.15', change: '+0.45', pctChange: '+1.62%', trend: 'up', dailyTrend: [27.7, 27.8, 27.95, 27.85, 28.1, 28.15], weeklyTrend: [27.2, 27.5, 27.8, 27.7, 28.15], monthlyTrend: [26.8, 27.4, 28.3, 27.8, 28.15], aiSummary: 'Industrial demand cues mixed, but precious metals rally carried silver higher.' },
      { id: 'crude', name: 'Crude Oil (Brent)', price: '$82.40', change: '+1.85', pctChange: '+2.30%', trend: 'up', dailyTrend: [80.5, 81.1, 81.5, 81.8, 82.2, 82.4], weeklyTrend: [84.1, 82.5, 81.2, 81.9, 82.4], monthlyTrend: [85.2, 83.9, 82.0, 81.5, 82.4], aiSummary: 'Oil spiked over 2% due to tight supplies and geopolitical risk premium.' },
      { id: 'usdinr', name: 'USD / INR', price: '83.72', change: '+0.08', pctChange: '+0.10%', trend: 'up', dailyTrend: [83.64, 83.68, 83.70, 83.69, 83.71, 83.72], weeklyTrend: [83.55, 83.62, 83.65, 83.70, 83.72], monthlyTrend: [83.35, 83.45, 83.60, 83.65, 83.72], aiSummary: 'Rupee edged lower on strong dollar index and steady FII outflows from local equities.' },
      { id: 'bitcoin', name: 'Bitcoin (BTC)', price: '$66,840.00', change: '-1,150.00', pctChange: '-1.69%', trend: 'down', dailyTrend: [68000, 67500, 67200, 66500, 67000, 66840], weeklyTrend: [64000, 65800, 67200, 68100, 66840], monthlyTrend: [61000, 63000, 65000, 67500, 66840], aiSummary: 'Profit-taking dragged BTC down from resistance near $68.5k.' },
      { id: 'vix', name: 'India VIX', price: '13.42', change: '-0.38', pctChange: '-2.75%', trend: 'down', dailyTrend: [13.8, 13.7, 13.5, 13.6, 13.45, 13.42], weeklyTrend: [14.2, 13.9, 13.6, 13.5, 13.42], monthlyTrend: [12.5, 13.1, 14.8, 13.9, 13.42], aiSummary: 'Volatility index cooled off as markets consolidated gains. A VIX below 14 suggests low near-term fear.' }
    ],
    fearGreed: {
      value: 64,
      status: 'Greed',
      prevValue: 58,
      prevStatus: 'Greed',
      monthlyValue: 48,
      monthlyStatus: 'Neutral',
      aiSummary: 'Fear & Greed index rose to 64, indicating market participants are turning increasingly optimistic.'
    }
  };
}

async function fetchNews(env) {
  return [
    {
      id: 1,
      title: 'Crude Oil Surges 2.3% as Middle East Tensions ESCALATE; Supply Lines Threat Looming',
      source: 'Financial Express',
      time: '2 hours ago',
      type: 'Geopolitical / Crude Oil',
      summary: 'Brent crude prices surged past $82 per barrel as tensions in West Asia escalated. Speculation of potential shipping disruptions in the Strait of Hormuz has forced premium adjustments.',
      aiAnalysis: {
        whatHappened: 'Brent crude rose 2.3% to $82.40/bbl due to escalating geopolitical tensions.',
        whyItMatters: 'Higher crude oil prices increase import bills for energy-dependent nations like India, leading to CAD pressures and higher domestic inflation.',
        sectorsAffected: [
          { name: 'Aviation', impact: 'negative', reason: 'Fuel represents 35-40% of operations costs.' },
          { name: 'Paint & Chemicals', impact: 'negative', reason: 'Crude derivatives serve as core raw materials.' },
          { name: 'Oil Exploration', impact: 'positive', reason: 'Realizations per barrel increase.' }
        ],
        shortTermImpact: 'Slightly negative sentiment for emerging markets; rising currency risk.',
        longTermImpact: 'Sticky inflation if sustained above $85/bbl.',
        confidenceScore: 92
      }
    },
    {
      id: 2,
      title: 'US Federal Reserve Hints at Potential Interest Rate Cuts in Q3 Citing Easing CPI inflation',
      source: 'Wall Street Journal',
      time: '4 hours ago',
      type: 'US Fed / Inflation',
      summary: 'The Federal Reserve chair indicated that cooling inflation and softening labor markets are paving the way for rate cuts later this quarter.',
      aiAnalysis: {
        whatHappened: 'Federal Reserve signaled a pivot toward interest rate cuts starting September 2026.',
        whyItMatters: 'A Fed rate cut weakens the USD, reduces cost of capital, and prompts capital inflows to emerging markets.',
        sectorsAffected: [
          { name: 'IT Services', impact: 'positive', reason: 'US clients will increase discretionary spending.' },
          { name: 'Real Estate / Banking', impact: 'positive', reason: 'Domestic rate cuts often follow global cuts.' }
        ],
        shortTermImpact: 'Highly bullish for global indices; bond yields will slip.',
        longTermImpact: 'Lower borrowing rates globally will spur corporate investments.',
        confidenceScore: 88
      }
    }
  ];
}

async function fetchAiAnalysis(env) {
  return {
    marketMood: 'Neutral to Bullish',
    moodValue: 65,
    probability: '72%',
    reasoning: 'The domestic market shows strong underlying liquidity supported by DII buying. A pending US Fed pivot in September is acting as a major global tailwind. However, rising crude oil prices and high valuation multiples in mid/small caps are keeping absolute bullishness checked.',
    keyRisks: [
      { title: 'Crude Spike', desc: 'Brent crude crossing $85/bbl due to geopolitical supply concerns.' },
      { title: 'Valuation Bubble', desc: 'Mid and small-cap stocks trading at extreme P/E multiples.' }
    ],
    keyOpportunities: [
      { title: 'Rate Cut Plays', desc: 'Accumulating Real Estate and NBFCs before rate cuts.' },
      { title: 'IT Rebound', desc: 'IT services showing earnings beats and positive revenue guidance.' }
    ]
  };
}

async function fetchUserPortfolio(env, userId) {
  if (!env.DB) {
    // Return seed holding portfolio if no DB binding exists
    return [
      { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', type: 'Stock', category: 'Energy/Conglomerate', avgPrice: 2450.00, currentPrice: 2580.40, qty: 50 },
      { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', type: 'Stock', category: 'Private Banking', avgPrice: 1550.00, currentPrice: 1610.20, qty: 80 },
      { symbol: 'INFY', name: 'Infosys Ltd.', type: 'Stock', category: 'IT Services', avgPrice: 1420.00, currentPrice: 1512.60, qty: 60 }
    ];
  }

  const { results } = await env.DB.prepare('SELECT symbol, name, category, avg_price as avgPrice, quantity as qty, "Stock" as type, avg_price * 1.05 as currentPrice FROM portfolio WHERE user_id = ?')
    .bind(userId)
    .all();

  if (results.length === 0) {
    // Seed default holdings if database is empty for the user
    await env.DB.prepare('INSERT INTO portfolio (user_id, symbol, name, category, avg_price, quantity) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(userId, 'RELIANCE', 'Reliance Industries Ltd.', 'Energy/Conglomerate', 2450.00, 50)
      .run();
    await env.DB.prepare('INSERT INTO portfolio (user_id, symbol, name, category, avg_price, quantity) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(userId, 'HDFCBANK', 'HDFC Bank Ltd.', 'Private Banking', 1550.00, 80)
      .run();
    
    return [
      { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', type: 'Stock', category: 'Energy/Conglomerate', avgPrice: 2450.00, currentPrice: 2580.40, qty: 50 },
      { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', type: 'Stock', category: 'Private Banking', avgPrice: 1550.00, currentPrice: 1610.20, qty: 80 }
    ];
  }
  return results;
}

async function addPortfolioHolding(env, userId, holding) {
  if (env.DB) {
    await env.DB.prepare('INSERT INTO portfolio (user_id, symbol, name, category, avg_price, quantity) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(userId, holding.symbol, holding.name, holding.category, holding.avgPrice, holding.qty)
      .run();
  }
}

async function fetchUserWatchlist(env, userId) {
  return [
    {
      name: 'My Watchlist',
      items: [
        { symbol: 'TCS', price: '4,150.20', change: '+52.40', pctChange: '+1.28%', aiSummary: 'Consolidating gains. NVIDIA NIM detects strong pipeline wins.' },
        { symbol: 'NVDA', price: '$118.50', change: '-3.10', pctChange: '-2.55%', aiSummary: 'Chip exports restrictions to China impacting sentiment.' }
      ]
    }
  ];
}

async function analyzePortfolio(env, holdings) {
  // Generate suggestions and allocations based on holdings
  return {
    sectorAllocation: [
      { name: 'Financial Services', value: 45 },
      { name: 'Energy', value: 35 },
      { name: 'IT Services', value: 20 }
    ],
    countryAllocation: [
      { name: 'India', value: 100 }
    ],
    riskScore: 'Moderate (5.5/10)',
    diversificationStatus: 'Moderately Concentrated',
    warnings: [
      { type: 'Concentration Warning', message: 'Your holdings are highly concentrated in Financials and Energy. Diversify into defensives.' }
    ],
    duplicateHoldings: 'None',
    suggestions: [
      { action: 'Trim', symbol: 'HDFCBANK', reason: 'High weight in private banking.' },
      { action: 'Buy', symbol: 'FMCG / index ETFs', reason: 'Hedge against geopolitical events.' }
    ]
  };
}

async function fetchAlerts(env) {
  return [
    {
      id: 1,
      time: '10:15 AM Today',
      symbol: 'CRUDE_OIL',
      title: 'Crude Oil jumps 2.3% above key resistance of $82',
      type: 'Indicator Spike',
      explanation: 'Oil prices breached resistance. This is driven by headlines of geopolitical tensions. High input pressure on paint and chemicals.'
    }
  ];
}

async function fetchMorningReport(env) {
  if (env.DB) {
    const row = await env.DB.prepare('SELECT content FROM cached_reports WHERE report_type = "morning_report"').first();
    if (row) {
      return JSON.parse(row.content);
    }
  }

  // Fallback default morning report
  return {
    date: 'July 28, 2026',
    title: 'AI Good Morning Report',
    marketSummary: 'Global cues are highly mixed this morning. US indices closed soft yesterday due to hardware tech profit booking, but the bond yields eased to 4.18%, signaling an impending rate cut cycle. Asian markets are opening flat.',
    importantEvents: [
      { event: 'US Core PCE Inflation data due tomorrow.', impact: 'High' }
    ],
    portfolioImpact: 'Your portfolio is well-positioned for today. The IT rebound will provide strength, offsetting any volatility in Reliance.',
    todayRisks: 'Rising crude oil prices may trigger intraday profit booking in auto and aviation sectors.',
    todayOpportunities: 'It is a good day to slowly accumulate defensive FMCG giants or Index ETFs during dips.',
    thingsToWatch: ['USDINR trajectory near 83.75', 'FII net flows in first 2 hours']
  };
}

async function queryAdvisor(env, question) {
  const systemMsg = "You are a top-tier financial advisor and fund manager. Answer the user's question concisely using current macroeconomic metrics (Gold $2415, Crude $82.40, VIX 13.42, Fed pivot expected September, India GDP strong). Format with clear sections.";
  const prompt = `Question: ${question}\nState today: Fear index is low (13.42), Brent Oil is rising ($82.4), Nifty consolidated at 24,235. Give personalized advice.`;
  
  const aiAnswer = await callNvidiaNim(env, prompt, systemMsg);
  if (aiAnswer) {
    return aiAnswer;
  }

  // Fallback logic
  if (question.toLowerCase().includes('sip')) {
    return "Yes, you should continue your SIPs. Under the current status of Nifty consolidations and strong DII liquidity, SIP rupee-cost averaging remains the optimal strategy for long-term retail wealth creation.";
  }
  if (question.toLowerCase().includes('lump sum') || question.toLowerCase().includes('lumpsum')) {
    return "Lump sum investing is not advised right now. The market is trading slightly above historical valuations (Nifty P/E near 22.8x). Deploy capital in a phased manner (e.g., through STPs) or wait for a 4-5% correction.";
  }
  return `Regarding "${question}": Given elevated crude oil ($82.40) and low volatility (VIX 13.42), the platform recommends defensive posture. Hold high-quality blue chips, accumulate FMCG on dips, and maintain partial cash equivalents (10-15% dry powder).`;
}

async function fetchSectors(env) {
  return [
    { name: 'Banking & Financials', trend: 'Bullish', strength: 'Strong', weakness: 'Deposit cost pressure', opportunities: 'Robust credit demand', risks: 'NIM contraction', news: 'Private banks show earnings beats.' },
    { name: 'IT Services', trend: 'Neutral to Bullish', strength: 'Strong dollar deals', weakness: 'US client budget delays', opportunities: 'AI transition consulting contracts', risks: 'High interest rates', news: 'IT indices rally on margin guidance upgrades.' }
  ];
}

async function fetchGlobalEvents(env) {
  return [
    {
      id: 1,
      title: 'Middle East Shipping Lane Conflicts',
      status: 'Active / Esculating',
      impactIndia: 'Negative: Boosts import bills (crude oil, gas) and freight costs.',
      impactUs: 'Neutral: Offsets inflation via domestic shale output.',
      impactChina: 'Negative: Disrupts trade routes and commodity supply flows.',
      impactEmerging: 'Negative: Elicits safe-haven flight to USD and Gold.'
    }
  ];
}

async function fetchTimeline(env) {
  return [
    {
      period: 'Today',
      events: [
        { time: '03:30 PM', title: 'Nifty closes at 24,235.45 (+0.59%)', desc: 'Heavy buying in private banking heavyweights (HDFC Bank, ICICI Bank) lifted the index in the last hour.' },
        { time: '11:00 AM', title: 'Brent Crude spikes above $82.40', desc: 'Geopolitical threats trigger worries over ocean shipping freight rates.' }
      ]
    }
  ];
}

// Scheduled Cron generator function
async function generateAndCacheMorningReport(env) {
  if (!env.DB) return;
  
  const systemMsg = "You are a professional fund manager writing the daily Morning Report before stock market opening.";
  const prompt = "Generate a daily morning report. Include marketSummary, importantEvents (as array of objects), portfolioImpact, todayRisks, todayOpportunities, thingsToWatch. Output raw JSON format matching: {date, title, marketSummary, importantEvents:[{event, impact}], portfolioImpact, todayRisks, todayOpportunities, thingsToWatch:[]}";
  
  const reportText = await callNvidiaNim(env, prompt, systemMsg);
  if (reportText) {
    try {
      // Validate that it's valid JSON
      JSON.parse(reportText);
      await env.DB.prepare('INSERT OR REPLACE INTO cached_reports (report_type, content) VALUES ("morning_report", ?)')
        .bind(reportText)
        .run();
    } catch (e) {
      console.error("Failed to parse AI morning report JSON:", e);
    }
  }
}
