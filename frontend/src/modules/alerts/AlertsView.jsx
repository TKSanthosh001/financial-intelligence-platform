import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid, Paper, Chip, Button, Stack } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PublicIcon from '@mui/icons-material/Public';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import SendIcon from '@mui/icons-material/Send';
import { useMarket } from '../../context/MarketContext';

export const AlertsView = () => {
  const { alerts, loading } = useMarket();
  const [pushStatus, setPushStatus] = useState(
    'Notification' in window ? Notification.permission : 'default'
  );

  const requestPushPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notifications.');
      return;
    }

    const permission = await Notification.requestPermission();
    setPushStatus(permission);

    if (permission === 'granted' && 'serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      reg.showNotification('Aegis Intel Service Active', {
        body: 'Push subscription successfully linked to Santhosh Portfolio Manager.',
        icon: 'logo.svg',
        badge: 'logo.svg'
      });

      // Submit mock subscription registry to backend D1 database
      try {
        await fetch('https://financial-intelligence-backend.santhosh-financial.workers.dev/api/push/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subscription: {
              endpoint: 'mock-endpoint-active',
              keys: { auth: 'mock-auth', p256dh: 'mock-p256dh' }
            }
          })
        });
      } catch (err) {
        console.warn('Subscription DB registry skipped:', err.message);
      }
    }
  };

  const triggerMockPush = async () => {
    if ('serviceWorker' in navigator && pushStatus === 'granted') {
      const reg = await navigator.serviceWorker.ready;
      reg.showNotification('🚨 SWING BREAKOUT DETECTED', {
        body: 'INFY has cleared 20-EMA resistance zone. Volume 3.2x daily average. Confidence: High (92%).',
        icon: 'logo.svg',
        badge: 'logo.svg',
        vibrate: [100, 50, 100],
        actions: [{ action: 'view', title: 'Analyze Trade' }]
      });

      // Submit push trigger telemetry report to backend
      try {
        await fetch('https://financial-intelligence-backend.santhosh-financial.workers.dev/api/push/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payload: 'INFY breakout alert trigger' })
        });
      } catch (e) {
        console.warn('Backend push report skipped:', e.message);
      }
    } else {
      alert('Please enable push notifications first to test the simulation!');
    }
  };

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
    <Box sx={{ animation: 'fadeIn 0.5s ease-out', px: { xs: 1, sm: 2 } }}>
      <Box sx={{ borderLeft: '4px solid #2962ff', pl: 1.5, mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
          Real-time Market Alerts
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          AI-generated explanations for index breakthroughs, volume outliers, and macroeconomic alarms.
        </Typography>
      </Box>

      {/* Push Notifications Configuration Panel */}
      <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #161c2e 0%, #0d111d 100%)', border: '1px solid rgba(41, 98, 255, 0.25)' }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                <NotificationsActiveIcon sx={{ color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#f0f3fa' }}>
                  Aegis Intelligent Push Alerts
                </Typography>
                <Chip 
                  label={pushStatus === 'granted' ? 'ACTIVE & SUBSCRIBED' : 'NOT CONFIGURED'} 
                  color={pushStatus === 'granted' ? 'success' : 'default'} 
                  size="small" 
                  sx={{ fontSize: '0.65rem', fontWeight: 800, height: 20 }}
                />
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                Receive immediate swing trading breakout signals, institutional transaction warnings, and critical geopolitical risk spikes directly on your smartphone or desktop device.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', gap: 1.5, justifyContent: { xs: 'flex-start', md: 'flex-end' }, flexWrap: 'wrap' }}>
              {pushStatus !== 'granted' ? (
                <Button 
                  variant="contained" 
                  startIcon={<DeviceHubIcon />} 
                  onClick={requestPushPermission}
                  sx={{ px: 3, py: 1, fontWeight: 700 }}
                >
                  Enable Push Alerts
                </Button>
              ) : (
                <Button 
                  variant="outlined" 
                  startIcon={<SendIcon />} 
                  onClick={triggerMockPush}
                  sx={{ px: 3, py: 1, fontWeight: 700, borderColor: 'rgba(255, 255, 255, 0.15)', color: '#f0f3fa' }}
                >
                  Trigger Live Test
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

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
