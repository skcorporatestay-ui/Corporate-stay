import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HotelList from "./components/HotelList";
import Footer from "./components/Footer";
import hotelsData from "./data/hotels";

const DEFAULT_FILTERS = { sortBy: "default", maxPrice: 10000, minRating: 1, amenities: [] };

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
  const handleReset = () => setFilters(DEFAULT_FILTERS);

  const filteredHotels = useMemo(() => {
    let result = hotelsData.filter((h) => {
      return h.price <= filters.maxPrice &&
        h.rating >= filters.minRating &&
        (filters.amenities.length === 0 || filters.amenities.every((a) => h.amenities.includes(a)));
    });
    if (filters.sortBy === "price_asc") result = [...result].sort((a, b) => a.price - b.price);
    if (filters.sortBy === "price_desc") result = [...result].sort((a, b) => b.price - a.price);
    if (filters.sortBy === "rating_desc") result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [filters]);

  const mediaQueryStyle = `
    @media (max-width: 768px) {
      .main-layout {
        flex-direction: column;
        min-height: auto;
      }
      .sidebar-desktop {
        display: none;
      }
      .hotel-list-container {
        width: 100%;
      }
    }
  `;

  return (
    <div>
      <style>{mediaQueryStyle}</style>
      <Header showFiltersBtn={true} onFiltersClick={() => setShowFilters(!showFilters)} filtersOpen={showFilters} />
      
      {/* Mobile Filters Modal */}
      {showFilters && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999, display: "flex", alignItems: "flex-end" }} onClick={() => setShowFilters(false)}>
          <div style={{ background: "white", width: "100%", maxHeight: "80vh", overflowY: "auto", borderRadius: "12px 12px 0 0", padding: "1rem", animation: "slideUp 0.3s ease" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ margin: 0, color: "#003580" }}>🎛️ Filter & Sort</h3>
              <button onClick={() => setShowFilters(false)} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
            </div>
            <Sidebar filters={filters} onFilterChange={handleFilterChange} onReset={() => { handleReset(); setShowFilters(false); }} isMobileModal={true} />
          </div>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "flex-start", minHeight: "calc(100vh - 130px)", flexDirection: "row", gap: "0" }} className="main-layout">
        <div className="sidebar-desktop">
          <Sidebar filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />
        </div>
        <div className="hotel-list-container">
          <HotelList hotels={filteredHotels} />
        </div>
      </div>
      <Footer />

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
