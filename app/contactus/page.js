'use client'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"
import { useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { removeWhiteSpace } from "@/util/common";
import { apiRequest } from '@/hooks/apiCall'
// import Faq from '@/components/sections/expo/faq'
import Faq from "@/components/sections/home/Faq";
import "/styles/home.css"
import ContactusFaq from "./faq";

export default function Contactus() {


    const { siteSocialLinks } = useSelector((state) => state.block);
    const [isActive, setIsActive] = useState(1)
    const handleClick = (key) => {
        setIsActive(prevState => prevState === key ? null : key)
    }
    const [btnLoad, setBtnLoad] = useState(false)

    const { control, register, handleSubmit, formState: { errors }, getValues, setValue, watch, reset } = useForm({
        mode: 'onChange'
    });
    const onSubmit = async (values) => {
        try {
            setBtnLoad(true)
            const { name, subject, email, message } = values;
            const payload = { name, subject, email ,message};
            const response = await apiRequest('/contactUs', payload)
            if (response?.status) {
                reset()
            }
        } catch (error) {
            console.error(error);        
        } 
        finally {
            setBtnLoad(false)
        }
    }
 
    return (
        <>
            <Layout headerStyle={1} footerStyle={1}>
                <div>
                    <section className="container mt-4 pt-4 pb-3">
                        <div className="row justify-content-center">
                            <div className="col-md-10 rsp_w100">
                                <div className="row">
                                    <div className="col-xl-6 col-md-6 col-sm-5">
                                        <div className="block-text1 mt-3 mb-3">
                                            <h2 className="finter fw600 mb-3">Contact Us</h2>
                                            <p className="fs-16 fopsans fw400">
                                            We’re here to help you 24/7! Whether you have questions about our services, need support with your account, or want to provide feedback, our team is ready to assist you.
                                            </p>
                                        </div>
                                        <div className="cm_list1">
                                            <h4 className="finter fw600 pri_color">Get in Touch with Us</h4>
                                            <ul className="list d-flex flex-wrap">
                                                <li>
                                                    <p className="fopsans fw400">
                                                    <span className="icon-check">
                                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg> */}
                                                    </span>

                                                    24/7 support via email, phone, and social media.
                                                    </p>
                                                </li>
                                                <li>
                                                    <p className="fopsans fw400">
                                                        <span className="icon-check">
                                                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg> */}
                                                        </span>
                                                        Quick response times to all inquiries.
                                                    </p>
                                                </li>
                                                <li>
                                                    <p className="fopsans fw400">
                                                        <span className="icon-check">
                                                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"></path></svg> */}
                                                        </span>
                                                        We value your feedback to enhance our services.
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                    <div className="col-xl-6 col-md-6 col-sm-7">
                                        <div className="contact-main">
                                        <form className="eform1" onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                                                {/* <div className="form-group row">
                                                    <div className="col-md-6 col-sm-6">
                                                        <label htmlFor="FName" className="cm_label2 fopsans fw400">First name</label>
                                                        <input type="text" className="form-control" id="FName" placeholder=""
                                                        
                                                        />
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <label htmlFor="LName" className="cm_label2 fopsans fw400">Last name</label>
                                                        <input type="text" className="form-control" id="LName" placeholder="" />
                                                    </div>
                                                </div> */}
                                                  <div className="form-group">
                                                    <label htmlFor="Name" className="cm_label2 fopsans fw400">Name</label>
                                                    <input type="text" className="form-control" id="Name" 
                                                     {...register('name', {
                                                        required: 'Name is required',
                                                        pattern: {
                                                            value: /^[A-Za-z\s]+$/,
                                                            message: 'Enter valid name with no special character'
                                                        },
                                                        minLength: {
                                                            value: 2,
                                                            message: 'Enter valid name',
                                                        }
                                                    })} placeholder="Enter Name"  />
                                                     {errors.name && <span className="secondary small text-danger">{errors.name.message}</span>}
                                                    
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="cm_label2 fopsans fw400">Email Address</label>
                                                    <input type="email" className="form-control" id="exampleInputEmail1" 
                                                     {...register('email', {
                                                        required: 'Email Address is required',
                                                        pattern: {
                                                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
                                                            message: 'Enter a valid email Address',
                                                        },
                                                    })} onKeyDown={removeWhiteSpace} autoComplete='off' placeholder="Enter Email Address"
                                                     />
                                                       {errors.email && <span className="secondary small text-danger">{errors.email.message}</span>}
                                                </div>
                                                
                                                <div className="form-group">
                                                    <label htmlFor="Name" className="cm_label2 fopsans fw400">Subject</label>
                                                    <input type="text" className="form-control" id="Name" 
                                                     {...register('subject', {
                                                        required: 'Subject  is required',
                                                       
                                                    })} placeholder="Enter Subject"
                                                    />
                                                     {errors.subject && <span className="secondary small text-danger">{errors.subject.message}</span>}
                                                </div>
                                                
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1" className="cm_label2 fopsans fw400">Message</label>
                                                    <textarea cols={30} rows={10} className="form-control" 
                                                      {...register('message', {
                                                        required: 'Message is required',
                            
                                                    })} autoComplete='off' placeholder="Your Message" />
                                                       {errors.message && <span className="secondary small text-danger">{errors.message.message}</span>}

                                                </div>
                                                <button type="submit" className="btn text-white btn-action"  disabled={btnLoad}>
                                                {btnLoad ? 'Loading...' : 'Submit'}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="cm_mn1 mt-4 pt-4 mb-4">
                                    <h3 className="finter fw600">Ultrapro by Your Side</h3>
                                    <div className="row">
                                        <div className="col-xl-6 col-md-6 col-sm-6">
                                            <div className="cm_card1 dis_bg">
                                                <h4 className="finter fw600 black8">24/7 Customer Service</h4>
                                                <p className="fopsans fw400 black8">Get quick answers and support with our FAQs and guides. For personalized assistance, our team is available 24/7.  </p>
                                                <ul className="ftm">
                                                    <li>
                                                        <a href="mailto:info@ultraproex.com" className="pri_color">
                                                            <img src="/assets/images/icon/email.png" alt="" className="img-fluid" />
                                                            <span className="fw400 foutfit">info@ultraproex.com</span>
                                                            <img src="/assets/images/icon/arrow3.png" alt="" className="img-fluid" />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-md-6 col-sm-6">
                                            <div className="cm_card1 pri_bg">
                                                <h4 className="finter fw600 black8">Join Our Community</h4>
                                                <p className="finter fw400 black9">Become part of our thriving community and stay connected with the latest updates, exclusive offers, and valuable insights. Engage with fellow crypto enthusiasts, share your experiences, and be at the forefront of our exciting journey. </p>
                                                <h6 className="fopsans fw400 black8">Community</h6>
                                                <div className="mail_section">
                                                <Link href={siteSocialLinks && siteSocialLinks?.telegramLink || '#'} className="title" target="_blank">
                                                    <img src="/assets/images/nico/tele1.png" /> Telegram Community
                                                    <img src="/assets/images/viewarrow-icon.svg" />
                                                </Link>
                                                </div>
                                                {/* <ul className="d-flex flex-wrap ftms">
                                                    <li>
                                                        <Link href="#">
                                                            <img src="/assets/images/icon/ico1.png" alt="" className="img-fluid" />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">
                                                            <img src="/assets/images/icon/ico2.png" alt="" className="img-fluid" />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">
                                                            <img src="/assets/images/icon/ico3.png" alt="" className="img-fluid" />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">
                                                            <img src="/assets/images/icon/ico4.png" alt="" className="img-fluid" />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">
                                                            <img src="/assets/images/icon/ico5.png" alt="" className="img-fluid" />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#">
                                                            <img src="/assets/images/icon/ico6.png" alt="" className="img-fluid" />
                                                        </Link>
                                                    </li>
                                                </ul> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                {/* <Faq /> */}
                                <ContactusFaq/>

                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    )
}