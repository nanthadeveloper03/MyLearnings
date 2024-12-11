'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import ProgressBar from "@/components/progressbar/SimpleProgressBar";



const About = () => {

    const [progress1, setProgress1] = useState(0);
    const [progress2, setProgress2] = useState(0);
    const [progress3, setProgress3] = useState(0);

    useEffect(() => {

        // Progress Bar 1: Target 20%
        const interval1 = setInterval(() => {
            setProgress1((prev) => (prev < 20 ? prev + 2 : 20));
        }, 500);

        // Progress Bar 2: Target 80%
        const interval2 = setInterval(() => {
            setProgress2((prev) => (prev < 80 ? prev + 5 : 80));
        }, 300);

        // Progress Bar 3: Target 100%
        const interval3 = setInterval(() => {
            setProgress3((prev) => (prev < 100 ? prev + 7 : 100));
        }, 400);

        // Clear intervals on component unmount
        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
            clearInterval(interval3);
        };
    }, []);



    return (
        <section className="exp_sc2 d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-11 rsp_w100">
                        <div className="row">
                            <div className="col-md-6 eim1 col-sm-4">
                                <img src="../assets/images/nico/eapp2.png" alt="ultrapro - online crypto expo" className="img-fluid eapp1" />
                            </div>
                            <div className="col-md-6 ecn1 col-sm-8">
                                <h4 className="pri_color text-uppercase">About Us</h4>
                                <h3>Welcome to the <span className="pri_color">World’s First Crypto</span> Online Expo</h3>
                                <p>We are thrilled to host the world’s first crypto online expo, a pioneering event with 2.5 million participants. Unlike traditional physical events, where attendance is limited, this online expo ensures that everyone can benefit, no matter where they are.</p>
                                <div className="row">
                                    <div className="col-md-6 col-sm-8 col-7 prog1">
                                        <div className="pr_rw1">
                                            <h5>Outsource Team <span className="pri_color float-end">20%</span></h5>
                                            <ProgressBar progress={progress1} />
                                        </div>
                                        <div className="pr_rw1">
                                            <h5>Dedicated Team <span className="pri_color float-end">80%</span></h5>
                                            <ProgressBar progress={progress2} />
                                        </div>
                                        <div className="pr_rw1">
                                            <h5>Project Done <span className="pri_color float-end">100%</span></h5>
                                            <ProgressBar progress={progress3} />
                                        </div>
                                        <div className="pr_rw1">
                                            <Link href="#" className="btn btn-action text-uppercase text-white">
                                                Learn More
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-4 col-5">
                                        <img src="../assets/images/nico/eim1.png" alt="world first crypto online expo" className="img-fluid" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;