'use client'
import Link from "next/link";
import { useState, useEffect } from "react"
import { apiRequest } from '@/hooks/apiCall';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { formatNumber } from '@/util/common'
import ReferedUsersCard from '@/components/sections/referral/referedUsersCard'
import EarningsCard from '@/components/sections/referral/earningsCard'
import "./referral.css";
import Loading from "../loading";

export default function Referral() {

  const [isLoading, setIsLoading] = useState(true)
  const [referralInfo, setReferralInfo] = useState()

  const handleClick = (key) => {
    setIsActive(prevState => prevState === key ? null : key)
  }

  async function initLoad() {
    try {
      setIsLoading(true)
      const response = await apiRequest('/account/referralinfo', {})
      if (response?.status) {
        let data = response?.data;
        setReferralInfo(response?.data)
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    initLoad()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <DashboardLayout>
      <div className="user_balance_dashboard mb-4">
        <div className="block-text1 pb-3 pt-0 custom-title">
          <h4 className="fw600 finter text-capitalize m-0">Referral</h4>
        </div>
        <EarningsCard referralInfo={referralInfo} />
      </div>
      {/* <ReferedUsersCard refData={referralInfo.refData || []} decimalPoint={referralInfo.decimalPoint || 8} /> */}
    </DashboardLayout>
  );
}