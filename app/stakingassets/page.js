'use client'
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import stakingassets from "./stakingassets.css";
import Link from "next/link";
import StakingTable from "@/components/sections/stakingassets/StakingTable";
import { useState } from "react";
import Modal from "@/components/modal/Modal";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function StakingAssets() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  // const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // const handleRedeem =()=>{
  //   toast.dismiss()
  //   toast.info('Redeem Amount is not open plese wait your time period...')

  // }
const handleStake=()=>{
  router.push("/staking");
}
  return (
    <DashboardLayout>

      <div className="user_balance_dashboard mb-4">

        <div className="block-text1">
          <h5 className="fw600 finter text-capitalize w-100 rev_hd1">
            Staking History
          </h5>
        </div>

        <div className="row">
          <div className="col-md-12">
            {/* <div className="cmrew_bx1">
              <h6 className="w-100">
                Stake Assets
                <a href="#" className="view_ico"><img src="/assets/images/rewards/Show.png" className="img-fluid" /></a>
                <button type="button" className="btn copy_btn float-end"><img src="/assets/images/rewards/copy.png" className="img-fluid" /></button>
              </h6>
              <div className="row">
                <div className="col-md-8">
                  <h3 className="d-flex flex-nowrap">
                    1500.00
                    <div class="selectr1">
                      <select>
                        <option>UPRO</option>
                        <option>BTC</option>
                        <option>USDT</option> 
                      </select>
                    </div>
                  </h3>

                  <div className="d-flex bal_btn_section">
                    <div className="me-2 text-white balance_btn btn1"><button title="coming soon" onClick={handleStake}> Stake UPRO </button></div>
                    <div className="me-2 balance_btn btn2"><button onClick={handleRedeem}> Redeem </button></div>
                  </div>

                </div>

              </div>
            </div> */}

            {/* <div className="spotgraph mt-4 mb-4">
              <img src="/assets/images/spotassets/spotgraph.png" className="img-fluid" />
            </div> */}

            <StakingTable />

          </div>
        </div>
      </div>


      <div className="cm_modpop3">
        <Modal show={showModal} onClose={closeModal}>
          <div className="model-head">
            <h4>
              Staking
              <span className="closebtn3 cursor-pointer" onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </span>
            </h4>
          </div>
          <form className="mod_forms1">
            <div className="mod_inform">
          <div className="form-group">
              <label className="form-label">
              Redeem Amount
              </label>
              <div className="input-group flex-nowrap cm_inpop2">
                <input type="text" className="form-control" placeholder="Min. 0.000001" />
                <span className="input-group-text">
                <button type='button' className='btn sbtn1 pri_color'>Max</button>
                </span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Receive
              </label>
              <div className="input-group flex-nowrap cm_inpop1">
                <input type="text" className="form-control" placeholder="50" disabled />
                <span className="input-group-text">
                  USDT
                </span>
              </div>
            </div>
            <p className='d-flex justify-content-between w-100 sum_cn1'>Daily Personal Redeem Quota<span>50 / 50 ETH</span></p>
            <p className='d-flex justify-content-between w-100 sum_cn1'>Total Redemption Limit<span>2,867.49040807 ETH</span></p>

            <div className='sum_bx1'>
              <p className='d-flex justify-content-between w-100 sum_cn1'>Conversion Ratio <span>1 WBETH ≈ 1.05146434 ETH</span></p>
              <p className='d-flex justify-content-between w-100 sum_cn1'>ETH Distribution Date <span>2024-10-14 05:30</span></p>
              <p className='d-flex justify-content-between w-100 sum_cn1'>Reference APR <span>100%</span></p>
            </div>

            <h6>Product Rules</h6>

            <ul className='stk_mlis1'>
              <li>
                Rewards
                <p>After you successfully submit your WBETH redeem request, your WBETH will be frozen in your Spot Wallet, and you will not be able to receive rewards.
                </p>
              </li>
              <li>
                ETH amount to receive
                <p>The ETH amount you receive will be based on the WBETH:ETH conversion ratio when you submit the redemption request.
                </p>
              </li>
              <li>
                Redemption Quota
                <p>ETH Staking is designed on the Ethereum mainnet, where only a limited daily quantity of ETH can be redeemed. You can redeem your WBETH back to ETH if the daily quota allows. Please note that if the daily quota is used up, you may not be able to redeem your WBETH to ETH and will have to wait for the next time the quota is open again.
                </p>
              </li>
              <li>
                Processing Time
                <p>After the frozen WBETH is deducted, you will need to wait for 6 days. The redeemed ETH will then be deposited into your spot wallet. Please be aware of the risk of value fluctuation between ETH and WBETH.</p>
              </li>
            </ul> 
            </div>          

            <div className="control_btns w-100">
              <button type="button" className="btn btn-action text-white w-100">Confirm</button>
            </div>
          </form>
        </Modal>
      </div>


    </DashboardLayout>
  );
}
