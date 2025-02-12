import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavBar from './admin/AdminHome/AdminNavBar'
import AdminFilters from './admin/AdminHome/AdminFilters'
import './assets/Layout.css' // Add styling if needed

const AdminLayout = () => {
  return (
    <div className="layout">
      <AdminNavBar />
      <div className="main-container" style={{ marginTop: '100px' }}>
        <AdminFilters />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
