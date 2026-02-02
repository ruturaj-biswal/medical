// src/Mycomponents/VideoConsultation.js
import React, { useState } from "react";
import "./VideoConsultation.css";

export default function VideoConsultation() {
  const [doctors] = useState([
    {
      id: 1,
      name: "Dr. Ananya Sharma",
      specialization: "Cardiologist",
      experience: "10 years",
      contact: "+91 7809995673",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Dr. Rajiv Mehta",
      specialization: "Dermatologist",
      experience: "7 years",
      contact: "+91 7656003621",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Dr. Sneha Patil",
      specialization: "Pediatrician",
      experience: "8 years",
      contact: "+91 8917404308",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ]);

  // Function for starting video call
  const startVideoCall = (number) => {
    alert(`Starting video call with ${number}...`);
    window.open(`https://meet.jit.si/${number.replace(/\s/g, "")}`, "_blank");
  };

  return (
    <div className="video-consultation-container">
      <h1 className="vc-title">Video Consultation</h1>
      <p className="vc-subtitle">
        Connect instantly with our trusted healthcare professionals.
      </p>

      <div className="doctor-list">
        {doctors.map((doc) => (
          <div className="doctor-card" key={doc.id}>
            <img src={doc.image} alt={doc.name} className="doctor-image" />
            <h3>{doc.name}</h3>
            <p><strong>Specialization:</strong> {doc.specialization}</p>
            <p><strong>Experience:</strong> {doc.experience}</p>
            <p><strong>Contact:</strong> {doc.contact}</p>
            <button
              className="video-call-btn"
              onClick={() => startVideoCall(doc.contact)}
            >
              🎥 Start Video Call
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
