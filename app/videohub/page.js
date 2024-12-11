'use client'
import { useEffect, useState } from 'react';
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import VideosList from '@/components/sections/videohub/videoslist';
import ShortsList from '@/components/sections/videohub/shortslist';
import "./academy1.css";

export default function Academy() {
    
    const [flatTabs, setFlatTabs] = useState(1)
    const handleFlatTabs = (index) => {
        setFlatTabs(index)
    };   

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    <section className="ban_inn">
                        <div className="ban_icn text-center">
                            <div className='row justify-content-center'>
                            <div class="col-lg-5 col-md-12">
                                <h1 class="finter fw600 text-white mb-4">Enhance your crypto journey with valuable insights</h1>
                                {/* <a href="#" class="btn btn-action fopsans text-white mt-3">Learn More!</a> */}
                            </div>
                         </div>
                        </div>
                    </section>
                    <section className="blg_sc1">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="block-text2 text-center">
                                    <h2 className="fw600 black1 text-uppercase"><span>Our Video Sessions</span></h2>
                                </div>

                                <div className="row justify-content-center">
                                    <div className={`col-md-10 col-sm-12 rsp_w100`}>
                                        <ul className="menu-taba d-flex">
                                            <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><Link href="#">Videos</Link></li>
                                            {/* <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><Link href="#">Shorts</Link></li> */}
                                        </ul>
                                        <div className="content-taba">
                                            <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>
                                              <VideosList />
                                            </div>

                                            <div className="content-inner" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>
                                              <ShortsList />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    )
}