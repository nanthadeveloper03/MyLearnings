import React from 'react';
import Link from "next/link";

const ComBanner = () => {
  return (
    <>
      <section className="hwbann">
        <div className="container">
          <div className="cm_hban1 rsp_w100">
            <div className="row justify-content-center align-items-center">
            <div className="col-md-7 col-sm-6" data-aos="zoom-out">
              <h1 className="froboto fw700 text-capitalize text-white">Vote for UPRO Coin and Receive 1 USDT Reward</h1>
              <p className="froboto fw400 text-white">
              Help us expand Upro Coin by voting to list it on other exchanges! Your vote matters, and as a token of our appreciation, 
              we will reward you with <b>1 USDT for every exchange you vote on.</b>
              </p>
              <button type="button" className="btn btn-action text-white froboto fw400">Coming Soon</button>
            </div>
            <div className="col-md-5 col-sm-6" data-aos="zoom-in">
            <div className="hbanim">
              <img src="/assets/images/voting/votingban.png" className="img-fluid" />
            </div>
            </div>

          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default ComBanner;
