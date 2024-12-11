import React from 'react';
import Link from "next/link";

const ProbinBanner = () => {
  return (
    <>
      <section className="probin_bann1 ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-11">
              <div className="abt_cnb1">
                <h1 className="title finter fw600 black8">Probinar Academy</h1>
                <p>Probinar Academy offers comprehensive blockchain and cryptocurrency courses designed for all skill levels, from beginners to experts.  </p>
                <Link href={process.env.NEXT_PUBLIC_APK_URL} className="btn-action" target='_blank'>
                  Download now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProbinBanner;
