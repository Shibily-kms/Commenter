import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../../Redux/features/auth/authSlice'
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

function Dashboard() {
  const [cookies, setCookie, removeCookie] = useCookies(['commender'])
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.userAuth)


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const LogOut = () => {
    console.log('logOut');
    dispatch(logOut())
    removeCookie('commender', { path: '/' })

  }

  useEffect(() => {
    console.log(user,'hi user efect');
    if (!user) {
      navigate('/sign-in')
    }
  }, [])

  return (
    <div>
      <h1>Home Page</h1>
      <h4 className='bg-danger' onClick={()=> LogOut()}>LogOut</h4>

    </div>
  )
}

export default Dashboard