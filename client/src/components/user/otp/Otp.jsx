import React from 'react'
import axios from '../../../config/axios'
import './otp.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';

function Otp() {

    const location = useLocation()
    const navigate = useNavigate()
    const [number, setNumber] = useState('')
    const [otp, setOtp] = useState('')
    const [error, setError] = useState('')
    useEffect(() => {
        if (location.state) {
            setNumber(location.state.mobile.slice(7, 10))
        } else {
            navigate('/sign-in')
        }
    }, [])
    const handleChange = (e) => {
        setError('')
        setOtp(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/verify-otp', { otp: otp, mobile: location.state.mobile }).then((response) => {
            if (response.data.success) {
                if (location.state.forgot) {
                    navigate('/new-password', {
                        state: {
                            emailId: location.state.email
                        }
                    })
                } else {
                    axios.post('/sign-up', location.state).then((result) => {
                        if (result.data.success) {
                            navigate('/sign-in')
                        }
                    })
                }
            }
        }).catch((error) => {
            setError(error.response.data.message)
        })
    }
    return (
        <div>
            <div className="info-text">
                <p>Your Account confirmation Otp Send <br></br> to -------{number} Mobile Number </p>
            </div>
            <form action="" onSubmit={handleSubmit} >
                <div className='row'>
                    <div className="inputDiv col-12 my-2 mt-4">
                        <input type="number" id='otp' name='otp' onChange={handleChange} required />
                        <label htmlFor="otp">Otp</label>
                    </div>
                </div>
                <div>
                    {error ?
                        <button type='button' className='button  w-100 mt-2 error-div'>{error}</button>
                        :
                        <button type='submit' className='button button-color w-100 mt-2 '>Submit</button>
                    }
                </div>
            </form>
        </div>
    )
}

export default Otp