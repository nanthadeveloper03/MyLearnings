import React from 'react';
import Link from "next/link";

const ProbCommunity = () => {
  return (
    <>
    <div className='container'>
      <div className="row justify-content-center comsoc_sc1">
      <div className="col-md-10 rsp_w100">

        <div className="com_midhd rsp_w100">
          <div className='cm_inthd2 text-center'>
            <h3 className='finter fw600'>
             Join the
             <span className='pri_color'>Community,</span> 
             and Succeed together
            </h3>
            <p className='fopsans fw400'> 
            Be part of a dynamic group and advance your blockchain knowledge. 
            Success is a team effort with us. 
            </p>
          </div>
        </div>

        <div className='d-flex flex-wrap justify-content-evenly gap-3 com_soclis'>
          <div className='com_soc text-center'>
          <Link href="https://www.instagram.com/probinar.offl/" target='_blank'>
              <div className='cs_ico d-flex justify-content-center align-items-center'>
                <img src='/assets/images/probinacademy/soc1.png' className='img-fluid' />
              </div>
              Instagram
            </Link>
          </div>
          <div className='com_soc text-center'>
          <Link href="https://www.facebook.com/Probinar.offl" target='_blank'>
              <div className='cs_ico d-flex justify-content-center align-items-center'>
                <img src='/assets/images/probinacademy/soc2.png' className='img-fluid' />
              </div>
              Facebook
            </Link>
          </div>
          <div className='com_soc text-center'>
            <Link href="https://www.youtube.com/@probinar" target='_blank'>
              <div className='cs_ico d-flex justify-content-center align-items-center'>
                <img src='/assets/images/probinacademy/soc3.png' className='img-fluid' />
              </div>
              YouTube
            </Link>
          </div>
          <div className='com_soc text-center'>
          <Link href="https://www.linkedin.com/company/probinar/" target='_blank'>
              <div className='cs_ico d-flex justify-content-center align-items-center'>
                <img src='/assets/images/probinacademy/soc4.png' className='img-fluid' />
              </div>
              LinkedIn
            </Link>
          </div>
          <div className='com_soc text-center'>
          <Link href="https://twitter.com/i/flow/login?redirect_after_login=%2FProbinar_offl" target='_blank'>
              <div className='cs_ico d-flex justify-content-center align-items-center'>
                <img src='/assets/images/probinacademy/soc5.png' className='img-fluid' />
              </div>
              Twitter
            </Link>
          </div>
        </div>

      </div>
    </div>
    </div>
    </>
  );
};

export default ProbCommunity;
