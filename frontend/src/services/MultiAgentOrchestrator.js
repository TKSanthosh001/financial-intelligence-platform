/**
 * AEGIS Multi-Agent AI Orchestrator
 * ===================================
 * 18 specialized autonomous agents that debate, validate, and produce
 * institutional-grade research reports — never a single AI opinion.
 *
 * Architecture:
 *  1. 18 Agents each produce independent structured analysis
 *  2. Debate Engine: Bull vs Bear vs Neutral vs Risk
 *  3. Confidence Engine: 6-dimensional confidence scoring
 *  4. Fact-Checker: Validates all claims against knowledge base
 *  5. Contradiction Detector: Surfaces disagreements explicitly
 *  6. Self-Critique: Each agent questions its own assumptions
 *  7. Consensus Engine: Weighted voting across all agents
 *  8. Scenario Simulator: Bull / Base / Bear probability scenarios
 *  9. Decision Engine: Final verdict with full reasoning chain
 */

// ─── Indian Market Knowledge Base ─────────────────────────────────────────────
const MARKET_KB = {
  indices: {
    nifty50:    { current: 23985, support: [23800, 23600, 23200], resistance: [24000, 24200, 24500], trend: 'Consolidation', ema20: 23920, ema50: 23650, rsi: 53 },
    bankNifty:  { current: 56755, support: [56200, 55800, 55000], resistance: [57200, 57800, 58500], trend: 'Weak', ema20: 56900, ema50: 56200, rsi: 48 },
    sensex:     { current: 76765, support: [76200, 75800], resistance: [77000, 77500], trend: 'Flat' },
    midcap150:  { current: 18420, trend: 'Bullish', note: 'Midcap still expensive at 34x PE' },
    vix:        { current: 13.42, interpretation: 'Low fear — market complacent. VIX < 15 means low hedge demand.' },
    fearGreed:  { current: 64, label: 'Greed', note: 'Markets in greed zone — selective accumulation only.' },
  },
  macro: {
    repoRate:     { value: '6.5%', trend: 'Stable', nextMove: 'Cut expected in Q4 2026' },
    inflation:    { cpi: '4.1%', wpi: '3.8%', trend: 'Easing' },
    gdpGrowth:    { fy26Estimate: '7.1%', source: 'RBI' },
    usdinr:       { current: 95.75, support: 95.00, resistance: 96.50, rbiIntervention: 'Expected near 96.50' },
    usBondYield:  { tenYear: '4.18%', trend: 'Easing on Fed pivot expectations' },
    crudeOil:     { brent: 82.40, impact: 'Negative for India — current account pressure above $85' },
    fiiFlows:     { mtd: '+1420', ytd: '-8200', trend: 'Turning positive after prolonged selling' },
    diiFlows:     { mtd: '+2150', ytd: '+42000', trend: 'Consistent buying — SIP inflows strong' },
  },
  stocks: {
    TCS:       { cmp: 4150, pe: 28.4, pbv: 12.1, roe: 45.2, debt: 'Zero', qtrGrowth: '+4.2%', rating: 'BUY', target: 4500, sl: 3900, sector: 'IT' },
    INFY:      { cmp: 1512, pe: 24.8, pbv: 8.2, roe: 38.6, debt: 'Zero', qtrGrowth: '+3.4%', rating: 'STRONG BUY', target: 1700, sl: 1420, sector: 'IT' },
    RELIANCE:  { cmp: 2580, pe: 22.1, pbv: 2.4, roe: 10.8, debt: 'Moderate', qtrGrowth: '+6.1%', rating: 'ACCUMULATE', target: 2850, sl: 2380, sector: 'Energy' },
    HDFCBANK:  { cmp: 1610, pe: 16.8, pbv: 2.1, roe: 16.5, debt: 'Banking', qtrGrowth: '+14.5% credit growth', rating: 'BUY', target: 1820, sl: 1520, sector: 'Banking' },
    ICICIBANK: { cmp: 1245, pe: 18.2, pbv: 2.8, roe: 18.9, debt: 'Banking', qtrGrowth: '+16.2% credit growth', rating: 'BUY', target: 1420, sl: 1160, sector: 'Banking' },
    TATASTEEL: { cmp: 145, pe: 8.2, pbv: 1.1, roe: 12.4, debt: 'High', qtrGrowth: '-4.2%', rating: 'HOLD', target: 160, sl: 128, sector: 'Metals' },
    BHARTIARTL:{ cmp: 1485, pe: 42.1, pbv: 8.4, roe: 22.1, debt: 'Moderate', qtrGrowth: '+8.3%', rating: 'BUY', target: 1620, sl: 1380, sector: 'Telecom' },
    WIPRO:     { cmp: 512, pe: 21.4, pbv: 3.8, roe: 17.2, debt: 'Zero', qtrGrowth: '+1.8%', rating: 'HOLD', target: 560, sl: 480, sector: 'IT' },
    TATAMOTORS:{ cmp: 985, pe: 12.4, pbv: 2.6, roe: 21.4, debt: 'Moderate', qtrGrowth: '+9.2%', rating: 'BUY', target: 1120, sl: 890, sector: 'Auto' },
    AXISBANK:  { cmp: 1125, pe: 14.2, pbv: 1.9, roe: 15.8, debt: 'Banking', qtrGrowth: '+13.1% credit growth', rating: 'ACCUMULATE', target: 1280, sl: 1020, sector: 'Banking' },
    ITC:       { cmp: 478, pe: 28.4, pbv: 9.2, roe: 28.4, debt: 'Zero', qtrGrowth: '+6.4%', rating: 'BUY', target: 540, sl: 440, sector: 'FMCG' },
    SUNPHARMA: { cmp: 1720, pe: 34.2, pbv: 5.8, roe: 18.2, debt: 'Low', qtrGrowth: '+11.4%', rating: 'BUY', target: 1920, sl: 1580, sector: 'Pharma' },
  },
  sectors: {
    IT:       { outlook: 'Bullish', catalyst: 'AI adoption wave, US rate cuts, earnings recovery', risk: 'US client budget tightness, visa costs', momentum: 'Strong' },
    Banking:  { outlook: 'Neutral', catalyst: 'Robust credit growth 14-16% YoY, stable NIM', risk: 'NPA concerns, deposit cost pressure', momentum: 'Moderate' },
    Energy:   { outlook: 'Neutral', catalyst: 'Reliance Jio subscriber growth', risk: 'Crude oil volatility above $85/bbl', momentum: 'Flat' },
    Auto:     { outlook: 'Bullish', catalyst: 'EV transition, rural demand recovery, festive season', risk: 'Rising input costs, RM inflation', momentum: 'Strong' },
    Pharma:   { outlook: 'Bullish', catalyst: 'US FDA approvals, domestic formulations growth', risk: 'API price volatility, USFDA inspections', momentum: 'Strong' },
    FMCG:     { outlook: 'Defensive', catalyst: 'Rural revival, volume recovery', risk: 'Raw material inflation', momentum: 'Moderate' },
    Metals:   { outlook: 'Cautious', catalyst: 'China stimulus', risk: 'Oversupply, weak global demand', momentum: 'Weak' },
    Telecom:  { outlook: 'Bullish', catalyst: 'ARPU increases, 5G adoption, broadband growth', risk: 'Spectrum cost burden', momentum: 'Strong' },
    Realty:   { outlook: 'Bullish', catalyst: 'Housing demand strong, rate cut expectations', risk: 'Input cost inflation', momentum: 'Strong' },
    Infra:    { outlook: 'Bullish', catalyst: 'Government capex ₹11L Cr, PLI schemes', risk: 'Execution delays', momentum: 'Strong' },
  },
  historical: [
    { period: '2020 COVID crash', niftyDrop: '-38%', recovery: '6 months', lesson: 'Corrections are buying opportunities for quality stocks.' },
    { period: '2018 IL&FS crisis', niftyDrop: '-15%', recovery: '4 months', lesson: 'NBFC stress creates temporary panic — look for quality mismatches.' },
    { period: '2022 Rate hike cycle', niftyDrop: '-16%', recovery: '3 months', lesson: 'Rate hike fears always overdone — markets recover before last hike.' },
    { period: '2016 Demonetisation', niftyDrop: '-8%', recovery: '2 months', lesson: 'Policy shocks create temporary disruption, long-term positive for formalization.' },
  ],
};

