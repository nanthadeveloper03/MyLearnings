'use client'
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import './crosscoin.css';
import ComBanner from "@/components/sections/crosscoin/ComBanner";
import ComContent from "@/components/sections/crosscoin/ComContent";

export default function CrossCoinWithdraw() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>

                    <ComBanner />
                    <ComContent />

                </div>
            </Layout>
        </>

    )
}