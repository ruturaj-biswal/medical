// TherapyBooking.js
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/*
  Booking form posts to /book-therapy on your Flask backend.
  On success navigates to /therapy-success with booking state.
*/

export default function TherapyBooking() {
  const { state } = useLocation();
  const pre = state?.counsellor;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    patient_name: "",
    email: "",
    phone: "",
    counsellor: pre ? `${pre.name} (${pre.title})` : "",
    date: "",
    time: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.patient_name || !form.email || !form.date || !form.time) {
      setError("Please fill name, email, date and time.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/book-therapy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        navigate("/therapy-success", { state: { booking: form } });
      } else {
        setError(data.error || "Failed to submit booking.");
      }
    } catch (err) {
      setError("Network error. Check backend.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .tb-page { min-height:100vh; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#e8f8ff,#dfefff); padding:40px; font-family:Poppins, sans-serif; }
        .tb-box { width:100%; max-width:680px; background:#ffffff; padding:26px; border-radius:14px; box-shadow:0 12px 30px rgba(2,38,75,0.08); }
        .tb-grid { display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:12px; }
        .tb-grid-full { grid-column: 1 / -1; }
        input, textarea, select { width:100%; padding:10px 12px; border-radius:8px; border:1px solid #e3eefc; }
        label { font-weight:600; color:#1d3557; font-size:0.9rem; }
        .btn { padding:10px 14px; border-radius:10px; border:0; color:#fff; background:linear-gradient(90deg,#007bff,#00aaff); cursor:pointer; font-weight:700; }
        .btn[disabled] { opacity:0.6; cursor:not-allowed; }
        .error { color:#b00020; margin-top:8px; }
      `}</style>

      <div className="tb-page">
        <div className="tb-box">
          <h2>Book Therapy Session</h2>
          <p style={{color:"#4e6b8a"}}>Fill details and we'll send a confirmation email after booking.</p>

          <form onSubmit={submit}>
            <div className="tb-grid">
              <div>
                <label>Patient Name</label>
                <input name="patient_name" value={form.patient_name} onChange={handleChange} />
              </div>

              <div>
                <label>Email</label>
                <input name="email" value={form.email} onChange={handleChange} type="email" />
              </div>

              <div>
                <label>Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} />
              </div>

              <div>
                <label>Counsellor</label>
                <input name="counsellor" value={form.counsellor} onChange={handleChange} />
              </div>

              <div>
                <label>Date</label>
                <input name="date" type="date" value={form.date} onChange={handleChange} />
              </div>

              <div>
                <label>Time</label>
                <input name="time" type="time" value={form.time} onChange={handleChange} />
              </div>

              <div className="tb-grid-full">
                <label>Notes (optional)</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} rows="4" />
              </div>
            </div>

            {error && <div className="error">{error}</div>}

            <div style={{marginTop:12}}>
              <button className="btn" type="submit" disabled={loading}>{loading ? "Booking..." : "Confirm Booking"}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
