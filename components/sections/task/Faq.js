import React from 'react';
import Link from "next/link";
import { useState } from "react";

const Faq = () => {

  const [isActive, setIsActive] = useState(1)
    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
  }

  return (
    <>
     <div className="container ben_scf1">
            <div className="row">
                <div className="col-md-12">
                    <div className="block-text1 center">
                        <h6 className="text-uppercase fs-16 pri_color fopsans fw400">Question & Answer</h6>
                        <h4 className="fopsans fw700">Frequently Asked Questions (FAQ)</h4>
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <p className="fs-16">Quick Answers to Your Most Common Questions.</p>
                            </div>
                        </div>
                    </div>
                    <div className="cm_faq1">
                        <div className="flat-accordion">
                            <div className={isActive == 1 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(1)}>
                                <h6 className="toggle-title finter fw600 black8">How do I generate my voucher code?</h6>
                                <div className="toggle-content" style={{ display: `${isActive == 1 ? "block" : "none"}` }}>
                                    <p>
                                    To generate your voucher code, simply log into your account and navigate to the referral section. There, you will find the option to create a unique code that you can share with friends.
                                    </p>
                                </div>
                            </div>
                            <div className={isActive == 2 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(2)}>
                                <h6 className="toggle-title finter fw600 black8">What are the available staking plans?
                                </h6>
                                <div className="toggle-content" style={{ display: `${isActive == 2 ? "block" : "none"}` }}>
                                    <p>
                                    We offer multiple staking plans ranging from 1 month to 18 months, each requiring a monthly stake of $50. Each plan has its own benefits, allowing you to choose one that fits your investment strategy.  
                                    </p>
                                </div>
                            </div>
                            <div className={isActive == 3 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(3)}>
                                <h6 className="toggle-title finter fw600 black8">
                                Can I refer friends instead of staking?
                                </h6>
                                <div className="toggle-content" style={{ display: `${isActive == 3 ? "block" : "none"}` }}>
                                    <p>
                                    Yes, if you prefer not to stake, you can still earn rewards by referring friends. When your friends use your unique voucher code to stake $50, you’ll be eligible to claim your 25 USDT reward.
                                    </p>
                                </div>
                            </div>
                            <div className={isActive == 4 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(4)}>
                                <h6 className="toggle-title finter fw600 black8">How do I claim my 25 USDT reward?
                                </h6>
                                <div className="toggle-content" style={{ display: `${isActive == 4 ? "block" : "none"}` }}>
                                    <p>
                                    After your friends complete their staking using your voucher code, you can claim your 25 USDT reward directly from your account.   
                                    </p>
                                </div>
                            </div>
                            <div className={isActive == 5 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(5)}>
                                <h6 className="toggle-title finter fw600 black8">What rewards can I expect from staking UPRO?
                                </h6>
                                <div className="toggle-content" style={{ display: `${isActive == 5 ? "block" : "none"}` }}>
                                    <p>
                                    By staking UPRO, you can expect to receive a percentage of profits as rewards, which are calculated based on your staked amount and the duration of your chosen plan. These rewards are guaranteed, providing you with a reliable income stream.
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

export default Faq;