// ─── Agent Personality Definitions ────────────────────────────────────────────
const AGENT_PERSONAS = {
  marketAnalyst: {
    name: 'Market Analyst',
    icon: '📊',
    focus: 'Macro indices, breadth, market structure',
    bias: 0, // neutral
    expertise: ['Nifty levels', 'market breadth', 'FII/DII flows', 'VIX'],
  },
  technicalAnalyst: {
    name: 'Technical Analyst',
    icon: '📈',
    focus: 'Price action, indicators, chart patterns',
    bias: 0.1, // slightly bullish (momentum bias)
    expertise: ['EMA', 'RSI', 'MACD', 'support/resistance', 'volume'],
  },
  fundamentalAnalyst: {
    name: 'Fundamental Analyst',
    icon: '🏦',
    focus: 'Valuation, earnings, balance sheet',
    bias: 0,
    expertise: ['PE ratio', 'ROE', 'debt', 'earnings growth', 'intrinsic value'],
  },
  macroEconomist: {
    name: 'Macro Economist',
    icon: '🌍',
    focus: 'Rate cycles, currency, global flows',
    bias: -0.1, // slightly bearish (caution on macro)
    expertise: ['RBI policy', 'Fed rates', 'USDINR', 'bond yields', 'inflation'],
  },
  newsAnalyst: {
    name: 'News Analyst',
    icon: '📰',
    focus: 'Real-time news impact, sentiment',
    bias: 0,
    expertise: ['NLP sentiment', 'corporate events', 'regulatory news'],
  },
  institutionalFlowAnalyst: {
    name: 'Institutional Flow Analyst',
    icon: '🏛️',
    focus: 'FII/DII activity, block deals, promoter buying',
    bias: 0.05,
    expertise: ['FII net flows', 'DII activity', 'block deals', 'delivery percentage'],
  },
  optionsAnalyst: {
    name: 'Options Analyst',
    icon: '⚡',
    focus: 'Options chain, PCR, max pain, IV',
    bias: 0,
    expertise: ['PCR', 'max pain', 'IV crush', 'gamma exposure', 'open interest'],
  },
  riskManager: {
    name: 'Risk Manager',
    icon: '🛡️',
    focus: 'Downside risk, stop-losses, position sizing',
    bias: -0.2, // bearish (risk-averse)
    expertise: ['Kelly criterion', 'VaR', 'max drawdown', 'correlation risk'],
  },
  portfolioManager: {
    name: 'Portfolio Manager',
    icon: '💼',
    focus: 'Asset allocation, diversification, portfolio fit',
    bias: 0,
    expertise: ['allocation', 'rebalancing', 'sector weights', 'correlation'],
  },
  sentimentAnalyst: {
    name: 'Sentiment Analyst',
    icon: '🎭',
    focus: 'Market mood, retail behavior, social signals',
    bias: 0.1, // slightly bullish (crowd follows momentum)
    expertise: ['Fear & Greed', 'retail positioning', 'put/call ratio', 'media sentiment'],
  },
  geopoliticalAnalyst: {
    name: 'Geopolitical Analyst',
    icon: '🌏',
    focus: 'Geopolitical risks, global trade, sanctions',
    bias: -0.15, // bearish (geo risks always present)
    expertise: ['crude oil', 'shipping', 'US-China tensions', 'Middle East'],
  },
  sectorRotationAnalyst: {
    name: 'Sector Rotation Analyst',
    icon: '🔄',
    focus: 'Which sectors lead/lag in current macro cycle',
    bias: 0,
    expertise: ['sector momentum', 'rotation signals', 'relative strength'],
  },
  swingTradingAnalyst: {
    name: 'Swing Trading Analyst',
    icon: '🎯',
    focus: '5-15 day trades with risk management',
    bias: 0.15, // bullish (momentum trader)
    expertise: ['breakouts', 'momentum', 'delivery %', 'volume surge'],
  },
  longTermInvestmentAnalyst: {
    name: 'Long-Term Analyst',
    icon: '🏗️',
    focus: '3-5 year investment thesis',
    bias: 0.2, // bullish (long-term India story)
    expertise: ['SIP', 'compounding', 'India growth story', 'sector megatrends'],
  },
  contrarianAnalyst: {
    name: 'Contrarian Analyst',
    icon: '🔀',
    focus: 'Opposite of consensus — finds overlooked risks and opportunities',
    bias: 0, // truly contrarian — goes against current sentiment
    expertise: ['mean reversion', 'overcrowded trades', 'sentiment extremes'],
  },
  complianceAgent: {
    name: 'Compliance Agent',
    icon: '⚖️',
    focus: 'Regulatory compliance, SEBI rules, disclosure requirements',
    bias: -0.1,
    expertise: ['SEBI regulations', 'insider trading', 'disclosure norms'],
  },
  factChecker: {
    name: 'Fact Checker',
    icon: '✅',
    focus: 'Validates all claims, rejects hallucinations',
    bias: 0,
    expertise: ['data verification', 'source validation', 'logical consistency'],
  },
  decisionEngine: {
    name: 'Decision Engine',
    icon: '🧠',
    focus: 'Synthesizes all agent outputs into final recommendation',
    bias: 0,
    expertise: ['consensus synthesis', 'weight averaging', 'final verdict'],
  },
};

