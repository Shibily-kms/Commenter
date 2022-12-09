import React from 'react'
import Layout from '../../components/admin/layout/Layout';
import Dashboard from '../../components/admin/dashboard/Dashboard';

function DashboardPage() {

  return (
    <div>
      <Layout columnTwo={<Dashboard />} />
    </div>
  )
}

export default DashboardPage