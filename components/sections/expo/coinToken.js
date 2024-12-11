import React from 'react';
import Link from "next/link";

const ExpoCoinToken = () => {

    return (
        <section className="coin_sct1">
            <div className="container">
                <div className='row justify-content-center'>
                    <div className='col-md-11 rsp_w100'>

                        <div className="cm_chead1">
                            <h4 className="finter fw500 text-uppercase pri_color">Coins and tokens</h4>
                            <h3 className="finter fw600">In-Depth Exploration of <span className="pri_color">Top 200</span> Coins and Tokens</h3>
                            <h4 className="fopsans fw400">We’ve selected the top 200 coins and tokens, focusing on those with strong foundations and clear ownership. This list highlights the most dependable and promising assets in the crypto market.</h4>
                        </div>
                        <div className="cm_ctbx1">
                            <h6 className="finter fw600">Coins:</h6>
                            <ul className="cm_ctlis1">
                                <li><span className="txb1">Criteria:</span> Coins are supported by a blockchain, with known ownership and transparent goals.</li>
                                <li><span className="txb1">Requirements:</span> Each coin must have a clear purpose, fixed supply, and disclose who controls the project.</li>
                            </ul>
                        </div>

                        <div className="cm_ctbx1">
                            <h6 className="finter fw600">Tokens:</h6>
                            <ul className="cm_ctlis1">
                                <li><span className="txb1">Criteria:</span> Tokens must be audited, with clear ownership, and no minting privileges. Token owners must complete KYC to ensure transparent ownership. The project must have a public website and disclose its background.</li>
                                <li><span className="txb1">Purpose:</span> Ensuring that only projects with legitimate goals and transparent operations are highlighted.</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </section>

    );
};

export default ExpoCoinToken;