import React from 'react';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { formatNumberKMB } from '@/util/common';
import { useSelector } from 'react-redux';
import { connectToStreams } from '@/util/binanceWebSocket';
import { decimalRoundOff } from '@/util/helper';
const TradeMarket = ({pairInfo}) => {


  const { tickerPrice } = useSelector((state) => state.common);
  const [orderBook, setOrderBook] = useState([])
  const priceDecimal = pairInfo.priceDecimal || 8
  const amountDecimal = pairInfo.amountDecimal || 8
  const inrPrice = (pairInfo.toCurrency == 'INR') ? pairInfo.inrPrice : 1

  //Tabs

  const [flatTabs, setFlatTabs] = useState(1)
  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }

  const [flatTabs1, setFlatTabs1] = useState(1)
  const handleFlatTabs1 = (index) => {
    setFlatTabs1(index)
  }



  const [orderBookData, setOrderBookData] = useState({ bids: [], asks: [], ticker: {} });
    const [connected, setConnected] = useState(false);
    
    const onMessage = (data) => {
        setOrderBookData({
            bids: data.bids.slice(0, 20).map(([price, quantity]) => ({ price, quantity })),
            asks: data.asks.slice(0, 20).map(([price, quantity]) => ({ price, quantity })),
            ticker: {}
        });
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
            connectToStreams(binancePair, onMessage, 'orderBook', handleStatusChange);
            return () => { handleStatusChange('Disconnected from all streams'); };
        }
    }, [pairInfo]);
    let askData = orderBookData.asks || []
    let bidData = orderBookData.bids || []

  return (
    <>
      <div className='market_tsc1'>
      <div className='trd_table1'>
                <div className='virtual_thead d-flex align-items-center w-100 mt-4 mb-5'>
                  <div className='vir_fd1'>
                    Price({(pairInfo.toCurrency) ? pairInfo.toCurrency :  '...'})
                  </div>
                  <div className='vir_fd2'>
                    Amount({(pairInfo.fromCurrency) ? pairInfo.fromCurrency :  '...'})
                  </div>
                  <div className='vir_fd2'>
                    Total({(pairInfo.toCurrency) ? pairInfo.toCurrency :  '...'})
                  </div>
                </div>
                <div className="virtual_tbody d-flex flex-column w-100">
          5
                </div>

                <div className="virtual_tbody d-flex flex-column w-100">
                 6
                </div>
              </div>        
      </div>
    </>
  );
};

export default TradeMarket;
