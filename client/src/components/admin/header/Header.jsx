import React from 'react'
import { setTrue, setFalse } from '../../../Redux/features/sidebar/sidebarSlice'
import { useSelector, useDispatch } from 'react-redux'
import './header.scss'
import { HiMenu } from "@react-icons/all-files/hi/HiMenu";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


function Header() {
  const dispatch = useDispatch()
  const { action } = useSelector((state) => state.sidebarToggle)

  const handleSidebar = () => {
    if (action) {
      dispatch(setFalse())
    } else {
      dispatch(setTrue())
    }
  }

  return (
    <>
      <div className=' admin-header'>
        <div className=" sction-one">
          <h4>Admin Panel</h4>
        </div>
        <div className="  sction-two">
          <OverlayTrigger
            placement='bottom'
            overlay={
              <Tooltip id='tooltip-bottom' >
                menu
              </Tooltip>
            }
          >
            <div className="round-icon" onClick={handleSidebar}>
              <HiMenu />
            </div>
          </OverlayTrigger>
        </div>
      </div>
    </>
  )
}
export default Header
