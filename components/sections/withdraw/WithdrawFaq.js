import React from 'react';
import Link from "next/link";
import { useState } from "react";

const WithdrawFaq = () => {

  const [isActive, setIsActive] = useState(1)
  const handleClick = (key) => {
    setIsActive(prevState => prevState === key ? null : key)
  }

  let faqArray = [
    { question: 'How do I withdraw funds', answer: '' }
  ]

  return (
    <div>
      <div className="cm_faq2">
        <div className="cm_faq1">
          <h6 className="fw600 finter text-center mt-3 mb-4 text-uppercase">Faq</h6>
          <div className="flat-accordion">
            <div className={isActive == 1 ? "flat-toggle active cursor-pointer" : "flat-toggle cursor-pointer"} onClick={() => handleClick(1)}>
              <h6 className="toggle-title fopsans fw600 black11"> How do I withdraw funds?</h6>
              <div className="toggle-content" style={{ display: `${isActive == 1 ? "block" : "none"}` }}>
                <p> Go to ‘Withdraw’ select your crypto, enter the wallet address, and confirm. Ensure KYC is complete. </p>
              </div>
            </div>
            <div className={isActive == 2 ? "flat-toggle active cursor-pointer" : "flat-toggle cursor-pointer"} onClick={() => handleClick(2)}>
              <h6 className="toggle-title fopsans fw600 black11">What are the withdrawal fees?</h6>
              <div className="toggle-content" style={{ display: `${isActive == 2 ? "block" : "none"}` }}>
                <p>
                Fees vary by cryptocurrency. Check the fee in the 'Withdraw' section before confirming.
                </p>
              </div>
            </div>
            <div className={isActive == 3 ? "flat-toggle active cursor-pointer" : "flat-toggle cursor-pointer"} onClick={() => handleClick(3)}>
              <h6 className="toggle-title fopsans fw600 black11">
                How long do withdrawals take?
              </h6>
              <div className="toggle-content" style={{ display: `${isActive == 3 ? "block" : "none"}` }}>
                <p>
                  Typically 10-30 minutes, but times may vary based on network traffic.
                </p>
              </div>
            </div>
            <div className={isActive == 4 ? "flat-toggle active cursor-pointer" : "flat-toggle cursor-pointer"} onClick={() => handleClick(4)}>
              <h6 className="toggle-title fopsans fw600 black11"> Why is my withdrawal delayed?</h6>
              <div className="toggle-content" style={{ display: `${isActive == 4 ? "block" : "none"}` }}>
                <p>
                  Delays can be due to network traffic, incomplete KYC, or security checks. Contact support if needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawFaq;
