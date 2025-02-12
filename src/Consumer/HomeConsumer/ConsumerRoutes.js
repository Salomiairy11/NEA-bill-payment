import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MonthlyBillForm from './ConsumerForms/MonthlyBillForm'
import DisplayNoLight from './DisplayNoLight'
import PaymentHistory from './ConsumerForms/PaymentHistory'
const ConsumerRoutes = () => {
  return (
    <Routes>
      <Route path="current-bill" element={<MonthlyBillForm />} />
      <Route path="pending-bill" element={<PaymentHistory/>}/>
      <Route path="no-light" element={<DisplayNoLight/>}/>
    </Routes>
  )
}

export default ConsumerRoutes
