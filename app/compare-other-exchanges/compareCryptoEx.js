'use client'
import Layout from "@/components/layout/Layout";
import  "./compare.css";
import CompareInn from '@/components/sections/compare/CompareInn';


export default function Compare() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                <CompareInn />                   
                </div>
            </Layout>
        </>
    )
}