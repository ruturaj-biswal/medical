import React, { useState } from "react";

export default function InsuranceAssistance() {
  const [policyFile, setPolicyFile] = useState(null);

  const handleUpload = (e) => {
    setPolicyFile(e.target.files[0]);
    alert("Policy uploaded successfully! (Demo)");
  };

  return (
    <>
      <style>{`
        .insurance-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #e0f7ff, #c2e9ff, #a6ddff);
          padding: 40px 20px;
          display: flex;
          justify-content: center;
          font-family: 'Poppins', sans-serif;
        }

        .insurance-box {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(12px);
          width: 100%;
          max-width: 600px;
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 8px 25px rgba(0, 100, 200, 0.2);
        }

        h2 {
          color: #005b99;
          font-weight: 700;
          margin-bottom: 10px;
        }

        p {
          color: #004a7a;
          margin-bottom: 20px;
        }

        .upload-box {
          border: 2px dashed #007bff;
          padding: 25px;
          border-radius: 15px;
          background: rgba(255,255,255,0.4);
          cursor: pointer;
        }

        .upload-box:hover {
          background: rgba(255,255,255,0.6);
        }

        .action-btn {
          margin-top: 20px;
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #007bff, #00aaff);
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
        }

        .action-btn:hover {
          transform: translateY(-3px);
          background: linear-gradient(135deg, #0066cc, #0088ff);
        }

        .section-title {
          margin-top: 25px;
          font-size: 1.3rem;
          font-weight: 600;
          color: #004f88;
        }

        .hospital-list {
          margin-top: 15px;
          text-align: left;
        }

        .hospital-card {
          background: rgba(255,255,255,0.5);
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 10px;
          box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
        }
      `}</style>

      <div className="insurance-page">
        <div className="insurance-box">
          <h2>Health Insurance Assistance</h2>
          <p>Upload your policy, check coverage & find cashless hospitals.</p>

          {/* Upload Policy */}
          <label className="upload-box">
            <strong>📄 Upload Insurance Policy (PDF)</strong>
            <input 
              type="file" 
              accept="application/pdf"
              onChange={handleUpload}
              style={{ display: "none" }} 
            />
          </label>

          {/* AI Claim Estimator */}
          <button className="action-btn">
            🤖 AI Claim Estimator
          </button>

          {/* Cashless Hospitals */}
          <h3 className="section-title">🏥 Cashless Hospitals Near You</h3>
          <div className="hospital-list">
            <div className="hospital-card">✔ SCB Medical College, Cuttack</div>
            <div className="hospital-card">✔ AIIMS Bhubaneswar</div>
            <div className="hospital-card">✔ SUM Hospital, Bhubaneswar</div>
          </div>

          <button 
            className="action-btn"
            onClick={() => window.open("https://www.google.com/maps/search/hospitals+near+me", "_blank")}
          >
            📍 Open in Maps
          </button>
        </div>
      </div>
    </>
  );
}
