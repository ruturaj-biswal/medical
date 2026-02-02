import React from "react";
import { useNavigate } from "react-router-dom";

export default function PreventiveHealthCheckups() {
  const navigate = useNavigate();

  const packages = [
    {
      id: 1,
      name: "Full Body Checkup",
      tests: "60+ Tests • Liver • Kidney • Thyroid • CBC • Diabetes",
      price: 1499,
      image: "https://cdn-icons-png.flaticon.com/512/2965/2965567.png",
    },
    {
      id: 2,
      name: "Diabetes Checkup",
      tests: "Blood Sugar • HbA1c • Urine Sugar • Lipid Profile",
      price: 799,
      image: "https://cdn-icons-png.flaticon.com/512/3194/3194766.png",
    },
    {
      id: 3,
      name: "Heart Care Checkup",
      tests: "ECG • Lipid Profile • Blood Pressure • Chest Screening",
      price: 1299,
      image: "https://cdn-icons-png.flaticon.com/512/4320/4320371.png",
    },
    {
      id: 4,
      name: "Women’s Wellness Checkup",
      tests: "Thyroid • CBC • Vitamin D • Iron • Hormone Tests",
      price: 1699,
      image: "https://cdn-icons-png.flaticon.com/512/984/984296.png",
    },
  ];

  const bookNow = (pkg) => {
    navigate("/book-health-package", { state: pkg });
  };

  return (
    <>
      {/* ⭐ Internal CSS (Glass UI + Animation) */}
      <style>{`
        .checkup-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #e8f3ff, #cbe7ff, #a7d8ff);
          padding: 40px 20px;
          font-family: 'Poppins', sans-serif;
          text-align: center;
        }

        .checkup-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #005b99;
          margin-bottom: 10px;
        }

        .checkup-subtitle {
          color: #0077c2;
          font-size: 1.1rem;
          margin-bottom: 30px;
        }

        .checkup-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 25px;
        }

        .checkup-card {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 18px;
          backdrop-filter: blur(12px);
          padding: 25px;
          text-align: center;
          box-shadow: 0px 6px 18px rgba(0, 123, 255, 0.25);
          transition: 0.3s ease;
        }

        .checkup-card:hover {
          transform: translateY(-8px);
          box-shadow: 0px 12px 28px rgba(0, 123, 255, 0.35);
        }

        .checkup-img {
          width: 90px;
          height: 90px;
          object-fit: contain;
          margin-bottom: 15px;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2));
        }

        .package-name {
          font-size: 1.3rem;
          font-weight: bold;
          color: #004f88;
        }

        .package-tests {
          font-size: 0.95rem;
          color: #005a99;
          margin-bottom: 10px;
        }

        .package-price {
          font-size: 1.2rem;
          color: #003f7f;
          font-weight: 700;
        }

        .book-btn {
          width: 100%;
          padding: 12px;
          margin-top: 12px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #007bff, #00aaff);
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .book-btn:hover {
          background: linear-gradient(135deg, #0066cc, #0088ff);
          transform: translateY(-3px);
        }
      `}</style>

      {/* ⭐ UI Section */}
      <div className="checkup-page">
        <h1 className="checkup-title">Preventive Health Checkups</h1>
        <p className="checkup-subtitle">
          Book health packages designed to keep you healthy — early detection saves lives.
        </p>

        <div className="checkup-grid">
          {packages.map((pkg) => (
            <div className="checkup-card" key={pkg.id}>
              <img src={pkg.image} alt={pkg.name} className="checkup-img" />
              <h3 className="package-name">{pkg.name}</h3>
              <p className="package-tests">{pkg.tests}</p>
              <p className="package-price">₹{pkg.price}</p>

              <button className="book-btn" onClick={() => bookNow(pkg)}>
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
