'use client'
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import './conmeta.css'; 
import MetaBanner from "@/components/sections/conmetamask/MetaBanner";
import ConnectNow from "@/components/sections/conmetamask/ConnectNow";
import MetaUSe from "@/components/sections/conmetamask/MetaUse";
import MetaDownload from "@/components/sections/conmetamask/MetaDownload";

export default function ConnectMetaMask() {    

    return (

        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>

                    <MetaBanner />
                    <ConnectNow />
                    <MetaUSe />   
                    <MetaDownload />   
                  
                </div>
            </Layout>
        </>

    )
}