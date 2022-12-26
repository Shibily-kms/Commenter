import React, { useState } from 'react'
import { useEffect } from 'react'
import NameCard from '../../../components/user/SmallNameCard/NameCard'
import './style.scss'
import axios from '../../../config/axios'
import NullPost from '../../../components/other/nullPost/Nulldefault'
import { FaUserFriends } from "@react-icons/all-files/fa/FaUserFriends";

function ColumnTwo() {
  const [active, setActive] = useState('section-one')
  const [result, setResult] = useState([])
  const [action, setAction] = useState(false)

  const handleShow = (value) => {
    if (value) {
      setAction(true)
      setActive('section-two')
    } else {
      setAction(false)
      setActive('section-one')
    }
  }

  useEffect(() => {
    if (action) {
      axios.get('/followers', { withCredentials: true }).then((result) => {
        setResult(result.data.followers)
      })
    } else {
      axios.get('/following', { withCredentials: true }).then((result) => {
        setResult(result.data.following)
      })
    }
  }, [action])
  // 
  return (
    <div>
      <div className="friends">
        <div className="boader">
          <div className="top">
            <div className={active === 'section-one' ? 'section-one active' : 'section-one'}
              onClick={() => { handleShow(false) }}>
              <h5>Following</h5>
            </div>
            <div className={active === 'section-two' ? 'section-two active' : 'section-two'}
              onClick={() => { handleShow(true) }}>
              <h5>Followers</h5>
            </div>
          </div>
          <div className="content">
            {result[0] ?
              <>
                {result.map((user) => {
                  return <NameCard data={user} />
                })}
              </>
              : <NullPost icon={<FaUserFriends/>} header='Start Following' />
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default ColumnTwo