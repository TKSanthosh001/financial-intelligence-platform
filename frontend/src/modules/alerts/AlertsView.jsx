import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Paper, Chip } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PublicIcon from '@mui/icons-material/Public';
import { useMarket } from '../../context/MarketContext';

export const AlertsView = () => {
  const { alerts, loading } = useMarket();

  if (loading || !alerts) return null;

  const getAlertIcon = (type) => {
    switch (type) {
      case 'Indicator Spike':
        return <ShowChartIcon sx={{ color: 'warning.main', fontSize: '1.4rem' }} />;
      case 'Geopolitical Action':
      case 'War News':
        return <PublicIcon sx={{ color: 'error.main', fontSize: '1.4rem' }} />;
      default:
        return <NotificationsActiveIcon sx={{ color: 'primary.main', fontSize: '1.4rem' }} />;
    }
  };

  const getAlertBorderColor = (type) => {
    if (type.includes('Spike')) return 'rgba(255, 152, 0, 0.3)';
    if (type.includes('Action') || type.includes('War')) return 'rgba(242, 54, 69, 0.3)';
    return 'rgba(41, 98, 255, 0.3)';
  };

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-out' }}>
      <Box sx={{ borderLeft: '4px solid #2962ff', pl: 1.5, mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
          Real-time Market Alerts
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          AI generated explanations for index breakthroughs, volume outliers, and macroeconomic alarms.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {alerts.map((alert) => (
          <Grid item xs={12} key={alert.id}>
            <Card 
              sx={{ 
                borderLeft: `5px solid ${alert.type.includes('Spike') ? '#ff9800' : alert.type.includes('Action') ? '#f23645' : '#2962ff'}`,
                borderColor: getAlertBorderColor(alert.type)
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {getAlertIcon(alert.type)}
                    <Chip label={alert.type} size="small" variant="outlined" sx={{ fontSize: '0.65rem', fontWeight: 700 }} />
                    <Chip label={alert.symbol} size="small" variant="filled" sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', fontSize: '0.65rem', fontWeight: 700 }} />
                  </Box>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 600 }}>
                    {alert.time}
                  </Typography>
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 700, color: '#f0f3fa', mb: 1.5 }}>
                  {alert.title}
                </Typography>

                <Paper sx={{ p: 2, bgcolor: '#111524', border: '1px solid #2a2e39', mt: 2 }}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontWeight: 700, fontSize: '0.75rem', color: 'primary.light', mb: 1, letterSpacing: '0.05em' }}>
                    <InfoOutlinedIcon sx={{ fontSize: '1rem' }} />
                    AI MANAGER IMPACT EVALUATION
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.5, fontSize: '0.825rem' }}>
                    {alert.explanation}
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AlertsView;
