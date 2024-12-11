'use client'
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import './support.css'; 
import SupportBanner from "@/components/sections/support/SupportBanner";
import ConnectNow from "@/components/sections/support/ConnectNow";
import HelpCard from "@/components/sections/support/HelpCard";
import ChatSupport from "@/components/sections/support/ChatSupport";

export default function Support() {    

    return (

        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>

                    <SupportBanner />
                    <ConnectNow />
                    <HelpCard />
                    <ChatSupport />
                  
                </div>
            </Layout>
        </>

    )
}