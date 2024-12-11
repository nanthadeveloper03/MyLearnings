// import React, { useEffect } from 'react';
// import Link from "next/link";
// import { useState } from "react";
// import { apiRequest } from '@/hooks/apiCall';
// import Loading from "@/app/loading";
// import { formatNumber, showNotification, validDecimal } from '@/util/common';
// import { useForm } from 'react-hook-form';
// import { removeWhiteSpace } from "@/util/common";
// import { useSelector } from 'react-redux';



// const WithdrawTab = () => {

//     const [bankSelected, setBankSelected] = useState(false);

//     const handleBankSelect = (event) => {
//         const selectedBank = event.target.value;
//         setBankSelected(selectedBank !== '');
//     };


//     const totalTimer = 120
//     const { user, isAuthenticated } = useSelector((state) => state.auth);

//     const { register, handleSubmit, formState: { errors }, getValues, setValue, reset, trigger } = useForm({
//         mode: 'onChange'
//     });

//     const [bankList, setBankList] = useState([])
//     const [otpLoading, setOtpLoading] = useState(false)
//     const [btnLoading, setBtnLoading] = useState(false)
//     const [withdrawLimit, setWithdrawLimit] = useState(0)
//     const [tabLoading, setTabLoading] = useState(false)
//     const [isLoading, setIsLoading] = useState(true)
//     const [currencyInfo, setCurrencyInfo] = useState({})
//     const [settingsInfo, setSettingsInfo] = useState({})
//     const [currencyList, setCurrencyList] = useState([])
//     const [balance, setBalance] = useState(0)
//     const [networkFee, setNetworkFee] = useState(0)
//     const [receiveAmt, setReceiveAmt] = useState(0)

//     const [timeLeft, setTimeLeft] = useState(0);
//     const [isResendEnabled, setIsResendEnabled] = useState(false);
//     const [isDisable, setIsDisable] = useState(true);

//     const userCountry = (isAuthenticated) ? user.country : ''

//     const getBalance = async (value) => {
//         try {
//             setTabLoading(true)
//             let currencyData = value
//             if (Object.keys(currencyData).length > 0) {
//                 const response = await apiRequest('/account/currencyBalance', { 'currency': currencyData.symbol })
//                 if (response?.status) {
//                     let data = response?.data?.balance;
//                     console.log(currencyData,'datadata');
                    
