import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie';
import { getUserData, reset } from '../Redux/features/user/authSlice'
import Signup from '../pages/user/Signup'
import Otp from '../pages/user/Otp'
import SignIn from '../pages/user/SignIn'
import NewPasswod from '../pages/user/NewPasswod'
import Home from '../pages/user/home/Home'
import Profile from '../pages/user/profile/Profile'
import SavePost from '../pages/user/savePost/SavePost';
import Friends from '../pages/user/friends/Friends'
import EditProfile from '../pages/user/settings/EditProfile';
import Settings from '../pages/user/settings/Settings'
import ChangePassword from '../pages/user/settings/ChangePassword';
import MessagePage from '../pages/user/message/MessagePage';



function User() {
  const [cookies, setCookie, removeCookie] = useCookies(['commenter']);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user, isError } = useSelector((state) => state.userAuth)
  useEffect(() => {
    console.log('hi user useEffect')
    if (!user && cookies.commenter) {
      console.log(1);
      dispatch(getUserData())
      dispatch(reset())
    }

    if (isError) {
      
    }
  }, [isError])


  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-up' element={<Signup />} />
      <Route path='/otp' element={<Otp />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/new-password' element={<NewPasswod />} />
      <Route path='/:profile' element={<Profile />} />
      <Route path="/save-posts" element={<SavePost />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/settings" element={<Settings />} />
      <Route path='/settings/edit-profile' element={<EditProfile />} />
      <Route path='/settings/change-password' element={<ChangePassword />} />
      <Route path='/message' element={<MessagePage />} />
    </Routes>
  )
}

export default User