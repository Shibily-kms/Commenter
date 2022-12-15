import React from 'react'
import Layout from '../../../components/user/layout/Layout'
import EditProfileComponent from '../../../components/user/editProfile/EditProfileComponent'

function EditProfile() {
  return (
    <div>
      <Layout columnTwo={< EditProfileComponent/>} />
    </div>
  )
}

export default EditProfile;