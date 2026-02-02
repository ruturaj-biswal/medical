import React from "react";
import "./Pharmacies.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaShoppingCart, FaMapMarkedAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Pharmacies() {
  const navigate = useNavigate();

  const pharmacies = [
    { name: "Bhubaneswar Medico", address: "Unit-9, Bhubaneswar", contact: "+91 94371 24568", timing: "24x7" },
    { name: "Cuttack Health Care", address: "College Square, Cuttack", contact: "+91 94382 19452", timing: "7AM - 11PM" },
    { name: "Balasore Pharma Point", address: "Station Road, Balasore", contact: "+91 70081 56321", timing: "8AM - 9PM" },
    { name: "Puri Medical Store", address: "Grand Road, Puri", contact: "+91 98610 28345", timing: "6AM - 10PM" },
    { name: "Berhampur Drug House", address: "Bada Bazar, Berhampur", contact: "+91 97760 12584", timing: "24 Hours" },
    { name: "Sambalpur Life Line", address: "Main Road, Sambalpur", contact: "+91 93370 47518", timing: "7AM - 10PM" },
    { name: "Rourkela Pharma Hub", address: "Sector 19, Rourkela", contact: "+91 90900 33445", timing: "8AM - 11PM" },
    { name: "Jharsuguda Medical Hall", address: "Station Square, Jharsuguda", contact: "+91 94370 56980", timing: "8AM - 9PM" },
    { name: "Khurda Care Pharmacy", address: "Main Bazaar, Khurda", contact: "+91 93489 22904", timing: "9AM - 10PM" },
    { name: "Jajpur Medicos", address: "Bus Stand Road, Jajpur", contact: "+91 70770 48512", timing: "7AM - 11PM" },
    { name: "Kendrapara Health Plus", address: "Market Square, Kendrapara", contact: "+91 96580 28841", timing: "6AM - 10PM" },
    { name: "Nayagarh Pharmacy", address: "Main Market, Nayagarh", contact: "+91 94372 21541", timing: "7AM - 10PM" },
    { name: "Bargarh Medical Care", address: "Hospital Road, Bargarh", contact: "+91 93378 27894", timing: "8AM - 9PM" },
    { name: "Angul Medico Centre", address: "Bus Stand, Angul", contact: "+91 70085 15873", timing: "24x7" },
    { name: "Dhenkanal Drug Store", address: "College Road, Dhenkanal", contact: "+91 79788 16512", timing: "7AM - 10PM" },
    { name: "Rayagada Pharmacy", address: "Railway Station Road, Rayagada", contact: "+91 88952 41236", timing: "8AM - 9PM" },
    { name: "Kandhamal Medico", address: "Phulbani Main Road", contact: "+91 94382 11572", timing: "7AM - 9PM" },
    { name: "Koraput Health Mart", address: "Town Centre, Koraput", contact: "+91 90405 45236", timing: "8AM - 10PM" },
    { name: "Malkangiri Drug Mart", address: "Bus Stand, Malkangiri", contact: "+91 93371 22316", timing: "7AM - 9PM" },
    { name: "Nabarangpur Medico", address: "College Road, Nabarangpur", contact: "+91 72059 41526", timing: "7AM - 9PM" },
    { name: "Ganjam Health Store", address: "Main Street, Ganjam", contact: "+91 98618 21325", timing: "24 Hours" },
    { name: "Boudh Pharma Point", address: "Market Area, Boudh", contact: "+91 97765 14283", timing: "8AM - 9PM" },
    { name: "Sonepur Medicals", address: "Hospital Chowk, Sonepur", contact: "+91 93378 41142", timing: "7AM - 10PM" },
    { name: "Mayurbhanj Drug House", address: "Baripada Main Road", contact: "+91 70082 25941", timing: "8AM - 9PM" },
    { name: "Keonjhar Pharmacy", address: "College Square, Keonjhar", contact: "+91 94378 21152", timing: "7AM - 10PM" },
    { name: "Sundargarh Medico", address: "Station Road, Sundargarh", contact: "+91 98610 28415", timing: "8AM - 10PM" },
    { name: "Jagatsinghpur Drug Centre", address: "Market Road, Jagatsinghpur", contact: "+91 93484 21565", timing: "9AM - 9PM" },
    { name: "Bhadrak Health Plus", address: "Bypass Road, Bhadrak", contact: "+91 94370 28514", timing: "7AM - 11PM" },
    { name: "Kalahandi Pharma", address: "Bhawanipatna Main Road", contact: "+91 99377 20518", timing: "8AM - 10PM" },
    { name: "Nuapada Medical Store", address: "Bus Stand Road, Nuapada", contact: "+91 70089 31142", timing: "7AM - 9PM" },
    { name: "Deogarh Pharmacy", address: "Town Road, Deogarh", contact: "+91 97762 25410", timing: "8AM - 9PM" },
    { name: "Bolangir Medico", address: "Hospital Chowk, Bolangir", contact: "+91 98610 28942", timing: "7AM - 10PM" },
    { name: "Kendujhar Medical Hall", address: "New Market, Kendujhar", contact: "+91 93373 22411", timing: "8AM - 9PM" },
    { name: "Gopalpur Sea Pharmacy", address: "Beach Road, Gopalpur", contact: "+91 78941 22574", timing: "24x7" },
    { name: "Jeypore Medico Plus", address: "Main Market, Jeypore", contact: "+91 94374 24512", timing: "7AM - 10PM" },
    { name: "Paralakhemundi Health Mart", address: "Bus Stand Road, Paralakhemundi", contact: "+91 94372 23514", timing: "8AM - 9PM" },
    { name: "Balangir Pharma Care", address: "Hospital Road, Balangir", contact: "+91 93372 25136", timing: "7AM - 9PM" },
    { name: "Baripada Health Hub", address: "College Square, Baripada", contact: "+91 98610 21512", timing: "8AM - 10PM" },
    { name: "Titlagarh Medical Point", address: "Bus Stand, Titlagarh", contact: "+91 97767 28412", timing: "7AM - 9PM" },
    { name: "Kantabanji Drug House", address: "Main Street, Kantabanji", contact: "+91 94378 21452", timing: "7AM - 10PM" },
    { name: "Pattamundai Medico", address: "Market Road, Pattamundai", contact: "+91 93370 27541", timing: "8AM - 10PM" },
    { name: "Rajgangpur Pharma", address: "Bus Stop, Rajgangpur", contact: "+91 98610 27584", timing: "7AM - 10PM" },
    { name: "Talcher Health Care", address: "NTPC Colony, Talcher", contact: "+91 94370 22512", timing: "24 Hours" },
    { name: "Jaleswar Medico", address: "Main Bazar, Jaleswar", contact: "+91 93370 27415", timing: "8AM - 9PM" },
    { name: "Chhatrapur Medical", address: "Bus Stand, Chhatrapur", contact: "+91 98611 24512", timing: "7AM - 9PM" },
    { name: "Buguda Drug Point", address: "Main Road, Buguda", contact: "+91 94378 28915", timing: "8AM - 10PM" },
    { name: "Kabisuryanagar Medico", address: "Market Area, Kabisuryanagar", contact: "+91 97761 22514", timing: "7AM - 9PM" },
    { name: "Hinjilicut Pharma", address: "Main Bazar, Hinjilicut", contact: "+91 93371 24125", timing: "8AM - 9PM" },
    { name: "Aska Health Point", address: "College Road, Aska", contact: "+91 70089 21456", timing: "7AM - 9PM" },
    { name: "Bhanjanagar Medical", address: "Bus Stand, Bhanjanagar", contact: "+91 97760 27514", timing: "8AM - 10PM" },
  ];

  return (
    <div className="pharmacy-page">
      <div className="pharmacy-header">
        <div>
          <h2 className="pharmacy-title">💊 Our Trusted Pharmacies</h2>
          <p className="pharmacy-subtitle">
            Find trusted medical stores across Odisha for medicines, prescriptions, and health supplies.
          </p>
        </div>

        {/* Top Right Button */}
        <button className="find-btn" onClick={() => navigate("/pharmacies-map")}>
          <FaMapMarkedAlt /> Find Nearby Pharmacies
        </button>
      </div>

      <div className="pharmacy-grid">
        {pharmacies.map((pharmacy, index) => (
          <div className="pharmacy-card" key={index}>
            <h3>{pharmacy.name}</h3>
            <p><FaMapMarkerAlt /> {pharmacy.address}</p>
            <p><FaPhoneAlt /> {pharmacy.contact}</p>
            <p><FaClock /> {pharmacy.timing}</p>
            <button
              className="order-btn"
              onClick={() => navigate("/order-medicine")}
            >
              <FaShoppingCart /> Order Medicines
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
