import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, ButtonGroup, Button, Paper, Collapse, IconButton, Divider } from '@mui/material';
import { useMarket } from '../../context/MarketContext';
import EChartsTrend from '../../components/EChartsTrend';
import FearGreedGauge from '../../components/FearGreedGauge';
import TrendIndicator from '../../components/TrendIndicator';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const DashboardView = () => {
  const { marketStatus, morningReport, loading } = useMarket();
  
  // Track active trend tab ('daily', 'weekly', 'monthly') for each index
  const [activeTabs, setActiveTabs] = useState({});
  // Track expanded AI summaries for each card
  const [expandedSummaries, setExpandedSummaries] = useState({});

  if (loading || !marketStatus) return null;

  const handleTabChange = (indexId, tab) => {
    setActiveTabs(prev => ({
      ...prev,
      [indexId]: tab
    }));
  };

  const toggleSummary = (indexId) => {
    setExpandedSummaries(prev => ({
      ...prev,
      [indexId]: !prev[indexId]
    }));
  };

  const getTrendData = (index, tab) => {
    switch (tab) {
      case 'weekly':
        return index.weeklyTrend;
      case 'monthly':
        return index.monthlyTrend;
      case 'daily':
      default:
        return index.dailyTrend;
    }
  };

  const { indices, fearGreed } = marketStatus;

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Header section with Morning Report and Fear & Greed Index */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper 
            sx={{ 
              p: 3, 
              background: 'linear-gradient(135deg, #111524 0%, #161c2e 100%)', 
              border: '1px solid #2a2e39',
              borderRadius: 2,
              height: '100%'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, borderBottom: '1px solid #2a2e39', pb: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'primary.light' }}>
                {morningReport ? morningReport.title : 'AI Daily Briefing'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 600 }}>
                {morningReport ? morningReport.date : ''}
              </Typography>
            </Box>

            {morningReport ? (
              <Box>
                <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.45, mb: 2 }}>
                  {morningReport.marketSummary}
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 0.75, letterSpacing: '0.02em' }}>
                      KEY EVENTS TODAY
                    </Typography>
                    {morningReport.importantEvents.map((evt, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                        <Chip 
                          label={evt.impact} 
                          color={evt.impact === 'High' ? 'error' : 'warning'} 
                          size="small" 
                          sx={{ fontSize: '0.55rem', height: 16, px: 0.5, fontWeight: 800 }} 
                        />
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', lineHeight: 1.3 }}>
                          {evt.event}
                        </Typography>
                      </Box>
                    ))}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 0.75, letterSpacing: '0.02em' }}>
                      PORTFOLIO IMPACT OUTLOOK
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', lineHeight: 1.35, display: 'block' }}>
                      {morningReport.portfolioImpact}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ borderColor: '#2a2e39', my: 1.5 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: 'error.light', fontWeight: 700, display: 'block', mb: 0.25 }}>
                      TODAY'S RISK ASSESSMENT
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', lineHeight: 1.3 }}>
                      {morningReport.todayRisks}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ color: 'success.light', fontWeight: 700, display: 'block', mb: 0.25 }}>
                      TODAY'S ACTIONABLE OPPORTUNITIES
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', lineHeight: 1.3 }}>
                      {morningReport.todayOpportunities}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                No morning report generated. Perform sync or check database status.
              </Typography>
            )}
          </Paper>
        </Grid>
        
        {/* Fear & Greed Index */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ pb: 1, flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Fear & Greed Index</Typography>
                <Chip 
                  label={fearGreed.status} 
                  color={
                    fearGreed.status.includes('Greed') ? 'success' : 
                    fearGreed.status.includes('Fear') ? 'error' : 'default'
                  }
                  size="small" 
                  sx={{ fontWeight: 700 }}
                />
              </Box>
              <FearGreedGauge value={fearGreed.value} />
              <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', textAlign: 'center', mt: 1 }}>
                Prev Close: {fearGreed.prevValue} ({fearGreed.prevStatus}) • 1 Month Ago: {fearGreed.monthlyValue} ({fearGreed.monthlyStatus})
              </Typography>
            </CardContent>
            <Box sx={{ p: 2, borderTop: '1px solid #2a2e39', bgcolor: '#111524' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', fontSize: '0.75rem', lineHeight: 1.3 }}>
                <strong>AI Assessment:</strong> {fearGreed.aiSummary}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Grid of indices */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, fontSize: '1.25rem', borderLeft: '4px solid #2962ff', pl: 1.5 }}>
        Indices & Commodities
      </Typography>

      <Grid container spacing={3}>
        {indices.map((idx) => {
          const tab = activeTabs[idx.id] || 'daily';
          const trendData = getTrendData(idx, tab);
          const isExpanded = expandedSummaries[idx.id] || false;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={idx.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <CardContent sx={{ p: 2, flexGrow: 1 }}>
                  {/* Title & Info */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        {idx.name}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.25, letterSpacing: '-0.02em' }}>
                        {idx.price}
                      </Typography>
                    </Box>
                    <TrendIndicator value={idx.change} pctValue={idx.pctChange} trend={idx.trend} />
                  </Box>

                  {/* Sparkline & Time Toggles */}
                  <Box sx={{ mt: 2, mb: 1 }}>
                    <EChartsTrend data={trendData} trend={idx.trend} height={60} />
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                    <ButtonGroup size="small" variant="text" sx={{ border: '1px solid #2a2e39', borderRadius: 1, p: 0.25 }}>
                      {['daily', 'weekly', 'monthly'].map((t) => (
                        <Button 
                          key={t}
                          onClick={() => handleTabChange(idx.id, t)}
                          sx={{ 
                            fontSize: '0.65rem', 
                            py: 0.2, 
                            px: 1,
                            minWidth: 32,
                            color: tab === t ? '#ffffff' : 'text.disabled',
                            bgcolor: tab === t ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' }
                          }}
                        >
                          {t[0].toUpperCase()}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Box>
                </CardContent>

                {/* AI Summary Section */}
                <Box 
                  sx={{ 
                    borderTop: '1px solid #2a2e39', 
                    bgcolor: isExpanded ? 'rgba(41, 98, 255, 0.03)' : '#111524',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Box 
                    onClick={() => toggleSummary(idx.id)}
                    sx={{ 
                      p: 1.5, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.02)' }
                    }}
                  >
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600, fontSize: '0.75rem', color: 'text.secondary' }}>
                      <InfoOutlinedIcon sx={{ fontSize: '0.9rem', color: 'primary.main' }} />
                      AI Intelligence Summary
                    </Typography>
                    {isExpanded ? <KeyboardArrowUpIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} /> : <KeyboardArrowDownIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />}
                  </Box>
                  <Collapse in={isExpanded}>
                    <Box sx={{ px: 2, pb: 2, pt: 0 }}>
                      <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'text.secondary', lineHeight: 1.45 }}>
                        {idx.aiSummary}
                      </Typography>
                    </Box>
                  </Collapse>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

// Simple Chip helper inside file
const Chip = ({ label, color, size, variant, sx }) => {
  let bgcolor = 'transparent';
  let border = '1px solid #2a2e39';
  let textColor = '#b2b5be';

  if (color === 'success') {
    bgcolor = 'rgba(8, 153, 129, 0.1)';
    border = '1px solid #089981';
    textColor = '#089981';
  } else if (color === 'primary') {
    bgcolor = 'rgba(41, 98, 255, 0.1)';
    border = '1px solid #2962ff';
    textColor = '#2962ff';
  } else if (color === 'error') {
    bgcolor = 'rgba(242, 54, 69, 0.1)';
    border = '1px solid #f23645';
    textColor = '#f23645';
  }

  return (
    <Box sx={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      px: 1.2, 
      py: 0.4, 
      borderRadius: 1, 
      bgcolor, 
      border, 
      color: textColor,
      fontSize: '0.7rem',
      fontWeight: sx?.fontWeight || 500,
      ...sx 
    }}>
      {label}
    </Box>
  );
};

export default DashboardView;
