'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"

export default function Aboutus() {

    return (

        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    <section className="banner">
                        <div className="container">

                    <div className="row justify-content-center ma-0">
                    <div className="col-md-10 pd-0">

                        <div className="row align-items-center justify-content-center">

                            <div className="col-md-6 col-sm-6 col-6 banner__content">
                                <h1 className="title finter fw600 black8">Learn About Ultrapro Exchange's Journey</h1>
                                <p className="fs-16 fibmplex fw400 desc p-0 ls-0 black8">Our mission is to empower the global free flow of digital value.</p>
                                <Link href="/register" className="btn-action">
                                    Sign Up
                                    <span className="icos">
                                        <img
                                            src="/assets/images/icon/arrow2.png"
                                            className="img-fluid"
                                        />
                                    </span>
                                </Link>
                            </div>

                            <div className="col-md-6 col-sm-6 col-6 banner__image justify-content-center" data-aos="fade-up" data-aos-duration={1000}>
                                <img
                                    src="/assets/images/icon/earth.png"
                                    className="img-fluid"
                                />
                            </div>
                            </div>
                        </div>
                        </div>
                        </div>

                    </section>
                    <section className="abt_sc2">
                        <div className="container center">
                            <div className="row"  data-aos="fade-up" data-aos-duration={1000}>
                                <div className="col-md-3 col-sm-6 col-6 tim1">
                                    <h3 className="text-white finter fw600">10M+</h3>
                                    <h6 className="text-white finter fw400">User’s worldwide</h6>
                                </div>
                                <div className="col-md-3 col-sm-6 col-6 tim1">
                                    <h3 className="text-white finter fw600">$15M+</h3>
                                    <h6 className="text-white finter fw400">Daily Average  Trading Volume (USD)</h6>
                                </div>
                                <div className="col-md-3 col-sm-6 col-6 tim1">
                                    <h3 className="text-white finter fw600">24/7</h3>
                                    <h6 className="text-white finter fw400">Customer Support </h6>
                                </div>
                                <div className="col-md-3 col-sm-6 col-6 tim1">
                                    <h3 className="text-white finter fw600">230+</h3>
                                    <h6 className="text-white finter fw400">Countries</h6>
                                </div>
                            </div>
                        </div>

                    </section>
                    <section className="abt_sc3 container">
                        <div className="row justify-content-center ma-0">
                            <div className="col-md-10 pd-0">
                                <h2 className="cm_hda1 finter fw600 black8 text-center"  data-aos="fade-up" data-aos-duration={1000}>Our Vision</h2>
                                <div className="row align-items-center"  data-aos="fade-up" data-aos-duration={1000}>
                                    <div className="col-md-6 col-sm-6">
                                        <img src="/assets/images/icon/abt1.png" className="img-fluid" />
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <p>We are committed to reshaping the financial landscape by making cryptocurrency accessible to everyone. Our platform is designed to cater to the needs of both novice and experienced traders, offering a seamless and intuitive trading experience. </p>
                                        <p>With over 150+ cryptocurrencies available for trading, a robust and secure infrastructure, and a user-friendly interface, Ultrapro Exchange is your gateway to the world of digital assets. Our features include quick sign-up and KYC verification, easy INR transfers, an impressive dashboard, live tracking, profit and loss updates, a referral program, flawless KYC verification, 24/7 customer support, ideal API trading, robust security measures, transparency reports, 2-factor authentication, and end-to-end encryption.</p>
                                    </div>
                                </div>

                                <div className="row align-items-center pt-5 pb-5">
                                    <div className="col-md-6 col-sm-6"  data-aos="fade-up" data-aos-duration={1000}>
                                        <h2 className="cm_hda1 finter fw600 black8 text-center">Our Story</h2>
                                        <p>Ultrapro Exchange is one of the products of Ultrapro Blockchain. Our journey began with a vision to create a platform that is accessible, user-friendly, and secure for everyone.  </p>
                                        <p>Our goal was to create a platform that not only serves seasoned traders but also welcomes beginners with open arms. Ultrapro Exchange is the culmination of years of experience, innovation, and a relentless pursuit of excellence.</p>
                                    </div>
                                    <div className="col-md-6 col-sm-6"  data-aos="fade-up" data-aos-duration={1000}>
                                        <div className="abtr fw100 posrel">
                                            <img src="/assets/images/icon/abtr1.png" className="img-fluid abtr1 posabs" />
                                            <img src="/assets/images/icon/abtr2.png" className="img-fluid abtr2 posabs" />
                                            <img src="/assets/images/icon/abtr3.png" className="img-fluid abtr3 posabs" />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="cm_hda1 finter fw600 black8 text-center"  data-aos="fade-up" data-aos-duration={1000}>Our Impact</h4>
                                <div className="row"  data-aos="fade-up" data-aos-duration={1000}>

                                    <div className="col-md-3 col-sm-6 col-6">
                                        <div className="ab_card">
                                            <div className="aico d-flex align-items-center justify-content-center">
                                                <img src="/assets/images/icon/abti1.png" className="img-fluid" />
                                            </div>
                                            <h4 className="finter fw500 black8">Global Reach</h4>
                                            <p>Connecting traders from around the world.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6 col-6">
                                        <div className="ab_card">
                                            <div className="aico d-flex align-items-center justify-content-center">
                                                <img src="/assets/images/icon/abti2.png" className="img-fluid" />
                                            </div>
                                            <h4 className="finter fw500 black8">24h Trading Volume</h4>
                                            <p>Experience high liquidity and trading volume.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6 col-6">
                                        <div className="ab_card">
                                            <div className="aico d-flex align-items-center justify-content-center">
                                                <img src="/assets/images/icon/abti3.png" className="img-fluid" />
                                            </div>
                                            <h4 className="finter fw500 black8">Active Users</h4>
                                            <p>Join our growing community of global users.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6 col-6">
                                        <div className="ab_card">
                                            <div className="aico d-flex align-items-center justify-content-center">
                                                <img src="/assets/images/icon/abti4.png" className="img-fluid" />
                                            </div>
                                            <h4 className="finter fw500 black8">Listed Tokens</h4>
                                            <p>Trade a diverse range of digital assets.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="abtap w-100 posrel mt-3 mb-3"  data-aos="fade-up" data-aos-duration={1000}>
                                    <div className="abtapb posabs w-100">
                                        <h3 className="text-white finter fw600">Download our Application</h3>
                                        <h4 className="text-white finter fw400">Available Now</h4>

                                        <Link href="/register" className="w-100 gp1 posabs">
                                            <img src="assets/images/icon/gp1.png" alt="google play" className="img-fluid" />
                                        </Link>

                                    </div>
                                    <div className="abtapt posabs">
                                        <img src="assets/images/icon/abtap1.png" className="img-fluid" />
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