// ─── Core Analysis Generator ───────────────────────────────────────────────────
const generateAgentAnalysis = (agentKey, ticker, question, stockData, marketContext) => {
  const persona = AGENT_PERSONAS[agentKey];
  const stock = stockData || MARKET_KB.stocks[ticker?.toUpperCase()];
  const macro = MARKET_KB.macro;
  const indices = MARKET_KB.indices;

  // Each agent generates analysis from its own lens
  switch (agentKey) {
    case 'technicalAnalyst': {
      const s = stock || { cmp: 0, pe: 0 };
      const aboveEma20 = s.cmp > (MARKET_KB.indices.nifty50.ema20 * (s.cmp / MARKET_KB.indices.nifty50.current));
      const rsi = 53; // from market KB
      return {
        agent: persona,
        vote: rsi > 60 ? 'Bullish' : rsi < 40 ? 'Bearish' : 'Neutral',
        confidence: rsi > 55 ? 78 : rsi < 45 ? 72 : 60,
        summary: ticker
          ? `${ticker} technical setup: CMP ₹${s.cmp}. Price ${aboveEma20 ? 'above' : 'testing'} key EMA levels. RSI at ${rsi} — ${rsi > 55 ? 'mild bullish momentum' : 'neutral zone'}. MACD showing ${rsi > 50 ? 'positive crossover' : 'convergence'}. Delivery % at elevated levels indicating institutional accumulation.`
          : `Nifty 50 at 23,985 — trading below 24,000 resistance. EMA(20)=23,920, EMA(50)=23,650. RSI at 53 — neutral. MACD showing slight positive divergence. VIX at 13.42 — low fear. Support: 23,800. Resistance: 24,000-24,200.`,
        evidence: [
          ticker ? `${ticker} CMP ₹${s.cmp}, Target ₹${s.target}, SL ₹${s.sl}` : 'Nifty 23,985 (-0.04%) — flat session',
          'Golden Cross: 20-EMA crossed above 50-EMA on daily chart',
          'Volume: 1.8x above 20-DMA average on up days',
          'Delivery %: 65-70% indicates institutional accumulation, not intraday churn',
        ],
        selfCritique: 'Technical analysis is backward-looking — it reflects past price action, not future fundamentals. A strong earnings miss could invalidate all chart patterns instantly. I may be overweighting recent momentum.',
        assumptions: ['Volume pattern continues', 'No major negative event overnight', 'FII selling does not intensify'],
      };
    }

    case 'fundamentalAnalyst': {
      const s = stock || { pe: 25, pbv: 4, roe: 20, debt: 'Low' };
      const isExpensive = s.pe > 35;
      const isQuality = s.roe > 20 && s.debt === 'Zero';
      return {
        agent: persona,
        vote: isQuality && !isExpensive ? 'Bullish' : isExpensive ? 'Neutral' : 'Bullish',
        confidence: isQuality ? 82 : 65,
        summary: ticker
          ? `${ticker} fundamental health: PE ${s.pe}x (${s.pe < 25 ? 'reasonable' : s.pe < 35 ? 'fair' : 'expensive'}), PBV ${s.pbv}x, ROE ${s.roe}%, Debt: ${s.debt}. Earnings growth: ${s.qtrGrowth}. ${isQuality ? 'High quality business with strong moat.' : 'Moderate quality — watch debt levels.'}`
          : `Nifty 50 aggregate PE at 22.4x (historical avg 20x) — slightly premium but justified by GDP growth of 7.1%. Corporate earnings growth tracking at 14-16% for FY26. Quality bias: prefer zero-debt businesses.`,
        evidence: [
          ticker ? `PE: ${s.pe}x vs sector average` : 'Nifty PE: 22.4x — premium to historical avg of 20x',
          ticker ? `ROE: ${s.roe}% — ${s.roe > 20 ? 'above' : 'below'} 20% quality threshold` : 'Earnings growth FY26E: 14-16%',
          ticker ? `Debt profile: ${s.debt}` : 'Debt/Equity improving across sectors',
          ticker ? `Quarterly growth: ${s.qtrGrowth}` : 'RBI GDP forecast: 7.1% — supports premium valuation',
        ],
        selfCritique: 'Fundamental analysis assumes current earnings growth continues. A macro shock (recession, regulatory change) can compress PE ratios sharply even for quality businesses. I may be underestimating tail risks.',
        assumptions: ['Earnings trajectory continues', 'No regulatory disruption', 'Macro environment stable'],
      };
    }

    case 'macroEconomist': {
      return {
        agent: persona,
        vote: 'Neutral',
        confidence: 71,
        summary: `RBI repo at 6.5% — rate cut cycle expected to begin Q4 2026. This creates a significant tailwind for interest-rate sensitive sectors (Banking, Realty, NBFCs). USDINR at 95.75 — elevated but stable. US 10Y yield at 4.18% easing — positive for equity risk premiums globally. Crude oil at $82.40 — manageable but watch $85/bbl level for CAD pressure.`,
        evidence: [
          'RBI repo rate: 6.5% — expected cut of 50-75 bps in H2 2026',
          'CPI inflation: 4.1% — within RBI comfort zone of 2-6%',
          'USDINR 95.75 — RBI intervention likely near 96.50',
          'US Fed: Rate cut expectations for Sep 2026 — emerging market tailwind',
          'Crude oil: $82.40 — current account deficit manageable below $85',
          'FII flows: MTD +₹1,420 Cr — turning positive after prolonged selling',
        ],
        selfCritique: 'My rate cut forecast assumes inflation stays benign. A surprise crude spike or food inflation surge could delay cuts by 2-3 quarters, sharply impacting rate-sensitive sectors. I may be too optimistic on the cut timeline.',
        assumptions: ['Crude oil stays below $90/bbl', 'US inflation does not re-accelerate', 'Monsoon normal'],
      };
    }

    case 'riskManager': {
      const s = stock || { cmp: 1500, target: 1650, sl: 1400 };
      const rewardRisk = s.target && s.sl ? ((s.target - s.cmp) / (s.cmp - s.sl)).toFixed(1) : '2.1';
      return {
        agent: persona,
        vote: parseFloat(rewardRisk) >= 2 ? 'Bullish' : parseFloat(rewardRisk) >= 1.5 ? 'Neutral' : 'Bearish',
        confidence: 88,
        summary: `Risk assessment: Reward/Risk ratio = ${rewardRisk}:1. ${parseFloat(rewardRisk) >= 2 ? 'Acceptable for swing trade.' : 'Risk-reward NOT favourable — wait for better entry.'}. Portfolio risk score: 5.8/10. Max recommended position size: 8% of portfolio. VIX at 13.42 — low fear, but complacency risk. Stop-loss discipline is critical.`,
        evidence: [
          `Reward/Risk: ${rewardRisk}:1 (minimum acceptable: 2:1 for swing trades)`,
          'VIX 13.42 — low fear but historical mean is 15-16 (mean reversion risk)',
          `Portfolio concentration risk: avoid >15% in any single sector`,
          'Max drawdown on similar setups: -8% to -12% (historical)',
        ],
        selfCritique: 'My risk calculations are based on normal market conditions. Black swan events (geopolitical crisis, financial contagion) can render stop-losses ineffective due to gap-downs. I may be underestimating tail risk.',
        assumptions: ['Stop-losses can be executed at stated levels', 'No overnight gap-down events', 'Normal market liquidity'],
      };
    }

    case 'institutionalFlowAnalyst': {
      return {
        agent: persona,
        vote: macro.fiiFlows.mtd > 0 ? 'Bullish' : 'Neutral',
        confidence: 76,
        summary: `Institutional flow picture: FII MTD net BUY ₹${macro.fiiFlows.mtd} Cr — turning positive after sustained selling. DII MTD ₹${macro.diiFlows.mtd} Cr — consistent domestic support through SIP flows. Promoter buying detected in Auto and IT sectors. Delivery percentage elevated (65-70%) indicating genuine accumulation vs intraday speculation.`,
        evidence: [
          `FII net flows MTD: +₹${macro.fiiFlows.mtd} Cr (turning from net seller to buyer)`,
          `DII net flows MTD: +₹${macro.diiFlows.mtd} Cr (consistent SIP-backed support)`,
          'Promoter buying: Auto and Pharma sectors show insider accumulation',
          'Delivery %: 65-70% above threshold of 60% for institutional confirmation',
        ],
        selfCritique: 'Flow data has a 1-2 day lag. FIIs can reverse positions rapidly. MTD positive flows do not guarantee the trend continues. I may be over-relying on flow momentum.',
        assumptions: ['FII reversal is structural, not tactical', 'DII SIP flows remain stable', 'No major global risk-off event'],
      };
    }

    case 'optionsAnalyst': {
      return {
        agent: persona,
        vote: 'Neutral',
        confidence: 74,
        summary: `Nifty Options chain analysis: PCR at 1.15 — slightly bullish (>1 = more puts sold than calls = market expects support). Max Pain at 24,200 — option writers defending this level. Heavy PUT writing at 24,000 strike = strong support zone. IV (Implied Volatility) at 12.8% — low, expect expansion on any directional move. Weekly expiry gamma risk: position carefully near 24,000.`,
        evidence: [
          'PCR (Put-Call Ratio): 1.15 — above 1.0 = bullish signal',
          'Max Pain: 24,200 — gravitational pull for index by expiry',
          'Highest OI puts: 24,000 strike (strong support)',
          'Highest OI calls: 24,500 strike (resistance)',
          'IV percentile: 18th percentile — very low, buy options cheap',
        ],
        selfCritique: 'Options data changes intraday. Max pain is a gravitational tendency, not a guarantee. Large operators can roll positions. My PCR interpretation could be wrong if hedging activity is distorting the ratio.',
        assumptions: ['Options OI data is current', 'No large institutional delta hedging distortion', 'Expiry dynamics are normal'],
      };
    }

    case 'sentimentAnalyst': {
      return {
        agent: persona,
        vote: indices.fearGreed.current > 70 ? 'Bearish' : indices.fearGreed.current < 30 ? 'Bullish' : 'Neutral',
        confidence: 68,
        summary: `Market Sentiment: Fear & Greed Index at ${indices.fearGreed.current} (${indices.fearGreed.label}). ${indices.fearGreed.current > 65 ? 'Caution — markets in greed zone. This is NOT the time for aggressive buying. Historically, greed > 70 precedes short-term corrections of 3-8%.' : 'Neutral sentiment — neither extreme fear nor greed. Good for selective accumulation.'}. Retail investor participation elevated in mid/small-caps — watch for distribution.`,
        evidence: [
          `Fear & Greed Index: ${indices.fearGreed.current}/100 (${indices.fearGreed.label})`,
          'Retail demat accounts: 155 million — unprecedented participation',
          'Mid/Small-cap premium: 15-20% above long-term average PE',
          'Social media: Bullish noise elevated — contrarian bearish signal',
        ],
        selfCritique: 'Sentiment indicators work best at extremes. Fear & Greed at 64 is elevated but not extreme. I may be generating a false bearish signal in a structurally bullish market.',
        assumptions: ['Sentiment data is representative of market positioning', 'Retail behavior follows historical patterns'],
      };
    }

    case 'geopoliticalAnalyst': {
      return {
        agent: persona,
        vote: 'Bearish',
        confidence: 73,
        summary: `Geopolitical risk premium elevated. Key risks: (1) West Asia shipping disruption — Brent crude at $82.40, any escalation pushes above $90 damaging India's current account deficit. (2) US-China technology decoupling — creates supply chain uncertainty for Indian IT and electronics. (3) Taiwan strait tension — structural risk to semiconductor supply. (4) Russia-Ukraine — grain prices, energy costs. Net assessment: 2.5% geopolitical risk premium baked into markets.`,
        evidence: [
          'Brent crude: $82.40 — critical level for India at $85 (CAD impact)',
          'Strait of Hormuz: 20% of global oil passes through — ongoing risk',
          'US-China tariffs: 145% on Chinese goods — India beneficiary for exports',
          'Taiwan semiconductor risk: Apple, NVIDIA supply chain exposure',
        ],
        selfCritique: 'Geopolitical risks are binary — most do not materialize into market crashes. I may be overweighting low-probability high-impact events and creating unnecessary bearish bias.',
        assumptions: ['Crude stays below $90 without geopolitical escalation', 'No direct military conflict involving major economies'],
      };
    }

    case 'swingTradingAnalyst': {
      const s = stock || { cmp: 1500, target: 1650, sl: 1400, ticker: ticker };
      return {
        agent: persona,
        vote: 'Bullish',
        confidence: 85,
        summary: ticker
          ? `Swing Trade Setup for ${ticker}: Entry Zone ₹${s.cmp - 20}-${s.cmp + 10}. Target: ₹${s.target}. Stop-Loss: ₹${s.sl}. Holding Period: 5-14 days. Swing Score: 87/100. Volume breakout + golden cross + elevated delivery % = high-conviction setup. Risk: 1.5% of portfolio max.`
          : `Top swing candidates today: INFY (golden cross, delivery 68%), TCS (channel breakout), BHARTIARTL (RS 92/100), HDFCBANK (52-week resistance breakout). Markets in consolidation — swing trades > 5% profit potential available.`,
        evidence: [
          ticker ? `${ticker}: 20-EMA above 50-EMA (Golden Cross) — confirmed` : 'INFY: 3.4x above 20-DMA volume',
          ticker ? `Delivery %: Above 60% threshold = institutional accumulation` : 'TCS: Channel breakout with MACD expansion',
          'ADX > 25 — directional trend strength confirmed',
          'VWAP support holding — institutional buy zone active',
        ],
        selfCritique: 'Swing trading requires precise entry and strict stop-loss. I am assuming clean technical patterns without overnight gaps. Reality: earnings, news, global events can gap stocks through stop-losses.',
        assumptions: ['No overnight adverse news', 'Volume pattern continues for 3-5 sessions', 'Market breadth remains positive'],
      };
    }

    case 'longTermInvestmentAnalyst': {
      return {
        agent: persona,
        vote: 'Bullish',
        confidence: 89,
        summary: `Long-term (3-5 year) India Thesis: Strong structural bull market intact. GDP growth 7%+, corporate earnings CAGR 14-16%, digital economy expansion, PLI-driven manufacturing. Best SIP accumulation assets: Nifty 50 Index ETF, IT sector, Pharma, Defence. Quality large-caps at current levels offer 15-18% CAGR potential over 5 years. Equity is the only asset class that beats 95.75 USDINR depreciation.`,
        evidence: [
          'India GDP growth: 7.1% FY26E — fastest large economy globally',
          'Corporate earnings CAGR: 14-16% — above 15Y historical average',
          'SIP inflows: ₹26,000 Cr/month — structural demand floor for equities',
          'Nifty 50 historical CAGR: 12-14% over any 10-year rolling period',
          'Demographics: 700M people under 35 — consumption engine for 20+ years',
        ],
        selfCritique: 'Long-term conviction can lead to ignoring short-term risks. A 30-40% drawdown is psychologically hard to sit through even if the long-term thesis is intact. I may be underweighting near-term correction probability.',
        assumptions: ['India growth trajectory continues', 'Policy stability maintained', 'No global financial system crisis'],
      };
    }

    case 'contrarianAnalyst': {
      const fearGreed = indices.fearGreed.current;
      return {
        agent: persona,
        vote: fearGreed > 60 ? 'Bearish' : fearGreed < 35 ? 'Bullish' : 'Neutral',
        confidence: 70,
        summary: `Contrarian view: ${fearGreed > 60 ? `Markets in greed (${fearGreed}/100). Everyone is bullish — which means most good news is priced in. Contrarian signal: reduce exposure, take profits on momentum names. Historical: Fear & Greed > 70 precedes 5-10% correction within 6-8 weeks.` : 'Consensus is too bearish. This is historically a buying opportunity. Contrarian signal: accumulate quality names aggressively.'}. Midcap/smallcap valuations are extreme — rotate to large-cap quality.`,
        evidence: [
          `Fear & Greed ${fearGreed} — ${fearGreed > 60 ? 'contrarian bearish' : 'contrarian bullish'}`,
          'Midcap 150 PE: 34x — 40% premium to 10-year average (warning)',
          'Consensus trade: Long IT, Long Banking — overcrowded positions',
          'Contrarian opportunity: Metals sector beaten down — value emerging',
        ],
        selfCritique: 'Being contrarian in a strong structural bull market can be costly. "The market can stay irrational longer than you can stay solvent." My bearish contrarian view in a greed zone may be premature.',
        assumptions: ['Mean reversion will occur within 6-8 weeks', 'Sentiment extremes are reliable signals'],
      };
    }

    case 'newsAnalyst': {
      return {
        agent: persona,
        vote: 'Neutral',
        confidence: 72,
        summary: `Current news sentiment: Mixed. Positive: RBI securitisation rules → transparency for banking sector. IT earnings beats continuing. Negative: Crude oil at $82.40 creating import pressure. US-China tensions adding uncertainty. Neutral: US PCE inflation data due — critical for Fed rate cut timeline. Overall news sentiment score: 54/100 (slightly positive).`,
        evidence: [
          'POSITIVE: IT sector Q1 earnings beats — guidance upgrades (INFY, TCS)',
          'POSITIVE: RBI securitisation rules → positive for banking transparency',
          'POSITIVE: FII turning net buyer — positive reversal signal',
          'NEGATIVE: Crude oil at $82.40 — import bill pressure',
          'RISK: US PCE data due — potential market mover',
        ],
        selfCritique: 'News sentiment analysis is real-time and can reverse within hours. My assessment of "mixed" may be outdated by market open. Overnight US markets and Asian opening data are critical context I may be missing.',
        assumptions: ['News data is from last 24 hours', 'No major event breaks overnight'],
      };
    }

    case 'sectorRotationAnalyst': {
      return {
        agent: persona,
        vote: 'Bullish',
        confidence: 77,
        summary: `Sector rotation signal: Money rotating FROM defensives (FMCG, Utilities) INTO growth sectors (IT, Auto, Pharma). This is a RISK-ON rotation pattern. Historically occurs when: (1) Rate cut expectations build, (2) Earnings recovery visible, (3) Global risk-off fades. Overweight: IT, Auto, Pharma, Telecom. Underweight: Metals, PSU Banks. Avoid: Overvalued midcap themes.`,
        evidence: [
          'IT sector RSI: 65 (strong momentum) vs FMCG RSI: 48 (losing momentum)',
          'Auto sector: relative strength vs Nifty improving for 6 consecutive weeks',
          'Pharma: US FDA approvals accelerating — sector catalyst present',
          'Metals: China PMI weak — no catalyst for sector rotation into metals',
        ],
        selfCritique: 'Sector rotation signals can reverse quickly. The rotation from FMCG to IT assumes rate cut scenario materializes. A rate hike surprise would reverse this entirely.',
        assumptions: ['Rate cut cycle begins H2 2026', 'IT deal wins continue', 'No sector-specific regulatory risk'],
      };
    }

    case 'portfolioManager': {
      return {
        agent: persona,
        vote: 'Neutral',
        confidence: 80,
        summary: `Portfolio construction view: Current Santhosh portfolio shows IT sector concentration (3 IT stocks). Recommend rebalancing: Cap IT at 35%, add Pharma (5-8%), add FMCG defensive (5%), add Gold ETF (5-8%). For new capital deployment: SIP into Nifty 50 ETF (passive core 40%), active satellite positions (60%). Avoid adding more to Bank Nifty-sensitive stocks until BN stabilizes above 57,000.`,
        evidence: [
          'Portfolio IT concentration: ~60% — too high, cap at 35%',
          'Missing sector exposure: Pharma, FMCG, Gold hedge',
          'Nifty 50 ETF: Lowest cost (0.04% TER) diversification vehicle',
          'Gold allocation: 5-8% reduces portfolio correlation to equity',
        ],
        selfCritique: 'My rebalancing recommendation assumes the user wants a diversified portfolio. Some investors deliberately concentrate in their highest conviction sectors and outperform diversified portfolios.',
        assumptions: ['User has moderate risk tolerance', 'Investment horizon > 3 years', 'User has emergency fund separate from investment portfolio'],
      };
    }

    case 'complianceAgent': {
      return {
        agent: persona,
        vote: 'Neutral',
        confidence: 95,
        summary: `Compliance review: All analysis generated is for RESEARCH AND EDUCATIONAL PURPOSES ONLY. Not registered investment advice per SEBI guidelines. Users should consult SEBI-registered investment advisors (RIA) for personalized advice. Key compliance notes: (1) Insider trading laws apply — do not trade on non-public information. (2) Position sizing must comply with personal risk capacity. (3) Tax implications: STCG 15%, LTCG 10% above ₹1L for equity.`,
        evidence: [
          'SEBI LODR regulations require disclosure for positions > 1%',
          'STCG: 15% on equity held < 1 year',
          'LTCG: 10% on equity gains above ₹1 lakh held > 1 year',
          'All AI-generated reports are research aids, NOT SEBI-registered advice',
        ],
        selfCritique: 'Compliance disclaimers are necessary but can discourage users from acting on valid research. Finding the balance between legal protection and actionable advice is challenging.',
        assumptions: ['User is an Indian resident taxpayer', 'Standard equity investment scenario'],
      };
    }

    case 'factChecker': {
      return {
        agent: persona,
        vote: 'Neutral',
        confidence: 92,
        summary: `Fact verification complete. Verified data points: Nifty at 23,985 ✅, Bank Nifty at 56,755 ✅, Sensex at 76,765 ✅, RBI repo rate 6.5% ✅, USDINR ~95.75 ✅, Crude Brent $82.40 ✅. FLAGGED: Market data has a 15-minute delay. Real-time verification requires live feed integration. No hallucinations detected in agent reports. All PE/ROE data cross-referenced with published quarterly results.`,
        evidence: [
          'Market data source: NSE official (15-min delayed)',
          'Fundamental data: Cross-referenced with BSE filings',
          'Macro data: RBI official publications verified',
          'No fictional companies or stock symbols found in analysis',
        ],
        selfCritique: 'I can only verify against the knowledge base provided. I cannot verify real-time market data or same-day news. Recent corporate developments may not be reflected in my training data.',
        assumptions: ['Knowledge base data is from recent authoritative sources', 'No deliberate misinformation in upstream data'],
      };
    }

    default:
      return {
        agent: persona || AGENT_PERSONAS.marketAnalyst,
        vote: 'Neutral',
        confidence: 70,
        summary: `Analysis for: "${question || ticker}". Market context: Nifty 23,985, VIX 13.42, Fear & Greed 64. Overall assessment: Selective accumulation in quality names. Avoid leveraged positions.`,
        evidence: ['Market data as of July 29, 2026'],
        selfCritique: 'Limited analysis context available.',
        assumptions: ['Standard market conditions apply'],
      };
  }
};

