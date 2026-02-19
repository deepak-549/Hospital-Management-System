import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Patient.css";
function Dashboard() {

  const navigate = useNavigate(); 

  return (
    <div>

       <div className="dashboard-container">
      

      <button className="dashboard-btn" onClick={() => navigate("/add-patient")}>
        Add Patient
      </button>
       <button className="dashboard-btn" onClick={() => navigate("/patient-list")}>
        View Patient
      </button>
    </div>
     </div>
  );
}

export default Dashboard;
