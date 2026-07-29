/**
 * DeltaEngine - Delta Synchronization & Minimal Patch Generator (<1ms)
 * Only transmits changed fields to minimize network payload & memory allocations.
 */

class DeltaEngine {
  constructor() {
    this.previousState = new Map();
  }

  computeDelta(symbol, currentQuote) {
    const prev = this.previousState.get(symbol);
    if (!prev) {
      this.previousState.set(symbol, { ...currentQuote });
      return { symbol, delta: currentQuote, isFullSnapshot: true };
    }

    const delta = {};
    let hasChanges = false;

    for (const key in currentQuote) {
      if (currentQuote[key] !== prev[key]) {
        delta[key] = currentQuote[key];
        prev[key] = currentQuote[key];
        hasChanges = true;
      }
    }

    if (!hasChanges) return null;

    delta.symbol = symbol;
    delta.timestamp = currentQuote.timestamp || Date.now();
    return { symbol, delta, isFullSnapshot: false };
  }

  clear() {
    this.previousState.clear();
  }
}

export const deltaEngine = new DeltaEngine();
export default deltaEngine;
