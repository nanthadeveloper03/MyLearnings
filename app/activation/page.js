'use client'
import Link from "next/link"
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout"
import { apiRequest } from "@/hooks/apiCall";
import Loading from "../loading";
import { showNotification } from "@/util/common";

export default function Activation() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true)
    const searchParams = useSearchParams();
    const vcode = searchParams.get('vcode') || '';

    async function initLoad(tokenValue) {
        setIsLoading(true);
        let object = { vtoken: tokenValue }
        try {
            const response = await apiRequest('/auth/verification', object);
            if (response && response.status) {
                setIsLoading(false);
            } else {
                router.push('/login')
            }
            setIsLoading(false);
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        if (vcode) {
            initLoad(vcode)
        } else {
            showNotification(false, 'Invalid activation code')
            router.push('/login')
        }
    }, [vcode]);


    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Layout headerStyle={3} footerStyle={3}>
                <div>
                    <section className="container text-center">
                        <div className="cm_vh100">
                            <div className="cm_vhmid">
                                <div className="row justify-content-center">
                                    <div className="col-md-4 col-sm-6 col-10">
                                        <img src="../assets/images/layout/activation.svg" className="" />
                                    </div>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="col-md-8 col-sm-8 col-10 cms_bk1">
                                        <h3 className="text-capitalize"> Account <span> Activation </span> </h3>
                                        <p className="desc">
                                        Thanks for joining with us. Your account has been activated successfully. You can log in to your account and start to earn.
                                        </p>
                                        <Link href="/login" className="btn-action">
                                            Go to login
                                            <span className="icos">
                                                <img src="/assets/images/icon/arrow2.png" className="img-fluid" />
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </section>

                </div>
            </Layout>
        </>
    )
}