import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../styles/Layout.css";

function Layout() {
  const navigate = useNavigate();

    const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="layout">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo" onClick={() => navigate("/dashboard")}>
          🏥
        </h2>

        <NavLink to="/patient" className="menu-item">
          <i className="fa-solid fa-user-injured"></i>
          Patients
        </NavLink>

        <NavLink to="/doctor" className="menu-item">
          <i className="fa-solid fa-user-doctor"></i>
          Doctors
        </NavLink>

        <NavLink to="/appointment" className="menu-item">
          <i className="fa-solid fa-calendar-check"></i>
          Appointments
        </NavLink>

        <NavLink to="/room" className="menu-item">
          <i className="fa-solid fa-bed"></i>
          Rooms
        </NavLink>

        <NavLink to="/add-medicine" className="menu-item">
          <i className="fa-solid fa-pills"></i>
          Medicines
        </NavLink>
        
<NavLink to="/bill" className="menu-item">
  <i className="fa-solid fa-file-invoice-dollar"></i>
  Billing
</NavLink>
        
      </div>


      {/* Main */}
      <div className="main">
<header className="header-admin">
  <div style={{ width: "80px" }}></div> {/* left spacer */}

  <h1
    className="dashboard-title"
    onClick={() => navigate("/dashboard")}
  >
    Admin Dashboard
  </h1>

  <button className="logout-btn" onClick={logout}>
    Logout
  </button>
</header>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
