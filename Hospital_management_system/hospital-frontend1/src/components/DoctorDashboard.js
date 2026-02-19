import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import DoctorList from "./DoctorList";
import PatientList from "./PatientList";
import AppointmentList from "./AppointmentList";
import Prescriptions from "./Prescriptions";
import "../styles/DoctorDashboard.css";

function DoctorDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="doctor-dashboard">
      
      {/* Top Header */}
     <header className="doctor-header">
  <h1 
    className="dashboard-title"
    onClick={() => navigate("/doctor-dashboard")}
  >
    🏥 Doctor Dashboard
  </h1>

  <button className="logout-btn" onClick={logout}>
    Logout
  </button>
</header>

      {/* Dashboard Cards */}
      <div className="doctor-cards">
        <div className="card" onClick={() => navigate("/doctor-dashboard/patients")}>
          <h2>Patients</h2>
          <p>View & manage your patients</p>
        </div>

        <div className="card" onClick={() => navigate("/doctor-dashboard/doctors")}>
          <h2>Doctors</h2>
          <p>View doctor profiles</p>
        </div>

        <div className="card" onClick={() => navigate("/doctor-dashboard/appointmentList")}>
          <h2>Appointments</h2>
          <p>View Appointments</p>
        </div>

        <div className="card" onClick={() => navigate("/doctor-dashboard/prec")}>
          <h2>Prescriptions</h2>
          <p>Give Prescriptions</p>
        </div>
      </div>

      {/* Nested Pages */}
      <div className="doctor-content" >
        <Routes>
          <Route path="patients" element={<PatientList hideDelete={true} />} />
          <Route path="doctors" element={<DoctorList hideDelete={true} />} />
          <Route path="appointmentList" element={<AppointmentList />}></Route>
          <Route path="prec" element={<Prescriptions />}></Route>
        </Routes>
      </div>

    </div>
  );
}

export default DoctorDashboard;
