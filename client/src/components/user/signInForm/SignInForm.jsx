import React, { useState, useEffect } from 'react'
import axios from '../../../config/axios'
import './signInForm.scss'
import { FaRegEye } from "@react-icons/all-files/fa/FaRegEye";
import { FaRegEyeSlash } from "@react-icons/all-files/fa/FaRegEyeSlash";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLoagIN, reset } from '../../../Redux/features/user/authSlice'
import { RiLoader2Line } from '@react-icons/all-files/ri/RiLoader2Line'
import { useCookies } from 'react-cookie'

function SignInForm() {
    // States
    const [show, setShow] = useState('')
    const [page, setPage] = useState('SignIn')
    const [error, setError] = useState('')
    const [form, setForm] = useState({ userName: null, password: null })
    const [cookies, setCookie] = useCookies(['commenter'])
    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.userAuth)


    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Input Password Show
    const handlePasswordShow = () => {
        if (show) {
            setShow(false)
        } else {
            setShow(true)
        }
    }
    // Handle Login and Email Or Username Sumbit
    const handlePage = () => {
        setPage('Submit')
    }

    // Input Change Handle
    const handleChange = (e) => {
        dispatch(reset())
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // Form Submit
    const handleSumbit = (e) => {
        e.preventDefault();
        if (page === "SignIn") {
            dispatch(userLoagIN(form))

        } else {
            axios.post('/verify-username-or-email', { name: form.userName }).then((response) => {
                if (response.data.success) {
                    axios.post('/send-otp', { number: response.data.mobile }).then((result) => {
                        if (result.data.success) {
                            navigate('/otp', {
                                state: {
                                    email: response.data.emailId,
                                    mobile: response.data.mobile,
                                    forgot: true
                                }
                            })
                        }
                    })
                }
            }).catch((error) => {
                if (error.response.data.error) {
                    setError(error.response.data.message)
                }
            })
        }
    }
    useEffect(() => {
        if (cookies.commenter || user) {
            navigate('/')
        }
    }, [isError, isSuccess, user, message, dispatch])

    return (
        <div>
            <form action="" onSubmit={handleSumbit} >
                <div className='row'>

                    <div className="inputDiv col-12 my-2">
                        <input type="text" id='userName' onChange={handleChange} required name='userName' />
                        <label htmlFor="userName">User name Or Email Id</label>
                    </div>
                    {page !== 'SignIn' ?
                        '' :
                        <>
                            <div className="inputDiv col-12 my-2">
                                <input type={show ? 'text' : 'password'} onChange={handleChange}
                                    id='password' required name='password' />
                                <label htmlFor="password">Password</label>
                                <div className='show-icon' onClick={handlePasswordShow}>
                                    {show ? <FaRegEyeSlash /> : <FaRegEye />}
                                </div>

                            </div>
                            <p onClick={handlePage}>Forgot password ?</p>
                        </>
                    }


                    <div>
                        {error ?
                            <button type='button' className='error-div button w-100 mt-2 '>{error}</button>
                            : ''
                        }
                        {isError ?
                            <button type='button' className='error-div button w-100 mt-2 '>{message}</button>
                            : ''
                        }

                        <button type='submit' className='button button-color w-100 mt-2 '> {isLoading ?
                            <span className=''><RiLoader2Line className='button-loading-icon' /></span> : ''}
                            {page === 'SignIn' ? 'Sign In' : 'Submit'}</button>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignInForm