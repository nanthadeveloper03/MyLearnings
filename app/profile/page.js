"use client"
import { useEffect, useState } from 'react';
import { apiRequest } from '@/hooks/apiCall';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import profile from "./profile.css";
import Link from "next/link";
import Modal from '@/components/modal/Modal';
import Loading from "@/app/loading";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { encryptText } from '@/util/conceal';
import Swal from 'sweetalert2';
import ChatSupport from "@/components/sections/support/ChatSupport";
import '../support/support.css';


export default function Profile() {
  const [bankList, setBankList] = useState([])
  const [createLoad, setCreateLoad] = useState(false);
  const [isFormLoad, setIsFormLoad] = useState(false);


  const handleKyc = () => {
    window.location.href = '/kyc-verification/kyc/';
  };


  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [showModal1, setShowModal1] = useState(false);
  const openModal1 = () => {
    if (bankList.length < 2 || bankList.some(bank => bank.status === 2)) {
      setShowModal1(true);
    } else {
      toast.dismiss()
      toast.error("User allow to add maximum 2 accounts only...")
    }

  }

  const closeModal1 = () => {
    fiatFormik.resetForm()
    setShowModal1(false);
  }


  const [isLoading, setIsLoading] = useState(true)
  const [isBankLoading, setIsBankLoading] = useState(false)

  const [profileData, setProfileData] = useState()

  async function initLoad() {
    try {
      const response = await apiRequest('/account/profile', {})

      if (response?.status) {
        let data = response?.data;
        setProfileData(response?.data?.userInfo)
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function initBankLoad() {

    try {
      const response = await apiRequest('/bankList')

      if (response?.status) {
        let data = response?.data?.data;
        setBankList(data)

      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsBankLoading(false)
    }
  }

  const fiatFormik = useFormik({
    initialValues: {
      bankName: '',
      ifscCode: '',
      branchName: '',
      accountNumber: '',
      accountHolderName: '',
      bankProof: null,
      accountType: ""
    },
    validationSchema: Yup.object({
      ifscCode: Yup.string()
        .required('IFSC Code is required')
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC Code'),
      bankName: Yup.string()
        .required('Bank Name is required')
        .min(3, 'Bank Name must be at least 3 characters')
        .matches(/^[A-Za-z\s]+$/, 'Bank Name can only contain letters and spaces'),
      accountType: Yup.string()
        .required('Bank Type is required'),

      branchName: Yup.string()
        .required('Branch Name is required')
        .min(3, 'Branch Name must be at least 3 characters'),
      accountNumber: Yup.string()
        .required('Account Number is required')
        .matches(/^\d+$/, 'Account Number must contain only numbers')
        .min(9, 'Account Number must be at least 9 digits')
        .max(18, 'Account Number must be at most 18 digits'),
      accountHolderName: Yup.string()
        .required('Account Holder Name is required')
        .min(3, 'Account Holder Name must be at least 3 characters')
        .matches(/^[A-Za-z\s]+$/, 'Account Holder Name can only contain letters and spaces'),
      bankProof: Yup.mixed()
        .required('PassBook Image is required')
        .test('fileSize', 'File too large', value => !value || (value && value.size <= 2000000)) // 2MB max size
        .test('fileType', 'Unsupported File Format', value =>
          !value || (value && ['image/jpeg', 'image/png'].includes(value.type))),
    }),
    onSubmit: (values) => {
      bankCreate(values)
    },
  });




  const bankCreate = async (data) => {
    setCreateLoad(true)
    const formData = new FormData();
    formData.append("bankProof", fiatFormik.values.bankProof);
    formData.append("payload", encryptText(JSON.stringify(data)));
    try {
      let response = await apiRequest('/bankCreate', formData)
      if (response?.status) {
        setShowModal1(false)
        fiatFormik.resetForm()
        setIsLoading(false);
        initBankLoad()
      }
    } catch (error) {
      setIsLoading(false)
      console.error('Error fetching data:', error);
    } finally {
      setCreateLoad(false)
    }
  };



  function showWarningAlert(data) {

    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this Bank Account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText: 'CLOSE',
      customClass: {
        confirmButton: 'btn-success',
        cancelButton: 'btn-danger'
      },
      preConfirm: async () => {
        try {
          // Show loading on the confirmation button
          Swal.showLoading();

          const response = await cancelBankAccount(data);



        } catch (error) {

        }
      }
    });
  }

  async function cancelBankAccount(data) {

    try {
      const response = await apiRequest('/deleteBankDetails', { bankId: data })

      if (response.status) {
        initBankLoad()

      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsBankLoading(false)
    }
  }






  const handleIFSCChange = async (event) => {
    const ifscCode = event.target.value;
    fiatFormik.setFieldValue('ifscCode', ifscCode);


    if (ifscCode.length === 11) {
      setIsFormLoad(true)
      try {
        const response = await axios.get(`https://ifsc.razorpay.com/${ifscCode}`);

        if (response.status === 200) {
          const details = response.data;
          // console.log(details.BANK, 'responseresponse');
          fiatFormik.setFieldValue('bankName', details.BANK);
          fiatFormik.setFieldValue('branchName', details.BRANCH);
        }
        else {
          console.error('Error fetching details:', await response.json());
        }
      } catch (error) {

        if (error.response.status === 404) {

          toast.dismiss()
          toast.error("IFSC is not found enter manualy...")
        }
        console.error('Network error:', error);
      } finally {
        setIsFormLoad(false)
      }
    }
  };

  useEffect(() => {
    initLoad()
    // initBankLoad()
  }, [])


  const clearPreview = () => {
    fiatFormik.setFieldValue('bankProof', null);
    self.fileInput.value = null;
  };

  if (isLoading || isBankLoading) {
    return <Loading />
  }

  return (
    <>
      <DashboardLayout>

        <div className="user_balance_dashboard mb-4">

          <div className="block-text1">
            <h6 className="fw600 finter text-capitalize">Profile Info</h6>
          </div>

          <div className="cm_cnbx1">
            <p>Email ID : {profileData.email} </p>
            <p>Referral ID : {profileData.referralId}</p>
          </div>

          <div className="block-text1">
            <h6 className="fw600 finter text-capitalize">
              Personal Details
              {/* <button type="button" className="btn btn-action float-end text-white" onClick={openModal}>Edit</button> */}
            </h6>
          </div>

          <div className="cm_cnbx1">
            <div className="row align-items-center">
              <div className="col-md-7 col-sm-6">
                <p className="d-flex justify-content-between">
                  <span className="p50 black7">Name</span>
                  <span className="p50 black8">{profileData.fullName}</span>
                </p>
                <p className="d-flex justify-content-between">
                  <span className="p50 black7">Mobile Number</span>
                  <span className="p50 black8">+{profileData.mobileCode} {profileData.mobileNo}</span>
                </p>
                {/* <p className="d-flex justify-content-between">
                <span className="p50 black7">Address</span>
                <span className="p50 black8"> --- </span>
              </p>
              <p className="d-flex justify-content-between">
                <span className="p50 black7">D.O.B</span>
                <span className="p50 black8"> --- </span>
              </p>
              <p className="d-flex justify-content-between">
                <span className="p50 black7">City</span>
                <span className="p50 black8"> --- </span>
              </p>
              <p className="d-flex justify-content-between">
                <span className="p50 black7">State</span>
                <span className="p50 black8"> --- </span>
              </p> */}
                <p className="d-flex justify-content-between">
                  <span className="p50 black7">Country</span>
                  <span className="p50 black8">{profileData.country}</span>
                </p>
              </div>
              <div className="col-md-5 col-sm-6">
                <div className="cm_cnbx2">
                  <h6>KYC Verified</h6>
                  <p>Get increased limits and advanced features by providing a bit more profile information</p>
                  <div className="row align-items-center">
                    <div className="col-sm-8 col-8">
                      {profileData.kycStatus == 3 ?
                        <button type="button" className="btn btn-action text-white bg-success"> Verified </button> :
                        profileData.kycStatus == 2 ?
                          <button type="button" className="btn btn-action text-white bg-danger"> Rejected </button> :
                          profileData.kycStatus == 1 ?
                            <button type="button" className="btn btn-action text-white bg-warning"> Pending </button> :
                            <button type="button" className="btn btn-action text-white" onClick={handleKyc}>Get Started</button>
                      }

                    </div>
                    <div className="col-sm-4 col-4">
                      <img src="/assets/images/profile/member.png" className="img-fluid float-end" />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* <div className="block-text1">
            <h6 className="fw600 finter text-capitalize">
              Bank Details
              <button type="button" className="btn btn-action float-end text-white" onClick={openModal1}>Add Bank</button>
            </h6>
          </div> */}

          {bankList.length > 0 ?
            <>
              {bankList.map((data, index) => (

                <div key={index} className="cm_cnbx1">
                  <div className="row align-items-center">
                    <div className="col-md-7 col-sm-12">
                      <p className="d-flex justify-content-between">
                        <span className="p50 black7">Bank Name</span>
                        <span className="p50 black8">{data.bankName}</span>
                      </p>
                      <p className="d-flex justify-content-between">
                        <span className="p50 black7">Branch Name</span>
                        <span className="p50 black8">{data.branchName}</span>
                      </p>
                      <p className="d-flex justify-content-between">
                        <span className="p50 black7">IFSC Code</span>
                        <span className="p50 black8">{data.ifscCode}</span>
                      </p>
                      <p className="d-flex justify-content-between">
                        <span className="p50 black7">Account Number</span>
                        <span className="p50 black8">{data.accountNumber}</span>
                      </p>
                      <p className="d-flex justify-content-between">
                        <span className="p50 black7">Account holder Name</span>
                        <span className="p50 black8">{data.accountHolderName}</span>
                      </p>
                      <p className="d-flex justify-content-between">
                        <span className="p50 black7">Account Type</span>
                        <span className="p50 black8">{data.accountType}</span>
                      </p>
                      <p className="d-flex justify-content-between">
                        <span className="p50 black7">Status</span>
                        <span className={`p50 black8 text-${data.status === 0 ? ("warning") : data.status === 1 ? ("success") : data.status === 2 ? ("danger") : ""}`}>
                          {
                            data.status === 0 ? ("PENDING") : data.status === 1 ? ("VERIFIED") : data.status === 2 ? ("REJECTED") : ""
                          }


                        </span>
                      </p>
                    </div>
                    <div className='col-md-5 col-sm-12'>
                      <ul className='d-flex flex-wrap actn_lis1 gap-1 justify-content-end'>
                      {data.status !== 1 &&
                              <li>
                                <button type='button' className='btn btn-danger' onClick={() => showWarningAlert(data.bankId)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                                </button>
                              </li>
                            }
                    
                      </ul>

                      <div className="cc">
                        <div className="mc d-flex justify-content-between">
                          <div className="bnam" align="left">{data.bankName}</div>
                          <div className={`ctyp text-light`} align="right">{
                            data.status === 0 ? ("PENDING") : data.status === 1 ? ("VERIFIED") : data.status === 2 ? ("REJECTED") : ""
                          }</div>
                        </div>

                        <div className="cno">
                          <pre>{data.accountNumber}</pre>
                        </div>
                        <div className="nv d-flex justify-content-between">
                          <div className="name" align="left">
                            {data.accountHolderName}
                          </div>
                          <ul className='d-flex flex-wrap actn_lis1 gap-1'>
                            {/* {data.status !== 1 &&
                              <li>
                                <button type='button' className='btn btn-danger' onClick={() => showWarningAlert(data.bankId)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                                </button>
                              </li>
                            } */}
                            {data.status === 0 ? (

                              <li>
                                <button type='button' className='btn btn-warning'>
                                  <img src='/assets/images/profile/pending.png' className='img-fluid' />
                                </button>
                              </li>
                            ) : data.status === 1 ? (
                              <li>
                                <button type='button' className='btn btn-success'>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" /></svg>
                                </button>
                              </li>
                            ) : data.status === 2 ? (
                              <li>
                                <button type='button' className='btn btn-danger'>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                  </svg>
                                </button>
                              </li>
                            ) : ''}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
            :
            <div className="d-flex justify-content-center align-items-center">

             {/* <h2>No Data Found...</h2> */}

            </div>
          }


        </div>

        <div className="cm_modpop3">
          <Modal show={showModal} onClose={closeModal}>
            <div className="model-head">
              <h4 className="prof_sep text-center">
                Personal  Details
                <span className="closebtn3 cursor-pointer" onClick={closeModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                </span>
              </h4>
            </div>
            <form className="mod_form3">
              <div className="form-group">
                <label className="form-label">
                  Name
                </label>
                <input type="text" className="form-control" placeholder="Name" />
              </div>
              <div className="form-group">
                <label className="form-label">
                  Mobile Number
                </label>
                <input type="text" className="form-control" placeholder="Mobile Number" />
              </div>
              <div className="form-group">
                <label className="form-label">
                  Address
                </label>
                <input type="text" className="form-control" placeholder="Address" />
              </div>
              <div className="form-group">
                <label className="form-label">
                  D.O.B
                </label>
                <input type="text" className="form-control" placeholder="D.O.B" />
              </div>
              <div className="form-group">
                <label className="form-label">
                  City
                </label>
                <input type="text" className="form-control" placeholder="City" />
              </div>
              <div className="d-flex flex-wrap justify-content-center w-100">
                <button type="button" className="btn btn-action text-white">Confirm</button>
              </div>
            </form>
          </Modal>
        </div>

        <div className="cm_modpop3 stickypop">
          <Modal show={showModal1} onClose={closeModal1}>
            <div className="model-head">
              <h4 className="prof_sep text-center">
                Add Bank
                <span className="closebtn3 cursor-pointer" onClick={closeModal1}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                </span>
              </h4>
            </div>
            <form className={`mod_form3 ${isFormLoad && 'loading'}`} onSubmit={fiatFormik.handleSubmit} autoComplete='off'>

              <div className="form-group">
                <label className="form-label">
                  Account holder Name <span className='secondary text-danger'>*</span>
                </label>
                <input
                  type="text"
                  name="accountHolderName"
                  className="form-control"
                  placeholder="Enter Account holder Name"
                  value={fiatFormik.values.accountHolderName}
                  onChange={fiatFormik.handleChange}
                  onBlur={fiatFormik.handleBlur}
                />
              </div>
              {fiatFormik.touched.accountHolderName && fiatFormik.errors.accountHolderName && <div className='error'>{fiatFormik.errors.accountHolderName}</div>}

              <div className="form-group">
                <label className="form-label">
                  Account Number <span className='secondary text-danger'>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Account Number"
                  name="accountNumber"
                  value={fiatFormik.values.accountNumber}
                  onChange={fiatFormik.handleChange}
                  onBlur={fiatFormik.handleBlur}
                />
              </div>
              {fiatFormik.touched.accountNumber && fiatFormik.errors.accountNumber && <div className='error'>{fiatFormik.errors.accountNumber}</div>}
              <div className="form-group">
                <label className="form-label" htmlFor="Amount">Account Type <span className='secondary text-danger'>*</span> </label>
                <div className="select2bx">
                  <select
                    className={`select2 ${fiatFormik.errors.accountType ? 'is-invalid' : ''}`}
                    name="accountType"
                    onBlur={fiatFormik.handleBlur}
                    value={fiatFormik.values.accountType}
                    onChange={fiatFormik.handleChange}
                  >
                    <option value="">Select Account Type</option>

                    <option value="Savings">Savings</option>
                    <option value="Current">Current</option>




                  </select>
                  {fiatFormik.touched.accountType && fiatFormik.errors.accountType ? <div className="error">{fiatFormik.errors.accountType}</div> : null}
                </div>
              </div>


              <div className="form-group">
                <label className="form-label">
                  IFSC Code <span className='secondary text-danger'>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter IFSC Code"
                  name="ifscCode"
                  value={fiatFormik.values.ifscCode}
                  onChange={handleIFSCChange}
                  onBlur={fiatFormik.handleBlur}
                />
              </div>
              {fiatFormik.touched.ifscCode && fiatFormik.errors.ifscCode && <div className='error'>{fiatFormik.errors.ifscCode}</div>}
              <div className="form-group">
                <label className="form-label">
                  Bank Name <span className='secondary text-danger'>*</span>
                </label>
                <input type="text"
                  className="form-control"
                  placeholder="Enter Bank Name"
                  name="bankName"
                  value={fiatFormik.values.bankName}
                  onChange={fiatFormik.handleChange}
                  onBlur={fiatFormik.handleBlur}
                />
              </div>
              {fiatFormik.touched.bankName && fiatFormik.errors.bankName && <div className='error'>{fiatFormik.errors.bankName}</div>}

              <div className="form-group">
                <label className="form-label">
                  Branch Name <span className='secondary text-danger'>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Branch Name"
                  name="branchName"
                  value={fiatFormik.values.branchName}
                  onChange={fiatFormik.handleChange}
                  onBlur={fiatFormik.handleBlur}
                />
              </div>
              {fiatFormik.touched.branchName && fiatFormik.errors.branchName && <div className='error'>{fiatFormik.errors.branchName}</div>}


              <div className="form-group">
                <label className="form-label" htmlFor="Upload">Upload your passbook (Front Page) <span className='secondary text-danger'>*</span></label>
                <div className="input-group uplo_grp flex-nowrap">
                  <span className="input-group-text">Choose file</span>
                  <input
                    className="form-control"
                    type="file"
                    onChange={(event) => fiatFormik.setFieldValue("bankProof", event.currentTarget.files[0])}
                    onBlur={fiatFormik.handleBlur}
                    ref={(input) => (self.fileInput = input)}
                  // onChange={handleFileUpload}
                  />
                  <span className="placeholder-text">
                    {fiatFormik.values.bankProof ? fiatFormik.values.bankProof.name : 'Upload Bank PassBook Image'}
                  </span>
                </div>

                {/* Conditionally render preview label and section if a file is selected */}
                {fiatFormik.values.bankProof && !fiatFormik.errors.bankProof && (
                  <>
                    <label className="form-label">Preview your passbook to verify the process!</label>
                    <div className="row mx-2 thumb_rw1">
                      <div className="col-3 px-2">
                        <div className="uplo1 text-center mb-4">
                          <input
                            className="uplo_in"
                            disabled type="file"

                          />
                          <button type="button" className="btn cls_btn" onClick={clearPreview}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
                            </svg>
                          </button>
                          <div className="uplo_bef">
                            {fiatFormik.values.bankProof ? (
                              // Display selected image preview
                              <img
                                src={URL.createObjectURL(fiatFormik.values.bankProof)}
                                alt="Preview"
                                className="img-fluid"
                              />
                            ) : (
                              // Default image and preview text
                              <>
                                <img src="/assets/images/socialbonanza/uplo.png" alt="Default" className="img-fluid" />
                                <p>Preview..</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              {fiatFormik.touched.bankProof && fiatFormik.errors.bankProof && <div className='error'>{fiatFormik.errors.bankProof}</div>}


              <div className="d-flex flex-wrap justify-content-center w-100">
                {createLoad ?
                  <button className="btn btn-action text-white" disabled>Loading...</button>
                  :

                  <button type="submit" className="btn btn-action text-white">Confirm</button>
                }
              </div>
            </form>
          </Modal>
        </div>

      </DashboardLayout>

      <ChatSupport />

    </>
  );
}
