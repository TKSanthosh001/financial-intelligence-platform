import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Chip, LinearProgress, Paper, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArticleIcon from '@mui/icons-material/Article';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { useMarket } from '../../context/MarketContext';

export const NewsView = () => {
  const { news, loading } = useMarket();
  const [expanded, setExpanded] = useState({});

  if (loading || !news) return null;

  const handleExpansionChange = (panelId) => {
    setExpanded(prev => ({
      ...prev,
      [panelId]: !prev[panelId]
    }));
  };

  const getImpactColor = (impact) => {
    if (impact === 'positive') return 'success';
    if (impact === 'negative') return 'error';
    return 'default';
  };

  const getImpactIcon = (impact) => {
    if (impact === 'positive') return <ArrowDropUpIcon sx={{ color: 'success.main' }} />;
    if (impact === 'negative') return <ArrowDropDownIcon sx={{ color: 'error.main' }} />;
    return <HorizontalRuleIcon sx={{ color: 'text.secondary', fontSize: '0.9rem' }} />;
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-out' }}>
      <Box sx={{ borderLeft: '4px solid #2962ff', pl: 1.5, mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
          AI-Analyzed News Desk
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Real-time news processing using NVIDIA NIM model analysis on market-moving events.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {news.map((item) => {
          const isPanelExpanded = expanded[item.id] || false;
          const { aiAnalysis } = item;

          return (
            <Grid item xs={12} key={item.id}>
              <Card sx={{ border: '1px solid #2a2e39', transition: 'border-color 0.2s', '&:hover': { borderColor: 'primary.main' } }}>
                <CardContent sx={{ p: 2.5 }}>
                  {/* Category, source, and time */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip label={item.type} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600, fontSize: '0.65rem', height: 20 }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        {item.source}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                      {item.time}
                    </Typography>
                  </Box>

                  {/* Headline */}
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5, lineHeight: 1.35, color: '#f0f3fa', cursor: 'pointer', '&:hover': { color: 'primary.light' } }} onClick={() => handleExpansionChange(item.id)}>
                    {item.title}
                  </Typography>

                  {/* Summary paragraph */}
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, fontSize: '0.875rem' }}>
                    {item.summary}
                  </Typography>

                  <Divider sx={{ borderColor: '#2a2e39', my: 2 }} />

                  {/* NVIDIA AI analysis section */}
                  <Accordion 
                    expanded={isPanelExpanded} 
                    onChange={() => handleExpansionChange(item.id)}
                    sx={{ 
                      bgcolor: '#111524', 
                      backgroundImage: 'none', 
                      border: '1px solid #2a2e39', 
                      borderRadius: '4px !important',
                      '&:before': { display: 'none' }
                    }}
                  >
                    <AccordionSummary 
                      expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
                      sx={{ minHeight: 48, px: 2 }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ArticleIcon sx={{ color: 'primary.main', fontSize: '1.1rem' }} />
                        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.05em', color: 'primary.light' }}>
                          NVIDIA NIM INTELLIGENCE REPORT
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2, pb: 2.5, pt: 0 }}>
                      <Grid container spacing={2.5}>
                        {/* What happened & Why it matters */}
                        <Grid item xs={12} md={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary', mb: 0.5, letterSpacing: '0.02em' }}>
                              WHAT HAPPENED
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.8rem', lineHeight: 1.45 }}>
                              {aiAnalysis.whatHappened}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="h6" sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary', mb: 0.5, letterSpacing: '0.02em' }}>
                              WHY IT MATTERS
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.8rem', lineHeight: 1.45 }}>
                              {aiAnalysis.whyItMatters}
                            </Typography>
                          </Box>
                        </Grid>

                        {/* Sectors affected */}
                        <Grid item xs={12} md={6}>
                          <Typography variant="h6" sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary', mb: 1, letterSpacing: '0.02em' }}>
                            SECTORS AFFECTED
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {aiAnalysis.sectorsAffected.map((sec, i) => (
                              <Paper key={i} sx={{ p: 1.2, bgcolor: '#0c101b', border: '1px solid #2a2e39', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  {getImpactIcon(sec.impact)}
                                </Box>
                                <Box sx={{ flexGrow: 1 }}>
                                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#f0f3fa' }}>
                                    {sec.name} 
                                    <Chip 
                                      label={sec.impact.toUpperCase()} 
                                      size="small" 
                                      color={getImpactColor(sec.impact)}
                                      variant="outlined" 
                                      sx={{ ml: 1, fontSize: '0.55rem', height: 16, px: 0.5, fontWeight: 700 }} 
                                    />
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.25, fontSize: '0.7rem' }}>
                                    {sec.reason}
                                  </Typography>
                                </Box>
                              </Paper>
                            ))}
                          </Box>
                        </Grid>

                        <Grid item xs={12}>
                          <Divider sx={{ borderColor: '#2a2e39', my: 1 }} />
                        </Grid>

                        {/* Short/Long term outlook & Confidence */}
                        <Grid item xs={12} md={4}>
                          <Typography variant="h6" sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary', mb: 0.5, letterSpacing: '0.02em' }}>
                            SHORT-TERM OUTLOOK
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.8rem', lineHeight: 1.4 }}>
                            {aiAnalysis.shortTermImpact}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <Typography variant="h6" sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary', mb: 0.5, letterSpacing: '0.02em' }}>
                            LONG-TERM OUTLOOK
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.primary', fontSize: '0.8rem', lineHeight: 1.4 }}>
                            {aiAnalysis.longTermImpact}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} md={4}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                            <Typography variant="h6" sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.secondary', letterSpacing: '0.02em' }}>
                              MODEL CONFIDENCE SCORE
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.8rem', color: 'primary.light' }}>
                              {aiAnalysis.confidenceScore}%
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={aiAnalysis.confidenceScore} 
                            sx={{ 
                              height: 6, 
                              borderRadius: 3, 
                              bgcolor: '#0c101b',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 3,
                                bgcolor: 'primary.main'
                              }
                            }} 
                          />
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default NewsView;
