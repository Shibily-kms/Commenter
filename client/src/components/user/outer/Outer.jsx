import React from 'react'
import './outer.scss'
import CommenterIcon from '../../../assets/icons/newLogo.png'
import SignUpForm from '../SignUpForm/SignUpForm'
import Otp from '../otp/Otp'
import { useNavigate } from 'react-router-dom'


function Outer(props) {
    let navigate = useNavigate();
    return (
        <div>
            <div className="container-custom signPage">
                <div className='col-12 col-sm-11 col-md-8 col-lg-5'>
                    <div className="title-div">
                        <div onClick={() => { navigate('/') }}>
                            <img src={CommenterIcon} alt="Logo" />
                            <h2>Commenter</h2>
                        </div>
                    </div>
                    <div className="box mt-3" >
                        <div className="form-div">
                            {props.singUp ? <SignUpForm /> : ''}
                            {props.otp ? <Otp /> : ''}
                        </div>
                    </div>
                    <div className="footer">
                        {props.singUp ?
                            <button onClick={() => { navigate('/sign-in') }} className='out-line-button w-100 mt-3 '>Login</button>
                            : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Outer