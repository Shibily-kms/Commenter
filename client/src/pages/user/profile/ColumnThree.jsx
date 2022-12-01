import React, { useEffect } from 'react'
import ProfileInfo from '../../../components/user/profileInfo/ProfileInfo'
import EditProfile from '../../../components/user/profileInfo/EditProfile'



function ColumnThree() {
  useEffect(()=>{
    console.log('working column three');
  },[])
  return (
    <div>
      <div className="profileColumnThree">
        <div>
          <ProfileInfo />
        </div>
       
       <div>
          <EditProfile classTitle={'isLarge'}/>
       </div>
      </div>
    </div>
  )
}

export default ColumnThree