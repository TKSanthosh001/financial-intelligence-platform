import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box, CircularProgress, Typography } from '@mui/material';
import theme from './theme/theme';
import { AuthProvider } from './context/AuthContext';
import { MarketProvider, useMarket } from './context/MarketContext';
import Layout from './components/Layout';

// Module View Imports
import DashboardView from './modules/dashboard/DashboardView';
import NewsView from './modules/news/NewsView';
import { PortfolioView } from './modules/portfolio/PortfolioView';
import { WatchlistView } from './modules/watchlist/WatchlistView';
import { ScannerView } from './modules/scanner/ScannerView';
import { AgentsView } from './modules/agents/AgentsView';
import AdvisorView from './modules/advisor/AdvisorView';
import SectorsView from './modules/sectors/SectorsView';
import GlobalEventsView from './modules/global/GlobalEventsView';
import AlertsView from './modules/alerts/AlertsView';
import TimelineView from './modules/timeline/TimelineView';
import { ResearchView } from './modules/research/ResearchView';
import { OptionsView } from './modules/options/OptionsView';
import { MarketEngineView } from './modules/engine/MarketEngineView';
import { FinancialIntelligenceView } from './modules/financials/FinancialIntelligenceView';
import { TechnicalView } from './modules/technical/TechnicalView';
import { LiveMarketTerminalView } from './modules/terminal/LiveMarketTerminalView';
import { MarketBrainView } from './modules/brain/MarketBrainView';

const AppContent = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const { loading, error } = useMarket();

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardView />;
      case 'agents':
        return <AgentsView />;
      case 'scanner':
        return <ScannerView />;
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
      case 'research':
        return <ResearchView />;
      case 'options':
        return <OptionsView />;
      case 'engine':
        return <MarketEngineView />;
      case 'financials':
        return <FinancialIntelligenceView />;
      case 'technical':
        return <TechnicalView />;
      case 'terminal':
        return <LiveMarketTerminalView />;
      case 'brain':
        return <MarketBrainView />;
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
