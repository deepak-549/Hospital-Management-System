import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Patients",
      icon: "fa-user-injured",
      path: "/patient",
      color: "#4CAF50",
    },
    {
      title: "Doctors",
      icon: "fa-user-doctor",
      path: "/doctor",
      color: "#2196F3",
    },
    {
      title: "Appointments",
      icon: "fa-calendar-check",
      path: "/appointment",
      color: "#FF9800",
    },
    {
      title: "Rooms",
      icon: "fa-bed",
      path: "/room",
      color: "#9C27B0",
    },
    {
      title: "Medicines",
      icon: "fa-pills",
      path: "/medicine",
      color: "#F44336",
    },
  ];

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="dashboard-grid">
        {cards.map((card) => (
          <div
            key={card.title}
            className="dashboard-card"
            style={{ borderTop: `5px solid ${card.color}` }}
            onClick={() => navigate(card.path)}
          >
            <i className={`fa-solid ${card.icon} dashboard-icon`}></i>
            <h3>{card.title}</h3>
            <p>Manage {card.title.toLowerCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
