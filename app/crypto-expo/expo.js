"use client"
import { useEffect, useState } from 'react';
import Layout from "@/components/layout/Layout";
import RegisterCard from '@/components/sections/expo/register'
import AboutCard from '@/components/sections/expo/about'
import CoinsCard from '@/components/sections/expo/coins'
import SaveCard from '@/components/sections/expo/expoSave'
import VissionCard from '@/components/sections/expo/vission'
import PartnerShipCard from '@/components/sections/expo/partnerShip'
import TopCrypto from '@/components/sections/expo/topCrypto'
import CoinToken from '@/components/sections/expo/coinToken'
import Education from '@/components/sections/expo/education'
import Testimonial from '@/components/sections/expo/testimonial'
import Faq from '@/components/sections/expo/faq'

import './expo.css'

function Expo() {

    return (
        <Layout headerStyle={1} footerStyle={1}>
            
            <RegisterCard />

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

            <AboutCard />
            <CoinsCard />
            <SaveCard />
            <VissionCard />
            <TopCrypto />
            {/* <PartnerShipCard /> */}
            
            <CoinToken />
            <Education />
            <Testimonial />
            <Faq />
            
        </Layout>
    );
}

export default Expo;