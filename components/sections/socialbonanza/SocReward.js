import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Modal from "@/components/modal/Modal";
import { toast } from "react-toastify";
import { apiRequest } from "@/hooks/apiCall";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { decryptText } from "@/util/conceal";
import axios from "axios";
// import styles from './YouTubeSlider.module.css';
// import YouTubeEmbed from '@/components/youtube/YouTubeEmbedSlider';
const SocReward = () => {

  const { isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();

  const socialApps = [
    { id: 1, label: "Instagram", value: "InstagramImage" },
    { id: 2, label: "Telegram", value: "TelegramImage" },
    { id: 3, label: "Youtube", value: "YoutubeImage" },
    { id: 4, label: "Facebook", value: "FacebookImage" },
    { id: 5, label: "X", value: "XImage" },
    { id: 6, label: "Linkedin", value: "LinkedinImage" },
    // { id: 7, label: "TrustPilot", value: "TrustPilotImage" },
  ];
  const authSelector = useSelector((state) => state.auth);
  const [images, setImages] = useState({});
  const [showBtn, setShowBtn] = useState(false);
  const [selectedApp, setSelectedApp] = useState("");
  const [statusData, setStatusData] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [isLoading,setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ShowClickBtn, setShowClickBtn] = useState({
    showButton: false,
    showbuttonLabel: ""
  });
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedApp(selectedValue);
  };

  useEffect(() => {
    if (isAuthenticated) {
      initLoad();
    }
  }, []);

  useEffect(() => {  
    if (images && (Object.keys(images).length >= socialApps.length)) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  }, [images, socialApps]);

  async function initLoad() {
    try {
      setPageLoading(true);
      const response = await apiRequest("/socialmediabonus/view", {});

      if (response?.status) {
        let result = response?.data;
        // console.log("result============", result);
        if(result.mediaData) {
          switch (result.mediaData?.status) {
            case 0:
              return setShowClickBtn({
                showButton: true,
                showbuttonLabel: 'Pending'
              });
              case 1:
                return setShowClickBtn({
                  showButton: true,
                  showbuttonLabel: 'Verified'
                });
            default:
              return setShowClickBtn({
                showButton: false,
                showbuttonLabel: 'Click Here'
              });
          }
        } else {
          setShowClickBtn({
            showButton: false,
            showbuttonLabel: 'Click Here'
          });
        }
        // setMediaData(result?.mediaData);
        setStatusData(result.mediaData?.status);
      } else {
        console.error("its now show view");
        setShowClickBtn({
          showButton: false,
          showbuttonLabel: 'Click Here'
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false);
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && selectedApp) {
      const fileType = file.type;

      // Check if the file is a valid image format (png or jpg/jpeg)
      if (fileType === "image/png" || fileType === "image/jpeg") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages((prevImages) => ({
            ...prevImages,
            [selectedApp]: {
              file, // Store the file reference
              url: reader.result, // Store the binary URL for display
            },
          }));
          // setImages((prevImages) => {
          //   const updatedImages = { ...prevImages, [selectedApp]: { file,  url: reader.result,}};
       
          //   // Show the button if 7 or more images are present
          //   if (Object.keys(updatedImages).length >= 7) {
          //     setShowBtn(true);
          //   }
       
          //   return updatedImages;
          // });
          toast.dismiss();
          toast.success(`${selectedApp} Image selected successfully!`);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Only PNG and JPG formats are allowed!");
      }
    }
  };

  const handleRemoveImage = (app) => {

    // setImages((prevImages) => {
    //   const updatedImages = { ...prevImages };
    //   delete updatedImages[app];
    //   return updatedImages;
    // });
    setImages((prevImages) => {
      const updatedImages = { ...prevImages };
      delete updatedImages[app];
 
      // Check if the total images are less than 7, then hide the button
      if (Object.keys(updatedImages).length < 7) {
        setShowBtn(false);
      }
      if (app === selectedApp) {
        setSelectedApp("");
      }
      return updatedImages;
    });
  };

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
};


  const handleSubmit = async (event) => {
    setShowBtn(true);
    event.preventDefault();
    // Check if all images are uploaded
    if (Object.keys(images).length !== socialApps.length) {
      toast.dismiss();
      toast.error("Please upload all required images for all platforms!");
      return;
    }
    
    
    // return false;
    const formData = new FormData();
    formData.append('InstagramImage', images.Instagram.file);
    formData.append('TelegramImage', images.Telegram.file);
    formData.append('YoutubeImage', images.Youtube.file);
    formData.append('FacebookImage', images.Facebook.file);
    formData.append('XImage', images.X.file);
    formData.append('LinkedinImage', images.Linkedin.file);
    // formData.append('TrustPilotImage', images.TrustPilot.file);
    formData.append('osType', 0);
    formData.append('wsToken', authSelector?.user?.wsToken);
    try {
      // const response = await axiosInstance.post("/socialmediabonus/web/create", formData, { timeout: 20000 });
      setLoading(true);
     
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/socialmediabonus/web/create`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authSelector?.user?.accessToken}`,
        },
        timeout: 10000,
    });
   
    const decryptedData = decryptText(response.data.payload);
    const result = JSON.parse(decryptedData);
    const output = result.data;

    if (!result?.status) {
      throw new Error('Failed to upload file');
    }
      if (result?.status) {
        toast.success(result.msg);
        setImages({});
        setSelectedApp("");
        setShowModal(false);
        await initLoad();
      } else {
        toast.error(result.msg);
      }
    } catch (err) {
      console.log("handleSubmit===error: ", err);
      if (axios.isCancel(err)) {
        console.error('Upload canceled:', err.message);
        // setError('Upload canceled. Please try again.');
    } else if (err.code === 'ECONNABORTED') {
        console.error('Upload timed out:', err.message);
        // setError('Upload timed out. Please try again.');
    } else {
        console.error('Upload error:', err);
        // setError('Error uploading file. Please try again.');
    }
      // toast.error("Internal Server Error...");
    } finally {
      setLoading(false);
    }
  };

  // const handleReset = () => {
  //   setImages({});
  //   setSelectedApp("");
  // };

  return (
    <>
      <section className="rew_sc1">
        <div className="container">
          <div className="block-text1 text-center">
            <h3 className="finter fw600 text-capitalize">
              {" "}
              How to claim <span className="pri_color">Social Media</span>{" "}
              Rewards:
            </h3>
            <p>
              To claim your 2 USDT reward, follow all our social media pages and
              take a screenshot. Send the screenshot to our support team to
              complete the task. Get rewarded for staying engaged with us!
            </p>
          </div>

          <div className="row justify-content-center ma-0">
            <div className="col-md-12">
              <ul className="step_bc1">
                <li>
                  <div className="stp_ico d-flex justify-content-center align-items-center">
                    <img
                      src="/assets/images/socialbonanza/step1.png"
                      className="img-fluid"
                    />
                  </div>
                  <h5 className="finter pri_color fw500">Follow Us</h5>
                  <p className="fopsans fw400">
                    Follow all of our social media accounts
                  </p>
                </li>
                <li>
                  <div className="stp_ico d-flex justify-content-center align-items-center">
                    <img
                      src="/assets/images/socialbonanza/step2.png"
                      className="img-fluid"
                    />
                  </div>
                  <h5 className="finter pri_color fw500">Submit Proof</h5>
                  <p className="fopsans fw400">
                    Send a screenshot of your following to our support team.
                  </p>
                </li>
                <li>
                  <div className="stp_ico d-flex justify-content-center align-items-center">
                    <img
                      src="/assets/images/socialbonanza/step3.png"
                      className="img-fluid"
                    />
                  </div>
                  <h5 className="finter pri_color fw500">
                    Receive Confirmation
                  </h5>
                  <p className="fopsans fw400">
                    Within 72 hours, after the support team verifies your
                    screenshot, you will receive 2 USDT.  
                  </p>
                </li>
                <li>
                  <div className="stp_ico d-flex justify-content-center align-items-center">
                    <img
                      src="/assets/images/socialbonanza/step4.png"
                      className="img-fluid"
                    />
                  </div>
                  <h5 className="finter pri_color fw500"> Check Your Total</h5>
                  <p className="fopsans fw400">
                    This 2 USDT will be added to your Reward Assets.
                  </p>
                </li>
                <li>
                  <div className="stp_ico d-flex justify-content-center align-items-center">
                    <img
                      src="/assets/images/socialbonanza/step5.png"
                      className="img-fluid"
                    />
                  </div>
                  <h5 className="finter pri_color fw500">Complete Tasks</h5>
                  <p className="fopsans fw400">
                    After completing the tasks, users can withdraw their USDT.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* <div className="row justify-content-center ma-0">
            <div className="col-md-12 col-12 rsp_w90">
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


              </div>
            </div>
          </div> */}

          <div className="row">
            <div className="col-md-12">
              <div className="vote_bk1">
                <div className="vote_imp">
                  <img
                    src="/assets/images/voting/votbg.png"
                    className="votbg"
                  />
                  <span className="vot_imlef froboto fw700">
                    Upload a screenshot and wait. USDT will be credited shortly
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                    </svg>
                  </span>
                  <span className="vot_imrig">
                  {isAuthenticated ? (
                      <>
                      {
         
                          <button
                          type="button"
                          // className="btn btn-action text-white fopsans fw600"
                          className={`btn btn-action text-white fopsans fw600 ${ShowClickBtn?.showbuttonLabel == 'Verified' && 'bg-success'}`}
                          disabled={ShowClickBtn?.showButton}
                          onClick={openModal}
                        >
                          {/* { mediaData.status === 0 ? 'pending' : mediaData.status === 1 ? 'verified' : (mediaData.status !==0 ||mediaData.status !== 1) ? 'Click Here' : ''} */}
                          {ShowClickBtn?.showbuttonLabel}
                        </button>
                   
                      }
                      </>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-action text-white fopsans fw600"
                        onClick={() => router.push("/login")}
                      >
                        Login
                      </button>
                    )}
                    {/* <button type="button" className="btn btn-action text-white fopsans fw600" onClick={handleAppOpen}>Click Here</button> */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cm_modpop3">
        <Modal show={showModal} onClose={closeModal}>
          <div className="model-head">
            <h4>
              Upload Screenshots
              <span className="closebtn3 cursor-pointer" onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </span>
            </h4>

            <p>
              Submit your screenshots to verify you've followed the process!
            </p>
          </div>

          <form className="mod_form2">
            {/* Upload Input */}
            <div className="uplo1 text-center mb-4">
              {/* Upload Input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="uplo_in"
                disabled={!selectedApp}
              />

              {/* Show the default upload prompt when no image is selected */}
              {(!selectedApp || (selectedApp && !images[selectedApp])) && (
                <div className="uplo_bef">
                  <img
                    src="/assets/images/socialbonanza/uplo.png"
                    alt="Default"
                    className="img-fluid"
                    style={{
                      marginTop: "20px",
                      maxWidth: "100%",
                      height: "auto",
                    }}
                  />
                  <p>Select file</p>
                </div>
              )}

              {/* Show the uploaded image if available */}
              {selectedApp && images[selectedApp] && (
                <div className="uplo_bef uplo_aft">
                  <img
                    src={images[selectedApp]?.url}
                    alt={`${selectedApp} Uploaded`}
                    className="img-fluid"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <button
                    type="button"
                    className="btn cls_btn mt-2"
                    onClick={() => handleRemoveImage(selectedApp)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Select the Social Media</label>
              <div className="selectr1">
                <select value={selectedApp} onChange={handleSelectChange}>
                  <option value="" disabled selected hidden>
                    Select Media Image
                  </option>
                  {socialApps.map((mediaData, index) => (
                    <option key={mediaData.id} value={mediaData.label}>
                      {mediaData.label}
                    </option>
                  ))}
                </select>
              </div>
              {!selectedApp && (
                <p className="text-danger">
                  Please select a social media images before uploading.
                </p>
              )}
              <p className="pri_color">
                Upload your screenshots and wait 72 hours for verification. Your
                USDT will be credited shortly!
              </p>
            </div>

            {/* Thumbnails */}
            <div className="row mx-2 thumb_rw1">
              {Object.keys(images).map((app) => (
                <div className="col-3 px-2" key={app}>
                  <div className="uplo1 uplo_thumb text-center">
                    {images[app] ? (
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          paddingTop: "100%",
                        }}
                      >
                        <img
                          src={images[app]?.url}
                          alt={`${app} Uploaded`}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                        <button
                          type="button"
                          className="btn cls_btn"
                          onClick={() => handleRemoveImage(app)}
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            border: "none",
                            borderRadius: "50%",
                            width: "30px",
                            height: "30px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                          >
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="uplo_bef" style={{ marginTop: "20px" }}>
                        <img
                          src="/assets/images/socialbonanza/uplo.png"
                          alt="Default"
                          className="img-fluid mb-2"
                          style={{ maxWidth: "80%", height: "auto" }}
                        />
                        <p>Select file</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex flex-nowrap justify-content-center gap-2 control_btns w-100">
              {/* <button type="button" className="btn res_btn" onClick={handleReset}>
              Reset
            </button> */}
              {isLoading ? (
                <button className="btn btn-action text-white">
                  Loading...
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  type="submit"
                  disabled={!showBtn}
                  className="btn btn-action text-white"
                  style={{ width: "inherit" }}
                >
                  Upload Screenshots
                </button>
              )}
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default SocReward;