import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminMainbar from './AdminMainbar'
import "../Admins/AdminDashboard"

const AdminDashboard = () => {
  return (
    <div className='Admin-main'>

      <AdminSidebar/>
      <AdminMainbar/>
    </div>
  )
}

export default AdminDashboard
