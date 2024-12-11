import React from 'react';
import Link from "next/link";

const SocBanner = () => {
  return (
    <>
      <section className="bonan_bann1">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 col-sm-7">
              <div className="bon_cnb1">
                <div className="cban_hd text-uppercase finter text-white fw600">Rewards</div>
                <h1 className="title finter fw600">Claim Your <span className='pri_color'>2 USDT</span> Social Media Reward Now!</h1>
                <p>Follow us on social media to unlock rewards. Stay engaged and receive exclusive bonuses for your support. </p>
                <ul className='d-flex flex-wrap gap-3 soc_bontp'>
                  <li>
                  <Link href={process.env.NEXT_PUBLIC_APK_URL} target="_blank">
                    <img src='/assets/images/socialbonanza/gp1.png' className='img-fluid' />
                  </Link>
                  </li>
                  <li>
                  <Link href="#" title="coming soon">
                    <img src='/assets/images/socialbonanza/as1.png' className='img-fluid' />
                  </Link>
                  </li>
                </ul>                
              </div>
            </div>
            <div className='col-md-6 col-sm-5'>
              <div className='soc_bim'>
                <img src='/assets/images/socialbonanza/socban.png' className='img-fluid' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SocBanner;
