import React, { useState, useEffect } from 'react'
import '../../../assets/ManageCustomers.css'
import '../../AdminHome/AdminForms/Form.css'

function ManageCustomers() {
  const [customers, setCustomers] = useState([])

  // Fetch customer and bill data
  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
        const response = await fetch(
          'http://localhost:8080/nea-project/getCustomersBills.php'
        )
        const data = await response.json();

        if (data.success) {
            setCustomers(data.customers); // Assuming 'data.customers' contains the full list of customers with their bills
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Error fetching customer data:', error);
    }
}

  // Handle marking bill as paid
  const markAsPaid = async (billId) => {
    try {
      const response = await fetch(
        'http://localhost:8080/nea-project/markAsPaid.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ billId }),
        }
      )

      const data = await response.json()
      if (data.success) {
        // Update the bill status in local state
        setCustomers(
          customers.map((customer) => ({
            ...customer,
            bills: customer.bills.map((bill) =>
              bill.id === billId ? { ...bill, status: 'Paid' } : bill
            ),
          }))
        )
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error('Error marking bill as paid:', error)
    }
  }

  return (
    <div className="manage-customers-container">
      <h1>Manage Customers</h1>
      <table border="1" cellPadding="10" className="manage-customers-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>SC No</th>
            <th>Demand Type</th>
            <th>Bill Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="form-container">
          {customers.map((customer) =>
            customer.bills.length > 0 ? (
              customer.bills.map((bill) => (
                <tr key={bill.id}>
                  <td>{customer.customer_id}</td>
                  <td>{customer.sc_no}</td>
                  <td>{customer.demandType || 'Not Available'}</td>{' '}
                  {/* FIXED LINE */}
                  <td>Rs. {bill.bill_amount}</td>
                  <td>{bill.status}</td>
                  <td>
                    {bill.status === 'Unpaid' && (
                      <button onClick={() => markAsPaid(bill.id)}>
                        Mark as Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr key={customer.customer_id}>
                <td>{customer.customer_id}</td>
                <td>{customer.sc_no}</td>
                <td>{customer.demandType || 'Not Available'}</td>{' '}
                {/* FIXED LINE */}
                <td colSpan="3" style={{ textAlign: 'center' }}>
                  No Bills Generated
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ManageCustomers
