import React from 'react';
import Link from "next/link";
import { useState } from "react";


const RightCoinTab = (e) => {

  const [flatTabs, setFlatTabs] = useState(1)
  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }

  return (

    <section className="rig_tabsc1">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 rsp_w100">
            <div className="flat-tabs">
              <div className="d-flex justify-content-center">
              <ul className="menu-tabr d-flex">
                <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><a className="text-uppercase finter fw600">right Coin identification</a></li>
                <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><a className="text-uppercase finter fw600">right token identification</a></li>
              </ul>
              </div>
              <div className="content-tabr1">
                <div className="content-inn" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>
                  <div className="rig_tabx">
                    <div className="rig_tim1">
                      <img src="/assets/images/rightcoinid/coincim1.png" className="img-fluid" />
                    </div>
                    <div className="righd1">
                      <h6 className="text-center fw400 finter"><span className="text-white">Coin Criteria</span></h6>
                      <h3 className="text-center froboto fw700">Right Coin Identification</h3>
                    </div>
                    <ol className="rig_lis2">
                      <li><b>Known Ownership</b> - Clear disclosure of who controls and manages the coin on the blockchain's official website, ensuring accountability.</li>
                      <li><b>Airdrop Commitment</b> - Coin owners must provide an airdrop worth at least $6 million to reward users within one year.</li>
                      <li><b>Transparent Goals</b> - The coin must have clearly defined objectives and practical use cases.</li>
                      <li><b>Fixed Supply</b> - A predetermined total supply, ideally 120 million or below, with no further minting allowed.</li>
                      <li><b>Detailed White Paper</b> - The white paper must clearly explain the blockchain and coin details, ensuring transparency and trust.</li>
                    </ol>
                  </div>
                </div>
                <div className="content-inn" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>
                  <div className="rig_tabx">
                    <div className="rig_tim1">
                      <img src="/assets/images/rightcoinid/coincim1.png" className="img-fluid" />
                    </div>
                    <div className="righd1">
                      <h6 className="text-center fw400 finter"><span className="text-white">Token Criteria</span></h6>
                      <h3 className="text-center froboto fw700">Right Token Identification</h3>
                    </div>
                    <ol className="rig_lis2">
                      <li><b>Audited</b> - Tokens must undergo a thorough audit for security and compliance.</li>
                      <li><b>Clear Ownership</b> - Transparent disclosure of ownership details.</li>
                      <li><b>No Minting Privileges</b> - No additional tokens should be minted post-launch.</li>
                      <li><b>KYC Completion</b> - Token owners must complete KYC to ensure transparency.</li>
                      <li><b>Public Website</b> - A dedicated website providing detailed project information and background.</li>
                    </ol>
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

export default RightCoinTab;
