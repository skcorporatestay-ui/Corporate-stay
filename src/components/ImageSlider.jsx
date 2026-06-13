import React, { useState, useEffect } from "react";

const styles = {
  slider: {
    position: "relative",
    height: "200px",
    overflow: "hidden",
    borderRadius: "10px 10px 0 0",
    background: "#dde3ed",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    display: "block",
  },
  btn: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.45)",
    color: "white",
    border: "none",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "1.1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  dots: {
    position: "absolute",
    bottom: "8px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "5px",
  },
  dot: (active) => ({
    width: active ? "18px" : "8px",
    height: "8px",
    borderRadius: "4px",
    background: active ? "#f5a623" : "rgba(255,255,255,0.7)",
    transition: "all 0.3s",
    cursor: "pointer",
    border: "none",
  }),
};

export default function ImageSlider({ images, hotelName }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  const prev = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const next = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div style={styles.slider}>
      <img
        src={images[current]}
        alt={`${hotelName} - ${current + 1}`}
        style={styles.image}
      />

      <button style={{ ...styles.btn, left: "10px" }} onClick={prev}>‹</button>
      <button style={{ ...styles.btn, right: "10px" }} onClick={next}>›</button>

      <div style={styles.dots}>
        {images.map((_, i) => (
          <button
            key={i}
            style={styles.dot(i === current)}
            onClick={(e) => {
              e.stopPropagation();
              setCurrent(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}
