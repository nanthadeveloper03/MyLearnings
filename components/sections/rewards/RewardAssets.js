import React, { useEffect } from 'react';
import { apiRequest } from '@/hooks/apiCall';
import Link from "next/link";
import { useState } from "react";
import Modal from '@/components/modal/Modal';
import { formatNumber } from '@/util/common';
import EyeOffIcon from '@mui/icons-material/VisibilityOff';
import EyeOnIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { updateWalletType } from '@/store/commonSlice';

const RewardAssets = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [assetData, setAssetData] = useState({ balance: 0, decimalPoint: 4, currency: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState({ name: '' })
  const [rewardVisible, setRewardVisible] = useState(false)

  const assetBalance = async (currentPage, perPage) => {
    try {
      setIsLoading(true)
      let response = await apiRequest('/account/assetBalance', { 'walletType': 0, symbol: 'USDT' })
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

  const handleRedirect = () => {
    window.location.href = '/history';
  }


  return (
    <>
      <div className="cmrew_bx1">
        <h6 className="w-100">
          Reward Assets
          {rewardVisible ?
            <EyeOnIcon color='warning' className="cursor-pointer mx-1" onClick={() => setRewardVisible(!rewardVisible)} /> :
            <EyeOffIcon color='warning' className="cursor-pointer mx-1" onClick={() => setRewardVisible(!rewardVisible)} />
          }
          <button type="button" className="btn copy_btn float-end" onClick={handleRedirect}><img src="/assets/images/rewards/copy.png" className="img-fluid" /></button>
        </h6>
        <div className="row">
          <div className="col-sm-8 col-9">
            <h3 className="d-flex flex-nowrap">
              {rewardVisible ? formatNumber(assetData.balance, assetData.decimalPoint) || '0.00' : '*********  '}
              <div className='mx-2'>
                {assetData.currency}
              </div>
            </h3>

            <div className="d-flex bal_btn_section">
              <div className="me-2 text-white balance_btn btn1 cursor-pointer" onClick={() => redirectPage(0, assetData.currency)}>
                <button> Withdraw </button>
              </div>
              {/* <div className="me-2 balance_btn btn2"><button onClick={openModal}> Transfer </button></div> */}
            </div>

          </div>
          <div className="col-sm-4 col-3">
            <div className="rw_im1 float-end">
              <img src="/assets/images/rewards/reward.png" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>

      <div className="cm_modpop3">
        <Modal show={showModal} onClose={closeModal}>
          <div className="model-head">
            <h4>
              Transfer
              <span className="closebtn3 cursor-pointer" onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </span>
            </h4>
            <p>Internal  transfer are free on ultrapro exchange</p>
          </div>
          <form className="mod_form2">
            <div className="form-group">
              <label className="form-label">
                From
              </label>
              <div className="selectr1">
                <select>
                  <option>Choose Asset</option>
                  <option>Referral Asset</option>
                  <option>Spot Asset</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">
                To
              </label>
              <input type="text" className="form-control dis_inptx1" placeholder="Spot Asset" disabled />
            </div>
            <hr />
            <div className="form-group">
              <label className="form-label">
                Coin
              </label>
              <input type="text" className="form-control dis_inptx1" placeholder="USDT" disabled />
            </div>
            <div className="form-group">
              <label className="form-label">
                Amount
              </label>
              <div className="input-group flex-nowrap cm_inpop1">
                <input type="text" className="form-control" placeholder="" />
                <span className="input-group-text">
                  USDT
                </span>
                <button type="button" className="btn">MAX</button>
              </div>
              <p>Available 0.000000 USDT</p>
            </div>
            <div className="d-flex flex-nowrap justify-content-center gap-2 control_btns w-100">
              <button type="button" className="btn res_btn">Reset</button>
              <button type="button" className="btn btn-action text-white">Confirm</button>
            </div>
          </form>
        </Modal>
      </div>

    </>
  );
};

export default RewardAssets;
