// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import Navbar from "./Mycomponents/Header";
import Footer from "./Mycomponents/Footer";

// Pages
import Home from "./Mycomponents/Home";
import About from "./Mycomponents/About";
import Contact from "./Mycomponents/Contact";
import Services from "./Mycomponents/Services";

// Auth
import Login from "./Mycomponents/Login";
import Signup from "./Mycomponents/Signup";
import ForgotPassword from "./Mycomponents/ForgotPassword";
import VerifyOTP from "./Mycomponents/VerifyOTP";
import ResetPassword from "./Mycomponents/ResetPassword";

// Features
import Doctors from "./Mycomponents/Doctors";
import BookAppointment from "./Mycomponents/BookAppointment";
import DigitalHealthRecords from "./Mycomponents/DigitalHealthRecords";
import VideoConsultation from "./Mycomponents/VideoConsultation";
import Pharmacies from "./Mycomponents/Pharmacies";
import PharmaciesMap from "./Mycomponents/PharmaciesMap";
import PharmaciesUpdate from "./Mycomponents/PharmaciesUpdate";
import KoishikCallCenter from "./Mycomponents/KoishikCallCenter";
import Medicines from "./Mycomponents/Medicines";
import BuyMedicine from "./Mycomponents/BuyMedicine";
import OrderSuccess from "./Mycomponents/OrderSuccess";
import EmergencyAmbulance from "./Mycomponents/EmergencyAmbulance";
import HealthMonitoring from "./Mycomponents/HealthMonitoring";
import HospitalFinder from "./Mycomponents/HospitalFinder";
import PreventiveHealthCheckups from "./Mycomponents/PreventiveHealthCheckups";
import BookHealthPackage from "./Mycomponents/BookHealthPackage";
import CheckupSuccess from "./Mycomponents/CheckupSuccess";
import MentalHealthSupport from "./Mycomponents/MentalHealthSupport";
import Counsellors from "./Mycomponents/Counsellors";
import TherapyBooking from "./Mycomponents/TherapyBooking";
import TherapySuccess from "./Mycomponents/TherapySuccess";
import MentalQuiz from "./Mycomponents/MentalQuiz";
import DepressionQuiz from "./Mycomponents/DepressionQuiz";
import DepressionQuizSuccess from "./Mycomponents/DepressionQuizSuccess";
import MedicineReminder from "./Mycomponents/MedicineReminder";
import Insurance from "./Mycomponents/Insurance";
import InsuranceAssistance from "./Mycomponents/InsuranceAssistance";
import WomensHealthTracker from "./Mycomponents/WomenHealthTracker";
import DietFitnessPlans from "./Mycomponents/DietFitnessPlans";

import "./Mycomponents/Auth.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    if (!sessionStorage.getItem("firstLoad")) {
      localStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false);
      sessionStorage.setItem("firstLoad", "true");
    }
  }, []);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar title="Health.io" />}

      <Routes>
        {/* ---------- PUBLIC ---------- */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ---------- PRIVATE ---------- */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route path="/services" element={<PrivateRoute><Services /></PrivateRoute>} />
        <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
        <Route path="/doctors" element={<PrivateRoute><Doctors /></PrivateRoute>} />
        <Route path="/book-appointment" element={<PrivateRoute><BookAppointment /></PrivateRoute>} />
        <Route path="/digital-health-records" element={<PrivateRoute><DigitalHealthRecords /></PrivateRoute>} />
        <Route path="/video-consultation" element={<PrivateRoute><VideoConsultation /></PrivateRoute>} />
        <Route path="/pharmacies" element={<PrivateRoute><Pharmacies /></PrivateRoute>} />
        <Route path="/pharmacies-map" element={<PrivateRoute><PharmaciesMap /></PrivateRoute>} />
        <Route path="/pharmacyUpdates" element={<PrivateRoute><PharmaciesUpdate /></PrivateRoute>} />
        <Route path="/koishik-call-center" element={<PrivateRoute><KoishikCallCenter /></PrivateRoute>} />
        <Route path="/medicines" element={<PrivateRoute><Medicines /></PrivateRoute>} />
        <Route path="/buy-medicine" element={<PrivateRoute><BuyMedicine /></PrivateRoute>} />
        <Route path="/order-success" element={<PrivateRoute><OrderSuccess /></PrivateRoute>} />
        <Route path="/emergency-ambulance" element={<PrivateRoute><EmergencyAmbulance /></PrivateRoute>} />
        <Route path="/health-monitoring" element={<PrivateRoute><HealthMonitoring /></PrivateRoute>} />
        <Route path="/hospital-finder" element={<PrivateRoute><HospitalFinder /></PrivateRoute>} />
        <Route path="/preventive-checkups" element={<PrivateRoute><PreventiveHealthCheckups /></PrivateRoute>} />
        <Route path="/book-health-package" element={<PrivateRoute><BookHealthPackage /></PrivateRoute>} />
        <Route path="/checkup-success" element={<PrivateRoute><CheckupSuccess /></PrivateRoute>} />
        <Route path="/mental-health-support" element={<PrivateRoute><MentalHealthSupport /></PrivateRoute>} />
        <Route path="/counsellors" element={<PrivateRoute><Counsellors /></PrivateRoute>} />
        <Route path="/therapy-booking" element={<PrivateRoute><TherapyBooking /></PrivateRoute>} />
        <Route path="/therapy-success" element={<PrivateRoute><TherapySuccess /></PrivateRoute>} />
        <Route path="/mental-quiz" element={<PrivateRoute><MentalQuiz /></PrivateRoute>} />
        <Route path="/depression-quiz" element={<PrivateRoute><DepressionQuiz /></PrivateRoute>} />
        <Route path="/depression-quiz-success" element={<PrivateRoute><DepressionQuizSuccess /></PrivateRoute>} />
        <Route path="/insurance" element={<PrivateRoute><Insurance /></PrivateRoute>} />
        <Route path="/insurance-assistance" element={<PrivateRoute><InsuranceAssistance /></PrivateRoute>} />
        <Route path="/womens-health" element={<PrivateRoute><WomensHealthTracker /></PrivateRoute>} />
        <Route path="/medicine-reminder" element={<PrivateRoute><MedicineReminder /></PrivateRoute>} />
        <Route path="/diet-fitness" element={<PrivateRoute><DietFitnessPlans /></PrivateRoute>} />

        {/* ---------- FALLBACK ---------- */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {isAuthenticated && <Footer />}
    </BrowserRouter>
  );
}
