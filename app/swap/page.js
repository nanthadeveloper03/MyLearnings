'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import SwapBanner from "@/components/sections/swap/SwapBanner"
// import SwapChartForm from "@/components/sections/swap/SwapChartForm"
import SwapFaq from "@/components/sections/swap/SwapFaq"
import "./withdraw.css";
import "./swap.css";
import "./home.css";

export default function Swap() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div>
         <SwapBanner />
          <section className="container mt-4 pt-4 pb-3">
            <div className="row justify-content-center">
              <div className="col-md-10 rsp_w100">                
               {/* <SwapChartForm /> */}
               <SwapFaq />                
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}