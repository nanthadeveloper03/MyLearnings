import React, { useEffect } from 'react';
import Link from "next/link";
import { useState } from "react";
import { apiRequest } from '@/hooks/apiCall';
import Loading from "@/app/loading";
import { formatNumber, showNotification, validDecimal } from '@/util/common';
import { useForm } from 'react-hook-form';
import { removeWhiteSpace } from "@/util/common";
import { useSelector, useDispatch } from 'react-redux';
import { updateWalletType } from '@/store/commonSlice';
import WithdrawConfirm from "./withdrawConfirm"

const WithdrawTab = ({ onApiCallComplete }) => {

  // const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { assetId, assetCurrency } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, getValues, setValue, reset, trigger, resetField } = useForm({
    mode: 'onChange'
  });

  const [showPopup, setShowPopup] = useState()
  const [step, setStep] = useState(1)
  const [flatTabs1, setFlatTabs1] = useState(3)
  const handleFlatTabs1 = (index) => {
    setFlatTabs1(index)
  }

  const [initStatus, setInitStatus] = useState(false);
  const [withdrawLimit, setWithdrawLimit] = useState(0)
  const [tabLoading, setTabLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currencyInfo, setCurrencyInfo] = useState({})
  const [settingsInfo, setSettingsInfo] = useState({})
  const [wallets, setWallets] = useState([])
  const [currencyList, setCurrencyList] = useState([])
  const [balance, setBalance] = useState(0)
  const [networkFee, setNetworkFee] = useState(0)
  const [receiveAmt, setReceiveAmt] = useState(0)
  const [isDisable, setIsDisable] = useState(false);
  const [formData, setFormData] = useState()
  // const userCountry = (isAuthenticated) ? user.country : ''

  async function initLoad() {
    try {
      const response = await apiRequest('/withdraw/currencyList', { 'currencyType': 0 })
      console.log(response,'response');
      
      if (response?.status) {
        let data = response?.data?.currencyList??[];
        let wallets = response?.data?.allWallets
        setCurrencyList(data)
        setWallets(wallets)
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    initLoad()
  }, [])

  useEffect(() => {
    if (assetId >= 0 && assetCurrency) {
      setValue('walletType', assetId)
      const index = currencyList.findIndex(currency => currency.symbol === assetCurrency);
      setValue('currency', index)
      getBalance(index, assetId);
    }
  }, [currencyList])



  // useEffect(() => {
  //   if (parseInt(assetId) >= 0) {
  //     setValue('walletType', assetId)
  //     setValue('currency', 9)
  //     getBalance(9, 0);
  //     dispatch(updateWalletType(''));
  //   }
  // }, [assetId])

  // useEffect(() => {
  //   alert(initStatus)
  //   if(initStatus) {
  //     setValue('walletType', walletType)
  //   }
  // }, [initStatus])



  const getBalance = async (value, walletType) => {
    try {
      if (value < 0 || walletType < 0) {
        return false
      }
      setTabLoading(true)
      let currencyData = currencyList[value]
      if (Object.keys(currencyData).length > 0) {
        const response = await apiRequest('/account/currencyBalance', { 'currency': currencyData.symbol, walletType: walletType })
        if (response?.status) {
          let data = response?.data?.balance;
          let withdrawLimit = response?.data?.withdrawLimit;
          setCurrencyInfo(currencyData)
          setBalance(data)
          setWithdrawLimit(withdrawLimit)
          setIsLoading(false)
          setValue('amount', '')
          setValue('address', '')
          setValue('networkId', '')
          setValue('networkName', '')
          setValue('currencyName', currencyData.symbol)
          setValue('decimalPoint', currencyData.decimalPoint)
          setSettingsInfo(currencyData.settingsData || {})
          if (assetId >= 0 && assetCurrency) {
            dispatch(updateWalletType(''));
          }
        } else {
          reset()
        }
      } else {
        showNotification(false, 'Invalid currency')
      }
      setTabLoading(false)
    } catch (error) {
      console.error(error);
    }
  }

  const allowDecimal = (e) => {
    const { value, name } = e.target;
    const decimalPoint = currencyInfo.decimalPoint || 8;
    const regex = new RegExp(`^(\\d+(\\.\\d{0,${decimalPoint}})?).*`);
    const formattedValue = value.replace(/\s/g, '').replace(regex, '$1');
    setValue(name, formattedValue, { shouldValidate: true });

    let receiveAmt = 0
    let networkFee = 0
    let totalAmt = 0
    if (settingsInfo && Object.keys(settingsInfo).length > 0 && formattedValue > 0) {
      networkFee = (settingsInfo.feeType == 0) ? settingsInfo.fee : formattedValue * settingsInfo.fee / 100
      totalAmt = (formattedValue > networkFee) ? formattedValue - networkFee : 0
      receiveAmt = totalAmt
      //receiveAmt = (userCountry == 'India') ? totalAmt - (formattedValue * settingsInfo.tds) / 100 : totalAmt
      if (receiveAmt <= 0) {
        receiveAmt = 0
      }
    }
    setReceiveAmt(formatNumber(receiveAmt, decimalPoint))
    setNetworkFee(formatNumber(networkFee, decimalPoint))
  }

  const handleNetworkChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const networkId = e.target.value;
    const networkName = selectedOption.getAttribute('data-networkname');
    setValue('networkId', networkId)
    setValue('networkName', networkName)
  };

  const onSubmit = async () => {
    setValue('receiveAmt', receiveAmt)
    setValue('fee', networkFee)
    let formData = getValues()
    if (Object.keys(formData).length > 0) {
      setFormData(formData)
    }
    setShowPopup(Math.random(10, 100000000000))
    return false
  }

  if (isLoading) {
    return <Loading />
  }

  const resetWithdrawForm = (result) => {
    reset();
    onApiCallComplete()
    setCurrencyInfo({})
    setSettingsInfo({})
    setWithdrawLimit(0)
    setBalance(0)
    setNetworkFee(0)
    setReceiveAmt(0)
  };

  const handlePasteClick = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setValue('address', text, { shouldValidate: true });
    } catch (err) {
      console.error('Failed to read clipboard contents:', err);
    }
  };


  return (
    <>
      <WithdrawConfirm showPopup={showPopup} formData={formData} onSubmitWithdraw={resetWithdrawForm} />

      <ul className={`step_lister ${(tabLoading) && 'loading'}`}>
        <form onSubmit={handleSubmit(onSubmit)} className="cm_infrm1 withdraw-form" autoComplete='off'>

          <li className={(step == 1) ? 'active' : ''}>
            <div className={flatTabs1 === 3 ? "active" : ""} onClick={() => handleFlatTabs1(3)}>
              <Link href="#">
                <h4 className={`tit ${errors.currency && 'text-dangers'}`}>
                  <span className="num_t">1</span>
                  Select coin to Withdraw
                </h4>
              </Link>
            </div>
            <div className="content-inner" style={{ display: `${flatTabs1 === 3 ? "block" : "block"}` }}>

              <div className="form-group rsp_wd50 mb-0 pb-0">
                {/* <label className="form-label"> Currency </label> */}
                <div className="row curr_rw1 ma-5">
                  <div className="col-md-7 col-sm-7 col-6 pd-5">
                    <div className="select2bx">
                      <select
                        className="select2"
                        name="currency"
                        {...register('currency', {
                          required: 'Currency is required',
                          onChange: (e) => {
                            setCurrencyInfo({})
                            setSettingsInfo({})
                            setWithdrawLimit(0)
                            setBalance(0)
                            setNetworkFee(0)
                            setReceiveAmt(0)
                            if (parseInt(getValues('walletType')) >= 0) {
                              getBalance(e.target.value, getValues('walletType'));
                            } else {
                              trigger('walletType');
                            }
                            setStep(2)
                          },
                        })}
                      >
                        <option value={''}>Select Currency</option>
                        {currencyList.length > 0 && currencyList.map(function (currency, index) {
                          return (<option value={index} key={index}>{currency.symbol}</option>)
                        })}
                      </select>
                      {errors.currency && <span className="secondary small text-danger m-0 p-0">{errors.currency.message}</span>}
                    </div>

                  </div>
                  <div className="col-md-5 col-sm-5 col-6 pd-5">
                    <div className="select2bx">
                      <select
                        className="select2"
                        name="walletType"
                        {...register('walletType', {
                          required: 'Wallet Type is required',
                          onChange: (e) => {
                            setCurrencyInfo({})
                            setSettingsInfo({})
                            setWithdrawLimit(0)
                            setBalance(0)
                            setNetworkFee(0)
                            setReceiveAmt(0)
                            if (getValues('currency')) {
                              getBalance(getValues('currency'), e.target.value);
                              resetField('amount');
                            } else {
                              trigger('currency');
                            }
                            setStep(2)
                          },
                        })}
                      >
                        <option value={""}> Choose Your Asset </option>
                        {wallets && wallets.length > 0 && wallets.map(function (item, index) {
                          return (<option value={item.walletId} key={index}>{item.name}</option>)
                        })}
                      </select>
                      {errors.walletType && <span className="secondary small text-danger m-0 p-0">{errors.walletType.message}</span>}

                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="form-group">
                <div className="select2bx">
                  <select
                    className="select2"
                    name="currency"
                    {...register('currency', {
                      required: 'Currency is required',
                      onChange: (e) => {
                        setCurrencyInfo({})
                        setSettingsInfo({})
                        setWithdrawLimit(0)
                        setBalance(0)
                        setNetworkFee(0)
                        setReceiveAmt(0)
                        getBalance(e.target.value);
                        trigger('currency');
                        setStep(2)
                      },
                    })}
                  >
                    <option value={''}>Select Currency</option>
                    {currencyList.length > 0 && currencyList.map(function (currency, index) {
                      return (<option value={index} key={index}>{currency.symbol}</option>)
                    })}
                  </select>
                </div>
                {errors.currency && <span className="secondary small text-danger">{errors.currency.message}</span>}
              </div> */}
              {/* <div className="d-flex flex-wrap gap-1">
              <span className="co_tx"><img src="/assets/images/withdraw/coin1.png" className="img-fluid wico" /> UPRO</span>
              <span className="co_tx"><img src="/assets/images/withdraw/coin2.png" className="img-fluid wico" /> BTC</span>
              <span className="co_tx"><img src="/assets/images/withdraw/coin3.png" className="img-fluid wico" /> ETH</span>
              <span className="co_tx"><img src="/assets/images/withdraw/coin4.png" className="img-fluid wico" /> USDT</span>
              <span className="co_tx"><img src="/assets/images/withdraw/coin5.png" className="img-fluid wico" /> XRP</span>
            </div> */}
            </div>
          </li>

          <li className={(step == 2) ? 'active' : ''}>
            <div className={flatTabs1 === 4 ? "active" : ""} onClick={() => handleFlatTabs1(4)}>
              <Link href="#">
                <h4 className={`tit ${(errors.address || errors.networkId) && 'text-dangers'}`}>
                  <span className="num_t">2</span>
                  Withdraw To
                </h4>
              </Link>
            </div>
            <div className="content-inner" style={{ display: `${flatTabs1 === 4 ? "block" : "block"}` }}>
              {/* <h5 className="adr_tx"><span>Address</span></h5> */}
              <div className="form-group rsp_wd50">
                <div className="input-group cm_ingrp2">
                  <input type="text" className="form-control" placeholder="Withdraw address" {...register('address', { required: 'Address is required' })} onKeyDown={removeWhiteSpace} onKeyUpCapture={() => (getValues('address')) ? setStep(3) : setStep(2)} />
                  <button type="button" className="btn" onClick={handlePasteClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                      <path d="M249.6 471.5c10.8 3.8 22.4-4.1 22.4-15.5l0-377.4c0-4.2-1.6-8.4-5-11C247.4 52 202.4 32 144 32C93.5 32 46.3 45.3 18.1 56.1C6.8 60.5 0 71.7 0 83.8L0 454.1c0 11.9 12.8 20.2 24.1 16.5C55.6 460.1 105.5 448 144 448c33.9 0 79 14 105.6 23.5zm76.8 0C353 462 398.1 448 432 448c38.5 0 88.4 12.1 119.9 22.6c11.3 3.8 24.1-4.6 24.1-16.5l0-370.3c0-12.1-6.8-23.3-18.1-27.6C529.7 45.3 482.5 32 432 32c-58.4 0-103.4 20-123 35.6c-3.3 2.6-5 6.8-5 11L304 456c0 11.4 11.7 19.3 22.4 15.5z" />
                    </svg>
                  </button>
                </div>
              </div>
              {errors.address && <span className="secondary small text-danger">{errors.address.message}</span>}

              {currencyInfo.memoStatus == 1 &&
                <div className="form-group rsp_wd50">
                  <div className="input-group cm_ingrp2">
                    <input type="text" className="form-control" placeholder="Destination Tag" {...register('memoId', {
                      required: 'Destination Tag is required',
                      onChange: (e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      }
                    })} />
                  </div>
                </div>
              }
              {errors.memoId && <span className="secondary small text-danger">{errors.memoId.message}</span>}

              {currencyInfo.coinType == 1 && settingsInfo && settingsInfo.networkTypes && settingsInfo.networkTypes.length > 0 &&
                <div className="form-group rsp_wd50">
                  <div className="select2bx">
                    <select className="select2"
                      {...register('networkId', {
                        required: 'Choose network type',
                        onChange: (e) => {
                          handleNetworkChange(e)
                        },
                      })}>
                      <option value=""> Choose Network </option>
                      {settingsInfo.networkTypes.map(function (network, item) {
                        return (
                          <option key={network._id} value={network._id} data-networkname={network.networkName}>{network.networkName}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>
              }
              {errors.networkId && <span className="secondary small text-danger">{errors.networkId.message}</span>}

            </div>
          </li>


          <li className={(step == 3) ? 'active' : ''}>
            <div className={flatTabs1 === 5 ? "active" : ""} onClick={() => handleFlatTabs1(5)}>
              <Link href="#">
                <h4 className={`tit ${errors.amount && 'text-dangers'}`}>
                  <span className="num_t">3</span>
                  Withdraw Amount
                </h4>
              </Link>
            </div>
            <div className="content-inner" style={{ display: `${flatTabs1 === 5 ? "block" : "block"}` }}>
              <div className="form-group rsp_wd50">
                <div className="input-group cm_ingrp2">
                  <input type="text" className="form-control" placeholder="Enter withdraw amount"
                    {...register('amount', {
                      required: 'Withdraw amount is required',
                      validate: (value) => {
                        if (!/^\d*\.?\d*$/.test(value)) {
                          return 'Invalid amount. Only numbers and decimals are allowed.';
                        }
                        const amount = parseFloat(value);
                        const minAmount = settingsInfo.minAmount || 0;
                        const maxAmount = settingsInfo.maxAmount || 0;
                        let totalWithdraw = parseFloat(withdrawLimit) + parseFloat(value)

                        if (!getValues('currency') || !getValues('walletType')) {
                          trigger('currency')
                          trigger('walletType')
                          trigger('address')
                        }
                        if (parseFloat(amount) <= parseFloat(0)) {
                          return `Withdraw amount should be greater than zero`;
                        }
                        if (parseFloat(amount) && parseFloat(amount) > parseFloat(balance)) {
                          return `You have insufficient balance`;
                        }
                        if (amount < minAmount) {
                          return `Withdraw amount should be at least ${formatNumber(minAmount, currencyInfo.decimalPoint)} ${currencyInfo.symbol}`;
                        }
                        if (amount > maxAmount) {
                          return `Withdraw amount should not exceed ${formatNumber(maxAmount, currencyInfo.decimalPoint)} ${currencyInfo.symbol}`;
                        }
                        if (parseFloat(totalWithdraw) > parseFloat(settingsInfo.dayLimit)) {
                          return `You have reached 24hrs withdraw limit`;
                        }
                        return true;
                      }
                    })}
                    onChange={(e) => allowDecimal(e)} onKeyUpCapture={() => (parseFloat(getValues('amount')) > 0) ? setStep(4) : setStep(3)} />
                  <span className="grpbtn">
                    {currencyInfo.symbol &&
                      <button type="button" className="btn cursor-pointer-none">
                        {currencyInfo.symbol}
                      </button>
                    }
                    <button type="button" className="btn" onClick={() => {
                      if (getValues('currency') && getValues('walletType')) {
                        setValue('amount', formatNumber(balance, currencyInfo.decimalPoint))
                        trigger('amount')
                      } else {
                        trigger('currency')
                        trigger('walletType')
                      }
                    }}>
                      MAX
                    </button>
                  </span>
                </div>
              </div>
              {errors.amount && <span className="secondary small text-danger">{errors.amount.message}</span>}
              
              <div className="cm_lisw rsp_wd50">
                <div className="d-flex justify-content-between lisw_rw">
                  <span className="lisw_lf">Available Balance</span>
                  <span className="lisw_rig">{formatNumber(balance, currencyInfo.decimalPoint)} {currencyInfo.symbol}</span>
                </div>

                <div className="d-flex justify-content-between lisw_rw">
                  <span className="lisw_lf"> Minimum <b> {formatNumber(settingsInfo.minAmount, currencyInfo.decimalPoint)} </b> {currencyInfo.symbol} </span>
                  <span className="lisw_rig"> Maximum <b> {formatNumber(settingsInfo.maxAmount, currencyInfo.decimalPoint)} </b> {currencyInfo.symbol}</span>
                </div>

                {settingsInfo.dayLimit > 0 &&
                  <div className="d-flex justify-content-between lisw_rw">
                    <span className="lisw_lf">24h Withdrawal Limit</span>
                    <span className="lisw_rig">{formatNumber(settingsInfo.dayLimit, currencyInfo.decimalPoint)} {currencyInfo.symbol}</span>
                    {/* <span className="lisw_rig"><b>{formatNumber(settingsInfo.dayLimit - withdrawLimit, currencyInfo.decimalPoint)} {currencyInfo.symbol}</b> / {formatNumber(settingsInfo.dayLimit, currencyInfo.decimalPoint)} {currencyInfo.symbol}</span> */}
                  </div>
                }
              </div>
              <hr className="cm_sepw rsp_wd50" />
              <div className="qr_tx1">
               
                             <p className="text-danger"><b>Note:</b> Your crypto withdrawal will be settled within 24 hours.</p>
                          
                           </div>

              <div className="col-md-12">
                <div className="row cm_balt">
                  <div className="col-md-6">
                    <h5>Receive Amount </h5>
                    <h4>{receiveAmt || '0.0000'} {currencyInfo.symbol}</h4>
                    <h5> Withdraw Fee {networkFee || '0.0000'} {currencyInfo.symbol} </h5>
                  </div>

                  {/* <div className="col-md-6">
                  <h5>Network Fee </h5>
                  <h4>{networkFee || '0.0000'} {currencyInfo.symbol}</h4>
                </div> */}

                  {/* <div className="col-md-6">
                  <h5>Network Fee {networkFee || '0.0000'} {currencyInfo.symbol}</h5>
                  {userCountry == 'India' && <h5>Tds Fee {formatNumber(settingsInfo.tds, 2) || '0.00'} % </h5>}
                </div> */}


                  {isDisable ?
                    <div className="col-md-6">
                      <button type="button" className="btn btn-action mt-4" disabled> Confirm </button>
                    </div> :

                    <div className="col-md-6">
                      <button type="submit" className="btn btn-action mt-4"> Make Withdraw </button>
                    </div>
                  }

                </div>
              </div>
            </div>
          </li>
        </form>
      </ul>
    </>
  );
};

export default WithdrawTab;
