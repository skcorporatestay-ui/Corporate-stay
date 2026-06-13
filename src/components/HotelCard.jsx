import React, { useState } from "react";
import ImageSlider from "./ImageSlider";
import BookingModal from "./BookingModal";

const styles = {
  card: { background: "#fff", borderRadius: "10px", boxShadow: "0 4px 16px rgba(0,0,0,0.09)", overflow: "hidden", transition: "transform 0.25s, box-shadow 0.25s", cursor: "pointer", display: "flex", flexDirection: "column" },
  badge: { position: "absolute", top: "10px", left: "10px", background: "#f5a623", color: "#003580", fontWeight: "700", fontSize: "0.75rem", padding: "0.2rem 0.6rem", borderRadius: "12px", zIndex: 3 },
  sliderWrapper: { position: "relative" },
  body: { padding: "1rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.4rem" },
  topRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  name: { fontSize: "1.05rem", fontWeight: "700", color: "#003580", margin: 0 },
  price: { fontSize: "1.1rem", fontWeight: "700", color: "#008009", whiteSpace: "nowrap" },
  perNight: { fontSize: "0.75rem", color: "#888", fontWeight: "400" },
  location: { fontSize: "0.82rem", color: "#777" },
  stars: { color: "#f5a623", fontSize: "0.95rem" },
  description: { fontSize: "0.85rem", color: "#555", lineHeight: "1.5", marginTop: "0.2rem" },
  amenities: { display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.4rem" },
  amenityTag: { background: "#eef3fb", color: "#003580", fontSize: "0.75rem", padding: "0.2rem 0.6rem", borderRadius: "12px", fontWeight: "500" },
  bookBtn: { marginTop: "0.8rem", background: "linear-gradient(135deg, #003580, #0071c2)", color: "white", border: "none", padding: "0.6rem", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontSize: "0.9rem", transition: "opacity 0.2s" },
};

function StarRating({ rating }) {
  return (
    <span style={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => (i < rating ? "★" : "☆")).join("")}
      <span style={{ color: "#888", fontSize: "0.8rem", marginLeft: "4px" }}>({rating}/5)</span>
    </span>
  );
}

export default function HotelCard({ hotel }) {
  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        style={{
          ...styles.card,
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered ? "0 12px 30px rgba(0,53,128,0.18)" : "0 4px 16px rgba(0,0,0,0.09)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={styles.sliderWrapper}>
          {hotel.rating === 5 && <div style={styles.badge}>⭐ Top Rated</div>}
          <ImageSlider images={hotel.images} hotelName={hotel.name} />
        </div>
        <div style={styles.body}>
          <div style={styles.topRow}>
            <h3 style={styles.name}>{hotel.name}</h3>
            <div>
              <span style={styles.price}>₹{hotel.price}</span>
              <span style={styles.perNight}> /night</span>
            </div>
          </div>
          <div style={styles.location}>📍 {hotel.location}</div>
          <StarRating rating={hotel.rating} />
          <p style={styles.description}>{hotel.description}</p>
          <div style={styles.amenities}>
            {hotel.amenities.map((a) => (
              <span key={a} style={styles.amenityTag}>{a}</span>
            ))}
          </div>
          <button style={styles.bookBtn} onClick={() => setShowModal(true)}>
            Book Now →
          </button>
        </div>
      </div>

      {showModal && (
        <BookingModal hotel={hotel} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
