import React from 'react';
import { Box, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RemoveIcon from '@mui/icons-material/Remove';

export const TrendIndicator = ({ value, pctValue, trend, showIcon = true }) => {
  const isUp = trend === 'up' || (value && parseFloat(value.toString().replace(/[^0-9.-]/g, '')) > 0);
  const isDown = trend === 'down' || (value && parseFloat(value.toString().replace(/[^0-9.-]/g, '')) < 0);
  
  let color = 'text.secondary';
  let Icon = RemoveIcon;

  if (isUp) {
    color = 'success.main';
    Icon = TrendingUpIcon;
  } else if (isDown) {
    color = 'error.main';
    Icon = TrendingDownIcon;
  }

  const cleanPct = pctValue ? (pctValue.startsWith('+') || pctValue.startsWith('-') ? pctValue : (isUp ? `+${pctValue}` : pctValue)) : '';
  const cleanVal = value ? (value.startsWith('+') || value.startsWith('-') ? value : (isUp ? `+${value}` : value)) : '';

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, color }}>
      {showIcon && <Icon sx={{ fontSize: '1rem' }} />}
      <Typography variant="body2" sx={{ fontWeight: 600, color: 'inherit' }}>
        {cleanVal} {cleanPct && `(${cleanPct})`}
      </Typography>
    </Box>
  );
};

export default TrendIndicator;
