import React, { useState, useTransition } from 'react'
import { useEffect } from 'react'
import NameCard from '../../../components/user/SmallNameCard/NameCard'
import './style.scss'
import axios from '../../../config/axios'
import Spinner from '../../../components/Spinner'

function ColumnThree() {
  const [suggest, setSuggest] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
  
    setLoading(true)
    axios.get('/friends-suggestions/10', { withCredentials: true }).then((result) => {
    
      setLoading(false)
      setSuggest(result.data.users)
    })
  }, [])
  return (
    <div>
      <div className="PeopleYouMayKnow">
        <h4>People you may know</h4>
        {loading ?
          <>
            <Spinner />
          </>
          :
          <>
            {suggest ?
              <>
                {suggest.map((user) => {
                  return <NameCard data={user} />
                })}
              </>
              : ""
            }
          </>
        }
      </div>
    </div>
  )
}

export default ColumnThree