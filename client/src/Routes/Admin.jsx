import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import SingIn from '../pages/admin/SingIn'
import Dashboard from '../pages/admin/DashboardPage'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAdminData, reset } from '../Redux/features/adminAuth/adminAuthSlice'

function Admin() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {admin} =  useSelector((state) => state.adminAuth)

  useEffect(() => {
    dispatch(getAdminData())
    dispatch(reset())
    if(!admin){
      navigate('/admin/sign-in')
    }
  }, [admin])

  return (
    <div>
      <Routes>
        <Route path='/sign-in' element={<SingIn />} />
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default Admin