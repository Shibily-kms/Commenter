import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from '../pages/user/Signup'
import Otp from '../pages/user/Otp'
import SignIn from '../pages/user/SignIn'
import NewPasswod from '../pages/user/NewPasswod'

function User() {
  return (
    <Routes>
      <Route element={<Signup />} path='/sign-up' />
      <Route element={<Otp />} path='/otp' />
      <Route element={<SignIn />} path='/sign-in' />
      <Route element={<NewPasswod />} path='/new-password' />
    </Routes>
  )
}

export default User