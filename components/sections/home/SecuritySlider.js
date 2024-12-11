"use client";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1, // Set to 1 for mobile if needed
  spaceBetween: 10, // Reduce space for mobile
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    1200: {
      slidesPerView: 3.5,
    },
    992: {
      slidesPerView: 2.5,
    },
    768: {
      slidesPerView: 1.5,
    },
    576: {
      slidesPerView: 1,
    },
  },
};

export default function SecuritySlider() {

  const array = [
    {
      'title': 'Secure Networks',
      'desc': 'Ensure safe and reliable trading with Ultrapro Exchange\'s secure networks, designed to protect your assets and data.',
      'icon': 'secure.png'
    },
    {
      'title': 'Transparency',
      'desc': 'We believe in full transparency. Review our transparency reports and proof of reserves—because informed users make smarter choices.',
      'icon': 'transperancy.png'
    },
    {
      'title': '2-Factor Authentication',
      'desc': 'Enhance your Ultrapro Exchange account with customizable 2-factor authentication, tailored to fit your security needs.',
      'icon': '2FA.png'
    },
    {
      'title': 'Safeguarding Your Digital Assets',
      'desc': 'We prioritize the protection of your digital assets through robust security measures designed to keep your investments safe.',
      'icon': 'safeguard.png'
    },
    {
      'title': 'End-to-End Encryption',
      'desc': 'Experience peace of mind with advanced end-to-end encryption, adhering to top industry standards for secure trading and investment.',
      'icon': 'encryption.png'
    },
    {
      'title': 'Security feature',
      'desc': 'Instant Activity Alerts: Protect your account with continuous oversight and immediate notifications of any unusual behavior..',
      'icon': 'security.png'
    },
    
  ]

  return (
    <>
      <section className="about security_slider_section">
        <div className="container">
          <div className="security_title_section">
            <span>
              <img src="/assets/images/stars-icon.svg" alt="Stars Icon" /> We
              Are Secure
            </span>
            <h2>Security Features of Ultrapro Exchange</h2>
            <p>
              Advanced Security Meets Seamless Trading. Safeguard Your Assets
              with Ultrapro Exchange’s Premier Features.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12 col-md-12">
            <div className="about_image">
              <div className="swiper img-swiper">
                <Swiper {...swiperOptions} className="swiper-wrapper">

                  {array.length > 0 && array.map(function (item, index) {
                    return (
                      <SwiperSlide  key={index}>
                        <div className="slider_col">
                          <div className="img_col">
                            <img className="img-main" src={`/assets/images/sections/home/${item.icon}`} alt="" />
                          </div>
                          <h4>{item.title}</h4>
                          <p>{item.desc}</p>
                        </div>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
                <div className="swiper-pagination" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
