import React, { useState, useMemo } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Button, Paper, Chip,
  Divider, Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import MemoryIcon from '@mui/icons-material/Memory';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SpeedIcon from '@mui/icons-material/Speed';
import ShieldIcon from '@mui/icons-material/Shield';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import marketOSEngine from '../../services/marketOS/MarketOSEngine';

export const MarketOSView = () => {
  const [activeTab, setActiveTab] = useState(0);

  const snapshot = useMemo(() => {
    return marketOSEngine.getMarketOSSnapshot();
  }, []);

  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* ── Header ── */}
      <Box sx={{ borderLeft: '4px solid #ab47bc', pl: 1.5, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <MemoryIcon sx={{ color: '#ab47bc', fontSize: '2.2rem' }} />
          <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
            24x7 AI Market Operating System (MarketOS)
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Autonomous 11-agent operating system evaluating evidence 24x7 & generating real-time Mission Cards.
        </Typography>
      </Box>

      {/* ── Executive MarketOS Monitor ── */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #0d1117 0%, #161c2e 100%)', border: '1px solid #2a2e39', borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#089981', boxShadow: '0 0 12px #089981', animation: 'pulse 1.5s infinite' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>24x7 OPERATING STATUS</Typography>
                <Typography variant="body2" sx={{ fontWeight: 900, color: '#089981' }}>100% OPERATIONAL</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <AccountTreeIcon sx={{ color: '#ab47bc' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>AUTONOMOUS AI AGENTS</Typography>
                <Typography variant="body2" sx={{ fontWeight: 900, color: '#ab47bc' }}>{snapshot.agents.activeAgentsCount} Specialist Agents Active</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <SpeedIcon sx={{ color: '#2962ff' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>EVENTBUS ARCHITECTURE</Typography>
                <Typography variant="body2" sx={{ fontWeight: 900, color: '#2962ff' }}>Decoupled Async Pub/Sub</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <AutoAwesomeIcon sx={{ color: '#f9a825' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>ACTIVE MISSION CARDS</Typography>
                <Typography variant="body2" sx={{ fontWeight: 900, color: '#f9a825' }}>{snapshot.missions.length} Mission Cards Live</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* ── Main MarketOS Tabs ── */}
      <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 3, borderBottom: '1px solid #2a2e39', '& .MuiTab-root': { fontSize: '0.8rem', fontWeight: 700 }, '& .MuiTabs-indicator': { bgcolor: '#ab47bc' } }}>
        <Tab label="🎯 Active AI Mission Cards" />
        <Tab label="🤖 11 Autonomous Agent Network" />
        <Tab label="🧠 Market Memory & Retrospective" />
      </Tabs>

      {/* ── TAB 0: Active AI Mission Cards ── */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {snapshot.missions.map((m) => (
            <Grid item xs={12} md={6} key={m.id}>
              <Card sx={{ border: `1px solid ${m.badgeColor === 'error' ? 'rgba(242,54,69,0.4)' : 'rgba(41,98,255,0.3)'}`, bgcolor: '#111524', height: '100%' }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Chip label={m.status} color={m.badgeColor} size="small" sx={{ fontWeight: 900, fontSize: '0.65rem' }} />
                    <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700 }}>Next Review: {m.nextReview}</Typography>
                  </Box>

                  <Typography variant="h5" sx={{ fontWeight: 900, color: 'primary.light', mb: 1 }}>{m.symbol}</Typography>

                  {m.entryZone !== 'N/A' && (
                    <Box sx={{ display: 'flex', gap: 2, mb: 1.5 }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>Entry: <strong>{m.entryZone}</strong></Typography>
                      <Typography variant="caption" sx={{ color: '#089981', fontWeight: 800 }}>Target: <strong>{m.targetZone}</strong></Typography>
                      <Typography variant="caption" sx={{ color: 'warning.main', fontWeight: 800 }}>Risk: <strong>{m.riskLevel}</strong></Typography>
                    </Box>
                  )}

                  <Paper sx={{ p: 1.5, bgcolor: '#0d1117', border: '1px solid #2a2e39', mb: 1.5 }}>
                    <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 800, display: 'block', mb: 0.5 }}>WHY NOW?</Typography>
                    <Typography variant="caption" sx={{ color: 'text.primary', display: 'block', mb: 1 }}>{m.whyNow}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 800, display: 'block', mb: 0.5 }}>WHY THIS STOCK OVER OTHERS?</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{m.whyNotAnother}</Typography>
                  </Paper>

                  {m.invalidation !== 'N/A' && (
                    <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 700, display: 'block' }}>
                      ⚠️ INVALIDATION: {m.invalidation}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* ── TAB 1: 11 Autonomous Agent Network ── */}
      {activeTab === 1 && (
        <Card sx={{ border: '1px solid #2a2e39' }}>
          <CardContent sx={{ p: 2.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>11 Autonomous Specialist AI Agent Network</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ '& th': { borderColor: '#2a2e39', color: 'text.secondary', fontSize: '0.7rem' } }}>
                    <TableCell>Agent Name</TableCell>
                    <TableCell>Specialized Responsibility</TableCell>
                    <TableCell align="center">Priority</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Latest Agent Signal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {snapshot.agents.agents.map((ag) => (
                    <TableRow key={ag.id} sx={{ '& td': { borderColor: '#2a2e39', fontSize: '0.75rem' } }}>
                      <TableCell sx={{ fontWeight: 800, color: 'primary.light' }}>{ag.name}</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{ag.responsibility}</TableCell>
                      <TableCell align="center">
                        <Chip label={`P${ag.priority}`} size="small" color={ag.priority >= 8 ? 'error' : 'default'} sx={{ fontSize: '0.6rem', height: 18, fontWeight: 800 }} />
                      </TableCell>
                      <TableCell align="right">
                        <Chip label={ag.status} color="success" size="small" sx={{ fontSize: '0.6rem', height: 18, fontWeight: 800 }} />
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: '#089981' }}>{ag.lastSignal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* ── TAB 2: Market Memory & Retrospective ── */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ border: '1px solid #2a2e39', height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Market Memory & Context Audit</Typography>
                <Paper sx={{ p: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39', mb: 2 }}>
                  <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 800, display: 'block', mb: 0.5 }}>WHY RECOMMENDATIONS CHANGED TODAY?</Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.5 }}>{snapshot.memory.whyChanged}</Typography>
                </Paper>
                <Paper sx={{ p: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 800, display: 'block', mb: 0.5 }}>HISTORICAL CONTEXT</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>{snapshot.memory.historicalContext}</Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ border: '1px solid #2a2e39', height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Signal Performance Log (Successful vs Failed)</Typography>
                <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 800, display: 'block', mb: 1 }}>✓ SUCCESSFUL SIGNALS</Typography>
                {snapshot.memory.successfulSignalsLog.map((s, i) => (
                  <Paper key={i} sx={{ p: 1.5, bgcolor: '#0d1117', border: '1px solid #2a2e39', mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: 'success.main' }}>{s.symbol} (+{s.returnPct}%)</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{s.reason}</Typography>
                  </Paper>
                ))}
                <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 800, display: 'block', mt: 2, mb: 1 }}>⚠️ FAILED SIGNALS</Typography>
                {snapshot.memory.failedSignalsLog.map((f, i) => (
                  <Paper key={i} sx={{ p: 1.5, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: 'error.main' }}>{f.symbol}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{f.reason}</Typography>
                  </Paper>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default MarketOSView;
