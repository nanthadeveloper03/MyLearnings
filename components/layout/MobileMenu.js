'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import useLogout from "@/util/useLogout";
import { useSelector } from "react-redux";
import { usePathname } from 'next/navigation'

import MainMenu from "./Menu";
import MobileAuthMenu from "./mobileAuthMenu";

export default function MobileMenu({ isMobileMenu }) {

    const pathname = usePathname()
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [isActive, setIsActive] = useState(0)

    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }
    
    const [currentMenuItem, setCurrentMenuItem] = useState("")

    useEffect(() => {
        setCurrentMenuItem(pathname)
    }, [pathname])

    const logout = useLogout()

    const handleLogout = () => {
        logout();
    };

    let authMenus = ['/dashboard', '/referral/', '/profile/','/kyc-verification/', '/security/', '/order/', '/soon_order_history/', '/spotassets/', '/rewards/', '/referral/', '/rewardshub/', '/deposit/', '/withdraw/', '/history/']

    const checkCurrentMenuItem = (path) => currentMenuItem === path ? "current-item" : ""
    const checkParentActive = (paths) => paths.some(path => currentMenuItem.startsWith(path)) ? "current-menu-item" : ""

    const isAuthMenu = authMenus.some(path => currentMenuItem.startsWith(path));
    
    return (
        <>
            <nav id="main-nav-mobi" className="main-nav" style={{ display: `${isMobileMenu ? "block" : "none"}` }}>
                
                { isAuthenticated && isAuthMenu ?
                    <MobileAuthMenu isMobileMenu={isMobileMenu} /> :
                    <MainMenu isMobileMenu={isMobileMenu} />
                }
                

                {/* <ul id="menu-primary-menu" className="menu">

                    <li className={`menu-item ${pathname === "/exchange" ? "current-menu-item" : ""} mt-3`}>
                        <Link href="#"> Exchange </Link>
                    </li>

                    <li className={`menu-item ${pathname === "/exchange" ? "current-menu-item" : ""}`}>
                        <Link href="/academy"> Academy </Link>
                    </li>

                    <li className={`menu-item ${pathname === "/exchange" ? "current-menu-item" : ""}`}>
                        <Link href="#"> Features </Link>
                    </li>

                    <li className={`menu-item ${pathname === "/exchange" ? "current-menu-item" : ""}`}>
                        <Link href="#"> Swap </Link>
                    </li>

                    <li className={`menu-item ${pathname === "/exchange" ? "current-menu-item" : ""}`}>
                        <Link href="#"> Deposit </Link>
                    </li>

                    <li className={`menu-item ${pathname === "/expo" ? "current-menu-item" : ""}`}>
                        <Link href="/expo"> Expo </Link>
                    </li>

                    {isAuthenticated &&
                        <li className={`menu-item ${pathname === "/exchange" ? "current-menu-item" : ""} text-danger`} onClick={handleLogout}>
                            <Link href="#"> Logout </Link>
                        </li>
                    }

                </ul> */}

            </nav>

        </>
    )
}
