import React, { useEffect, useRef } from 'react';
import Link from "next/link";
import { useState } from "react";
import EyeOffIcon from '@mui/icons-material/VisibilityOff';
import EyeOnIcon from '@mui/icons-material/Visibility';
import { apiRequest } from '@/hooks/apiCall';
import { formatDate, formatNumber } from '@/util/common';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Modal from "@/components/modal/Modal";

const ReferralStaking = ({ onCount, referApi }) => {

  const router = useRouter()

  const [claimValue, setClaimValue] = useState()
  const [stakingHistory, setStakingHistory] = useState([]);
  const [claimstakingHistory, setClaimStakingHistory] = useState({});
  const [claimLoad, setClaimLoad] = useState(false);
  const [flatTabs1, setFlatTabs1] = useState(1)
  const [referralValue, setReferralValue] = useState({})
  const [claimRewardsValue, setClaimRewardsValue] = useState()
  const [currentPrice, setCurrentPrice] = useState();

  // Define stakingVisible in the state
  const [stakingVisible, setStakingVisible] = useState(false);
  const [stakingVisible1, setStakingVisible1] = useState(false);
  const [stakingVisible2, setStakingVisible2] = useState(false);



  const handleFlatTabs1 = (index) => {
    setFlatTabs1(index);
  };

  const [flatTabs2, setFlatTabs2] = useState(0)
  const handleFlatTabs2 = (index, stakeData) => {

    setFlatTabs2(index);
    ClaimStatus(stakeData)
    setClaimValue(stakeData)
  };



  const initCurrentPrice = async (data) => {

    try {
      const response = await apiRequest('/uproUsdtPrice');

      if (response?.status) {
        const price = response?.data?.lastPrice
        setCurrentPrice(formatNumber(price, 4));



      }
    } catch (error) {
      console.error(error);
      toast.error('Internal Server Error..!')
    } finally {

    }

  }
  const initalDocs = async () => {
    setClaimLoad(true)
    try {
      const response = await apiRequest("/flexStakingHistory");

      if (response?.status) {
        const filteredData = response?.data.filter(row => row.stakePlanType === 2);
        setStakingHistory(filteredData ?? []);
        ClaimStatus(filteredData[0])
        setClaimValue(filteredData[0])
      }
    } catch (error) {
      console.error(error);
    }
  };
  const referralIntialValue = async () => {
    setClaimLoad(true)
    try {
      const response = await apiRequest("/referralReward");

      if (response?.status) {
        setReferralValue(response.data)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setClaimLoad(false)
    }
  };


  const ClaimStatus = async (data) => {

    setClaimLoad(true)
    try {
      const response = await apiRequest("/ownClaimReferral", { stakeId: data._id });
      if (response?.status) {
        setClaimStakingHistory(response?.data ?? {});
        setClaimLoad(false)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    referralIntialValue();
    initalDocs();
    initCurrentPrice()

  }, []);
  useEffect(() => {
    referralIntialValue();
  }, [referApi]);


  const ClaimRewards = async (lastPrice) => {

    // if (claimRewardsValue === 0) {
    //   if (claimstakingHistory.ownerEarnings <= 0.0001) {
    //     toast.dismiss();
    //     toast.error("No more Claims for Earnings");
    //     return;
    //   }
    // }
    // if (claimRewardsValue === 1) {
    //   if (referralValue.referralUSDTEarnings <= 0.0001) {
    //     toast.dismiss();
    //     toast.error("No more Claims for Earnings");
    //     return;
    //   }
    // }
    setShowModal2(false)
    setClaimLoad(true);
    const postForm = {
      stakeId: claimstakingHistory.stakingInfo._id,
      rewardType: claimRewardsValue,
      holdStatus: claimRewardsValue,
      claimedAmount: lastPrice
    }

    try {
      const response = await apiRequest("/finalClaim", postForm);
      if (response?.status) {
        setClaimStakingHistory(response?.data ?? {});
        ClaimStatus(claimValue);
        referralIntialValue()
      }
    } catch (error) {
      console.error(error);
    } finally {
      setClaimLoad(false);
    }
  };


  // To reference the scrollable container
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
  const openModal1 = () => setShowModal1(true);
  const closeModal1 = () => setShowModal1(false);

  const [showModal2, setShowModal2] = useState(false);
  const openModal2 = (values) => {
    if (values === 0) {
      if (claimstakingHistory.ownerEarnings <= 0.0001) {
        toast.dismiss();
        toast.error("No more Claims for Earnings");
        return;
      }
    }
    if (values === 1) {
      if (referralValue.referralUSDTEarnings <= 0.0001) {
        toast.dismiss();
        toast.error("No more Claims for Earnings");
        return;
      }
    }
    setShowModal2(true);
    setClaimRewardsValue(values)
  }
  const closeModal2 = () => setShowModal2(false);

  return (
    <>
      {stakingHistory.length > 0 ?
        <div className={claimLoad ? 'loading' : ''}>
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
                        <span className="text-muted">State Maturity Date</span>
                        <span>{claimstakingHistory.stakingInfo && formatDate(claimstakingHistory.stakingInfo.initialLockPeriod, 'MMM Do YYYY, h:mm a')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="d-flex cmrew_b2 flex-wrap gap-5 w-100">
                  <li className='crb1'>
                    <div className="cmrew_in">
                      <h5 className="w-100">
                        Claimed Rewards (USDT)
                        {/* {stakingVisible ? (
                      <EyeOnIcon
                        color="muted"
                        className="cursor-pointer mx-1"
                        onClick={() => setStakingVisible(!stakingVisible)}
                      />
                    ) : (
                      <EyeOffIcon
                        color="muted"
                        className="cursor-pointer mx-1"
                        onClick={() => setStakingVisible(!stakingVisible)}
                      />
                    )} */}
                      </h5>
                      <div className="row">
                        <div className="col-sm-12">
                          <h3 className="d-flex flex-nowrap align-items-center">
                            {claimstakingHistory.mainBalance ? claimstakingHistory.mainBalance : '0.0000'}
                            <span> USDT</span>
                          </h3>
                          {/* <h6> ≈ 200 UPRO</h6> */}
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className='crb2'>
                    <div className="cmrew_in">
                      <h5 className="w-100">
                        Earned Balance (USDT)
                        {/* {stakingVisible1 ?
                      <EyeOnIcon color='muted' className="cursor-pointer mx-1" onClick={() => setStakingVisible1(!stakingVisible1)} /> :
                      <EyeOffIcon color='muted' className="cursor-pointer mx-1" onClick={() => setStakingVisible1(!stakingVisible1)} />
                    } */}
                      </h5>
                      <div className="row">
                        <div className="col-sm-12">
                          <h3 className="d-flex flex-nowrap align-items-center">
                            {claimstakingHistory.ownerEarnings ? claimstakingHistory.ownerEarnings.toFixed(4) : '0.0000'}
                          </h3>
                          {/* <h6> ≈ {claimstakingHistory.mainUproAmount ? claimstakingHistory.mainUproAmount.toFixed(4) : '0.0000'} UPRO</h6> */}
                          <div className='w-100'>
                            {/* <button type='button' className='btn btn_ofill' onClick={()=>ClaimRewards(0)}>Claim</button> */}
                            <button type='button' className='btn btn_ofill' onClick={() => openModal2(0)}>Claim</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className='crb3'>
                    <div className="cmrew_in">
                      <h5 className="w-100">
                        Referral Rewards (USDT)
                        {/* {stakingVisible2 ?
                      <EyeOnIcon color='muted' className="cursor-pointer mx-1" onClick={() => setStakingVisible2(!stakingVisible2)} /> :
                      <EyeOffIcon color='muted' className="cursor-pointer mx-1" onClick={() => setStakingVisible2(!stakingVisible2)} />
                    } */}
                      </h5>
                      <div className="row">
                        <div className="col-sm-12">
                          <h3 className="d-flex flex-nowrap align-items-center">
                            {/* {claimstakingHistory.referralEarnings ? claimstakingHistory.referralEarnings.toFixed(4) : '0.0000'} */}
                            {referralValue.referralUSDTEarnings ? referralValue.referralUSDTEarnings.toFixed(4) : '0.0000'}

                          </h3>
                          {/* <h6> ≈ {referralValue.referralUPROEarnings ? referralValue.referralUPROEarnings.toFixed(4) : '0.0000'} UPRO</h6> */}
                          <div className='w-100'>
                            <button type='button' className='btn btn_ofill' onClick={() => openModal2(1)}>Claim</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  {/* <li className='crb4'>
                <div className='w-100'>
                  <button type='button' className='btn btn_oline'>Redeem</button>
                </div>
                <div className='w-100'>
                  <button type='button' className='btn btn_ofill' onClick={openModal1}>Claim</button>
                </div>
              </li> */}

                </ul>

                <div className="row rsp-mma5">
                  <div className="col-md-12 rsp-mpd5">
                    <div className="stak_det stak_det_bord w-100">
                      {/* <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">Initial Staked Coin Value (UPRO)</span>
                        <span>{claimstakingHistory.stakingInfo && claimstakingHistory.stakingInfo.amount.toFixed(4)}</span>
                      </div> */}
                      <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">Initial Staked Coin Value (USDT)</span>
                        <span>{claimstakingHistory.stakingInfo && claimstakingHistory.stakingInfo.usdtValue.toFixed(4)}</span>
                      </div>
                      <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">Staked Days</span>
                        <span>{claimstakingHistory.stakingInfo && claimstakingHistory.stakingInfo?.stakedDays}</span>
                      </div>
                      {/* <div className="justify-content-between d-flex stk_rwh1 w-100">
                    <span className="text-muted">Monthly Rate</span>
                    <span className='text-success'>10%</span>
                  </div> */}
                      {/* <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">Referral Count</span>
                        <span>{onCount ? onCount : '0'}</span>
                      </div> */}
                      <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">Earned rewards (USDT)</span>
                        <span className="text-warning">{claimstakingHistory.ownerEarnings && claimstakingHistory.ownerEarnings}</span>
                      </div>
                      <div className="justify-content-between d-flex stk_rwh1 w-100">
                        <span className="text-muted">Claimed Rewards (USDT)</span>
                        <span>{claimstakingHistory.claimedRewards && claimstakingHistory.claimedRewards}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="content-inner" style={{ display: `${flatTabs1 === 2 ? "block" : "none"}` }}>

              </div>
            </div>
          </div>



          <div className="cm_modpop6">
            <Modal show={showModal1} onClose={closeModal1}>
              <div className="model-head position-relative">
                <h4>
                  <span className="flex_typ">Claim Your Rewards</span>
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
                  <div className="check_in1">
                    <label className="form-label" htmlFor="Referral Rewards">Referral Rewards</label>
                    <input
                      type="radio"
                      className="check1"
                      name="rewards"
                      aria-labelledby="Referral Rewards"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="check_in1">
                    <label className="form-label" htmlFor="Earned Rewards">Earned Rewards</label>
                    <input
                      type="radio"
                      className="check1"
                      name="rewards"
                      aria-labelledby="Earned Rewards"
                    />
                  </div>
                </div>
                <div className="form-group text-center">
                  <button type="button" className="btn btn-action claim_btn text-white">Claim</button>
                </div>
              </form>
            </Modal>
          </div>

          <div className="cm_modpop6">
            <Modal show={showModal2} onClose={closeModal2}>
              <div className="model-head position-relative">
                <h4>
                  <span className="flex_typ">Claim Your Rewards</span>
                  <span className="closebtn3 cursor-pointer" onClick={closeModal2}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                      <path
                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                  </span>
                </h4>
              </div>
              <form className="mod_forms1">

                <div className='claim_cn'>
                  {/* <h4>{claimRewardsValue === 0 ? 'Earned' : 'Referral'} Rewards</h4> */}

                  <label className="form-label">
                    {claimRewardsValue === 0 ? 'Earned' : 'Referral'} Rewards
                  </label>

                  <div className="input-group flex-nowrap cm_inpop2">

                    <input
                      type="text"

                      className="form-control"
                      placeholder="Enter UPRO amount"
                      readOnly

                      value={claimRewardsValue === 0 ? formatNumber(claimstakingHistory.ownerEarnings, 4) : formatNumber(referralValue.referralUSDTEarnings, 4)}
                    />
                    <span className="input-group-text">
                      USDT
                    </span>

                  </div>
                  <span className=''>1 UPRO = {currentPrice} USDT</span>
                  <div>
                    <label className="form-label mt-4">
                      Receive UPRO
                    </label>
                    <div className="input-group flex-nowrap cm_inpop2">

                      <input
                        type="text"

                        className="form-control"
                        placeholder="Enter UPRO amount"
                        readOnly
                        value={claimRewardsValue === 0 ? formatNumber(claimstakingHistory.ownerEarnings / currentPrice, 4) : formatNumber(referralValue.referralUSDTEarnings / currentPrice, 4)}
                      />
                      <span className="input-group-text">
                        UPRO
                      </span>

                    </div>
                  </div>
                  <span className='error' style={{ color: '#FF8300' }}>Note : The UPRO has been deposited in your spot wallet</span>



                </div>

                <div className="form-group text-center">
                  <button type="button" className="btn btn-action claim_btn text-white"
                    onClick={() => ClaimRewards(
                      claimRewardsValue === 0
                        ? formatNumber(claimstakingHistory.ownerEarnings / currentPrice, 4)
                        : formatNumber(referralValue.referralUSDTEarnings / currentPrice, 4)
                    )}
                  >Claim</button>
                </div>
              </form>
            </Modal>
          </div>

        </div>
        : ''}
    </>
  );
};



export default ReferralStaking;
