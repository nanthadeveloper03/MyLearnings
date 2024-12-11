import React from "react";
import { useSelector } from 'react-redux';
import { formatNumber } from '@/util/common'
import Link from "next/link";
import ApkDownload from "@/components/sections/home/ApkDownload";

export default function sideCard() {
    const { isTheme } = useSelector((state) => state.auth);
    return (
        <div className=" col-md-5 col-xs-12 authentcation-left-section_parent">
            <div className="logo pt-2 ms-4 pb-5 ">
                <Link className="light" href="/">
                    <img src={`/assets/images/logo/${(isTheme == 'is_light') ? 'logo.png' : 'logo-dark.png'}`} alt="" width={118} height={42} />
                </Link>
            </div>

            <div className="authentcation-left-section">
                <h3 className="heading auth_left_col">
                    <span>Trade</span> on the go. <br />
                    Anywhere, Anytime.
                </h3>
                <div className="d-flex auth_left_col_image">
                    <div className="ph_img">
                        <img src="/assets/images/ph-img-signin.svg" />
                    </div>
                    <div className="qrcode_panel">
                        <ApkDownload />
                        <p>Scan to Download App</p>
                        {/* <img src="/assets/images/app-store.svg" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
