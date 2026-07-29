import React from 'react';
import {
  Box, Grid, Paper, Typography, Chip, Button, Divider
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FlashOnIcon from '@mui/icons-material/FlashOn';

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
            INSTITUTIONAL MARKET INTELLIGENCE SNAPSHOT
          </Typography>
        </Box>
        <Chip label="LIVE HIGH-CONVICTION FEED" color="success" size="small" sx={{ fontWeight: 800, fontSize: '0.65rem' }} />
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
            {[
              { label: 'Next 2 Hours', status: 'Bullish', color: '#089981' },
              { label: 'Tomorrow', status: 'Bullish', color: '#089981' },
              { label: 'This Week', status: 'Neutral', color: '#f9a825' },
            ].map((st, i) => (
              <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.4 }}>
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>{st.label}</Typography>
                <Typography variant="caption" sx={{ fontWeight: 800, color: st.color }}>{st.status}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* ── Column 2: Best Opportunities (🔥) & Avoid (⚠️) ── */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39', borderRadius: 1.5, height: '100%' }}>
            <Typography variant="caption" sx={{ color: '#f9a825', fontWeight: 900, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5 }}>
              🔥 BEST HIGH-CONVICTION OPPORTUNITIES
            </Typography>

            {/* Opportunity 1: TCS */}
            <Box sx={{ p: 1.5, bgcolor: '#111524', borderRadius: 1, border: '1px solid #2962ff', mb: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 900, color: 'primary.light' }}>1. TCS</Typography>
                  <Chip label="BUY" color="success" size="small" sx={{ fontWeight: 900, fontSize: '0.6rem', height: 18 }} />
                  <Chip label="Swing • 12 Days" variant="outlined" size="small" sx={{ fontSize: '0.6rem', height: 18, borderColor: '#2a2e39' }} />
                </Box>
                <Typography variant="caption" sx={{ fontWeight: 900, color: '#089981' }}>92% Confidence</Typography>
              </Box>
              <Grid container spacing={1} sx={{ mb: 1 }}>
                <Grid item xs={4}>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', display: 'block' }}>ENTRY ZONE</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 800 }}>₹3785 - 3810</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', display: 'block' }}>STOP LOSS</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#ef5350' }}>₹3690</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.6rem', display: 'block' }}>TARGET</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#089981' }}>₹4020</Typography>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {['✓ Breakout', '✓ FII Buying', '✓ Volume', '✓ Strong Sector'].map((r, idx) => (
                  <Chip key={idx} label={r} size="small" sx={{ fontSize: '0.58rem', height: 16, bgcolor: 'rgba(8,153,129,0.15)', color: '#089981', fontWeight: 800 }} />
                ))}
              </Box>
            </Box>

            {/* Opportunities 2 & 3 */}
            <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
              <Grid item xs={6}>
                <Box sx={{ p: 1, bgcolor: '#111524', borderRadius: 1, border: '1px solid #2a2e39', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ fontWeight: 800 }}>2. HDFC BANK</Typography>
                  <Chip label="90% BUY" color="success" size="small" sx={{ fontWeight: 800, fontSize: '0.6rem', height: 18 }} />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ p: 1, bgcolor: '#111524', borderRadius: 1, border: '1px solid #2a2e39', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ fontWeight: 800 }}>3. ABC LTD</Typography>
                  <Chip label="89% BUY" color="success" size="small" sx={{ fontWeight: 800, fontSize: '0.6rem', height: 18 }} />
                </Box>
              </Grid>
            </Grid>

            {/* Avoid Section */}
            <Box sx={{ p: 1.25, bgcolor: 'rgba(242,54,69,0.06)', borderRadius: 1, border: '1px solid rgba(242,54,69,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="caption" sx={{ color: '#ef5350', fontWeight: 900, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  ⚠️ AVOID: Reliance (Bearish)
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
                  Reason: Distribution & Weak Volume
                </Typography>
              </Box>
              <Chip label="BEARISH" color="error" size="small" sx={{ fontWeight: 800, fontSize: '0.6rem', height: 18 }} />
            </Box>
          </Box>
        </Grid>

        {/* ── Column 3: Portfolio & Alerts (💼 🔔) ── */}
        <Grid item xs={12} md={3}>
          <Box sx={{ p: 2, bgcolor: '#0d1117', border: '1px solid #2a2e39', borderRadius: 1.5, height: '100%' }}>
            <Typography variant="caption" sx={{ color: '#2962ff', fontWeight: 900, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
              💼 YOUR PORTFOLIO & ALERTS
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>Current Net Worth</Typography>
              <Typography variant="body2" sx={{ fontWeight: 900 }}>₹2,34,600</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>Today Gain</Typography>
              <Typography variant="body2" sx={{ fontWeight: 900, color: '#089981' }}>+2.8%</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>Risk / Health</Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, color: '#089981' }}>Low Risk • 91% Health</Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'warning.main', fontWeight: 700, display: 'block', mb: 1.5, fontSize: '0.65rem' }}>
              💡 Action: One stock should be reduced.
            </Typography>

            <Divider sx={{ borderColor: '#2a2e39', my: 1 }} />

            <Typography variant="caption" sx={{ color: '#f9a825', fontWeight: 900, display: 'block', mb: 0.75 }}>
              🔔 ACTIVE MARKET ALERTS
            </Typography>
            {['⚡ Fed Policy Tomorrow', '🛢️ Oil Rising ($84/bbl)', '🟢 FII Bought ₹4,300 Cr', '🚀 Nifty Broke Resistance'].map((alt, idx) => (
              <Typography key={idx} variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.65rem', mb: 0.3 }}>
                • {alt}
              </Typography>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* ── Bottom AI Morning Briefing Note ── */}
      <Box sx={{ mt: 2.5, p: 2, bgcolor: 'rgba(41,98,255,0.06)', borderRadius: 1.5, borderLeft: '4px solid #2962ff', display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        <AutoAwesomeIcon sx={{ color: '#2962ff', mt: 0.2 }} />
        <Box>
          <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 900, letterSpacing: '0.06em', display: 'block', mb: 0.25 }}>
            AI ADVISOR MORNING DIRECTIVE
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.5, fontSize: '0.85rem' }}>
            "Good Morning. Today banks look stronger than IT. Avoid chasing breakouts during the first 15 minutes. Watch TCS. Watch HDFC Bank."
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default InstitutionalSnapshotCard;
