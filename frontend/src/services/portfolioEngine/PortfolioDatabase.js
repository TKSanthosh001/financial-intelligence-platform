/**
 * PortfolioDatabase - Multi-Asset User Portfolio Database & XIRR Calculator
 */

export const DEFAULT_USER_PORTFOLIO = {
  summary: {
    totalInvestment: 2450000,
    currentValue: 3185400,
    totalProfit: 735400,
    absoluteReturnPct: 30.01,
    xirrPct: 18.6,
    todayChange: 14250,
    todayChangePct: 0.45,
    dividendIncomeYr: 32400,
    realizedProfit: 85000,
    unrealizedProfit: 650400,
    cashBalance: 120000,
  },

  assetAllocation: [
    { assetClass: 'Indian Equities', value: 1850000, pct: 58.1, color: '#2962ff' },
    { assetClass: 'US Equities', value: 380000, pct: 11.9, color: '#00b0ff' },
    { assetClass: 'Mutual Funds & ETFs', value: 450000, pct: 14.1, color: '#ab47bc' },
    { assetClass: 'Gold & SGB', value: 240000, pct: 7.5, color: '#f9a825' },
    { assetClass: 'Fixed Income / FDs / PPF', value: 145000, pct: 4.6, color: '#089981' },
    { assetClass: 'Cash & Liquid', value: 120000, pct: 3.8, color: '#90a4ae' },
  ],

  holdings: [
    { id: 1, symbol: 'INFY', name: 'Infosys Ltd', assetClass: 'Indian Equities', qty: 250, avgPrice: 1320.0, cmp: 1512.4, invested: 330000, currentValue: 378100, pnl: 48100, pnlPct: 14.58, sector: 'IT Services', weightPct: 11.8 },
    { id: 2, symbol: 'TCS', name: 'Tata Consultancy Services', assetClass: 'Indian Equities', qty: 100, avgPrice: 3600.0, cmp: 4150.0, invested: 360000, currentValue: 415000, pnl: 55000, pnlPct: 15.28, sector: 'IT Services', weightPct: 13.0 },
    { id: 3, symbol: 'RELIANCE', name: 'Reliance Industries', assetClass: 'Indian Equities', qty: 150, avgPrice: 2350.0, cmp: 2580.6, invested: 352500, currentValue: 387090, pnl: 34590, pnlPct: 9.81, sector: 'Energy & Retail', weightPct: 12.1 },
    { id: 4, symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', assetClass: 'Indian Equities', qty: 200, avgPrice: 1520.0, cmp: 1610.2, invested: 304000, currentValue: 322040, pnl: 18040, pnlPct: 5.93, sector: 'Banking', weightPct: 10.1 },
    { id: 5, symbol: 'NVDA', name: 'NVIDIA Corp', assetClass: 'US Equities', qty: 3, avgPrice: 850.0, cmp: 1240.0, invested: 212500, currentValue: 310000, pnl: 97500, pnlPct: 45.88, sector: 'US Semiconductor', weightPct: 9.7 },
    { id: 6, symbol: 'NIFTYBEES', name: 'Nippon India Nifty 50 ETF', assetClass: 'Mutual Funds & ETFs', qty: 1200, avgPrice: 215.0, cmp: 258.0, invested: 258000, currentValue: 309600, pnl: 51600, pnlPct: 20.00, sector: 'Index ETF', weightPct: 9.7 },
    { id: 7, symbol: 'SGBAUG28', name: 'Sovereign Gold Bond 2028', assetClass: 'Gold & SGB', qty: 35, avgPrice: 5100.0, cmp: 6850.0, invested: 178500, currentValue: 239750, pnl: 61250, pnlPct: 34.31, sector: 'Precious Metals', weightPct: 7.5 },
  ]
};

export default DEFAULT_USER_PORTFOLIO;
