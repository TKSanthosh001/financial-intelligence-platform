import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Alert, AlertTitle } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { useMarket } from '../../context/MarketContext';
import TrendIndicator from '../../components/TrendIndicator';
import { mockWatchlists } from '../../services/mockDataService';

export const WatchlistView = () => {
  const { watchlists: realWatchlists, loading } = useMarket();
  const [newSymbol, setNewSymbol] = useState('');
  const [activeWatchlistIndex, setActiveWatchlistIndex] = useState(0);

  const isGuest = !realWatchlists || realWatchlists.length === 0;
  const watchlists = isGuest ? mockWatchlists : realWatchlists;

  if (loading || !watchlists || watchlists.length === 0) return null;

  const handleAddSymbol = (e) => {
    e.preventDefault();
    if (isGuest) {
      alert('Watchlist is in Guest Demo mode. Please Sign In at the top right to start tracking your own tickers.');
      setNewSymbol('');
      return;
    }
    if (!newSymbol) return;
    
    // Simulate adding watch item to mock list
    const currentList = watchlists[activeWatchlistIndex];
    currentList.items.push({
      symbol: newSymbol.toUpperCase(),
      price: '₹' + (100 + Math.random() * 900).toFixed(2),
      change: '+1.50',
      pctChange: '+0.85%',
      aiSummary: `Added item. AI monitoring active. Standard consolidation near local supports expected. Sector outlook: Neutral.`
    });
    setNewSymbol('');
  };

  const selectedWatchlist = watchlists[activeWatchlistIndex];

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-out' }}>
      {isGuest && (
        <Alert severity="info" sx={{ mb: 3, border: '1px solid #2962ff', bgcolor: 'rgba(41, 98, 255, 0.05)' }}>
          <AlertTitle sx={{ fontWeight: 800 }}>DEMO SANDBOX ACTIVE</AlertTitle>
          You are viewing Watchlists in Guest Mode. Please click <strong>Sign In</strong> at the top right to start monitoring and receiving custom alert summaries for your own stock picks.
        </Alert>
      )}
      <Box sx={{ borderLeft: '4px solid #2962ff', pl: 1.5, mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
          AI Watchlists
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Create custom monitors and let the NVIDIA NIM engine analyze ticker news feeds.
        </Typography>
      </Box>

      {/* Select watchlist tab list */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 3.5, flexWrap: 'wrap' }}>
        {watchlists.map((wl, i) => (
          <Button 
            key={i}
            variant={activeWatchlistIndex === i ? 'contained' : 'outlined'}
            color={activeWatchlistIndex === i ? 'primary' : 'inherit'}
            onClick={() => setActiveWatchlistIndex(i)}
            sx={{ 
              borderRadius: 2,
              px: 2.5,
              borderColor: '#2a2e39',
              color: activeWatchlistIndex === i ? '#fff' : 'text.secondary',
              '&:hover': { borderColor: '#b2b5be' }
            }}
          >
            {wl.name}
          </Button>
        ))}
      </Box>

      <Grid container spacing={3}>
        {/* Watchlist Table */}
        <Grid item xs={12} lg={9}>
          <TableContainer component={Paper} sx={{ border: '1px solid #2a2e39', mb: 3, overflowX: 'auto' }}>
            <Table sx={{ minWidth: { xs: 600, md: 'auto' } }}>
              <TableHead>
                <TableRow>
                  <TableCell>SYMBOL</TableCell>
                  <TableCell>PRICE</TableCell>
                  <TableCell>CHANGE</TableCell>
                  <TableCell>AI MONITORING ASSESSMENT</TableCell>
                  <TableCell align="center">STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedWatchlist.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontWeight: 700, color: 'primary.light' }}>{item.symbol}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{item.price}</TableCell>
                    <TableCell>
                      <TrendIndicator value={item.change} pctValue={item.pctChange} trend={item.change.startsWith('-') ? 'down' : 'up'} />
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontSize: '0.8rem', fontStyle: 'italic', maxWidth: '350px' }}>
                      {item.aiSummary}
                    </TableCell>
                    <TableCell align="center">
                      <Chip label="MONITORING" color="success" size="small" variant="outlined" sx={{ fontSize: '0.6rem', fontWeight: 700, border: '1px solid' }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Quick Add Form */}
        <Grid item xs={12} lg={3}>
          <Card>
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <VisibilityIcon sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
                Watch New Ticker
              </Typography>
              <Box component="form" onSubmit={handleAddSymbol}>
                <TextField
                  label="Ticker Symbol"
                  size="small"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                  fullWidth
                  placeholder="e.g. TCS, HINDUNILVR"
                  sx={{ mb: 2 }}
                />
                <Button 
                  type="submit" 
                  variant="outlined" 
                  color="primary" 
                  fullWidth 
                  startIcon={<AddIcon />}
                  sx={{ border: '1px solid #2a2e39', color: '#f0f3fa', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)', borderColor: '#b2b5be' } }}
                >
                  Add Ticker
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WatchlistView;
