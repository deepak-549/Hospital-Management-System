import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import "../styles/AssignBed.css";
import { useNavigate } from "react-router-dom";

function AssignBed() {
  const [beds, setBeds] = useState([]);
  const [patients, setPatients] = useState([]);
  const [bedId, setBedId] = useState("");
  const [patientId, setPatientId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadBeds();
    loadPatients();
  }, []);

  const loadBeds = () => {
    axiosInstance.get("/beds")
      .then(res => {
        const freeBeds = res.data.filter(b => !b.occupied);
        setBeds(freeBeds);
      });
  };

  const loadPatients = () => {
    axiosInstance.get("/patients/all")
      .then(res => setPatients(res.data));
  };

  const handleAssign = (e) => {
    e.preventDefault();

    if (!bedId || !patientId) {
      alert("Select bed and patient");
      return;
    }

    axiosInstance.put("/beds/assign", {
      id: bedId,
      patient: {
        id: patientId
      }
    })
      .then(() => {
        alert("Bed assigned successfully ✅");
        setBedId("");
        setPatientId("");
        loadBeds();
      })
      .catch(err => {
        console.error(err);
        alert("Assignment failed ❌");
      });
  };

  return (
    <div className="room-ui">
      <div className="form-container">
        <h2 className="form-title">Assign Bed to Patient</h2>

        <form onSubmit={handleAssign} className="room-form">

          <select
            value={bedId}
            onChange={e => setBedId(e.target.value)}
            className="form-select"
          >
            <option value="">Select Bed</option>
            {beds.map(bed => (
              <option key={bed.id} value={bed.id}>
                Bed {bed.bedNumber} | Room {bed.room.roomNumber} | Type {bed.room.roomType}
              </option>
            ))}
          </select>

          <select
            value={patientId}
            onChange={e => setPatientId(e.target.value)}
            className="form-select"
          >
            <option value="">Select Patient</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <button type="submit" className="primary-btn">
            Assign Bed
          </button>
        </form>

        <div className="button-center">
          <button
            className="dashboard-btn1 back-btn"
            onClick={() => navigate("/room")}
          >
            ← Rooms Main Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignBed;
