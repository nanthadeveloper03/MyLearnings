
'use client'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import Link from "next/link";
import TawkToChat from '@/util/TawkToChat'
import AddClassBody from "../elements/AddClassBody"
// import BackToTop from '../elements/BackToTop'
// import Breadcrumb from './Breadcrumb'
import Footer1 from './footer/Footer1'
import Footer2 from './footer/Footer2'
import Header1 from "./header/Header1"
import Header2 from './header/Header2'
import Header3 from './header/Header3'
import AOS from 'aos';
import Head from "next/head"

export default function Layout({ headerStyle, footerStyle, breadcrumbTitle, children ,pageProps}) {
    const { isTheme } = useSelector((state) => state.auth);
    const [scroll, setScroll] = useState(0)
    // Moblile Menu
    const [isMobileMenu, setMobileMenu] = useState(false)
    const handleMobileMenu = () => setMobileMenu(!isMobileMenu)

    useEffect(() => {
        AOS.init();
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY > 100
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck)
            }
        })
    }, [])

    useEffect(() => {
        const currentThemeClass = isTheme || 'is_light';
        document.body.classList.remove('is_light', 'is_dark');
        document.body.classList.add(currentThemeClass);
    }, [isTheme])

    return (
        <>
            <div id="top" />

            {/* <div className="top_notify">
                <p className="d-flex flex-wrap align-items-center">
                    <img src="/assets/images/rewards/exclam.png" className="img-fluid" />
                    <span className="xs_hide">Please complete Identity Verification to enable deposits, crypto purchases, and trading permissions.</span>
                    <Link href="#" className="comp_link">
                        Complete Verification
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                    </Link>
                </p>
            </div> */}

            {/* <TawkToChat /> */}
            <AddClassBody />
            {!headerStyle && <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />}
            {headerStyle == 1 ? <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} {...pageProps}/> : null}
            {headerStyle == 2 ? <Header2 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
            {headerStyle == 3 ? <Header3 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}


            {/* {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />} */}

            {children}

            {!footerStyle && < Footer1 />}
            {footerStyle == 1 ? < Footer1 /> : null}
            {footerStyle == 2 ? < Footer2 /> : null}

            {/* <BackToTop target="#top" /> */}
        </>
    )
}
