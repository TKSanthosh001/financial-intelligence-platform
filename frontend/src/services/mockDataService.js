// High-Fidelity Mock Data Service for Financial Intelligence Platform

export const mockMarketStatus = {
  indices: [
    { id: 'nifty', name: 'Nifty 50', price: '24,235.45', change: '+142.30', pctChange: '+0.59%', trend: 'up', dailyTrend: [24080, 24110, 24150, 24130, 24200, 24235], weeklyTrend: [23800, 23950, 24020, 24100, 24235], monthlyTrend: [23500, 23650, 23900, 24150, 24235], aiSummary: 'Nifty showed resilience above 24,100, supported by banking and IT index gains. Sector rotation from energy to auto was observed. Consolidation likely near 24,300.' },
    { id: 'sensex', name: 'BSE Sensex', price: '79,475.20', change: '+451.90', pctChange: '+0.57%', trend: 'up', dailyTrend: [79000, 79150, 79220, 79180, 79400, 79475], weeklyTrend: [78200, 78600, 78900, 79100, 79475], monthlyTrend: [77400, 78100, 78700, 79300, 79475], aiSummary: 'Sensex rallied on short-covering in financials. Strong DII inflows offset mild FII selling. Next crucial resistance lies at 80,000.' },
    { id: 'banknifty', name: 'Bank Nifty', price: '51,850.80', change: '+520.40', pctChange: '+1.01%', trend: 'up', dailyTrend: [51300, 51400, 51600, 51550, 51750, 51850], weeklyTrend: [50800, 51100, 51200, 51500, 51850], monthlyTrend: [49800, 50200, 51000, 51400, 51850], aiSummary: 'Outperformed broad market. Private banks led the surge post positive earnings commentary from top-tier lenders. Momentum remains bullish.' },
    { id: 'nasdaq', name: 'NASDAQ 100', price: '19,420.15', change: '-120.45', pctChange: '-0.62%', trend: 'down', dailyTrend: [19550, 19500, 19480, 19410, 19430, 19420], weeklyTrend: [19680, 19550, 19610, 19500, 19420], monthlyTrend: [18900, 19200, 19700, 19550, 19420], aiSummary: 'Tech selloff continued on bond yield pressures and earnings caution ahead of mega-cap reports. Support at 19,250 is key.' },
    { id: 'sp500', name: 'S&P 500', price: '5,510.30', change: '-18.20', pctChange: '-0.33%', trend: 'down', dailyTrend: [5530, 5525, 5520, 5502, 5515, 5510], weeklyTrend: [5560, 5530, 5545, 5525, 5510], monthlyTrend: [5400, 5450, 5550, 5530, 5510], aiSummary: 'S&P hovered in a tight range as defensive sectors (Utilities, FMCG) offset hardware tech weakness. Investors await Fed inflation data.' },
    { id: 'dow', name: 'Dow Jones', price: '40,120.50', change: '+92.15', pctChange: '+0.23%', trend: 'up', dailyTrend: [40010, 40050, 40100, 40080, 40150, 40120], weeklyTrend: [39800, 39950, 40200, 40050, 40120], monthlyTrend: [39200, 39600, 40100, 39950, 40120], aiSummary: 'Dow closed higher, demonstrating relative strength. Capital flows rotation into value and industrials supported the index.' },
    { id: 'gold', name: 'Gold (Oz)', price: '$2,415.60', change: '+28.40', pctChange: '+1.19%', trend: 'up', dailyTrend: [2385, 2390, 2402, 2398, 2410, 2415], weeklyTrend: [2360, 2380, 2375, 2395, 2415], monthlyTrend: [2320, 2350, 2380, 2400, 2415], aiSummary: 'Gold surged to near historic highs as geopolitical risk in West Asia intensified. Investors seek safe-haven assets.' },
    { id: 'silver', name: 'Silver (Oz)', price: '$28.15', change: '+0.45', pctChange: '+1.62%', trend: 'up', dailyTrend: [27.7, 27.8, 27.95, 27.85, 28.1, 28.15], weeklyTrend: [27.2, 27.5, 27.8, 27.7, 28.15], monthlyTrend: [26.8, 27.4, 28.3, 27.8, 28.15], aiSummary: 'Industrial demand cues mixed, but precious metals rally carried silver higher. Target near-term resistance at $29.00.' },
    { id: 'crude', name: 'Crude Oil (Brent)', price: '$82.40', change: '+1.85', pctChange: '+2.30%', trend: 'up', dailyTrend: [80.5, 81.1, 81.5, 81.8, 82.2, 82.4], weeklyTrend: [84.1, 82.5, 81.2, 81.9, 82.4], monthlyTrend: [85.2, 83.9, 82.0, 81.5, 82.4], aiSummary: 'Oil spiked over 2% due to tight supplies and geopolitical risk premium. Rising oil creates pressure on airlines, paint, and chemicals.' },
    { id: 'usdinr', name: 'USD / INR', price: '83.72', change: '+0.08', pctChange: '+0.10%', trend: 'up', dailyTrend: [83.64, 83.68, 83.70, 83.69, 83.71, 83.72], weeklyTrend: [83.55, 83.62, 83.65, 83.70, 83.72], monthlyTrend: [83.35, 83.45, 83.60, 83.65, 83.72], aiSummary: 'Rupee edged lower on strong dollar index and steady FII outflows from local equities. RBI intervention capped further slide.' },
    { id: 'bitcoin', name: 'Bitcoin (BTC)', price: '$66,840.00', change: '-1,150.00', pctChange: '-1.69%', trend: 'down', dailyTrend: [68000, 67500, 67200, 66500, 67000, 66840], weeklyTrend: [64000, 65800, 67200, 68100, 66840], monthlyTrend: [61000, 63000, 65000, 67500, 66840], aiSummary: 'Profit-taking dragged BTC down from resistance near $68.5k. Institutional ETF flows remain robust but cooling off.' },
    { id: 'vix', name: 'India VIX', price: '13.42', change: '-0.38', pctChange: '-2.75%', trend: 'down', dailyTrend: [13.8, 13.7, 13.5, 13.6, 13.45, 13.42], weeklyTrend: [14.2, 13.9, 13.6, 13.5, 13.42], monthlyTrend: [12.5, 13.1, 14.8, 13.9, 13.42], aiSummary: 'Volatility index cooled off as markets consolidated gains. A VIX below 14 suggests low near-term fear but complacency risks.' }
  ],
  fearGreed: {
    value: 64,
    status: 'Greed',
    prevValue: 58,
    prevStatus: 'Greed',
    monthlyValue: 48,
    monthlyStatus: 'Neutral',
    aiSummary: 'Fear & Greed index rose to 64, indicating market participants are turning increasingly optimistic. FII short positions are covering, while retail leverage shows moderate build-up. Maintain caution on mid and small caps.'
  }
};

