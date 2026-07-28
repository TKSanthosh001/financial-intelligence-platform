import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Paper } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useMarket } from '../../context/MarketContext';

export const TimelineView = () => {
  const { timeline, loading } = useMarket();

  if (loading || !timeline) return null;

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-out' }}>
      <Box sx={{ borderLeft: '4px solid #2962ff', pl: 1.5, mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
          Market Timeline
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          Chronological breakdown of key market breakthroughs, geopolitical reports, and major policy updates.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {timeline.map((period, i) => (
          <Grid item xs={12} key={i}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: 'primary.light', borderBottom: '1px solid #2a2e39', pb: 1, textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.05em' }}>
              {period.period}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl: 1.5, borderLeft: '2px solid #2a2e39', ml: 1 }}>
              {period.events.map((evt, idx) => (
                <Box key={idx} sx={{ position: 'relative' }}>
                  {/* Small round timeline dot indicator */}
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      left: -20, 
                      top: 18, 
                      width: 10, 
                      height: 10, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.main', 
                      border: '2px solid #0c101b' 
                    }} 
                  />
                  <Card>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.disabled' }}>
                        <ScheduleIcon sx={{ fontSize: '0.9rem' }} />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>{evt.time}</Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '0.95rem', color: '#f0f3fa' }}>
                        {evt.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.45, fontSize: '0.8rem' }}>
                        {evt.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TimelineView;
