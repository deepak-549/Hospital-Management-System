import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AddPatient.css";

function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    disease: "",
    phone: "",
    address: "",
    bloodGroup: "",
    status: "",
    doctor: null
  });

  /* 🔹 LOAD DOCTORS + PATIENT (COMBINED useEffect) */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsRes, patientRes] = await Promise.all([
          axiosInstance.get("/doctors/all"),
          axiosInstance.get(`/patients/${id}`)
        ]);

        setDoctors(doctorsRes.data);

        const p = patientRes.data;
        setPatient({
          ...p,
          age: p.age?.toString(),
          doctor: p.doctor ? { id: p.doctor.id } : null
        });
      } catch (error) {
        console.error(error);
        alert("Failed to load patient data");
      }
    };

    fetchData();
  }, [id]);

  /* 🔹 HANDLE NORMAL INPUTS */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /* 🔹 HANDLE DOCTOR CHANGE */
  const handleDoctorChange = (e) => {
    const value = e.target.value;
    setPatient(prev => ({
      ...prev,
      doctor: value ? { id: Number(value) } : null
    }));
  };

  /* 🔹 SUBMIT UPDATE */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...patient,
      age: Number(patient.age),
      doctor: patient.doctor ? { id: patient.doctor.id } : null
    };

    try {
      await axiosInstance.put(`/patients/${id}`, payload);
      alert("Patient Updated Successfully");
      navigate("/patient-list");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  return (
    <div>
      <div className="add-patient-container">
        <h2 className="add-patient-title">Edit Patient</h2>

        <form className="add-patient-form" onSubmit={handleSubmit}>
          
          <input
            name="name"
            value={patient.name}
            onChange={handleChange}
            placeholder="Patient Name"
            required
          />

          <input
            name="age"
            type="number"
            value={patient.age}
            onChange={handleChange}
            placeholder="Age"
            required
          />

          <select name="gender" value={patient.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            name="disease"
            value={patient.disease}
            onChange={handleChange}
            placeholder="Disease"
          />

          {/* 🔹 DOCTOR SELECT */}
          <select value={patient.doctor?.id || ""} onChange={handleDoctorChange}>
            <option value="">Select Doctor</option>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>
                {d.name} - {d.specialization}
              </option>
            ))}
          </select>

          <input
            name="phone"
            value={patient.phone}
            onChange={handleChange}
            placeholder="Phone"
          />

          <input
            name="address"
            value={patient.address}
            onChange={handleChange}
            placeholder="Address"
          />

          <select
            name="bloodGroup"
            value={patient.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          {/* 🔹 STATUS (FIXED BUG) */}
          <select
            name="status"
            value={patient.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Patient Status</option>
            <option value="ADMITTED">Admitted</option>
            <option value="UNDER_TREATMENT">Under Treatment</option>
            <option value="DISCHARGED">Discharged</option>
          </select>

          <button type="submit" className="dashboard-btn1">
            Update Patient
          </button>
        </form>
      </div>

      <div className="button-center">
        <button
          className="dashboard-btn1"
          onClick={() => navigate("/patient-list")}
        >
          ← Back to Patient List
        </button>
      </div>
    </div>
  );
}

export default EditPatient;
