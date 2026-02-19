import React, { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import "../styles/RoomBedList.css";
import { useNavigate } from "react-router-dom";

function RoomBedList() {
  const [beds, setBeds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBeds();
  }, []);

  const loadBeds = () => {
    axiosInstance
      .get("/beds")
      .then(res => setBeds(res.data))
      .catch(err => console.error(err));
  };

  const deleteBed = (id) => {
    if (window.confirm("Are you sure you want to delete this bed?")) {
      axiosInstance
        .delete(`/beds/${id}`)
        .then(() => {
          alert("Bed deleted successfully ✅");
          loadBeds();
        })
        .catch(err => {
          console.error(err);
          alert("Failed to delete bed ❌");
        });
    }
  };

  return (
    <div className="room-bed-container">
      <h2>Room & Bed List</h2>

      <table className="room-bed-table">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Room Number</th>
            <th>Room Type</th>
            <th>Bed Number</th>
            <th>Assigned Patient</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {beds.map((bed, index) => (
            <tr key={bed.id}>
              <td>{index + 1}</td>
              <td>{bed.room?.roomNumber}</td>
              <td>{bed.room?.roomType}</td>
              <td>{bed.bedNumber}</td>
              <td>
                {bed.patient ? bed.patient.name : "Not Assigned"}
              </td>
              <td>
                <span className={bed.available ? "free" : "occupied"}>
                  {bed.available ? "FREE" : "OCCUPIED"}
                </span>
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteBed(bed.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-center">
        <button
          className="dashboard-btn1"
          onClick={() => navigate("/room")}
        >
          ←Rooms Main Menu
        </button>
      </div>
    </div>
  );
}

export default RoomBedList;
  