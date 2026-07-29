import React, { useState } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Chip, LinearProgress, Paper,
  Accordion, AccordionSummary, AccordionDetails, Divider, Button, TextField, InputAdornment
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArticleIcon from '@mui/icons-material/Article';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import RefreshIcon from '@mui/icons-material/Refresh';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SearchIcon from '@mui/icons-material/Search';
import { useMarket } from '../../context/MarketContext';

const DEFAULT_LIVE_NEWS_DESK = [
  {
    id: 'news-1',
    type: 'BANKING & FIN',
    source: 'CNBC-TV18 / Exchange Filings',
    time: '2 mins ago',
    title: 'HDFC Bank Credit Growth Surges 16.8% YoY; FIIs Inject ₹4,200 Cr Cash',
    summary: 'HDFC Bank reported stronger-than-expected deposit expansion and asset quality resilience, triggering massive institutional buying across private banking heavyweights.',
    impact: 'positive',
    affectedStocks: ['HDFCBANK', 'ICICIBANK', 'NIFTYBANK'],
    aiAnalysis: {
      model: 'NVIDIA NIM Llama-3 70B Financial',
      confidence: 94,
      urgency: 'HIGH',
      sentimentScore: '+0.88 (Strong Bullish)',
      summaryReason: 'FII cash buying in private banks provides structural floor for Bank Nifty above 56,500 level.',
      action: 'BUY / ACCUMULATE HDFC Bank in ₹2058-2065 entry zone.',
      target: '₹2175'
    }
  },
  {
    id: 'news-2',
    type: 'IT & TECH',
    source: 'Bloomberg / Reuters',
    time: '15 mins ago',
    title: 'TCS Signs $1.2 Billion Multi-Year AI & Cloud Transformation Deal in Europe',
    summary: 'Tata Consultancy Services announced a major enterprise cloud migration contract, expanding its European market share despite currency volatility.',
    impact: 'positive',
    affectedStocks: ['TCS', 'INFY', 'WIPRO'],
    aiAnalysis: {
      model: 'NVIDIA NIM Llama-3 70B Financial',
      confidence: 92,
      urgency: 'HIGH',
      sentimentScore: '+0.82 (Bullish)',
      summaryReason: 'Breakout above ₹3,785 resistance confirmed on 3.5x volume surge.',
      action: 'BUY CANDIDATE: Target ₹4020 with stop loss at ₹3690.',
      target: '₹4020'
    }
  },
  {
    id: 'news-3',
    type: 'MACRO & RBI',
    source: 'Reserve Bank of India Bulletin',
    time: '32 mins ago',
    title: 'RBI Keeps Repo Rate Unchanged at 6.50%; Projects FY27 Real GDP Growth at 7.2%',
    summary: 'The Monetary Policy Committee maintained its accommodative rate pause, highlighting benign inflation pressures and sustained industrial capex momentum.',
    impact: 'positive',
    affectedStocks: ['NIFTY', 'BANKNIFTY', 'REALTY'],
    aiAnalysis: {
      model: 'NVIDIA NIM Llama-3 70B Financial',
      confidence: 90,
      urgency: 'MEDIUM',
      sentimentScore: '+0.75 (Favorable Macro)',
      summaryReason: 'Interest rate stability favors rate-sensitive financial, auto, and real estate sectors.',
      action: 'HOLD core equity positions; maintain low cash allocation.',
      target: 'Nifty 24,200 Target'
    }
  },
  {
    id: 'news-4',
    type: 'GLOBAL & OIL',
    source: 'Financial Times / OPEC+',
    time: '1 hour ago',
    title: 'Brent Crude Stabilizes near $84/bbl; US Federal Reserve Signals Data-Dependent Stance',
    summary: 'Global crude oil prices held steady following inventory drawdown reports, easing inflation expectations for Asian net oil importers.',
    impact: 'neutral',
    affectedStocks: ['RELIANCE', 'BPCL', 'IOC'],
    aiAnalysis: {
      model: 'NVIDIA NIM Llama-3 70B Financial',
      confidence: 85,
      urgency: 'LOW',
      sentimentScore: '0.00 (Neutral)',
      summaryReason: 'Oil stability prevents margin compression in refining & aviation industries.',
      action: 'HOLD Reliance & IOC.',
      target: 'N/A'
    }
  }
];

