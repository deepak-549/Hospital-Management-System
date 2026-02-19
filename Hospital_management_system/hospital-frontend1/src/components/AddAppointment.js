import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import "../styles/AddAppointment.css";

function AddAppointment() {

  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const [appointment, setAppointment] = useState({
    appointmentDate: "",
    timeSlot: "",
    doctor: { id: null },
    patient: { id: null },
    status: "Scheduled"  
  });

  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM"
  ];

  useEffect(() => {
    axiosInstance.get("/doctors/all")
      .then(res => setDoctors(res.data))
      .catch(err => console.error("Doctor load error", err));

    axiosInstance.get("/patients/all")
      .then(res => setPatients(res.data))
      .catch(err => console.error("Patient load error", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("SENDING APPOINTMENT:", appointment);

    axiosInstance.post(
      "/appointments/add",
      appointment,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(() => {
      alert("Appointment Booked Successfully");
      navigate("/appointment");
    })
    .catch(err => {
      console.error("BOOKING ERROR:", err.response?.data || err.message);
      alert("Booking Failed");
    });
  };

  return (
    <div>
      <div className="add-appointment-container">
        <h2>Book Appointment</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="date"
            required
            onChange={e =>
              setAppointment({ ...appointment, appointmentDate: e.target.value })
            }
          />

          <select
            required
            onChange={e =>
              setAppointment({ ...appointment, timeSlot: e.target.value })
            }
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>

          <select
            required
            onChange={e =>
              setAppointment({
                ...appointment,
                doctor: { id: Number(e.target.value) }
              })
            }
          >
            <option value="">Select Doctor</option>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>
                {d.name} - {d.specialization}
              </option>
            ))}
          </select>

          <select
            required
            onChange={e =>
              setAppointment({
                ...appointment,
                patient: { id: Number(e.target.value) }
              })
            }
          >
            <option value="">Select Patient</option>
            {patients.filter(p => p.status !== "DISCHARGED").map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <button type="submit">Book Appointment</button>
        </form>
      </div>

      <div className="button-center">
        <button className="dashboard-btn1" onClick={() => navigate("/appointment")}>
          ← Appointment Main Menu
        </button>
      </div>
    </div>
  );
}

export default AddAppointment;
