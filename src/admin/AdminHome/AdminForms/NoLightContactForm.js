import React, { useState } from 'react'
import './Form.css'

const NoLightContactForm = () => {
  const [formData, setFormData] = useState({
    contactName: '',
    location: '',
    phone: '',
    remarks: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:8080/nea-project/addNoLightContact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message)
        setFormData({ contactName: '', location: '', phone: '', remarks: '' }) // Reset form
      })
      .catch((error) => console.error('Error:', error))
  }

  return (
    <div className="form-container">
      <h2>Add No Light Contact</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="form-group">
          <label className="block font-medium">Contact Name:</label>
          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div className="form-group">
          <label className="block font-medium">Location/Branch:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div className="form-group">
          <label className="block font-medium">Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded-md"
          />
        </div>

        <div className="form-group">
          <label className="block font-medium">Remarks (Optional):</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Contact
        </button>
      </form>
    </div>
  )
}

export default NoLightContactForm
