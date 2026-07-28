-- Enterprise-Grade AI Multi-Agent Swing Trading Intelligence Platform Schema
-- Normalized SQLite database for Cloudflare D1

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, -- Firebase UID
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. User Preferences Table
CREATE TABLE IF NOT EXISTS user_preferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL UNIQUE,
    risk_appetite TEXT NOT NULL DEFAULT 'Moderate', -- 'Conservative', 'Moderate', 'Aggressive'
    trading_style TEXT NOT NULL DEFAULT 'Swing', -- 'Swing', 'Position', 'Intraday'
    preferred_sectors TEXT, -- JSON array of sectors
    holding_period_days INTEGER DEFAULT 14,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Settings Table
CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL UNIQUE,
    notifications_enabled BOOLEAN DEFAULT 1,
    daily_brief_enabled BOOLEAN DEFAULT 1,
    theme TEXT DEFAULT 'dark',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Portfolio Table
CREATE TABLE IF NOT EXISTS portfolio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL DEFAULT 'Santhosh Portfolio Manager',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Holdings Table (Multi-Asset)
CREATE TABLE IF NOT EXISTS holdings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    portfolio_id INTEGER NOT NULL,
    symbol TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- Sector / Asset Class
    quantity REAL NOT NULL,
    avg_price REAL NOT NULL,
    asset_type TEXT NOT NULL, -- 'Stock', 'ETF', 'MutualFund', 'Crypto'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(portfolio_id) REFERENCES portfolio(id) ON DELETE CASCADE
);

-- 6. Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    portfolio_id INTEGER NOT NULL,
    symbol TEXT NOT NULL,
    transaction_type TEXT NOT NULL, -- 'BUY', 'SELL'
    quantity REAL NOT NULL,
    price REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(portfolio_id) REFERENCES portfolio(id) ON DELETE CASCADE
);

-- 7. Watchlists Table
CREATE TABLE IF NOT EXISTS watchlists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL DEFAULT 'My Watchlist',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, name)
);

-- 8. Watchlist Items Table
CREATE TABLE IF NOT EXISTS watchlist_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    watchlist_id INTEGER NOT NULL,
    symbol TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(watchlist_id) REFERENCES watchlists(id) ON DELETE CASCADE,
    UNIQUE(watchlist_id, symbol)
);

-- 9. Stocks Table
CREATE TABLE IF NOT EXISTS stocks (
    id TEXT PRIMARY KEY, -- Ticker symbol
    name TEXT NOT NULL,
    industry TEXT,
    exchange TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 10. Mutual Funds Table
CREATE TABLE IF NOT EXISTS mutual_funds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fund_name TEXT UNIQUE NOT NULL,
    category TEXT, -- Midcap, Largecap, Debt etc.
    exp_ratio REAL,
    aum REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 11. ETFs Table
CREATE TABLE IF NOT EXISTS etfs (
    id TEXT PRIMARY KEY, -- Symbol
    name TEXT NOT NULL,
    tracking_index TEXT,
    exp_ratio REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 12. Crypto Table
CREATE TABLE IF NOT EXISTS crypto (
    id TEXT PRIMARY KEY, -- Symbol
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 13. AI Reports Table (Orchestrator outputs)
CREATE TABLE IF NOT EXISTS ai_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report_type TEXT NOT NULL, -- 'morning_brief', 'pre_market', 'closing_report', 'portfolio_audit'
    title TEXT NOT NULL,
    content_json TEXT NOT NULL, -- Large payload of evidence, confidence, risk metrics
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 14. News Table
CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    source TEXT,
    summary TEXT,
    nlp_sentiment TEXT NOT NULL, -- 'Positive', 'Negative', 'Neutral', 'Noise'
    impact_level TEXT NOT NULL, -- 'High', 'Low'
    affected_sectors_json TEXT, -- JSON array
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 15. Market Snapshots Table
CREATE TABLE IF NOT EXISTS market_snapshots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    index_name TEXT NOT NULL, -- 'Nifty', 'Sensex', 'Gold', 'VIX'
    price TEXT NOT NULL,
    change TEXT,
    pct_change TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 16. Technical Indicators Table
CREATE TABLE IF NOT EXISTS technical_indicators (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT UNIQUE NOT NULL,
    rsi REAL,
    macd_line REAL,
    macd_signal REAL,
    ema_20 REAL,
    ema_50 REAL,
    ema_200 REAL,
    vwap REAL,
    adx REAL,
    atr REAL,
    bollinger_upper REAL,
    bollinger_lower REAL,
    supertrend_direction TEXT, -- 'up', 'down'
    support_levels_json TEXT, -- JSON array of support zones
    resistance_levels_json TEXT, -- JSON array of resistance zones
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 17. Fundamentals Table
CREATE TABLE IF NOT EXISTS fundamentals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT UNIQUE NOT NULL,
    revenue REAL,
    profit REAL,
    eps REAL,
    debt_equity REAL,
    roe REAL,
    roce REAL,
    pe_ratio REAL,
    pb_ratio REAL,
    valuation_status TEXT, -- 'Undervalued', 'Fair', 'Overvalued'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 18. Macro Events Table
CREATE TABLE IF NOT EXISTS macro_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_name TEXT NOT NULL,
    metric_value TEXT,
    country TEXT DEFAULT 'India',
    impact_rating TEXT DEFAULT 'Medium', -- 'High', 'Medium', 'Low'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 19. Geopolitical Events Table
CREATE TABLE IF NOT EXISTS geopolitical_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    affected_countries_json TEXT,
    impact_rating TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 20. Institutional Flows Table
CREATE TABLE IF NOT EXISTS institutional_flows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    flow_date TEXT UNIQUE NOT NULL,
    fii_net REAL, -- Crores
    dii_net REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 21. Alerts Table (Trigger conditions)
CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT NOT NULL,
    title TEXT NOT NULL,
    alert_type TEXT NOT NULL, -- 'Breakout', 'SupportBreak', 'News'
    explanation TEXT NOT NULL,
    trigger_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 22. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    status TEXT DEFAULT 'Unread', -- 'Read', 'Unread'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 23. AI Conversations Table
CREATE TABLE IF NOT EXISTS ai_conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    session_id TEXT NOT NULL,
    message_role TEXT NOT NULL, -- 'user', 'assistant'
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 24. Trade Journal Table
CREATE TABLE IF NOT EXISTS trade_journal (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    ticker TEXT NOT NULL,
    trade_type TEXT NOT NULL, -- 'BUY', 'SELL'
    qty REAL NOT NULL,
    entry_price REAL NOT NULL,
    exit_price REAL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 25. Strategies Table
CREATE TABLE IF NOT EXISTS strategies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    rules_json TEXT NOT NULL, -- Rules configuration
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 26. AI Memory Table (RAG Vector entries log)
CREATE TABLE IF NOT EXISTS ai_memory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    vector_key TEXT NOT NULL, -- Unique embedding hash or tag
    context_text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 27. Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    action_name TEXT NOT NULL,
    actor TEXT NOT NULL,
    details TEXT,
    ip_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
