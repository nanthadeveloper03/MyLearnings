"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState } from "react";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

export default function CustomerService() {
  const { siteSocialLinks } = useSelector((state) => state.block);
  return (
    <>
      <section className="customer_support_section">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-md-6">
              <div className="section-heading ">
                <h2>Ultrapro by Your Side</h2>
              </div>
            </div>
          </div>
          <div className="row align-items-stretch">
            <div className="col-xl-6 col-md-6">
              <div className="block-text mail_box">
                <h3 className="heading">24/7 Customer Service</h3>

                <p>
                  Get quick answers and support with our FAQs and guides. For
                  personalized assistance, our team is available 24/7.
                </p>

                <div className="mail_section">
                  <Link href="mailto:info@ultraproex.com" className="title">
                    <img src="/assets/images/email.svg" /> info@ultraproex.com
                    <img src="/assets/images/viewarrow-icon.svg" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-6">
              <div className="block-text community_box">
                <h3 className="heading">Join Our Community</h3>

                <p>
                  Become part of our thriving community and stay connected with
                  the latest updates, exclusive offers, and valuable insights.
                  Engage with fellow crypto enthusiasts, share your experiences,
                  and be at the forefront of our exciting journey
                </p>

                <div className="community_icons">
                  <p className="title">Community</p>
                  <div className="mail_section">
                  <Link href={siteSocialLinks && siteSocialLinks?.telegramLink || '#'} className="title" target="_blank">
                    <img src="/assets/images/nico/tele1.png" /> Telegram Community
                    <img src="/assets/images/viewarrow-icon.svg" />
                  </Link>
                  </div>
                  {/* <ul>
                    <li>
                      <img src="/assets/images/telegram.svg" />
                    </li>
                    <li>
                      <img src="/assets/images/x.svg" />
                    </li>
                    <li>
                      <img src="/assets/images/reddit.svg" />
                    </li>
                    <li>
                      <img src="/assets/images/youtube.svg" />
                    </li>
                    <li>
                      <img src="/assets/images/in.svg" />
                    </li>
                    <li>
                      <img src="/assets/images/insta.svg" />
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
