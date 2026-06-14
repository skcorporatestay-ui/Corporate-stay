import React from "react";
import HotelCard from "./HotelCard";

const styles = {
  wrapper: { flex: 1, padding: "1.5rem", width: "100%" },
  meta: { marginBottom: "1rem", color: "#555", fontSize: "0.95rem", fontWeight: "500" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "1.5rem" },
  empty: { textAlign: "center", padding: "4rem 2rem", color: "#888", fontSize: "1.1rem" },
};

const mediaQueryStyle = `
  @media (max-width: 1024px) {
    .hotel-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
      gap: 1.2rem !important;
    }
  }
  
  @media (max-width: 768px) {
    .hotel-wrapper {
      padding: 1rem !important;
      width: 100%;
    }
    .hotel-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) !important;
      gap: 1rem !important;
    }
  }
  
  @media (max-width: 480px) {
    .hotel-wrapper {
      padding: 0.75rem !important;
      width: 100%;
    }
    .hotel-grid {
      grid-template-columns: 1fr !important;
      gap: 0.75rem !important;
    }
  }
`;

export default function HotelList({ hotels }) {
  return (
    <section style={styles.wrapper} className="hotel-wrapper">
      <style>{mediaQueryStyle}</style>
      <p style={styles.meta}>Showing <strong>{hotels.length}</strong> hotel{hotels.length !== 1 ? "s" : ""}</p>
      {hotels.length === 0 ? (
        <div style={styles.empty}>😕 No hotels match your filters. Try adjusting your criteria.</div>
      ) : (
        <div style={styles.grid} className="hotel-grid">
          {hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}
        </div>
      )}
    </section>
  );
}
