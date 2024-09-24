import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../Help/AxiosInstance";


const ViewAcademy = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [state, setState] = useState([]);

  const handleDelete = async (academyId) => {
    try {
      await axiosInstance.delete(`/academies/delete/${academyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setState(prevState => prevState.filter(academy => academy.id !== academyId)); // Remove deleted academy from state
    } catch (error) {
      console.error("Error deleting academy:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(`/academies/getall`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setState(data.data);
      } catch (error) {
        console.error("Unable to get data from Academy:", error);
      }
    };
    fetchData();
  }, [token]); // Added token as dependency

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        Total Number of Academies: <span id="countNum">{state.length}</span>
      </h2>
      <div className="row">
        {state.map((academy) => (
          <div className="col-md-4" key={academy.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <p className="card-text" style={{color:"black"}} >Academy Name: {academy.academyName}</p>
                <p className="card-text" style={{color:"black"}}>Description: {academy.description}</p>
                <p className="card-text" style={{color:"black"}}>Phone: {academy.contact}</p>
                <p className="card-text" style={{color:"black"}}>Email ID: {academy.email}</p>
                <br /> <br /> <br /> <br />
                <div className="d-flex justify-content-between">
                  <Link to={`/admindashboard/viewacademy/updateAcademy/${academy.id}`} className="btn btn-primary">
                    Update
                  </Link>
                  <Link to={`/admindashboard/viewacademy/addBranch/${academy.id}`} className="btn btn-success">
                    Add Branch
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(academy.id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAcademy;
