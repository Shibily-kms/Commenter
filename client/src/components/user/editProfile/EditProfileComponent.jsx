import React, { useState, useRef } from 'react'
import './editProfile.scss'
import Profile from '../../../assets/icons/profile.jpg'
import { useSelector, useDispatch } from 'react-redux';
import { editprofileValidation } from '../../../assets/js/user/form-validation'
import { editProfile, reset } from '../../../Redux/features/user/authSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react';
import axiosFile from '../../../config/axiosFile';
// Icon
import { TiCamera } from "@react-icons/all-files/ti/TiCamera";
import { RiLoader2Line } from '@react-icons/all-files/ri/RiLoader2Line'



function EditProfileComponent() {
  const dispatch = useDispatch();
  const inputRef = useRef(null)
  const [error, setError] = useState(null)
  const [showImg, setShowImg] = useState(null)
  const [image, setImage] = useState(null)
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.userAuth)
  const [form, setForm] = useState({
    firstName: null, lastName: null, emailId: null,
    dob: null, location: null, website: null
  })
  const [ready, setReady] = useState(false)

  const handleInput = (e) => {
    setError(null)
    if (e.target.name == 'profile') {
      if (e.target.files && e.target.files[0]) {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('upload_preset', 'commenter');
        formData.append('cloud_name', 'dayygqvpv')
        setShowImg(e.target.files[0])
        setImage(formData);
      }
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })

    }
  }
  const handleFileInput = (e) => {
    inputRef.current.click()
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let validation = editprofileValidation(form)
    if (validation.success) {
      if (image) {
        axiosFile.post('/image/upload', image).then((response) => {
          if (response) {
            setForm({
              ...form,
              file: response.data.secure_url
            })
            setReady(true)
          }
        }).catch((error) => {
          toast.error('Network down')
        })
      } else {
        dispatch(editProfile(form))
        dispatch(reset)
      }
    } else {
      setError(validation.message)
    }
  }
  useEffect(() => {
    if (ready) {
      dispatch(editProfile(form))
      setReady(false)
      dispatch(reset)
    }
  }, [ready])

  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(reset)
    }
    if (isSuccess) {
      toast.success(message)
      dispatch(reset)
    }

    setForm({
      ...form,
      firstName: user?.firstName,
      lastName: user?.lastName,
      emailId: user?.emailId,
      dob: user?.dob,
      location: user?.location,
      website: user?.website,
    })

  }, [user, isError, isSuccess])
  return (
    <div>
      <div className="editProfile">
        <div className="boader">
          <div className="top">
            <h5>Edit profile</h5>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data" >
            <div className="content">
              <div className="image-div">
                <div className="profile">
                  <div className='image'>
                    {showImg ?
                      <img src={URL.createObjectURL(showImg)} alt="" />
                      :
                      <>
                        {user?.profile ?
                          <img src={user.profile} alt="" />
                          :
                          <img src={Profile} alt="" />
                        }
                      </>
                    }
                    <input type="file" ref={inputRef} onChange={handleInput} hidden name='profile' accept="image/*" />
                  </div>
                  <div className="icon" onClick={handleFileInput}>
                    <TiCamera />
                  </div>
                </div>
              </div>
              <div className="formDiv">
                <div className='row'>
                  <div className="inputDiv col-6 my-2">
                    <input type="text" value={form?.firstName} id='firstName' onChange={handleInput} name='firstName' required />
                    <label htmlFor="firstName">First Name <span className='text-danger'>*</span></label>

                  </div>
                  <div className="inputDiv col-6 my-2">
                    <input type="text" value={form?.lastName} id='lastName' onChange={handleInput} required name='lastName' />
                    <label htmlFor="lastName">Last Name <span className='text-danger'>*</span></label>

                  </div>

                  <div className="inputDiv col-12 my-2">
                    <input type="email" value={form?.emailId} id='email' onChange={handleInput} required name='emailId' />
                    <label htmlFor="email">Email Address <span className='text-danger'>*</span></label>

                  </div>
                  <label className='singlelabel' htmlFor="dd">Date of Birth <span className='text-danger'>*</span></label>
                  <div className="inputDiv col-12 my-2">
                    <input type="date" value={form?.dob} required id='dd' name='dob' onChange={handleInput} />
                  </div>
                  <div className="inputDiv col-12 my-2">
                    <input type="text" value={form?.location} onChange={handleInput}
                      placeholder='Enter your location' id='location' name='location' />
                    <label htmlFor="location">Location</label>

                  </div>
                  <div className="inputDiv col-12 my-2">
                    <input type="text" value={form?.website} placeholder="Enter your domain"
                      onChange={handleInput} id='website' name='website' />
                    <label htmlFor="website">Website</label>

                  </div>


                  <div>
                    {error ?
                      <button type='button' className='error-div button w-100 mt-2 '>{error}</button>
                      : <button type='submit' className='button button-color w-100 mt-2 '> {isLoading ?
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
    </div >
  )
}

export default EditProfileComponent