import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { apiRequest } from '@/hooks/apiCall';
import Loading from "../../../app/loading";

const OurTeams = () => {
  const [teamList, setTeamList] = useState([])
  const [pageLoading, setPageLoading] = useState(false)
  async function initLoad() {
    setPageLoading(true)
    try {
      const response = await apiRequest('/teams/list', {})
      if (response?.status) {
        let result = response?.data?.list;
        setTeamList(result)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false)
    }
  }
  useEffect(() => {
    initLoad()
  }, [])
  if (pageLoading) {
    return <Loading />
  }
  return (
    <div className="row justify-content-center">
      <div className="col-md-11 rsp_w100">

        <div className='cm_inhd1'>
          <h1 className='text-center text-uppercase text-white'>OUR TEAM</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 rsp_w100">
            <div className='cm_inhd2 text-center'>
              <h2 className='finter fw700'>Meet the Clonify team</h2>
              <h4><p className='finter fw400'>
                Meet the faces behind Ultrapro Exchange! Our dynamic team of innovators, developers, and strategists is dedicated to revolutionizing the crypto space with passion and expertise. Each member brings unique skills and a shared
                vision to drive forward a consistent, secure, and user-friendly experience for our community.
              </p></h4>
            </div>
          </div>
        </div>



        <div className='row'>
          {teamList.length > 0 && teamList.map((data, index) => (
            <div key={data} className='col-md-3 col-sm-6 col-6'>
              <div className='team_card1'>
                <div className='team_im'>
                  <img src={data.teamsImage} className='img-fluid' alt="Team Member" />
                </div>
                <div className='team_cn'>
                  <h3 className='finter fw600'>{data.teamsName}</h3>
                  <h4 className='finter fw400'>{data.teamsStack}</h4>
                </div>
                {/* <Link href='#' className='soc_dis'>
       <img src='/assets/images/nico/linkedin1.png' className='img-fluid' alt="LinkedIn" />
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
         <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
       </svg>
     </Link> */}
              </div>
            </div>
          ))}




        </div>
      </div>
    </div>
  );
};

export default OurTeams;
