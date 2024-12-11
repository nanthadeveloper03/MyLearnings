import React from "react";
import Link from "next/link";
const ComBanner = () => {
  return (
    <>
      <section className="bonan_bann2 text-white  d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6 rsp_w100">
              <h3 className="text-capilatize">Staking</h3>
              <ul className="d-flex pt-3 pb-4 mb-2 gap-4">
                <li>Trading</li> <li>Earning</li> <li>Learning</li>
              </ul>
              <p>
                Register now and receive 
                <span>25 USDT</span> as a welcome bonus.
                Start your trading journey with added value and explore our
                platform’s features today!
              </p>
              <button className="fw600 text-white btn-action btn mt-4">Live soon</button>
            </div>
          </div>
         
        </div>
      </section>
      <section className="cms_cnt6">
        <h1 className="text-center pt-3 pt-md-0">Trade Loan</h1>
        <div className="container">
          <div className="row py-3 justify-content-center align-items-center">
            <div className="col-md-5">
              <img className="img-fluid" src="/assets/images/CMSIM2/client1.png" />
            </div>
            <div className="col-md-7">
              <div>
                <p>
                  We are committed to reshaping the financial landscape by
                  making cryptocurrency accessible to everyone. Our platform is
                  designed to cater to the needs of both novice and experienced
                  traders, offering a seamless and intuitive trading experience
                </p>
                <p>
                  With over 150+ cryptocurrencies available for trading, a
                  robust and secure infrastructure, and a user-friendly
                  interface, Ultrapro Exchange is your gateway to the world of
                  digital assets. Our features include quick sign-up and KYC
                  verification, easy INR transfers, an impressive dashboard,
                  live tracking, profit and loss updates, a referral program,
                  flawless KYC verification, 24/7 customer support, ideal API
                  trading, robust security measures, transparency reports,
                  2-factor authentication, and end-to-end encryption.
                </p>
              </div>
            </div>
          </div>
          <h3>
            Ultrapro's <span>Commitment</span> to<span> Compliance</span>
          </h3>
          <p>
            We take regulatory compliance seriously, and that's why we've
            embraced India's new Prevention of Money Laundering Act (PMLA) laws.
            These laws are designed to prevent money laundering and other
            illegal activities in the crypto industry.
          </p>
          <h3>
            What Does <span>Compliance</span> Look Like for Ultrapro?
          </h3>
          <p>We've implemented robust Know Your Customer (KYC) procedures.</p>
          <ul>
            <li>Our Anti-Money Laundering (AML) policies are top-notch.</li>
            <li>We keep meticulous records of transactions</li>
            <li>
              Regular audits and transaction monitoring are part of our routine.
            </li>
            <li>
              We're committed to reporting any suspicious transactions to the
              authorities
            </li>
            <li>
              We've even appointed a principal officer to oversee our compliance
              efforts.
            </li>
          </ul>
          <h3>
            Why Does <span>Compliance Matter</span> ?
          </h3>
          <p>
            By adhering to the new PMLA laws, Ultrapro is not only ensuring a
            safer environment for crypto users but also working hand in hand
            with regulators to build trust and transparency in the market.
          </p>
          <h3>
            <span>Conclusion</span>
          </h3>
          <p>
            Ultrapro's dedication to compliance isn't just talk—it's action.
            Through measures like KYC procedures, AML policies, and transaction
            monitoring, we're paving the way for a more secure and transparent
            crypto market in India.
          </p>{" "}
          <p>
            As the regulatory landscape evolves, Ultrapro remains steadfast in
            its commitment to compliance, security, and education. Join us on
            this journey to a safer and more accessible crypto ecosystem
          </p>{" "}
          <p>
            Ready to embark on your crypto journey? Empower yourself with
            Ultrapro, our simple and secure crypto exchange platform.
          </p>
        </div>
      </section>
    </>
  );
};

export default ComBanner;
