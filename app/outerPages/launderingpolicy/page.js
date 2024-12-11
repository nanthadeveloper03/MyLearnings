'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"

export default function Launderingpolicy() {
    return (
        <>
            <Layout headerStyle={3} footerStyle={3}>
                <div>
                    <section className="abt_sc3 container">
                                <h4 className="text-center cm_hda2 fw400 finter">Anti-money laundering policy</h4>
                                <h3 className="cm_hda1 finter fw600 black1 text-center"><span className="pri_color">Anti-money laundering</span> policy</h3>

                                <div className="mb-3 mt-3 center">
                                    <img src="assets/images/icon/laundering.png" className="img-fluid" />
                                </div>
                                
                                <h3 className="cm_hda1 finter fw600 black1">Ultrapro's <span className="pri_color">Commitment</span> to <span>Compliance</span></h3>
                                <p>We take regulatory compliance seriously, and that's why we've embraced India's new Prevention of Money Laundering Act (PMLA) laws. These laws are designed to prevent money laundering and other illegal activities in the crypto industry.</p>                           
                                <h3 className="cm_hda1 finter fw600 black1">
                                What Does <span className="pri_color">Compliance</span> Look Like for Ultrapro?
                                </h3>
                                <p>We've implemented robust Know Your Customer (KYC) procedures.</p>
                                <p>- Our Anti-Money Laundering (AML) policies are top-notch.</p>
                                <p>- We keep meticulous records of transactions.</p>
                                <p>- Regular audits and transaction monitoring are part of our routine.</p>
                                <p>- We're committed to reporting any suspicious transactions to the authorities.</p>
                                <p>- We've even appointed a principal officer to oversee our compliance efforts.</p>
                                <h3 className="cm_hda1 finter fw600 black1">Why Does <span className="pri_color">Compliance Matter</span>?</h3>
                                <p>By adhering to the new PMLA laws, Ultrapro is not only ensuring a safer environment for crypto users but also working hand in hand with regulators to build trust and transparency in the market.</p>
                                <h3 className="cm_hda1 finter fw600 black1"><span className="pri_color">Conclusion</span></h3>
                                <p>Ultrapro's dedication to compliance isn't just talk—it's action. Through measures like KYC procedures, AML policies, and transaction monitoring, we're paving the way for a more secure and transparent crypto market in India.</p>
                                <p>As the regulatory landscape evolves, Ultrapro remains steadfast in its commitment to compliance, security, and education. Join us on this journey to a safer and more accessible crypto ecosystem.</p>
                                <p>Ready to embark on your crypto journey? Empower yourself with Ultrapro, our simple and secure crypto exchange platform.</p>
                    </section>
                </div>
            </Layout>
        </>
    )
}