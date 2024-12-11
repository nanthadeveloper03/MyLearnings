'use client'
import { useEffect, useState } from 'react';
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import './convert.css';
import Header from "@/components/sections/convert/Header";
import ChatSupport from "@/components/sections/support/ChatSupport";
import '../support/support.css';


// for chart
import TVChartContainer from './TVChartContainer/index';
import { apiRequest } from '@/hooks/tradeapiCall';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from "../loading";
// for chart

import Market from "@/components/sections/convert/Market";
import RecentTrade from "@/components/sections/convert/RecentTrade";
import History from "@/components/sections/convert/History";
import SidePanel from "@/components/sections/convert/SidePanel";
import Footer from "@/components/sections/convert/Footer";

const Convert = async () => {

// Mobile Tab
const [flatMobTabs, setFlatMobTabs] = useState(1);
const handleFlatMobTabs = (index) => {        
    setFlatMobTabs(index);
}
// Mobile Tab

// for chart
const [pairInfo, setPairInfo] = useState({})
const searchParams = useSearchParams();
const pair = searchParams.get('pair') || 'BTC-USDT';
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
// for chart

return (
    <>
    <Layout headerStyle={1} footerStyle={4}>
        <div className="trd_mnsc1">

            <Header />

            <div className="trad_mob">            

            <div className='trd_mnchart1'>
                <div className='trade_tab1'>
                    <ul className="menu-tabtrd d-flex">
                        <li className={flatMobTabs === 1 ? "active" : ""} onClick={() => handleFlatMobTabs(1)}>
                            <Link href="#">Chart</Link>
                        </li>                                             
                        <li className={flatMobTabs === 3 ? "active" : ""} onClick={() => handleFlatMobTabs(3)}>
                            <Link href="#">Trades</Link>
                        </li>
                    </ul>
                    <div className="content-tabrd">
                        <div className="content-inner" style={{ display: flatMobTabs === 1 ? "block" : "none" }}>
                            <div className='market_tsc1'>
                            <TVChartContainer  pairInfo={pairInfo1} />
                            </div>
                        </div>                        
                        <div className="content-inner" style={{ display: flatMobTabs === 3 ? "block" : "none" }}>
                            <div className='market_tsc1'>
                            <RecentTrade /> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <History />

            </div>

            <div className="trade_web">
                <div className="w-100 ma_5 trd_hdsc2">
                    <div className="trd_lefpanel">
                        <div className="w-100 disp_inblock ma_5">
                            <div className="trd_grid1 pd_5">
                                <Market />
                            </div>
                            <div className="trd_grid2">
                                <div className='trd_mnchart'>
                                    <TVChartContainer pairInfo={pairInfo1} />
                                </div>
                            </div>
                        </div>
                        <div className="w-100 disp_inblock ma_5">
                            <div className="trd_grid3">
                                <History />
                            </div>
                        </div>
                    </div>
                    <div className="trd_rigpanel">
                        <SidePanel />
                    </div>
                </div>
            </div>

            <Footer />

        </div>

        <ChatSupport />
        
    </Layout>
    </>
)
};
export default Convert;