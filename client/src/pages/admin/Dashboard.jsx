import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../../Redux/features/adminAuth/adminAuthSlice'
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

function Dashboard() {
  const [cookies, setCookie, removeCookie] = useCookies(['commenderAdmin'])
  const { admin, isLoading, isSuccess, isError, message } = useSelector((state) => state.adminAuth)


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const LogOut = () => {
  
    removeCookie('commenderAdmin', { path: '/' })
    dispatch(logOut())

  }

  useEffect(() => {
    if (!admin) {
     
      navigate('/admin/sign-in')
    }
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <h4 className='bg-danger' onClick={()=> LogOut() }>LogOut</h4>

    </div>
  )
}

export default Dashboard