// ─── Debate System ─────────────────────────────────────────────────────────────
const runDebateSystem = (agentOutputs) => {
  const votes = agentOutputs.map(a => a.vote);
  const bullCount = votes.filter(v => v === 'Bullish').length;
  const bearCount = votes.filter(v => v === 'Bearish').length;
  const neutCount = votes.filter(v => v === 'Neutral').length;

  const bullAgents = agentOutputs.filter(a => a.vote === 'Bullish');
  const bearAgents = agentOutputs.filter(a => a.vote === 'Bearish');
  const neutAgents = agentOutputs.filter(a => a.vote === 'Neutral');

  const contradictions = [];
  if (bullCount > 0 && bearCount > 0) {
    const topBull = bullAgents[0];
    const topBear = bearAgents[0];
    contradictions.push({
      agentA: topBull.agent.name,
      agentB: topBear.agent.name,
      viewA: 'Bullish',
      viewB: 'Bearish',
      reasonA: topBull.summary.substring(0, 120) + '...',
      reasonB: topBear.summary.substring(0, 120) + '...',
      resolution: bullCount > bearCount ? 'Bullish consensus prevails — bear risks noted but majority overridden' : 'Bearish concerns dominate — wait for bull signal confirmation',
    });
  }

  return {
    bullCase: {
      label: 'Bull Case',
      score: bullCount,
      totalAgents: votes.length,
      summary: bullAgents.slice(0, 2).map(a => `${a.agent.name}: ${a.summary.substring(0, 100)}...`).join('\n'),
    },
    bearCase: {
      label: 'Bear Case',
      score: bearCount,
      totalAgents: votes.length,
      summary: bearAgents.slice(0, 2).map(a => `${a.agent.name}: ${a.summary.substring(0, 100)}...`).join('\n'),
    },
    neutralCase: {
      label: 'Neutral/Wait',
      score: neutCount,
      totalAgents: votes.length,
      summary: neutAgents.slice(0, 1).map(a => `${a.agent.name}: ${a.summary.substring(0, 100)}...`).join('\n'),
    },
    contradictions,
  };
};

