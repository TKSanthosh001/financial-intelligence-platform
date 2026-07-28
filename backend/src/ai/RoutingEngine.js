// AI Routing Engine & Fallback Coordinator
import { ProviderManager } from './ProviderManager.js';

export class RoutingEngine {
  constructor(env) {
    this.env = env;
    this.provider = new ProviderManager(env);
    
    // Model Capabilities Registry
    this.modelCapabilities = {
      technical: { primary: 'groq', model: 'llama-3.1-70b-versatile', fallback: ['nvidia', 'gemini'] },
      fundamental: { primary: 'groq', model: 'qwen-2.5-coder-32b', fallback: ['openrouter', 'gemini'] },
      news: { primary: 'openrouter', model: 'deepseek/deepseek-chat', fallback: ['groq', 'gemini'] },
      macro: { primary: 'gemini', model: 'gemini-1.5-flash', fallback: ['groq', 'nvidia'] },
      decision: { primary: 'nvidia', model: 'nvidia/nemotron-4-340b-instruct', fallback: ['gemini', 'openrouter', 'groq'] }
    };
  }

  // Execute request with automatic fallback cascade
  async execute(taskType, prompt, systemMsg, temp = 0.2) {
    const route = this.modelCapabilities[taskType] || this.modelCapabilities.decision;
    const providersCascade = [route.primary, ...route.fallback];
    
    let lastError = null;

    for (const providerName of providersCascade) {
      try {
        console.log(`RoutingEngine: Attempting ${taskType} via ${providerName}`);
        
        switch (providerName) {
          case 'gemini':
            const geminiModel = providerName === route.primary ? route.model : 'gemini-1.5-flash';
            return await this.provider.callGemini(prompt, systemMsg, geminiModel, temp);
          case 'groq':
            const groqModel = providerName === route.primary ? route.model : 'llama-3.1-70b-versatile';
            return await this.provider.callGroq(prompt, systemMsg, groqModel, temp);
          case 'nvidia':
            const nvidiaModel = providerName === route.primary ? route.model : 'meta/llama3-70b-instruct';
            return await this.provider.callNvidia(prompt, systemMsg, nvidiaModel, temp);
          case 'openrouter':
            const openrouterModel = providerName === route.primary ? route.model : 'meta-llama/llama-3.1-70b-instruct';
            return await this.provider.callOpenRouter(prompt, systemMsg, openrouterModel, temp);
        }
      } catch (err) {
        console.warn(`RoutingEngine: ${providerName} failed:`, err.message);
        lastError = err;
        // Continue loop to next fallback provider
      }
    }

    throw new Error(`RoutingEngine: All configured model fallbacks failed for ${taskType}. Last error: ${lastError?.message}`);
  }
}
