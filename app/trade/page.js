// app/trade/[id]/page.js
'use client'
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from "@/components/layout/Layout";
import TradeHeader from "@/components/sections/trade/TradeHeader";
import TradeHeader1 from "@/components/sections/trade_mobile/TradeHeader";

import TradeMobTab from "@/components/sections/trade_mobile/TradeMobTab";
import TradeMobHistory from "@/components/sections/trade_mobile/TradeMobHistory";
import TradeMobFooter from "@/components/sections/trade_mobile/TradeMobFooter";
import Ticker from './Ticker.js'

import TradeChart from "@/components/sections/trade/TradeChart";
import TradeMarket from "@/components/sections/trade/TradeMarket";
import TradeHistory from "@/components/sections/trade/TradeHistory";
import TradeSidePanel from "@/components/sections/trade/TradeSidePanel";
import TradeFooter from "@/components/sections/trade/TradeFooter";
import ChatSupport from "@/components/sections/support/ChatSupport";
import './trade.css';
import './trade_mobile.css';

import './support.css';
import Link from "next/link";
import { apiRequest } from '@/hooks/tradeapiCall';
import { useRouter, useSearchParams } from 'next/navigation';
import TVChartContainer from './TVChartContainer/index'
import MaintanencePage from "@/components/sections/maintanence/MaintanencePage";
import Loading from "../loading";

const TradePage = async () => {

  const [flatTabschart, setFlatTabschart] = useState(1)
  const [pairInfo, setPairInfo] = useState({})
  const searchParams = useSearchParams();
  const pair = searchParams.get('pair') || 'BTC-USDT';

  const handleFlatTabschart = (index) => {
    setFlatTabschart(index)
  }

  const id = pair;
  let chartpair = id.replace("-", "_");
  let chartpair1 = id.replace("-", "");
  let chartpair2 = id.split("-");

  useEffect(() => {
    const getPairDetails = async () => {
      if (pair) {
        try {
          const response = await apiRequest('/trade/pairInfo', { pair: id.replace("-", "_") });
          
          if (response?.status) {
            setPairInfo(response?.data)
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    getPairDetails();

  }, [pair]);


  if (Object.keys(pairInfo).length == 0) {
    return <Loading />
  }

  const pairInfo1 = { pair: chartpair, streamPair: chartpair1, toCurrency: chartpair2[1], fromCurrency: chartpair2[0] }

  return (
    <>

      {pairInfo?.maintenanceStatus == 1 ?

        <MaintanencePage maintanenceName='Trade' MaintananceCont={pairInfo?.maintenanceTxt} /> :

        <Layout headerStyle={1} footerStyle={4}>
          <div className="trd_mnsc1">

            <Ticker pair={id} pairInfo={pairInfo} />

            <div className="trad_mob">
              <TradeMobTab pair={id} pairInfo={pairInfo} pairInfo1={pairInfo1} />
            </div>

            <div className="trad_mob">
              <TradeMobHistory pair={id} pairInfo={pairInfo} openOrderslist={""} />
            </div>

            <div className="trad_mob">
              <TradeMobFooter pair={id} pairInfo={pairInfo} pairBalancefrom={""} />
            </div>

            <div className="trade_web">
              <div className="w-100 ma_5 trd_hdsc2">
                <div className="trd_lefpanel">
                  <div className="w-100 disp_inblock ma_5">
                    <div className="trd_grid1 pd_5">
                      <TradeMarket pair={id} pairInfo={pairInfo} />
                    </div>
                    <div className="trd_grid2">
                      <div className='trd_mnchart'>
                        <div className='trade_tab'>

                          {/* <ul className="menu-tabtrd d-flex">
                          <li className={flatTabschart === 1 ? "active" : ""} onClick={() => handleFlatTabschart(1)}><Link href="#">Chart</Link></li>
                        </ul> */}

                          <div className="content-tabrd">
                            <div className="content-inner" style={{ display: `${flatTabschart === 1 ? "block" : "none"}` }}>
                              <TVChartContainer pairInfo={pairInfo1} />
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="w-100 disp_inblock ma_5">
                    <div className="trd_grid3">
                      <TradeHistory pair={id} pairInfo={pairInfo} openOrderslist={""} />
                    </div>
                  </div>
                </div>
                <div className="trd_rigpanel">
                  <TradeSidePanel pair={id} pairInfo={pairInfo} pairBalance={""} />
                </div>
              </div>
            </div>

          </div>
        </Layout>
      }

    </>
  )
};

export default TradePage;