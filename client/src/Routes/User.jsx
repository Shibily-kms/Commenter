import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie';
import { getUserData, reset } from '../Redux/features/user/authSlice'
import Signup from '../pages/user/Signup'
import Otp from '../pages/user/Otp'
import SignIn from '../pages/user/SignIn'
import NewPasswod from '../pages/user/NewPasswod'
import Home from '../pages/user/home/Home'



function User() {
  const [cookies, setCookie] = useCookies(['commender']);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth)
  useEffect(() => {
    if (!user && cookies.commender) {
      dispatch(getUserData())
      dispatch(reset())
    }
  }, [])


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