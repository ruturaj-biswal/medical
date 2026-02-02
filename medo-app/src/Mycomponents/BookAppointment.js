import React, { useState, useEffect } from "react";
import "./BookAppointment.css";
import { useLocation } from "react-router-dom";

export default function BookAppointment() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const doctor = queryParams.get("doctor") || "Unknown Doctor";

  const [form, setForm] = useState({
    patient_name: "",
    email: "",
    date: "",
    time: "",
    notes: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Booking appointment...");

    try {
      const response = await fetch("http://localhost:5000/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, doctor }),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus("✅ Appointment booked successfully! You will receive a confirmation email.");
        setForm({ patient_name: "", email: "", date: "", time: "", notes: "" });
      } else {
        setStatus("❌ Failed: " + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("❌ Something went wrong.");
    }
  };

  return (
    <div className="appointment-page">
      <div className="appointment-container">
        <h2>Book Appointment with <span>{doctor}</span></h2>
        <form className="appointment-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="patient_name"
            placeholder="Your Full Name"
            value={form.patient_name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />
          <textarea
            name="notes"
            placeholder="Additional notes (optional)"
            value={form.notes}
            onChange={handleChange}
          />
          <button type="submit">Confirm Appointment</button>
        </form>
        {status && <p className="status">{status}</p>}
      </div>
    </div>
  );
}
