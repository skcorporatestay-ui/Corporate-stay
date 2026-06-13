import React, { useState } from "react";
import emailjs from "@emailjs/browser";

// 🔴 Replace these with your actual EmailJS credentials
const SERVICE_ID = "service_kz9pnh3";
const TEMPLATE_ID = "template_l56xqx5";
const PUBLIC_KEY = "UJ7sD5anwhf1XKFGC";

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
};

const modal = {
  background: "#fff",
  borderRadius: "14px",
  width: "100%",
  maxWidth: "480px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
  overflow: "hidden",
  animation: "fadeIn 0.25s ease",
};

const header = {
  background: "linear-gradient(135deg, #003580, #0071c2)",
  color: "white",
  padding: "1.2rem 1.5rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const body = {
  padding: "1.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.9rem",
  maxHeight: "70vh",
  overflowY: "auto",
};

const inputStyle = {
  width: "100%",
  padding: "0.6rem 0.9rem",
  borderRadius: "8px",
  border: "1px solid #dde3ed",
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const labelStyle = {
  fontSize: "0.8rem",
  fontWeight: "600",
  color: "#555",
  marginBottom: "0.3rem",
  display: "block",
  textTransform: "uppercase",
  letterSpacing: "0.4px",
};

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "0.8rem",
};

const submitBtn = (loading) => ({
  background: loading
    ? "#aaa"
    : "linear-gradient(135deg, #003580, #0071c2)",
  color: "white",
  border: "none",
  padding: "0.8rem",
  borderRadius: "8px",
  fontWeight: "700",
  fontSize: "1rem",
  cursor: loading ? "not-allowed" : "pointer",
  marginTop: "0.5rem",
  width: "100%",
});

const hotelSummary = {
  background: "#f0f4f8",
  borderRadius: "8px",
  padding: "0.9rem",
  fontSize: "0.88rem",
  color: "#333",
  lineHeight: "1.7",
};

export default function BookingModal({ hotel, onClose }) {
  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    check_in: "",
    check_out: "",
    guests: "1",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.user_name || !form.user_email || !form.check_in || !form.check_out) {
      alert("Please fill in all required fields.");
      return;
    }

    setStatus("loading");

    const templateParams = {
      to_email: form.user_email,
      user_name: form.user_name,
      user_phone: form.user_phone || "Not provided",
      hotel_name: hotel.name,
      hotel_location: hotel.location,
      hotel_price: hotel.price,
      hotel_rating: hotel.rating,
      check_in: form.check_in,
      check_out: form.check_out,
      guests: form.guests,
      message: form.message || "No special requests",
    };

    try {
      console.log("Sending templateParams:", templateParams);
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setStatus("success");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={header}>
          <div>
            <div style={{ fontWeight: "700", fontSize: "1.1rem" }}>Book Your Stay</div>
            <div style={{ fontSize: "0.82rem", opacity: 0.85 }}>{hotel.name}</div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "white", fontSize: "1.5rem", cursor: "pointer", lineHeight: 1 }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={body}>

          {/* Success State */}
          {status === "success" ? (
            <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
              <div style={{ fontSize: "3rem" }}>🎉</div>
              <h3 style={{ color: "#003580", margin: "0.8rem 0 0.4rem" }}>Booking Request Sent!</h3>
              <p style={{ color: "#555", fontSize: "0.9rem" }}>
                A confirmation has been sent to <strong>{form.user_email}</strong>.<br />
                Our team will contact you shortly.
              </p>
              <button
                onClick={onClose}
                style={{ ...submitBtn(false), marginTop: "1.5rem", maxWidth: "200px", margin: "1.5rem auto 0" }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>

              {/* Hotel Summary */}
              <div style={hotelSummary}>
                <strong>📍 {hotel.name}</strong><br />
                🌍 {hotel.location}<br />
                💰 <strong style={{ color: "#008009" }}>₹{hotel.price} / night</strong>
                &nbsp;&nbsp;⭐ {hotel.rating}/5 stars
              </div>

              {/* Guest Info */}
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input
                  style={inputStyle}
                  type="text"
                  name="user_name"
                  placeholder="John Doe"
                  value={form.user_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={rowStyle}>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input
                    style={inputStyle}
                    type="email"
                    name="user_email"
                    placeholder="you@email.com"
                    value={form.user_email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input
                    style={inputStyle}
                    type="tel"
                    name="user_phone"
                    placeholder="+1 234 567 890"
                    value={form.user_phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Dates */}
              <div style={rowStyle}>
                <div>
                  <label style={labelStyle}>Check-in *</label>
                  <input
                    style={inputStyle}
                    type="date"
                    name="check_in"
                    value={form.check_in}
                    onChange={handleChange}
                    min={getTodayDate()}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Check-out *</label>
                  <input
                    style={inputStyle}
                    type="date"
                    name="check_out"
                    value={form.check_out}
                    onChange={handleChange}
                    min={getTodayDate()}
                    required
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label style={labelStyle}>Number of Guests</label>
                <select
                  style={inputStyle}
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Special Requests</label>
                <textarea
                  style={{ ...inputStyle, resize: "vertical", minHeight: "70px" }}
                  name="message"
                  placeholder="Any special requests or notes..."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {/* Error */}
              {status === "error" && (
                <div style={{ color: "#c0392b", fontSize: "0.85rem", background: "#fdecea", padding: "0.6rem 0.9rem", borderRadius: "6px" }}>
                  ❌ Failed to send booking. Please try again or email us directly.
                </div>
              )}

              {/* Submit */}
              <button type="submit" style={submitBtn(status === "loading")} disabled={status === "loading"}>
                {status === "loading" ? "Sending Booking..." : "Confirm Booking →"}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
