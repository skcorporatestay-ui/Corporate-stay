import React from "react";
import HotelCard from "./HotelCard";

const styles = {
  wrapper: { flex: 1, padding: "1.5rem" },
  meta: { marginBottom: "1rem", color: "#555", fontSize: "0.95rem", fontWeight: "500" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "1.5rem" },
  empty: { textAlign: "center", padding: "4rem 2rem", color: "#888", fontSize: "1.1rem" },
};

export default function HotelList({ hotels }) {
  return (
    <section style={styles.wrapper}>
      <p style={styles.meta}>Showing <strong>{hotels.length}</strong> hotel{hotels.length !== 1 ? "s" : ""}</p>
      {hotels.length === 0 ? (
        <div style={styles.empty}>😕 No hotels match your filters. Try adjusting your criteria.</div>
      ) : (
        <div style={styles.grid}>
          {hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}
        </div>
      )}
    </section>
  );
}
