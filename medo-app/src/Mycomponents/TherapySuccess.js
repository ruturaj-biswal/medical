// TherapySuccess.js
import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function TherapySuccess() {
  const { state } = useLocation();
  const booking = state?.booking;

  return (
    <>
      <style>{`
        .ts-page { min-height:100vh; display:flex; align-items:center; justify-content:center; font-family:Poppins; background:linear-gradient(135deg,#e9f9f2,#e6f7ff); padding:30px; }
        .ts-box { background:#fff; padding:26px; border-radius:12px; max-width:600px; box-shadow:0 10px 30px rgba(0,0,0,0.06); text-align:center; }
        .ts-box h2 { color:#0066cc; }
        .summary { text-align:left; margin-top:12px; padding:10px; background:#f6fbff; border-radius:8px; }
        .home-btn { display:inline-block; margin-top:14px; padding:10px 14px; background:#007bff; color:#fff; border-radius:10px; text-decoration:none; }
      `}</style>

      <div className="ts-page">
        <div className="ts-box">
          <h2>✅ Booking Confirmed</h2>
          <p>We've sent a booking confirmation email to <strong>{booking?.email}</strong>.</p>

          <div className="summary">
            <p><strong>Patient:</strong> {booking?.patient_name}</p>
            <p><strong>Counsellor:</strong> {booking?.counsellor}</p>
            <p><strong>Date & Time:</strong> {booking?.date} {booking?.time}</p>
            <p><strong>Notes:</strong> {booking?.notes || "—"}</p>
          </div>

          <Link to="/counsellors" className="home-btn">Back to Counsellors</Link>
        </div>
      </div>
    </>
  );
}
