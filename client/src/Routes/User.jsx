import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from '../pages/user/Signup'
import Otp from '../pages/user/Otp'
import SignIn from '../pages/user/SignIn'
import NewPasswod from '../pages/user/NewPasswod'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserData, reset } from '../Redux/features/user/authSlice'
import Home from '../pages/user/Home'
import { useCookies } from 'react-cookie';



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