import React, { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import "../styles/AddBill.css";

function AddBill() {
  const navigate = useNavigate();

  const [beds, setBeds] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [bill, setBill] = useState({
    patientId: "",
    doctorId: "",
    prescriptionId: "",
    bedId: "",
    consultationFee: 0,
    medicineAmount: 0,
    bedCharges: 0
  });

  useEffect(() => {
    loadBeds();
    loadPatients();
    loadDoctors();
  }, []);

  const loadBeds = () => {
    axiosInstance.get("/beds")
      .then(res => setBeds(res.data))
      .catch(console.error);
  };

  const loadDoctors = () => {
    axiosInstance.get("/doctors/all")
      .then(res => setDoctors(res.data))
      .catch(console.error);
  };

  const loadPatients = () => {
    axiosInstance.get("/patients/all")
      .then(res => setPatients(res.data))
      .catch(console.error);
  };

  const handlePatientChange = (e) => {
    const patientId = Number(e.target.value);

    const patient = patients.find(p => p.id === patientId);
    const bed = beds.find(b => b.patient && b.patient.id === patientId);

    setBill({
      ...bill,
      patientId,
      doctorId: patient?.doctor?.id || "",
      bedId: bed?.id || ""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBill({ ...bill, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance.post("/bills", bill)
      .then((res) => {
        alert("Bill Created Successfully 💰");
        navigate("/payment", {
        state: {
          billId: res.data.id,
          totalAmount: res.data.totalAmount
        }
      });
      })
      .catch(err => {
        console.error(err);
        alert("Error creating bill ❌");
      });
  };

  return (
    <div>
      <div className="add-bill-container">
        <h2 className="add-bill-title">Create Bill</h2>

        <form className="add-bill-form" onSubmit={handleSubmit}>
          <select value={bill.patientId} onChange={handlePatientChange}>
            <option value="">Select Patient</option>
            {patients.filter(p => p.status !== "DISCHARGED").map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <select name="doctorId" value={bill.doctorId} onChange={handleChange}>
            <option value="">Select Doctor</option>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          <select name="bedId" value={bill.bedId} onChange={handleChange}>
            <option value="">Select Bed</option>
            {beds.map(b => (
              <option key={b.id} value={b.id}>{b.bedNumber}</option>
            ))}
          </select>

          <input name="prescriptionId" placeholder="Prescription ID" onChange={handleChange} />
          <input name="consultationFee" placeholder="Consultation Fee" onChange={handleChange} />
          <input name="medicineAmount" placeholder="Medicine Amount" onChange={handleChange} />
          <input name="bedCharges" placeholder="Bed Charges" onChange={handleChange} />

          <button type="submit" className="button-btn1">
            Create Bill
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBill;
