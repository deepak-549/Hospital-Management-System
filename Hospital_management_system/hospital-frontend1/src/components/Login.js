import React, { useState } from "react";
import axiosInstance from "./axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post(
        "/doctor-auth/login",
        { username, password }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/doctor-dashboard");
    } catch (err) {
      alert("Invalid doctor credentials");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Doctor Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <div className="login-links">
          <Link to="/doctor-register">New Doctor? Register</Link>
          <Link to="/admin-login">Login as Admin</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
