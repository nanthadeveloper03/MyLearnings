import React from 'react';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { apiRequest } from '@/hooks/tradeapiCall';
import {formatNumberKMB } from '@/util/common';
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
        <div className='trade_tab'>
          <div className="content-inner">
            <ul className='d-flex flex-wrap gap-3 menu_en'>
            <li className={flatTabs1 === 1 ? "active" : ""} onClick={() => handleFlatTabs1(1)}>
                <a href='#'>
                  <img src='/assets/images/trade/menu3.png' className='img-fluid' />
                </a>
              </li>

              <li className={flatTabs1 === 2 ? "active" : ""} onClick={() => handleFlatTabs1(2)}>
                <a href='#'>
                  <img src='/assets/images/trade/menu1.png' className='img-fluid' />
                </a>
              </li>
              <li className={flatTabs1 ===3 ? "active" : ""} onClick={() => handleFlatTabs1(3)}>
                <a href='#'>
                  <img src='/assets/images/trade/menu2.png' className='img-fluid' />
                </a>
              </li>
              {/* <li className={flatTabs1 === 4 ? "active" : ""} onClick={() => handleFlatTabs1(3)}>
                <a href='#'>
                  <img src='/assets/images/trade/menu3.png' className='img-fluid' />
                </a>
              </li> */}
            </ul>
            <div className={`content-inner ${(askData.length == 0) && 'loading'}`} style={{ display: `${flatTabs1 === 1 ? "block" : "none"}` }}>
              <div className='trd_table1'>
                <div className='row mx-1 mark_scm1'>
                  <div className='col-6 px-1'>
                    <div className='virtual_thead d-flex align-items-center w-100'>
                      <div className='vir_fd1'>
                        Price({(pairInfo.toCurrency) ? pairInfo.toCurrency :  '...'})
                      </div>
                      <div className='vir_fd2'>
                        Amount({(pairInfo.fromCurrency) ? pairInfo.fromCurrency :  '...'})
                      </div>
                    </div>
                    <div className="virtual_tbody anim_scoll1 d-flex flex-column w-100">
                        {askData.length > 0 && askData.slice(0, 13).map((ask, index) => {
                      let price = decimalRoundOff((ask.price * inrPrice), priceDecimal);
                      let amount = ask.quantity
                      let total = decimalRoundOff((price * amount), priceDecimal)
                      let object = { price: price, amount: amount, total: total, type: 0 }
                      return (
                        <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index}>
                          <div className="vir_fd1"><p className="text-danger">{price}</p></div>
                          <div className="vir_fd2"><p>{amount}</p></div>
                          {/* <div className="vir_fd2"><p>{total}</p></div> */}
                        </div>
                      )
                    })}
                    </div>
                  </div>
                  <div className='col-6 px-1'>
                    <div className='virtual_thead d-flex align-items-center w-100'>
                      <div className='vir_fd1'>
                        Price(USDT)
                      </div>
                      <div className='vir_fd2'>
                        Amount(BTC)
                      </div>
                    </div>
                    <div className="virtual_tbody anim_scoll1 d-flex flex-column w-100">
                    {bidData.length > 0 && bidData.slice(0, 13).map((bid, index) => {
                      let price = decimalRoundOff((bid.price * inrPrice), priceDecimal);
                      let amount = bid.quantity
                      let total = decimalRoundOff((price * amount), priceDecimal)
                      let object = { price: price, amount: amount, total: total, type: 0 }
                      return (
                        <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index}>
                          <div className="vir_fd1"><p className="text-success">{price}</p></div>
                          <div className="vir_fd2"><p>{amount}</p></div>
                          {/* <div className="vir_fd2"><p>{total}</p></div> */}
                        </div>
                      )
                    })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-inner" style={{ display: `${flatTabs1 === 2 ? "block" : "none"}` }}>
              <div className='trd_table1'>
                <div className='virtual_thead d-flex align-items-center w-100'>
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
                {bidData.length > 0 && bidData.reverse().map((bid, index) => {
                      let price = decimalRoundOff((bid.price * inrPrice), priceDecimal);
                      let amount = decimalRoundOff(bid.quantity, amountDecimal)
                      let total = decimalRoundOff((price * amount), priceDecimal)
                      let object = { price: price, amount: amount, total: total, type: 0 }
                      return (
                        <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index}>
                          <div className="vir_fd1"><p className="text-success">{price}</p></div>
                          <div className="vir_fd2"><p>{amount}</p></div>
                          <div className="vir_fd2"><p>{(price * amount).toFixed(priceDecimal)}</p></div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
            <div className="content-inner" style={{ display: `${flatTabs1 === 3 ? "block" : "none"}` }}>
              <div className='trd_table1'>
                <div className='virtual_thead d-flex align-items-center w-100'>
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
                {askData.length > 0 && askData.map((ask, index) => {
                      let price = decimalRoundOff((ask.price * inrPrice), priceDecimal);
                      let amount = decimalRoundOff(ask.quantity, amountDecimal)
                      let total = decimalRoundOff((price * amount), priceDecimal)
                      let object = { price: price, amount: amount, total: total, type: 0 }
                      return (
                        <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index}>
                          <div className="vir_fd1"><p className="text-danger">{price}</p></div>
                          <div className="vir_fd2"><p>{amount}</p></div>
                          <div className="vir_fd2"><p>{(amount*total).toFixed(priceDecimal)}</p></div> 
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default TradeMarket;
