// src/Mycomponents/VerifyOTP.js
import React, { useState } from "react";
import "./Auth.css";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const email = localStorage.getItem("resetEmail");

  const verifyOTP = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = "/reset-password";
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass">
        <h2>Verify OTP</h2>
        <form onSubmit={verifyOTP}>
          <input
            type="text"
            placeholder="Enter OTP"
            maxLength={7}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
        </form>
      </div>
    </div>
  );
}
