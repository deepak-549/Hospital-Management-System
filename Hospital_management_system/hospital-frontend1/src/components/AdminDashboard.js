import { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";

function AdminDashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axiosInstance
      .get("/admin/test")   
      .then((res) => setMessage(res.data))
      .catch((err) => {
        console.error(err);
        setMessage("Access denied or session expired");
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };


  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>
      <p>{message}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;