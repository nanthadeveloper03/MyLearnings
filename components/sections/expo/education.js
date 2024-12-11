import React from 'react';
import Link from "next/link";


const ExpoEdu = () => {
    return (
        <section className="edu_sc1">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-11 rsp_w100">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-md-5">
                                <div className="edu_sc">
                                    <h4 className="text-uppercase finter fw700 pri_color">Educating Users</h4>
                                    <h3 className="text-white finter fw600">Your Guide to Crypto Investments</h3>
                                    <p className="finter fw400 text-white">This expo is more than a showcase of exchanges and coins; it’s about equipping you with essential knowledge to make informed crypto investment decisions.</p>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="row rsp-mma5">
                                    <div className="col-md-6 rsp-mpd5">
                                        <div className="emt2">
                                            <div className="edu_bx1">
                                                <h5 className="fopsans fw400 text-white">Investing in Crypto</h5>
                                                <p className="fopsans fw400">Learn how to select the right coins and tokens for investment.</p>
                                                <img src="../assets/images/nico/edim1.png" className="img-fluid" alt='investing in crypto' />
                                            </div>
                                            <div className="edu_bx1">
                                                <h5 className="fopsans fw400 text-white">Trading Best Practices</h5>
                                                <p className="fopsans fw400">Discover secure methods and platforms for trading.</p>
                                                <img src="../assets/images/nico/edim2.png" className="img-fluid" alt='trading best practices'/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 rsp-mpd5">
                                        <div className="edu_bx1">
                                            <h5 className="fopsans fw400 text-white">Staking Opportunities</h5>
                                            <p className="fopsans fw400">Understand which coins offer the best staking rewards and how to maximize them.</p>
                                            <img src="../assets/images/nico/edim3.png" className="img-fluid" alt='staking opportunities'/>
                                        </div>
                                        <div className="edu_bx1">
                                            <h5 className="fopsans fw400 text-white">Exchange Evaluation</h5>
                                            <p className="fopsans fw400">Learn how to assess the safety and reliability of various exchanges.</p>
                                            <img src="../assets/images/nico/edim4.png" className="img-fluid" alt='exchange evaluation'/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExpoEdu;