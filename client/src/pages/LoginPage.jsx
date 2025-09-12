import React from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineLogin } from "react-icons/md";
import { motion } from 'framer-motion'
import toast, { LoaderIcon } from 'react-hot-toast';
import logo from '/cybermind_works_logo.jpg'
import { useLoginApiMutation } from '../redux/slices/api/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCrenditials } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors },reset } = useForm()
    const[loginApi,{isLoading}]=useLoginApiMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = async(data) => {
        try {
            const res = await loginApi(data).unwrap()
            dispatch(setCrenditials(res))
            toast.success(res.message || "Login Successful")
            reset()
            navigate('/')
        } catch (error) {
            toast.error(error.data.message || error.error)
        }
    }
    return (
        <div className='container h-100'>
            <div className='row h-100'>
                <div className='d-flex flex-column justify-content-center col-sm-12 align-items-center col-lg-6 gap-2'>
                    <img src={logo} height={'250px'} width={'250px'} />
                </div>
                <div className='d-flex justify-content-center col-sm-12 align-items-center col-lg-6'>
                    <div className='login-page w-100'>
                        <div className='p-4 d-flex flex-column align-items-center gap-4'>
                            <motion.div
                                className='login-header'
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2>Login to your account</h2>
                            </motion.div>
                            <motion.div
                                className='login-form bg-light w-75 p-4 rounded shadow'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <form className='d-flex flex-column gap-3' onSubmit={handleSubmit(onSubmit)}>
                                    <div className='d-flex flex-column align-items-start'>
                                        <label>Email</label>
                                        <div className='input-group'>
                                            <input type='email'
                                                name='email'
                                                placeholder='Enter your email address' className="form-control"
                                                {...register("email", {
                                                    required: 'Email is required',
                                                    pattern: {
                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                        message: "Invalid email address"
                                                    }
                                                })}
                                                aria-describedby="inputGroup-sizing-default"
                                            />
                                        </div>
                                        {errors.email && <small className='text-danger'>{errors.email.message}</small>}
                                    </div>
                                    <div className='d-flex flex-column align-items-start'>
                                        <label>Password</label>
                                        <input type='password'
                                            name='password'
                                            placeholder='********' className="form-control"
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: { value: 8, message: "Minimum 8 characters required" }
                                            })}
                                            aria-describedby="inputGroup-sizing-lg"
                                            minLength="8"
                                        />
                                        {errors.password && <small className="text-danger">{errors.password.message}</small>}

                                    </div>
                                    <button
                                        type='submit'
                                        className='btn d-flex gap-2 align-items-center justify-content-center text-white font-weight-bold'
                                        style={{ backgroundColor: "var(--button-color--)" }}>
                                        {isLoading ? (
                                            <>
                                                <LoaderIcon />
                                                Loading...
                                            </>
                                        ) : (
                                            <>
                                                <MdOutlineLogin />
                                                Login
                                            </>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
                <p style={{ position: "absolute", bottom: "0", right: "50%", transform: "translateX(50%)", textAlign: "center" }}>Please login to create job post<br></br> email:demo@gmail.com,password:demo@123</p>
            </div>
        </div>
    )
}

export default LoginPage