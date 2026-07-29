/**
 * AIEventTriggers - Evaluates live ticks against thresholds to trigger intelligent AI analysis
 */
import eventBus from './EventBus';
import dataQualityEngine from './DataQualityEngine';

class AIEventTriggers {
  constructor() {
    this.thresholds = {
      priceChangePct: 1.5,      // 1.5% single tick or session move
      volumeSurgeRatio: 2.5,     // 2.5x 20-DMA volume
      supportResistanceBreach: true,
    };
  }

  evaluateQuote(quote) {
    if (!quote || !quote.symbol) return;

    const eventKey = `${quote.symbol}_${Math.floor(Date.now() / 60000)}`;

    // 1. Price Change Threshold
    if (Math.abs(quote.pctChange) >= this.thresholds.priceChangePct) {
      if (!dataQualityEngine.isDuplicateEvent(`price_trigger_${eventKey}`)) {
        eventBus.emit('ai:trigger', {
          type: 'PRICE_SURGE',
          symbol: quote.symbol,
          title: `Significant price movement in ${quote.symbol} (${quote.pctChange > 0 ? '+' : ''}${quote.pctChange}%)`,
          severity: Math.abs(quote.pctChange) > 3.0 ? 'HIGH' : 'MEDIUM',
          data: quote,
          timestamp: Date.now()
        });
      }
    }

    // 2. Volume Spike
    if (quote.volume && quote.volume > 8000000) {
      if (!dataQualityEngine.isDuplicateEvent(`volume_trigger_${eventKey}`)) {
        eventBus.emit('ai:trigger', {
          type: 'VOLUME_SPIKE',
          symbol: quote.symbol,
          title: `Unusual volume surge in ${quote.symbol} (${(quote.volume / 1000000).toFixed(1)}M shares)`,
          severity: 'HIGH',
          data: quote,
          timestamp: Date.now()
        });
      }
    }

    // 3. 52-Week High / Low Breach
    if (quote.price >= quote.fiftyTwoWeekHigh * 0.995) {
      if (!dataQualityEngine.isDuplicateEvent(`52w_high_${eventKey}`)) {
        eventBus.emit('ai:trigger', {
          type: 'NEW_52W_HIGH',
          symbol: quote.symbol,
          title: `${quote.symbol} testing 52-week high levels (₹${quote.price})`,
          severity: 'HIGH',
          data: quote,
          timestamp: Date.now()
        });
      }
    }
  }

  evaluateNews(newsItem) {
    if (!newsItem) return;
    if (newsItem.confidenceScore && newsItem.confidenceScore > 85) {
      eventBus.emit('ai:trigger', {
        type: 'CRITICAL_NEWS',
        title: `High-impact news: ${newsItem.title}`,
        severity: 'HIGH',
        data: newsItem,
        timestamp: Date.now()
      });
    }
  }
}

export const aiEventTriggers = new AIEventTriggers();
export default aiEventTriggers;
