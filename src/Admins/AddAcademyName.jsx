import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../Help/AxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const AddAcademyName = () => {
  let navigate = useNavigate();
  let token = localStorage.getItem("token");
  let { id } = useParams();

  let [data, setData] = useState({
    academyName: "",
    description: "",
    contact: "",
    email: "",
  });

  let { academyName, description, contact, email } = data;

  let handleData = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        academyName,
        description,
        contact,
        email,
      };
      await axiosInstance.post(
        `/academies/saveacademy?managerId=${id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Successfully Added");
      navigate("/admindashboard/viewacademy");
    } catch (error) {
      console.error("Server issues", error);
      toast.error("Server issues");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Academy Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="academy_name" className="form-label">Academy Name:</label>
          <input
            type="text"
            className="form-control"
            id="academy_name"
            name="academyName"
            value={academyName}
            onChange={handleData}
            placeholder="Enter Academy Name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description_" className="form-label">Description:</label>
          <textarea
            className="form-control"
            id="description_"
            name="description"
            value={description}
            onChange={handleData}
            placeholder="Enter Description"
            rows="3"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email_" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email_"
            name="email"
            value={email}
            onChange={handleData}
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone_" className="form-label">Phone No:</label>
          <input
            type="tel"
            className="form-control"
            id="phone_"
            name="contact"
            value={contact}
            onChange={handleData}
            placeholder="Enter Phone No"
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/admindashboard/viewacademy")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddAcademyName;
