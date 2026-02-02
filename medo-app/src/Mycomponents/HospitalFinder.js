import React, { useState } from "react";

export default function HospitalFinder() {
  const [coords, setCoords] = useState(null);
  const [symptom, setSymptom] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // ⭐ Government Hospitals Database (Example)
  const governmentHospitals = [
    { name: "AIIMS Bhubaneswar", dept: "Multi-speciality" },
    { name: "SCB Medical College, Cuttack", dept: "General, Emergency" },
    { name: "MKCG Medical College, Berhampur", dept: "General" },
    { name: "Capital Hospital, Bhubaneswar", dept: "Emergency & OPD" },
  ];

  // ⭐ Symptom-based Suggestions
  const symptomMap = {
    fever: "General Medicine",
    cough: "Pulmonology",
    pain: "Emergency / General",
    heart: "Cardiology",
    fracture: "Orthopedics",
    pregnancy: "Gynecology",
  };

  // 📍 Detect User Location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Your device does not support location access.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("Please allow location access.")
    );
  };

  // 🔍 Suggest Hospitals Based on Symptom
  const findHospitalsBySymptom = () => {
    if (!symptom) return;

    const department = symptomMap[symptom.toLowerCase()] || "General Medicine";

    const results = governmentHospitals.map((h) => ({
      ...h,
      match: department,
    }));

    setSuggestions(results);
  };

  return (
    <>
      {/* ⭐ Internal CSS */}
      <style>{`
        .finder-page {
          min-height: 100vh;
          padding: 40px 20px;
          background: linear-gradient(135deg, #d7ecff, #b6dcff, #89c4ff);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Poppins', sans-serif;
        }

        .finder-box {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(15px);
          padding: 30px;
          border-radius: 20px;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 10px 30px rgba(0, 80, 180, 0.3);
          animation: fadeIn 0.7s ease-in-out;
          text-align: center;
        }

        h2 {
          font-weight: 700;
          color: #003d80;
        }

        input {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 2px solid #0077cc;
          margin-top: 15px;
          font-size: 1rem;
        }

        .btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 12px;
          margin-top: 15px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        .loc-btn {
          background: linear-gradient(135deg, #0066ff, #0099ff);
          color: white;
        }

        .loc-btn:hover {
          background: #0052cc;
        }

        .symptom-btn {
          background: white;
          border: 2px solid #0066ff;
          color: #0066ff;
        }

        .symptom-btn:hover {
          background: #0066ff;
          color: white;
        }

        .hospital-list {
          margin-top: 20px;
          text-align: left;
        }

        .hospital-item {
          background: rgba(255, 255, 255, 0.3);
          padding: 12px;
          border-radius: 12px;
          margin-bottom: 10px;
        }

        .gps-box {
          background: rgba(255, 255, 255, 0.25);
          padding: 15px;
          border-radius: 12px;
          margin-top: 15px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ⭐ UI Section */}
      <div className="finder-page">
        <div className="finder-box">
          <h2>🏥 Hospital Finder</h2>
          <p>Find the best nearby hospitals or get suggestions based on your symptoms</p>

          {/* 📍 Location Button */}
          <button className="btn loc-btn" onClick={detectLocation}>
            📍 Detect My Location
          </button>

          {/* Show GPS Coordinates */}
          {coords && (
            <div className="gps-box">
              <p><strong>Your Location:</strong></p>
              <p>Latitude: {coords.lat.toFixed(5)}</p>
              <p>Longitude: {coords.lng.toFixed(5)}</p>

              <button
                className="btn loc-btn"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/hospitals/@${coords.lat},${coords.lng},15z`,
                    "_blank"
                  )
                }
              >
                🏥 Find Nearby Hospitals (Google Maps)
              </button>
            </div>
          )}

          {/* 🔍 Symptom Search */}
          <input
            type="text"
            placeholder="Enter symptom (e.g., fever, pain, heart)"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
          />

          <button className="btn symptom-btn" onClick={findHospitalsBySymptom}>
            🔎 Suggest Hospitals
          </button>

          {/* Suggestions List */}
          {suggestions.length > 0 && (
            <div className="hospital-list">
              <h3>🏥 Suggested Government Hospitals:</h3>

              {suggestions.map((h, idx) => (
                <div className="hospital-item" key={idx}>
                  <strong>{h.name}</strong>
                  <p>Department Match: {h.match}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
