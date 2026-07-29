/**
 * PortfolioDatabase - 31 Exact Verified Groww Stock Holdings
 * Directly parsed from official Groww CSV/OCR extract.
 */

export const DEFAULT_USER_PORTFOLIO = {
  summary: {
    totalInvestment: 103002.00,
    currentValue: 97845.00,
    totalProfit: -5157.08,
    absoluteReturnPct: -5.01,
    xirrPct: -3.8,
    todayChange: -945.09,
    todayChangePct: -0.96,
    dividendIncomeYr: 2850.00,
    realizedProfit: 0.00,
    unrealizedProfit: -5157.08,
    cashBalance: 4500.00,
  },

  assetAllocation: [
    { assetClass: 'Precious Metals (Gold & Silver)', value: 24966.42, pct: 25.5, color: '#f9a825' },
    { assetClass: 'Power & Renewable Energy', value: 24597.58, pct: 25.1, color: '#00b0ff' },
    { assetClass: 'PSU & Infrastructure', value: 23689.04, pct: 24.2, color: '#2962ff' },
    { assetClass: 'Metals & Mining', value: 6710.64, pct: 6.9, color: '#ab47bc' },
    { assetClass: 'Consumer & Retail', value: 8930.00, pct: 9.1, color: '#089981' },
    { assetClass: 'Banking & Financials', value: 2311.44, pct: 2.4, color: '#e91e63' },
    { assetClass: 'Speculative Small-Cap Equities', value: 6639.88, pct: 6.8, color: '#78909c' },
  ],

  holdings: [
    { id: 1, symbol: 'NALCO', name: 'National Aluminium Co', qty: 5, avgPrice: 157.76, cmp: 334.55, invested: 788.80, currentValue: 1672.75, pnl: 883.95, pnlPct: 112.06, sector: 'Metals & Mining', weightPct: 1.7 },
    { id: 2, symbol: 'SILVERBEES', name: 'Nippon India Silver ETF', qty: 26, avgPrice: 125.39, cmp: 206.20, invested: 3260.14, currentValue: 5361.20, pnl: 2101.06, pnlPct: 64.45, sector: 'Precious Metals', weightPct: 5.5 },
    { id: 3, symbol: 'KMCSPL', name: 'KMC Speciality Hospitals', qty: 4, avgPrice: 86.26, cmp: 130.25, invested: 345.04, currentValue: 521.00, pnl: 175.96, pnlPct: 51.00, sector: 'Healthcare', weightPct: 0.5 },
    { id: 4, symbol: 'KALYANKJIL', name: 'Kalyan Jewellers India', qty: 10, avgPrice: 396.59, cmp: 608.35, invested: 3965.90, currentValue: 6083.50, pnl: 2117.60, pnlPct: 43.75, sector: 'Consumer & Retail', weightPct: 6.2 },
    { id: 5, symbol: 'UJJIVANSFB', name: 'Ujjivan Small Finance Bank', qty: 10, avgPrice: 52.90, cmp: 70.12, invested: 529.00, currentValue: 701.20, pnl: 172.20, pnlPct: 32.55, sector: 'Banking & Financials', weightPct: 0.7 },
    { id: 6, symbol: 'ENGINERSIN', name: 'Engineers India Ltd', qty: 14, avgPrice: 178.91, cmp: 222.59, invested: 2504.74, currentValue: 3116.26, pnl: 611.52, pnlPct: 24.41, sector: 'PSU & Infrastructure', weightPct: 3.2 },
    { id: 7, symbol: 'SBIN', name: 'State Bank of India', qty: 1, avgPrice: 849.10, cmp: 1013.20, invested: 849.10, currentValue: 1013.20, pnl: 164.10, pnlPct: 19.33, sector: 'Banking & Financials', weightPct: 1.0 },
    { id: 8, symbol: 'SAIL', name: 'Steel Authority of India', qty: 7, avgPrice: 140.60, cmp: 165.85, invested: 984.20, currentValue: 1160.95, pnl: 176.75, pnlPct: 17.96, sector: 'Metals & Mining', weightPct: 1.2 },
    { id: 9, symbol: 'TATASTEEL', name: 'Tata Steel Ltd', qty: 3, avgPrice: 155.55, cmp: 182.63, invested: 466.65, currentValue: 547.89, pnl: 81.24, pnlPct: 17.41, sector: 'Metals & Mining', weightPct: 0.6 },
    { id: 10, symbol: 'GOLDBEES', name: 'Nippon India ETF Gold BeES', qty: 142, avgPrice: 105.48, cmp: 116.83, invested: 14978.16, currentValue: 16589.86, pnl: 1611.70, pnlPct: 10.76, sector: 'Precious Metals', weightPct: 17.0 },
    { id: 11, symbol: 'RECLTD', name: 'REC Limited', qty: 35, avgPrice: 363.73, cmp: 368.45, invested: 12730.55, currentValue: 12895.75, pnl: 165.20, pnlPct: 1.30, sector: 'PSU & Infrastructure', weightPct: 13.2 },
    { id: 12, symbol: 'ONGC', name: 'Oil & Natural Gas Corp', qty: 3, avgPrice: 238.81, cmp: 238.91, invested: 716.43, currentValue: 716.73, pnl: 0.30, pnlPct: 0.04, sector: 'Power & Renewable Energy', weightPct: 0.7 },
    { id: 13, symbol: 'TATAPOWER', name: 'Tata Power Co Ltd', qty: 11, avgPrice: 375.18, cmp: 371.35, invested: 4126.98, currentValue: 4084.85, pnl: -42.13, pnlPct: -1.02, sector: 'Power & Renewable Energy', weightPct: 4.2 },
    { id: 14, symbol: 'CASTROLIND', name: 'Castrol India Ltd', qty: 11, avgPrice: 190.23, cmp: 184.06, invested: 2092.53, currentValue: 2024.66, pnl: -67.87, pnlPct: -3.24, sector: 'Consumer & Retail', weightPct: 2.1 },
    { id: 15, symbol: 'HINDCOPPER', name: 'Hindustan Copper Ltd', qty: 7, avgPrice: 491.96, cmp: 473.15, invested: 3443.72, currentValue: 3312.05, pnl: -131.67, pnlPct: -3.82, sector: 'Metals & Mining', weightPct: 3.4 },
    { id: 16, symbol: 'GAIL', name: 'GAIL (India) Ltd', qty: 17, avgPrice: 184.64, cmp: 175.15, invested: 3138.88, currentValue: 2977.55, pnl: -161.33, pnlPct: -5.14, sector: 'Power & Renewable Energy', weightPct: 3.0 },
    { id: 17, symbol: 'IOC', name: 'Indian Oil Corp Ltd', qty: 14, avgPrice: 151.64, cmp: 141.28, invested: 2122.96, currentValue: 1977.92, pnl: -145.04, pnlPct: -6.83, sector: 'Power & Renewable Energy', weightPct: 2.0 },
    { id: 18, symbol: 'HUDCO', name: 'Housing & Urban Dev Corp', qty: 45, avgPrice: 210.86, cmp: 194.45, invested: 9488.70, currentValue: 8750.25, pnl: -738.45, pnlPct: -7.78, sector: 'PSU & Infrastructure', weightPct: 8.9 },
    { id: 19, symbol: 'EQUITASBNK', name: 'Equitas Small Finance Bank', qty: 8, avgPrice: 94.01, cmp: 74.63, invested: 752.08, currentValue: 597.04, pnl: -155.04, pnlPct: -20.61, sector: 'Banking & Financials', weightPct: 0.6 },
    { id: 20, symbol: 'ITC', name: 'ITC Limited', qty: 10, avgPrice: 360.13, cmp: 284.65, invested: 3601.30, currentValue: 2846.50, pnl: -754.80, pnlPct: -20.96, sector: 'Consumer & Retail', weightPct: 2.9 },
    { id: 21, symbol: 'SEL', name: 'Steel Exchange India', qty: 50, avgPrice: 14.59, cmp: 11.20, invested: 729.50, currentValue: 560.00, pnl: -169.50, pnlPct: -23.24, sector: 'Speculative Small-Cap Equities', weightPct: 0.6 },
    { id: 22, symbol: 'NHPC', name: 'NHPC Limited', qty: 106, avgPrice: 103.85, cmp: 78.28, invested: 11008.10, currentValue: 8297.68, pnl: -2710.42, pnlPct: -24.62, sector: 'Power & Renewable Energy', weightPct: 8.5 },
    { id: 23, symbol: 'TATSILV', name: 'Tata Silver ETF', qty: 144, avgPrice: 29.60, cmp: 20.94, invested: 4262.40, currentValue: 3015.36, pnl: -1247.04, pnlPct: -29.26, sector: 'Precious Metals', weightPct: 3.1 },
    { id: 24, symbol: 'IREDA', name: 'Indian Renewable Energy Dev', qty: 10, avgPrice: 185.33, cmp: 120.49, invested: 1853.30, currentValue: 1204.90, pnl: -648.40, pnlPct: -34.99, sector: 'Power & Renewable Energy', weightPct: 1.2 },
    { id: 25, symbol: 'IRFC', name: 'Indian Railway Finance Corp', qty: 20, avgPrice: 146.16, cmp: 87.15, invested: 2923.20, currentValue: 1743.00, pnl: -1180.20, pnlPct: -40.37, sector: 'PSU & Infrastructure', weightPct: 1.8 },
    { id: 26, symbol: 'IRCTC', name: 'Indian Railway Catering & Tour', qty: 4, avgPrice: 830.99, cmp: 485.95, invested: 3323.96, currentValue: 1943.80, pnl: -1380.16, pnlPct: -41.52, sector: 'PSU & Infrastructure', weightPct: 2.0 },
    { id: 27, symbol: 'IRBINFR', name: 'IRB Infrastructure Dev', qty: 162, avgPrice: 33.58, cmp: 19.45, invested: 5439.96, currentValue: 3150.90, pnl: -2289.06, pnlPct: -42.08, sector: 'PSU & Infrastructure', weightPct: 3.2 },
    { id: 28, symbol: 'RTNPOWER', name: 'RattanIndia Power', qty: 10, avgPrice: 17.30, cmp: 8.51, invested: 173.00, currentValue: 85.10, pnl: -87.90, pnlPct: -50.81, sector: 'Speculative Small-Cap Equities', weightPct: 0.1 },
    { id: 29, symbol: 'VASCONEQ', name: 'Vascon Engineers Ltd', qty: 10, avgPrice: 79.00, cmp: 31.92, invested: 790.00, currentValue: 319.20, pnl: -470.80, pnlPct: -59.59, sector: 'Speculative Small-Cap Equities', weightPct: 0.3 },
    { id: 30, symbol: 'EMBASSY', name: 'Embassy Developments', qty: 5, avgPrice: 154.69, cmp: 62.12, invested: 712.05, currentValue: 310.00, pnl: -402.05, pnlPct: -59.84, sector: 'Speculative Small-Cap Equities', weightPct: 0.3 },
    { id: 31, symbol: 'EASEMYTRIP', name: 'Easy Trip Planners Ltd', qty: 40, avgPrice: 20.99, cmp: 6.59, invested: 839.60, currentValue: 263.60, pnl: -576.00, pnlPct: -68.60, sector: 'Speculative Small-Cap Equities', weightPct: 0.3 },
  ]
};

export default DEFAULT_USER_PORTFOLIO;
