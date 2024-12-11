import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./YouTubeSlider.module.css";
import YouTubeEmbed from "@/components/youtube/YouTubeEmbedSlider";
import { apiRequest } from "@/hooks/apiCall";
import ReactPlayer from "react-player";

const ClaimVideo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [claimList, setClaimList] = useState([]);

  const nextSlide = () => {
    if (claimList.length > 0) {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % claimList.length);
    }
  };

  const prevSlide = () => {
    if (claimList.length > 0) {
      setCurrentSlide((prevSlide) => (prevSlide === 0 ? claimList.length - 1 : prevSlide - 1));
    }
  };

  async function initLoad() {
    try {
      const response = await apiRequest("/claim/claimlist", {});
      if (response?.status) {
        let result = response?.data?.list;
        setClaimList(result);
        console.log(result, "55555555555");
      }
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false)
    }
  }

  useEffect(() => {
    initLoad();
  }, []);
  return (
    <div className="container claim_vsc">
      <div className="cm_chd1">
        <h3 className="finter fw700">How to Claim 25 USDT in Simple Steps</h3>
        {/* <h4 className="fopsans fw400">
        You can easily claim your 25 USDT by following a few simple tasks! While trading will officially launch on <b>october 9,</b> 
        you'll be able to claim your USDT on that day. After completing the tasks, you will need to <b>complete KYC</b> to verify your 
        account— <b>this is a one-time process for each user.</b> Once KYC is complete, you can withdraw your 25 USDT on any network, with no restrictions or limits!
        </h4> */}
      </div>
      <div className="row justify-content-center ma-0">
        <div className="col-md-12 col-11">
          {/* <div className="step_bk1">
            <h3 className="finter fw600 text-center">Claim Your <span className="pri_color">25 USDT</span></h3>
          </div> */}
          <ul className="step_bc1">
            <li>
            <div className="stp_ico d-flex justify-content-center align-items-center">
              <img src="/assets/images/howtoclaim/hw1.png" className="img-fluid" />
            </div>
            <h5 className="finter pri_color fw500">Register now</h5>
            <p className="fopsans fw400">Register now on our platform and get ready for the big day.</p>
            </li>
            <li>
            <div className="stp_ico d-flex justify-content-center align-items-center">
              <img src="/assets/images/howtoclaim/hw2.png" className="img-fluid" />
            </div>
            <h5 className="finter pri_color fw500">Task</h5>
            <p className="fopsans fw400">On october 9, complete a simple task to qualify for your 25 USDT.</p>
            </li>
            <li>
            <div className="stp_ico d-flex justify-content-center align-items-center">
              <img src="/assets/images/howtoclaim/hw3.png" className="img-fluid" />
            </div>
            <h5 className="finter pri_color fw500">Complete KYC</h5>
            <p className="fopsans fw400">Complete KYC (only required once) after finishing the task to verify your account.</p>
            </li>
            <li>
            <div className="stp_ico d-flex justify-content-center align-items-center">
              <img src="/assets/images/howtoclaim/hw4.png" className="img-fluid" />
            </div>
            <h5 className="finter pri_color fw500">Withdraw</h5>
            <p className="fopsans fw400">Once you've completed KYC, you can withdraw your USDT on any network!</p>
            </li>
          </ul>

          {/* <div className={styles.sliderContainer}> */}
            {/* <div className={styles.slider}>
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
          </div> */}
            {/* <div className={styles.slider}>
              {claimList && claimList.length > 0 ? (
                claimList.map((slide, index) => (
                  <div
                    key={`${slide.id}-${index}`}
                    className={`${styles.slide} ${index === currentSlide ? styles.active : ""}`}
                    style={{ display: index === currentSlide ? "block" : "none" }} 
                  >
                    {index === currentSlide && (
                      <div className={styles.videoContainer}>
                        
                        <img src={slide.claimImage} width="100%" height="100%" loading="lazy" alt={`Slide ${index}`} />

                        {slide.claimVideoLink && (
                          <ReactPlayer
                            url={slide.claimVideoLink}
                            controls={true}
                            config={{
                              file: {
                                attributes: {
                                  controlsList: "nodownload",
                                },
                              },
                            }}
                            playing={index === currentSlide}
                            muted={true} 
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center">No data found</div>
              )}
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
            </button> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default ClaimVideo;
