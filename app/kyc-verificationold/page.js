'use client'
import Link from "next/link";
import { useState, useEffect } from "react"
import { apiRequest } from '@/hooks/apiCall';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { formatNumber } from '@/util/common'
import ReferedUsersCard from '@/components/sections/referral/referedUsersCard'
import SumsubKyc from '@/components/sections/kyc-verification/sumsubKyc'
import "./referral.css";
import Loading from "../loading";

export default function Referral() {

  const [isLoading, setIsLoading] = useState(true)
  const [referralInfo, setReferralInfo] = useState()
  const [geturl, setgeturl] = useState("");  
  const [fullname,setfullname] = useState("");
  const [email,setemail] = useState("");
  const [profileInfo, setProfileInfo] = useState({});
  const [kycstatus, setkycstatus] = useState(0);

  const handleClick = (key) => {
    setIsActive(prevState => prevState === key ? null : key)
  }

   useEffect(()=>{
        getProfile();
        
    },[])

    useEffect(()=>{
       if(email)
       getsumsuburl();
        
    },[email])
    
    let getProfile = async()=>{
                    try {                
                const profileResponse = await apiRequest('/account/profile', { type: 'profile' });
                if (profileResponse && profileResponse.status) {
                    setProfileInfo(profileResponse.data.userInfo)
                    setkycstatus(profileResponse.data.userInfo.kycStatus);
                    setfullname(profileResponse.data.userInfo.fullName)
                    setemail(profileResponse.data.userInfo.email)
                    setIsLoading(false)
                    
                    // console.log("profileResponse.data.userInfo",profileResponse.data.userInfo)
                }

            } catch (error) {

                console.log('erorr', error)
            }
    }

    let getsumsuburl = async ()=>{
                    try {                
                const kycResponse = await apiRequest('/kyc/getsumsuburl', { type: 'profile',email:email });
                console.log("kycResponse",kycResponse);
                if (kycResponse && kycResponse.status) {
                    setgeturl(kycResponse.data.url);
                    setIsLoading(false)
                    
                }

            } catch (error) {

                console.log('erorr', error)
            }

    }

  if (isLoading) {
    return <Loading />
  }

  return (
    <DashboardLayout>
      <div className="user_balance_dashboard mb-4">
        <div className="block-text1 pb-3 pt-0 custom-title">
          <h4 className="fw600 finter text-capitalize m-0">Kyc-Verification</h4>
        </div>
        <SumsubKyc geturl={geturl} />
      </div>
      
    </DashboardLayout>
  );
}