import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import "../styles/AddDoctor.css";
import { useNavigate } from "react-router-dom";

function BedDashboard() {

  const navigate = useNavigate();
  const [data, setData] = useState({ total: 0, free: 0, occupied: 0 });

  useEffect(() => {
    axiosInstance.get("/beds")
      .then(res => setData(res.data));
  }, []);

  return (
    <div className="form-container">
      <h2>Bed Dashboard</h2>

      <div className="dashboard-cards">
        <div>Total Beds: {data.total}</div>
        <div>Free Beds: {data.free}</div>
        <div>Occupied Beds: {data.occupied}</div>
      </div>

      <div className="button-center">
        <button className="dashboard-btn1" onClick={() => navigate("/room")}>
          ←Rooms Main Menu
        </button>
      </div>
    </div>
  );
}

export default BedDashboard;
