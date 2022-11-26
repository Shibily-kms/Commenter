import React from 'react'
import { setTrue, setFalse } from '../../../Redux/features/sidebar/sidebarSlice'
import { useSelector, useDispatch } from 'react-redux'
import './header.scss'
import { HiMenu } from "@react-icons/all-files/hi/HiMenu";
import { IoNotificationsSharp } from "@react-icons/all-files/io5/IoNotificationsSharp";
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import Logo from '../../../assets/icons/newLogo.png'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { action } = useSelector((state) => state.sidebarToggle)
  const { admin } = useSelector((state) => state.adminAuth)
  const [cookies, setCookie] = useCookies(['commenderAdmin']);

  useEffect(() => {
    if (!cookies.commenderAdmin) {
      navigate('/admin/sign-in')
    }
  }, [])

  const handleSidebar = () => {
    if (action) {
      dispatch(setFalse())
    } else {
      dispatch(setTrue())
    }
  }

  return (
    <>
      <div className=' user-header'>
        <div className=" sction-one">
          <img src={Logo} alt="" onClick={()=>navigate('/')} />
          <h4  onClick={()=>navigate('/')}>Commenter</h4>
        </div>
        <div className="  sction-two">
          {/* Search */}
          <div className="search">
            <FiSearch />
            <input type="text" placeholder='Search commenter' />
          </div>
          {/* Notification */}
          <div className="round-icon">
            <IoNotificationsSharp />
            <span>21</span>
          </div>

          {/* Profile */}
          <div className="round-icon">
            <IoNotificationsSharp />
            <span>21</span>
          </div>


          {/* Menu Icon */}
          <OverlayTrigger
            placement='bottom'
            overlay={
              <Tooltip id='tooltip-bottom' >
                menu
              </Tooltip>
            }
          >
            <div className="round-icon menu-icon" onClick={handleSidebar}>
              <HiMenu />
            </div>
          </OverlayTrigger>

        </div>
      </div>
    </>
  )
}
export default Header
