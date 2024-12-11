'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import Link from "next/link";
import { apiRequest } from '@/hooks/tradeapiCall';
import TradingPair from '@/components/sections/trade_mobile/TradingPair';
import { formatNumberComma, formatNumberKMB } from '@/util/common';
import { decimalRoundOff } from '@/util/helper';

const TradeHeader = ({ pair, pairInfo, tickerData }) => {
  console.log("pairInfo===>", pairInfo);

  const [isOpen, setIsOpen] = useState(false);

  const toggleOffcanvas = () => {
    setIsOpen(!isOpen);
  };

  const [viewType, setViewType] = useState('web'); // Default is web view

  // Function to update the viewType based on screen width
  const updateViewType = () => {
    if (window.innerWidth <= 767) {
      setViewType('mobile');
    } else {
      setViewType('web');
    }
  };

  useEffect(() => {
    updateViewType(); // Set initial view type based on the screen size

    // Add event listener to update viewType on window resize
    window.addEventListener('resize', updateViewType);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateViewType);
    };
  }, []);

  const priceDecimal = pairInfo.priceDecimal || 8
  const amountDecimal = pairInfo.amountDecimal || 8
  const inrPrice = (pairInfo.toCurrency == 'INR') ? pairInfo.inrPrice : 1
  return (
    <>
      {pairInfo.pair.includes("UPRO") == false &&
        <>
          {/* Render Web view */}
          {viewType === 'web' && (
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
                    <p className={`pri_color ${tickerData && tickerData.perClr} fw-bold`} >
                      {tickerData && decimalRoundOff((tickerData.p * inrPrice), priceDecimal) || '0.0000'}
                      <small className='mx-2'> {tickerData && tickerData.P || '0.0000'}% </small>
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
          )}

          {/* Render Mobile view */}
          {viewType === 'mobile' && (
            <div className='trd_hdsc2 w-100'>
              <div className='trd_hdlef2 '>
                <div className='row mx-1'>
                  <div className='col-5 px-1'>
                    <div className='coin_tnam1 w-100'>
                      <div className='w-100 d-flex align-items-center gap-2' onClick={toggleOffcanvas}>

                        <div className='co_thd1'>
                          <div className='coin_thd1'>{(pairInfo.fromCurrency) ? pairInfo.fromCurrency : "..."}/{(pairInfo.toCurrency) ? pairInfo.toCurrency : "..."} </div>
                          {/* <div className='coin_tsub1'><img src='/assets/images/trade/openbook.png' className='img-fluid' /> Bitcoin Price</div> */}
                        </div>
                        <span className='co_drp1'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                          </svg>
                        </span>
                      </div>

                      <div className='trd_bal3 w-100 d-flex align-items-center gap-2'>
                        <h5 className={`fw-bold ${tickerData && (parseFloat(tickerData.c) > parseFloat(tickerData.b)) ? 'text-success' : 'text-danger'}`}>{tickerData && decimalRoundOff((tickerData.c * inrPrice), priceDecimal) || '0.0000'}</h5>
                        {/* <h6>$59480.93</h6> */}
                      </div>

                      <div className='trd_vlis2'>

                        <p className={`${tickerData && (parseFloat(tickerData.c) > parseFloat(tickerData.b)) ? 'text-success' : 'text-danger'} fw-bold`}>
                          {tickerData && decimalRoundOff((tickerData.p * inrPrice), priceDecimal) || '0.0000'}
                          <small className='mx-2'> {tickerData && tickerData.P || '0.0000'}% </small>
                        </p>

                      </div>



                    </div>

                    {/* <div className='w-100 d-flex align-items-center'>
                 <div className='row mx-1 mt-3 mb-3 w-100'> */}
                    {/* <div className='col-6 px-1'> */}
                    {/* <div className='trd_bal3'> */}
                    {/* <h5 className={`fw-bold ${tickerData && (parseFloat(tickerData.c) > parseFloat(tickerData.b)) ? 'text-success' : 'text-danger'}`}>{tickerData && decimalRoundOff((tickerData.c * inrPrice), priceDecimal) || '0.0000'}</h5> */}
                    {/* <h6>$59480.93</h6> */}
                    {/* </div> */}
                    {/* </div> */}
                    {/* <div className='col-12 px-1'>
                     <div className='trd_vlis2'>
                       <p>24h Change</p>
                       <p className={`${tickerData && (parseFloat(tickerData.c) > parseFloat(tickerData.b)) ? 'text-success' : 'text-danger'} fw-bold`}>
                         {tickerData && decimalRoundOff((tickerData.p * inrPrice), priceDecimal) || '0.0000'}
                         <small className='mx-2'> {tickerData && tickerData.P || '0.0000'}% </small>
                       </p>
                     </div>
                   </div> */}
                    {/* </div>
               </div> */}
                  </div>
                  <div className='col-7 px-1'>
                    <div className='row mx-1'>
                      <div className='col-6 px-1'>
                        <div className='trd_vlis2'>
                          <p className='text-muted'>
                            24h High
                          </p>
                          <p>
                            {tickerData && decimalRoundOff((tickerData.h * inrPrice), priceDecimal) || '0.0000'}
                          </p>
                        </div>
                      </div>
                      <div className='col-6 px-1'>
                        <div className='trd_vlis2'>
                          <p className='text-muted'>
                            24h Low
                          </p>
                          <p>
                            {tickerData && decimalRoundOff((tickerData.l * inrPrice), priceDecimal) || '0.0000'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='row mx-1 mt-1 mb-1'>
                      <div className='col-6 px-1'>
                        <div className='trd_vlis2'>
                          <p className='text-muted'>
                            24h Volume({pairInfo.fromCurrency ? pairInfo.fromCurrency : "..."})
                          </p>
                          <p>
                            {tickerData && decimalRoundOff((tickerData.v * inrPrice), priceDecimal) || '0.0000'}
                          </p>
                        </div>
                      </div>
                      <div className='col-6 px-1'>
                        <div className='trd_vlis2'>
                          <p className='text-muted'>
                            24h Volume({pairInfo.toCurrency ? pairInfo.toCurrency : "..."})
                          </p>
                          <p>
                            {tickerData && decimalRoundOff((tickerData.q * inrPrice), priceDecimal) || '0.0000'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      }

      {pairInfo.pair.includes("UPRO") == true &&
        <>
          {/* Render Web view */}
          {viewType === 'web' && (
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
                  <h5 className='pri_color'>{pairInfo.lastPrice ? formatNumberComma(pairInfo.lastPrice, pairInfo.priceDecimal) : "..."}</h5>
                  {/*<h6>$59480.93</h6>*/}
                </div>

                <ul className="d-flex flex-wrap gap-5 trd_vlis1">
                  <li>
                    <p>24h Change</p>
                    {+pairInfo.changePercentage > 0 ? (<p className='pri_color'>+{pairInfo.changePercentage}%</p>) : (<p className='pri_color'>+{pairInfo.changePercentage}%</p>)
                    }

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
          )}

          {/* Render Mobile view */}
          {viewType === 'mobile' && (
            <div className='trd_hdsc2 w-100'>
              <div className='trd_hdlef2 '>
                <div className='row mx-1'>
                  <div className='col-5 px-1'>
                    <div className='coin_tnam1 w-100'>

                      {/* <div className='coin_tfav1'>
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                       <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                     </svg>
                   </div> */}
                      <div className='w-100 d-flex align-items-center gap-2' onClick={toggleOffcanvas}>
                        <div className='co_thd1'>
                          <div className='coin_thd1'>{(pairInfo.fromCurrency) ? pairInfo.fromCurrency : "..."}/{(pairInfo.toCurrency) ? pairInfo.toCurrency : "..."} </div>
                          {/* <div className='coin_tsub1'><img src='/assets/images/trade/openbook.png' className='img-fluid' /> Bitcoin Price</div> */}
                        </div>
                        <span className='co_drp1'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                          </svg>
                        </span>
                      </div>

                      <div className='trd_bal3 w-100 d-flex align-items-center gap-2'>
                        <h5 className='pri_color'>{pairInfo.lastPrice ? formatNumberComma(pairInfo.lastPrice, pairInfo.priceDecimal) : "..."}</h5>
                        {/* <h6>$59480.93</h6> */}
                      </div>

                      <div className='trd_vlis2'>
                        {/* <p>24h Change</p> */}
                        {+pairInfo.changePercentage > 0 ? (<p className='pri_color'>+{pairInfo.changePercentage}%</p>) : (<p className='pri_color'>+{pairInfo.changePercentage}%</p>)
                        }
                      </div>


                    </div>
                    {/* <div className='w-100 d-flex align-items-center'>
                   <div className='row mx-1 mt-3 mb-3 w-100'> */}
                    {/* <div className='col-6 px-1'> */}
                    {/* <div className='trd_bal3'>
                         <h5 className='pri_color'>{pairInfo.lastPrice ? formatNumberComma(pairInfo.lastPrice, pairInfo.priceDecimal) : "..."}</h5> */}
                    {/* <h6>$59480.93</h6> */}
                    {/* </div> */}
                    {/* </div> */}
                    {/* <div className='col-6 px-1'>
                       <div className='trd_vlis2'>
                         <p>24h Change</p>
                         {+pairInfo.changePercentage > 0 ? (<p className='pri_color'>+{pairInfo.changePercentage}%</p>) : (<p className='pri_color'>+{pairInfo.changePercentage}%</p>)
                         }
                       </div>
                     </div> */}
                    {/* </div>
                 </div> */}
                  </div>
                  <div className='col-7 px-1'>
                    <div className='row mx-1'>
                      <div className='col-6 px-1'>
                        <div className='trd_vlis2'>
                          <p className='text-muted'>
                            24h High
                          </p>
                          <p>
                            {pairInfo.high ? formatNumberComma(pairInfo.high, pairInfo.priceDecimal) : "0.010014"}
                          </p>
                        </div>
                      </div>
                      <div className='col-6 px-1'>
                        <div className='trd_vlis2'>
                          <p className='text-muted'>
                            24h Low
                          </p>
                          <p>
                            {pairInfo.high ? formatNumberComma(pairInfo.low, pairInfo.priceDecimal) : "0.01"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='row mx-1 mt-1 mb-1'>
                      <div className='col-6 px-1'>
                        <div className='trd_vlis2'>
                          <p className='text-muted'>
                            24h Volume({pairInfo.fromCurrency ? pairInfo.fromCurrency : "..."})
                          </p>
                          <p>
                            {pairInfo.amountVolume ? formatNumberKMB(pairInfo.amountVolume, 0) : "16584.21"}
                          </p>
                        </div>
                      </div>
                      <div className='col-6 px-1'>
                        <div className='trd_vlis2'>
                          <p className='text-muted'>
                            24h Volume({pairInfo.toCurrency ? pairInfo.toCurrency : "..."})
                          </p>
                          <p>
                            {pairInfo.priceVolume ? formatNumberKMB(pairInfo.priceVolume, 0) : "5658524.21"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      }

      {/* Offcanvas sidebar */}
      <div className={`offcanvas search_canvas ${isOpen ? 'show' : ''}`}>
        <div className="offcanvasContent">
          <TradingPair />
        </div>
      </div>

      {/* Overlay (Optional) */}
      {isOpen && <div className="overlay" onClick={toggleOffcanvas}></div>}

    </>
  );
};



export default TradeHeader;
