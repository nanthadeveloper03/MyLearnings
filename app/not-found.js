'use client'
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout"
import Link from "next/link";

export default function NotFound() {

    return (
        <>
            <Layout headerStyle={3} footerStyle={3}>

                <div>
                    <section className="container text-center">
                        <div className="cm_vh100">
                            <div className="cm_vhmid">
                                <div className="row justify-content-center">
                                    <div className="col-md-4 col-sm-6 col-10">
                                        <img src="../assets/images/layout/404.svg" className="img-fluid" />
                                    </div>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="col-md-8 col-sm-8 col-10 cms_bk1">
                                        <h3 className="text-capitalize">Page <span>has</span> not found!</h3>
                                        <p className="desc">
                                            Sorry we can't seem to find the page you're looking for. <br /> It might be an old link or may be it moved
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