export const mockNews = [
  {
    id: 1,
    title: 'Crude Oil Surges 2.3% as Middle East Tensions ESCALATE; Supply Lines Threat Looming',
    source: 'Financial Express',
    time: '2 hours ago',
    type: 'Geopolitical / Crude Oil',
    summary: 'Brent crude prices surged past $82 per barrel as tensions in West Asia escalated. Speculation of potential shipping disruptions in the Strait of Hormuz has forced premium adjustments.',
    aiAnalysis: {
      whatHappened: 'Brent crude rose 2.3% to $82.40/bbl due to escalating geopolitical tensions in West Asia and threats to marine shipping corridors.',
      whyItMatters: 'Higher crude oil prices increase import bills for energy-dependent nations like India, leading to current account deficit pressures and higher domestic inflation.',
      sectorsAffected: [
        { name: 'Aviation', impact: 'negative', reason: 'Fuel represents 35-40% of operations costs; margins will contract.' },
        { name: 'Paint & Chemicals', impact: 'negative', reason: 'Crude derivatives serve as core raw materials; input costs will rise.' },
        { name: 'Oil Exploration (ONGC/Oil India)', impact: 'positive', reason: 'Realizations per barrel increase, leading to higher gross profit margins.' }
      ],
      shortTermImpact: 'Slightly negative sentiment for emerging markets; rising currency risk.',
      longTermImpact: 'Could lead to sticky inflation if crude sustains above $85/bbl for more than a quarter, forcing central banks to hold rates high.',
      confidenceScore: 92
    }
  },
  {
    id: 2,
    title: 'US Federal Reserve Hints at Potential Interest Rate Cuts in Q3 Citing Easing CPI inflation',
    source: 'Wall Street Journal',
    time: '4 hours ago',
    type: 'US Fed / Inflation',
    summary: 'The Federal Reserve chair indicated that cooling inflation and softening labor markets are paving the way for rate cuts later this quarter, shifting from a hawkish to a balanced stance.',
    aiAnalysis: {
      whatHappened: 'Federal Reserve signaled a pivot toward interest rate cuts starting September 2026, noting that inflation is steadily descending toward its 2% target.',
      whyItMatters: 'A Fed rate cut weakens the USD, reduces global cost of capital, and prompts large institutional capital (FIIs) to flow back into emerging equity markets.',
      sectorsAffected: [
        { name: 'IT Services', impact: 'positive', reason: 'US clients will increase discretionary spending as credit costs fall.' },
        { name: 'Real Estate / Banking', impact: 'positive', reason: 'Domestic rate cuts often follow global cuts, stimulating loan demand.' }
      ],
      shortTermImpact: 'Highly bullish for global indices; bond yields will slip, supporting tech sector stock prices.',
      longTermImpact: 'Lower borrowing rates globally will spur corporate investments and asset appreciation.',
      confidenceScore: 88
    }
  },
  {
    id: 3,
    title: 'RBI Monetary Policy Committee Maintains Status Quo: Repo Rate Kept Unchanged at 6.5%',
    source: 'LiveMint',
    time: '1 day ago',
    type: 'RBI / Central Bank',
    summary: 'The Reserve Bank of India decided to keep the benchmark repo rate at 6.5% for the tenth consecutive meeting, keeping their focus firmly on aligning inflation to the 4.0% medium-term target.',
    aiAnalysis: {
      whatHappened: 'RBI kept key lending rates unchanged at 6.5% and maintained its stance of "withdrawal of accommodation".',
      whyItMatters: 'Indicates the RBI is still cautious about food inflation risks and will not rush to cut rates before the Fed leads the way.',
      sectorsAffected: [
        { name: 'Banking & NBFCs', impact: 'neutral', reason: 'Net Interest Margins (NIM) remain stable; borrowing rates locked.' },
        { name: 'Automobile', impact: 'slightly negative', reason: 'Auto loan rates will remain high, delaying retail demand recovery.' }
      ],
      shortTermImpact: 'Neutral response expected from Nifty. Markets had factored in this decision.',
      longTermImpact: 'Maintains rupee stability and capital market hygiene, preventing runaway domestic credit bubbles.',
      confidenceScore: 95
    }
  },
  {
    id: 4,
    title: 'Infosys Beats Q1 Earnings Estimates, Revises Annual Revenue Guidance Upwards',
    source: 'Bloomberg Quint',
    time: '2 days ago',
    type: 'Earnings',
    summary: 'Infosys reported a net profit growth of 5% QoQ, beating analyst consensus. The IT bellwether raised its constant currency revenue guidance to 3-4% for FY26-27, boosting IT sector sentiment.',
    aiAnalysis: {
      whatHappened: 'Infosys beat expectations with strong deal wins and raised its yearly revenue growth guidance, lifting sector cloud.',
      whyItMatters: 'Shows initial signs of recovery in US enterprise software spending, which has been stagnant for 18 months.',
      sectorsAffected: [
        { name: 'IT Services (TCS, Wipro, HCL)', impact: 'positive', reason: 'Indicates industry-wide rebound and reassures global investors.' }
      ],
      shortTermImpact: 'Bullish for Nifty IT. Likely to drive index gains.',
      longTermImpact: 'Restored confidence in high-margin Indian service sectors; potential salary hikes to boost local premium consumption.',
      confidenceScore: 90
    }
  }
];

export const mockAiAnalysisEngine = {
  marketMood: 'Neutral to Bullish',
  moodValue: 65, // 0-100 scale (0 Bearish, 50 Neutral, 100 Bullish)
  probability: '72%',
  reasoning: 'The domestic market shows strong underlying liquidity supported by DII buying. A pending US Fed pivot in September is acting as a major global tailwind. However, rising crude oil prices due to West Asia tensions and high valuation multiples in mid/small caps are keeping the absolute bullishness checked. Expect range-bound volatility with an upward bias.',
  keyRisks: [
    { title: 'Crude Spike', desc: 'Brent crude crossing $85/bbl due to Strait of Hormuz supply concerns, triggering inflation.' },
    { title: 'Valuation Bubble', desc: 'Mid and small-cap stocks trading at extreme P/E multiples relative to their historic averages.' },
    { title: 'FII Outflows', desc: 'FIIs allocating funds out of India towards cheaper markets like China or high-yield US treasuries.' }
  ],
  keyOpportunities: [
    { title: 'Rate Cut Plays', desc: 'Accumulating interest-rate sensitive sectors like Real Estate and high-quality NBFCs before official rate cuts.' },
    { title: 'IT Rebound', desc: 'IT services are showing earnings beats and positive revenue guidance, trading at reasonable valuations.' },
    { title: 'Defensive Sectors', desc: 'FMCG and Pharma sectors show steady earnings growth, offering safe-haven benefits during geopolitical shockwaves.' }
  ]
};

