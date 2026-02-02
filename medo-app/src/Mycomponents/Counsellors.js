// Counsellors.js
import React from "react";
import { useNavigate } from "react-router-dom";

/*
  Simple counsellor list. Click "Book" -> navigates to TherapyBooking
  with the selected counsellor passed via state.
*/

export default function Counsellors() {
  const navigate = useNavigate();

  const counsellors = [
    { id: 1, name: "Dr. Koishik Rao", title: "Clinical Psychologist", email: "koishik@example.com", years: 10 },
    { id: 2, name: "Ms. Priya Sen", title: "Counsellor (CBT)", email: "priya@example.com", years: 6 },
    { id: 3, name: "Dr. Aarav Patel", title: "Psychiatrist", email: "aarav@example.com", years: 12 },
  ];

  return (
    <>
      <style>{`
        .c-list { padding: 30px; font-family: Poppins, sans-serif; }
        .c-grid { display:grid; grid-template-columns: repeat(auto-fit,minmax(240px,1fr)); gap:20px; }
        .c-card { background: #fff; padding:18px; border-radius:12px; box-shadow:0 8px 22px rgba(0,0,0,0.08); text-align:left; }
        .c-card h3 { margin:0 0 6px; color:#003366; }
        .c-card p { margin:4px 0; color:#546e90; }
        .book-btn { margin-top:12px; padding:10px 14px; background:linear-gradient(90deg,#007bff,#00aaff); color:#fff; border:0; border-radius:10px; cursor:pointer; }
        .book-btn:hover { transform:translateY(-3px); }
      `}</style>

      <div className="c-list">
        <h2>Talk to a Counsellor</h2>
        <p>Choose a counsellor and book a therapy session. (You will receive confirmation by email.)</p>
        <div className="c-grid">
          {counsellors.map(c => (
            <div key={c.id} className="c-card">
              <h3>{c.name}</h3>
              <p><strong>{c.title}</strong></p>
              <p>{c.years} years experience</p>
              <p className="muted">Email: {c.email}</p>
              <button className="book-btn" onClick={() => navigate("/therapy-booking", { state: { counsellor: c } })}>
                Book
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
