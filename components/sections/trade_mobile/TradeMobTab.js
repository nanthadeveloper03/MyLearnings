import React from 'react';
import Link from "next/link";
import { useEffect, useState } from 'react';
import TradeOrder from "@/components/sections/trade_mobile/TradeOrder";
import TradeMarket from "@/components/sections/trade_mobile/TradeMarket";
import TradeInfo from "@/components/sections/trade_mobile/TradeInfo";
import TradeData from "@/components/sections/trade_mobile/TradeData";
import { isMobile } from 'react-device-detect';
import dynamic from 'next/dynamic';
import RecentTrade from '../trade/RecentTrade';
import { apiRequest } from '@/hooks/tradeapiCall';
import { formatNumberComma, formatNumberKMB } from '@/util/common';
const TVChartContainer = dynamic(
  () => import('../../../app/trade/TVChartContainer/index'),
  { ssr: false, loading: () => <p>Loading Chart...</p> }
);
export default function TradeChart({ pairInfo, pairInfo1 }) {
  const isSmallScreen = window.innerWidth < 767;
  const [flatTabs, setFlatTabs] = useState(1)
  const [myTradeslist, setmyTradeslist] = useState([]);
  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isMobileDevice = /android|iphone|ipad|mobile/i.test(userAgent);


  }, []);

  useEffect(() => {

    tradeHistory();
  }, [])
  let tradeHistory = async () => {
    const myTrades = await apiRequest('/trade/myTrades', { pair: pairInfo.pair, perPage: 10, currentPage: 1 });
    setmyTradeslist(myTrades?.data??[]);
  }
  return (
    <>

      <div className='trd_mnchart1'>
        <div className='trade_tab1'>

          <ul className="menu-tabtrd d-flex">
            <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><Link href="#">Chart</Link></li>
            {pairInfo?.pair?.includes("UPRO") == false &&
              <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><Link href="#">OrderBook</Link></li>
            }
            <li className={flatTabs === 3 ? "active" : ""} onClick={() => handleFlatTabs(3)}><Link href="#">Trades</Link></li>
            {/* <li className={flatTabs === 4 ? "active" : ""} onClick={() => handleFlatTabs(4)}><Link href="#">Info</Link></li>
            <li className={flatTabs === 5 ? "active" : ""} onClick={() => handleFlatTabs(5)}><Link href="#">Trading Data</Link></li> */}
          </ul>

          <div className="content-tabrd">
            <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>


              <TVChartContainer pairInfo={pairInfo1} />
              {/* <img src='/assets/images/trade/trd_hd1.png' className='img-fluid' />
              <img src='/assets/images/trade/mob_trade.png' className='img-fluid' /> */}
            </div>
            {/* <div className="content-inner" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>
               <img src='/assets/images/trade/trd_hd1.png' className='img-fluid' />

              
              <TradeOrder pairInfo={pairInfo}/>  
            </div> */}
            {isSmallScreen ?

              <div
                className="content-inner"
                style={{
                  display: flatTabs === 2 ? "block" : "none",
                }}
              >
                <TradeOrder pairInfo={pairInfo} />
              </div> : ''
            }
            <div className="content-inner" style={{ display: `${flatTabs === 3 ? "block" : "none"}` }}>
              {/* <img src='/assets/images/trade/trd_hd1.png' className='img-fluid' /> */}
              {/* <TradeMarket pairInfo={pairInfo}/> */}
              {isSmallScreen ? (
                <>
                  {pairInfo.pair.includes("UPRO") === false &&
                    <RecentTrade pairInfo={pairInfo} />
                  }

                  {pairInfo.pair.includes("UPRO") === true &&
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
                  {pairInfo.pair.includes("UPRO") === true &&

                    myTradeslist.map((row, index) => (
                      <div className="virt_tinrw d-flex align-items-center w-100 position-relative" key={index}>
                        <div className="vir_fd1">
                          <p className={row.type === 'buy' ? 'text-success' : 'text-danger'}>{row.price.toFixed(pairInfo.priceDecimal)}</p>
                        </div>
                        <div className="vir_fd2">
                          <p>{row.amount.toFixed(pairInfo.amountDecimal)}</p>
                        </div>
                        <div className="vir_fd2">
                          <p>{(row.amount * row.price).toFixed(pairInfo.priceDecimal)}</p>
                        </div>
                      </div>
                    ))}
                </>
              ) : null}
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