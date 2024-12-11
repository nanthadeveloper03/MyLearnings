import React from 'react';
import Link from "next/link";

const SocMedia = () => {
  return (
    <>
    <section className="download_section">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-xl-6 col-md-6 col-sm-5">
              <div className="download__image">
                <img src="/assets/images/conmeta/conbann2.png" alt="" />
              </div>
            </div>
            <div className="col-xl-6 col-md-6 col-sm-7">
              <div
                className="download__content"
              >
                <p className="decript">Download Wallet</p>
                <h3 className="heading">
                Trade on the go. <br />
                Anywhere, anytime.
                </h3>

                <div className="qrcode_row">
                  <img src="/assets/images/canopro_qrcode.svg" />
                  <div>
                    <p>Scan to Download App</p>
                    <h5 className="text-capitalize">IOS and Android</h5>
                  </div>
                </div>

                <div className="group-button">
                  <Link href="https://metamask.io/" target='_blank' title="coming soon">
                    <img src='/assets/images/conmeta/soc1.png' className='img-fluid' />
                    <span>Website</span>
                  </Link>
                  <Link href="https://play.google.com/store/apps/details?id=io.metamask&pcampaignid=web_share" target='_blank' title="coming soon">
                    <img src='/assets/images/conmeta/soc3.png' className='img-fluid' />
                    <span>Android</span>
                  </Link>
                  <Link href="https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202" target='_blank' title="coming soon">
                    <img src='/assets/images/conmeta/soc2.png' className='img-fluid' />
                    <span>IOS</span>
                  </Link>                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SocMedia;
