import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "../styles/AddMedicin.css";

// ✅ Your backend (Swagger) base
const API_URL = "https://localhost:7230/api/medicines";
    
function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [medicine, setMedicine] = useState({
    name: "",
    category: "",
    dosage: "",
    price: "",
    quantity: "",
    expiryDate: ""
  });

  // ---------- Helpers ----------
  const toIsoDateTime = (dateStr) => {
    // dateStr: "YYYY-MM-DD" -> "YYYY-MM-DDT00:00:00"
    if (!dateStr) return null;
    return `${dateStr}T00:00:00`;
  };

  const safeDateOnly = (dt) => {
    // dt might be "2027-12-31T00:00:00" or null
    if (!dt) return "";
    return String(dt).slice(0, 10);
  };

  const resetForm = () => {
    setEditingId(null);
    setMedicine({
      name: "",
      category: "",
      dosage: "",
      price: "",
      quantity: "",
      expiryDate: ""
    });
  };

  const showApiError = (err, fallbackMsg) => {
    const status = err?.response?.status;
    const data = err?.response?.data;
    console.error("API ERROR:", status, data, err);
    alert(`${fallbackMsg}\n${status ? `Status: ${status}` : ""}`);
  };

  // ---------- API ----------
  const loadMedicines = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setMedicines(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      showApiError(err, "Failed to load medicines ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedicines();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !medicine.name ||
      !medicine.category ||
      !medicine.price ||
      !medicine.quantity ||
      !medicine.expiryDate
    ) {
      alert("Please fill all required fields (Name, Category, Price, Quantity, Expiry Date).");
      return;
    }

    const payload = {
      // send id in body too (safe for ID-mismatch backends)
      id: editingId ?? 0,
      name: medicine.name.trim(),
      category: medicine.category.trim(),
      dosage: medicine.dosage?.trim() || "",
      price: Number(medicine.price),
      quantity: Number(medicine.quantity),
      expiryDate: toIsoDateTime(medicine.expiryDate)
    };

    if (Number.isNaN(payload.price) || Number.isNaN(payload.quantity)) {
      alert("Price and Quantity must be valid numbers.");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`https://localhost:7230/api/medicines/${editingId}`, payload);

        alert("Medicine updated ✅");
      } else {
        await axios.post(API_URL, payload);
        alert("Medicine added ✅");
      }

      resetForm();
      await loadMedicines();
    } catch (err) {
      showApiError(err, editingId ? "Update failed ❌" : "Add failed ❌");
    }
  };

  const onEdit = (m) => {
    setEditingId(m.id);
    setMedicine({
      name: m.name ?? "",
      category: m.category ?? "",
      dosage: m.dosage ?? "",
      price: m.price ?? "",
      quantity: m.quantity ?? "",
      expiryDate: safeDateOnly(m.expiryDate)
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (id) => {
    const ok = window.confirm("Delete this medicine?");
    if (!ok) return;

    try {
      await axios.delete(`https://localhost:7230/api/medicines/${id}`);

      alert("Medicine deleted ✅");
      await loadMedicines();
    } catch (err) {
      showApiError(err, "Delete failed ❌");
    }
  };

  // ---------- UI computed ----------
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return medicines;

    return medicines.filter((m) => {
      const name = (m.name ?? "").toLowerCase();
      const category = (m.category ?? "").toLowerCase();
      const dosage = (m.dosage ?? "").toLowerCase();
      return name.includes(q) || category.includes(q) || dosage.includes(q);
    });
  }, [medicines, search]);

  const now = useMemo(() => new Date(), []);
  const isExpiredSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const d = new Date(expiryDate);
    const diffDays = (d - now) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 30;
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    const d = new Date(expiryDate);
    return d < new Date(new Date().toDateString()); // compare date-only
  };

  // ---------- Styles (inline, no new file needed) ----------
  const styles = {
    page: {
      maxWidth: 1100,
      margin: "0 auto",
      padding: "18px 14px 60px"
    },
    hero: {
      borderRadius: 18,
      padding: "18px 18px",
      marginBottom: 16,
      color: "#fff",
      background: "linear-gradient(135deg, #0ea5e9 0%, #22c55e 45%, #a855f7 100%)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
    },
    heroTitle: {
      margin: 0,
      fontSize: 22,
      fontWeight: 800,
      letterSpacing: 0.2
    },
    heroSub: {
      marginTop: 6,
      marginBottom: 0,
      opacity: 0.95,
      fontSize: 13
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1.05fr 1fr",
      gap: 14,
      alignItems: "start"
    },
    card: {
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
      border: "1px solid rgba(0,0,0,0.06)"
    },
    cardHead: {
      padding: "14px 14px 0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10
    },
    cardTitle: { margin: 0, fontSize: 16, fontWeight: 800 },
    chip: {
      padding: "6px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 700,
      background: editingId ? "rgba(168,85,247,0.12)" : "rgba(34,197,94,0.12)",
      color: editingId ? "#7c3aed" : "#16a34a"
    },
    formBody: { padding:35  },
    row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
    input: {
      width: "100%",
      padding: "15px 10px",
      borderRadius: 12,
      border: "1px solid rgba(0,0,0,0.12)",
      outline: "none"
    },
    btnRow: { display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" },
    btnPrimary: {
      padding: "10px 14px",
      borderRadius: 12,
      border: "none",
      cursor: "pointer",
      color: "#fff",
      fontWeight: 800,
      background: "linear-gradient(135deg, #0ea5e9, #22c55e)"
    },
    btnGhost: {
      padding: "10px 14px",
      borderRadius: 12,
      border: "1px solid rgba(0,0,0,0.14)",
      cursor: "pointer",
      background: "#fff",
      fontWeight: 800
    },
    listTop: {
      padding: 14,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap"
    },
    search: {
      minWidth: 240,
      flex: 1,
      padding: "10px 12px",
      borderRadius: 12,
      border: "1px solid rgba(0,0,0,0.12)"
    },
    tableWrap: { padding: "0 14px 14px", overflowX: "auto" },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: "0 10px"
    },
    th: {
      textAlign: "left",
      fontSize: 12,
      opacity: 0.7,
      padding: "0 10px"
    },
    tr: {
      background: "#fff",
      boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
      borderRadius: 14
    },
    td: { padding: "12px 10px", verticalAlign: "middle" },
    badge: (type) => {
      const base = {
        display: "inline-block",
        padding: "5px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 800
      };
      if (type === "low") return { ...base, background: "rgba(245,158,11,0.14)", color: "#b45309" };
      if (type === "soon") return { ...base, background: "rgba(59,130,246,0.14)", color: "#1d4ed8" };
      if (type === "expired") return { ...base, background: "rgba(239,68,68,0.14)", color: "#b91c1c" };
      return { ...base, background: "rgba(0,0,0,0.06)", color: "#111" };
    },
    actionBtn: (kind) => {
      const base = {
        padding: "8px 10px",
        borderRadius: 10,
        border: "1px solid rgba(0,0,0,0.12)",
        cursor: "pointer",
        fontWeight: 800,
        background: "#fff"
      };
      if (kind === "edit") return { ...base };
      if (kind === "del") return { ...base, borderColor: "rgba(239,68,68,0.35)", color: "#b91c1c" };
      return base;
    }
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Medicines</h1>
      </div>

      <div style={styles.grid}>
        {/* Form Card */}
        <div style={styles.card}>
          <div style={styles.cardHead}>
            <h3 style={styles.cardTitle}>{editingId ? "Update Medicine" : "Add Medicine"}</h3>
            <span style={styles.chip}>{editingId ? `Editing ID: ${editingId}` : "Create new"}</span>
          </div>

          <div style={styles.formBody}>
            <form onSubmit={handleSubmit}>
              <div style={styles.row}>
                <input
                  style={styles.input}
                  placeholder="Medicine Name *"
                  value={medicine.name}
                  onChange={(e) => setMedicine({ ...medicine, name: e.target.value })}
                />
                <input
                  style={styles.input}
                  placeholder="Category *"
                  value={medicine.category}
                  onChange={(e) => setMedicine({ ...medicine, category: e.target.value })}
                />
              </div>

              <div style={{ ...styles.row, marginTop: 10 }}>
                <input
                  style={styles.input}
                  placeholder="Dosage (e.g., 1-0-1)"
                  value={medicine.dosage}
                  onChange={(e) => setMedicine({ ...medicine, dosage: e.target.value })}
                />
                <input
                  style={styles.input}
                  type="date"
                  value={medicine.expiryDate}
                  onChange={(e) => setMedicine({ ...medicine, expiryDate: e.target.value })}
                />
              </div>

              <div style={{ ...styles.row, marginTop: 10 }}>
                <input
                  style={styles.input}
                  type="number"
                  placeholder="Price *"
                  value={medicine.price}
                  onChange={(e) => setMedicine({ ...medicine, price: e.target.value })}
                />
                <input
                  style={styles.input}
                  type="number"
                  placeholder="Quantity *"
                  value={medicine.quantity}
                  onChange={(e) => setMedicine({ ...medicine, quantity: e.target.value })}
                />
              </div>

              <div style={styles.btnRow}>
                <button type="submit" style={styles.btnPrimary}>
                  {editingId ? "Update" : "Add"} Medicine
                </button>
                <button type="button" style={styles.btnGhost} onClick={resetForm}>
                  Clear
                </button>
                <button type="button" style={styles.btnGhost} onClick={loadMedicines}>
                  Refresh List
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* List Card */}
        <div style={styles.card}>
          <div style={styles.listTop}>
            <div>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Medicine List</h3>
              <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>
                {loading ? "Loading..." : `${filtered.length} items`}
              </div>
            </div>

            <input
              style={styles.search}
              placeholder="Search by name / category / dosage..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Dosage</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Qty</th>
                  <th style={styles.th}>Expiry</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td style={{ padding: 14 }} colSpan={8}>Loading medicines...</td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td style={{ padding: 14 }} colSpan={8}>No medicines found.</td>
                  </tr>
                ) : (
                  filtered.map((m) => {
                    const expiry = m.expiryDate;
                    const qty = Number(m.quantity ?? 0);

                    let statusBadge = <span style={styles.badge("ok")}>OK</span>;
                    if (isExpired(expiry)) statusBadge = <span style={styles.badge("expired")}>Expired</span>;
                    else if (isExpiredSoon(expiry)) statusBadge = <span style={styles.badge("soon")}>Expiring</span>;
                    else if (qty <= 10) statusBadge = <span style={styles.badge("low")}>Low Stock</span>;

                    return (
                      <tr key={m.id} style={styles.tr}>
                        <td style={styles.td}><b>{m.name}</b></td>
                        <td style={styles.td}>{m.category}</td>
                        <td style={styles.td}>{m.dosage || "-"}</td>
                        <td style={styles.td}>{m.price}</td>
                        <td style={styles.td}>{m.quantity}</td>
                        <td style={styles.td}>{safeDateOnly(expiry) || "-"}</td>
                        <td style={styles.td}>{statusBadge}</td>
                        <td style={styles.td}>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button style={styles.actionBtn("edit")}  onClick={() => onEdit(m)}>
                              Edit
                            </button>
                            <button style={styles.actionBtn("del")} onClick={() => onDelete(m.id)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            <div style={{ paddingTop: 10, fontSize: 12, opacity: 0.7 }}>
              Tip: click <b>Edit</b>, update fields, then click <b>Update Medicine</b>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Medicines;
