import React, { useEffect, useState } from "react";
import axiosInstance from "../Help/AxiosInstance";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const ViewAcademyManager = () => {
  let token = localStorage.getItem("token");
  const [state, setState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get("/academymanagers/getall", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const finalData = data.data;
        console.log(finalData);
        setState(finalData);
      } catch (error) {
        console.log("Unable to fetch the data", error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="container mt-5">
      <h1
        className="text-center text-white mb-4"
        style={{ backgroundColor: "black" }}
      >
        {" "}
        Academy Managers
      </h1>
      <div className="row">
        {state.map((x) => (
          <div key={x.id} className="col-md-4">
            <div
              className="card h-100"
              style={{ backgroundColor: "#495057", color: "#ffffff" }}
            >
              <div className="card-body">
                <h5 className="card-text">
                  Username:{" "}
                  <span style={{ color: "#d1d1d1" }}>{x.userName}</span>
                </h5>
                <p className="card-text">
                  <strong>Email ID:</strong> <span>{x.email}</span>
                </p>
                <p className="card-text">
                  <strong>DOB:</strong> <span>{x.dob}</span>
                </p>
                <p className="card-text">
                  <strong>Phone No:</strong> <span>{x.phone}</span>
                </p>
                <p className="card-text">
                  <strong>Role:</strong> <span>{x.role}</span>
                </p>
                <p className="card-text">
                  <strong>Gender:</strong> <span>{x.gender}</span>
                </p>
                <br />
                <br />
                <br />
              </div>
              <div className="card-footer text-center">
                <Link
                  to={`/admindashboard/viewacademymanager/viewacademyEachManager/${x.id}`}
                >
                  <button className="btn btn-primary">View</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAcademyManager;
