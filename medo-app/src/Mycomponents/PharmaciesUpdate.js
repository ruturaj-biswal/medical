import React, { useState, useEffect } from "react";
import "./PharmaciesUpdate.css";

export default function PharmaciesUpdate() {
  const [pharmacies, setPharmacies] = useState(() => {
    const saved = localStorage.getItem("pharmacies_data");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    name: "",
    address: "",
    contact: "",
    timing: "",
  });

  const [editingIndex, setEditingIndex] = useState(-1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("pharmacies_data", JSON.stringify(pharmacies));
  }, [pharmacies]);

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // add or update pharmacy
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.contact || !form.timing) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    if (editingIndex >= 0) {
      const updated = [...pharmacies];
      updated[editingIndex] = form;
      setPharmacies(updated);
      setEditingIndex(-1);
      setMessage("✅ Pharmacy updated successfully!");
    } else {
      setPharmacies([...pharmacies, form]);
      setMessage("✅ Pharmacy added successfully!");
    }

    setForm({ name: "", address: "", contact: "", timing: "" });
  };

  // edit
  const handleEdit = (index) => {
    setForm(pharmacies[index]);
    setEditingIndex(index);
  };

  // delete
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this pharmacy?")) {
      setPharmacies(pharmacies.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="pharmacy-page">
      <h2 className="pharmacy-title">🏥 Pharmacies Management</h2>
      <p className="pharmacy-subtitle">
        Add, edit, or remove pharmacy details — updates will be stored locally.
      </p>

      {/* Form Section */}
      <form className="pharmacy-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Pharmacy Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
        />
        <input
          type="text"
          name="timing"
          placeholder="Timing (e.g. 9AM - 9PM)"
          value={form.timing}
          onChange={handleChange}
        />
        <button type="submit" className="primary">
          {editingIndex >= 0 ? "Update Pharmacy" : "Add Pharmacy"}
        </button>
      </form>

      {message && <p className="pharmacy-message">{message}</p>}

      {/* Display Pharmacies */}
      <div className="pharmacy-grid">
        {pharmacies.length > 0 ? (
          pharmacies.map((ph, index) => (
            <div key={index} className="pharmacy-card">
              <h3>{ph.name}</h3>
              <p><b>📍 Address:</b> {ph.address}</p>
              <p><b>📞 Contact:</b> {ph.contact}</p>
              <p><b>🕒 Timing:</b> {ph.timing}</p>

              <div className="pharmacy-actions">
                <button className="edit-btn" onClick={() => handleEdit(index)}>
                  ✏️ Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="muted">No pharmacies added yet.</p>
        )}
      </div>
    </div>
  );
}
