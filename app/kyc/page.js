'use client'
import Link from "next/link";
import { useState, useEffect,useRef } from "react"
import { apiRequest } from '@/hooks/apiCall';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { formatNumber } from '@/util/common'
import ReferedUsersCard from '@/components/sections/referral/referedUsersCard'
import SumsubKyc from '@/components/sections/kyc-verification/sumsubKyc'
import "./referral.css";
import Loading from "../loading";
import { toast } from "react-toastify";

export default function Referral() {

  
 
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [jwtToken,setjwtToken] = useState("");
    const [fullname,setfullname] = useState("");
    const [email,setemail] = useState("");
    const [profileInfo, setProfileInfo] = useState({});
    const [kycstatus, setkycstatus] = useState(0);

  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    
    const onfidoContainerRef = useRef(null);

    useEffect(()=>{
        getProfile();
    },[])
    useEffect(()=>{
        if(profileInfo)
        getkyctoken();

    },[fullname]);
    let getProfile = async()=>{
                    try {                
                const profileResponse = await apiRequest('/account/profile', { type: 'profile' });
                console.log("profileResponse",profileResponse);
                if (profileResponse && profileResponse.status) {
                    setProfileInfo(profileResponse.data.userInfo)
                    setkycstatus(profileResponse.data.userInfo.kycStatus);
                    setfullname(profileResponse.data.userInfo.fullName)
                    setemail(profileResponse.data.userInfo.email)
                    
                    console.log("profileResponse.data",profileResponse.data)
                }

            } catch (error) {

                console.log('erorr', error)
            }
    }


    let getkyctoken = async()=>{
         
                    try {                
                        console.log("email:email,fname:fullname,lname:fullname",{email:email,fname:fullname,lname:fullname});
                const kyctokenResponse = await apiRequest('/Kyc/getkyctoken', { type: 'kyc',email:email,fname:fullname,lname:fullname });

                /*const kycupdate = await apiRequest('/kyc/userkycupdate', { type: 'kyc',email:email });
                console.log("kycupdate",kycupdate)
                if(kycupdate.status){
                    toast.success('Your KYC successfully verified.');
                    // window.location.href="";
                }*/

                    // console.log("kyctokenResponse.token",kyctokenResponse.data.token)
                if (kyctokenResponse.data.token) {
                    setjwtToken(kyctokenResponse.data.token);
                
                }

            } catch (error) {
                console.log('erorr', error)
            }
    }

    useEffect(() => {
        if(jwtToken && kycstatus == 0) {
      const script = document.createElement('script');
      script.src = 'https://assets.onfido.com/web-sdk-releases/12.3.0/onfido.min.js';
      script.onload = () => {
        const onfido = window.Onfido.init({
          token: jwtToken,
          container: onfidoContainerRef.current,
          flow: {
            steps: ['welcome', 'document', 'face', 'complete']
          },
          onComplete: async (data) => {
            console.log("data",data);
            if(data){
                const kycupdate = await apiRequest('/kyc/userkycupdate', { type: 'kyc',email:email });
                if(kycupdate.status){

                    toast.success('Your KYC successfully verified.');
                    setTimeout(()=>{
                    window.location.href="";
                    },3500)
                }
            }
          },
          onError: (error) => {
            console.error('Onfido error:', error);
          }
        });
        return () => {
          onfido.destroy();
        };
      };
      document.body.appendChild(script);
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://assets.onfido.com/web-sdk-releases/12.3.0/style.css'; // Replace with the actual CSS URL if different
      document.head.appendChild(link);
      return () => {
        document.body.removeChild(script);
        document.head.removeChild(link);
      };    
  }
  }, [jwtToken,kycstatus]);
  return (
      <DashboardLayout>
        <div className="user_balance_dashboard mb-4">
          <div className="block-text1 pb-3 pt-0 custom-title">
            <h4 className="fw600 finter text-capitalize m-0">Kyc-Verification</h4>
          </div>
          <div className="py-3 border-b">
                                  {kycstatus == 1 && 
                                  <h3>KYC verified</h3> }
                                  {kycstatus == 2 && 
                                  <h3>KYC Pending</h3> }
                                  <div id="onfido-mount"></div>
        </div>
        </div>
        
      </DashboardLayout>
  );
}