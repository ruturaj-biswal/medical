import React, { useState } from "react";

export default function MentalHealthSupport() {
  const [stressScore, setStressScore] = useState(null);

  const questions = [
    "I feel nervous or anxious frequently.",
    "I find it hard to relax.",
    "I have trouble sleeping or staying asleep.",
    "I overthink small problems often.",
    "I feel tired or low energy most days.",
  ];

  const calculateStress = () => {
    let score = 0;
    document.querySelectorAll(".stress-input").forEach((i) => {
      score += Number(i.value);
    });
    setStressScore(score);
  };

  return (
    <>
      {/* ⭐ INTERNAL CSS */}
      <style>{`
        .mh-page {
          min-height: 100vh;
          padding: 40px 20px;
          background: linear-gradient(135deg, #e8faff, #cbe7ff, #b3d8ff);
          font-family: 'Poppins', sans-serif;
        }

        .mh-box {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(12px);
          padding: 30px;
          border-radius: 20px;
          max-width: 650px;
          margin: auto;
          box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.15);
          animation: fadeIn 0.7s ease-in-out;
        }

        .mh-title {
          text-align: center;
          font-size: 2.2rem;
          font-weight: 700;
          color: #005b99;
          margin-bottom: 10px;
        }

        .mh-sub {
          text-align: center;
          color: #0077c2;
          margin-bottom: 25px;
        }

        .question-box {
          background: rgba(255, 255, 255, 0.35);
          padding: 15px;
          border-radius: 12px;
          margin-bottom: 15px;
        }

        .question {
          font-size: 1.05rem;
          margin-bottom: 10px;
          color: #004f88;
        }

        select {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          border: 2px solid #007acc;
        }

        .btn {
          width: 100%;
          padding: 12px;
          font-size: 1.1rem;
          font-weight: bold;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #007bff, #00aaff);
          color: white;
          cursor: pointer;
          margin-top: 20px;
          transition: 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-3px);
          background: linear-gradient(135deg, #0066cc, #0088ff);
        }

        .result-box {
          margin-top: 20px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.35);
          border-radius: 12px;
        }

        .counsel-box {
          margin-top: 30px;
          padding: 20px;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.3);
        }

        .counsel-btn {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 12px;
          background: #ff5e5e;
          color: white;
          font-weight: 600;
          margin-top: 10px;
          cursor: pointer;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ⭐ UI SECTION */}
      <div className="mh-page">
        <div className="mh-box">
          <h1 className="mh-title">🧠 Mental Health Support</h1>
          <p className="mh-sub">
            Stress test • Depression quiz • Counselling • Therapy Booking
          </p>

          {/* ⭐ Stress Test Section */}
          {questions.map((q, index) => (
            <div className="question-box" key={index}>
              <p className="question">{q}</p>
              <select className="stress-input">
                <option value="0">Never</option>
                <option value="1">Sometimes</option>
                <option value="2">Often</option>
                <option value="3">Always</option>
              </select>
            </div>
          ))}

          <button className="btn" onClick={calculateStress}>
            Submit Stress Test
          </button>

          {/* ⭐ Result Section */}
          {stressScore !== null && (
            <div className="result-box">
              <h3>Your Stress Score: {stressScore}</h3>
              <p>
                {stressScore <= 4
                  ? "😊 Low Stress — You're doing well!"
                  : stressScore <= 8
                  ? "😟 Moderate Stress — Take breaks & relax."
                  : "⚠ High Stress — Consider talking to a counsellor."}
              </p>
            </div>
          )}

          {/* ⭐ Counselling Options */}
          <div className="counsel-box">
            <h3>Need Support?</h3>

            <button
              className="counsel-btn"
              onClick={() => (window.location.href = "/therapy-booking")}
            >
              Book Therapy Session
            </button>

            <button
              className="counsel-btn"
              onClick={() => window.open("tel:104")}
            >
              Call Mental Health Helpline (104)
            </button>

            <button
              className="counsel-btn"
              onClick={() => (window.location.href = "/counsellors")}
            >
              Talk to Counsellors
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
