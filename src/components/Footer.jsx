import React, { useState } from "react";

const styles = {
  footer: { background: "linear-gradient(135deg, #002a6e 0%, #003580 100%)", color: "#cdd9f0", padding: "2.5rem 2rem 1rem", marginTop: "auto" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2rem" },
  colTitle: { color: "#f5a623", fontWeight: "700", fontSize: "1rem", marginBottom: "1rem" },
  link: { display: "block", color: "#b0c4de", textDecoration: "none", fontSize: "0.88rem", marginBottom: "0.5rem", cursor: "pointer" },
  faqItem: { marginBottom: "0.8rem", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "0.8rem" },
  faqQ: { color: "#dce8ff", fontWeight: "600", fontSize: "0.85rem", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" },
  faqA: { color: "#9ab0cc", fontSize: "0.82rem", marginTop: "0.4rem", lineHeight: "1.5" },
  bottom: { borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", fontSize: "0.82rem" },
  social: { display: "flex", gap: "0.8rem" },
  socialBtn: { background: "rgba(255,255,255,0.1)", border: "none", color: "white", width: "34px", height: "34px", borderRadius: "50%", cursor: "pointer", fontSize: "1rem" },
};

const faqs = [
  { q: "How do I cancel a booking?", a: "Visit My Bookings, select the reservation, and click Cancel. Free cancellations are available up to 24 hours before check-in." },
  { q: "Is free WiFi available?", a: "Most of our partner hotels offer complimentary WiFi. Look for the Free WiFi amenity tag on the listing." },
  { q: "Are pets allowed?", a: "Pet policies vary by property. Filter by 'Pet Friendly' or check the individual hotel's policy page." },
];

export default function Footer() {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <footer style={styles.footer}>
      <div style={styles.grid}>
        <div>
          <div style={{ fontSize: "1.4rem", fontWeight: "700", color: "white", marginBottom: "0.8rem" }}>Dream<span style={{ color: "#f5a623" }}>Stay</span></div>
          <p style={{ fontSize: "0.85rem", lineHeight: "1.6", color: "#9ab0cc" }}>Your trusted partner for finding the perfect stay around the world.</p>
        </div>
        <div>
          <div style={styles.colTitle}>Contact Us</div>
          <span style={styles.link}>📧 info@dreamstay.com</span>
          <span style={styles.link}>📞 +1 (800) 123-4567</span>
          <span style={styles.link}>📍 123 Travel Lane, NY 10001</span>
          <span style={styles.link}>🕐 Mon–Fri: 9AM – 6PM EST</span>
        </div>
        <div>
          <div style={styles.colTitle}>Quick Links</div>
          <span style={styles.link}>About Us</span>
          <span style={styles.link}>Privacy Policy</span>
          <span style={styles.link}>Terms & Conditions</span>
          <span style={styles.link}>Careers</span>
        </div>
        <div>
          <div style={styles.colTitle}>FAQ</div>
          {faqs.map((faq, i) => (
            <div key={i} style={styles.faqItem}>
              <div style={styles.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}<span>{openFaq === i ? "▲" : "▼"}</span>
              </div>
              {openFaq === i && <div style={styles.faqA}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
      <div style={styles.bottom}>
        <span>© 2026 DreamStay Hotels. All rights reserved.</span>
        <div style={styles.social}>
          <button style={styles.socialBtn}>𝕏</button>
          <button style={styles.socialBtn}>f</button>
          <button style={styles.socialBtn}>in</button>
          <button style={styles.socialBtn}>▶</button>
        </div>
      </div>
    </footer>
  );
}
