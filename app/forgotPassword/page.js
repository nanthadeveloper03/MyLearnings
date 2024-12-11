"use client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import { apiRequest } from '@/hooks/apiCall'
import fetch from "@/util/envelope"
import { removeWhiteSpace } from "@/util/common";
import SideCard from '@/components/sections/auth/sideCard'
import ThemeSwitch from '@/components/elements/ThemeSwitch'

export default function forgotPassword() {

  const { register, handleSubmit, formState: { errors }, getValues, setValue, reset } = useForm({
    mode: 'onChange'
  });
  const [isLoading, setIsLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = async (payload, step) => {
    try {
      setIsLoading(true)
      let object = { email: payload.email, fToken: 'captchaToken' }
      const response = await apiRequest('/auth/forgotpassword', object);
      if (response?.status) {
        reset()
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

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
                <div className="flat-tabs col-md-4">
                  <div className="content-tab">
                    <div className="content-inner">
                      <h3 className="heading mb-4">Forgot Password?</h3>

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
                          <label htmlFor="exampleInputEmail1">
                            Email Address
                          </label>
                          <input type="text" {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
                              message: 'Enter a valid email',
                            },
                          })} onKeyDown={removeWhiteSpace} className="form-control" autoComplete='off' placeholder="Enter your email address" />
                          {errors.email && <span className="secondary small text-danger">{errors.email.message}</span>}
                        </div>

                        {/* <ReCAPTCHA sitekey={fetch.machineKey || ''} onChange={handleCaptchaChange} /> */}

                        {isLoading ?
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
