"use client";
import Layout from "@/components/layout/Layout";
import { useForm } from 'react-hook-form';
import dynamic from "next/dynamic";
import Swal from 'sweetalert2';
import Link from "next/link";
import ReCAPTCHA from 'react-google-recaptcha';
import { useEffect, useState } from "react";
import { removeWhiteSpace } from "@/util/common";
import { apiRequest } from '@/hooks/apiCall'
import CountryList from '../CountryCodes.json';
import { useRouter, useSearchParams } from 'next/navigation';
import fetch from "@/util/envelope"
import SwitchLink from '@/components/sections/SwitchLink';
import withOutAuth from '@/util/withOutAuth';
import SideCard from '@/components/sections/auth/sideCard'
import ThemeSwitch from '@/components/elements/ThemeSwitch'
import Loading from "../loading";

function Register() {

  const router = useRouter()
  const searchParams = useSearchParams();
  const referralId = searchParams.get('refCode') || '';
  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch, reset } = useForm({
    mode: 'onChange'
  });
  const password = watch('password', '');
  const [btnLoad, setBtnLoad] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [refDisable, setRefDisable] = useState(false)

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const [maintenance, setMaintenance] = useState(false)
  const [maintenanceTxt, setMaintenanceTxt] = useState('')

  const [refBox, setRefBox] = useState(false)


  const onSubmit = async (payload) => {
    try {
      setBtnLoad(true)
      const selected = CountryList.find(country => country.code === payload.country);
      payload.country = selected.name
      payload.countryCode = selected.code
      payload.mobileCode = selected.dial_code
      payload.rToken = 'captchaToken'
      delete payload?.confirmPassword
      delete payload?.terms
      const response = await apiRequest('/auth/register', payload)
      if (response?.status) {
        router.push('/login')
      }
    } catch (error) {
      console.error(error);
    } finally {
      setBtnLoad(false)
    }
  }

  function showAlert() {
    Swal.fire({
      title: "Success !",
      text: "Thanks for joining with us. Verification mail has been sent to your registered mail address. Kindly activate your account, and get your giveaway",
      icon: "success",
      confirmButtonText: 'Go to login page',
      customClass: {
        popup: '',
        confirmButton: 'btn-primary',
      }
    }).then(() => {
      router.push('/login')
    });
  }

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  useEffect(() => {
    if (referralId) {
      setValue('referId', referralId)
      setRefDisable(true)
      setRefBox(true)
    }
  }, [referralId])


  const initLoad = async () => {
    try {
      const response = await apiRequest('/account/siteInfo', {})
      if (response?.status) {
        let data = response?.data
        if (data) {
          setMaintenance(data.registerMaintenance)
          setMaintenanceTxt(data.registerMaintenanceMessage)
          setIsLoading(false)
        }
      }
    } catch (e) {
      console.log('')
    }
  }

  useEffect(() => {
    initLoad()
  }, [])

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    if (numericValue.length <= 15) {
      setValue('mobileNo', numericValue);
    } else {
      setValue('mobileNo', numericValue.slice(0, 15));
    }
  };

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Layout headerStyle={4} footerStyle={4}>
        <section className="register login">
          <ThemeSwitch />
          <div className=" w-100 h-100">
            <div className="row h-100">
              <div className="col-md-12 d-flex flex-wrap align-items-center">
                <SideCard />
                <div className="col-md-1"></div>
                <div className="flat-tabs col-md-5">
                  <div className="content-tab">
                    <div className="content-inner">


                      {maintenance ?
                        <>
                          <h3 className="heading mb-4"> Under Maintenance</h3>

                          <div className="row">
                            <div className="col-md-12">
                              <div className="block-text">
                                <p className="forgot_description">
                                  {maintenanceTxt}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>

                        :

                        <>
                          <SwitchLink tabId={1} />
                          <form className="authform" onSubmit={handleSubmit(onSubmit)} autoComplete='off'>

                            <div className="form-group">
                              <label>Name  (As per government id) <span className='small'> * </span> </label>
                              <input type="text" className="form-control" {...register('fullName', {
                                required: 'Name is required',
                                pattern: {
                                  value: /^[A-Za-z\s]+$/,
                                  message: 'Enter valid name with no special character'
                                },
                                minLength: {
                                  value: 2,
                                  message: 'Enter valid name',
                                }
                              })} placeholder="Enter Name" />
                              {errors.fullName && <span className="secondary small text-danger">{errors.fullName.message}</span>}
                            </div>

                            <div className="form-row fields">
                              <div className="form-group">
                                <label>Country <span className='small'> * </span> </label>
                                <select className="form-control" {...register('country', { required: 'Country is required' })} >
                                  <option value={""}> Choose your country </option>
                                  {CountryList.length > 0 && CountryList.map((country) => (
                                    <option key={country.code} value={country.code}>
                                      {country.name} ({country.dial_code})
                                    </option>
                                  ))}
                                </select>
                                {errors.country && <span className="secondary small text-danger">{errors.country.message}</span>}
                              </div>

                              <div className="form-group">
                                <label>Phone <span className='small'> * </span> </label>
                                <input type="text" className="form-control" {...register('mobileNo', {
                                  required: 'Mobile number is required',
                                  pattern: {
                                    value: /^\d+$/,
                                    message: 'Mobile number can only contain numbers',
                                  },
                                  minLength: {
                                    value: 6,
                                    message: 'Mobile number must be at least 6 digits',
                                  },
                                  maxLength: {
                                    value: 15,
                                    message: 'Mobile number must be at maximum 15 digits',
                                  },
                                })} placeholder="Enter your mobile number"

                                />
                                {errors.mobileNo && <span className="secondary small text-danger">{errors.mobileNo.message}</span>}
                              </div>
                            </div>

                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Email <span className='small'> * </span> </label>
                              <input type="text" {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
                                  message: 'Enter a valid email',
                                },
                              })} onKeyDown={removeWhiteSpace} className="form-control" autoComplete='off' placeholder="Enter your email address" />
                              {errors.email && <span className="secondary small text-danger">{errors.email.message}</span>}
                            </div>

                            <div className="form-group">
                              <label>Password <span className='small'> * </span> </label>
                              <div className="input-group">
                                <input type={showPassword ? 'text' : 'password'} {...register('password', {
                                  required: 'Password is required',
                                  minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long',
                                  },
                                  validate: {
                                    hasUppercase: (value) => /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
                                    hasLowercase: (value) => /[a-z]/.test(value) || 'Password must contain at least one lowercase letter',
                                    hasNumber: (value) => /\d/.test(value) || 'Password must contain at least one number',
                                    hasSpecialChar: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Password must contain at least one special character',
                                  },
                                })} className="form-control py-2" placeholder="Enter your password" autoComplete='off' onKeyDown={removeWhiteSpace} />
                                <div className="input-group-append" onClick={() => setShowPassword(!showPassword)}>
                                  <img src={showPassword ? "/assets/images/eye_open.svg" : "/assets/images/eye_closed.svg"} className='cursor-pointer' />
                                </div>
                              </div>
                              {errors.password && <span className="secondary small text-danger">{errors.password.message}</span>}
                            </div>

                            <div className="form-group">
                              <label>Confirm Password <span className='small'> * </span> </label>
                              <div className="input-group">
                                <input type={showConfirmPassword ? 'text' : 'password'} {...register('confirmPassword', {
                                  required: 'Confirm password is required',
                                  validate: value => value === password || 'The password does not match'
                                })} className="form-control py-2" placeholder="Please re-enter your password" autoComplete='off' onKeyDown={removeWhiteSpace} />
                                <div className="input-group-append" onClick={() => setshowConfirmPassword(!showConfirmPassword)}>
                                  <img src={showConfirmPassword ? "/assets/images/eye_open.svg" : "/assets/images/eye_closed.svg"} className='cursor-pointer' />
                                </div>
                              </div>
                              {errors.confirmPassword && <span className="secondary small text-danger">{errors.confirmPassword.message}</span>}
                            </div>

                            <div className="form-group">
                              <label>Referral Id <small>(or)</small> Voucher Code (optional) </label>
                              <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg" className='mx-2 cursor-pointer' onClick={() => setRefBox(!refBox)}>
                                <path d="M13.5 1.5L7.5 7.5L1.5 1.5" stroke="var(--onsurface)" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              {refBox &&
                                <input type="text" className="form-control" {...register('referId')} onKeyDown={removeWhiteSpace} placeholder="Please enter your referral id (or) voucher code" disabled={refDisable} />
                              }
                            </div>

                            <div className="form-group mt-2">
                              <div className="d-flex justify-content-between w-100" style={{ gap: "10px" }}>
                                <div className="d-flex align-items-center">
                                  <input
                                    type="checkbox"
                                    className={`form-check-input ${errors.terms ? 'border-danger' : ''}`}
                                    {...register('terms', { required: 'Accept our terms and conditions' })}
                                  />
                                  <Link href="/terms-of-use" target='_blank'>
                                    <label
                                      className={`form-check-label mx-2 mb-0 ${errors.terms ? 'text-danger' : ''} cursor-pointer`}
                                    >
                                      I accept the{' '}
                                      <span className={`${errors.terms ? 'text-danger' : 'title-color'} fw-bold`}>
                                        Terms of use
                                      </span>
                                    </label>
                                  </Link>
                                </div>

                                <div className="text-end">
                                <Link href="/resendActivation"> Did not receive <span  className="title-color"> activation mail ? </span> </Link>
                                </div>
                              </div>
                            </div>




                            {/* <ReCAPTCHA sitekey={fetch.machineKey || ''} onChange={handleCaptchaChange} /> */}

                            {btnLoad ?
                              <button type="button" className="btn-action" disabled> Loading ... </button> :
                              <button type="submit" className="btn-action"> Register </button>
                            }
                            <div className="bottom">
                              <p>Already have an account?</p>
                              <Link href="/login">Login</Link>
                            </div>

                          </form>
                        </>
                      }

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default withOutAuth(Register) 