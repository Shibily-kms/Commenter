import React from 'react'
import Layout from '../../../components/user/layout/Layout'
import ColumnTwo from './ColumnTwo';
import ColumnThree from './ColumnThree';

function Dashboard() {

  return (
    <div>
      <Layout columnTwo={<ColumnTwo />} columnThree={<ColumnThree />} />
    </div>
  )
}

export default Dashboard