'use client'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Link from "next/link"
import { useRouter } from 'next/navigation';
import Layout from "@/components/layout/Layout"
import { apiRequest } from "@/hooks/apiCall";
import { checkMaintenance } from '@/store/blockSlice';
import { showNotification } from "@/util/common";
import './maintenance.css';

export default function Activation() {
    const dispatch = useDispatch()
    const { isMaintenance, maintenanceTxt } = useSelector((state) => state.block);
    const [loading, setLoading] = useState(true);
    const router = useRouter();


    const checkMaintenanceMode = async () => {
        try {
            const response = await apiRequest('/account/siteInfo', {});
            if (response?.data) {
                if (!response?.data?.isMaintenance) {
                    dispatch(checkMaintenance(object))
                    window.location.href = "/"
                } else {
                    showNotification(false, 'Site is still under maintenance')
                }
            }
        } catch (error) {
            console.error('Failed to check maintenance mode:', error);
        } finally {
            setLoading(false);
        }
    };


    function redirectPage() {
        //checkMaintenanceMode()
    }

    return (
        <>
            <Layout headerStyle={3} footerStyle={3} breadcrumbTitle="Wallet">
                <section className="container-fluid p-0">
                         <div className="mainten_ban">
                            <img src="/assets/images/maintenance/Undermain.jpg" className="img-fluid" />
                         </div>                         
                </section>
            </Layout>
        </>
    )
}