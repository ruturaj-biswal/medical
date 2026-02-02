import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BuyMedicine() {
  const { state: med } = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const placeOrder = async () => {
    if (!name || !email || !address || !phone) {
      alert("Please fill all details.");
      return;
    }

    // 🔵 SEND ORDER TO BACKEND
    try {
      await fetch("http://localhost:5000/order-medicine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          medicine: med.name,
          price: med.price,
          address,
          phone,
        }),
      });
    } catch (error) {
      console.log("Email Error:", error);
    }

    navigate("/order-success", {
      state: { medicine: med, name, email, address, phone },
    });
  };

  if (!med)
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        No medicine selected
      </h2>
    );

  return (
    <>
      {/* ⭐ Internal CSS */}
      <style>{`
        .checkout-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #e0f7ff, #b3e5ff, #80d4ff);
          font-family: 'Poppins', sans-serif;
          padding: 20px;
        }

        .checkout-box {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(15px);
          padding: 30px;
          border-radius: 20px;
          width: 100%;
          max-width: 450px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          animation: fadeIn 0.8s ease;
        }

        h2 {
          color: #003f7f;
          font-weight: 700;
          text-align: center;
        }

        .checkout-details {
          display: flex;
          align-items: center;
          gap: 15px;
          background: rgba(255,255,255,0.3);
          padding: 15px;
          border-radius: 15px;
          margin-bottom: 20px;
        }

        .checkout-details img {
          width: 70px;
          height: 70px;
          border-radius: 12px;
          object-fit: cover;
        }

        input, textarea {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          border: 2px solid #007acc;
          border-radius: 12px;
          background: #fff;
          font-size: 1rem;
        }

        .place-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          background: linear-gradient(135deg, #007bff, #00a2ff);
          color: #fff;
          cursor: pointer;
          margin-top: 20px;
          transition: 0.3s;
        }

        .place-btn:hover {
          background: linear-gradient(135deg, #0066cc, #0088ff);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="checkout-page">
        <div className="checkout-box">
          <h2>Checkout</h2>

          {/* Selected Medicine */}
          <div className="checkout-details">
            <img src={med.image} alt={med.name} />
            <div>
              <h3>{med.name}</h3>
              <p>Price: ₹{med.price}</p>
            </div>
          </div>

          {/* New Fields */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            placeholder="Enter Delivery Address"
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>

          <input
            type="number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button className="place-btn" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
