import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function OrderSuccess() {
  const { state } = useLocation();

  return (
    <>
      {/* 🔥 Inline CSS */}
      <style>{`
        .success-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #c9e7ff, #eaf4ff, #ffffff);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: "Poppins", sans-serif;
        }

        .success-box {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 35px;
          max-width: 450px;
          width: 100%;
          text-align: center;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          animation: pop 0.5s ease;
        }

        @keyframes pop {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .success-box h2 {
          color: #0077cc;
          margin-bottom: 10px;
          font-size: 26px;
          font-weight: 700;
        }

        .success-box p {
          color: #004d80;
          margin-bottom: 20px;
          font-size: 16px;
        }

        .summary {
          background: rgba(255, 255, 255, 0.4);
          border-radius: 15px;
          padding: 20px;
          text-align: left;
          margin-bottom: 25px;
        }

        .summary h3 {
          margin-bottom: 10px;
          color: #005fa3;
        }

        .summary p {
          margin: 4px 0;
          color: #003d66;
          font-size: 15px;
        }

        .home-btn {
          display: inline-block;
          background: #007bff;
          color: white;
          padding: 12px 25px;
          border-radius: 10px;
          font-weight: 600;
          text-decoration: none;
          transition: 0.3s;
        }

        .home-btn:hover {
          background: #005bb5;
          transform: translateY(-3px);
        }
      `}</style>

      {/* UI */}
      <div className="success-page">
        <div className="success-box">
          <h2>🎉 Order Placed Successfully!</h2>

          <p>Your medicine will be delivered soon.</p>

          <div className="summary">
            <h3>Order Summary</h3>
            <p>📦 Medicine: {state?.medicine?.name}</p>
            <p>💰 Price: ₹{state?.medicine?.price}</p>
            <p>🏠 Address: {state?.address}</p>
            <p>📞 Phone: {state?.phone}</p>
          </div>

          <Link to="/medicines" className="home-btn">
            Order More Medicines
          </Link>
        </div>
      </div>
    </>
  );
}
