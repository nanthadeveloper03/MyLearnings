'use client'
import React from 'react';
import { useState } from 'react';
import RecentTrade from './RecentTrade';

const Market = () => {

  const [flatTabs, setFlatTabs] = useState(1)
  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }

  return (
    <>
      <div className='market_tsc1'>
        <div className='trade_tab'>
          <ul className="menu-tabtrd d-flex">           
            <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(2)}><a>Market Trades</a></li>
          </ul>

          <div className="content-tabrd">           
            <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>
              <RecentTrade />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Market;
