import React, { useState } from 'react'
import { FaRegEye } from "@react-icons/all-files/fa/FaRegEye";
import { FaRegEyeSlash } from "@react-icons/all-files/fa/FaRegEyeSlash";
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { passwordValidation } from '../../../assets/js/user/form-validation'
import axios from '../../../config/axios'


function NewPassword() {
    const [show, setShow] = useState(false)
    const [error, setError] = useState('')
    const [form, setForm] = useState({ emailId: null, password: null, cpassword: null })

    const location = useLocation()
    const navigation = useNavigate()

    const handlePasswordShow = () => {
        if (show) {
            setShow(false)
        } else {
            setShow(true)
        }
    }

    const handleChange = (e) => {
        setError('')
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSumbit = (e) => {
        e.preventDefault();
        let validate = passwordValidation(form)
        if (validate.success) {
            axios.post('/new-password', form).then((result) => {
                if (result) {
                    navigation('/sign-in')
                }
            })
        } else {
            setError(validate.message)
        }
    }
    useEffect(() => {
        if (location.state) {
            setForm({
                ...form,
                emailId: location.state.emailId
            })
        } else {
            navigation('/sign-in')
        }
    }, [])
    return (
        <div>
            <form action="" onSubmit={handleSumbit}>
                <div className='row'>
                    <h6 className='text-center'>Set New Password</h6>

                    <div className="inputDiv col-12 my-2">
                        <input type={show ? 'text' : 'password'} onChange={handleChange} name='password'
                            id='password' required />
                        <label htmlFor="password">New Password</label>
                        <div className='show-icon' onClick={handlePasswordShow}>
                            {show ? <FaRegEyeSlash /> : <FaRegEye />}
                        </div>

                    </div>
                    <div className="inputDiv col-12 my-2">
                        <input type={show ? 'text' : 'password'} name='cpassword' onChange={handleChange}
                            id='cpassword' required />
                        <label htmlFor="cpassword">Confirm Password</label>
                        <div className='show-icon' onClick={handlePasswordShow}>
                            {show ? <FaRegEyeSlash /> : <FaRegEye />}
                        </div>

                    </div>

                    <div>
                        {error ?
                            <button type='button' className='error-div button w-100 mt-2 '>{error}</button>
                            : ''
                        }

                        <button type='submit' className='button button-color w-100 mt-2 '>
                            Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NewPassword