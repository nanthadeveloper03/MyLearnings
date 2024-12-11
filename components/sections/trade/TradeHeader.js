'use client'
import { useEffect, useState } from 'react';
import Link from "next/link";
import { apiRequest } from '@/hooks/tradeapiCall';
import { formatNumberComma, formatNumberKMB } from '@/util/common';
import { decimalRoundOff } from '@/util/helper';

const TradeHeader = ({ pair, pairInfo, tickerData }) => {

  const priceDecimal = pairInfo.priceDecimal || 8
  const amountDecimal = pairInfo.amountDecimal || 8
  const inrPrice = (pairInfo.toCurrency == 'INR') ? pairInfo.inrPrice : 1
  console.log("tickerData============", tickerData);
  
  return (
    <>
      {pairInfo.pair.includes("UPRO") == false &&
        <div className='trd_hdsc1 w-100'>
          <div className='trd_hdlef1 d-flex align-items-center'>
            <div className='trd_bal1'>
              <h4>
                {/* <div className='coin_tico'>
                             <img src='/assets/images/trade/coin2.png' className='coinim' />
                             <img src='/assets/images/trade/coin1.png' className='coinim coinext' />
                           </div>*/}
                <div className='coin_tnam'>
                  <div className='coin_thd'>{(pairInfo.fromCurrency) ? pairInfo.fromCurrency : "..."}/{(pairInfo.toCurrency) ? pairInfo.toCurrency : "..."}  </div>
                  {/*<div className='coin_tsub'><img src='/assets/images/trade/openbook.png' className='img-fluid' /> Bitcoin Price</div>*/}
                  {/* <div className='coin_tfav'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                  </svg>
                </div> */}
                </div>

              </h4>
            </div>
            <div className='trd_bal2' style={{ width: "10%" }}>
              <h5 className={`fw-bold ${tickerData && (parseFloat(tickerData.c) > parseFloat(tickerData.b)) ? 'text-success' : 'text-danger'}`}>{tickerData && decimalRoundOff((tickerData.c * inrPrice), priceDecimal) || '0.0000'}</h5>
            </div>

            <ul className="d-flex flex-wrap gap-5 trd_vlis1">
              <li>
                <p>24h Change</p>
                <p className={`pri_color ${tickerData && tickerData.P > 0 ? 'text-success' : 'text-danger'} fw-bold`} >
                  {tickerData && decimalRoundOff((tickerData.p * inrPrice), priceDecimal) || '0.0000'}
                  <small className='mx-2'> {tickerData && tickerData.P > 0 && '+'} {tickerData && decimalRoundOff(tickerData.P, 2) || '0.0000'}% </small>
                </p>




              </li>
              <li>
                <p className='text-muted'> 24h High </p>
                <p> {tickerData && decimalRoundOff((tickerData.h * inrPrice), priceDecimal) || '0.0000'} </p>
              </li>
              <li>
                <p className='text-muted'>
                  24h Low
                </p>
                <p>
                  {tickerData && decimalRoundOff((tickerData.l * inrPrice), priceDecimal) || '0.0000'}
                </p>
              </li>
              <li>
                <p className='text-muted'>
                  24h Volume({pairInfo.fromCurrency ? pairInfo.fromCurrency : "..."})
                </p>
                <p>
                  {tickerData && decimalRoundOff((tickerData.v * inrPrice), priceDecimal) || '0.0000'}
                </p>
              </li>
              <li>
                <p className='text-muted'>
                  24h Volume({pairInfo.toCurrency ? pairInfo.toCurrency : "..."})
                </p>
                <p>
                  {tickerData && decimalRoundOff((tickerData.q * inrPrice), priceDecimal) || '0.0000'}
                </p>
              </li>
            </ul>
          </div>
        </div>
      }

      {pairInfo.pair.includes("UPRO") == true &&
        <div className='trd_hdsc1 w-100'>
          <div className='trd_hdlef1 d-flex align-items-center'>
            <div className='trd_bal1'>
              <h4>
                {/* <div className='coin_tico'>
                             <img src='/assets/images/trade/coin2.png' className='coinim' />
                             <img src='/assets/images/trade/coin1.png' className='coinim coinext' />
                           </div>*/}
                <div className='coin_tnam'>
                  <div className='coin_thd'>{(pairInfo.fromCurrency) ? pairInfo.fromCurrency : "..."}/{(pairInfo.toCurrency) ? pairInfo.toCurrency : "..."} </div>
                  {/*<div className='coin_tsub'><img src='/assets/images/trade/openbook.png' className='img-fluid' /> Bitcoin Price</div>*/}
             
                </div>

              </h4>
            </div>
            <div className='trd_bal2'>
              {/* <h5 className='pri_color'>{pairInfo.lastPrice ? formatNumberComma(pairInfo.lastPrice, pairInfo.priceDecimal) : "..."}</h5> */}
              <h5 className={`fw-bold ${pairInfo && (parseFloat(pairInfo.lastPrice) > parseFloat(pairInfo.bestBid)) ? 'text-success' : 'text-danger'}`}>{ pairInfo.lastPrice ? formatNumberComma(pairInfo.lastPrice, pairInfo.priceDecimal) : '0.0000'}</h5>

              {/*<h6>$59480.93</h6>*/}
            </div>

            <ul className="d-flex flex-wrap gap-5 trd_vlis1">
              <li>
                <p>24h Change</p>
                {/* {+pairInfo.changePercentage > 0 ? (<p className='pri_color'>+{pairInfo.changePercentage}%</p>) : (<p className='pri_color'>+{pairInfo.changePercentage}%</p>)
                } */}
                {+pairInfo.changePercentage > 0 ? (<p className='text-success'>+{pairInfo.changePercentage}%</p>) : (<p className='text-danger'>{pairInfo.changePercentage}%</p>)}
              </li>
              <li>
                <p className='text-muted'>
                  24h High
                </p>
                <p>
                  {pairInfo.high ? formatNumberComma(pairInfo.high, pairInfo.priceDecimal) : "0.010014"}
                </p>
              </li>
              <li>
                <p className='text-muted'>
                  24h Low
                </p>
                <p>
                  {pairInfo.high ? formatNumberComma(pairInfo.low, pairInfo.priceDecimal) : "0.01"}
                </p>
              </li>
              <li>
                <p className='text-muted'>
                  24h Volume({pairInfo.fromCurrency ? pairInfo.fromCurrency : "..."})
                </p>
                <p>
                  {pairInfo.amountVolume ? formatNumberKMB(pairInfo.amountVolume, pairInfo.priceDecimal) : "16584.21"}
                </p>
              </li>
              <li>
                <p className='text-muted'>
                  24h Volume({pairInfo.toCurrency ? pairInfo.toCurrency : "..."})
                </p>
                <p>
                  {pairInfo.priceVolume ? formatNumberKMB(pairInfo.priceVolume, pairInfo.priceDecimal) : "5658524.21"}
                </p>
              </li>
            </ul>
          </div>
        </div>
      }
    </>
  );
};

export default TradeHeader;
