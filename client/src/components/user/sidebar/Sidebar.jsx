import React from 'react'
import './sidebar.scss'

import { HiHome } from "@react-icons/all-files/hi/HiHome";
import { FaUserFriends } from "@react-icons/all-files/fa/FaUserFriends";
import { RiMessage2Fill } from "@react-icons/all-files/ri/RiMessage2Fill";
import { IoNotificationsSharp } from "@react-icons/all-files/io5/IoNotificationsSharp";
import { AiFillSetting } from "@react-icons/all-files/ai/AiFillSetting";
import { RiLogoutCircleLine } from "@react-icons/all-files/ri/RiLogoutCircleLine";

import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../../../Redux/features/user/authSlice'
import { useCookies } from "react-cookie";

function Sidebar() {

    const [cookies, setCookie, removeCookie] = useCookies(['commenterAdmin'])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const LogOut = () => {
        removeCookie('commenter', { path: '/' })
        dispatch(logOut())
        navigate('/sign-in')
    }

    return (
        <div>
            <div className="user-sidebar-div">
                <div className="menu-div">
                    <div className="menu-items">
                        <NavLink to='/' end >
                            <div className="menu">
                                <HiHome />
                                <h5>Home</h5>
                                <div></div>
                            </div>
                        </NavLink>
                        <NavLink to='/friends' end >
                            <div className="menu">
                                <FaUserFriends />
                                <h5>Friends</h5>
                                <div></div>
                            </div>
                        </NavLink>
                        <NavLink to='/message' end >
                            <div className="menu">
                                <RiMessage2Fill />
                                <h5>Message</h5>
                                <div></div>
                            </div>
                        </NavLink>
                        <NavLink to='/notifications' end >
                            <div className="menu">
                                <IoNotificationsSharp />
                                <h5>Notifications</h5>
                                <div></div>
                            </div>
                        </NavLink>
                        <NavLink to='/settings' end >
                            <div className="menu">
                                <AiFillSetting />
                                <h5>Settings</h5>
                                <div></div>
                            </div>
                        </NavLink>

                        <div className='cursor-pointer' onClick={() => LogOut()}>
                            <div className="menu">
                                <RiLogoutCircleLine />
                                <h5>Log Out</h5>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar