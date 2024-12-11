'use client'
import Layout from "@/components/layout/Layout";
import  "./community.css";
import CommunityInn from '@/components/sections/community/CommunityInn';

export default function Community() {
    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    <section className="team_sc1">
                        <div className="container">
                            <CommunityInn />
                        </div>
                    </section>
                </div>
            </Layout>
        </>

    )
}