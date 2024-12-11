'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"

export default function Refundpolicy() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    <section className="abt_sc3 container">
                        <h4 className="text-center cm_hda2 fw400 finter">Refund Policy</h4>
                        <h3 className="cm_hda1 finter fw600 black1 text-center"><span className="pri_color">Ultrapro </span> Refund policy</h3>
                        <p>
                            Under no circumstances does Ultrapro allow for the cancellation or reimbursement of an order once it has been completed. When a buyer order is fully or partially matched, the sum in INR is transferred to the seller(s), and these transactions are irreversible.
                        </p>
                        <p>
                            Ultrapro reserves the right to retain or deduct the sum due from the user and transfer or refund the remaining balance in the user account unless prohibited by existing legislation. Refunds will be issued in INR, and transfers will be made to any other cryptocurrency wallet specified by the user.

                        </p>
                    </section>
                </div>
            </Layout>
        </>
    )
}