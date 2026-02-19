import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate(); 

  return (
    <div>

       <div className="dashboard-container">

      <button className="dashboard-btn" onClick={() => navigate("/add-doctor")}>
        Add Doctor
      </button>
      <button className="dashboard-btn" onClick={() => navigate("/doctor-list")}>
        View Doctors
      </button>
      </div>

    </div>
  );
}

export default Dashboard;
