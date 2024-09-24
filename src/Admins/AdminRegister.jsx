import React, { useState } from 'react';
import axiosInstance from "../Help/AxiosInstance";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import "../Components/Register.css"; // Custom CSS for additional styling

const Register = () => {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: ""
  });

  const { userName, email, password, dob, phone, gender } = data;

  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { userName, email, password, phone, dob, gender };
      const response = await axiosInstance.post("/admins/save", payload);
      console.log(response);
      toast.success("Successfully registered with email");
    } catch (error) {
      toast.error("Unable to register. Please try again.");
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="mb-4 text-center">Admins Register Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="userName">Username</label>
            <input type="text" className="form-control" id="userName" name="userName" value={userName} onChange={handleData} required />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" name="email" value={email} onChange={handleData} required />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={password} onChange={handleData} required />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="phone">Phone</label>
            <input type="number" className="form-control" id="phone" name="phone" value={phone} onChange={handleData} required />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" className="form-control" id="dob" name="dob" value={dob} onChange={handleData} required />
          </div>
          <div className="form-group mb-3">
            <label>Gender</label><br />
            <div className="form-check form-check-inline">
              <input type="radio" className="form-check-input" id="male" name="gender" value="male" onChange={handleData} />
              <label className="form-check-label" htmlFor="male">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" className="form-check-input" id="female" name="gender" value="female" onChange={handleData} />
              <label className="form-check-label" htmlFor="female">Female</label>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">Submit</button>
            <button type="button" className="btn btn-danger">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
