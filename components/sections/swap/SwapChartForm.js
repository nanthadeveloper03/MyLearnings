import React from 'react';
import Link from "next/link";
import Chart from 'react-apexcharts'
import { useState } from "react"
import CustomSelect from './SelectBoxWithImage';

const RightCoinTab = (e) => {
  
    // Select box with image
    const [selectedOption, setSelectedOption] = useState(null);
    const options2 = [
      {
        value: 'BTC',
        label: 'BTC',
        image: '/assets/images/swap/coinsw1.png',
      },
      {
        value: 'USDT',
        label: 'USDT',
        image: '/assets/images/swap/saico1.png',
      },
      {
        value: 'TRX',
        label: 'TRX',
        image: '/assets/images/swap/saico4.png',
      },
    ];
  
    const options3 = [
      {
        value: 'CET',
        label: 'CET',
        image: '/assets/images/swap/coinsw2.png',
      },
      {
        value: 'USDT',
        label: 'USDT',
        image: '/assets/images/swap/saico1.png',
      },
      {
        value: 'TRX',
        label: 'TRX',
        image: '/assets/images/swap/saico4.png',
      },
    ];
    const handleChange = (option) => {
      setSelectedOption(option);
    };
    // Select box with image
  
    // Chart options
    const options = {
      chart: {
        type: 'line',
        height: 350,
      },
      stroke: {
        curve: 'stepline',
        width: 1,
      },
      grid: {
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        offsetX: -10,
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        opposite: true,
      },
      markers: {
        hover: {
          sizeOffset: 4,
        },
      },
      xaxis: {
        categories: [], // Will be set dynamically based on selected tab
      },
    };
    // Data sets for different time ranges
    const dataSets = {
      '24hour': {
        categories: [
          '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM',
          '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM',
          '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM',
          '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '12 AM',
        ],
        series: [
          {
            name: '24-Hour Data',
            data: [12, 15, 11, 14, 18, 17, 19, 21, 22, 24, 23, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8],
          },
        ],
      },
      '1week': {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [
          {
            name: '1 Week Data',
            data: [70, 65, 80, 81, 56, 55, 40],
          },
        ],
      },
      '1month': {
        categories: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
        series: [
          {
            name: '1 Month Data',
            data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58, 57, 56, 54, 40, 32, 24, 35, 44, 45, 50, 52, 55, 60, 65, 66, 68, 70, 72, 74],
          },
        ],
      },
    };
    // State to manage the active tab
    const [activeTab, setActiveTab] = useState('24hour');
    // Chart options


  return (
    <>

<div className="row">
                  <div className="col-md-6 col-sm-6">
                    <div className="chartbx1">
                      <h4>
                        <span className="tcur_ico1">
                          <img src="/assets/images/swap/gim1.png" className="gim2" />
                          <img src="/assets/images/swap/gim2.png" className="gim1" />
                        </span>
                        USDC/USDT
                        {/* Chart Tab Buttons Ends */}
                        <span className="menu-tab3">
                          <button
                            onClick={() => setActiveTab('24hour')}
                            style={{
                              backgroundColor: activeTab === '24hour' ? '#fff' : '#fff',
                              color: activeTab === '24hour' ? '#1d1d1d' : '#c2c2c2',
                            }}
                          >
                            24H
                          </button>
                          <button
                            onClick={() => setActiveTab('1week')}
                            style={{
                              backgroundColor: activeTab === '1week' ? '#fff' : '#fff',
                              color: activeTab === '1week' ? '#1d1d1d' : '#c2c2c2',
                            }}
                          >
                            1W
                          </button>
                          <button
                            onClick={() => setActiveTab('1month')}
                            style={{
                              backgroundColor: activeTab === '1month' ? '#fff' : '#fff',
                              color: activeTab === '1month' ? '#1d1d1d' : '#c2c2c2',
                            }}
                          >
                            1M
                          </button>
                        </span>
                       {/* Chart Tab Buttons ends*/}
                      </h4>
                      <h6>0.9991 <small className="text-danger">-0.02%</small>
                      </h6>
                    </div>
                    <div className="stepchart1">
                         {/* Chart Component starts*/}
                        <Chart
                          options={{ ...options, xaxis: { categories: dataSets[activeTab].categories } }}
                          series={dataSets[activeTab].series}
                          type="line"
                          height={350}
                        />
                        {/* Chart Component ends*/}
                    </div>                

                    <div className="cm_alert text-center">
                      <p>
                        <img src="/assets/images/swap/exclam.png" className="img-fluid" />
                        Please note that even if the limit price is reached, your order may not be filled.</p>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-6">

                    <form className="cm_form3">
                      <div className="form-group">
                        <div className="fid1">
                          <label className="form-label">From</label>
                          <div className="input-group cm_singrp1">
                            {/* Select box with image starts */}
                            <CustomSelect options={options2} onChange={handleChange} />
                            {/* Select box with image ends */}
                            <input type="text" className="form-control" aria-label="Currency Value" />
                          </div>

                        </div>
                      </div>
                      <div className="form-group text-center">
                        <img src="/assets/images/swap/exc_ico.png" className="img-fluid ex_ico" />
                      </div>
                      <div className="form-group">
                        <div className="fid1">
                          <label className="form-label">To <img src="/assets/images/swap/exclam2.png" className="img-fluid" /></label>
                          <div className="input-group cm_singrp1">
                            {/* Select box with image starts */}
                            <CustomSelect options={options3} onChange={handleChange} />
                            {/* Select box with image ends */}
                            <input type="text" className="form-control" aria-label="Currency Value" />
                          </div>
                        </div>
                      </div>
                      <p className="pri_tx">Reference Price:<span>1 BTC</span>=<span>889758.8753 </span><span>CET</span></p>
                      <div className="form-group">
                        <button type="button" className="btn btn-action text-white w-100 text-center">Log in and swap</button>
                      </div>
                    </form>

                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="d-flex justify-content-evenly text-center coins_ls">
                      <div className="flex-fill">
                        <p>
                          <div className="w-100">
                            <img src="/assets/images/swap/coin1.png" className="img-fluid" />
                          </div>
                          BTC
                        </p>
                        <p>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                        </p>
                        <p>
                          <div className="w-100">
                            <img src="/assets/images/swap/saico1.png" className="img-fluid" />
                          </div>
                          USDT
                        </p>
                      </div>
                      <div className="flex-fill">
                        <p>
                          <div className="w-100">
                            <img src="/assets/images/swap/saico1.png" className="img-fluid" />
                          </div>
                          USDT
                        </p>
                        <p>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                        </p>
                        <p>
                          <div className="w-100">
                            <img src="/assets/images/swap/coin2.png" className="img-fluid" />
                          </div>
                          BTC
                        </p>
                      </div>
                      <div className="flex-fill">
                        <p>
                          <div className="w-100">
                            <img src="/assets/images/swap/saico2.png" className="img-fluid" />
                          </div>
                          SOL
                        </p>
                        <p>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                        </p>
                        <p>
                          <div className="w-100">
                            <img src="/assets/images/swap/coinsw3.png" className="img-fluid" />
                          </div>
                          CATDOG
                        </p>
                      </div>
                      <div className="flex-fill">
                        <p>
                          <div className="w-100">
                            <img src="/assets/images/swap/saico4.png" className="img-fluid" />
                          </div>
                          TRX
                        </p>
                        <p>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                        </p>
                        <p>
                          <div className="w-100">
                            <img src="/assets/images/swap/saico1.png" className="img-fluid" />
                          </div>
                          USDT
                        </p>
                      </div>
                      <div className="flex-fill">
                        <p>
                          <div className="w-100">
                            <img src="/assets/images/swap/saico5.png" className="img-fluid" />
                          </div>
                          TON
                        </p>
                        <p>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                        </p>
                        <p>
                          <div className="w-100">
                            <img src="/assets/images/swap/saico1.png" className="img-fluid" />
                          </div>
                          USDT
                        </p>
                      </div>
                      <div className="flex-fill">
                        <p>
                          <div className="w-100">
                            <img src="/assets/images/swap/saico1.png" className="img-fluid" />
                          </div>
                          USDT
                        </p>
                        <p>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                        </p>
                        <p>
                          <div className="w-100">
                            <img src="/assets/images/swap/saico5.png" className="img-fluid" />
                          </div>
                          TON
                        </p>
                      </div>
                      <div className="flex-fill">
                        <p>
                          <div className="w-100">
                            <img src="/assets/images/swap/saico1.png" className="img-fluid" />
                          </div>
                          USDT
                        </p>
                        <p>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                        </p>
                        <p>
                          <div className="w-100">
                            <img src="/assets/images/swap/saico6.png" className="img-fluid" />
                          </div>
                          TRUMP
                        </p>
                      </div>
                      <div className="flex-fill">
                        <p>
                          <div className="w-100">
                            <img src="/assets/images/swap/saico1.png" className="img-fluid" />
                          </div>
                          USDT
                        </p>
                        <p>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                        </p>
                        <p>
                          <div className="w-100">
                            <img src="/assets/images/swap/saico2.png" className="img-fluid" />
                          </div>
                          SOL
                        </p>
                      </div>
                      <div className="flex-fill">
                        <p>
                          <div className="w-100">
                            <img src="/assets/images/swap/saico1.png" className="img-fluid" />
                          </div>
                          USDT
                        </p>
                        <p>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
                        </p>
                        <p>
                          <div className="w-100">
                            <img src="/assets/images/swap/saico4.png" className="img-fluid" />
                          </div>
                          TRX
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 col-sm-5">
                    <div className="sapim1">
                      <img src="/assets/images/swap/swapstep.png" className="img-fluid" />
                    </div>
                  </div>
                  <div className="col-md-6 stp_bk col-sm-7">
                    <div className="block-text1">
                      <h5 className="fw700 froboto black8">Buy Cryptocurrency in Just a Few Simple Steps</h5>
                      <p>Buying crypto onUltrapro is secure and straightforward. Here's how you can do it:</p>
                    </div>
                    <ul className="step_lister">
                      <li>
                        <h4 className="tit">
                          <span className="num_t">1</span>
                          Create a Ultrapro Account
                        </h4>
                        <p>Sign up on Ultrapro with your email address/phone number and country of residence, then create a strong password to secure your account.</p>
                      </li>
                      <li>
                        <h4 className="tit">
                          <span className="num_t">2</span>
                          Verify Your Account
                        </h4>
                        <p>Verify your identity by uploading the required ID documents. We make this process easy.</p>
                      </li>
                      <li>
                        <h4 className="tit">
                          <span className="num_t">3</span>
                          Add a Payment Method
                        </h4>
                        <p>Add your credit card, debit card, or other payment methods to buy cryptocurrency. Ultrapro supports over 70 payment methods.</p>
                      </li>
                      <li>
                        <h4 className="tit">
                          <span className="num_t">4</span>
                          Buy Cryptocurrency
                        </h4>
                        <p>You can now easily and securely purchase Bitcoin and other cryptocurrencies on Ultrapro using USD, EUR, AUD, INR, RUB, and over 48
                          other local currencies.</p>
                      </li>
                    </ul>
                  </div>
                </div>

    </>
  );
};

export default RightCoinTab;
