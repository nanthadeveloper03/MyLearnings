import React from 'react';
import Link from "next/link";

const StakingSteps = () => {
  return (
    <>

      <section className='step_stk1'>
        <div className='container'>
          <h3 className='text-center finter fw600 text-uppercase pt-3 pb-3'>Achieve Your Rewards in <span className='pri_color'>3 Simple Steps!</span></h3>
          <ul className='d-flex flex-wrap justify-content-evenly pt-3 pb-3'>
            <li>

              <div className='stp_stk1 text-center'>
                <img src='/assets/images/staking/step_stk1.png' className='img-fluid' />
                <h5><span>1</span></h5>
                <h6>Generate Your Voucher Code</h6>
                <p>Create your unique code to get started.</p>
              </div>
            </li>
            <li>

              <div className='stp_stk1 text-center'>
                <img src='/assets/images/staking/step_stk2.png' className='img-fluid' />
                <h5><span>2</span></h5>
                <h6>Choose Your Staking Plan or Refer Friends</h6>
                <p>Stake UPRO yourself or share your code with friends for them to stake.</p>
              </div>
            </li>
            <li>

              <div className='stp_stk1 text-center'>
                <img src='/assets/images/staking/step_stk3.png' className='img-fluid' />
                <h5><span>3</span></h5>
                <h6>Claim Your Rewards</h6>
                <p>Once the staking is complete, unlock and withdraw your USDT reward!</p>
              </div>
            </li>



          </ul>

        </div>

      </section>

    </>
  );
};

export default StakingSteps;
