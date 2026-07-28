import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Chip, Divider, Paper } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InfoIcon from '@mui/icons-material/Info';
import { useMarket } from '../../context/MarketContext';

export const SectorsView = () => {
  const { sectors, loading } = useMarket();

  if (loading || !sectors) return null;

  const getTrendColor = (trend) => {
    if (trend.toLowerCase().includes('bullish')) return 'success';
    if (trend.toLowerCase().includes('bearish')) return 'error';
    return 'warning';
  };

  const getTrendIcon = (trend) => {
    if (trend.toLowerCase().includes('bullish')) return <ArrowUpwardIcon sx={{ fontSize: '0.9rem' }} />;
    if (trend.toLowerCase().includes('bearish')) return <ArrowDownwardIcon sx={{ fontSize: '0.9rem' }} />;
    return <InfoIcon sx={{ fontSize: '0.9rem' }} />;
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-out' }}>
      <Box sx={{ borderLeft: '4px solid #2962ff', pl: 1.5, mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
          Sector Allocation Analysis
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Real-time trend analysis, opportunities mapping, and news indicators of industry sectors.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {sectors.map((sec, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ p: 2.5, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '1.1rem', color: '#f0f3fa' }}>
                    {sec.name}
                  </Typography>
                  <Chip 
                    label={sec.trend} 
                    color={getTrendColor(sec.trend)}
                    icon={getTrendIcon(sec.trend)}
                    size="small"
                    sx={{ fontWeight: 700, px: 0.5 }}
                  />
                </Box>

                <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 600, display: 'block', mb: 0.5, letterSpacing: '0.02em' }}>
                  RECENT INDUSTRY CUE
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', fontStyle: 'italic', mb: 2, fontSize: '0.8rem' }}>
                  "{sec.news}"
                </Typography>

                <Divider sx={{ borderColor: '#2a2e39', mb: 2 }} />

                <Grid container spacing={2}>
                  {/* Strengths & Weaknesses */}
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: 'success.light', fontWeight: 700, display: 'block', mb: 0.5 }}>
                      STRENGTHS
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', lineHeight: 1.35 }}>
                      {sec.strength}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: 'error.light', fontWeight: 700, display: 'block', mb: 0.5 }}>
                      WEAKNESSES
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', lineHeight: 1.35 }}>
                      {sec.weakness}
                    </Typography>
                  </Grid>

                  {/* Opportunities & Risks */}
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 700, display: 'block', mb: 0.5 }}>
                      OPPORTUNITIES
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', lineHeight: 1.35 }}>
                      {sec.opportunities}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" sx={{ color: 'warning.light', fontWeight: 700, display: 'block', mb: 0.5 }}>
                      RISKS
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', lineHeight: 1.35 }}>
                      {sec.risks}
                    </Typography>
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

export default SectorsView;
