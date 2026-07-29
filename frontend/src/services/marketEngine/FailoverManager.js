/**
 * FailoverManager & HealthMonitor - Multi-provider failover system with heartbeat monitoring
 */
import eventBus from './EventBus';
import wsManager from './WebSocketManager';

class FailoverManager {
  constructor() {
    this.providers = [
      { id: 'broker_ws', name: 'Broker Direct WebSocket API', type: 'WEBSOCKET', priority: 1, active: true },
      { id: 'yahoo_live', name: 'Yahoo Finance Live Proxy', type: 'REST_STREAM', priority: 2, active: false },
      { id: 'coingecko', name: 'CoinGecko Crypto Stream', type: 'REST_POLL', priority: 3, active: false },
    ];
    this.activeProviderIndex = 0;
    this.lastHealthCheck = Date.now();
    this.healthInterval = null;
  }

  startHealthMonitor() {
    if (this.healthInterval) return;
    this.healthInterval = setInterval(() => this.checkHealth(), 10000);
  }

  checkHealth() {
    const activeProvider = this.providers[this.activeProviderIndex];
    const timeSinceLastHeartbeat = Date.now() - wsManager.lastPong;

    if (timeSinceLastHeartbeat > 20000 && activeProvider.id === 'broker_ws') {
      console.warn(`[FailoverManager] Primary provider ${activeProvider.name} is stale (${Math.round(timeSinceLastHeartbeat / 1000)}s silent). Triggering seamless failover to secondary provider.`);
      this.triggerFailover();
    }
  }

  triggerFailover() {
    const oldProvider = this.providers[this.activeProviderIndex];
    oldProvider.active = false;

    this.activeProviderIndex = (this.activeProviderIndex + 1) % this.providers.length;
    const newProvider = this.providers[this.activeProviderIndex];
    newProvider.active = true;

    console.log(`[FailoverManager] Switched active provider to: ${newProvider.name}`);

    eventBus.emit('provider:failover', {
      previousProvider: oldProvider.name,
      activeProvider: newProvider.name,
      reason: 'Heartbeat timeout / connection drop',
      timestamp: Date.now()
    });
  }

  getActiveProvider() {
    return this.providers[this.activeProviderIndex];
  }

  stopHealthMonitor() {
    if (this.healthInterval) {
      clearInterval(this.healthInterval);
      this.healthInterval = null;
    }
  }
}

export const failoverManager = new FailoverManager();
export default failoverManager;
