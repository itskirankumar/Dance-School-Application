import React from 'react'
import "../Admins/AdminDashBoard.css"
import { Outlet } from 'react-router-dom'

const AdminMainbar = () => {
  return (
    <div className='Admin-mainbar'>
    
      <Outlet/>
    </div>
  )
}

export default AdminMainbar
