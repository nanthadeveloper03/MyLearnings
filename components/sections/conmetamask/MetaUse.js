import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./YouTubeSlider.module.css";
import ReactPlayer from "react-player";

const MetaUSe = () => {

  const [isVideoPlaying, setIsVideoPlaying] = useState(false); // track video playing state
  const [isVideoPlayingMobile, setIsVideoPlayingMobile] = useState(false);

  const handleImageClick = () => {
    setIsVideoPlaying(true); // show video
  };

  const handlePause = () => {
    setIsVideoPlaying(true); // Pause the video and dont show the banner
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false); //show the banner when the video ends
  }

  const handleImageClickmobile = () => {
    setIsVideoPlayingMobile(true);
  }

  const handlePauseMobile = () => {
    setIsVideoPlayingMobile(true);
  }

  const handleVideoEndMobile = () =>{
    setIsVideoPlayingMobile(false);
  }

  return (
    <>
      <section className="rew_sc1">
        <div className="container">
          <div className="block-text1">
            <h3 className="finter fw600 text-capitalize">
              {" "}
              Steps to Connect <span className="pri_color">UPRO</span> to
              MetaMask:
            </h3>
            <ol className="rew_lis1">
              <li>
                Open MetaMask Wallet Launch the MetaMask app or browser
                extension and log into your account.
              </li>
              <li>
                Choose the Browser Option In MetaMask, select the 'Browser'
                option to access websites directly within the wallet.
              </li>
              <li>
                Search for UltraProScan In the browser, type in ultraproscan.io
                and press search.
              </li>
              <li>
                Scroll Down to Find the UPRO Connect Option On the UltraProScan
                website, scroll down until you see the option to connect UPRO
                with MetaMask.
              </li>
              <li>
                Click the 'Connect UPRO with MetaMask' Button Click on the
                button, and MetaMask will prompt you to confirm the connection.
              </li>
              <li>
                Confirm the Chain ID in MetaMask will request confirmation of
                the Chain ID for Upro. Review and confirm the details.
              </li>
              <li>
                UPRO Successfully Listed in MetaMask Once confirmed, Upro will
                be successfully listed in your MetaMask wallet for easy
                management!
              </li>
            </ol>
          </div>

          <div className="row justify-content-center ma-0">
            <div className="col-md-12 col-12 rsp_w90">
              <div className="metabanvideo">
                {!isVideoPlaying ? (
                  <>
                    <div
                      className="play_bef"
                      onClick={handleImageClick}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src="/assets/images/conmeta/videobg.jpg"
                        className="img-fluid"
                      />
                    </div>
                  </>
                ) :
                  (
                    <div>
                      <ReactPlayer
                        url="https://taskvideos.s3.amazonaws.com/metamask.webm"
                        controls={true}
                        playing={true}
                        width="100%"
                        height="700px"
                        config={{
                          file: {
                            attributes: {
                              controlsList: "nodownload",
                            },
                          },
                        }}
                        onPause={handlePause} // Pause event handling
                        onEnded={handleVideoEnd}
                      />
                    </div>
                  )}
              </div>
              <div>

              </div>

              <div className="metabanvideo isMobileVideo">
                {!isVideoPlayingMobile ? (
                  <>
                    <div
                      className="play_bef"
                      onClick={handleImageClickmobile}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src="/assets/images/conmeta/mobile_banner.jpg"
                        className="img-fluid"
                      />
                    </div>
                  </>
                ): (
                  <ReactPlayer
                    url="https://taskvideos.s3.amazonaws.com/metamask-portrait.webm"
                    controls={true}
                    playing={true}
                    width="100%"
                    height="450px"
                    config={{
                      file: {
                        attributes: {
                          controlsList: "nodownload",
                        },
                      },
                    }}
                    onPause={handlePauseMobile} // Pause event handling
                    onEnded={handleVideoEndMobile}
                  />
                )}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MetaUSe;
