import React, { useState, useEffect } from 'react';
import {
  Box, Grid, Card, CardContent, Typography, Chip, Paper, LinearProgress,
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, AlertTitle
} from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import SyncIcon from '@mui/icons-material/Sync';
import SpeedIcon from '@mui/icons-material/Speed';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StorageIcon from '@mui/icons-material/Storage';
import TimelineIcon from '@mui/icons-material/Timeline';
import ShieldIcon from '@mui/icons-material/Shield';
import marketDataEngine from '../../services/marketEngine/MarketDataEngine';
import eventBus from '../../services/marketEngine/EventBus';
import wsManager from '../../services/marketEngine/WebSocketManager';

export const MarketEngineView = () => {
  const [snapshot, setSnapshot] = useState(marketDataEngine.getSnapshot());
  const [wsStatus, setWsStatus] = useState(wsManager.isConnected ? 'connected' : 'polling');
  const [liveTicks, setLiveTicks] = useState([]);
  const [aiTriggers, setAiTriggers] = useState([]);
  const [ticksCount, setTicksCount] = useState(0);

  useEffect(() => {
    // Refresh snapshot every 2 seconds
    const interval = setInterval(() => {
      setSnapshot(marketDataEngine.getSnapshot());
    }, 2000);

    const unsubWs = eventBus.on('ws:status', (data) => {
      setWsStatus(data.status);
    });

    const unsubTick = eventBus.on('market:quote_updated', (tick) => {
      setTicksCount(c => c + 1);
      setLiveTicks(prev => [tick, ...prev].slice(0, 15));
    });

    const unsubTrigger = eventBus.on('ai:trigger', (trig) => {
      setAiTriggers(prev => [trig, ...prev].slice(0, 10));
    });

    return () => {
      clearInterval(interval);
      unsubWs();
      unsubTick();
      unsubTrigger();
    };
  }, []);

  return (
    <Box sx={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* Header */}
      <Box sx={{ borderLeft: '4px solid #00b0ff', pl: 1.5, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <SpeedIcon sx={{ color: '#00b0ff', fontSize: '2rem' }} />
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            Real-Time Market Data Engine
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Institutional-grade multi-provider aggregator, WebSocket streaming, cache layer & AI event triggers.
        </Typography>
      </Box>

      {/* Engine Status Banner */}
      <Paper sx={{ p: 2.5, mb: 3, background: 'linear-gradient(135deg, #0d1117 0%, #161c2e 100%)', border: '1px solid #2a2e39', borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {wsStatus === 'connected' ? <WifiIcon sx={{ color: '#089981' }} /> : <WifiOffIcon sx={{ color: '#f9a825' }} />}
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', fontSize: '0.65rem' }}>CONNECTION STATUS</Typography>
                <Typography variant="body2" sx={{ fontWeight: 800, color: wsStatus === 'connected' ? '#089981' : '#f9a825' }}>
                  {wsStatus === 'connected' ? 'WebSocket Streaming' : 'Polling Fallback (Active)'}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SyncIcon sx={{ color: '#2962ff' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', fontSize: '0.65rem' }}>PROCESSED TICKS</Typography>
                <Typography variant="body2" sx={{ fontWeight: 800 }}>{ticksCount.toLocaleString()} ticks</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <StorageIcon sx={{ color: '#ab47bc' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', fontSize: '0.65rem' }}>ACTIVE PROVIDERS</Typography>
                <Typography variant="body2" sx={{ fontWeight: 800 }}>5 Providers (Yahoo, CoinGecko, RSS, Finnhub, FRED)</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FlashOnIcon sx={{ color: '#f9a825' }} />
              <Box>
                <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', fontSize: '0.65rem' }}>AI EVENT TRIGGERS</Typography>
                <Typography variant="body2" sx={{ fontWeight: 800 }}>{aiTriggers.length} Active</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Left Column: Live Ticks Stream & Scanners */}
        <Grid item xs={12} md={7}>
          {/* Live Ticks Stream */}
          <Card sx={{ border: '1px solid #2a2e39', mb: 3 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <TimelineIcon sx={{ color: '#2962ff' }} /> Live Market Ticks Stream
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ '& th': { borderColor: '#2a2e39', color: 'text.secondary', fontSize: '0.7rem' } }}>
                      <TableCell>Symbol</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Change %</TableCell>
                      <TableCell align="right">Volume</TableCell>
                      <TableCell align="right">Quality</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {liveTicks.map((tick, i) => (
                      <TableRow key={i} sx={{ '& td': { borderColor: '#2a2e39', fontSize: '0.75rem' } }}>
                        <TableCell sx={{ fontWeight: 700, color: 'primary.light' }}>{tick.symbol}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 800 }}>₹{tick.price?.toLocaleString('en-IN')}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 800, color: tick.change >= 0 ? '#089981' : '#ef5350' }}>
                          {tick.change >= 0 ? '+' : ''}{tick.pctChange}%
                        </TableCell>
                        <TableCell align="right">{tick.volume ? (tick.volume / 1000).toFixed(0) + 'K' : 'N/A'}</TableCell>
                        <TableCell align="right">
                          <Chip label={`${tick.qualityScore}%`} size="small" sx={{ fontSize: '0.6rem', height: 18, bgcolor: 'rgba(8,153,129,0.15)', color: '#089981', fontWeight: 800 }} />
                        </TableCell>
                      </TableRow>
                    ))}
                    {liveTicks.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 3, color: 'text.disabled' }}>
                          Listening for real-time market ticks...
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Market Breadth */}
          {snapshot.breadth && (
            <Card sx={{ border: '1px solid #2a2e39' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Market Breadth & Momentum</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Advances: <strong style={{ color: '#089981' }}>{snapshot.breadth.advances}</strong> | Declines: <strong style={{ color: '#ef5350' }}>{snapshot.breadth.declines}</strong>
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#00b0ff' }}>
                    A/D Ratio: {snapshot.breadth.adRatio} ({snapshot.breadth.breadthLabel})
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={snapshot.breadth.advancePct}
                  sx={{ height: 8, borderRadius: 4, bgcolor: '#ef5350', '& .MuiLinearProgress-bar': { bgcolor: '#089981' }, mb: 2 }}
                />
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Right Column: AI Event Triggers & Provider Health */}
        <Grid item xs={12} md={5}>
          {/* AI Event Triggers */}
          <Card sx={{ border: '1px solid rgba(255,168,0,0.3)', bgcolor: 'rgba(255,168,0,0.03)', mb: 3 }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <FlashOnIcon sx={{ color: 'warning.main' }} /> Intelligent AI Event Triggers
              </Typography>
              {aiTriggers.map((trig, i) => (
                <Box key={i} sx={{ p: 1.25, bgcolor: '#0d1117', borderRadius: 1, border: '1px solid #2a2e39', mb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Chip label={trig.type} size="small" color={trig.severity === 'HIGH' ? 'error' : 'warning'} sx={{ fontSize: '0.6rem', fontWeight: 800, height: 18 }} />
                    <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem' }}>
                      {new Date(trig.timestamp).toLocaleTimeString()}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary', display: 'block' }}>
                    {trig.title}
                  </Typography>
                </Box>
              ))}
              {aiTriggers.length === 0 && (
                <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', textAlign: 'center', py: 2 }}>
                  Engine is monitoring for meaningful threshold breaches...
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Provider Health Matrix */}
          <Card sx={{ border: '1px solid #2a2e39' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <ShieldIcon sx={{ color: '#089981' }} /> Active Provider Mesh
              </Typography>
              {[
                { name: 'Yahoo Finance Adapter', status: 'ACTIVE (Primary)', freq: '30s Refresh' },
                { name: 'CoinGecko Crypto Feed', status: 'ACTIVE', freq: '15s Refresh' },
                { name: 'RSS News Engine (5 Outlets)', status: 'ACTIVE', freq: '2m Refresh' },
                { name: 'FRED Macro Indicators', status: 'ACTIVE', freq: '15m Refresh' },
                { name: 'Finnhub Sandbox WS', status: 'STANDBY', freq: 'Live Stream' },
              ].map((p, i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1, borderBottom: i < 4 ? '1px solid #2a2e39' : 'none' }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>{p.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem' }}>{p.freq}</Typography>
                  </Box>
                  <Chip label={p.status} size="small" sx={{ fontSize: '0.6rem', height: 18, fontWeight: 800, bgcolor: p.status.includes('ACTIVE') ? 'rgba(8,153,129,0.15)' : 'rgba(255,255,255,0.05)', color: p.status.includes('ACTIVE') ? '#089981' : 'text.disabled' }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MarketEngineView;
