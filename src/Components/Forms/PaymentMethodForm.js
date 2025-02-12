import React, { useState } from 'react'
import './Form.css'

const PaymentMethodForm = () => {
  const [formData, setFormData] = useState({
    paymentMethodId: '',
    paymentName: '',
    status: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Payment Method Submitted:', formData)
  }

  return (
    <div className="form-container">
      <h2>Payment Method</h2>
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

export default PaymentMethodForm
