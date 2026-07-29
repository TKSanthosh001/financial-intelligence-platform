import React, { useState, useEffect } from 'react';
import {
  Box, Drawer, AppBar, Toolbar, Typography, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, IconButton, Badge,
  Avatar, Menu, MenuItem, Divider, Tooltip, Paper, Chip, ListSubheader
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PieChartIcon from '@mui/icons-material/PieChart';
import PublicIcon from '@mui/icons-material/Public';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import TimelineIcon from '@mui/icons-material/Timeline';
import SpeedIcon from '@mui/icons-material/Speed';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MemoryIcon from '@mui/icons-material/Memory';

import { useMarket } from '../context/MarketContext';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 260;

export const Layout = ({ children, activeModule, setActiveModule }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [alertsAnchor, setAlertsAnchor] = useState(null);

  const { marketStatus, alerts } = useMarket();
  const { user, loginWithGoogle, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleAlertsOpen = (e) => setAlertsAnchor(e.currentTarget);
  const handleAlertsClose = () => setAlertsAnchor(null);

  const unreadAlerts = alerts ? alerts.filter(a => !a.read) : [];

  const requestPushNotificationPermission = () => {
    if (!('Notification' in window)) {
      alert('This browser does not support web push notifications.');
      return;
    }
    if (Notification.permission === 'granted') {
      new Notification('AEGIS Financial Intelligence', {
        body: 'Push notifications are active! You will receive high-conviction trade alerts.',
        icon: '/favicon.ico'
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('AEGIS Financial Intelligence', {
            body: 'Push notifications enabled successfully!',
            icon: '/favicon.ico'
          });
        }
      });
    } else {
      alert('Notification permissions were denied in browser settings.');
    }
  };

  const menuCategories = [
    {
      category: '🔥 COMMAND CENTER',
      items: [
        { id: 'commandCenter', text: '🚀 Live Command Center', icon: <PsychologyIcon sx={{ color: '#089981' }} /> },
        { id: 'dashboard', text: '📊 Institutional Dashboard', icon: <DashboardIcon /> },
        { id: 'marketOS', text: '⚙️ 24x7 MarketOS Terminal', icon: <MemoryIcon sx={{ color: '#ab47bc' }} /> },
      ]
    },
    {
      category: '🤖 AI DECISION & THINKING',
      items: [
        { id: 'decision', text: '🎯 Live AI Decision Engine', icon: <FlashOnIcon sx={{ color: '#089981' }} /> },
        { id: 'brain', text: '🧠 Market Brain AI', icon: <PsychologyIcon sx={{ color: '#2962ff' }} /> },
        { id: 'thinking', text: '💭 Trader Thinking Engine', icon: <PsychologyIcon sx={{ color: '#f9a825' }} /> },
        { id: 'options', text: '⚡ Options Trading AI', icon: <ShowChartIcon sx={{ color: '#f9a825' }} /> },
        { id: 'agents', text: '👥 AI Agent Network', icon: <AccountTreeIcon /> },
      ]
    },
    {
      category: '📈 CHARTS & TERMINALS',
      items: [
        { id: 'terminal', text: '⚡ Live Terminal (<50ms)', icon: <FlashOnIcon sx={{ color: '#f9a825' }} /> },
        { id: 'technical', text: '📈 Chart Intelligence AI', icon: <ShowChartIcon sx={{ color: '#089981' }} /> },
        { id: 'financials', text: '🏛️ Financial Intelligence', icon: <AccountBalanceIcon sx={{ color: '#ab47bc' }} /> },
        { id: 'engine', text: '📡 Market Data Engine', icon: <SpeedIcon sx={{ color: '#00b0ff' }} /> },
        { id: 'scanner', text: '🔍 AI Market Scanner', icon: <FlashOnIcon /> },
      ]
    },
    {
      category: '💼 PORTFOLIO & RESEARCH',
      items: [
        { id: 'portfolio', text: '💼 Portfolio Manager', icon: <AccountBalanceWalletIcon /> },
        { id: 'research', text: '🧠 Deep Research Engine', icon: <AutoAwesomeIcon sx={{ color: '#2962ff' }} /> },
        { id: 'news', text: '📰 AI Analyzed News', icon: <NewspaperIcon /> },
        { id: 'watchlist', text: '👁️ AI Watchlists', icon: <VisibilityIcon /> },
        { id: 'advisor', text: '💬 AI Advisor Chat', icon: <PsychologyIcon /> },
      ]
    }
  ];

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2.5, minHeight: 64, display: 'flex', alignItems: 'center', borderBottom: '1px solid #2a2e39' }}>
        <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em', background: 'linear-gradient(45deg, #2962ff 30%, #00b0ff 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          AEGIS FINANCIAL
        </Typography>
      </Box>
      <Divider sx={{ borderColor: '#2a2e39' }} />

      <Box sx={{ overflowY: 'auto', flexGrow: 1, px: 1, py: 1 }}>
        {menuCategories.map((cat, catIdx) => (
          <Box key={catIdx} sx={{ mb: 1.5 }}>
            <Typography variant="caption" sx={{ px: 2, py: 0.5, color: 'text.disabled', fontSize: '0.625rem', fontWeight: 800, letterSpacing: '0.08em', display: 'block' }}>
              {cat.category}
            </Typography>
            <List disablePadding>
              {cat.items.map((item) => (
                <ListItem key={item.id} disablePadding sx={{ mb: 0.25 }}>
                  <ListItemButton
                    selected={activeModule === item.id}
                    onClick={() => {
                      setActiveModule(item.id);
                      setMobileOpen(false);
                    }}
                    sx={{
                      borderRadius: 1.5,
                      py: 0.75,
                      px: 2,
                      color: activeModule === item.id ? '#ffffff' : 'text.secondary',
                      bgcolor: activeModule === item.id ? 'primary.main' : 'transparent',
                      '&.Mui-selected:hover': { bgcolor: 'primary.main' },
                      '&:hover': {
                        bgcolor: activeModule === item.id ? 'primary.main' : 'rgba(255, 255, 255, 0.04)',
                        color: activeModule === item.id ? '#ffffff' : 'text.primary',
                      },
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <ListItemIcon sx={{ color: activeModule === item.id ? '#ffffff' : 'text.secondary', minWidth: 32 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.8rem', fontWeight: activeModule === item.id ? 700 : 500 }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 'auto', p: 1.5, borderTop: '1px solid #2a2e39', bgcolor: '#0c101b' }}>
        <Typography variant="caption" display="block" sx={{ color: 'text.disabled', textAlign: 'center', fontSize: '0.65rem' }}>
          v1.0.0 (Beta) • AEGIS AI Engine
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* ========== SIDEBAR ========== */}
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#0d1117', borderRight: '1px solid #2a2e39' },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', bgcolor: '#0d1117', borderRight: '1px solid #2a2e39' },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* ========== MAIN CONTENT AREA ========== */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#0d1117', borderBottom: '1px solid #2a2e39', zIndex: (theme) => theme.zIndex.drawer - 1 }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' } }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {activeModule.toUpperCase()}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Tooltip title="Enable Push Notifications">
                <IconButton color="inherit" onClick={requestPushNotificationPermission}>
                  <NotificationsActiveIcon sx={{ color: '#089981' }} />
                </IconButton>
              </Tooltip>

              <IconButton color="inherit" onClick={handleAlertsOpen}>
                <Badge badgeContent={unreadAlerts.length} color="error">
                  <NotificationsActiveIcon />
                </Badge>
              </IconButton>

              {user ? (
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                  <Avatar alt={user.name} src={user.picture} sx={{ width: 32, height: 32, bgcolor: '#2962ff' }}>
                    {user.name ? user.name.charAt(0) : 'U'}
                  </Avatar>
                </IconButton>
              ) : (
                <Chip label="Login with Google" onClick={loginWithGoogle} color="primary" sx={{ fontWeight: 700, cursor: 'pointer' }} />
              )}
            </Box>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, bgcolor: '#090d14' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
