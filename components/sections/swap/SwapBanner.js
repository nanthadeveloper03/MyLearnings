import React from 'react';
import Link from "next/link";

const SwapBanner = () => {
  return (
    <>
       <section className="banner">
            <div className="container">
              <div className="row justify-content-center align-items-center">
                <div className="col-xl-6 col-md-7 col-sm-6">
                  <div className="banner__content mt-4">
                    <h2 className="title">
                      Swap
                    </h2>
                    <ul>
                      <li>Trading</li>
                      <li className="vl_line"></li>
                      <li>Earning</li>
                      <li className="vl_line"></li>
                      <li>Learning</li>
                    </ul>
                    <p className='ban_val'>
                      <img src="/assets/images/banner-img-icon.png" alt="" />
                      Register now and receive <span className='pri_color'>25 USDT</span> as a welcome bonus. Start your trading journey with added value and explore our platform’s features today!
                    </p>
                    <div className="partner">
                      <p>Download App</p>

                      <ul>
                        <li>
                          <button>Scan QR</button>
                        </li>
                        <li>
                          <span>
                            <img src="/assets/images/play-store.svg" alt="" />
                          </span>
                        </li>
                        <li>
                          <span>
                            <img src="/assets/images/istore.svg" alt="" />
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-md-5 col-sm-6">
                  <div className="banner__image">
                    <img src="/assets/images/swap/swapbann.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </section>
    </>
  );
};

export default SwapBanner;
