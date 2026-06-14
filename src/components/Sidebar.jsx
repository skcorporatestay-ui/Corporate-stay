import React from "react";

const styles = {
  sidebar: { width: "260px", minWidth: "260px", background: "#ffffff", padding: "1.5rem", borderRight: "1px solid #dde3ed", height: "fit-content", position: "sticky", top: "120px", borderRadius: "10px", boxShadow: "0 4px 16px rgba(0,0,0,0.07)", margin: "1.5rem 0 1.5rem 1.5rem" },
  sidebarModal: { width: "100%", minWidth: "unset", background: "#ffffff", padding: "0", borderRight: "none", borderRadius: "0", boxShadow: "none", margin: "0", height: "auto", position: "static", top: "auto" },
  title: { fontSize: "1.1rem", fontWeight: "700", color: "#003580", marginBottom: "1.2rem", paddingBottom: "0.5rem", borderBottom: "2px solid #f0f4f8" },
  section: { marginBottom: "1.5rem" },
  label: { fontSize: "0.85rem", fontWeight: "600", color: "#555", marginBottom: "0.5rem", display: "block", textTransform: "uppercase", letterSpacing: "0.5px" },
  range: { width: "100%", accentColor: "#0071c2" },
  rangeLabel: { fontSize: "0.9rem", color: "#003580", fontWeight: "600" },
  checkboxGroup: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  checkboxLabel: { display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", cursor: "pointer" },
  checkbox: { accentColor: "#0071c2", width: "16px", height: "16px" },
  stars: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  starRow: { display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.9rem" },
  resetBtn: { width: "100%", background: "transparent", color: "#0071c2", border: "1px solid #0071c2", padding: "0.6rem", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "0.9rem", marginTop: "0.5rem" },
};

const amenitiesList = ["Pool", "Spa", "Free WiFi", "Gym", "Beach Access", "Parking"];

const mediaQueryStyle = `
  @media (max-width: 768px) {
    .sidebar-container {
      position: static;
      margin: 0 !important;
      padding: 1rem !important;
      border-right: none !important;
      border-bottom: 1px solid #dde3ed;
      min-width: unset !important;
      width: 100% !important;
      top: auto !important;
    }
  }
`;

export default function Sidebar({ filters, onFilterChange, onReset, isMobileModal = false }) {
  const sidebarStyle = isMobileModal ? styles.sidebarModal : styles.sidebar;

  return (
    <>
      <style>{mediaQueryStyle}</style>
      <aside style={sidebarStyle} className="sidebar-container">
        {!isMobileModal && <div style={styles.title}>🎛️ Filter & Sort</div>}
        
        <div style={styles.section}>
          <label style={styles.label}>Sort By</label>
          <select style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #dde3ed", fontSize: "0.9rem", color: "#333", outline: "none" }} value={filters.sortBy} onChange={(e) => onFilterChange("sortBy", e.target.value)}>
            <option value="default">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Rating: High to Low</option>
          </select>
        </div>
        
        <div style={styles.section}>
          <label style={styles.label}>Max Price per Night</label>
          <input style={styles.range} type="range" min={1500} max={10000} step={100} value={filters.maxPrice} onChange={(e) => onFilterChange("maxPrice", Number(e.target.value))} />
          <span style={styles.rangeLabel}>Up to ₹{filters.maxPrice}</span>
        </div>
        
        <div style={styles.section}>
          <label style={styles.label}>Minimum Rating</label>
          <div style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} style={styles.starRow}>
                <input type="radio" name="rating" style={styles.checkbox} checked={filters.minRating === star} onChange={() => onFilterChange("minRating", star)} />
                {"★".repeat(star)}{"☆".repeat(5 - star)} & up
              </label>
            ))}
          </div>
        </div>
        
        <div style={styles.section}>
          <label style={styles.label}>Amenities</label>
          <div style={styles.checkboxGroup}>
            {amenitiesList.map((amenity) => (
              <label key={amenity} style={styles.checkboxLabel}>
                <input type="checkbox" style={styles.checkbox} checked={filters.amenities.includes(amenity)} onChange={(e) => { const updated = e.target.checked ? [...filters.amenities, amenity] : filters.amenities.filter((a) => a !== amenity); onFilterChange("amenities", updated); }} />
                {amenity}
              </label>
            ))}
          </div>
        </div>
        
        <button style={styles.resetBtn} onClick={onReset}>↺ Reset Filters</button>
      </aside>
    </>
  );
}
