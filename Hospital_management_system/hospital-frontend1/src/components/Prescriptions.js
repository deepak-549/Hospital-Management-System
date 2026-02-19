import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "./axiosInstance";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/Prescription.css";

// /* ================== CHANGE ONLY THIS IF PORT DIFFERS ================== */
// const SPRING_BASE = "http://localhost:8080";
const DOTNET_BASE = "https://localhost:7230/api";
/* ===================================================================== */

function Prescriptions() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    doctorId: "",
    patientId: "",
    prescriptionDate: "",
    items: [{ medicineId: "", dosage: "", days: 1, instructions: "" }],
  });

  const safeDateOnly = (dt) => (dt ? String(dt).slice(0, 10) : "");
  const prettyDate = (dt) => {
    const d = safeDateOnly(dt);
    if (!d) return "";
    // YYYY-MM-DD -> DD/MM/YYYY
    const [y, m, day] = d.split("-");
    return `${day}/${m}/${y}`;
  };

  const showApiError = (title, err) => {
    const status = err?.response?.status;
    const data = err?.response?.data;
    console.error(`${title} ❌`, status, data || err?.message || err);
    alert(`${title} failed ❌ ${status ? `(Status ${status})` : ""}\nCheck console.`);
  };

  // ------------------ LOADERS ------------------
  const loadDoctors = async () => {
    const res = await axiosInstance.get("/doctors/all");
    setDoctors(Array.isArray(res.data) ? res.data : []);
  };

  const loadPatients = async () => {
    const res = await axiosInstance.get("/patients/all");
    setPatients(Array.isArray(res.data) ? res.data : []);
  };

 const loadMedicines = async () => {
    const res = await axios.get(`${DOTNET_BASE}/medicines`);
    setMedicines(Array.isArray(res.data) ? res.data : []);
  };

  const loadPrescriptions = async () => {
    const res = await axios.get(`${DOTNET_BASE}/prescriptions`);
    setPrescriptions(Array.isArray(res.data) ? res.data : []);
  };

  const loadAll = async () => {
    try { await loadDoctors(); } catch (e) { showApiError("Load Doctors", e); }
    try { await loadPatients(); } catch (e) { showApiError("Load Patients", e); }
    try { await loadMedicines(); } catch (e) { showApiError("Load Medicines", e); }
    try { await loadPrescriptions(); } catch (e) { showApiError("Load Prescriptions", e); }
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line
  }, []);

  // ------------------ FORM HELPERS ------------------
  const resetForm = () => {
    setEditingId(null);
    setForm({
      doctorId: "",
      patientId: "",
      prescriptionDate: "",
      items: [{ medicineId: "", dosage: "", days: 1, instructions: "" }],
    });
  };

  const updateItem = (idx, key, value) => {
    const items = [...form.items];
    items[idx] = { ...items[idx], [key]: value };
    setForm({ ...form, items });
  };

  const addRow = () => {
    setForm((p) => ({
      ...p,
      items: [...p.items, { medicineId: "", dosage: "", days: 1, instructions: "" }],
    }));
  };

  const removeRow = (idx) => {
    setForm((p) => {
      const items = p.items.filter((_, i) => i !== idx);
      return {
        ...p,
        items: items.length ? items : [{ medicineId: "", dosage: "", days: 1, instructions: "" }],
      };
    });
  };

  // ------------------ SAVE ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.doctorId || !form.patientId) {
      alert("Select Doctor and Patient ❌");
      return;
    }

    for (const it of form.items) {
      if (!it.medicineId) return alert("Select medicine in all rows ❌");
      if (!it.days || Number(it.days) <= 0) return alert("Days must be > 0 ❌");
    }

    const payload = {
      doctorId: Number(form.doctorId),
      patientId: Number(form.patientId),
      prescriptionDate: form.prescriptionDate ? `${form.prescriptionDate}T00:00:00` : null,
      items: form.items.map((it) => ({
        medicineId: Number(it.medicineId),
        dosage: it.dosage || "",
        days: Number(it.days),
        instructions: it.instructions || "",
      })),
    };

    try {
      setSaving(true);

      if (editingId) {
        await axios.put(`${DOTNET_BASE}/prescriptions/${editingId}`, payload);
        alert("Prescription updated ✅");
      } else {
        await axios.post(`${DOTNET_BASE}/prescriptions`, payload);
        alert("Prescription added ✅");
      }

      resetForm();
      await loadPrescriptions();
    } catch (err) {
      showApiError(editingId ? "Update Prescription" : "Add Prescription", err);
    } finally {
      setSaving(false);
    }
  };

  // ------------------ EDIT / DELETE ------------------
  const onEdit = (p) => {
    setEditingId(p.id);
    setForm({
      doctorId: p.doctorId,
      patientId: p.patientId,
      prescriptionDate: safeDateOnly(p.prescriptionDate),
      items: (p.prescriptionMedicines || []).map((pm) => ({
        medicineId: pm.medicineId,
        dosage: pm.dosage || "",
        days: pm.days || 1,
        instructions: pm.instructions || "",
      })),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (id) => {
    if (!window.confirm(`Delete prescription #${id}?`)) return;

    try {
      await axios.delete(`${DOTNET_BASE}/prescriptions/${id}`);
      alert("Deleted ✅");
      await loadPrescriptions();
    } catch (err) {
      showApiError("Delete Prescription", err);
    }
  };

  // ------------------ UI HELPERS ------------------
  const doctorObj = (id) => doctors.find((d) => Number(d.id) === Number(id));
  const patientObj = (id) => patients.find((p) => Number(p.id) === Number(id));
  const medicineObj = (id) => medicines.find((m) => Number(m.id) === Number(id));

  const doctorName = (id) => doctorObj(id)?.name || `Doctor#${id}`;
  const patientName = (id) => patientObj(id)?.name || `Patient#${id}`;
  const medicineName = (id) => medicineObj(id)?.name || `Medicine#${id}`;

  // ------------------ PDF DOWNLOAD ------------------
  const downloadPrescriptionPDF = (p) => {
    const doc = new jsPDF("p", "mm", "a4");

    const dObj = doctorObj(p.doctorId);
    const pObj = patientObj(p.patientId);
    const rxDate = prettyDate(p.prescriptionDate) || prettyDate(new Date().toISOString());

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("HOSPITAL MANAGEMENT SYSTEM", 105, 16, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Prescription", 105, 24, { align: "center" });

    // Line
    doc.setDrawColor(180);
    doc.line(12, 28, 198, 28);

    // Doctor block
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Doctor Details", 12, 36);

    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${dObj?.name || doctorName(p.doctorId)}`, 12, 42);
    doc.text(`Specialization: ${dObj?.specialization || "-"}`, 12, 48);
    doc.text(`Doctor ID: ${p.doctorId}`, 12, 54);

    // Patient block
    doc.setFont("helvetica", "bold");
    doc.text("Patient Details", 120, 36);

    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${pObj?.name || patientName(p.patientId)}`, 120, 42);
    doc.text(`Patient ID: ${p.patientId}`, 120, 48);

    // If your patient model has these fields, it will show; else "-"
    doc.text(`Age: ${pObj?.age ?? "-"}`, 120, 54);

    // Meta
    doc.setFont("helvetica", "bold");
    doc.text(`Prescription No: #${p.id}`, 12, 64);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${rxDate}`, 160, 64);

    // Medicines table
    const rows = (p.prescriptionMedicines || []).map((pm, idx) => [
      String(idx + 1),
      medicineName(pm.medicineId),
      pm.dosage || "-",
      String(pm.days || 1),
      pm.instructions || "-",
    ]);

    autoTable(doc, {
      startY: 72,
      head: [["Sr", "Medicine", "Dosage", "Days", "Instructions"]],
      body: rows.length ? rows : [["-", "No medicines", "-", "-", "-"]],
      styles: { font: "helvetica", fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [79, 70, 229] },
      margin: { left: 12, right: 12 },
    });

    const finalY = doc.lastAutoTable?.finalY || 120;

    // Advice / Notes
    doc.setFont("helvetica", "bold");
    doc.text("Advice / Notes:", 12, finalY + 12);
    doc.setFont("helvetica", "normal");
    doc.text("• Take medicines as prescribed.\n• If symptoms continue, consult again.", 12, finalY + 18);

    // Signature area
    doc.setDrawColor(180);
    doc.line(12, 270, 85, 270);
    doc.line(125, 270, 198, 270);

    doc.setFont("helvetica", "bold");
    doc.text("Patient Signature", 12, 276);
    doc.text("Doctor Signature", 125, 276);

    // Footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("This is a computer-generated prescription.", 105, 287, { align: "center" });

    doc.save(`Prescription_${p.id}.pdf`);
  };

  // ------------------ FILTER ------------------
  const filteredList = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return prescriptions;

    return prescriptions.filter((p) => {
      const dn = doctorName(p.doctorId).toLowerCase();
      const pn = patientName(p.patientId).toLowerCase();
      return dn.includes(q) || pn.includes(q) || String(p.id).includes(q);
    });
  }, [search, prescriptions, doctors, patients]);

  return (
    <div className="rx-page">
      <div className="rx-shell">
        <div className="rx-header">
          <div>
            <h1 className="rx-title">Prescriptions</h1>
            <p className="rx-subtitle">Create, update and download prescription PDF</p>
          </div>
        </div>

        {/* Form */}
        <div className="rx-card">
          <div className="rx-card-head">
            <h2>{editingId ? "Update Prescription" : "Add Prescription"}</h2>
            <p>Fill doctor, patient, date and add multiple medicines</p>
          </div>

          <form onSubmit={handleSubmit} className="rx-form">
            <div className="rx-grid">
              <div className="rx-field">
                <label>Doctor</label>
                <select value={form.doctorId} onChange={(e) => setForm({ ...form, doctorId: e.target.value })}>
                  <option value="">Select Doctor</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.specialization || "Doctor"})
                    </option>
                  ))}
                </select>
              </div>

              <div className="rx-field">
                <label>Patient</label>
                <select value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })}>
                  <option value="">Select Patient</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rx-field">
                <label>Date</label>
                <input
                  type="date"
                  value={form.prescriptionDate}
                  onChange={(e) => setForm({ ...form, prescriptionDate: e.target.value })}
                />
              </div>
            </div>

            <div className="rx-panel">
              <div className="rx-panel-head">
                <h3>Medicines</h3>
                <button className="rx-btn rx-btn-dark" type="button" onClick={addRow}>
                  + Add Medicine Row
                </button>
              </div>

              <div className="rx-items">
                {form.items.map((it, idx) => (
                  <div className="rx-item" key={idx}>
                    <div className="rx-item-grid">
                      <div className="rx-field">
                        <label>Medicine</label>
                        <select value={it.medicineId} onChange={(e) => updateItem(idx, "medicineId", e.target.value)}>
                          <option value="">Select Medicine</option>
                          {medicines.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name} ({m.category})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="rx-field">
                        <label>Dosage</label>
                        <input
                          placeholder="1-0-1"
                          value={it.dosage}
                          onChange={(e) => updateItem(idx, "dosage", e.target.value)}
                        />
                      </div>

                      <div className="rx-field rx-days">
                        <label>Days</label>
                        <input
                          type="number"
                          min="1"
                          value={it.days}
                          onChange={(e) => updateItem(idx, "days", e.target.value)}
                        />
                      </div>

                      <div className="rx-field">
                        <label>Instructions</label>
                        <input
                          placeholder="After food / Before sleep..."
                          value={it.instructions}
                          onChange={(e) => updateItem(idx, "instructions", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="rx-item-actions">
                      <button className="rx-btn rx-btn-danger" type="button" onClick={() => removeRow(idx)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rx-form-actions">
              <button className="rx-btn rx-btn-primary" type="submit" disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update Prescription" : "Add Prescription"}
              </button>

              {editingId && (
                <button className="rx-btn rx-btn-ghost" type="button" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="rx-card">
          <div className="rx-list-head">
            <div>
              <h2>Prescription List</h2>
              <p>Search by doctor, patient or ID</p>
            </div>

            <div className="rx-search">
              <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>

          <div className="rx-table-wrap">
            <table className="rx-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Doctor</th>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Medicines</th>
                  <th style={{ width: 240 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="rx-empty">
                      No prescriptions found.
                    </td>
                  </tr>
                ) : (
                  filteredList.map((p) => (
                    <tr key={p.id}>
                      <td className="rx-id">#{p.id}</td>
                      <td>{doctorName(p.doctorId)}</td>
                      <td>{patientName(p.patientId)}</td>
                      <td>{prettyDate(p.prescriptionDate)}</td>
                      <td>
                        <div className="rx-med-list">
                          {(p.prescriptionMedicines || []).map((pm) => (
                            <div className="rx-pill" key={pm.id}>
                              <b>{medicineName(pm.medicineId)}</b>
                              <span>{pm.dosage}</span>
                              <span>{pm.days} days</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="rx-row-actions">
                          <button className="rx-btn rx-btn-small rx-btn-ok" onClick={() => onEdit(p)}>
                            Edit
                          </button>

                          <button
                            className="rx-btn rx-btn-small rx-btn-pdf"
                            onClick={() => downloadPrescriptionPDF(p)}
                          >
                            PDF
                          </button>

                          <button className="rx-btn rx-btn-small rx-btn-danger" onClick={() => onDelete(p.id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rx-footer-note">Tip: Click PDF to download prescription in proper format.</div>
      </div>
    </div>
  );
}

export default Prescriptions;
