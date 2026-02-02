import React, { useState } from "react";
import "./HealthMonitoring.css";
import { FaHeartbeat } from "react-icons/fa";

export default function HealthMonitoring() {
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [heartRate, setHeartRate] = useState(null);

  const startMeasurement = () => {
    setIsMeasuring(true);
    setHeartRate(null);

    setTimeout(() => {
      const randomRate = Math.floor(Math.random() * (98 - 68 + 1)) + 68;
      setHeartRate(randomRate);
      setIsMeasuring(false);
    }, 3000);
  };

  return (
    <div className="monitoring-page">
      <div className="monitoring-card">
        <FaHeartbeat className="heart-icon" />

        <h2>Heart Rate Monitor</h2>
        <p className="text-light">
          Place your finger on your camera (simulated) and click Start.
        </p>

        {/* Start Button */}
        {!heartRate && !isMeasuring && (
          <button className="glow-btn" onClick={startMeasurement}>
            Start Measuring
          </button>
        )}

        {/* Loading */}
        {isMeasuring && (
          <div className="loading-section">
            <div className="pulse-loader"></div>
            <p>Measuring your heart rate...</p>
          </div>
        )}

        {/* Result */}
        {heartRate && (
          <div className="result-box">
            <h3>Your Heart Rate</h3>
            <p className="rate-value">{heartRate} BPM</p>

            <button className="glow-btn" onClick={startMeasurement}>
              Measure Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
