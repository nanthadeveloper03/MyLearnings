'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"

export default function Referralprogram() {
    const [isActive, setIsActive] = useState(1)

    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }

    return (

        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    <section className="ben_scb">
                        <div className="container">

                            <div className="row justify-content-center ma-0">
                                <div className="col-md-10 pd-0">

                                    <div className="row">

                                        <div className="col-md-7 col-sm-6 col-6">
                                            <h3 className="title finter fw600 black8 ls-0">Refer any of your friends and get a certain percentage as <span className="pri_color">a reward for each referral!</span></h3>
                                            <ul className="cm_clis1">
                                                <li>Earn hefty rewards for each referral</li>
                                                <li>Payment within every day, 24/7</li>
                                                <li>Boundless rewards and perks</li>
                                            </ul>
                                        </div>

                                        <div className="col-md-5 col-sm-6 col-6 text-end" data-aos="fade-up" data-aos-duration={1000}>
                                            <img
                                                src="/assets/images/nico/app3.png"
                                                className="img-fluid"
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
                                <div className="col-md-6">
                                    <div className="block-text1 text-center">
                                        <h6>
                                            <span className="pri_color foutfit fw400 fs-18">
                                                <img
                                                    src="/assets/images/nico/fav_ico.png"
                                                    className="img-fluid"
                                                />
                                                Benefits
                                            </span>
                                        </h6>
                                        <h3 className="finter fw600 black10">Benefits of <span className="pri_color">Ultrapro Exchange's Referral Program</span></h3>
                                        <div className="row justify-content-center">
                                            <div className="col-md-10">
                                                <p className="fs-18 fopsans fw400">Unlock incredible rewards with Ultrapro Exchange’s Referral Program! Here’s how you can benefit</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-10">
                                    <div className="row text-center">
                                        <div className="col-md-4" data-aos="fade-up" data-aos-duration={1000}>
                                            <div className="cm_card2">
                                                <h4 className="fopsans fw400 black8">Immediate Bonuses:</h4>
                                                <h5 className="fopsans fw400 black9">Receive an additional 2 USDT for every friend you refer who also completes their KYC. </h5>
                                            </div>
                                        </div>
                                        <div className="col-md-4" data-aos="fade-up" data-aos-duration={1000}>
                                            <div className="cm_card2">
                                                <h4 className="fopsans fw400 black8">Unlimited Earnings</h4>
                                                <h5 className="fopsans fw400 black9">There’s no limit to how much you can earn. Refer as many friends as you want and watch your earnings grow!   </h5>
                                            </div>
                                        </div>
                                        <div className="col-md-4" data-aos="fade-up" data-aos-duration={1000}>
                                            <div className="cm_card2">
                                                <h4 className="fopsans fw400 black8">Easy Withdrawals</h4>
                                                <h5 className="fopsans fw400 black9">Withdraw your earned USDT with  your preferred token for smooth and hassle-free withdrawals. </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                    <section className="ben_sc2">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-10">
                                    <div className="ben_scin1">
                                        <div className="row align-items-center justify-content-center">
                                            <div className="col-md-5 text-center">
                                                <img
                                                    src="/assets/images/nico/pana.png"
                                                    className="img-fluid"
                                                />
                                            </div>
                                            <div className="col-md-7">
                                                <div className="row">
                                                    <div className="col-md-10" data-aos="fade-up" data-aos-duration={1000}>
                                                        <h4 className="fw400 fopsans text-center">Join our Referral Program today and start earning rewards while helping your friends discover the best trading experience with Ultrapro Exchange!</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>


                    <section className="ben_sc3">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="block-text1">
                                        <h4 className="finter fw600 text-center">FAQ</h4>
                                    </div>
                                    <div className="cm_faq1">
                                        <div className="flat-accordion">
                                            <div className={isActive == 1 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(1)}>
                                                <h6 className="toggle-title finter black10">Q1: How do I join the Referral Program?</h6>
                                                <div className="toggle-content" style={{ display: `${isActive == 1 ? "block" : "none"}` }}>
                                                    <p>
                                                    Ans: Sign up on Ultrapro Exchange, go to the Referral Program section, and use your referral code.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={isActive == 2 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(2)}>
                                                <h6 className="toggle-title finter black10">Q2: How do I earn rewards?</h6>
                                                <div className="toggle-content" style={{ display: `${isActive == 2 ? "block" : "none"}` }}>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                        Tellus aliquam parturient erat id vel, condimentum a,
                                                        hendrerit egestas. Auctor cras diam, dui pulvinar elit.
                                                        Egestas feugiat gravida in imperdiet facilisi tortor ac
                                                        ultrices venenatis.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={isActive == 3 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(3)}>
                                                <h6 className="toggle-title finter black10">
                                                Q3: Is there a limit on referrals or rewards?
                                                </h6>
                                                <div className="toggle-content" style={{ display: `${isActive == 3 ? "block" : "none"}` }}>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                        Tellus aliquam parturient erat id vel, condimentum a,
                                                        hendrerit egestas. Auctor cras diam, dui pulvinar elit.
                                                        Egestas feugiat gravida in imperdiet facilisi tortor ac
                                                        ultrices venenatis.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={isActive == 4 ? "flat-toggle active" : "flat-toggle"} onClick={() => handleClick(4)}>
                                                <h6 className="toggle-title finter black10">Q4: How do I withdraw my rewards?</h6>
                                                <div className="toggle-content" style={{ display: `${isActive == 4 ? "block" : "none"}` }}>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                        Tellus aliquam parturient erat id vel, condimentum a,
                                                        hendrerit egestas. Auctor cras diam, dui pulvinar elit.
                                                        Egestas feugiat gravida in imperdiet facilisi tortor ac
                                                        ultrices venenatis.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </Layout>
        </>

    )
}