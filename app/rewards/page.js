'use client'
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import rewards from "./rewards.css";
import Link from "next/link";
import RewardAssets from "@/components/sections/rewards/RewardAssets";
import RewardHistory from "@/components/sections/rewards/RewardHistory";
import RewardFaq from "@/components/sections/rewards/RewardFaq";

export default function Rewards() {
  
  const handleRedirect = () => {
    window.location.href = '/rewardshub';
  }

  return (
    <>
      

      <DashboardLayout>

        <div className="user_balance_dashboard mb-4">

          <div className="block-text1">
            <h5 className="fw600 finter text-capitalize w-100 rev_hd1">
              My Rewards
              <ul className="d-flex flex-wrap float-end gap-2">
                <li>
                  <button type="button" className="btn btn_ref1" onClick={handleRedirect}><img src="/assets/images/rewards/ref1.png" className="img-fluid" /> Get More Rewards</button>
                </li>
                {/* <li>
                  <button type="button" className="btn btn_ref1"><img src="/assets/images/rewards/ref2.png" className="img-fluid" /> How to Use</button>
                </li> */}
              </ul>
            </h5>
          </div>

          <div className="row">
            <div className="col-md-7">

              <RewardAssets />

              <RewardHistory />

            </div>

            <div className="col-md-5">

              <RewardFaq />

              {/* <div className="explo_bx1">
                <h3 className="finter fw600">Begin your Crypto exploration Now!</h3>
                <button type="button" className="btn explo_btn">Scan to Download | <img src="/assets/images/rewards/qr.png" className="img-fluid" /></button>
              </div> */}

            </div>
          </div>

        </div>

      </DashboardLayout>
    </>
  );
}
