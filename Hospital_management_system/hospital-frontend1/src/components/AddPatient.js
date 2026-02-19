import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import "../styles/AddPatient.css";

function AddPatient() {
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
    status:""
  });

  useEffect(() => {
    axiosInstance.get("/doctors/all")
      .then(res => setDoctors(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance.post("/patients/add", patient)
      .then(() => {
        alert("Patient Added Successfully");
        navigate("/patient");
      })
      .catch(error => {
        console.error(error);
        alert("Error adding patient");
      });
  };

  return (
    <div>
      <div className="add-patient-container">
        <h2 className="add-patient-title">Add Patient</h2>

        <form className="add-patient-form" onSubmit={handleSubmit}>

          <input name="name" placeholder="Name" required onChange={handleChange} />
          <input name="age" type="number" placeholder="Age" required onChange={handleChange} />

          <select name="gender" required onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select name="disease" required onChange={handleChange}>
            <option value="">Select Disease</option>
            <option value="Feaver">Feaver</option>
            <option value="Heart Problem">Heart Problem</option>
            <option value="Sugar issues">Sugar issues</option>
            <option value="Other">Other</option>
          </select>

          {/* <select
            required
            onChange={e =>
              setPatient({
                ...patient,
                doctor: { id: Number(e.target.value) }
              })
            }
          >
            <option value="">Select Doctor</option>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.specialization})
              </option>
            ))}
          </select> */}

          <input name="phone" placeholder="Phone" required onChange={handleChange} />
          <input name="address" placeholder="Address" required onChange={handleChange} />

          <select name="bloodGroup" required onChange={handleChange}>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

         <select
  name="status"
  required
  onChange={handleChange}
  value={patient.status}
>
  <option value="">Select Patient Status</option>
  <option value="ADMITTED">Admitted</option>
  <option value="DISCHARGED">Discharged</option>
  <option value="UNDER_TREATMENT">Treatment</option>
</select>
          <button type="submit" className="dashboard-btn1">
            Add Patient
          </button>

        </form>
      </div>

      <div className="button-center">
        <button className="dashboard-btn1" onClick={() => navigate("/patient")}>
          ← Patient Main Menu
        </button>
      </div>
    </div>
  );
}

export default AddPatient;
