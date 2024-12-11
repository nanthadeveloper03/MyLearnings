'use client'
import Layout from "@/components/layout/Layout";
// import Link from "next/link";
import  "./ourteam.css";
import Teams from '@/components/sections/teams/OurTeams';
// import { useEffect } from "react";
// import { apiRequest } from "@/hooks/apiCall";


export default function OurTeams() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    <section className="team_sc1">
                        <div className="container">
                            <Teams />
                        </div>
                    </section>
                </div>
            </Layout>
        </>

    )
}