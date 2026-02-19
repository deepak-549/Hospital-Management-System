import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import "../styles/PatientList.css";
import { useNavigate } from "react-router-dom";

function PatientList({ hideDelete = false }) {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = () => {
    axiosInstance
      .get("/patients/all")
      .then(res => {
        setPatients(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const deletePatient = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      axiosInstance
        .delete(`/patients/${id}`)
        .then(() => {
          alert("Patient Deleted");
          loadPatients();
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="patient-container">
      <h2>Patient List</h2>

      <table className="patient-table">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Disease</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Blood Group</th>
            <th>Patient Status</th>
            <th>For Doctor</th>
            {!hideDelete && (
            <th>Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {patients.map((patient, index) => (
            <tr key={patient.id}>
              <td>{index + 1}</td>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.disease}</td>
              <td>{patient.phone}</td>
              <td>{patient.address}</td>
              <td>{patient.bloodGroup}</td>
              <td>{patient.status}</td>
              <td>
                {patient.doctor ? patient.doctor.name : "Not Assigned"}
              </td>
              
                

                {!hideDelete && (
                  <td>
                  <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit-patient/${patient.id}`)}
                >
                  Edit
                </button>
                  
                  <button
                    className="delete-btn"
                    onClick={() => deletePatient(patient.id)}
                    style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
                  >
                    Delete
                  </button>
                     </td>
                )}
           
            </tr>
          ))}
        </tbody>
      </table>

      <td></td>
      <br />
    </div>
  );
}

export default PatientList;
