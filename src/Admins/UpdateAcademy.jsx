import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../Help/AxiosInstance';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateAcademy = () => {
    let token = localStorage.getItem("token");
    let navigate = useNavigate();
    let { id } = useParams();
    
    let [data, setData] = useState({
        academyName: "",
        contact: "",
        description: "",
        email: ""
    });
    
    let { academyName, contact, description, email } = data;

    useEffect(() => {
        const fetchData = async () => {
            let { data } = await axiosInstance.get(`./academies/get/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(data.data);
        }
        fetchData();
    }, [id, token]);

    let handleChange = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;
        setData({ ...data, [name]: value });
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let payload = {
                academyName,
                contact,
                description,
                email,
                id
            };
            await axiosInstance.put(`/academies/update`, payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success(`Academy updated successfully`);
            navigate("/admindashboard/viewacademy");
        } catch (error) {
            console.error("Failed to update", error);
            toast.error("Failed to update academy");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Update Academy</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="academy_name" className="form-label">Academy Name:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="academy_name" 
                        name="academyName" 
                        value={academyName} 
                        onChange={handleChange} 
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
                        onChange={handleChange} 
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
                        onChange={handleChange} 
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
                        onChange={handleChange} 
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
}

export default UpdateAcademy;
