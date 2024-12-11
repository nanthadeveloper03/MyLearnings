import React from 'react';
import Link from "next/link";


const Vission = () => {
    return (
        <section className="vis_sc1">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-11 rsp_w100">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="vis_bx1">
                                    <h4 className="text-white finter fw700 finter fw700"> <span className='pri_color text-uppercase'>UltraPro Exchange's</span> Vision and Commitment</h4>
                                    <p>At this expo, Ultrapro Exchange reaffirms its commitment to the highest standards of user safety, transparency, and trust.
                                    </p>
                                    <button type="button" className="btn btn-action text-uppercase text-white">
                                        Lets Talk Now
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <ul className="gen_lis">
                                    <li>
                                        <h4>Genuine Listings</h4>
                                        <p> We feature only coins that have been thoroughly vetted to ensure they benefit our users.
                                        </p>
                                    </li>
                                    <li>
                                        <h4>Local Support</h4>
                                        <p> As our user base expands, we will establish local offices to enhance support and safety.
                                        </p>
                                    </li>
                                    <li>
                                        <h4>Continuous Evaluation</h4>
                                        <p>We consistently review coins and tokens to ensure they adhere to our rigorous standards.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Vission;