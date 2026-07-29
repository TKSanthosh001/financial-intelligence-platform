/**
 * MarketOSEngine - AI Market Operating System Main Facade
 */

import agentManager from './AgentManager';
import missionGenerator from './MissionGenerator';
import memoryEngine from './MemoryEngine';

class MarketOSEngine {
  getMarketOSSnapshot() {
    const agents = agentManager.getAgentNetworkStatus();
    const missions = missionGenerator.getActiveMissions();
    const memory = memoryEngine.getMarketMemory();

    return {
      agents,
      missions,
      memory,
      timestamp: new Date().toISOString()
    };
  }
}

export const marketOSEngine = new MarketOSEngine();
export default marketOSEngine;
