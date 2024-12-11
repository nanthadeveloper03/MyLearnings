"use client"
import { useEffect, useState } from 'react';
import { apiRequest } from '@/hooks/apiCall';
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import Layout from "@/components/layout/Layout";

import ProfileCard from '@/components/sections/dashboard/profileCard'
import WalletCard from '@/components/sections/dashboard/walletCard'
import BalanceCard from '@/components/sections/dashboard/balanceCard'
import withAuth from '@/util/withAuth';
import Loading from "@/app/loading";
import { useSelector } from 'react-redux';
import WelcomPopup from '@/components/sections/home/WelcomPopup';

import ChatSupport from "@/components/sections/support/ChatSupport";
import '../support/support.css';


function Dashboard() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true)
  const [miniMumStaking,setMinimumStaking] = useState()

  const [dashboardInfo, setDashboardInfo] = useState()

  async function initLoad() {
    try {
      const response = await apiRequest('/account/dashboardinfo', { symbol: 'USDT'})

      if (response?.status) {
        let data = response?.data;
        console.log(data,'datadatadata');
        
        setMinimumStaking(data?.isMinistake)
        setDashboardInfo(response?.data)
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

  let profileData = dashboardInfo?.userInfo || {};
  let walletData = dashboardInfo.walletInfo || {};

  return (
    <>

    <DashboardLayout>

      {miniMumStaking===0 &&  <WelcomPopup onHit={initLoad}/>}
      <ProfileCard profileData={profileData} />
      <WalletCard walletData={walletData} />
      <BalanceCard onHit={initLoad}/>
    </DashboardLayout>

    <ChatSupport />

    </>
  );
}

export default withAuth(Dashboard);