import React, { useState } from 'react'
import './Form.css'

const UserDetailsForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userTypeId: '',
    fullName: '',
    status: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('User Details Submitted:', formData)
  }

  return (
    <div className="form-container">
      <h2>User Details</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <div className="form-group" key={field}>
            <label>{field.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default UserDetailsForm
