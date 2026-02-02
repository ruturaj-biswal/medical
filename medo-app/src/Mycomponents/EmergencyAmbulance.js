import React, { useState } from "react";

export default function EmergencyAmbulance() {
  const [locationGranted, setLocationGranted] = useState(false);
  const [coords, setCoords] = useState(null);

  // 📍 Get User Location
  const getLocation = () => {
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
        setLocationGranted(true);
      },
      () => alert("Please allow location access to find nearby ambulances.")
    );
  };

  return (
    <>
      {/* ⭐ Internal CSS */}
      <style>{`
        .ambulance-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #ffdde1, #ffb3b3, #ff8080);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 30px;
          font-family: 'Poppins', sans-serif;
        }

        .ambulance-box {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(15px);
          padding: 30px;
          border-radius: 20px;
          width: 100%;
          max-width: 450px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(255, 0, 0, 0.25);
          animation: fadeIn 0.6s ease-in-out;
        }

        .ambulance-box h2 {
          color: #b30000;
          font-size: 2rem;
          font-weight: 700;
        }

        .ambulance-icon {
          font-size: 80px;
          color: #ff0000;
          margin-bottom: 20px;
          animation: siren 1s infinite alternate;
        }

        @keyframes siren {
          0% { opacity: 0.5; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.1); }
        }

        .subtext {
          color: #660000;
          margin-bottom: 20px;
          font-size: 1.1rem;
        }

        .loc-btn, .call-btn {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          margin-top: 15px;
          transition: 0.3s;
        }

        .loc-btn {
          background: linear-gradient(135deg, #ff3333, #ff6666);
          color: white;
        }

        .loc-btn:hover {
          background: linear-gradient(135deg, #e60000, #ff4d4d);
          transform: translateY(-3px);
        }

        .call-btn {
          background: white;
          border: 2px solid #ff1a1a;
          color: #ff1a1a;
        }

        .call-btn:hover {
          background: #ff1a1a;
          color: white;
          transform: translateY(-3px);
        }

        .location-box {
          margin-top: 20px;
          padding: 15px;
          background: rgba(255, 180, 180, 0.3);
          border-radius: 15px;
          color: #660000;
          font-weight: 600;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ⭐ UI Section */}
      <div className="ambulance-page">
        <div className="ambulance-box">
          <div className="ambulance-icon">🚑</div>

          <h2>Emergency Ambulance Service</h2>
          <p className="subtext">
            Find the nearest ambulance instantly. Your safety is our priority.
          </p>

          <button className="loc-btn" onClick={getLocation}>
            📍 Detect My Location
          </button>

          {locationGranted && coords && (
            <div className="location-box">
              <p><strong>Your Location:</strong></p>
              <p>Latitude: {coords.lat.toFixed(5)}</p>
              <p>Longitude: {coords.lng.toFixed(5)}</p>

              <button
                className="loc-btn"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/ambulance/@${coords.lat},${coords.lng},15z`,
                    "_blank"
                  )
                }
              >
                🚨 Find Nearby Ambulances
              </button>
            </div>
          )}

          <button
            className="call-btn"
            onClick={() => window.open("tel:108")}
          >
            📞 Call 108 (Emergency)
          </button>
        </div>
      </div>
    </>
  );
}
