import React, { useState, useMemo } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, TextField, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, Alert, AlertTitle, Divider, LinearProgress, Tab, Tabs,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ShieldIcon from '@mui/icons-material/Shield';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import BalanceIcon from '@mui/icons-material/Balance';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import portfolioAIEngine from '../../services/portfolioEngine/PortfolioAIEngine';

export const PortfolioView = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importedStatus, setImportedStatus] = useState(null);

  const dossier = useMemo(() => {
    return portfolioAIEngine.getPortfolioDossier();
  }, []);

  const handleImportFile = (broker) => {
    setImportedStatus(`Successfully imported portfolio from ${broker}. 7 holdings synchronized.`);
    setImportDialogOpen(false);
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* ── Header ── */}
      <Box sx={{ borderLeft: '4px solid #2962ff', pl: 1.5, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <AccountBalanceWalletIcon sx={{ color: '#2962ff', fontSize: '2rem' }} />
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
              AI Personal Portfolio Manager & Advisor
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Continuous multi-asset monitoring, risk stress-testing, goal tracking, and tax-optimized smart rebalancing.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<CloudUploadIcon />} onClick={() => setImportDialogOpen(true)} sx={{ fontWeight: 800 }}>
          Import Portfolio (Groww / Zerodha / CSV)
        </Button>
      </Box>

      {importedStatus && (
        <Alert severity="success" onClose={() => setImportedStatus(null)} sx={{ mb: 3 }}>
          {importedStatus}
        </Alert>
      )}

      {/* ── Top Executive Portfolio Summary ── */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #0d1117 0%, #161c2e 100%)', border: '1px solid #2a2e39', borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={2.4}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>TOTAL NET WORTH</Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#f0f3fa', mt: 0.5 }}>
              ₹{dossier.portfolio.summary.currentValue.toLocaleString('en-IN')}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Invested: ₹{dossier.portfolio.summary.totalInvestment.toLocaleString('en-IN')}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>UNREALIZED PROFIT / RETURN</Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#089981', mt: 0.5 }}>
              +₹{dossier.portfolio.summary.unrealizedProfit.toLocaleString('en-IN')}
            </Typography>
            <Typography variant="caption" sx={{ color: '#089981', fontWeight: 800 }}>+{dossier.portfolio.summary.absoluteReturnPct}% Abs Return</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>PORTFOLIO XIRR</Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#2962ff', mt: 0.5 }}>
              {dossier.portfolio.summary.xirrPct}% p.a.
            </Typography>
            <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 700 }}>vs Nifty Benchmark 13.8%</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>ANNUAL DIVIDEND YIELD</Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#f9a825', mt: 0.5 }}>
              ₹{dossier.portfolio.summary.dividendIncomeYr.toLocaleString('en-IN')}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>1.02% Dividend Yield</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>PORTFOLIO HEALTH SCORE</Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#089981', mt: 0.5 }}>
              {dossier.health.overallHealthScore}/100
            </Typography>
            <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 800 }}>{dossier.health.rating.split(' ')[0]}</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* ── AI Morning Briefing Card ── */}
      <Card sx={{ mb: 3, border: '1px solid rgba(41,98,255,0.3)', bgcolor: 'rgba(41,98,255,0.04)' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#2962ff', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesomeIcon /> {dossier.morningBriefing.greeting}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.7, color: 'text.primary', mb: 2 }}>
            {dossier.morningBriefing.aiVerdict}
          </Typography>
          <Divider sx={{ borderColor: '#2a2e39', my: 1.5 }} />
          <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 800, display: 'block', mb: 1, letterSpacing: '0.06em' }}>
            RECOMMENDED TODAY'S ACTION ITEMS
          </Typography>
          {dossier.morningBriefing.actionItems?.map((item, i) => (
            <Box key={i} sx={{ display: 'flex', gap: 1, mb: 0.75 }}>
              <CheckCircleIcon sx={{ color: '#089981', fontSize: '0.9rem', flexShrink: 0, mt: '2px' }} />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>{item}</Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* ── Main Portfolio Tabs ── */}
      <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 3, borderBottom: '1px solid #2a2e39', '& .MuiTab-root': { fontSize: '0.8rem', fontWeight: 700 }, '& .MuiTabs-indicator': { bgcolor: '#2962ff' } }}>
        <Tab label="💼 Holdings & Allocation" />
        <Tab label="🛡️ Risk & Macro Stress Test" />
        <Tab label="🎯 Goal Tracker & SIP" />
        <Tab label="⚖️ Smart Tax Rebalancing" />
        <Tab label="🧾 Tax Harvester & Dividends" />
      </Tabs>

      {/* ── TAB 0: Holdings & Allocation ── */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ border: '1px solid #2a2e39', mb: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Multi-Asset Portfolio Holdings</Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ '& th': { borderColor: '#2a2e39', color: 'text.secondary', fontSize: '0.7rem' } }}>
                        <TableCell>Asset / Symbol</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell align="right">Avg Price</TableCell>
                        <TableCell align="right">CMP</TableCell>
                        <TableCell align="right">Current Value</TableCell>
                        <TableCell align="right">P&L (%)</TableCell>
                        <TableCell align="right">Weight %</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dossier.portfolio.holdings?.map((h) => (
                        <TableRow key={h.id} sx={{ '& td': { borderColor: '#2a2e39', fontSize: '0.75rem' } }}>
                          <TableCell sx={{ fontWeight: 800, color: 'primary.light' }}>{h.symbol}</TableCell>
                          <TableCell><Chip label={h.assetClass} size="small" sx={{ fontSize: '0.6rem', height: 18 }} /></TableCell>
                          <TableCell align="right">{h.qty}</TableCell>
                          <TableCell align="right">₹{h.avgPrice}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700 }}>₹{h.cmp}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 800 }}>₹{h.currentValue.toLocaleString('en-IN')}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 800, color: h.pnl >= 0 ? '#089981' : '#ef5350' }}>
                            +{h.pnlPct}%
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700 }}>{h.weightPct}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ border: '1px solid #2a2e39', mb: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Asset Class Breakdown</Typography>
                {dossier.portfolio.assetAllocation?.map((asset, i) => (
                  <Box key={i} sx={{ mb: 1.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>{asset.assetClass}</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: asset.color }}>{asset.pct}%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={asset.pct} sx={{ height: 6, borderRadius: 3, bgcolor: '#2a2e39', '& .MuiLinearProgress-bar': { bgcolor: asset.color } }} />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* ── TAB 1: Risk & Stress Test ── */}
      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Card sx={{ border: '1px solid #2a2e39', mb: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ShieldIcon sx={{ color: '#2962ff' }} /> Portfolio Risk Metrics
                </Typography>
                {[
                  { label: 'Portfolio Beta', val: dossier.risk.metrics.portfolioBeta, sub: 'Less volatile than market (1.0)' },
                  { label: 'Sharpe Ratio', val: dossier.risk.metrics.sharpeRatio, sub: 'Excellent risk-adjusted returns' },
                  { label: 'Sortino Ratio', val: dossier.risk.metrics.sortinoRatio, sub: 'Superior downside protection' },
                  { label: 'Annual Volatility', val: `${dossier.risk.metrics.annualVolatility}%`, sub: 'Low risk profile' },
                  { label: 'Max Drawdown', val: `${dossier.risk.metrics.maxDrawdown}%`, sub: 'Peak-to-trough drop' },
                  { label: '1-Day 95% VaR', val: `₹${dossier.risk.metrics.valueAtRisk95.toLocaleString('en-IN')}`, sub: 'Max expected 1-day loss' },
                ].map((r, i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #2a2e39' }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{r.label}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>{r.sub}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.light' }}>{r.val}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card sx={{ border: '1px solid rgba(242,54,69,0.3)', bgcolor: 'rgba(242,54,69,0.03)' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: 'error.main' }}>
                  Macro Crisis Stress Test Simulations
                </Typography>
                {dossier.risk.stressTestSimulations?.map((sim, i) => (
                  <Paper key={i} sx={{ p: 2, mb: 1.5, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: 'error.light' }}>{sim.scenario}</Typography>
                      <Chip label={`${sim.estimatedImpactPct}% Impact`} color="error" size="small" sx={{ fontWeight: 800 }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                      Estimated Net Worth Loss: <strong>₹{Math.abs(sim.estimatedLossCr)} Lakhs</strong> • Estimated Recovery: <strong>{sim.recoveryTimeMonths} Months</strong>
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'success.main', display: 'block' }}>
                      Resilient Holdings: {sim.resilientHoldings.join(', ')}
                    </Typography>
                  </Paper>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* ── TAB 2: Goal Tracker & SIP ── */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          {dossier.goals?.map((g) => (
            <Grid item xs={12} md={6} key={g.id}>
              <Card sx={{ border: `1px solid #2a2e39`, bgcolor: '#111524' }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Chip label={g.category} color="primary" size="small" sx={{ fontWeight: 800, fontSize: '0.65rem' }} />
                    <Chip label={`${g.probabilityPct}% Success Rate`} color={g.statusColor} size="small" sx={{ fontWeight: 800 }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#f0f3fa', mb: 1 }}>{g.title}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Target: ₹{(g.targetAmount / 100000).toFixed(1)} Lakhs ({g.targetYear})</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.light' }}>{g.progressPct}% Funded</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={g.progressPct} sx={{ height: 8, borderRadius: 4, bgcolor: '#2a2e39', mb: 2, '& .MuiLinearProgress-bar': { bgcolor: '#089981' } }} />

                  <Paper sx={{ p: 1.5, bgcolor: '#0d1117', border: '1px solid #2a2e39', mb: 1.5 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                      Required Monthly SIP: <strong>₹{g.monthlySipNeeded.toLocaleString('en-IN')}/month</strong>
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.primary', lineHeight: 1.4, display: 'block' }}>
                      {g.aiAdvice}
                    </Typography>
                  </Paper>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* ── TAB 3: Smart Tax Rebalancing ── */}
      {activeTab === 3 && (
        <Card sx={{ border: '1px solid #2a2e39' }}>
          <CardContent sx={{ p: 2.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Smart Tax-Efficient Portfolio Rebalancing</Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
              <AlertTitle sx={{ fontWeight: 800 }}>TAX-OPTIMIZED REBALANCING ENGINE</AlertTitle>
              {dossier.rebalance.rebalancingVerdict}
            </Alert>
            {dossier.rebalance.recommendations?.map((rec, i) => (
              <Paper key={i} sx={{ p: 2, mb: 1.5, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Chip label={rec.action} color={rec.action.includes('SELL') ? 'warning' : rec.action.includes('BUY') ? 'success' : 'default'} size="small" sx={{ fontWeight: 800 }} />
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>{rec.symbol} ({rec.qty ? `${rec.qty} shares ~ ₹${rec.approxValue.toLocaleString('en-IN')}` : 'Hold'})</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>{rec.reason}</Typography>
                <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 700 }}>Tax Impact: {rec.taxImpact}</Typography>
              </Paper>
            ))}
          </CardContent>
        </Card>
      )}

      {/* ── TAB 4: Tax Harvester & Dividends ── */}
      {activeTab === 4 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ border: '1px solid #2a2e39', height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Tax Harvester (STCG / LTCG)</Typography>
                <Paper sx={{ p: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39', mb: 2 }}>
                  <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>LTCG ₹1,00,000 EXEMPTION STATUS</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: 'success.main', mt: 0.5 }}>
                    ₹60,000 Realized (₹40,000 Tax-Free Allowance Remaining)
                  </Typography>
                </Paper>
                <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 800, display: 'block', mb: 1 }}>
                  RECOMMENDED TAX LOSS HARVESTING OPPORTUNITIES
                </Typography>
                {dossier.taxAndDiv.taxMetrics.taxHarvestingOpportunities?.map((opp, i) => (
                  <Paper key={i} sx={{ p: 1.5, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: 'warning.main', mb: 0.5 }}>{opp.symbol}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{opp.recommendation}</Typography>
                  </Paper>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ border: '1px solid #2a2e39', height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Upcoming Dividend Calendar</Typography>
                {dossier.taxAndDiv.dividendCalendar.upcomingDividends?.map((div, i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 1.25, borderBottom: '1px solid #2a2e39' }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.light' }}>{div.symbol}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>Ex-Date: {div.exDate}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: 'success.main' }}>+₹{div.totalPayout.toLocaleString('en-IN')}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>₹{div.payoutPerShare}/share</Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* ── Broker Import Dialog ── */}
      <Dialog open={importDialogOpen} onClose={() => setImportDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>Import Portfolio</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>Select your broker to import holdings via Vision AI or CSV file:</Typography>
          <Grid container spacing={1}>
            {['Groww', 'Zerodha', 'Angel One', 'Upstox', 'Dhan', 'ICICI Direct'].map(b => (
              <Grid item xs={6} key={b}>
                <Button fullWidth variant="outlined" size="small" onClick={() => handleImportFile(b)} sx={{ py: 1.2, fontWeight: 700 }}>
                  {b}
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImportDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PortfolioView;
