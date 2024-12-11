"use client";
import React, { useState, useEffect, useMemo } from "react";
import { formatNumber, showNotification } from '@/util/common'

export default function SumsubKyc({ geturl }) {

    const [isActive, setIsActive] = useState(1)

    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }

    return (

        <div className="row">
           
            <div className="col-sm-6">
                <div className="cm_faq2">
                <center>

                    <div className="cm_faq1">
                        <h6 className="fw600 finter text-center mt-3 mb-3 text-uppercase">Verification process </h6>
                        <div className="flat-accordion">
                            
                            
                                 <iframe width="450" height="550" src={geturl} allow="camera; microphone" title="description"></iframe> 
                            
                        </div>
                    </div></center>
                </div>

                {/* <div className="card-bx stacked">
                    <div className="card-info referral_earning_box">
                        <div>
                            <p className="mb-3 fw600">Begin your Crypto exploration Now!</p>
                            <div className="d-flex bal_btn_section">
                                <div className="me-4 balance_btn btn2">
                                    <button>Scan to Download <span className="sep1"></span> <img src="/assets/images/nico/qr_ico.png" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                
            </div>
        </div>
    );
}
