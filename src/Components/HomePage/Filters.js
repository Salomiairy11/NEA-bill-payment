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
        <aside className="sidebar">
          <ul>
            <li onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
              My Profile
            </li>
            <li>My Previous Payments</li>
            <li>BY Bills</li>
            <ul>
              <li>Current Bill</li>
              <li>Pending Bills</li>
            </ul>
            <li>Support Center</li>
            <ul>
              <li>No Light Contact</li>
            </ul>
            <li>Logout</li>
            <li>
              <button onClick={handleFormsClick}>Go to Forms</button>
            </li>
          </ul>
        </aside>
  )
}
