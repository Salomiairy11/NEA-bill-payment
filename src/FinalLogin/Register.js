import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import logo from '../assets/logo.png'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usertype, setUsertype] = useState('user')
  const [employeeCode, setEmployeeCode] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [branchName, setBranchName] = useState('')
  const [branches, setBranches] = useState([])
  const [demandType, setDemandType] = useState('')
  const [demandTypes, setDemandTypes] = useState([]) // Fetch from DB
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:8080/nea-project/get-branches.php')
      .then((response) => response.json())
      .then((data) => setBranches(data))
      .catch((error) => {
        setMessage('Error fetching branches.')
        console.error('Error fetching branches:', error)
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:8080/nea-project/get-Demand-Types.php') // Fetch demand types
      .then((response) => response.json())
      .then((data) => setDemandTypes(data))
      .catch((error) => {
        setMessage('Error fetching demand types.')
        console.error('Error fetching demand types:', error)
      })
  }, [])

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
    if (usertype === 'user' && phoneNo.length !== 10) {
      setMessage('Phone number must be 10 digits long.')
      valid = false
    }

    if (!valid) return

    // AJAX request to PHP backend
    const data = {
      email,
      password,
      usertype,
      employee_code: employeeCode,
      address,
      phoneNo,
      branchName,
      demandType,
    }
    fetch('http://localhost:8080/nea-project/register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message || alert('User registered successfully!'))
        navigate('/login')
        if (data.success) {
          setTimeout(() => {
            navigate('/login')
          }, 1000)
        }
      })
      .catch((error) => {
        setMessage('Error with the registration request.')
        alert(error);
        console.error('Error:', error)
      })
  }

  return (
    <div className="container">
      <form id="registerForm" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <img src={logo} style={{ width: '260px' }} />
        {message && <div className="error">{message}</div>}

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>User Type</label>
          <select
            value={usertype}
            onChange={(e) => setUsertype(e.target.value)}
            required
          >
            <option value="user">User</option>
          </select>
        </div>
        <>
          <div className="input-group">
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              maxLength="10"
              required
            />
          </div>

          <div className="input-group">
            <label>Select Demand Type (Rate per Month)</label>
            <select
              value={demandType}
              onChange={(e) => setDemandType(e.target.value)}
              required
            >
              <option value="">Select Demand Type</option>
              {demandTypes.map((demand) => (
                <option key={demand.id} value={demand.value}>
                  {demand.value} - Rs. {demand.rate} per month
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Branch</label>
            <select
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              required
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.branchId} value={branch.branchName}>
                  {branch.branchName}
                </option>
              ))}
            </select>
          </div>
        </>
        <button type="submit">Register</button>
      </form>

      <div className="register-link">
        <p>
          Already have an account? <a href="/login">Login here</a>.
        </p>
      </div>
    </div>
  )
}

export default Register
