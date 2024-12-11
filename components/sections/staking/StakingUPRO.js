import React from 'react';
import Link from "next/link";

const StakingUPRO = () => {
  return (
    <>
      <section className='stak_ban2'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <div className='stak_cn2'>
                <h3>What is UPRO?</h3>
                <p>UPRO is the native cryptocurrency of the Ultrapro Blockchain. In the past year, we distributed nearly 2 million UPROs through airdrops and honored it at values ranging from 1 cent to 10 cents. Now officially launched at 80 cents, With UPRO staking, users can earn rewards as the value of UPRO grows.    
                </p>
                {/* <ul className='stk_lis4 d-flex flex-wrap algin-items-center gap-3'>
                  <li>
                  <img src='/assets/images/staking/stk3.png' className='img-fluid' />                  
                  Contract on : UPRO | Smart Chain 
                  </li>
                  <li>
                  <img src='/assets/images/staking/stk4.png' className='img-fluid' />
                  Audit Report 
                  </li>
                </ul> */}
                
                <ul className='d-flex flex-wrap gap-3 stk_lis5'>
                  <li>
                    <Link href='https://www.ultrapro.info/' target='_blank' type='button' className='btn btn-action text-white'>Learn more</Link>
                  </li>
                 
                </ul>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='stk_im1'>
                <img src='/assets/images/staking/stakingcoin.png' className='img-fluid' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StakingUPRO;
