import React, { useEffect, useState } from 'react'
import './notifi.scss';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { notifiDateFormatChange } from '../../../assets/js/user/post-helpers'
import axios from '../../../config/axios'

// Icons
import { FaUserPlus } from "@react-icons/all-files/fa/FaUserPlus";  //follow
import { AiFillLike } from "@react-icons/all-files/ai/AiFillLike";  //like
import { RiFileInfoFill } from "@react-icons/all-files/ri/RiFileInfoFill";  //report
import { FaUserLock } from "@react-icons/all-files/fa/FaUserLock";  //welcome

function Notifi(props) {
  const [notifi, setNotifi] = useState(null)
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.userAuth)
  const handleNotifi = () => {
    if (notifi.type === 'like') {
      navigate('/' + user.userName + '?postId=' + notifi.path)
    } else {
      navigate(notifi.path)
    }
    axios.post('/notifications/view', { urId: user.urId, msgId: notifi.msgId }, { withCredentials: true }).then(() => {
      setNotifi({
        ...notifi,
        status: true
      })
    })
  }
  useEffect(() => {
    setNotifi(props.data)
  }, [props])
  return (
    <div>
      {notifi ?

        <div className="notifi" onClick={handleNotifi}>
          <div className={notifi.status ? 'boader' : 'boader view'}>
            <div className="icon">
              <div className={notifi.type + ' round-icon'}>
                {notifi.type === 'welcome' ? <FaUserLock /> : ''}
                {notifi.type === 'follow' ? <FaUserPlus /> : ''}
                {notifi.type === 'like' ? <AiFillLike /> : ''}
                {notifi.type === 'report' ? <RiFileInfoFill /> : ''}
              </div>
            </div>
            <div className="text">
              <p>{notifi.text} </p>
            </div>
            <div className="time">
              <p>{notifiDateFormatChange(notifi.time)}</p>
            </div>
          </div>
        </div>
        : ''}
    </div>
  )
}

export default Notifi