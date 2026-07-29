/**
 * TickProcessor - Low-Latency High-Throughput Stream Processing Pipeline (<10ms)
 * Pipeline: Tick -> Validation -> Deduplication -> Delta -> Cache -> Incremental Indicators -> EventBus
 */

import dataQualityEngine from './DataQualityEngine';
import deltaEngine from './DeltaEngine';
import cacheManager from './CacheManager';
import incrementalIndicatorEngine from './IncrementalIndicatorEngine';
import eventBus from './EventBus';

class TickProcessor {
  constructor() {
    this.processedTicksCount = 0;
  }

  processTick(rawTick) {
    if (!rawTick || !rawTick.symbol) return null;

    const startTime = performance.now();

    // Step 1: Validation & Sanitization
    const sanitized = dataQualityEngine.sanitizeQuote(rawTick);
    if (!sanitized) return null;

    // Step 2: Delta Synchronization (only changed values transmitted)
    const deltaObject = deltaEngine.computeDelta(sanitized.symbol, sanitized);
    if (!deltaObject) return null; // No change in tick

    // Step 3: Cache Update
    cacheManager.set(`quote_${sanitized.symbol}`, sanitized, 'ticker');

    // Step 4: Incremental O(1) Indicator Updates
    const indicators = incrementalIndicatorEngine.updateTick(sanitized.symbol, sanitized.price, sanitized.volume);

    // Step 5: Metric calculation (latency)
    const processLatencyMs = parseFloat((performance.now() - startTime).toFixed(2));
    this.processedTicksCount++;

    const processedEvent = {
      symbol: sanitized.symbol,
      price: sanitized.price,
      change: sanitized.change,
      pctChange: sanitized.pctChange,
      volume: sanitized.volume,
      indicators,
      delta: deltaObject.delta,
      isFullSnapshot: deltaObject.isFullSnapshot,
      latencyMs: processLatencyMs,
      timestamp: Date.now()
    };

    // Step 6: Broadcast to UI / Subscribers
    eventBus.emit('market:tick_processed', processedEvent);

    return processedEvent;
  }
}

export const tickProcessor = new TickProcessor();
export default tickProcessor;
