
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TradeHeader from "@/components/sections/newtrade/TradeHeader";
// import TradeHeader1 from "@/components/sections/trade_mobile/TradeHeader";
import { connectToStreams } from '@/util/binanceWebSocket';
import { updateTicker } from '@/store/commonSlice';

export default function Ticker({ pair, pairInfo }) {

    const dispatch = useDispatch();
    const [tickerData, setTickerData] = useState(null);
    const [connected, setConnected] = useState(false);
    const priceDecimal = pairInfo.priceDecimal || 8
    const amountDecimal = pairInfo.amountDecimal || 8
    const inrPrice = (pairInfo.toCurrency == 'INR') ? pairInfo.inrPrice : 1

    let tprice = 0;
    let tper = 0;
    let prevPrice = 0

    const onMessage = (data) => {
        //prevPrice = tprice
        //tprice = data.c;
        //tper = data.P;
        //let pClr = (tprice >= prevPrice) ? 'text-success' : (tprice < prevPrice) ? 'text-danger' : ''
        //let perClr = (parseFloat(tper) > 0) ? 'text-success' : 'text-danger'
        //data['pClr'] = pClr;
        //data['perClr'] = perClr;
        //let object = { pClr: pClr, perClr: perClr, price: tprice, percentage: tper }
        //dispatch(updateTicker(object))
        setTickerData(data);
    };

    const handleStatusChange = (message) => {
        const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
        if (messageStr.includes('Connected')) {
            setConnected(true);
        } else if (messageStr.includes('Disconnected') || messageStr.includes('Error')) {
            setConnected(false);
        }
    };

    useEffect(() => {
        if (pairInfo) {
            let binancePair = pairInfo.streamPair;
            connectToStreams(binancePair, onMessage, 'ticker', handleStatusChange);
            return () => { handleStatusChange('Disconnected from all streams'); };
        }
    }, [pairInfo]);

    return (
        <>
            <div className={!connected ? `loading`: ''}>
                {/* <div className='trad_mob'>
                    <TradeHeader1 pair={pair} pairInfo={pairInfo} tickerData={tickerData} />
                </div>

                <div className="trade_web">
                    <TradeHeader pair={pair} pairInfo={pairInfo} tickerData={tickerData} />
                 </div> */}

                <TradeHeader pair={pair} pairInfo={pairInfo} tickerData={tickerData} />

            </div>
        </>
    );
}
