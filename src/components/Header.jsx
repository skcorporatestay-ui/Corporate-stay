import React, { useState } from "react";

const styles = {
  header: {
    background: "linear-gradient(135deg, #003580 0%, #0071c2 100%)",
    color: "white",
    padding: "0 2rem",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0" },
  logo: { fontSize: "1.8rem", fontWeight: "700", letterSpacing: "1px", cursor: "pointer" },
  logoSpan: { color: "#f5a623" },
  nav: { display: "flex", gap: "1.5rem", alignItems: "center" },
  navLink: { color: "white", textDecoration: "none", fontSize: "0.95rem", fontWeight: "500", cursor: "pointer" },
  bookBtn: { background: "#f5a623", color: "#003580", border: "none", padding: "0.5rem 1.2rem", borderRadius: "20px", fontWeight: "700", cursor: "pointer" },
  searchBar: { background: "rgba(255,255,255,0.1)", padding: "0.8rem 0", display: "flex", gap: "0.8rem", alignItems: "center", flexWrap: "wrap" },
  searchInput: { padding: "0.5rem 1rem", borderRadius: "20px", border: "none", fontSize: "0.9rem", outline: "none", minWidth: "180px" },
  searchBtn: { background: "#f5a623", color: "#003580", border: "none", padding: "0.5rem 1.5rem", borderRadius: "20px", fontWeight: "700", cursor: "pointer" },
};

export default function Header() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  return (
    <header style={styles.header}>
      <div style={styles.topBar}>
        <div style={styles.logo}>Dream<span style={styles.logoSpan}>Stay</span></div>
        <nav style={styles.nav}>
          <span style={styles.navLink}>Home</span>
          <span style={styles.navLink}>Destinations</span>
          <span style={styles.navLink}>Deals</span>
          <span style={styles.navLink}>About</span>
          <button style={styles.bookBtn}>Sign In</button>
        </nav>
      </div>
      <div style={styles.searchBar}>
        <input style={styles.searchInput} type="text" placeholder="🌍 Where are you going?" value={destination} onChange={(e) => setDestination(e.target.value)} />
        <input style={styles.searchInput} type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        <input style={styles.searchInput} type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        <button style={styles.searchBtn}>🔍 Search Hotels</button>
      </div>
    </header>
  );
}
