import React from 'react';
import { useState, useEffect } from 'react';
import Link from "next/link";
import Marquee from "react-fast-marquee";
import BuySell from "@/components/sections/convert/BuySell";

const Footer = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [flatTabs, setFlatTabs] = useState(1);

  const toggleOffcanvas = () => {
    setIsOpen(!isOpen);
  };

  // for partitioning web and mobile view
  const [viewType, setViewType] = useState('web'); // Default is web view

  // Function to update the viewType based on screen width
  const updateViewType = () => {
    if (window.innerWidth <= 767) {
      setViewType('mobile');

    } else {
      setViewType('web');
      setFlatTabs(1)
    }
  };

  useEffect(() => {
    updateViewType(); // Set initial view type based on the screen size

    // Add event listener to update viewType on window resize
    window.addEventListener('resize', updateViewType);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateViewType);
    };
  }, []);

  return (
    <>
      {/* Render Web view */}
      {viewType === 'web' && (
        <>
          {/* <div className='trd_footmarqsc1 w-100'>
            <div className='row'>
              <div className='col-md-10'>
                <ul className='d-flex gap-4 conn_lis1'>
                  <li>
                    <span className='pri_color'>
                      <img src='/assets/images/trade/conn.png' className='img-fluid' />
                      Stable connection
                    </span>
                  </li>
                  <li className='drop_mntrd'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                      <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                    </svg>
                    <ul className='drop_subtrd'>
                      <li>
                        <Link href="#">No Preview</Link>
                      </li>
                      <li>
                        <Link href="#">Popular Searches</Link>
                      </li>
                      <li>
                        <Link href="#">Favorites</Link>
                      </li>
                    </ul>
                  </li>
                  <div className='marquee-container'>
                    <Marquee speed={80} direction="right" pauseOnHover={true}>
                      <ul className='d-flex gap-4'>
                        <li>BTC/USDT <span className='pri_color'>+3.78%</span></li>
                        <li>ETH/USDT <span className='pri_color'>+3.26%</span></li>
                        <li>SHIB/USDT <span className='pri_color'>+7.38%</span></li>
                        <li>DOGE/USDT <span className='pri_color'>+7.35%</span></li>
                        <li>WIN/USDT <span className='pri_color'>+3.88%</span></li>
                        <li>BTC/USDT <span className='pri_color'>+3.78%</span></li>
                        <li>ETH/USDT <span className='pri_color'>+3.26%</span></li>
                        <li>SHIB/USDT <span className='pri_color'>+7.38%</span></li>
                        <li>DOGE/USDT <span className='pri_color'>+7.35%</span></li>
                        <li>WIN/USDT <span className='pri_color'>+3.88%</span></li>
                        <li>BTC/USDT <span className='pri_color'>+3.78%</span></li>
                        <li>ETH/USDT <span className='pri_color'>+3.26%</span></li>
                        <li>SHIB/USDT <span className='pri_color'>+7.38%</span></li>
                        <li>DOGE/USDT <span className='pri_color'>+7.35%</span></li>
                        <li>WIN/USDT <span className='pri_color'>+3.88%</span></li>
                      </ul>
                    </Marquee>
                  </div>
                </ul>
              </div>
              <div className='col-md-2 text-right'>
                <ul className='d-flex flex-wrap gap-5 conn_lis2'>
                  <li>
                    <Link href="#">Contact</Link>
                  </li>
                  <li>
                    <Link href="#">Download</Link>
                  </li>
                  <li>
                    <Link href="#">Online Chat</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
        </>
      )}

      {/* Render Mobile view */}
      {viewType === 'mobile' && (
        <>
          <div className='trd_footsc2 p-1 w-100'>
            <ul className="ass_lis2 d-flex justify-content-evenly gap-2">
              <li className="flex-grow-1">
                <button type="button" className="buy_btn1 w-100" onClick={() => { setIsOpen(true); setFlatTabs(1); }}>Buy</button>
              </li>
              <li className="flex-grow-1">
                <button type="button" className="sell_btn1 w-100" onClick={() => { setIsOpen(true); setFlatTabs(2); }}>Sell</button>
              </li>
            </ul>
          </div>
        </>
      )}

      <div className='trad_mob'>
      {/* Offcanvas sidebar */}
      <div className={`offcanvas buysell_canvas ${isOpen ? 'show' : ''}`}>
        <div className="offcanvasContent">
          <BuySell tabs={flatTabs} setFlatTabs={setFlatTabs} />
        </div>
      </div>


      {/* Overlay (Optional) */}
      {isOpen && <div className="overlay" onClick={toggleOffcanvas}></div>}
      </div>

    </>
  );
};

export default Footer;
