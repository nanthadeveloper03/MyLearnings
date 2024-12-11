import React from 'react';
import Link from "next/link";

const MetaBanner = () => {
  return (
    <>
      <section className="bonan_bann1">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-7 col-sm-7">
              <div className="bon_cnb1">
                <div className="cban_hd text-uppercase finter text-white fw600">Metamask</div>
                <h1 className="title finter fw600">How to Connect <span className='pri_color'>UPRO</span> to <span className='pri_color'>MetaMask</span> Wallet</h1>
                <p>MetaMask allows you to easily manage your Upro coins directly from your wallet. Follow the simple steps below to connect your Upro to MetaMask and start managing your assets with ease. </p>
                <ul className='d-flex flex-wrap gap-3 soc_bontp'>
                  <li>
                  <Link href="https://play.google.com/store/apps/details?id=io.metamask&pcampaignid=web_share" target='_blank'>
                    <img src='/assets/images/conmeta/gp1.png' className='img-fluid' />
                  </Link>
                  </li>
                  <li>
                  <Link href="https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202" target='_blank'>
                    <img src='/assets/images/conmeta/as1.png' className='img-fluid' />
                  </Link>
                  </li>
                </ul>                
              </div>
            </div>
            <div className='col-md-5 col-sm-5'>
              <div className='soc_bim'>
                <img src='/assets/images/conmeta/conbann1.gif' className='img-fluid' />
                <div className='metaim'>                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MetaBanner;
