import React from 'react';
import Link from "next/link";

const TradeHeader = () => {
  return (
    <>
      <div className='trd_hdsc1 w-100'>
        <div className='trd_hdlef1 d-flex align-items-center'>
          <div className='trd_bal1'>
            <h4>
              <div className='coin_tico'>
                <img src='/assets/images/trade/coin2.png' className='coinim' />
                <img src='/assets/images/trade/coin1.png' className='coinim coinext' />
              </div>
              <div className='coin_tnam'>
                <div className='coin_thd'>BTC/USDT <span className='coin_tim'>3X</span> </div>
                <div className='coin_tsub'><img src='/assets/images/trade/openbook.png' className='img-fluid' /> Bitcoin Price</div>
                <div className='coin_tfav'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                  </svg>
                </div>
              </div>

            </h4>
          </div>
          <div className='trd_bal2'>
            <h5 className='pri_color'>59,480.93</h5>
            <h6>$59480.93</h6>
          </div>

          <ul className="d-flex flex-wrap gap-5 trd_vlis1">
            <li>
              <p>24h Change</p>
              <p className='pri_color'>+3.52%</p>
            </li>
            <li>
              <p className='text-muted'>
                24h High
              </p>
              <p>
                59,959.22
              </p>
            </li>
            <li>
              <p className='text-muted'>
                24h Low
              </p>
              <p>
                57,212.68
              </p>
            </li>
            <li>
              <p className='text-muted'>
                24h Volume(BTC)
              </p>
              <p>
                1.20K
              </p>
            </li>
            <li>
              <p className='text-muted'>
                24h Volume(USDT)
              </p>
              <p>
                70.85M
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default TradeHeader;
