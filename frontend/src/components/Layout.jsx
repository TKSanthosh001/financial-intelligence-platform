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
import { useAuth } from '../context/AuthContext';
import { useMarket } from '../context/MarketContext';

const drawerWidth = 240;

export const Layout = ({ children, activeModule, setActiveModule }) => {
  const { user, loginWithGoogle, logout } = useAuth();
  const { marketStatus, analysisEngine, loading, refreshData } = useMarket();

  const menuItems = [
    { id: 'dashboard', text: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'news', text: 'AI Analyzed News', icon: <NewspaperIcon /> },
    { id: 'portfolio', text: 'AI Portfolio Manager', icon: <AccountBalanceWalletIcon /> },
    { id: 'watchlist', text: 'AI Watchlists', icon: <VisibilityIcon /> },
    { id: 'advisor', text: 'AI Investment Advisor', icon: <PsychologyIcon /> },
    { id: 'sectors', text: 'Sector Heatmap', icon: <PieChartIcon /> },
    { id: 'global', text: 'Geopolitical Risk', icon: <PublicIcon /> },
    { id: 'alerts', text: 'Market Alerts', icon: <NotificationsActiveIcon /> },
    { id: 'timeline', text: 'Market Timeline', icon: <TimelineIcon /> },
  ];

  const handleGoogleLogin = () => {
    // In actual Google login, we'd trigger the OAuth flow.
    // For local validation, we pass a simulated success credential.
    loginWithGoogle({ credential: 'mock-google-credential' });
  };

  const getMoodColor = (mood) => {
    if (!mood) return 'default';
    if (mood.toLowerCase().includes('bullish')) return 'success';
    if (mood.toLowerCase().includes('bearish')) return 'error';
    return 'warning';
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Top Header */}
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: '#111524', borderBottom: '1px solid #2a2e39', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
          {/* Market Status Ticker Summary */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, letterSpacing: '0.05em', color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
              ANTIGRAVITY <span style={{ color: '#f0f3fa', fontSize: '0.8rem', fontWeight: 400 }}>INTEL</span>
            </Typography>
            {analysisEngine && (
              <Chip
                icon={analysisEngine.marketMood.toLowerCase().includes('bullish') ? <TrendingUpIcon /> : <TrendingDownIcon />}
                label={`Market Mood: ${analysisEngine.marketMood} (${analysisEngine.probability})`}
                color={getMoodColor(analysisEngine.marketMood)}
                variant="outlined"
                size="small"
                sx={{ ml: 2, fontWeight: 600, border: '1px solid' }}
              />
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Sync Status / Refresh */}
            <Tooltip title="Synchronize market data and refresh analysis">
              <IconButton onClick={refreshData} disabled={loading} size="small" sx={{ color: 'text.secondary', border: '1px solid #2a2e39', borderRadius: 1.5, p: 0.75 }}>
                <RefreshIcon sx={{ fontSize: '1.2rem', animation: loading ? 'spin 1s linear infinite' : 'none' }} />
              </IconButton>
            </Tooltip>

            {/* Active Workspace / Sandboxed Label */}
            <Chip 
              icon={<SecurityIcon style={{ fontSize: '0.9rem', color: '#888' }} />} 
              label="Active Workspace: Local Sandbox" 
              variant="outlined" 
              size="small" 
              sx={{ color: 'text.secondary', borderColor: '#2a2e39', display: { xs: 'none', md: 'flex' } }}
            />

            {/* Google Authentication */}
            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar alt={user.name} src={user.picture} sx={{ width: 32, height: 32, border: '1px solid #2962ff' }} />
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1 }}>{user.name}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>Authorized</Typography>
                </Box>
                <IconButton onClick={logout} size="small" sx={{ color: 'text.secondary' }}>
                  <LogoutIcon sx={{ fontSize: '1.1rem' }} />
                </IconButton>
              </Box>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={handleGoogleLogin}
                sx={{ border: '1px solid #2a2e39', color: '#f0f3fa', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)', borderColor: '#b2b5be' } }}
              >
                Sign In with Google
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#111524',
            borderRight: '1px solid #2a2e39',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ p: 2.5, minHeight: 64, display: 'flex', alignItems: 'center', borderBottom: '1px solid #2a2e39' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', background: 'linear-gradient(45deg, #2962ff 30%, #00b0ff 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AEGIS FINANCIAL
          </Typography>
        </Box>
        <Divider sx={{ borderColor: '#2a2e39' }} />
        <List sx={{ px: 1, py: 2 }}>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={activeModule === item.id}
                onClick={() => setActiveModule(item.id)}
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
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)`, minHeight: '100vh', pt: 11 }}>
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
