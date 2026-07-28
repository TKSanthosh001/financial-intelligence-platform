import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, TextField, Button, Paper,
  Chip, LinearProgress, CircularProgress, Accordion, AccordionSummary,
  AccordionDetails, Divider, Avatar, Tooltip, Alert, AlertTitle, Tab, Tabs
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BoltIcon from '@mui/icons-material/Bolt';
import { runMultiAgentAnalysis } from '../../services/MultiAgentOrchestrator';

// ─── Colour helpers ────────────────────────────────────────────────────────────
const voteColor  = (v) => v === 'Bullish' ? 'success' : v === 'Bearish' ? 'error' : 'warning';
const voteIcon   = (v) => v === 'Bullish' ? <TrendingUpIcon sx={{ fontSize: '0.9rem' }} />
                        : v === 'Bearish' ? <TrendingDownIcon sx={{ fontSize: '0.9rem' }} />
                        : <HorizontalRuleIcon sx={{ fontSize: '0.9rem' }} />;

const confColor  = (n) => n >= 80 ? '#089981' : n >= 65 ? '#f9a825' : '#ef5350';

// ─── Confidence Bar ────────────────────────────────────────────────────────────
const ConfBar = ({ label, value }) => (
  <Box sx={{ mb: 1.5 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.7rem' }}>
        {label}
      </Typography>
      <Typography variant="caption" sx={{ color: confColor(value), fontWeight: 800, fontSize: '0.7rem' }}>
        {value}%
      </Typography>
    </Box>
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        height: 5, borderRadius: 3, bgcolor: '#2a2e39',
        '& .MuiLinearProgress-bar': { borderRadius: 3, bgcolor: confColor(value) }
      }}
    />
  </Box>
);

// ─── QUICK QUERIES ─────────────────────────────────────────────────────────────
const QUICK_QUERIES = [
  'Analyze Infosys',
  'Analyze HDFC Bank',
  'Should I buy TCS?',
  'Compare INFY vs TCS',
  'Explain today\'s correction',
  'Find swing opportunities under ₹2000',
  'Should I invest lump sum now?',
  'Analyze Reliance Industries',
];

// ─── Main Research View ────────────────────────────────────────────────────────
export const ResearchView = () => {
  const [query,       setQuery]       = useState('');
  const [running,     setRunning]     = useState(false);
  const [progress,    setProgress]    = useState(null);
  const [result,      setResult]      = useState(null);
  const [activeTab,   setActiveTab]   = useState(0);
  const [expandedAgent, setExpandedAgent] = useState(null);
  const resultRef = useRef(null);

  const handleRun = async (overrideQuery) => {
    const q = overrideQuery || query;
    if (!q.trim() || running) return;
    setRunning(true);
    setResult(null);
    setProgress({ phase: 'start', completed: 0, total: 18 });

    try {
      const analysis = await runMultiAgentAnalysis(q, (prog) => {
        setProgress(prog);
      });
      setResult(analysis);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
    } catch (err) {
      console.error('Multi-agent analysis failed:', err);
    } finally {
      setRunning(false);
      setProgress(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleRun(); }
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* ── Header ── */}
      <Box sx={{ borderLeft: '4px solid #2962ff', pl: 1.5, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
          <AutoAwesomeIcon sx={{ color: '#2962ff', fontSize: '2rem' }} />
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            AI Multi-Agent Research Engine
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          18 autonomous AI agents debate every opportunity from 18 different perspectives — like a full institutional research team.
        </Typography>
      </Box>

      {/* ── Search Box ── */}
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #111524 0%, #161c2e 100%)', border: '1px solid rgba(41,98,255,0.3)', boxShadow: '0 4px 32px rgba(41,98,255,0.1)' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              fullWidth
              placeholder="Try: Analyze TCS, Should I buy Infosys?, Explain today's correction, Find swing opportunities..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={running}
              multiline={false}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />,
                sx: { bgcolor: '#0d1117', borderRadius: 1.5 }
              }}
            />
            <Button
              variant="contained"
              onClick={() => handleRun()}
              disabled={running || !query.trim()}
              startIcon={running ? <CircularProgress size={16} color="inherit" /> : <AutoAwesomeIcon />}
              sx={{
                minWidth: 160, fontWeight: 700, whiteSpace: 'nowrap',
                background: 'linear-gradient(135deg, #2962ff 0%, #0039cb 100%)',
                boxShadow: '0 4px 20px rgba(41,98,255,0.4)',
              }}
            >
              {running ? 'Analyzing...' : 'Run 18 Agents'}
            </Button>
          </Box>

          {/* Quick query chips */}
          <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {QUICK_QUERIES.map((q, i) => (
              <Chip
                key={i} label={q} size="small" clickable
                onClick={() => { setQuery(q); handleRun(q); }}
                disabled={running}
                sx={{
                  bgcolor: 'rgba(41,98,255,0.08)', border: '1px solid rgba(41,98,255,0.2)',
                  color: 'primary.light', fontSize: '0.7rem',
                  '&:hover': { bgcolor: 'rgba(41,98,255,0.15)' }
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* ── Progress Display ── */}
      {running && progress && (
        <Card sx={{ mb: 3, border: '1px solid rgba(41,98,255,0.3)', bgcolor: '#111524' }}>
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <CircularProgress size={20} sx={{ color: '#2962ff' }} />
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.light' }}>
                {progress.phase === 'agents' && `Agent ${progress.completed}/${progress.total}: ${progress.currentAgent} is analyzing...`}
                {progress.phase === 'debate'      && '⚔️ Running Bull vs Bear Debate System...'}
                {progress.phase === 'confidence'  && '📊 Computing 6-dimensional Confidence Scores...'}
                {progress.phase === 'scenarios'   && '🎯 Simulating Bull / Base / Bear Scenarios...'}
                {progress.phase === 'decision'    && '🧠 Decision Engine synthesizing final verdict...'}
                {progress.phase === 'complete'    && '✅ Analysis complete!'}
              </Typography>
            </Box>
            {progress.phase === 'agents' && (
              <LinearProgress
                variant="determinate"
                value={(progress.completed / progress.total) * 100}
                sx={{ height: 6, borderRadius: 3, bgcolor: '#2a2e39', '& .MuiLinearProgress-bar': { bgcolor: '#2962ff' } }}
              />
            )}
            {progress.phase !== 'agents' && (
              <LinearProgress sx={{ height: 6, borderRadius: 3, bgcolor: '#2a2e39', '& .MuiLinearProgress-bar': { bgcolor: '#2962ff' } }} />
            )}
          </CardContent>
        </Card>
      )}

      {/* ── Results ── */}
      {result && (
        <Box ref={resultRef}>
          {/* ── Decision Banner ── */}
          <Paper sx={{
            p: 3, mb: 3,
            background: result.decision.verdictColor === 'success'
              ? 'linear-gradient(135deg, rgba(8,153,129,0.15) 0%, rgba(13,17,29,0.95) 100%)'
              : result.decision.verdictColor === 'error'
              ? 'linear-gradient(135deg, rgba(242,54,69,0.15) 0%, rgba(13,17,29,0.95) 100%)'
              : 'linear-gradient(135deg, rgba(249,168,37,0.12) 0%, rgba(13,17,29,0.95) 100%)',
            border: `1px solid ${result.decision.verdictColor === 'success' ? '#089981' : result.decision.verdictColor === 'error' ? '#ef5350' : '#f9a825'}`,
            borderRadius: 2
          }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Chip
                    label="MASTER DECISION ENGINE"
                    color="primary" size="small"
                    sx={{ fontWeight: 800, fontSize: '0.65rem' }}
                  />
                  <Chip
                    label={`${result.agentOutputs.length} AGENTS CONSENSUS`}
                    color="success" size="small"
                    sx={{ fontWeight: 800, fontSize: '0.65rem' }}
                  />
                  <Chip
                    label={`${result.decision.agentConsensus.bull} BULL / ${result.decision.agentConsensus.bear} BEAR`}
                    variant="outlined" size="small"
                    sx={{ fontWeight: 700, fontSize: '0.65rem', borderColor: '#2a2e39', color: 'text.secondary' }}
                  />
                </Box>
                <Typography variant="h4" sx={{
                  fontWeight: 900, mb: 1,
                  color: result.decision.verdictColor === 'success' ? '#089981' : result.decision.verdictColor === 'error' ? '#ef5350' : '#f9a825'
                }}>
                  {result.decision.finalVerdict}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, maxWidth: '600px' }}>
                  {result.decision.executiveSummary}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, display: 'block', mb: 0.5 }}>
                  ENSEMBLE CONFIDENCE
                </Typography>
                <Typography variant="h2" sx={{ fontWeight: 900, color: confColor(result.confidence.overall) }}>
                  {result.confidence.overall}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={result.confidence.overall}
                  sx={{ height: 8, borderRadius: 4, bgcolor: '#161c2e', mt: 1, '& .MuiLinearProgress-bar': { bgcolor: confColor(result.confidence.overall) } }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* ── Result Tabs ── */}
          <Box sx={{ mb: 2 }}>
            <Tabs
              value={activeTab} onChange={(_, v) => setActiveTab(v)}
              variant="scrollable" scrollButtons="auto"
              sx={{
                '& .MuiTab-root': { fontSize: '0.75rem', fontWeight: 700, minWidth: 'auto', px: 2 },
                '& .MuiTabs-indicator': { bgcolor: '#2962ff' },
                borderBottom: '1px solid #2a2e39',
              }}
            >
              <Tab label="🤖 All 18 Agents" />
              <Tab label="⚔️ Debate" />
              <Tab label="📊 Confidence" />
              <Tab label="🎯 Scenarios" />
              <Tab label="❓ What-If" />
              <Tab label="🧠 Final Verdict" />
            </Tabs>
          </Box>

          {/* ── TAB 0: All Agents ── */}
          {activeTab === 0 && (
            <Grid container spacing={2}>
              {result.agentOutputs.map((agent, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Accordion
                    expanded={expandedAgent === idx}
                    onChange={() => setExpandedAgent(expandedAgent === idx ? null : idx)}
                    sx={{ bgcolor: '#111524', border: '1px solid #2a2e39', '&:before': { display: 'none' }, borderRadius: '8px !important', mb: 0 }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary', fontSize: '1rem' }} />} sx={{ py: 1, px: 2, minHeight: 48 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
                        <Typography sx={{ fontSize: '1.2rem' }}>{agent.agent?.icon}</Typography>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.light', lineHeight: 1.2, fontSize: '0.8rem' }}>
                            {agent.agent?.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem' }}>
                            {agent.agent?.focus?.substring(0, 45)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                          <Chip
                            icon={voteIcon(agent.vote)}
                            label={agent.vote}
                            color={voteColor(agent.vote)}
                            size="small"
                            sx={{ fontSize: '0.6rem', fontWeight: 800, height: 20 }}
                          />
                          <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, color: confColor(agent.confidence) }}>
                            {agent.confidence}%
                          </Typography>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2, pb: 2, pt: 0 }}>
                      <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.78rem', lineHeight: 1.55, mb: 1.5 }}>
                        {agent.summary}
                      </Typography>

                      {/* Evidence */}
                      <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 700, display: 'block', mb: 0.75, fontSize: '0.65rem', letterSpacing: '0.06em' }}>
                        EVIDENCE
                      </Typography>
                      {agent.evidence?.map((ev, i) => (
                        <Box key={i} sx={{ display: 'flex', gap: 0.75, mb: 0.5 }}>
                          <Typography sx={{ color: '#089981', fontSize: '0.65rem', flexShrink: 0 }}>▸</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.68rem', lineHeight: 1.4 }}>{ev}</Typography>
                        </Box>
                      ))}

                      {/* Self Critique */}
                      <Divider sx={{ borderColor: '#2a2e39', my: 1.5 }} />
                      <Box sx={{ p: 1.25, bgcolor: 'rgba(255,168,0,0.06)', borderRadius: 1, borderLeft: '3px solid #f9a825' }}>
                        <Typography variant="caption" sx={{ color: '#f9a825', fontWeight: 700, display: 'block', mb: 0.5, fontSize: '0.65rem' }}>
                          SELF-CRITIQUE
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.68rem', lineHeight: 1.4, fontStyle: 'italic' }}>
                          {agent.selfCritique}
                        </Typography>
                      </Box>

                      {/* Assumptions */}
                      <Box sx={{ mt: 1.5 }}>
                        <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, display: 'block', mb: 0.5, fontSize: '0.65rem' }}>
                          ASSUMPTIONS
                        </Typography>
                        {agent.assumptions?.map((a, i) => (
                          <Typography key={i} variant="caption" sx={{ color: 'text.disabled', display: 'block', fontSize: '0.65rem', mb: 0.3 }}>
                            {i + 1}. {a}
                          </Typography>
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
            </Grid>
          )}

          {/* ── TAB 1: Debate ── */}
          {activeTab === 1 && (
            <Grid container spacing={3}>
              {[
                { data: result.debate.bullCase,    color: '#089981', icon: '🐂', bg: 'rgba(8,153,129,0.06)'  },
                { data: result.debate.bearCase,    color: '#ef5350', icon: '🐻', bg: 'rgba(242,54,69,0.06)'  },
                { data: result.debate.neutralCase, color: '#f9a825', icon: '⚖️', bg: 'rgba(249,168,37,0.06)' },
              ].map(({ data, color, icon, bg }, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card sx={{ height: '100%', border: `1px solid ${color}40`, bgcolor: bg }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Typography sx={{ fontSize: '1.5rem' }}>{icon}</Typography>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 800, color, lineHeight: 1.2 }}>{data.label}</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {data.score}/{data.totalAgents} agents
                          </Typography>
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(data.score / data.totalAgents) * 100}
                        sx={{ height: 6, borderRadius: 3, bgcolor: '#2a2e39', mb: 2, '& .MuiLinearProgress-bar': { bgcolor: color } }}
                      />
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                        {data.summary || 'No agents voted for this case.'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}

              {/* Contradictions */}
              {result.debate.contradictions.length > 0 && (
                <Grid item xs={12}>
                  <Card sx={{ border: '1px solid rgba(255,168,0,0.3)', bgcolor: 'rgba(255,168,0,0.04)' }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <WarningIcon sx={{ color: 'warning.main' }} /> Contradiction Detector
                      </Typography>
                      {result.debate.contradictions.map((c, i) => (
                        <Box key={i} sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', gap: 2, mb: 1, flexWrap: 'wrap' }}>
                            <Chip label={`${c.agentA}: ${c.viewA}`} color="success" size="small" sx={{ fontWeight: 700 }} />
                            <Typography sx={{ color: 'text.disabled', alignSelf: 'center' }}>vs</Typography>
                            <Chip label={`${c.agentB}: ${c.viewB}`} color="error" size="small" sx={{ fontWeight: 700 }} />
                          </Box>
                          <Box sx={{ p: 1.5, bgcolor: '#111524', borderRadius: 1, border: '1px solid #2a2e39', mb: 1 }}>
                            <Typography variant="caption" sx={{ color: 'success.light', display: 'block', mb: 0.5 }}>
                              🐂 {c.agentA}: {c.reasonA}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'error.light', display: 'block' }}>
                              🐻 {c.agentB}: {c.reasonB}
                            </Typography>
                          </Box>
                          <Typography variant="caption" sx={{ color: 'warning.main', fontWeight: 700 }}>
                            → Resolution: {c.resolution}
                          </Typography>
                        </Box>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>
          )}

          {/* ── TAB 2: Confidence ── */}
          {activeTab === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <Card sx={{ border: '1px solid #2a2e39' }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2.5 }}>6-Dimensional Confidence</Typography>
                    <ConfBar label="Technical Analysis"      value={result.confidence.technical} />
                    <ConfBar label="Fundamental Analysis"    value={result.confidence.fundamental} />
                    <ConfBar label="News & Sentiment"        value={result.confidence.news} />
                    <ConfBar label="Institutional Flows"     value={result.confidence.institutional} />
                    <ConfBar label="Macro Economics"         value={result.confidence.macro} />
                    <ConfBar label="Risk Assessment"         value={result.confidence.risk} />
                    <Divider sx={{ my: 2, borderColor: '#2a2e39' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>OVERALL CONFIDENCE</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 900, color: confColor(result.confidence.overall) }}>
                        {result.confidence.overall}%
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={7}>
                <Card sx={{ height: '100%', border: '1px solid #2a2e39' }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Agent Voting Breakdown</Typography>
                    <Grid container spacing={2}>
                      {result.agentOutputs.map((a, i) => (
                        <Grid item xs={6} sm={4} key={i}>
                          <Box sx={{ p: 1.25, bgcolor: '#0d1117', borderRadius: 1, border: '1px solid #2a2e39' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
                              <Typography sx={{ fontSize: '0.9rem' }}>{a.agent?.icon}</Typography>
                              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.62rem' }}>
                                {a.agent?.name?.split(' ')[0]}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Chip label={a.vote} color={voteColor(a.vote)} size="small" sx={{ fontSize: '0.55rem', height: 16, fontWeight: 800 }} />
                              <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, color: confColor(a.confidence) }}>
                                {a.confidence}%
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* ── TAB 3: Scenarios ── */}
          {activeTab === 3 && (
            <Grid container spacing={3}>
              {result.scenarios.map((sc, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card sx={{ height: '100%', border: `1px solid ${i === 0 ? '#089981' : i === 2 ? '#ef5350' : '#f9a825'}40` }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>{sc.label}</Typography>
                        <Chip
                          label={`${sc.probability}% probability`}
                          size="small"
                          color={i === 0 ? 'success' : i === 2 ? 'error' : 'warning'}
                          sx={{ fontWeight: 800, fontSize: '0.65rem' }}
                        />
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={sc.probability}
                        sx={{
                          height: 5, borderRadius: 3, bgcolor: '#2a2e39', mb: 2,
                          '& .MuiLinearProgress-bar': { bgcolor: i === 0 ? '#089981' : i === 2 ? '#ef5350' : '#f9a825' }
                        }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                        Target: {sc.target}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mb: 1.5 }}>
                        Timeline: {sc.timeline}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, display: 'block', mb: 0.75, fontSize: '0.65rem' }}>
                        CATALYSTS
                      </Typography>
                      {sc.catalysts.map((c, j) => (
                        <Box key={j} sx={{ display: 'flex', gap: 0.75, mb: 0.5 }}>
                          <Typography sx={{ color: '#089981', fontSize: '0.65rem', flexShrink: 0 }}>✓</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>{c}</Typography>
                        </Box>
                      ))}
                      <Divider sx={{ my: 1.5, borderColor: '#2a2e39' }} />
                      <Typography variant="caption" sx={{ color: 'error.light', fontWeight: 700, display: 'block', mb: 0.75, fontSize: '0.65rem' }}>
                        RISKS
                      </Typography>
                      {sc.risks.map((r, j) => (
                        <Box key={j} sx={{ display: 'flex', gap: 0.75, mb: 0.5 }}>
                          <Typography sx={{ color: '#ef5350', fontSize: '0.65rem', flexShrink: 0 }}>✗</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>{r}</Typography>
                        </Box>
                      ))}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* ── TAB 4: What-If ── */}
          {activeTab === 4 && (
            <Grid container spacing={2.5}>
              {result.decision.whatIfAnalysis.map((item, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Card sx={{ border: '1px solid #2a2e39', bgcolor: '#111524' }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
                        <Typography sx={{ fontSize: '1.4rem' }}>🔮</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 800, color: 'primary.light', lineHeight: 1.3 }}>
                          {item.scenario}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: '0.825rem' }}>
                        {item.impact}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* ── TAB 5: Final Verdict ── */}
          {activeTab === 5 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <Card sx={{ border: '1px solid #2a2e39', mb: 3 }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PsychologyIcon sx={{ color: 'primary.main' }} /> Decision Rationale
                    </Typography>
                    {result.decision.rationale.map((r, i) => (
                      <Box key={i} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                        <CheckCircleIcon sx={{ color: 'success.main', fontSize: '1rem', flexShrink: 0, mt: '2px' }} />
                        <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.825rem' }}>{r}</Typography>
                      </Box>
                    ))}
                  </CardContent>
                </Card>

                <Card sx={{ border: '1px solid #2a2e39' }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <BoltIcon sx={{ color: 'warning.main' }} /> Entry Strategy
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.65, fontSize: '0.825rem' }}>
                      {result.decision.entryStrategy}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={5}>
                <Card sx={{ border: '1px solid rgba(255,168,0,0.3)', bgcolor: 'rgba(255,168,0,0.04)', mb: 3 }}>
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WarningIcon sx={{ color: 'warning.main' }} /> Alternative View
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontStyle: 'italic', fontSize: '0.825rem' }}>
                      {result.decision.alternativeView}
                    </Typography>
                  </CardContent>
                </Card>

                <Alert severity="warning" sx={{ border: '1px solid rgba(255,168,0,0.3)' }}>
                  <AlertTitle sx={{ fontWeight: 800, fontSize: '0.75rem' }}>SEBI RESEARCH DISCLAIMER</AlertTitle>
                  <Typography variant="caption" sx={{ lineHeight: 1.5 }}>
                    All reports are AI-generated research for educational purposes only. Not SEBI-registered investment advice. Always consult a SEBI-registered advisor. Past AI performance does not guarantee future accuracy. Use stop-losses.
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ResearchView;
