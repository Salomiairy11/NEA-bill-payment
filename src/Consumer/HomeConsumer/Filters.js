import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../assets/Filters.css'

const Filters = ({ onLogout }) => {
   const handleLogoutClick = () => {
     onLogout()
   }

  return (
    <div className="filters">
      <h4>MY BILLS</h4>
      <NavLink to="/consumer/current-bill">Current Bill</NavLink>
      <NavLink to="/consumer/pending-bill">My Previous Payments</NavLink>
      <h4>Support Center</h4>
      <NavLink to="/consumer/no-light">No Light Contact</NavLink>
      <NavLink to="/login" onClick={handleLogoutClick}>
        Logout
      </NavLink>
    </div>
  )
}

export default Filters
