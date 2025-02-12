import React from 'react'
import Nav from './Nav.js'
import Filters from './Filters.js'
import { Outlet } from 'react-router-dom'
import './HomePage.css'

export default function HomePage() {
  return (
    <div>
      <Nav />
      <div className="layout-container">
        <div className="filters-container">
          <Filters />
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
