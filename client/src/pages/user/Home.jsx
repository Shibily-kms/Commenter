import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../../Redux/features/user/authSlice'
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import Layout from '../../components/user/layout/Layout'

function Dashboard() {
  const [cookies, setCookie, removeCookie] = useCookies(['commender'])
  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.userAuth)


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const LogOut = () => {
    dispatch(logOut())
    removeCookie('commender', { path: '/' })
  }

  useEffect(() => {
    if (!user) {
      navigate('/sign-in')
    }
  }, [])
  

  return (
    <div>
      <Layout columnTwo={'hi'} />
    </div>
  )
}

export default Dashboard