import React from 'react';
import Link from "next/link";
import { useState } from "react"


const ComBanner = () => {

  return (
    <>
      <section className="hwbann">
        <div className="container">
          <div className="cm_hban1 rsp_w100">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-7 col-sm-6" data-aos="zoom-out">
                <h1 className="froboto fw700 text-capitalize text-white">Claim USDT in
                  Simple Steps</h1>
                <p className="froboto fw400 text-white">
                Claming your USDT is quick and easy! just follow the steps outline in the video and complete the simple tasks to unlock your bonus.
                With clear instructions, you'll be guided through every step, from task completion to withdrawal.
                </p>
                <a href="/staking">
  <button type="button" className="btn btn-action text-white froboto fw400">
    Claim USDT
  </button>
</a>
 </div>
              <div className="col-md-5 col-sm-6" data-aos="zoom-in">
                <div className="hbanim">
                  <img src="/assets/images/howtoclaim/howtoclaim.png" className="img-fluid" />
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
