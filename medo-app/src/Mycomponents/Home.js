import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const features = [
    { id: 1, title: "Video Consultation", desc: "Secure video/audio calls with doctors", link: "/video-consultation", emoji: "💬" },
    { id: 2, title: "Digital Health Records", desc: "Store prescriptions & reports securely", link: "/digital-health-records", emoji: "📁" },
    { id: 3, title: "Online Medicine Delivery", desc: "Order medicines to your doorstep", link: "/medicines", emoji: "💊" },
    { id: 4, title: "Health Monitoring", desc: "Heart rate, BP & O2 monitoring", link: "/health-monitoring", emoji: "❤️" },
    { id: 5, title: "Emergency Ambulance", desc: "Locate and call nearest ambulance", link: "/emergency-ambulance", emoji: "🚑" },
    { id: 6, title: "Hospital Finder", desc: "Find nearby hospitals & govt priority", link: "/hospital-finder", emoji: "🏥" },
    { id: 7, title: "Preventive Checkups", desc: "Book full body/diabetes/heart packages", link: "/preventive-checkups", emoji: "🧪" },
    { id: 8, title: "Mental Health Support", desc: "Counsellors, therapy & quizzes", link: "/mental-health-support", emoji: "🧠" },
    { id: 9, title: "Kiosk & Call Center", desc: "Help for non-smartphone users", link: "/koishik-call-center", emoji: "📞" },
    { id: 10, title: "Medicine Reminder", desc: "Pill reminders & weekly reports", link: "/medicine-reminder", emoji: "⏰" },
    { id: 11, title: "Insurance Assistance", desc: "Upload policy & claim support", link: "/insurance-assistance", emoji: "🛡️" },
    { id: 12, title: "Pharmacy Updates", desc: "Real-time medicine availability", link: "/pharmacyUpdates", emoji: "📢" },
    { id: 13, title: "Chatbot", desc: "Ask anything about your health", link: "/chatbot", emoji: "🤖" }
  ];

  return (
    <div className="home-container">

      {/* HERO */}
      <header className="hero-section">
        <div className="hero-inner glass">
          <div className="hero-left">
            <h1 className="hero-title">
              Welcome to <span>Health.io</span>
            </h1>
            <p className="hero-subtitle">
              Telemedicine • Digital Health • Smart Pharmacy • AI Health Support
            </p>

            <div className="hero-buttons">
              <Link to="/doctors" className="btn primary-lg">Consult a Doctor</Link>
              <Link to="/pharmacies" className="btn secondary-lg">Find a Pharmacy</Link>
            </div>

            <div className="quick-features">
              <strong>Quick Access:</strong>
              <ul>
                <li>Video Consultations</li>
                <li>Order Medicines</li>
                <li>Emergency Help</li>
              </ul>
            </div>
          </div>

          <div className="hero-right">
            <div className="app-mockup">
              <div className="mock-screen">
                <div className="mock-header">Health.io</div>
                <div className="mock-body">
                  <div className="mock-card">Book Appointment</div>
                  <div className="mock-card">My Records</div>
                  <div className="mock-card">Order Medicines</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* FEATURES */}
      <section className="features-section">
        <h2 className="section-title">
          Why Choose <span>Health.io</span>?
        </h2>
        <p className="section-sub">
          A complete healthcare platform for cities and rural areas — offline-first enabled.
        </p>

        <div className="features-grid">
          {features.map((f) => (
            <Link key={f.id} to={f.link} className="feature-card">
              <div className="feature-emoji">{f.emoji}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
              <div className="feature-actions">
                <span className="badge">Available</span>
                <button className="explore-btn">Explore</button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW — Explore More Services Section */}
      <section className="more-services-section">
        <div className="glass more-card">
          <h2>Want More Health Services?</h2>
          <p>
            Explore our full list of 12+ healthcare services — all in one place.
          </p>

          <Link to="/services" className="btn primary-lg">
            Explore All Services
          </Link>
        </div>
      </section>

          {/* EXPLORE MORE SERVICES SECTION */}
<section className="more-services-section">
  <Link to="/services" className="more-services-btn">
    Explore More Services <span className="arrow">→</span>
  </Link>
</section>

    </div>
  );
}
