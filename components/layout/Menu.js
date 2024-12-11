'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import useLogout from "@/util/useLogout";
import { useHover } from '@/util/hoverContext';

export default function MainMenu({ isMobileMenu }) {
    const { setIsHovered } = useHover();
    const router = useRouter()
    const logout = useLogout()
    const { isAuthenticated } = useSelector((state) => state.auth);
    const pathname = usePathname()
    const [currentMenuItem, setCurrentMenuItem] = useState("")


    
    // const handleProbin = (e) => {
    //     e.preventDefault();
    //     window.open('https://www.probinar.in/', '_blank', 'noopener noreferrer');
    // };

    const handleCom = (e) => {
        e.preventDefault();
        window.open('https://linktr.ee/Ultrapro_Exchange/', '_blank', 'noopener noreferrer');
    };

    useEffect(() => {
        setCurrentMenuItem(pathname)
    }, [pathname])

    const handleLogout = () => {
        logout();
    };

    const checkCurrentMenuItem = (path) => currentMenuItem === path ? "current-item" : ""
    const checkParentActive = (paths) => paths.some(path => currentMenuItem.startsWith(path)) ? "current-menu-item" : ""

    const redirectPage = (path) => {
        router.push(path)
    }

    const openPdf = () => {
        const pdfUrl = 'https://whitepapper.s3.amazonaws.com/whitepaper.pdf';
        window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    };
const handleConsole=()=>{
    console.log("EEEEEEEEEEEEEEEEE");
    
}
    return (
        <>

            {/* {isMobileMenu && !isAuthenticated &&
                <div className='header mt-3'>
                    <div className='header__right'>
                        <div className="wallet custom-wallet fill m-0">
                            <a href="/register"> Sign Up </a>
                        </div>

                        <div className="wallet custom-wallet  m-0">
                            <a href="/login"> Sign In </a>
                        </div>

                    </div>
                </div>
            }        */}

            <ul id="menu-primary-menu" className={`menu ${(isMobileMenu && isAuthenticated) ? 'mt-3' : ''}`}>

                <Link href="/">
                    <li className={`menu-item ${pathname === "/" ? "current-menu-item" : ""} cursor-pointer`}>
                        Home
                    </li>
                </Link>

                <Link href="/trade/?pair=BTC-USDT">
                    <li className={`menu-item ${pathname === "/trade?pair=BTC-USDT" ? "current-menu-item" : ""} cursor-pointer`}>
                        Trade
                    </li>
                </Link>

                <Link href="/academy">
                    <li className={`menu-item ${pathname === "/academy/" ? "current-menu-item" : ""} cursor-pointer`}>
                        Academy
                    </li>
                </Link>

                <Link href="/crypto-expo">
                    <li className={`menu-item ${pathname === "/crypto-expo/" ? "current-menu-item" : ""} cursor-pointer`}>
                        Expo
                    </li>
                </Link>

                <Link href="/referral-program">
                    <li className={`menu-item ${pathname === "/referral-program/" ? "current-menu-item" : ""} cursor-pointer`}>
                        Referral Program
                    </li>
                </Link>

                <Link href="/claim-25-usdt">
                    <li className={`menu-item ${pathname === "/claim-25-usdt/" ? "current-menu-item" : ""} cursor-pointer`}>
                        Claim USDT
                    </li>
                </Link>

                <Link href="/staking">
                    <li className={`menu-item ${pathname === "/staking/" ? "current-menu-item" : ""} cursor-pointer`}>
                        Staking
                    </li>
                </Link>

                
                

                <Link href="#" onClick={openPdf}>
                    <li className={`menu-item ${pathname === "/whitepaper/" ? "current-menu-item" : ""} cursor-pointer`}>
                        White Paper
                    </li>
                </Link>
{/* 
                <Link href="/vote-upro-coin">
                    <li className={`menu-item ${pathname === "/vote-upro-coin/" ? "current-menu-item" : ""} cursor-pointer`}>
                        Voting
                    </li>
                </Link> */}

                <Link href="/compare-other-exchanges" className="lg_none">
                    <li className={`menu-item ${pathname === "/compare-other-exchanges/" ? "current-menu-item" : ""} cursor-pointer`}>
                        Compare Other Exchanges
                    </li>
                </Link>


                <Link href="/best-trusted-crypto-exchanges" className="lg_none">
                    <li className={`menu-item ${pathname === "/best-trusted-crypto-exchanges/" ? "current-menu-item" : ""} cursor-pointer`}>
                        Right Exchange Identification
                    </li>
                </Link>

                <Link href="/our-team" className="lg_none">
                    <li className={`menu-item ${pathname === "/our-team/" ? "current-menu-item" : ""} cursor-pointer`}>
                        Our Team
                    </li>
                </Link>

                <Link href="/about-us" className="lg_none">
                    <li className={`menu-item ${pathname === "/about-us/" ? "current-menu-item" : ""} cursor-pointer`}>
                        About Us
                    </li>
                </Link>

                <Link href="/contactus" className="lg_none">
                    <li className={`menu-item ${pathname === "/contactus/" ? "current-menu-item" : ""} cursor-pointer`}>
                        Contact Us
                    </li>
                </Link>



                {/* <Link href="/voting" className="lg_none">
                    <li className={`menu-item ${pathname === "/voting/" ? "current-menu-item" : ""} cursor-pointer`}>
                    Voting
                    </li>
                </Link> */}

                <Link href="/probinacademy" className="lg_none" passHref>
                    <li className={`menu-item ${pathname === "/probinacademy" ? "current-menu-item" : ""} cursor-pointer`}>
                        Probinar Academy
                    </li>
                </Link>

                <Link href="/global-community" className="lg_none">
                    <li className={`menu-item ${pathname === "/global-community" ? "" : ""} cursor-pointer`}>
                        Community
                    </li>
                </Link>

                <Link href="#" className="more_item xl_none"  >
                    <li className={`menu-item ${pathname === "/contactus/" ? "current-menu-item" : ""} cursor-pointer`}
                    onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                    
                    >
                        More
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
                        </svg>
                    </li>
                    <ul className="dropdown-menu tpdrop">
                        <li className="partn">
                            <h3 className="finter fw600">Features</h3>
                            <Link href="/compare-other-exchanges">
                                <li className={`menu-item ${pathname === "/compare-other-exchanges/" ? "current-menu-item" : ""} cursor-pointer`}>
                                    <div className="link_mn">
                                        <div className="link_ico">
                                            <img src="/assets/images/menu_ico/compare.png" />
                                        </div>
                                        <div className="link_cn">
                                            <h4>Compare Other Crypto Exchanges</h4>
                                            <p>Explore the top coin price in Top Exchanges</p>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                            <Link href="/best-trusted-crypto-exchanges">
                                <li className={`menu-item ${pathname === "/best-trusted-crypto-exchanges/" ? "current-menu-item" : ""} cursor-pointer`}>
                                    <div className="link_mn">
                                        <div className="link_ico">
                                            <img src="/assets/images/menu_ico/exchange.png" />
                                        </div>
                                        <div className="link_cn">
                                            <h4>Right Exchange Identification</h4>
                                            <p>Choose the Best Exchange for You</p>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                            <Link href="/vote-upro-coin">
                                <li className={`menu-item ${pathname === "/vote-upro-coin/" ? "current-menu-item" : ""} cursor-pointer`}>
                                    <div className="link_mn">
                                        <div className="link_ico">
                                            <img src="/assets/images/menu_ico/voting.png" />
                                        </div>
                                        <div className="link_cn">
                                            <h4>Voting for UPRO</h4>
                                            <p>Cast Your Vote and Support UPRO</p>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                            <Link href="/probinacademy" passHref>
                                <li  className={`menu-item ${pathname === "/probinacademy" ? "current-menu-item" : ""} cursor-pointer`}>
                                    <div className="link_mn">
                                        <div className="link_ico">
                                            <img src="/assets/images/menu_ico/academy.png" />
                                        </div>
                                        <div className="link_cn">
                                            <h4>Probinar Academy</h4>
                                            <p>Master Blockchain with Probinar Academy</p>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                            <Link href="/videohub">
                                <li  className={`menu-item ${pathname === "/videohub" ? "current-menu-item" : ""} cursor-pointer`}>
                                    <div className="link_mn">
                                        <div className="link_ico">
                                            <img src="/assets/images/header/Videos.png" />
                                        </div>
                                        <div className="link_cn">
                                            <h4>VideoHub</h4>
                                            <p>VideoHub with Ultrapro</p>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        </li>
                        <li className="partn">
                            <h3 className="finter fw600">Overview</h3>
                            <Link href="/about-us">
                                <li className={`menu-item ${pathname === "/about-us/" ? "current-menu-item" : ""} cursor-pointer`}>
                                    <div className="link_mn">
                                        <div className="link_ico">
                                            <img src="/assets/images/menu_ico/aboutus.png" />
                                        </div>
                                        <div className="link_cn">
                                            <h4>About Us</h4>
                                            <p>Learn More About Ultrapro Exchange</p>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                            <Link href="/our-team" >
                                <li className={`menu-item ${pathname === "/our-team/" ? "current-menu-item" : ""} cursor-pointer`}>
                                    <div className="link_mn">
                                        <div className="link_ico">
                                            <img src="/assets/images/menu_ico/teams.png" />
                                        </div>
                                        <div className="link_cn">
                                            <h4>Our Team</h4>
                                            <p>Meet the Experts Behind Ultrapro</p>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                            <Link href="/contactus">
                                <li className={`menu-item ${pathname === "/contactus/" ? "current-menu-item" : ""} cursor-pointer`}>
                                    <div className="link_mn">
                                        <div className="link_ico">
                                            <img src="/assets/images/menu_ico/contactus.png" />
                                        </div>
                                        <div className="link_cn">
                                            <h4>Contact Us</h4>
                                            <p>Get in Touch with Ultrapro Support</p>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                            <Link href="/global-community">
                                <li className={`menu-item ${pathname === "/global-community/" ? "current-menu-item" : ""} cursor-pointer`}>
                                    <div className="link_mn">
                                        <div className="link_ico">
                                            <img src="/assets/images/menu_ico/communtiy.png" />
                                        </div>
                                        <div className="link_cn">
                                            <h4>Community</h4>
                                            <p>Join and Engage with Crypto Enthusiasts</p>
                                        </div>
                                    </div>
                                </li>
                            </Link>

                        </li>
                    </ul>
                </Link>

                {isMobileMenu && isAuthenticated &&
                    <li className={`menu-item ${pathname === "/exchange" ? "current-menu-item" : ""} text-danger`} onClick={handleLogout}>
                        <div className='header sign_hd mt-3 lg_none_menu'>
                        <div className='header__right d-flex justify-content-center'>
                        <div className="wallet custom-wallet fill w-100 m-0">
                            <a href="#">Logout</a>
                        </div>
                        </div>
                        </div>                
                          
                    </li>
                }

            </ul>

            {isMobileMenu && !isAuthenticated &&
                <div className='header sign_hd mt-3'>
                    <div className='header__right d-flex justify-content-between'>
                        <div className="wallet custom-wallet fill m-0">
                            <a href="/register"> Sign Up </a>
                        </div>

                        <div className="wallet custom-wallet fill m-0">
                            <a href="/login"> Sign In </a>
                        </div>

                    </div>
                </div>
            }


        </>
    )
}