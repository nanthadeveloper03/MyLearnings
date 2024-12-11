'use client'
import { useEffect, useState } from 'react';
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import AcademyList from '@/components/sections/academy/academyList';
import FavouriteList from '@/components/sections/academy/favouriteList';
import "../../styles/academy.css";

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
                            <h1 className="finter text-white">Learn Blockchain & Crypto For Free With Ultrapro Academy!</h1>
                            {/* <Link href="#" className="btn btn-action fopsans text-white">Learn More!</Link> */}
                        </div>
                    </section>
                    <section className="blg_sc1">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="block-text2 text-center">
                                    <h2 className="fw600 black1 text-uppercase"><span>Our Academy Sessions</span></h2>
                                </div>

                                <div className="row justify-content-center">
                                    <div className={`col-md-10 col-sm-12 rsp_w100`}>
                                        <ul className="menu-taba d-flex">
                                            <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><Link href="#">Modules</Link></li>
                                            <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><Link href="#">Favourites</Link></li>
                                        </ul>
                                        <div className="content-taba">
                                            <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>
                                                { flatTabs === 1 && <AcademyList /> }
                                            </div>

                                            <div className="content-inner" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>
                                            { flatTabs === 2 && <FavouriteList /> }
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