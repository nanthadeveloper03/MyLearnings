import React, { useEffect, useRef } from 'react';
import Link from "next/link";
import { useState } from "react";
import EyeOffIcon from '@mui/icons-material/VisibilityOff';
import EyeOnIcon from '@mui/icons-material/Visibility';
import { apiRequest } from '@/hooks/apiCall';
import { formatDate } from '@/util/common';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


const FlexibleStaking = () => {
  const router = useRouter()

  const [claimValue, setClaimValue] = useState()
  const [stakingHistory, setStakingHistory] = useState([]);
  const [claimstakingHistory, setClaimStakingHistory] = useState({});
  const [claimLoad, setClaimLoad] = useState(false);
  const [flatTabs1, setFlatTabs1] = useState(1)


  
  const handleFlatTabs1 = (index) => {
    setFlatTabs1(index);
  };
  
  const [flatTabs2, setFlatTabs2] = useState(0)
  const handleFlatTabs2 = (index, stakeData) => {
    setFlatTabs2(index);
    ClaimStatus(stakeData)
    setClaimValue(stakeData)
  };

  const initalDocs = async () => {
    setClaimLoad(true)
    try {
      const response = await apiRequest("/flexStakingHistory");
      if (response?.status) {
        const filteredData = response?.data.filter(row => row.stakePlanType !== 2);
        setStakingHistory(filteredData ?? []);
        ClaimStatus(filteredData[0])
        setClaimValue(filteredData[0])

      }
    } catch (error) {
      console.error(error);
    }
  };

  const ClaimStatus = async (data) => {
    setClaimLoad(true)
    try {
      const response = await apiRequest("/stakingInfo", { stakeId: data._id });
      if (response?.status) {
        setClaimStakingHistory(response?.data ?? []);
        setClaimLoad(false)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    initalDocs();

  }, []);

  const ClaimRewards = async () => {
    if (claimstakingHistory.earningRewards) {
      setClaimLoad(true)
      try {
        const response = await apiRequest("/claimAmount", { stakeId: claimValue._id });
        if (response?.status) {
          setClaimStakingHistory(response?.data ?? {});
          ClaimStatus(claimValue)
        }
      } catch (error) {
        console.error(error);
      } finally {
        setClaimLoad(false)
      }
    } else {
      toast.dismiss()
      toast.error('No more earnings')
    }
  };


  const scrollRef = useRef(null); // To reference the scrollable container
  const [isDragging, setIsDragging] = useState(false); // Track dragging state
  const [startX, setStartX] = useState(0); // Store the initial click X position
  const [scrollLeft, setScrollLeft] = useState(0); // Store initial scroll position

  const handleMouseDown = (e) => {
    const scrollElement = scrollRef.current;
    setIsDragging(true);
    setStartX(e.pageX - scrollElement.offsetLeft); // Get initial click position
    setScrollLeft(scrollElement.scrollLeft); // Get current scroll position
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return; // Do nothing if not dragging
    e.preventDefault();
    const scrollElement = scrollRef.current;
    const x = e.pageX - scrollElement.offsetLeft; // Current mouse position
    const walk = (x - startX) * 2; // The multiplier controls scroll speed
    scrollElement.scrollLeft = scrollLeft - walk; // Update scroll position
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false); // Stop dragging
  };




  return (
    <>
      {stakingHistory.length > 0 ?

        <div className={claimLoad ? 'loading' : ''}>

          <ul className="menu-tab3 d-flex scroll-container" ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}>
            {/* <li className={flatTabs1 === 1 ? "active" : ""} onClick={() => handleFlatTabs1(1)}>Fixed</li>
        <li className={flatTabs1 === 2 ? "active" : ""} onClick={() => handleFlatTabs1(2)}>Flexible</li> */}


            {stakingHistory?.length > 0 &&
              stakingHistory.map((stakeData, index) => (
                <li
                  key={stakeData.stakingId}
                  className={flatTabs2 === index ? "active" : ""}
                  onClick={() => handleFlatTabs2(index, stakeData)}
                >
                  {/* <Link href="#"> */}
                  {" "}
                  {stakeData?.stakeType == 0 ? "Free Stake" : `Stake ${index + 1}`}
                  {/* </Link> */}
                </li>
              ))}
          </ul>

          <div className="flat-tabs">

            <div className="content-tabo">

              <div className="content-inner" style={{ display: `${flatTabs1 === 1 ? "block" : "none"}` }}>

                <div className="row rsp-mma5">
                  <div className="col-md-12 rsp-mpd5">
                    <div className="stak_det w-100">
                      <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">Stake Start Date</span>
                        <span>{claimstakingHistory.stakingInfo && formatDate(claimstakingHistory.stakingInfo.createdAt, 'MMM Do YYYY ,h:mm a')}</span>
                      </div>
                      <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">Lock-in period</span>
                        <span>{claimstakingHistory.stakingInfo && formatDate(claimstakingHistory.stakingInfo.initialLockPeriod, 'MMM Do YYYY, h:mm a')}</span>
                      </div>
                      <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">Status</span>
                        <span className='text-success'>{claimstakingHistory.stakingInfo && claimstakingHistory.stakingInfo.status === 1 ? "Active" : "Matured"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row rsp-mma5">
                  <div className="col-sm-6 rsp-mpd5">
                    <div className="cmrew_bx1">
                      <h6 className="w-100">
                        Main Balance
                        {/* {stakingVisible ?
                      <EyeOnIcon color='muted' className="cursor-pointer mx-1" onClick={() => setStakingVisible(!stakingVisible)} /> :
                      <EyeOffIcon color='muted' className="cursor-pointer mx-1" onClick={() => setStakingVisible(!stakingVisible)} />
                    } */}
                      </h6>
                      <div className="row">
                        <div className="col-sm-12">
                          <h3 className="d-flex flex-nowrap align-items-center">
                            {claimstakingHistory.mainBalance ? claimstakingHistory.mainBalance.toFixed(4) : '0.0000'} <span>UPRO</span>
                          </h3>

                          <div className="d-flex bal_btn_section">
                            {/* <div className="me-2 text-white balance_btn btn1"><button> Redeem </button></div> */}
                            <div className="me-2 balance_btn btn2"><button onClick={() => router.push('/staking')}> Add Stake </button></div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6 rsp-mpd5">
                    <div className="cmrew_bx1">
                      <h6 className="w-100">
                        Earned Rewards
                        {/* {stakingVisible ?
                      <EyeOnIcon color='muted' className="cursor-pointer mx-1" onClick={() => setStakingVisible(!stakingVisible)} /> :
                      <EyeOffIcon color='muted' className="cursor-pointer mx-1" onClick={() => setStakingVisible(!stakingVisible)} />
                    } */}
                      </h6>
                      <div className="row">
                        <div className="col-sm-12">
                          <h3 className="d-flex flex-nowrap align-items-center">
                            {claimstakingHistory.earningRewards
                              ? claimstakingHistory.earningRewards.toFixed(4)
                              : "0.0000"}<span>UPRO</span>
                          </h3>

                          <div className="d-flex bal_btn_section">
                            <div className="me-2 text-white balance_btn btn1" onClick={ClaimRewards}><button> Claim </button></div>
                            <div className="me-2 balance_btn btn2" onClick={() => router.push('/history?claimTab=1')}><button>Claim History</button></div>
                          </div>
                          <div className="d-flex bal_btn_section">
                            {/* <div className="me-2 text-white balance_btn btn1"><button> Redeem </button></div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row rsp-mma5">
                  <div className="col-md-12 rsp-mpd5">
                    <div className="stak_det stak_det_bord w-100">
                      <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">Initial Staked Coin Value (UPRO)</span>
                        <span>{claimstakingHistory.stakingInfo && claimstakingHistory.stakingInfo.amount.toFixed(4)}</span>
                      </div>
                      <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">Initial USDT Value</span>
                        <span>{claimstakingHistory.stakingInfo && claimstakingHistory.stakingInfo.usdtValue.toFixed(4)}</span>
                      </div>
                      {/* <div className="justify-content-between d-flex stk_rwh1 w-100">
                    <span className="text-muted">Flexible Rate</span>
                    <span className="text-warning">12</span>
                  </div> */}
                      <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">Days</span>
                        <span className="text-danger">{claimstakingHistory.stakingInfo && claimstakingHistory.stakingInfo.stakedDays}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="content-inner" style={{ display: `${flatTabs1 === 2 ? "block" : "none"}` }}>

              </div>
            </div>
          </div>

        </div>

        : ''}
    </>
  );
};

export default FlexibleStaking;
