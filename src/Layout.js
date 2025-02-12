import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './Consumer/HomeConsumer/NavBar'
import Filters from './Consumer/HomeConsumer/Filters'
import './assets/Layout.css' // Add styling if needed

const Layout = () => {
  return (
    <div className="layout">
      <NavBar />
      <div className="main-container" style={{ marginTop: '100px' }}>
        <Filters />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
