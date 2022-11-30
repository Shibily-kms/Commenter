import React,{useEffect,useState} from 'react'
import './signupForm.scss'
import axios from '../../../config/axios'
import { signUpFormFunction } from '../../../assets/js/user/form-validation' 
import { useNavigate } from 'react-router-dom'
import { FaRegEye } from "@react-icons/all-files/fa/FaRegEye";
import { FaRegEyeSlash } from "@react-icons/all-files/fa/FaRegEyeSlash";
import { useCookies } from 'react-cookie'

function SignUpForm() {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['commenter']);
    // Get Form Input data
    const [form, setForm] = useState({
        firstName: null, lastName: null, userName: null, emailId: null, dob: null, password: null, cpassword: null, mobile: null
    })

    // Form Input error
    const [error, setError] = useState('')

    // handlePasswordShow
    const [show, setShow] = useState(false)

    const handlePasswordShow = () => {
        if (show) {
            setShow(false)
        } else {
            setShow(true)
        }
    }

    // Input Chnage Handler 
    const handleChange = (e) => {
        setError('')
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // Form Submit Handler
    const handleSumit = async (e) => {
        e.preventDefault()
        let validate = signUpFormFunction(form)
        if (validate.success) {
            // Checking form Data
            axios.post('/check-signup', form).then((response) => {
                if (response.data.success) {
                    // Send Otp to number
                    axios.post('/send-otp', { number: form.mobile }).then((result) => {
                        if (result.data.success) {
                            navigate('/otp', {
                                state: form
                            })
                        }
                    }).catch((error) => {
                        setError(error.response.data.message)
                    })

                }
            }).catch((error) => {
                setError(error.response.data.message)
            })
        } else {
            setError(validate.message)
        }
    }

    useEffect(() => {
        if (cookies.commenter) {
            navigate('/')
        }
    }, [])




    // Return
    return (
        <div>
            <form action="" onSubmit={handleSumit}>
                <div className='row'>
                    <div className="inputDiv col-6 my-2">
                        <input type="text" id='firstName' onChange={handleChange} name='firstName' required />
                        <label htmlFor="firstName">First Name</label>

                    </div>
                    <div className="inputDiv col-6 my-2">
                        <input type="text" id='lastName' onChange={handleChange} required name='lastName' />
                        <label htmlFor="lastName">Last Name</label>

                    </div>
                    <div className="inputDiv col-12 my-2">
                        <input type="text" id='userName' onChange={handleChange} required name='userName' />
                        <label htmlFor="userName">User name</label>
                    </div>
                    <div className="inputDiv col-12 my-2">
                        <input type="email" id='email' onChange={handleChange} required name='emailId' />
                        <label htmlFor="email">Email Address</label>

                    </div>
                    <label className='singlelabel' htmlFor="dd">Date of Birth</label>
                    <div className="inputDiv col-12 my-2">
                        <input type="date" required id='dd' onChange={handleChange} name='dob' />
                    </div>

                    <div className="inputDiv col-12 my-2">
                        <input type="number" id='mobile' onChange={handleChange} required name='mobile' />
                        <label htmlFor="mobile">Mobile number</label>
                    </div>
                    <div className="inputDiv col-6 my-2">
                        <input type={show ? 'text' : 'password'} id='password' onChange={handleChange} required name='password' />
                        <label htmlFor="password">Password</label>
                        <div className='show-icon' onClick={handlePasswordShow}>
                            {show ? <FaRegEyeSlash /> : <FaRegEye />}
                        </div>

                    </div>
                    <div className="inputDiv col-6 my-2">
                        <input type={show ? 'text' : 'password'} id='cpassword' onChange={handleChange} required name='cpassword' />
                        <label htmlFor="cpassword">Confirm Password</label>
                        <div className='show-icon' onClick={handlePasswordShow}>
                            {show ? <FaRegEyeSlash /> : <FaRegEye />}
                        </div>
                    </div>

                    <div>
                        {error ?
                            <button type='button' className='error-div button w-100 mt-2 '>{error}</button>
                            : <button type='submit' className='button button-color w-100 mt-2 '>Sign Up</button>
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm