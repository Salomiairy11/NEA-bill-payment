import React from 'react'
import { Link } from 'react-router-dom'
import './FormsPage.css'

const FormsPage = () => {
  return (
    <div className="forms-page">
      <h2>All Forms</h2>
      <div className="form-list">
        <Link to="/forms/payment-method">
          <button>Payment Method Form</button>
        </Link>
        <Link to="/forms/customer-info">
          <button>Customer Info Form</button>
        </Link>
        <Link to="/forms/monthly-bill">
          <button>Monthly Bill Form</button>
        </Link>
        <Link to="/forms/branch-location">
          <button>Branch Location Form</button>
        </Link>
        <Link to="/forms/demand-type">
          <button>Demand Type Form</button>
        </Link>
        <Link to="/forms/rebate-fine-rate">
          <button>Rebate Fine Rate Form</button>
        </Link>
        <Link to="/forms/service-rate">
          <button>Service Rate Form</button>
        </Link>
        <Link to="/forms/user-type">
          <button>User Type Form</button>
        </Link>
        <Link to="/forms/user-details">
          <button>User Details Form</button>
        </Link>
        <Link to="/forms/payment-info">
          <button>Payment Info Form</button>
        </Link>
      </div>
    </div>
  )
}

export default FormsPage
