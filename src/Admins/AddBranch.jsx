import React, { useState } from 'react';
import axiosInstance from "../Help/AxiosInstance";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import "../Components/Register.css"; // You can keep this for any custom styles

const AddBranch = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const [data, setData] = useState({
    address: "",
    city: "",
    phone: "",
    pincode: ""
  });

  const { address, city, phone, pincode } = data;

  const handleData = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const payload = {
        address,
        city,
        phone,
        pincode
      };
      console.log(payload);
      await axiosInstance.post(`/branches/save?aid=${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Successfully Added Branch");
      navigate("/admindashboard/viewbranch");
    } catch {
      toast.error("Server issues");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Add Branch</h2>
          <form onSubmit={handleSubmit} className="border p-4 shadow rounded">
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address:</label>
              <input type="text" className="form-control" id="address" name="address" placeholder="Address" value={address} onChange={handleData} />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City:</label>
              <input type="text" className="form-control" id="city" name="city" placeholder="City" value={city} onChange={handleData} />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone No:</label>
              <input type="text" className="form-control" id="phone" name="phone" placeholder="Phone No" value={phone} onChange={handleData} />
            </div>
            <div className="mb-3">
              <label htmlFor="pincode" className="form-label">Pincode:</label>
              <input type="text" className="form-control" id="pincode" name="pincode" placeholder="Pincode" value={pincode} onChange={handleData} />
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
}

export default AddBranch;
