'use client'
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import WithdrawHistory from "@/components/sections/history/withdrawHistory";
import DepositHistory from "@/components/sections/history/depositHistory";
import FiatDepositTable from "@/components/sections/history/fiatDepositHistory";
import FiatWithdrawTable from "@/components/sections/history/fiatWithdrawHistory";


import StakingAssetHistory from "@/components/sections/stakingassets/StakingTable";
import RewardClaimHistory from "@/components/sections/history/rewardClaimHistory";

import './withdraw.css'
import { useSearchParams } from "next/navigation";

export default function Referral() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const claimTab = searchParams.get('claimTab');
  const FiatTab = searchParams.get('fiattab');
  const fiatwithdraw = searchParams.get('fiatwithdraw');


  

  const [flatTabs, setFlatTabs] = useState(1)


  useEffect(() => {

    if (tab) {
      setFlatTabs(2)
    } else if (claimTab) {
      setFlatTabs(3)
    }
    else if (FiatTab) {
      setFlatTabs(4)
    }   else if (fiatwithdraw) {
      setFlatTabs(5)
    }

    
  }, [])

  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }

  return (
    <DashboardLayout>
      <div className="user_balance_dashboard mb-4">
        <div className="row cm_inw rsp_ma5">
          <div className="col-md-12 rsp_pd5">
            <div>
              <div className="flat-tabs">

                <ul className="menu-tab2 d-flex w-100 mb-0 pb-3">
                  <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><Link href="#">Withdraw History</Link></li>
                  <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><Link href="#">Deposit Crypto History</Link></li>
                  <li className={flatTabs === 4 ? "active" : ""} onClick={() => handleFlatTabs(4)}><Link href="#"> Deposit Fiat History</Link></li>
                  <li className={flatTabs === 5 ? "active" : ""} onClick={() => handleFlatTabs(5)}><Link href="#"> Withdraw Fiat History</Link></li>
                  <li className={flatTabs === 3 ? "active" : ""} onClick={() => handleFlatTabs(3)}><Link href="#"> Staking Reward Claim </Link></li>

                </ul>

                <div className="content-tab2">

                  {flatTabs === 1 &&
                    <div className={``} style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>
                      <WithdrawHistory />
                    </div>
                  }

                  {flatTabs === 2 &&
                    <div className="content-inner wctab1" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>
                      <DepositHistory />
                    </div>
                  }

                  {flatTabs === 3 &&
                    <div className={``} style={{ display: `${flatTabs === 3 ? "block" : "none"}` }}>
                      <RewardClaimHistory />
                    </div>
                  }
                  {flatTabs === 4 &&
                    <div className={``} style={{ display: `${flatTabs === 4 ? "block" : "none"}` }}>
                      <FiatDepositTable />
                    </div>
                  }
                     {flatTabs === 5 &&
                    <div className={``} style={{ display: `${flatTabs === 5 ? "block" : "none"}` }}>
                      <FiatWithdrawTable />
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}