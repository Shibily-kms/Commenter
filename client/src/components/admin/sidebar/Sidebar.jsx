import React from 'react'
import './sidebar.scss'
import Logo from '../../../assets/icons/newLogo.png'
import { RiDashboardFill } from "@react-icons/all-files/ri/RiDashboardFill";
import { FaUserFriends } from "@react-icons/all-files/fa/FaUserFriends";
import { RiLogoutCircleLine } from "@react-icons/all-files/ri/RiLogoutCircleLine";
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../../../Redux/features/adminAuth/adminAuthSlice'
import { useCookies } from "react-cookie";

function Sidebar() {

    const [cookies, setCookie, removeCookie] = useCookies(['commenderAdmin'])
    const dispatch = useDispatch()
    const LogOut = () => {
        removeCookie('commenderAdmin', { path: '/' })
        dispatch(logOut())
    }

    return (
        <div>
            <div className="sidebar-div">
                <div className="title-div">
                    <div className="image">
                        <img src={Logo} alt="" />
                    </div>
                    <div className="title">
                        <h4>Commenter</h4>
                    </div>
                </div>
                <hr />
                <div className="menu-div">
                    <div className="menu-items">
                        <NavLink to='/admin' className="">
                            <div className="menu">
                                <RiDashboardFill />
                                <h5>Dashboard</h5>
                                <div></div>
                            </div>
                        </NavLink>
                        <NavLink to='/admin/user-list' className="">
                            <div className="menu">
                                <FaUserFriends />
                                <h5>User list</h5>
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