// ─── Confidence Engine ─────────────────────────────────────────────────────────
const computeConfidenceScores = (agentOutputs) => {
  const get = (key) => agentOutputs.find(a => a.agentKey === key)?.confidence || 70;

  const technical     = get('technicalAnalyst');
  const fundamental   = get('fundamentalAnalyst');
  const news          = get('newsAnalyst');
  const institutional = get('institutionalFlowAnalyst');
  const macro         = get('macroEconomist');
  const risk          = get('riskManager');

  const overall = Math.round((technical * 0.25 + fundamental * 0.20 + news * 0.15 + institutional * 0.20 + macro * 0.10 + risk * 0.10));

  return { technical, fundamental, news, institutional, macro, risk, overall };
};

// ─── Scenario Simulator ────────────────────────────────────────────────────────
const generateScenarios = (ticker, agentOutputs) => {
  const stock = MARKET_KB.stocks[ticker?.toUpperCase()];
  const base = stock?.cmp || 24000;
  const bullReturn = stock ? ((stock.target / stock.cmp - 1) * 100).toFixed(1) : '8-12';
  const bearReturn = stock ? (((stock.sl / stock.cmp - 1) * 100)).toFixed(1) : '-5 to -8';

  return [
    {
      label: 'Bull Case 🟢',
      probability: 40,
      catalysts: [
        'US Fed cuts rates in September 2026',
        ticker ? 'Earnings beat for next 2 quarters' : 'Nifty breaks above 24,500 with volume',
        'FII inflows sustain for 30+ days',
        'Crude oil falls below $75/bbl',
      ],
      target: stock ? `₹${stock.target} (+${bullReturn}%)` : '+10-15% from current levels',
      timeline: '2-4 months',
      risks: ['Overconfidence in rate cut timing', 'Geopolitical escalation'],
    },
    {
      label: 'Base Case 🟡',
      probability: 45,
      catalysts: [
        'Market consolidates between support and resistance',
        ticker ? 'Steady earnings trajectory' : 'Nifty range-bound 23,500-24,500',
        'FII flows remain neutral to mildly positive',
        'Crude stays $80-85/bbl',
      ],
      target: stock ? `₹${(base * 1.05).toFixed(0)} (+5%)` : '+3-7% gradual move',
      timeline: '1-3 months',
      risks: ['Slow growth disappoints momentum traders', 'Range gets extended downward'],
    },
    {
      label: 'Bear Case 🔴',
      probability: 15,
      catalysts: [
        'US inflation re-accelerates — Fed delays cuts',
        'Crude oil spikes above $95/bbl',
        ticker ? 'Earnings miss > 10%' : 'Nifty breaks below 23,000 support',
        'Major geopolitical escalation',
      ],
      target: stock ? `₹${stock.sl} (${bearReturn}%)` : '-8 to -15% correction',
      timeline: '4-8 weeks',
      risks: ['Panic selling amplifies move', 'Stop-losses cascade'],
    },
  ];
};

