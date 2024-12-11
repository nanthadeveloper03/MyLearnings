'use client'
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import './markets.css'; 
import MarketInn from "@/components/sections/market/MarketInn";

export default function Market() {    

    return (

        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    <MarketInn />                    
                </div>
            </Layout>
        </>

    )
}