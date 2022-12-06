import React from 'react'
import Layout from '../../../components/user/layout/Layout'
import ColumnTwo from './ColumnTwo';


function Friends() {
  return (
    <div>
       <Layout columnTwo={<ColumnTwo />}  />
    </div>
  )
}

export default Friends