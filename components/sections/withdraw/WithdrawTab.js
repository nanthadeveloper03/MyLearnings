import React, { useEffect } from 'react';
import Link from "next/link";
import { useState } from "react";
import FiatWithdraw from './fiat/makeWithdraw'

import CryptoWithdraw from './crypto/makeWithdraw'
import CryptoWithdrawHistory from './crypto/recentWithdraw'

import WithdrawFaq from "@/components/sections/withdraw/WithdrawFaq";
import RecentWithdraw from "@/components/sections/withdraw/fiat/recentWithdraw";
import { apiRequest } from '@/hooks/apiCall';

const WithdrawTab = () => {

  const [settings, setSettings] = useState({ maintenanceStatus: 0, maintenanceTxt: '' })
  const [random, setRandom] = useState('')
  const [tabLoading, setTabLoading] = useState(false)
  const [flatTabs, setFlatTabs] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }

  const handleApiResult = (result) => {
    setRandom(Math.random(0, 100000000000));
  };


  useEffect(() => {

    const initLoad = async () => {
      try {
        const response = await apiRequest('/account/siteInfo', {})
        if (response?.status) {
          let data = response?.data
          if (data) {
            let object = {
              maintenanceStatus: data.withdrawMaintenance,
              maintenanceTxt: data.withdrawMaintenanceMessage,
            }
            setSettings(object)
            setIsLoading(false)
          }
        }
      } catch (e) {
        console.log('')
      }
    }

    initLoad()
  }, [])

  return (
    <>
      <div className="row cm_inw rsp_ma5">
        <div className="col-md-6 order-1 order-md-1 rsp_pd5">
          <div>
            <div className="flat-tabs">
              <ul className="menu-tab2 d-flex">
                <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}><Link href="#">Withdraw Crypto</Link></li>
                <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}><Link href="#">Withdraw Fiat</Link></li>
              </ul>

              <div className="content-tab2">
                <div className={`content-inner wctab ${tabLoading && 'loading'}`} style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>
                  {flatTabs === 1 &&
                    settings.maintenanceStatus == 1 ?
                    <>
                      <h3 className="heading mb-4 mt-4"> Withdraw Under Maintenance</h3>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="block-text">
                            <p className="forgot_description">
                              {settings.maintenanceTxt}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                    : <CryptoWithdraw onApiCallComplete={handleApiResult} />
                  }
                </div>
                <div className="content-inner wctab1" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>
                  {flatTabs === 2 &&
                    <FiatWithdraw />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 order-3 order-md-2 rsp_pd5">
          <WithdrawFaq />
        </div>      
        <div className="col-md-12 mt-3 order-2 order-md-3">
          {flatTabs === 1 &&
            <CryptoWithdrawHistory randomValue={random} />
          }

          {flatTabs === 2 &&
            <RecentWithdraw />
          }

        </div>
      </div>

    </>
  );
};

export default WithdrawTab;
