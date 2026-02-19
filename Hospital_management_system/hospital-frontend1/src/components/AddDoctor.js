import React, { useState } from "react";
import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import "../styles/AddDoctor.css";  

function AddDoctor() {

  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    gender: "",
    specialization: ""
  });

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance.post("/doctors/add", doctor)
      .then(() => {
        alert("Doctor Added Successfully");
        navigate("/Doctor");
      })
      .catch(error => {
        console.error(error);
        alert("Error adding doctor");
      });
  };

  return (
    <div>
      <div className="add-doctor-container">
        <h2 className="add-doctor-title">Add Doctor</h2>

        <form className="add-doctor-form" onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Doctor Name"
            onChange={handleChange}
            required
          />

          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />

          <input
            name="experience"
            type="number"
            placeholder="Experience (Years)"
            value={doctor.experience}
            onChange={e =>
              setDoctor({ ...doctor, experience: Number(e.target.value) })
            }
          />

          <select name="gender" onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            name="specialization"
            onChange={handleChange}
            required
          >
            <option value="">Select Specialization</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Dermatology">Dermatology</option>
          </select>

          <button type="submit">Add Doctor</button>
        </form>
      </div>

      <div className="button-center">
        <button className="dashboard-btn1" onClick={() => navigate("/dashboard")}>
          ← Main Menu
        </button>
      </div>
    </div>
  );
}

export default AddDoctor;
