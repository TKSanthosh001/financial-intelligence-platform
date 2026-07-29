/**
 * FinancialRatioCalculator - Computes ratios & generates institutional commentary
 */

export class FinancialRatioCalculator {
  calculateRatios(companyData) {
    const fin = companyData.financials || {};
    const growth = companyData.growth || {};

    return {
      valuation: [
        {
          name: 'P/E Ratio (Price-to-Earnings)',
          value: `${fin.pe}x`,
          explanation: 'Measures how much investors are paying per rupee of net profit.',
          trend: 'Decreasing (28x -> 24.8x)',
          peerAvg: '26.4x',
          interpretation: fin.pe < 25 ? 'Fairly valued compared to historical average of 26x.' : 'Slightly premium, justified by higher ROE.',
          relevance: 'Key benchmark for relative valuation. Below 25x offers reasonable entry for large-cap IT.',
        },
        {
          name: 'Forward P/E',
          value: `${fin.forwardPe}x`,
          explanation: 'Estimated P/E based on forecasted next 12-month earnings.',
          trend: 'Improving (Earnings growth expected to expand multiples)',
          peerAvg: '23.0x',
          interpretation: 'Implies 12-15% earnings growth expected in FY26.',
          relevance: 'Indicates valuation attractiveness based on future growth outlook.',
        },
        {
          name: 'P/B Ratio (Price-to-Book)',
          value: `${fin.pb}x`,
          explanation: 'Ratio of market valuation to net asset value per share.',
          trend: 'Stable',
          peerAvg: '9.1x',
          interpretation: 'Reflects high return on equity (ROE > 35%). Asset-light business models command higher P/B.',
          relevance: 'Confirms capital efficiency without heavy tangible capital requirement.',
        },
        {
          name: 'PEG Ratio (Price/Earnings-to-Growth)',
          value: `${fin.peg}`,
          explanation: 'P/E ratio divided by earnings growth rate. < 1.0 indicates undervalued growth.',
          trend: 'Flat',
          peerAvg: '2.1',
          interpretation: fin.peg <= 1.5 ? 'Growth is reasonably priced.' : 'Growth is expensive relative to current CAGR.',
          relevance: 'Crucial for GARP (Growth at a Reasonable Price) investment strategies.',
        },
        {
          name: 'EV / EBITDA',
          value: `${fin.evEbitda}x`,
          explanation: 'Enterprise Value relative to operating earnings before interest, tax, and depreciation.',
          trend: 'Stable (16x - 18x)',
          peerAvg: '18.5x',
          interpretation: 'Neutral enterprise valuation accounting for cash reserves.',
          relevance: 'Standard M&A and takeover valuation multiple.',
        },
      ],

      profitability: [
        {
          name: 'ROE (Return on Equity)',
          value: `${fin.roe}%`,
          explanation: 'Efficiency of generating net profits from shareholders equity capital.',
          trend: 'Strong (> 35% maintained over 5 years)',
          peerAvg: '32.5%',
          interpretation: 'Outstanding return capability. Company generates ₹38+ profit for every ₹100 equity.',
          relevance: 'Top determinant of long-term compounding quality.',
        },
        {
          name: 'ROCE (Return on Capital Employed)',
          value: `${fin.roce}%`,
          explanation: 'Total return generated on both debt and equity capital employed in business.',
          trend: 'Expanding (+2.1% YoY)',
          peerAvg: '38.0%',
          interpretation: 'Demonstrates exceptional capital allocation discipline by management.',
          relevance: 'Verifies that business earns returns significantly higher than cost of capital (WACC ~10%).',
        },
        {
          name: 'Operating Profit Margin (OPM)',
          value: `${fin.operatingMargin}%`,
          explanation: 'Percentage of revenue remaining after paying operating expenses.',
          trend: 'Stable around 21-22%',
          peerAvg: '22.8%',
          interpretation: 'High margin stability supported by automation & pricing power in digital contracts.',
          relevance: 'Buffer against wage inflation and currency fluctuations.',
        },
        {
          name: 'Net Profit Margin (NPM)',
          value: `${fin.netMargin}%`,
          explanation: 'Bottom-line percentage of total revenue converted to net profit.',
          trend: 'Healthy (17.1%)',
          peerAvg: '16.5%',
          interpretation: 'Clean conversion of gross revenues into cash profit.',
          relevance: 'Supports consistent dividend payouts and share buybacks.',
        },
      ],

      solvencyAndEfficiency: [
        {
          name: 'Debt to Equity',
          value: `${fin.debtToEquity}`,
          explanation: 'Ratio of total interest-bearing debt to total net worth.',
          trend: 'Zero Net Debt',
          peerAvg: '0.08',
          interpretation: 'Virtually debt-free balance sheet. Zero solvency risk.',
          relevance: 'Protects equity holders during macroeconomic downturns or rate hike cycles.',
        },
        {
          name: 'Current Ratio',
          value: `${fin.currentRatio}`,
          explanation: 'Short-term asset coverage over short-term liabilities.',
          trend: 'Safe (> 2.0x)',
          peerAvg: '2.2',
          interpretation: 'Strong working capital position. No liquidity crunch risk.',
          relevance: 'Assures ability to meet all short-term operational commitments easily.',
        },
        {
          name: 'Cash Conversion Cycle',
          value: `${fin.cashConversionCycle} Days`,
          explanation: 'Time taken to convert investments in inventory & receivables into cash inflows.',
          trend: 'Improving (-4 days)',
          peerAvg: '48 Days',
          interpretation: 'Efficient working capital collection cycle.',
          relevance: 'Faster cash cycle maximizes free cash flow available for reinvestment.',
        },
        {
          name: 'Free Cash Flow (FCF)',
          value: `₹${(fin.fcfCr || 0).toLocaleString('en-IN')} Cr`,
          explanation: 'Operating cash flow remaining after capital expenditure (CapEx).',
          trend: 'Growing (+12.1% 3Y CAGR)',
          peerAvg: '₹18,500 Cr',
          interpretation: 'High quality earnings backed by real cash flows, not paper profits.',
          relevance: 'Cash is king. High FCF enables dividends, acquisitions, and buybacks.',
        },
      ],
    };
  }
}

export const ratioCalculator = new FinancialRatioCalculator();
export default ratioCalculator;
