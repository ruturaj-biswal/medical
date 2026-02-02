import React, { useState } from "react";

export default function WomensHealthTracker() {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);

  const calculateCycle = () => {
    if (!lastPeriod) {
      alert("Please enter your last period date");
      return;
    }

    const last = new Date(lastPeriod);
    const nextPeriod = new Date(last);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

    const ovulation = new Date(last);
    ovulation.setDate(ovulation.getDate() + (cycleLength - 14));

    setResult({
      nextPeriod: nextPeriod.toDateString(),
      ovulation: ovulation.toDateString(),
      symptoms,
    });
  };

  return (
    <>
      {/* ⭐ Internal CSS */}
      <style>{`
        .women-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #ffe6f2, #ffccf2, #ffb3e6);
          padding: 35px 20px;
          font-family: 'Poppins', sans-serif;
          text-align: center;
        }

        .women-box {
          max-width: 480px;
          margin: auto;
          background: rgba(255, 255, 255, 0.3);
          padding: 25px;
          backdrop-filter: blur(12px);
          border-radius: 20px;
          box-shadow: 0 8px 20px rgba(255, 0, 200, 0.25);
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        h2 {
          color: #cc0066;
          font-weight: 700;
        }

        input, textarea, select {
          width: 100%;
          padding: 12px;
          margin-top: 12px;
          border-radius: 12px;
          border: 2px solid #ff4da6;
          outline: none;
        }

        .track-btn {
          width: 100%;
          padding: 14px;
          margin-top: 18px;
          background: linear-gradient(135deg, #ff3399, #ff66cc);
          border: none;
          color: white;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        .track-btn:hover {
          background: linear-gradient(135deg, #e60073, #ff33aa);
          transform: translateY(-3px);
        }

        .result-box {
          margin-top: 20px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 15px;
          text-align: left;
          color: #660033;
        }
      `}</style>

      {/* ⭐ UI */}
      <div className="women-page">
        <div className="women-box">
          <h2>Women’s Health Tracker 🌸</h2>
          <p>Track period cycle, ovulation & understand your body better.</p>

          <input
            type="date"
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
          />

          <select
            value={cycleLength}
            onChange={(e) => setCycleLength(Number(e.target.value))}
          >
            {[26, 27, 28, 29, 30, 31, 32].map((day) => (
              <option key={day} value={day}>
                {day} Days Cycle
              </option>
            ))}
          </select>

          <textarea
            rows="3"
            placeholder="Enter symptoms (optional)..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          ></textarea>

          <button className="track-btn" onClick={calculateCycle}>
            Calculate Cycle
          </button>

          {result && (
            <div className="result-box">
              <h3>📅 Cycle Prediction</h3>
              <p><strong>Next Period:</strong> {result.nextPeriod}</p>
              <p><strong>Ovulation Day:</strong> {result.ovulation}</p>

              {result.symptoms && (
                <>
                  <h4>📝 Logged Symptoms:</h4>
                  <p>{result.symptoms}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
