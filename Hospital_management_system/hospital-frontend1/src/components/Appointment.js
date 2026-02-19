import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Appointment() {

  const navigate = useNavigate(); 

  return (
    <div>
      <div className="dashboard-container">

        <button
          className="dashboard-btn"
          onClick={() => navigate("/add-appointment")}
        >
          Add Appointment
        </button>

        <button
          className="dashboard-btn"
          onClick={() => navigate("/appointment-list")}
        >
          View Appointment
        </button>

      </div>
    </div>
  );
}

export default Appointment;
