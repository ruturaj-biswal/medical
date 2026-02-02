import React, { useState, useEffect } from "react";
import "./DigitalHealthRecords.css";

const USERS_KEY = "healio_users_v1";
const RECORDS_PREFIX = "healio_records_";

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return String(Math.abs(h));
}

export default function DigitalHealthRecords() {
  const [mode, setMode] = useState("login");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    notes: "",
    date: "",
  });
  const [editingIndex, setEditingIndex] = useState(-1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedUser = sessionStorage.getItem("healio_current_user");
    if (savedUser) {
      setCurrentUser(savedUser);
      loadRecords(savedUser);
      setMode("app");
    }
  }, []);

  // ================== STORAGE HELPERS ==================
  const loadUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  const saveUsers = (obj) => localStorage.setItem(USERS_KEY, JSON.stringify(obj));

  const loadRecords = (uid) => {
    const raw = localStorage.getItem(RECORDS_PREFIX + uid);
    setRecords(raw ? JSON.parse(raw) : []);
  };
  const saveRecords = (uid, list) => {
    localStorage.setItem(RECORDS_PREFIX + uid, JSON.stringify(list));
    setRecords(list);
  };

  // ================== AUTH ==================
  const handleRegister = (e) => {
    e.preventDefault();
    if (!userId || !password) return setMessage("Enter both ID and password.");
    const users = loadUsers();
    if (users[userId]) return setMessage("User already exists.");
    users[userId] = { passwordHash: simpleHash(password) };
    saveUsers(users);
    setMessage("Registration successful. Please login.");
    setMode("login");
    setUserId("");
    setPassword("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = loadUsers();
    const user = users[userId];
    if (!user || user.passwordHash !== simpleHash(password))
      return setMessage("Invalid ID or password.");
    sessionStorage.setItem("healio_current_user", userId);
    setCurrentUser(userId);
    loadRecords(userId);
    setMode("app");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("healio_current_user");
    setCurrentUser(null);
    setMode("login");
    setRecords([]);
  };

  // ================== RECORDS ==================
  const handleRecordSubmit = (e) => {
    e.preventDefault();
    if (!form.name) return setMessage("Name required.");
    const entry = {
      ...form,
      date: form.date || new Date().toISOString().split("T")[0],
      id: Date.now(),
    };
    const updated = [...records];
    if (editingIndex >= 0) {
      updated[editingIndex] = { ...updated[editingIndex], ...entry };
      setEditingIndex(-1);
    } else {
      updated.unshift(entry);
    }
    saveRecords(currentUser, updated);
    setForm({ name: "", age: "", gender: "", notes: "", date: "" });
    setMessage("Record saved successfully!");
  };

  const deleteRecord = (i) => {
    if (!window.confirm("Delete this record?")) return;
    const newList = records.filter((_, idx) => idx !== i);
    saveRecords(currentUser, newList);
    setMessage("Record deleted.");
  };

  const startEdit = (i) => {
    setForm(records[i]);
    setEditingIndex(i);
  };

  const exportJSON = () => {
    const data = { user: currentUser, records };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `records_${currentUser}.json`;
    a.click();
  };

  // ================== UI ==================
  return (
    <div className="dhr-page">
      <div className="dhr-container">
        {!currentUser ? (
          <div className="dhr-auth">
            <h2>Digital Health Records</h2>
            <p className="muted">
              Securely store and access your health data — even offline.
            </p>

            <div className="auth-tabs">
              <button
                className={mode === "register" ? "tab active" : "tab"}
                onClick={() => setMode("register")}
              >
                Register
              </button>
              <button
                className={mode === "login" ? "tab active" : "tab"}
                onClick={() => setMode("login")}
              >
                Login
              </button>
            </div>

            <form
              className="dhr-form"
              onSubmit={mode === "login" ? handleLogin : handleRegister}
            >
              <input
                placeholder="User ID (like phone or email)"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="primary">
                {mode === "login" ? "Login" : "Register"}
              </button>
            </form>

            {message && <div className="dhr-message">{message}</div>}
          </div>
        ) : (
          <div className="dhr-app">
            {/* HEADER */}
            <div className="dhr-header">
              <div>
                <h2>Welcome, {currentUser}</h2>
                <p className="muted">
                  Manage your health details securely. Data is stored locally.
                </p>
              </div>
              <div className="dhr-actions">
                <button onClick={exportJSON} className="secondary">
                  Export JSON
                </button>
                <button onClick={handleLogout} className="danger">
                  Logout
                </button>
              </div>
            </div>

            {/* ADD RECORD FORM */}
            <div className="dhr-form-wrap">
              <h3>{editingIndex >= 0 ? "Edit Record" : "Add Record"}</h3>
              <form className="dhr-record-form" onSubmit={handleRecordSubmit}>
                <input
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  placeholder="Age"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
                <textarea
                  placeholder="Medical Notes / History"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
                <button type="submit" className="primary">
                  {editingIndex >= 0 ? "Save Changes" : "Save Record"}
                </button>
              </form>
            </div>

            {/* RECORDS LIST */}
            <div className="dhr-list">
              <h3>Your Records ({records.length})</h3>
              {records.length === 0 ? (
                <p className="muted">No records yet. Add one above.</p>
              ) : (
                <ul>
                  {records.map((r, i) => (
                    <li key={r.id} className="record-item">
                      <div>
                        <div className="record-name">
                          {r.name}{" "}
                          <span className="record-age">
                            {r.age ? `(${r.age} yrs)` : ""}
                          </span>
                        </div>
                        <div className="record-meta">
                          {r.gender} • {r.date}
                        </div>
                        <div className="record-notes">{r.notes}</div>
                      </div>
                      <div className="record-actions">
                        <button
                          className="small"
                          onClick={() => startEdit(i)}
                        >
                          Edit
                        </button>
                        <button
                          className="small danger"
                          onClick={() => deleteRecord(i)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* OFFLINE ACCESS SECTION */}
            <div className="offline-access">
              <h3>Offline Access for Rural Patients 🌾</h3>
              <p>
                In rural or low-network areas, your health data remains
                available offline. Patients can view and update records anytime,
                and changes sync automatically once reconnected.
              </p>
              <ul>
                <li>✅ Works offline via local storage</li>
                <li>✅ Auto-sync when internet returns</li>
                <li>✅ Ideal for rural clinics and kiosks</li>
              </ul>
            </div>

            {message && <div className="dhr-message">{message}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
