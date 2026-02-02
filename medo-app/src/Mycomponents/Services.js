import React from "react";
import "./Services.css";
import {
  FaStethoscope,
  FaVideo,
  FaHeartbeat,
  FaCapsules,
  FaAmbulance,
  FaUserMd,
  FaHospitalAlt,
  FaNotesMedical,
} from "react-icons/fa";

export default function Services() {
  const services = [
    {
      id: 1,
      icon: <FaVideo />,
      title: "Online Doctor Consultation",
      description:
        "Talk to qualified doctors anytime through secure video calls. Get prescriptions instantly.",
      link: "/video-consultation",
    },
    {
      id: 2,
      icon: <FaCapsules />,
      title: "Online Medicine Delivery",
      description:
        "Order medicines online and get doorstep delivery with trusted pharmacies.",
      link: "/medicines",
    },
    {
      id: 3,
      icon: <FaHeartbeat />,
      title: "Health Monitoring",
      description:
        "Monitor heart rate, oxygen level, and BP using your camera sensor.",
      link: "/health-monitoring",
    },
    {
      id: 4,
      icon: <FaAmbulance />,
      title: "Emergency Ambulance Service",
      description:
        "Find and call the nearest ambulance instantly — with real-time tracking.",
        link: "/emergency-ambulance",
    },
      {
        id: 5,
        icon: <FaHospitalAlt />,
        title: "Hospital Finder",
        description: "Find nearby hospitals or get suggestions based on symptoms.",
        link: "/hospital-finder",     
    },
    {
      id: 6,
      icon: <FaNotesMedical />,
      title: "Health Records Management",
      description:
        "Store and access your prescriptions and reports securely anytime.",
      link: "/digital-health-records",
    },
    {
      id: 7,
      icon: <FaUserMd />,
      title: "Doctor Appointment Booking",
      description:
        "Schedule clinic or video appointments with top specialists.",
      link: "/book-appointment",
    },
    {
      id: 8,
      icon: <FaStethoscope />,
      title: "Preventive Health Checkups",
      description: "Book health packages for full body, diabetes, heart, and more.",
      link: "/preventive-checkups",
    },
    {
      id: 9,
      icon: <FaHeartbeat />,
      title: "Mental Health Support",
      description: "Stress tests, counselling & therapy booking.",
      link: "/mental-health-support",
    },
  
    // ⭐ NEW FEATURE 2
    {
      id: 10,
      icon: <FaCapsules />,
      title: "Medicine Reminder",
      description: "Set reminders, track pills, and view weekly reports.",
      link: "/medicine-reminder"
    },    
  
    // ⭐ NEW FEATURE 3
    {
      id: 11,
      icon: <FaHospitalAlt />,
      title: "Health Insurance Assistance",
      description: "Upload policy, check coverage & cashless hospitals.",
      link: "/insurance-assistance",
    },
  
    // ⭐ NEW FEATURE 4
    {
      id: 12,
      icon: <FaHeartbeat />,
      title: "Women’s Health Tracker",
      description: "Track menstrual cycle, ovulation & insights.",
      link: "/womens-health",
    },
  
    // ⭐ NEW FEATURE 5
    {
      id: 13,
      icon: <FaStethoscope />,
      title: "Diet & Fitness Plans",
      description: "AI diet plans, steps tracker & hydration reminders.",
      link: "/diet-fitness",
    }
        
  ];

  return (
    <div className="services-container">
      <h1 className="services-title">
        Our Medical <span>Services</span>
      </h1>
      <p className="services-subtitle">
        We provide complete digital healthcare services to make your life
        healthier and easier.
      </p>

      <div className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service.id}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>

            {/* ⭐ Use this button. It works perfectly. */}
            <button
              className="explore-btn"
              onClick={() => (window.location.href = service.link)}
            >
              Explore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
