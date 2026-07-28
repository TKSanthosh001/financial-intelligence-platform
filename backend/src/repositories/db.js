// Database Repositories for Cloudflare D1

export class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async getPreferences(userId) {
    return await this.db.prepare('SELECT * FROM user_preferences WHERE user_id = ?').bind(userId).first();
  }

  async savePreferences(userId, prefs) {
    return await this.db.prepare(
      'INSERT OR REPLACE INTO user_preferences (user_id, risk_appetite, trading_style, preferred_sectors, holding_period_days) VALUES (?, ?, ?, ?, ?)'
    ).bind(userId, prefs.riskAppetite, prefs.tradingStyle, JSON.stringify(prefs.preferredSectors), prefs.holdingPeriodDays).run();
  }

  async getSettings(userId) {
    return await this.db.prepare('SELECT * FROM settings WHERE user_id = ?').bind(userId).first();
  }

  async saveSettings(userId, settings) {
    return await this.db.prepare(
      'INSERT OR REPLACE INTO settings (user_id, notifications_enabled, daily_brief_enabled, theme) VALUES (?, ?, ?, ?)'
    ).bind(userId, settings.notificationsEnabled ? 1 : 0, settings.dailyBriefEnabled ? 1 : 0, settings.theme).run();
  }
}

export class PortfolioRepository {
  constructor(db) {
    this.db = db;
  }

  async getHoldings(userId) {
    const portfolio = await this.db.prepare('SELECT id FROM portfolio WHERE user_id = ?').bind(userId).first();
    if (!portfolio) return [];
    const { results } = await this.db.prepare('SELECT * FROM holdings WHERE portfolio_id = ?').bind(portfolio.id).all();
    return results;
  }

  async addHolding(userId, holding) {
    let portfolio = await this.db.prepare('SELECT id FROM portfolio WHERE user_id = ?').bind(userId).first();
    if (!portfolio) {
      await this.db.prepare('INSERT INTO portfolio (user_id) VALUES (?)').bind(userId).run();
      portfolio = await this.db.prepare('SELECT id FROM portfolio WHERE user_id = ?').bind(userId).first();
    }
    return await this.db.prepare(
      'INSERT INTO holdings (portfolio_id, symbol, name, category, quantity, avg_price, asset_type) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(portfolio.id, holding.symbol, holding.name, holding.category, holding.qty, holding.avgPrice, holding.type).run();
  }

  async getTransactions(userId) {
    const portfolio = await this.db.prepare('SELECT id FROM portfolio WHERE user_id = ?').bind(userId).first();
    if (!portfolio) return [];
    const { results } = await this.db.prepare('SELECT * FROM transactions WHERE portfolio_id = ?').bind(portfolio.id).all();
    return results;
  }
}

export class SwingRepository {
  constructor(db) {
    this.db = db;
  }

  async getOpportunities() {
    const { results } = await this.db.prepare('SELECT * FROM swing_opportunities ORDER BY swing_score DESC').all();
    return results;
  }

  async getScans(category) {
    let query = 'SELECT * FROM market_scans';
    let params = [];
    if (category && category !== 'All') {
      query += ' WHERE scan_type = ?';
      params.push(category);
    }
    query += ' ORDER BY signal_time DESC LIMIT 50';
    const { results } = await this.db.prepare(query).bind(...params).all();
    return results;
  }

  async getFlows() {
    const { results } = await this.db.prepare('SELECT * FROM institutional_flows ORDER BY flow_date DESC LIMIT 30').all();
    return results;
  }
}

export class AgentRepository {
  constructor(db) {
    this.db = db;
  }

  async getLogs() {
    const { results } = await this.db.prepare('SELECT * FROM agent_logs ORDER BY created_at DESC LIMIT 50').all();
    return results;
  }

  async logAgentExecution(log) {
    return await this.db.prepare(
      'INSERT INTO agent_logs (agent_id, agent_name, status, memory_context, opinion_vote, confidence_score, evidence_payload) VALUES (?, ?, ?, ?, ?, ?, ?)'
    ).bind(log.agentId, log.agentName, log.status, log.memoryContext, log.opinionVote, log.confidenceScore, JSON.stringify(log.evidencePayload)).run();
  }

  async getLearningHistory() {
    const { results } = await this.db.prepare('SELECT * FROM agent_learning_history ORDER BY created_at DESC LIMIT 50').all();
    return results;
  }
}
