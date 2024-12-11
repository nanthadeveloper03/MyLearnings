import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import Modal from "@/components/modal/Modal";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { handleCopy } from '@/util/common';


const PremiumStaking = ({ sendPremiumStake }) => {

  const [showModal4, setShowModal4] = useState(false);
  const [selectedOffers, setSelectedOffers] = useState({});
  const [data, setData] = useState([])

  const openModal4 = (data) => {
    setSelectedOffers(data)
    setShowModal4(true);
  }
  const closeModal4 = () =>{
    setShowModal4(false);
  }
  const handleSubmit=()=>{
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      selectedOffers.email
    )}&su=Subject&body=Message`;
    window.open(gmailUrl, "_blank");
  }

  const premiumStakeData = sendPremiumStake || []
  console.log(premiumStakeData, '===')



  return (
    <>
      <section>
     
      {premiumStakeData && premiumStakeData.length > 0 ?
        <Swiper
          spaceBetween={10}
          slidesPerView={2}
          loop={false}
          setWrapperSize={true}
          grabCursor={true}
          breakpoints={{
            360: { slidesPerView: 1, loop: false },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
            1201: { slidesPerView: 3 },
          }}
        >

{premiumStakeData.map((data,index) =>  (


    <SwiperSlide key={index} className=''>
      <div className='plan_bk1 position-relative'>
        <span className='fre_top'>Premium Staking</span>
        <h6>{data.stakeName}</h6>
        <h3>{data.minStakeAmount} USDT</h3>
        <p>{data.description}</p>
        <hr />
        <ul className='stk_lis7'>
          {data.content?.map((contentItem) => (
            <li key={contentItem._id}>
              <img src='/assets/images/staking/check.png' className='img-fluid' alt="check" />
              <span>{contentItem.contentLine}</span>
            </li>
          ))}
        </ul>
        
        {/* Wrap the function call in an arrow function to prevent immediate execution */}
        <button
          type='button'
          className='btn btn_def3 w-100'
          onClick={() => openModal4(data)}
        >
          Premium Stake UPRO
        </button>
      </div>
    </SwiperSlide>
))
}

          {/* <SwiperSlide className=''>
            <div className='plan_bk1 position-relative'>
              <span className='fre_top'>premium staking</span>
              <h6>12 Months</h6>
              <h3>$50</h3>
              <p>Stake $50 per month for a full year, optimizing your potential returns while securing stable rewards over time.</p>
              <hr />
              <ul className='stk_lis7'>
                <li><img src='/assets/images/staking/check.png' className='img-fluid' alt="check" /><span>Exclusive Start up Mentoring</span></li>
                <li><img src='/assets/images/staking/check.png' className='img-fluid' alt="check" /><span>24 hours all access</span></li>
                <li><img src='/assets/images/staking/check.png' className='img-fluid' alt="check" /><span>Premium Certificate</span></li>
                <li><img src='/assets/images/staking/check.png' className='img-fluid' alt="check" /><span>Unlimited Source Files</span></li>
                <li><img src='/assets/images/staking/check.png' className='img-fluid' alt="check" /><span>Face to Face Consultant</span></li>
              </ul>
              <button type='button' className='btn btn_def3 w-100' onClick={openModal4}>Stake UPRO</button>
            </div>
          </SwiperSlide> */}
        </Swiper>
       :
       <h5 className='stk_chd3'>No Record Found...</h5>
       }
   
      </section>

      <div className="cm_modpop4 stk_conpop stickypop">
        <Modal show={showModal4} onClose={closeModal4}>
          <div className="model-head text-center position-relative">
            <img src="/assets/images/staking/premium.png" className="img-fluid" />
            <span className="closebtn3 cursor-pointer" onClick={closeModal4}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </span>
          </div>
          <div className="usr_des1">
            <h4>Ultrapro Premium Stake !</h4>
            <p>{selectedOffers.description}</p>
          </div>
          <div className="usr_des2">
            <h3>Document Required</h3>
            <ul>
       
                      <div dangerouslySetInnerHTML={{ __html:selectedOffers.summary}} />
          
               
            
              {/* <li>Lorem ipsum dolor sit amet consectetur. Arcu vivamus tortor duis et congue metus.</li>
              <li>Lorem ipsum dolor sit amet consectetur. Arcu vivamus tortor duis et congue metus.</li>
              <li>Lorem ipsum dolor sit amet consectetur. Arcu vivamus tortor duis et congue metus.</li>
              <li>Lorem ipsum dolor sit amet consectetur. Arcu vivamus tortor duis et congue metus.</li> */}
            </ul>
          </div>
          <form className="mod_forms1">
            <div className="form-group">
            <div className="input-group cm_ingrprem3 flex-nowrap">
              <span className="input-group-text">
                Email
              </span>
              <input className="form-control" value={selectedOffers.email} placeholder="" readOnly type="text" />
              <button type="button" className="btn" onClick={()=>handleCopy(selectedOffers.email)}>
                <img src="/assets/images/staking/copy.png" className="img-fluid" />
              </button>
            </div>
            </div>
            <div className="form-group">
            <div className="control_btns text-center w-100">
              <button type="submit" className="btn btn4 btn-action prem_btn text-white"  onClick={handleSubmit}>Send Mail</button>
            </div>
            </div>
          </form>
        </Modal>
      </div>

    </>

  );
};

export default PremiumStaking;
