/**
 * WebSocketManager - Automatic WebSocket manager with heartbeat, auto-reconnect & polling fallback
 */
import eventBus from './EventBus';

class WebSocketManager {
  constructor() {
    this.ws = null;
    this.url = null;
    this.isConnecting = false;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10;
    this.reconnectDelay = 3000;
    this.pingInterval = null;
    this.lastPong = Date.now();
    this.subscribedSymbols = new Set(['^NSEI', '^BSESN', '^NSEBANK', 'BTC-USD']);
  }

  connect(url = 'wss://ws.finnhub.io?token=sandbox_c1234567890') {
    if (this.isConnected || this.isConnecting) return;

    this.url = url;
    this.isConnecting = true;
    eventBus.emit('ws:status', { status: 'connecting' });

    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        this.isConnected = true;
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        this.lastPong = Date.now();
        console.log('[WebSocketManager] Connected to:', this.url);
        eventBus.emit('ws:status', { status: 'connected' });

        this.startHeartbeat();
        this.resubscribe();
      };

      this.ws.onmessage = (event) => {
        this.lastPong = Date.now();
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'trade' && data.data) {
            data.data.forEach(tick => {
              eventBus.emit('market:tick', {
                symbol: tick.s,
                price: tick.p,
                volume: tick.v,
                timestamp: tick.t,
                source: 'websocket'
              });
            });
          }
        } catch (err) {
          // non-json or ping frame
        }
      };

      this.ws.onerror = (err) => {
        console.warn('[WebSocketManager] Error:', err);
        eventBus.emit('ws:status', { status: 'error', error: err });
      };

      this.ws.onclose = () => {
        this.isConnected = false;
        this.isConnecting = false;
        this.stopHeartbeat();
        console.warn('[WebSocketManager] Disconnected. Will attempt reconnect...');
        eventBus.emit('ws:status', { status: 'disconnected' });
        this.scheduleReconnect();
      };
    } catch (e) {
      this.isConnecting = false;
      this.scheduleReconnect();
    }
  }

  scheduleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(this.reconnectDelay * Math.pow(1.5, this.reconnectAttempts), 30000);
      console.log(`[WebSocketManager] Reconnecting in ${Math.round(delay / 1000)}s (Attempt ${this.reconnectAttempts})`);
      setTimeout(() => this.connect(this.url), delay);
    } else {
      console.warn('[WebSocketManager] Max reconnect attempts reached. Operating in High-Frequency Polling mode.');
      eventBus.emit('ws:fallback_polling', { active: true });
    }
  }

  subscribe(symbol) {
    this.subscribedSymbols.add(symbol);
    if (this.isConnected && this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'subscribe', symbol }));
    }
  }

  unsubscribe(symbol) {
    this.subscribedSymbols.delete(symbol);
    if (this.isConnected && this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'unsubscribe', symbol }));
    }
  }

  resubscribe() {
    this.subscribedSymbols.forEach(sym => this.subscribe(sym));
  }

  startHeartbeat() {
    this.stopHeartbeat();
    this.pingInterval = setInterval(() => {
      if (Date.now() - this.lastPong > 30000) {
        console.warn('[WebSocketManager] Stale connection detected. Closing to trigger reconnect.');
        this.ws?.close();
      } else if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 15000);
  }

  stopHeartbeat() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  disconnect() {
    this.stopHeartbeat();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
    this.isConnecting = false;
  }
}

export const wsManager = new WebSocketManager();
export default wsManager;
