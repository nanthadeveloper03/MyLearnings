'use client'
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Pair from '@/components/sections/convert/Pair';

const Header = () => {

const [isOpen, setIsOpen] = useState(false);

const toggleOffcanvas = () => {
  setIsOpen(!isOpen);
};

const [viewType, setViewType] = useState('web'); // Default is web view

// Function to update the viewType based on screen width
const updateViewType = () => {
  if (window.innerWidth <= 767) {
    setViewType('mobile');
  } else {
    setViewType('web');
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
      <div className='trd_hdsc1 w-100'>
        <div className='trd_hdlef1 d-flex align-items-center'>
          <div className='trd_bal1'>
            <h4>              
              <div className='coin_tnam'>
                <div className='coin_thd'>UPRO/USDT </div>                
              </div>

            </h4>
          </div>
          <div className='trd_bal2'>
            <h5 className='pri_color'>59,480.93</h5>
            <h6>$59480.93</h6>
          </div>

          <ul className="d-flex flex-wrap gap-5 trd_vlis1">
            <li>
              <p>24h Change</p>
              <p className='pri_color'>+3.52%</p>
            </li>
            <li>
              <p className='text-muted'>
                24h High
              </p>
              <p>
                59,959.22
              </p>
            </li>
            <li>
              <p className='text-muted'>
                24h Low
              </p>
              <p>
                57,212.68
              </p>
            </li>
            <li>
              <p className='text-muted'>
                24h Volume(BTC)
              </p>
              <p>
                1.20K
              </p>
            </li>
            <li>
              <p className='text-muted'>
                24h Volume(USDT)
              </p>
              <p>
                70.85M
              </p>
            </li>
          </ul>
        </div>
      </div>
    )}
     {/* Render Mobile view */}
     {viewType === 'mobile' && (
      <div className='trd_hdsc2 w-100'>
      <div className='trd_hdlef2 '>
        <div className='row mx-1'>
          <div className='col-5 px-1'>
            <div className='coin_tnam1 w-100'>
              <div className='w-100 d-flex align-items-center gap-2' onClick={toggleOffcanvas}>
                <div className='co_thd1'>
                  <div className='coin_thd1'>UPRO/USDT</div>
                </div>
                <span className='co_drp1'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path
                      d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                  </svg>
                </span>
              </div>
              <div className='trd_bal3 w-100 d-flex align-items-center gap-2'>
                <h5 className='pri_color'>74974.00</h5>
              </div>
              <div className='trd_vlis2'>
                <p className="text-success fw600">
                1122.28
                  <small className='mx-2'> 1.523% </small>
                </p>
              </div>
            </div>
          </div>
          <div className='col-7 px-1'>
            <div className='row mx-1'>
              <div className='col-6 px-1'>
                <div className='trd_vlis2'>
                  <p className='text-muted'>
                    24h High
                  </p>
                  <p>
                    76400.00
                  </p>
                </div>
              </div>
              <div className='col-6 px-1'>
                <div className='trd_vlis2'>
                  <p className='text-muted'>
                    24h Low
                  </p>
                  <p>
                   73488.00
                  </p>
                </div>
              </div>
            </div>
            <div className='row mx-1 mt-1 mb-1'>
              <div className='col-6 px-1'>
                <div className='trd_vlis2'>
                  <p className='text-muted'>
                  24h Volume(BTC)
                  </p>
                  <p>
                  52843.88
                  </p>
                </div>
              </div>
              <div className='col-6 px-1'>
                <div className='trd_vlis2'>
                  <p className='text-muted'>
                  24h Volume(USDT)
                  </p>
                  <p>
                  3956040398.28
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     )}

     <div className='trad_mob'>

      {/* Offcanvas sidebar */}
      <div className={`offcanvas search_canvas ${isOpen ? 'show' : ''}`}>
        <div className="offcanvasContent">
          <Pair />
        </div>
      </div>

      {/* Overlay (Optional) */}
      {isOpen && <div className="overlay" onClick={toggleOffcanvas}></div>}
      </div>

    </>
  );
};

export default Header;
