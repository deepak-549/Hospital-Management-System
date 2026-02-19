import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Patient.css";

function Dashboard() {
  const navigate = useNavigate(); 

  return (
    <div>
      <div className="dashboard-container">
        {/* <button
          className="dashboard-btn"
          onClick={() => navigate("/bed-dashboard")}
        >
          Room Availability
        </button> */}

        <button
          className="dashboard-btn"
          onClick={() => navigate("/add-room")}
        >
          Add Room
        </button>

        <button
          className="dashboard-btn"
          onClick={() => navigate("/add-bed")}
        >
          Add Bed
        </button>

        <button
          className="dashboard-btn"
          onClick={() => navigate("/assign-bed")}
        >
          Assign Bed
        </button>

        <button
          className="dashboard-btn"
          onClick={() => navigate("/room-bed-list")}
        >
          Rooms and Beds List
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