export const NewsView = () => {
  const { news: contextNews, loading } = useMarket();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState({ 'news-1': true }); // Expand first card by default
  const [isRefreshing, setIsRefreshing] = useState(false);

  const displayNews = (contextNews && contextNews.length > 0) ? contextNews : DEFAULT_LIVE_NEWS_DESK;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  const handleExpansionChange = (panelId) => {
    setExpanded(prev => ({
      ...prev,
      [panelId]: !prev[panelId]
    }));
  };

  const filteredNews = displayNews.filter(item => {
    const matchesCat = selectedCategory === 'ALL' || item.type?.toUpperCase().includes(selectedCategory);
    const matchesQuery = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Header Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ borderLeft: '4px solid #2962ff', pl: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <AutoAwesomeIcon sx={{ color: '#2962ff', fontSize: '2rem' }} />
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
              AI Real-Time News Intelligence Desk
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Continuous market-moving news processing with NVIDIA NIM Llama-3 impact analysis & stock targets.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<RefreshIcon sx={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />}
          onClick={handleRefresh}
          sx={{ fontWeight: 800 }}
        >
          {isRefreshing ? 'Fetching Stream...' : 'Refresh Live Feeds'}
        </Button>
      </Box>

      {/* Category Filter Chips & Search Bar */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: '#111524', border: '1px solid #2a2e39', borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {['ALL', 'BANKING', 'IT', 'MACRO', 'GLOBAL'].map(cat => (
                <Chip
                  key={cat}
                  label={cat === 'ALL' ? 'All Live News' : cat}
                  clickable
                  color={selectedCategory === cat ? 'primary' : 'default'}
                  onClick={() => setSelectedCategory(cat)}
                  sx={{ fontWeight: 800, fontSize: '0.7rem' }}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search news or ticker (e.g. HDFC Bank, TCS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: 'text.secondary' }} /></InputAdornment>,
                sx: { bgcolor: '#0d1117', fontSize: '0.8rem' }
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* News Cards Feed */}
      <Grid container spacing={3}>
        {filteredNews.map((item) => {
          const isPanelExpanded = expanded[item.id] || false;
          const ai = item.aiAnalysis || {};

          return (
            <Grid item xs={12} key={item.id}>
              <Card sx={{ border: '1px solid #2a2e39', transition: 'border-color 0.2s', '&:hover': { borderColor: 'primary.main' } }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip label={item.type} size="small" color="primary" sx={{ fontWeight: 800, fontSize: '0.65rem', height: 20 }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        {item.source}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700 }}>
                      {item.time}
                    </Typography>
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 800, mb: 1.5, lineHeight: 1.35, color: '#f0f3fa', cursor: 'pointer', '&:hover': { color: 'primary.light' } }}
                    onClick={() => handleExpansionChange(item.id)}
                  >
                    {item.title}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontSize: '0.85rem', lineHeight: 1.6 }}>
                    {item.summary}
                  </Typography>

                  {/* Affected Stock Badges */}
                  {item.affectedStocks && (
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 800, mt: '2px' }}>AFFECTED STOCKS:</Typography>
                      {item.affectedStocks.map((stk, idx) => (
                        <Chip key={idx} label={stk} size="small" sx={{ fontSize: '0.65rem', height: 18, bgcolor: 'rgba(41,98,255,0.15)', color: 'primary.light', fontWeight: 800 }} />
                      ))}
                    </Box>
                  )}

                  <Divider sx={{ borderColor: '#2a2e39', my: 1.5 }} />

                  {/* NVIDIA AI Analysis Accordion */}
                  <Accordion
                    expanded={isPanelExpanded}
                    onChange={() => handleExpansionChange(item.id)}
                    sx={{
                      bgcolor: '#111524',
                      backgroundImage: 'none',
                      border: '1px solid #2a2e39',
                      borderRadius: '6px !important',
                      '&:before': { display: 'none' }
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />} sx={{ minHeight: 44, px: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ArticleIcon sx={{ color: 'primary.main', fontSize: '1.1rem' }} />
                        <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.05em', color: 'primary.light' }}>
                          NVIDIA NIM FINANCIAL MODEL ANALYSIS
                        </Typography>
                        {ai.confidence && (
                          <Chip label={`${ai.confidence}% AI Confidence`} color="success" size="small" sx={{ fontSize: '0.6rem', height: 18, ml: 1, fontWeight: 800 }} />
                        )}
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2, pb: 2, borderTop: '1px solid #2a2e39' }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>SENTIMENT IMPACT</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: item.impact === 'positive' ? '#089981' : item.impact === 'negative' ? '#ef5350' : 'warning.main', mt: 0.25 }}>
                            {ai.sentimentScore || (item.impact === 'positive' ? 'Bullish' : 'Bearish')}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>RECOMMENDED ACTION</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.light', mt: 0.25 }}>
                            {ai.action || 'Monitor position'}
                          </Typography>
                        </Grid>
                      </Grid>
                      {ai.summaryReason && (
                        <Paper sx={{ p: 1.5, mt: 1.5, bgcolor: '#0d1117', border: '1px solid #2a2e39' }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.4 }}>
                            {ai.summaryReason}
                          </Typography>
                        </Paper>
                      )}
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
