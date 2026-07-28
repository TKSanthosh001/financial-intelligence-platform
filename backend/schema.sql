-- D1 SQLite database initialization schema

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio Table
CREATE TABLE IF NOT EXISTS portfolio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    symbol TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    avg_price REAL NOT NULL,
    quantity REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Watchlist Table
CREATE TABLE IF NOT EXISTS watchlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    symbol TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, symbol)
);

-- Alerts History log
CREATE TABLE IF NOT EXISTS alerts_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT NOT NULL,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    explanation TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Cached AI Reports (e.g. daily morning reports, sector statuses, analysis engine outputs)
CREATE TABLE IF NOT EXISTS cached_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report_type TEXT NOT NULL UNIQUE, -- 'morning_report', 'market_mood_analysis', 'sector_trends', 'global_events'
    content TEXT NOT NULL, -- JSON stringified contents
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed basic data (optional/fallback)
INSERT OR IGNORE INTO cached_reports (report_type, content) VALUES (
    'morning_report',
    '{"date":"July 28, 2026","title":"AI Good Morning Report","marketSummary":"Global cues are highly mixed this morning. US indices closed soft yesterday due to hardware tech profit booking, but the bond yields eased to 4.18%, signaling an impending rate cut cycle. Asian markets are opening flat. Nifty is expected to open slightly in the green (+30 points) tracking gift Nifty cues.","importantEvents":[{"event":"US Core PCE Inflation data due tomorrow (critical for Fed rate decisions).","impact":"High"},{"event":"Middle East geopolitical tensions escalating; Crude oil trades elevated at $82.40.","impact":"Medium"}],"portfolioImpact":"Your portfolio is well-positioned for today. The IT rebound (Infosys) will provide strength, offsetting any volatility in Reliance. Keep an eye on Tata Steel, as weak Chinese metal output numbers could pressure prices today.","todayRisks":"Rising crude oil prices may trigger intraday profit booking in auto and aviation sectors. Avoid adding new leverage positions in mid-caps today.","todayOpportunities":"It is a good day to slowly accumulate defensive FMCG giants (e.g., ITC) or Index ETFs during dips, as volatility might provide better entry pricing.","thingsToWatch":["USDINR trajectory near 83.75","FII net flows in the first 2 hours of trade"]}'
);

-- Swing Opportunities Table
CREATE TABLE IF NOT EXISTS swing_opportunities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker TEXT UNIQUE NOT NULL,
    company TEXT NOT NULL,
    swing_score REAL NOT NULL,
    risk_score REAL NOT NULL,
    momentum_score REAL NOT NULL,
    volume_score REAL NOT NULL,
    fundamental_score REAL NOT NULL,
    news_score REAL NOT NULL,
    institutional_score REAL NOT NULL,
    confidence TEXT NOT NULL, -- 'High', 'Medium', 'Low'
    entry_zone TEXT NOT NULL,
    exit_zone TEXT NOT NULL,
    stop_loss TEXT NOT NULL,
    holding_period TEXT NOT NULL, -- e.g., '5-10 Days'
    reasoning TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Market Scans Table
CREATE TABLE IF NOT EXISTS market_scans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker TEXT NOT NULL,
    scan_type TEXT NOT NULL, -- 'High Relative Strength', 'Volume Breakout', 'Golden Cross', '52 Week High'
    value TEXT,
    signal_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Institutional Flows Table
CREATE TABLE IF NOT EXISTS institutional_flows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    flow_date TEXT UNIQUE NOT NULL, -- 'YYYY-MM-DD'
    fii_net REAL NOT NULL, -- Net buying/selling in Crores
    dii_net REAL NOT NULL,
    sector_flows_json TEXT, -- JSON string representing sector-wise FII flows
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sector Rankings Table
CREATE TABLE IF NOT EXISTS sector_rankings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sector_name TEXT UNIQUE NOT NULL,
    performance REAL NOT NULL, -- Percentage change
    momentum_score REAL NOT NULL,
    institutional_interest TEXT, -- 'High', 'Medium', 'Low'
    news_sentiment TEXT, -- 'Bullish', 'Bearish', 'Neutral'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

