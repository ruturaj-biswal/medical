// src/Mycomponents/ResetPassword.js
import React, { useState } from "react";
import "./Auth.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const email = localStorage.getItem("resetEmail");

  const resetPassword = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, new_password: password }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Password reset successful!");
      window.location.href = "/login";
      localStorage.removeItem("resetEmail");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass">
        <h2>Create New Password</h2>

        <form onSubmit={resetPassword}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
