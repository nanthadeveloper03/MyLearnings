import Link from "next/link";
import { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { removeWhiteSpace } from "@/util/common";
import { apiRequest } from '@/hooks/apiCall'
import Select from 'react-select';
import CountryList from '../../../app/CountryCodes.json';

export default function Register() {

    const [btnLoad, setBtnLoad] = useState(false)

    const { control, register, handleSubmit, formState: { errors }, getValues, setValue, watch, reset } = useForm({
        mode: 'onChange'
    });

    const onSubmit = async (payload) => {
        console.log(payload,"PAYYAYYAYYAYYYSYYDYSYSYY");
        
        try {
            setBtnLoad(true)
            let countryDetails = payload.country
            payload.country = countryDetails.countryName
            payload.countryCode = countryDetails.countryCode
            payload.mobileCode = countryDetails.mobileCode
            payload.zipcode = '232'
            const response = await apiRequest('/expo/register', payload)
            if (response?.status) {
                reset()
                setValue('country', '')
            }
        } catch (error) {
            console.error(error);
        } finally {
            setBtnLoad(false)
        }
    }

    const countryOptions = CountryList.map(country => ({
        value: country.code,
        label: `${country.flag} ${country.name} (${country.dial_code})`,
        countryCode: country.code,
        mobileCode: country.dial_code,
        countryName: country.name,
    }));

    const validateAge = (value) => {
        if (!value) return "Age is required";
        if (isNaN(value)) return "Age must be a number";
        if (value < 18) return "Age must be at least 18 years old";
        if (value > 99) return "Age must be maximum 99 years old";
        return true;
    };

    return (
        <>
            <section className="exp_sc1">
                <div className="container">

                    <div className="row justify-content-center">
                        <div className="col-md-11 rsp_w100">
                            <div className="row d-flex align-items-center justify-content-center">
                                <div className="col-md-7 rsp_w50">
                                    <div className="exp_cnb1">
                                        <h6 className="finter fw600 text-white text-uppercase"><span>Crypto Online Expo</span></h6>
                                        <h1 className="text-capitalize finter fw600">The World’s Biggest Online Crypto Expo!
                                        </h1>
                                        <p>Be part of the largest virtual crypto gathering in history! This online crypto expo unites enthusiasts from around the globe to network, exchange ideas, and drive the future of the crypto revolution from anywhere in the world.</p>
                                        {/* <Link href="/register" className="btn btn-action finter fw600 text-white">
                                            Online Expo
                                        </Link> */}
                                    </div>
                                </div>
                                <div className="col-md-5 rsp_w50">
                                    <form className="eform1" onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                                        <h5 className="text-uppercase fw600">ONLINE CRYPTO EXPO PASS</h5>

                                        <div className="form-group row ma_10">
                                            <div className="col-md-12 col-sm-12 pd_10">
                                                <input type="text" className="form-control" {...register('name', {
                                                    required: 'Name is required',
                                                    pattern: {
                                                        value: /^[A-Za-z\s]+$/,
                                                        message: 'Enter valid name with no special character'
                                                    },
                                                    minLength: {
                                                        value: 2,
                                                        message: 'Enter valid name',
                                                    }
                                                })} placeholder="Your Name" />
                                                {errors.name && <span className="secondary small text-danger">{errors.name.message}</span>}
                                            </div>
                                        </div>

                                        <div className="form-group row ma_10">

                                            <div className="col-md-12 col-sm-12 pd_10">
                                                <input type="text" {...register('email', {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
                                                        message: 'Enter a valid email',
                                                    },
                                                })} onKeyDown={removeWhiteSpace} className="form-control" autoComplete='off' placeholder="Your Email" />
                                                {errors.email && <span className="secondary small text-danger">{errors.email.message}</span>}
                                            </div>
                                        </div>

                                        <div className="form-group row ma_10">
                                            <div className="col-md-12 pd_10">
                                                <Controller
                                                    name="country"
                                                    control={control}
                                                    rules={{ required: 'Country is required' }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            classNamePrefix="custom-select"
                                                            options={countryOptions}
                                                            onChange={(selectedOption) => {
                                                                setValue('country', selectedOption);
                                                                field.onChange(selectedOption);
                                                            }}
                                                            placeholder="Choose your country"
                                                            styles={{
                                                                control: (base, state) => ({
                                                                  ...base,
                                                                  boxShadow: state.isFocused ? 'none' : base.boxShadow,
                                                                  borderColor: state.isFocused ? 'transparent' : base.borderColor, 
                                                                }),
                                                              }}
                                                        />
                                                    )}
                                                />
                                                {errors.country && <span className="secondary small text-danger">{errors.country.message}</span>}
                                            </div>
                                        </div>

                                        <div className="form-group row ma_10">
                                            <div className="col-md-12 pd_10">
                                                <input type="text" className="form-control" {...register('mobile', {
                                                    required: 'WhatsApp number is required',
                                                    pattern: {
                                                        value: /^\d+$/,
                                                        message: 'WhatsApp number can only contain numbers',
                                                    },
                                                    minLength: {
                                                        value: 6,
                                                        message: 'WhatsApp number must be at least 6 digits',
                                                    },
                                                    maxLength: {
                                                        value: 15,
                                                        message: 'WhatsApp number must be at maximum 15 digits',
                                                    },
                                                })} placeholder="WhatsApp Number" />
                                                {errors.mobile && <span className="secondary small text-danger">{errors.mobile.message}</span>}
                                            </div>
                                        </div>
                                        <div className="form-group row ma_10">
                                            <div className="col-md-6 col-sm-6 pd_10">
                                                <input type="number" id="age" className="form-control" placeholder="Your Age"
                                                    {...register('age', {
                                                        required: "Age is required",
                                                        validate: validateAge
                                                    })}
                                                />
                                                {errors.age && <span className="secondary small text-danger">{errors.age.message}</span>}
                                            </div>

                                            <div className="col-md-6 col-sm-6 pd_10">
                                                <select className="form-control form-select" {...register('interest', { required: 'Interest is required' })} >
                                                    <option value={""}> Choose your interest </option>
                                                    <option value={"Both"}> Both </option>
                                                    <option value={"Crypto Trading"}> Crypto Trading </option>
                                                    <option value={"Learning Blockchain"}> Learning Blockchain </option>
                                                </select>
                                                {errors.interest && <span className="secondary small text-danger">{errors.interest.message}</span>}
                                            </div>
                                        </div>


                                        <div className="row ma_10">
                                            <div className="col-md-12 pd_10">
                                                {btnLoad ?
                                                    <button type="button" className="btn btn-action text-white w-100" disabled> Loading ... </button> :
                                                    <button type="submit" className="btn btn-action text-white w-100">Submit</button>
                                                }
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}
