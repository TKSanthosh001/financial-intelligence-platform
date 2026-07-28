// AI Orchestrator: Pipeline and Parallel Agent Coordination
import { RoutingEngine } from './RoutingEngine.js';

export class AIOrchestrator {
  constructor(env) {
    this.router = new RoutingEngine(env);
  }

  // 1. News Analysis Pipeline (News summarize -> Sector/Stock impact)
  async runNewsPipeline(rawNewsText) {
    // Stage A: Summarize and classify via DeepSeek (optimised for News NLP)
    const summaryPrompt = `Summarize these financial headlines, remove duplicates, and classify sentiment/impact:\n\n${rawNewsText}`;
    const summarySystem = "You are an AI News Analyst. Output raw JSON format: { news: [{ title, sentiment, impact, affectedSectors: [] }] }";
    
    const summaryOutput = await this.router.execute('news', summaryPrompt, summarySystem);
    return JSON.parse(summaryOutput);
  }

  // 2. Technical and Financial Statement Extraction Pipeline (Statements -> Qwen extract -> DeepSeek PE analysis)
  async runFinancialPipeline(ticker, statementText) {
    // Stage A: Qwen extracts structured balance sheet variables
    const extractPrompt = `Extract Revenue, Net Profit, EPS, and Debt-Equity ratio from this text:\n\n${statementText}`;
    const extractSystem = "You are an AI Structured Data Extractor. Output raw JSON only: { revenue, profit, eps, debtEquity }";
    const structuredVars = await this.router.execute('fundamental', extractPrompt, extractSystem);

    // Stage B: Llama evaluates technical setups for entry timing
    const techSetupPrompt = `Audit optimal entry zones and stop loss levels for ${ticker}. Current indicators: RSI 64, MACD bullish.`;
    const techSetupSystem = "You are a Quantitative Chart Technician. Output entry and stop-loss zones.";
    const techOutput = await this.router.execute('technical', techSetupPrompt, techSetupSystem);

    // Stage C: Nemotron synthesizes into final investment insights
    const decisionPrompt = `Structured fundamentals: ${structuredVars}\nTechnical entry timing: ${techOutput}`;
    const decisionSystem = "You are the Head Fund Manager. Synthesize fundamental and technical outputs into a clear recommendation.";
    return await this.router.execute('decision', decisionPrompt, decisionSystem);
  }

  // 3. Parallel Agent Coordination (Runs technical, news, macro, flows in parallel)
  async runConsensusOrchestrator(ticker, contextPayload) {
    const { technicalData, newsSummary, macroData, institutionalFlows } = contextPayload;

    // Trigger all evaluations concurrently
    const [techRes, newsRes, macroRes] = await Promise.all([
      this.router.execute('technical', `Analyze setup for ${ticker}. Data: ${JSON.stringify(technicalData)}`, "You are a Technical Analyst."),
      this.router.execute('news', `Determine news impact for ${ticker}. News: ${JSON.stringify(newsSummary)}`, "You are a News Agent."),
      this.router.execute('macro', `Evaluate interest rate and currency impacts: ${JSON.stringify(macroData)}`, "You are a Macro Agent.")
    ]);

    // Head Decision Engine synthesizes final vote
    const decisionPrompt = `Ticker: ${ticker}\nTechnical Opinion: ${techRes}\nNews Opinion: ${newsRes}\nMacro Opinion: ${macroRes}\nInstitutional Flows: ${JSON.stringify(institutionalFlows)}`;
    const decisionSystem = "You are the Master Orchestrator Decision Engine. Combine opinions. Provide Conviction Score (0-100), Suggested Action, Supporting Evidence, and Risks.";
    
    return await this.router.execute('decision', decisionPrompt, decisionSystem);
  }
}