//                     let withdrawLimit = response?.data?.withdrawLimit;
//                     setCurrencyInfo(currencyData)
//                     setBalance(data)
//                     setWithdrawLimit(withdrawLimit)
//                     setIsLoading(false)
//                     setSettingsInfo(currencyData.settingsData || {})
//                 }
//             } else {
//                 showNotification(false, 'Invalid currency')
//             }
//             setTabLoading(false)
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     async function initLoad() {
//         try {
//             const response = await apiRequest('/withdraw/currencyList', { 'currencyType': 1 })
//             if (response?.status) {
//                 let data = response?.data?.currencyList;
//                 console.log(data,"data");
                
//                 setCurrencyList(data)
//                 if (data.length > 0) {
//                     await getBalance(data[0])
//                 }
//                 setIsLoading(false)
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     useEffect(() => {
//         initLoad()
//         userBanksList()
//     }, [])

//     const allowDecimal = (e) => {
//         const { value, name } = e.target;
//         const decimalPoint = currencyInfo.decimalPoint || 8;
//         const regex = new RegExp(`^(\\d+(\\.\\d{0,${decimalPoint}})?).*`);
//         const formattedValue = value.replace(/\s/g, '').replace(regex, '$1');
//         setValue(name, formattedValue, { shouldValidate: true });

//         let receiveAmt = 0
//         let networkFee = 0
//         let totalAmt = 0
//         if (settingsInfo && Object.keys(settingsInfo).length > 0 && formattedValue > 0) {
//             networkFee = (settingsInfo.feeType == 0) ? settingsInfo.fee : formattedValue * settingsInfo.fee / 100
//             totalAmt = (formattedValue > networkFee) ? formattedValue - networkFee : 0
//             receiveAmt = (userCountry == 'India') ? totalAmt - (formattedValue * settingsInfo.tds) / 100 : totalAmt
//             if (receiveAmt <= 0) {
//                 receiveAmt = 0
//             }
//         }
//         setReceiveAmt(formatNumber(receiveAmt, decimalPoint))
//         setNetworkFee(formatNumber(networkFee, decimalPoint))
//     }

//     const onSubmit = async (data) => {
//         try {
//             console.log(data, '====')
//         } catch (e) {
//             console.log(e, '====')
//         } finally {
//             setBtnLoading(false)
//         }
//     }

//     const userBanksList = async () => {
//         let response = await apiRequest('account/userBanks', { type: 'Bank' });
//         if (response && response.status) {
//             let data = response.data;
//             if (data.length > 0) {
//                 const activeBanks = data.filter(account => account.status === "Approved")
//                 setBankList(activeBanks)
//             }
//         }
//     }

//     if (isLoading) {
//         return <Loading />
//     }


//     return (
//         <div className="cm_inwbk1">
//             <form onSubmit={handleSubmit(onSubmit)} className="cm_frmw2" autoComplete='off'>

//                 <div className="form-group rsp_wd50">
//                     <label className="form-label" htmlFor="Amount">Amount</label>
//                     <div className="row ma-5">
//                         <div className="col-md-7 col-sm-7 col-6 pd-5">
//                             <input type="text" className="form-control" placeholder="Enter Amount"
//                                 {...register('amount', {
//                                     required: 'Withdraw amount is required',
//                                     validate: (value) => {
//                                         if (!/^\d*\.?\d*$/.test(value)) {
//                                             setStep(5)
//                                             return 'Invalid amount. Only numbers and decimals are allowed.';
//                                         }
//                                         const amount = parseFloat(value);
//                                         const minAmount = settingsInfo.minAmount || 0;
//                                         const maxAmount = settingsInfo.maxAmount || 0;
//                                         if (amount < minAmount) {
//                                             return `Withdraw amount should be at least ${formatNumber(minAmount, currencyInfo.decimalPoint)} ${currencyInfo.symbol}`;
//                                         }
//                                         if (amount > maxAmount) {
//                                             return `Withdraw amount should not exceed ${formatNumber(maxAmount, currencyInfo.decimalPoint)} ${currencyInfo.symbol}`;
//                                         }
//                                         return true;
//                                     }
//                                 })}
//                                 onChange={(e) => allowDecimal(e)} />
//                             {errors.amount && <span className="secondary small text-danger">{errors.amount.message}</span>}
//                         </div>
//                         <div className="col-md-5 col-sm-5 col-6 pd-5">
//                             <div className="select2bx">
//                                 <select
//                                     className="select2"
//                                     name="currency"
//                                     {...register('currency', {
//                                         required: 'Currency is required',
//                                         onChange: (e) => {
//                                             getBalance(e.target.value);
//                                             trigger('currency');
//                                         },
//                                     })}
//                                 >
//                                     <option value={''}>Select Currency</option>
//                                     <option value={''}>₹ INR</option>
//                                     {currencyList.length > 0 && currencyList.map(function (currency, index) {
//                                         return (<option value={index} key={index}>{currency.symbol}</option>)
//                                     })}
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="form-group rsp_wd50">
//                     <label className="form-label" htmlFor="Bank Account">Bank Account</label>
//                     <div className='select1'>
//                         <select {...register('bankId', {
//                             required: 'Bank name is required',
//                             validate: (value) => { return !!value.trim() }
//                         })} onChange={handleBankSelect}>
//                             <option value={''}>Select Account</option>
//                             <option value={'SBI'}>State Bank Of India</option>
//                             {bankList && bankList.length > 0 && bankList.map(function (data, index) {
//                                 return (
//                                     <option value={data.bankId}> {data.bankName} </option>
//                                 )
//                             })}
//                         </select>
//                         {errors.bankId && <span className="secondary small">{errors.bankId.message}</span>}
//                     </div>
//                 </div>

//                 {bankSelected && (
//                     <>
//                         <div className="cm_lisw2 rsp_wd50">
//                             <div className="d-flex justify-content-between lisw_rw2">
//                                 <span className="lisw_lf2">
//                                     Bank Beneficiary Name:
//                                 </span>
//                                 <span className="lisw_rig2">
//                                     Zaire Levin
//                                 </span>
//                             </div>
//                             <div className="d-flex justify-content-between lisw_rw2">
//                                 <span className="lisw_lf2">
//                                     Account Number:
//                                 </span>
//                                 <span className="lisw_rig2">
//                                     325614520008756
//                                 </span>
//                             </div>
//                             <div className="d-flex justify-content-between lisw_rw2">
//                                 <span className="lisw_lf2">
//                                     IFSC Code:
//                                 </span>
//                                 <span className="lisw_rig2">
//                                     SBI1800571
//                                 </span>
//                             </div>

//                         </div>

//                         <div className="cm_lisw3 rsp_wd50">


//                             {userCountry == 'India' &&
//                                 <div className="d-flex justify-content-between lisw_rw3">
//                                     <span className="lisw_lf3"> Fee: </span>
//                                     <span className="lisw_rig3"> {formatNumber(settingsInfo.tds, 2) || '0.00'} % </span>
//                                 </div>
//                             }

//                             <div className="d-flex justify-content-between lisw_rw3">
//                                 <span className="lisw_lf3">
//                                     Amount received:
//                                 </span>
//                                 <span className="lisw_rig3">
//                                     980 INR
//                                 </span>
//                             </div>

//                         </div>

//                         <div className="cm_lisw rsp_wd50 mb-3">
//                     <div className="d-flex justify-content-between lisw_rw3">
//                         <span className="lisw_lf3"> Available amount </span>
//                         <span className="lisw_rig3"> {formatNumber(balance, currencyInfo.decimalPoint)} {currencyInfo.symbol} </span>
//                     </div>
//                 </div>

//                 <div className="row mb-3">
//                     <div className="col-md-7">
//                         <p className="text-muted hintx">Note: Minimum amount withdraw 500 INR</p>


//                     </div>
//                 </div>

//                 <div className="form-group rsp_wd50">
//                     {btnLoading ?
//                         <button type="button" className="btn btn-action text-white fw600 w-100"> Loading ...</button> :
//                         isDisable ?
//                             <button type="button" className="btn btn-action text-white fw600 w-100" disabled> Withdraw</button> :
//                             <button type="submit" className="btn btn-action text-white fw600 w-100"> Withdraw</button>
//                     }
//                 </div>

//                     </>

//                 )}

               

//             </form>
//         </div>
//     );
// };

// export default WithdrawTab;
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { apiRequest } from '@/hooks/apiCall';
import Loading from '@/app/loading';
import { formatNumber, showNotification } from '@/util/common';
import { useSelector } from 'react-redux';
import WithdrawConfirm from "./withdrawConfirm"
import { toast } from 'react-toastify';

const WithdrawTab = () => {
    const [bankSelected, setBankSelected] = useState(false);
    const [bankList, setBankList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currencyList, setCurrencyList] = useState([]);
    const [settingsInfo, setSettingsInfo] = useState({});
    const [balance, setBalance] = useState(0);
    const [currencyInfo, setCurrencyInfo] = useState({});
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [showPopup, setShowPopup] = useState()
  const [formData, setFormData] = useState()

    const [feeAmount, setFeeAmount] = useState(10)

    const userCountry = isAuthenticated ? user.country : '';

    useEffect(() => {
        initLoad();
        useBanks();
    }, []);




    const initLoad = async () => {
        try {
            const response = await apiRequest('/withdraw/currencyList', { currencyType: 1 });
            if (response?.status) {
                const data = response?.data?.currencyList;
                setCurrencyList(data);
                // if (data.length > 0) {
                //     await getBalance(data[0]);
                // }
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

  async function useBanks() {

    try {
      const response = await apiRequest('/getBankList');
      if (response?.status) {
        let result = response?.data;
        console.log(response?.data,'response?.data');
        
        setBankList(result.userBank ?? [])
        setFeeAmount(result?.feeAmount)





      }

    } catch (error) {
      console.error(error);
    }
  }



    const getBalance = async (value) => {
        
        try {
            const response = await apiRequest('/account/dashboardinfo', { symbol: value.symbol });
            console.log(response.status,'valuevalue');
            if (response.status) {  
                console.log(response.data,"HHHHHHHHHHHHHHHHHHHHHHHHHH")
                
                setBalance(response.data.walletInfo.spotAsset);
                setCurrencyInfo(value);
                // setSettingsInfo(settingsData || {});
            } else {
                showNotification(false, 'Invalid currency');
            }
        } catch (error) {
            console.error(error);
        }
    };



    const formik = useFormik({
        initialValues: {
            amount: '',
            currency: '',
            bankId: '',
        },
        validationSchema : Yup.object({
            amount: Yup.number()
                .typeError('Amount must be a number')
                .required('Withdraw amount is required')
                .positive('Amount must be positive')
                .test('min-max', 'Amount out of range', (value) => {
                    if (!value) return false;
                    const minAmount = settingsInfo.minAmount || 0;
                    const maxAmount = settingsInfo.maxAmount || Infinity;
                    return value >= minAmount && value <= maxAmount;
                }),
            currency: Yup.string().required('Currency is required'),
            bankId: Yup.string().required('Bank name is required'),
        }),
        onSubmit: async (values) => {
            console.log('Submitted Values:', values);
            const bankDetails = bankList.find(
                (item) => item.bankId === Number(values.bankId)
              );
              setFormData({
                ...values,
                ...bankDetails,
                feeAmount
            });
            if (Number(values.amount) <= balance) {
                
                setShowPopup(Math.random(10, 100000000000))
            }else{
                toast.dismiss()
                toast.error("Insufficient Balance")
            }
        },
    });

    const resetWithdrawForm=()=>{
        formik.resetForm()
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="cm_inwbk1">
      <WithdrawConfirm showPopup={showPopup} formData={formData} onSubmitWithdraw={resetWithdrawForm} />

            <form onSubmit={formik.handleSubmit} className="cm_frmw2" autoComplete="off">

            <div className="form-group rsp_wd50">
                    <label className="form-label" htmlFor="Bank Account">Bank Account</label>
                    <select
                        id="bankId"
                        className="form-control"
                        {...formik.getFieldProps('bankId')}
                        onChange={(e) => {
                            formik.handleChange(e);
                            setBankSelected(e.target.value !== '');
                        }}
                    >
                        <option value="">Select Bank</option>
                        {bankList.map((bank) => (
                            <option key={bank.bankId} value={bank.bankId}>
                                {bank.bankName} ({bank.accountNumber})
                            </option>
                        ))}
                    </select>
                    {formik.touched.bankId && formik.errors.bankId && (
                        <span className="secondary small text-danger">{formik.errors.bankId}</span>
                    )}
                </div>
                <div className="form-group rsp_wd50">
                    <label className="form-label" htmlFor="Currency">Currency</label>
                    <select
                        id="currency"
                        className="form-control"
                        {...formik.getFieldProps('currency')}
                        onChange={(e) => {
                            formik.handleChange(e);
                            const selectedCurrency = currencyList.find((item) => item.symbol === e.target.value);
                            getBalance(selectedCurrency);
                        }}
                    >
                        <option value="">Select Currency</option>
                        {currencyList.map((currency, index) => (
                            <option key={index} value={currency.symbol}>
                                {currency.symbol}
                            </option>
                        ))}
                    </select>
                    {formik.touched.currency && formik.errors.currency && (
                        <span className="secondary small text-danger">{formik.errors.currency}</span>
                    )}
                </div>

                <div className="form-group rsp_wd50">
                    <label className="form-label" htmlFor="Amount">Amount</label>
                    <input
                        type="text"
                        className="form-control"
                        id="amount"
                        placeholder="Enter Amount"
                        {...formik.getFieldProps('amount')}
                    />
                    {formik.touched.amount && formik.errors.amount && (
                        <span className="secondary small text-danger">{formik.errors.amount}</span>
                    )}
                </div>


               

              

                {balance > 0 ? (
                    <>
                        <div className="cm_lisw3 rsp_wd50 mb-3">
                            <div className="d-flex justify-content-between lisw_rw3">
                                <span className="lisw_lf3">Available Amount</span>
                                <span className="lisw_rig3">{formatNumber(balance, currencyInfo.decimalPoint)}</span>
                            </div>
                        </div>
                    </>
                ):formik.values.currency &&
                <>
                <div className="cm_lisw3 rsp_wd50 mb-3">
                    <div className="d-flex justify-content-between lisw_rw3">
                        <span className="lisw_lf3">Available Amount</span>
                        <span className="lisw_rig3">0.00</span>
                    </div>
                </div>
            </>
                
                }

                <div className="form-group rsp_wd50">
                    <button type="submit" className="btn btn-action text-white fw600 w-100">
                        Withdraw
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WithdrawTab;
