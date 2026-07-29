// High-Fidelity Mock Data Service for Financial Intelligence Platform

export const mockMarketStatus = {
  indices: [
    { id: 'nifty', name: 'Nifty 50', price: '23,985.35', change: '-10.60', pctChange: '-0.04%', trend: 'down', dailyTrend: [24010, 23990, 24020, 23970, 23985], weeklyTrend: [23800, 23950, 24020, 24100, 23985], monthlyTrend: [23500, 23650, 23900, 24150, 23985], aiSummary: 'Nifty ended flat, down 0.04%, consolidation observed below 24,000 resistance. Support active at 23,900.' },
    { id: 'sensex', name: 'BSE Sensex', price: '76,765.92', change: '-69.86', pctChange: '-0.09%', trend: 'down', dailyTrend: [76900, 76800, 76720, 76765], weeklyTrend: [76200, 76600, 76900, 77100, 76765], monthlyTrend: [75400, 76100, 76700, 77300, 76765], aiSummary: 'Sensex slid marginally by 0.09% as investors exercised caution ahead of upcoming central bank decisions.' },
    { id: 'banknifty', name: 'Bank Nifty', price: '56,755.60', change: '-331.40', pctChange: '-0.58%', trend: 'down', dailyTrend: [57100, 56900, 56800, 56755], weeklyTrend: [56200, 56500, 56800, 57100, 56755], monthlyTrend: [55400, 55900, 56400, 56900, 56755], aiSummary: 'Outperformed by broad market but dragged down late session by private banking profit booking. Crucial support at 56,500.' },
    { id: 'nasdaq', name: 'NASDAQ 100', price: '19,420.15', change: '-120.45', pctChange: '-0.62%', trend: 'down', dailyTrend: [19550, 19500, 19480, 19410, 19430, 19420], weeklyTrend: [19680, 19550, 19610, 19500, 19420], monthlyTrend: [18900, 19200, 19700, 19550, 19420], aiSummary: 'Tech selloff continued on bond yield pressures and earnings caution ahead of mega-cap reports.' },
    { id: 'sp500', name: 'S&P 500', price: '5,510.30', change: '-18.20', pctChange: '-0.33%', trend: 'down', dailyTrend: [5530, 5525, 5520, 5502, 5515, 5510], weeklyTrend: [5560, 5530, 5545, 5525, 5510], monthlyTrend: [5400, 5450, 5550, 5530, 5510], aiSummary: 'S&P hovered in a tight range as defensive sectors offset hardware tech weakness.' },
    { id: 'dow', name: 'Dow Jones', price: '40,120.50', change: '+92.15', pctChange: '+0.23%', trend: 'up', dailyTrend: [40010, 40050, 40100, 40080, 40150, 40120], weeklyTrend: [39800, 39950, 40200, 40050, 40120], monthlyTrend: [39200, 39600, 40100, 39950, 40120], aiSummary: 'Dow closed higher, demonstrating relative strength. Capital flows rotation into value.' },
    { id: 'gold', name: 'Gold (Oz)', price: '$2,415.60', change: '+28.40', pctChange: '+1.19%', trend: 'up', dailyTrend: [2385, 2390, 2402, 2398, 2410, 2415], weeklyTrend: [2360, 2380, 2375, 2395, 2415], monthlyTrend: [2320, 2350, 2380, 2400, 2415], aiSummary: 'Gold surged to near historic highs as geopolitical risk in West Asia intensified.' },
    { id: 'silver', name: 'Silver (Oz)', price: '$28.15', change: '+0.45', pctChange: '+1.62%', trend: 'up', dailyTrend: [27.7, 27.8, 27.95, 27.85, 28.1, 28.15], weeklyTrend: [27.2, 27.5, 27.8, 27.7, 28.15], monthlyTrend: [26.8, 27.4, 28.3, 27.8, 28.15], aiSummary: 'Industrial demand cues mixed, but precious metals rally carried silver higher.' },
    { id: 'crude', name: 'Crude Oil (Brent)', price: '$83.51', change: '-1.45', pctChange: '-1.71%', trend: 'down', dailyTrend: [84.5, 84.1, 83.8, 83.51], weeklyTrend: [84.1, 83.9, 83.8, 83.51], monthlyTrend: [85.2, 83.9, 82.0, 81.5, 83.51], aiSummary: 'Brent crude traded down at $83.51 per barrel supporting local Emerging Market currencies.' },
    { id: 'usdinr', name: 'USD / INR', price: '95.75', change: '-0.30', pctChange: '-0.31%', trend: 'down', dailyTrend: [96.05, 95.95, 95.85, 95.75], weeklyTrend: [96.25, 96.05, 95.85, 95.75], monthlyTrend: [96.50, 96.15, 95.75], aiSummary: 'Rupee opened stronger at 95.75, supported by RBI interventions and falling crude oil prices.' },
    { id: 'bitcoin', name: 'Bitcoin (BTC)', price: '$63,200.00', change: '-950.00', pctChange: '-1.48%', trend: 'down', dailyTrend: [64150, 63800, 63400, 63200], weeklyTrend: [62800, 63500, 63200], monthlyTrend: [61000, 63000, 63200], aiSummary: 'BTC hovered near $63.2k with mild outflows.' },
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

export const mockNews = [
  {
    id: 1,
    title: 'RBI Proposes Securitisation Rules Amendment: ₹1 Crore Minimum Investment in Demat Form Required',
    source: 'Economic Times',
    time: '30 mins ago',
    type: 'RBI / Regulatory',
    summary: 'The Reserve Bank of India has proposed draft amendments to securitisation transaction rules, prescribing a ₹1 crore minimum investment limit and dematerialised token distribution to start from October 1, 2026.',
    aiAnalysis: {
      whatHappened: 'RBI proposed draft securitisation rules requiring demat-only issuance and high entry ticket sizes.',
      whyItMatters: 'Forces transaction transparency and mitigates retail speculation risks in complex derivatives pools.',
      sectorsAffected: [
        { name: 'Banking', impact: 'positive', reason: 'Better risk containment and structured asset books.' },
        { name: 'NBFC / Housing Finance', impact: 'neutral', reason: 'Minimum tick size will restrict primary retail access.' }
      ],
      shortTermImpact: 'Neutral to slightly positive for institutional credit desks.',
      longTermImpact: 'Clean, transparent asset backing systems.',
      confidenceScore: 94
    }
  },
  {
    id: 2,
    title: 'Tata Communications and Tata Tele Business Partner to Build Unified AI Platform Stack for SMBs',
    source: 'Moneycontrol',
    time: '1 hour ago',
    type: 'Corporate Alliance',
    summary: 'Tata Communications and TTBS announced a strategic collaboration to construct a unified AI cloud platform stack targeted specifically for Small and Medium Businesses (SMBs) in India.',
    aiAnalysis: {
      whatHappened: 'Strategic partnership to deploy low-cost cloud AI tool stacks for SMBs.',
      whyItMatters: 'Captures high-growth cloud market sectors, positioning Tata Tele strongly against competitors.',
      sectorsAffected: [
        { name: 'Telecom & Cloud', impact: 'positive', reason: 'Increases average revenue per user (ARPU).' },
        { name: 'IT Infrastructure', impact: 'positive', reason: 'Increases node demand.' }
      ],
      shortTermImpact: 'Highly bullish for Tata Communications and Tata Tele stocks.',
      longTermImpact: 'Sustained ARPU growth.',
      confidenceScore: 89
    }
  },
  {
    id: 3,
    title: 'Infosys Migrates NTN Corporation e-Commerce Engine to SAP Commerce Cloud',
    source: 'Business Standard',
    time: '2 hours ago',
    type: 'IT Services Deal',
    summary: 'Infosys announced the successful migration of NTN Corporation’s primary e-commerce platform and node stack to SAP Commerce Cloud, improving transaction throughput.',
    aiAnalysis: {
      whatHappened: 'Completion of high-profile SAP cloud migration deal.',
      whyItMatters: 'Underlines Infosys technical lead and robust order execution capability.',
      sectorsAffected: [
        { name: 'IT Services', impact: 'positive', reason: 'Drives margin accretion and international visibility.' }
      ],
      shortTermImpact: 'Bullish for Infosys.',
      longTermImpact: 'Improves recurring service contract revenue.',
      confidenceScore: 92
    }
  },
  {
    id: 4,
    title: 'Zaggle Prepaid Signs Three-Year Partnership with Daimler India',
    source: 'LiveMint',
    time: '4 hours ago',
    type: 'Corporate Contract',
    summary: 'Zaggle Prepaid entered into a three-year corporate billing and card expenses management agreement with Daimler India.',
    aiAnalysis: {
      whatHappened: 'Secured a 3-year contract with a major automotive multinational.',
      whyItMatters: 'Validates expense management utility software suite viability for enterprise clients.',
      sectorsAffected: [
        { name: 'Fintech Software', impact: 'positive', reason: 'Increases platform usage fees and transaction cut volumes.' }
      ],
      shortTermImpact: 'Bullish for Zaggle.',
      longTermImpact: 'Secure recurring enterprise revenues.',
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
  summary: {
    totalInvestment: 103002.00,
    currentValue: 97845.00,
    totalProfit: -5157.08,
    absoluteReturnPct: -5.01,
  },
  holdings: [
    { symbol: 'KALYANKJIL', name: 'Kalyan Jewellers India', type: 'Stock', category: 'Consumer & Retail', avgPrice: 396.59, currentPrice: 608.35, qty: 10 },
    { symbol: 'SAIL', name: 'Steel Authority of India', type: 'Stock', category: 'Metals & Mining', avgPrice: 140.60, currentPrice: 165.85, qty: 7 },
    { symbol: 'GAIL', name: 'GAIL (India) Ltd', type: 'Stock', category: 'Power & Renewable Energy', avgPrice: 184.64, currentPrice: 175.15, qty: 17 },
    { symbol: 'IREDA', name: 'Indian Renewable Energy Dev', type: 'Stock', category: 'Power & Renewable Energy', avgPrice: 185.33, currentPrice: 120.49, qty: 10 },
    { symbol: 'ONGC', name: 'Oil & Natural Gas Corp', type: 'Stock', category: 'Power & Renewable Energy', avgPrice: 238.81, currentPrice: 238.91, qty: 3 },
    { symbol: 'RECLTD', name: 'REC Limited', type: 'Stock', category: 'PSU & Infrastructure', avgPrice: 363.73, currentPrice: 368.45, qty: 35 },
    { symbol: 'EMBASSY', name: 'Embassy Developments', type: 'Stock', category: 'Speculative Small-Cap Equities', avgPrice: 154.69, currentPrice: 62.12, qty: 5 },
    { symbol: 'CASTROLIND', name: 'Castrol India Ltd', type: 'Stock', category: 'Consumer & Retail', avgPrice: 190.23, currentPrice: 184.06, qty: 11 },
    { symbol: 'KMCSPL', name: 'KMC Speciality Hospitals', type: 'Stock', category: 'Healthcare', avgPrice: 86.26, currentPrice: 130.25, qty: 4 },
    { symbol: 'IOC', name: 'Indian Oil Corp Ltd', type: 'Stock', category: 'Power & Renewable Energy', avgPrice: 151.64, currentPrice: 141.28, qty: 14 },
    { symbol: 'ITC', name: 'ITC Limited', type: 'Stock', category: 'Consumer & Retail', avgPrice: 360.13, currentPrice: 284.65, qty: 10 },
    { symbol: 'SBIN', name: 'State Bank of India', type: 'Stock', category: 'Banking & Financials', avgPrice: 849.10, currentPrice: 1013.20, qty: 1 },
    { symbol: 'IRBINFR', name: 'IRB Infrastructure Dev', type: 'Stock', category: 'PSU & Infrastructure', avgPrice: 33.58, currentPrice: 19.45, qty: 162 },
    { symbol: 'TATASTEEL', name: 'Tata Steel Ltd', type: 'Stock', category: 'Metals & Mining', avgPrice: 155.55, currentPrice: 182.63, qty: 3 },
    { symbol: 'IRFC', name: 'Indian Railway Finance Corp', type: 'Stock', category: 'PSU & Infrastructure', avgPrice: 146.16, currentPrice: 87.15, qty: 20 },
    { symbol: 'RTNPOWER', name: 'RattanIndia Power', type: 'Stock', category: 'Speculative Small-Cap Equities', avgPrice: 17.30, currentPrice: 8.51, qty: 10 },
    { symbol: 'NALCO', name: 'National Aluminium Co', type: 'Stock', category: 'Metals & Mining', avgPrice: 157.76, currentPrice: 334.55, qty: 5 },
    { symbol: 'GOLDBEES', name: 'Nippon India ETF Gold BeES', type: 'ETF', category: 'Precious Metals', avgPrice: 105.48, currentPrice: 116.83, qty: 142 },
    { symbol: 'TATAPOWER', name: 'Tata Power Co Ltd', type: 'Stock', category: 'Power & Renewable Energy', avgPrice: 375.18, currentPrice: 371.35, qty: 11 },
    { symbol: 'IRCTC', name: 'Indian Railway Catering & Tour', type: 'Stock', category: 'PSU & Infrastructure', avgPrice: 830.99, currentPrice: 485.95, qty: 4 },
    { symbol: 'ENGINERSIN', name: 'Engineers India Ltd', type: 'Stock', category: 'PSU & Infrastructure', avgPrice: 178.91, currentPrice: 222.59, qty: 14 },
    { symbol: 'NHPC', name: 'NHPC Limited', type: 'Stock', category: 'Power & Renewable Energy', avgPrice: 103.85, currentPrice: 78.28, qty: 106 },
    { symbol: 'VASCONEQ', name: 'Vascon Engineers Ltd', type: 'Stock', category: 'Speculative Small-Cap Equities', avgPrice: 79.00, currentPrice: 31.92, qty: 10 },
    { symbol: 'HINDCOPPER', name: 'Hindustan Copper Ltd', type: 'Stock', category: 'Metals & Mining', avgPrice: 491.96, currentPrice: 473.15, qty: 7 },
    { symbol: 'UJJIVANSFB', name: 'Ujjivan Small Finance Bank', type: 'Stock', category: 'Banking & Financials', avgPrice: 52.90, currentPrice: 70.12, qty: 10 },
    { symbol: 'TATSILV', name: 'Tata Silver ETF', type: 'ETF', category: 'Precious Metals', avgPrice: 29.60, currentPrice: 20.94, qty: 144 },
    { symbol: 'SILVERBEES', name: 'Nippon India Silver ETF', type: 'ETF', category: 'Precious Metals', avgPrice: 125.39, currentPrice: 206.20, qty: 26 },
    { symbol: 'SEL', name: 'Steel Exchange India', type: 'Stock', category: 'Speculative Small-Cap Equities', avgPrice: 14.59, currentPrice: 11.20, qty: 50 },
    { symbol: 'EASEMYTRIP', name: 'Easy Trip Planners Ltd', type: 'Stock', category: 'Speculative Small-Cap Equities', avgPrice: 20.99, currentPrice: 6.59, qty: 40 },
    { symbol: 'HUDCO', name: 'Housing & Urban Dev Corp', type: 'Stock', category: 'PSU & Infrastructure', avgPrice: 210.86, currentPrice: 194.45, qty: 45 },
    { symbol: 'EQUITASBNK', name: 'Equitas Small Finance Bank', type: 'Stock', category: 'Banking & Financials', avgPrice: 94.01, currentPrice: 74.63, qty: 8 }
  ],
  aiAnalysis: {
    sectorAllocation: [
      { name: 'Precious Metals (Gold & Silver)', value: 25.5 },
      { name: 'Power & Renewable Energy', value: 25.1 },
      { name: 'PSU & Infrastructure', value: 24.2 },
      { name: 'Consumer & Retail', value: 9.1 },
      { name: 'Metals & Mining', value: 6.9 },
      { name: 'Speculative Small-Cap Equities', value: 6.8 },
      { name: 'Banking & Financials', value: 2.4 }
    ],
    countryAllocation: [
      { name: 'India', value: 100 }
    ],
    riskScore: 'High (7.2/10)',
    diversificationStatus: 'Over-Diversified (31 Stocks)',
    warnings: [
      { type: 'Double Silver Exposure', message: 'You are holding both SILVERBEES and TATSILV. These instruments track the exact same silver prices and provide zero diversification.' },
      { type: 'Small-Cap Drag', message: 'EaseMyTrip (-68.6%), Embassy (-59.8%), Vascon (-59.6%) and RattanIndia Power (-50.8%) are dragging total portfolio performance.' }
    ],
    suggestions: [
      { action: 'Sell / Tax Harvest', symbol: 'TATSILV', reason: 'Consolidate silver allocation into SILVERBEES to eliminate overlap.' },
      { action: 'Consolidate Micro Positions', symbol: 'SBI / Nifty BeES', reason: 'Consolidate 1-5 share micro positions into core market indices.' }
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
  date: 'July 29, 2026',
  title: 'AI Good Morning Report',
  marketSummary: 'Indian markets closed flat-to-negative on July 28. Nifty 50 ended at 23,985 (-0.04%), Sensex at 76,765 (-0.09%), and Bank Nifty underperformed at 56,755 (-0.58%). Global cues are mixed — US bond yields eased to 4.18%, supporting equity risk premiums globally. Gift Nifty is suggesting a flat open near 23,990. Watch for any geopolitical developments in West Asia overnight.',
  importantEvents: [
    { event: 'US Core PCE Inflation data due tonight (critical for Fed rate decisions).', impact: 'High' },
    { event: 'RBI Securitisation rule amendments proposed — Positive for banking credit quality.', impact: 'Medium' }
  ],
  portfolioImpact: 'Your portfolio is cautiously positioned. Infosys (INFY) at ₹1,512 provides strength from IT recovery. Watch Tata Steel closely — global steel demand data from China will be crucial. HDFC Bank is consolidating near ₹1,610 support.',
  todayRisks: 'Flat Bank Nifty could weigh on your HDFCBANK position. Avoid adding fresh leverage on mid-caps today as broad market consolidation continues below 24,000.',
  todayOpportunities: 'IT sector remains a safe accumulation zone. Defensive plays like ITC or Pharma index ETFs are attractive on any dip below key supports.',
  thingsToWatch: ['USDINR trajectory near 95.75 — RBI intervention watch', 'FII net flows in first 2 hours of trade', 'Nifty 24,000 as key resistance — break above opens path to 24,200']
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
      { time: '03:30 PM', title: 'Nifty closes at 23,985.35 (-0.04%)', desc: 'Markets ended flat to marginally lower. Selling pressure in Bank Nifty (-0.58%) and broad market caution capped gains. Nifty held above 23,950 support.' },
      { time: '11:00 AM', title: 'RBI proposes Securitisation Rules — ₹1 Crore minimum', desc: 'RBI draft amendment mandates demat-only securitisation and high entry thresholds. Banking sector responded positively to the transparency move.' }
    ]
  },
  {
    period: 'Yesterday',
    events: [
      { time: '05:30 PM', title: 'FIIs net buy ₹1,420 Cr; DIIs add ₹2,150 Cr', desc: 'Domestic institutions continue strong support. FII flows turned positive for the session, preventing any sharp index correction.' },
      { time: '02:00 PM', title: 'Tata Communications × TTBS announce AI Platform Stack', desc: 'Strategic partnership for unified SMB AI cloud services drives Telecom and IT infrastructure sentiment higher.' }
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
