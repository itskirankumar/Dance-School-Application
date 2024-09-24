import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../Help/AxiosInstance';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ViewBranch = () => {

  let token=localStorage.getItem('token');
  console.log(token);
  let {id}=useParams()
  console.log(id);

  let handleDelete=async(x)=>{
     let result=await axiosInstance.delete(`/academies/delete/${x}`,{
     headers:{
    Authorization:`Bearer ${token}`,
  }
  })
  window.location.assign("/admindashboard/viewacademy")
  }


    let [state , setSate]=useState([])

    useEffect(()=>{
    let featchData=async()=>{
    try{
         let {data}=await axiosInstance.get(`/branches/getall`,{headers: {Authorization:`Bearer ${token}`}})
         let finalData=data.data
         console.log(finalData);
         setSate(finalData)
    }
    catch{
          console.log("Unable to get Data from Academy");
    }
  }
  featchData();
   },[])


  return (
    <>
    <h2 className='viewAcademyHed' style={{textAlign:'center', marginTop:'20px'}}>Total Number of Branches are : <span id="countNum">{state.length}</span></h2>
    <div className='ViewAcademy_main'>
      {state.map((x)=>{
        return(
          <div className="ViewAcademy_sub">
            <h3>ADDRESS : <span>{x.address}</span></h3>
            <h3>CITY : <span>{x.city}</span></h3>
            <h3>PHONE: <span>{x.phone}</span></h3>
            <h3>PINCODE: <span>{x.pincode}</span></h3>

            <button className="view_btn"> <Link className="view_btnL" to={`/admindashboard/viewbranch/updateBranch/${x.id}`}>Update</Link> </button>
            <button className="view_btn"> <Link className="view_btnL" to={`/admindashboard/viewbranch/addCourse/${x.id}`}>Add Course</Link></button>
            <button className="view_btn" onClick={()=>{ handleDelete(x.id) }}>DELETE</button>
          </div>
        )
      })}
    </div>
    </>
  )
}

export default ViewBranch
