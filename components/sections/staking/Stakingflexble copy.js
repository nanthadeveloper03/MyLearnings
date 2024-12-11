import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { apiRequest } from "@/hooks/apiCall";
import { toast } from "react-toastify";
import { useStaking } from "@/util/StakingContext";
import { formatDate, formatNumber } from "@/util/common";
import { ourCommitments } from "./seperate/stakingCalc.helper";
import Modal from "@/components/modal/Modal";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useRouter } from "next/navigation";


const StakingFlexible = ({ balance, onHit, currentuproPrice,premiumStakePlan}) => {
  const router = useRouter();
  
  const currentPrice = formatNumber(currentuproPrice, 4)
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isHovered, setIsHovered] = useState(null);
  const [showModal2, setShowModal2] = useState(false);
  // const [uproAmount, setUproAmount] = useState();
  // const [monthlyReward, setMonthlyReward] = useState(0);
  // const [rewardPercentage, setRewardPercentage] = useState(0);
  // const [durationDays, setDurationDays] = useState(90);
  const [stakeOffers, setStakeOffers] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [selectedOffers, setSelectedOffers] = useState({});
  const [calculationData, setCalculationData] = useState([]);
  const [calculationPrice, setCalculationPrice] = useState(null);
  const [createLoad, setCreateLoad] = useState(false);
  const [timer, setTimer] = useState(null);


  const stakingFormik = useFormik({
    initialValues: {
      stakeAmount: '',
      voucherCode: '',
      agreementCheckbox: false,
    },
    validationSchema: Yup.object({
      stakeAmount: Yup.number()
        .typeError('Stake Amount must be a number')
        .required('Stake Amount is required')
        .positive('Stake Amount must be a positive number')
        .test(
          'min-stake-amount',
          `Minimum amount is ${formatNumber(selectedOffers.minStakeAmount / currentPrice, 4)}`,
          function (value) {
            const minUsdtAmount = selectedOffers.minStakeAmount;
            const minValue = formatNumber(minUsdtAmount / currentPrice, 4)
            return value >= minValue;
          }
        )
        .test(
          'max-stake-amount',
          `Maximum amount is ${formatNumber(selectedOffers.maxStakeAmount / currentPrice, 4)}`,
          function (value) {
            const maxAmount = selectedOffers.maxStakeAmount;
            const maxValue = formatNumber(maxAmount / currentPrice, 4)
            return value <= maxValue;
          }
        )
        .test(
          'within-balance',
          'Insufficient balance',
          function (value) {

            return value <= balance.spotAsset;


          }
        ),
      // voucherCode: Yup.string()
      //   .required('Voucher Code is required')
      //   .min(6, 'Voucher Code must be at least 6 characters'),
      agreementCheckbox: Yup.boolean()
        .oneOf([true], 'You must agree to the terms'),
    }),
    onSubmit: (values) => {
      createStaking(values)
    },
  });

  const createStaking = async (data) => {
    const postForm = {
      planName: selectedOffers.planName,
      amount: data.stakeAmount,
      usdtValue: calculationPrice,
      couponCode: data.voucherCode,
      uproLastPrice: currentPrice,
      currency: selectedOffers.coinName,
      flexiblePlanId: selectedOffers.flexiblePlanId

    }
    try {
      setCreateLoad(true)
      const response = await apiRequest('/createFlexStakeTokens', postForm);

      if (response?.status) {
        setShowModal2(false)
        stakingFormik.resetForm()
        router.push('/stakinghistory')
      }

    } catch (error) {
      console.error(error);
    } finally {
      setCreateLoad(false)
    }
  }




  useEffect(() => {
    if (timer === null) return;
    if (showModal2 && timer > 0) {
      const countdownInterval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
    if (timer === 0) {
      setShowModal2(false);
    }
  }, [timer, showModal2]);




  async function initLoad() {
    try {
      const response = await apiRequest('/planForFlexible');

      console.log(response,'datadata');
      if (response?.status) {
        
        const data = response?.data ?? [];
        const nonPremiumOffers = data.filter((offer) => offer.isPremium !== 1);
        const premiumOffers = data.filter((offer) => offer.isPremium === 1);
        setStakeOffers(nonPremiumOffers);
        // setStakeOffers(data);
        if (premiumStakePlan) {
          
          premiumStakePlan(premiumOffers);
        }
      }

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    initLoad()
  }, [])





  const handleAmountOnchange = (e) => {
    const amount = e.target.value

    const usdtAmount = amount * currentPrice;
    setCalculationPrice(usdtAmount)
    // stakingFormik.setValues({
    //   stakeAmount: amount
    // })
    stakingFormik.handleChange(e)

  }
  const openFlexibleStake = (data) => {
    if (onHit) {
      onHit()
      setSelectedOffers(data)
      calculationScheema(data)
    }
  }
  const closeModal2 = () => {
    stakingFormik.resetForm()
    setShowModal2(false);
    setCalculationData([])
  }



  const [flatTabs, setFlatTabs] = useState(1)
  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }



  const handleTopup = () => {
    router.push("/deposit/?coin=UPRO");
  }



  const formatDuration = (days) => {
    if (days >= 365) {
      const years = days / 365;
      return `${years} Year${years > 1 ? 's' : ''}`;
    } else {
      const months = Math.round(days / 30);
      return `${months} Month${months > 1 ? 's' : ''}`;
    }
  };

  async function calculationScheema(data) {

    if (data) {
      setLoadingStates((prev) => ({
        ...prev,
        [data._id]: true,
      }));
    }
    try {
      const response = await apiRequest('/flexibleStakingCalculationScheme');

      if (response?.status) {
        setShowModal2(true);
        setCalculationData(response.data ?? []);
        setTimer(600);

      }

    } catch (error) {
      console.error(error);
    } finally {
      if (data) {
        setLoadingStates((prev) => ({
          ...prev,
          [data._id]: false,
        }));
      }
    }
  }


  const handleMaxBalance = () => {
    stakingFormik.setFieldValue('stakeAmount', balance.spotAsset, true);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  return (
    <>
      <section className=''>
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

              return (
                <SwiperSlide key={index} className=''>
                  <div className='plan_bk1 position-relative'
                    onMouseEnter={() => setIsHovered(data.content)}
                    onMouseLeave={() => setIsHovered(null)}
                  >

                    <span className='fre_top'>Flexible Staking</span>

                    <h6>{data.planName}</h6> {/* Show "Month" if 1, otherwise "Months" */}
                    <h3>{data.minStakeAmount} USDT</h3>
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
                          {/* <div
      
    /> */}


                          <span dangerouslySetInnerHTML={{ __html: contentItem.contentLine }}>

                            {/* {contentItem.contentLine} */}
                          </span>
                        </li>

                      ))}

                    </ul>
                    {loadingStates[data._id] ? (
                      <button type='button' className='btn btn_def3 w-100'>Loading...</button>
                    ) : (
                      <>
                        {isAuthenticated ?
                          <button type='button' className='btn btn_def3 w-100' onClick={() => openFlexibleStake(data)}>Stake UPRO</button>
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
         :<h5 className='stk_chd3'>No Record Found...</h5>
        }
        {/* <button onClick={openFlexibleStake}>FLEX</button> */}
      </section>




      <div className="cm_modpop4 stk_conpop stickypop">
        <Modal show={showModal2} onClose={closeModal2}>
          <div className="model-head">
            <h4>
              UPRO Staking
              <span className="closebtn3 cursor-pointer" onClick={closeModal2}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </span>
            </h4>
            <p>UPRO Price Change After: {formatTime(timer)}</p>
          </div>
          <form className="mod_forms1" onSubmit={stakingFormik.handleSubmit} autoComplete="off">
            {/* <div className="mod_inform"> */}
              <div className="justify-content-evenly d-flex flex-wrap gap-2">
                {calculationData.map((data, index) => (
                  <div key={index} className="col">
                    <div className="rat_bx2">
                      <p className="text-dark">{data.durationType}</p>
                      {(() => {
                        // Find the last eligible detail where calculationPrice meets or exceeds stakeUsdtAmount
                        const eligibleDetails = data.streamDetails.filter(
                          (detail) => calculationPrice >= detail.stakeUsdtAmount
                        );
                        // Get the percentage of the last eligible detail
                        const lastPercentage = eligibleDetails.length > 0
                          ? eligibleDetails[eligibleDetails.length - 1].percentage
                          : null;

                        return lastPercentage !== null ? (
                          <h6 className="text-success">
                            {lastPercentage}% <span className="text-muted">(per month)</span>
                          </h6>
                        ) : null;
                      })()}

                    </div>
                  </div>
                ))}

              </div>


              <div className="form-group">
                <label className="form-label">
                  Stake Amount
                </label>
                <div className="input-group flex-nowrap cm_inpop2">

                  <input
                    type="text"

                    className="form-control"
                    placeholder="Enter UPRO amount"
                    name="stakeAmount"
                    value={stakingFormik.values.stakeAmount}
                    onChange={handleAmountOnchange}
                  // onBlur={stakingFormik.handleBlur}
                  />
                  {/* <input type="text" className="form-control" placeholder="Enter Stake Amount" /> */}
                  <span className="input-group-text">
                    <button type="button" className="btn">UPRO</button>
                    <button type="button" className="btn pri_color active" onClick={handleMaxBalance}>MAX</button>
                  </span>
                </div>
                {stakingFormik.touched.stakeAmount && stakingFormik.errors.stakeAmount ? (
                  <div className="error-text">{stakingFormik.errors.stakeAmount}</div>
                ) : null}
              </div>
              <p className="d-flex justify-content-between w-100">Available : {balance?.spotAsset?.toFixed(4) ?? 0} {balance?.spotCurrency ?? 'server busy'} <button type="button" className="btn sbtn1" onClick={handleTopup}>Top up UPRO</button></p>

              <div className="form-group">
                <label className="form-label">
                  Voucher code
                </label>
                <input
                  className="form-control"
                  placeholder="Enter Voucher Code"
                  type="text"
                  name="voucherCode"
                  value={stakingFormik.values.voucherCode}
                  onChange={stakingFormik.handleChange}
                // onBlur={stakingFormik.handleBlur}
                />

                {stakingFormik.touched.voucherCode && stakingFormik.errors.voucherCode ?
                  <div className="error-text">{stakingFormik.errors.voucherCode}</div> : null}
              </div>
              <p className="d-flex justify-content-between w-100">Note : Voucher code is Mandatory for First Staking Only.</p>
              
              <ul className="menu-tab2 d-flex justify-content-evenly">
                <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><a>Summary</a></li>
                <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><a>Product Rule</a></li>
              </ul>

              <div className="flat-tabs">

                <div className="content-tabo">
                  <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>
                    <div className="sum_bx1">
                      <p className="d-flex justify-content-between w-100 sum_cn1">
                        Conversion Ratio
                        <span>1  UPRO ~  {currentPrice} USDT</span>
                      </p>
                      <p className="d-flex justify-content-between w-100 sum_cn1">
                        Monthly Plan
                        <span>Flexible</span>
                      </p>
                      {/* <p className="d-flex justify-content-between w-100 sum_cn1">
                        Est.Total  UPRO Rewards
                        <span className="pri_color">{monthlyReward}</span>
                      </p>
                      <p className="d-flex justify-content-between w-100 sum_cn1">
                        Withdraw UPRO Rewards (per day)
                        <span className="pri_color">4.2</span>
                      </p> */}
                    </div>
                    <p className="d-flex justify-content-between w-100 sum_cn1">Stake Start Date<span>{formatDate(selectedOffers.startDate, 'MMM Do YYYY')}</span></p>
                    <p className="d-flex justify-content-between w-100 sum_cn1">Est. Reward start accounting <span>Flexible (After 90 days)</span></p>
                  </div>
                  <div className="content-inner" style={{ display: flatTabs === 2 ? "block" : "none" }}>
                  {/* <div dangerouslySetInnerHTML={{ __html: selectedOffers.summary }} /> */}
                  <div dangerouslySetInnerHTML={{ __html:selectedOffers.summary}} />
                  </div>
                </div>

              </div>




              <div className="form-group">
                <div className="check_in1">
                  <input
                    className="check_control"
                    type="checkbox"
                    name="agreementCheckbox"
                    checked={stakingFormik.values.agreementCheckbox}
                    onChange={stakingFormik.handleChange}
                  // onBlur={stakingFormik.handleBlur}
                  />
                  <label for="checkbox" className="form-label">
                    I have read and agreed to
                    <a target="_blank" href="/staking-policy/">UPRO Staking Service agreement</a>
                  </label>
                </div>
                {stakingFormik.touched.agreementCheckbox && stakingFormik.errors.agreementCheckbox ? (
                  <div className="error-text">{stakingFormik.errors.agreementCheckbox}</div>
                ) : null}
              </div>
            {/* </div> */}
            <div className="control_btns w-100">
              {createLoad ?
                <button className="btn btn4 btn-action text-white w-100" disabled>Loading...</button>
                :

                <button type="submit" className="btn btn4 btn-action text-white w-100">Confirm</button>
              }

            </div>
          </form>
        </Modal>
      </div>

    </>

  );
};

export default StakingFlexible;
