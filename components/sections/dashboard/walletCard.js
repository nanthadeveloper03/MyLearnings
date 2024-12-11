import React, { useState } from "react";
import { formatNumber, walletTypes } from '@/util/common'
import Link from "next/link";
import { useDispatch } from 'react-redux';
import { updateWalletType } from '@/store/commonSlice';
import { useRouter } from 'next/navigation';
import EyeOffIcon from '@mui/icons-material/VisibilityOff';
import EyeOnIcon from '@mui/icons-material/Visibility';

export default function walletCard({ walletData }) {

  const [spotVisible, setSpotVisible] = useState(false)
  const [rewardVisible, setRewardVisible] = useState(false)
  const [refVisible, setRefVisible] = useState(false)

  const router = useRouter();
  const dispatch = useDispatch();
  let kycStatus;

  if (kycStatus === 1) {
    kycStatus = 'Pending'
  } else if (kycStatus === 2) {
    kycStatus = 'Rejected'
  } else if (kycStatus === 3) {
    kycStatus = 'Approved'
  } else {
    kycStatus = 'Not yet started'
  }

  const redirectPage = (type, currency) => {
    let obj = { 'assetId': type, 'assetCurrency': currency }
    dispatch(updateWalletType(obj));
    router.push('/withdraw');
  }

  return (
    <div className="user_balance_dashboard mb-4">

      <div className="row rsp-mma5">

        <div className="col-sm-4 rsp-mpd5">
          <div className="card-bx stacked">
            <div className="card-info referral_earning_box">
              <div>
                <p className="mb-2">Spot Assets {spotVisible ?
                  <EyeOnIcon color='warning' className="cursor-pointer mx-1" onClick={() => setSpotVisible(!spotVisible)} /> :
                  <EyeOffIcon color='warning' className="cursor-pointer mx-1" onClick={() => setSpotVisible(!spotVisible)} />
                }</p>
                <div className="d-flex justify-content-between">
                  <h2 className="num-text mb-3">
                    {spotVisible ? formatNumber(walletData.spotAsset, walletData.spotDecimalPoint) || '0.00' : '*********  '} <span> {walletData.spotCurrency}</span>
                  </h2>
                </div>
                <div className="d-flex bal_btn_section bal_dash">
                  <div className="me-2 text-white balance_btn btn1">
                    <button onClick={()=>router.push('/deposit')}> Deposit </button>
                  </div>
                  <div className="me-2 balance_btn btn2">
                    <button onClick={() => redirectPage(1, walletData.spotCurrency)}> Withdraw </button>
                  </div>
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-4 rsp-mpd5">
          <div className="card-bx stacked">
            <div className="card-info referral_earning_box">
              <div>
                <p className="mb-2">Reward Assets {rewardVisible ?
                  <EyeOnIcon color='warning' className="cursor-pointer mx-1" onClick={() => setRewardVisible(!rewardVisible)} /> :
                  <EyeOffIcon color='warning' className="cursor-pointer mx-1" onClick={() => setRewardVisible(!rewardVisible)} />
                }</p>
                <div className="d-flex justify-content-between">
                  <h2 className="num-text mb-3">
                    {rewardVisible ? formatNumber(walletData.rewardAsset, walletData.decimalPoint) || '0.00' : '*********  '} <span> {walletData.currency} </span>
                  </h2>
                </div>
                <div className="d-flex bal_btn_section bal_dash">
                  <div className="me-2 text-white balance_btn btn1">
                    <button onClick={()=>router.push('/rewardshub')}> Earn Rewards</button>
                  </div>
                  <div className="me-2 balance_btn btn2">
                    <button onClick={() => redirectPage(0, walletData.currency)}> Withdraw </button>
                  </div>
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-4 rsp-mpd5">
          <div className="card-bx stacked">
            <div className="card-info referral_earning_box">
              <div>
                <p className="mb-2">Referral Assets {refVisible ?
                  <EyeOnIcon color='warning' className="cursor-pointer mx-1" onClick={() => setRefVisible(!refVisible)} /> :
                  <EyeOffIcon color='warning' className="cursor-pointer mx-1" onClick={() => setRefVisible(!refVisible)} />
                }</p>
                <div className="d-flex justify-content-between">
                  <h2 className="num-text mb-3">
                  {refVisible ? formatNumber(walletData.referralAsset, walletData.decimalPoint) || '0.00' : '*********  '} <span> {walletData.currency} </span>
                  </h2>
                </div>
                <div className="d-flex bal_btn_section bal_dash">
                  <div className="me-2 text-white balance_btn btn1">
                    <Link href={'/referral'}><button> Refer Now</button></Link>
                  </div>
                  <div className="me-2 balance_btn btn2">
                    <button onClick={() => redirectPage(2, walletData.currency)}> Withdraw </button>
                  </div>
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>



      </div>


      {/* <div className="row">
        
        <div className="col-sm-6">
          <div className="card-bx stacked">
            <div className="card-info">
              <p className="mb-3">Available Balance</p>
              <div className="d-flex justify-content-between">
                <h2 className="num-text mb-4">
                  {formatNumber(walletData.avlBalance, walletData.decimalPoint) || '0.00'} <span> {walletData.currency}</span>
                </h2>
              </div>
              <div className="d-flex bal_btn_section">
                <div className="me-3 text-white balance_btn btn1">
                  <button>Deposit</button>
                </div>
                <div className="me-3 balance_btn btn2">
                  <button>Buy Crypto</button>
                </div>
                <div className="me-3 balance_btn btn3">
                  <button>Withdraw</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card-bx stacked">
            <div className="card-info referral_earning_box">
              <div>
                <p className="mb-3">Referral Earnings</p>
                <div className="d-flex justify-content-between">
                  <h2 className="num-text mb-4">
                    {formatNumber(walletData.refEarnings, walletData.decimalPoint) || '0.00'} <span> {walletData.currency}</span>
                  </h2>
                </div>
                <div className="d-flex bal_btn_section">
                  <div className="me-4 balance_btn btn2">
                   <Link href={'/referral'}><button>Referral History</button></Link>
                  </div>
                </div>
              </div>
              <div>
                <img src="/assets/images/earning-img.png" />
              </div>
            </div>
          </div>
        </div>

      </div> */}
    </div>
  );
}
