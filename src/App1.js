import React, { useState, useEffect } from 'react'
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Login from './FinalLogin/Login'
import Register from './FinalLogin/Register'
import Dashboard from './Consumer/HomeConsumer/Dashboard'
import AdminDashboard from './admin/AdminHome/AdminDashboard'
import Layout from './Layout'
import AdminLayout from './AdminLayout'
import AdminRoutes from './admin/AdminHome/AdminRoutes'
import ConsumerRoutes from './Consumer/HomeConsumer/ConsumerRoutes'

function App1() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState(null) // Track user type
  const [error, setError] = useState(null)

  
  const handleLogin = async (email, password, usertype) => {
    try {
      const response = await fetch(
        'http://localhost:8080/nea-project/login.php',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, usertype }),
        }
      )

      const data = await response.json()
      if (data.success) {
        setIsAuthenticated(true)
        setUserType(data.usertype) // Store user type
      } else {
        setError(data.message || 'Invalid credentials')
      }
    } catch (err) {
      setError('Something went wrong')
    }
  }

 const handleLogout = async () => {
   try {
     const response = await fetch(
       'http://localhost:8080/nea-project/logout.php',
       {
         method: 'GET',
         credentials: 'include', // Send cookies (session ID) with the request
       }
     )
     const data = await response.json()
     if (data.success) {
       setIsAuthenticated(false)
       setUserType(null)
     }
   } catch (err) {
     console.log('Error logging out:', err)
   }
 }

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              userType === 'admin' ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/consumer" />
              )
            ) : (
              <Login onLogin={handleLogin} error={error} />
            )
          }
        />

        <Route path="/register" element={<Register />} />

        {/* Consumer Dashboard */}
        <Route
          path="/consumer/"
          element={
            isAuthenticated && userType === 'user' ? (
              <Layout onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="*" element={<ConsumerRoutes />} />
          <Route index element={<Dashboard />} />
        </Route>

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            isAuthenticated && userType === 'admin' ? (
              <AdminLayout onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="*" element={<AdminRoutes />} />
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* Default Redirect */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              userType === 'admin' ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/consumer" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  )
}

export default App1
