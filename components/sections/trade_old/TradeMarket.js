'use client'
import React from 'react';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { apiRequest } from '@/hooks/tradeapiCall';
import { formatNumberComma, formatNumberKMB } from '@/util/common';
import { decimalRoundOff } from '@/util/helper';
import { useSelector } from 'react-redux';
import RecentTrade from './RecentTrade'

const TradeMarket = ({ pair, pairInfo, data }) => {

  const { tickerPrice } = useSelector((state) => state.common);
  const [orderBook, setOrderBook] = useState([])
  const priceDecimal = pairInfo.priceDecimal || 8
  const amountDecimal = pairInfo.amountDecimal || 8
  const inrPrice = (pairInfo.toCurrency == 'INR') ? pairInfo.inrPrice : 1

  const [flatTabs, setFlatTabs] = useState(1)
  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }

  const [flatTabs1, setFlatTabs1] = useState(1)
  const handleFlatTabs1 = (index) => {
    setFlatTabs1(index)
  }

  useEffect(() => {
    setOrderBook(data)
  }, [data])

  let askData = orderBook.asks || []
  let bidData = orderBook.bids || []

  console.log(tickerPrice, '=========')

  return (
    <>
      <div className='market_tsc1'>
        <div className='trade_tab'>

          <ul className="menu-tabtrd d-flex">
            <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}>
              <Link href="#">Order Book</Link>
            </li>
            <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}>
              <Link href="#">Market Trades</Link>
            </li>
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
              </ul>


              <div className="content-inner" style={{ display: `${flatTabs1 === 1 ? "block" : "none"}` }}>
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

                  <div className="virtual_tbody anim_scoll1 d-flex flex-column w-100">
                    {askData.length > 0 && askData.slice(0, 13).map((ask, index) => {
                      let price = decimalRoundOff((ask.price * inrPrice), priceDecimal);
                      let amount = decimalRoundOff(ask.quantity, amountDecimal)
                      let total = decimalRoundOff((price * amount), priceDecimal)
                      let object = { price: price, amount: amount, total: total, type: 0 }
                      return (
                        <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index}>
                          <div className="vir_fd1"><p className="text-danger">{price}</p></div>
                          <div className="vir_fd2"><p>{amount}</p></div>
                          <div className="vir_fd2"><p>{total}</p></div>
                        </div>
                      )
                    })}
                  </div>


                  <div className="virtual_tbody d-flex flex-column w-100">
                    <div className="virt_tinrw d-flex align-items-center w-100">
                      <div className="vir_fd3">
                        {tickerPrice &&
                          <h4 className={`${tickerPrice.perClr}`}>{decimalRoundOff((tickerPrice.price * inrPrice), priceDecimal)}</h4>
                        }

                      </div>
                    </div>
                  </div>


                  <div className="virtual_tbody anim_scoll1 d-flex flex-column w-100">
                    {bidData.length > 0 && bidData.slice(0, 13).reverse().map((bid, index) => {
                      let price = decimalRoundOff((bid.price * inrPrice), priceDecimal);
                      let amount = decimalRoundOff(bid.quantity, amountDecimal)
                      let total = decimalRoundOff((price * amount), priceDecimal)
                      let object = { price: price, amount: amount, total: total, type: 0 }
                      return (
                        <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index}>
                          <div className="vir_fd1"><p className="text-success">{price}</p></div>
                          <div className="vir_fd2"><p>{amount}</p></div>
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
                      let amount = decimalRoundOff(bid.quantity, amountDecimal)
                      let total = decimalRoundOff((price * amount), priceDecimal)
                      let object = { price: price, amount: amount, total: total, type: 0 }
                      return (
                        <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index}>
                          <div className="vir_fd1"><p className="text-success">{price}</p></div>
                          <div className="vir_fd2"><p>{amount}</p></div>
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
                      let amount = decimalRoundOff(ask.quantity, amountDecimal)
                      let total = decimalRoundOff((price * amount), priceDecimal)
                      let object = { price: price, amount: amount, total: total, type: 0 }
                      return (
                        <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index}>
                          <div className="vir_fd1"><p className="text-danger">{price}</p></div>
                          <div className="vir_fd2"><p>{amount}</p></div>
                          <div className="vir_fd2"><p>{total}</p></div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>


            </div>

            <div className="content-inner" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>
              <RecentTrade pairInfo={pairInfo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TradeMarket;
