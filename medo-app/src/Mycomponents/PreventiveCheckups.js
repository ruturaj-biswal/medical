import React, { useState } from "react";

export default function PreventiveCheckups() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    package: "",
    date: "",
    time: "",
    payment_method: "Online",
    notes: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitBooking = async () => {
    if (!form.name || !form.email || !form.phone || !form.package || !form.date || !form.time) {
      alert("Please fill all required fields");
      return;
    }

    setStatus("Booking...");

    try {
      const res = await fetch("http://localhost:5000/book-checkup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("✅ Booking successful! Confirmation sent to your email.");
      } else {
        setStatus("❌ Booking failed: " + data.error);
      }

    } catch (error) {
      console.log(error);
      setStatus("❌ Server Error");
    }
  };

  return (
    <>
      {/* 🌈 Internal CSS */}
      <style>{`
        .checkup-page {
          min-height: 100vh;
          padding: 30px;
          background: linear-gradient(135deg, #e6f7ff, #d9ecff);
          font-family: 'Poppins', sans-serif;
        }

        .checkup-box {
          max-width: 550px;
          margin: auto;
          padding: 25px;
          background: rgba(255,255,255,0.6);
          border-radius: 18px;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 20px rgba(0,123,255,0.25);
        }

        h2 {
          text-align: center;
          color: #005b99;
          margin-bottom: 20px;
          font-weight: 700;
        }

        select, input, textarea {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          border-radius: 10px;
          border: 2px solid #0080ff;
          font-size: 1rem;
        }

        .book-btn {
          width: 100%;
          padding: 14px;
          margin-top: 20px;
          background: linear-gradient(135deg, #007bff, #00aaff);
          border: none;
          color: white;
          font-size: 1.2rem;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
        }

        .book-btn:hover {
          background: linear-gradient(135deg, #0066cc, #0088ff);
          transform: scale(1.03);
        }

        .status-msg {
          margin-top: 15px;
          text-align: center;
          font-weight: 600;
        }
      `}</style>

      {/* UI */}
      <div className="checkup-page">
        <div className="checkup-box">
          <h2>Preventive Health Checkups</h2>

          <select name="package" onChange={handleChange}>
            <option value="">Select Package</option>
            <option value="Full Body Checkup">🩺 Full Body Checkup</option>
            <option value="Diabetes Profile">🍬 Diabetes Profile</option>
            <option value="Heart Screening">❤️ Heart Screening</option>
            <option value="Kidney & Liver Test">🧪 Kidney & Liver Test</option>
          </select>

          <input type="text" name="name" placeholder="Your Name" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} />
          <input type="number" name="phone" placeholder="Phone Number" onChange={handleChange} />

          <label>Date</label>
          <input type="date" name="date" onChange={handleChange} />

          <label>Time</label>
          <input type="time" name="time" onChange={handleChange} />

          <select name="payment_method" onChange={handleChange}>
            <option value="Online">Online Payment</option>
            <option value="Cash on Test Day">Cash on Test Day</option>
          </select>

          <textarea name="notes" rows="3" placeholder="Any health notes (optional)" onChange={handleChange}></textarea>

          <button className="book-btn" onClick={submitBooking}>Book Checkup</button>

          {status && <p className="status-msg">{status}</p>}
        </div>
      </div>
    </>
  );
}
