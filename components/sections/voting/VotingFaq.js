import React from 'react';
import Link from "next/link";
import { useState } from 'react';


const VotingFaq = () => {
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
                                <h6 className="toggle-title finter fw600 black8">1. How do I participate in voting for UPRO Coin to be listed on other exchanges</h6>
                                <div className="toggle-content" style={{ display: `${isActive == 1 ? "block" : "none"}` }}>
                                    <p>
                                    Simply choose the exchange, cast your vote, and upload a screenshot as proof.
                                    </p>
                                </div>
                            </div>
                            <div className={isActive == 2 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(2)}>
                                <h6 className="toggle-title finter fw600 black8">2. How much USDT do I receive for voting?
                                </h6>
                                <div className="toggle-content" style={{ display: `${isActive == 2 ? "block" : "none"}` }}>
                                    <p>
                                    You’ll receive 1 USDT for every exchange you vote on.

                                    </p>
                                </div>
                            </div>
                            <div className={isActive == 3 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(3)}>
                                <h6 className="toggle-title finter fw600 black8">
                                3. When will I receive my USDT reward?
                                </h6>
                                <div className="toggle-content" style={{ display: `${isActive == 3 ? "block" : "none"}` }}>
                                    <p>
                                    Once you upload your screenshot, your USDT will be credited to your account shortly.  


                                    </p>
                                </div>
                            </div>
                            <div className={isActive == 4 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(4)}>
                                <h6 className="toggle-title finter fw600 black8">4. Can I vote on multiple exchanges?
                                </h6>
                                <div className="toggle-content" style={{ display: `${isActive == 4 ? "block" : "none"}` }}>
                                    <p>
                                    Yes! The more exchanges you vote on, the more USDT you can earn.

                                    </p>
                                </div>
                            </div>
                            <div className={isActive == 5 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(5)}>
                                <h6 className="toggle-title finter fw600 black8">5. Is there a limit to how many exchanges I can vote for?
                                </h6>
                                <div className="toggle-content" style={{ display: `${isActive == 5 ? "block" : "none"}` }}>
                                    <p>
                                    No, you can vote for as many exchanges as you'd like and earn USDT for each one.

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

export default VotingFaq;
