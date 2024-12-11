'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
// import InnHeader from '@/components/sections/cryptonews/InnHeader';
import CryptoNewsInn from '@/components/sections/cryptonews/CryptoNewsInn';

export default function CryptoNews() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    {/* <InnHeader /> */}
                    <CryptoNewsInn />
                </div>
            </Layout>
        </>
    )
}

