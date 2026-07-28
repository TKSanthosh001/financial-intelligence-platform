import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box, CircularProgress, Typography } from '@mui/material';
import theme from './theme/theme';
import { AuthProvider } from './context/AuthContext';
import { MarketProvider, useMarket } from './context/MarketContext';
import Layout from './components/Layout';

// Module View Imports
import DashboardView from './modules/dashboard/DashboardView';
import NewsView from './modules/news/NewsView';
import PortfolioView from './modules/portfolio/PortfolioView';
import WatchlistView from './modules/watchlist/WatchlistView';
import AdvisorView from './modules/advisor/AdvisorView';
import SectorsView from './modules/sectors/SectorsView';
import GlobalEventsView from './modules/global/GlobalEventsView';
import AlertsView from './modules/alerts/AlertsView';
import TimelineView from './modules/timeline/TimelineView';

const AppContent = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const { loading, error } = useMarket();

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardView />;
      case 'news':
        return <NewsView />;
      case 'portfolio':
        return <PortfolioView />;
      case 'watchlist':
        return <WatchlistView />;
      case 'advisor':
        return <AdvisorView />;
      case 'sectors':
        return <SectorsView />;
      case 'global':
        return <GlobalEventsView />;
      case 'alerts':
        return <AlertsView />;
      case 'timeline':
        return <TimelineView />;
      default:
        return <DashboardView />;
    }
  };

  if (loading && !error) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', bgcolor: 'background.default', color: '#f0f3fa' }}>
        <CircularProgress size={50} thickness={4} sx={{ color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" sx={{ letterSpacing: '0.1em', fontWeight: 600, color: 'text.secondary' }}>
          SYNCHRONIZING GLOBAL FEEDS...
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled', mt: 1 }}>
          Calibrating indices, oil, gold, yields, and geopolitical risk logs
        </Typography>
      </Box>
    );
  }

  return (
    <Layout activeModule={activeModule} setActiveModule={setActiveModule}>
      {error && (
        <Box sx={{ p: 2, mb: 3, bgcolor: 'rgba(242, 54, 69, 0.1)', border: '1px solid #f23645', borderRadius: 1.5 }}>
          <Typography color="error" variant="body2" sx={{ fontWeight: 600 }}>
            Sync Error: {error}
          </Typography>
        </Box>
      )}
      {renderModule()}
    </Layout>
  );
};

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <MarketProvider>
          <AppContent />
        </MarketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
