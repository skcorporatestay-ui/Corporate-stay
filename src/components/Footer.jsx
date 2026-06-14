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

const mediaQueryStyle = `
  @media (max-width: 768px) {
    .footer-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 1.5rem !important;
    }
    .footer-bottom {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 1rem !important;
    }
  }
  
  @media (max-width: 480px) {
    .footer {
      padding: 1.5rem 1rem !important;
    }
    .footer-grid {
      grid-template-columns: 1fr !important;
      gap: 1.2rem !important;
    }
    .footer-brand {
      font-size: 1.2rem !important;
    }
    .footer-col-title {
      font-size: 0.9rem !important;
    }
    .footer-link {
      font-size: 0.8rem !important;
      margin-bottom: 0.4rem !important;
    }
    .footer-faq-q {
      font-size: 0.8rem !important;
    }
    .footer-faq-a {
      font-size: 0.75rem !important;
    }
    .footer-social-btn {
      width: 30px !important;
      height: 30px !important;
      font-size: 0.9rem !important;
    }
    .footer-bottom {
      font-size: 0.75rem !important;
    }
  }
`;

export default function Footer() {
  const [openFaq, setOpenFaq] = useState(null);
  
  return (
    <>
      <style>{mediaQueryStyle}</style>
      <footer style={styles.footer} className="footer">
        <div style={styles.grid} className="footer-grid">
          <div>
            <div style={{ fontSize: "1.4rem", fontWeight: "700", color: "white", marginBottom: "0.8rem" }} className="footer-brand">Dream<span style={{ color: "#f5a623" }}>Stay</span></div>
            <p style={{ fontSize: "0.85rem", lineHeight: "1.6", color: "#9ab0cc" }}>Your trusted partner for finding the perfect stay around the world.</p>
          </div>
          <div>
            <div style={styles.colTitle} className="footer-col-title">Contact Us</div>
            <span style={{...styles.link, className: "footer-link"}}>📧 info@dreamstay.com</span>
            <span style={{...styles.link, className: "footer-link"}}>📞 +1 (800) 123-4567</span>
            <span style={{...styles.link, className: "footer-link"}}>📍 123 Travel Lane, NY 10001</span>
            <span style={{...styles.link, className: "footer-link"}}>🕐 Mon–Fri: 9AM – 6PM EST</span>
          </div>
          <div>
            <div style={styles.colTitle} className="footer-col-title">Quick Links</div>
            <span style={{...styles.link, className: "footer-link"}}>About Us</span>
            <span style={{...styles.link, className: "footer-link"}}>Privacy Policy</span>
            <span style={{...styles.link, className: "footer-link"}}>Terms & Conditions</span>
            <span style={{...styles.link, className: "footer-link"}}>Careers</span>
          </div>
          <div>
            <div style={styles.colTitle} className="footer-col-title">FAQ</div>
            {faqs.map((faq, i) => (
              <div key={i} style={styles.faqItem}>
                <div style={styles.faqQ} className="footer-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}<span>{openFaq === i ? "▲" : "▼"}</span>
                </div>
                {openFaq === i && <div style={styles.faqA} className="footer-faq-a">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
        <div style={styles.bottom} className="footer-bottom">
          <span>© 2026 DreamStay Hotels. All rights reserved.</span>
          <div style={styles.social}>
            <button style={{...styles.socialBtn, className: "footer-social-btn"}}>𝕏</button>
            <button style={{...styles.socialBtn, className: "footer-social-btn"}}>f</button>
            <button style={{...styles.socialBtn, className: "footer-social-btn"}}>in</button>
            <button style={{...styles.socialBtn, className: "footer-social-btn"}}>▶</button>
          </div>
        </div>
      </footer>
    </>
  );
}
