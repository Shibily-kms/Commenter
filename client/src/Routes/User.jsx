import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from '../pages/user/Signup'
import Otp from '../pages/user/Otp'


function User() {
  return (
    <Routes>
      <Route element={<Signup/>} path='/sign-up' />
      <Route element={<Otp/>} path='/otp' />
      <Route element='' path='/sign-in' />
      <Route element='' path='/' />
    </Routes>
  )
}

export default User