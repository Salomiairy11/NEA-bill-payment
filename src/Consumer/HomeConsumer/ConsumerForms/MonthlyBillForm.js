import React, { useState } from 'react'
import '../../../admin/AdminHome/AdminForms/Form.css'
import './style.css'
import logo from '../../../assets/logo.jpg'

const MonthlyBillForm = () => {
  const [name, setName] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [meterReadDate, setMeterReadDate] = useState('')
  const [previousReading, setPreviousReading] = useState('')
  const [currentReading, setCurrentReading] = useState('')
  const [message, setMessage] = useState('')
  const [billData, setBillData] = useState(null)
  const [customerData, setCustomerData] = useState(null)
  const [formSubmitted, setFormSubmitted] = useState(false)

    const handleSubmit = async (e) => {
      e.preventDefault()

      if (!customerId || !meterReadDate || !previousReading || !currentReading) {
        setMessage('Please fill in all fields.')
        return
      }

      const data = {
        customer_id: customerId,
        meter_read_date: meterReadDate,
        previous_reading: parseFloat(previousReading),
        current_reading: parseFloat(currentReading),
      }

      try {
        const response = await fetch(
          'http://localhost:8080/nea-project/generate_bill.php',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          }
        )

        const result = await response.json()
        console.log('Response:', result)

        if (!result.success) {
          setMessage(result.message || 'Error generating bill.')
          return
        }

        setMessage(result.message)

        if (result.payableAmount !== undefined) {
          const billDetails = {
            customerId,
            meterReadDate,
            previousReading: parseInt(previousReading),
            currentReading: parseInt(currentReading),
            payableAmount: result.payableAmount,
            consumption: result.currentReading - result.previousReading,
            billDate: new Date().toLocaleDateString(),
          }

          console.log('hi')
          // Fetch customer details
          const customerResponse = await fetch(
            `http://localhost:8080/nea-project/get_bill.php?customer_id=${customerId}`,
            {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            }
          )
          console.log(customerResponse)
          const customerDetails = await customerResponse
          setCustomerData(customerDetails)
          setBillData(billDetails)
          setFormSubmitted(true)
        }
      } catch (error) {
        console.error('Error:', error)
        setMessage('Error connecting to the server.')
      }
    }

  const handleProceedToPay = () => {
    window.location.href = `http://localhost:8080/nea-project/my_bill.php?customer_id=${customerId}`
  }

  if (formSubmitted && billData && customerData) {
    return (
      <div className="bill-container form-container">
        <div className="bill-details">
          <img src={logo} alt="NEA Logo" />
          <h2>Bill for Customer ID: {customerId}</h2>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Meter Reading Date:</strong> {billData.meterReadDate}
          </p>
          <p>
            <strong>Previous Reading:</strong> {billData.previousReading}
          </p>
          <p>
            <strong>Current Reading:</strong> {billData.currentReading}
          </p>
          <p>
            <strong>Consumption:</strong> {billData.consumption} units
          </p>
          <p>
            <strong>Payable Amount:</strong> Rs. {billData.payableAmount}
          </p>
          <p>
            <strong>Bill Date:</strong> {billData.billDate}
          </p>

          <button
            onClick={handleProceedToPay}
            style={{
              padding: '10px',
              backgroundColor: 'rgb(91, 91, 255);',
              marginLeft: '40%'
            }}
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="form-container">
      <h2>Generate Bill</h2>
      {message && <div className="message">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Customer ID</label>
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Meter Reading Date</label>
          <input
            type="date"
            value={meterReadDate}
            onChange={(e) => setMeterReadDate(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Previous Reading</label>
          <input
            type="number"
            value={previousReading}
            onChange={(e) => setPreviousReading(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Current Reading</label>
          <input
            type="number"
            value={currentReading}
            onChange={(e) => setCurrentReading(e.target.value)}
            required
          />
        </div>

        <button type="submit">Generate Bill</button>
      </form>
    </div>
  )
}

export default MonthlyBillForm
