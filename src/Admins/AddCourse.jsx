import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from "../Help/AxiosInstance";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCourse = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const [data, setData] = useState({
    courseDurationInMonths: "",
    fee: "",
    image: "",
    type: "",
    Name: ""
  });

  const { courseDurationInMonths, fee, image, type, Name } = data;

  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        courseDurationInMonths,
        fee,
        image,
        type,
        Name
      };
      await axiosInstance.post(`/dancecourses/save?branchid=${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Successfully Added Course");
      navigate("/admindashboard/viewCourse");
    } catch (error) {
      toast.error("Server issues, please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Add Course</h2>
          <form onSubmit={handleSubmit} className="border p-4 shadow rounded">
            <div className="mb-3">
              <label htmlFor="courseDurationInMonths" className="form-label">Course Duration (Months):</label>
              <input 
                type="number" 
                className="form-control" 
                id="courseDurationInMonths" 
                name="courseDurationInMonths" 
                placeholder="Duration in months" 
                value={courseDurationInMonths} 
                onChange={handleData} 
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fee" className="form-label">Fee:</label>
              <input 
                type="number" 
                className="form-control" 
                id="fee" 
                name="fee" 
                placeholder="Enter fee" 
                value={fee} 
                onChange={handleData} 
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image Data:</label>
              <input 
                type="text" 
                className="form-control" 
                id="image" 
                name="image" 
                placeholder="Image URL or data" 
                value={image} 
                onChange={handleData} 
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">Course Type:</label>
              <input 
                type="text" 
                className="form-control" 
                id="type" 
                name="type" 
                placeholder="Enter course type" 
                value={type} 
                onChange={handleData} 
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">Name:</label>
              <input 
                type="text" 
                className="form-control" 
                id="Name" 
                name="Name" 
                placeholder="Course name" 
                value={Name} 
                onChange={handleData} 
                required
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/admindashboard/viewCourse")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
