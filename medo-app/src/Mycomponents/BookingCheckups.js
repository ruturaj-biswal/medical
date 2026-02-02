// src/Mycomponents/BookingCheckups.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookingCheckups() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    package: "Full Body Checkup",
    date: "",
    time: "",
    payment_method: "Cash on Delivery",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const packages = [
    "Full Body Checkup",
    "Heart & Cardiac Panel",
    "Diabetes Screening",
    "Liver & Kidney Panel",
    "Women Wellness Package",
    "Senior Health Package"
  ];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    // simple validation
    if (!form.name || !form.email || !form.phone || !form.date || !form.time) {
      setMessage("Please fill required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/book-checkup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // success: navigate to success page or show inline message
        setMessage("Booking confirmed — check your email for confirmation.");
        // optional: navigate to a success route
        navigate("/checkup-success", { state: { booking: form } });
      } else {
        setMessage("Failed to book: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setMessage("Network error. Ensure backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .bk-page { min-height:100vh; display:flex; align-items:center; justify-content:center;
          background: linear-gradient(135deg,#eaf6ff 0%, #ffffff 100%); padding:30px;
          font-family: 'Poppins', sans-serif;
        }
        .bk-card { width:100%; max-width:760px; background:white; border-radius:18px;
          box-shadow: 0 10px 30px rgba(3, 59, 106, 0.08); padding:28px;
        }
        .bk-grid { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
        .bk-full { grid-column: 1 / -1; }
        label { display:block; font-weight:600; margin-bottom:6px; color:#013a63; }
        input, select, textarea { width:100%; padding:10px 12px; border-radius:10px; border:1px solid #e6f0fb; outline:none; }
        .btn-primary { background: linear-gradient(90deg,#007bff,#0062d6); color:white; padding:12px 18px; border-radius:10px; border:none; font-weight:700; cursor:pointer; }
        .btn-primary:disabled { opacity:0.6; cursor:not-allowed; }
        .muted { color:#6b86a6; margin-top:8px; font-size:0.95rem; }
        @media (max-width:720px) {
          .bk-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="bk-page">
        <div className="bk-card">
          <h2 style={{ margin: 0, marginBottom: 6, color: "#002c57" }}>Book a Preventive Health Checkup</h2>
          <p className="muted">Choose package, date & time. We'll send confirmation to your email.</p>

          <form onSubmit={handleSubmit}>
            <div className="bk-grid" style={{ marginTop: 16 }}>
              <div>
                <label>Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" />
              </div>

              <div>
                <label>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@mail.com" />
              </div>

              <div>
                <label>Phone *</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9XXXXXXXXX" />
              </div>

              <div>
                <label>Package</label>
                <select name="package" value={form.package} onChange={handleChange}>
                  {packages.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label>Date *</label>
                <input name="date" type="date" value={form.date} onChange={handleChange} />
              </div>

              <div>
                <label>Time *</label>
                <input name="time" type="time" value={form.time} onChange={handleChange} />
              </div>

              <div>
                <label>Payment</label>
                <select name="payment_method" value={form.payment_method} onChange={handleChange}>
                  <option>Cash on Visit</option>
                  <option>UPI / PhonePe / GPay</option>
                  <option>Card / Netbanking (in-person)</option>
                </select>
              </div>

              <div>
                <label>Notes (optional)</label>
                <input name="notes" value={form.notes} onChange={handleChange} placeholder="Any known allergies or symptoms" />
              </div>

              <div className="bk-full" style={{ marginTop: 6 }}>
                <button className="btn-primary" type="submit" disabled={loading}>
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
                {message && <p className="muted" style={{ marginTop: 8 }}>{message}</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
