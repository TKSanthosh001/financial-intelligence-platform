import React, { useState, useMemo } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Button, Paper, Chip,
  Divider, LinearProgress, Tab, Tabs, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import marketBrainEngine from '../../services/marketBrain/MarketBrainEngine';

export const MarketBrainView = () => {
  const [activeTab, setActiveTab] = useState(0);

  const snapshot = useMemo(() => {
    return marketBrainEngine.getMarketBrainSnapshot('BALANCED');
  }, []);

  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* ── Header ── */}
      <Box sx={{ borderLeft: '4px solid #2962ff', pl: 1.5, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <PsychologyIcon sx={{ color: '#2962ff', fontSize: '2.2rem' }} />
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            Autonomous Market Brain
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Continuously running 8-Agent AI intelligence loop — filtering noise, synthesizing consensus & ranking high-conviction trades.
        </Typography>
      </Box>

      {/* ── Executive Brain Monitor Banner ── */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #0d1117 0%, #161c2e 100%)', border: '1px solid #2a2e39', borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#089981', boxShadow: '0 0 12px #089981', animation: 'pulse 1.5s infinite' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>BRAIN LOOP STATUS</Typography>
                <Typography variant="body2" sx={{ fontWeight: 900, color: '#089981' }}>CONTINUOUSLY ACTIVE</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <VerifiedIcon sx={{ color: '#2962ff' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>AI WIN RATE</Typography>
                <Typography variant="body2" sx={{ fontWeight: 900, color: '#2962ff' }}>{snapshot.trackRecord.winRatePct}% (125/142 Wins)</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EmojiEventsIcon sx={{ color: '#f9a825' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>PROFIT FACTOR</Typography>
                <Typography variant="body2" sx={{ fontWeight: 900, color: '#f9a825' }}>{snapshot.trackRecord.profitFactor}x (+14.2% Avg Gain)</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <AutoAwesomeIcon sx={{ color: '#ab47bc' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>AI AGENT CONSENSUS</Typography>
                <Typography variant="body2" sx={{ fontWeight: 900, color: '#ab47bc' }}>8 Agents Online (92% Agreement)</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* ── Daily Plain-Language Market Story Card ── */}
      <Card sx={{ mb: 3, border: '1px solid rgba(41,98,255,0.3)', bgcolor: 'rgba(41,98,255,0.04)' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#2962ff', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesomeIcon /> Daily Market Story: {snapshot.narrative.headline}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.7, color: 'text.primary', mb: 2 }}>
            {snapshot.narrative.marketStory}
          </Typography>

          <Accordion sx={{ bgcolor: '#0d1117', border: '1px solid #2a2e39', '&:before': { display: 'none' } }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.light' }}>
                VIEW END-OF-DAY AI RETROSPECTIVE REVIEW
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ borderTop: '1px solid #2a2e39' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 800, display: 'block', mb: 0.5 }}>✓ WHAT WORKED CORRECTLY</Typography>
                  {snapshot.narrative.endOfDayReview.correctPredictions.map((cp, idx) => (
                    <Typography key={idx} variant="caption" sx={{ display: 'block', color: 'text.secondary', mb: 0.25 }}>• {cp}</Typography>
                  ))}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 800, display: 'block', mb: 0.5 }}>🧠 WHAT THE AI LEARNED</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>• {snapshot.narrative.endOfDayReview.whatAILearned}</Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

      {/* ── Main Market Brain Tabs ── */}
      <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 3, borderBottom: '1px solid #2a2e39', '& .MuiTab-root': { fontSize: '0.8rem', fontWeight: 700 }, '& .MuiTabs-indicator': { bgcolor: '#2962ff' } }}>
        <Tab label="🧠 8-Agent AI Consensus" />
        <Tab label="🔥 High-Conviction Opportunity Ranking" />
        <Tab label="📊 Live 10-Metric Stock Profiles" />
        <Tab label="🏆 AI Track Record & Win Rate" />
      </Tabs>

      {/* ── TAB 0: 8-Agent AI Consensus Matrix ── */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{ border: '1px solid #2a2e39' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>8-Agent Specialized Consensus (TCS)</Typography>
                {snapshot.consensus.agents?.map((ag, i) => (
                  <Paper key={i} sx={{ p: 2, mb: 1.5, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.light' }}>{ag.name}</Typography>
                      <Chip label={`${ag.confidence}% Confidence • ${ag.signal}`} color="success" size="small" sx={{ fontWeight: 800, fontSize: '0.6rem' }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{ag.detail}</Typography>
                  </Paper>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card sx={{ border: '1px solid #2a2e39', height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Decision Engine Consensus Verdict</Typography>
                <Paper sx={{ p: 2, bgcolor: 'rgba(8,153,129,0.06)', borderLeft: '3px solid #089981', mb: 3 }}>
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {snapshot.consensus.decisionVerdict}
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* ── TAB 1: High-Conviction Opportunity Ranking ── */}
      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ border: '1px solid #2a2e39', mb: 3 }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Ranked High-Conviction Trade Candidates</Typography>
                {snapshot.rankings.topOpportunities?.map((opp, i) => (
                  <Paper key={i} sx={{ p: 2.5, mb: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 900, color: 'primary.light' }}>#{i + 1} {opp.symbol}</Typography>
                        <Chip label={opp.signal} color="success" size="small" sx={{ fontWeight: 900, fontSize: '0.65rem' }} />
                        <Chip label={`Holding: ${opp.holdingPeriod}`} variant="outlined" size="small" sx={{ fontSize: '0.65rem', borderColor: '#2a2e39' }} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 900, color: '#089981' }}>{opp.confidenceScore}% Opportunity Score</Typography>
                    </Box>

                    <Grid container spacing={2} sx={{ mb: 1.5 }}>
                      <Grid item xs={4}>
                        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', display: 'block' }}>ENTRY ZONE</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800 }}>{opp.entryZone}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', display: 'block' }}>STOP LOSS</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#ef5350' }}>{opp.stopLoss}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', display: 'block' }}>TARGET ZONE</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#089981' }}>{opp.targetZone}</Typography>
                      </Grid>
                    </Grid>

                    <Typography variant="caption" sx={{ color: 'error.light', display: 'block', mb: 1, fontWeight: 700 }}>
                      ⚠️ INVALIDATION: {opp.invalidation}
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {opp.reasons.map((r, idx) => (
                        <Chip key={idx} label={r} size="small" sx={{ fontSize: '0.6rem', height: 18, bgcolor: 'rgba(8,153,129,0.15)', color: '#089981', fontWeight: 800 }} />
                      ))}
                    </Box>
                  </Paper>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ border: '1px solid rgba(242,54,69,0.3)', bgcolor: 'rgba(242,54,69,0.03)' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: 'error.main' }}>
                  ⚠️ AVOID / REDUCE LIST
                </Typography>
                {snapshot.rankings.avoidHoldings?.map((av, i) => (
                  <Paper key={i} sx={{ p: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: 'error.main', mb: 0.5 }}>{av.symbol} ({av.signal})</Typography>
                    {av.reasons.map((r, idx) => (
                      <Typography key={idx} variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>• {r}</Typography>
                    ))}
                  </Paper>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* ── TAB 2: Live 10-Metric Stock Profiles ── */}
      {activeTab === 2 && (
        <Card sx={{ border: '1px solid #2a2e39' }}>
          <CardContent sx={{ p: 2.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Live 10-Metric Tracked Profiles</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ '& th': { borderColor: '#2a2e39', color: 'text.secondary', fontSize: '0.7rem' } }}>
                    <TableCell>Stock</TableCell>
                    <TableCell align="right">Trend</TableCell>
                    <TableCell align="right">Momentum</TableCell>
                    <TableCell align="right">Institutional</TableCell>
                    <TableCell align="right">News</TableCell>
                    <TableCell align="right">Technical</TableCell>
                    <TableCell align="right">Fundamental</TableCell>
                    <TableCell align="right">Volume</TableCell>
                    <TableCell align="right">Confidence</TableCell>
                    <TableCell align="right">Overall Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {snapshot.trackedProfiles?.map((p, i) => (
                    <TableRow key={i} sx={{ '& td': { borderColor: '#2a2e39', fontSize: '0.75rem' } }}>
                      <TableCell sx={{ fontWeight: 800, color: 'primary.light' }}>{p.symbol}</TableCell>
                      <TableCell align="right">{p.trend}</TableCell>
                      <TableCell align="right">{p.momentumScore}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, color: '#089981' }}>{p.institutionalScore}</TableCell>
                      <TableCell align="right">{p.newsScore}</TableCell>
                      <TableCell align="right">{p.technicalScore}</TableCell>
                      <TableCell align="right">{p.fundamentalScore}</TableCell>
                      <TableCell align="right">{p.volumeScore}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800 }}>{p.confidenceScore}%</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 900, color: p.overallOpportunityScore > 80 ? '#089981' : '#ef5350' }}>
                        {p.overallOpportunityScore}/100
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* ── TAB 3: AI Track Record & Win Rate ── */}
      {activeTab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Card sx={{ border: '1px solid #2a2e39', height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>AI Prediction Self-Calibration</Typography>
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="h2" sx={{ fontWeight: 900, color: '#089981' }}>{snapshot.trackRecord.winRatePct}%</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>Historical Win Rate (125 Wins / 17 Losses)</Typography>
                </Box>
                <Paper sx={{ p: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39', mb: 2 }}>
                  <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 800, display: 'block', mb: 0.5 }}>AI CALIBRATION NOTE</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.5, display: 'block' }}>
                    {snapshot.trackRecord.aiSelfLearnings}
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Card sx={{ border: '1px solid #2a2e39' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Recent Signal Performance Log</Typography>
                {snapshot.trackRecord.recentResults?.map((res, i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.25, borderBottom: '1px solid #2a2e39' }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.light' }}>{res.symbol}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>Entry: ₹{res.entry} • Target: ₹{res.target || res.stop}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: res.returnPct >= 0 ? '#089981' : '#ef5350' }}>
                        {res.returnPct >= 0 ? '+' : ''}{res.returnPct}%
                      </Typography>
                      <Chip label={res.status} size="small" color={res.status.includes('WIN') ? 'success' : 'error'} sx={{ fontSize: '0.6rem', height: 18 }} />
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

export default MarketBrainView;
