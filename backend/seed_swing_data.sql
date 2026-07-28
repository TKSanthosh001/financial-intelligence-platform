-- Seed Swing Opportunities
INSERT OR IGNORE INTO swing_opportunities (ticker, company, swing_score, risk_score, momentum_score, volume_score, fundamental_score, news_score, institutional_score, confidence, entry_zone, exit_zone, stop_loss, holding_period, reasoning) VALUES
('INFY', 'Infosys Limited', 88, 15, 90, 85, 80, 85, 90, 'High', '₹1,350 - ₹1,365', '₹1,440 - ₹1,460', '₹1,310', '5-10 Days', 'Infosys shows strong relative strength against Nifty IT index. Consolidation breakout verified with 2.5x volume expansion. 50-EMA support holds firm with rising DII delivery allocations.'),
('TCS', 'Tata Consultancy Services', 84, 18, 82, 80, 85, 80, 88, 'High', '₹3,750 - ₹3,780', '₹3,980 - ₹4,020', '₹3,670', '7-14 Days', 'Double Bottom pattern confirmation on the daily scale. Relative Strength Index (RSI) bounced off 42 support, target set near preceding resistance zone. Promoter buyback adds sentiment floor.'),
('RELIANCE', 'Reliance Industries Ltd', 78, 22, 75, 78, 82, 74, 80, 'Medium', '₹2,420 - ₹2,440', '₹2,560 - ₹2,600', '₹2,380', '10-15 Days', 'Price trading above VWAP with golden cross forming on 20/50 EMAs. Strong delivery volumes. Subject to oil price swings but retail segment growth supports margins.');

-- Seed Market Scans
INSERT INTO market_scans (ticker, scan_type, value) VALUES
('INFY', 'Volume Breakout', '3.2x vs 20-DMA'),
('INFY', 'High Relative Strength', 'Outperforming Nifty IT by 4.2%'),
('TCS', 'Golden Cross', '20-EMA crossed above 50-EMA'),
('RELIANCE', 'Golden Cross', '50-EMA crossed above 200-EMA'),
('HDFCBANK', 'Price Breakout', 'Closed above resistance at 1,520');

-- Seed Institutional Flows
INSERT OR IGNORE INTO institutional_flows (flow_date, fii_net, dii_net, sector_flows_json) VALUES
('2026-07-28', 1250.45, 890.30, '{"Banking": 450, "IT": 350, "FMCG": -120, "Auto": 210}'),
('2026-07-27', -450.20, 1120.50, '{"Banking": 120, "IT": -80, "FMCG": 230, "Auto": 180}');

-- Seed Sector Rankings
INSERT OR IGNORE INTO sector_rankings (sector_name, performance, momentum_score, institutional_interest, news_sentiment) VALUES
('Nifty IT', 1.85, 88, 'High', 'Bullish'),
('Nifty Bank', 1.20, 75, 'Medium', 'Neutral'),
('Nifty FMCG', -0.45, 45, 'Low', 'Neutral'),
('Nifty Auto', 2.10, 92, 'High', 'Bullish');
