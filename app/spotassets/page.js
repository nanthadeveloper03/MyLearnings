'use client'
import { useState, useEffect } from "react";
import { apiRequest } from '@/hooks/apiCall';
import { formatNumber } from '@/util/common';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import spotassets from "./spotassets.css";
import Link from "next/link";
import SpoTable from "@/components/sections/spotassets/SpoTable";
import SpoTransaction from "@/components/sections/spotassets/SpoTransaction";
import EyeOffIcon from '@mui/icons-material/VisibilityOff';
import EyeOnIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { updateWalletType } from '@/store/commonSlice';

export default function SpotAssets() {

  const router = useRouter();
  const dispatch = useDispatch();

  const [rewardVisible, setRewardVisible] = useState(false)
  const [assetData, setAssetData] = useState({ balance: 0, decimalPoint: 4, currency: '' })
  const [isLoading, setIsLoading] = useState(false)
  
  const assetBalance = async () => {
    try {
      setIsLoading(true)
      let response = await apiRequest('/account/assetBalance', { 'walletType': 1, symbol: 'USDT' })
      if (response?.status) {
        setAssetData({ balance: response.data.balance, decimalPoint: response.data.decimalPoint, currency: response.data.currency })
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    assetBalance()
  }, [])

  const redirectPage = (type, currency) => {
    let obj = { 'assetId': type, 'assetCurrency': currency }
    dispatch(updateWalletType(obj));
    router.push('/withdraw');
  }

  return (
    <DashboardLayout>

      <div className="user_balance_dashboard mb-4">

        <div className="block-text1">
          <h5 className="fw600 finter text-capitalize w-100 rev_hd1">
            Spot
          </h5>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="cmrew_bx1">
              <h6 className="w-100">
                Spot Assets
                {rewardVisible ?
                  <EyeOnIcon color='warning' className="cursor-pointer mx-1" onClick={() => setRewardVisible(!rewardVisible)} /> :
                  <EyeOffIcon color='warning' className="cursor-pointer mx-1" onClick={() => setRewardVisible(!rewardVisible)} />
                }
                <button type="button" className="btn copy_btn float-end"><img src="/assets/images/rewards/copy.png" className="img-fluid" /></button>
              </h6>
              <div className="row">
                <div className="col-sm-8 col-9">
                  <h3 className="d-flex flex-nowrap">
                    {rewardVisible ? formatNumber(assetData.balance, assetData.decimalPoint) || '0.00' : '*********  '}
                    {assetData.currency}
                  </h3>

                  <div className="d-flex bal_btn_section">
                    <Link href={`/deposit/?coin=${assetData.currency}`}>
                    <div className="me-2 text-white balance_btn btn1"><button title="coming soon"> Deposit </button></div>
                    </Link>
                    <div className="me-2 balance_btn btn2"  onClick={() => redirectPage(1, assetData.currency)}><button> Withdraw </button></div>
                    <Link href={"/soon_convert"}>
                    <div className="me-2 balance_btn btn2" title="Coming Soon"><button> Convert </button></div>
                    </Link>
                  </div>

                </div>
              </div>
            </div>

            {/* <div className="spotgraph mt-4 mb-4">
              <img src="/assets/images/spotassets/spotgraph.png" className="img-fluid" />
            </div>            */}

            <SpoTable />

            {/* <SpoTransaction /> */}

          </div>
        </div>
      </div>


    </DashboardLayout>
  );
}
