import React, { useEffect, useState } from 'react'
import '../../assets/CustomerReports.css'
import logo from '../../assets/logo.jpg'

function CustomerReports() {
  const [reportData, setReportData] = useState({
    totalCustomers: 0,
    customersPaid: 0,
    customersPerBranch: [],
    customersPerDemandType: [],
  })

  useEffect(() => {
    fetchReportData()
  }, [])

  const fetchReportData = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/nea-project/getCustomerReports.php'
      )
      const data = await response.json()

      if (data.success) {
        setReportData(data)
      } else {
        console.error('Error fetching report data:', data.message)
      }
    } catch (error) {
      console.error('Error fetching report data:', error)
    }
  }

  return (
    <div className="customer-reports-container">
      <div style={{display:"flex"}}>
        <img src={logo} alt="NEA Logo" className="logoReport" />
        <h1>Customer Reports</h1>
      </div>
      <div className="report-cards-container">
        <div className="report-card">
          <h2>Total Customers</h2>
          <p>{reportData.totalCustomers}</p>
        </div>

        <div className="report-card">
          <h2>Customers Who Paid</h2>
          <p>{reportData.customersPaid}</p>
        </div>

        <div className="report-card">
          <h2>Customers Per Branch</h2>
          <ul>
            {reportData.customersPerBranch.map((branch, index) => (
              <li key={index}>
                {branch.branchName}: {branch.customerCount} customers
              </li>
            ))}
          </ul>
        </div>

        <div className="report-card">
          <h2>Customers Per Demand Type</h2>
          <ul>
            {reportData.customersPerDemandType.map((demand, index) => (
              <li key={index}>
                {demand.demandType}: {demand.customerCount} customers
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CustomerReports
