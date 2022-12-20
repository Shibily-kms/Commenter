import React, { useState } from 'react'
import './changepassword.scss'
import { useSelector } from 'react-redux';
import { NewPasswordValidation } from '../../../assets/js/user/form-validation'
import { toast } from 'react-toastify'
import axios from '../../../config/axios';
// Icon
import { RiLoader2Line } from '@react-icons/all-files/ri/RiLoader2Line'
import { FaRegEye } from "@react-icons/all-files/fa/FaRegEye";
import { FaRegEyeSlash } from "@react-icons/all-files/fa/FaRegEyeSlash";


function ChangePasswordComp() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((state) => state.userAuth)
  const [form, setForm] = useState({
    current: null, password: null, confirm: null, urId: null
  })
  const [show, setShow] = useState('')

  const handleInput = (e) => {
    setError(null)
    setLoading(false)
    setForm({
      ...form,
      urId: user.urId,
      [e.target.name]: e.target.value
    })
  }
  const handlePasswordShow = () => {
    setShow((show) => !show)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    let validation = NewPasswordValidation(form)
    if (validation.success) {
      axios.put('/change-password', form, { withCredentials: true }).then(() => {
        setForm({ ...form, current: null, password: null, confirm: null })
        toast.success('Your password changed')
        setLoading(false)
      }).catch((error) => {
        setLoading(false)
        setError(error.response.data.message)
      })
    } else {
      setError(validation.message)
    }
  }


  return (
    <div>
      <div className="editProfile">
        <div className="boader">
          <div className="top">
            <h5>Change password</h5>
          </div>
          <form onSubmit={handleSubmit} >
            <div className="content">
              <div className="formDiv">
                <div className='row'>

                  <div className="inputDiv col-12 my-2">
                    <input type={show ? 'text' : 'password'} onChange={handleInput}
                      id='current' required name='current' value={form.current} />
                    <label htmlFor="current">Current Password</label>
                    <div className='show-icon' onClick={handlePasswordShow}>
                      {show ? <FaRegEyeSlash /> : <FaRegEye />}
                    </div>

                  </div>
                  <div className="inputDiv col-12 my-2">
                    <input type={show ? 'text' : 'password'} onChange={handleInput}
                      id='new' required name='password' value={form.password} />
                    <label htmlFor="new">New Password</label>
                    <div className='show-icon' onClick={handlePasswordShow}>
                      {show ? <FaRegEyeSlash /> : <FaRegEye />}
                    </div>

                  </div>
                  <div className="inputDiv col-12 my-2">
                    <input type={show ? 'text' : 'password'} onChange={handleInput}
                      id='confirm' required name='confirm' value={form.confirm} />
                    <label htmlFor="confirm">Confirm  Password</label>
                    <div className='show-icon' onClick={handlePasswordShow}>
                      {show ? <FaRegEyeSlash /> : <FaRegEye />}
                    </div>

                  </div>



                  <div>
                    {error ?
                      <button type='button' className='error-div button w-100 mt-2 '>{error}</button>
                      : <button type='submit' className='button button-color w-100 mt-2 '> {loading ?
                        <span className=''><RiLoader2Line className='button-loading-icon' /></span> : ''}
                        Submit</button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordComp