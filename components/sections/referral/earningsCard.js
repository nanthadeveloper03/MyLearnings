"use client";
import React, { useState, useEffect, useMemo } from "react";
import Modal from '@/components/modal/Modal';
import Link from "next/link";
import { formatNumber, showNotification } from '@/util/common'
import EyeOffIcon from '@mui/icons-material/VisibilityOff';
import EyeOnIcon from '@mui/icons-material/Visibility';
import ReferedUsersCard from '@/components/sections/referral/referedUsersCard'


export default function EarningsCard({ referralInfo }) {

    const [isActive, setIsActive] = useState(1)
    const [rewardVisible, setRewardVisible] = useState(false)

    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }

    const [flatTabs, setFlatTabs] = useState(1)
    const handleFlatTabs = (index) => {
        setRewardVisible(false)
        setFlatTabs(index)
    }

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const [showModal1, setShowModal1] = useState(false);
    const openModal1 = () => setShowModal1(true);
    const closeModal1 = () => setShowModal1(false);


    const copyText = (textToCopy, type) => {
        let txt = (type == 1) ? 'Referral code is copied.' : 'Referral link is copied.';
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification(true, txt)
        }).catch(err => {
            //console.log('Failed to copy text: ', err);
        });
    };

    return (
        <>
            <ul className="menu-tab2 d-flex">
                <li className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}>
                    <Link href="#">All Users</Link>
                </li>
                <li className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}>
                    <Link href="#">Verified Users</Link>
                </li>
            </ul>
            <div className="row rsp-mma5">
                <div className="col-md-6 order-md-1 order-1 rsp-mpd5">
                    <div className="flat-tabs">
                        <div className="content-tab2">
                            <div className="content-inner wctab">
                                <div className="row cm_mx2">
                                    <div className="col-md-8 px-2">
                                        <div className="card-bx stacked">
                                            <div className="card-info">
                                                <p className="w-100">Referral {(flatTabs == 1) ? 'Earnings' : 'Assets'}
                                                    {rewardVisible ?
                                                        <EyeOnIcon color='warning' className="cursor-pointer mx-1" onClick={() => setRewardVisible(!rewardVisible)} /> :
                                                        <EyeOffIcon color='warning' className="cursor-pointer mx-1" onClick={() => setRewardVisible(!rewardVisible)} />
                                                    }
                                                </p>
                                                <div className="d-flex justify-content-between">
                                                    <h2 className="num-text1 d-flex flex-nowrap">
                                                        {rewardVisible ? formatNumber((flatTabs == 1) ? referralInfo.refEarn : referralInfo.refAssetEarn, referralInfo.decimalPoint) || '0.0000' : '*********  '}
                                                        <span className="mx-2 fs-20 title-color"> {referralInfo.assetCurrency} </span>
                                                    </h2>
                                                </div>
                                                <div className="d-flex bal_btn_section">
                                                    <Link href={"/withdraw/"}>
                                                        <div className="me-2 text-white balance_btn btn1"><button title=""> Withdraw </button></div>
                                                    </Link>
                                                    {/* <div className="me-2 balance_btn btn2"><button onClick={openModal}> Transfer </button></div> */}
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4 px-2">
                                        <div className="card-bx stacked">
                                            <div className="card-info">
                                                <p className="mb-3 text-center">Referral Count</p>
                                                <div className="d-flex justify-content-center">
                                                    <h2 className="num-text ref_cou">
                                                        {(flatTabs == 1) ? referralInfo.refCount : referralInfo.activeRefCount}
                                                    </h2>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ref_alert">
                                    <p>Note: You can withdraw your referral bonus only for KYC verified Users</p>
                                </div>

                                <form className="cm_formd1">
                                    <div className="block-text1">
                                        <p className="text-center finter fw400 black1">Refer a Friend and Get
                                            <span className="pri_color fs-30">
                                                {formatNumber(referralInfo.refBonus, referralInfo.decimalPoint) || '0.0000'}
                                                <span className="title-color"> {referralInfo.assetCurrency} </span>
                                            </span>
                                        </p>
                                        <div className="input-group cm_ingrp1 flex-nowrap">
                                            <input type="text" className="form-control" placeholder="Referral Code" aria-label="Referral Code" disabled />
                                            <span className="input-group-text">
                                                <span className="input-group-in">
                                                    {referralInfo.referralId}
                                                </span>
                                            </span>
                                            <button type="button" className="btn" onClick={() => copyText(referralInfo.referralId, 1)}><img src="/assets/images/nico/doc.png" title="Copy Referral Code" /></button>
                                        </div>
                                        <div className="input-group cm_ingrp1 flex-nowrap">
                                            <input type="text" className="form-control" placeholder="Referral Link" aria-label="Referral Code" disabled />
                                            <span className="input-group-text" style={{ width: '72%', overflow: 'hidden' }}>
                                                <span className="input-group-in">
                                                    {process.env.NEXT_PUBLIC_SITE_URL}/register?refCode={referralInfo.referralId}
                                                </span>
                                            </span>
                                            <button type="button" className="btn" onClick={() => copyText(process.env.NEXT_PUBLIC_SITE_URL + '/register/?refCode=' + referralInfo.referralId, 2)}><img src="/assets/images/nico/doc.png" title="Copy Referral Link" /></button>
                                        </div>
                                        {/* <div className="form-group mb-3 mt-3">
                                            <button type="button" className="btn btn-action w-100 text-center fs-20 text-white" onClick={openModal1}>Invite Now</button>
                                        </div> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 order-md-2 order-3 rsp-mpd5">
                    <div className="cm_faq2">
                        <div className="cm_faq1">
                            <h6 className="fw600 finter text-center mt-3 mb-3 text-uppercase">Faq</h6>
                            <div className="flat-accordion">

                                <div className={isActive == 1 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(1)}>
                                    <h6 className="toggle-title fs-14 fopsans fw600 black11">How does the referral program work?
                                    </h6>
                                    <div className="toggle-content" style={{ display: `${isActive == 1 ? "block" : "none"}` }}>
                                        <p> You can earn rewards by referring friends to Ultrapro Exchange using your unique referral code. For every successful referral who registers and completes KYC, you’ll earn 2 USDT.
                                        </p>
                                    </div>
                                </div>

                                <div className={isActive == 2 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(2)}>
                                    <h6 className="toggle-title fs-14 fopsans fw600 black11">How do I get my referral code?</h6>
                                    <div className="toggle-content" style={{ display: `${isActive == 2 ? "block" : "none"}` }}>
                                        <p>You can find your referral code in the 'Referral Program' section of your account dashboard. Share this code with your friends.
                                        </p>
                                    </div>
                                </div>

                                <div className={isActive == 3 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(3)}>
                                    <h6 className="toggle-title fs-14 fopsans fw600 black11"> When will I receive my referral rewards? </h6>
                                    <div className="toggle-content" style={{ display: `${isActive == 3 ? "block" : "none"}` }}>
                                        <p>Your rewards will be credited to your account immediately after your referred friend completes KYC verification.
                                        </p>
                                    </div>
                                </div>

                                <div className={isActive == 4 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(4)}>
                                    <h6 className="toggle-title fs-14 fopsans fw600 black11"> Are there any restrictions on who I can refer? </h6>
                                    <div className="toggle-content" style={{ display: `${isActive == 4 ? "block" : "none"}` }}>
                                        <p>You can refer anyone, but they must be new users who have not previously registered on Ultrapro Exchange.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="explo_bx1">
                        <h3 className="finter fw600">Begin your Crypto exploration Now!</h3>
                        <button type="button" className="btn explo_btn">Scan to Download | <img src="/assets/images/rewards/qr.png" className="img-fluid" /></button>
                    </div> */}

                    {/* <div className="card-bx stacked">
                    <div className="card-info referral_earning_box">
                        <div>
                            <p className="mb-3 fw600">Begin your Crypto exploration Now!</p>
                            <div className="d-flex bal_btn_section">
                                <div className="me-4 balance_btn btn2">
                                    <button>Scan to Download <span className="sep1"></span> <img src="/assets/images/nico/qr_ico.png" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                </div>

                <div className="col-md-12 order-md-3 order-2 rsp-mpd5">
                <div className="user_wallet_table_dashboard mb-4">               

                <ReferedUsersCard refData={referralInfo.refData || []} decimalPoint={referralInfo.decimalPoint || 8} />
                
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
                
                {/* social media popup */}

                <div className="cm_modpop3 soc_modpop3">
                    <Modal show={showModal1} onClose={closeModal1}>
                        <div className="model-head">
                            <h4>
                                Social Media
                                <span className="closebtn3 cursor-pointer" onClick={closeModal1}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                    </svg>
                                </span>
                            </h4>
                        </div>
                        <div className="d-flex flex-row soc_reflis gap-3">
                            <Link href="#" className="d-flex flex-fill justify-content-center align-items-center soc_icoref">
                                <img src="/assets/images/referral/whatsapp.png" className="img-fluid" />
                            </Link>
                            <Link href="#" className="d-flex flex-fill justify-content-center align-items-center soc_icoref">
                                <img src="/assets/images/referral/telegram.png" className="img-fluid" />
                            </Link>
                            <Link href="#" className="d-flex flex-fill justify-content-center align-items-center soc_icoref">
                                <img src="/assets/images/referral/linkedin.png" className="img-fluid" />
                            </Link>
                            <Link href="#" className="d-flex flex-fill justify-content-center align-items-center soc_icoref">
                                <img src="/assets/images/referral/facebook.png" className="img-fluid" />
                            </Link>
                            <Link href="#" className="d-flex flex-fill justify-content-center align-items-center soc_icoref">
                                <img src="/assets/images/referral/instagram.png" className="img-fluid" />
                            </Link>
                            <Link href="#" className="d-flex flex-fill justify-content-center align-items-center soc_icoref">
                                <img src="/assets/images/referral/twit.png" className="img-fluid" />
                            </Link>
                        </div>
                        <form className="mod_form2">
                            <div className="form-group">
                                <div className="input-group flex-nowrap cm_inpop1 read_inpop1">
                                    <input type="text" className="form-control" placeholder="https://danielva5g4szka.com/" disabled />
                                    <button type="button" className="btn">
                                        <img src="/assets/images/referral/copy.png" className="img-fluid" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Modal>
                </div>

            </div>

        </>
    );
}
