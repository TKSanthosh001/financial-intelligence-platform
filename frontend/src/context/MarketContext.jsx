import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../services/api';

const MarketContext = createContext();

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
};

export const MarketProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marketStatus, setMarketStatus] = useState(null);
  const [news, setNews] = useState([]);
  const [analysisEngine, setAnalysisEngine] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [watchlists, setWatchlists] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [morningReport, setMorningReport] = useState(null);
  const [sectors, setSectors] = useState([]);
  const [globalEvents, setGlobalEvents] = useState([]);
  const [timeline, setTimeline] = useState([]);

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Trigger all API requests in parallel
      const [
        marketRes,
        newsRes,
        analysisRes,
        portfolioRes,
        watchlistRes,
        alertsRes,
        reportRes,
        sectorsRes,
        globalRes,
        timelineRes
      ] = await Promise.all([
        api.market.getStatus(),
        api.news.getLatest(),
        api.analysis.getEngineStatus(),
        api.portfolio.get(),
        api.watchlists.get(),
        api.alerts.getRecent(),
        api.fundManager.getMorningReport(),
        api.sectors.getAnalysis(),
        api.globalEvents.getTracker(),
        api.advisor.ask('Explain today\'s correction').then(() => api.market.getStatus()).then(() => fetchTimelineData()) // fetch timeline helper
      ]);

      setMarketStatus(marketRes);
      setNews(newsRes);
      setAnalysisEngine(analysisRes);
      setPortfolio(portfolioRes);
      setWatchlists(watchlistRes);
      setAlerts(alertsRes);
      setMorningReport(reportRes);
      setSectors(sectorsRes);
      setGlobalEvents(globalRes);
      setTimeline(timelineRes);
      
    } catch (err) {
      console.error('Failed to load financial data:', err);
      setError(err.message || 'An error occurred while fetching financial data.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTimelineData = async () => {
    try {
      return await api.timeline.get();
    } catch (e) {
      console.error('Failed to load timeline:', e);
      return [];
    }
  };

  const addHolding = async (holding) => {
    try {
      await api.portfolio.addHolding(holding);
      // Reload portfolio data after change
      const updatedPortfolio = await api.portfolio.get();
      setPortfolio(updatedPortfolio);
      return true;
    } catch (err) {
      console.error('Failed to add portfolio holding:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const value = {
    loading,
    error,
    marketStatus,
    news,
    analysisEngine,
    portfolio,
    watchlists,
    alerts,
    morningReport,
    sectors,
    globalEvents,
    timeline,
    refreshData: fetchAllData,
    addHolding
  };

  return (
    <MarketContext.Provider value={value}>
      {children}
    </MarketContext.Provider>
  );
};
export default MarketContext;
