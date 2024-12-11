"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
// import Layout from "@/components/layout/Layout";

import Link from "next/link";
import { useEffect, useState } from "react";
import "../../../styles/kyc.css";
import "../../../styles/dashboard.css";

import { useFormik } from "formik";
import * as Yup from "yup";
import { isValidNumber } from "aadhaar-validator";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { apiRequest } from "@/hooks/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { decryptText, encryptObject, encryptText } from "@/util/conceal";
import axiosInstance from "@/lib/axios";
import { kycStatus } from "../kycDetails";
import { Badge } from "react-bootstrap";
import withAuth from "@/util/withAuth";
import Modal from "@/components/modal/Modal";
import axios from "axios";

function KYCVERIFY() {
  const country = useSelector((state) => state?.auth?.user);
  const router = useRouter();

  const aadharFront = {};
  const aadharBack = {};
  const panFront = {};
  const panBack = {};

  const [allKycStatus, setAllKycStatus] = useState({
    aadhar: false,
    pan: false,
    selfi: false,
    additionalSupportSelfi: false,
  });
  const [kycDetails, setKycDetails] = useState({
    aadharStatusCmd: 'Not Uploaded',
    panStatusCmd: 'Not Uploaded',
    profileStatusCmd: 'Not Uploaded',
    UpdateKycStatus: 'Not Uploaded'
  })
  const [flatTabs, setFlatTabs] = useState(3);
  
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const [kycData, setKycData] = useState({});

  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [showFirstPanDiv, setShowFirstPanDiv] = useState(true);

  const initialChack = (data) => {
    if(data.aadhar && data.pan && data.selfi) {
      setFlatTabs(3);

    }
    // if (data.aadhar) {
    //   setFlatTabs(1);
    // } else if (data.pan) {
    //   setFlatTabs(2);
    // } else if (data.selfi) {
    //   setFlatTabs(3);
    // }
  };
  async function initLoad() {
    try {
      setPageLoading(true);
      const response = await apiRequest("/kyc/kycStatus", {});

      if (response?.status) {
        let result = response?.data;

        const newKycStatus = {
          aadhar:
            result.indianClient?.aadharDetails.aadharStatus ===
              kycStatus.KYC_REJECTED ||
            result.indianClient?.aadharDetails.aadharStatus ===
              kycStatus.KYC_UNVERIFY,
          pan:
            result.indianClient?.panDetails.panStatus ===
              kycStatus.KYC_REJECTED ||
            result.indianClient?.panDetails.panStatus ===
              kycStatus.KYC_UNVERIFY,
          selfi:
            result.indianClient?.selfiePics.profileStatus ===
              kycStatus.KYC_REJECTED ||
            result.indianClient?.selfiePics.profileStatus ===
              kycStatus.KYC_UNVERIFY,
          additionalSupportSelfi:
            result.indianClient?.selfiePics.profileStatus ===
              kycStatus.KYC_REJECTED ||
            result.indianClient?.selfiePics.profileStatus ===
              kycStatus.KYC_UNVERIFY,
        };
        
        setAllKycStatus(newKycStatus);
        initialChack(newKycStatus);
        const aadhaarNumber = result.indianClient.aadharDetails.aadhaarNumber;
        if (aadhaarNumber) {
          const segment1 = aadhaarNumber.slice(0, 4);
          const segment2 = aadhaarNumber.slice(4, 8);
          const segment3 = aadhaarNumber.slice(8, 12);

          formik.setValues({
            segment1,
            segment2,
            segment3,
          });
        }
        panNumberFormik.setValues({
          panNumber: result.indianClient.panDetails.panNumber,
        });

        aadharImageValidator.setValues({
          frontAadhaar: {
            ...aadharImageValidator.values.frontAadhaar,
            file: result.indianClient.aadharDetails.aadharFrontImage,
            preview: result.indianClient.aadharDetails.aadharFrontImage,
          },
          backAadhaar: {
            ...aadharImageValidator.values.backAadhaar,
            file: result.indianClient.aadharDetails.aadharBackImage,
            preview: result.indianClient.aadharDetails.aadharBackImage,
          },
        });
        panImageValidator.setValues({
          frontPan: {
            ...panImageValidator.values.frontPan,
            file: result.indianClient.panDetails.panFrontImage,
            preview: result.indianClient.panDetails.panFrontImage,
          },
          backPan: {
            ...panImageValidator.values.backPan,
            file: result.indianClient.panDetails.panBackImage,
            preview: result.indianClient.panDetails.panBackImage,
          },
        });
        selfiImageValidator.setValues({
          selfiImage: {
            ...selfiImageValidator.values.selfiImage,
            file: result.indianClient.selfiePics.selfieImage,
            preview: result.indianClient.selfiePics.selfieImage,
          },
        });
        setKycData(result);
      } else {
        setAllKycStatus({
          aadhar: true,
          pan: true,
          selfi: true,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false);
    }
  }

  useEffect(() => {
    if (country?.countryCode === "IN") {
      initLoad();
    } else {
      router.push("/manualkyc/kyc");
      toast.dismiss();
      toast.info("You Are Not Indian User");
    }
  }, []);

  const getBadgeKYCClass = (code) => {
    switch (code) {
      case kycStatus.KYC_PENDING:
        return "warning";
      case kycStatus.KYC_VERIFY:
        return "success";
      case kycStatus.KYC_REJECTED:
        return "danger";
      case kycStatus.KYC_UNVERIFY:
        return "dark";
      default:
        return "dark";
    }
  };

  const getKycStatusText = (code) => {
    switch (code) {
      case kycStatus.KYC_PENDING:
        return "Pending";
      case kycStatus.KYC_VERIFY:
        return "Verified";
      case kycStatus.KYC_REJECTED:
        return "Rejected";
      case kycStatus.KYC_UNVERIFY:
        return "Not Uploaded";
      default:
        return "Not Uploaded";
    }
  };
  const formik = useFormik({
    initialValues: {
      segment1: "",
      segment2: "",
      segment3: "",
    },
    validationSchema: Yup.object({
      segment1: Yup.string()
        .length(4, "Must be exactly 4 digits")
        .matches(/^\d+$/, "Must be a number")
        .required("Required"),
      segment2: Yup.string()
        .length(4, "Must be exactly 4 digits")
        .matches(/^\d+$/, "Must be a number")
        .required("Required"),
      segment3: Yup.string()
        .length(4, "Must be exactly 12 digits for Aadhar")
        .required("Aadhar number is required"),
    }),
    onSubmit: (values) => {
      const aadhaarNumber = `${values.segment1}${values.segment2}${values.segment3}`;

      const isValid = isValidNumber(aadhaarNumber);

      if (isValid) {
        // setFlatTabs(2)
        setShowFirstDiv(false);
      } else {
        toast.dismiss();
        toast.error("Invalid Aadhaar is Number");
        // Show an error message to the user
      }
    },
  });
  const panNumberFormik = useFormik({
    initialValues: {
      panNumber: "",
    },
    validationSchema: Yup.object({
      panNumber: Yup.string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format")
        .required("PAN number is required"),
    }),
    onSubmit: (values) => {
      setShowFirstPanDiv(false);
    },
  });

  const aadharImageValidator = useFormik({
    initialValues: {
      frontAadhaar: { file: null, preview: null },
      backAadhaar: { file: null, preview: null },
    },
    validationSchema: Yup.object({
      frontAadhaar: Yup.object({
        file: Yup.mixed()
          .required("Front Aadhaar photo is required")
          .test("fileSize", "File size must be between 2MB", (value) => {
            if (typeof value === "string") return true;
            return value && value.size <= 2000000;
          })
          .test("fileFormat", "Unsupported Format", (value) => {
            // Skip validation if the value is a URL (string)
            if (typeof value === "string") return true;
            // Otherwise, check the file format
            return value && ["image/jpeg", "image/png"].includes(value.type);
          }),
      }),
      backAadhaar: Yup.object({
        file: Yup.mixed()
          .required("Back Aadhaar photo is required")
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
    }),
    onSubmit: (values) => {
      if(formik.values.segment1 && formik.values.segment2 && formik.values.segment3 && values){
        setKycDetails((prevProps) => ({ ...prevProps, aadharStatusCmd: 'Uploading'}))
      }
      if (allKycStatus.aadhar && allKycStatus.pan) {
        setFlatTabs(2);
      } else if (allKycStatus.aadhar && allKycStatus.selfi) {
        setFlatTabs(3);
      } else if (allKycStatus.aadhar) {
        handleKycVerify("/kyc/update");
      } else {
        setFlatTabs(2);
      }
    },
  });
  const panImageValidator = useFormik({
    initialValues: {
      frontPan: { file: null, preview: null },
      backPan: { file: null, preview: null },
    },
    validationSchema: Yup.object({
      frontPan: Yup.object({
        file: Yup.mixed()
          .required("Front Aadhaar photo is required")
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
      backPan: Yup.object({
        file: Yup.mixed()
          .required("Back Aadhaar photo is required")
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
    }),
    onSubmit: (values) => {
      if(panNumberFormik.values.panNumber && values.frontPan && values.backPan) {
        setKycDetails((prevProps) => ({ ...prevProps,  panStatusCmd: 'Uploading' }));
      }
      if (allKycStatus.pan && allKycStatus.selfi) {
        setFlatTabs(3);
      } else if (allKycStatus.pan) {
        handleKycVerify("/kyc/update");
      } else {
        setFlatTabs(3);
      }
    },
  });

  const selfiImageValidator = useFormik({
    initialValues: {
      selfiImage: { file: null, preview: null },
    },
    validationSchema: Yup.object({
      selfiImage: Yup.object({
        file: Yup.mixed()
          .required("Selfie photo is required")
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
    }),
    onSubmit: (values) => {
      // setFlatTabs(3);
      if(values.selfiImage) {
        setKycDetails((prevProps) => ({ ...prevProps,  profileStatusCmd: 'Uploading', UpdateKycStatus: 'Uploading' }));
      }
      if (allKycStatus.selfi && allKycStatus.additionalSupportSelfi) {
        handleKycVerify("/kyc/update");
      } else {
        handleKycVerify();
      }
    },
  });

  const handleKycVerify = async (update) => {
    setLoading(true);

    const formData = new FormData();
    formData.append(
      "aadharFrontImage",
      aadharImageValidator.values.frontAadhaar.file
    );
    formData.append(
      "aadharBackImage",
      aadharImageValidator.values.backAadhaar.file
    );
    formData.append("panFrontImage", panImageValidator.values.frontPan.file);
    formData.append("panBackImage", panImageValidator.values.backPan.file);
    formData.append("selfieImage", selfiImageValidator.values.selfiImage.file);

    const data = {
      panNumber: panNumberFormik.values.panNumber,
      aadharNumber: `${formik.values.segment1}${formik.values.segment2}${formik.values.segment3}`,
    };

    formData.append("payload", encryptText(JSON.stringify(data)));

    try {
      const apiUrl = update ? `${update}` : "/kyc/add";

      const response = await axiosInstance.post(apiUrl, formData);
      const result = response.data;

      if (result?.status) {
        initLoad();
        setShowFirstPanDiv(true);
        setShowFirstDiv(true);
        toast.success(result.msg);
      } else {
        toast.error(result.msg);
      }
    } catch (error) {
      toast.error("Internal Server Error...");
    } finally {
      setLoading(false);
    }
  };

  const handleAadharImageChange = (event, fieldName) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Store both the file and its preview URL separately
        aadharImageValidator.setFieldValue(fieldName, {
          file: file,
          preview: e.target.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handlePanImageChange = (event, fieldName) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Store both the file and its preview URL separately
        panImageValidator.setFieldValue(fieldName, {
          file: file,
          preview: e.target.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };
  const handleSelfiImageChange = (event, fieldName) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Store both the file and its preview URL separately
        selfiImageValidator.setFieldValue(fieldName, {
          file: file,
          preview: e.target.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleFlatTabs = (index) => {
    
    if (kycData.kycStatus && kycData.kycStatus !== kycStatus.KYC_UNVERIFY) {
      
      setFlatTabs(index);
    }

    // Add or remove a class to the parent `ul` based on the active tab
    const menuTab = document.querySelector(".menu-tabk1");

    if (index === 3) {
      menuTab.classList.add("two-tabs-active");
    } else if (index >= 2) {
      menuTab.classList.add("two-tabs-active");
    } else {
      menuTab.classList.add("two-tabs-active");
    }
  };

  const handleSegmentChange = (e, nextInputId) => {
    const { value, id } = e.target;
    const key = e.key;

    if (!/^\d*$/.test(value)) {
      return;
    }

    if (value.length === 4) {
      document.getElementById(nextInputId).focus();
    }
    if (key === "Backspace" && value.length === 0) {
      const previousInputId = getPreviousInputId(id);
      if (previousInputId) {
        document.getElementById(previousInputId).focus();
      }
    }

    formik.handleChange(e);
  };

  const handlePanNumberChange = (e, nextInputId) => {
    const { value } = e.target;

    // Allow only uppercase letters and numbers
    const filteredValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  
    // Update the input value in the form
    e.target.value = filteredValue;

    // Use Formik's handleChange to update the form state
    panNumberFormik.handleChange(e);
  };

  const getPreviousInputId = (currentInputId) => {
    switch (currentInputId) {
      case "segment2":
        return "segment1";
      case "segment3":
        return "segment2";
      default:
        return null;
    }
  };


  const handlePrevious = (event) => {
    
    if (flatTabs===1) {
      setShowFirstDiv(true);
    }else if(flatTabs===2){
      setShowFirstPanDiv(true);
    }
  }
  return (
    <DashboardLayout>
      <div className="user_balance_dashboard mb-4">
        <div className="row cm_inw rsp_ma5">
          <div className="col-xl-10 col-md-12 rsp_pd5">
            <div className="row">
              <div className="col-md-12 mt-3 mb-3">
                <span
                  className={`float-end kyc_stat bg-${getBadgeKYCClass(
                    kycData.kycStatus
                  )}`}
                >
                  Kyc Status :{" "}
                  <b>
                    {kycData.kycStatus ? getKycStatusText(kycData.kycStatus) : kycDetails.UpdateKycStatus}
                  </b>
                </span>
                  <div>
                  {showFirstDiv || flatTabs===3 ? (
                 ""

                  ):(
                    <span>

                    <button 
                    className={`btn btn-action text-white pre_btn ${flatTabs === 1}`}
                    disabled={showFirstDiv || flatTabs===3 }
                    type="button" 
                    name="previous" 
                    onClick={e => handlePrevious(e)}><span>Back</span></button>
                    </span>
                  )}
                    {/* <span>&#8592;</span> */}
               
                  </div>
              </div>
            </div>

            <div className="flat-tabs">
              <ul className="menu-tabk1 d-flex justify-content-evenly">
                <li
                  className={flatTabs >= 1 ? "active" : ""}
                  onClick={() => handleFlatTabs(1)}
                >
                  <Link href="#">
                    <div className="w-100 d-flex justify-content-center">
                      <span className="uico d-flex justify-content-center align-items-center">
                        <img
                          src="/assets/images/nico/idcard1.png"
                          className="img-fluid"
                        />
                      </span>
                    </div>
                    <div className="w-100 center">
                      Aadhaar Verification
                      <Badge
                        bg={getBadgeKYCClass(
                          kycData?.indianClient?.aadharDetails.aadharStatus
                        )}
                      >
                        {/* {kycDetails.aadharStatusCmd == "Uploaded" ? kycDetails.aadharStatusCmd : getKycStatusText(
                          kycData?.indianClient?.aadharDetails.aadharStatus
                        )} */}
                        {
                          kycData?.indianClient?.aadharDetails.aadharStatus ? 
                          getKycStatusText(kycData?.indianClient?.aadharDetails.aadharStatus) :
                          kycDetails.aadharStatusCmd
                        }
                      </Badge>
                    </div>
                  </Link>
                </li>
                <li
                  className={flatTabs >= 2 ? "active" : ""}
                  onClick={() => handleFlatTabs(2)}
                >
                  <Link href="#">
                    <div className="w-100 d-flex justify-content-center">
                      <span className="uico d-flex justify-content-center align-items-center">
                        <img
                          src="/assets/images/nico/idcard1.png"
                          className="img-fluid"
                        />
                      </span>
                    </div>
                    <div className="w-100 center">
                      PAN Verification
                      <Badge
                        bg={getBadgeKYCClass(
                          kycData?.indianClient?.panDetails.panStatus
                        )}
                      >
                        {/* {getKycStatusText(
                          kycData?.indianClient?.panDetails.panStatus
                        )} */}
                         {
                          kycData?.indianClient?.panDetails.panStatus ? 
                          getKycStatusText(kycData?.indianClient?.panDetails.panStatus) :
                          kycDetails.panStatusCmd
                        }
                      </Badge>
                    </div>
                  </Link>
                </li>
                <li
                  className={flatTabs >= 3 ? "active" : ""}
                  onClick={() => handleFlatTabs(3)}
                >
                  <Link href="#">
                    <div className="w-100 d-flex justify-content-center">
                      <span className="uico d-flex justify-content-center align-items-center">
                        <img
                          src="/assets/images/nico/idcard1.png"
                          className="img-fluid"
                        />
                      </span>
                    </div>
                    <div className="w-100 center">
                      Selfie Verification
                      <Badge
                        bg={getBadgeKYCClass(
                          kycData?.indianClient?.selfiePics.profileStatus
                        )}
                      >
                        {/* {getKycStatusText(
                          kycData?.indianClient?.selfiePics.profileStatus
                        )} */}
                        {
                          kycData?.indianClient?.selfiePics.profileStatus ? 
                          getKycStatusText(kycData?.indianClient?.selfiePics.profileStatus) :
                          kycDetails.profileStatusCmd
                        }
                      </Badge>
                    </div>
                  </Link>
                </li>
              </ul>
              <div className="content-tab3">
                <div
                  className="content-inner"
                  style={{ display: `${flatTabs === 1 ? "block" : "none"}` }}
                >
                  {showFirstDiv ? (
                    <div className="row justify-content-center align-items-center">
                      <div className="col-md-6">
                        <div className="vf_im1 d-flex justify-content-center align-items-center">
                          <img
                            src="/assets/images/nico/aadhar1.png"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="vf_bk1">
                          <h4>
                            <span className="pri_color">Aadhaar</span>{" "}
                            Verification
                          </h4>
                          <p>
                            Note: Your profile name doesn't match your aadhaar
                            name.So we have updated your aadhaar name as your
                            profile name.
                          </p>
                          <form
                            className="cm_kform1"
                            onSubmit={formik.handleSubmit}
                          >
                            <div className="form-group">
                              <label className="form-label">
                                Enter your Aadhaar Number
                              </label>
                              <div className="input-group ogrp gap-3">
                                <input
                                  id="segment1"
                                  name="segment1"
                                  type="text"
                                  className="form-control"
                                  placeholder="XXXX"
                                  maxLength="4"
                                  // readOnly={!allKycStatus.aadhar}
                                  value={formik.values.segment1}
                                  onChange={(e) =>
                                    handleSegmentChange(e, "segment2")
                                  }
                                />
                                <input
                                  type="text"
                                  className="form-control"
                                  id="segment2"
                                  name="segment2"
                                  maxLength="4"
                                  value={formik.values.segment2}
                                  onChange={(e) =>
                                    handleSegmentChange(e, "segment3")
                                  }
                                  onKeyDown={(e) =>
                                    handleSegmentChange(e, "segment2")
                                  }
                                  readOnly={!allKycStatus.aadhar}
                                  placeholder="XXXX"
                                />
                                <input
                                  className="form-control is-invalid"
                                  id="segment3"
                                  name="segment3"
                                  type="text"
                                  maxLength="4"
                                  value={formik.values.segment3}
                                  onChange={formik.handleChange}
                                  placeholder="XXXX"
                                  onKeyDown={(e) =>
                                    handleSegmentChange(e, "segment3")
                                  }
                                  readOnly={!allKycStatus.aadhar}
                                />
                              </div>
                              {formik.touched.segment3 &&
                              formik.errors.segment3 ? (
                                <span className="text-danger">
                                  {formik.errors.segment3}
                                </span>
                              ) : null}
                            </div>
                            <div className="form=-group">
                              <button
                                type="onSubmit"
                                className="btn btn-action w-100 text-center text-white"
                              >
                                Image Upload
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                  fill="#fff"
                                >
                                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                                </svg>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="aad1">
                      <div className="row justify-content-center align-items-center">
                        <div className="col-md-6">
                          <div className="vf_bk1">
                            <h4>
                              <span className="pri_color">Aadhaar</span>{" "}
                              Verification
                            </h4>
                            <p>
                              Take pictures of both sides of your government
                              issued ID card{" "}
                            </p>
                            <ul className="cm_klis1">
                              <li>
                                Upload a complete image of your ID document.
                              </li>
                              <li>
                                Ensure all details are readable in the image you
                                upload.
                              </li>
                              <li>
                                Ensure the document is the original and has not
                                expired.
                              </li>
                              <li>
                                Place documents against a solid-colored
                                background.
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <form
                            onSubmit={aadharImageValidator.handleSubmit}
                            className="cm_kform1"
                          >
                            <h4 className="uplotit">
                              Upload your Front & Back Aadhaar photo
                            </h4>

                            <div className="row">
                              <div className="col-md-6">
                                <div className="uplo1 text-center">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                      handleAadharImageChange(
                                        event,
                                        "frontAadhaar"
                                      )
                                    }
                                    className="uplo_in"
                                    ref={(input) =>
                                      (aadharFront.fileInput = input)
                                    }
                                    onClick={(event) => {
                                      if (!allKycStatus.aadhar) {
                                        event.preventDefault();
                                      }
                                    }}
                                  />

                                  {aadharImageValidator.values.frontAadhaar
                                    .file && allKycStatus.aadhar ? (
                                    <button
                                      type="button"
                                      className="btn cls_btn"
                                      onClick={() => {
                                        aadharImageValidator.setFieldValue(
                                          "frontAadhaar",
                                          { file: null, preview: null }
                                        ); // Remove the image from formik state
                                        if (aadharFront.fileInput) {
                                          aadharFront.fileInput.value = null; // Reset the file input
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
                                  ) : (
                                    ""
                                  )}
                                  <div>
                                    <img
                                      src={
                                        aadharImageValidator.values.frontAadhaar
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
                                {aadharImageValidator.errors.frontAadhaar
                                  ?.file &&
                                  aadharImageValidator.touched.frontAadhaar && (
                                    <span className="error">
                                      {
                                        aadharImageValidator.errors.frontAadhaar
                                          .file
                                      }
                                    </span>
                                  )}
                              </div>

                              <div className="col-md-6">
                                <div className="uplo1 text-center">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                      handleAadharImageChange(
                                        event,
                                        "backAadhaar"
                                      )
                                    }
                                    className="uplo_in"
                                    ref={(input) =>
                                      (aadharBack.fileInput = input)
                                    }
                                    onClick={(event) => {
                                      if (!allKycStatus.aadhar) {
                                        event.preventDefault();
                                      }
                                    }}
                                  />

                                  {aadharImageValidator.values.backAadhaar
                                    .file && allKycStatus.aadhar ? (
                                    <button
                                      type="button"
                                      className="btn cls_btn"
                                      onClick={() => {
                                        aadharImageValidator.setFieldValue(
                                          "backAadhaar",
                                          { file: null, preview: null }
                                        ); // Remove the image from formik state
                                        if (aadharBack.fileInput) {
                                          aadharBack.fileInput.value = null; // Reset the file input
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
                                  ) : (
                                    ""
                                  )}
                                  <div>
                                    <img
                                      src={
                                        aadharImageValidator.values.backAadhaar
                                          ?.preview ||
                                        "/assets/images/nico/Uplo1.png"
                                      }
                                      alt="Back Aadhaar"
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
                                {aadharImageValidator.errors.backAadhaar
                                  ?.file &&
                                  aadharImageValidator.touched.backAadhaar && (
                                    <span className="error">
                                      {
                                        aadharImageValidator.errors.backAadhaar
                                          .file
                                      }
                                    </span>
                                  )}
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="text-center w-100 mt-3">
                                {allKycStatus.aadhar && (
                                  <button
                                    type="submit"
                                    // className="btn btn-action w-100 btn-white"
                                    className="btn btn-action w-100"
                                  >
                                    Upload
                                  </button>
                     
                                )}
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className="content-inner"
                  style={{ display: `${flatTabs === 2 ? "block" : "none"}` }}
                >
                  {showFirstPanDiv ? (
                    <div className="row justify-content-center align-items-center mt-3 pt-3">
                      <div className="col-md-6">
                        <div className="vf_bk1">
                          <h4>
                            <span className="pri_color">PAN Card</span>{" "}
                            Verification
                          </h4>
                          <p>
                            Note : Ensure that the PAN number is entered
                            correctly, including case sensitivity.{" "}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <form
                          className="cm_kform1"
                          onSubmit={panNumberFormik.handleSubmit}
                        >
                          <div className="form-group">
                            <label className="form-label">
                              Enter your PAN Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="XXXXXXXXXX"
                              name="panNumber"
                              maxLength={10}
                              // onChange={panNumber.handleChange}
                              onChange={(e) =>
                                handlePanNumberChange(e, "panNumber")
                              }
                              onBlur={panNumberFormik.handleBlur}
                              value={panNumberFormik.values.panNumber}
                              readOnly={!allKycStatus.pan}
                            />
                          </div>
                          {panNumberFormik.touched.panNumber &&
                          panNumberFormik.errors.panNumber ? (
                            <div className="error">
                              {panNumberFormik.errors.panNumber}
                            </div>
                          ) : null}
                          <div className="form-group">
                            <div className="text-center w-100 mt-3">
                              <button
                                type="submit"
                                className="btn btn-action w-100"
                              >
                                {" "}
                                {showFirstPanDiv
                                  ? "Submit"
                                  : "Switch to First Div"}{" "}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  ) : (
                    <div className="aad1 mt-3">
                      <div className="row justify-content-center align-items-center">
                        <div className="col-md-6">
                          <div className="vf_bk1">
                            <h4>
                              <span className="pri_color">PAN Card</span>{" "}
                              Verification
                            </h4>
                            <p>
                              Note : Ensure that the PAN number is entered
                              correctly, including case sensitivity.{" "}
                            </p>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <form
                            onSubmit={panImageValidator.handleSubmit}
                            className="cm_kform1"
                          >
                            <h4 className="uplotit">
                              Upload your Front & Back Pan photo
                            </h4>

                            <div className="row">
                              <div className="col-md-6">
                                <div className="uplo1 text-center">
                                  <input
                                    type="file"
                                     accept="image/*;capture=camera"
                                    onChange={(event) =>
                                      handlePanImageChange(event, "frontPan")
                                    }
                                    className="uplo_in"
                                    ref={(input) =>
                                      (panFront.fileInput = input)
                                    }
                                    onClick={(event) => {
                                      if (!allKycStatus.pan) {
                                        event.preventDefault();
                                      }
                                    }}
                                  />

                                  {panImageValidator.values.frontPan.file &&
                                  allKycStatus.pan ? (
                                    <button
                                      type="button"
                                      className="btn cls_btn"
                                      onClick={() => {
                                        panImageValidator.setFieldValue(
                                          "frontPan",
                                          { file: null, preview: null }
                                        ); // Remove the image from formik state
                                        if (panFront.fileInput) {
                                          panFront.fileInput.value = null; // Reset the file input
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
                                  ) : (
                                    ""
                                  )}

                                  <div>
                                    <img
                                      src={
                                        panImageValidator.values.frontPan
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
                                {panImageValidator.errors.frontPan?.file &&
                                  panImageValidator.touched.frontPan && (
                                    <span className="error">
                                      {panImageValidator.errors.frontPan.file}
                                    </span>
                                  )}
                              </div>

                              <div className="col-md-6">
                                <div className="uplo1 text-center">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                      handlePanImageChange(event, "backPan")
                                    }
                                    className="uplo_in"
                                    ref={(input) => (panBack.fileInput = input)}
                                    onClick={(event) => {
                                      if (!allKycStatus.pan) {
                                        event.preventDefault();
                                      }
                                    }}
                                  />
                                  {panImageValidator.values.backPan.file &&
                                  allKycStatus.pan ? (
                                    <button
                                      type="button"
                                      className="btn cls_btn"
                                      onClick={() => {
                                        panImageValidator.setFieldValue(
                                         "backPan",
                                          { file: null, preview: null }
                                        ); // Remove the image from formik state
                                        if (panBack.fileInput) {
                                          panBack.fileInput.value = null; // Reset the file input
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
                                  ) : (
                                    ""
                                  )}
                                  <div>
                                    <img
                                      src={
                                        panImageValidator.values.backPan
                                          ?.preview ||
                                        "/assets/images/nico/Uplo1.png"
                                      }
                                      alt="Back Aadhaar"
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
                                {panImageValidator.errors.backPan?.file &&
                                  panImageValidator.touched.backPan && (
                                    <span className="error">
                                      {panImageValidator.errors.backPan.file}
                                    </span>
                                  )}
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="text-center w-100 mt-3">
                                {/* <button type="submit" className="btn btn-action w-100 btn-white">Upload</button> */}
                                {allKycStatus.pan && (
                                  <button
                                    type="submit"
                                    // className="btn btn-action w-100 btn-white"
                                    className="btn btn-action w-100"
                                  >
                                    Upload
                                  </button>
                                )}
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className="content-inner"
                  style={{ display: `${flatTabs === 3 ? "block" : "none"}` }}
                >
                  <div className="aad1 mt-3">
                    <div className="row justify-content-center align-items-center">
                      <div className="col-md-6">
                        <div className="vf_bk1">
                          <h4>
                            <span className="pri_color">Selfie Photo</span>{" "}
                            Verification
                          </h4>
                          <p>
                            Note : Authentic self-portrait for verification
                            purposes. Ensuring transparency and trust in the
                            process.{" "}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <form
                          className="cm_kform1"
                          onSubmit={selfiImageValidator.handleSubmit}
                        >
                          <h4 className="uplotit">Upload your selfie photo</h4>

                          <div className="uplo1 text-center">
                            
                            <input
                              type="file"
                              accept="image/*"
                              capture="user"
                              onChange={(event) =>
                                handleSelfiImageChange(event, "selfiImage")
                              }
                              className="uplo_in"
                              ref={(input) => (self.fileInput = input)}
                              onClick={(event) => {
                                if (!allKycStatus.selfi) {
                                  event.preventDefault();
                                }
                              }}
                            />

                            {selfiImageValidator.values.selfiImage.file &&
                            allKycStatus.selfi ? (
                              <button
                                type="button"
                                className="btn cls_btn"
                                onClick={() => {
                                  selfiImageValidator.setFieldValue(
                                    "selfiImage",
                                    { file: null, preview: null }
                                  ); // Remove the image from formik state
                                  self.fileInput.value = null;
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                >
                                  <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                                </svg>
                              </button>
                            ) : (
                              ""
                            )}
                            <img
                              src={
                                selfiImageValidator.values.selfiImage
                                  ?.preview || "/assets/images/nico/Uplo1.png"
                              }
                              alt="Default"
                              className="img-fluid"
                              style={{
                                marginTop: "20px",
                                maxWidth: "100%",
                                height: "auto",
                              }}
                            />
                            <p>Upload Image here</p>
                          </div>

                          {selfiImageValidator.errors.selfiImage?.file &&
                            selfiImageValidator.touched.selfiImage && (
                              <span className="error">
                                {selfiImageValidator.errors.selfiImage.file}
                              </span>
                            )}
                          <div className="form-group">
                            <div className="text-center w-100 mt-3">
                              {loading ? (
                                <button
                                  type="button"
                                  // className="btn btn-action w-100 btn-white disabled"
                                  className="btn btn-action w-100 disabled"
                                  disabled
                                >
                                  {" "}
                                  Loading...{" "}
                                </button>
                              ) : (
                                allKycStatus.selfi && (
                                  <button
                                    type="submit"
                                    // className="btn btn-action w-100 btn-white"
                                    className="btn btn-action w-100"
                                  >
                                    Upload
                                  </button>
                                )
                                )}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default withAuth(KYCVERIFY);
