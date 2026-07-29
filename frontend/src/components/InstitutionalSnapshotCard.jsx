import React from 'react';
import {
  Box, Grid, Paper, Typography, Chip, Divider
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export const InstitutionalSnapshotCard = () => {
  return (
    <Paper
      sx={{
        p: 3,
        mb: 4,
        background: 'linear-gradient(135deg, #0d1117 0%, #161c2e 100%)',
        border: '1px solid rgba(8,153,129,0.3)',
        borderRadius: 2,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        animation: 'fadeIn 0.5s ease-out'
      }}
    >
      {/* ── Top Header Bar ── */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, pb: 1.5, borderBottom: '1px solid #2a2e39', flexWrap: 'wrap', gap: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#089981', boxShadow: '0 0 12px #089981', animation: 'pulse 1.5s infinite' }} />
          <Typography variant="h5" sx={{ fontWeight: 900, color: '#f0f3fa', letterSpacing: '-0.02em' }}>
            Good Morning, Santhosh
          </Typography>
        </Box>
        <Chip label="LIVE MARKET BRIEFING" color="success" size="small" sx={{ fontWeight: 800, fontSize: '0.65rem' }} />
      </Box>

      <Grid container spacing={3}>
        {/* ── Column 1: Market Status (🟢) ── */}
        <Grid item xs={12} md={3}>
          <Box sx={{ p: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39', borderRadius: 1.5, height: '100%' }}>
            <Typography variant="caption" sx={{ color: '#089981', fontWeight: 900, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
              🟢 MARKET STATUS
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#089981', mb: 0.5 }}>
              Bullish
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>
              AI Confidence: <strong style={{ color: '#089981' }}>91%</strong>
            </Typography>
            <Divider sx={{ borderColor: '#2a2e39', my: 1 }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
              TODAY'S STORY
            </Typography>
            {['• Banks leading', '• IT weak', '• FII bought ₹4200 Cr', '• Oil stable', '• No major global risk'].map((st, i) => (
              <Typography key={i} variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.65rem', mb: 0.2 }}>
                {st}
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* ── Column 2: Action Required (🔥 BUY HDFC Bank) & Sell Watch (⚠) ── */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39', borderRadius: 1.5, height: '100%' }}>
            <Typography variant="caption" sx={{ color: '#f9a825', fontWeight: 900, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5 }}>
              🔥 ACTION REQUIRED
            </Typography>

            {/* Action Item: HDFC Bank */}
            <Box sx={{ p: 2, bgcolor: '#111524', borderRadius: 1.5, border: '1px solid #089981', mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label="BUY" color="success" size="small" sx={{ fontWeight: 900, fontSize: '0.65rem', height: 20 }} />
                  <Typography variant="h6" sx={{ fontWeight: 900, color: 'primary.light' }}>HDFC Bank</Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 900, color: '#089981' }}>94% Confidence</Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', display: 'block' }}>ENTRY ZONE</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>₹2058 - 2065</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', display: 'block' }}>TARGET</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: '#089981' }}>₹2175</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', display: 'block' }}>RISK LEVEL</Typography>
                  <Chip label="Low Risk" color="success" size="small" sx={{ fontWeight: 800, fontSize: '0.6rem', height: 18 }} />
                </Grid>
              </Grid>
            </Box>

            {/* Sell Watch Section */}
            <Box sx={{ p: 1.5, bgcolor: 'rgba(242,54,69,0.06)', borderRadius: 1, border: '1px solid rgba(242,54,69,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WarningAmberIcon sx={{ color: '#ef5350', fontSize: '1.2rem' }} />
                <Box>
                  <Typography variant="caption" sx={{ color: '#ef5350', fontWeight: 900, display: 'block' }}>
                    ⚠ SELL WATCH: ABC Ltd
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
                    Reason: Momentum weakening
                  </Typography>
                </Box>
              </Box>
              <Chip label="SELL WATCH" color="error" size="small" sx={{ fontWeight: 800, fontSize: '0.6rem', height: 18 }} />
            </Box>
          </Box>
        </Grid>

        {/* ── Column 3: Portfolio (💼) ── */}
        <Grid item xs={12} md={3}>
          <Box sx={{ p: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39', borderRadius: 1.5, height: '100%' }}>
            <Typography variant="caption" sx={{ color: '#2962ff', fontWeight: 900, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5 }}>
              💼 PORTFOLIO SUMMARY
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>Verified Groww Net Worth</Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#f0f3fa', mb: 0.5 }}>₹97,845.00</Typography>
            <Typography variant="body2" sx={{ fontWeight: 800, color: '#ef5350', mb: 1 }}>-0.96% Today (-₹5,157 Total P&L)</Typography>
            <Divider sx={{ borderColor: '#2a2e39', my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>Groww Portfolio Health</Typography>
              <Chip label="72% HEALTH" color="warning" size="small" sx={{ fontWeight: 900, fontSize: '0.6rem', height: 18 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* ── Bottom AI Morning Directive Note ── */}
      <Box sx={{ mt: 2.5, p: 2, bgcolor: 'rgba(41,98,255,0.06)', borderRadius: 1.5, borderLeft: '4px solid #2962ff', display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        <AutoAwesomeIcon sx={{ color: '#2962ff', mt: 0.2 }} />
        <Box>
          <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 900, letterSpacing: '0.06em', display: 'block', mb: 0.25 }}>
            AI MESSAGE DIRECTIVE
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.5, fontSize: '0.85rem', fontWeight: 600 }}>
            "Wait for the first 15 minutes. Do not chase breakouts. Watch HDFC Bank."
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default InstitutionalSnapshotCard;
