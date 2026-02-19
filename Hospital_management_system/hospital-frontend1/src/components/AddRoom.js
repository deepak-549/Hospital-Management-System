import React, { useState } from "react";
import axiosInstance from "./axiosInstance";
import "../styles/AddRoom.css";
import { useNavigate } from "react-router-dom";

function AddRoom() {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("GENERAL");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/rooms/add", {
        roomNumber,
        roomType
      });
      alert("Room Added Successfully ✅");
      setRoomNumber("");
      setRoomType("GENERAL");
    } catch (err) {
      alert("Failed to add room ❌");
    }
  };

  return (
    <div className="form-container room-ui">
      <h2 className="form-title">Add Room</h2>

      <form onSubmit={handleSubmit} className="room-form">

        <input
          type="text"
          placeholder="Room Number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          required
          className="form-input"
        />

        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="form-select"
        >
          <option value="GENERAL">General</option>
          <option value="SPECIAL">Special</option>
          <option value="ICU">ICU</option>
          <option value="DELUXE">Deluxe</option>
        </select>

        <button type="submit" className="primary-btn">
          Add Room
        </button>
      </form>

      <div className="button-center">
        <button className="dashboard-btn1 back-btn" onClick={() => navigate("/room")}>
          ← Rooms Main Menu
        </button>
      </div>
    </div>
  );
}

export default AddRoom;
