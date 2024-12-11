'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"
import Faq from "@/components/sections/home/Faq";

export default function Referralprogram() {
    const [isActive, setIsActive] = useState(1)
    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }

    // Handle redirect to referral page starts
    const handleClick1 = () => {
        window.location.href = '/referral';
    };
    // Handle redirect to referral page ends

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    <section className="ben_scb">
                        <div className="container">
                            <div className="row justify-content-center ma-0">
                                <div className="col-md-10 pd-0 rsp_w100">
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-md-7 col-sm-6">
                                            <h3 className="title finter fw600 black8 ls-0">
                                                Refer any of your friends and get a certain percentage as <span className="pri_color">a reward for each referral!</span>
                                            </h3>
                                            <ul className="cm_clis1">
                                                <li><h5>Earn hefty rewards for each referral</h5></li>
                                                <li><h5>Payment within every day, 24/7</h5></li>
                                                <li><h5>Boundless rewards and perks</h5></li>
                                            </ul>
                                            <div className="rf_fd1">
                                                <button type="button" className="btn btn-action text-white" onClick={handleClick1}>Refer</button>
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-sm-6 xl_hid text-end refer_pgm" data-aos="fade-up" data-aos-duration={1000}>
                                            <img
                                                src="../assets/images/sections/referral/app4.png"
                                                className="img-fluid"
                                                alt="ultraproex referral"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="ben_sc1">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-7 rsp_w100">
                                    <div className="block-text1 text-center">
                                        <h6>
                                            <span className="pri_color foutfit fw400 fs-18">
                                                <img
                                                    src="../assets/images/sections/referral/fav_ico.png"
                                                    className="img-fluid"
                                                    alt="benefits"
                                                />
                                                Benefits
                                            </span>
                                        </h6>
                                        <h1 className="finter fw600 black10">Benefits of  <span className="pri_color">Ultrapro Exchange's Referral Program</span></h1>
                                        <div className="row justify-content-center">
                                            <div className="col-md-9">
                                                <p className="fopsans fw400">Unlock incredible rewards with Ultrapro Exchange’s Referral Program! Here’s how you can benefit</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-10 rsp_w100">
                                    <div className="row text-center xl_m5">
                                        <div className="col-md-4 col-sm-4 xl_p5" data-aos="fade-up" data-aos-duration={1000}>
                                            <div className="cm_card2">
                                                <div className="cm_acimr1 text-center">
                                                    <div className="rico d-flex justify-content-center align-items-center">
                                                        <img src="./../assets/images/sections/referral/rico1.png" className="img-fluid" alt="Immediate Bonuses"/>
                                                    </div>
                                                </div>
                                                <h3 className="finter fw700">Immediate Bonuses</h3>
                                                <h5 className="fopsans fw400">Receive an additional 2 USDT for every friend you refer who also completes their KYC. </h5>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4 xl_p5" data-aos="fade-up" data-aos-duration={1000}>
                                            <div className="cm_card2">
                                                <div className="cm_acimr1 text-center">
                                                    <div className="rico d-flex justify-content-center align-items-center">
                                                        <img src="./../assets/images/sections/referral/rico2.png" className="img-fluid" alt="Unlimited Earnings"/>
                                                    </div>
                                                </div>
                                                <h3 className="finter fw700">Unlimited Earnings</h3>
                                                <h5 className="fopsans fw400">There’s no limit to how much you can earn. Refer as many friends as you want and watch your earnings grow!   </h5>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-4 xl_p5" data-aos="fade-up" data-aos-duration={1000}>
                                            <div className="cm_card2">
                                                <div className="cm_acimr1 text-center">
                                                    <div className="rico d-flex justify-content-center align-items-center">
                                                        <img src="./../assets/images/sections/referral/rico3.png" className="img-fluid" alt="Easy Withdrawals"/>
                                                    </div>
                                                </div>
                                                <h3 className="finter fw700">Easy Withdrawals</h3>
                                                <h5 className="fopsans fw400">Withdraw your earned USDT with  your preferred token for smooth and hassle-free withdrawals. </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="ben_sc2">
                        <div className="container ben_scin1">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-md-6 col-sm-6 rim">
                                    <img
                                        src="../assets/images/sections/referral/app5.png"
                                        className="img-fluid"
                                        alt="exchange app download"
                                    />
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="row">
                                        <div className="col-md-10" data-aos="fade-up" data-aos-duration={1000}>
                                            <h3 className="fw600 finter pri_color text-uppercase">Download app</h3>
                                            <h4 className="fw400 foutfit">Join our Referral Program today and start earning rewards while helping your friends discover the best trading experience with Ultrapro Exchange!</h4>
                                            <ul className="d-flex flex-wrap gap-2 soc_lis1">
                                                <li>
                                                    <Link href={process.env.NEXT_PUBLIC_APK_URL} target="_blank">
                                                        <img src="./../assets/images/sections/referral/gp.png" className="img-fluid" alt="exchange app playstore icon" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="#" title="coming soon">
                                                        <img src="./../assets/images/sections/referral/as1.png" className="img-fluid" alt="exchange amazon store" />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="#" title="coming soon">
                                                        <img src="./../assets/images/sections/referral/as2.png" className="img-fluid" alt="exchange app store"/>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="container ben_scf1">
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <div className="block-text1 center">
                                    <h6 className="text-uppercase fs-16 pri_color fopsans fw400">Question & Answer</h6>
                                    <h4 className="fopsans fw700">Frequently Asked Questions (FAQ)</h4>
                                    <p className="fs-16">Quick Answers to Your Most Common Questions.</p>
                                </div>
                                <div className="cm_faq1">
                                    <div className="flat-accordion">
                                        <div className={isActive == 1 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(1)}>
                                            <h6 className="toggle-title finter fw600 black8">How do I join the Referral Program?</h6>
                                            <div className="toggle-content" style={{ display: `${isActive == 1 ? "block" : "none"}` }}>
                                                <p>
                                                Sign up on Ultrapro Exchange, go to the Referral Program section, and use your referral code.  
                                                </p>
                                            </div>
                                        </div>
                                        <div className={isActive == 2 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(2)}>
                                            <h6 className="toggle-title finter fw600 black8">How do I earn rewards?</h6>
                                            <div className="toggle-content" style={{ display: `${isActive == 2 ? "block" : "none"}` }}>
                                                <p>
                                                Earn 2 USDT for every friend who registers and completes KYC with your referral code.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={isActive == 3 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(3)}>
                                            <h6 className="toggle-title finter fw600 black8">
                                            Is there a limit on referrals or rewards?
                                            </h6>
                                            <div className="toggle-content" style={{ display: `${isActive == 3 ? "block" : "none"}` }}>
                                                <p>
                                                No, you can refer to unlimited friends and earn unlimited rewards.

                                                </p>
                                            </div>
                                        </div>
                                        <div className={isActive == 4 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(4)}>
                                            <h6 className="toggle-title finter fw600 black8">How do I withdraw my rewards? </h6>
                                            <div className="toggle-content" style={{ display: `${isActive == 4 ? "block" : "none"}` }}>
                                                <p>
                                                Withdraw your USDT using your preferred token through the Withdrawal section in your account.
                                                </p>
                                            </div>
                                        </div>
                                        {/* <div className={isActive == 5 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(5)}>
                                            <h6 className="toggle-title finter fw600 black8">Can I Earn Additional USDT through Referrals?</h6>
                                            <div className="toggle-content" style={{ display: `${isActive == 4 ? "block" : "none"}` }}>
                                                <p>
                                                    Yes! You can earn an extra 2 USDT for each friend you refer to Ultrapro Exchange. To receive the referral reward, your referred friend must complete the KYC process.
                                                </p>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>

    )
}