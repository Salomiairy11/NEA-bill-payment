import React from 'react'
import { Routes, Route } from 'react-router-dom'
import BranchLocationForm from './AdminForms/BranchLocationForm'
import DemandTypeForm from './AdminForms/DemandTypeForm'
import NoLightContactForm from './AdminForms/NoLightContactForm'
import ManageCustomers from './AdminForms/ManageCustomers'
import CustomerReports from './CustomerReports'


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="manage-branch" element={<BranchLocationForm />} />
      <Route path="manage-demandType" element={<DemandTypeForm />} />
      <Route path="no-light" element={<NoLightContactForm />} />
      <Route path="manage-bills" element={<ManageCustomers />} />
      <Route path="reports" element={<CustomerReports />} />
    </Routes>
  )
}

export default AdminRoutes
