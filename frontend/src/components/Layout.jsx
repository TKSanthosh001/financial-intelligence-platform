import React, { useState, useEffect, useRef } from 'react';
import { Box, Drawer, AppBar, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar, Button, IconButton, Chip, Divider, Tooltip } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PieChartIcon from '@mui/icons-material/PieChart';
import PublicIcon from '@mui/icons-material/Public';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SecurityIcon from '@mui/icons-material/Security';
import RefreshIcon from '@mui/icons-material/Refresh';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SpeedIcon from '@mui/icons-material/Speed';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useAuth } from '../context/AuthContext';
import { useMarket } from '../context/MarketContext';

const drawerWidth = 240;

export const Layout = ({ children, activeModule, setActiveModule }) => {
  const { user, loginWithGoogle, logout } = useAuth();
  const { marketStatus, analysisEngine, loading, refreshData } = useMarket();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);

  // ── Live IST Clock ──────────────────────────────────────────────────────────
  const [clockTime, setClockTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setClockTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getISTString = (date) => {
    return date.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const getTimeOfDay = (date) => {
    const h = parseInt(date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', hour12: false }), 10);
    if (h >= 4  && h < 6)  return { label: 'Early Morning', emoji: '🌄', color: '#ff8f00' };
    if (h >= 6  && h < 9)  return { label: 'Morning',       emoji: '☀️',  color: '#fdd835' };
    if (h >= 9  && h < 11) return { label: 'Mid Morning',   emoji: '🌤️', color: '#fb8c00' };
    if (h >= 11 && h < 13) return { label: 'Noon',          emoji: '🌞', color: '#f9a825' };
    if (h >= 13 && h < 15) return { label: 'Afternoon',     emoji: '⛅', color: '#ef6c00' };
    if (h >= 15 && h < 17) return { label: 'Mid Afternoon', emoji: '🌇', color: '#e65100' };
    if (h >= 17 && h < 19) return { label: 'Evening',       emoji: '🌆', color: '#7e57c2' };
    if (h >= 19 && h < 21) return { label: 'Mid Evening',   emoji: '🌃', color: '#5c6bc0' };
    if (h >= 21 && h < 23) return { label: 'Night',         emoji: '🌙', color: '#3949ab' };
    if (h >= 23 || h < 1)  return { label: 'Late Night',    emoji: '🌛', color: '#283593' };
    if (h >= 1  && h < 4)  return { label: 'Midnight',      emoji: '🌌', color: '#1a237e' };
    return { label: 'Night', emoji: '🌙', color: '#3949ab' };
  };

  const tod = getTimeOfDay(clockTime);
  const istTimeStr = getISTString(clockTime);
  // ────────────────────────────────────────────────────────────────────────────

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  const getMoodColor = (mood) => {
    if (!mood) return 'default';
    if (mood.toLowerCase().includes('bullish')) return 'success';
    if (mood.toLowerCase().includes('bearish')) return 'error';
    return 'warning';
  };

  const handleToggleNotifications = async () => {
    if (pushEnabled) {
      setPushEnabled(false);
      return;
    }

    if (!('Notification' in window)) {
      alert('This browser does not support desktop push notifications.');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setPushEnabled(true);
      // Simulate backend register push
      try {
        await fetch('https://financial-intelligence-backend.santhosh-financial.workers.dev/api/register-push', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enabled: true })
        }).catch(() => {});
      } catch (e) {}
    } else {
      alert('Notification permissions were denied.');
    }
  };

  const menuItems = [
    { id: 'dashboard', text: 'Dashboard',              icon: <DashboardIcon /> },
    { id: 'research',  text: '🧠 Research Engine',     icon: <AutoAwesomeIcon sx={{ color: '#2962ff' }} /> },
    { id: 'options',   text: '⚡ Options Trading AI',  icon: <ShowChartIcon sx={{ color: '#f9a825' }} /> },
    { id: 'engine',    text: '📡 Market Data Engine',  icon: <SpeedIcon sx={{ color: '#00b0ff' }} /> },
    { id: 'financials',text: '🏛️ Financial Intelligence',icon: <AccountBalanceIcon sx={{ color: '#ab47bc' }} /> },
    { id: 'agents',    text: 'AI Agent Network',       icon: <AccountTreeIcon /> },
    { id: 'scanner',   text: 'AI Market Scanner',      icon: <FlashOnIcon /> },
    { id: 'news',      text: 'AI Analyzed News',       icon: <NewspaperIcon /> },
    { id: 'portfolio', text: 'Portfolio Manager',       icon: <AccountBalanceWalletIcon /> },
    { id: 'watchlist', text: 'AI Watchlists',          icon: <VisibilityIcon /> },
    { id: 'advisor',   text: 'AI Advisor Chat',        icon: <PsychologyIcon /> },
    { id: 'sectors',   text: 'Sector Heatmap',         icon: <PieChartIcon /> },
    { id: 'global',    text: 'Geopolitical Risk',      icon: <PublicIcon /> },
    { id: 'alerts',    text: 'Market Alerts',          icon: <NotificationsActiveIcon /> },
    { id: 'timeline',  text: 'Market Timeline',        icon: <TimelineIcon /> },
  ];

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2.5, minHeight: 64, display: 'flex', alignItems: 'center', borderBottom: '1px solid #2a2e39' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', background: 'linear-gradient(45deg, #2962ff 30%, #00b0ff 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AEGIS FINANCIAL
        </Typography>
      </Box>
      <Divider sx={{ borderColor: '#2a2e39' }} />
      <List sx={{ px: 1, py: 2, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={activeModule === item.id}
              onClick={() => {
                setActiveModule(item.id);
                setMobileOpen(false); // Close drawer on mobile item click
              }}
              sx={{
                borderRadius: 1.5,
                py: 1,
                px: 2,
                color: activeModule === item.id ? '#ffffff' : 'text.secondary',
                bgcolor: activeModule === item.id ? 'primary.main' : 'transparent',
                '&.Mui-selected:hover': {
                  bgcolor: 'primary.main',
                },
                '&:hover': {
                  bgcolor: activeModule === item.id ? 'primary.main' : 'rgba(255, 255, 255, 0.04)',
                  color: activeModule === item.id ? '#ffffff' : 'text.primary',
                },
                transition: 'all 0.15s ease',
              }}
            >
              <ListItemIcon sx={{ color: activeModule === item.id ? '#ffffff' : 'text.secondary', minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: activeModule === item.id ? 600 : 500 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 'auto', p: 2, borderTop: '1px solid #2a2e39', bgcolor: '#0c101b' }}>
        <Typography variant="caption" display="block" sx={{ color: 'text.disabled', textAlign: 'center', fontSize: '0.7rem' }}>
          v1.0.0 (Beta) • AI Enabled
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>

      {/* ========== SIDEBAR ========== */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="navigation"
      >
        {/* Mobile — slide-over drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: '#0d1117',
              borderRight: '1px solid #2a2e39',
            },
          }}
        >
          {drawerContent}
        </Drawer>
        {/* Desktop — permanent fixed sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: '#0d1117',
              borderRight: '1px solid #2a2e39',
              overflowX: 'hidden',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* ========== RIGHT COLUMN: AppBar + Content ========== */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
        }}
      >
        {/* Top AppBar — scoped only to the content column */}
        <AppBar
          position="fixed"
          sx={{
            width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
            ml: { xs: 0, md: `${drawerWidth}px` },
            bgcolor: '#111524',
            borderBottom: '1px solid #2a2e39',
            boxShadow: 'none',
            zIndex: (theme) => theme.zIndex.appBar,
          }}
        >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
          {/* Hamburger Menu Toggle (Mobile Only) */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Market Status Ticker Summary */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: { xs: 1, md: 0 } }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, letterSpacing: '0.05em', color: 'primary.main', display: 'flex', alignItems: 'center', gap: 0.5, fontSize: { xs: '0.9rem', md: '1.25rem' } }}>
              AEGIS <span style={{ color: '#f0f3fa', fontSize: '0.7rem', fontWeight: 400, display: { xs: 'none', sm: 'inline' } }}>INTEL</span>
            </Typography>
            {analysisEngine && (
              <Chip
                icon={analysisEngine.marketMood.toLowerCase().includes('bullish') ? <TrendingUpIcon style={{ fontSize: '0.8rem' }} /> : <TrendingDownIcon style={{ fontSize: '0.8rem' }} />}
                label={analysisEngine.marketMood}
                color={getMoodColor(analysisEngine.marketMood)}
                variant="outlined"
                size="small"
                sx={{ ml: 1, fontWeight: 700, border: '1px solid', height: 24, fontSize: '0.65rem', display: { xs: 'none', sm: 'inline-flex' } }}
              />
            )}
          </Box>

          {/* ── Live IST Clock + Time-of-Day ── */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'flex' },
              flexDirection: 'column',
              alignItems: 'center',
              mx: 2,
              px: 2,
              borderLeft:  '1px solid #2a2e39',
              borderRight: '1px solid #2a2e39',
            }}
          >
            <Typography
              sx={{
                fontFamily: '"Roboto Mono", monospace',
                fontSize: '0.95rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: tod.color,
                lineHeight: 1.2,
              }}
            >
              {istTimeStr}
            </Typography>
            <Typography sx={{ fontSize: '0.6rem', color: 'text.disabled', letterSpacing: '0.04em', lineHeight: 1 }}>
              {tod.emoji} {tod.label} • IST
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 1.5 } }}>
            {/* Push Notifications Bell Toggle */}
            <Tooltip title={pushEnabled ? "Disable Push Notifications" : "Enable Push Notifications"}>
              <IconButton
                onClick={handleToggleNotifications}
                size="small"
                sx={{
                  color: pushEnabled ? 'success.main' : 'text.secondary',
                  border: `1px solid ${pushEnabled ? '#089981' : '#2a2e39'}`,
                  borderRadius: 1.5,
                  p: 0.75
                }}
              >
                <NotificationsIcon sx={{ fontSize: '1.2rem' }} />
              </IconButton>
            </Tooltip>

            {/* Sync / Refresh */}
            <Tooltip title="Synchronize market feeds">
              <IconButton onClick={refreshData} disabled={loading} size="small" sx={{ color: 'text.secondary', border: '1px solid #2a2e39', borderRadius: 1.5, p: 0.75 }}>
                <RefreshIcon sx={{ fontSize: '1.2rem', animation: loading ? 'spin 1s linear infinite' : 'none' }} />
              </IconButton>
            </Tooltip>

            {/* Google Authentication */}
            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title={`${user.name} (${user.email})`}>
                  <Avatar alt={user.name} src={user.picture} sx={{ width: 30, height: 30, border: '2px solid #2962ff', cursor: 'pointer' }} />
                </Tooltip>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: { xs: 'none', lg: 'block' }, maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 600 }}>
                  {user.givenName || user.name}
                </Typography>
                <Tooltip title="Sign out">
                  <IconButton onClick={logout} size="small" sx={{ color: 'text.secondary' }}>
                    <LogoutIcon sx={{ fontSize: '1rem' }} />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Button
                variant="outlined"
                size="small"
                onClick={handleGoogleLogin}
                startIcon={<GoogleIcon sx={{ fontSize: '0.9rem' }} />}
                sx={{
                  border: '1px solid #2a2e39',
                  color: '#f0f3fa',
                  fontSize: '0.75rem',
                  py: 0.5,
                  px: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.06)', borderColor: '#4285f4' }
                }}
              >
                Sign in with Google
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>




        {/* Main scrollable content — sits below the fixed AppBar */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            px: { xs: 2, md: 3 },
            pb: 4,
            pt: 2,
            /* Offset below the fixed AppBar (toolbar height = 64px) */
            mt: '64px',
            overflowX: 'hidden',
            boxSizing: 'border-box',
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Global CSS for spin animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default Layout;
