import React from 'react';
import Link from "next/link";

const ProbinUsers = () => {
  return (
    <>
      <section className="abt_sc2">
        <div className="container center">
          <div className="row" data-aos="fade-up" data-aos-duration={1000}>
            <div className="col-md-3 col-sm-6 col-6 tim1">
              <h3 className="text-white finter fw600">40</h3>
              <h6 className="text-white finter fw400">Modules</h6>
            </div>
            <div className="col-md-3 col-sm-6 col-6 tim1">
              <h3 className="text-white finter fw600">1000+</h3>
              <h6 className="text-white finter fw400">Satisfied students</h6>
            </div>
            <div className="col-md-3 col-sm-6 col-6 tim1">
              <h3 className="text-white finter fw600">5000+</h3>
              <h6 className="text-white finter fw400">Sessions Watched</h6>
            </div>
            <div className="col-md-3 col-sm-6 col-6 tim1">
              <h3 className="text-white finter fw600">20+</h3>
              <h6 className="text-white finter fw400">Qualified Trainers</h6>
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default ProbinUsers;
