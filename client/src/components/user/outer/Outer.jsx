import React from 'react'
import './outer.scss'
import CommenterIcon from '../../../assets/icons/newLogo.png'
import SignUpForm from '../SignUpForm/SignUpForm'
import Otp from '../otp/Otp'
import { useNavigate } from 'react-router-dom'
import SignInForm from '../signInForm/SignInForm'
import NewPassword from '../signInForm/NewPassword'


function Outer(props) {
    let navigate = useNavigate();
    return (
        <div>
            <div className="container-custom signPage">
                <div className='col-12 col-sm-11 col-md-8 col-lg-5'>
                    <div className="title-div">
                        <div >
                            <img src={CommenterIcon} onClick={() => { navigate('/') }} alt="Logo" />
                            <h2 onClick={() => { navigate('/') }}>Commenter</h2>
                        </div>
                    </div>
                    <div className="box mt-3" >
                        <div className="form-div">
                            
                            {props.singUp ? <SignUpForm /> : ''}
                            {props.singIn ? <SignInForm /> : ''}
                            {props.otp ? <Otp /> : ''}
                            {props.newpassword ? <NewPassword /> : ''}
                        </div>
                    </div>
                    <div className="footer">
                        {props.singUp ?
                            <button onClick={() => { navigate('/sign-in') }} className='out-line-button w-100 mt-3 '>Sign In</button>
                            : ""
                        }
                        {props.singIn ?
                            <button onClick={() => { navigate('/sign-up') }} className='out-line-button w-100 mt-3 '>Sign Up</button>
                            : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Outer