import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../Help/AxiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBranch = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [data, setData] = useState({
    address: "",
    city: "",
    phone: "",
    pincode: ""
  });
  
  const { address, city, phone, pincode } = data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/branches/get/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(response.data.data);  // Assuming data is nested inside 'data'
      } catch (error) {
        toast.error("Error fetching branch details.");
      }
    };
    fetchData();
  }, [id, token]);

  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        address,
        city,
        phone,
        pincode
      };
      await axiosInstance.put(`/branches/update/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Branch updated successfully");
      navigate("/admindashboard/viewbranch");
    } catch {
      toast.error("Failed to update the branch");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Update Branch</h2>
          <form onSubmit={handleSubmit} className="border p-4 shadow rounded">
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address:</label>
              <input 
                type="text" 
                className="form-control" 
                id="address" 
                name="address" 
                placeholder="Enter address" 
                value={address} 
                onChange={handleData} 
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City:</label>
              <input 
                type="text" 
                className="form-control" 
                id="city" 
                name="city" 
                placeholder="Enter city" 
                value={city} 
                onChange={handleData} 
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone No:</label>
              <input 
                type="text" 
                className="form-control" 
                id="phone" 
                name="phone" 
                placeholder="Enter phone number" 
                value={phone} 
                onChange={handleData} 
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pincode" className="form-label">Pincode:</label>
              <input 
                type="text" 
                className="form-control" 
                id="pincode" 
                name="pincode" 
                placeholder="Enter pincode" 
                value={pincode} 
                onChange={handleData} 
                required 
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/admindashboard/viewbranch")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBranch;
