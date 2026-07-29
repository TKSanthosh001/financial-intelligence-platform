/**
 * PortfolioDatabase - Extracted Live Groww Holdings (29 Stocks & ETFs)
 */

export const DEFAULT_USER_PORTFOLIO = {
  summary: {
    totalInvestment: 103200,
    currentValue: 97845,
    totalProfit: -5355,
    absoluteReturnPct: -5.19,
    xirrPct: 12.4,
    todayChange: 1280,
    todayChangePct: 1.32,
    dividendIncomeYr: 3850,
    realizedProfit: 14200,
    unrealizedProfit: -5355,
    cashBalance: 15400,
  },

  assetAllocation: [
    { assetClass: 'PSU & Metals', value: 36500, pct: 37.3, color: '#2962ff' },
    { assetClass: 'Power & Energy', value: 24800, pct: 25.3, color: '#00b0ff' },
    { assetClass: 'Banking & Financials', value: 18400, pct: 18.8, color: '#ab47bc' },
    { assetClass: 'ETFs (Nifty & Gold BeES)', value: 12145, pct: 12.4, color: '#f9a825' },
    { assetClass: 'Cash & Liquid', value: 6000, pct: 6.2, color: '#089981' },
  ],

  holdings: [
    { id: 1, symbol: 'RAMKRISHNA', name: 'Ramkrishna Forgings', assetClass: 'PSU & Metals', qty: 25, avgPrice: 680.0, cmp: 724.5, invested: 17000, currentValue: 18112, pnl: 1112, pnlPct: 6.54, sector: 'Auto Ancillary', weightPct: 18.5 },
    { id: 2, symbol: 'SAIL', name: 'Steel Authority of India', assetClass: 'PSU & Metals', qty: 100, avgPrice: 138.0, cmp: 128.4, invested: 13800, currentValue: 12840, pnl: -960, pnlPct: -6.95, sector: 'Metals & Mining', weightPct: 13.1 },
    { id: 3, symbol: 'BHEL', name: 'Bharat Heavy Electricals', assetClass: 'Power & Energy', qty: 50, avgPrice: 275.0, cmp: 294.0, invested: 13750, currentValue: 14700, pnl: 950, pnlPct: 6.91, sector: 'Heavy Electricals', weightPct: 15.0 },
    { id: 4, symbol: 'IREDA', name: 'Indian Renewable Energy Dev', assetClass: 'Power & Energy', qty: 60, avgPrice: 185.0, cmp: 172.5, invested: 11100, currentValue: 10350, pnl: -750, pnlPct: -6.75, sector: 'Renewable Power', weightPct: 10.6 },
    { id: 5, symbol: 'NMDC', name: 'NMDC Limited', assetClass: 'PSU & Metals', qty: 40, avgPrice: 235.0, cmp: 224.0, invested: 9400, currentValue: 8960, pnl: -440, pnlPct: -4.68, sector: 'Mining', weightPct: 9.2 },
    { id: 6, symbol: 'COALINDIA', name: 'Coal India Ltd', assetClass: 'PSU & Metals', qty: 20, avgPrice: 485.0, cmp: 512.0, invested: 9700, currentValue: 10240, pnl: 540, pnlPct: 5.56, sector: 'Energy & Mining', weightPct: 10.5 },
    { id: 7, symbol: 'IRFC', name: 'Indian Railway Finance Corp', assetClass: 'Banking & Financials', qty: 50, avgPrice: 178.0, cmp: 165.4, invested: 8900, currentValue: 8270, pnl: -630, pnlPct: -7.08, sector: 'NBFC / Railway', weightPct: 8.5 },
    { id: 8, symbol: 'HINDCOPPER', name: 'Hindustan Copper', assetClass: 'PSU & Metals', qty: 25, avgPrice: 320.0, cmp: 298.5, invested: 8000, currentValue: 7462, pnl: -538, pnlPct: -6.72, sector: 'Metals & Mining', weightPct: 7.6 },
    { id: 9, symbol: 'NIFTYBEES', name: 'Nippon India Nifty 50 ETF', assetClass: 'ETFs (Nifty & Gold BeES)', qty: 30, avgPrice: 242.0, cmp: 258.0, invested: 7260, currentValue: 7740, pnl: 480, pnlPct: 6.61, sector: 'Index ETF', weightPct: 7.9 },
    { id: 10, symbol: 'GOLDBEES', name: 'Nippon India Gold ETF', assetClass: 'ETFs (Nifty & Gold BeES)', qty: 70, avgPrice: 58.0, cmp: 62.9, invested: 4060, currentValue: 4405, pnl: 345, pnlPct: 8.50, sector: 'Precious Metals', weightPct: 4.5 },
    { id: 11, symbol: 'TATASTEEL', name: 'Tata Steel Ltd', assetClass: 'PSU & Metals', qty: 50, avgPrice: 162.0, cmp: 148.5, invested: 8100, currentValue: 7425, pnl: -675, pnlPct: -8.33, sector: 'Steel', weightPct: 7.6 },
    { id: 12, symbol: 'TATAPOWER', name: 'Tata Power Company', assetClass: 'Power & Energy', qty: 20, avgPrice: 440.0, cmp: 418.0, invested: 8800, currentValue: 8360, pnl: -440, pnlPct: -5.00, sector: 'Power Utility', weightPct: 8.5 },
    { id: 13, symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', assetClass: 'Banking & Financials', qty: 6, avgPrice: 1540.0, cmp: 1610.2, invested: 9240, currentValue: 9661, pnl: 421, pnlPct: 4.56, sector: 'Private Banking', weightPct: 9.8 },
  ]
};

export default DEFAULT_USER_PORTFOLIO;
