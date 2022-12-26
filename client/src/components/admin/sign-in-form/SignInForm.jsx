import React, { useState } from 'react'
import CommenterIcon from '../../../assets/icons/newLogo.png'
import { useNavigate } from 'react-router-dom'
import { FaRegEye } from "@react-icons/all-files/fa/FaRegEye";
import { FaRegEyeSlash } from "@react-icons/all-files/fa/FaRegEyeSlash";
import { RiLoader2Line } from '@react-icons/all-files/ri/RiLoader2Line'
import { useSelector, useDispatch } from 'react-redux'
import { loginAdmin,reset } from '../../../Redux/features/admin/adminAuthSlice'
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';



function SignInForm() {
    
    const dispatch = useDispatch()
    // States
    const [show, setShow] = useState('')
    const [form, setForm] = useState({ emailId: null, password: null })
    const [cookies, setCookie] = useCookies(['commenterAdmin']);
    const { isLoading,  isError, message } = useSelector((state) => state.adminAuth)
    const navigate = useNavigate();
    
    // Input Password Show
    const handlePasswordShow = () => {
        if (show) {
            setShow(false)
        } else {
            setShow(true)
        }
    }

    const handleChange = (e) => {
        dispatch(reset())
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAdmin(form))
        navigate('/admin/user-list')
    }

    useEffect(() => {
        if (cookies.commenterAdmin) {
            navigate('/admin/user-list')
        }
    }, [])

    return (
        <div>
            <div className="container-custom signPage">
                <div className='col-12 col-sm-11 col-md-8 col-lg-5'>
                    <div className="title-div">
                        <div >
                            <img src={CommenterIcon} onClick={() => { navigate('/admin') }} alt="Logo" />
                            <h2 onClick={() => { navigate('/admin') }}>Commenter</h2>
                        </div>
                    </div>
                    <div className="box mt-3" >
                        <div className="form-div">
                            <h6 className='text-center'>Admin Sign In</h6>
                            <form action="" onSubmit={handleSubmit}>
                                <div className='row'>

                                    <div className="inputDiv col-12 my-2">
                                        <input type="text" id='emailId' onChange={handleChange} required name='emailId' />
                                        <label htmlFor="emailId">Email Id</label>
                                    </div>

                                    <div className="inputDiv col-12 my-2">
                                        <input type={show ? 'text' : 'password'} onChange={handleChange}
                                            id='password' required name='password' />
                                        <label htmlFor="password">Password</label>
                                        <div className='show-icon' onClick={handlePasswordShow}>
                                            {show ? <FaRegEyeSlash /> : <FaRegEye />}
                                        </div>

                                    </div>

                                    <div>
                                        {isError ?
                                            <button type='button' className='error-div button w-100 mt-2 '>{message}</button>
                                            : ''
                                        }

                                        <button type='submit' className='button button-color w-100 mt-2 '> {isLoading ?
                                            <span className=''><RiLoader2Line className='button-loading-icon' /></span> : ''}
                                            Sign In</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SignInForm