export const mockPortfolio = {
  holdings: [
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', type: 'Stock', category: 'Energy/Conglomerate', avgPrice: 2450.00, currentPrice: 2580.40, qty: 50 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', type: 'Stock', category: 'Private Banking', avgPrice: 1550.00, currentPrice: 1610.20, qty: 80 },
    { symbol: 'INFY', name: 'Infosys Ltd.', type: 'Stock', category: 'IT Services', avgPrice: 1420.00, currentPrice: 1512.60, qty: 60 },
    { symbol: 'TATASTEEL', name: 'Tata Steel Ltd.', type: 'Stock', category: 'Metals & Mining', avgPrice: 160.00, currentPrice: 145.30, qty: 300 },
    { symbol: 'NIPPON_ETF', name: 'Nippon India Nifty 50 ETF', type: 'Fund', category: 'Index Fund', avgPrice: 220.00, currentPrice: 242.30, qty: 500 }
  ],
  aiAnalysis: {
    sectorAllocation: [
      { name: 'Financial Services', value: 28 },
      { name: 'Energy', value: 25 },
      { name: 'IT Services', value: 18 },
      { name: 'Index Funds', value: 20 },
      { name: 'Metals', value: 9 }
    ],
    countryAllocation: [
      { name: 'India', value: 90 },
      { name: 'US (via Tech/ADR)', value: 10 }
    ],
    riskScore: 'Moderate (5.8/10)',
    diversificationStatus: 'Well Diversified',
    warnings: [
      { type: 'Over-Concentration', message: 'Reliance and HDFC Bank account for over 50% of your individual stock portfolio. A sector shock in Banking or Energy will heavily impact returns.' },
      { type: 'Underperformance Risk', message: 'Tata Steel is down 9.2% from your purchase price. Steel pricing cycle is currently weak due to slowing demand in China.' }
    ],
    duplicateHoldings: 'No major overlap found. However, Nippon ETF and individual holdings (Reliance, HDFC Bank, Infosys) overlap. You are indirectly holding more Reliance through the ETF.',
    suggestions: [
      { action: 'Trim', symbol: 'RELIANCE', reason: 'Take partial profits and reduce stock weight below 15% to manage concentration risk.' },
      { action: 'Buy', symbol: 'FMCG / Pharma Stocks', reason: 'Allocate 10% cash to defensive sectors (like ITC or Sun Pharma) to hedge against geopolitical inflation spikes.' },
      { action: 'Hold', symbol: 'INFY', reason: 'IT services are recovering. Hold and ride the upward constant-currency guidance cycle.' }
    ]
  }
};

export const mockWatchlists = [
  {
    name: 'Tech & High Growth',
    items: [
      { symbol: 'TCS', price: '4,150.20', change: '+52.40', pctChange: '+1.28%', aiSummary: 'Consolidating gains. NVIDIA NIM detects strong pipeline wins. Sector view: Bullish.' },
      { symbol: 'NVDA', price: '$118.50', change: '-3.10', pctChange: '-2.55%', aiSummary: 'Chip exports restrictions to China impacting sentiment. Long-term AI infrastructure demand intact.' },
      { symbol: 'MUTHOOTFIN', price: '1,720.00', change: '+25.60', pctChange: '+1.51%', aiSummary: 'Benefiting from Gold price surge. Collateral values rising, supporting loan book margins.' }
    ]
  },
  {
    name: 'Macro / Commodities',
    items: [
      { symbol: 'US10Y', price: '4.18%', change: '-0.04', pctChange: '-0.95%', aiSummary: 'US 10-Year yield slipped on Fed rate cut optimism. Bullish for equity risk-premiums.' },
      { symbol: 'DXY', price: '104.12', change: '-0.30', pctChange: '-0.29%', aiSummary: 'Dollar Index easing below 104.5. Positive for emerging markets currency stability.' }
    ]
  }
];

export const mockAlerts = [
  {
    id: 1,
    time: '10:15 AM Today',
    symbol: 'CRUDE_OIL',
    title: 'Crude Oil jumps 2.3% above key resistance of $82',
    type: 'Indicator Spike',
    explanation: 'Oil prices breached a 3-week channel resistance. This is driven by headlines of targeted geopolitical actions in the Middle East. For your portfolio, this increases the input pressure on your indirect paint/chemical holdings. Expect some short-term profit booking.'
  },
  {
    id: 2,
    time: '09:30 AM Today',
    symbol: 'INFY',
    title: 'Infosys jumps 4.5% at market open',
    type: 'Earnings Spike',
    explanation: 'Triggered by Q1 earnings beat and upward revision of constant-currency growth guidance to 3-4%. The market mood for IT is turning sharply positive. Your holding is now in profit of 6.5%. Maintain holding, do not rush to sell.'
  },
  {
    id: 3,
    time: 'Yesterday',
    symbol: 'FII_ACTIVITY',
    title: 'Large FII net selling of ₹3,400 Crore recorded',
    type: 'FII/DII Action',
    explanation: 'FIIs turned heavy net sellers in Cash segment. Conversely, DIIs bought shares worth ₹2,900 Crore, neutralizing a sharp fall. FII flows are shifting to Chinese index blocks due to cheaper valuations. Local indices remain supported by domestic savings.'
  }
];

export const mockFundManagerReport = {
  date: 'July 28, 2026',
  title: 'AI Good Morning Report',
  marketSummary: 'Global cues are highly mixed this morning. US indices closed soft yesterday due to hardware tech profit booking, but the bond yields eased to 4.18%, signaling an impending rate cut cycle. Asian markets are opening flat. Nifty is expected to open slightly in the green (+30 points) tracking gift Nifty cues.',
  importantEvents: [
    { event: 'US Core PCE Inflation data due tomorrow (critical for Fed rate decisions).', impact: 'High' },
    { event: 'Middle East geopolitical tensions escalating; Crude oil trades elevated at $82.40.', impact: 'Medium' }
  ],
  portfolioImpact: 'Your portfolio is well-positioned for today. The IT rebound (Infosys) will provide strength, offsetting any volatility in Reliance. Keep an eye on Tata Steel, as weak Chinese metal output numbers could pressure prices today.',
  todayRisks: 'Rising crude oil prices may trigger intraday profit booking in auto and aviation sectors. Avoid adding new leverage positions in mid-caps today.',
  todayOpportunities: 'It is a good day to slowly accumulate defensive FMCG giants (e.g., ITC) or Index ETFs during dips, as volatility might provide better entry pricing.',
  thingsToWatch: ['USDINR trajectory near 83.75', 'FII net flows in the first 2 hours of trade']
};

export const mockAdvisorResponses = [
  {
    question: 'Should I continue SIP?',
    answer: 'Yes, you should absolutely continue your SIP (Systematic Investment Plan). Historical market cycles demonstrate that SIPs benefit from dollar-cost averaging. Since India\'s long-term GDP growth story remains solid (projected at 6.5%-7.0%), and domestic retail inflows (DIIs) are consistently balancing foreign selling, compounding will work in your favor. Terminating SIPs during minor corrections ruins long-term yield generation.'
  },
  {
    question: 'Should I invest lump sum?',
    answer: 'Given current valuations, investing a large lump sum is NOT recommended. The Nifty 50 P/E ratio is trading near 22.8x, which is slightly above its 10-year average. Mid and small caps are in an even higher valuation zone. A better approach is to place your lump sum in a liquid fund/arbitrage fund and perform a Systematic Transfer Plan (STP) over 6 to 12 months, or wait for a 4-5% market correction to deploy 30% of your dry powder.'
  },
  {
    question: 'Why is my portfolio falling?',
    answer: 'Your portfolio might be experiencing a minor drawdown due to two factors: 1) The decline in Tata Steel (-9.2%), which is affected by weak global steel demand and excess supply from Chinese mills, and 2) High concentration in Reliance and HDFC Bank. A minor sector rotation from heavyweights into defensive sectors like Pharma and FMCG is causing large cap indices to consolidate, leading to temporary portfolio flatlining.'
  }
];

