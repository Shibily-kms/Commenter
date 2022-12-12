import React from 'react'
import Layout from '../../../components/user/layout/Layout'
import SettingsComponent from '../../../components/user/settings/SettingsComponent';

function Settings() {

  return (
    <div>
      <Layout columnTwo={<SettingsComponent />} />
    </div>
  )
}

export default Settings