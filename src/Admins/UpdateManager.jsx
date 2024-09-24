import React, { useEffect } from "react";
import "../Components/Register.css";
import { useState } from "react";
import axiosInstance from "../Help/AxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateManager = () => {

  let token = localStorage.getItem("token");
  let navigate = useNavigate();
  let { id } = useParams();

  let [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
  });

  let { userName, email, password, dob, phone, gender } = data;

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        userName,
        email,
        password,
        dob,
        phone,
        gender,
        id
      };
      let finalData = await axiosInstance.put(`/academymanagers/update`,payload,{
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(finalData);
      
      toast.success(` Updated successfully`);
      navigate("/admindashboard/viewacademymanager");
    } catch {
      console("Failed to update");
    }
  };

  useEffect(() => {
    let fetchData = async () => {
        let { data } = await axiosInstance.get(`./academymanagers/get/${id}`,
          { headers: { Authorization: `Bearer ${token}` } });
        console.log(data)
        setData(data.data)
    }
    fetchData();
  }, []);


  let handleChange=(e)=>{
    e.preventDefault()
    let name=e.target.name
    let value=e.target.value
    setData({...data,[name]:value})
  }
  return (
    <>
      <div className="Main">
        <form action="" onSubmit={handleSubmit}>
          <div className="Sub">
            <h2>UPDATE REGISTER FORM </h2> <br />
            <label htmlFor="proname">Username :</label>
            <input type="text" id="proname" name="userName" value={userName} onChange={handleChange}/>{" "}<br /> <br />
            <label htmlFor="proprice">Email :</label>
            <input type="email" id="proprice" name="email" value={email} onChange={handleChange}/>{" "}  <br /> <br />
            <label htmlFor="propclr">Password :</label>
            <input  type="password"   name="password"   value={password} onChange={handleChange} /> <br /> <br />
            <label htmlFor="proqty">Phone :</label>
            <input type="number" id="proqty" name="phone" value={phone} onChange={handleChange}/>{" "}
            <br /> <br />
            <label htmlFor="dob">DOB :</label>
            <input type="date" id="dob" name="dob" value={dob} onChange={handleChange}/> <br /> <br />
            <label htmlFor="">Gender :</label>
            <input  type="radio"  className="rbtn"  name="gender"  value="male" id="radio1"onChange={handleChange}/>
            <label htmlFor="radio1">Male</label>
            <input type="radio" className="rbtn"  name="gender"  value="female"  id="radio2" onChange={handleChange} />
            <label htmlFor="radio2">Female</label>  <br /> <br />
            <button id="btn1">Submit</button>
            <button className="btn">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateManager;
