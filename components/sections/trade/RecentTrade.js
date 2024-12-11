"use client"
import { useEffect, useState } from 'react';
import { connectToStreams } from '@/util/binanceWebSocket';
import { decimalRoundOff } from '@/util/helper';

export default function RecentTrade({ deviceType, pair, pairInfo }) {

    const [trades, setTrades] = useState([]);
    const [connected, setConnected] = useState(false);
    const priceDecimal = pairInfo.priceDecimal || 8
    const amountDecimal = pairInfo.amountDecimal || 8
    const inrPrice = (pairInfo.toCurrency == 'INR') ? pairInfo.inrPrice : 1


    const onMessage = (trade) => {
        setTrades((prevTrades) => [trade, ...prevTrades].slice(0, 19));
    };

    const handleStatusChange = (message) => {
        const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
        if (messageStr.includes('Connected')) {
            setConnected(true);
        } else if (messageStr.includes('Disconnected') || messageStr.includes('Error')) {
            setConnected(false);
        }
    };

    const changeTab = (tabVal) => {
        setTabId(tabVal)
    }

    useEffect(() => {
        if (pairInfo) {
            let binancePair = pairInfo.streamPair;
            connectToStreams(binancePair, onMessage, 'aggTrade', handleStatusChange);
            return () => { handleStatusChange('Disconnected from all streams'); };
        }
    }, [pairInfo]);

    const getTradeType = (trade) => {
        return trade.m ? 'text-success' : 'text-danger';
    };

    return (
        <>
            <div className={`trd_table1 ${(trades.length == 0) && 'loading'}`}>
                <div className='virtual_thead d-flex align-items-center w-100 mt-4 mb-5'>
                    <div className='vir_fd1'>
                        Price({(pairInfo.toCurrency) ? pairInfo.toCurrency : '...'})
                    </div>
                    <div className='vir_fd2'>
                        Amount({(pairInfo.fromCurrency) ? pairInfo.fromCurrency : '...'})
                    </div>
                    <div className='vir_fd2'>
                        Total({(pairInfo.toCurrency) ? pairInfo.toCurrency : '...'})
                    </div>
                </div>
                <div className="virtual_tbody d-flex flex-column w-100 mt-2">
                    {trades && trades.length > 0 ?

                        trades.map((trade, index) => {
                            let price = decimalRoundOff((trade.p * inrPrice), priceDecimal);
                            let amount = trade.q
                            return (
                                <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index}>
                                    <div className="vir_fd1"><p className={getTradeType(trade)}>{price}</p></div>
                                    <div className="vir_fd2"><p>{amount}</p></div>
                                    <div className="vir_fd2"><p>{(amount * price).toFixed(priceDecimal)}</p></div>
                                    {/*<div className="vir_fd2"><p>{new Date(trade.T).toLocaleTimeString()}</p></div>*/}
                                </div>
                            )
                        })

                        :

                        <div className="text-center col-md-12 col-md-offset-12 exchange-text-center">
                            Processing ...
                        </div>
                    }
                </div>
            </div>
        </>
    );
}