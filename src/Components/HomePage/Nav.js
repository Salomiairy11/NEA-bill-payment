import React from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate for navigation
import './HomePage.css'

export default function HomePage() {
  const navigate = useNavigate() // Initialize useNavigate

  // Function to handle navigation to the forms page
  const handleFormsClick = () => {
    navigate('/forms') // Change '/forms' to the actual path of your form page
  }

  // Function to handle navigation to the profile page
  const handleProfileClick = () => {
    navigate('/login') // Change '/profile' to the actual path of your profile component
  }

  return (
      <header className="header">
        <div className="logo">NEA Logo</div>
        <div className="title">
          <h1>Nepal Electricity Consumer Bill Management System</h1>
          <h2>Consumer Dashboard</h2>
        </div>
      </header>
  )
}
