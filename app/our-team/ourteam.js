'use client';

import Layout from "@/components/layout/Layout";
import Teams from '@/components/sections/teams/OurTeams';
import './ourteam.css';

export default function OurTeams() {
    return (
        <Layout headerStyle={1} footerStyle={1}>
            <section className="team_sc1">
                <div className="container">
                    <Teams /> {/* Component that renders the team */}
                </div>
            </section>
        </Layout>
    );
}
