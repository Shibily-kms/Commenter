import React, { useEffect } from 'react'
import ProfileInfo from '../../../components/user/profileInfo/ProfileInfo'
import EditProfile from '../../../components/user/profileInfo/EditProfile'
import { useSelector } from 'react-redux'



function ColumnThree({ profile }) {
  const { user } = useSelector((state) => state.userAuth)

  useEffect(() => {
  }, [])
  return (
    <div>
      <div className="profileColumnThree">
        <div>
          <ProfileInfo profile={profile} />
        </div>
        {profile?.urId === user?.urId ?
          <div>
            <EditProfile classTitle={'isLarge'} />
          </div>
          : ''}
      </div>
    </div>
  )
}

export default ColumnThree