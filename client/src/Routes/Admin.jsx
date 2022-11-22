import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SingIn from '../pages/admin/SingIn'

function Admin() {
  return (
    <div>
      <Routes>
        <Route path='/sign-in' element={<SingIn />} />
      </Routes>
    </div>
  )
}

export default Admin