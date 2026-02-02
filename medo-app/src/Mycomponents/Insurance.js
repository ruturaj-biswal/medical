// src/Mycomponents/Insurance.js
import React, { useState, useEffect } from "react";

export default function Insurance() {
  const [file, setFile] = useState(null);
  const [parsing, setParsing] = useState(false);
  const [policy, setPolicy] = useState(null); // parsed policy details
  const [hospitals, setHospitals] = useState([]);
  const [estimateLoading, setEstimateLoading] = useState(false);
  const [estimateResult, setEstimateResult] = useState(null);
  const [reminderDate, setReminderDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Load cashless hospitals (from backend)
    fetch("/api/cashless-hospitals")
      .then((r) => r.json())
      .then((data) => setHospitals(data.hospitals || []))
      .catch(() => {
        // fallback hardcoded list:
        setHospitals([
          { name: "Govt General Hospital, Bhubaneswar", address: "Unit 1, Bhubaneswar" },
          { name: "District Hospital, Cuttack", address: "College Square, Cuttack" },
        ]);
      });
  }, []);

  // upload file to backend, backend returns parsed policy JSON
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select a policy file (PDF or image).");
    setParsing(true);
    try {
      const fd = new FormData();
      fd.append("policy_file", file);
      const res = await fetch("/api/upload-policy", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        setPolicy(data.policy);
      } else {
        alert("Failed to parse policy: " + (data.error || "unknown"));
      }
    } catch (err) {
      console.error(err);
      alert("Upload error");
    } finally {
      setParsing(false);
    }
  };

  // Basic claim estimate call
  const requestEstimate = async () => {
    if (!policy) return alert("Please upload a policy first.");
    setEstimateLoading(true);
    setEstimateResult(null);
    try {
      // We send policy and simple parameters (severity simulated)
      const res = await fetch("/api/estimate-claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          policy_number: policy.policy_number,
          insurer: policy.insurer,
          illness_severity: "moderate", // in real app let user select
        }),
      });
      const data = await res.json();
      if (res.ok) setEstimateResult(data);
      else alert("Estimate failed: " + (data.error || "unknown"));
    } catch (err) {
      console.error(err);
      alert("Estimate error");
    } finally {
      setEstimateLoading(false);
    }
  };

  // set expiry reminder (saves locally + calls backend to schedule if available)
  const setExpiryReminder = async () => {
    if (!policy || !reminderDate) return alert("Policy + reminder date required.");
    const payload = {
      policy_number: policy.policy_number,
      email,
      name,
      reminder_date: reminderDate,
    };
    try {
      await fetch("/api/set-reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // store in localStorage too
      const existing = JSON.parse(localStorage.getItem("insurance_reminders") || "[]");
      existing.push(payload);
      localStorage.setItem("insurance_reminders", JSON.stringify(existing));
      alert("Reminder saved. We will try to notify on the given date.");
    } catch (err) {
      console.error(err);
      alert("Could not save reminder");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: 6 }}>🏥 Health Insurance Assistance</h2>
        <p style={{ marginTop: 0, color: "#145" }}>
          Upload a copy of your insurance policy (PDF / image). We'll parse it and let
          you check coverage, find cashless hospitals, set expiry reminders and run a
          claim estimate (demo).
        </p>

        <form onSubmit={handleUpload} style={styles.row}>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{ marginRight: 8 }}
          />
          <button type="submit" style={styles.btn} disabled={parsing}>
            {parsing ? "Parsing..." : "Upload & Parse"}
          </button>
        </form>

        {policy && (
          <div style={styles.policyBox}>
            <h3 style={{ marginBottom: 6 }}>Policy Details</h3>
            <p><strong>Insurer:</strong> {policy.insurer}</p>
            <p><strong>Policy No:</strong> {policy.policy_number}</p>
            <p><strong>Coverage:</strong> {policy.coverage_summary || "—"}</p>
            <p><strong>Expiry:</strong> {policy.expiry_date || "—"}</p>
            <p style={{ fontSize: 13, color: "#666" }}>{policy.raw_snippet || ""}</p>

            <div style={{ marginTop: 10 }}>
              <button onClick={requestEstimate} style={styles.btnSecondary} disabled={estimateLoading}>
                {estimateLoading ? "Estimating..." : "Run Claim Estimate"}
              </button>
            </div>

            {estimateResult && (
              <div style={styles.estimate}>
                <h4>Estimate</h4>
                <p><strong>Estimated Payout:</strong> ₹{estimateResult.estimated_payout}</p>
                <p><strong>Notes:</strong> {estimateResult.notes}</p>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 18 }}>
          <h4>Find Cashless Hospitals (priority: Government)</h4>
          <ul>
            {hospitals.map((h, i) => (
              <li key={i}>
                <strong>{h.name}</strong> — {h.address}{" "}
                {h.phone && <span> • {h.phone}</span>}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 14 }}>
          <h4>Policy Expiry Reminder</h4>
          <input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input type="date" value={reminderDate} onChange={(e) => setReminderDate(e.target.value)} style={styles.input} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={setExpiryReminder} style={styles.btn}>Set Reminder</button>
            <button onClick={() => {
              localStorage.removeItem("insurance_reminders");
              alert("Local reminders cleared.");
            }} style={styles.btnAlt}>Clear Local Reminders</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: 20, fontFamily: "Poppins, sans-serif", background: "#f5fbff", minHeight: "80vh" },
  card: { maxWidth: 920, margin: "0 auto", background: "white", padding: 22, borderRadius: 12, boxShadow: "0 8px 30px rgba(10,40,80,0.08)" },
  row: { display: "flex", alignItems: "center", gap: 8, marginTop: 10 },
  btn: { background: "#007bff", color: "white", padding: "8px 12px", border: "none", borderRadius: 8, cursor: "pointer" },
  btnSecondary: { background: "#0066cc", color: "white", padding: "8px 12px", border: "none", borderRadius: 8, cursor: "pointer" },
  btnAlt: { background: "#e9f1ff", color: "#003f7f", padding: "8px 12px", border: "1px solid #cfe2ff", borderRadius: 8, cursor: "pointer" },
  policyBox: { marginTop: 12, padding: 12, borderRadius: 8, background: "#f7fbff", border: "1px solid #e6f2ff" },
  estimate: { marginTop: 10, padding: 10, background: "#fff8e6", borderRadius: 8 },
  input: { width: "100%", padding: 10, marginTop: 8, borderRadius: 8, border: "1px solid #dfeaf6" },
};
