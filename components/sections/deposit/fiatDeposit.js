'use client'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { useFormik } from "formik";
import { apiRequest } from '@/hooks/apiCall';
import { encryptText } from '@/util/conceal';
import { formatNumber, handleCopy } from '@/util/common';
import { useRouter } from "next/navigation";

function FiatDeposit({ onHit }) {
  const router = useRouter()
  const [adminBankDetails, setAdminBankDetails] = useState([])
  const [userBankDetails, setUserBankDetails] = useState([])
  const [currencyList, setCurrencyList] = useState([])
  const [createLoad, setCreateLoad] = useState(false);
  const [feeAmount, setFeeAmount] = useState(0)



  const fiatFormik = useFormik({
    initialValues: {
      amount: '',
      currency: 'INR',
      accountNumber: '',
      transactionType: '',
      transactionId: '',
      receiptProof: null
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .typeError('Amount must be a number')
        .required('Amount is required')
        .positive('Amount must be a positive number')
        .min(100, 'Amount must be at least 100.00 INR')
        .test('is-decimal', 'Amount must have at most 2 decimal places', (value) =>
          /^\d+(\.\d{1,2})?$/.test(value)
        ),
      currency: Yup.string().required('Currency is required'),
      accountNumber: Yup.string().required('Bank is required'),
      transactionType: Yup.string().required('Mode of transaction is required'),
      transactionId: Yup.string()
        .required('Transaction Id is required')
        .matches(/^[a-zA-Z0-9]*$/, 'Transaction Id must not contain special characters or symbols'),
      receiptProof: Yup.mixed()
        .required('Receipt Image is required')
        .test('fileSize', 'File too large', value => !value || (value && value.size <= 2000000))
        .test('fileType', 'Unsupported File Format', value =>
          !value || (value && ['image/jpeg', 'image/png'].includes(value.type))),

    }),
    onSubmit: (values) => {
      bankCreate(values)

    },
  });

  const bankCreate = async (data) => {

    const bankDetails = userBankDetails.find(
      (item) => item.accountNumber === Number(data.accountNumber)
    );
    const postForm = {
      ...data,
      bankId: bankDetails.bankId
    }

    setCreateLoad(true)
    const formData = new FormData();
    formData.append("recceiptProof", fiatFormik.values.receiptProof);
    formData.append("payload", encryptText(JSON.stringify(postForm)));
    try {
      let response = await apiRequest('/fiatDeposit', formData)
      if (response?.status) {
        fiatFormik.resetForm()
        initLoad()
        if (onHit) {
          onHit()
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setCreateLoad(false)
    }
  };

  async function initLoad() {

    try {
      const response = await apiRequest('/getBankList');
      if (response?.status) {
        let result = response?.data;
        setAdminBankDetails(result.adminBank ?? [])
        setUserBankDetails(result.userBank ?? [])
        setCurrencyList(result.currency ?? [])
        setFeeAmount(result?.feeAmount)





      } else if (response?.data.maintenance) {
        setMaintanence(response.data)
      }

    } catch (error) {
      console.error(error);
    }
  }
  const clearPreview = () => {
    fiatFormik.setFieldValue('receiptProof', null);
    self.fileInput.value = null;
  };
  useEffect(() => {
    initLoad()
  }, [])



  return (
    <div>
      <div className="cm_inwbk1">
        <div className="row">
          <div className="col-md-12 rsp_w100">
            <form className="cm_frmw2" onSubmit={fiatFormik.handleSubmit}>

              <div className="form-group">
                <p className="d-flex justify-content-between w-100">
                  <label className="form-label" htmlFor="Amount">Bank Account <span className='secondary text-danger'>*</span> </label>
                  <button type="button" className="btn sbtn1" onClick={() => router.push('/profile')}>Add Bank +</button></p>

                <div className="select2bx">
                  <select
                    className={`select2 ${fiatFormik.errors.accountNumber ? 'is-invalid' : ''}`}
                    name="accountNumber"
                    onBlur={fiatFormik.handleBlur}
                    value={fiatFormik.values.accountNumber}
                    onChange={fiatFormik.handleChange}
                  >
                    <option value="">Select Bank Acccount</option>
                    {userBankDetails.length > 0 &&
                      <>
                        {userBankDetails.map((data, index) => (
                          <option key={index} value={data.accountNumber}>{data.bankName} ({data.accountNumber})</option>
                        ))}
                      </>

                    }

                  </select>
                  {fiatFormik.touched.accountNumber && fiatFormik.errors.accountNumber ? <div className="invalid-feedback">{fiatFormik.errors.accountNumber}</div> : null}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="Amount">Amount <span className='secondary text-danger'>*</span> </label>
                <div className="row ma-5">
                  <div className="col-md-8 col-sm-7 col-6 pd-5">
                    <input
                      type="text"
                      name="amount"
                      className={`form-control ${fiatFormik.errors.amount ? 'is-invalid' : ''}`}
                      placeholder="Enter Amount"
                      onBlur={fiatFormik.handleBlur}
                      value={fiatFormik.values.amount}
                      onChange={fiatFormik.handleChange}
                    />
                    {fiatFormik.touched.amount && fiatFormik.errors.amount ? <div className="invalid-feedback">{fiatFormik.errors.amount}</div> : null}
                  </div>
                  <div className="col-md-4 col-sm-5 col-6 pd-5">
                    <div className="select2bx">
                      <select
                        className={`select2 ${fiatFormik.errors.currency ? 'is-invalid' : ''}`}
                        name="currency"
                        onBlur={fiatFormik.handleBlur}
                        value={fiatFormik.values.currency}
                        onChange={fiatFormik.handleChange}
                      >
                        <option value="">Select Currency</option>
                        {currencyList.map((data, index) => (
                          <option key={index} value={data.symbol}>{data.symbol}</option>
                        ))}
                        {/* <option value="USD">$ USD</option>
                                        <option value="EUR">€ EUR</option> */}
                      </select>
                      {fiatFormik.touched.currency && fiatFormik.errors.currency ? <div className="invalid-feedback">{fiatFormik.errors.currency}</div> : null}
                    </div>
                  </div>
                </div>
              </div>
              {fiatFormik.values.amount >= 100 &&
                <div className="cm_lisw2">
                  <div className="d-flex justify-content-between lisw_rw">
                    <span className="lisw_lf">Initial Amount</span>
                    <span className="lisw_rig">{formatNumber(fiatFormik.values.amount, 2)} {fiatFormik.values.currency}</span>
                  </div>
                  <div className="d-flex justify-content-between lisw_rw">
                    <span className="lisw_lf"> Fee Amount  </span>
                    <span className="lisw_rig"> {formatNumber(feeAmount, 2)} {fiatFormik.values.currency}</span>
                  </div>
                  <div className="d-flex justify-content-between lisw_rw">
                    <span className="lisw_lf"> Received Amount  </span>
                    <span className="lisw_rig"> {formatNumber(fiatFormik.values.amount - feeAmount, 2)} {fiatFormik.values.currency} </span>
                  </div>
                </div>
              }

              <div className="form-group row ma-5">
                <div className="col-md-5 col-sm-5 col-6 pd-5">
                  <label className="form-label" htmlFor="deposit type">Mode Of Transaction <span className='secondary text-danger'>*</span></label>
                  <div className="select2bx">
                    <select
                      className={`select2 ${fiatFormik.errors.transactionType ? 'is-invalid' : ''}`}
                      name='transactionType'
                      onBlur={fiatFormik.handleBlur}
                      value={fiatFormik.values.transactionType}
                      onChange={fiatFormik.handleChange}
                    >
                      <option value=''>Select Transaction</option>
                      <option value='IMPS'>IMPS</option>
                      <option value='NEFT'>NEFT</option>
                      <option value='RTGS'>RTGS</option>
                    </select>
                    {fiatFormik.touched.transactionType && fiatFormik.errors.transactionType ? <div className="invalid-feedback">{fiatFormik.errors.transactionType}</div> : null}
                  </div>
                </div>
                <div className="col-md-7 col-sm-7 col-6 pd-5">
                  <label className="form-label" htmlFor="transactionId">
                    {fiatFormik.values.transactionType == 'IMPS' ?
                      'UTR Number' : 'Transaction Id'
                    } <span className='secondary text-danger'>*</span></label>
                  <input
                    type="text"
                    name="transactionId"
                    placeholder={fiatFormik.values.transactionType == 'IMPS' ?
                      'Enter UTR Number' : 'Enter Transaction Id'
                    }
                    className={`form-control ${fiatFormik.errors.transactionId ? 'is-invalid' : ''}`}
                    onBlur={fiatFormik.handleBlur}
                    value={fiatFormik.values.transactionId}
                    onChange={fiatFormik.handleChange}

                  />
                  {fiatFormik.touched.transactionId && fiatFormik.errors.transactionId ? <div className="invalid-feedback">{fiatFormik.errors.transactionId}</div> : null}
                </div>
              </div>
              <label className="form-label" htmlFor="Admin Bank Details">Admin Bank Details</label>
              <div className="cm_lisw2">
                {adminBankDetails.length > 0 ?


                  <>
                    <div className="d-flex justify-content-between lisw_rw2">
                      <span className="lisw_lf2">
                        Account Number
                      </span>
                      <span className="lisw_rig2">
                        {adminBankDetails[0].accountNumber}
                        <button type="button" className="btn">
                          <img src="/assets/images/deposit/Copy.png" className="img-fluid" onClick={() => handleCopy(adminBankDetails[0].accountNumber)} />
                        </button>
                      </span>
                    </div>
                    <div className="d-flex justify-content-between lisw_rw2">
                      <span className="lisw_lf2">
                        Bank Name
                      </span>
                      <span className="lisw_rig2">
                        HDFC
                        {adminBankDetails[0].bankName}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between lisw_rw2">
                      <span className="lisw_lf2">
                        IFSC Code
                      </span>
                      <span className="lisw_rig2">
                        {adminBankDetails[0].ifscCode}


                        <button type="button" className="btn">
                          <img src="/assets/images/deposit/Copy.png" className="img-fluid" onClick={() => handleCopy(adminBankDetails[0].ifscCode)} />
                        </button>
                      </span>
                    </div>
                    <div className="d-flex justify-content-between lisw_rw2">
                      <span className="lisw_lf2">
                        Account Holder Name
                      </span>
                      <span className="lisw_rig2">
                        {adminBankDetails[0].holderName}

                      </span>
                    </div>
                  </>
                  :
                  <div className='d-flex justify-content-center'>

                    <h6 className='error'>Server Busy</h6>
                  </div>
                }
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="Upload">Upload your Receipt Image <span className='secondary text-danger'>*</span></label>
                <div className="input-group uplo_grp flex-nowrap">
                  <span className="input-group-text">Choose file</span>
                  <input
                    className="form-control"
                    type="file"
                    onChange={(event) => fiatFormik.setFieldValue("receiptProof", event.currentTarget.files[0])}
                    onBlur={fiatFormik.handleBlur}
                    ref={(input) => (self.fileInput = input)}
                  // onChange={handleFileUpload}
                  />
                  <span className="placeholder-text">
                    {fiatFormik.values.receiptProof ? fiatFormik.values.receiptProof.name : 'Upload Receipt Image'}
                  </span>
                </div>

                {/* Conditionally render preview label and section if a file is selected */}
                {fiatFormik.values.receiptProof && !fiatFormik.errors.receiptProof && (
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
                            {fiatFormik.values.receiptProof ? (
                              // Display selected image preview
                              <img
                                src={URL.createObjectURL(fiatFormik.values.receiptProof)}
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
              {fiatFormik.touched.receiptProof && fiatFormik.errors.receiptProof && <div className='error'>{fiatFormik.errors.receiptProof}</div>}


              <div className="row mb-3">
                <div className="col-md-12">
                  <p className="text-muted hintx">Lorem ipsum dolor sit amet consectetur. Duis etiam facilisis elit quam. Ut convallis nunc purus curabitur ut sapien facilisis mi quis. </p>
                </div>
              </div>
              <div className="form-group text-center pt-2">
                {createLoad ?
                  <button disabled className="btn btn-action text-white fw600">Loading...</button>

                  :

                  <button type="onSubmit" className="btn btn-action text-white fw600">Submit</button>
                }
              </div>
            </form>

            {/* <form className="cm_frmw2">
                            <div className="form-group">
                              <label className="form-label" htmlFor="Amount">Amount</label>
                              <div className="row ma-5">
                                <div className="col-md-8 col-sm-7 col-6 pd-5">
                                  <input type="text" className="form-control" placeholder="0.00" />
                                </div>
                                <div className="col-md-4 col-sm-5 col-6 pd-5">
                                  <div className="select2bx">
                                    <select className="select2">
                                      <option data-symbol="₹" selected> <span className="pri_color">₹</span> INR</option>
                                      <option data-symbol="$"><span className="pri_color">$</span> USD</option>
                                      <option data-symbol="€"><span className="pri_color">€</span> EUR</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <label className="form-label" htmlFor="Bank Account">Merchant</label>
                              <select className="select1">
                                <option>Visa INR</option>
                                <option>Visa INR</option>
                                <option>Visa INR</option>
                              </select>
                            </div>
                            <div className="cm_lisw2">
                              <div className="d-flex justify-content-between lisw_rw2">
                                <span className="lisw_lf2">
                                  Fee:
                                </span>
                                <span className="lisw_rig2">
                                  0.1%
                                </span>
                              </div>
                              <div className="d-flex justify-content-between lisw_rw2">
                                <span className="lisw_lf2">
                                  Amount received:
                                </span>
                                <span className="lisw_rig2">
                                  0 INR
                                </span>
                              </div>
                            </div>  
                            <div className="row mb-3">
                              <div className="col-md-7">
                                <p className="text-muted hintx">Justo donec enim diam vulputate ut pharetra.</p>
                              </div>
                            </div>  
                            <div className="form-group">
                              <button type="button" className="btn btn-action text-white fw600 w-100">Deposit</button>
                            </div>
                          </form> */}

          </div>
          {/* <div className="col-md-6 rsp_w100">
                            <div className="qr_bk1">
                              <div className="w-100 text-center">
                                <QRCode
                                  value={coinData.address}
                                  logoImage="/favicon.ico"
                                  size={256}
                                  logoWidth={220}
                                  logoHeight={220}
                                  logoOpacity={0.4}
                                  qrStyle="dots"
                                  eyeRadius={10}
                                  bgColor="#ffffff"
                                  fgColor="black"
                                  quietZone={40}
                                  removeQrCodeBehindLogo={false}
                                />
                                <img src="/assets/images/nico/qr_ico3.png" className="img-fluid" />
                              </div>
                              <div className="row qr_rw1 ma-5 align-items-center justify-content-center">
                                <div className="col-md-8 col-sm-8 col-10 pd-5">
                                  <h6>Address</h6>
                                  <p>bc2w-qkj7...wawp-q034</p>
                                </div>
                                <div className="col-md-4 col-sm-4 col-2 pd-5">
                                  <button type="button" className="btn cm_bbtn1" onClick={() => handleCopy(copy)}>Copy</button>
                                </div>
                              </div>
                            </div>
                          </div> */}


        </div>
      </div>
    </div>
  )
}

export default FiatDeposit