"use client";
import { useEffect, useState } from "react";
import YouTubeEmbed from "@/components/youtube/YouTubeEmbed";
import Faq from "@/components/sections/task/Faq";
import Accordion from "react-bootstrap/Accordion";
import { apiRequest } from "@/hooks/apiCall";
import { useDispatch } from "react-redux";
import "./taskPage.css";
import YouTube from 'react-youtube';
const TaskBanner = () => {
  const dispatch = useDispatch();
  const [videoData, setVideoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch task list
  const getTaskList = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await apiRequest("/taskList");
      console.log(response, "response||response");
      if (response?.status) {
        setVideoData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  };

  useEffect(() => {
    getTaskList(); // Fetch task list on component mount
  }, []);

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  
  const handleUpdate = async(id)=>{
    try{
      const postForm = {
        video_Id:id
      };
      const response = await apiRequest('/updateTask',postForm);
      console.log(response, "response||response");
      if (response?.status) {
         getTaskList();
       // setVideoData(response.data.data);
      }

    }catch(error){
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  };
  const opts = {
    height: "270",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const [flatTabs, setFlatTabs] = useState(1)
  const handleFlatTabs = (index) => {
    setFlatTabs(index)
  }

 

  return (
    <>

      <section className="task_sc1">
        <div className="container">
          <div className="row rsp-mma5">
            <div className="col-sm-4 rsp-mpd5">          

              <div className={flatTabs === 1 ? "active" : ""} onClick={() => handleFlatTabs(1)}>

              <div className="task_bk1">
                <div className="task_bim1">
                  <img src="/assets/images/taskbanner/client1.png" className="img-fluid sub_task" />
                  <img src="/assets/images/taskbanner/play.png" className="img-fluid play_ico" />
                </div>
                <div className="task_bcn1">                  
                <h6>Task 2 - Margin & Future Trading</h6>
                <p>Use as collateral in Portfolio Margin for margin / futures trading</p>
                  <img src="/assets/images/taskbanner/tick1.png" className="img-fluid tick1" />
                </div>
              </div>

              </div>

              <div className={flatTabs === 2 ? "active" : ""} onClick={() => handleFlatTabs(2)}>

              <div className="task_bk1">
                <div className="task_bim1">                  
                  <img src="/assets/images/taskbanner/client1.png" className="img-fluid sub_task" />
                  <div className="overlay">
                  <img src="/assets/images/taskbanner/lock.png" className="img-fluid lock_ico" />
                  </div>
                </div>
                <div className="task_bcn1">                  
                <h6>Task 2 - Margin & Future Trading</h6>
                <p>Use as collateral in Portfolio Margin for margin / futures trading</p>
                  <img src="/assets/images/taskbanner/tick1.png" className="img-fluid tick1" />
                </div>
              </div>

              </div>

              <div className={flatTabs === 3 ? "active" : ""} onClick={() => handleFlatTabs(3)}>

              <div className="task_bk1">
                <div className="task_bim1">                  
                  <img src="/assets/images/taskbanner/client1.png" className="img-fluid sub_task" />
                  <div className="overlay">
                  <img src="/assets/images/taskbanner/lock.png" className="img-fluid lock_ico" />
                  </div>
                </div>
                <div className="task_bcn1">                  
                <h6>Task 2 - Margin & Future Trading</h6>
                <p>Use as collateral in Portfolio Margin for margin / futures trading</p>
                  <img src="/assets/images/taskbanner/tick1.png" className="img-fluid tick1" />
                </div>
              </div>

              </div>             

            </div>
            <div className="col-sm-8 rsp-mpd5">

            <div className="content-inner" style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}>

              <div className="task_detcn1">
                <div className="tas_vidmn">
                  <YouTube opts={opts} videoId="HdapJJN_dx0" />
                </div>
                <h4>Task 1 -Margin & Future Trading</h4>
                <p>Use as collateral in Portfolio Margin for margin / futures trading</p>
                <h4 className="d-flex justify-content-between">
                  Description 
                  <button type="button" className="btn btn-action text-white">Copy</button>
                </h4>
                <p>Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc. Dolor at volutpat amet nisl nibh at leo lacus nulla. At lectus ullamcorper porttitor ipsum. Diam tristique diam ut eget. ReadMore</p>
                <h6>Steps to follow</h6>
                <ul>
                  <li>
                  Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc.Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc
                  </li>
                  <li>
                  Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc. Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc
                  </li>
                  <li>
                  Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc.Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc
                  </li>
                  <li>
                  Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc. Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc
                  </li>
                  <li>
                  Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc.Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc
                  </li>
                  <li>
                  Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc. Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc
                  </li>
                </ul>

              </div>

              </div>

              <div className="content-inner" style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}>

              <div className="task_detcn1">
                <div className="tas_vidmn">
                  <YouTube opts={opts} videoId="DzSxO33sZZk" />
                </div>
                <h4>Task 1 -Margin & Future Trading</h4>
                <p>Use as collateral in Portfolio Margin for margin / futures trading</p>
                <h4 className="d-flex justify-content-between">
                  Description 
                  <button type="button" className="btn btn-action text-white">Copy</button>
                </h4>
                <p>Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc. Dolor at volutpat amet nisl nibh at leo lacus nulla. At lectus ullamcorper porttitor ipsum. Diam tristique diam ut eget. ReadMore</p>
                <h6>Steps to follow</h6>
                <ul>
                  <li>
                  Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc.Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc
                  </li>
                  <li>
                  Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc. Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc
                  </li>
                  <li>
                  Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc.Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc
                  </li>
                  <li>
                  Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc. Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc
                  </li>
                  <li>
                  Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc.Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc
                  </li>
                  <li>
                  Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc. Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc
                  </li>
                </ul>

              </div>

              </div>

              <div className="content-inner" style={{ display: `${flatTabs === 3 ? "block" : "none"}` }}>

              <div className="task_detcn1">
                <div className="tas_vidmn">
                  <YouTube opts={opts} videoId="QjwiWkpMuqU" />
                </div>
                <h4>Task 1 -Margin & Future Trading</h4>
                <p>Use as collateral in Portfolio Margin for margin / futures trading</p>
                <h4 className="d-flex justify-content-between">
                  Description 
                  <button type="button" className="btn btn-action text-white">Copy</button>
                </h4>
                <p>Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc. Dolor at volutpat amet nisl nibh at leo lacus nulla. At lectus ullamcorper porttitor ipsum. Diam tristique diam ut eget. ReadMore</p>
                <h6>Steps to follow</h6>
                <ul>
                  <li>
                  Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc.Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc
                  </li>
                  <li>
                  Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc. Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc
                  </li>
                  <li>
                  Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc.Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc
                  </li>
                  <li>
                  Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc. Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc
                  </li>
                  <li>
                  Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc.Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc
                  </li>
                  <li>
                  Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc. Lorem ipsum dolor sit amet consectetur. Odio sagittis praesent cursus diam viverra nunc
                  </li>
                </ul>

              </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="developer_page my-2 my-md-5">
        <div className="container">
          {videoData && videoData.length > 0 ? (
            videoData.map((video) => {
              const videoId = getYouTubeVideoId(video.url);
              return (
                <div className="row mb-5" key={video._Id}>
                  <div className="col-md-5">
                    <div className="mb-3">
                      {video.status === 1 ? (
                            <YouTube opts={opts} videoId={videoId} onEnd={() => handleUpdate(video.video_Id)}/>
                      ) : (
                        <div className="locked-video h-100">
                             <YouTube opts={opts} videoId={videoId} />
                          <div className="overlay" onClick={(e) => e.stopPropagation()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={20} height={20} fill="#fff">
                            <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/>
                            </svg>
                            <p className="lock-message">This video is locked.</p>
                          </div>
                        </div>
                      )}
                      <div><p>{video.shortDescription}</p></div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <h2>{`Task ${video.serialNo} - ${video.title}`}</h2>
                    <p>{video.description}</p>
                    <h3>Steps to Follow:</h3>
                    <ul>
                      {video.content && video.content.length > 0 ? (
                        video.content.map((contentItem) => (
                          <li className="d-flex gap-2 mb-3 align-items-center" key={contentItem._id}>
                            <img width={10} height={10} src="/assets/images/taskbanner/white-tick.png" alt="Tick" />
                            <p>{contentItem.steps}</p>
                          </li>
                        ))
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No video data available</p>
          )}
        </div>
      </section>

      <Faq />

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
