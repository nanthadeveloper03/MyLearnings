import React, { useState } from 'react';
import Link from "next/link";
import { useEffect } from "react";
import { apiRequest } from "@/hooks/apiCall";
import Loading from "@/app/loading";
import CommunityNetwork from '@/components/sections/community/CommunityNetwork';

const CommunityInn = () => {

  const [data, setData] = useState([])
  const [socialLinks, setSocialLinks] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  async function initLoad() {
    try {
      const response = await apiRequest('/communityList', { type: 'List' })
      if (response?.status) {
        setData(response?.data?.list)
        setSocialLinks(response?.data?.socialLinks)
      }
      setIsLoading(false)
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
    <>
      <div className="row justify-content-center">
        <div className="col-md-11 rsp_w100">

          <div className='cm_inhd1'>
            <h3 className='text-center finter text-white'>
              Ultrapro Exchange Global Community
            </h3>
          </div>

          <CommunityNetwork socialLinks={socialLinks} />

          <div className='cm_inthd1'>
            <h3 className='finter fw600'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
              </svg>
              Telegram
            </h3>
          </div>

          <div className='row ma_7'>
            {data.length > 0 ?
              data.map(function (item, index) {
                return (<div className='col-md-3 col-sm-6 pd_7' key={index}>
                  <div className='comm_link'>
                    <Link href={item.redirectLink || '#'} className='fopsans fw400' target='_blank'>
                      {item.name}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                      </svg>
                    </Link>
                  </div>
                </div>)
              }) :

              <div className="row justify-content-center align-items-center fs-20">
                No data found.
              </div>
            }
          </div>
        </div>
      </div>

      {/* <CommunityNetwork socialLinks={socialLinks} /> */}
    </>
  );
};

export default CommunityInn;
