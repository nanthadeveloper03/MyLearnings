import React from 'react';
import Link from "next/link";
import { useState } from "react";
import Modal from '@/components/modal/Modal';

const RewardTasks = () => {

  const handleRedirect1 = () => {
    window.location.href = '/socialbonanza';
  };

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const [showModal1, setShowModal1] = useState(false);
  const openModal1 = () => setShowModal1(true);
  const closeModal1 = () => setShowModal1(false);

  return (
    <>

      <div className='task_hd1'>
        <h4 className='finter fw600'>OnBoarding tasks</h4>
      </div>

      <div className="cmrew_bx2">
        <h3 className="w-100 finter fw600 position-relative">
          <img src="/assets/images/rewardshub/tether.png" className="img-fluid" />
          Follow Our 6 Official Social Media Accounts and Claim 2 USDT!
        </h3>

        <div className="row justify-content-center align-items-center">
          <div className="col-md-8">
            <p>
              <span className='rew_lef'>Reward</span>
              <span className='rew_rig'>2  USDT</span>
            </p>
            <p>
              <span className='rew_lef'>Time Left to Complete Task</span>
              <span className='rew_rig'>
                NA
                {/* 08 <span className='text-muted'>Days</span>
                03 <span className='text-muted'>Hours</span>
                29 <span className='text-muted'>Minutes</span> */}
              </span>
            </p>
          </div>
          <div className="col-md-4">
            <ul className='d-flex flex-wrap gap-2 justify-content-end align-items-center'>
              <li>
                <button type='button' className='btn ds_btn1' onClick={openModal}>
                  <img src="/assets/images/rewardshub/Paper.png" className="img-fluid" />
                  Rules
                </button>
              </li>
              <li>
                <button type='button' className='btn btn-action text-white' onClick={handleRedirect1}>
                  Do Task
                  <img src="/assets/images/rewardshub/arrow.png" className="img-fluid" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>


      {/* <div className="cmrew_bx2">
        <h3 className="w-100 finter fw600 position-relative">
          <img src="/assets/images/rewardshub/tether.png" className="img-fluid" />
          Vote for UPRO Coin and Receive 1 USDT Reward
        </h3>

        <div className="row justify-content-center align-items-center">
          <div className="col-md-8">
            <p>
              <span className='rew_lef'>Reward</span>
              <span className='rew_rig'>1 USDT</span>
            </p>
            <p>
              <span className='rew_lef'>Time Left to Complete Task</span>
              <span className='rew_rig'>
              NA
              </span>
            </p>
          </div>
          <div className="col-md-4">
            <ul className='d-flex flex-wrap gap-2 justify-content-end align-items-center'>
              <li>
                <button type='button' className='btn ds_btn1'>
                <img src="/assets/images/rewardshub/Paper.png" className="img-fluid" /> 
                Rules
                </button>
              </li>
              <li>
                <button type='button' className='btn btn-action text-white' onClick={handleRedirect1}>               
                Do Task
                <img src="/assets/images/rewardshub/arrow.png" className="img-fluid" />
                </button>
              </li>              
            </ul>
          </div>
        </div>
      </div> */}


      <div className="cmrew_bx2">
        <h3 className="w-100 finter fw600 position-relative">
          <img src="/assets/images/rewardshub/tether.png" className="img-fluid" />
          Invite friends and Earn 2 USDT
        </h3>

        <div className="row justify-content-center align-items-center">
          <div className="col-md-8">
            <p>
              <span className='rew_lef'>Reward</span>
              <span className='rew_rig'>2  USDT</span>
            </p>
            <p>
              <span className='rew_lef'>Time Left to Complete Task</span>
              <span className='rew_rig'>
                NA
              </span>
            </p>
          </div>
          <div className="col-md-4">
            <ul className='d-flex flex-wrap gap-2 justify-content-end align-items-center'>
              <li>
                <button type='button' className='btn ds_btn1' onClick={openModal1}>
                  <img src="/assets/images/rewardshub/Paper.png" className="img-fluid" />
                  Rules
                </button>
              </li>
              <li>
                <Link href="/referral">
                  <button type='button' className='btn btn-action text-white'>
                    Do Task
                    <img src="/assets/images/rewardshub/arrow.png" className="img-fluid" />
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="cm_modpop3">
        <Modal show={showModal} onClose={closeModal}>
          <div className="model-head">
            <h4>
              Task Rules
              <span className="closebtn3 cursor-pointer" onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </span>
            </h4>
          </div>
          <form className="mod_form2">

            <div className='rul_bx1'>
              <h5>Get 2 USDT in simple steps.</h5>
              <p>Social Media Bonanza rules for participation:</p>
              {/* <h5>Social Media Bonanza rules for participation:</h5> */}
              <ol>
                <li>
                  <b>Follow Us:</b> Follow all of our social media accounts.
                </li>
                <li>
                  <b>Submit Proof:</b> Send a screenshot of your social media followings.
                </li>
                <li>
                  <b>Receive Confirmation:</b> Within 72 hours, the team will verify your submission, and upon confirmation, you will receive 2 USDT.
                </li>
                <li>
                  <b>Check Your Total:</b> The 2 USDT will be automatically added to your Reward Assets, so keep an eye on your account balance.
                </li>
                <li>
                  <b>Complete Tasks:</b> After completing the required tasks, users will be eligible to withdraw their USDT. Ensure all tasks are finished before attempting to withdraw.
                </li>
              </ol>
              {/* <h5>Invite your friends and grab 2 USDT.</h5>
              <p>General rules for Referring your friends:</p>
              <ol>
                <li>Share your unique referral code with friends and ask them to register using it.</li>
                <li>Once your friends activate their accounts, 2 USDT will be added to your referral dashboard.</li>
                <li>Your friends must complete the required tasks and KYC verification for the referral USDT to be credited.</li>
                <li>After your friends complete their tasks and KYC, the referral USDT will be added to your available balance.</li>
                <li>You can withdraw the accumulated USDT from your available balance according to our withdrawal policy.</li>
              </ol> */}
            </div>

            <div className="control_btns w-100">
              <button type="button" className="btn btn-action text-white w-100" onClick={closeModal}>Ok</button>
            </div>
          </form>
        </Modal>
      </div>


      <div className="cm_modpop3">
        <Modal show={showModal1} onClose={closeModal1}>
          <div className="model-head">
            <h4>
              Task Rules
              <span className="closebtn3 cursor-pointer" onClick={closeModal1}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </span>
            </h4>
          </div>
          <form className="mod_form2">

            <div className='rul_bx1'>
              <h5>Invite your friends and grab 2 USDT.</h5>
              <p>General rules for Referring your friends:</p>
              {/* <h5>Social Media Bonanza rules for participation:</h5> */}
              <ol>
                <li>
                Share your unique referral code with friends and ask them to register using it.
                </li>
                <li>
                Once your friends activate their accounts, 2 USDT will be added to your referral asset.
                </li>
                <li>
                Your friends must complete the required tasks and KYC verification for the referral USDT to be credited.
                </li>
                <li>
                After your friends complete their tasks and KYC, the referral USDT will be added to your available balance.
                </li>
                <li>
                You can withdraw the accumulated USDT from your available balance according to our withdrawal policy.
                </li>
              </ol>
              {/* <h5>Invite your friends and grab 2 USDT.</h5>
              <p>General rules for Referring your friends:</p>
              <ol>
                <li>Share your unique referral code with friends and ask them to register using it.</li>
                <li>Once your friends activate their accounts, 2 USDT will be added to your referral dashboard.</li>
                <li>Your friends must complete the required tasks and KYC verification for the referral USDT to be credited.</li>
                <li>After your friends complete their tasks and KYC, the referral USDT will be added to your available balance.</li>
                <li>You can withdraw the accumulated USDT from your available balance according to our withdrawal policy.</li>
              </ol> */}
            </div>

            <div className="control_btns w-100">
              <button type="button" className="btn btn-action text-white w-100" onClick={closeModal1}>Ok</button>
            </div>
          </form>
        </Modal>
      </div>

    </>
  );
};

export default RewardTasks;
