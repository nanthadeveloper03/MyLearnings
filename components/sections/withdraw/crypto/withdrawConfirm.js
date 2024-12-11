"use client";
import Link from "next/link";
import Modal from '@/components/modal/Modal';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatNumber, showNotification, walletTypes } from "@/util/common";
import { apiRequest } from '@/hooks/apiCall';
import { useForm } from 'react-hook-form';
import FileCopyIcon from '@mui/icons-material/FileCopy';

export default function withdrawConfirm({ showPopup, formData, onSubmitWithdraw }) {

    const walletArray = walletTypes()
    const { register, handleSubmit, formState: { errors }, getValues, setValue, reset, trigger } = useForm({
        mode: 'onChange'
    });

    const router = useRouter()
    const [showOTP, setShowOTP] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const [otpLoading, setOtpLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [timeLeft, setTimeLeft] = useState(0);
    const [isResendEnabled, setIsResendEnabled] = useState(false);
    const [isDisable, setIsDisable] = useState(true);
    const [otpSend, setOtpSend] = useState(true);

    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowOTP(false)
        setShowModal(false)
        setTimeLeft(0)
        setIsDisable(true)
        setIsResendEnabled(false);
        setOtpSend(true)
    };

    const totalTimer = 120

    useEffect(() => {
        if (showPopup) {
            setValue('otp', '')
            openModal();
        }
    }, [showPopup]);

    const checkWithdrawLimit = () => {
        let totalWithdraw = parseFloat(withdrawLimit) + parseFloat(getValues('amount'))
        if (parseFloat(totalWithdraw) > parseFloat(settingsInfo.dayLimit)) {
            showNotification(false, 'You have reached 24 hours withdrawl limit.')
            return false
        } else {
            return true
        }
    }

    const sendOtp = async () => {

        // if (errors?.currency) {
        //     showNotification(false, errors?.address?.currency)
        //     return false
        // }

        // if (errors?.address) {
        //     showNotification(false, errors?.address?.message)
        //     return false
        // }

        // if (errors?.amount) {
        //     showNotification(false, errors?.amount?.message)
        //     return false
        // }

        // if (errors?.networkId) {
        //     showNotification(false, errors?.networkId?.message)
        //     return false
        // }


        // let response = checkWithdrawLimit();
        // if (!response) {
        //     return false
        // }

        setIsDisable(true)
        setOtpSend(false)
        setOtpLoading(true);
        setValue('otp', '')
        try {
            const response = await apiRequest('/withdraw/crypto/sendotp', { type: 'sendOTP' });
            if (response && response.status) {
                setTimeLeft(totalTimer)
                setIsResendEnabled(false);
            }
        } catch (error) {
            //console.log(error.response?.data?.message || error.message);
        } finally {
            setOtpLoading(false);
        }
    };

    const handleChange = (event) => {

        setIsDisable(true)

        const inputValue = event.target.value;
        const numericValue = inputValue.replace(/\D/g, '');

        if (numericValue.length <= 6) {
            setValue('otp', numericValue);
            if (numericValue.length == 6) {
                setIsDisable(false)
            }
        } else {
            setValue('otp', numericValue.slice(0, 6));
            setIsDisable(false)
        }
    };

    useEffect(() => {

        if (timeLeft === 0) {
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        if (timeLeft === 1) {
            setValue('otp', '')
            setIsResendEnabled(true);
            setIsDisable(true)
            setOtpSend(true)
        }

        return () => clearTimeout(timer);

    }, [timeLeft]);

    const onSubmit = async (data) => {
        try {
            setBtnLoading(true)
            let requestData = {
                currency: formData.currencyName,
                amount: formData.amount,
                address: formData.address,
                networkId: formData.networkId,
                networkName: formData.networkName,
                walletType: formData.walletType,
                otp: data.otp,
                memoId: formData.memoId
            }
            const response = await apiRequest('/withdraw/crypto/withdraw', requestData)
            if (response?.status) {
                onSubmitWithdraw()
                closeModal()
            }
        } catch (e) {
            console.log(e, '====')
        } finally {
            setBtnLoading(false)
        }
    }

    const copyText = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification(true, 'Address is copied.')
        }).catch(err => {
            //console.log('Failed to copy text: ', err);
        });
    };


    return (
        <>
            <div className="cm_mod1 withd_mod1">
                <Modal show={showModal} onClose={closeModal}>
                    <div className="model-head mod_whd1">
                        {showOTP ? ' One Time Password ' : 'Confirm withdrawal'}
                        <button type="button" className="btn cls_btn1" onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                            </svg>
                        </button>
                    </div>
                    <form className="mod_frm1" onSubmit={handleSubmit(onSubmit)}>

                        {!showOTP &&
                            <>

                                <div className="cm_lisw mb-4">

                                    <div className="d-flex justify-content-between lisw_rw mb-3">
                                        <span className="lisw_lf">Withdraw To Address</span>
                                        <span className="lisw_rig">{formData && formData.address.substring(0, 35) + '...' || '---'} {formData && formData.address && <FileCopyIcon color='warning' className="cursor-pointer" onClick={() => copyText(formData.address)} />} </span>
                                    </div>

                                    <div className="d-flex justify-content-between lisw_rw mb-3">
                                        <span className="lisw_lf"> Asset Type </span>
                                        <span className="lisw_rig fw600">{walletArray[formData?.walletType] ? walletArray[formData.walletType] : '---'}</span>
                                    </div>

                                    {formData && formData.networkName &&
                                        <div className="d-flex justify-content-between lisw_rw mb-3">
                                            <span className="lisw_lf">Withdraw Network</span>
                                            <span className="lisw_rig fw600">{formData && formData.networkName || '---'}</span>
                                        </div>}

                                    {formData && formData.memoId &&
                                        <div className="d-flex justify-content-between lisw_rw mb-3">
                                            <span className="lisw_lf">Destination Tag</span>
                                            <span className="lisw_rig fw600">{formData && formData.memoId || '---'}</span>
                                        </div>}

                                    <div className="d-flex justify-content-between lisw_rw mb-3">
                                        <span className="lisw_lf">Withdraw Amount</span>
                                        <span className="lisw_rig fw600">{formData && formatNumber(formData.amount, formData.decimalPoint) || '---'} {formData && formData.currencyName}</span>
                                    </div>

                                    <div className="d-flex justify-content-between lisw_rw mb-3">
                                        <span className="lisw_lf">Withdraw Fee</span>
                                        <span className="lisw_rig fw600">{formData && formatNumber(formData.fee, formData.decimalPoint) || '---'} {formData && formData.currencyName}</span>
                                    </div>

                                    <div className="d-flex justify-content-between lisw_rw mb-3">
                                        <span className="lisw_lf">Receive Amount</span>
                                        <span className="lisw_rig fw600">{formData && formatNumber(formData.receiveAmt, formData.decimalPoint) || '---'} {formData && formData.currencyName}</span>
                                    </div>

                                </div>

                            </>
                        }

                        <hr />

                        {showOTP ?

                            <>
                                <div className="form-group rsp_wd50 withd_cnp1">
                                    <div className="input-group cm_ingrp2">
                                        <input type="text" className="form-control" placeholder="Enter OTP number"
                                            {...register('otp', {
                                                required: 'OTP is required',
                                            })}
                                            onChange={handleChange}
                                            disabled={otpSend}
                                        />

                                        {isResendEnabled ?

                                            setOtpLoading ?

                                                <span className="grpbtn" onClick={sendOtp}>
                                                    <button type="button" className="btn">
                                                        Resend OTP
                                                    </button>
                                                </span> :

                                                <span className="grpbtn">
                                                    <button type="button" className="btn">
                                                        Please wait ...
                                                    </button>
                                                </span>
                                            :

                                            timeLeft > 0 ?

                                                <span className="grpbtn">
                                                    <button type="button" className="btn">
                                                        Resend in {timeLeft} seconds
                                                    </button>
                                                </span> :

                                                setOtpLoading ?

                                                    <span className="grpbtn" onClick={sendOtp}>
                                                        <button type="button" className="btn">
                                                            Send OTP
                                                        </button>
                                                    </span> :

                                                    <span className="grpbtn">
                                                        <button type="button" className="btn">
                                                            Please wait ...
                                                        </button>
                                                    </span>
                                        }

                                    </div>
                                </div>
                                {errors.otp && <span className="secondary small text-danger">{errors.otp.message}</span>}

                                {btnLoading ?

                                    <div className="text-center w-100 mt-2">
                                        <button type="button" className="btn btn-action w-100 text-white fw-bold"> Loading ...</button>
                                    </div> :

                                    isDisable ?

                                        <div className="text-center w-100 mt-2">
                                            <button type="button" className="btn btn-action w-100 text-white fw-bold" disabled> Make Withdraw</button>
                                        </div> :

                                        <div className="text-center w-100 mt-2">
                                            <button type="submit" className="btn btn-action w-100 text-white fw-bold"> Make Withdraw</button>
                                        </div>
                                }
                            </>

                            :

                            <>
                                <div className='withd_cnp1'>
                                    <p className="desc"> <span className="text-danger"> * </span> Ensure that the address is correct and on the same network.</p>
                                    <p className="desc"><b>Transaction  cannot be cancelled</b></p>
                                </div>

                                <div className="text-center w-100">
                                    <button type="button" className="btn btn-action w-100 text-white" onClick={() => setShowOTP(true)}> Confirm </button>
                                </div>
                            </>
                        }

                    </form>
                </Modal>
            </div>
        </>
    );
}
