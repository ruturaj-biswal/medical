// src/Mycomponents/ForgotPassword.js
import React, { useState } from "react";
import "./Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendOTP = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem("resetEmail", email);
      setMessage("OTP sent! Check your email.");
      window.location.href = "/verify-otp";
    } else {
      setMessage(data.error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass">
        <h2>Forgot Password?</h2>
        <form onSubmit={sendOTP}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send OTP</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
