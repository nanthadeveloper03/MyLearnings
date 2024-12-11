'use client'
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout"
import Link from "next/link";

export default function Blocked() {

    return (
        <>
            <Layout headerStyle={3} footerStyle={3}>

                <div>
                    <section className="container text-center">
                        <div className="cm_vh100">
                            <div className="cm_vhmid">
                                <div className="row justify-content-center">
                                    <div className="col-md-4 col-sm-6 col-10">
                                        <img src="../assets/images/layout/blocked.png" className="img-fluid" />
                                    </div>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="col-md-8 col-sm-8 col-10 cms_bk1">
                                        <h3 className="text-capitalize">You are <span> Restricted </span> </h3>
                                        <p className="desc">
                                            Your IP address has been flagged and is currently banned from viewing this site. To remove the ban, please contact our administrator.
                                        </p>
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

                </div>
            </Layout>
        </>
    )
}