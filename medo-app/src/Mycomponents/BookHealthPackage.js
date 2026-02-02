import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookHealthPackage() {
  const { state: pkg } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    payment_method: "",
    notes: "",
  });

  if (!pkg) return <h2>No package selected</h2>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitBooking = async () => {
    if (!form.name || !form.email || !form.phone || !form.date || !form.time) {
      alert("Please fill all required fields!");
      return;
    }

    await fetch("http://localhost:5000/book-checkup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        package: pkg.name,
      }),
    });

    alert("Booking Successful! Check your Email.");
    navigate("/");
  };

  return (
    <>
      <style>{`
        .book-page {
          min-height: 100vh;
          padding: 25px;
          background: linear-gradient(135deg, #e3f2fd, #bbdefb);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Poppins';
        }
        .book-box {
          background: rgba(255,255,255,0.4);
          padding: 25px;
          width: 420px;
          border-radius: 16px;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        .book-box h2 {
          text-align: center;
          color: #004f88;
          font-weight: bold;
        }
        input, select, textarea {
          width: 100%;
          padding: 12px;
          margin-top: 12px;
          border-radius: 10px;
          border: 2px solid #007bff;
        }
        .book-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #007bff, #00aaff);
          color: white;
          border: none;
          border-radius: 12px;
          margin-top: 15px;
          font-size: 1.1rem;
          cursor: pointer;
        }
      `}</style>

      <div className="book-page">
        <div className="book-box">
          <h2>Book {pkg.name}</h2>

          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} />

          <input type="date" name="date" onChange={handleChange} />
          <input type="time" name="time" onChange={handleChange} />

          <select name="payment_method" onChange={handleChange}>
            <option value="">Select Payment Method</option>
            <option value="Online Payment">Online Payment</option>
            <option value="Cash on Sample Collection">Cash on Collection</option>
          </select>

          <textarea name="notes" placeholder="Any notes..." onChange={handleChange}></textarea>

          <button className="book-btn" onClick={submitBooking}>
            Confirm Booking
          </button>
        </div>
      </div>
    </>
  );
}
