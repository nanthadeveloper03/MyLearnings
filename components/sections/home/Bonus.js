import Link from "next/link";

export default function Bonus({ isAuthenticated }) {
  return (
    <>
      <section className="bonus_section ">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-md-5">
              <div className="about_image">
                <img
                  className="img-about w-100"
                  src="/assets/images/crypto-excahnage-landing.png"
                  alt=""
                />
              </div>
            </div>
            <div className="col-xl-7 col-md-7">
              <div
                className="about__content"
              // data-aos="fade-up"
              // data-aos-duration={1000}
              >
                <span className="tagline_txt">USDT Bonanza</span>
                <h3 className="heading">USDT Bonanza for You!</h3>
                <p className="fs-20 desc">
                  Participate in our USDT Bonanza and earn rewards by signing up
                  and referring others.
                </p>
                <div className="about_signup mt-4">
                  <h5>Sign Up</h5>
                  <p>
                    Up to <b>10 M+</b> people can participate in the USDT
                    Bonanza. Sign up now to claim your share of <b>25 USDT </b> rewards!
                  </p>
                </div>

                {isAuthenticated ?

                  <Link href="/dashboard" className="mt-3">
                    <span> Dashboard </span>
                  </Link> :

                  <Link href="/register" className="mt-3">
                    <span> Sign Up </span>
                  </Link>
                }

                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
