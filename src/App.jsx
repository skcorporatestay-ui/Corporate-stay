import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HotelList from "./components/HotelList";
import Footer from "./components/Footer";
import hotelsData from "./data/hotels";

const DEFAULT_FILTERS = { sortBy: "default", maxPrice: 10000, minRating: 1, amenities: [] };

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
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

  return (
    <div>
      <Header />
      <div style={{ display: "flex", alignItems: "flex-start", minHeight: "calc(100vh - 130px)" }}>
        <Sidebar filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />
        <HotelList hotels={filteredHotels} />
      </div>
      <Footer />
    </div>
  );
}
