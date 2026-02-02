import React, { useState } from "react";

export default function MentalQuiz() {
  const questions = [
    { q: "How often do you feel stressed?", score: [0,1,2,3] },
    { q: "Do you have trouble sleeping?", score: [0,1,2,3] },
    { q: "Do you feel sad or low?", score: [0,1,2,3] },
    { q: "Do you lose interest in activities?", score: [0,1,2,3] },
  ];

  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const submitQuiz = () => {
    let total = Object.values(answers).reduce((a,b) => a + b, 0);

    if (total <= 4) setResult("😊 Mild — Normal Stress");
    else if (total <= 8) setResult("😟 Moderate — Try relaxation techniques");
    else setResult("🥺 High — Consider talking to a therapist");
  };

  return (
    <>
      <style>{`
        .quiz-page {
          padding: 30px;
          background: #e8f7ff;
          min-height: 100vh;
          font-family: Poppins;
        }

        .quiz-card {
          background:white;
          padding:20px;
          border-radius:12px;
          max-width:550px;
          margin:auto;
        }

        .q-btn {
          width:100%;
          padding:10px;
          margin-top:15px;
          background:#007bff;
          color:white;
          border:none;
          border-radius:10px;
        }
      `}</style>

      <div className="quiz-page">
        <div className="quiz-card">
          <h2>Mental Health Self-Assessment</h2>

          {questions.map((q, i) => (
            <div key={i}>
              <p><strong>{q.q}</strong></p>
              <select onChange={e => setAnswers({
                ...answers, [i]: parseInt(e.target.value)
              })}>
                <option value="">Select</option>
                <option value="0">Never</option>
                <option value="1">Sometimes</option>
                <option value="2">Often</option>
                <option value="3">Always</option>
              </select>
            </div>
          ))}

          <button className="q-btn" onClick={submitQuiz}>
            Submit Quiz
          </button>

          {result && <h3 style={{marginTop:"20px"}}>{result}</h3>}
        </div>
      </div>
    </>
  );
}
