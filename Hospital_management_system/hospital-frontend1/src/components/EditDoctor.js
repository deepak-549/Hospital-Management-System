import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AddDoctor.css";

function EditDoctor() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [doctor, setDoctor] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    experience: "",
    gender: "",
    specialization: ""
  });

  useEffect(() => {
    axiosInstance
      .get(`/doctors/${id}`)
      .then(res => {
        setDoctor(res.data);
      })
      .catch(err => {
        alert("Failed to load doctor");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .put(`/doctors/${id}`, doctor)
      .then(() => {
        alert("Doctor Updated Successfully");
        navigate("/doctor-list");
      })
      .catch(() => {
        alert("Update Failed");
      });
  };

  return (
    <div>
      <div className="add-doctor-container">
        <h2 className="add-doctor-title">Edit Doctor</h2>

        <form className="add-doctor-form" onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Doctor Name"
            value={doctor.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={doctor.email || ""}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={doctor.phone || ""}
            onChange={handleChange}
          />

          <input
            name="experience"
            type="number"
            placeholder="Experience (Years)"
            value={doctor.experience || ""}
            onChange={handleChange}
          />

          <select
            name="gender"
            value={doctor.gender || ""}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            name="specialization"
            value={doctor.specialization || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select Specialization</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Dermatology">Dermatology</option>
          </select>

          <button type="submit">Update Doctor</button>
        </form>
      </div>

      <div className="button-center">
        <button
          className="dashboard-btn1"
          onClick={() => navigate("/doctor")}
        >
          ← Back to Doctor List
        </button>
      </div>
    </div>
  );
}

export default EditDoctor;
