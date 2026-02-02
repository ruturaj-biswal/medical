import React from "react";
import "./Doctors.css";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Doctors() {
  const navigate = useNavigate();

  const doctors = [
    {
      id: 1,
      name: "Dr. Rohan Mehta",
      specialty: "Cardiologist",
      experience: "12 Years Experience",
      location: "Apollo Hospital, Mumbai",
      image: "https://cdn-icons-png.flaticon.com/512/387/387561.png",
    },
    {
      id: 2,
      name: "Dr. Sneha Patil",
      specialty: "Dermatologist",
      experience: "8 Years Experience",
      location: "Fortis Hospital, Pune",
      image: "https://cdn-icons-png.flaticon.com/512/2922/2922506.png",
    },
    {
      id: 3,
      name: "Dr. Amit Sharma",
      specialty: "Orthopedic Surgeon",
      experience: "10 Years Experience",
      location: "AIIMS, Delhi",
      image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      id: 4,
      name: "Dr. Priya Nair",
      specialty: "Pediatrician",
      experience: "6 Years Experience",
      location: "KIMS Hospital, Kerala",
      image: "https://cdn-icons-png.flaticon.com/512/6997/6997662.png",
    },
  ];

  const handleBook = (doctorName) => {
    navigate(`/book-appointment?doctor=${encodeURIComponent(doctorName)}`);
  };

  return (
    <div className="doctors-page">
      <h2 className="doctors-title">Meet Our Top Doctors</h2>
      <p className="doctors-subtitle">
        Connect with experienced and trusted healthcare professionals across various specializations.
      </p>

      <div className="doctors-grid">
        {doctors.map((doc) => (
          <div className="doctor-card" key={doc.id}>
            <img src={doc.image} alt={doc.name} className="doctor-img" />
            <h3>{doc.name}</h3>
            <p className="specialty">{doc.specialty}</p>
            <p className="experience">
              <FaClock /> {doc.experience}
            </p>
            <p className="location">
              <FaMapMarkerAlt /> {doc.location}
            </p>
            <button className="book-btn" onClick={() => handleBook(doc.name)}>
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
