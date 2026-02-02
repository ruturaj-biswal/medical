import React from "react";

export default function DepressionQuizSuccess() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #c3ffe8, #d7fffe)",
      fontFamily: "Poppins, sans-serif"
    }}>
      <div style={{
        background: "white",
        padding: "35px",
        borderRadius: "20px",
        textAlign: "center",
        width: "90%",
        maxWidth: "420px",
        boxShadow: "0px 8px 25px rgba(0,0,0,0.2)"
      }}>

        <h2>✔ Test Submitted Successfully!</h2>
        <p style={{ fontSize: "1.1rem", marginTop: "10px" }}>
          Your responses have been recorded.
        </p>
        <p style={{ marginTop: "5px", color: "#0077b6" }}>
          A mental health expert will reach out if needed.
        </p>

        <a href="/" style={{
          textDecoration: "none",
          background: "#0077ff",
          color: "white",
          padding: "12px 20px",
          display: "inline-block",
          marginTop: "20px",
          borderRadius: "10px",
          fontWeight: "600"
        }}>Go Home</a>

      </div>
    </div>
  );
}
