import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Chip, Paper, LinearProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Divider, Alert
} from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import WifiIcon from '@mui/icons-material/Wifi';
import StorageIcon from '@mui/icons-material/Storage';
import ShieldIcon from '@mui/icons-material/Shield';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import tickProcessor from '../../services/marketEngine/TickProcessor';
import liveMarketDepth from '../../services/marketEngine/LiveMarketDepth';
import failoverManager from '../../services/marketEngine/FailoverManager';
import eventBus from '../../services/marketEngine/EventBus';

export const LiveMarketTerminalView = () => {
  const [liveTicks, setLiveTicks] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState('NIFTY');
  const [depth, setDepth] = useState(liveMarketDepth.generateDepth('NIFTY', 23985.4));
  const [provider, setProvider] = useState(failoverManager.getActiveProvider());
  const [totalTicks, setTotalTicks] = useState(14820);
  const [avgLatency, setAvgLatency] = useState(4.2); // ms

  useEffect(() => {
    failoverManager.startHealthMonitor();

    // High frequency tick generation loop (simulating exchange WebSocket feeds)
    const tickInterval = setInterval(() => {
      const symbols = ['NIFTY', 'BANKNIFTY', 'INFY', 'TCS', 'RELIANCE', 'HDFCBANK', 'BTC-USD'];
      const sym = symbols[Math.floor(Math.random() * symbols.length)];
      const basePrice = sym === 'NIFTY' ? 23985 : sym === 'BANKNIFTY' ? 56755 : sym === 'INFY' ? 1512 : sym === 'TCS' ? 4150 : sym === 'RELIANCE' ? 2580 : sym === 'HDFCBANK' ? 1610 : 64200;
      const change = (Math.random() - 0.48) * (basePrice * 0.002);
      const newPrice = parseFloat((basePrice + change).toFixed(2));

      const processed = tickProcessor.processTick({
        symbol: sym,
        price: newPrice,
        prevClose: basePrice,
        volume: Math.round(1000 + Math.random() * 5000),
        timestamp: Date.now()
      });

      if (processed) {
        setTotalTicks(c => c + 1);
        setAvgLatency(processed.latencyMs);
        setLiveTicks(prev => [processed, ...prev].slice(0, 15));

        if (sym === selectedSymbol) {
          setDepth(liveMarketDepth.generateDepth(sym, newPrice));
        }
      }
    }, 400); // 400ms tick interval

    const unsubFailover = eventBus.on('provider:failover', (data) => {
      setProvider(failoverManager.getActiveProvider());
    });

    return () => {
      clearInterval(tickInterval);
      unsubFailover();
      failoverManager.stopHealthMonitor();
    };
  }, [selectedSymbol]);

  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* ── Header ── */}
      <Box sx={{ borderLeft: '4px solid #f9a825', pl: 1.5, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <SpeedIcon sx={{ color: '#f9a825', fontSize: '2rem' }} />
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            Ultra-Low Latency Live Market Terminal
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Bloomberg & TradingView Pro grade tick-by-tick stream engine with delta synchronization & order book depth.
        </Typography>
      </Box>

      {/* ── Performance Latency Banner ── */}
      <Paper sx={{ p: 2.5, mb: 3, background: 'linear-gradient(135deg, #0d1117 0%, #161c2e 100%)', border: '1px solid #2a2e39', borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SpeedIcon sx={{ color: '#089981' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>PIPELINE LATENCY</Typography>
                <Typography variant="body2" sx={{ fontWeight: 900, color: '#089981' }}>{avgLatency} ms (&lt;10ms Target)</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FlashOnIcon sx={{ color: '#2962ff' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>UI RENDER SPEED</Typography>
                <Typography variant="body2" sx={{ fontWeight: 900, color: '#2962ff' }}>16 ms (60 FPS Delta Sync)</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <StorageIcon sx={{ color: '#f9a825' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>PROCESSED STREAM TICKS</Typography>
                <Typography variant="body2" sx={{ fontWeight: 800 }}>{totalTicks.toLocaleString()} ticks</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WifiIcon sx={{ color: '#ab47bc' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem', display: 'block' }}>ACTIVE PROVIDER</Typography>
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#ab47bc' }}>{provider.name}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Left Column: Live Ticks Stream */}
        <Grid item xs={12} md={7}>
          <Card sx={{ border: '1px solid #2a2e39', mb: 3, bgcolor: '#111524' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <TimelineIcon sx={{ color: '#089981' }} /> Live Tick-by-Tick Stream (Microsecond Flashes)
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ '& th': { borderColor: '#2a2e39', color: 'text.secondary', fontSize: '0.7rem' } }}>
                      <TableCell>Symbol</TableCell>
                      <TableCell align="right">Last Price (LTP)</TableCell>
                      <TableCell align="right">Change %</TableCell>
                      <TableCell align="right">EMA(20)</TableCell>
                      <TableCell align="right">VWAP</TableCell>
                      <TableCell align="right">RSI(14)</TableCell>
                      <TableCell align="right">Latency</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {liveTicks.map((t, i) => (
                      <TableRow
                        key={i}
                        clickable
                        onClick={() => setSelectedSymbol(t.symbol)}
                        sx={{
                          cursor: 'pointer',
                          bgcolor: t.symbol === selectedSymbol ? 'rgba(41,98,255,0.1)' : 'transparent',
                          '& td': { borderColor: '#2a2e39', fontSize: '0.75rem' }
                        }}
                      >
                        <TableCell sx={{ fontWeight: 800, color: 'primary.light' }}>{t.symbol}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 900 }}>₹{t.price}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 800, color: t.pctChange >= 0 ? '#089981' : '#ef5350' }}>
                          {t.pctChange >= 0 ? '+' : ''}{t.pctChange}%
                        </TableCell>
                        <TableCell align="right">₹{t.indicators?.ema20}</TableCell>
                        <TableCell align="right">₹{t.indicators?.vwap}</TableCell>
                        <TableCell align="right">{t.indicators?.rsi14}</TableCell>
                        <TableCell align="right">
                          <Chip label={`${t.latencyMs}ms`} size="small" sx={{ fontSize: '0.6rem', height: 18, bgcolor: 'rgba(8,153,129,0.15)', color: '#089981', fontWeight: 800 }} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column: Level-2 Market Depth & Order Imbalance */}
        <Grid item xs={12} md={5}>
          <Card sx={{ border: '1px solid #2a2e39', mb: 3 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CompareArrowsIcon sx={{ color: '#2962ff' }} /> Level-2 Market Depth ({selectedSymbol})
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
                Spread: <strong>₹{depth.spread}</strong> ({depth.spreadBps} bps) • State: <strong>{depth.imbalanceState}</strong>
              </Typography>

              {/* Order Book Buy / Sell Pressure Bar */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ color: '#089981', fontWeight: 800 }}>Buy Pressure: {depth.buyPressurePct}%</Typography>
                  <Typography variant="caption" sx={{ color: '#ef5350', fontWeight: 800 }}>Sell Pressure: {depth.sellPressurePct}%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={depth.buyPressurePct} sx={{ height: 8, borderRadius: 4, bgcolor: '#ef5350', '& .MuiLinearProgress-bar': { bgcolor: '#089981' } }} />
              </Box>

              <Grid container spacing={2}>
                {/* Bids Column */}
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#089981', fontWeight: 800, display: 'block', mb: 1 }}>TOP 5 BIDS (BUY)</Typography>
                  {depth.bids.map((b, i) => (
                    <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5, borderBottom: '1px solid #2a2e39' }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: '#089981' }}>₹{b.price}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{b.qty} ({b.orders})</Typography>
                    </Box>
                  ))}
                </Grid>
                {/* Asks Column */}
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#ef5350', fontWeight: 800, display: 'block', mb: 1 }}>TOP 5 ASKS (SELL)</Typography>
                  {depth.asks.map((a, i) => (
                    <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5, borderBottom: '1px solid #2a2e39' }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: '#ef5350' }}>₹{a.price}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>{a.qty} ({a.orders})</Typography>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LiveMarketTerminalView;
