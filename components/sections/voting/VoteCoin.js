import React, { useEffect } from 'react';
import Link from "next/link";

import { useState } from "react"
import Modal from '@/components/modal/Modal';
import { apiRequest } from '@/hooks/apiCall';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { encryptText } from '@/util/conceal';
import axiosInstance from '@/lib/axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useRouter } from "next/navigation";


const VoteCoin = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();

  const votingFront = {};
  const [votingList, setVotingList] = useState([]);
  const [loading, setLoading] = useState(false);

  const votingImageValidator = useFormik({
    initialValues: {
      siteName: '',
      votingImage: { file: null, preview: null },
    },
    validationSchema: Yup.object({
      votingImage: Yup.object({
        file: Yup.mixed()
          .required("Voting screenshot is required")
          .test("fileSize", "File size must be between 2MB", (value) => {
            if (typeof value === "string") return true;
            return value && value.size <= 2000000;
          })
          .test("fileFormat", "Unsupported Format", (value) => {
            if (typeof value === "string") return true;
            // Otherwise, check the file format
            return value && ["image/jpeg", "image/png"].includes(value.type);
          }),
      }),
      siteName: Yup.string()
        .required("Exchange type is required"),
    }),
    onSubmit: (values) => {
      handleVotingVerify(values)


    },
  });

  useEffect(() => {
    initLoad();
  }, []);

  async function initLoad() {
    try {
      // setPageLoading(true);
      const response = await apiRequest("/voting/votinglist", {});
      console.log(response, "result");

      if (response?.status) {
        let result = response?.data;
        setVotingList(result.list)



      } else {

      }
    } catch (error) {
      console.error(error);
    } finally {
      // setPageLoading(false);
    }
  }
  const handleVotingImageChange = (event, fieldName) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Store both the file and its preview URL separately
        votingImageValidator.setFieldValue(fieldName, {
          file: file,
          preview: e.target.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };
  const handleVotingVerify = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", values.votingImage.file);
    const data = {
      category: values.siteName,
    };

    formData.append("payload", encryptText(JSON.stringify(data)));

    try {
      const apiUrl = "/voting/add";
      const response = await axiosInstance.post(apiUrl, formData);
      const result = response.data;

      if (result.status) {
        initLoad();
        setShowModal(false);
        toast.success(result.msg);
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      console.log(error, "ERRORRR");

      toast.error("Internal Server Error...");
    } finally {
      setLoading(false);
    }
  };


  //to show and hide another div while click starts
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    votingImageValidator.setErrors({});
    votingImageValidator.resetForm();

  }

  const handleLogin = () => {
    router.push("/register");
  }

  return (
    <section className="vote_sc1">

      <div className="container">

        <div className="cm_chd1">
          <h3 className="froboto fw700">Vote for UPRO Coin to be Listed on Major Exchanges!</h3>
          <h4 className="froboto fw400">Help us expand UPRO Coin by voting to list it on other exchanges! Your vote matters, and as a token of our appreciation, we will reward you with <b> 1 USDT for every exchange you vote on.</b></h4>
        </div>
        <div className="cm_vote">
          <div className="row">
            {votingList.length > 0 ? (
              votingList.map((data, index) => (
                <div key={index} className="col-md-6">
                  <div className="coin_bx1">
                    <h6 className="froboto fw400 text-uppercase pri_color">UPRO</h6>
                    {/* <Link href={data.siteUrl} target="_blank" className="co_link"> */}
                      <span className="co_lef">
                        <img src={data.siteImage} className="img-fluid" alt={data.siteName} />
                        <span className="co_lhd1 froboto fw700">{data.siteName}</span>
                        <span className="co_sub1 froboto fw400">Exchange</span>
                      </span>
                      {/* <span className="co_rig">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h306.7L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                      </span> */}
                    {/* </Link> */}
                  </div>
                </div>
              ))
            ) : (
              <span>No Records Found</span>
            )}

          </div>

         <div className='votbannmn'>
          <div className='row justify-content-center align-items-center'>
            <div className='col-md-4 col-sm-4'>
              <div className='votebx'>
              <img src='/assets/images/voting/votebx.png' className='img-fluid' />
            </div>
            </div>
            <div className='col-md-8 col-sm-8'>
              <div className='votecn1'>
              <h4>Voting launches soon! 
              Earn exciting rewards by participating in the voting process.</h4>
              <button type='button' className='btn btn-action text-white'>Coming soon</button>
            </div>
            </div>
          </div>
         </div>

          {/* <div className="vote_bk1">
            <h3 className="froboto fw700"><img src="/assets/images/voting/votingmac.png" /> Vote now and claim your reward </h3>
            {isAuthenticated ? (
              <div className="vote_imp">
                <img src="/assets/images/voting/votbg.png" className="votbg" />
                <span className="vot_imlef froboto fw700">
                Upload a screenshot and wait. USDT will be credited shortly
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                  </svg>
                </span>
                <span className="vot_imrig">
                  <button type="button" className="btn btn-action text-white fopsans fw600" onClick={openModal}>Upload Screenshot</button>
                </span>
              </div>

            ) : (
              <div className="vote_imp">
                <img src="/assets/images/voting/votbg.png" className="votbg" />
                <span className="vot_imlef froboto fw700">
                Upload a screenshot and wait. USDT will be credited shortly
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                  </svg>
                </span>
                <span className="vot_imrig">
                  <button type="button" className="btn btn-action text-white fopsans fw600" onClick={handleLogin}>Signup/Signin Upload Voting</button>
                </span>
              </div>
            )}
          </div> */}

          <div className="cm_mod1">
            <Modal show={showModal} onClose={closeModal}>
              <div className="model-head">
                <h2 className="text-capitalize finter fw700">
                  Upload a screenshot
                  <button type="button" className="btn cls_btn" onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                    </svg>
                  </button>
                </h2>
              </div>
              <form
                className="mod_frm1"
                onSubmit={votingImageValidator.handleSubmit}
              >
                {/* <div className="uplo1 text-center">
                               
                               <input type="file" accept="image/*" onChange={handleImageChangeDiv1} className="uplo_in" />
                               {imagesDiv1.length === 0 && currentIndexDiv1 === null && (
                                 <div>
                                   <img
                                     src="/assets/images/nico/Uplo1.png"
                                     alt="Default"
                                     className="img-fluid"
                                     style={{ marginTop: '20px', maxWidth: '100%', height: 'auto' }}
                                   />
                                   <p>Upload image here</p>
                                 </div>
                               )}
                               {imagesDiv1.length > 0 && currentIndexDiv1 !== null && (
                                 <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <button type="button" className="btn cls_btn" onClick={handleRemoveImageDiv1}>
                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                   <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                                 </svg>
                               </button>
                                   <img
                                     src={imagesDiv1[currentIndexDiv1]}
                                     alt="Uploaded"
                                     style={{ maxWidth: '100%', height: 'auto' }}
                                   />
                                   <button
                                     onClick={handleRemoveImageDiv1}
                                     style={{
                                       position: 'absolute',
                                       top: 10,
                                       right: 10,
                                       background: '#000',
                                       color: 'white',
                                       border: 'none',
                                       borderRadius: '50%',
                                       width: '30px',
                                       height: '30px',
                                       cursor: 'pointer',
                                     }}
                                   >
                                     X
                                   </button>
                                 </div>
                               )}
                             </div> */}

                <div className="uplo1 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handleVotingImageChange(
                        event,
                        "votingImage"
                      )
                    }
                    className="uplo_in"
                    ref={(input) =>
                      (votingFront.fileInput = input)
                    }

                  />

                  {votingImageValidator.values.votingImage.file ?
                    <button
                      type="button"
                      className="btn cls_btn"
                      onClick={() => {
                        votingImageValidator.setFieldValue(
                          "votingImage",
                          { file: null, preview: null }
                        ); // Remove the image from formik state
                        if (votingFront.fileInput) {
                          votingFront.fileInput.value = null; // Reset the file input
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                      </svg>
                    </button>
                    : ''}


                  <div>
                    <img
                      src={
                        votingImageValidator.values.votingImage
                          ?.preview ||
                        "/assets/images/nico/Uplo1.png"
                      }
                      alt="Front Aadhaar"
                      className="img-fluid"
                      style={{
                        marginTop: "20px",
                        maxWidth: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                  <p>Upload image here</p>
                </div>
                {votingImageValidator.errors.votingImage
                  ?.file &&
                  votingImageValidator.touched.votingImage && (
                    <span className="error">
                      {
                        votingImageValidator.errors.votingImage
                          .file
                      }
                    </span>
                  )}

                <div className="form-group">
                  <label className="form-label">Exchange</label>
                  <div className="select1">
                    <select
                      name="siteName"
                      value={votingImageValidator.values.siteName}
                      onChange={votingImageValidator.handleChange}
                    >
                      <option>Select Exchange</option>
                      {votingList.map((data, index) => (

                        <option key={data}>{data.siteName}</option>

                      ))}


                    </select>
                    {votingImageValidator.touched.siteName &&
                      votingImageValidator.errors.siteName ? (
                      <span className="error">
                        {votingImageValidator.errors.siteName}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="text-center w-100">
                  {loading ? (
                    <button
                      type="button"
                      // className="btn btn-action w-100 btn-white disabled"
                      className="btn btn-action w-100 text-white"
                      disabled
                    >
                      {" "}
                      Loading...{" "}
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-action w-100 text-white"> Submit </button>
                  )}
                </div>
              </form>
            </Modal>
          </div>

        </div>
      </div>
    </section>

  );
};

export default VoteCoin;
