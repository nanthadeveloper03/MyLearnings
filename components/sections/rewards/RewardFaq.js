import React from 'react';
import Link from "next/link";
import { useState } from "react";

const RewardFaq = () => {

  const [isActive, setIsActive] = useState(1)

  const handleClick = (key) => {
    setIsActive(prevState => prevState === key ? null : key)
  }

  return (
    <>

      <div className="cm_faq2">
        <div className="cm_faq1">
          <h6 className="fw600 finter mt-3 mb-4 text-uppercase">Faq</h6>
          <div className="flat-accordion">
            <div className={isActive == 1 ? "flat-toggle active cursor-pointer" : "flat-toggle cursor-pointer"} onClick={() => handleClick(1)}>
              <h6 className="toggle-title fs-14 fopsans fw600 black11">How can I earn 2 USDT per referral?</h6>
              <div className="toggle-content" style={{ display: `${isActive == 1 ? "block" : "none"}` }}>
                <p> Earn 2 USDT for every friend who registers and completes KYC with your referral code
                </p>
              </div>
            </div>
            <div className={isActive == 2 ? "flat-toggle active cursor-pointer" : "flat-toggle cursor-pointer"} onClick={() => handleClick(2)}>
              <h6 className="toggle-title fs-14 fopsans fw600 black11">Is there a limit on referrals or rewards?</h6>
              <div className="toggle-content" style={{ display: `${isActive == 2 ? "block" : "none"}` }}>
                <p>
                No, you can refer to unlimited friends and earn unlimited rewards
                </p>
              </div>
            </div>
            <div className={isActive == 3 ? "flat-toggle active cursor-pointer" : "flat-toggle cursor-pointer"} onClick={() => handleClick(3)}>
              <h6 className="toggle-title fs-14 fopsans fw600 black11">
              How do I withdraw my rewards?
              </h6>
              <div className="toggle-content" style={{ display: `${isActive == 3 ? "block" : "none"}` }}>
                <p>
                Complete the tasks and KYC verification. Then, go to the 'Withdraw' section, select your crypto, and confirm the transaction.
                </p>
              </div>
            </div>
            <div className={isActive == 4 ? "flat-toggle active cursor-pointer" : "flat-toggle cursor-pointer"} onClick={() => handleClick(4)}>
              <h6 className="toggle-title fs-14 fopsans fw600 black11">
              Can I withdraw my rewards anytime?
              </h6>
              <div className="toggle-content" style={{ display: `${isActive == 4 ? "block" : "none"}` }}>
                <p>
                Yes, you can withdraw your rewards after completing KYC and any necessary tasks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default RewardFaq;
