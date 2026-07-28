import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Paper, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MemoryIcon from '@mui/icons-material/Memory';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SecurityIcon from '@mui/icons-material/Security';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useMarket } from '../../context/MarketContext';

export const AgentsView = () => {
  const { marketStatus, morningReport, swingOpportunities } = useMarket();
  const [speaking, setSpeaking] = useState(false);
  const [tradeDialogOpen, setTradeDialogOpen] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState('');
  const [tradeQty, setTradeQty] = useState(10);
  const [tradeSuccessMsg, setTradeSuccessMsg] = useState('');

  // Paper Trading Orders state
  const [paperOrders, setPaperOrders] = useState([
    { id: 1, ticker: 'INFY', company: 'Infosys Limited', type: 'BUY', qty: 50, entryPrice: 1512.60, stopLoss: 1455.00, targetPrice: 1640.00, status: 'OPEN', pnl: '+₹1,850.00' },
    { id: 2, ticker: 'HDFCBANK', company: 'HDFC Bank Ltd.', type: 'BUY', qty: 40, entryPrice: 1610.20, stopLoss: 1550.00, targetPrice: 1720.00, status: 'OPEN', pnl: '+₹1,240.00' }
  ]);

  // 12 Autonomous Agents Live Status & Memory Payloads
  const agents = [
    { id: 1, name: 'Market Agent', role: 'Macro & Indices Scanner', vote: 'Bullish', confidence: 88, status: 'Active', memory: 'Scanned 16 global benchmarks. Nifty holding above 24,100 support; VIX cool at 13.42.' },
    { id: 2, name: 'Technical Analyst', role: 'Chart Pattern & Indicator Engine', vote: 'Bullish', confidence: 91, status: 'Active', memory: 'Golden cross 20-EMA/50-EMA confirmed on INFY & TCS. RSI 64, MACD expanding.' },
    { id: 3, name: 'News Agent', role: 'Real-time NLP Classification', vote: 'Neutral', confidence: 82, status: 'Active', memory: 'Processed 142 feeds. US Fed rate cut signals offset Brent crude spike to $82.40.' },
    { id: 4, name: 'Geopolitical Agent', role: 'Global Conflict & Tariff Monitor', vote: 'Bearish', confidence: 78, status: 'Active', memory: 'West Asia shipping threats adding 2.3% crude oil risk premium. Aviation margins pressured.' },
    { id: 5, name: 'FII/DII Agent', role: 'Institutional Cash Flow Analyzer', vote: 'Bullish', confidence: 85, status: 'Active', memory: 'DII net buying of ₹2,150 Cr absorbed FII selling. Promoter buying noted in auto space.' },
    { id: 6, name: 'Options Agent', role: 'Derivatives & Option Chain Engine', vote: 'Bullish', confidence: 84, status: 'Active', memory: 'Nifty PCR at 1.15. Max Pain at 24,200. Heavy put writing at 24,000 strike.' },
    { id: 7, name: 'Fundamental Agent', role: 'Valuation & Earnings Auditor', vote: 'Bullish', confidence: 86, status: 'Active', memory: 'IT sector Q1 revenue guidance revised upward to 3-4%. Debt/Equity across holdings < 0.4x.' },
    { id: 8, name: 'Portfolio Agent', role: 'Asset Allocation & Overlap Risk', vote: 'Neutral', confidence: 89, status: 'Active', memory: 'Concentration in Private Banking detected. Recommended partial profit booking in Reliance.' },
    { id: 9, name: 'Watchlist Agent', role: 'Real-time Security Sentinel', vote: 'Bullish', confidence: 87, status: 'Active', memory: 'Monitoring 12 watchlists. Volume breakout spike triggered for Infosys (+3.45%).' },
    { id: 10, name: 'Risk Manager', role: 'Position Sizing & Volatility Guard', vote: 'Neutral', confidence: 94, status: 'Active', memory: 'Portfolio Risk Score: 5.8/10. Recommended max position size of 8% per swing candidate.' },
    { id: 11, name: 'AI Memory Agent', role: 'RAG Vector Memory Recall', vote: 'Bullish', confidence: 90, status: 'Active', memory: 'Retrieved 2024 Fed rate pivot cycle patterns. Current setup matches 78% win-rate historical cluster.' },
    { id: 12, name: 'Learning Agent', role: 'Self-Improving Accuracy Tuning', vote: 'Bullish', confidence: 93, status: 'Active', memory: 'Evaluated last 50 swing recommendations: 82% win rate achieved. Auto-tuned confidence weights.' }
  ];

  // Voice Mode Synthesizer
  const handleSpeakBriefing = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-Speech voice mode is not supported by your browser.');
      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const text = `Good morning Santhosh. Here is your institutional AI briefing. The 12-agent ensemble consensus is Bullish with an 88 percent confidence score. Top swing trading candidates include Infosys and HDFC Bank. Geopolitical risks remain active around crude oil at 82 dollars. Overall portfolio health is strong.`;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleOpenTradeDialog = (ticker) => {
    setSelectedTicker(ticker);
    setTradeDialogOpen(true);
  };

  const handleExecutePaperTrade = () => {
    const newOrder = {
      id: Date.now(),
      ticker: selectedTicker,
      company: `${selectedTicker} Corp`,
      type: 'BUY',
      qty: parseInt(tradeQty),
      entryPrice: 1500.00,
      stopLoss: 1450.00,
      targetPrice: 1620.00,
      status: 'OPEN',
      pnl: '₹0.00'
    };

    setPaperOrders([newOrder, ...paperOrders]);
    setTradeSuccessMsg(`Paper trade executed: Bought ${tradeQty} shares of ${selectedTicker}`);
    setTradeDialogOpen(false);
    setTimeout(() => setTradeSuccessMsg(''), 4000);
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Page Header */}
      <Box sx={{ borderLeft: '4px solid #2962ff', pl: 1.5, mb: 3.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccountTreeIcon sx={{ color: 'primary.main' }} /> AI Multi-Agent Command Center
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            12 Autonomous AI Agents continuously monitoring markets, conducting technical audits, evaluating geopolitics, and tuning predictive confidence.
          </Typography>
        </Box>

        <Button
          variant="contained"
          color={speaking ? 'error' : 'primary'}
          onClick={handleSpeakBriefing}
          startIcon={<VolumeUpIcon />}
          sx={{ borderRadius: 2, fontWeight: 700 }}
        >
          {speaking ? 'Stop Voice Briefing' : 'Voice Mode: Morning Brief'}
        </Button>
      </Box>

      {tradeSuccessMsg && (
        <Alert severity="success" sx={{ mb: 3 }}>{tradeSuccessMsg}</Alert>
      )}

      {/* Master Orchestrator Consensus Banner */}
      <Paper sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #111524 0%, #161c2e 100%)', border: '1px solid #2a2e39', borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Chip label="MASTER ORCHESTRATOR" color="primary" size="small" sx={{ fontWeight: 800, fontSize: '0.65rem' }} />
              <Chip label="12 AGENTS IN CONSENSUS" color="success" size="small" sx={{ fontWeight: 800, fontSize: '0.65rem' }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.light', mb: 1 }}>
              Decision Engine Outlook: Strong Buy / Accumulate Strategy
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
              The Master Orchestrator combined evaluation from all 12 autonomous agents. Technical outperformance (+91%), strong DII liquidity (+85%), and positive IT sector guidance (+86%) outweigh geopolitical crude oil risks (-78%).
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block' }}>ENSEMBLE CONFIDENCE SCORE</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, color: 'success.main', my: 0.5 }}>88%</Typography>
            <LinearProgress variant="determinate" value={88} sx={{ height: 8, borderRadius: 4, bgcolor: '#161c2e' }} />
          </Grid>
        </Grid>
      </Paper>

      {/* 12 Agents Status Grid */}
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <PsychologyIcon sx={{ color: 'primary.main' }} /> Autonomous Agent RAG Network
      </Typography>

      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {agents.map((agent) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={agent.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #2a2e39', bgcolor: '#111524' }}>
              <CardContent sx={{ p: 2, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.light' }}>
                    Agent {agent.id}: {agent.name}
                  </Typography>
                  <Chip 
                    label={agent.vote} 
                    color={agent.vote === 'Bullish' ? 'success' : agent.vote === 'Bearish' ? 'error' : 'default'} 
                    size="small" 
                    sx={{ fontSize: '0.6rem', height: 18, fontWeight: 800 }} 
                  />
                </Box>

                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5, fontSize: '0.7rem' }}>
                  {agent.role}
                </Typography>

                <Box sx={{ p: 1.25, bgcolor: '#161c2e', borderRadius: 1.5, borderLeft: '3px solid #2962ff', mb: 1.5 }}>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <MemoryIcon sx={{ fontSize: '0.8rem', color: 'primary.main' }} /> RAG Memory Recall:
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.35, mt: 0.5, fontSize: '0.68rem' }}>
                    {agent.memory}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: 'text.disabled' }}>Confidence:</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: 'success.light' }}>{agent.confidence}%</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Paper Trading & Execution Terminal */}
      <Card sx={{ border: '1px solid #2a2e39', mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShoppingCartIcon sx={{ color: 'primary.main' }} /> Institutional Paper Trading Terminal
            </Typography>
            <Button variant="outlined" size="small" onClick={() => handleOpenTradeDialog('INFY')} sx={{ borderRadius: 2 }}>
              + Simulate New Swing Order
            </Button>
          </Box>

          <TableContainer component={Box} sx={{ bgcolor: 'transparent', overflowX: 'auto' }}>
            <Table size="small" sx={{ minWidth: { xs: 650, md: 'auto' } }}>
              <TableHead>
                <TableRow sx={{ borderBottom: '2px solid #2a2e39' }}>
                  <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>TICKER</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>ACTION</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>QUANTITY</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>ENTRY PRICE</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>STOP LOSS</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>TARGET EXIT</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontWeight: 700 }}>STATUS</TableCell>
                  <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 700 }}>UNREALIZED PnL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paperOrders.map((order) => (
                  <TableRow key={order.id} sx={{ borderBottom: '1px solid #161c2e' }}>
                    <TableCell sx={{ fontWeight: 800, color: 'primary.light' }}>{order.ticker}</TableCell>
                    <TableCell><Chip label={order.type} color="success" size="small" sx={{ fontWeight: 800, height: 20, fontSize: '0.65rem' }} /></TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{order.qty}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>₹{order.entryPrice.toFixed(2)}</TableCell>
                    <TableCell sx={{ color: 'error.light', fontWeight: 600 }}>₹{order.stopLoss.toFixed(2)}</TableCell>
                    <TableCell sx={{ color: 'success.main', fontWeight: 600 }}>₹{order.targetPrice.toFixed(2)}</TableCell>
                    <TableCell><Chip label={order.status} color="primary" variant="outlined" size="small" sx={{ fontSize: '0.65rem', height: 20 }} /></TableCell>
                    <TableCell align="right" sx={{ color: 'success.main', fontWeight: 800 }}>{order.pnl}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Trade Simulation Modal Dialog */}
      <Dialog open={tradeDialogOpen} onClose={() => setTradeDialogOpen(false)}>
        <DialogTitle sx={{ fontWeight: 800 }}>Simulate Swing Trade Order ({selectedTicker})</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            Risk Manager Agent recommended position size: <strong>Max 10-15 shares</strong> based on 1.5% portfolio risk budget.
          </Typography>
          <TextField
            label="Share Quantity"
            type="number"
            value={tradeQty}
            onChange={(e) => setTradeQty(e.target.value)}
            fullWidth
            size="small"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTradeDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleExecutePaperTrade} variant="contained" color="primary">Confirm Order</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AgentsView;
