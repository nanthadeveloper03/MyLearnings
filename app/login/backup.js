"use client";
import { toast } from 'react-toastify';
import dynamic from "next/dynamic";
import { useDispatch } from 'react-redux';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { apiRequest } from '@/hooks/apiCall'
import { removeWhiteSpace } from "@/util/common";
import { loginSuccess, logout } from '@/store/authSlice';
import fetch from "@/util/envelope"
import SwitchLink from '@/components/sections/SwitchLink';
import { showNotification } from '@/util/common';
import SideCard from '@/components/sections/auth/sideCard'

export default function Login() {
  const recaptchaRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, getValues, setValue, reset } = useForm({
    mode: 'onChange'
  });
  const [flatTabs, setFlatTabs] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState(null);

  const [step, setStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [isEnable, setIsEnable] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const ThemeSwitch = dynamic(() => import("@/components/elements/ThemeSwitch"), {
    ssr: false,
  });

  const onSubmit = async (payload, step) => {
    try {
      setIsLoading(true)



      if (step === 1) {

        if (!captchaToken) {
          const msg = (<div> <strong>Failure!</strong> <br /> {'Invalid captcha '} </div>);
          toast.error(msg);
          return;
        }

        delete payload?.otp
        payload.cToken = captchaToken
        const response = await apiRequest('/auth/login', payload)
        if (response?.status) {
          setIsEnable(true)
          setStep(response?.data?.step)
          setTimeLeft(response?.data?.timeLeft)
          setCaptchaToken('')
        } else {
          recaptchaRef.current.reset();
        }
      } else {
        let object = { email: getValues('email'), otp: payload.otp, cToken: 'captchaToken' }
        const response = await apiRequest('/auth/loginotp', object)
        if (response?.status) {
          let data = response?.data;
          dispatch(loginSuccess(data));
          router.push('/dashboard');
        } else {
          if (response?.data?.step == 1) {
            reset()
            setStep(1)
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {

    if (timeLeft === 0) {
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    if (timeLeft === 1) {
      setValue('otp', '');
      setIsEnable(true);
      setIsResendEnabled(true);
    }

    return () => clearTimeout(timer);

  }, [timeLeft]);


  const handleChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    setIsEnable(true)
    if (numericValue.length <= 6) {
      setValue('otp', numericValue);
      if (numericValue.length == 6) {
        setIsEnable(false)
      }
    } else {
      setValue('otp', numericValue.slice(0, 6));
      setIsEnable(false)
    }
  };

  const resendOtp = async () => {
    //setIsEnable(true);
    // if(!captchaToken) {
    //   setIsLoading(false);
    //   showNotification(false, 'Invalid captcha')
    //   return false;
    // }
    let object = { email: getValues('email'), cToken: 'captchaToken' }
    try {
      const response = await apiRequest('/auth/resendOtp', object);
      if (response && response.status) {
        setIsResendEnabled(false);
        setTimeLeft(response?.data?.timeLeft)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      //setIsEnable(false);
    }
  };

  useEffect(() => {
    dispatch(logout());
  }, [])

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  return (
    <>

      <section className="register login" style={{ overflowY: "hidden" }}>
        <ThemeSwitch />
        <div className=" w-100 h-100">
          <div className="row h-100">

            {/* <div className="w-100 text-center" style={{ position: 'absolute' }}>
                <div className="header__body d-flex justify-content-between">
                  <div className="header__left">
                    <div className="logo pt-2 ms-4 pb-5">
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
                  </div>

                  <div className="header__right pt-2 ms-4 pb-5">
                    <ThemeSwitch />
                  </div>
                </div>
              </div> */}

            <div className="col-md-12 d-flex flex-wrap align-items-center">
              
              <SideCard />
              
              <div className="col-md-1 col-xs-hidden"></div>
              <div className="flat-tabs col-md-4 col-xs-12">
                <div className="content-tab">
                  <div className="content-inner">

                    <SwitchLink tabId={0} />

                    {step == 1 &&
                      <div className="row">
                        <div className="col-md-12">
                          <div className="block-text">
                            <div className="lock company_address">
                              <div className="company_img">
                                <img src="../assets/images/login-icon.svg" />
                              </div>
                              <div className="company_address_link">
                                <span>Check if your URL is correct</span>
                                <p>
                                  <img src="../assets/images/lock.svg" />
                                  {process.env.NEXT_PUBLIC_SITE_URL}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }

                    <form onSubmit={handleSubmit((data) => onSubmit(data, step))} className="authform">

                      {step === 1 ?
                        <>
                          <div className="form-group">
                            <label> Email Address <span className='secondary'>*</span> </label>
                            <input type="text" {...register('email', {
                              required: 'Email is required',
                              pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
                                message: 'Enter a valid email',
                              },
                            })} onKeyDown={removeWhiteSpace} className="form-control py-2" autoComplete='off' placeholder="Enter your email address" />
                            {errors.email && <span className="secondary small text-danger">{errors.email.message}</span>}
                          </div>

                          <div className="form-group">
                            <label> Password <span className='secondary'>*</span> </label>
                            <div className="input-group">
                              <input type={passwordVisible ? "text" : "password"} {...register('password', {
                                required: 'Password is required',
                              })} className="form-control py-2" autoComplete='off' placeholder="Enter your password" />
                              <div className="input-group-append" onClick={togglePasswordVisibility} onKeyDown={removeWhiteSpace}>
                                <img src={passwordVisible ? "/assets/images/eye_open.svg" : "/assets/images/eye_closed.svg"}
                                  style={{ cursor: "pointer" }}
                                />
                              </div>
                            </div>
                            {errors.password && <span className="secondary small text-danger">{errors.password.message}</span>}
                          </div>

                          <div className="form-group form-check">
                            <div> <Link href="/register">Not a member?</Link> </div>
                            <Link href="/forgotPassword">Forgot Password?</Link>
                          </div>

                          <ReCAPTCHA sitekey={fetch.machineKey || ''} onChange={handleCaptchaChange} ref={recaptchaRef} />

                        </> :

                        <>
                          <div className="form-group">
                            <label> One Time Password <span className='secondary'>*</span> </label>
                            <div className="input-group">
                              <input type="text" {...register('otp', {
                                required: 'OTP number is required',
                              })} onChange={handleChange} className="form-control py-2" autoComplete='off' placeholder="Enter your OTP" disabled={isResendEnabled} />
                              {isResendEnabled ?
                                <div className="input-group-append text-decoration-underline cursor-pointer" onClick={resendOtp}> Resend Now </div> :
                                <div className="input-group-append text-decoration-underline"> Resend in {timeLeft} seconds </div>
                              }
                            </div>
                            {errors.otp && <span className="secondary small text-danger">{errors.otp.message}</span>}
                          </div>

                          <div className="text-end small text-danger">
                            * Do not refresh the page
                          </div>

                          {/* <div className="text-end cursor-pointer" onClick={() => setStep(1)}>
                              Back to login
                            </div> */}

                          {/* <ReCAPTCHA sitekey={fetch.machineKey || ''} onChange={handleCaptchaChange} /> */}
                        </>
                      }

                      {fetch.machineKey &&
                        isLoading ?
                        <button type="button" className="btn-action" disabled> Loading ... </button> :
                        isEnable ?
                          <button type="button" className="btn-action disabled" disabled> Login </button> :
                          <button type="submit" className="btn-action"> Login </button>
                      }

                    </form>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