export const mockMarketTimeline = [
  {
    period: 'Today',
    events: [
      { time: '03:30 PM', title: 'Nifty closes at 24,235.45 (+0.59%)', desc: 'Heavy buying in private banking heavyweights (HDFC Bank, ICICI Bank) lifted the index in the last hour.' },
      { time: '11:00 AM', title: 'Brent Crude spikes above $82.40', desc: 'Geopolitical threats trigger worries over ocean shipping freight rates.' }
    ]
  },
  {
    period: 'Yesterday',
    events: [
      { time: '05:30 PM', title: 'FIIs sell net ₹3,400 Crore, DIIs buy ₹2,900 Crore', desc: 'DIIs absorption prevents Nifty from sliding below its 20-DMA support.' },
      { time: '02:00 PM', title: 'RBI Repo Rate announcement', desc: 'Repo rate kept at 6.5%, reinforcing monetary discipline.' }
    ]
  },
  {
    period: 'Last Week',
    events: [
      { time: 'July 21, 2026', title: 'Infosys Beats Q1 guidance estimates', desc: 'IT index rallies 3.8% in a single session, reversing a 2-month downtrend.' },
      { time: 'July 18, 2026', title: 'US Inflation prints at 3.0%', desc: 'Ignites expectations of a definite Fed rate cut in September.' }
    ]
  }
];

export const mockSectors = [
  { name: 'Banking & Financials', trend: 'Bullish', strength: 'Strong', weakness: 'Rising cost of funds for smaller deposits', opportunities: 'Credit growth remains robust at 15% YoY', risks: 'NIM compression if loan yields fall faster than deposit rates', news: 'Private banks show double digit profit growth in Q1.' },
  { name: 'IT Services', trend: 'Neutral to Bullish', strength: 'Strong dollar, deal pipelines', weakness: 'Discretionary tech spending in US is still recovery-mode', opportunities: 'NVIDIA NIM integrations, AI transition contracts', risks: 'Delayed US rate cuts could slow down corporate cloud spend', news: 'Infosys beats estimates and raises growth targets.' },
  { name: 'Pharma', trend: 'Bullish', strength: 'US generic price stability', weakness: 'US FDA regulatory inspection audits', opportunities: 'Domestic chronic therapies growth', risks: 'Input active ingredient costs', news: 'Sun Pharma receives approvals for new pipeline assets.' },
  { name: 'Energy', trend: 'Neutral', strength: 'Elevated refining margins', weakness: 'Windfall tax adjustments by government', opportunities: 'Green energy transition capacity additions', risks: 'Crude price high volatility affecting marketing margins', news: 'Reliance starts testing new solar manufacturing plant.' },
  { name: 'Defense', trend: 'Highly Bullish', strength: 'Order backlogs of 4-5 years', weakness: 'Extremely high valuation multiples', opportunities: 'Export bookings to friendly nations', risks: 'Execution delays and supply chain shortages of chips', news: 'Defense ministry clears purchase contracts worth ₹45,000 Crore.' }
];

export const mockGlobalEvents = [
  {
    id: 1,
    title: 'Middle East Shipping Lane Conflicts',
    status: 'Active / Esculating',
    impactIndia: 'Negative: Boosts import bills (crude oil, gas) and freight costs. Mild currency depreciation pressure.',
    impactUs: 'Neutral to Negative: Inflation risk offset by US oil independence. High defense sector bookings.',
    impactChina: 'Negative: Disrups export lanes to Europe; increases cost of commodity imports.',
    impactEmerging: 'Negative: Capital flight to safe-havens like USD and Gold.'
  },
  {
    id: 2,
    title: 'US Presidential Election Campaigning',
    status: 'Ongoing (Polling Nov 2026)',
    impactIndia: 'Neutral to Positive: Multi-partisan support for India ties. Shift of manufacturing supply chains away from China expected to continue.',
    impactUs: 'High Volatility: Policy debates around tariffs and corporate tax rates keeping markets on edge.',
    impactChina: 'Negative: Hardening trade stances from both major candidates; threat of higher tariff blocks.',
    impactEmerging: 'Volatile: Shifts in US dollar strength directly affect global credit conditions.'
  }
];

