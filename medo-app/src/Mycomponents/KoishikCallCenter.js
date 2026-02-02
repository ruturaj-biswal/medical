// src/Mycomponents/KoishikCallCenter.js
import React from "react";
import "./KoishikCallCenter.css";
import { FaPhoneAlt, FaHeadset, FaClock, FaUserMd, FaHospitalAlt } from "react-icons/fa";

export default function KoishikCallCenter() {
  const helplines = [
    { title: "General Health Support", number: "+91 7656 003 621" },
    { title: "Doctor On-Call", number: "+91 9348 220 451" },
    { title: "Emergency Ambulance", number: "108" },
    { title: "Women's Health Support", number: "+91 9937 501 882" },
  ];

  return (
    <div className="callcenter-page">
      <div className="callcenter-container">
        
        <h1 className="call-title">
          <FaHeadset /> Koishik Call Center
        </h1>

        <p className="call-subtitle">
          24×7 Tele-Health Support for Rural & Urban Patients  
        </p>

        {/* Working Hours */}
        <div className="hours-box">
          <FaClock className="icon" />
          <div>
            <h3>Working Hours</h3>
            <p>Available 24×7 — Every day</p>
          </div>
        </div>

        {/* Services */}
        <h2 className="section-header">📌 Services We Provide</h2>
        <div className="service-grid">
          <div className="service-card">
            <FaUserMd className="service-icon" />
            <h3>Doctor Assistance</h3>
            <p>Connect with a doctor for immediate guidance.</p>
          </div>

          <div className="service-card">
            <FaHospitalAlt className="service-icon" />
            <h3>Hospital Guidance</h3>
            <p>Find nearest hospital & emergency support.</p>
          </div>

          <div className="service-card">
            <FaHeadset className="service-icon" />
            <h3>Patient Support</h3>
            <p>Track reports, medicines & appointment help.</p>
          </div>
        </div>

        {/* Helpline Numbers */}
        <h2 className="section-header">📞 Helpline Numbers</h2>

        <div className="helpline-list">
          {helplines.map((h, index) => (
            <div className="helpline-card" key={index}>
              <h3>{h.title}</h3>
              <p>{h.number}</p>

              <a href={`tel:${h.number}`} className="call-btn">
                <FaPhoneAlt /> Call Now
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
