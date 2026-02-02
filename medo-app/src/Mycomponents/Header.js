// src/Mycomponents/Header.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "./Header.css";

export default function Header(props) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark sticky-top ${
        scrolled ? "navbar-scrolled" : ""
      }`}
    >
      <div className="container-fluid px-4">
        {/* ⭐ BRAND LOGO + TEXT */}
        <Link className="navbar-brand" to="/">
          <div className="brand-content">
            {/* 🔵 MEDICAL LOGO SVG */}
            <svg
              className="brand-icon"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Medical Cross */}
              <path
                d="M10 2H14V10H22V14H14V22H10V14H2V10H10V2Z"
                fill="#00E0FF"
              />

              {/* Heartbeat Line */}
              <path
                d="M3 16H7L9 13L12 18L14 14L16 16H21"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="brand-text">Health.io</span>
          </div>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/") ? "active" : ""}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/about") ? "active" : ""}`} to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/services") ? "active" : ""}`} to="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/doctors") ? "active" : ""}`} to="/doctors">
                Doctors
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/pharmacies") ? "active" : ""}`} to="/pharmacies">
                Pharmacies
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/contact") ? "active" : ""}`} to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

Header.defaultProps = {
  title: "Health.io",
};

Header.propTypes = {
  title: PropTypes.string,
};
