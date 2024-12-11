import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { apiRequest } from "@/hooks/apiCall";
import { toast } from "react-toastify";
import { useStaking } from "@/util/StakingContext";
import { formatNumber } from "@/util/common";
import { ourCommitments } from "./seperate/stakingCalc.helper";
import Modal from "@/components/modal/Modal";
import { useRouter } from "next/navigation";

const StakingBanner = ({ isAuthenticated, onHit }) => {
  const [stakingHistory, setStakingHistory] = useState([]);
  const [currentPrice, setCurrentPrice] = useState("");
  const [commitHistory, setCommitHistory] = useState({});
  const router = useRouter()



  const [flatTabs, setFlatTabs] = useState(1)
  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }

  // Function to handle button click and scroll
  const handleScroll = () => {
    const targetSection = document.getElementById("planSection");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openModal = async (data) => {
    try {
      const response = await apiRequest("/uproUsdtPrice");
      console.log(response, "REDDEDED");

      if (response?.status) {
        const price = response?.data?.lastPrice;

        setCurrentPrice(price);
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error..!");
    }
  };

  async function initLoad() {
    try {
      const response = await apiRequest("/stakeList");

      if (response?.status) {
        const filterData=response?.data?.stakeList.filter((data)=>data.status !== 3)
        setStakingHistory(filterData ?? []);
        setCommitHistory(response?.data.commitCalc);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    openModal();
    if (isAuthenticated) {
      initLoad();
    }
  }, []);

  useEffect(() => {
    if (onHit) {
      initLoad();
    }
  }, [onHit]);

  const handleRedeem = () => {
router.push('/stakinghistory')
  };

  const calculateMonths = (startDateStr, endDateStr) => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();
    return months <= 0
      ? "Less than a month"
      : `${months} Month${months > 1 ? "s" : ""}`;
  };

  return (
    <>
      <section className="stak_ban1">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-7">
              <div className="stak_cn1">
                <h3>UPRO Staking</h3>
                <p>Earn daily yield & Utilize your staking</p>
                <ul className="stk_lis1 d-flex flex-wrap algin-items-center gap-2">
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                    Flexible Staking Options
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                    Compounding Rewards
                  </li>
                </ul>
                <ul className="stk_lis1 d-flex flex-wrap algin-items-center gap-2">
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                    Low-Risk Commitment
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                    Ecosystem Growth
                  </li>
                </ul>
                <ul className="d-flex flex-wrap gap-2 stk_lis2">
                  <li>
                    <button
                      type="button"
                      className="btn btn-action text-white"
                      onClick={handleScroll}
                    >
                      Stake UPRO
                    </button>
                  </li>
                  {isAuthenticated && stakingHistory.length > 0 ? (
                    <li>
                      <button
                        type="button"
                        className="btn btn_st1"
                        onClick={handleRedeem}
                      >
                        Redeem
                      </button>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
                <ul className="d-flex flex-wrap gap-4 stk_lis3">
                  {/* <li>
                    <h5>3.04%</h5>
                    <h6>Reference APR <img src='/assets/images/staking/stk1.png' className='img-fluid' /></h6>
                  </li> */}
                  <li>
                    <h5>1 UPRO ≈ {formatNumber(currentPrice,4)} USDT</h5>
                    <h6>
                      Conversion Ratio{" "}
                      <img
                        src="/assets/images/staking/stk2.png"
                        className="img-fluid"
                      />
                    </h6>
                  </li>
                  {/* <li>
                    <h5>1,536,503.46 UPRO</h5>
                    <h6>Total Value Staked <img src='/assets/images/staking/stk1.png' className='img-fluid' /></h6>
                  </li> */}
                </ul>

         

              </div>
            </div>

            <div className="col-md-5">
              {/* Conditionally render stk_im1 based on isImageVisible */}
              {!isAuthenticated && (
                <div className="stk_im1">
                  <img
                    src="/assets/images/staking/stakingcoin.png"
                    className="img-fluid"
                  />
                </div>
              )}

              {/* Conditionally render stk_valbx1 when isImageVisible is false */}
              {isAuthenticated && stakingHistory.length > 0 ? (
                <>

                  {stakingHistory.length > 0 && (
        

                    <div className="stk_valbx1">
                      <div className="row rsp-mma5">
                        <div className="col-md-6 col-6 rsp-mpd5">
                          <h6 className="w-100">
                            Initial Asset ({stakingHistory[0]?.coin})
                            {/* <img src='/assets/images/staking/Show.png' className='img-fluid' /> */}
                            {/* <Link href="#" className='float-end'>
                                  <img src='/assets/images/staking/history.png' />
                                </Link> */}
                          </h6>
                          {/* <h5>{stakingHistory[0].stakedUPROAmount.toFixed(4)}</h5> */}
                          <h5 className="text-muted pri_color">
                            {formatNumber(
                              stakingHistory[0]?.stakedUPROAmount,
                              commitHistory?.decimalPoint
                            )}
                          </h5>
                          {/* <h5 className='text-muted text-success'>10%</h5> */}
                        </div>
                        {
                          (stakingHistory[0]?.stakeType !== 0) && (
                            <div className="col-md-6 col-6 rsp-mpd5">
                              <h6 className="w-100">
                                Commitment Asset ({stakingHistory[0].coin})
                              </h6>
                              {/* <h5>Coming soon</h5> */}
                              {/* <h5 className='text-muted pri_color'>{commitHistory.marketCommitment.toFixed(4)}</h5> */}
                              <h5 className="text-muted pri_color">
                                {/* {formatNumber(
                              commitHistory?.marketUproAsset,
                              commitHistory?.decimalPoint
                            )} */}

                                {formatNumber(
                                  ourCommitments(
                                    commitHistory?.marketPrice,
                                    stakingHistory[0]?.initinalUSDTamount,
                                    stakingHistory[0]?.stakedUPROAmount
                                  ),
                                  commitHistory?.decimalPoint
                                )}

                              </h5>
                            </div>
                          )
                        }

                      </div>
                      <hr />
                      <ul className="d-flex flex-wrap justify-content-evenly align-items-start stk_lis10 gap-5">
                        <li className="flex-fill text-start">
                          <p>Stake Plan</p>
                          <h3 className="pri_color">
                            {calculateMonths(
                              stakingHistory[0]?.stakingStart,
                              stakingHistory[0]?.stakingEnd
                            )}

                          </h3>
                        </li>
                        <li className="flex-fill text-start">
                          <p>Initial Amt</p>
                          <h3 className="text-white">
                            {stakingHistory[0]?.initinalUSDTamount} USDT
                          </h3>
                        </li>
                        <li className="flex-fill text-start">
                          <p>Total PNL</p>
                          {/* <h3 className='text-success'>+{commitHistory.pnl.toFixed(2)}%</h3> */}
                          <h3
                            className={
                              commitHistory?.pnl >= 0
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {formatNumber(commitHistory?.pnl, 2)}%
                          </h3>
                        </li>

                        {/* <li className="flex-fill text-start">
                          <p>Current Amt</p>
                          <h3 className='text-white'>$55</h3>
                        </li> */}
                      </ul>
                      <ul className="d-flex flex-wrap stk_lis11 gap-5">
                        {/* <li>
                          <Link href="#">Analysis</Link>
                        </li>*/}
                        <li>
                          {/* <Link href="/stakingassets">View More</Link> */}
                          <Link href="/stakinghistory">View More</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className="stk_im1">
                  <img
                    src="/assets/images/staking/stakingcoin.png"
                    className="img-fluid"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>


     

   

    </>

  );
};

export default StakingBanner;
