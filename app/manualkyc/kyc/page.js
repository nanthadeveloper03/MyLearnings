"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
// import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/hooks/apiCall";
import { useSelector } from "react-redux";
import withAuth from "@/util/withAuth";
import Kyc from "../../../styles/kyc.css";
import dashboard from "../../../styles/dashboard.css";


import ReactCountryFlag from "react-country-flag";
function KYC() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(1);
  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const country = useSelector((state) => state?.auth?.user);
  console.log(country, 'country');

  const handleClick1 = () => {
    if (country.countryCode === "IN") {
      router.push("/manualkyc/kyc_verify");
    } else {
      router.push("/manualkyc/kyc_verify_foreign");
    }
  };

  const handleButtonClick = () => {
    setShowFirstDiv(!showFirstDiv);
  };

  const handleClick = (key) => {
    setIsActive((prevState) => (prevState === key ? null : key));
  };

  return (
    <DashboardLayout>
      <div className="user_balance_dashboard mb-4">
        <div className="cm_inw">
          <div className="row kyc_rw rsp_ma5">
            <div className="col-md-6 col-sm-6 rsp_pd5">
              {showFirstDiv ? (
                <>
                  <div className="block-text1">
                    <h6 className="fw600 finter text-capitalize">
                      Individual Identity Verification
                    </h6>
                  </div>
                  <div className="cm_cnbx2">
                    <div className="row align-items-center rsp_ma5">
                      <div className="col-sm-8 col-8 rsp_pd5">
                        <h6>Standard Identity Verification</h6>
                        <p>
                          It only takes 3-5 minutes to verify your account.
                          Complete to unlock deposit and trading permissions.
                          Also, new users will get a chance to earn up to 25
                          USDT!
                        </p>
                        <button
                          type="button"
                          className="btn btn-action text-white"
                          onClick={handleButtonClick}
                        >
                          Verify & See KYC Status
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            fill="#fff"
                          >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                          </svg>
                        </button>
                      </div>
                      <div className="col-sm-4 col-4 rsp_pd5">
                        <img
                          src="/assets/images/nico/kyc.png"
                          className="img-fluid float-end"
                          alt="KYC"
                        />
                      </div>
                    </div>
                    <p className="infok">
                      <img
                        src="/assets/images/nico/shield.png"
                        className="img-fluid"
                      />{" "}
                      Your information on Ultrapro is encrypted.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="block-text1">
                    <h6 className="fw600 finter text-capitalize">
                      Document Verification
                    </h6>
                  </div>

                  <div className="row">
                    <div className="col-md-9 col-sm-12 ky_bk1">
                      <p>
                        Your ID document will be scanned for personal data
                        extraction.
                      </p>
                      <form className="cm_kform2">
                        <div className="form-group">
                          <label className="form-label">
                            Document Issuing Country/Region
                          </label>
                          {/* <CountryPicker /> */}
                          <ul className="cm_klis2">
                            <li>
                              <ReactCountryFlag
                                countryCode={country.countryCode}
                                svg
                                style={{
                                  width: '2em',
                                  height: '2em',
                                }}
                              />
                              {/* <img
                                src=''
                                className="img-fluid"
                              /> */}

                              <b> {country.country} ({country.countryCode})</b>
                            </li>
                          </ul>
                        </div>
                        <div className="form-group">
                          <label className="form-label">
                            These Document Needed
                          </label>
                          {country.countryCode === "IN" ? (
                            <ul className="cm_klis2">
                              <li>
                                <img
                                  src="/assets/images/nico/idcard4.png"
                                  className="img-fluid"
                                />
                                Aadhaar card
                              </li>
                              <li>
                                <img
                                  src="/assets/images/nico/idcard5.png"
                                  className="img-fluid"
                                />
                                Pan Card
                              </li>
                              <li>
                                <img
                                  src="/assets/images/nico/idcard6.png"
                                  className="img-fluid"
                                />
                                Selfie Verification
                              </li>
                            </ul>
                          ) : (
                            <ul className="cm_klis2">
                              <li>
                                <img
                                  src="/assets/images/nico/idcard4.png"
                                  className="img-fluid"
                                />
                                National ID Card
                              </li>
                              <li>
                                <img
                                  src="/assets/images/nico/idcard6.png"
                                  className="img-fluid"
                                />
                                Driving Licence
                              </li>
                              <li>
                                <img
                                  src="/assets/images/nico/idcard6.png"
                                  className="img-fluid"
                                />
                                Selfie Verification
                              </li>
                            </ul>
                          )}
                        </div>
                        <div className="form-group">
                          <button
                            type="button"
                            className="btn btn-action text-white"
                            onClick={handleClick1}
                          >
                            Continue
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="col-md-6 col-sm-6 rsp_pd5">
              <div className="cm_faq2">
                <div className="cm_faq1">
                  <h6 className="fw600 finter mt-2 mb-2 text-uppercase">Faq</h6>
                  <div className="flat-accordion">
                    <div
                      className={
                        isActive == 1 ? "flat-toggle active" : "flat-toggle"
                      }
                      onClick={() => handleClick(1)}
                    >
                      <h6 className="toggle-title fs-14 fopsans fw600 black11">
                      What is Identity Verification?
                      </h6>
                      <div
                        className="toggle-content"
                        style={{
                          display: `${isActive == 1 ? "block" : "none"}`,
                        }}
                      >
                        <p>
                        Identity Verification (KYC) is a process where Ultrapro Exchange verifies your identity through personal documents. It's required to access features like withdrawals and rewards.
                        </p>
                      </div>
                    </div>
                    <div
                      className={
                        isActive == 2 ? "flat-toggle active" : "flat-toggle"
                      }
                      onClick={() => handleClick(2)}
                    >
                      <h6 className="toggle-title fs-14 fopsans fw600 black11">
                      Why do I need to complete Identity Verification?
                      </h6>
                      <div
                        className="toggle-content"
                        style={{
                          display: `${isActive == 2 ? "block" : "none"}`,
                        }}
                      >
                        <p>
                        Identity Verification is required to comply with regulations, enhance account security, and unlock key features like withdrawals, bonuses, and rewards.
                        </p>
                      </div>
                    </div>
                    <div
                      className={
                        isActive == 3 ? "flat-toggle active" : "flat-toggle"
                      }
                      onClick={() => handleClick(3)}
                    >
                      <h6 className="toggle-title fs-14 fopsans fw600 black11">
                      Which documents and information are required for Identity Verification?
                      </h6>
                      <div
                        className="toggle-content"
                        style={{
                          display: `${isActive == 3 ? "block" : "none"}`,
                        }}
                      >
                        <p>
                        For Identity Verification, you'll need to provide a valid government-issued ID (National ID), proof of address, and a selfie to confirm your identity.
                        </p>
                      </div>
                    </div>
                    <div
                      className={
                        isActive == 4 ? "flat-toggle active" : "flat-toggle"
                      }
                      onClick={() => handleClick(4)}
                    >
                      <h6 className="toggle-title fs-14 fopsans fw600 black11">
                      Where can I find help for issues regarding Identity Verification?
                      </h6>
                      <div
                        className="toggle-content"
                        style={{
                          display: `${isActive == 4 ? "block" : "none"}`,
                        }}
                      >
                        <p>
                        You can find help in the 'Support' section of Ultrapro Exchange or contact customer service directly for assistance with any Identity Verification issues.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default withAuth(KYC);
