import React from 'react';
import Link from "next/link";


const ExpoCoin = () => {
    return (
        <section className="coin_usc1">
            <div className="container">
                <div className="d-flex justify-content-center ">
                    <div className='col-md-10 rsp_w100'>

                        <div className="d-flex justify-content-between ">
                            <h4 className="text-white w-100 finter fw600">
                                <span className="rsp_w100">Top 25 Crypto Exchange Partnerships</span>
                                <button type="button" className="btn btn-action text-white float-end">See all supported exchange</button>
                            </h4>
                        </div>
                        <h6 className="finter fw400 text-white">Ultrapro, Binance, Tron, Solana and more…</h6>
                        <ul className="d-flex flex-wrap justify-content-evenly gap-3 eloglis">
                            <li><Link href="#"><img src="../assets/images/nico/elogo1.png" alt=''/></Link></li>
                            <li><Link href="#"><img src="../assets/images/nico/elogo2.png" alt='solana coin'/></Link></li>
                            <li><Link href="#"><img src="../assets/images/nico/elogo3.png" alt='cardano coin'/></Link></li>
                            <li><Link href="#"><img src="../assets/images/nico/elogo4.png" alt=' doge coin'/></Link></li>
                            <li><Link href="#"><img src="../assets/images/nico/elogo5.png" alt='chainlink coin'/></Link></li>
                            <li><Link href="#"><img src="../assets/images/nico/elogo6.png" alt='polygon'/></Link></li>
                            <li><Link href="#"><img src="../assets/images/nico/elogo7.png" alt='polkadot'/></Link></li>
                            <li><Link href="#"><img src="../assets/images/nico/elogo8.png" alt='bitcoin'/></Link></li>
                            <li><Link href="#"><img src="../assets/images/nico/elogo9.png" alt='litecoin'/></Link></li>
                            <li><Link href="#"><img src="../assets/images/nico/elogo4.png" alt=''/></Link></li>
                        </ul>

                    </div>
                </div>
            </div>
        </section>

    );
};

export default ExpoCoin;