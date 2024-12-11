import React from 'react';
import Link from "next/link";

const StakingFeatures = () => {
  return (
    <>
    <section className='sfeat_sc1'>
      <div className='container'>
        <h3 className='stk_chd1'>Key Features of UPRO Staking</h3>
        <div className='row rsp-mma5'>
          <div className='col-md-4 rsp-mpd5'>
            <div className='stk_bx1'>
              <img src='/assets/images/staking/features1.png' className='img-fluid' />
              <h5>Guaranteed Profit Percentage</h5>
              <p>Get a fixed profit percentage on your staked UPRO, ensuring reliable returns.  </p>
            </div>
          </div>
          <div className='col-md-4 rsp-mpd5'>
            <div className='stk_bx1'>
              <img src='/assets/images/staking/features2.png' className='img-fluid' />
              <h5>Live Updates</h5>
              <p>Access real-time updates on your staked UPRO and track your profits easily.</p>
            </div>
          </div>
          <div className='col-md-4 rsp-mpd5'>
            <div className='stk_bx1'>
              <img src='/assets/images/staking/features3.png' className='img-fluid' />
              <h5>Assured Profit</h5>
              <p>Stake UPRO for guaranteed profits, making your investment journey simple and rewarding.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
     
    </>
  );
};

export default StakingFeatures;
