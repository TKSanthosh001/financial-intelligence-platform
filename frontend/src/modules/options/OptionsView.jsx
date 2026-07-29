import React, { useState, useEffect, useMemo } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Chip, Button, Paper,
  Divider, LinearProgress, Alert, AlertTitle, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Tooltip,
  TextField, InputAdornment, Tabs, Tab, Accordion, AccordionSummary,
  AccordionDetails, IconButton
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import BoltIcon from '@mui/icons-material/Bolt';
import ShieldIcon from '@mui/icons-material/Shield';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { OptionsAIEngine } from '../../services/OptionsAIEngine';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const confColor = (n) => n >= 75 ? '#089981' : n >= 60 ? '#f9a825' : '#ef5350';
const signalBg = (c) => c === 'success' ? 'rgba(8,153,129,0.08)' : c === 'warning' ? 'rgba(249,168,37,0.06)' : c === 'error' ? 'rgba(242,54,69,0.06)' : 'rgba(41,98,255,0.06)';
const signalBorder = (c) => c === 'success' ? '#089981' : c === 'warning' ? '#f9a825' : c === 'error' ? '#ef5350' : '#2962ff';

export const OptionsView = () => {
  const [capital, setCapital] = useState(200000);
  const [tradeCalls, setTradeCalls] = useState([]);
  const [scalpCalls, setScalpCalls] = useState([]);
  const [riskRules, setRiskRules] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [expandedCall, setExpandedCall] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const marketData = useMemo(() => OptionsAIEngine.getMarketData(), []);

  const refreshCalls = () => {
    setTradeCalls(OptionsAIEngine.generateTradeCalls(capital));
    setScalpCalls(OptionsAIEngine.generateScalpingCalls());
    setRiskRules(OptionsAIEngine.getRiskRules(capital));
    setLastRefresh(new Date());
  };

  useEffect(() => { refreshCalls(); }, [capital]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const timer = setInterval(refreshCalls, 60000);
    return () => clearInterval(timer);
  }, [capital]);

  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* ── Header ── */}
      <Box sx={{ borderLeft: '4px solid #2962ff', pl: 1.5, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <BoltIcon sx={{ color: '#f9a825', fontSize: '2rem' }} />
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
              Options Trading AI
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            AI-generated options trade calls with exact strike, quantity, entry, target, stop-loss & timing.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            label="Trading Capital (₹)"
            type="number"
            value={capital}
            onChange={e => setCapital(Math.max(50000, parseInt(e.target.value) || 50000))}
            size="small"
            sx={{ width: 180 }}
            InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
          />
          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={refreshCalls} sx={{ fontWeight: 700, borderColor: '#2a2e39', color: '#f0f3fa' }}>
            Refresh
          </Button>
        </Box>
      </Box>

      {/* ── Market Overview Cards ── */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { label: 'NIFTY 50', value: marketData.nifty.spot, change: (marketData.nifty.spot - marketData.nifty.prevClose).toFixed(0), pct: (((marketData.nifty.spot - marketData.nifty.prevClose) / marketData.nifty.prevClose) * 100).toFixed(2), trend: marketData.nifty.supertrend, color: '#2962ff' },
          { label: 'BANK NIFTY', value: marketData.bankNifty.spot, change: (marketData.bankNifty.spot - marketData.bankNifty.prevClose).toFixed(0), pct: (((marketData.bankNifty.spot - marketData.bankNifty.prevClose) / marketData.bankNifty.prevClose) * 100).toFixed(2), trend: marketData.bankNifty.supertrend, color: '#00b0ff' },
          { label: 'SENSEX', value: marketData.sensex.spot, change: (marketData.sensex.spot - marketData.sensex.prevClose).toFixed(0), pct: (((marketData.sensex.spot - marketData.sensex.prevClose) / marketData.sensex.prevClose) * 100).toFixed(2), trend: marketData.sensex.supertrend, color: '#ab47bc' },
          { label: 'INDIA VIX', value: marketData.vix, change: '', pct: '', trend: marketData.vix < 15 ? 'Low Fear' : 'Elevated', color: '#f9a825' },
        ].map((item, i) => (
          <Grid item xs={6} md={3} key={i}>
            <Card sx={{ border: `1px solid ${item.color}30`, background: `linear-gradient(135deg, ${item.color}08 0%, transparent 100%)` }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.05em' }}>{item.label}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>
                  {typeof item.value === 'number' && item.value > 100 ? item.value.toLocaleString('en-IN') : item.value}
                </Typography>
                {item.change && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.5 }}>
                    {parseFloat(item.change) >= 0
                      ? <TrendingUpIcon sx={{ fontSize: '0.9rem', color: 'success.main' }} />
                      : <TrendingDownIcon sx={{ fontSize: '0.9rem', color: 'error.main' }} />}
                    <Typography variant="caption" sx={{ color: parseFloat(item.change) >= 0 ? 'success.main' : 'error.main', fontWeight: 700 }}>
                      {item.change} ({item.pct}%)
                    </Typography>
                  </Box>
                )}
                <Chip label={item.trend} size="small" sx={{ mt: 0.75, fontSize: '0.6rem', fontWeight: 800, height: 18, bgcolor: item.trend === 'Buy' ? 'rgba(8,153,129,0.15)' : item.trend === 'Sell' ? 'rgba(242,54,69,0.15)' : 'rgba(255,255,255,0.05)', color: item.trend === 'Buy' ? '#089981' : item.trend === 'Sell' ? '#ef5350' : 'text.secondary' }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ── Tabs ── */}
      <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 3, borderBottom: '1px solid #2a2e39', '& .MuiTab-root': { fontSize: '0.8rem', fontWeight: 700 }, '& .MuiTabs-indicator': { bgcolor: '#2962ff' } }}>
        <Tab label={`🎯 AI Trade Calls (${tradeCalls.length})`} />
        <Tab label="⚡ Scalping Signals" />
        <Tab label="🛡️ Risk Rules" />
      </Tabs>

      {/* ── TAB 0: AI Trade Calls ── */}
      {activeTab === 0 && (
        <Box>
          <Alert severity="warning" sx={{ mb: 3, border: '1px solid rgba(255,168,0,0.3)' }}>
            <AlertTitle sx={{ fontWeight: 800 }}>⚠️ OPTIONS TRADING RISK DISCLOSURE</AlertTitle>
            <Typography variant="caption" sx={{ lineHeight: 1.6 }}>
              Options are high-risk derivative instruments. 9 out of 10 retail option buyers lose money (SEBI study). These are AI-generated research signals, NOT guaranteed profits. Always use stop-losses. Never risk more than 3% of capital per trade. Consult a SEBI-registered advisor.
            </Typography>
          </Alert>

          <Grid container spacing={3}>
            {tradeCalls.map((call, idx) => (
              <Grid item xs={12} key={call.id}>
                <Card sx={{
                  border: `1px solid ${signalBorder(call.signalColor)}50`,
                  bgcolor: signalBg(call.signalColor),
                  transition: 'all 0.2s',
                  '&:hover': { borderColor: signalBorder(call.signalColor), boxShadow: `0 4px 20px ${signalBorder(call.signalColor)}20` }
                }}>
                  <CardContent sx={{ p: 0 }}>
                    {/* ── Call Header ── */}
                    <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                          <Chip label={call.signal} color={call.signalColor} size="small" sx={{ fontWeight: 800, fontSize: '0.7rem' }} />
                          <Chip label={call.index} variant="outlined" size="small" sx={{ fontWeight: 700, fontSize: '0.65rem', borderColor: '#2a2e39' }} />
                          <Chip label={call.optionType} size="small" sx={{ fontWeight: 800, fontSize: '0.65rem', bgcolor: call.optionType === 'CE' ? 'rgba(8,153,129,0.15)' : call.optionType === 'PE' ? 'rgba(242,54,69,0.15)' : 'rgba(41,98,255,0.15)', color: call.optionType === 'CE' ? '#089981' : call.optionType === 'PE' ? '#ef5350' : '#2962ff' }} />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 900, color: '#f0f3fa', mb: 0.5 }}>
                          {call.index} {call.strike} {call.optionType}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {call.type} • Expiry: {call.expiry} • Confidence: {call.confidence}%
                        </Typography>
                      </Box>

                      {/* ── Key Numbers ── */}
                      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, display: 'block', letterSpacing: '0.06em' }}>ENTRY</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 800, color: '#f0f3fa' }}>{call.entry.label}</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, display: 'block', letterSpacing: '0.06em' }}>TARGET 1</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 800, color: 'success.main' }}>{call.target1.label}</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, display: 'block', letterSpacing: '0.06em' }}>STOP LOSS</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 800, color: 'error.main' }}>{call.stopLoss.label}</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, display: 'block', letterSpacing: '0.06em' }}>QTY</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.light' }}>{call.quantity}</Typography>
                        </Box>
                      </Box>
                    </Box>

                    {/* ── Financial Summary Bar ── */}
                    <Box sx={{ px: 2.5, pb: 2, display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                      <Paper sx={{ px: 2, py: 1, bgcolor: '#0d1117', border: '1px solid #2a2e39', borderRadius: 1 }}>
                        <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', fontSize: '0.6rem' }}>CAPITAL NEEDED</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{call.capitalRequired?.toLocaleString('en-IN')}</Typography>
                      </Paper>
                      <Paper sx={{ px: 2, py: 1, bgcolor: '#0d1117', border: '1px solid #2a2e39', borderRadius: 1 }}>
                        <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', fontSize: '0.6rem' }}>MAX PROFIT</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'success.main' }}>+₹{call.maxProfit?.toLocaleString('en-IN')}</Typography>
                      </Paper>
                      <Paper sx={{ px: 2, py: 1, bgcolor: '#0d1117', border: '1px solid #2a2e39', borderRadius: 1 }}>
                        <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', fontSize: '0.6rem' }}>MAX LOSS</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'error.main' }}>-₹{call.maxLoss?.toLocaleString('en-IN')}</Typography>
                      </Paper>
                      <Paper sx={{ px: 2, py: 1, bgcolor: '#0d1117', border: '1px solid #2a2e39', borderRadius: 1 }}>
                        <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', fontSize: '0.6rem' }}>REWARD:RISK</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: call.rewardRisk >= 1.5 ? 'success.main' : 'warning.main' }}>{call.rewardRisk}:1</Typography>
                      </Paper>
                      <Paper sx={{ px: 2, py: 1, bgcolor: '#0d1117', border: '1px solid #2a2e39', borderRadius: 1 }}>
                        <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', fontSize: '0.6rem' }}>LOTS</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{call.lots} ({call.lotSize}/lot)</Typography>
                      </Paper>
                    </Box>

                    {/* ── Expandable Details ── */}
                    <Accordion
                      expanded={expandedCall === idx}
                      onChange={() => setExpandedCall(expandedCall === idx ? null : idx)}
                      sx={{ bgcolor: 'transparent', backgroundImage: 'none', boxShadow: 'none', '&:before': { display: 'none' } }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />} sx={{ borderTop: '1px solid #2a2e39', px: 2.5, minHeight: 44 }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.light', letterSpacing: '0.06em' }}>
                          AI REASONING • GREEKS • TIMING STRATEGY
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ px: 2.5, pb: 2.5 }}>
                        <Grid container spacing={3}>
                          {/* AI Reasoning */}
                          <Grid item xs={12} md={6}>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, display: 'block', mb: 1, letterSpacing: '0.06em' }}>
                              WHY THIS TRADE
                            </Typography>
                            {call.reasoning?.map((r, i) => (
                              <Box key={i} sx={{ display: 'flex', gap: 0.75, mb: 0.75 }}>
                                <CheckCircleIcon sx={{ color: 'success.main', fontSize: '0.85rem', flexShrink: 0, mt: '2px' }} />
                                <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>{r}</Typography>
                              </Box>
                            ))}
                          </Grid>

                          {/* Timing + Greeks */}
                          <Grid item xs={12} md={6}>
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, display: 'block', mb: 0.75, letterSpacing: '0.06em' }}>
                                <AccessTimeIcon sx={{ fontSize: '0.75rem', mr: 0.5, verticalAlign: 'middle' }} /> TIMING STRATEGY
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.primary', lineHeight: 1.6, display: 'block' }}>
                                {call.timing}
                              </Typography>
                            </Box>

                            {call.greeks && (
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, display: 'block', mb: 0.75, letterSpacing: '0.06em' }}>
                                  OPTION GREEKS
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                  <Chip label={`Δ Delta: ${call.greeks.delta}`} size="small" variant="outlined" sx={{ fontSize: '0.6rem', borderColor: '#2a2e39' }} />
                                  <Chip label={`Θ Theta: ${call.greeks.theta}`} size="small" variant="outlined" sx={{ fontSize: '0.6rem', borderColor: '#2a2e39', color: 'error.light' }} />
                                  <Chip label={`IV: ${call.greeks.iv}%`} size="small" variant="outlined" sx={{ fontSize: '0.6rem', borderColor: '#2a2e39' }} />
                                </Box>
                              </Box>
                            )}

                            <Alert severity="error" sx={{ '& .MuiAlert-icon': { alignItems: 'flex-start', mt: 0.5 } }}>
                              <Typography variant="caption" sx={{ lineHeight: 1.5, fontWeight: 600 }}>
                                {call.riskNote}
                              </Typography>
                            </Alert>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>

                    {/* Confidence Bar */}
                    <Box sx={{ px: 2.5, pb: 1.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem' }}>AI Confidence</Typography>
                        <Typography variant="caption" sx={{ color: confColor(call.confidence), fontWeight: 800, fontSize: '0.6rem' }}>{call.confidence}%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={call.confidence} sx={{ height: 4, borderRadius: 2, bgcolor: '#2a2e39', '& .MuiLinearProgress-bar': { borderRadius: 2, bgcolor: confColor(call.confidence) } }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* ── TAB 1: Scalping ── */}
      {activeTab === 1 && (
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 2, border: '1px solid rgba(41,98,255,0.3)' }}>
              <AlertTitle sx={{ fontWeight: 800 }}>INTRADAY SCALPING — HIGH FREQUENCY SIGNALS</AlertTitle>
              <Typography variant="caption">These signals update every 60 seconds. Scalping requires lightning-fast execution and strict discipline. Not suitable for beginners.</Typography>
            </Alert>
          </Grid>
          {scalpCalls.map((sc, i) => (
            <Grid item xs={12} md={4} key={sc.id}>
              <Card sx={{ height: '100%', border: '1px solid #2a2e39' }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Chip label={sc.type} color="primary" size="small" sx={{ fontWeight: 800, fontSize: '0.65rem' }} />
                    <Chip label={sc.status} size="small" sx={{ fontWeight: 800, fontSize: '0.6rem', bgcolor: sc.status === 'ACTIVE' ? 'rgba(8,153,129,0.15)' : sc.status === 'PENDING' ? 'rgba(249,168,37,0.15)' : 'rgba(255,255,255,0.05)', color: sc.status === 'ACTIVE' ? '#089981' : sc.status === 'PENDING' ? '#f9a825' : 'text.disabled' }} />
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 800, color: '#f0f3fa', mb: 1.5, lineHeight: 1.3 }}>
                    {sc.name}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {[
                      { icon: <TrendingUpIcon sx={{ fontSize: '0.8rem', color: 'success.main' }} />, label: 'Bullish', value: sc.condition },
                      { icon: <TrendingDownIcon sx={{ fontSize: '0.8rem', color: 'error.main' }} />, label: 'Bearish', value: sc.conditionBear },
                    ].map((cond, j) => (
                      <Box key={j} sx={{ p: 1.25, bgcolor: '#0d1117', borderRadius: 1, border: '1px solid #2a2e39' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                          {cond.icon}
                          <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.6rem' }}>{cond.label}</Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: 'text.primary', lineHeight: 1.4, display: 'block', fontSize: '0.72rem' }}>
                          {cond.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Divider sx={{ my: 1.5, borderColor: '#2a2e39' }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', fontSize: '0.6rem' }}>Target</Typography>
                      <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 700 }}>{sc.target}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', fontSize: '0.6rem' }}>Hold Time</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>{sc.holdTime}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', fontSize: '0.6rem' }}>Stop Loss</Typography>
                      <Typography variant="caption" sx={{ color: 'error.light', fontWeight: 700 }}>{sc.stopLoss}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', fontSize: '0.6rem' }}>Risk</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>{sc.riskPct}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* ── TAB 2: Risk Rules ── */}
      {activeTab === 2 && riskRules && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Card sx={{ border: '1px solid #2a2e39' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ShieldIcon sx={{ color: 'primary.main' }} /> Risk Parameters
                </Typography>
                {[
                  { label: 'Max Single Trade Risk', value: `₹${riskRules.maxSingleTradeRisk.toLocaleString('en-IN')}`, sub: '3% of capital' },
                  { label: 'Max Daily Loss Limit', value: `₹${riskRules.maxDailyLoss.toLocaleString('en-IN')}`, sub: '5% of capital — STOP trading' },
                  { label: 'Max Open Positions', value: riskRules.maxOpenPositions, sub: 'Across all indices' },
                  { label: 'Max Capital in Options', value: `₹${riskRules.maxCapitalInOptions.toLocaleString('en-IN')}`, sub: '25% of total capital' },
                  { label: 'Mandatory Stop-Loss', value: 'YES — ALWAYS', sub: 'Never trade without SL' },
                  { label: 'Exit Time (Expiry Day)', value: riskRules.exitByTime, sub: 'Theta accelerates after 2 PM' },
                  { label: 'Overnight Weekly Options', value: 'NEVER HOLD', sub: 'Gap risk + theta wipe' },
                ].map((param, i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.25, borderBottom: '1px solid #2a2e39' }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{param.label}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>{param.sub}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: 'warning.main' }}>{param.value}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Card sx={{ border: '1px solid rgba(242,54,69,0.3)', bgcolor: 'rgba(242,54,69,0.04)' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WarningAmberIcon sx={{ color: 'error.main' }} /> 10 Iron Rules of Options Trading
                </Typography>
                {riskRules.rules.map((rule, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 1.25, mb: 1.5 }}>
                    <Typography sx={{ color: 'error.main', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0, width: 24 }}>
                      {i + 1}.
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.5, fontWeight: i < 3 ? 700 : 400 }}>
                      {rule}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* ── Disclaimer Footer ── */}
      <Alert severity="error" sx={{ mt: 4, border: '1px solid rgba(242,54,69,0.3)' }}>
        <AlertTitle sx={{ fontWeight: 800 }}>MANDATORY SEBI RISK DISCLOSURE</AlertTitle>
        <Typography variant="caption" sx={{ lineHeight: 1.6 }}>
          Options trading involves substantial risk of loss. According to SEBI, 89% of individual traders in the F&O segment incurred losses (SEBI circular dated January 2023). AI-generated calls are research signals, NOT investment advice. Past performance does not guarantee future results. You may lose your entire invested capital. Trade at your own risk. Always use stop-losses. This platform is NOT a SEBI-registered investment advisor.
        </Typography>
      </Alert>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          Last refreshed: {lastRefresh.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })} IST • Auto-refreshes every 60 seconds
        </Typography>
      </Box>
    </Box>
  );
};

export default OptionsView;
