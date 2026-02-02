import React from "react";
import { useNavigate } from "react-router-dom";

export default function Medicines() {
  const navigate = useNavigate();

  // ⭐ Medicines List With Image URLs
  const medicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      price: 35,
      image: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png",
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      price: 120,
      image: "https://cdn-icons-png.flaticon.com/512/3194/3194766.png",
    },
    {
      id: 3,
      name: "Cough Syrup",
      price: 95,
      image: "https://cdn-icons-png.flaticon.com/512/4320/4320371.png",
    },
    {
      id: 4,
      name: "ORS Packet",
      price: 20,
      image: "https://cdn-icons-png.flaticon.com/512/984/984296.png",
    },
  ];

  const buyNow = (med) => {
    navigate("/buy-medicine", { state: med });
  };

  return (
    <>
      {/* ⭐ Internal CSS */}
      <style>{`
        .med-page {
          min-height: 100vh;
          padding: 30px 20px;
          background: linear-gradient(135deg, #e6f7ff, #cceeff);
          font-family: 'Poppins', sans-serif;
          text-align: center;
        }

        .med-title {
          font-size: 2.3rem;
          font-weight: 700;
          color: #005b99;
        }

        .med-subtitle {
          color: #0077c2;
          margin-bottom: 30px;
          font-size: 1.1rem;
        }

        .med-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 25px;
          padding: 10px;
        }

        .med-card {
          background: white;
          padding: 20px;
          border-radius: 18px;
          box-shadow: 0 6px 20px rgba(0, 123, 255, 0.18);
          transition: 0.3s ease-in-out;
        }

        .med-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 28px rgba(0, 123, 255, 0.28);
        }

        .med-img {
          width: 90px;
          height: 90px;
          object-fit: contain;
          margin-bottom: 10px;
          filter: drop-shadow(0 3px 6px rgba(0,0,0,0.2));
        }

        .price {
          font-size: 1.2rem;
          font-weight: bold;
          color: #004f88;
        }

        .buy-btn {
          background: linear-gradient(135deg, #007bff, #00aaff);
          border: none;
          padding: 12px 20px;
          width: 100%;
          border-radius: 12px;
          color: white;
          margin-top: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .buy-btn:hover {
          background: linear-gradient(135deg, #0066cc, #0088ff);
          transform: translateY(-3px);
        }

        /* ⭐ Contact Section */
        .contact-box {
          margin-top: 50px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 15px;
          width: 90%;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
        }

        .contact-box h3 {
          color: #005b99;
          margin-bottom: 10px;
        }

        .contact-item {
          font-size: 1.1rem;
          color: #003d66;
          margin-top: 8px;
        }

        .contact-item span {
          font-weight: bold;
        }
      `}</style>

      {/* ⭐ UI Section */}
      <div className="med-page">
        <h2 className="med-title">Online Medicine Delivery</h2>
        <p className="med-subtitle">Fast delivery • 100% Genuine Medicines</p>

        <div className="med-grid">
          {medicines.map((med) => (
            <div className="med-card" key={med.id}>
              <img src={med.image} alt={med.name} className="med-img" />
              <h3>{med.name}</h3>
              <p className="price">₹{med.price}</p>

              <button className="buy-btn" onClick={() => buyNow(med)}>
                Buy Now
              </button>
            </div>
          ))}
        </div>

        {/* ⭐ Contact Support Box */}
        <div className="contact-box">
          <h3>Need Help Ordering Medicines?</h3>
          <p className="contact-item">
            📧 Email: <span>healthio.support@gmail.com</span>
          </p>
          <p className="contact-item">
            📞 Phone: <span>+91 7656003621</span>
          </p>
        </div>
      </div>
    </>
  );
}
