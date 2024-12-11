'use client'
import Layout from "@/components/layout/Layout";
import  "./rightcoin.css";
import RightCoinId from '@/components/sections/rightcoinId/RightCoinId';
import RightCoinTab from '@/components/sections/rightcoinId/RightCoinTab';

export default function RightCoin() {

    return (

        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                <RightCoinId /> 
                <RightCoinTab />                                       
                </div>
            </Layout>
        </>

    )
}