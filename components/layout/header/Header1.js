import { Menu } from "@headlessui/react";
import { useSelector, useDispatch } from 'react-redux';
import dynamic from "next/dynamic";
import Link from "next/link";
import MainMenu from "../Menu";
import MobileMenu from "../MobileMenu";
import useLogout from "@/util/useLogout";
import { checkMaintenance, socialLinks } from '@/store/blockSlice';
import { useEffect, useRef, useState } from "react";
import { apiRequest } from "@/hooks/apiCall";
import Loading from "@/app/loading";
import Image from "next/image";
import Offcanvas from "@/components/sections/offCanvas/Offcanvas";
import TransactionsCard from "@/components/layout/header/transactionsCard";
import { useHover } from "@/util/hoverContext";

const ThemeSwitch = dynamic(() => import("@/components/elements/ThemeSwitch"), {
  ssr: false,
});
export default function Header1({ scroll, isMobileMenu, handleMobileMenu }) {
  const { setIsHovered } = useHover();
  const { isHovered } = useHover();


  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true);
  const logout = useLogout()
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dropdownRef = useRef(null);  // Define the ref

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // Check if click is outside of the dropdown menu
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsHovered(false);
      }
    }

    if (isHovered) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isHovered, setIsHovered]);





  const handleLogout = () => {
    logout();
  };
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);





  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };



  useEffect(() => {
    const checkMaintenanceMode = async () => {
      try {
        const response = await apiRequest('/account/siteInfo', {});
        if (response?.data) {
          if (response?.data?.ipBlocked) {
            setIsLoading(true);
            window.location.href = "/block"
          } else {
            let maintenanceMode = (response?.data?.isMaintenance) ? true : false;
            let object = { maintenanceMode: maintenanceMode, maintenanceTxt: response?.data?.maintenanceTxt }
            dispatch(checkMaintenance(object))
            let socialLinksObject = {
              mediumLink: response?.data?.mediumLink,
              linkedLink: response?.data?.linkedLink,
              telegramLink: response?.data?.telegramLink,
              fbLink: response?.data?.fbLink,
              instaLink: response?.data?.instaLink,
              youtubeLink: response?.data?.youtubeLink,
              twitLink: response?.data?.twitLink,
            }
            dispatch(socialLinks(socialLinksObject))
            if (response?.data?.isMaintenance) {
              setIsLoading(true);
              window.location.href = "/maintenance"
            } else {
              setIsLoading(false);
            }
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to check maintenance mode:', error);
      }
    };
    checkMaintenanceMode();
  }, []);

  if (isLoading) {
    //return <Loading />
  }

  return (
    <>
      <header id="header_main" className={`header ${scroll ? "is-fixed is-small" : ""}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="header__body d-flex justify-content-between">
                <div className="header__left">
                  <div className="logo">
                    <Link className="light" href="/">
                      <img
                        src="/assets/images/logo/logo.png"
                        alt=""
                        width={118}
                        height={42}
                        data-retina="assets/images/logo/logo@2x.png"
                        data-width={118}
                        data-height={42}
                      />
                    </Link>
                    <Link className="dark" href="/">
                      <img
                        src="/assets/images/logo/logo-dark.png"
                        alt=""
                        width={118}
                        height={42}
                        data-retina="assets/images/logo/logo-dark@2x.png"
                        data-width={118}
                        data-height={42}
                      />
                    </Link>
                  </div>
                  <div className="left__main">
                    <div className="d-none d-lg-block">
                      <nav id="main-nav" className="main-nav">

                        <MainMenu isMobileMenu={isMobileMenu} />

                      </nav>
                      {/* #main-nav */}
                    </div>
                  </div>
                </div>
                <div className="header__right">

                  {/* {isAuthenticated &&
                    <div className="wallet custom-wallet m-0 mt-1">
                      <Link href="/dashboard"> Dashboard </Link>
                    </div>
                  } */}

                  {isAuthenticated &&
                    <div className="wallet custom-wallet aft_logmenu m-0 mt-1">
                      <Link href="/deposit"> Deposit </Link>
                    </div>
                  }

                  <div>
                    <Link href={process.env.NEXT_PUBLIC_APK_URL} target="_blank">
                      <Image src={'/assets/images/download-menu.svg'} height={20} width={20} alt="download-img" />
                    </Link>
                  </div>

                  <div>
                    {/* <button onClick={toggleOffcanvas} className="notif_tpico btn">
                  <Image src={'/assets/images/header/notification.png'} height={20} width={20} alt="notification" />
                  </button> */}
                  </div>

                  {!isAuthenticated &&
                    <>
                      <div className="wallet custom-wallet fill m-0 d-none d-sm-block">
                        <Link href="/register"> Sign Up </Link>
                      </div>

                      <div className="wallet custom-wallet m-0 d-none d-sm-block">
                        <Link href="/login"> Sign in </Link>
                      </div>
                    </>
                  }


                  <ThemeSwitch />

                  <div className="d-block d-lg-none">
                    <div className={`m-0 mobile-button d-block ${isMobileMenu ? "active" : ""}`} onClick={handleMobileMenu}>
                      <span />
                    </div>
                  </div>

                  {isAuthenticated &&

                    <Menu as="div" className="dropdown user" ref={dropdownRef}>
                      <Menu.Button
                        className="btn dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton4"
                        onClick={() => setIsHovered(true)}
                      >
                        <img
                          src={user?.profileImg || "/assets/images/avt/user.png"}
                          alt="User Avatar"
                        />
                      </Menu.Button>

                      {isHovered && (
                        <Menu.Items
                          as="div"
                          className="dropdown-menu show tpuserdrp"
                          aria-labelledby="dropdownMenuButton4"
                        >
                          <div className="drp_user1">
                            <img
                              src={user?.profileImg || "/assets/images/avt/user.png"}
                              className="tpuser"
                            />
                            <div className="drp_uscnt">
                              <h6>{user?.name}</h6>
                              <p>{user?.country}</p>
                            </div>
                          </div>

                          <div className="dropdown-divider" />

                          <Link className="dropdown-item" href="/dashboard">
                            <img src="/assets/images/dash_ico/Category.png" className="dico" />
                            <span> Dashboard </span>
                          </Link>

                          <Link className="dropdown-item" href="/rewardshub">
                            <span>
                              <img src="/assets/images/dash_ico/Ticket Star.png" className="dico" />
                              Rewards Hub
                            </span>
                          </Link>

                          <Link className="dropdown-item" href="/referral">
                            <span>
                              <img src="/assets/images/dash_ico/Add User.png" className="dico" />
                              Referral
                            </span>
                          </Link>

                          <Link className="dropdown-item" href="/spotassets">
                            <span>
                              <img src="/assets/images/dash_ico/Wallet2.png" className="dico" />
                              Assets
                            </span>
                          </Link>

                          <div className="dropdown-divider" />

                          <span className="dropdown-item cursor-pointer" onClick={handleLogout}>
                            <span>
                              <img src="/assets/images/dash_ico/Logout.png" className="dico" />
                              Sign Out
                            </span>
                          </span>
                        </Menu.Items>
                      )}
                    </Menu>
                  }



                </div>
              </div>
            </div>
          </div>
        </div>
        <MobileMenu isMobileMenu={isMobileMenu} />
      </header>

      {/* Offcanvas Component */}
      <Offcanvas isOpen={isOffcanvasOpen} onClose={toggleOffcanvas} placement="right">
        <div className="notif_hd1">
          Notifications
          <button type="button" className="btn clos_not" onClick={toggleOffcanvas}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </button>
        </div>
        <TransactionsCard />
      </Offcanvas>

    </>
  );
}
