import React from 'react';
import Link from "next/link";
import { useState } from "react";


const SwapFaq = () => {
  
  // Faq Accord
  const [isActive, setIsActive] = useState(1)
  const handleClick = (key) => {
    setIsActive(prevState => prevState === key ? null : key)
  }
  // Faq Accord
  
  return (
    <>
     <div className="block-text1 center">
                  <h6 className="text-uppercase fs-16 pri_color fopsans fw400">Question & Answer</h6>
                  <h4 className="fopsans fw700">Frequently Asked Questions (FAQ)</h4>
                  <p className="fs-16">Quick Answers to Your Most Common Questions.</p>
                </div>
                <div className="cm_faq1">
                  <div className="flat-accordion">
                    <div className={isActive == 1 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(1)}>
                      <h6 className="toggle-title finter fw600 black8">What is Ultrapro Exchange?</h6>
                      <div className="toggle-content" style={{ display: `${isActive == 1 ? "block" : "none"}` }}>
                        <p>
                          Ultrapro Exchange is a global cryptocurrency platform that enables users to trade Bitcoin, Ethereum, BNB, UPRO, and over 150 other cryptocurrencies with security and efficiency.
                        </p>
                      </div>
                    </div>
                    <div className={isActive == 2 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(2)}>
                      <h6 className="toggle-title finter fw600 black8">Who is the Founder of Ultrapro Exchange?</h6>
                      <div className="toggle-content" style={{ display: `${isActive == 2 ? "block" : "none"}` }}>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Tellus aliquam parturient erat id vel, condimentum a,
                          hendrerit egestas. Auctor cras diam, dui pulvinar elit.
                          Egestas feugiat gravida in imperdiet facilisi tortor ac
                          ultrices venenatis.
                        </p>
                      </div>
                    </div>
                    <div className={isActive == 3 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(3)}>
                      <h6 className="toggle-title finter fw600 black8">
                        How Do I Participate in the 25 USDT Bonanza?
                      </h6>
                      <div className="toggle-content" style={{ display: `${isActive == 3 ? "block" : "none"}` }}>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Tellus aliquam parturient erat id vel, condimentum a,
                          hendrerit egestas. Auctor cras diam, dui pulvinar elit.
                          Egestas feugiat gravida in imperdiet facilisi tortor ac
                          ultrices venenatis.
                        </p>
                      </div>
                    </div>
                    <div className={isActive == 4 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(4)}>
                      <h6 className="toggle-title finter fw600 black8">Can I Create Multiple Accounts to Receive More USDT?</h6>
                      <div className="toggle-content" style={{ display: `${isActive == 4 ? "block" : "none"}` }}>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Tellus aliquam parturient erat id vel, condimentum a,
                          hendrerit egestas. Auctor cras diam, dui pulvinar elit.
                          Egestas feugiat gravida in imperdiet facilisi tortor ac
                          ultrices venenatis.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
    </>
  );
};

export default SwapFaq;