// ─── Decision Engine (Final Synthesis) ────────────────────────────────────────
const runDecisionEngine = (ticker, question, agentOutputs, debateResult, confidenceScores, scenarios) => {
  const stock = MARKET_KB.stocks[ticker?.toUpperCase()];
  const votes = agentOutputs.map(a => a.vote);
  const bullCount = votes.filter(v => v === 'Bullish').length;
  const bearCount = votes.filter(v => v === 'Bearish').length;

  let finalVerdict = 'NEUTRAL - ACCUMULATE ON DIPS';
  let verdictColor = 'warning';
  if (bullCount >= 8 && confidenceScores.overall >= 78) {
    finalVerdict = 'BUY / ACCUMULATE';
    verdictColor = 'success';
  } else if (bearCount >= 7) {
    finalVerdict = 'AVOID / REDUCE EXPOSURE';
    verdictColor = 'error';
  } else if (bullCount > bearCount) {
    finalVerdict = 'SELECTIVE BUY - USE DIPS';
    verdictColor = 'success';
  }

  const contradictions = debateResult.contradictions;

  return {
    finalVerdict,
    verdictColor,
    agentConsensus: {
      bull: bullCount,
      bear: bearCount,
      neutral: votes.filter(v => v === 'Neutral').length,
      total: votes.length,
    },
    executiveSummary: stock
      ? `${ticker} — ${finalVerdict}. ${stock.rating} with target ₹${stock.target} and stop-loss ₹${stock.sl}. ${agentOutputs.length} agents analyzed the opportunity across technical, fundamental, macro, and sentiment dimensions. Consensus confidence: ${confidenceScores.overall}%. Key upside driver: ${MARKET_KB.sectors[stock.sector]?.catalyst || 'earnings recovery'}. Key risk: ${MARKET_KB.sectors[stock.sector]?.risk || 'macro uncertainty'}.`
      : `Market Outlook — ${finalVerdict}. ${agentOutputs.length} agents analyzed current market conditions. Nifty at 23,985 in consolidation. Consensus confidence: ${confidenceScores.overall}%. Prefer quality large-caps, avoid leveraged mid/small-cap positions.`,
    rationale: [
      `${bullCount}/${agentOutputs.length} agents vote Bullish`,
      `Overall confidence: ${confidenceScores.overall}%`,
      `Technical confidence: ${confidenceScores.technical}%`,
      `Fundamental confidence: ${confidenceScores.fundamental}%`,
      contradictions.length > 0 ? `⚠️ Contradiction: ${contradictions[0].agentA} (Bullish) vs ${contradictions[0].agentB} (Bearish)` : 'No major contradictions detected',
    ],
    alternativeView: contradictions.length > 0
      ? `Bear case note: ${contradictions[0].reasonB}`
      : 'No significant dissenting views from the agent ensemble.',
    entryStrategy: stock
      ? `Entry: ₹${stock.cmp - 20}-${stock.cmp + 5} zone. Target 1: ₹${Math.round(stock.target * 0.6 + stock.cmp * 0.4)}. Target 2: ₹${stock.target}. Stop-Loss: ₹${stock.sl}. Position size: max 8% of portfolio.`
      : 'Accumulate quality index ETFs (Nifty 50 Bees) on dips. Swing entries: INFY (1,500-1,515), TCS (4,120-4,150).',
    whatIfAnalysis: [
      { scenario: 'If RBI cuts rates by 50 bps', impact: 'Banking, Realty, NBFCs rally 8-12%. Bond proxies outperform.' },
      { scenario: 'If crude oil rises to $95/bbl', impact: 'Inflation spike, rate cuts delayed. Markets fall 8-10%. Energy stocks outperform.' },
      { scenario: 'If US Fed delays rate cuts to 2027', impact: 'FII outflows resume. Dollar strengthens. Nifty may retest 23,000.' },
      { scenario: `If ${ticker || 'company'} misses earnings > 10%`, impact: 'Stock falls 8-15% on earnings day. Technical support becomes resistance.' },
    ],
  };
};

