import React, { useEffect } from 'react';
import Link from "next/link";
import { useState } from "react";
import Modal from "@/components/modal/Modal";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { toast } from 'react-toastify';
import { apiRequest } from '@/hooks/apiCall';
import { date } from 'yup';
import { formatDate } from '@/util/common';
import { useRouter } from 'next/navigation';
import { useStaking } from '@/util/StakingContext';
import { useSelector } from 'react-redux';
import PremiumStaking from './PremiumStaking';

import StakingFlexible from './Stakingflexble';
import StakingFlexibleMinimum from './Stakingflexble_minimum';

const StakingPlan = ({ balance, onSuccess, maintanenceProp }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const freePopup = useSelector((state) => state?.auth?.user);
  const router = useRouter();

  const [flatTabs, setFlatTabs] = useState(4)
  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }

  const [premiumStakeData, setPremiumStakeData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tradeLoad, setTradeLoad] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});
  const [timer, setTimer] = useState(null);

  const [stakeOffers, setStakeOffers] = useState([]);

  const [selectedOffers, setSelectedOffers] = useState({});

  const [currentPrice, setCurrentPrice] = useState({
    oneCoinPrice: '',
    calculativePrice: ''
  });

  const [enteredVoucher, setEnteredVoucher] = useState('');
  const [voucherError, setVoucherError] = useState('');
  const [isHovered, setIsHovered] = useState(null);

  const openModal = async (data) => {
    if (data) {
      setLoadingStates((prev) => ({
        ...prev,
        [data.stakeOff_Id]: true,
      }));
      setSelectedOffers(data)
    }
    try {
      const response = await apiRequest('/uproUsdtPrice');
      console.log(response, 'responseresponseresponse');

      if (response?.status) {
        if (data) {
          setShowModal(true);
        }
        console.log(response?.data?.lastPrice, 'response?.data?.lastPrice');

        const price = response?.data?.lastPrice
        const uproPrice = data?.minstake / price

        setCurrentPrice((prev) => ({
          ...prev,
          calculativePrice: uproPrice.toFixed(4),
          oneCoinPrice: price
        }));

        setTimer(600);

      }
    } catch (error) {
      console.error(error);
      toast.error('Internal Server Error..!')
    } finally {
      if (data) {
        setLoadingStates((prev) => ({
          ...prev,
          [data.stakeOff_Id]: false,
        }));
      }
    }

  }

  const closeModal = () => {
    setEnteredVoucher('')
    if (onSuccess) {
      onSuccess(false);
    }
    setShowModal(false);
  }

  async function initLoad() {
    try {
      const response = await apiRequest('/stakeOfferList');

      if (response?.status) {
        setStakeOffers(response?.data ?? []);
      } else if (response?.data.maintenance === 1) {
        if (maintanenceProp) {
          maintanenceProp(response.data);
        }
      }

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    initLoad()
  }, [])

  const handleVoucherChange = (e) => {
    const value = e.target.value;
    setEnteredVoucher(value);

    if (value === '') {
      setVoucherError('Voucher Code Required');
    } else {
      setVoucherError('');
    }
  };

  const handleSubmit = async () => {

    const checkbox = document.getElementById('checkbox');

    if (selectedOffers?.stakeType !== 0 && enteredVoucher === '') {

      setVoucherError('Voucher Code Required')
      return;
    }

    if (!checkbox.checked) {
      // setCheckError(true)
      toast.dismiss()
      toast.error('You must agree to the staking service agreement.');
      return;
    }

    if (parseFloat(currentPrice.calculativePrice) > parseFloat(balance.spotAsset)) {
      toast.dismiss()
      toast.error('Insufficient balance to stake the desired amount.');
      return;
    }

    try {
      setTradeLoad(true)
      const postForm = {
        planPrice: selectedOffers.minstake,
        couponCode: enteredVoucher,
        stakedAmount: currentPrice.calculativePrice,
        usdCurrentPrice: currentPrice.oneCoinPrice,
        stakeType: Number(selectedOffers.stakeType)
      }

      const response = await apiRequest('/createStake', postForm);
      if (response.status) {
        if (onSuccess) {
          onSuccess(true);
        }
        setEnteredVoucher('')
        setShowModal(false)
      }

    } catch (error) {
      toast.error('An error occurred while staking.');
    } finally {
      setTradeLoad(false)
    }
  };

  const handleTopup = () => {
    router.push("/deposit/?coin=UPRO");
  }

  const durationCalculate = (dure) => {
    const months = Math.round(dure / 30);
    return months
  }

  const handleNavigate = () => {
    router.push("/login");
  }

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (timer === null) return;
    if (showModal && timer > 0) {
      const countdownInterval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
    if (timer === 0) {
      setShowModal(false);
    }
  }, [timer, showModal]);


  const handlePremium = (data) => {
    console.log(data, "PREMIUMSTAKE");
    setPremiumStakeData(data)

  }
  return (
    <>
      <section className='plan_sc1' id="planSection">
        <h5 className='stk_chd2'>STAKING PLAN</h5>
        {/* {stakeOffers && stakeOffers.length > 0 ? ( */}
        <>
          <h3 className='stk_chd3'>Enhance the experience at the right price.</h3>
          <h6 className='stk_chd4'>Various prices to suit your experience and needs</h6>
        </>
        {/* // ) : (<h5 className='stk_chd3'>No Record Found...</h5>)} */}

        <div className='row d-flex justify-content-center align-items-center'>
          <div className='col-lg-6 col-md-8 col-sm-10'>
            <ul className="menu-stk d-flex justify-content-evenly">
              <li className={flatTabs === 4 ? "active" : ""} onClick={() => handleFlatTabs(4)}><a>Minimal</a></li>
              <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><a>Flexible</a></li>
               {/* <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><a>Airdrop</a></li> */}
              <li className={flatTabs === 3 ? "active" : ""} onClick={() => handleFlatTabs(3)}><a>Premium</a></li>

            </ul>

          </div>
        </div>


        <div className="flat-tabs">

          <div className="content-tabo">
            <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>


              <StakingFlexible balance={balance} onHit={openModal} currentuproPrice={currentPrice.oneCoinPrice} premiumStakePlan={handlePremium} />
            </div>

            <div className="content-inner" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>

              {stakeOffers && stakeOffers.length > 0 ?
                <Swiper
                  spaceBetween={10}
                  slidesPerView={2}
                  loop={false}
                  setWrapperSize={true} // Ensure wrapper resizes to fit slides
                  grabCursor={true}
                  breakpoints={{
                    360: { slidesPerView: 1, loop: false },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 2 },
                    1201: { slidesPerView: 3 },
                  }}
                >

                  {stakeOffers && stakeOffers.length > 0 ? (
                    stakeOffers.map((data, index) => {
                      const months = Math.round(data.duration / 30);

                      return (
                        <SwiperSlide key={index} className=''>
                          <div className='plan_bk1 position-relative'
                            onMouseEnter={() => setIsHovered(data.content)}
                            onMouseLeave={() => setIsHovered(null)}
                          >

                            {data.stakeType === 0 && <span className='fre_top'>Airdrop Staking</span>}

                            <h6>{data.stakeName}</h6> {/* Show "Month" if 1, otherwise "Months" */}
                            <h3>{data.minstake} USDT</h3>
                            <p>{data.description}</p>
                            <hr />
                            <ul className='stk_lis7'>
                              {data.content?.map((contentItem, contentIndex) => (
                                <li key={contentItem._id}>
                                  <img src='/assets/images/staking/check.png' className='img-fluid' alt="check" />
                                  {/*<span               
                            style={{
                          //    display: 'inline-block',
                            //  whiteSpace: isHovered === data.content ? 'normal' : 'nowrap',
                            //  overflow: 'hidden',
                            //  textOverflow: 'ellipsis',
                            //  maxWidth: isHovered === data.content ? 'none' : '150px',
                            //  cursor: 'pointer'
                            }}
                          >
                            { // contentItem.contentLine }
                          </span> */}
                                  <span>
                                    {contentItem.contentLine}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            {loadingStates[data.stakeOff_Id] ? (
                              <button type='button' className='btn btn_def3 w-100'>Loading...</button>
                            ) : (
                              <>
                                {isAuthenticated ?
                                  <button type='button' className='btn btn_def3 w-100' onClick={() => openModal(data)}>Stake UPRO</button>
                                  :
                                  <button type='button' className='btn btn_def3 w-100' onClick={handleNavigate}>Login</button>
                                }
                              </>
                            )}
                          </div>
                        </SwiperSlide>
                      );
                    })
                  ) : (
                    ""
                  )}
                </Swiper>
                : <h5 className='stk_chd3'>No Record Found...</h5>}
            </div>
            <div className="content-inner" style={{ display: `${flatTabs === 3 ? "block" : "none"}` }}>
              <PremiumStaking sendPremiumStake={premiumStakeData} />

            </div>

            <div className="content-inner" style={{ display: `${flatTabs === 4 ? "block" : "none"}` }}>
              <StakingFlexibleMinimum balance={balance} onHit={openModal} currentuproPrice={currentPrice.oneCoinPrice} premiumStakePlan={handlePremium} />
            </div>
          </div>
        </div>
      </section>

      <div className="cm_modpop3 stickypop">
        <Modal show={showModal} onClose={closeModal}>
          <div className="model-head">
            <h4>
              Staking
              <span className="closebtn3 cursor-pointer" onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </span>
            </h4>
            <p>UPRO Price Change After: {formatTime(timer)}</p>
          </div>
          <form className="mod_forms1">
            {/* <div className="mod_inform"> */}
            <div className="form-group">
              <label className="form-label">
                Stake Amount
              </label>
              <div className="input-group flex-nowrap cm_inpop1">
                <input type="text" className="form-control" placeholder="" value={selectedOffers?.minstake} disabled />
                <span className="input-group-text">
                  USDT
                </span>
              </div>

              <p className='d-flex justify-content-between w-100'>Available : {balance?.spotAsset?.toFixed(4) ?? 0} {balance?.spotCurrency ?? 'server busy'} <button type='button' className='btn sbtn1' onClick={handleTopup}>Top up UPRO</button></p>

            </div>
            {selectedOffers?.stakeType !== 0 ?

              <div className="form-group">
                <label className="form-label">Voucher Code</label>

                <div className="input-group flex-nowrap cm_inpop1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Voucher Code"
                    value={enteredVoucher}
                    onChange={handleVoucherChange}
                  />
                </div>
                <span className='text-danger'>{voucherError && voucherError}</span>
              </div>
              : ''
            }
            <div className="form-group">
              <label className="form-label">
                Stake Required Amount
              </label>
              <div className="input-group flex-nowrap cm_inpop1">
                <input type="text" className="form-control" placeholder=""
                  value={
                    currentPrice?.calculativePrice !== undefined && !isNaN(currentPrice.calculativePrice)
                      ? Number(currentPrice.calculativePrice).toFixed(4)
                      : '0.0000'
                  }
                  disabled />
                <span className="input-group-text">
                  UPRO
                </span>
              </div>

            </div>
            <h6>Summary</h6>
            <div className='sum_bx1'>
              <p className='d-flex justify-content-between w-100 sum_cn1'>Conversion Ratio <span>1  UPRO ~ {currentPrice?.oneCoinPrice} USDT</span></p>
              <p className='d-flex justify-content-between w-100 sum_cn1'>Plan<span>{durationCalculate(selectedOffers.duration)} Month</span></p>
              {selectedOffers?.stakeType !== 0 &&
                <p className='d-flex justify-content-between w-100 sum_cn1'>Reference APR <span>100%</span></p>
              }
            </div>

            <p className='d-flex justify-content-between w-100 sum_cn1'>Start Date <span>{formatDate(selectedOffers.startDate, 'MMM Do YYYY')}</span></p>
            <p className='d-flex justify-content-between w-100 sum_cn1'>End Date <span>{formatDate(selectedOffers.endDate, 'MMM Do YYYY')}</span></p>

            <ul className='stk_mlis1'>
              {selectedOffers.content && selectedOffers.content.length > 0 ? (
                selectedOffers.content.map((data, index) => (
                  <li key={index}>
                    {data.contentLine}
                  </li>
                ))
              ) : (
                <li>No offers available</li>
              )}

            </ul>

            <div className='form-group'>
              <div className='check_in1'>
                <input type='checkbox' id='checkbox' className='check_control' />
                <label htmlFor='checkbox' className='form-label'>
                  I have read and agreed to <Link href="/staking-policy" target='_blank'>UPRO Staking Service agreement</Link>
                </label>
              </div>
            </div>
            {/* </div> */}

            <div className="control_btns w-100">
              {tradeLoad ? (
                <button type='button' className='btn btn_def3 w-100'>Loading...</button>

              ) : (

                <button type='button' className='btn btn_def3 w-100' onClick={handleSubmit}>Confirm</button>
              )}
            </div>
          </form>
        </Modal>
      </div>

    </>
  );
};

export default StakingPlan;
