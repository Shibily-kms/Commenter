import React, { useEffect } from 'react'
import { setTrue, setFalse } from '../../../Redux/features/sidebar/sidebarSlice'
import { useSelector, useDispatch } from 'react-redux'
import './header.scss'
import { HiMenu } from "@react-icons/all-files/hi/HiMenu";
import { IoNotificationsSharp } from "@react-icons/all-files/io5/IoNotificationsSharp";
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import Logo from '../../../assets/icons/newLogo.png'
import Profile from '../../../assets/icons/profile.jpg'
import NameCard from '../../../components/user/SmallNameCard/NameCard'
import { useState } from 'react';
import axios from '../../../config/axios'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { action } = useSelector((state) => state.sidebarToggle)
  const { user } = useSelector((state) => state.userAuth)
  const [cookies, setCookie] = useCookies(['commenter']);
  const [count, setCount] = useState(0)
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    if (!cookies.commenter) {
      navigate('/sign-in')
    }
    axios.get('/notifications/new-count', { withCredentials: true }).then((result) => {
      setCount(result.data.count)
    })
  }, [])

  const handleShadow = () => {
    setShow(false)
  }

  const handleInput = (e) => {
    setSearch(e.target.value)
  }

  const handleSearch = () => {
    axios.get('/search/user/' + search, { withCredentials: true }).then((result) => {
      setSearchResult(result.data.result)
      setShow(true)
    })
  }

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
          <img src={Logo} alt="" onClick={() => navigate('/')} />
          <h4 onClick={() => navigate('/')}>Commenter</h4>
        </div>
        <div className="  sction-two">
          {/* Search */}
          {show ?
            <div className="shadow" onClick={handleShadow}>   </div> : ''
          }
          <div className="searchDiv">
            <div className="search">
              <input className='d-none d-md-block' onChange={handleInput} type="text" required placeholder='Search commenter' />
              <div className="icon" onClick={handleSearch}>
                <FiSearch />
              </div>
            </div>
            {show ?
              <>

                <div className="searchResult">
                  <h5 className='title'>Search results</h5>
                  {searchResult[0] ? searchResult.map((value) => {
                    return <NameCard data={value} />
                  }) : <div className='no-result'>No Result</div>}
                </div>
              </>
              : ''
            }
          </div>
          {/* Notification */}
          {count ?
            <div className="round-icon" onClick={() => navigate('/notifications')}>
              <IoNotificationsSharp />
              <span>{count}</span>
            </div>
            : ''}

          {/* Profile */}
          <div className="profile-icon" style={{ cursor: 'pointer' }} onClick={() => navigate('/' + user.userName)}>
            {user?.profile ?
              <img src={user.profile} alt="" />
              :
              <img src={Profile} alt="" />
            }


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
