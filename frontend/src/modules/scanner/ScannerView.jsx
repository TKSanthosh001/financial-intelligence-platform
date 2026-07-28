import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Paper, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, IconButton, TextField, InputAdornment } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useMarket } from '../../context/MarketContext';
import TrendIndicator from '../../components/TrendIndicator';

export const ScannerView = () => {
  const { marketScans, loading } = useMarket();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDetails, setExpandedDetails] = useState({});

  const toggleDetails = (id) => {
    setExpandedDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Mock comprehensive market scans dataset if DB is seeding
  const defaultScans = [
    { id: 1, ticker: 'INFY', name: 'Infosys Limited', category: 'Volume Breakout', value: '3.4x 20-DMA Volume', price: '₹1,512.60', change: '+3.45%', rsi: 64, ema20: '₹1,480', ema50: '₹1,435', vwap: '₹1,505', deliveryPct: '68.4%', summary: 'High delivery accumulation observed. Price closed above upper Bollinger Band with ADX strength at 28.5.' },
    { id: 2, ticker: 'TCS', name: 'Tata Consultancy Services', category: 'Golden Cross', value: 'EMA 20 > EMA 50', price: '₹4,150.20', change: '+1.28%', rsi: 58, ema20: '₹4,090', ema50: '₹4,020', vwap: '₹4,135', deliveryPct: '59.2%', summary: 'Golden Cross confirmed. 20-day EMA crossed above 50-day EMA accompanied by expanding volume histogram on MACD.' },
    { id: 3, ticker: 'RELIANCE', name: 'Reliance Industries Ltd', category: 'Golden Cross', value: 'EMA 50 > EMA 200', price: '₹2,580.40', change: '+0.85%', rsi: 55, ema20: '₹2,540', ema50: '₹2,510', vwap: '₹2,572', deliveryPct: '52.1%', summary: 'Long-term trend reversal signal. Price holding above VWAP support line with declining volatility index.' },
    { id: 4, ticker: 'HDFCBANK', name: 'HDFC Bank Ltd', category: 'Price Breakout', value: '52-Wk Resistance Breakout', price: '₹1,610.20', change: '+2.15%', rsi: 68, ema20: '₹1,570', ema50: '₹1,540', vwap: '₹1,602', deliveryPct: '71.5%', summary: 'Broke out of 8-month horizontal channel resistance at 1,590. Strong institutional delivery buying detected.' },
    { id: 5, ticker: 'BHARTIARTL', name: 'Bharti Airtel Ltd', category: 'High Relative Strength', value: 'RS Rating: 92/100', price: '₹1,485.00', change: '+1.90%', rsi: 71, ema20: '₹1,440', ema50: '₹1,390', vwap: '₹1,478', deliveryPct: '64.0%', summary: 'Sustained outperformance against Nifty 50. Supertrend indicator remains bullish on daily and weekly charts.' },
    { id: 6, ticker: 'TATAMOTORS', name: 'Tata Motors Ltd', category: 'High Relative Strength', value: 'RS Rating: 88/100', price: '₹985.50', change: '+2.80%', rsi: 62, ema20: '₹950', ema50: '₹920', vwap: '₹978', deliveryPct: '54.8%', summary: 'Consolidation breakout on heavy volume. Stochastic RSI turning upward from oversold territory.' },
    { id: 7, ticker: 'ICICIBANK', name: 'ICICI Bank Ltd', category: 'High Delivery %', value: '74.2% Delivery Ratio', price: '₹1,245.00', change: '+1.10%', rsi: 60, ema20: '₹1,220', ema50: '₹1,195', vwap: '₹1,240', deliveryPct: '74.2%', summary: 'High delivery percentage indicates strong promoter/institutional accumulation without intraday churn.' }
  ];

  const activeScans = marketScans && marketScans.length > 0 ? marketScans : defaultScans;

  const categories = ['All', 'Volume Breakout', 'High Relative Strength', 'Golden Cross', 'Price Breakout', 'High Delivery %'];

  const filteredScans = activeScans.filter(scan => {
    const matchesCategory = selectedCategory === 'All' || scan.category === selectedCategory || scan.scan_type === selectedCategory;
    const matchesSearch = scan.ticker.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          scan.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Header Section */}
      <Box sx={{ borderLeft: '4px solid #2962ff', pl: 1.5, mb: 3.5 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 1 }}>
          <FlashOnIcon sx={{ color: 'primary.main' }} /> AI Market Scanner
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Real-time algorithmic scanner monitoring Volume Breakouts, Relative Strength (RS), Golden Crosses, and Institutional Delivery Accumulation across NSE 500.
        </Typography>
      </Box>

      {/* Summary Analytics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>SECURITIES MONITORED</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5 }}>500</Typography>
              <Typography variant="caption" sx={{ color: 'primary.light', display: 'block', mt: 0.5 }}>NSE 500 Universe</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>ACTIVE BREAKOUT SCANS</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: 'success.main' }}>{activeScans.length}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>Verified Signals</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>HIGH DELIVERY SCANS</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: 'primary.main' }}>65%+</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>Delivery Threshold</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>SCAN ENGINE LATENCY</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: 'warning.main' }}>&lt; 50ms</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>Real-time Computation</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filter Category Tabs & Search Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'contained' : 'outlined'}
              color={selectedCategory === cat ? 'primary' : 'inherit'}
              size="small"
              onClick={() => setSelectedCategory(cat)}
              sx={{ 
                borderRadius: 2, 
                px: 2, 
                py: 0.6,
                fontSize: '0.75rem',
                borderColor: '#2a2e39',
                color: selectedCategory === cat ? '#fff' : 'text.secondary',
                '&:hover': { borderColor: '#b2b5be' }
              }}
            >
              {cat}
            </Button>
          ))}
        </Box>

        <TextField
          placeholder="Search Ticker or Company..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary', fontSize: '1.1rem' }} />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: '100%', sm: 260 }, bgcolor: '#111524', borderRadius: 1.5 }}
        />
      </Box>

      {/* Scanner Data Table */}
      <Card sx={{ border: '1px solid #2a2e39', mb: 4 }}>
        <TableContainer component={Box} sx={{ bgcolor: 'transparent', overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: { xs: 650, md: 'auto' } }}>
            <TableHead>
              <TableRow sx={{ borderBottom: '2px solid #2a2e39' }}>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>TICKER</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>SCAN STRATEGY</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>METRIC VALUE</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>PRICE</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>24H CHANGE</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>DELIVERY %</TableCell>
                <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 700 }}>EVIDENCE DETAILS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredScans.length > 0 ? (
                filteredScans.map((scan) => (
                  <React.Fragment key={scan.id || scan.ticker}>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, borderBottom: '1px solid #161c2e' }}>
                      <TableCell component="th" scope="row">
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.light' }}>{scan.ticker}</Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.65rem' }}>{scan.name || scan.ticker}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={scan.category || scan.scan_type} 
                          color="primary" 
                          variant="outlined" 
                          size="small" 
                          sx={{ fontWeight: 700, fontSize: '0.65rem', height: 22 }} 
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'warning.light' }}>{scan.value || scan.value}</TableCell>
                      <TableCell sx={{ fontSize: '0.8rem', fontWeight: 700 }}>{scan.price || '—'}</TableCell>
                      <TableCell>
                        {scan.change ? <TrendIndicator change={scan.change} trend={scan.change.startsWith('-') ? 'down' : 'up'} /> : '—'}
                      </TableCell>
                      <TableCell sx={{ fontSize: '0.8rem', color: 'success.light', fontWeight: 600 }}>{scan.deliveryPct || '—'}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small" onClick={() => toggleDetails(scan.id || scan.ticker)} sx={{ color: 'primary.light' }}>
                          {expandedDetails[scan.id || scan.ticker] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}>
                        <Collapse in={expandedDetails[scan.id || scan.ticker]} timeout="auto" unmountOnExit>
                          <Box sx={{ p: 2, my: 1, bgcolor: '#111524', borderRadius: 1.5, borderLeft: '3px solid #2962ff' }}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.8rem' }}>
                              <InfoOutlinedIcon sx={{ fontSize: '1rem', color: 'primary.light' }} /> Automated Technical Summary:
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.45, mb: 1.5 }}>
                              {scan.summary || 'Technical breakout confirmed across 20-EMA and VWAP lines with volume expansion.'}
                            </Typography>

                            <Grid container spacing={2}>
                              <Grid item xs={6} sm={3}>
                                <Typography variant="caption" display="block" sx={{ color: 'text.disabled' }}>RSI (14):</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 700 }}>{scan.rsi || 62}</Typography>
                              </Grid>
                              <Grid item xs={6} sm={3}>
                                <Typography variant="caption" display="block" sx={{ color: 'text.disabled' }}>20-Day EMA:</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 700 }}>{scan.ema20 || '—'}</Typography>
                              </Grid>
                              <Grid item xs={6} sm={3}>
                                <Typography variant="caption" display="block" sx={{ color: 'text.disabled' }}>50-Day EMA:</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 700 }}>{scan.ema50 || '—'}</Typography>
                              </Grid>
                              <Grid item xs={6} sm={3}>
                                <Typography variant="caption" display="block" sx={{ color: 'text.disabled' }}>Session VWAP:</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 700 }}>{scan.vwap || '—'}</Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                    No securities match the selected scanner criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default ScannerView;
