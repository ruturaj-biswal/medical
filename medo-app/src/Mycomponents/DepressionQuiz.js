// DepressionQuiz.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/*
 Simple PHQ-style questionnaire (short). After submission show score and suggestion.
 If score is moderate/severe, show CTA to book therapy.
*/

const questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure",
  "Trouble concentrating on things",
  "Moving or speaking so slowly that other people could have noticed",
  "Thoughts that you would be better off dead"
];

export default function DepressionQuiz() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(0));
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const setAns = (index, val) => {
    const arr = [...answers]; arr[index] = Number(val); setAnswers(arr);
  };

  const submit = () => {
    setSubmitted(true);
  };

  const score = answers.reduce((a,b)=>a+b,0);
  const severity = score >= 20 ? "Severe" : score >= 15 ? "Moderately Severe" : score >= 10 ? "Moderate" : score >= 5 ? "Mild" : "Minimal";

  return (
    <>
      <style>{`
        .q-page { padding:30px; font-family:Poppins, sans-serif; background:linear-gradient(135deg,#fff6f8,#eef8ff); min-height:100vh; }
        .q-box { max-width:900px; margin:0 auto; background:#fff; padding:20px; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.06); }
        .q-grid { display:grid; gap:12px; }
        .q-row { display:flex; justify-content:space-between; align-items:center; gap:10px; }
        .select { padding:8px 10px; border-radius:8px; border:1px solid #e8eefb; }
        .cta { margin-top:14px; padding:10px 14px; background:linear-gradient(90deg,#007bff,#00aaff); color:#fff; border:0; border-radius:10px; cursor:pointer; }
      `}</style>

      <div className="q-page">
        <div className="q-box">
          <h2>Depression Self-Assessment (Short)</h2>
          <p>For each item choose: 0 = Not at all, 1 = Several days, 2 = More than half the days, 3 = Nearly every day.</p>

          <div className="q-grid">
            {questions.map((q, i) => (
              <div className="q-row" key={i}>
                <div style={{flex:1}}>{i+1}. {q}</div>
                <select className="select" value={answers[i]} onChange={(e)=>setAns(i,e.target.value)}>
                  <option value={0}>0 - Not at all</option>
                  <option value={1}>1 - Several days</option>
                  <option value={2}>2 - More than half the days</option>
                  <option value={3}>3 - Nearly every day</option>
                </select>
              </div>
            ))}
          </div>

          {!submitted ? (
            <button className="cta" onClick={submit}>See Results</button>
          ) : (
            <>
              <h3 style={{marginTop:18}}>Score: {score} — {severity}</h3>
              <p>
                {score >= 15
                  ? "Your responses suggest moderate to severe symptoms. We recommend scheduling a professional evaluation."
                  : score >= 10
                  ? "You have moderate symptoms. Consider consulting a counsellor."
                  : "Symptoms are mild or minimal. Monitor and consider self-care; book counselling if you are worried."}
              </p>

              <div style={{display:"flex", gap:12, marginTop:12}}>
                <button className="cta" onClick={()=>navigate("/therapy-booking")}>Book Therapy</button>
                <button className="cta" onClick={()=>window.open("tel:022-12345678")}>Call Helpline</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
