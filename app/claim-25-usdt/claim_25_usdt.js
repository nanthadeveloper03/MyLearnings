'use client'
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import  "./howtoclaim.css";
import  "../tasktrading/tasktrading.css";
import ComBanner from '@/components/sections/howtoclaim/ComBanner';
import ClaimVideo from '@/components/sections/howtoclaim/ClaimVideo';
import ClaimDownload from '@/components/sections/howtoclaim/ClaimDownload';
import ClaimFaq from '@/components/sections/howtoclaim/ClaimFaq';
import TaskBanner from "@/components/sections/task/TaskBanner";


export default function HowToClaim() {

    return (

        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                <ComBanner /> 
                <TaskBanner />
                {/* <ClaimVideo />                                       
                <ClaimDownload />                                        */}
                {/* <ClaimFaq />   */}
                </div>
            </Layout>
        </>

    )
}