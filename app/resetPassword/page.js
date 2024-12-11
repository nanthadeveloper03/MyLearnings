"use client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import { apiRequest } from '@/hooks/apiCall'
import fetch from "@/util/envelope"
import { removeWhiteSpace } from "@/util/common";
import { useRouter, useSearchParams } from 'next/navigation';
import ThemeSwitch from '@/components/elements/ThemeSwitch'
import Loading from "../loading";

export default function forgotPassword() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const rcode = searchParams.get('rcode') || '';
  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch, reset } = useForm({
    mode: 'onChange'
  });
  const password = watch('password', '');
  const [isLoading, setIsLoading] = useState(true)
  const [btnLoading, setBtnLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const onSubmit = async (payload, step) => {
    try {
      setBtnLoading(true)
      payload.rToken = 'captchaToken'
      payload.pwdLink = rcode;
      delete payload?.confirmPassword
      const response = await apiRequest('/auth/resetpassword', payload);
      if (response?.status) {
        reset()
        router.push('/login');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setBtnLoading(false)
    }
  }

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const initLoad = async () => {
    try {
      let payload = {}
      payload.rToken = 'captchaToken'
      payload.pwdLink = rcode;
      const response = await apiRequest('/auth/validreset', payload);
      if (!response?.status) {
        router.push('/login')
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    initLoad()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Layout headerStyle={4} footerStyle={4}>
        <section className="register login" style={{ overflow: "hidden" }}>
        <ThemeSwitch />
          <div className=" w-100 h-100">
            <div className="row h-100">
              <div className="col-md-12 d-flex flex-wrap align-items-center">
                <div className=" col-md-5 col-xs-12 authentcation-left-section_parent">
                  <div className="logo pt-2 ms-4 pb-5 ">
                    <Link className="light" href="/">
                      <img
                        src="/assets/images/logo/logo.png"
                        alt=""
                        width={118}
                        height={42}
                        data-retina="assets/images/logo/logo@2x.png"
                        data-width={118}
                        data-height={42}
                      />
                    </Link>
                  </div>
                  <div className="authentcation-left-section">
                    <h3 className="heading auth_left_col">
                      <span>Trade</span> on the go. <br />
                      Anywhere, Anytime.
                    </h3>
                    <div className="d-flex auth_left_col_image">
                      <div className="ph_img">
                        <img src="/assets/images/ph-img-signin.svg" />
                      </div>
                      <div className="qrcode_panel">
                        <img src="/assets/images/canopro_qrcode.png" alt="" />
                        <p>Scan to Download App</p>
                        <img src="/assets/images/app-store.svg" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-1"></div>
                <div className="flat-tabs col-md-4">
                  <div className="content-tab">
                    <div className="content-inner">
                      <h3 className="heading mb-4">Reset Password</h3>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="block-text">
                            <p className="forgot_description">
                              Enter the email address you used when you joined
                              and we'll send you instructions to reset your
                              password.
                            </p>
                          </div>
                        </div>
                      </div>

                      <form className="authform" onSubmit={handleSubmit(onSubmit)}>

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

                        {/* <ReCAPTCHA sitekey={fetch.machineKey || ''} onChange={handleCaptchaChange} /> */}

                        {btnLoading ?
                          <button type="button" className="btn-action" disabled> Loading ... </button> :
                          <button type="submit" className="btn-action"> Reset Password </button>
                        }

                        {/* <div className="back_link">
                          <Link href="/login">Back to login</Link>
                        </div> */}
                      </form>
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
