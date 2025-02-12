import React, { useState } from 'react'
import './Form.css'

const BranchLocationForm = () => {
  const [formData, setFormData] = useState({
    branchId: '',
    branchName: '',
    address: '',
    status: false, // Status field added to state
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value, // Handle checkbox separately
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent page refresh on form submission

    try {
      const response = await fetch(
        'http://localhost:8080/nea-project/add-branch.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // Send JSON data
        }
      )

      if (!response.ok) {
        // Check if the response is not successful
        throw new Error('Network response was not ok')
      }

      const data = await response.json() // Parse response as JSON
      if (data.success) {
        alert('Branch added successfully!')
        // Optionally, clear the form
        setFormData({
          branchId: '',
          branchName: '',
          address: '',
          status: false,
        })
      } else {
        alert('Error: ' + data.message)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to submit form. Try again.')
    }
  }

  return (
    <div className="form-container">
      <h2>Branch Location</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map(
          (field) =>
            field !== 'status' && ( // Skip checkbox here
              <div className="form-group" key={field}>
                <label>{field.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            )
        )}
        <div className="form-group">
          <label htmlFor="status">STATUS</label>
          <div className="status-group">
            <label htmlFor="status">Active</label>
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <button type="submit">Add Branch</button>
        </div>
      </form>
    </div>
  )
}

export default BranchLocationForm
