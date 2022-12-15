import React from 'react'
import Layout from '../../../components/user/layout/Layout'
import ChangePasswordComp from '../../../components/user/changePassword/ChangePasswordComp'

function ChangePassword() {
  return (
    <div>
         <Layout columnTwo={< ChangePasswordComp/>} />
    </div>
  )
}

export default ChangePassword