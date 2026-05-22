"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight, AppWindow, Mail, Sparkles } from "lucide-react";

export default function Success() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const fbWindow = window as unknown as { fbq?: (event: string, action: string, data?: Record<string, unknown>) => void };
      if (fbWindow.fbq) {
        fbWindow.fbq('track', 'Purchase', { value: 999.00, currency: 'INR' });
      }
    }
  }, []);

  return (
    <div className="grain-overlay" style={{ background: "var(--cream)", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      
      {/* NAV */}
      <nav style={{ background: "rgba(250,247,242,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--mist)", position: "sticky", top: 0, zIndex: 100 }}>
        <div className="nav-container">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Image
              src="/devine_logo.png"
              alt="Devine Digital Academy Logo"
              width={38}
              height={38}
              style={{
                borderRadius: 6,
                objectFit: "contain"
              }}
            />
            <div>
              <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "1rem", color: "var(--ink)", lineHeight: 1.1 }}>Devine Digital</div>
              <div style={{ fontFamily: "DM Mono, monospace", fontSize: "0.62rem", color: "var(--slate)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Academy</div>
            </div>
          </div>
          <Link href="/" className="footer-link" style={{ fontSize: "0.9rem", color: "var(--slate)", textDecoration: "none" }}>
            &larr; Back to Home
          </Link>
        </div>
      </nav>

      {/* CONTENT */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px" }}>
        <div className="card-hover" style={{ background: "var(--warm-white)", border: "1px solid var(--mist)", borderRadius: 20, padding: "48px 32px", maxWidth: 540, width: "100%", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.05)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: "linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold))" }} />
          
          <div style={{ width: 72, height: 72, background: "rgba(42,92,69,0.1)", color: "var(--accent)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <CheckCircle2 size={38} />
          </div>

          <div style={{ fontFamily: "DM Mono, monospace", fontSize: "0.78rem", color: "var(--gold)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Sparkles size={12} /> Payment Successful <Sparkles size={12} />
          </div>
          
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "2.2rem", fontWeight: 800, color: "var(--ink)", marginBottom: 16, lineHeight: 1.2 }}>
            Welcome to Devine Digital Academy!
          </h1>
          
          <p style={{ color: "var(--slate)", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: 32 }}>
            Thank you for enrolling in our certification course. You have taken a huge step toward building high-income digital marketing skills!
          </p>

          <div className="divider-line" style={{ margin: "0 auto 24px" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left", background: "var(--cream)", border: "1px solid var(--mist)", borderRadius: 12, padding: 20, marginBottom: 32 }}>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--ink)", marginBottom: 4 }}>Next Steps to Start Learning:</div>
            
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ color: "var(--accent)", marginTop: 2 }}><Mail size={16} /></div>
              <div style={{ fontSize: "0.88rem", color: "var(--slate)", lineHeight: 1.5 }}>
                <strong style={{ color: "var(--ink)" }}>Check your Email:</strong> We have sent your course login credentials and app instructions to your registered email address.
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ color: "var(--accent)", marginTop: 2 }}><AppWindow size={16} /></div>
              <div style={{ fontSize: "0.88rem", color: "var(--slate)", lineHeight: 1.5 }}>
                <strong style={{ color: "var(--ink)" }}>Download our Mobile App:</strong> Access all 30 video lessons anytime, 24/7 on your mobile or tablet.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Link href="/" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px" }}>
              Go back to Home <ArrowRight size={16} />
            </Link>
            <div style={{ fontSize: "0.78rem", color: "var(--slate)" }}>
              Need help? Contact support at <strong style={{ color: "var(--ink)" }}>support@devinedigitalacademy.co.in</strong>
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: "#080807", padding: "24px", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
        <div style={{ color: "rgba(250,247,242,0.3)", fontSize: "0.78rem", fontFamily: "DM Mono, monospace" }}>
          &copy; 2026 Devine Digital Academy &bull; All rights reserved
        </div>
      </footer>

    </div>
  );
}
