import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-about">
          <h3>Health.io</h3>
          <p>
            Your trusted digital healthcare platform providing online consultations,
            pharmacy services, health records, and more — all at your fingertips.
          </p>
        </div>

        {/* Middle Section */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">🏠 Home</a></li>
            <li><a href="/about">ℹ️ About Us</a></li>
            <li><a href="/services">🩺 Services</a></li>
            <li><a href="/contact">📞 Contact</a></li>
            <li><a href="/pharmacies">💊 Pharmacies</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p><FaMapMarkerAlt /> NIST University, Berhampur, Odisha</p>
          <p><FaPhoneAlt /> +91 700756451</p>
          <p><FaEnvelope /> support@healthio.com</p>

          <div className="footer-socials">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Health.io | Designed with ❤️ by Ruturaj Biswal</p>
      </div>
    </footer>
  );
}
