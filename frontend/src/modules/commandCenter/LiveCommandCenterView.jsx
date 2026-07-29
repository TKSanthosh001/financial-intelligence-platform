import React, { useState, useMemo } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Button, Paper, Chip,
  TextField, InputAdornment, IconButton, Divider, Collapse, ButtonGroup, Alert
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendIcon from '@mui/icons-material/Send';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ShieldIcon from '@mui/icons-material/Shield';
import TimelineIcon from '@mui/icons-material/Timeline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import commandCenterEngine from '../../services/commandCenter/CommandCenterEngine';

export const LiveCommandCenterView = () => {
  const [complexity, setComplexity] = useState('SIMPLE'); // SIMPLE, ADVANCED, PROFESSIONAL
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [detailTab, setDetailTab] = useState('tech'); // tech, fin
  const [userQuery, setUserQuery] = useState('');
  const [queryResponse, setQueryResponse] = useState(null);

  const snapshot = useMemo(() => {
    return commandCenterEngine.getCommandCenterState(complexity);
  }, [complexity]);

  const handleSendQuery = (textToQuery) => {
    const q = textToQuery || userQuery;
    if (!q) return;
    const res = commandCenterEngine.processCommand(q);
    setQueryResponse({ query: q, answer: res });
    setUserQuery('');
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* ── Top Command Bar & Adaptive Mode Selector ── */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ borderLeft: '4px solid #2962ff', pl: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <PsychologyIcon sx={{ color: '#2962ff', fontSize: '2.2rem' }} />
            <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
              What Matters Now
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Zero-navigation AI command center. Surfaces only what requires your attention.
          </Typography>
        </Box>

        {/* Adaptive Complexity Level Buttons */}
        <ButtonGroup variant="outlined" size="small">
          <Button
            variant={complexity === 'SIMPLE' ? 'contained' : 'outlined'}
            color="success"
            onClick={() => setComplexity('SIMPLE')}
            sx={{ fontWeight: 800 }}
          >
            🟢 Simple
          </Button>
          <Button
            variant={complexity === 'ADVANCED' ? 'contained' : 'outlined'}
            color="warning"
            onClick={() => setComplexity('ADVANCED')}
            sx={{ fontWeight: 800 }}
          >
            🟡 Advanced
          </Button>
          <Button
            variant={complexity === 'PROFESSIONAL' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setComplexity('PROFESSIONAL')}
            sx={{ fontWeight: 800 }}
          >
            🔴 Professional
          </Button>
        </ButtonGroup>
      </Box>

      {/* ── Always-Visible AI Command Bar ── */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: '#111524', border: '1px solid #2962ff', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <AutoAwesomeIcon sx={{ color: '#2962ff', ml: 1 }} />
          <TextField
            fullWidth
            placeholder="Ask your AI Hedge Fund Analyst... (e.g. 'What changed today?', 'What is my biggest portfolio risk?')"
            variant="standard"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
            InputProps={{ disableUnderline: true, sx: { color: '#f0f3fa', fontSize: '0.9rem', fontWeight: 600 } }}
          />
          <Button variant="contained" endIcon={<SendIcon />} onClick={() => handleSendQuery()} sx={{ fontWeight: 800, px: 3 }}>
            Ask AI
          </Button>
        </Box>

        {/* Preset Prompt Chips */}
        <Box sx={{ display: 'flex', gap: 1, mt: 1.5, flexWrap: 'wrap' }}>
          {[
            'What changed today?',
            'What is my biggest portfolio risk?',
            'Find stocks similar to TCS',
            'Explain today\'s banking rally'
          ].map((prompt, idx) => (
            <Chip
              key={idx}
              label={prompt}
              clickable
              onClick={() => handleSendQuery(prompt)}
              size="small"
              sx={{ fontSize: '0.65rem', bgcolor: '#0d1117', border: '1px solid #2a2e39', color: 'primary.light', fontWeight: 700 }}
            />
          ))}
        </Box>

        {/* Command Response Alert */}
        {queryResponse && (
          <Alert severity="info" onClose={() => setQueryResponse(null)} sx={{ mt: 2, bgcolor: '#0d1117', border: '1px solid #2962ff' }}>
            <Typography variant="caption" sx={{ fontWeight: 900, color: 'primary.light', display: 'block' }}>
              Q: "{queryResponse.query}"
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.primary', mt: 0.5 }}>
              {queryResponse.answer}
            </Typography>
          </Alert>
        )}
      </Paper>

      {/* ── Executive "What Matters Now" Header Card ── */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #0d1117 0%, #161c2e 100%)', border: '1px solid #2a2e39', borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>LIVE MARKET STATUS</Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#089981', mt: 0.5 }}>{snapshot.executiveState.marketStatus}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>PORTFOLIO STATUS</Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#f0f3fa', mt: 0.5 }}>{snapshot.executiveState.portfolioStatus}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>TOP OPPORTUNITY</Typography>
            <Typography variant="h6" sx={{ fontWeight: 900, color: '#2962ff', mt: 0.5 }}>{snapshot.executiveState.topOpportunity}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>AI DIRECTIVE</Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary', display: 'block', mt: 0.5, lineHeight: 1.4 }}>
              "{snapshot.executiveState.aiDirective}"
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Left Column: Smart Priority Cards */}
        <Grid item xs={12} md={7}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <FlashOnIcon sx={{ color: '#f9a825' }} /> Live Smart Priority Cards (Auto-Updating)
          </Typography>

          {snapshot.cards.map((card) => (
            <Card key={card.id} sx={{ mb: 2, border: `1px solid ${card.priority === 'CRITICAL' ? 'rgba(242,54,69,0.4)' : 'rgba(41,98,255,0.4)'}`, bgcolor: '#111524' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 900, color: card.priority === 'CRITICAL' ? 'error.light' : 'primary.light' }}>
                    {card.title}
                  </Typography>
                  <Chip label={card.priority} color={card.priority === 'CRITICAL' ? 'error' : 'primary'} size="small" sx={{ fontWeight: 800, fontSize: '0.6rem' }} />
                </Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mb: 1 }}>
                  {card.subtitle}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.5, mb: 2 }}>
                  {card.summary}
                </Typography>

                {/* Aggressive vs Conservative Entry Info (if Buy Card) */}
                {card.entryZone && (
                  <Paper sx={{ p: 1.5, bgcolor: '#0d1117', border: '1px solid #2a2e39', mb: 2 }}>
                    <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mb: 0.5 }}>ENTRY ZONE & TARGET</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: '#089981' }}>
                      Entry: {card.entryZone} • Target: {card.targetZone}
                    </Typography>
                  </Paper>
                )}

                {/* Recommendation (if Risk Card) */}
                {card.recommendation && (
                  <Paper sx={{ p: 1.5, bgcolor: 'rgba(242,54,69,0.06)', border: '1px solid rgba(242,54,69,0.3)', mb: 2 }}>
                    <Typography variant="caption" sx={{ color: 'error.light', fontWeight: 800, display: 'block' }}>
                      💡 RECOMMENDATION: {card.recommendation}
                    </Typography>
                  </Paper>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button
                    size="small"
                    variant="outlined"
                    endIcon={<ExpandMoreIcon sx={{ transform: expandedCardId === card.id ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />}
                    onClick={() => setExpandedCardId(expandedCardId === card.id ? null : card.id)}
                    sx={{ fontWeight: 800, fontSize: '0.7rem' }}
                  >
                    {expandedCardId === card.id ? 'Hide Details' : 'Deep Insight (Progressive Disclosure)'}
                  </Button>
                  <Button size="small" variant="contained" sx={{ fontWeight: 800, fontSize: '0.7rem' }}>
                    {card.actionLabel}
                  </Button>
                </Box>

                {/* Progressive Disclosure Level 2 & 3 */}
                <Collapse in={expandedCardId === card.id}>
                  <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #2a2e39' }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
                      <Button size="small" variant={detailTab === 'tech' ? 'contained' : 'outlined'} onClick={() => setDetailTab('tech')} sx={{ fontSize: '0.65rem', py: 0.2 }}>
                        Technical Analysis
                      </Button>
                      <Button size="small" variant={detailTab === 'fin' ? 'contained' : 'outlined'} onClick={() => setDetailTab('fin')} sx={{ fontSize: '0.65rem', py: 0.2 }}>
                        Financial & Tax Audit
                      </Button>
                    </Box>

                    {detailTab === 'tech' && (
                      <Paper sx={{ p: 1.5, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                        <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 800, display: 'block', mb: 0.5 }}>TECHNICAL ANALYSIS DETAILS</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{card.techDetails}</Typography>
                      </Paper>
                    )}

                    {detailTab === 'fin' && (
                      <Paper sx={{ p: 1.5, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                        <Typography variant="caption" sx={{ color: '#ab47bc', fontWeight: 800, display: 'block', mb: 0.5 }}>FINANCIAL & TAX AUDIT DETAILS</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{card.finDetails}</Typography>
                      </Paper>
                    )}
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Right Column: Live Chronological Timeline Stream */}
        <Grid item xs={12} md={5}>
          <Card sx={{ border: '1px solid #2a2e39', bgcolor: '#111524' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <TimelineIcon sx={{ color: '#2962ff' }} /> Live Chronological Market Story Timeline
              </Typography>

              {snapshot.timeline.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', gap: 1.5, pb: 2, position: 'relative' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Chip label={item.time} size="small" sx={{ fontSize: '0.6rem', height: 18, bgcolor: '#0d1117', border: '1px solid #2a2e39', fontWeight: 800 }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Paper sx={{ p: 1.5, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                      <Chip label={item.type} color={item.badgeColor} size="small" sx={{ fontSize: '0.55rem', height: 16, mb: 0.5, fontWeight: 800 }} />
                      <Typography variant="caption" sx={{ display: 'block', color: 'text.primary', lineHeight: 1.4 }}>
                        {item.event}
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LiveCommandCenterView;
