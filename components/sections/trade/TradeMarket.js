'use client'
import React from 'react';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { connectToStreams } from '@/util/binanceWebSocket';
import { decimalRoundOff } from '@/util/helper';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '@/store/commonSlice';
import RecentTrade from './RecentTrade';

import { formatNumberComma, formatNumberKMB } from '@/util/common';
import { apiRequest } from '@/hooks/tradeapiCall';
const TradeMarket = ({ pairInfo }) => {
  const dispatch = useDispatch()
  //const { tickerPrice } = useSelector((state) => state.common);
  const [orderBook, setOrderBook] = useState([])
  const priceDecimal = pairInfo.priceDecimal || 8
  const amountDecimal = pairInfo.amountDecimal || 8
  const inrPrice = (pairInfo.toCurrency == 'INR') ? pairInfo.inrPrice : 1

  //Tabs
  let taborder = 1
  if (pairInfo?.pair?.includes("UPRO") == false) {
    taborder = 1;
  }
  else {
    taborder = 2;
  }

  const [flatTabs, setFlatTabs] = useState(taborder);
  const [myTradeslist, setmyTradeslist] = useState([]);
  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }

  const [flatTabs1, setFlatTabs1] = useState(1)
  const handleFlatTabs1 = (index) => {
    setFlatTabs1(index)
  }

  useEffect(() => {

    tradeHistory();
  }, [])
  let tradeHistory = async () => {
    const myTrades = await apiRequest('/trade/myTrades', { pair: pairInfo.pair, perPage: 10, currentPage: 1 });
    setmyTradeslist(myTrades.data);
  }



  const [orderBookData, setOrderBookData] = useState({ bids: [], asks: [], ticker: {} });
  const [connected, setConnected] = useState(false);

  const onMessage = (data) => {
    setOrderBookData({
      bids: data.bids.slice(0, 18).map(([price, quantity]) => ({ price, quantity })),
      asks: data.asks.slice(0, 18).map(([price, quantity]) => ({ price, quantity })),
      ticker: (data.tickerChange) ? data.tickerChange : ''
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
          <ul className="menu-tabtrd d-flex">
            {pairInfo?.pair?.includes("UPRO") == false &&
              <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><Link href="javascript:;">Order Book</Link></li>
            }
            <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><Link href="javascript:;">Market Trades</Link></li>
          </ul>


          <div className="content-tabrd">
            <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>
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
                <li className={flatTabs1 === 3 ? "active" : ""} onClick={() => handleFlatTabs1(3)}>
                  <a href='#'>
                    <img src='/assets/images/trade/menu2.png' className='img-fluid' />
                  </a>
                </li>
                {/* <li className={flatTabs1 === 3 ? "active" : ""} onClick={() => handleFlatTabs1(3)}>
                  <a href='#'>
                    <img src='/assets/images/trade/menu3.png' className='img-fluid' />
                  </a>
                </li> */}
              </ul>


              <div className={`content-inner ${(askData.length == 0) && 'loading'}`} style={{ display: `${flatTabs1 === 1 ? "block" : "none"}` }} >
                <div className='trd_table1'>
                  <div className='virtual_thead d-flex align-items-center w-100 mb-2'>
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
                  <div className="virtual_tbody anim_scoll1 d-flex flex-column w-100">
                    {askData.length > 0 && askData.slice(0, 7).reverse().map((ask, index) => {
                      let price = decimalRoundOff((ask.price * inrPrice), priceDecimal);
                      let amount = ask.quantity
                      let total = decimalRoundOff((price * amount), priceDecimal)
                      let object = { price: price, amount: amount, total: total, type: 1 }
                      return (
                        <div className="virt_tinrw d-flex align-items-center w-100 position-relative cursor-pointer" key={index} onClick={() => dispatch(updateFormData(object))}>
                          <div className="vir_fd1"><p className="text-danger">{price}</p></div>
                          <div className="vir_fd2 m-0 p-0 "><p>{amount}</p></div>
                          <div className="vir_fd2"><p>{total}</p></div>
                        </div>
                      )
                    })}

                  </div>
                  <div className="virtual_tbody d-flex flex-column w-100">
                    <div className="virt_tinrw d-flex align-items-center w-100">
                      <div className="vir_fd3">
                        {orderBookData.ticker &&
                          <h4 className={`${orderBookData.ticker.perClr}`}>{decimalRoundOff((orderBookData.ticker.price * inrPrice), priceDecimal)}</h4>
                        }

                      </div>
                    </div>
                  </div>
                  <div className="virtual_tbody anim_scoll1 d-flex flex-column w-100">
                    {bidData.length > 0 && bidData.slice(0, 7).map((bid, index) => {
                      let price = decimalRoundOff((bid.price * inrPrice), priceDecimal);
                      let amount = bid.quantity
                      let total = decimalRoundOff((price * amount), priceDecimal)
                      let object = { price: price, amount: amount, total: total, type: 2 }
                      return (
                        <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index} onClick={() => dispatch(updateFormData(object))}>
                          <div className="vir_fd1"><p className="text-success">{price}</p></div>
                          <div className="vir_fd2 m-0 p-0"><p>{amount}</p></div>
                          <div className="vir_fd2"><p>{total}</p></div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>


              <div className="content-inner" style={{ display: `${flatTabs1 === 2 ? "block" : "none"}` }}>
                <div className='trd_table1'>
                  <div className='virtual_thead d-flex align-items-center w-100'>
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
                  <div className="virtual_tbody d-flex flex-column w-100">
                    {bidData.length > 0 && bidData.reverse().map((bid, index) => {
                      let price = decimalRoundOff((bid.price * inrPrice), priceDecimal);
                      let amount = bid.quantity
                      let total = decimalRoundOff((price * amount), priceDecimal)
                      let object = { price: price, amount: amount, total: total, type: 0 }
                      return (
                        <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index} onClick={() => dispatch(updateFormData(object))}>
                          <div className="vir_fd1"><p className="text-success">{price}</p></div>
                          <div className="vir_fd2 m-0 p-0"><p>{amount}</p></div>
                          <div className="vir_fd2"><p>{total}</p></div>
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
                      Price({(pairInfo.toCurrency) ? pairInfo.toCurrency : '...'})
                    </div>
                    <div className='vir_fd2'>
                      Amount({(pairInfo.fromCurrency) ? pairInfo.fromCurrency : '...'})
                    </div>
                    <div className='vir_fd2'>
                      Total({(pairInfo.toCurrency) ? pairInfo.toCurrency : '...'})
                    </div>
                  </div>
                  <div className="virtual_tbody d-flex flex-column w-100">
                    {askData.length > 0 && askData.map((ask, index) => {
                      let price = decimalRoundOff((ask.price * inrPrice), priceDecimal);
                      let amount = ask.quantity
                      let total = decimalRoundOff((price * amount), priceDecimal)
                      let object = { price: price, amount: amount, total: total, type: 1 }
                      return (
                        <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index} onClick={() => dispatch(updateFormData(object))}>
                          <div className="vir_fd1"><p className="text-danger">{price}</p></div>
                          <div className="vir_fd2 m-0 p-0"><p>{amount}</p></div>
                          <div className="vir_fd2"><p>{total}</p></div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>


            </div>
            <div className="content-inner" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>
              <div className='trd_table1'>
                {pairInfo.pair.includes("UPRO") == true &&
                  <div className='virtual_thead d-flex align-items-center w-100 mt-4 mb-5 pb-2'>
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
                }

                <div className="virtual_tbody d-flex flex-column w-100">
                  {pairInfo.pair.includes("UPRO") == false &&
                    <RecentTrade pairInfo={pairInfo} />
                  } {pairInfo.pair.includes("UPRO") && (
                    myTradeslist.length > 0 ? (
                      myTradeslist.map((row, index) => (
                        <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index}>
                          <div className="vir_fd1">
                            <p className={row.type === 'buy' ? 'text-success' : 'text-danger'}>{row.price.toFixed(pairInfo.amountDecimal)}</p>
                          </div>
                          <div className="vir_fd2">
                            <p>{(row.amount).toFixed(pairInfo.amountDecimal)}</p>
                          </div>
                          <div className="vir_fd2">
                            <p>{(row.amount * row.price).toFixed(pairInfo.priceDecimal)}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-records">
                        <p>No records found</p>
                      </div>
                    )
                  )}

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
