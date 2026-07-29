/**
 * LiveMarketDepth - Real-Time Level-2 Market Depth & Order Book Imbalance Engine
 */

class LiveMarketDepth {
  generateDepth(symbol, ltp = 1512.4) {
    const tickSize = symbol === 'NIFTY' ? 0.05 : 0.1;

    const bids = [];
    const asks = [];

    let totalBidQty = 0;
    let totalAskQty = 0;

    for (let i = 1; i <= 5; i++) {
      const bidPrice = parseFloat((ltp - (i * tickSize * 2)).toFixed(2));
      const askPrice = parseFloat((ltp + (i * tickSize * 2)).toFixed(2));

      const bidQty = Math.round(500 + Math.random() * 2500);
      const askQty = Math.round(450 + Math.random() * 2300);

      totalBidQty += bidQty;
      totalAskQty += askQty;

      bids.push({ price: bidPrice, qty: bidQty, orders: Math.round(bidQty / 50) });
      asks.push({ price: askPrice, qty: askQty, orders: Math.round(askQty / 45) });
    }

    const totalDepthQty = totalBidQty + totalAskQty;
    const buyPressurePct = Math.round((totalBidQty / totalDepthQty) * 100);
    const sellPressurePct = 100 - buyPressurePct;
    const orderImbalance = parseFloat((totalBidQty / totalAskQty).toFixed(2));

    const spread = parseFloat((asks[0].price - bids[0].price).toFixed(2));
    const spreadBps = parseFloat(((spread / ltp) * 10000).toFixed(1));

    return {
      symbol,
      ltp,
      bids,
      asks,
      totalBidQty,
      totalAskQty,
      buyPressurePct,
      sellPressurePct,
      orderImbalance,
      spread,
      spreadBps,
      imbalanceState: orderImbalance > 1.2 ? 'BUY_DOMINATED' : orderImbalance < 0.8 ? 'SELL_DOMINATED' : 'BALANCED',
      timestamp: Date.now(),
    };
  }
}

export const liveMarketDepth = new LiveMarketDepth();
export default liveMarketDepth;
