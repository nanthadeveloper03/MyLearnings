import React from 'react';
import { useSelector } from "react-redux";
import Link from "next/link";

const SocMedia = () => {
  
  const { siteSocialLinks } = useSelector((state) => state.block);

  return (
    <>
    <div className='soc_mediasc'>
    <div className='container'>
      <div className="row justify-content-center comsoc_sc1">
      <div className="col-md-12 rsp_w100">

        <div className="com_midhd rsp_w100">
          <div className='cm_inthd2 text-center'>
            <div className='row justify-content-center align-items-center'>
              <div className='col-md-10 rsp_w100'>             
            <h3 className='finter fw600 text-white text-capitalize'>
              Follow Our <span className='pri_color'>6 Official Social Media</span> Accounts and Claim <span className='pri_color'>2 USDT!</span>
            </h3>
            </div>
            </div>
          </div>
        </div>

        <div className='d-flex flex-wrap justify-content-evenly gap-2 com_soclis'>
          <div className='com_soc text-center'>
          <Link href={siteSocialLinks && siteSocialLinks.instaLink || '#'} target="_blank">
              <div className='cs_ico d-flex justify-content-center align-items-center'>
                <img src='/assets/images/socialbonanza/soc1.png' className='img-fluid' />
              </div>
              Instagram
            </Link>
          </div>
          <div className='com_soc text-center'>
          <Link href={siteSocialLinks && siteSocialLinks.fbLink || '#'} target="_blank">
              <div className='cs_ico d-flex justify-content-center align-items-center'>
                <img src='/assets/images/socialbonanza/soc2.png' className='img-fluid' />
              </div>
              Facebook
            </Link>
          </div>
          <div className='com_soc text-center'>
            <Link href={siteSocialLinks && siteSocialLinks.youtubeLink || '#'} target="_blank">
              <div className='cs_ico d-flex justify-content-center align-items-center'>
                <img src='/assets/images/socialbonanza/soc3.png' className='img-fluid' />
              </div>
              YouTube
            </Link>
          </div>
          <div className='com_soc text-center'>
          <Link href={siteSocialLinks && siteSocialLinks.linkedLink || '#'} target="_blank">
              <div className='cs_ico d-flex justify-content-center align-items-center'>
                <img src='/assets/images/socialbonanza/soc4.png' className='img-fluid' />
              </div>
              LinkedIn
            </Link>
          </div>
          <div className='com_soc text-center'>
          <Link href={siteSocialLinks && siteSocialLinks.twitLink || '#'} target="_blank">
              <div className='cs_ico d-flex justify-content-center align-items-center'>
                <img src='/assets/images/socialbonanza/soc5.png' className='img-fluid' />
              </div>
              Twitter
            </Link>
          </div>
          <div className='com_soc text-center'>
          <Link href={siteSocialLinks && siteSocialLinks.telegramLink || '#'} target="_blank">
              <div className='cs_ico d-flex justify-content-center align-items-center'>
                <img src='/assets/images/socialbonanza/soc6.png' className='img-fluid' />
              </div>
              Telegram
            </Link>
          </div>
          {/* <div className='com_soc text-center'>
          <Link href="https://www.trustpilot.com/review/ultraproex.com" target="_blank">
              <div className='cs_ico d-flex justify-content-center align-items-center'>
                <img src='/assets/images/socialbonanza/trustlogo.png' className='img-fluid' />
              </div>
              Trustpilot
            </Link>
          </div> */}
        </div>


        </div>

    </div>
    </div>
    </div>
    </>
  );
};

export default SocMedia;
