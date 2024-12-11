"use client";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import QrCodePopup from "@/components/sections/home/QrCodePopup";
import { useState } from "react";
import Marquee from "react-fast-marquee";


const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 60,
    },
  },
  slidesPerView: 4,
};



export default function Banner1({ isAuthenticated }) {

  const handleRedirect1 = () => {
    window.location.href = '/socialbonanza';
  };
  
  const handleRedirect2 = () => {
    window.location.href = '/global-community';
  };

  const [showPopup, setShowPopup] = useState(false)

  const qrCodeOpen = () => {
    setShowPopup(Math.random(0,10100000202))
  } 

  return (
    <>
    <QrCodePopup showPopup={showPopup} />
    <div className="hom_marq">
    <Marquee speed={80} direction="left" pauseOnHover={true}>
  <ul className="d-flex flex-nowrap gap-2 align-items-center">
    <li className="fst_marq d-flex flex-nowrap" onClick={handleRedirect1} style={{ cursor: 'pointer' }}>
      <ul className="d-flex flex-nowrap gap-2">
        <li>
          <img src="/assets/images/home/facebook.png" className="img-fluid" />
        </li>
        <li>
          <img src="/assets/images/home/instagram.png" className="img-fluid" />
        </li>
        <li>
          <img src="/assets/images/home/youtube.png" className="img-fluid" />
        </li>
      </ul>        
      <span className="marq_txh">Follow Our 6 Official Social Media Accounts, and Claim 2 USDT!</span>
      <ul className="d-flex flex-nowrap gap-2">
        <li>
          <img src="/assets/images/home/twit.png" className="img-fluid" />
        </li>
        <li>
          <img src="/assets/images/home/linkedin.png" className="img-fluid" />
        </li>
        <li>
          <img src="/assets/images/home/telegram.png" className="img-fluid" />
        </li>
      
      </ul>  
    </li>    
    <li className="fst_marq d-flex flex-nowrap" onClick={handleRedirect2} style={{ cursor: 'pointer' }}>
    <ul className="d-flex flex-nowrap gap-2">
        <li>
          <img src="/assets/images/home/telegram.png" className="img-fluid" />
        </li>
       </ul>
      <span className="marq_txh">Join Our Country Preferable Telegram Community and Stay Connected.</span>
    </li>    
    <li className="fst_marq d-flex flex-nowrap" onClick={handleRedirect1} style={{ cursor: 'pointer' }}>
      <ul className="d-flex flex-nowrap gap-2">
        <li>
          <img src="/assets/images/home/facebook.png" className="img-fluid" />
        </li>
        <li>
          <img src="/assets/images/home/instagram.png" className="img-fluid" />
        </li>
        <li>
          <img src="/assets/images/home/youtube.png" className="img-fluid" />
        </li>
      </ul>        
      <span className="marq_txh">Follow Our 6 Official Social Media Accounts, and Claim 2 USDT!</span>
      <ul className="d-flex flex-nowrap gap-2">
        <li>
          <img src="/assets/images/home/twit.png" className="img-fluid" />
        </li>
        <li>
          <img src="/assets/images/home/linkedin.png" className="img-fluid" />
        </li>
        <li>
          <img src="/assets/images/home/telegram.png" className="img-fluid" />
        </li>
       
      </ul>  
    </li>    
    <li className="fst_marq d-flex flex-nowrap" onClick={handleRedirect2} style={{ cursor: 'pointer' }}>
    <ul className="d-flex flex-nowrap gap-2">
        <li>
          <img src="/assets/images/home/telegram.png" className="img-fluid" />
        </li>
       </ul>
      <span className="marq_txh">Join Our Country Preferable Telegram Community and Stay Connected.</span>
    </li>    
  </ul>
  </Marquee>
</div>


      <section className="banner">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-xl-6 col-md-7">
              <div className="banner__content mt-4">
                <h1 className="title">Next gen <span>Crypto</span> Destination</h1>
                <ul>
                  <li>Secure</li>
                  <li className="vl_line"></li>
                  <li>Trade</li>
                  <li className="vl_line"></li>
                  <li>Earn</li>
                </ul>
                {isAuthenticated ? 
                  <p>
                  <img src="/assets/images/banner-img-icon.png" alt="" />
                  Start your trading journey with added value and explore our
                  platform’s features today!
                </p>
                :
                <p>
                <img src="/assets/images/banner-img-icon.png" alt="" />
           
                Register now and receive 25 USDT as a welcome bonus. Start
                your trading journey with added value and explore our
                platform’s features today!
              </p>
              
              }
              

                {isAuthenticated ?

                  <Link href="/dashboard" className="btn-action">
                    <span>Dashboard </span>
                  </Link> :

                  <Link href="/register" className="btn-action">
                    <span>Create Account </span>
                  </Link>
                }


                <div className="partner">
                  <p>Download App</p>

                  <ul>
                    <li className="cursor-pointer" onClick={qrCodeOpen}>
                      <button>Scan QR</button>
                    </li>

                    <Link href={process.env.NEXT_PUBLIC_APK_URL} target="_blank">
                      <li>
                        <span>
                          <img src="/assets/images/play-store.svg" alt="" />
                        </span>
                      </li>
                    </Link>

                    {/* <li>
                      <span>
                        <img src="/assets/images/istore.svg" alt="app-store-image" />
                      </span>
                    </li> */}
                  </ul>

                  {/* <div className="partner__list">
                    <div className="swiper swiper-partner">
                      <Swiper {...swiperOptions} className="swiper-wrapper">
                        <SwiperSlide>
                          <Link href="#">
                            <img
                              src="/assets/images/partner/logo-01.png"
                              alt=""
                            />
                          </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                          <Link href="#">
                            <img
                              src="/assets/images/partner/logo-02.png"
                              alt=""
                            />
                          </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                          <Link href="#">
                            <img
                              src="/assets/images/partner/logo-03.png"
                              alt=""
                            />
                          </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                          <Link href="#">
                            <img
                              src="/assets/images/partner/logo-04.png"
                              alt=""
                            />
                          </Link>
                        </SwiperSlide>
                        <SwiperSlide>
                          <Link href="#">
                            <img
                              src="/assets/images/partner/logo-01.png"
                              alt=""
                            />
                          </Link>
                        </SwiperSlide>
                      </Swiper>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-5">
              <div className="banner__image">
                {/* <img src="/assets/images/banner-mobile-img.png" alt="" /> */}
                <img src="/assets/images/Comp_1.gif" alt="Ultrapro Exchange" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
