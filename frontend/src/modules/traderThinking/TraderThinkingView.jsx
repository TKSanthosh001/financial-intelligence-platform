import React, { useState, useMemo } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Button, Paper, Chip,
  Divider, LinearProgress, Tab, Tabs
} from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SpeedIcon from '@mui/icons-material/Speed';
import ShieldIcon from '@mui/icons-material/Shield';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ForumIcon from '@mui/icons-material/Forum';
import thinkingEngine from '../../services/traderThinking/ThinkingEngine';

export const TraderThinkingView = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('TCS');
  const [activeTab, setActiveTab] = useState(0);

  const snapshot = useMemo(() => {
    return thinkingEngine.getTraderThinkingSnapshot(selectedSymbol);
  }, [selectedSymbol]);

  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* ── Header ── */}
      <Box sx={{ borderLeft: '4px solid #f9a825', pl: 1.5, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <PsychologyIcon sx={{ color: '#f9a825', fontSize: '2.2rem' }} />
          <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
            Continuous AI Trader Thinking Engine
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Disciplined investment committee loop — continuously observing, debating, validating & recalibrating setup probabilities.
        </Typography>
      </Box>

      {/* ── Symbol Selector Bar ── */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
        {['TCS', 'HDFCBANK'].map((sym) => (
          <Button
            key={sym}
            variant={selectedSymbol === sym ? 'contained' : 'outlined'}
            color="warning"
            onClick={() => setSelectedSymbol(sym)}
            sx={{ fontWeight: 800, borderRadius: 2 }}
          >
            {sym}
          </Button>
        ))}
      </Box>

      {/* ── Executive Thinking Monitor Banner ── */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #0d1117 0%, #161c2e 100%)', border: '1px solid #2a2e39', borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f9a825', boxShadow: '0 0 12px #f9a825', animation: 'pulse 1.5s infinite' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>THINKING LOOP STATUS</Typography>
                <Typography variant="body2" sx={{ fontWeight: 900, color: '#f9a825' }}>CONTINUOUSLY THINKING</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <SpeedIcon sx={{ color: '#089981' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>LOOP ITERATIONS EXECUTED</Typography>
                <Typography variant="body2" sx={{ fontWeight: 900, color: '#089981' }}>{snapshot.loopState.iterationsExecuted.toLocaleString()} Cycles</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <ForumIcon sx={{ color: '#2962ff' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>AI COMMITTEE DEBATE</Typography>
                <Typography variant="body2" sx={{ fontWeight: 900, color: '#2962ff' }}>6 Agents Active (Consensus Reached)</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <AutoAwesomeIcon sx={{ color: '#ab47bc' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>CONTINUATION PROBABILITY</Typography>
                <Typography variant="body2" sx={{ fontWeight: 900, color: '#ab47bc' }}>{snapshot.probabilities.probabilities.trendContinuationPct}% Probability</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* ── Hourly Market Story Card ── */}
      <Card sx={{ mb: 3, border: '1px solid rgba(249,168,37,0.3)', bgcolor: 'rgba(249,168,37,0.04)' }}>
        <CardContent sx={{ p: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#f9a825', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesomeIcon /> Hourly Market Story ({snapshot.hourlyStory.time}): {snapshot.hourlyStory.headline}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.7, color: 'text.primary', mb: 2 }}>
            "{snapshot.hourlyStory.storyText}"
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" sx={{ color: '#089981', fontWeight: 800, display: 'block', mb: 0.5 }}>WHAT INSTITUTIONS DID</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{snapshot.hourlyStory.institutionalAction}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 800, display: 'block', mb: 0.5 }}>WHERE MONEY IS GOING NEXT</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{snapshot.hourlyStory.nextRotationTarget}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* ── Main Thinking Engine Tabs ── */}
      <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 3, borderBottom: '1px solid #2a2e39', '& .MuiTab-root': { fontSize: '0.8rem', fontWeight: 700 }, '& .MuiTabs-indicator': { bgcolor: '#f9a825' } }}>
        <Tab label="🏛️ Multi-Agent AI Debate Committee" />
        <Tab label="🎲 Dynamic Probability Engine" />
        <Tab label="🧐 AI Self-Critique & Alternative Search" />
      </Tabs>

      {/* ── TAB 0: Multi-Agent AI Debate Committee ── */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{ border: '1px solid #2a2e39' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Institutional Committee Debate Log ({selectedSymbol})</Typography>
                {snapshot.debate.debateLog?.map((item, i) => (
                  <Paper key={i} sx={{ p: 2, mb: 1.5, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1">{item.icon}</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.light' }}>{item.agent}</Typography>
                      </Box>
                      <Chip label={item.stance} color={item.stance.includes('BULL') ? 'success' : item.stance.includes('CAUTIOUS') ? 'warning' : 'default'} size="small" sx={{ fontWeight: 800, fontSize: '0.6rem' }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.5, display: 'block' }}>
                      "{item.argument}"
                    </Typography>
                  </Paper>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card sx={{ border: '1px solid #2a2e39', height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Final Committee Consensus Verdict</Typography>
                <Paper sx={{ p: 2, bgcolor: 'rgba(8,153,129,0.06)', borderLeft: '3px solid #089981', mb: 2 }}>
                  <Typography variant="body2" sx={{ lineHeight: 1.6, fontWeight: 600 }}>
                    {snapshot.debate.consensusVerdict}
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* ── TAB 1: Dynamic Probability Engine ── */}
      {activeTab === 1 && (
        <Card sx={{ border: '1px solid #2a2e39' }}>
          <CardContent sx={{ p: 2.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Real-Time Dynamic Probability Estimator ({selectedSymbol})</Typography>
            <Grid container spacing={2}>
              {[
                { label: 'Trend Continuation Probability', val: snapshot.probabilities.probabilities.trendContinuationPct, color: '#089981' },
                { label: 'Breakout Success Probability', val: snapshot.probabilities.probabilities.breakoutSuccessPct, color: '#2962ff' },
                { label: 'Target Achievement Probability', val: snapshot.probabilities.probabilities.targetAchievementPct, color: '#ab47bc' },
                { label: 'Institutional Buying Probability', val: snapshot.probabilities.probabilities.institutionalBuyingPct, color: '#f9a825' },
                { label: 'Stop Loss Hit Risk', val: snapshot.probabilities.probabilities.stopLossHitPct, color: '#ef5350' },
                { label: 'Trend Reversal Risk', val: snapshot.probabilities.probabilities.reversalRiskPct, color: '#ef5350' },
              ].map((prob, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Paper sx={{ p: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>{prob.label}</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 900, color: prob.color }}>{prob.val}%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={prob.val} sx={{ height: 6, borderRadius: 3, bgcolor: '#2a2e39', '& .MuiLinearProgress-bar': { bgcolor: prob.color } }} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* ── TAB 2: AI Self-Critique & Alternative Search ── */}
      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ border: '1px solid #2a2e39', height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>AI Self-Critique & Risk Audit</Typography>
                {snapshot.loopState.selfCritique.map((sc, i) => (
                  <Paper key={i} sx={{ p: 1.5, bgcolor: '#0d1117', border: '1px solid #2a2e39', mb: 1.5 }}>
                    <Typography variant="caption" sx={{ color: 'warning.main', fontWeight: 800, display: 'block', mb: 0.5 }}>AUDIT QUESTION #{i + 1}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{sc}</Typography>
                  </Paper>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ border: '1px solid #2a2e39', height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Alternative Opportunity Search</Typography>
                <Paper sx={{ p: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                  <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 800, display: 'block', mb: 0.5 }}>CONTINUOUS SCANNER AUDIT</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                    {snapshot.loopState.alternativeSearch}
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default TraderThinkingView;
