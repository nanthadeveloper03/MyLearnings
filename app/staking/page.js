'use client'
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import './staking.css';
import StakingBanner from "@/components/sections/staking/StakingBanner";
import StakingFeatures from "@/components/sections/staking/StakingFeatures";
import StakingUPRO from "@/components/sections/staking/StakingUPRO";
import StakingPlan from "@/components/sections/staking/StakingPlan";
import StakingSteps from "@/components/sections/staking/StakingSteps";
import StakingFaq from "@/components/sections/staking/StakingFaq";
import StakingVoucher from "@/components/sections/staking/StakingVoucher";
import MaintanencePage from "@/components/sections/maintanence/MaintanencePage";

import { useSelector } from "react-redux";
import { apiRequest } from '@/hooks/apiCall';
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { StakingProvider } from '../../util/StakingContext';

import ChatSupport from "@/components/sections/support/ChatSupport";
import '../support/support.css';


export default function Staking() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [balance, setBalanceData] = useState({});
  const [showBanner, setShowBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [maintanenceShare, setMaintanence] = useState({})

  

  async function initLoad() {
    try {


      const response = await apiRequest('/account/dashboardinfo', { symbol: 'UPRO' });

      if (response?.status) {
        setIsLoading(false)
        setBalanceData(response?.data.walletInfo);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    initLoad();
    // const res = apiRequest('/uproChartPriceChange');
  }, []);

  const handleBannerUpdate = (isVisible) => {
    initLoad()
    setShowBanner(isVisible);
  };
  if (isLoading) {
    return <Loading />
  }

  const handleMaintancePage=(value)=>{
    console.log(value,"valuevaluevaluevalue");
    setMaintanence(value)
  }
  
  return (

    <>
    
{maintanenceShare.maintenance ==1 ?(
<MaintanencePage maintanenceName='Staking'  MaintananceCont={maintanenceShare.maintenanceTxt}/>
):(
      <Layout headerStyle={1} footerStyle={1}>
        <div>
          <StakingProvider>



            <StakingBanner isAuthenticated={isAuthenticated} onHit={showBanner}/>
                    <StakingFeatures />
                    <StakingUPRO />
                    <StakingPlan balance={balance} onSuccess={handleBannerUpdate} maintanenceProp={handleMaintancePage}/> 
                    <StakingVoucher />                    
                    <StakingSteps />  
                    <StakingFaq />                     
          </StakingProvider>
        </div>
      </Layout>
)}

<ChatSupport />

    </>

  )
}
