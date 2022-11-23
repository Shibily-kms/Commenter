import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from '../pages/user/Signup'
import Otp from '../pages/user/Otp'
import SignIn from '../pages/user/SignIn'
import NewPasswod from '../pages/user/NewPasswod'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserData, reset } from '../Redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Home from '../pages/user/Home'

function User() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth)
  const userId = user ?  user.urId  : null
  useEffect(() => {
    dispatch(getUserData())
    dispatch(reset())
    console.log(user,'useeffect IN user page');
    if (!userId) {
      navigate('/sign-in')
    }
  }, [userId])
  return (
    <Routes>
      <Route path='/sign-up' element={<Signup />} />
      <Route path='/otp' element={<Otp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/new-password' element={<NewPasswod />} />
      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default User