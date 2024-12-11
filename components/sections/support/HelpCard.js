import React from 'react';
import Link from "next/link";

const HelpCard = () => {

  return (
    <>

      <section className="supt_sc1 pb-5">
        <div className="container">
          <div className="block-text1">
            <h3 className="finter fw600 text-capitalize">Need help? We've got your back</h3>
            <p>Looking for help? We're here to assist.</p>
          </div>

          <div className="row justify-content-center ma-0 mb-2">
            <div className="col-md-12 col-12 p-0">
              <div className="help_cards">
                <div className="row ma_8">
                  <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4 pd_8">
                      <div className="card text-center align-items-center">
                          <img src="/assets/images/support/hlp1.png" className="img-fluid" />
                          <p>Disable 2FA</p>
                      </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4 pd_8">
                      <div className="card align-items-center">
                          <img src="/assets/images/support/hlp2.png" className="img-fluid" />
                          <p>Deposit Issue</p>
                      </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4 pd_8">
                      <div className="card align-items-center">
                          <img src="/assets/images/support/hlp3.png" className="img-fluid" />
                          <p>Withdrawal Issue</p>
                      </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4 pd_8">
                      <div className="card align-items-center">
                          <img src="/assets/images/support/hlp4.png" className="img-fluid" />
                          <p>Change E-mail</p>
                      </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4 pd_8">
                      <div className="card align-items-center">
                          <img src="/assets/images/support/hlp5.png" className="img-fluid" />
                          <p>KYC</p>
                      </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4 pd_8">
                      <div className="card align-items-center">
                          <img src="/assets/images/support/hlp6.png" className="img-fluid" />
                          <p>Mobile App Issue</p>
                      </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4 pd_8">
                      <div className="card align-items-center">
                          <img src="/assets/images/support/hlp7.png" className="img-fluid" />
                          <p>Listing</p>
                      </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4 pd_8">
                      <div className="card align-items-center">
                          <img src="/assets/images/support/hlp8.png" className="img-fluid" />
                          <p>Others</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>       

        </div>      
    </section >

    </>
  )
};

export default HelpCard;
