const configurationData = {
    supported_resolutions: ['1D', '1W', '1M'],
    exchanges: [
        { value: 'Bitfinex', name: 'Bitfinex', desc: 'Bitfinex' },
        { value: 'Kraken', name: 'Kraken', desc: 'Kraken bitcoin exchange' },
    ],
    symbols_types: [
        { name: 'crypto', value: 'crypto' }
    ]
};

const lastBarsCache = new Map();

class CustomDatafeed {
    
    constructor(pairInfo) {
        this.subscribers = {};
        this.inrPrice = (pairInfo && pairInfo.toCurrency === 'INR') ? pairInfo.inrPrice : 1;
    }

    onReady(callback) {
        setTimeout(() => callback(configurationData));
    }

    async resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
        
        const symbolInfo = {
            ticker: symbolName,
            name: symbolName,
            description: symbolName,
            type: 'crypto',
            session: '24x7',
            timezone: 'Etc/UTC',
            exchange: 'Ultrapro',
            minmov: 1,
            pricescale: 100,
            has_intraday: false,
            visible_plots_set: 'ohlc',
            has_weekly_and_monthly: true,
            supported_resolutions: configurationData.supported_resolutions,
            volume_precision: 2,
            data_status: 'streaming',
        };

        onSymbolResolvedCallback(symbolInfo);
    }

    async getBars(symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) {
        
        const { from, to, firstDataRequest } = periodParams;

        const intervalMap = {
            '1D': '1d',
            '1W': '1w',
            '1M': '1M',
        };

        const interval = intervalMap[resolution];

        if (!interval) {
            if (typeof onErrorCallback === 'function') {
                onErrorCallback(new Error('Invalid interval'));
            }
            return;
        }

        const url = `https://api.binance.com/api/v3/klines?symbol=${symbolInfo.name}&interval=${interval}&startTime=${from * 1000}&endTime=${to * 1000}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();

            if (!data || data.length === 0) {
                onHistoryCallback([], { noData: true });
                return;
            }

            const bars = data.map(item => ({
                time: item[0],
                low: parseFloat(item[3]* this.inrPrice),
                high: parseFloat(item[2] * this.inrPrice),
                open: parseFloat(item[1] * this.inrPrice),
                close: parseFloat(item[4]* this.inrPrice),
                volume: parseFloat(item[5]* this.inrPrice),
            }));

            if (firstDataRequest) {
                lastBarsCache.set(symbolInfo.name, { ...bars[bars.length - 1] });
            }
            
            onHistoryCallback(bars, { noData: false });
        
        } catch (error) {
            
            onErrorCallback(error);
        }
    }

    subscribeBars(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) {
        
        const intervalMap = {
            '1D': '1d',
            '1W': '1w',
            '1M': '1M',
        };

        const interval = intervalMap[resolution];

        if (!interval) {
            return;
        }

        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbolInfo.name.toLowerCase()}@kline_${interval}`);

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.e === 'kline') {
                const kline = message.k;
                const bar = {
                    time: kline.t,
                    low: parseFloat(kline.l * this.inrPrice),
                    high: parseFloat(kline.h  * this.inrPrice),
                    open: parseFloat(kline.o * this.inrPrice),
                    close: parseFloat(kline.c * this.inrPrice),
                    volume: parseFloat(kline.v * this.inrPrice),
                };
                onRealtimeCallback(bar);
            }
        };

        this.subscribers[subscriberUID] = ws;
    }

    unsubscribeBars(subscriberUID) {
        const ws = this.subscribers[subscriberUID];
        if (ws) {
            ws.close();
            delete this.subscribers[subscriberUID];
        }
    }
}

export default CustomDatafeed;