import React from 'react'
import "../Admins/AdminDashBoard.css"
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <>
    <div className='Admin-sidebar'>
    <div className="side_Bar_list">
 
      <ul >
        <br /><br />
        <h1 style={{textAlign:'center', marginTop:20}}>Admin Dashboard</h1> <br /> <br /> <br />
        
        <li> <Link className='side_bar_list'  to="/admindashboard/addAcademyManager" > Add Academy Manager</Link>  </li> <br /><br />
        <li> <Link className='side_bar_list'  to="/admindashboard/viewacademymanager" > View Academy Manager</Link>  </li> <br /><br />
        <li> <Link className='side_bar_list' to="/admindashboard/viewacademy" > View Academy </Link>  </li> <br /><br />
        <li> <Link className='side_bar_list' to="/admindashboard/viewbranch" > View Branch</Link>  </li> <br /><br />
        <li> <Link className='side_bar_list' to="/admindashboard/viewcourse" > View Course</Link>  </li> <br /><br />
        <li> <Link className='side_bar_list' to="/" > Home </Link>  </li> <br /><br />
      </ul>
   
   </div>
    </div>

    </>
  )
}

export default AdminSidebar
