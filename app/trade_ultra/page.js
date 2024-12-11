'use client'
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import './trade.css';
 
import TradeHeader from "@/components/sections/trade_ultra/TradeHeader";
import TradeChart from "@/components/sections/trade_ultra/TradeChart";
import TradeMarket from "@/components/sections/trade_ultra/TradeMarket";
import TradeHistory from "@/components/sections/trade_ultra/TradeHistory";
import TradeSidePanel from "@/components/sections/trade_ultra/TradeSidePanel";
import TradeFooter from "@/components/sections/trade_ultra/TradeFooter";
import ChatSupport from "@/components/sections/support/ChatSupport";
import './support.css';


export default function Trade() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={4}>
                <div className="trd_mnsc1">
                    <TradeHeader />
                    <div className="w-100 ma_5 trd_hdsc2">
                        <div className="trd_lefpanel">
                            <div className="w-100 disp_inblock ma_5">
                                <div className="trd_grid1 pd_5">
                                    <TradeMarket />
                                </div>
                                <div className="trd_grid2">
                                    <TradeChart />
                                </div>
                            </div>
                            <div className="w-100 disp_inblock ma_5">
                                <div className="trd_grid3">
                                    <TradeHistory />
                                </div>
                            </div>
                        </div>
                        <div className="trd_rigpanel">
                          <TradeSidePanel />
                        </div>
                    </div>
                </div>
                <ChatSupport />   
                <TradeFooter />
            </Layout>
        </>
    )
}