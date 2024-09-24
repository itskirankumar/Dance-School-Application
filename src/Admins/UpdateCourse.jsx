import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../Help/AxiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateCourse = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    courseDurationInMonths: "",
    fee: "",
    image: "",
    type: "",
    Name: ""
  });

  const { courseDurationInMonths, fee, image, type, Name } = data;

  // Fetch course data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(`/dancecourses/get/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(data.data);
      } catch (error) {
        toast.error("Failed to fetch course details.");
      }
    };
    fetchData();
  }, [id, token]);

  // Handle input changes
  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Handle form submission to update course
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { courseDurationInMonths, fee, image, type, Name };
      await axiosInstance.put(`/dancecourses/update/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Course updated successfully");
      navigate("/admindashboard/viewcourse");
    } catch (error) {
      toast.error("Failed to update course.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Update Course</h2>
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
              <button type="submit" className="btn btn-primary">Update</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate("/admindashboard/viewcourse")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateCourse;