export const mockSwingOpportunities = [
  { ticker: 'INFY', company: 'Infosys Limited', swing_score: 88, entry_zone: '₹1,500 - ₹1,515', exit_zone: '₹1,620 - ₹1,650', stop_loss: '₹1,455', holding_period: '5-12 Days', risk_score: 35, momentum_score: 85, volume_score: 90, confidence: 'High', reasoning: 'Golden cross 20-EMA over 50-EMA. Heavy volume breakout following positive Q1 guidance. Delivery % is 68.4%.' },
  { ticker: 'TCS', company: 'Tata Consultancy Services', swing_score: 84, entry_zone: '₹4,120 - ₹4,150', exit_zone: '₹4,380 - ₹4,420', stop_loss: '₹4,010', holding_period: '7-14 Days', risk_score: 30, momentum_score: 82, volume_score: 84, confidence: 'High', reasoning: 'Channel consolidation breakout with expanding MACD histogram. US rate-cut prospects driving tech inflows.' },
  { ticker: 'HDFCBANK', company: 'HDFC Bank Ltd.', swing_score: 81, entry_zone: '₹1,600 - ₹1,612', exit_zone: '₹1,710 - ₹1,740', stop_loss: '₹1,550', holding_period: '10-20 Days', risk_score: 40, momentum_score: 79, volume_score: 88, confidence: 'High', reasoning: 'Double bottom reversal pattern confirmed on daily chart. FII net buyers over the last 3 consecutive sessions.' },
  { ticker: 'RELIANCE', company: 'Reliance Industries Ltd.', swing_score: 79, entry_zone: '₹2,560 - ₹2,580', exit_zone: '₹2,720 - ₹2,750', stop_loss: '₹2,490', holding_period: '7-15 Days', risk_score: 42, momentum_score: 78, volume_score: 80, confidence: 'Moderate', reasoning: 'Support bounce at 50-day EMA. Green energy arm announcements providing catalyst.' }
];

export const mockMarketScans = [
  { id: 1, ticker: 'INFY', name: 'Infosys Limited', category: 'Volume Breakout', value: '3.4x 20-DMA Volume', price: '₹1,512.60', change: '+3.45%', rsi: 64, ema20: '₹1,480', ema50: '₹1,435', vwap: '₹1,505', deliveryPct: '68.4%', summary: 'High delivery accumulation observed. Price closed above upper Bollinger Band with ADX strength at 28.5.' },
  { id: 2, ticker: 'TCS', name: 'Tata Consultancy Services', category: 'Golden Cross', value: 'EMA 20 > EMA 50', price: '₹4,150.20', change: '+1.28%', rsi: 58, ema20: '₹4,090', ema50: '₹4,020', vwap: '₹4,135', deliveryPct: '59.2%', summary: 'Golden Cross confirmed. 20-day EMA crossed above 50-day EMA accompanied by expanding volume histogram on MACD.' },
  { id: 3, ticker: 'RELIANCE', name: 'Reliance Industries Ltd', category: 'Golden Cross', value: 'EMA 50 > EMA 200', price: '₹2,580.40', change: '+0.85%', rsi: 55, ema20: '₹2,540', ema50: '₹2,510', vwap: '₹2,572', deliveryPct: '52.1%', summary: 'Long-term trend reversal signal. Price holding above VWAP support line with declining volatility index.' },
  { id: 4, ticker: 'HDFCBANK', name: 'HDFC Bank Ltd', category: 'Price Breakout', value: '52-Wk Resistance Breakout', price: '₹1,610.20', change: '+2.15%', rsi: 68, ema20: '₹1,570', ema50: '₹1,540', vwap: '₹1,602', deliveryPct: '71.5%', summary: 'Broke out of 8-month horizontal channel resistance at 1,590. Strong institutional delivery buying detected.' }
];

export const mockInstitutionalFlows = [
  { flow_date: '2026-07-28', fii_net: 1420.50, dii_net: 2150.80 },
  { flow_date: '2026-07-27', fii_net: -850.20, dii_net: 1940.30 },
  { flow_date: '2026-07-26', fii_net: 310.40, dii_net: 1120.00 },
  { flow_date: '2026-07-25', fii_net: -1240.00, dii_net: 2850.60 },
  { flow_date: '2026-07-24', fii_net: 950.00, dii_net: 1410.20 }
];
