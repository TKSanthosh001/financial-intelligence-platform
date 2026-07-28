import React, { useState } from 'react';
import { Box, Drawer, AppBar, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Avatar, Button, IconButton, Chip, Divider, Tooltip } from '@mui/material';
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
import { useAuth } from '../context/AuthContext';
import { useMarket } from '../context/MarketContext';

const drawerWidth = 240;

export const Layout = ({ children, activeModule, setActiveModule }) => {
  const { user, loginWithGoogle, logout } = useAuth();
  const { marketStatus, analysisEngine, loading, refreshData } = useMarket();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleGoogleLogin = () => {
    loginWithGoogle({ credential: 'mock-google-credential' });
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
    { id: 'dashboard', text: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'news', text: 'AI Analyzed News', icon: <NewspaperIcon /> },
    { id: 'portfolio', text: 'Santhosh Portfolio Manager', icon: <AccountBalanceWalletIcon /> },
    { id: 'watchlist', text: 'AI Watchlists', icon: <VisibilityIcon /> },
    { id: 'advisor', text: 'AI Investment Advisor', icon: <PsychologyIcon /> },
    { id: 'sectors', text: 'Sector Heatmap', icon: <PieChartIcon /> },
    { id: 'global', text: 'Geopolitical Risk', icon: <PublicIcon /> },
    { id: 'alerts', text: 'Market Alerts', icon: <NotificationsActiveIcon /> },
    { id: 'timeline', text: 'Market Timeline', icon: <TimelineIcon /> },
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
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Top Header */}
      <AppBar 
        position="fixed" 
        sx={{ 
          width: { md: `calc(100% - ${drawerWidth}px)` }, 
          ml: { md: `${drawerWidth}px` }, 
          bgcolor: '#111524', 
          borderBottom: '1px solid #2a2e39', 
          boxShadow: 'none' 
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
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

            {/* Sync Status / Refresh */}
            <Tooltip title="Synchronize market feeds">
              <IconButton onClick={refreshData} disabled={loading} size="small" sx={{ color: 'text.secondary', border: '1px solid #2a2e39', borderRadius: 1.5, p: 0.75 }}>
                <RefreshIcon sx={{ fontSize: '1.2rem', animation: loading ? 'spin 1s linear infinite' : 'none' }} />
              </IconButton>
            </Tooltip>

            {/* Google Authentication */}
            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar alt={user.name} src={user.picture} sx={{ width: 28, height: 28, border: '1px solid #2962ff' }} />
                <IconButton onClick={logout} size="small" sx={{ color: 'text.secondary' }}>
                  <LogoutIcon sx={{ fontSize: '1rem' }} />
                </IconButton>
              </Box>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={handleGoogleLogin}
                sx={{ border: '1px solid #2a2e39', color: '#f0f3fa', fontSize: '0.75rem', py: 0.4, px: 1.2, '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)', borderColor: '#b2b5be' } }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawers: Temporary for Mobile, Permanent for Desktop */}
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#111524', borderRight: '1px solid #2a2e39' },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#111524', borderRight: '1px solid #2a2e39' },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content Area */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, md: 3 }, 
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` }, 
          minHeight: '100vh', 
          pt: 11,
          overflowX: 'hidden' 
        }}
      >
        {children}
      </Box>

      {/* CSS Injection for custom spin animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
};

export default Layout;
