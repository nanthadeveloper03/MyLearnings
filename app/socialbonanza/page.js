'use client'
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import './socialbonanza.css'; 
import SocBanner from "@/components/sections/socialbonanza/SocBanner";
import SocMedia from "@/components/sections/socialbonanza/SocMedia";
import SocReward from "@/components/sections/socialbonanza/SocReward";

export default function SocialBonanza() {    

    return (

        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>

                    <SocBanner />
                    <SocMedia />
                    <SocReward />   
                  
                </div>
            </Layout>
        </>

    )
}