// binanceWebSocket.js

let tickerWs;
let orderBookWs;
let aggTradeWs;
let object = {};

const checkWebSocketConnection = (ws, streamName) => {
    if (!ws) return false;

    switch (ws.readyState) {
        case WebSocket.OPEN:
            console.log(`Already connected to Binance ${streamName} stream`);
            return true;
        case WebSocket.CONNECTING:
            console.log(`WebSocket is currently connecting to Binance ${streamName} stream`);
            return true;
        case WebSocket.CLOSING:
        case WebSocket.CLOSED:
            console.log(`WebSocket is closing or closed for Binance ${streamName} stream, attempting to reconnect...`);
            return false;
        default:
            return false;
    }
};

export const connectToBinanceStream = (symbol, streamType, onMessage, onOpen, onError, onClose) => {
    if (!symbol) return;

    let ws;
    let streamName;

    if (streamType === 'ticker') {
        ws = tickerWs;
        streamName = `${symbol} ticker`;
    } else if (streamType === 'orderBook') {
        ws = orderBookWs;
        streamName = `${symbol} order book`;
    } else if (streamType === 'aggTrade') {
        ws = aggTradeWs;
        streamName = `${symbol} aggTrade`;
    }

    if (checkWebSocketConnection(ws, streamName)) return;

    if (ws) ws.close();

    let url;
    if (streamType === 'ticker') {
        url = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@ticker`;
    } else if (streamType === 'orderBook') {
        url = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth20`;
    } else if (streamType === 'aggTrade') {
        url = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@aggTrade`;
    }

    ws = new WebSocket(url);

    ws.onopen = () => {
        console.log(`Connected to Binance ${streamName} stream`);
        if (onOpen) onOpen(`Connected to ${streamName} stream`);
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (streamType === 'ticker') {
            const priceColor = (parseFloat(data.c) > parseFloat(data.b)) ? 'text-success' : 'text-danger';
            object = { pClr: priceColor, perClr: priceColor, price: data.c, percentage: '' }
        }

        if(streamType == 'orderBook') {
            data['tickerChange'] = object
        }

        if(Object.keys(object).length > 0 && parseFloat(object.price) > 0) {
            onMessage(data);
        }
    };

    ws.onerror = (error) => {
        const errorMsg = `Error in ${streamName} stream: ${error.message}`;
        console.error(errorMsg);
        if (onError) onError(errorMsg);
    };

    ws.onclose = () => {
        const closeMsg = `Disconnected from ${streamName} stream`;
        console.log(closeMsg);
        if (onClose) onClose(closeMsg);
    };

    if (streamType === 'ticker') {
        tickerWs = ws;
    } else if (streamType === 'orderBook') {
        orderBookWs = ws;
    } else if (streamType === 'aggTrade') {
        aggTradeWs = ws;
    }

    return ws;
};

export const connectToStreams = (symbol, onMessage, type, onStatusChange) => {

    const handleError = (message) => {
        console.error('WebSocket error:', message);
        onStatusChange(message);
    };

    connectToBinanceStream(symbol, type, onMessage,
        (message) => onStatusChange(message),
        handleError,
        (message) => onStatusChange(message));
};
