import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import "../styles/AddBed.css";
import { useNavigate } from "react-router-dom";

function AddBed() {
  const [bedNumber, setBedNumber] = useState("");
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState("");

  const navigate = useNavigate();

  // Load rooms
  useEffect(() => {
    axiosInstance.get("/rooms")
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bedNumber || !roomId) {
      alert("All fields are required");
      return;
    }

    axiosInstance.post("/beds/add", {
      bedNumber: bedNumber,
      room: {
        id: roomId
      }
    })
    .then(() => {
      alert("Bed added successfully ✅");
      setBedNumber("");
      setRoomId("");
    })
    .catch(err => {
      console.error(err);
      alert("Failed to add bed ❌");
    });
  };

  return (
    <div className="room-ui">
      <div className="form-container">
        <h2 className="form-title">Add Bed</h2>

        <form onSubmit={handleSubmit} className="room-form">

          <input
            type="text"
            placeholder="Bed Number"
            value={bedNumber}
            onChange={e => setBedNumber(e.target.value)}
            className="form-input"
          />

          <select
            value={roomId}
            onChange={e => setRoomId(e.target.value)}
            className="form-select"
          >
            <option value="">Select Room</option>
            {rooms.map(room => (
              <option key={room.id} value={room.id}>
                Room {room.roomNumber} - {room.roomType}
              </option>
            ))}
          </select>

          <button type="submit" className="primary-btn">
            Add Bed
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

export default AddBed;
