import React from 'react';
import Link from "next/link";

const ExpoSave = () => {
    return (
        <section className="sav_sc1">
            <div>
                <div className="row justify-content-center">
                    <div className="col-md-11">
                        <div className="cm_shd1 text-center">
                            {/* <h6 className="finter fw400 pri_color">www.worldcryptoanalysis.com</h6> */}
                            <h4 className="finter text-uppercase fw700">save <span className="pri_color">crypto</span> community</h4>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="tie_bk1">
                                    <div className="ti_hd1">
                                        <img src="../assets/images/nico/tie1.png" className="img-fluid" alt="security of public funds" />
                                        <h2 className="finter fw700 text-uppercase">TIER 1</h2>
                                    </div>
                                    <ul className="ti_lis1">
                                        <li><span className="pri_color">Criteria: </span>Must not list coins purely for profit. They prioritize listing trustworthy coins that benefit the user community.</li>
                                        <li><span className="pri_color">Requirements: </span>Exchange owners must complete KYC and be publicly visible to guarantee the security of public funds.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="tie_bk2 text-center">
                                    <img src="../assets/images/nico/tieapp.png" className="img-fluid" alt="crypto community" />
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="tie_bk1 tie_rbk1">
                                    <div className="ti_hd1">
                                        <img src="../assets/images/nico/tie2.png" className="img-fluid" alt="high trading volumes" />
                                        <h2 className="finter fw700 text-uppercase">TIER 2</h2>
                                    </div>
                                    <p><span className="pri_color">Focus:</span> on High trading volumes and growing user bases. These exchanges must open local offices in regions where their user base is growing to provide better support.</p>
                                </div>
                                <div className="tie_bk1 tie_rbk1">
                                    <div className="ti_hd1">
                                        <img src="../assets/images/nico/tie3.png" className="img-fluid" alt="emerging exchanges" />
                                        <h2 className="finter fw700 text-uppercase">TIER 3</h2>
                                    </div>
                                    <p><span className="pri_color">Focus:</span> Emerging exchanges that show promise and meet essential transparency standards.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-9 rsp_w100">
                            <div className="cm_shd2">
                                <h4 className='text-center'>How we work</h4>
                            </div>
                            <div className="row">
                                <div className="col-md-4 hw_blk1">
                                    <div className="w-100 text-center mt-2 mb-2">
                                        <img src="../assets/images/nico/hw1.png" className="img-fluid" alt="effortless participation" />
                                    </div>
                                    <h6 className="finter fw600 text-center">Effortless Participation</h6>
                                    <p className="finter fw400">
                                    Join our online expo easily from anywhere. Register to access live sessions, interactive booths, and networking opportunities, all in a user-friendly virtual environment. 
                                    </p>
                                </div>
                                <div className="col-md-4 hw_blk1">
                                    <div className="w-100 text-center mt-2 mb-2">
                                        <img src="../assets/images/nico/hw2.png" className="img-fluid" alt="insightful learning" />
                                    </div>
                                    <h6 className="finter fw600 text-center"> Insightful Learning</h6>
                                    <p className="finter fw400">
                                    Engage with expert panels, workshops, and keynotes to gain valuable crypto knowledge. Connect with top exchanges and industry leaders to stay ahead of the trends.
                                    </p>
                                </div>
                                <div className="col-md-4 hw_blk1">
                                    <div className="w-100 text-center mt-2 mb-2">
                                        <img src="../assets/images/nico/hw3.png" className="img-fluid" alt="instant support" />
                                    </div>
                                    <h6 className="finter fw600 text-center"> Instant Support</h6>
                                    <p className="finter fw400">
                                    Receive real-time assistance and updates throughout the expo. Our dedicated support team is available 24/7 to ensure a smooth and enjoyable experience.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExpoSave;
