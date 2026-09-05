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

const mediaQueryStyle = `
  @media (max-width: 600px) {
    .booking-modal {
      max-width: 100% !important;
      max-height: 95vh !important;
      border-radius: 12px 12px 0 0 !important;
    }
    .booking-modal-header {
      padding: 1rem !important;
    }
    .booking-modal-header-title {
      font-size: 1rem !important;
    }
    .booking-modal-header-subtitle {
      font-size: 0.75rem !important;
    }
    .booking-modal-body {
      padding: 1rem !important;
      gap: 0.7rem !important;
      max-height: 80vh !important;
    }
    .booking-modal-row {
      grid-template-columns: 1fr !important;
      gap: 0.5rem !important;
    }
    .booking-modal-input {
      font-size: 16px !important;
      padding: 0.5rem 0.8rem !important;
    }
    .booking-modal-label {
      font-size: 0.75rem !important;
    }
    .booking-modal-summary {
      padding: 0.7rem !important;
      font-size: 0.8rem !important;
    }
    .booking-modal-close {
      font-size: 1.3rem !important;
    }
  }
`;

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
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      // If check-in changes and check-out is before new check-in, move check-out to check-in
      if (name === "check_in") {
        if (prev.check_out && prev.check_out < value) {
          next.check_out = value;
        }
      }
      return next;
    });
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
    <>
      <style>{mediaQueryStyle}</style>
      <div style={overlay} onClick={onClose}>
        <div style={modal} className="booking-modal" onClick={(e) => e.stopPropagation()}>

          {/* Header */}
          <div style={header} className="booking-modal-header">
            <div>
              <div style={{ fontWeight: "700", fontSize: "1.1rem" }} className="booking-modal-header-title">Book Your Stay</div>
              <div style={{ fontSize: "0.82rem", opacity: 0.85 }} className="booking-modal-header-subtitle">{hotel.name}</div>
            </div>
            <button
              onClick={onClose}
              className="booking-modal-close"
              style={{ background: "none", border: "none", color: "white", fontSize: "1.5rem", cursor: "pointer", lineHeight: 1 }}
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div style={body} className="booking-modal-body">

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
                <div style={hotelSummary} className="booking-modal-summary">
                  <strong>📍 {hotel.name}</strong><br />
                  🌍 {hotel.location}<br />
                  💰 <strong style={{ color: "#008009" }}>₹{hotel.price} / night</strong>
                  &nbsp;&nbsp;⭐ {hotel.rating}/5 stars
                </div>

                {/* Guest Info */}
                <div>
                  <label style={labelStyle} className="booking-modal-label">Full Name *</label>
                  <input
                    style={inputStyle}
                    className="booking-modal-input"
                    type="text"
                    name="user_name"
                    placeholder="John Doe"
                    value={form.user_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={rowStyle} className="booking-modal-row">
                  <div>
                    <label style={labelStyle} className="booking-modal-label">Email *</label>
                    <input
                      style={inputStyle}
                      className="booking-modal-input"
                      type="email"
                      name="user_email"
                      placeholder="you@email.com"
                      value={form.user_email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label style={labelStyle} className="booking-modal-label">Phone</label>
                    <input
                      style={inputStyle}
                      className="booking-modal-input"
                      type="tel"
                      name="user_phone"
                      placeholder="+1 234 567 890"
                      value={form.user_phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div style={rowStyle} className="booking-modal-row">
                  <div>
                    <label style={labelStyle} className="booking-modal-label">Check-in *</label>
                    <input
                      style={inputStyle}
                      className="booking-modal-input"
                      type="date"
                      name="check_in"
                      value={form.check_in}
                      onChange={handleChange}
                      min={getTodayDate()}
                      required
                    />
                  </div>
                  <div>
                    <label style={labelStyle} className="booking-modal-label">Check-out *</label>
                    <input
                      style={inputStyle}
                      className="booking-modal-input"
                      type="date"
                      name="check_out"
                      value={form.check_out}
                      onChange={handleChange}
                      min={form.check_in || getTodayDate()}
                      required
                    />
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label style={labelStyle} className="booking-modal-label">Number of Guests</label>
                  <select
                    style={inputStyle}
                    className="booking-modal-input"
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
                  <label style={labelStyle} className="booking-modal-label">Special Requests</label>
                  <textarea
                    style={{ ...inputStyle, resize: "vertical", minHeight: "70px" }}
                    className="booking-modal-input"
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
    </>
  );
}
