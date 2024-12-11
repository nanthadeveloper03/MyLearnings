"use client";
import Modal from '@/components/modal/Modal';
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatNumber, formatDate, showNotification, walletTypes } from "@/util/common";
import FileCopyIcon from '@mui/icons-material/FileCopy';

export default function withdrawConfirm({ showPopup, formData }) {

    const walletArray = walletTypes()
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => { setShowModal(false); }
    useEffect(() => {
        if (showPopup) {
            openModal();
        }
    }, [showPopup]);

    const copyText = (textToCopy, type) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            let text = (type == 1) ? 'Address' : 'Transaction Id'
            showNotification(true, `${text} is copied.`)
        }).catch(err => {
            //console.log('Failed to copy text: ', err);
        });
    };

    if (!formData && Object.keys(formData).length == 0) {
        return '';
    }

    let transId = (formData.status == 'Completed') ? formData.walletTxid.substring(0, 25) + '...' : formData.transactionId
    let copyTransId = (formData.status == 'Completed') ? formData.walletTxid : formData.transactionId

    return (
        <>
            <div className="cm_mod1 withd_mod1">
                <Modal show={showModal} onClose={closeModal}>
                    <div className="model-head mod_whd1">
                        Withdraw Details
                        <button type="button" className="btn cls_btn1" onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                            </svg>
                        </button>
                    </div>

                    <>
                        <div className="cm_lisw mb-4">

                            <div className="d-flex justify-content-between lisw_rw mb-3">
                                <span className="lisw_lf"> Currency </span>
                                <span className="lisw_rig fw600">{formData.currency}</span>
                            </div>
                          
                            <div className="d-flex justify-content-between lisw_rw mb-3">
                                <span className="lisw_lf"> Asset Type </span>
                                <span className="lisw_rig fw600">{walletArray[formData?.walletType] ? walletArray[formData.walletType] : '---'}</span>
                            </div>

                            {formData.networkName &&
                                <div className="d-flex justify-content-between lisw_rw mb-3">
                                    <span className="lisw_lf"> Network Type </span>
                                    <span className="lisw_rig fw600">{formData.networkName}</span>
                                </div>
                            }

                            <div className="d-flex justify-content-between lisw_rw mb-3">
                                <span className="lisw_lf"> Address </span>
                                <span className="lisw_rig fw600">{formData.withdrawAddress.substring(0, 25)} ... <FileCopyIcon color='warning' className="cursor-pointer" onClick={() => copyText(formData.withdrawAddress, 1)} /> </span>
                            </div>

                            {formData.memoId &&
                                <div className="d-flex justify-content-between lisw_rw mb-3">
                                    <span className="lisw_lf"> Destination Tag </span>
                                    <span className="lisw_rig fw600">{formData.memoId}</span>
                                </div>
                            }

                            <div className="d-flex justify-content-between lisw_rw mb-3">
                                <span className="lisw_lf"> Request Amount </span>
                                <span className="lisw_rig fw600">{formatNumber(formData.amount, formData.decimalPoint)} {formData.currency}</span>
                            </div>

                            <div className="d-flex justify-content-between lisw_rw mb-3">
                                <span className="lisw_lf"> Network Fee </span>
                                <span className="lisw_rig fw600">{formatNumber(formData.feeAmount, formData.decimalPoint)} {formData.currency}</span>
                            </div>

                            <div className="d-flex justify-content-between lisw_rw mb-3">
                                <span className="lisw_lf"> Transaction Id </span>
                                <span className="lisw_rig fw600"> {(formData?.txnExplorer) ? <Link href={formData?.txnExplorer} className='text-decoration-underline' target='_blank'>{transId?.substring(0, 8)}</Link> : transId?.substring(0, 8)} ... <FileCopyIcon color='warning' className="cursor-pointer" onClick={() => copyText(transId, 2)} /></span>
                            </div>

                            <div className="d-flex justify-content-between lisw_rw mb-3">
                                <span className="lisw_lf"> Receive Amount </span>
                                <span className="lisw_rig fw600">{formatNumber(formData.receiveAmount, formData.decimalPoint)} {formData.currency}</span>
                            </div>

                            <div className="d-flex justify-content-between lisw_rw mb-3">
                                <span className="lisw_lf"> Status </span>
                                <span className={`lisw_rig fw600 ${(formData.status == 'Pending') ? 'text-warning' : (formData.status == 'Rejected') ? 'text-danger' : (formData.status == 'Cancelled') ? 'text-danger' : 'text-success'}`}>{(formData.status == 'Completed') ? 'Approved' : formData.status}</span>
                            </div>

                            <div className="d-flex justify-content-between lisw_rw mb-3">
                                <span className="lisw_lf"> {(formData.status == 'Pending') ? ' Requested' : (formData.status == 'Rejected') ? 'Rejected' : 'Approved'} Date & Time </span>
                                <span className="lisw_rig fw600">{(formData.status == 'Pending') ? formatDate(formData.createdAt, 'MMM Do YYYY, h:mm a') : formatDate(formData.updatedAt, 'MMM Do YYYY, h:mm a')}</span>
                            </div>

                        </div>
                    </>

                </Modal>
            </div>
        </>
    );
}
