'use client'
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from './YouTubeSlider.module.css'; // Assuming you are using CSS modules
import YouTubeEmbed from '@/components/youtube/YouTubeEmbedSlider';

export default function Aboutus() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { id: 1, videoId: "vXgIPB9UpAM" }
    ];

    useEffect(() => {
        console.log('Slide changed:', slides[currentSlide].videoId);
    }, [currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? slides.length - 1 : prevSlide - 1
        );
    };

    return (

        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    <section className="abt_sc1 d-flex align-items-center justify-content-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 rsp_w100">
                                    <div className="abt_cnb1">
                                        <h1 className="title finter fw600 black8">Learn About Ultrapro Exchange's Journey</h1>
                                        <p>We are committed to reshaping the financial landscape by making cryptocurrency accessible to everyone.</p>
                                        <Link href={process.env.NEXT_PUBLIC_APK_URL} className="btn-action" target="_blank">
                                            Download App
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="abt_sc2">
                        <div className="container center">
                            <div className="row" data-aos="fade-up" data-aos-duration={1000}>
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
                                <h3 className="cm_hda1 finter fw600 black8 text-center" data-aos="fade-up" data-aos-duration={1000}>Our Vision</h3>
                                <div className="row align-items-center" data-aos="fade-up" data-aos-duration={1000}>
                                    <div className="col-md-6 col-sm-6">
                                        <img src="../assets/images/nico/abtin1.png" className="img-fluid" />
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <p>We are committed to reshaping the financial landscape by making cryptocurrency accessible to everyone. Our platform is designed to cater to the needs of both novice and experienced traders, offering a seamless and intuitive trading experience.  </p>
                                        <p>With over 150+ cryptocurrencies available for trading, a robust and secure infrastructure, and a user-friendly interface, Ultrapro Exchange is your gateway to the world of digital assets. Our features include quick sign-up and KYC verification, easy INR transfers, an impressive dashboard, live tracking, profit and loss updates, a referral program, 24/7 customer support, ideal API trading, robust security measures, transparency reports, 2-factor authentication, and end-to-end encryption.</p>
                                    </div>
                                </div>

                                <div className="row align-items-center pt-5 pb-5">
                                    <div className="col-md-6 col-sm-6" data-aos="fade-up" data-aos-duration={1000}>
                                        <h3 className="cm_hda1 finter fw600 black8 text-center">Our Story</h3>
                                        <p>Ultrapro Exchange is one of the products of Ultrapro Blockchain. Our journey began with a vision to create a platform that is accessible, user-friendly, and secure for everyone.   </p>
                                        <p>Our goal was to create a platform that not only serves seasoned traders but also welcomes beginners with open arms. Ultrapro Exchange is the culmination of years of experience, innovation, and a relentless pursuit of excellence.</p>
                                    </div>
                                    <div className="col-md-6 col-sm-6" data-aos="fade-up" data-aos-duration={1000}>
                                        <div className="abtr fw100 posrel">
                                            <img src="../assets/images/nico/abtri2.png" className="img-fluid abtr1 posabs" />
                                            <img src="../assets/images/nico/abtri3.png" className="img-fluid abtr2 posabs" />
                                            <img src="../assets/images/nico/abtri1.png" className="img-fluid abtr3 posabs" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-center">

                                    <div className="col-md-7">
                                        <div className="block-text1 text-center">
                                            <h6>
                                                <span className="pri_color foutfit fw400 fs-18">
                                                    <img
                                                        src="../assets/images/nico/fav_ico.png"
                                                        className="img-fluid"
                                                    />
                                                    EcoSystem
                                                </span>
                                            </h6>
                                            <h3 className="finter fw600 black10">Our Ecosystem</h3>
                                        </div>
                                    </div>

                                </div>

                                <div className="ph_anim row justify-content-center align-items-center">
                                    <div className="col-md-12">
                                        <div className="ph_main">
                                            <div className="ph_lef">
                                                <ul className="icop_lis1">
                                                    <li>
                                                        <Link href="https://ultrapro.info/" target="_blank">
                                                            <span className="pico1 d-flex justify-content-center align-items-center">
                                                                <img src="../assets/images/nico/pico6.png" className="img-fluid" />
                                                            </span>
                                                            Blockchain
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="https://www.amazon.com/dp/B0CLKVQX1Q" target="_blank">
                                                            <span className="pico1 d-flex justify-content-center align-items-center">
                                                                <img src="../assets/images/nico/pico5.png" className="img-fluid" />
                                                            </span>
                                                            Wallet
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="https://ultraproscan.io/" target="_blank">
                                                            <span className="pico1 d-flex justify-content-center align-items-center">
                                                                <img src="../assets/images/nico/pico6.png" className="img-fluid" />
                                                            </span>
                                                            Explorer
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="https://upropayments.com/" target="_blank">
                                                            <span className="pico1 d-flex justify-content-center align-items-center">
                                                                <img src="../assets/images/nico/pico4.png" className="img-fluid" />
                                                            </span>
                                                            Payments
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="phone-container">

                                                <div className="wave wave1"></div>
                                                <div className="wave wave2"></div>
                                                <div className="wave wave3"></div>
                                                <div className="wave wave4"></div>
                                                <div className="wave wave5"></div>
                                                <div className="wave wave6"></div>

                                                <div className="phone">
                                                    <img src="../assets/images/nico/aiphone.png" className="img-fluid" />
                                                </div>
                                            </div>
                                            <div className="ph_rig">
                                                <ul className="icop_lis1">
                                                    <li>
                                                        <Link href="https://upronft.com/" target="_blank">
                                                            <span className="pico1 d-flex justify-content-center align-items-center">
                                                                <img src="../assets/images/nico/pico1.png" className="img-fluid" />
                                                            </span>
                                                            NFT
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="https://eenaswap.finance/" target="_blank">
                                                            <span className="pico1 d-flex justify-content-center align-items-center">
                                                                <img src="../assets/images/nico/pico2.png" className="img-fluid" />
                                                            </span>
                                                            DeFi
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">
                                                            <span className="pico1 d-flex justify-content-center align-items-center">
                                                                <img src="../assets/images/nico/pico1.png" className="img-fluid" />
                                                            </span>
                                                            Exchange
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="https://www.probinar.in/" target="_blank">
                                                            <span className="pico1 d-flex justify-content-center align-items-center">
                                                                <img src="../assets/images/nico/pico3.png" className="img-fluid" />
                                                            </span>
                                                            Probinar
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="row justify-content-center">

                                    <div className="col-md-7">
                                        <div className="block-text1 text-center">
                                            <h6>
                                                <span className="pri_color foutfit fw400 fs-18">
                                                    <img
                                                        src="../assets/images/nico/fav_ico.png"
                                                        className="img-fluid"
                                                    />
                                                    2023 - Future
                                                </span>
                                            </h6>
                                            <h3 className="finter fw600 black10">Ultrapro Roadmap</h3>
                                        </div>
                                    </div>

                                </div>

                                <div className="rdmap">
                                    <div className="rdrsp text-center">
                                    <img src="/assets/images/nico/roadmap.png" className="img-fluid" />
                                    </div>
                                    <ul className="roadmap">
                                        <li className="rd_lef">
                                            <div className="roadmap-item w-100">
                                                <div className="float-end ">
                                                    <div className="milestone">Q1 TO Q2-2023</div>
                                                    <div className="description">Development of Upro Coin and
                                                        Ultraproscan.io</div>
                                                </div>
                                            </div>
                                            <div className="roadmap-item w-100">
                                                <div className="float-end ">
                                                    <div className="milestone">Q2-2024</div>
                                                    <div className="description"> <b>Probinar</b> Educational Platform
                                                        Launch</div>
                                                </div>
                                            </div>
                                            <div className="roadmap-item w-100">
                                                <div className=" float-end">
                                                    <div className="milestone">Q3-2024</div>
                                                    <div className="description"><b>Ultrapro Crypto Exchange</b>
                                                        Launch</div>
                                                </div>
                                            </div>
                                            <div className="roadmap-item w-100">
                                                <div className=" float-end">
                                                    <div className="milestone">Q4-2024</div>
                                                    <div className="description text-end"><b>Ultrapro crypto expo</b></div>
                                                </div>
                                            </div>
                                            <div className="roadmap-item w-100">
                                                <div className=" float-end">
                                                    <div className="milestone">Q1-2025</div>
                                                    <div className="description text-end">Upro bazzar expansion,
                                                        Development of eenaswap</div>
                                                </div>
                                            </div>
                                            <div className="roadmap-item w-100">
                                                <div className=" float-end">
                                                    <div className="milestone">Q3-2025</div>
                                                    <div className="description text-end">Metaverse &
                                                        gaming platform development</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="rd_rig">
                                            <div className="roadmap-item">
                                                <div className="milestone">Q1-2023</div>
                                                <div className="description"><b>Ultrapro Blockchain</b> launched</div>
                                            </div>
                                            <div className="roadmap-item">
                                                <div className="milestone">Q3-2023</div>
                                                <div className="description">Launch of <b>Upro Coin,
                                                    <a target="_blank" href="https://Ultraproscan.io">
                                                        <b>Ultraproscan.io</b></a> </b><br /></div>
                                            </div>
                                            <div className="roadmap-item">
                                                <div className="milestone">Q2-Q3 2024</div>
                                                <div className="description">Ultrapro Crypto Exchange
                                                    Development</div>
                                            </div>
                                            <div className="roadmap-item">
                                                <div className="milestone">Q3-Q4 2024</div>
                                                <div className="description">Development of Ultrapro wallet,
                                                    upronft</div>
                                            </div>
                                            <div className="roadmap-item">
                                                <div className="milestone">Q4-2024</div>
                                                <div className="description">Launch of <b>Ultrapro wallet</b> and
                                                    <b>upronft</b></div>
                                            </div>
                                            <div className="roadmap-item">
                                                <div className="milestone">Q2 - 2025</div>
                                                <div className="description">Launch of <b>upro bazzar</b> and
                                                    <b>eenaswap</b></div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="milestone mt-2 mb-2 text-center">
                                        <b> ACHIEVEMENT <br /> CONTINUES </b>
                                    </div>
                                </div>

                                <div className="row justify-content-center ma-0">
                                    <div className="col-md-12 col-11">
                                        <div className={styles.sliderContainer}>
                                            <div className={styles.slider}>
                                                {slides.map((slide, index) => (
                                                    <div
                                                        key={`${slide.id}-${index}`}
                                                        className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                                                        style={{ display: index === currentSlide ? 'block' : 'none' }}
                                                    >
                                                        <div className={styles.videoContainer}>
                                                            <YouTubeEmbed videoId={slide.videoId} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <button className={styles.prevButton} onClick={prevSlide}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                                                </svg>
                                            </button>
                                            <button className={styles.nextButton} onClick={nextSlide}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                    <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                                </svg>
                                            </button>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="high_abt">
                        <div className="container">
                            <div className="row justify-content-center text-center ma-0">
                                <div className="col-md-10 rsp_w100 pd-0">
                                    <h3 className="cm_hda1 finter fw600 black8 text-center" data-aos="fade-up" data-aos-duration={1000}>Highlights of Ultrapro Exchange</h3>
                                    <div className="row">
                                        <div className="col-md-4 col-sm-6">
                                            <div className="high_bk">

                                                <div className="high_im d-flex align-items-center justify-content-center">
                                                    <img src="../assets/images/nico/high1.png" className="img-fluid" />
                                                </div>
                                                <h4 className="fopsans fw700">Academy</h4>
                                                <p className="fopsans fw400">A comprehensive learning platform offering educational resources and tutorials on cryptocurrency and blockchain technology.</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-6">
                                            <div className="high_bk">
                                                <div className="high_im d-flex align-items-center justify-content-center">
                                                    <img src="../assets/images/nico/high2.png" className="img-fluid" />
                                                </div>
                                                <h4 className="fopsans fw700">Whitepaper</h4>
                                                <p className="fopsans fw400">An in-depth document detailing the technical aspects, vision, and mission of the platform or project, providing transparency and trust.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-6">
                                            <div className="high_bk">
                                                <div className="high_im d-flex align-items-center justify-content-center">
                                                    <img src="../assets/images/nico/high3.png" className="img-fluid" />
                                                </div>
                                                <h4 className="fopsans fw700">Compare Other Exchanges</h4>
                                                <p className="fopsans fw400">A feature that enables users to compare different exchanges, coins, and tokens to make informed decisions about where to trade.</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-6">
                                            <div className="high_bk">
                                                <div className="high_im d-flex align-items-center justify-content-center">
                                                    <img src="../assets/images/nico/high4.png" className="img-fluid" />
                                                </div>
                                                <h4 className="fopsans fw700">USDT Bonanza</h4>
                                                <p className="fopsans fw400">A promotional offer giving new users 25 USDT upon registration, encouraging sign-ups and engagement on the platform.</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-6">
                                            <div className="high_bk">
                                                <div className="high_im d-flex align-items-center justify-content-center">
                                                    <img src="../assets/images/nico/high5.png" className="img-fluid" />
                                                </div>
                                                <h4 className="fopsans fw700">Right Exchange</h4>
                                                <p className="fopsans fw400">A tool designed to help users identify the most suitable exchanges based on various factors like security, fees, and user experience.</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-6">
                                            <div className="high_bk">
                                                <div className="high_im d-flex align-items-center justify-content-center">
                                                    <img src="../assets/images/nico/high6.png" className="img-fluid" />
                                                </div>
                                                <h4 className="fopsans fw700">Right Coins & Tokens</h4>
                                                <p className="fopsans fw400">A curated guide that assists users in selecting the best-performing coins and tokens for investment or trading.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="container">
                        <div className="row justify-content-center ma-0">
                            <div className="col-md-10 pd-0">

                                <h3 className="cm_hda1 finter fw600 black8 text-center" data-aos="fade-up" data-aos-duration={1000}>Our Impact</h3>
                                <div className="row xl_m5 md_r5" data-aos="fade-up" data-aos-duration={1000}>

                                    <div className="col-md-3 col-sm-6 col-6 md_p5 xl_p5">
                                        <div className="ab_card">
                                            <div className="aico d-flex align-items-center justify-content-center">
                                                <img src="../assets/images/icon/abti1.png" className="img-fluid" />
                                            </div>
                                            <h4 className="finter fw500 black8">Global Reach</h4>
                                            <p>Connecting traders from around the world.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6 col-6 md_p5 xl_p5">
                                        <div className="ab_card">
                                            <div className="aico d-flex align-items-center justify-content-center">
                                                <img src="../assets/images/icon/abti2.png" className="img-fluid" />
                                            </div>
                                            <h4 className="finter fw500 black8">24h Trading Volume</h4>
                                            <p>Experience high liquidity and trading volume.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6 col-6 md_p5 xl_p5">
                                        <div className="ab_card">
                                            <div className="aico d-flex align-items-center justify-content-center">
                                                <img src="../assets/images/icon/abti3.png" className="img-fluid" />
                                            </div>
                                            <h4 className="finter fw500 black8">Active Users</h4>
                                            <p>Join our growing community of global users.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6 col-6 md_p5 xl_p5">
                                        <div className="ab_card">
                                            <div className="aico d-flex align-items-center justify-content-center">
                                                <img src="../assets/images/icon/abti4.png" className="img-fluid" />
                                            </div>
                                            <h4 className="finter fw500 black8">Listed Tokens</h4>
                                            <p>Trade a diverse range of digital assets.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="abtap w-100 posrel" data-aos="fade-up" data-aos-duration={1000}>
                                    <div className="abtapb posabs w-100">
                                        <h3 className="text-white finter fw600">Download our Application</h3>
                                        <h4 className="text-white finter fw400">Available Now</h4>
                                        <ul className="d-flex gap-1 flex-wrap soc_lis2">
                                            <li>
                                                <a href={process.env.NEXT_PUBLIC_APK_URL} target="_blank">
                                                <span>
                                                    <img src="../assets/images/nico/gp1.png" alt="google play" className="img-fluid" />
                                                </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" title="coming soon">
                                                <span>
                                                    <img src="../assets/images/nico/as3.png" alt="google play" className="img-fluid" />
                                                </span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" title="coming soon">
                                                <span>
                                                    <img src="../assets/images/nico/as4.png" alt="google play" className="img-fluid" />
                                                </span>
                                                </a>
                                            </li>
                                        </ul>

                                    </div>
                                    <div className="abtapt posabs">
                                        <img src="../assets/images/nico/aicop1.png" className="img-fluid" />
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