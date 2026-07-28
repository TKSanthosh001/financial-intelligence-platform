import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Paper, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';
import { useMarket } from '../../context/MarketContext';

export const GlobalEventsView = () => {
  const { globalEvents, loading } = useMarket();

  if (loading || !globalEvents) return null;

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-out' }}>
      <Box sx={{ borderLeft: '4px solid #2962ff', pl: 1.5, mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
          Geopolitical Risk Tracker
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Monitoring global elections, sanctions, trade wars, tariffs, and military conflicts.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {globalEvents.map((evt) => (
          <Grid item xs={12} key={evt.id}>
            <Card>
              <CardContent sx={{ p: 2.5 }}>
                {/* Event Name & Status */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <PublicIcon sx={{ color: 'primary.main', fontSize: '1.4rem' }} />
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#f0f3fa', fontSize: '1.1rem' }}>
                      {evt.title}
                    </Typography>
                  </Box>
                  <Chip 
                    label={`STATUS: ${evt.status}`} 
                    color="error" 
                    variant="outlined" 
                    size="small" 
                    sx={{ fontWeight: 700, border: '1px solid' }} 
                  />
                </Box>

                <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700, display: 'block', mb: 1.5, letterSpacing: '0.05em' }}>
                  REGIONAL FINANCIAL IMPACT EXPOSURES
                </Typography>

                {/* Regional Impact Layout Grid */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper sx={{ p: 1.75, bgcolor: '#111524', border: '1px solid #2a2e39', height: '100%' }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.light', display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                        <LanguageIcon sx={{ fontSize: '0.9rem' }} />
                        INDIA EXPOSURE
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', lineHeight: 1.4 }}>
                        {evt.impactIndia}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Paper sx={{ p: 1.75, bgcolor: '#111524', border: '1px solid #2a2e39', height: '100%' }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: 'secondary.main', display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                        <LanguageIcon sx={{ fontSize: '0.9rem' }} />
                        UNITED STATES EXPOSURE
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', lineHeight: 1.4 }}>
                        {evt.impactUs}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Paper sx={{ p: 1.75, bgcolor: '#111524', border: '1px solid #2a2e39', height: '100%' }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: 'warning.light', display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                        <LanguageIcon sx={{ fontSize: '0.9rem' }} />
                        EUROPE EXPOSURE
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', lineHeight: 1.4 }}>
                        {evt.impactIndia} {/* Fallback or simulated europe impact details */}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <Paper sx={{ p: 1.75, bgcolor: '#111524', border: '1px solid #2a2e39', height: '100%' }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: 'error.light', display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                        <LanguageIcon sx={{ fontSize: '0.9rem' }} />
                        CHINA EXPOSURE
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', lineHeight: 1.4 }}>
                        {evt.impactChina}
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <Paper sx={{ p: 1.75, bgcolor: '#111524', border: '1px solid #2a2e39', height: '100%' }}>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: 'success.light', display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                        <LanguageIcon sx={{ fontSize: '0.9rem' }} />
                        EMERGING MARKETS EXPOSURE
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', lineHeight: 1.4 }}>
                        {evt.impactEmerging}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GlobalEventsView;
