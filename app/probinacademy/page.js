'use client'
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import './probinacademy.css'; 
import ProbinBanner from "@/components/sections/probinacademy/ProbinBanner";
import ProbinUsers from "@/components/sections/probinacademy/ProbinUsers";
import ProbIntro from "@/components/sections/probinacademy/ProbIntro";
import ProbCommunity from "@/components/sections/probinacademy/ProbCommunity";
import ProbLaunch from "@/components/sections/probinacademy/ProbLaunch";
import ProbModules from "@/components/sections/probinacademy/ProbModules";

export default function ProbinAcademy() {    

    return (

        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>

                    <ProbinBanner />
                    <ProbinUsers />
                    <ProbIntro />   
                    <ProbLaunch />
                    <ProbModules />
                    <ProbCommunity />  
                  
                </div>
            </Layout>
        </>

    )
}