import React, { useState } from 'react'
import './style.css'
import logo from '../assets/logo.png'

const Login = ({ onLogin, error }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usertype, setUsertype] = useState('user')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Client-side validation
    let valid = true
    const emailPattern = /.+@.+\..+/
    if (!emailPattern.test(email)) {
      setMessage('Enter a valid email address.')
      valid = false
    }

    if (password.length < 11) {
      setMessage('Password must be at least 11 characters long.')
      valid = false
    } else if (!/[a-z]/.test(password)) {
      setMessage('Password must contain at least one lowercase letter.')
      valid = false
    } else if (!/[A-Z]/.test(password)) {
      setMessage('Password must contain at least one uppercase letter.')
      valid = false
    } else if (!/\d/.test(password)) {
      setMessage('Password must contain at least one number.')
      valid = false
    }

    if (!valid) return

    // Call the login function passed via props
    onLogin(email, password, usertype)
  }

  return (
    <div className="container">
      <form id="loginForm" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <img src={logo} style={{ width: '260px' }} />
        {error && (
          <div id="message" className="error">
            {error}
          </div>
        )}

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="usertype">User Type</label>
          <select
            name="usertype"
            id="usertype"
            value={usertype}
            onChange={(e) => setUsertype(e.target.value)}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        <p>
          Don't have an account? <a href="/register">Register here</a>.
        </p>
      </div>
    </div>
  )
}

export default Login
