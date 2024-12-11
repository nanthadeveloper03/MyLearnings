import React from 'react';
import Link from "next/link";

const CommunityInn = ({ socialLinks }) => {

  return (
    <div className="row justify-content-center comsoc_sc1">
      <div className="col-md-11 rsp_w100">

        <div className="com_midhd rsp_w100">
          <div className='cm_inthd2 text-center'>
            <h3 className='finter fw600'>
              Engage with the <span className='pri_color'>Ultrapro Exchange</span> Global Network
            </h3>
            <p className='fopsans fw400'> Become a member of the Ultrapro Global Network to access expert insights from our dedicated team, and enjoy 24/7 online customer support!</p>
          </div>
        </div>

        <div className='d-flex flex-wrap justify-content-evenly gap-3 com_soclis'>
          <div className='com_soc text-center'>
            <Link href={socialLinks.instaLink || '#'} target='_blank'>
              <div className='cs_ico d-flex justify-content-center align-items-center'>
                <img src='/assets/images/community/soc1.png' className='img-fluid' />
              </div>
              Instagram
            </Link>
          </div>
          <div className='com_soc text-center'>
            <Link href={socialLinks.fbLink || '#'} target='_blank'>
              <div className='cs_ico d-flex justify-content-center align-items-center'>
                <img src='/assets/images/community/soc2.png' className='img-fluid' />
              </div>
              Facebook
            </Link>
          </div>
          <div className='com_soc text-center'>
            <Link href={socialLinks.youtubeLink || '#'} target='_blank'>
              <div className='cs_ico d-flex justify-content-center align-items-center'>
                <img src='/assets/images/community/soc3.png' className='img-fluid' />
              </div>
              YouTube
            </Link>
          </div>
          <div className='com_soc text-center'>
            <Link href={socialLinks.linkedLink || '#'} target='_blank'>
              <div className='cs_ico d-flex justify-content-center align-items-center'>
                <img src='/assets/images/community/soc4.png' className='img-fluid' />
              </div>
              LinkedIn
            </Link>
          </div>
          <div className='com_soc text-center'>
            <Link href={socialLinks.twitLink || '#'} target='_blank'>
              <div className='cs_ico d-flex justify-content-center align-items-center'>
                <img src='/assets/images/community/soc5.png' className='img-fluid' />
              </div>
              Twitter
            </Link>
          </div>
          <div className='com_soc text-center'>
            <Link href={socialLinks.telegramLink || '#'} target='_blank'>
              <div className='cs_ico d-flex justify-content-center align-items-center'>
                <img src='/assets/images/community/soc6.png' className='img-fluid' />
              </div>
              Telegram
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CommunityInn;
