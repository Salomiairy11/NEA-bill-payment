import React, { useState } from 'react'
import './Form.css'

const MonthlyBillForm = () => {
  const [formData, setFormData] = useState({
    billId: '',
    customerId: '',
    meterReadDate: '',
    meterReadYear: '',
    meterReadMonth: '',
    previousReading: '',
    currentReading: '',
    paymentDate: '',
    paymentAmount: '',
    paymentMethodId: '',
    rebateFineAmount: '',
    regularAmount: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className="form-container">
      <h2>Monthly Bill</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
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
        ))}
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default MonthlyBillForm
