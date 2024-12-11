'use client'
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import rewards from "./rewards.css";
import Link from "next/link";
import RewardTasks from "@/components/sections/rewardshub/RewardTasks";

export default function RewardsHub() {

  return (
    <>
      <DashboardLayout>

        <div className="user_balance_dashboard mb-4">
          <div className="row">
            <div className="col-md-11">


              <div className="block-text1 rev_hub_hd1">
                <h5 className="fw600 finter text-capitalize w-100 rev_hd1">
                  Rewards Hub
                  {/* <ul className="d-flex flex-wrap float-end gap-2">
                    <li>
                      <button type="button" className="btn btn_ref1 btn_ref2"><img src="/assets/images/rewards/copy.png" className="img-fluid" /> History</button>
                    </li>
                  </ul> */}
                </h5>
                <p>Complete these tasks to earn daily rewards!</p>
              </div>

              <RewardTasks />

            </div>
          </div>

        </div>

      </DashboardLayout>
    </>
  );
}
