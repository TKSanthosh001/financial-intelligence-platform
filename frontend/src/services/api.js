// API Client abstraction layer supporting both live backend endpoints and fallback mock data
import * as mock from './mockDataService';

const USE_MOCK = false; // Set to false to connect to Cloudflare Workers backend
const API_BASE_URL = 'https://financial-intelligence-backend.santhosh-financial.workers.dev/api';

// Helper to simulate network latency for mock data to provide realistic loading skeletons
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const request = async (endpoint, options = {}) => {
  if (USE_MOCK) {
    await delay(300 + Math.random() * 400); // Simulate 300-700ms network delay
    return getMockData(endpoint, options);
  }

  const token = localStorage.getItem('auth_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Route matching for mockup fallback
const getMockData = (endpoint, options) => {
  const method = options.method || 'GET';

  if (endpoint.startsWith('/market/status')) {
    return mock.mockMarketStatus;
  }
  if (endpoint.startsWith('/news')) {
    return mock.mockNews;
  }
  if (endpoint.startsWith('/analysis/engine')) {
    return mock.mockAiAnalysisEngine;
  }
  if (endpoint.startsWith('/portfolio')) {
    if (method === 'POST') {
      const body = JSON.parse(options.body || '{}');
      // Append to local storage mock portfolio or just simulate addition
      return { success: true, message: 'Holding added successfully' };
    }
    return mock.mockPortfolio;
  }
  if (endpoint.startsWith('/watchlist')) {
    return mock.mockWatchlists;
  }
  if (endpoint.startsWith('/alerts')) {
    return mock.mockAlerts;
  }
  if (endpoint.startsWith('/fund-manager/report')) {
    return mock.mockFundManagerReport;
  }
  if (endpoint.startsWith('/advisor')) {
    if (method === 'POST') {
      const { question } = JSON.parse(options.body || '{}');
      const normalizedQuestion = question.toLowerCase();
      const matched = mock.mockAdvisorResponses.find(item => 
        normalizedQuestion.includes(item.question.toLowerCase()) ||
        item.question.toLowerCase().includes(normalizedQuestion)
      );
      if (matched) return { answer: matched.answer };
      
      // Default fallback using generic AI analysis if response is not matched
      return { 
        answer: `Regarding your question "${question}": Under current market conditions, where the Fear & Greed Index is at ${mock.mockMarketStatus.fearGreed.value} (${mock.mockMarketStatus.fearGreed.status}) and volatility (VIX) stands at ${mock.mockMarketStatus.indices.find(i => i.id === 'vix').price}, the overall stance is prudent asset-allocation. Maintain defensive hedges (such as FMCG and Pharma) and avoid high leverage positions until Fed inflation data becomes clearer.`
      };
    }
    return mock.mockAdvisorResponses;
  }
  if (endpoint.startsWith('/timeline')) {
    return mock.mockMarketTimeline;
  }
  if (endpoint.startsWith('/sectors')) {
    return mock.mockSectors;
  }
  if (endpoint.startsWith('/global-events')) {
    return mock.mockGlobalEvents;
  }

  throw new Error(`Endpoint not found: ${endpoint}`);
};

export const api = {
  market: {
    getStatus: () => request('/market/status'),
  },
  news: {
    getLatest: () => request('/news'),
  },
  analysis: {
    getEngineStatus: () => request('/analysis/engine'),
  },
  portfolio: {
    get: () => request('/portfolio'),
    addHolding: (holding) => request('/portfolio', { method: 'POST', body: JSON.stringify(holding) }),
  },
  watchlists: {
    get: () => request('/watchlist'),
  },
  alerts: {
    getRecent: () => request('/alerts'),
  },
  fundManager: {
    getMorningReport: () => request('/fund-manager/report'),
  },
  advisor: {
    ask: (question) => request('/advisor', { method: 'POST', body: JSON.stringify({ question }) }),
  },
  sectors: {
    getAnalysis: () => request('/sectors'),
  },
  globalEvents: {
    getTracker: () => request('/global-events'),
  },
  timeline: {
    get: () => request('/timeline'),
  },
  auth: {
    googleLogin: (credential) => request('/auth/google', { method: 'POST', body: JSON.stringify({ credential }) }),
  }
};
export default api;
