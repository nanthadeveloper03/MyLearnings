import React from 'react';
import Link from "next/link";
import { useState } from 'react';


const ClaimFaq = () => {
  const [isActive, setIsActive] = useState(1)
    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }
  return (
    <>
      <div className="container ben_scf1">
            <div className="row justify-content-center">
                <div className="col-md-11">


                    <div className="block-text1 center">
                        <h6 className="text-uppercase fs-16 pri_color fopsans fw400">Question & Answer</h6>
                        <h4 className="fopsans fw700">Frequently Asked Questions (FAQ)</h4>
                        <div className="row justify-content-center">
                            <div className="col-md-4 rsp_w100">
                                <p className="fs-16">Quick Answers to Your Most Common Questions.</p>
                            </div>
                        </div>
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
                                <h6 className="toggle-title finter fw600 black8">Who is the Founder of Ultrapro Exchange?
                                </h6>
                                <div className="toggle-content" style={{ display: `${isActive == 2 ? "block" : "none"}` }}>
                                    <p>
                                    We strive to respond to all inquiries promptly. Most queries are addressed within 24 hours, but response times may vary depending on the complexity of the issue.  

                                    </p>
                                </div>
                            </div>
                            <div className={isActive == 3 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(3)}>
                                <h6 className="toggle-title finter fw600 black8">
                                How Do I Participate in the 25 USDT Bonanza? 
                                </h6>
                                <div className="toggle-content" style={{ display: `${isActive == 3 ? "block" : "none"}` }}>
                                    <p>
                                    If you experience technical issues, please contact our support team immediately. Provide as much detail as possible about the issue to help us resolve it quickly.   


                                    </p>
                                </div>
                            </div>
                            <div className={isActive == 4 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(4)}>
                                <h6 className="toggle-title finter fw600 black8">Can I Create Multiple Accounts to Receive More USDT?
                                </h6>
                                <div className="toggle-content" style={{ display: `${isActive == 4 ? "block" : "none"}` }}>
                                    <p>
                                    You can reach us 24/7 via email, phone, or social media. Visit our Contact Us page for detailed contact information.


                                    </p>
                                </div>
                            </div>
                            <div className={isActive == 5 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(5)}>
                                <h6 className="toggle-title finter fw600 black8">Can I Earn Additional USDT through Referrals?
                                </h6>
                                <div className="toggle-content" style={{ display: `${isActive == 5 ? "block" : "none"}` }}>
                                    <p>
                                    Yes, our customer support team is available 24/7 to assist you with any issues or questions you may have.


                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default ClaimFaq;
