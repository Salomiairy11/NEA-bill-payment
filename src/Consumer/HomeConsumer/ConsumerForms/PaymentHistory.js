import React from 'react'
import { useState } from 'react'

const PaymentHistory = () => {
    const [customerId, setCustomerId] = useState('')
    const handleBills = (e) =>{
        e.preventDefault();
        window.location.href = `http://localhost:8080/nea-project/my_bill.php?customer_id=${customerId}`
    }
  return (
    <div>
      <div className="form-container">
        <form>
          <label>Customer ID</label>
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />
          <button type="submit" onClick={handleBills}>Previous Payments</button>
        </form>
      </div>
    </div>
  )
}

export default PaymentHistory