// src/Mycomponents/CheckupSuccess.js
import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function CheckupSuccess() {
  const { state } = useLocation();
  const booking = state?.booking;
  return (
    <div style={{padding:40, fontFamily:"Poppins"}}>
      <h2>✅ Booking Confirmed</h2>
      <p>Thanks {booking?.name || ""}, we sent confirmation to {booking?.email || "your email"}.</p>
      <div style={{background:"#f6fbff", padding:16, borderRadius:12, marginTop:16}}>
        <p><strong>Package:</strong> {booking?.package}</p>
        <p><strong>Date:</strong> {booking?.date} <strong>Time:</strong> {booking?.time}</p>
        <p><strong>Payment:</strong> {booking?.payment_method}</p>
      </div>

      <Link to="/" style={{display:"inline-block", marginTop:20}}>Back to Home</Link>
    </div>
  );
}
