import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import "../styles/AppointmentList.css";
import { useNavigate } from "react-router-dom";

function AppointmentList() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = "/appointments";

  const loadAppointments = () => {
    setLoading(true);
    axiosInstance
      .get(API_BASE)
      .then((res) => {
        setAppointments(res.data);
        setError("");
      })
      .catch(() => setError("Failed to load appointments"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const updateStatus = (appointment, status) => {
    if (!appointment?.id) {
      alert("Invalid appointment ID");
      return;
    }

    axiosInstance
      .put(`${API_BASE}/${appointment.id}`, {
        ...appointment,      
        status: status       
      })
      .then(() => loadAppointments())
      .catch((err) => {
        const message =
          err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "Unknown error";
        alert("Status update failed: " + message);
      });
  };

  const deleteAppointment = (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    axiosInstance
      .delete(`${API_BASE}/${id}`)
      .then(() => {
        setAppointments((prev) => prev.filter((a) => a.id !== id));
        alert("Appointment deleted");
      })
      .catch((err) => {
        const message =
          err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "Unknown error";
        alert("Delete failed: " + message);
      });
  };

  return (
    <div>
      <div className="appointment-container">
        <h2>Appointment List</h2>

        {error && <p className="error">{error}</p>}

        <table className="appointment-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Doctor</th>
              <th>Patient</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
            ) : appointments.length === 0 ? (
              <tr>
                <td colSpan="7">No Appointments Found</td>
              </tr>
            ) : (
              appointments.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.appointmentDate}</td>
                  <td>{a.timeSlot}</td>
                  <td>{a.doctor?.name || "N/A"}</td>
                  <td>{a.patient?.name || "N/A"}</td>
                  <td>
                    <select
                      value={a.status}
                      onChange={(e) => updateStatus(a, e.target.value)}
                    >
                      <option value="SCHEDULED">Scheduled</option>
                      <option value="NOT_SCHEDULED">Not Scheduled</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => deleteAppointment(a.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

     
      {/* <div className="button-center">
        <button
          className="dashboard-btn1"
          onClick={() => navigate("/appointment")}
        >
          ← Appointment Main Menu
        </button>
      </div> */}
    </div>
  );
}

export default AppointmentList;
