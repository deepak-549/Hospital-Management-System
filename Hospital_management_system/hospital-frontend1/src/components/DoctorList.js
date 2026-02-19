import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import "../styles/DoctorList.css";

function DoctorList({ hideDelete = false }) {

  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = () => {
    axiosInstance.get("/doctors/all")
      .then(res => setDoctors(res.data))
      .catch(err => console.error(err));
  };

  const deleteDoctor = (id) => {
    if (!window.confirm("Are you sure?")) return;

    axiosInstance.delete(`/doctors/${id}`)
      .then(() => {
        alert("Doctor deleted");
        loadDoctors();
      })
      .catch(err => {
        console.error(err.response?.data || err.message);
        alert("Delete failed");
      });
  };

  return (
    <div className="doctor-container">

      <h2>Doctor List</h2>

      <table className="doctor-table">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>ID</th>
            <th>Doctor Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Experience</th>
            <th>Gender</th>
            <th>Specialization</th>
            {!hideDelete && (
            <th>Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={doctor.id}>
              <td>{index + 1}</td>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.email}</td>
              <td>{doctor.phone}</td>
              <td>{doctor.experience}</td>
              <td>{doctor.gender}</td>
              <td>{doctor.specialization}</td>
              {!hideDelete && (
              <td>
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit-doctor/${doctor.id}`)}
                >
                  Edit
                </button>

                
                  <button
                    className="delete-btn"
                    onClick={() => deleteDoctor(doctor.id)}
                  >
                    Delete
                  </button>
                
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <br />

    </div>
  );
}

export default DoctorList;
