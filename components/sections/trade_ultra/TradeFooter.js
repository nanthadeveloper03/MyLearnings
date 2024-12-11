import React from 'react';
import Link from "next/link";
import Marquee from "react-fast-marquee";

const TradeHeader = () => {
  return (
    <>
      <div className='trd_footmarqsc1 w-100'>
        <div className='row'>
          <div className='col-md-10'>   
            <ul className='d-flex gap-4 conn_lis1'>
              <li>
                  <span className='pri_color'>
                    <img src='/assets/images/trade/conn.png' className='img-fluid' />
                    Stable connection                    
                  </span>
              </li>
              <li className='drop_mntrd'>
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                      <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                   </svg>                 
                  <ul className='drop_subtrd'>
                    <li>
                      <Link href="#">No Preview</Link>
                    </li>
                    <li>
                      <Link href="#">Popular Searches</Link>
                    </li>
                    <li>
                      <Link href="#">Favorites</Link>
                    </li>
                  </ul>
              </li>
              <div className='marquee-container'>
              <Marquee speed={80} direction="right" pauseOnHover={true}>
              <ul className='d-flex gap-4'>
              <li>BTC/USDT <span className='pri_color'>+3.78%</span></li>
              <li>ETH/USDT <span className='pri_color'>+3.26%</span></li>
              <li>SHIB/USDT <span className='pri_color'>+7.38%</span></li>
              <li>DOGE/USDT <span className='pri_color'>+7.35%</span></li>
              <li>WIN/USDT <span className='pri_color'>+3.88%</span></li>
              <li>BTC/USDT <span className='pri_color'>+3.78%</span></li>
              <li>ETH/USDT <span className='pri_color'>+3.26%</span></li>
              <li>SHIB/USDT <span className='pri_color'>+7.38%</span></li>
              <li>DOGE/USDT <span className='pri_color'>+7.35%</span></li>
              <li>WIN/USDT <span className='pri_color'>+3.88%</span></li>
              <li>BTC/USDT <span className='pri_color'>+3.78%</span></li>
              <li>ETH/USDT <span className='pri_color'>+3.26%</span></li>
              <li>SHIB/USDT <span className='pri_color'>+7.38%</span></li>
              <li>DOGE/USDT <span className='pri_color'>+7.35%</span></li>
              <li>WIN/USDT <span className='pri_color'>+3.88%</span></li>
              </ul>
              </Marquee>
              </div>
            </ul>
          </div>
          <div className='col-md-2 text-right'>
            <ul className='d-flex flex-wrap gap-5 conn_lis2'>
              <li>
                <Link href="#">Contact</Link>
              </li>
              <li>
                <Link href="#">Download</Link>
              </li>
              <li>
                <Link href="#">Online Chat</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TradeHeader;
