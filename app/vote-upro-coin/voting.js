'use client'
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import  "./voting.css";
import ComBanner from '@/components/sections/voting/ComBanner';
import VoteCoin from '@/components/sections/voting/VoteCoin';
import VotingDownload from '@/components/sections/voting/VotingDownload';
import VotingFaq from '@/components/sections/voting/VotingFaq';


export default function Voting() {

    return (

        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                <ComBanner /> 
                <VoteCoin />
                <VotingDownload />                                       
                <VotingFaq />  
                </div>
            </Layout>
        </>

    )
}