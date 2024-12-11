import React from 'react';
import Link from "next/link";
import { useState } from 'react';



const ExpoFaq = () => {

    const [isActive, setIsActive] = useState(1)
    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }

    return (
        <div className="container ben_scf1">
            <div className="row justify-content-center">
                <div className="col-md-11">


                    <div className="block-text1 center">
                        <h6 className="text-uppercase fs-16 pri_color fopsans fw400">Question & Answer</h6>
                        <h4 className="fopsans fw700">Frequently Asked Questions (FAQ)</h4>
                        <div className="row justify-content-center">
                            <div className="col-md-4 rsp_w100">
                                <p className="fs-16">Browse our faq's below, if you can not find the answer to you're looking for please contact us.</p>
                            </div>
                        </div>
                    </div>
                    <div className="cm_faq1">
                        <div className="flat-accordion">
                            <div className={isActive == 1 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(1)}>
                                <h6 className="toggle-title finter fw600 black8">What can I expect from attending the expo? </h6>
                                <div className="toggle-content" style={{ display: `${isActive == 1 ? "block" : "none"}` }}>
                                    <p>
                                    Attendees can expect a variety of interactive sessions, keynote speeches, panel discussions, and networking opportunities. You'll gain valuable insights from leading experts and explore cutting-edge crypto technologies.

                                    </p>
                                </div>
                            </div>
                            <div className={isActive == 2 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(2)}>
                                <h6 className="toggle-title finter fw600 black8">Do I need special software to attend the expo?
                                </h6>
                                <div className="toggle-content" style={{ display: `${isActive == 2 ? "block" : "none"}` }}>
                                    <p>
                                    No special software is required. You can access the expo directly through your web browser on any device with an internet connection.
                                    </p>
                                </div>
                            </div>
                            <div className={isActive == 3 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(3)}>
                                <h6 className="toggle-title finter fw600 black8">
                                Can I attend the expo from anywhere in the world?

                                </h6>
                                <div className="toggle-content" style={{ display: `${isActive == 3 ? "block" : "none"}` }}>
                                    <p>
                                    Yes, the Online Crypto Expo is accessible worldwide. All you need is an internet connection to participate.

                                    </p>
                                </div>
                            </div>
                            <div className={isActive == 4 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(4)}>
                                <h6 className="toggle-title finter fw600 black8">Who should I contact if I need help or have more questions?
                                </h6>
                                <div className="toggle-content" style={{ display: `${isActive == 4 ? "block" : "none"}` }}>
                                    <p>
                                    For any additional questions or support, please use the "Contact Us" form on our website, and our team will be happy to assist you.

                                    </p>
                                </div>
                            </div>
                            <div className={isActive == 5 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(5)}>
                                <h6 className="toggle-title finter fw600 black8">What kind of exhibitors will be present at the expo?
                                </h6>
                                <div className="toggle-content" style={{ display: `${isActive == 5 ? "block" : "none"}` }}>
                                    <p>
                                    The expo will feature a diverse range of exhibitors, including top cryptocurrency exchanges, blockchain projects, wallet providers, fintech companies, and more.

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpoFaq;