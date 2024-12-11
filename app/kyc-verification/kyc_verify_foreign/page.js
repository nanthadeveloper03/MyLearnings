"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
// import Layout from "@/components/layout/Layout";
import Link from "next/link";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
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
import Kyc from "../../../styles/kyc.css";
import dashboard from "../../../styles/dashboard.css";
import { isValidNumber } from "aadhaar-validator";
import axios from "axios";

function kyc_verify_foreign() {
  const country = useSelector((state) => state?.auth?.user);
  const router = useRouter();

  const licenceFront = {};
  const licenceBack = {};
  const panFront = {};
  const panBack = {};

  const [allKycStatus, setAllKycStatus] = useState({
    nationalID: false,
    drivingLicence: false,
    selfi: false,
    additionalSupportSelfi: false,
  });

  const [flatTabs, setFlatTabs] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const [kycData, setKycData] = useState({});

  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const [showFirstPanDiv, setShowFirstPanDiv] = useState(true);

  const initialChack = (data) => {
    if (data.nationalID) {
      setFlatTabs(1);
    } else if (data.drivingLicence) {
      setFlatTabs(2);
    } else if (data.selfi) {
      setFlatTabs(3);
    }
  };
  async function initLoad() {
    try {
      setPageLoading(true);
      const response = await apiRequest("/kyc/kycStatus", {});

      if (response?.status) {
        let result = response?.data;

        const newKycStatus = {
          nationalID:
            result.foreignClient?.nationalDetails.nationalStatus ===
              kycStatus.KYC_REJECTED ||
            result.foreignClient?.nationalDetails.nationalStatus ===
              kycStatus.KYC_UNVERIFY,
          drivingLicence:
            result.foreignClient?.drivingDetails.drivingStatus ===
              kycStatus.KYC_REJECTED ||
            result.foreignClient?.drivingDetails.drivingStatus ===
              kycStatus.KYC_UNVERIFY,
          selfi:
            result.foreignClient?.selfiePics.profileStatus ===
              kycStatus.KYC_REJECTED ||
            result.foreignClient?.selfiePics.profileStatus ===
              kycStatus.KYC_UNVERIFY,
          additionalSupportSelfi:
            result.foreignClient?.selfiePics.profileStatus ===
              kycStatus.KYC_REJECTED ||
            result.foreignClient?.selfiePics.profileStatus ===
              kycStatus.KYC_UNVERIFY,
        };

        setAllKycStatus(newKycStatus);
        initialChack(newKycStatus);

        formik.setValues({
          nationalID: result.foreignClient.nationalDetails.nationalIdNumber,
        });

        licenceNumberFormik.setValues({
          licenceNumber: result.foreignClient.drivingDetails.drivingLicenseNo,
        });

        nationalImageValidator.setValues({
          frontNational: {
            ...nationalImageValidator.values.frontNational,
            file: result.foreignClient.nationalDetails.nationalIdCardFrontImage,
            preview:
              result.foreignClient.nationalDetails.nationalIdCardFrontImage,
          },
          backNational: {
            ...nationalImageValidator.values.backNational,
            file: result.foreignClient.nationalDetails.nationalIdCardBackImage,
            preview:
              result.foreignClient.nationalDetails.nationalIdCardBackImage,
          },
        });
        licenceImageValidator.setValues({
          frontLicence: {
            ...licenceImageValidator.values.frontLicence,
            file: result.foreignClient.drivingDetails.drivingLicenseFrontImage,
            preview:
              result.foreignClient.drivingDetails.drivingLicenseFrontImage,
          },
          backLicence: {
            ...licenceImageValidator.values.backLicence,
            file: result.foreignClient.drivingDetails.drivingLicenseBackImage,
            preview:
              result.foreignClient.drivingDetails.drivingLicenseBackImage,
          },
        });
        selfiImageValidator.setValues({
          selfiImage: {
            ...selfiImageValidator.values.selfiImage,
            file: result.foreignClient.selfiePics.selfieImage,
            preview: result.foreignClient.selfiePics.selfieImage,
          },
        });
        setKycData(result);
      } else {
        setAllKycStatus({
          nationalID: true,
          drivingLicence: true,
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
      router.push("/manualkyc/kyc");
      toast.dismiss();

      toast.info("You Are Not Foreign User");
    } else {
      initLoad();
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
      nationalID: "",
    },
    validationSchema: Yup.object({
      nationalID: Yup.string().required("national id card no is required"),
    }),
    onSubmit: (values) => {
      setShowFirstDiv(false);
    },
  });
  const licenceNumberFormik = useFormik({
    initialValues: {
      licenceNumber: "",
    },
    validationSchema: Yup.object({
      licenceNumber: Yup.string()
        .matches(/^[A-Z0-9-]{5,20}$/, "Invalid driving license number")
        .required("Driving license number is required"),
    }),
    onSubmit: (values) => {
      setShowFirstPanDiv(false);
    },
  });

  const nationalImageValidator = useFormik({
    initialValues: {
      frontNational: { file: null, preview: null },
      backNational: { file: null, preview: null },
    },
    validationSchema: Yup.object({
      frontNational: Yup.object({
        file: Yup.mixed()
          .required("Front national Id card photo is required")
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
      backNational: Yup.object({
        file: Yup.mixed()
          .required("Back national Id card photo is required")
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
      if (allKycStatus.nationalID && allKycStatus.drivingLicence) {
        setFlatTabs(2);
      } else if (allKycStatus.nationalID && allKycStatus.selfi) {
        setFlatTabs(3);
      } else if (allKycStatus.nationalID) {
        handleKycVerify("/kyc/update");
      } else {
        setFlatTabs(2);
      }
    },
  });
  const licenceImageValidator = useFormik({
    initialValues: {
      frontLicence: { file: null, preview: null },
      backLicence: { file: null, preview: null },
    },
    validationSchema: Yup.object({
      frontLicence: Yup.object({
        file: Yup.mixed()
          .required("Front Driving Licence photo is required")
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
      backLicence: Yup.object({
        file: Yup.mixed()
          .required("Back Driving Licence photo is required")
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
      if (allKycStatus.drivingLicence && allKycStatus.selfi) {
        setFlatTabs(3);
      } else if (allKycStatus.drivingLicence) {
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
      "nationalIdCardFrontImage",
      nationalImageValidator.values.frontNational.file
    );
    formData.append(
      "nationalIdCardBackImage",
      nationalImageValidator.values.backNational.file
    );
    formData.append(
      "drivingLicenseFrontImage",
      licenceImageValidator.values.frontLicence.file
    );
    formData.append(
      "drivingLicenseBackImage",
      licenceImageValidator.values.backLicence.file
    );
    formData.append("selfieImage", selfiImageValidator.values.selfiImage.file);

    const data = {
      drivingLicenseNo: licenceNumberFormik.values.licenceNumber,
      nationalIdNumber: formik.values.nationalID,
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

  const handlelicenceImageChange = (event, fieldName) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Store both the file and its preview URL separately
        nationalImageValidator.setFieldValue(fieldName, {
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
        licenceImageValidator.setFieldValue(fieldName, {
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

  const handlePanNumberChange = (e, nextInputId) => {
    const { value } = e.target;

    const filteredValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    // Update the input value in the form
    e.target.value = filteredValue;

    // Use Formik's handleChange to update the form state
    licenceNumberFormik.handleChange(e);
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
                    {getKycStatusText(kycData.kycStatus)}
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
                      National ID Verification
                      <Badge
                        bg={getBadgeKYCClass(
                          kycData?.foreignClient?.nationalDetails.nationalStatus
                        )}
                      >
                        {getKycStatusText(
                          kycData?.foreignClient?.nationalDetails.nationalStatus
                        )}
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
                      Driving Licence Verification
                      <Badge
                        bg={getBadgeKYCClass(
                          kycData?.foreignClient?.drivingDetails.drivingStatus
                        )}
                      >
                        {getKycStatusText(
                          kycData?.foreignClient?.drivingDetails.drivingStatus
                        )}
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
                          kycData?.foreignClient?.selfiePics.profileStatus
                        )}
                      >
                        {getKycStatusText(
                          kycData?.foreignClient?.selfiePics.profileStatus
                        )}
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
                            <span className="pri_color">National ID</span>{" "}
                            Verification
                          </h4>
                          <p>
                            Note: Your profile name doesn't match your national ID card name.So we have updated your national ID card name as your profile name.
                          </p>
                          <form
                            className="cm_kform1"
                            onSubmit={formik.handleSubmit}
                          >
                            <div className="form-group">
                              <label className="form-label">
                                Enter your National ID Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="National Id No"
                                name="nationalID"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nationalID}
                                readOnly={!allKycStatus.nationalID}
                              />
                              {formik.touched.nationalID &&
                              formik.errors.nationalID ? (
                                <div className="error">
                                  {formik.errors.nationalID}
                                </div>
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
                              <span className="pri_color">National ID</span>{" "}
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
                            onSubmit={nationalImageValidator.handleSubmit}
                            className="cm_kform1"
                          >
                            <h4 className="uplotit">
                              Upload your Front & Back National Id card photo
                            </h4>

                            <div className="row">
                              <div className="col-md-6">
                                <div className="uplo1 text-center">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                      handlelicenceImageChange(
                                        event,
                                        "frontNational"
                                      )
                                    }
                                    className="uplo_in"
                                    ref={(input) =>
                                      (licenceFront.fileInput = input)
                                    }
                                    onClick={(event) => {
                                      if (!allKycStatus.nationalID) {
                                        event.preventDefault();
                                      }
                                    }}
                                  />

                                  {nationalImageValidator.values.frontNational
                                    .file && allKycStatus.nationalID ? (
                                    <button
                                      type="button"
                                      className="btn cls_btn"
                                      onClick={() => {
                                        nationalImageValidator.setFieldValue(
                                          "frontNational",
                                          { file: null, preview: null }
                                        ); // Remove the image from formik state
                                        if (licenceFront.fileInput) {
                                          licenceFront.fileInput.value = null; // Reset the file input
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
                                        nationalImageValidator.values
                                          .frontNational?.preview ||
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
                                {nationalImageValidator.errors.frontNational
                                  ?.file &&
                                  nationalImageValidator.touched
                                    .frontNational && (
                                    <span className="error">
                                      {
                                        nationalImageValidator.errors
                                          .frontNational.file
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
                                      handlelicenceImageChange(
                                        event,
                                        "backNational"
                                      )
                                    }
                                    className="uplo_in"
                                    ref={(input) =>
                                      (licenceBack.fileInput = input)
                                    }
                                    onClick={(event) => {
                                      if (!allKycStatus.nationalID) {
                                        event.preventDefault();
                                      }
                                    }}
                                  />

                                  {nationalImageValidator.values.backNational
                                    .file && allKycStatus.nationalID ? (
                                    <button
                                      type="button"
                                      className="btn cls_btn"
                                      onClick={() => {
                                        nationalImageValidator.setFieldValue(
                                          "backNational",
                                          { file: null, preview: null }
                                        ); // Remove the image from formik state
                                        if (licenceBack.fileInput) {
                                          licenceBack.fileInput.value = null; // Reset the file input
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
                                        nationalImageValidator.values
                                          .backNational?.preview ||
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
                                {nationalImageValidator.errors.backNational
                                  ?.file &&
                                  nationalImageValidator.touched
                                    .backNational && (
                                    <span className="error">
                                      {
                                        nationalImageValidator.errors
                                          .backNational.file
                                      }
                                    </span>
                                  )}
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="text-center w-100 mt-3">
                                {allKycStatus.nationalID && (
                                  <button
                                    type="submit"
                                    className="btn btn-action w-100 btn-white"
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
                            <span className="pri_color">Driving Licence</span>{" "}
                            Verification
                          </h4>
                          <p>
                            Note : Ensure that the Driving Licence number is
                            entered correctly, including case sensitivity.{" "}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <form
                          className="cm_kform1"
                          onSubmit={licenceNumberFormik.handleSubmit}
                        >
                          <div className="form-group">
                            <label className="form-label">
                              Enter your Driving Licence Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="XXXXXXXXXX"
                              name="licenceNumber"
                              // onChange={licenceNumber.handleChange}
                              onChange={(e) =>
                                handlePanNumberChange(e, "licenceNumber")
                              }
                              onBlur={licenceNumberFormik.handleBlur}
                              value={licenceNumberFormik.values.licenceNumber}
                              readOnly={!allKycStatus.drivingLicence}
                            />
                          </div>
                          {licenceNumberFormik.touched.licenceNumber &&
                          licenceNumberFormik.errors.licenceNumber ? (
                            <div className="error">
                              {licenceNumberFormik.errors.licenceNumber}
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
                              <span className="pri_color">Driving Licence</span>{" "}
                              Verification
                            </h4>
                            <p>
                              Note : Ensure that the Driving licence number is
                              entered correctly, including case sensitivity.{" "}
                            </p>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <form
                            onSubmit={licenceImageValidator.handleSubmit}
                            className="cm_kform1"
                          >
                            <h4 className="uplotit">
                              Upload your Front & Back Driving licence photo
                            </h4>

                            <div className="row">
                              <div className="col-md-6">
                                <div className="uplo1 text-center">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                      handlePanImageChange(
                                        event,
                                        "frontLicence"
                                      )
                                    }
                                    className="uplo_in"
                                    ref={(input) =>
                                      (panFront.fileInput = input)
                                    }
                                    onClick={(event) => {
                                      if (!allKycStatus.drivingLicence) {
                                        event.preventDefault();
                                      }
                                    }}
                                  />

                                  {licenceImageValidator.values.frontLicence
                                    .file && allKycStatus.drivingLicence ? (
                                    <button
                                      type="button"
                                      className="btn cls_btn"
                                      onClick={() => {
                                        licenceImageValidator.setFieldValue(
                                          "frontLicence",
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
                                        licenceImageValidator.values
                                          .frontLicence?.preview ||
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
                                {licenceImageValidator.errors.frontLicence
                                  ?.file &&
                                  licenceImageValidator.touched
                                    .frontLicence && (
                                    <span className="error">
                                      {
                                        licenceImageValidator.errors
                                          .frontLicence.file
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
                                      handlePanImageChange(event, "backLicence")
                                    }
                                    className="uplo_in"
                                    ref={(input) => (panBack.fileInput = input)}
                                    onClick={(event) => {
                                      if (!allKycStatus.drivingLicence) {
                                        event.preventDefault();
                                      }
                                    }}
                                  />
                                  {licenceImageValidator.values.backLicence
                                    .file && allKycStatus.drivingLicence ? (
                                    <button
                                      type="button"
                                      className="btn cls_btn"
                                      onClick={() => {
                                        licenceImageValidator.setFieldValue(
                                          "backLicence",
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
                                        licenceImageValidator.values.backLicence
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
                                {licenceImageValidator.errors.backLicence
                                  ?.file &&
                                  licenceImageValidator.touched.backLicence && (
                                    <span className="error">
                                      {
                                        licenceImageValidator.errors.backLicence
                                          .file
                                      }
                                    </span>
                                  )}
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="text-center w-100 mt-3">
                                {/* <button type="submit" className="btn btn-action w-100 btn-white">Upload</button> */}
                                {allKycStatus.drivingLicence && (
                                  <button
                                    type="submit"
                                    className="btn btn-action w-100 btn-white"
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
                                  className="btn btn-action w-100 btn-white disabled"
                                  disabled
                                >
                                  {" "}
                                  Loading...{" "}
                                </button>
                              ) : (
                                allKycStatus.selfi && (
                                  <button
                                    type="submit"
                                    className="btn btn-action w-100 btn-white"
                                  >
                                    Upload
                                  </button>
                                )

                                // <button type="submit" className="btn btn-action w-100 btn-white"> Upload </button>
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

export default withAuth(kyc_verify_foreign);
