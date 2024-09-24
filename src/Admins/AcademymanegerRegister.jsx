import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../Help/AxiosInstance";
import "react-toastify/dist/ReactToastify.css";
 // Assuming you still want custom styles

const AcademymanegerRegister = () => {
  let token = localStorage.getItem("token");

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
  });

  const { userName, email, password, dob, phone, gender } = data;

  const handleData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const payload = {
        userName,
        email,
        password,
        phone,
        dob,
        gender,
      };
      const finalData = await axiosInstance.post(
        "/academymanagers/save",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(finalData);
      toast.success("Successfully registered with email");
    } catch (error) {
      console.error(error);
      toast.error("Not able to register");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="">
          <form onSubmit={handleSubmit} className="border p-4 rounded bg-light shadow">
            <h2 className="text-center mb-4">Academy Manager Registration</h2>
            <div className="mb-3">
              <label htmlFor="proname" className="form-label">
                Username:
              </label>
              <input
                type="text"
                id="proname"
                name="userName"
                value={userName}
                onChange={handleData}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="proprice" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="proprice"
                name="email"
                value={email}
                onChange={handleData}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="propclr" className="form-label">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleData}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="proqty" className="form-label">
                Phone:
              </label>
              <input
                type="number"
                id="proqty"
                name="phone"
                value={phone}
                onChange={handleData}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">
                DOB:
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={dob}
                onChange={handleData}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender:</label><br />
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className=""
                  name="gender"
                  value="male"
                  id="radio1"
                  onChange={handleData}
                />
                <label className="form-check-label" htmlFor="radio1">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className=""
                  name="gender"
                  value="female"
                  id="radio2"
                  onChange={handleData}
                />
                <label className="form-check-label" htmlFor="radio2">Female</label>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="button" className="btn btn-secondary" onClick={() => setData({ userName: "", email: "", password: "", phone: "", dob: "", gender: "" })}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AcademymanegerRegister;