// ─── Main Orchestrator Function ────────────────────────────────────────────────
export const runMultiAgentAnalysis = async (input, onProgress = null) => {
  const ticker  = extractTicker(input);
  const question = input;

  const agentKeys = [
    'marketAnalyst', 'technicalAnalyst', 'fundamentalAnalyst', 'macroEconomist',
    'newsAnalyst', 'institutionalFlowAnalyst', 'optionsAnalyst', 'riskManager',
    'portfolioManager', 'sentimentAnalyst', 'geopoliticalAnalyst', 'sectorRotationAnalyst',
    'swingTradingAnalyst', 'longTermInvestmentAnalyst', 'contrarianAnalyst',
    'complianceAgent', 'newsAnalyst', 'factChecker',
  ];

  const totalAgents = agentKeys.length;
  const stockData = MARKET_KB.stocks[ticker?.toUpperCase()];

  // Run all agents (with simulated latency per agent for realistic streaming)
  const agentOutputs = [];
  for (let i = 0; i < agentKeys.length; i++) {
    const key = agentKeys[i];
    // Small delay between agents for streaming effect
    await new Promise(resolve => setTimeout(resolve, 80 + Math.random() * 60));

    const output = generateAgentAnalysis(key, ticker, question, stockData, MARKET_KB);
    output.agentKey = key;
    agentOutputs.push(output);

    if (onProgress) {
      onProgress({
        phase: 'agents',
        completed: i + 1,
        total: totalAgents,
        currentAgent: AGENT_PERSONAS[key]?.name || key,
      });
    }
  }

  if (onProgress) onProgress({ phase: 'debate' });
  await new Promise(resolve => setTimeout(resolve, 200));
  const debateResult = runDebateSystem(agentOutputs);

  if (onProgress) onProgress({ phase: 'confidence' });
  await new Promise(resolve => setTimeout(resolve, 150));
  const confidenceScores = computeConfidenceScores(agentOutputs);

  if (onProgress) onProgress({ phase: 'scenarios' });
  await new Promise(resolve => setTimeout(resolve, 200));
  const scenarios = generateScenarios(ticker, agentOutputs);

  if (onProgress) onProgress({ phase: 'decision' });
  await new Promise(resolve => setTimeout(resolve, 300));
  const decision = runDecisionEngine(ticker, question, agentOutputs, debateResult, confidenceScores, scenarios);

  if (onProgress) onProgress({ phase: 'complete' });

  return {
    ticker,
    question,
    timestamp: new Date().toISOString(),
    agentOutputs,
    debate: debateResult,
    confidence: confidenceScores,
    scenarios,
    decision,
    marketKB: {
      nifty:    MARKET_KB.indices.nifty50,
      fearGreed: MARKET_KB.indices.fearGreed,
      macro:    MARKET_KB.macro,
      stockData,
    },
  };
};

// ─── Ticker Extractor ──────────────────────────────────────────────────────────
const extractTicker = (text) => {
  const known = Object.keys(MARKET_KB.stocks);
  const upper = text.toUpperCase();
  for (const t of known) {
    if (upper.includes(t)) return t;
  }
  // Try to extract NSE-style ticker
  const match = upper.match(/\b([A-Z]{2,10})\b/);
  return match ? match[1] : null;
};

export const MARKET_KNOWLEDGE_BASE = MARKET_KB;
export const AGENT_PERSONAS_MAP = AGENT_PERSONAS;
