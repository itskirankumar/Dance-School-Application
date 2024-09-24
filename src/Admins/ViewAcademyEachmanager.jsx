import React, { useEffect, useState } from 'react'
import axiosInstance from '../Help/AxiosInstance'
import "../Admins/Admins.css"
import { Link, useNavigate, useParams } from 'react-router-dom'

const ViewAcademyEachmanager = () => {

    let navigate=useNavigate()

    let {id}=useParams()
  let token=localStorage.getItem('token');
  let [state, setState]=useState([])


  let handleDelete= async(id)=>{
    console.log("Deleted" ,id);
    await axiosInstance.delete(`/academymanagers/delete/${id}`,
    {headers:{Authorization:`Bearer ${token}`}});
    navigate("/admindashboard/viewacademymanager")
  }

  useEffect(()=>{
    let fetchData=async()=>{
      try{
        let{data}=await axiosInstance.get(`/academymanagers/get/${id}`,
        {headers:{Authorization:`Bearer ${token}`}})
        let finalData=data.data
        console.log(finalData);
        setState(finalData)
      }
      catch{
    console.log("unacble to connect")
      }
    }
    fetchData();
  },[])


  return (
    <div  className='card-box-each-main' >
        {
                <>
              <div className="card-box-each-sub">
            <ul>
                <h3>ROLE :<span>{state.role}</span></h3>
                <h3>BOB :<span>{state.dob}</span></h3>
                <h3>PHONE :<span>{state.phone}</span></h3>
                <h3>EMAIL : <span>{state.email}</span></h3>
                <h3>GENDER :<span>{state.gender}</span></h3>
            </ul>
             
              
              <button className='update-btn'> <Link className='Lupdate-btn'   to={`/admindashboard/viewacademymanager/updateManager/${state.id}`}>Update</Link> </button>
              <button className='view-btn' > <Link className='Lview-btn'  to={`/admindashboard/viewacademymanager/addAcademyName/${state.id}`}>Add Academy </Link> </button>
              <button className='delete-btn' onClick={()=>handleDelete(state.id)}>Delete</button>
              </div>
              </>
        
        
        }
    </div>
  )
}

export default ViewAcademyEachmanager
