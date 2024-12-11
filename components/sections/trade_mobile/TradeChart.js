import React from 'react';
import Link from "next/link";
import { useEffect, useState } from 'react';
import TradeOrder from "@/components/sections/trade_mobile/TradeOrder";
import TradeMarket from "@/components/sections/trade_mobile/TradeMarket";
import TradeInfo from "@/components/sections/trade_mobile/TradeInfo";
import TradeData from "@/components/sections/trade_mobile/TradeData";

export default function TradeChart() {
  
  const [flatTabs, setFlatTabs] = useState(1)
  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }

  return (
    <>
      <div className='trd_mnchart1'>
        <div className='trade_tab1'>

          <ul className="menu-tabtrd d-flex">
            <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><Link href="#">Chart</Link></li>
            <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><Link href="#">OrderBook</Link></li>
            <li className={flatTabs === 3 ? "active" : ""} onClick={() => handleFlatTabs(3)}><Link href="#">Trades</Link></li>
            <li className={flatTabs === 4 ? "active" : ""} onClick={() => handleFlatTabs(4)}><Link href="#">Info</Link></li>
            <li className={flatTabs === 5 ? "active" : ""} onClick={() => handleFlatTabs(5)}><Link href="#">Trading Data</Link></li>
          </ul>

          <div className="content-tabrd">
            <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>
              <img src='/assets/images/trade/trd_hd1.png' className='img-fluid' />
              <img src='/assets/images/trade/mob_trade.png' className='img-fluid' />
            </div>
            <div className="content-inner" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>
              <img src='/assets/images/trade/trd_hd1.png' className='img-fluid' />
              <TradeOrder />
            </div>
            <div className="content-inner" style={{ display: `${flatTabs === 3 ? "block" : "none"}` }}>
              <img src='/assets/images/trade/trd_hd1.png' className='img-fluid' />
              <TradeMarket />
            </div>
            <div className="content-inner" style={{ display: `${flatTabs === 4 ? "block" : "none"}` }}>
              <TradeInfo />         
            </div>
            <div className="content-inner" style={{ display: `${flatTabs === 5 ? "block" : "none"}` }}>
              <TradeData />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}