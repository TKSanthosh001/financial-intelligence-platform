import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import api from '../services/api';
import * as mock from '../services/mockDataService';
import marketDataEngine from '../services/marketEngine/MarketDataEngine';
import eventBus from '../services/marketEngine/EventBus';

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
  const [swingOpportunities, setSwingOpportunities] = useState([]);
  const [marketScans, setMarketScans] = useState([]);
  const [institutionalFlows, setInstitutionalFlows] = useState([]);

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Trigger all API requests in parallel with resilient fallbacks
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
        timelineRes,
        swingRes,
        scansRes,
        flowsRes
      ] = await Promise.all([
        api.market.getStatus().catch(() => mock.mockMarketStatus),
        api.news.getLatest().catch(() => mock.mockNews),
        api.analysis.getEngineStatus().catch(() => mock.mockAiAnalysisEngine),
        api.portfolio.get().catch(() => mock.mockPortfolio),
        api.watchlists.get().catch(() => mock.mockWatchlists),
        api.alerts.getRecent().catch(() => mock.mockAlerts),
        api.fundManager.getMorningReport().catch(() => mock.mockFundManagerReport),
        api.sectors.getAnalysis().catch(() => mock.mockSectors),
        api.globalEvents.getTracker().catch(() => mock.mockGlobalEvents),
        fetchTimelineData().catch(() => mock.mockMarketTimeline),
        api.swing.getOpportunities().catch(() => mock.mockSwingOpportunities || []),
        api.swing.getScans().catch(() => mock.mockMarketScans || []),
        api.swing.getFlows().catch(() => mock.mockInstitutionalFlows || [])
      ]);

      setMarketStatus(marketRes || mock.mockMarketStatus);
      setNews(newsRes || mock.mockNews);
      setAnalysisEngine(analysisRes || mock.mockAiAnalysisEngine);
      setPortfolio(portfolioRes || mock.mockPortfolio);
      setWatchlists(watchlistRes || mock.mockWatchlists);
      setAlerts(alertsRes || mock.mockAlerts);
      setMorningReport(reportRes || mock.mockFundManagerReport);
      setSectors(sectorsRes || mock.mockSectors);
      setGlobalEvents(globalRes || mock.mockGlobalEvents);
      setTimeline(timelineRes || mock.mockMarketTimeline);
      setSwingOpportunities(swingRes || mock.mockSwingOpportunities);
      setMarketScans(scansRes || mock.mockMarketScans);
      setInstitutionalFlows(flowsRes || mock.mockInstitutionalFlows);
      
    } catch (err) {
      console.warn('Network sync warning handled gracefully:', err);
      // Fail-safe fallbacks
      setMarketStatus(mock.mockMarketStatus);
      setNews(mock.mockNews);
      setAnalysisEngine(mock.mockAiAnalysisEngine);
      setPortfolio(mock.mockPortfolio);
      setWatchlists(mock.mockWatchlists);
      setAlerts(mock.mockAlerts);
      setMorningReport(mock.mockFundManagerReport);
      setSectors(mock.mockSectors);
      setGlobalEvents(mock.mockGlobalEvents);
      setTimeline(mock.mockMarketTimeline);
      setSwingOpportunities(mock.mockSwingOpportunities);
      setMarketScans(mock.mockMarketScans);
      setInstitutionalFlows(mock.mockInstitutionalFlows);
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
    marketDataEngine.init(['INFY', 'TCS', 'RELIANCE', 'HDFCBANK', 'ICICIBANK']);

    // Subscribe to live market engine events
    const unsubQuote = eventBus.on('market:quote_updated', (quote) => {
      setMarketStatus(prev => {
        if (!prev || !prev.indices) return prev;
        const updatedIndices = prev.indices.map(idx => {
          if (idx.id === quote.symbol.toLowerCase() || idx.name.toLowerCase().includes(quote.symbol.toLowerCase())) {
            return { ...idx, price: quote.price.toLocaleString('en-IN'), pctChange: `${quote.pctChange}%`, trend: quote.change >= 0 ? 'up' : 'down' };
          }
          return idx;
        });
        return { ...prev, indices: updatedIndices };
      });
    });

    const unsubNews = eventBus.on('market:news', (newNews) => {
      if (Array.isArray(newNews) && newNews.length > 0) {
        setNews(prev => [...newNews, ...prev].slice(0, 20));
      }
    });

    const unsubAiTrigger = eventBus.on('ai:trigger', (trigger) => {
      setAlerts(prev => [
        { id: trigger.timestamp, title: trigger.title, type: trigger.type, severity: trigger.severity, time: 'Just now' },
        ...prev
      ].slice(0, 30));
    });

    return () => {
      unsubQuote();
      unsubNews();
      unsubAiTrigger();
    };
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
    swingOpportunities,
    marketScans,
    institutionalFlows,
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
