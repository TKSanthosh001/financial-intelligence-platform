import React, { useState, useMemo } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Button, Paper, Chip,
  Divider, LinearProgress, Tab, Tabs, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Alert
} from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ShieldIcon from '@mui/icons-material/Shield';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import liveTradeDecisionEngine from '../../services/decisionEngine/LiveTradeDecisionEngine';

export const LiveTradeDecisionView = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('TCS');
  const [activeTab, setActiveTab] = useState(0);

  const dossier = useMemo(() => {
    return liveTradeDecisionEngine.getDecisionDossier(selectedSymbol);
  }, [selectedSymbol]);

  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* ── Header ── */}
      <Box sx={{ borderLeft: '4px solid #089981', pl: 1.5, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <FlashOnIcon sx={{ color: '#089981', fontSize: '2.2rem' }} />
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            Live AI Trade Decision Engine
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Real-time 16-metric weighted conviction scoring, precise entry/exit zones, MFE/MAE excursion analytics & invalidation rules.
        </Typography>
      </Box>

      {/* ── Symbol Selector Bar ── */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
        {['TCS', 'HDFCBANK', 'RELIANCE'].map((sym) => (
          <Button
            key={sym}
            variant={selectedSymbol === sym ? 'contained' : 'outlined'}
            onClick={() => setSelectedSymbol(sym)}
            sx={{ fontWeight: 800, borderRadius: 2 }}
          >
            {sym}
          </Button>
        ))}
      </Box>

      {/* ── Executive Action State Card ── */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #0d1117 0%, #161c2e 100%)', border: '1px solid #2a2e39', borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>SELECTED INSTRUMENT</Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: 'primary.light', mt: 0.5 }}>{dossier.setup.symbol}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>CMP: ₹{dossier.setup.cmp}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>STANDARDIZED ACTION STATE</Typography>
            <Chip
              label={dossier.setup.actionState}
              color={dossier.setup.actionState.includes('Strong') ? 'success' : dossier.setup.actionState.includes('Buy') ? 'primary' : 'error'}
              sx={{ fontWeight: 900, mt: 0.5, fontSize: '0.8rem', height: 28 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>16-METRIC CONVICTION SCORE</Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#089981', mt: 0.5 }}>
              {dossier.confidence.overallConfidence}%
            </Typography>
            <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 800 }}>High Conviction Signal</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>EXPECTED HOLDING PERIOD</Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#f9a825', mt: 0.5 }}>
              {dossier.setup.holdingPeriod}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* ── Main Decision Tabs ── */}
      <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 3, borderBottom: '1px solid #2a2e39', '& .MuiTab-root': { fontSize: '0.8rem', fontWeight: 700 }, '& .MuiTabs-indicator': { bgcolor: '#089981' } }}>
        <Tab label="🎯 Entry & Exit Matrix" />
        <Tab label="⚖️ 16-Metric Conviction Breakdown" />
        <Tab label="📈 Learning Engine & Excursions (MFE/MAE)" />
      </Tabs>

      {/* ── TAB 0: Entry & Exit Matrix ── */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{ border: '1px solid #2a2e39', mb: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Trade Setup Execution Matrix</Typography>

                {/* Entry Zones */}
                <Paper sx={{ p: 2, mb: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                  <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 800, display: 'block', mb: 1 }}>SUGGESTED ENTRY ZONES</Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary', mb: 0.5 }}>
                    • <strong>Aggressive Entry:</strong> {dossier.setup.entryZone.aggressive}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary', mb: 0.5 }}>
                    • <strong>Conservative Entry:</strong> {dossier.setup.entryZone.conservative}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    Confirmation Signal: {dossier.setup.entryZone.confirmation}
                  </Typography>
                </Paper>

                {/* Invalidation Level */}
                <Paper sx={{ p: 2, mb: 2, bgcolor: 'rgba(242,54,69,0.04)', border: '1px solid rgba(242,54,69,0.3)' }}>
                  <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 900, display: 'block', mb: 0.5 }}>
                    ⚠️ SUGGESTED INVALIDATION LEVEL (STOP LOSS)
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: 'error.light' }}>
                    {dossier.setup.invalidationLevel}
                  </Typography>
                </Paper>

                {/* Targets */}
                <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 900, display: 'block', mb: 1 }}>
                  REWARD TARGET ZONES (PARTIAL VS FULL EXIT)
                </Typography>
                {dossier.setup.rewardTargets?.map((tgt, i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #2a2e39' }}>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>{tgt.target}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 900, color: '#089981' }}>{tgt.price} (+{tgt.returnPct}%)</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card sx={{ border: '1px solid #2a2e39', mb: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Supporting Evidence vs Key Risks</Typography>
                <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 800, display: 'block', mb: 1 }}>SUPPORTING EVIDENCE</Typography>
                {dossier.setup.supportingEvidence?.map((ev, i) => (
                  <Typography key={i} variant="caption" sx={{ display: 'block', color: 'text.secondary', mb: 0.5 }}>{ev}</Typography>
                ))}
                <Divider sx={{ borderColor: '#2a2e39', my: 2 }} />
                <Typography variant="caption" sx={{ color: 'warning.main', fontWeight: 800, display: 'block', mb: 1 }}>KEY RISKS & CONSTRAINTS</Typography>
                {dossier.setup.keyRisks?.map((rk, i) => (
                  <Typography key={i} variant="caption" sx={{ display: 'block', color: 'text.secondary', mb: 0.5 }}>{rk}</Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* ── TAB 1: 16-Metric Conviction Breakdown ── */}
      {activeTab === 1 && (
        <Card sx={{ border: '1px solid #2a2e39' }}>
          <CardContent sx={{ p: 2.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>16-Metric Dynamic Conviction Breakdown</Typography>
            {dossier.confidence.breakdown?.map((item, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{item.metric} (Weight: {item.weight})</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: '#089981' }}>{item.score}/100 (+{item.contribution}% contribution)</Typography>
                </Box>
                <LinearProgress variant="determinate" value={item.score} sx={{ height: 6, borderRadius: 3, bgcolor: '#2a2e39', '& .MuiLinearProgress-bar': { bgcolor: '#089981' } }} />
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {/* ── TAB 2: Learning Engine & Excursions ── */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Card sx={{ border: '1px solid #2a2e39', height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Excursion Metrics (MFE / MAE)</Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>MAXIMUM FAVORABLE EXCURSION (MFE)</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: '#089981', mt: 0.5 }}>+{dossier.learning.maxFavorableExcursionAvg}%</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>Average peak gain observed before exit</Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>MAXIMUM ADVERSE EXCURSION (MAE)</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: '#ef5350', mt: 0.5 }}>{dossier.learning.maxAdverseExcursionAvg}%</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>Average maximum drawdown experienced before targets</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Card sx={{ border: '1px solid #2a2e39' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Historical Signal Learning Audit</Typography>
                {dossier.learning.historicalTrades?.map((tr, i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 1.25, borderBottom: '1px solid #2a2e39' }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.light' }}>{tr.symbol}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>MFE: +{tr.mfePct}% • MAE: {tr.maePct}%</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: tr.returnPct >= 0 ? '#089981' : '#ef5350' }}>+{tr.returnPct}%</Typography>
                      <Chip label={tr.result} color="success" size="small" sx={{ fontSize: '0.6rem', height: 18 }} />
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default LiveTradeDecisionView;
