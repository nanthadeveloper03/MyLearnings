import React from 'react';
import Link from "next/link";

const SocMedia = () => {
  return (
    <>
      <div className='soc_mediasc'>
        <div className='container'>

          <div className='cm_inthd2'>
            <h3 className='finter fw600 text-white text-capitalize'>
            Connect UPRO through Meta Mask Wallet  
              <span className='rig_con'>
                 <Link target="_blank" href='https://play.google.com/store/apps/details?id=io.metamask&pcampaignid=web_share' type='button' className='btn btn-action text-white fopsans fw600'>
                Connect Now
                </Link> 
              </span>
            </h3>
          </div>

        </div>
      </div>
    </>
  );
};

export default SocMedia;
