import React from 'react';
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from './YouTubeSlider.module.css'; // Assuming you are using CSS modules
import YouTubeEmbed from '@/components/youtube/YouTubeEmbedSlider';


const ProbLaunch = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, videoId: "JpKPEapmCLQ" },
    { id: 2, videoId: "1dnL27wC9hI" },
    { id: 3, videoId: "QjwiWkpMuqU" },
  ];

  useEffect(() => {
    console.log('Slide changed:', slides[currentSlide].videoId);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };
  console.log(slides,"slides");
  
  return (
    <>

      <section className="abt_scal">
        <div className="container">

          <div className="row justify-content-center">

            <div className="col-md-7">
              <div className="block-text1 text-center">
                <h6 className='pri_hd'>
                <span>
                Are you ready to learn
                </span>
                </h6>
                <h3 className="finter fw600 black10">Probinar Launch</h3>
              </div>
            </div>

            <div className="row justify-content-center ma-0">
              <div className="col-md-12 col-10 rsp_w90">
                <div className={styles.sliderContainer}>
                  <div className={styles.slider}>
                    {slides.map((slide, index) => (
                      <div
                        key={`${slide.id}-${index}`}
                        className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
                        style={{ display: index === currentSlide ? 'block' : 'none' }}
                      >
                        <div className={styles.videoContainer}>
                          <YouTubeEmbed videoId={slide.videoId} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className={styles.prevButton} onClick={prevSlide}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                      <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                    </svg>
                  </button>
                  <button className={styles.nextButton} onClick={nextSlide}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                      <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default ProbLaunch;
