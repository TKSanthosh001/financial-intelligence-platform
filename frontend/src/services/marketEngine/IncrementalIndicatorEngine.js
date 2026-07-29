/**
 * IncrementalIndicatorEngine - High Performance O(1) Real-Time Indicator Updater
 * Recalculates EMA, VWAP, RSI & MACD incrementally on every incoming tick.
 */

class IncrementalIndicatorEngine {
  constructor() {
    this.states = new Map();
  }

  updateTick(symbol, price, volume = 100) {
    let state = this.states.get(symbol);
    if (!state) {
      state = {
        ema20: price,
        ema50: price,
        vwapSumPV: price * volume,
        vwapSumVol: volume,
        rsiGain: 0,
        rsiLoss: 0,
        prevPrice: price,
        macdLine: 0,
        signalLine: 0,
        hist: 0,
      };
      this.states.set(symbol, state);
      return state;
    }

    // 1. Incremental EMA(20) & EMA(50)
    const k20 = 2 / (20 + 1);
    const k50 = 2 / (50 + 1);
    state.ema20 = price * k20 + state.ema20 * (1 - k20);
    state.ema50 = price * k50 + state.ema50 * (1 - k50);

    // 2. Incremental VWAP
    state.vwapSumPV += price * volume;
    state.vwapSumVol += volume;
    state.vwap = state.vwapSumVol ? state.vwapSumPV / state.vwapSumVol : price;

    // 3. Incremental RSI(14)
    const diff = price - state.prevPrice;
    const gain = diff > 0 ? diff : 0;
    const loss = diff < 0 ? -diff : 0;
    state.rsiGain = (state.rsiGain * 13 + gain) / 14;
    state.rsiLoss = (state.rsiLoss * 13 + loss) / 14;
    const rs = state.rsiLoss ? state.rsiGain / state.rsiLoss : 100;
    state.rsi14 = 100 - (100 / (1 + rs));

    // 4. MACD & Histogram
    state.macdLine = state.ema20 - state.ema50;
    state.signalLine = state.macdLine * 0.2 + state.signalLine * 0.8;
    state.hist = state.macdLine - state.signalLine;

    state.prevPrice = price;
    this.states.set(symbol, state);

    return {
      symbol,
      price,
      ema20: parseFloat(state.ema20.toFixed(2)),
      ema50: parseFloat(state.ema50.toFixed(2)),
      vwap: parseFloat(state.vwap.toFixed(2)),
      rsi14: parseFloat(state.rsi14.toFixed(1)),
      macdHist: parseFloat(state.hist.toFixed(2)),
      emaCross: state.ema20 > state.ema50 ? 'BULLISH_CROSS' : 'BEARISH_CROSS',
    };
  }
}

export const incrementalIndicatorEngine = new IncrementalIndicatorEngine();
export default incrementalIndicatorEngine;
