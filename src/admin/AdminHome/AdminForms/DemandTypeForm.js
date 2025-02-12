import React, { useState } from 'react'
import './Form.css'

const DemandTypeForm = () => {
  const [formData, setFormData] = useState({
    value: '',
    rate: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      const response = await fetch(
        'http://localhost:8080/nea-project/addDemandType.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to submit demand type')
      }

      const result = await response.json()
      setMessage(result.message || 'Demand type added successfully!')
      setFormData({ value: '', rate: '' }) // Reset form fields
    } catch (error) {
      setMessage('Error submitting demand type. Please try again.')
      console.error('Error:', error)
    }
  }

  return (
    <div className="form-container">
      <h2>Add Demand Type</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="value">DEMAND TYPE</label>
          <input
            type="text"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rate">RATE (Per Month in Rs.)</label>
          <input
            type="number"
            id="rate"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Add Demand Type</button>
        </div>
      </form>
    </div>
  )
}

export default DemandTypeForm
