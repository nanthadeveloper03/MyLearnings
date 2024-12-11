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
        this.fromCurrency=pairInfo.fromCurrency;
        this.toCurrency=pairInfo.toCurrency;        
    }

    onReady(callback) {
        setTimeout(() => callback(configurationData));
    }

    async resolveSymbol(symbolName, onSymbolResolvedCallback, onResolveErrorCallback) {
        console.log("symbolName121212",this.fromCurrency);
        console.log("symbolName1212",this.toCurrency);
        const symbolInfo = {
            ticker: symbolName,
            name: symbolName,
            description: symbolName,
            type: 'crypto',
            session: '24x7',
            timezone: 'Etc/UTC',
            exchange: 'Ultrapro',
            minmov: 1,
            pricescale: 1000000,
            has_intraday: false,
            visible_plots_set: 'ohlc',
            has_weekly_and_monthly: true,
            supported_resolutions: configurationData.supported_resolutions,
            volume_precision: 6,
            price_precision: 6,
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

        console.log("symbolInfo",symbolInfo.name)
        let url="";
        if(symbolInfo.name.includes("UPRO") == true){
        url = `https://api.binance.com/api/v3/klines?symbol=TRXUSDT&interval=${interval}&startTime=${1728311821 * 1000}&endTime=${to * 1000}`;

        }
        else{
           url = `https://api.binance.com/api/v3/klines?symbol=${symbolInfo.name}&interval=${interval}&startTime=${1728311821 * 1000}&endTime=${to * 1000}`;
        }

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

            let datacustom = data;
             if(symbolInfo.name.includes("UPRO") == true){                
                const responseupro = await fetch(`https://tradebackend.ultraproex.com/trade/chartData?pair=${this.fromCurrency}_${this.toCurrency}`);
                const datasdfsdf = await responseupro.json();
                const transformedData = datasdfsdf.data.map(record => [
                        record.time,         // Time
                        (parseFloat(record.open).toFixed(6)), // Open (formatted to 2 decimal places)
                        (parseFloat(record.high).toFixed(6)), // High (formatted to 2 decimal places)
                        (parseFloat(record.low).toFixed(6)),  // Low (formatted to 2 decimal places)
                        (parseFloat(record.close).toFixed(6)), // Close (formatted to 2 decimal places)
                        record.volume        // Volume
                    ]);
            
            datacustom = transformedData;
            }
            else{
                console.log("else")
            }
            const bars = datacustom.map(item => ({
                time: item[0],
                low: parseFloat(item[3]),
                high: parseFloat(item[2] ),
                open: parseFloat(item[1] ),
                close: parseFloat(item[4]),
                volume: parseFloat(item[5]),
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
                    low: parseFloat(kline.l),
                    high: parseFloat(kline.h),
                    open: parseFloat(kline.o),
                    close: parseFloat(kline.c),
                    volume: parseFloat(kline.v),
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