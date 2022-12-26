import React, { useEffect } from 'react'
import Layout from '../../components/admin/layout/Layout';
import Dashboard from '../../components/admin/dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/admin/user-list', {
      replace: true
    })
  }, [])
  return (
    <div>

    </div>
  )
}

export default DashboardPage