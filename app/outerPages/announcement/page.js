'use client'

import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"

export default function Announcement() {
    const [isActive, setIsActive] = useState(1)
    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }
    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    <section className="cm_menu1">
                        <div className="container">
                            <div className="row justify-content-between ma-0">
                                <div className="col-md-6">
                                    <ul className="d-flex flex-wrap ftms">
                                        <li>
                                            <Link href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                    <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                                                </svg>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                                                </svg>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                    <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                                                </svg>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path d="M0 256C0 114.6 114.6 0 256 0S512 114.6 512 256s-114.6 256-256 256L37.1 512c-13.7 0-20.5-16.5-10.9-26.2L75 437C28.7 390.7 0 326.7 0 256zM349.6 153.6c23.6 0 42.7-19.1 42.7-42.7s-19.1-42.7-42.7-42.7c-20.6 0-37.8 14.6-41.8 34c-34.5 3.7-61.4 33-61.4 68.4l0 .2c-37.5 1.6-71.8 12.3-99 29.1c-10.1-7.8-22.8-12.5-36.5-12.5c-33 0-59.8 26.8-59.8 59.8c0 24 14.1 44.6 34.4 54.1c2 69.4 77.6 125.2 170.6 125.2s168.7-55.9 170.6-125.3c20.2-9.6 34.1-30.2 34.1-54c0-33-26.8-59.8-59.8-59.8c-13.7 0-26.3 4.6-36.4 12.4c-27.4-17-62.1-27.7-100-29.1l0-.2c0-25.4 18.9-46.5 43.4-49.9l0 0c4.4 18.8 21.3 32.8 41.5 32.8zM177.1 246.9c16.7 0 29.5 17.6 28.5 39.3s-13.5 29.6-30.3 29.6s-31.4-8.8-30.4-30.5s15.4-38.3 32.1-38.3zm190.1 38.3c1 21.7-13.7 30.5-30.4 30.5s-29.3-7.9-30.3-29.6c-1-21.7 11.8-39.3 28.5-39.3s31.2 16.6 32.1 38.3zm-48.1 56.7c-10.3 24.6-34.6 41.9-63 41.9s-52.7-17.3-63-41.9c-1.2-2.9 .8-6.2 3.9-6.5c18.4-1.9 38.3-2.9 59.1-2.9s40.7 1 59.1 2.9c3.1 .3 5.1 3.6 3.9 6.5z" />
                                                </svg>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                                                </svg>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                                    <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
                                                </svg>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <ul className="d-flex flex-wrap ftms1">
                                        <li>
                                            <Link href="#">Announcements</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Press Release</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Market Updates</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Earn</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Cryptocurrencies</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="blg_sc1">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="block-text1 text-center">
                                    <h3 className="finter fw600 black8">Announcement</h3>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-sm-10">
                                        <div className="row">

                                            <div className="col-md-4">
                                                <div className="cm_acard1 text-center">
                                                    <div className="cm_acim1">
                                                        <img src="/assets/images/nico/ann1.png" className="img-fluid" />
                                                    </div>
                                                    <div className="cm_acnt1">
                                                        <h4>MTD is Live on Ultrapro's USDT Market</h4>
                                                        <p>Jun 3, 2024
                                                            <Link href="#" className="float-end">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                                    <path fill="#1E2329" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                                                                </svg>
                                                            </Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="cm_acard1 text-center">
                                                    <div className="cm_acim1">
                                                        <img src="/assets/images/nico/ann2.png" className="img-fluid" />
                                                    </div>
                                                    <div className="cm_acnt1">
                                                        <h4>MTD is Live on Ultrapro's USDT Market</h4>
                                                        <p>Jun 3, 2024
                                                            <Link href="#" className="float-end">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                                    <path fill="#1E2329" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                                                                </svg>
                                                            </Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="cm_acard1 text-center">
                                                    <div className="cm_acim1">
                                                        <img src="/assets/images/nico/ann3.png" className="img-fluid" />
                                                    </div>
                                                    <div className="cm_acnt1">
                                                        <h4>MTD is Live on Ultrapro's USDT Market</h4>
                                                        <p>Jun 3, 2024
                                                            <Link href="#" className="float-end">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                                    <path fill="#1E2329" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                                                                </svg>
                                                            </Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="cm_acard1 text-center">
                                                    <div className="cm_acim1">
                                                        <img src="/assets/images/nico/ann1.png" className="img-fluid" />
                                                    </div>
                                                    <div className="cm_acnt1">
                                                        <h4>MTD is Live on Ultrapro's USDT Market</h4>
                                                        <p>Jun 3, 2024
                                                            <Link href="#" className="float-end">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                                    <path fill="#1E2329" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                                                                </svg>
                                                            </Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="cm_acard1 text-center">
                                                    <div className="cm_acim1">
                                                        <img src="/assets/images/nico/ann2.png" className="img-fluid" />
                                                    </div>
                                                    <div className="cm_acnt1">
                                                        <h4>MTD is Live on Ultrapro's USDT Market</h4>
                                                        <p>Jun 3, 2024
                                                            <Link href="#" className="float-end">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                                    <path fill="#1E2329" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                                                                </svg>
                                                            </Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="cm_acard1 text-center">
                                                    <div className="cm_acim1">
                                                        <img src="/assets/images/nico/ann3.png" className="img-fluid" />
                                                    </div>
                                                    <div className="cm_acnt1">
                                                        <h4>MTD is Live on Ultrapro's USDT Market</h4>
                                                        <p>Jun 3, 2024
                                                            <Link href="#" className="float-end">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                                    <path fill="#1E2329" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                                                                </svg>
                                                            </Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row cm_pag1">
                                            <ul className="pagination justify-content-center text-center">
                                                <li className="page-item">
                                                    <a className="page-link" href="#" aria-label="Previous">
                                                        <span aria-hidden="true">&laquo;</span>
                                                    </a>
                                                </li>
                                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#" aria-label="Next">
                                                        <span aria-hidden="true">&raquo;</span>
                                                    </a>
                                                </li>
                                            </ul>

                                        </div>

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