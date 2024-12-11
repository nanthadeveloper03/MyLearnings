
'use client'
import Link from "next/link"
import Layout from "@/components/layout/Layout"
export default function MaintanencePage({maintanenceName,MaintananceCont}) {


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
                                    <h3 className="text-capitalize"> Our <span>{maintanenceName}</span> is under maintenance </h3>
                                    <p className="desc"> 
                                    {MaintananceCont}
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
            </Layout>
        </>
    )
}

