import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../assets/Filters.css'

const AdminFilters = ({ onLogout }) => {
  const handleLogoutClick = () => {
    // Call the onLogout function passed from App1.js
    onLogout()
  }

  return (
    <div className="filters">
      <NavLink to="/admin/manage-branch">Manage Branch</NavLink>
      <NavLink to="/admin/manage-demandType">Manage Demand Type</NavLink>
      <NavLink to="/admin/manage-bills">Manage Customers</NavLink>
      <NavLink to="/admin/reports">Reports</NavLink>
      <h4>Support Center</h4>
      <NavLink to="/admin/no-light">No Light Contact</NavLink>
      {/* Handle logout */}
      <NavLink to="/login" onClick={handleLogoutClick}>
        Logout
      </NavLink>
    </div>
  )
}

export default AdminFilters
