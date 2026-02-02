// src/Mycomponents/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      navigate("/");
    } else {
      alert(data.error || "Invalid login credentials");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="glass-card">
        <h1 className="brand-title">Heal.io</h1>
        <h3 className="title">Login</h3>

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-box"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-box"
            required
          />

          <button type="submit" className="btn-primary">Login</button>
        </form>

        <p className="switch-text">
          Don't have an account? <Link to="/signup" className="switch-link">Sign Up</Link>
        </p>
        <p className="switch-text">
          Forgot password? <Link to="/forgot-password" className="switch-link">Reset Password</Link>
        </p>
      </div>
    </div>
  );
}
