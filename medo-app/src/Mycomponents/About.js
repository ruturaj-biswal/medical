import React from "react";
import "./About.css";
import {
  FaVideo,
  FaUserMd,
  FaFileMedical,
  FaMobileAlt,
  FaAmbulance,
  FaHeartbeat,
  FaHospitalUser,
  FaBrain,
  FaNotesMedical,
  FaCalendarCheck,
  FaCapsules,
  FaHospitalAlt,
  FaFemale,
  FaRunning,
  FaChartLine,
} from "react-icons/fa";

export default function About() {
  return (
    <div className="about-container">

      {/* HERO SECTION */}
      <section className="about-hero">
        <h1>
          About <span>Health.io</span>
        </h1>
        <p>
          Health.io is a next-generation medical platform that brings healthcare,
          hospitals, medicines, emergency services, and digital wellness 
          directly to your fingertips.
        </p>
      </section>

      {/* MISSION + VISION */}
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          To make healthcare accessible, affordable, and instant for every
          citizen — from villages to metro cities — using AI, telemedicine, and
          smart digital tools.
        </p>

        <h2>Our Vision</h2>
        <p>
          To build India’s most trusted digital healthcare ecosystem where people
          can consult doctors, book therapies, buy medicines, store health
          records, and receive emergency help — all from one app.
        </p>
      </section>

      {/* KEY FEATURES */}
      <section className="about-section features">
        <h2>All Features of Health.io</h2>

        <div className="features-grid">

          <div className="feature-card">
            <FaVideo className="feature-icon" />
            <h3>Online Video Consultation</h3>
            <p>Connect with doctors anytime through HD video calls.</p>
          </div>

          <div className="feature-card">
            <FaUserMd className="feature-icon" />
            <h3>Doctor Appointment Booking</h3>
            <p>Book clinic or online appointments instantly.</p>
          </div>

          <div className="feature-card">
            <FaFileMedical className="feature-icon" />
            <h3>Digital Health Records</h3>
            <p>Store & access medical history securely on the cloud.</p>
          </div>

          <div className="feature-card">
            <FaCapsules className="feature-icon" />
            <h3>Online Medicine Delivery</h3>
            <p>Order medicines with doorstep delivery & tracking.</p>
          </div>

          <div className="feature-card">
            <FaHeartbeat className="feature-icon" />
            <h3>Health Monitoring</h3>
            <p>Monitor oxygen, heart rate & BP using camera sensors.</p>
          </div>

          <div className="feature-card">
            <FaAmbulance className="feature-icon" />
            <h3>Emergency Ambulance</h3>
            <p>Live tracking & one-tap 108 emergency call.</p>
          </div>

          <div className="feature-card">
            <FaHospitalAlt className="feature-icon" />
            <h3>Hospital Finder</h3>
            <p>Locate nearby hospitals or get suggestions by symptoms.</p>
          </div>

          <div className="feature-card">
            <FaNotesMedical className="feature-icon" />
            <h3>Preventive Health Checkups</h3>
            <p>Full body, heart, diabetes & wellness packages.</p>
          </div>

          <div className="feature-card">
            <FaBrain className="feature-icon" />
            <h3>Mental Health Support</h3>
            <p>
              Therapy booking, counsellor sessions, stress tests &
              depression quiz.
            </p>
          </div>

          <div className="feature-card">
            <FaCalendarCheck className="feature-icon" />
            <h3>Medicine Reminder</h3>
            <p>
              Pill tracking, notification alerts, weekly reports &
              "Taken/Missed" history.
            </p>
          </div>

          <div className="feature-card">
            <FaHospitalUser className="feature-icon" />
            <h3>Insurance Assistance</h3>
            <p>
              Upload policy, coverage check, AI claim estimator &
              cashless hospital list.
            </p>
          </div>

          <div className="feature-card">
            <FaFemale className="feature-icon" />
            <h3>Women’s Health Tracker</h3>
            <p>
              Track periods, ovulation, fertility window &
              personalised insights.
            </p>
          </div>

          <div className="feature-card">
            <FaRunning className="feature-icon" />
            <h3>Diet & Fitness Plans</h3>
            <p>
              AI diet generator, step tracker & hydration reminders.
            </p>
          </div>

          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>AI Health Assistant</h3>
            <p>Chatbot for symptom advice & medical query support.</p>
          </div>

        </div>
      </section>

      {/* BENEFITS */}
      <section className="about-section benefits">
        <h2>Why People Love Health.io</h2>
        <ul>
          <li>✔ 24×7 doctor consultation from anywhere</li>
          <li>✔ One app for medicines, hospitals & emergency services</li>
          <li>✔ AI-powered health monitoring & recommendations</li>
          <li>✔ Secure digital records with lifetime access</li>
          <li>✔ Designed for both rural and urban users</li>
          <li>✔ Fast ambulance & hospital navigation support</li>
          <li>✔ Full wellness ecosystem in one platform</li>
        </ul>
      </section>

      {/* FOOTER */}
      <footer className="about-footer">
        <h3>Health.io — Your Digital Health Partner</h3>
        <p>
          We’re redefining the future of healthcare in India — simple,
          affordable & accessible to everyone.
        </p>
      </footer>
    </div>
  );
}
