import React from 'react'
import '../../assets/NavBar.css'
import logo from '../../assets/logo.jpg'


const NavBar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="NEA Logo" className="logo" />
      <h2>Nepal Electricity Consumer Bill Management System</h2>
      <h3 className="nav-title">  (Consumer Dashboard) </h3>
    </nav>
  )
}

export default NavBar
