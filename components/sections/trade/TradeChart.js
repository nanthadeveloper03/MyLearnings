'use client'
import React from 'react';
import Link from "next/link";
import { useEffect, useState } from 'react';



export default function TradeChart() {
  
  const [flatTabs, setFlatTabs] = useState(1)
  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }

  return (
    <>
      <div className='trd_mnchart'>
        <div className='trade_tab'>

          <ul className="menu-tabtrd d-flex">
            <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><Link href="#">Chart</Link></li>
            <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><Link href="#">Info</Link></li>
            <li className={flatTabs === 3 ? "active" : ""} onClick={() => handleFlatTabs(3)}><Link href="#">Trading Data</Link></li>
            <li className={flatTabs === 4 ? "active" : ""} onClick={() => handleFlatTabs(4)}><Link href="#">Square</Link></li>
          </ul>

          <div className="content-tabrd">
            <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>
              <img src='/assets/images/trade/graph.png' className='img-fluid' />
            </div>
            <div className="content-inner" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>
            <img src='/assets/images/trade/graph.png' className='img-fluid' />
            </div>
            <div className="content-inner" style={{ display: `${flatTabs === 3 ? "block" : "none"}` }}>
            <img src='/assets/images/trade/graph.png' className='img-fluid' />
            </div>
            <div className="content-inner" style={{ display: `${flatTabs === 4 ? "block" : "none"}` }}>
            <img src='/assets/images/trade/graph.png' className='img-fluid' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}