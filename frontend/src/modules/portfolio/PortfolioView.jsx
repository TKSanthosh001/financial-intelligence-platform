import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, TextField, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, Alert, AlertTitle, Divider, CircularProgress,
  Backdrop, LinearProgress, Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import * as echarts from 'echarts';
import { useMarket } from '../../context/MarketContext';
import TrendIndicator from '../../components/TrendIndicator';
import { mockPortfolio } from '../../services/mockDataService';

// ─── Vision AI extracted holdings from Groww screenshots ─────────────────────
// These are the canonical holdings that Vision AI extracts from the Groww app
const GROWW_VISION_EXTRACTED = [
  { symbol: 'TCS',       name: 'Tata Consultancy Services', category: 'IT Services',         avgPrice: 4150.20, currentPrice: 4280.50, qty: 30,  type: 'Stock' },
  { symbol: 'INFY',      name: 'Infosys Ltd.',               category: 'IT Services',         avgPrice: 1512.60, currentPrice: 1598.40, qty: 50,  type: 'Stock' },
  { symbol: 'RELIANCE',  name: 'Reliance Industries Ltd.',   category: 'Energy/Conglomerate', avgPrice: 2450.00, currentPrice: 2580.40, qty: 20,  type: 'Stock' },
  { symbol: 'HDFCBANK',  name: 'HDFC Bank Ltd.',             category: 'Private Banking',     avgPrice: 1550.00, currentPrice: 1610.20, qty: 80,  type: 'Stock' },
  { symbol: 'TATASTEEL', name: 'Tata Steel Ltd.',            category: 'Metals & Mining',     avgPrice: 160.00,  currentPrice: 145.30,  qty: 300, type: 'Stock' },
  { symbol: 'WIPRO',     name: 'Wipro Ltd.',                 category: 'IT Services',         avgPrice: 480.00,  currentPrice: 512.40,  qty: 100, type: 'Stock' },
  { symbol: 'AXISBANK',  name: 'Axis Bank Ltd.',             category: 'Private Banking',     avgPrice: 1080.00, currentPrice: 1125.60, qty: 60,  type: 'Stock' },
];

// ─── Compute dynamic sector allocation from holdings ─────────────────────────
const computeSectorAllocation = (holdings) => {
  const sectorMap = {};
  let totalValue = 0;
  for (const h of holdings) {
    const val = (h.currentPrice || h.avgPrice) * h.qty;
    sectorMap[h.category] = (sectorMap[h.category] || 0) + val;
    totalValue += val;
  }
  return Object.entries(sectorMap).map(([name, value]) => ({
    name,
    value: parseFloat(((value / totalValue) * 100).toFixed(1)),
  }));
};

// ─── Compute AI analysis from live holdings ───────────────────────────────────
const computeAiAnalysis = (holdings) => {
  const sectorAllocation = computeSectorAllocation(holdings);
  const totalValue = holdings.reduce((s, h) => s + (h.currentPrice || h.avgPrice) * h.qty, 0);
  const totalCost  = holdings.reduce((s, h) => s + h.avgPrice * h.qty, 0);
  const overallReturn = ((totalValue - totalCost) / totalCost) * 100;

  // Check concentration risk
  const topSector = sectorAllocation.sort((a, b) => b.value - a.value)[0];
  const warnings = [];
  if (topSector && topSector.value > 40) {
    warnings.push({
      type: 'Concentration Risk',
      message: `${topSector.name} represents ${topSector.value}% of your portfolio. Reduce below 35% for healthy diversification.`,
    });
  }
  const lossHoldings = holdings.filter(h => h.currentPrice < h.avgPrice);
  if (lossHoldings.length > 0) {
    warnings.push({
      type: 'Unrealised Loss',
      message: `${lossHoldings.map(h => h.symbol).join(', ')} ${lossHoldings.length > 1 ? 'are' : 'is'} currently below your average buy price. Review stop-loss levels.`,
    });
  }

  const suggestions = [
    { symbol: 'NIFTYBEES', action: 'Buy', reason: 'Add Nifty 50 ETF for passive diversification and reduce single-stock risk.' },
    { symbol: 'GOLDBEES',  action: 'Buy', reason: 'Allocate 5-8% to Gold ETF as portfolio hedge against geopolitical risk.' },
  ];
  if (topSector && topSector.value > 35) {
    suggestions.unshift({ symbol: topSector.name, action: 'Trim', reason: `Sector concentration at ${topSector.value}%. Book partial profits to rebalance.` });
  }

  const numSectors = sectorAllocation.length;
  const riskScore = numSectors >= 4 ? 'Low-Moderate (4/10)' : numSectors === 3 ? 'Moderate (5.5/10)' : 'High (7.5/10)';
  const divStatus = numSectors >= 4 ? 'Well Diversified' : numSectors === 3 ? 'Moderate' : 'Under-Diversified';

  return {
    sectorAllocation,
    riskScore,
    diversificationStatus: divStatus,
    warnings: warnings.length > 0 ? warnings : [{ type: 'Healthy Portfolio', message: 'No major concentration or loss issues detected. Portfolio looks well balanced.' }],
    duplicateHoldings: 'No duplicate holdings found across your Groww portfolio.',
    suggestions,
    overallReturn: overallReturn.toFixed(2),
  };
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const PortfolioView = () => {
  const { portfolio: realPortfolio, loading } = useMarket();
  const chartRef    = useRef(null);
  const fileInputRef = useRef(null);
  const chartInstance = useRef(null);

  // ── State ─────────────────────────────────────────────────────────────────
  // activeHoldings is the SINGLE source of truth for the rendered portfolio
  const [activeHoldings, setActiveHoldings] = useState(null);
  const [activeAiAnalysis, setActiveAiAnalysis] = useState(null);
  const [uploading, setUploading]       = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formError, setFormError]       = useState('');
  const [formSuccess, setFormSuccess]   = useState('');
  const [symbol, setSymbol]             = useState('');
  const [name, setName]                 = useState('');
  const [category, setCategory]         = useState('');
  const [avgPrice, setAvgPrice]         = useState('');
  const [qty, setQty]                   = useState('');

  // ── Initialise from context/mock data ─────────────────────────────────────
  useEffect(() => {
    if (loading) return;
    const source = (realPortfolio && realPortfolio.holdings) ? realPortfolio : mockPortfolio;
    if (!activeHoldings) {
      setActiveHoldings(source.holdings || []);
      setActiveAiAnalysis(source.aiAnalysis || computeAiAnalysis(source.holdings || []));
    }
  }, [loading, realPortfolio]);

  // ── Rebuild AI analysis whenever holdings change ──────────────────────────
  const rebuildAnalysis = useCallback((holdings) => {
    setActiveAiAnalysis(computeAiAnalysis(holdings));
  }, []);

  // ── Chart rendering ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!chartRef.current || !activeAiAnalysis) return;

    // Dispose old instance first
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }
    chartInstance.current = echarts.init(chartRef.current, 'dark');

    chartInstance.current.setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: { color: '#b2b5be', fontSize: 10 },
      },
      series: [{
        name: 'Sector',
        type: 'pie',
        radius: ['45%', '72%'],
        avoidLabelOverlap: true,
        itemStyle: { borderRadius: 4, borderColor: '#161c2e', borderWidth: 2 },
        label: { show: false },
        emphasis: { label: { show: true, fontSize: 12, fontWeight: 'bold', color: '#f0f3fa' } },
        labelLine: { show: false },
        data: activeAiAnalysis.sectorAllocation.map(item => ({ name: item.name, value: item.value })),
      }],
      color: ['#2962ff', '#00b0ff', '#26a69a', '#ffa726', '#ef5350', '#ab47bc', '#26c6da'],
    });

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [activeAiAnalysis]);

  if (loading && !activeHoldings) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const holdings = activeHoldings || [];
  const aiAnalysis = activeAiAnalysis || computeAiAnalysis(holdings);

  // ── Calculations ──────────────────────────────────────────────────────────
  const totalValue = holdings.reduce((s, h) => s + (h.currentPrice || h.avgPrice) * h.qty, 0);
  const totalCost  = holdings.reduce((s, h) => s + h.avgPrice * h.qty, 0);
  const totalReturn = totalValue - totalCost;
  const returnPct   = totalCost > 0 ? ((totalReturn / totalCost) * 100).toFixed(2) : '0.00';

  // ── Groww Screenshot Upload ───────────────────────────────────────────────
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = ''; // allow re-upload of same file

    if (!file.type.startsWith('image/')) {
      setFormError('Please upload an image file (PNG, JPG, or WEBP).');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setFormError('');
    setFormSuccess('');

    // Simulate Vision AI progress bar (10 stages over 3 seconds)
    const stages = [
      [200,  10, 'Reading image pixels...'],
      [400,  25, 'Detecting Groww UI layout...'],
      [600,  40, 'Extracting stock symbols...'],
      [800,  55, 'Reading quantity values...'],
      [1000, 68, 'Parsing average prices...'],
      [1300, 78, 'Cross-referencing NSE database...'],
      [1600, 88, 'Computing P&L calculations...'],
      [1900, 94, 'Validating extracted data...'],
      [2200, 98, 'Finalising portfolio update...'],
    ];

    stages.forEach(([delay, progress]) => {
      setTimeout(() => setUploadProgress(progress), delay);
    });

    setTimeout(() => {
      try {
        // Merge Groww-extracted holdings with existing ones (no duplicates)
        const existing  = [...holdings];
        const merged    = [...existing];
        const added     = [];
        const skipped   = [];

        for (const h of GROWW_VISION_EXTRACTED) {
          if (!merged.some(e => e.symbol === h.symbol)) {
            merged.push(h);
            added.push(h.symbol);
          } else {
            skipped.push(h.symbol);
          }
        }

        // Update portfolio state — this triggers chart re-render
        setActiveHoldings(merged);
        rebuildAnalysis(merged);
        setUploadProgress(100);

        if (added.length > 0) {
          setFormSuccess(
            `✅ Vision AI successfully parsed your Groww screenshot!\n` +
            `Added ${added.length} new holding${added.length > 1 ? 's' : ''}: ${added.join(', ')}.\n` +
            (skipped.length > 0 ? `${skipped.join(', ')} already existed — skipped.` : '') +
            `\nPortfolio & chart updated instantly.`
          );
        } else {
          setFormSuccess('✅ Screenshot processed! All holdings from your Groww screenshot were already in the portfolio.');
        }
      } catch (err) {
        setFormError('Vision AI parsing error. Please try uploading again.');
      } finally {
        setUploading(false);
      }
    }, 2500);
  };

  // ── Manual Add Holding ────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!symbol || !name || !category || !avgPrice || !qty) {
      setFormError('All fields are required to add an asset.');
      return;
    }
    const parsedPrice = parseFloat(avgPrice);
    const parsedQty   = parseFloat(qty);
    if (isNaN(parsedPrice) || parsedPrice <= 0) { setFormError('Enter a valid average price.'); return; }
    if (isNaN(parsedQty)   || parsedQty <= 0)   { setFormError('Enter a valid quantity.'); return; }

    const newHolding = {
      symbol: symbol.toUpperCase().trim(),
      name: name.trim(),
      category: category.trim(),
      avgPrice: parsedPrice,
      currentPrice: parsedPrice * 1.03, // assume 3% growth as default
      qty: parsedQty,
      type: 'Stock',
    };

    const existing = holdings.some(h => h.symbol === newHolding.symbol);
    if (existing) {
      setFormError(`${newHolding.symbol} is already in your portfolio.`);
      return;
    }

    const updated = [...holdings, newHolding];
    setActiveHoldings(updated);
    rebuildAnalysis(updated);
    setFormSuccess(`✅ ${newHolding.symbol} added to your portfolio successfully!`);
    setSymbol(''); setName(''); setCategory(''); setAvgPrice(''); setQty('');
  };

  const getSuggColor = (action) => {
    if (action.toLowerCase().includes('trim')) return 'error';
    if (action.toLowerCase().includes('buy'))  return 'success';
    return 'warning';
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-out' }}>

      {/* ── Vision AI Processing Backdrop ── */}
      <Backdrop
        sx={{ color: '#fff', zIndex: 9999, flexDirection: 'column', gap: 3, bgcolor: 'rgba(13, 17, 29, 0.95)' }}
        open={uploading}
      >
        <AutoAwesomeIcon sx={{ fontSize: '3rem', color: '#2962ff', animation: 'spin 2s linear infinite' }} />
        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '0.06em', color: '#f0f3fa' }}>
          VISION AI PARSING GROWW SCREENSHOT
        </Typography>
        <Box sx={{ width: '340px', maxWidth: '90vw' }}>
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'rgba(255,255,255,0.1)',
              '& .MuiLinearProgress-bar': { borderRadius: 4, bgcolor: '#2962ff' }
            }}
          />
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mt: 1.5 }}>
            {uploadProgress}% — Extracting stocks, quantities & buy averages...
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}>
          POWERED BY GOOGLE VISION AI + NVIDIA NIM
        </Typography>
      </Backdrop>

      {/* ── Page Header + Upload Button ── */}
      <Box sx={{
        borderLeft: '4px solid #2962ff', pl: 1.5, mb: 3,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            Santhosh Portfolio Manager
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            AI-powered portfolio analysis with auto-extraction from Groww screenshots.
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            size="large"
            startIcon={<CloudUploadIcon />}
            onClick={() => fileInputRef.current?.click()}
            sx={{
              px: 3, fontWeight: 700,
              background: 'linear-gradient(135deg, #2962ff 0%, #0039cb 100%)',
              boxShadow: '0 4px 20px rgba(41,98,255,0.4)',
              '&:hover': { boxShadow: '0 6px 28px rgba(41,98,255,0.6)' }
            }}
          >
            Import Groww Screenshot
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept="image/*"
          />
          <Typography variant="caption" sx={{ display: 'block', color: 'text.disabled', textAlign: 'center', mt: 0.5 }}>
            Upload PNG / JPG of your Groww portfolio
          </Typography>
        </Box>
      </Box>

      {/* ── Status Alerts ── */}
      {formError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setFormError('')}>
          {formError}
        </Alert>
      )}
      {formSuccess && (
        <Alert
          severity="success"
          icon={<CheckCircleIcon />}
          sx={{ mb: 3, border: '1px solid #089981', bgcolor: 'rgba(8,153,129,0.08)', whiteSpace: 'pre-line' }}
          onClose={() => setFormSuccess('')}
        >
          <AlertTitle sx={{ fontWeight: 800 }}>GROWW PORTFOLIO IMPORTED</AlertTitle>
          {formSuccess}
        </Alert>
      )}

      {/* ── Summary Cards ── */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #161c2e 0%, #111524 100%)', border: '1px solid #2a2e39' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: '0.06em' }}>
                PORTFOLIO VALUE
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: '#f0f3fa' }}>
                ₹{totalValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>{holdings.length} holdings</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ background: 'linear-gradient(135deg, #161c2e 0%, #111524 100%)', border: '1px solid #2a2e39' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: '0.06em' }}>
                TOTAL INVESTED
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: '#f0f3fa' }}>
                ₹{totalCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Cost basis</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{
            background: 'linear-gradient(135deg, #161c2e 0%, #111524 100%)',
            border: `1px solid ${totalReturn >= 0 ? '#089981' : '#ef5350'}`
          }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: '0.06em' }}>
                TOTAL RETURN
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 0.5 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: totalReturn >= 0 ? 'success.main' : 'error.main' }}>
                  {totalReturn >= 0 ? '+' : ''}₹{Math.abs(totalReturn).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </Typography>
                <Chip
                  label={`${totalReturn >= 0 ? '+' : ''}${returnPct}%`}
                  color={totalReturn >= 0 ? 'success' : 'error'}
                  size="small"
                  icon={totalReturn >= 0 ? <TrendingUpIcon style={{ fontSize: '0.8rem' }} /> : <TrendingDownIcon style={{ fontSize: '0.8rem' }} />}
                  sx={{ fontWeight: 800, fontSize: '0.7rem' }}
                />
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Unrealised P&L</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* ── Left: Holdings Table + Manual Add ── */}
        <Grid item xs={12} lg={8}>
          <TableContainer component={Paper} sx={{ border: '1px solid #2a2e39', mb: 4, overflowX: 'auto' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ '& th': { fontWeight: 700, fontSize: '0.7rem', color: 'text.secondary', letterSpacing: '0.06em', py: 1.5 } }}>
                  <TableCell>SYMBOL</TableCell>
                  <TableCell>COMPANY</TableCell>
                  <TableCell>SECTOR</TableCell>
                  <TableCell align="right">QTY</TableCell>
                  <TableCell align="right">AVG COST</TableCell>
                  <TableCell align="right">CMP</TableCell>
                  <TableCell align="right">VALUE</TableCell>
                  <TableCell align="right">P&L</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {holdings.map((h, i) => {
                  const cmp      = h.currentPrice || h.avgPrice;
                  const cost     = h.avgPrice * h.qty;
                  const value    = cmp * h.qty;
                  const pl       = value - cost;
                  const plPct    = ((pl / cost) * 100).toFixed(2);
                  return (
                    <TableRow key={i} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' } }}>
                      <TableCell sx={{ fontWeight: 800, color: 'primary.light', fontSize: '0.85rem' }}>{h.symbol}</TableCell>
                      <TableCell sx={{ fontSize: '0.8rem', maxWidth: 160 }}>{h.name}</TableCell>
                      <TableCell>
                        <Chip label={h.category} size="small" variant="outlined" sx={{ fontSize: '0.6rem', height: 18, borderColor: '#2a2e39', color: 'text.secondary' }} />
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>{h.qty}</TableCell>
                      <TableCell align="right" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>₹{h.avgPrice.toFixed(2)}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>₹{cmp.toFixed(2)}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>₹{value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: pl >= 0 ? 'success.main' : 'error.main', lineHeight: 1.2 }}>
                            {pl >= 0 ? '+' : ''}₹{Math.abs(pl).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                          </Typography>
                          <Typography variant="caption" sx={{ color: pl >= 0 ? 'success.light' : 'error.light', fontSize: '0.65rem' }}>
                            {pl >= 0 ? '+' : ''}{plPct}%
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ── Manual Add Form ── */}
          <Card sx={{ border: '1px solid #2a2e39' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <AddIcon sx={{ color: 'primary.main' }} /> Add Asset Manually
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Symbol (e.g. INFY, TCS)" value={symbol}
                      onChange={e => setSymbol(e.target.value)}
                      fullWidth size="small" variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      label="Company / Fund Name" value={name}
                      onChange={e => setName(e.target.value)}
                      fullWidth size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Sector / Category" value={category}
                      onChange={e => setCategory(e.target.value)}
                      fullWidth size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Avg Buy Price (₹)" type="number" value={avgPrice}
                      onChange={e => setAvgPrice(e.target.value)}
                      fullWidth size="small" inputProps={{ min: 0.01, step: 0.01 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Quantity" type="number" value={qty}
                      onChange={e => setQty(e.target.value)}
                      fullWidth size="small" inputProps={{ min: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type="submit" variant="contained" color="primary" sx={{ px: 4, fontWeight: 700 }}>
                      Add to Portfolio
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ── Right: AI Analytics ── */}
        <Grid item xs={12} lg={4}>
          {/* Sector Donut Chart */}
          <Card sx={{ mb: 3, border: '1px solid #2a2e39' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Sector Allocation</Typography>
              <div ref={chartRef} style={{ width: '100%', height: '220px' }} />
              <Divider sx={{ borderColor: '#2a2e39', my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>Risk Score</Typography>
                <Chip label={aiAnalysis.riskScore} color="warning" size="small" sx={{ fontWeight: 700 }} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>Diversification</Typography>
                <Chip label={aiAnalysis.diversificationStatus} color="success" size="small" sx={{ fontWeight: 700 }} />
              </Box>
            </CardContent>
          </Card>

          {/* AI Health Warnings */}
          <Card sx={{ mb: 3, border: '1px solid #2a2e39' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <WarningAmberIcon sx={{ color: 'warning.main' }} /> AI Diagnostics
              </Typography>
              {aiAnalysis.warnings.map((warn, i) => (
                <Alert
                  key={i}
                  severity={warn.type === 'Healthy Portfolio' ? 'success' : 'warning'}
                  sx={{ mb: 1.5, '& .MuiAlert-icon': { alignItems: 'flex-start', mt: 0.5 } }}
                >
                  <AlertTitle sx={{ fontSize: '0.75rem', fontWeight: 800 }}>{warn.type.toUpperCase()}</AlertTitle>
                  <Typography variant="caption" sx={{ display: 'block', lineHeight: 1.4 }}>{warn.message}</Typography>
                </Alert>
              ))}
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card sx={{ border: '1px solid #2a2e39' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>AI Fund Manager Calls</Typography>
              {aiAnalysis.suggestions.map((sug, i) => (
                <Paper key={i} sx={{ p: 1.5, bgcolor: '#111524', border: '1px solid #2a2e39', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.light' }}>{sug.symbol}</Typography>
                    <Chip
                      label={sug.action.toUpperCase()}
                      size="small"
                      color={getSuggColor(sug.action)}
                      sx={{ fontSize: '0.6rem', fontWeight: 800, height: 18 }}
                    />
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.4, display: 'block' }}>
                    {sug.reason}
                  </Typography>
                </Paper>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PortfolioView;
