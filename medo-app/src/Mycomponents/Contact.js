import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // clear non-persistent status when user edits
    if (status.type === "error") setStatus({ type: "", text: "" });
  };

  const validate = () => {
    if (!formData.name.trim()) return "Please enter your name.";
    if (!formData.email.trim()) return "Please enter your email.";
    // basic email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) return "Please enter a valid email address.";
    if (!formData.subject.trim()) return "Please enter a subject.";
    if (!formData.message.trim()) return "Please type your message.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setStatus({ type: "error", text: validationError });
      return;
    }

    setSending(true);
    setStatus({ type: "info", text: "Sending your message..." });

    try {
      const res = await fetch("http://127.0.0.1:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Try to parse JSON even on non-200 status
      let data = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        // ignore parse error
      }

      if (res.ok) {
        setStatus({ type: "success", text: "✅ Message sent — we will reply soon." });
        setFormData({ name: "", email: "", subject: "", message: "" });
        // auto-clear success message after a few seconds
        setTimeout(() => setStatus({ type: "", text: "" }), 5000);
      } else {
        // show backend-provided error if available
        const backendMessage = data?.error || data?.message || null;
        const friendly = backendMessage
          ? `Failed to send: ${backendMessage}`
          : `Server error (${res.status}). Please try again later.`;
        setStatus({ type: "error", text: friendly });
        console.error("Contact form server error:", res.status, data);
      }
    } catch (err) {
      // network or CORS error
      setStatus({
        type: "error",
        text:
          "Unable to reach the server. Check your internet connection and make sure the backend is running.",
      });
      console.error("Contact form network error:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-container">
      <h2>📩 Contact Us</h2>
      <p className="contact-lead">
        We’d love to hear from you. For urgent support call +91-7656003621
      </p>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="row">
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={sending}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={sending}
          />
        </div>

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          disabled={sending}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="6"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={sending}
        />

        <div className="actions">
          <button type="submit" className="send-btn" disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </button>
        </div>

        {status.text && (
          <div
            className={
              status.type === "success"
                ? "status status-success"
                : status.type === "info"
                ? "status status-info"
                : "status status-error"
            }
            role="status"
          >
            {status.text}
          </div>
        )}
      </form>
    </div>
  );
}
