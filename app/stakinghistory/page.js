"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import stakinghistory from "./stakinghistory.css";
import Link from "next/link";
import StakingTable from "@/components/sections/stakingassets/StakingTable";
import FlexibleStaking from "@/components/sections/stakinghistory/FlexibleStaking";
import FlexibleHistory from "@/components/sections/stakinghistory/FlexibleHistory";
import ClaimedHistory from "@/components/sections/stakinghistory/MinimulClaimHistory";


import MinimalStaking from "@/components/sections/stakinghistory/MinimalStaking";
import ReferralHistory from "@/components/sections/stakinghistory/ReferralHistory";
import MinimalEarnHistory from "@/components/sections/stakinghistory/MinimumEarnHistory";

import Modal from "@/components/modal/Modal";

import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { apiRequest } from "@/hooks/apiCall";
import { formatNumber, formatDate, handleCopy } from "@/util/common";
import {
  commitmentsGraph,
  currentUSDTValueCalc,
  fullfilledCommites,
  initialUSDTValueCalc,
  ourCommitments,
  pnl,
} from "../../components/sections/staking/seperate/stakingCalc.helper";
import { useRouter } from "next/navigation";

export default function StakingHistory() {
  const router = useRouter()
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isTheme } = useSelector((state) => state.auth);
  // const [flatTabs, setFlatTabs] = useState(0);
  const [stakingHistory, setStakingHistory] = useState([]);
  const [stakingHistoryTable, setStakingHistoryTable] = useState([]);

  
  const [commitHistory, setCommitHistory] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [msrLoad, setMsrLoad] = useState(false);
  const [redeamLoad, setRedeamLoad] = useState(false);

  
  const [msrCode, setMsrCode] = useState('');
  const [timeDifference, setTimeDifference] = useState("");

  const [flatTabs, setFlatTabs] = useState(1)
  const handleFlatTabs = (index) => {
    setFlatTabs(index);
  };

  const initalDocs = async () => {
    try {
      const response = await apiRequest("/stakeList");
      
      if (response?.status) {
        const filterData=response?.data?.stakeList.filter((data)=>data.status !== 3)
        setStakingHistory(filterData ?? []);
        setStakingHistoryTable(response?.data?.stakeList)
        setCommitHistory(response?.data.commitCalc ?? {});
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      initalDocs();
    }
  }, [isAuthenticated]);

  const dateAndTime = (date) => {
    if (date) {
      return formatDate(date, "MMM Do YYYY, h:mm a");
    }
    return "-";
  };

  useEffect(() => {
    // Function to check the current mode
    const checkMode = () => {
      if (document.body.classList.contains("is_dark")) {
        setIsDarkMode(true);
      } else if (document.body.classList.contains("is_light")) {
        setIsDarkMode(false);
      }
    };

    // Check initially when component mounts
    checkMode();

    // Optionally: observe body class changes if it's dynamic
    const observer = new MutationObserver(() => {
      checkMode();
    });

    // Observe the body for class changes
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Cleanup on unmount
    return () => observer.disconnect();
  }, []);
  const [flatTabs2, setFlatTabs2] = useState(0)
  const handleFlatTabs2 = (index) => {
    setFlatTabs2(index);
  };

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    const scrollElement = scrollRef.current;
    setIsDragging(true);
    setStartX(e.pageX - scrollElement.offsetLeft);
    setScrollLeft(scrollElement.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const scrollElement = scrollRef.current;
    const x = e.pageX - scrollElement.offsetLeft;
    const walk = (x - startX) * 2;
    scrollElement.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false); // Stop dragging
  };


  // Modal
  const [showModal1, setShowModal1] = useState(false);

  const closeModal1 = () => setShowModal1(false);

  const [flatTabsub, setFlatTabsub] = useState(1)
  const handleFlatTabsub = (index) => {
    setFlatTabsub(index);
  };

  const handleMCRcodeGenerate = async () => {
    setMsrLoad(true)
    try {
      const response = await apiRequest("/referralVoucherCode");
      if (response?.status) {
        setMsrCode(response.data?.couponCode)
        setShowModal1(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setMsrLoad(false)

    }
  }
  const [referralCount,setReferralCount]=useState()
  const [referralApi,setReferralApi]=useState()

const handleSendCount=(data)=>{
  setReferralCount(data)
}
const handleReferApi=(data)=>{
  setReferralApi(data)
}




const handleShare = (platform) => {
  let shareUrl = '';
  const encodedMsrCode = encodeURIComponent(msrCode);

  switch (platform) {
    case 'whatsapp':
      shareUrl = `https://wa.me/?text=${encodedMsrCode}`;
      break;
    case 'telegram':
      shareUrl = `https://t.me/share/url?url=${encodedMsrCode}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedMsrCode}`;
      break;
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedMsrCode}`;
      break;
    case 'instagram':
      // Instagram doesn't have a direct web share link; consider alternatives
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${encodedMsrCode}`;
      break;
    default:
      break;
  }

  if (shareUrl) {
    window.open(shareUrl, '_blank');
  }
};
useEffect(() => {
  const calculateTimeDifference = () => {
    const endDate = new Date(stakingHistory[flatTabs2]?.stakingEnd);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const differenceInMs = endDate - currentDate;
    const isFuture = differenceInMs > 0;

    // Check if the end date has passed
    if (!isFuture) {
      setTimeDifference("true");
      return;
    }

    // Calculate remaining days, hours, minutes, seconds
    const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((differenceInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((differenceInMs % (1000 * 60)) / 1000);

    setTimeDifference(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  };

  calculateTimeDifference();
  const interval = setInterval(calculateTimeDifference, 1000);

  return () => clearInterval(interval);
}, [stakingHistory, flatTabs2]);
const handleRedeam = async (data) => {

  setRedeamLoad(true)
  try {
    const response = await apiRequest("/stake/redeem",{stakingId:data.stakingId});
    if (response?.status) {

      initalDocs()
    }
  } catch (error) {
    console.error(error);
  } finally {

    setRedeamLoad(false)
  }
}
  return ( 
    <DashboardLayout>
      <div className="user_balance_dashboard mb-4">
        <div className="block-text1">
          <h4 className="fw600 finter text-capitalize w-100">
            Stake Portfolio
            <ul className="d-flex flex-wrap float-end gap-2">
              <li>
                <button type="button" className="btn btn_ref1" onClick={()=>router.push('/staking')}>Add Stake</button>
              </li>
              <li>
                <button type="button" className={`btn btn_ref1 ${msrLoad && 'loading'}`} onClick={handleMCRcodeGenerate}><img src="/assets/images/staking/Add User.png" className="img-fluid" /> Invite MSR Code</button>
              </li>
            </ul>
          </h4>
        </div>
        {/* <div className="block-text1 pb-3 pt-0 custom-title">
          <h4 className="fw600 finter text-capitalize m-0">Stake Portfolio</h4>
        </div> */}

        <ul className="menu-tab2 d-flex">
          <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><a>Fixed</a></li>
          <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><a>Flexible</a></li>
          <li className={flatTabs === 3 ? "active" : ""} onClick={() => handleFlatTabs(3)}><a>Minimal</a></li>
        </ul>

        {/* <ul className="menu-tab2 d-flex"> */}
        {/* {stakingHistory?.length > 0 &&
            stakingHistory.map((stakeData, index) => (
              <li
                key={stakeData.stakingId}
                className={flatTabs === index ? "active" : ""}
                onClick={() => handleFlatTabs(index)}
              >
                <Link href="#">
                  {" "}

                </Link>
              </li>
            ))} */}
        {/* </ul> */}

        <div className="flat-tabs">

          <div className="content-tabo">
            {flatTabs !== null && stakingHistory.length > 0 && (
              <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>

                <ul className="menu-tab3 d-flex scroll-container" ref={scrollRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUpOrLeave}
                  onMouseLeave={handleMouseUpOrLeave}>
                  {stakingHistory?.length > 0 &&
                    stakingHistory.map((stakeData, index) => (
                      <li
                        key={stakeData.stakingId}
                        className={flatTabs2 === index ? "active" : ""}
                        onClick={() => handleFlatTabs2(index)}
                      >
                        <Link href="#">
                          {" "}
                          {stakeData?.stakeType == 0 ? "Free Stake" : `Stake ${index + 1}`}
                        </Link>
                      </li>
                    ))}
                  {/* <li className={flatTabs2 === 1 ? "active" : ""} onClick={() => handleFlatTabs2(1)}>AirDrop Stake</li>
                  <li className={flatTabs2 === 2 ? "active" : ""} onClick={() => handleFlatTabs2(2)}>Stake 1</li>
                  <li className={flatTabs2 === 3 ? "active" : ""} onClick={() => handleFlatTabs2(3)}>Stake 2</li> */}
                </ul>



                {/* <div className="content-inner" style={{ display: "block" }}> */}
                <div className={`row rsp-mma5 ${redeamLoad && 'loading'}`}>
                  <div className="col-md-12 rsp-mpd5">
                    <div className="stak_det w-100">
                      <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">Stake Maturity Date</span>
                        {/* <span>16-Oct-2024 03:49 am</span> */}
                        <span>
                          {dateAndTime(stakingHistory[flatTabs2]?.stakingStart)}
                        </span>
                        {/* <span>{formatDate(stakingHistory[flatTabs2]?.stakingStart, 'MMM Do YYYY, h:mm a')}</span> */}
                      </div>
                      <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">Stake Maturity Date</span>
                        <span>
                          {dateAndTime(stakingHistory[flatTabs2]?.stakingEnd)}
                        </span>
                      </div>
                      <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">REDEEM </span>
                        <span>


                          {timeDifference==='true' ? 
                          <button type="button" className="btn btn_ref1" onClick={()=>handleRedeam(stakingHistory[flatTabs2])}>Redeem Stake</button>
                          :
                          (timeDifference)
                        }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row rsp-mma5">
                  <div className="col-md-6 rsp-mpd5">
                    <div className="stak_det stak_det_bord w-100">
                      <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">
                          Initial Staked Coin (
                          {stakingHistory[flatTabs2]?.coin})
                        </span>
                        <span>
                          {formatNumber(
                            stakingHistory[flatTabs2]?.stakedUPROAmount,
                            commitHistory?.decimalPoint
                          )}
                        </span>
                      </div>
                      {/* <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">Initial Plan Amount</span>
                        <span>
                          {stakingHistory[flatTabs2]?.initinalUSDTamount || 0}
                        </span>
                      </div> */}
                      <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">Initial USDT Value</span>
                        <span>{stakingHistory[flatTabs2]?.initinalUSDTamount || 0}</span>
                        {/* <span>
                          {formatNumber(
                            initialUSDTValueCalc(
                              stakingHistory[flatTabs2]?.initinalUSDTamount,
                              stakingHistory[flatTabs2]?.stakedUSDTamount
                            ),
                            2
                          )}
                        </span> */}
                      </div>
                      <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">Current USDT Value</span>
                        <span className="text-warning">
                          {formatNumber(
                            currentUSDTValueCalc(
                              commitHistory.marketPrice,
                              stakingHistory[flatTabs2]?.stakedUPROAmount
                            ),
                            commitHistory?.decimalPoint
                          )}
                        </span>
                      </div>
                      <div className="justify-content-between d-flex stk_rwh1 w-100">
                        {stakingHistory[flatTabs2]?.stakeType === 0 ? <span className="text-muted">PNL</span> : <span className="text-muted">Growth</span>}
                        {/* <span className="text-success">+15%</span> */}
                        {pnl(
                          commitHistory.marketPrice,
                          stakingHistory[flatTabs2]?.stakedUPROAmount,
                          stakingHistory[flatTabs2]?.stakedUSDTamount
                        ) > 0 ? (
                          <span className="text-success">
                            {formatNumber(
                              pnl(
                                commitHistory.marketPrice,
                                stakingHistory[flatTabs2]?.stakedUPROAmount,
                                stakingHistory[flatTabs2]?.stakedUSDTamount
                              ),
                              2
                            )}{" "}
                            %
                          </span>
                        ) : (
                          <span className="text-danger">
                            {formatNumber(
                              pnl(
                                commitHistory.marketPrice,
                                stakingHistory[flatTabs2]?.stakedUPROAmount,
                                stakingHistory[flatTabs2]?.stakedUSDTamount
                              ),
                              2
                            )}{" "}
                            %
                          </span>
                        )}

                        {/* <span className="text-success">{formatNumber(pnl(commitHistory.marketPrice, stakingHistory[flatTabs2]?.stakedUPROAmount, stakingHistory[flatTabs2]?.stakedUSDTamount), 2)} %</span> */}
                      </div>

                      {
                        (stakingHistory[flatTabs2]?.stakeType !== 0) && (
                          <>
                            <div className="justify-content-between d-flex stk_rwh1 w-100">
                              <span className="text-muted">
                                Our Commitments ({stakingHistory[flatTabs2]?.coin})
                              </span>
                              <span>
                                {formatNumber(
                                  ourCommitments(
                                    commitHistory?.marketPrice,
                                    stakingHistory[flatTabs2]?.initinalUSDTamount,
                                    stakingHistory[flatTabs2]?.stakedUPROAmount
                                  ),
                                  commitHistory?.decimalPoint
                                )}
                              </span>
                            </div>

                            <div className="justify-content-between d-flex stk_rwh1 w-100">
                              <span className="text-muted">
                                Our Commitments Fulfilled
                              </span>
                              {
                                fullfilledCommites(
                                  commitHistory?.marketPrice,
                                  stakingHistory[flatTabs2]?.stakedUSDTamount,
                                  stakingHistory[flatTabs2]?.initinalUSDTamount
                                ) > 0 ?
                                  <span className="text-success">
                                    {formatNumber(
                                      fullfilledCommites(
                                        commitHistory?.marketPrice,
                                        stakingHistory[flatTabs2]?.stakedUSDTamount,
                                        stakingHistory[flatTabs2]?.initinalUSDTamount
                                      ),
                                      2
                                    )} %
                                  </span>
                                  :
                                  <span className="text-danger">
                                    {formatNumber(
                                      fullfilledCommites(
                                        commitHistory?.marketPrice,
                                        stakingHistory[flatTabs2]?.stakedUSDTamount,
                                        stakingHistory[flatTabs2]?.initinalUSDTamount
                                      ),
                                      2
                                    )} %
                                  </span>
                              }
                            </div>
                          </>
                        )
                      }
                    </div>
                  </div>
                  <div className="col-md-6 rsp-mpd5">
                    <div className="stk_prog">
                      {/* <h5>{stakingHistory[flatTabs2]?.stakeType == 1 ? 'Our Commitments Fulfilled': 'Growth Overview' } </h5> */}
                      <h5>{stakingHistory[flatTabs2]?.stakeType === 0 ? 'Growth Overview' : 'Our Commitments Fulfilled'} </h5>
                      <div className="circ_cont_prog d-flex flex-wrap gap-2 justify-content-center align-items-center">
                        <div className="cm_circle_container d-flex justify-content-center align-items-center">
                          {/* <div 
                              className="cm_circle" 
                              style={{ 
                                background: `conic-gradient(var(--black8) 0% ${
                                 100 - (fullfilledCommites(commitHistory?.marketPrice, stakingHistory[flatTabs]?.stakedUSDTamount,  stakingHistory[flatTabs]?.initinalUSDTamount))
                                }%, var(--primary) ${0}% 100%)`
                              }}>
                            </div> */}
                          {/* <div 
                              className="cm_circle" 
                              style={{ 
                                background: `conic-gradient(${isDarkMode && "#fff" }var(--black8) 0% ${
                                 commitmentsGraph(commitHistory?.marketPrice, stakingHistory[flatTabs]?.stakedUSDTamount,  stakingHistory[flatTabs]?.initinalUSDTamount)
                                }%, var(--primary) ${0}% 100%)`
                              }}>
                            </div> */}

                          <div
                            className="cm_circle"
                            style={{
                              background: `conic-gradient(${isDarkMode ? "#fff" : "var(--black8)"
                                } 0% ${commitmentsGraph(
                                  commitHistory?.marketPrice,
                                  stakingHistory[flatTabs2]?.stakedUSDTamount,
                                  stakingHistory[flatTabs2]?.initinalUSDTamount
                                )}%, var(--primary) ${0}% 100%)`,
                            }}
                          ></div>

                          {/* <div
                            className="cm_circle"
                            style={{
                              background: `conic-gradient(var(--black8) 0% 80%, var(--primary) 50% 100% )`,
                              // background: `conic-gradient(var(--primary) 50% 100%, var(--black8) 0% 10%, )`,
                            }}
                          ></div> */}
                          <div className="cm_inner_circle d-flex justify-content-center align-items-center">
                            <span className="progress-text">
                              {stakingHistory[flatTabs2]?.coin}
                            </span>
                          </div>
                        </div>

                        <div className="circ_prog_txt">
                          <p>
                            {/* <span className="circ_fd pri_color"></span> {stakingHistory[flatTabs]?.stakeType == 1 ? 'Fulfilled': 'Profit' } */}
                            <span className="circ_fd pri_color"></span> {stakingHistory[flatTabs2]?.stakeType === 0 ? 'Profit' : 'Fulfilled'}

                          </p>
                          <p>
                            {/* <span className="circ_fd mut_color"></span> */}
                            <span className={'circ_fd mut_color'} style={{ background: `${isDarkMode ? '#fff' : 'var(--black8)'}` }}></span>
                            {/* {stakingHistory[flatTabs]?.stakeType == 1 ? 'Unfulfilled': 'Loss' } */}
                            {stakingHistory[flatTabs2]?.stakeType === 0 ? 'Loss' : 'Unfulfilled'}

                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="content-inner" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>
              <FlexibleStaking />
            </div>

            <div className="content-inner" style={{ display: `${flatTabs === 3 ? "block" : "none"}` }}>
              <MinimalStaking onCount={referralCount} referApi={referralApi}/>
            </div>

          </div>
        </div>

        {/* <div className="block-text1">
          <h5 className="fw600 finter text-capitalize w-100 rev_hd1">
            Staking History
          </h5>
        </div> */}

        <div className="row">

          {/* {flatTabs === 1 ?

            <div className="col-md-12">
              <StakingTable isTheme={isTheme} />
            </div>
            :
            <div className="col-md-12">
              <FlexibleHistory isTheme={isTheme} />
            </div>
          } */}

          {
            flatTabs === 1 ?
              <div className="col-md-12">
                <div className="block-text1">
                  <h5 className="fw600 finter text-capitalize w-100 rev_hd1">
                    Staking History
                  </h5>
                </div>
                <StakingTable history={stakingHistoryTable} commitHistory={commitHistory}/>
              </div>
              : flatTabs === 2 ?
                <div className="col-md-12">
                  <div className="block-text1">
                    <h5 className="fw600 finter text-capitalize w-100 rev_hd1">
                      Staking History
                    </h5>
                  </div>
                  <FlexibleHistory isTheme={isTheme}/>
                </div>
                : flatTabs === 3 ?
                  <div className="col-md-12">

                    <ul className="menu-tab2 d-flex">
                      <li className={flatTabsub === 1 ? "active" : ""} onClick={() => handleFlatTabsub(1)}><a>Referral Rewards</a></li>
                      <li className={flatTabsub === 2 ? "active" : ""} onClick={() => handleFlatTabsub(2)}><a>Staking History</a></li>
                      <li className={flatTabsub === 3 ? "active" : ""} onClick={() => handleFlatTabsub(3)}><a>Claimed History</a></li>

                    </ul>

                    <div className="flat-tabs">
                      <div className="content-tabo">
                        <div className="content-inner" style={{ display: `${flatTabsub === 1 ? "block" : "none"}` }}>
                          <ReferralHistory isTheme={isTheme} onHit={handleSendCount} onReferralApi={handleReferApi}/>
                        </div>
                        <div className="content-inner" style={{ display: `${flatTabsub === 2 ? "block" : "none"}` }}>
                          <FlexibleHistory isTheme={isTheme} tab={2}/>
                        </div>
                        <div className="content-inner" style={{ display: `${flatTabsub === 3 ? "block" : "none"}` }}>
                          <ClaimedHistory isTrue={flatTabsub === 3}/>
                        </div>
                      </div>
                    </div>

                    {/* <ReferralHistory isTheme={isTheme} /> */}
                  </div>
                  : null
          }
        </div>
      </div>

      <div className="cm_modpop5">
        <Modal show={showModal1} onClose={closeModal1}>
          <div className="model-head position-relative">
            <h4>
              <span className="flex_typ">MSR Code</span>
              <span className="closebtn3 cursor-pointer" onClick={closeModal1}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </span>
            </h4>
          </div>
          <form className="mod_forms1">
      <div className="form-group">
        <div className="input-group cm_ingrpre1 flex-nowrap">
          <input className="form-control" placeholder="MSR Code" readOnly type="text" value={msrCode} />
          <button type="button" className="btn" onClick={() => handleCopy(msrCode)}>
            <img src="/assets/images/staking/copy-icon1.png" className="img-fluid" alt="Copy" />
          </button>
        </div>
      </div>
      <h4>Share To</h4>
      <div className="d-flex flex-row soc_reflis gap-2">
        <button onClick={() => handleShare('whatsapp')} className="d-flex flex-fill justify-content-center align-items-center soc_icoref">
          <img src="/assets/images/referral/whatsapp.png" className="img-fluid" alt="WhatsApp" />
        </button>
        <button onClick={() => handleShare('telegram')} className="d-flex flex-fill justify-content-center align-items-center soc_icoref">
          <img src="/assets/images/referral/telegram.png" className="img-fluid" alt="Telegram" />
        </button>
        <button onClick={() => handleShare('linkedin')} className="d-flex flex-fill justify-content-center align-items-center soc_icoref">
          <img src="/assets/images/referral/linkedin.png" className="img-fluid" alt="LinkedIn" />
        </button>
        <button onClick={() => handleShare('facebook')} className="d-flex flex-fill justify-content-center align-items-center soc_icoref">
          <img src="/assets/images/referral/facebook.png" className="img-fluid" alt="Facebook" />
        </button>
        <button onClick={() => handleShare('instagram')} className="d-flex flex-fill justify-content-center align-items-center soc_icoref">
          <img src="/assets/images/referral/instagram.png" className="img-fluid" alt="Instagram" />
        </button>
        <button onClick={() => handleShare('twitter')} className="d-flex flex-fill justify-content-center align-items-center soc_icoref">
          <img src="/assets/images/referral/twit.png" className="img-fluid" alt="Twitter" />
        </button>
      </div>
    </form>
        </Modal>
      </div>

    </DashboardLayout>

  );
}
