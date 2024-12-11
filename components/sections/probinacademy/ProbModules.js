import React from 'react';
import Link from "next/link";

const ProbModules = () => {

  const handleRedirect = () => {
  window.open('https://course-pdf.s3.amazonaws.com/COURSE_PDF.pdf', '_blank');
  };
  


  return (
    <>
      <section className="probin_mod1 ">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-6 col-sm-5">
              <div className="probm1">
                <img src="/assets/images/probinacademy/probin2.png" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-6 col-sm-7">
              <div className="probm_cn">
                <h6 className="fopsans fw700 pri_color">Modules List</h6>
                <h4 className='finter fw700'>Download 40 Modules Brochure</h4>                
                <button type='button' className='btn btn-action text-white' onClick={handleRedirect}>Download PDF!</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProbModules;
