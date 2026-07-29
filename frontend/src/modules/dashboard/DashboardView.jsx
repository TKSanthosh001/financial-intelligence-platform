import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Card, CardContent, Typography, ButtonGroup, Button, Paper, Collapse, IconButton, Divider, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SecurityIcon from '@mui/icons-material/Security';
import * as echarts from 'echarts';
import { useMarket } from '../../context/MarketContext';
import FearGreedGauge from '../../components/FearGreedGauge';
import TrendIndicator from '../../components/TrendIndicator';
import { InstitutionalSnapshotCard } from '../../components/InstitutionalSnapshotCard';

export const DashboardView = () => {
  const { 
    marketStatus, 
    morningReport, 
    swingOpportunities, 
    institutionalFlows, 
    loading 
  } = useMarket();

  const [expandedReasoning, setExpandedReasoning] = useState({});
  const flowChartRef = useRef(null);

  const toggleReasoning = (ticker) => {
    setExpandedReasoning(prev => ({
      ...prev,
      [ticker]: !prev[ticker]
    }));
  };

  const getMoodColor = (mood) => {
    if (!mood) return 'default';
    if (mood.toLowerCase().includes('bullish')) return 'success';
    if (mood.toLowerCase().includes('bearish')) return 'error';
    return 'warning';
  };

  // Render Institutional Flows ECharts
  useEffect(() => {
    if (!flowChartRef.current || !institutionalFlows || institutionalFlows.length === 0) return;

    const chartInstance = echarts.init(flowChartRef.current);
    
    // Sort chronological for plotting
    const chronologicalFlows = [...institutionalFlows].reverse();
    const dates = chronologicalFlows.map(f => f.flow_date);
    const fiiNet = chronologicalFlows.map(f => f.fii_net);
    const diiNet = chronologicalFlows.map(f => f.dii_net);

    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#111524',
        borderColor: '#2a2e39',
        textStyle: { color: '#f0f3fa' }
      },
      legend: {
        data: ['FII Net Flow', 'DII Net Flow'],
        textStyle: { color: '#b2b5be' },
        bottom: 0
      },
      grid: {
        top: '10%',
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: { lineStyle: { color: '#2a2e39' } },
        axisLabel: { color: '#b2b5be', fontSize: 10 }
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#2a2e39' } },
        splitLine: { lineStyle: { color: '#161c2e' } },
        axisLabel: { 
          color: '#b2b5be',
          formatter: '{value} Cr'
        }
      },
      series: [
        {
          name: 'FII Net Flow',
          type: 'bar',
          data: fiiNet,
          itemStyle: {
            color: (params) => params.value >= 0 ? '#089981' : '#f23645'
          }
        },
        {
          name: 'DII Net Flow',
          type: 'line',
          data: diiNet,
          smooth: true,
          itemStyle: { color: '#2962ff' },
          lineStyle: { width: 3 }
        }
      ]
    };

    chartInstance.setOption(option);

    const handleResize = () => {
      chartInstance.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.dispose();
    };
  }, [institutionalFlows]);

  if (loading || !marketStatus) return null;

  const indices = marketStatus.indices || [];
  const fearGreed = marketStatus.fearGreed || { value: 50, status: 'Neutral', prevValue: 50, prevStatus: 'Neutral', monthlyValue: 50, monthlyStatus: 'Neutral', aiSummary: '' };

  // Separate indices from commodities
  const indexCards = indices.filter(idx => !['gold', 'silver', 'crude', 'usdinr', 'bitcoin'].includes(idx.id));
  const commodityCards = indices.filter(idx => ['gold', 'silver', 'crude', 'usdinr', 'bitcoin'].includes(idx.id));

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* ── High-Conviction Institutional Market Snapshot ── */}
      <InstitutionalSnapshotCard />

      {/* Dynamic Morning Briefing & Fear/Greed */}
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, borderBottom: '1px solid #2a2e39', pb: 1, flexWrap: 'wrap', gap: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'primary.light', display: 'flex', alignItems: 'center', gap: 1 }}>
                <ShowChartIcon /> {morningReport ? morningReport.title : 'AI Swing Trading Intelligence'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <DateRangeIcon sx={{ fontSize: '0.9rem' }} /> {morningReport ? morningReport.date : ''}
              </Typography>
            </Box>

            {morningReport ? (
              <Box>
                <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.5, mb: 2 }}>
                  {morningReport.marketSummary}
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block', mb: 0.75, letterSpacing: '0.02em' }}>
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
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block', mb: 0.75, letterSpacing: '0.02em' }}>
                      SWING STRATEGY OUTLOOK
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', lineHeight: 1.35, display: 'block' }}>
                      {morningReport.portfolioImpact}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                No active briefing logs loaded.
              </Typography>
            )}
          </Paper>
        </Grid>
        
        {/* Fear & Greed Index */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ pb: 1, flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Market Sentiment</Typography>
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
            </CardContent>
            <Box sx={{ p: 1.5, borderTop: '1px solid #2a2e39', bgcolor: '#111524' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', fontSize: '0.7rem', lineHeight: 1.3 }}>
                <strong>Evidence check:</strong> Volatility Index (India VIX) is low at 13.42, showing steady retail support base.
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Main Swing Setup Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Ranked Swing Trading Opportunities */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                🎯 Top Swing Trading Opportunities
              </Typography>
              <TableContainer component={Box} sx={{ bgcolor: 'transparent' }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ borderBottom: '2px solid #2a2e39' }}>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Ticker</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Swing Score</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Entry Zone</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Target Exit</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Stop Loss</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>Period</TableCell>
                      <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 700 }}>Reasoning</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {swingOpportunities.length > 0 ? (
                      swingOpportunities.map((op) => (
                        <React.Fragment key={op.ticker}>
                          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, borderBottom: '1px solid #161c2e' }}>
                            <TableCell component="th" scope="row">
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.light' }}>{op.ticker}</Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.65rem' }}>{op.company}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={`${op.swing_score}/100`} 
                                color={op.swing_score >= 80 ? 'success' : 'primary'} 
                                size="small" 
                                sx={{ fontWeight: 700, height: 20, fontSize: '0.7rem' }} 
                              />
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.8rem', fontWeight: 600 }}>{op.entry_zone}</TableCell>
                            <TableCell sx={{ fontSize: '0.8rem', color: 'success.main', fontWeight: 600 }}>{op.exit_zone}</TableCell>
                            <TableCell sx={{ fontSize: '0.8rem', color: 'error.light', fontWeight: 600 }}>{op.stop_loss}</TableCell>
                            <TableCell sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{op.holding_period}</TableCell>
                            <TableCell align="right">
                              <IconButton size="small" onClick={() => toggleReasoning(op.ticker)} sx={{ color: 'primary.light' }}>
                                {expandedReasoning[op.ticker] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                              </IconButton>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}>
                              <Collapse in={expandedReasoning[op.ticker]} timeout="auto" unmountOnExit>
                                <Box sx={{ p: 2, my: 1, bgcolor: '#111524', borderRadius: 1.5, borderLeft: '3px solid #2962ff' }}>
                                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.8rem' }}>
                                    <InfoOutlinedIcon sx={{ fontSize: '1rem', color: 'primary.light' }} /> AI Technical Evidence Reasoning:
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.4 }}>
                                    {op.reasoning}
                                  </Typography>
                                  <Box sx={{ display: 'flex', gap: 2, mt: 1.5, flexWrap: 'wrap' }}>
                                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>Risk Score: <strong>{op.risk_score}/100</strong></Typography>
                                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>Momentum: <strong>{op.momentum_score}/100</strong></Typography>
                                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>Volume Score: <strong>{op.volume_score}/100</strong></Typography>
                                    <Typography variant="caption" sx={{ color: 'text.disabled' }}>Confidence: <strong>{op.confidence}</strong></Typography>
                                  </Box>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                          No ranked swing candidates generated yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Sector Momentum Rotation list */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                ⚡ Sector Rotation Rankings
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Paper sx={{ p: 1.5, bgcolor: '#111524', border: '1px solid #2a2e39', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>1. Nifty Auto</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Flows: High • Sentiment: Bullish</Typography>
                  </Box>
                  <TrendIndicator change="+2.10%" trend="up" />
                </Paper>
                <Paper sx={{ p: 1.5, bgcolor: '#111524', border: '1px solid #2a2e39', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>2. Nifty IT</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Flows: High • Sentiment: Bullish</Typography>
                  </Box>
                  <TrendIndicator change="+1.85%" trend="up" />
                </Paper>
                <Paper sx={{ p: 1.5, bgcolor: '#111524', border: '1px solid #2a2e39', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>3. Nifty Bank</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Flows: Med • Sentiment: Neutral</Typography>
                  </Box>
                  <TrendIndicator change="+1.20%" trend="up" />
                </Paper>
                <Paper sx={{ p: 1.5, bgcolor: '#111524', border: '1px solid #2a2e39', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>4. Nifty FMCG</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Flows: Low • Sentiment: Neutral</Typography>
                  </Box>
                  <TrendIndicator change="-0.45%" trend="down" />
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Institutional FII/DII Chart & Macro Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* FII DII Net Flow Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                🏛️ Daily FII vs DII Net Trading Flow
              </Typography>
              <Box ref={flowChartRef} sx={{ width: '100%', height: 260 }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Macro Dash & Global Markets */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                🌍 Macro & Geopolitical Benchmarks
              </Typography>
              <TableContainer component={Box} sx={{ bgcolor: 'transparent' }}>
                <Table size="small">
                  <TableBody>
                    {commodityCards.map((c) => (
                      <TableRow key={c.id} sx={{ borderBottom: '1px solid #161c2e' }}>
                        <TableCell sx={{ pl: 0, fontWeight: 700, fontSize: '0.8rem' }}>{c.name}</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: '0.8rem' }}>{c.price}</TableCell>
                        <TableCell align="right" sx={{ pr: 0 }}>
                          <TrendIndicator change={c.change} trend={c.trend} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Grid of indices */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, fontSize: '1.25rem', borderLeft: '4px solid #2962ff', pl: 1.5 }}>
        Key Index Benchmarks
      </Typography>
      <Grid container spacing={3}>
        {indexCards.map((idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ p: 2, flexGrow: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                  {idx.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 1, mb: 1.5 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                    {idx.price}
                  </Typography>
                  <TrendIndicator change={idx.change} trend={idx.trend} />
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.35 }}>
                  {idx.aiSummary}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardView;
