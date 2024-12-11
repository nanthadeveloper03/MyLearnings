'use client'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Link from "next/link"
import { useRouter } from 'next/navigation';
import Layout from "@/components/layout/Layout"
import { apiRequest } from "@/hooks/apiCall";
import { checkMaintenance } from '@/store/blockSlice';
import { showNotification } from "@/util/common";

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
                <section className="container text-center">
                    <div className="cm_vh100">
                        <div className="cm_vhmid">
                            <div className="row justify-content-center">
                                <div className="col-md-4 col-sm-6 col-10">
                                <img src="../assets/images/layout/maintenance_dark.png" className="img-fluid" />
                                </div>
                            </div>

                            <div className="row justify-content-center">
                                <div className="col-md-8 col-sm-8 col-10 cms_bk1">
                                    <h3 className="text-capitalize"> Our <span>Website</span> is under maintenance </h3>
                                    <p className="desc"> {maintenanceTxt || ''} </p>
                                    <Link href="/" className="btn-action">
                                        Go to home
                                        <span className="icos">
                                            <img src="../assets/images/icon/arrow2.png" className="img-fluid" />
                                        </span>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>

                </section>
            </Layout>
        </>
    )
}

