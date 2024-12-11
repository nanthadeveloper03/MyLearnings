"use client";
import { useEffect, useState } from "react";
import Faq from "@/components/sections/task/Faq";
import { apiRequest } from "@/hooks/apiCall";
import { useDispatch } from "react-redux";
import "./taskPage.css";
import YouTube from "react-youtube";
const TaskBanner = () => {
  const dispatch = useDispatch();
  const [videoData, setVideoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const getTaskList = async () => {
    setIsLoading(true);
    try {
      const response = await apiRequest("/taskList");
      if (response?.status) {
        setVideoData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTaskList();
  }, []);

  const getYouTubeVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleUpdate = async (id) => {
    try {
      const postForm = {
        video_Id: id,
      };
      const response = await apiRequest("/updateTask", postForm);
      console.log(response, "response||response");
      if (response?.status) {
        getTaskList();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const [flatTabs, setFlatTabs] = useState(1);
  const handleFlatTabs = (index) => {
    setFlatTabs(index);
  };

  const handleClick = (video) => {
    handleFlatTabs(1);
    setSelectedVideo(video);
  };
  return (
    <>
      <section className="task_sc1">
        <div className="container">
          <div className="row">
            <div className="col-sm-4 rsp-mpd5">
              {videoData && videoData.length > 0 ? (
                videoData.map((video) => (
                  <div key={video.video_Id}>
                    {video.status === 1 ? (
                      <div
                        className="task-item"
                        onClick={() => handleClick(video.video_Id)}
                      >
                        <div
                          className={`task_bk1 ${
                            selectedVideo === video.video_Id ? "active" : ""
                          }`}
                        >
                          <div className="task_bim1">
                            {/* Display dynamic video thumbnail */}
                            <img
                              src={video.imageUrl}
                              alt={video.title}
                              className="img-fluid sub_task"
                            />
                            <img
                              src="/assets/images/taskbanner/play.png"
                              className="img-fluid play_ico"
                              alt="Play button"
                            />
                          </div>
                          <div className="task_bcn1">
                            <h6>{video.title}</h6>
                            <p>{video.shortDescription}</p>
                            {video.isVerified === 1 && (
                              <img
                                src="/assets/images/taskbanner/tick1.png"
                                className="img-fluid tick1"
                                alt="Verified"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="task_bk1">
                      <div
                        className="locked-video task_bim1 "
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img
                          src={video.imageUrl}
                          alt={video.title}
                          className="img-fluid sub_task"
                        />                        
                        <div className="overlay">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            width={20}
                            height={20}
                            fill="#fff"
                          >
                            <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                          </svg>
                          <p className="lock-message">This video is locked.</p>
                        </div>
                      </div>
                      <div className="task_bcn1">
                          <h6>{video.title}</h6>
                          <p>{video.shortDescription}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No video data available</p>
              )}
            </div>

            <div className="col-sm-8 rsp-mpd5 h-100">
              {videoData.length > 0 &&
                videoData.map((video) => {
                  const videoId = getYouTubeVideoId(video.url);

                  return selectedVideo === video.video_Id ||
                    (selectedVideo === null && video === videoData[0]) ? (
                    <div className="content-inner" key={video.video_Id}>
                      <div className="task_detcn1">
                        <div
                          className="tas_vidmn"
                          style={{ height: "400px", overflow: "hidden" }}
                        >
                          <YouTube
                            opts={opts}
                            videoId={videoId}
                            onEnd={() => handleUpdate(video.video_Id)}
                          />
                        </div>
                        <h4>{video.title}</h4>
                        <p>{video.shortDescription}</p>
                        <h4 className="d-flex justify-content-between">
                          Description
                        </h4>
                        <div className="task_dbcnt"
                          dangerouslySetInnerHTML={{
                            __html: video.webDescription,
                          }}
                        />
                      </div>
                    </div>
                  ) : null;
                })}
            </div>
          </div>
        </div>
      </section>

      {/* <Faq /> */}

      {/* <section className="Frequentlys pt-4">
        <div className="container">
          <div className="d-flex flex-column align-items-center">
            <h2>Question & Answer</h2>
            <h4>Frequently Asked Questions (FAQ)</h4>
            <h5>Quick Answers to Your Most Common Questions.</h5>
          </div>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>What is Ultrapro Exchange?</Accordion.Header>
              <Accordion.Body>
                Ultrapro Exchange is a global cryptocurrency platform that enables users to trade Bitcoin, Ethereum, BNB, UPRO, and over 150 other cryptocurrencies with security and efficiency.
              </Accordion.Body>
            </Accordion.Item>
           
          </Accordion>
        </div>
      </section> */}
    </>
  );
};

export default TaskBanner;
