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
  hamburger: { display: "none", background: "none", border: "none", color: "white", fontSize: "1.5rem", cursor: "pointer" },
  filterBtn: { display: "none", background: "#f5a623", color: "#003580", border: "none", padding: "0.5rem 1rem", borderRadius: "20px", fontWeight: "700", cursor: "pointer", fontSize: "0.9rem", gap: "0.5rem", alignItems: "center" },
};

const mediaQueryStyle = `
  @media (max-width: 768px) {
    .header-searchbar {
      flex-direction: column;
      gap: 0.5rem;
    }
    .search-input {
      min-width: 100% !important;
      width: 100%;
    }
  }
  
  @media (max-width: 600px) {
    .header-nav {
      display: none !important;
    }
    .header-hamburger {
      display: block !important;
    }
    .header-filter-btn {
      display: flex !important;
    }
    .header-logo {
      font-size: 1.4rem !important;
    }
    .header-searchbar {
      flex-direction: column;
      padding: 0.5rem 0 !important;
    }
    .search-input {
      min-width: 100% !important;
      font-size: 14px;
      padding: 0.4rem 0.8rem;
    }
    .search-btn {
      font-size: 0.85rem;
      padding: 0.4rem 1rem !important;
    }
  }
`;

export default function Header({ showFiltersBtn = false, onFiltersClick = null, filtersOpen = false }) {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  return (
    <header style={styles.header}>
      <style>{mediaQueryStyle}</style>
      <div style={styles.topBar}>
        <div style={styles.logo} className="header-logo">Dream<span style={styles.logoSpan}>Stay</span></div>
        <nav style={{...styles.nav, className: "header-nav"}}>
          <span style={styles.navLink}>Home</span>
          <span style={styles.navLink}>Destinations</span>
          <span style={styles.navLink}>Deals</span>
          <span style={styles.navLink}>About</span>
          <button style={styles.bookBtn}>Sign In</button>
        </nav>
        {showFiltersBtn && (
          <button 
            style={{...styles.filterBtn, background: filtersOpen ? "#0071c2" : "#f5a623"}}
            className="header-filter-btn"
            onClick={onFiltersClick}
          >
            🎛️ {filtersOpen ? "Close" : "Filters"}
          </button>
        )}
        <button 
          style={styles.hamburger}
          className="header-hamburger"
        >
          ☰
        </button>
      </div>
      <div style={{...styles.searchBar, className: "header-searchbar"}}>
        <input 
          style={{...styles.searchInput, className: "search-input"}} 
          type="text" 
          placeholder="🌍 Where are you going?" 
          value={destination} 
          onChange={(e) => setDestination(e.target.value)} 
        />
        <input 
          style={{...styles.searchInput, className: "search-input"}} 
          type="date" 
          value={checkIn} 
          onChange={(e) => setCheckIn(e.target.value)} 
        />
        <input 
          style={{...styles.searchInput, className: "search-input"}} 
          type="date" 
          value={checkOut} 
          onChange={(e) => setCheckOut(e.target.value)} 
        />
        <button style={{...styles.searchBtn, className: "search-btn"}}>🔍 Search Hotels</button>
      </div>
    </header>
  );
}
