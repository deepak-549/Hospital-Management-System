import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar-title" onClick={() => navigate("/")}>
        🏥 Hospital Management System
      </div>

      <div className="navbar-links">
        
      </div>
    </div>
  );
}

export default Navbar;
