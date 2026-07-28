import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Card, CardContent, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Alert, AlertTitle, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as echarts from 'echarts';
import { useMarket } from '../../context/MarketContext';
import TrendIndicator from '../../components/TrendIndicator';
import { mockPortfolio } from '../../services/mockDataService';

export const PortfolioView = () => {
  const { portfolio: realPortfolio, addHolding, loading } = useMarket();
  const chartRef = useRef(null);

  const isGuest = !realPortfolio || !realPortfolio.aiAnalysis;
  const portfolio = isGuest ? mockPortfolio : realPortfolio;

  // Form State
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [avgPrice, setAvgPrice] = useState('');
  const [qty, setQty] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Handle allocation chart rendering
  useEffect(() => {
    if (!chartRef.current || !portfolio || !portfolio.aiAnalysis) return;

    const chartInstance = echarts.init(chartRef.current);
    const data = portfolio.aiAnalysis.sectorAllocation;

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
          color: '#b2b5be',
          fontSize: 10
        }
      },
      series: [
        {
          name: 'Sector Allocation',
          type: 'pie',
          radius: ['45%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 4,
            borderColor: '#161c2e',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 12,
              fontWeight: 'bold',
              color: '#f0f3fa'
            }
          },
          labelLine: {
            show: false
          },
          data: data.map(item => ({
            name: item.name,
            value: item.value
          }))
        }
      ],
      color: ['#2962ff', '#00b0ff', '#26a69a', '#ffa726', '#ef5350']
    };

    chartInstance.setOption(option);

    const handleResize = () => chartInstance.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.dispose();
    };
  }, [portfolio]);

  if (loading || !portfolio) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (isGuest) {
      setFormError('Portfolio is in Guest Demo mode. Please Sign In at the top right to start tracking your own assets.');
      return;
    }

    if (!symbol || !name || !category || !avgPrice || !qty) {
      setFormError('All fields are required.');
      return;
    }

    try {
      await addHolding({
        symbol: symbol.toUpperCase(),
        name,
        category,
        avgPrice: parseFloat(avgPrice),
        qty: parseFloat(qty)
      });
      setFormSuccess('Asset added to portfolio successfully!');
      setSymbol('');
      setName('');
      setCategory('');
      setAvgPrice('');
      setQty('');
    } catch (err) {
      setFormError(err.message || 'Failed to add holding.');
    }
  };

  const calculateTotalValue = () => {
    return portfolio.holdings.reduce((sum, h) => sum + (h.currentPrice * h.qty), 0).toFixed(2);
  };

  const calculateTotalCost = () => {
    return portfolio.holdings.reduce((sum, h) => sum + (h.avgPrice * h.qty), 0).toFixed(2);
  };

  const getSuggColor = (action) => {
    if (action.toLowerCase().includes('trim')) return 'error';
    if (action.toLowerCase().includes('buy')) return 'success';
    return 'warning';
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-out' }}>
      {isGuest && (
        <Alert severity="info" sx={{ mb: 3, border: '1px solid #2962ff', bgcolor: 'rgba(41, 98, 255, 0.05)' }}>
          <AlertTitle sx={{ fontWeight: 800 }}>DEMO SANDBOX ACTIVE</AlertTitle>
          You are viewing the Portfolio dashboard in Guest Mode. Please click <strong>Sign In</strong> at the top right to start tracking and analyzing your own real investments.
        </Alert>
      )}
      <Box sx={{ borderLeft: '4px solid #2962ff', pl: 1.5, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            AI Portfolio Manager
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Consolidated overview and AI diversification audit of your holdings.
          </Typography>
        </Box>
        <Button 
          variant="outlined" 
          startIcon={<CloudUploadIcon />} 
          disabled
          sx={{ borderColor: '#2a2e39', color: 'text.secondary', '&:hover': { borderColor: '#b2b5be' } }}
        >
          Import Groww Portfolio (Coming Soon)
        </Button>
      </Box>

      {/* Summary Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>PORTFOLIO VALUE</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5 }}>₹{parseFloat(calculateTotalValue()).toLocaleString('en-IN')}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>TOTAL COST BASIS</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5 }}>₹{parseFloat(calculateTotalCost()).toLocaleString('en-IN')}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>TOTAL RETURN</Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 0.5 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: parseFloat(calculateTotalValue()) >= parseFloat(calculateTotalCost()) ? 'success.main' : 'error.main' }}>
                  ₹{(calculateTotalValue() - calculateTotalCost()).toFixed(2)}
                </Typography>
                <TrendIndicator 
                  value={(((calculateTotalValue() - calculateTotalCost()) / calculateTotalCost()) * 100).toFixed(2) + '%'} 
                  trend={parseFloat(calculateTotalValue()) >= parseFloat(calculateTotalCost()) ? 'up' : 'down'} 
                  showIcon={false} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Left Side: Holdings and entry Form */}
        <Grid item xs={12} lg={8}>
          {/* Holdings Table */}
          <TableContainer component={Paper} sx={{ border: '1px solid #2a2e39', mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>SYMBOL</TableCell>
                  <TableCell>ASSET NAME</TableCell>
                  <TableCell>CATEGORY</TableCell>
                  <TableCell align="right">QTY</TableCell>
                  <TableCell align="right">AVG COST</TableCell>
                  <TableCell align="right">MARKET VAL</TableCell>
                  <TableCell align="right">RETURNS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {portfolio.holdings.map((h, index) => {
                  const costBasis = h.avgPrice * h.qty;
                  const currentVal = h.currentPrice * h.qty;
                  const returns = currentVal - costBasis;
                  const returnsPct = ((returns / costBasis) * 100).toFixed(2);

                  return (
                    <TableRow key={index}>
                      <TableCell sx={{ fontWeight: 700, color: 'primary.light' }}>{h.symbol}</TableCell>
                      <TableCell>{h.name}</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>{h.category}</TableCell>
                      <TableCell align="right">{h.qty}</TableCell>
                      <TableCell align="right">₹{h.avgPrice.toFixed(2)}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>₹{currentVal.toFixed(2)}</TableCell>
                      <TableCell align="right">
                        <TrendIndicator value={`₹${returns.toFixed(2)}`} pctValue={`${returnsPct}%`} trend={returns >= 0 ? 'up' : 'down'} showIcon={false} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Add Asset Form */}
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <AddIcon sx={{ color: 'primary.main' }} />
                Add Asset Manually
              </Typography>
              
              {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
              {formSuccess && <Alert severity="success" sx={{ mb: 2 }}>{formSuccess}</Alert>}

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField 
                      label="Asset Symbol (e.g. INFY, ITC)" 
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value)}
                      fullWidth 
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField 
                      label="Company / Fund Name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth 
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField 
                      label="Sector / Category" 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      fullWidth 
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField 
                      label="Avg Price Purchased" 
                      type="number"
                      value={avgPrice}
                      onChange={(e) => setAvgPrice(e.target.value)}
                      fullWidth 
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField 
                      label="Quantity" 
                      type="number"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      fullWidth 
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Button type="submit" variant="contained" color="primary" size="medium">
                      Add Asset
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side: AI Analytics and allocations */}
        <Grid item xs={12} lg={4}>
          {/* Allocations & Risk Dial */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Sector Allocations</Typography>
              <div ref={chartRef} style={{ width: '100%', height: '220px' }} />
              
              <Divider sx={{ borderColor: '#2a2e39', my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>Portfolio Risk Score</Typography>
                <Chip label={portfolio.aiAnalysis.riskScore} color="warning" size="small" sx={{ fontWeight: 700 }} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>Diversification Status</Typography>
                <Chip label={portfolio.aiAnalysis.diversificationStatus} color="success" size="small" sx={{ fontWeight: 700 }} />
              </Box>
            </CardContent>
          </Card>

          {/* AI Diagnostic Warnings */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <WarningAmberIcon sx={{ color: 'warning.main' }} />
                AI Health Diagnostics
              </Typography>
              {portfolio.aiAnalysis.warnings.map((warn, i) => (
                <Alert severity="warning" key={i} sx={{ mb: 1.5, bgcolor: 'rgba(255, 152, 0, 0.05)', border: '1px solid rgba(255, 152, 0, 0.2)', '& .MuiAlert-icon': { display: 'none' } }}>
                  <AlertTitle sx={{ fontSize: '0.75rem', fontWeight: 800 }}>{warn.type.toUpperCase()}</AlertTitle>
                  <Typography variant="caption" sx={{ display: 'block', mt: 0.25, color: 'text.primary', lineHeight: 1.35 }}>
                    {warn.message}
                  </Typography>
                </Alert>
              ))}
              <Typography variant="caption" sx={{ color: 'text.disabled', fontStyle: 'italic', display: 'block', mt: 1 }}>
                <strong>Overlap note:</strong> {portfolio.aiAnalysis.duplicateHoldings}
              </Typography>
            </CardContent>
          </Card>

          {/* AI Advisor Suggestions */}
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>AI Fund Manager Suggestions</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {portfolio.aiAnalysis.suggestions.map((sug, i) => (
                  <Paper key={i} sx={{ p: 1.5, bgcolor: '#111524', border: '1px solid #2a2e39' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.light' }}>{sug.symbol}</Typography>
                      <Chip label={sug.action.toUpperCase()} size="small" color={getSuggColor(sug.action)} sx={{ fontSize: '0.6rem', fontWeight: 700, height: 18 }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.35 }}>
                      {sug.reason}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PortfolioView;
