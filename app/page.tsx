"use client";
import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight, CheckCircle2,
  Users, BookOpen, Award, Briefcase, TrendingUp,
  Shield, Globe, Laptop, ChevronDown
} from "lucide-react";

const ENROLL_LINK = "https://rzp.io/rzp/G9oTVv8Z";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const curriculum = [
    { no: "01", title: "Digital Marketing Fundamentals", desc: "Core concepts that underpin every successful campaign" },
    { no: "02", title: "Facebook & Instagram Ads (Live Setup)", desc: "Live ad setup with real targeting strategies" },
    { no: "03", title: "Google Ads Basics Training Program", desc: "Search, Display & remarketing campaigns" },
    { no: "04", title: "Lead Generation Method", desc: "Build systems that attract consistent, quality leads" },
    { no: "05", title: "How to Find Clients for business", desc: "Where to find clients and how to approach them" },
    { no: "06", title: "How to Communicate to the Clients", desc: "Scripts, proposals, and professional handling" },
    { no: "07", title: "Freelancing Setup (Fiverr, Upwork Guide)", desc: "Fiverr, Upwork profiles that get hired" },
    { no: "08", title: "How to Setup Pricing Strategy", desc: "Package your skills for maximum revenue" },
    { no: "09", title: "How to do Campaign Management", desc: "Day-to-day management of live campaigns" },
    { no: "10", title: "Reporting & Client Handling", desc: "Client-ready reports that retain business" },
    { no: "11", title: "Advanced Growth Strategies", desc: "Scaling techniques used by top agencies" },
    { no: "12", title: "How to Close Deals and Get Paid Easily", desc: "Proven frameworks to convert prospects into paying clients" },
  ];

  const tools = [
    { name: "ChatGPT", logo: "/chatgpt.png" },
    { name: "Meta Ads", logo: "/meta.png" },
    { name: "Google Ads", logo: "/google.png" },
    { name: "Instagram Ads", logo: "/instagram.png" },
    { name: "Canva", logo: "/canva.png" },
    { name: "InVideo AI", logo: "/invideo.png" },
    { name: "Gamma App", logo: "/gamma.png" },
    { name: "25+ AI Tools", icon: "✨" },
  ];

  const audience = [
    { icon: <BookOpen size={22} />, title: "Students", desc: "Build income before graduation" },
    { icon: <Users size={22} />, title: "Housewives", desc: "Earn on your own schedule from home" },
    { icon: <Briefcase size={22} />, title: "Job Seekers", desc: "A skill set that gets you hired fast" },
    { icon: <TrendingUp size={22} />, title: "Professionals", desc: "Add a revenue stream to your career" },
    { icon: <Laptop size={22} />, title: "WFH Aspirants", desc: "Location-independent digital career" },
  ];

  const outcomes = [
    "Start Freelancing on Global Platforms",
    "Handle Clients Professionally",
    "Run Paid Ads for Businesses",
    "Work Fully From Home",
    "Create Consistent Side Income",
    "Build Your Own Digital Agency",
  ];

  const faqs = [
    { q: "Is this course suitable for complete beginners?", a: "Absolutely. The course starts from zero — no prior marketing or technical knowledge needed. Mr. Vivek Maurya has specifically designed this for people entering digital marketing for the first time." },
    { q: "How do I access the course after payment?", a: "Immediately after successful payment, you'll receive login credentials on your email. The course is app-based and accessible 24/7 from your mobile phone." },
    { q: "Is there lifetime access?", a: "Yes. Once enrolled, you get lifetime access to all 30 video lessons and any future updates added to the curriculum." },
    { q: "Will I receive a certificate?", a: "Yes. Upon completion, you receive an industry-recognized Digital Marketing certificate from Devine Digital Academy that you can showcase to clients and employers." },
    { q: "Why is it priced at only ₹999?", a: "Our mission is to make quality skill development accessible to everyone. While institutes charge ₹10,000–₹20,000, we believe financial barriers shouldn't stop talented people from growing." },
    { q: "Can I earn money after this course?", a: "Yes. The course is structured around practical, income-generating skills — running ads, getting clients, setting up freelance profiles, and closing deals. Many students start earning within weeks." },
  ];

  const reviews = [
    { name: "Lakhwinder Chouhan", text: "Devine academy offers an excellent experience for students. The curriculum is very relevant and covers important topics.", date: "Google Review" },
    { name: "Nilofar digital", text: "My experience at devine academy was exceptional the curriculum was robust and engaging for all students", date: "Google Review" },
    { name: "Rajnish Goyal", text: "I did a digital marketing course from them and i landed a consultancy job in the same field, Great experience.", date: "Google Review" },
    { name: "Parveen Garg", text: "Thankyou Devine Digital Academy. I have learnt a Digital Marketing Couse. I'm working as a freelance and learn 50,000 per month.", date: "Google Review" },
    { name: "Twinkle Garg", text: "Maine yaha c Digital Marketing ka course sikha hai...Trainers are very good...main as a Social Media Manager work Kar Rahi hu...thank you devine Digital academy.", date: "Google Review" },
    { name: "amisha goyal", text: "Outstanding digital marketing course! The mentor is highly knowledgeable, and the support is top-notch.", date: "Google Review" },
    { name: "Satyam Kumar Maurya", text: "Great learning experience. Practical ad setup and lead generation strategies were very useful.", date: "Google Review" },
    { name: "Neelu Khan", text: "Very affordable course compared to others. Highly recommended for work from home options.", date: "Google Review" },
    { name: "Isha Kaushik", text: "The certification program is great and Vivek sir explains everything in a very simple language.", date: "Google Review" }
  ];

  return (
    <div className="grain-overlay" style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{ background: 'rgba(250,247,242,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--mist)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="nav-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Image
              src="/devine_logo.png"
              alt="Devine Digital Academy Logo"
              width={38}
              height={38}
              style={{
                borderRadius: 6,
                objectFit: 'contain'
              }}
            />
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', lineHeight: 1.1 }}>Devine Digital</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', color: 'var(--slate)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Academy</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <a href="#curriculum" className="nav-link">Curriculum</a>
            <a href="#mentor" className="nav-link">Mentor</a>
            <a href={ENROLL_LINK} className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem', animation: 'none' }}>
              Enroll — ₹999
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: -50, left: -80, width: 400, height: 400, background: 'radial-gradient(circle, rgba(42,92,69,0.2) 0%, transparent 70%)', borderRadius: '50%' }} />
          <svg style={{ position: 'absolute', top: 0, right: 0, opacity: 0.04 }} width="500" height="500" viewBox="0 0 500 500">
            <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9A84C" strokeWidth="1"/></pattern></defs>
            <rect width="500" height="500" fill="url(#grid)" />
          </svg>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="hero-grid">
            <div style={{ animation: 'fadeUp 0.8s ease forwards' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span className="section-tag" style={{ margin: 0 }}>Digital Marketing · Hindi · Mobile App</span>
              </div>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: 24, color: 'var(--warm-white)' }}>
                Learn Digital Marketing.<br />
                <span className="gold-shimmer">Start Working From Home.</span>
              </h1>
              <div className="hero-image-mobile">
                <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 80%)' }} />
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image
                      src="/devine_logo.png"
                      alt="Devine Digital Academy Hero Logo"
                      fill
                      style={{
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 8px 24px rgba(201,168,76,0.35))'
                      }}
                    />
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '1.15rem', color: 'rgba(250,247,242,0.7)', maxWidth: 520, lineHeight: 1.7, marginBottom: 36 }}>
                Basic to Advanced training by <strong style={{ color: 'var(--gold-light)' }}>Mr. Vivek Maurya (Co-Founder, Devine Digital Academy)</strong> — 12+ years of real market experience. Not just theory. We train you to <em>get work.</em>
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
                {[
                  { icon: <BookOpen size={15} />, text: "30 Video Lessons" },
                  { icon: <Globe size={15} />, text: "Hindi Medium" },
                  { icon: <Shield size={15} />, text: "Lifetime Access" },
                  { icon: <Award size={15} />, text: "Certificate Included" },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 4, padding: '7px 14px', fontSize: '0.85rem', color: 'rgba(250,247,242,0.8)' }}>
                    <span style={{ color: 'var(--gold)' }}>{item.icon}</span> {item.text}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                <a href={ENROLL_LINK} className="btn-primary" style={{ fontSize: '1.1rem', padding: '16px 44px' }}>
                  Enroll Now — Just ₹999 <ArrowRight size={18} />
                </a>
                <div style={{ color: 'rgba(250,247,242,0.5)', fontSize: '0.85rem' }}>
                  <span style={{ color: 'rgba(250,247,242,0.3)', textDecoration: 'line-through', marginRight: 8 }}>₹10,000–₹20,000</span>
                  Limited seats
                </div>
              </div>
            </div>

            {/* Hero Card with Logo and Highlights */}
            <div className="hero-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <div className="hero-image-card" style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 80%)' }} />
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image
                    src="/devine_logo.png"
                    alt="Devine Digital Academy Hero Logo"
                    fill
                    style={{
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 8px 24px rgba(201,168,76,0.35))'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--warm-white)' }}>Course Highlights</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.05em', marginTop: 2 }}>VIVEK MAURYA · CO-FOUNDER</div>
                </div>
                {[
                  { icon: "📱", label: "Mobile App Based" },
                  { icon: "🕐", label: "Learn at Your Own Pace" },
                  { icon: "💬", label: "Taught in Hindi" },
                  { icon: "🏆", label: "Industry Certificate" },
                  { icon: "♾️", label: "Lifetime Access" },
                  { icon: "👥", label: "Real Case Studies" },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', borderBottom: i < 5 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                    <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                    <span style={{ fontSize: '0.88rem', color: 'rgba(250,247,242,0.75)' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: 'var(--gold)', padding: '28px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 20 }}>
          {[
            { num: "12+", label: "Years Experience" },
            { num: "30", label: "Video Lessons" },
            { num: "₹999", label: "Complete Course" },
            { num: "100%", label: "Practical Training" },
            { num: "8+", label: "AI Tools Covered" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: '2rem', color: 'var(--ink)', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(15,14,12,0.6)', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHO SHOULD JOIN */}
      <section className="section-padding" style={{ background: 'var(--warm-white)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-tag">Who Is This For</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, color: 'var(--ink)' }}>
              If you want a skill that <em>pays you</em>
            </h2>
            <p style={{ color: 'var(--slate)', marginTop: 12, fontSize: '1.05rem' }}>— this course is designed for you.</p>
          </div>
          <div className="audience-grid">
            {audience.map((a, i) => (
              <div key={i} className="card-hover" style={{ background: 'var(--cream)', border: '1px solid var(--mist)', borderRadius: 12, padding: '32px 20px', textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, background: 'var(--ink)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--gold)' }}>{a.icon}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)', marginBottom: 8 }}>{a.title}</div>
                <div style={{ color: 'var(--slate)', fontSize: '0.85rem', lineHeight: 1.5 }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOOGLE TESTIMONIALS */}
      <section id="reviews" className="section-padding" style={{ background: 'var(--cream)', borderTop: '1px solid var(--mist)', borderBottom: '1px solid var(--mist)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-tag" style={{ background: 'rgba(201,168,76,0.1)', color: 'var(--gold)', borderColor: 'rgba(201,168,76,0.2)' }}>Reviews</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, color: 'var(--ink)' }}>
              See How My Students Increased Their Leads &amp; Sales
            </h2>
            <p style={{ color: 'var(--slate)', marginTop: 12, fontSize: '1.05rem' }}>Skill-Based Learning That Converts Into Income</p>
          </div>
          <div className="testimonials-grid">
            {reviews.map((rev, i) => (
              <div key={i} className="card-hover" style={{ background: 'var(--warm-white)', border: '1px solid var(--mist)', borderRadius: 12, padding: '24px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2, color: '#f59e0b', marginBottom: 12 }}>
                    {Array(5).fill("★").map((star, idx) => (
                      <span key={idx} style={{ fontSize: '1rem' }}>{star}</span>
                    ))}
                  </div>
                  <p style={{ color: 'var(--slate)', fontSize: '0.9rem', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 16 }}>
                    &quot;{rev.text}&quot;
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid var(--cream)', paddingTop: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--ink)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.85rem' }}>
                    {rev.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)' }}>{rev.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--slate)', fontFamily: 'DM Mono, monospace' }}>{rev.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO TESTIMONIALS */}
      <section className="section-padding" style={{ background: 'var(--ink)', color: 'var(--cream)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-tag" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--gold)', borderColor: 'rgba(255,255,255,0.1)' }}>Video Proof</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, color: 'var(--warm-white)' }}>
              Real Faces. Real Stories. Real Trust.
            </h2>
            <p style={{ color: 'rgba(250,247,242,0.6)', marginTop: 12, fontSize: '1.05rem' }}>Watch success reviews from our active students</p>
          </div>
          
          <div className="bento-grid">
            {/* Promo Video Card (Bento span 2) */}
            <div className="bento-card-main">
              <div className="bento-video-wrapper-main">
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 8, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
                  <iframe
                    src="https://www.youtube.com/embed/2wx8YFyenbc"
                    title="Promo Video"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.2rem', color: 'var(--warm-white)', marginBottom: 8 }}>Mr. Vivek Maurya — Course Overview &amp; Strategy</div>
                <p style={{ fontSize: '0.88rem', color: 'rgba(250,247,242,0.65)', lineHeight: 1.6, maxWidth: 520, margin: '0 auto' }}>
                  Learn how our mobile-app training helps you build high-value freelancing skills from home. Not just theory, but real campaign setups.
                </p>
              </div>
            </div>
            
            {/* Aarti Rai Short Card */}
            <div className="bento-card-short">
              <div className="bento-video-wrapper-short">
                <div style={{ position: 'relative', paddingBottom: '177.77%', height: 0, overflow: 'hidden', borderRadius: 8, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
                  <iframe
                    src="https://www.youtube.com/embed/YqWambOuoC0"
                    title="Aarti Rai Review"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--warm-white)', marginBottom: 4 }}>Aarti Rai</div>
                <p style={{ fontSize: '0.78rem', color: 'rgba(250,247,242,0.5)', lineHeight: 1.5 }}>Success story of lead gen &amp; digital marketing course completion.</p>
              </div>
            </div>

            {/* Doshant Singh Short Card */}
            <div className="bento-card-short">
              <div className="bento-video-wrapper-short">
                <div style={{ position: 'relative', paddingBottom: '177.77%', height: 0, overflow: 'hidden', borderRadius: 8, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
                  <iframe
                    src="https://www.youtube.com/embed/eQh4P4bl5TA"
                    title="Doshant Singh Review"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--warm-white)', marginBottom: 4 }}>Doshant Singh</div>
                <p style={{ fontSize: '0.78rem', color: 'rgba(250,247,242,0.5)', lineHeight: 1.5 }}>Student shares his results running ads and closing remote clients.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" className="section-padding" style={{ background: 'var(--ink)', color: 'var(--cream)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="curriculum-grid">
            <div className="curriculum-left">
              <div className="section-tag">The Curriculum</div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, color: 'var(--warm-white)', lineHeight: 1.2 }}>
                30 Complete<br />Video Lessons
              </h2>
              <div className="divider-line" />
              <p style={{ color: 'rgba(250,247,242,0.65)', lineHeight: 1.75, marginBottom: 32 }}>
                Every module is built around practical execution. You learn by doing, watching real campaigns, and following step-by-step systems that work in the Indian market.
              </p>
              <a href={ENROLL_LINK} className="btn-primary">
                Start Learning — ₹999 <ArrowRight size={16} />
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {curriculum.map((item, i) => (
                <div key={i}
                  style={{ display: 'flex', gap: 20, padding: '16px 18px', borderRadius: 8, background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent', border: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s', cursor: 'default' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent')}>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'var(--gold)', opacity: 0.6, paddingTop: 2, minWidth: 22, flexShrink: 0 }}>{item.no}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--warm-white)', fontSize: '0.92rem', marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(250,247,242,0.45)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="section-padding" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-tag">Tools You&apos;ll Master</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, color: 'var(--ink)' }}>
              Industry&apos;s most powerful toolkit
            </h2>
          </div>
          <div className="tools-grid">
            {tools.map((tool, i) => (
              <div key={i} className="card-hover" style={{ background: 'var(--warm-white)', border: '1px solid var(--mist)', borderRadius: 12, padding: '28px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 140 }}>
                <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  {tool.logo ? (
                    <Image
                      src={tool.logo}
                      alt={tool.name}
                      width={48}
                      height={48}
                      style={{ objectFit: 'contain' }}
                    />
                  ) : (
                    <span style={{ fontSize: '2.2rem' }}>{tool.icon}</span>
                  )}
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--ink)' }}>{tool.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENTOR */}
      <section id="mentor" className="section-padding" style={{ background: 'var(--warm-white)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="mentor-grid">
            <div>
              <div className="section-tag">Your Mentor</div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, color: 'var(--ink)', marginBottom: 4 }}>Mr. Vivek Maurya</h2>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.78rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 24 }}>Co-Founder, Devine Digital Academy</div>
              <div className="divider-line" />
              <p style={{ color: 'var(--slate)', lineHeight: 1.8, marginBottom: 20, fontSize: '1rem' }}>
                With <strong style={{ color: 'var(--ink)' }}>12+ years of hands-on experience</strong>, Mr. Vivek Maurya has built scalable marketing systems and high-converting campaigns for brands, businesses, and startups — generating multi-crore revenue across industries.
              </p>
              <p style={{ color: 'var(--slate)', lineHeight: 1.8, marginBottom: 32, fontSize: '1rem' }}>
                Unlike theoretical trainers, his teaching centers on <strong style={{ color: 'var(--ink)' }}>real market execution</strong> — profitable ads, real clients, structured offers, and income systems you can deploy immediately.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {["Performance Marketing", "Facebook & Instagram Ads", "Google Ads", "Lead Generation Systems", "Client Acquisition & Closing", "Freelancing Business Setup"].map((skill, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.87rem', color: 'var(--ink)' }}>
                    <CheckCircle2 size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ background: 'var(--ink)', borderRadius: 16, overflow: 'hidden', aspectRatio: '4/5', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', position: 'relative' }}>
                <Image
                  src="/devine_mentor.jpeg"
                  alt="Mr. Vivek Maurya"
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'top center'
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(42,92,69,0.2))', zIndex: 1 }} />
                <div style={{ position: 'relative', zIndex: 2, padding: 28, width: '100%', background: 'linear-gradient(to top, rgba(15,14,12,0.95), transparent)' }}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.3rem', color: 'var(--warm-white)' }}>Mr. Vivek Maurya</div>
                  <div style={{ color: 'var(--gold)', fontSize: '0.82rem', fontFamily: 'DM Mono, monospace', letterSpacing: '0.08em' }}>12+ Years · Digital Marketing Expert</div>
                </div>
              </div>
              <div className="mentor-badge">
                <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: '1.6rem', color: 'var(--ink)', lineHeight: 1 }}>12+</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(15,14,12,0.65)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Years Exp.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE COMPARISON */}
      <section className="section-padding" style={{ background: 'var(--ink)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="section-tag">The Real Choice</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, color: 'var(--warm-white)' }}>
              What does ₹999 really buy you?
            </h2>
          </div>
          <div className="comparison-grid">
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '36px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <span style={{ fontSize: '1.4rem' }}>❌</span>
                <div>
                  <div style={{ fontWeight: 700, color: 'rgba(250,247,242,0.7)', fontSize: '0.95rem' }}>Spending ₹999</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: 'rgba(250,247,242,0.35)', marginTop: 2 }}>On random things</div>
                </div>
              </div>
              {[
                "3 Days Entertainment",
                "Temporary enjoyment, zero growth",
                "Money spent, no skill gained",
                "Time gone, nothing to show",
                "No improvement in career or income",
                "No future earning opportunity"
              ].map((point, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
                  <span style={{ color: '#ef4444', marginTop: 2, flexShrink: 0 }}>✕</span>
                  <span style={{ color: 'rgba(250,247,242,0.5)', fontSize: '0.88rem' }}>{point}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, padding: '36px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <span style={{ fontSize: '1.4rem' }}>🎓</span>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--gold-light)', fontSize: '0.95rem' }}>Investing ₹999</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: 'var(--gold)', marginTop: 2, opacity: 0.6 }}>In this course</div>
                </div>
              </div>
              {[
                "Lifetime Skill Access",
                "Learn Digital Marketing from Basic to Advanced",
                "Understand how to run real ads & generate leads",
                "Learn how to find & talk to clients confidently",
                "Start Freelancing / Work From Home",
                "Build a skill that can generate income"
              ].map((point, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}>
                  <CheckCircle2 size={15} style={{ color: 'var(--gold)', marginTop: 2, flexShrink: 0 }} />
                  <span style={{ color: 'rgba(250,247,242,0.85)', fontSize: '0.88rem' }}>{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: 'var(--warm-white)', marginBottom: 8 }}>One-time ₹999 investment.</div>
            <div style={{ color: 'var(--gold)', fontSize: '1.05rem', marginBottom: 36 }}>Lifetime skill. Long-term income potential.</div>
            <a href={ENROLL_LINK} className="btn-primary" style={{ fontSize: '1.1rem' }}>
              Invest in Yourself Today <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="section-padding" style={{ background: 'var(--accent)', color: 'var(--cream)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="outcomes-grid">
            <div>
              <div className="section-tag" style={{ color: 'var(--gold)', borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.1)' }}>After This Course</div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, color: 'var(--warm-white)', lineHeight: 1.2, marginBottom: 16 }}>
                You&apos;ll be equipped to<br />earn independently
              </h2>
              <div className="divider-line" />
              <p style={{ color: 'rgba(250,247,242,0.7)', lineHeight: 1.8 }}>
                Every module is a step toward financial independence — whether you choose freelancing, agency work, or a salaried digital marketing role.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {outcomes.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: '16px 22px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ width: 34, height: 34, background: 'var(--gold)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={15} color="var(--ink)" />
                  </div>
                  <span style={{ fontWeight: 500, fontSize: '0.93rem', color: 'var(--warm-white)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATION */}
      <section className="section-padding" style={{ background: 'var(--warm-white)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div className="section-tag">Certification</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
            Earn a certificate that opens doors
          </h2>
          <p style={{ color: 'var(--slate)', fontSize: '1.05rem', maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.7 }}>
            Upon completion, receive an industry-recognized Digital Marketing certificate — showcase it to employers, clients, and your professional network.
          </p>
            <div className="card-hover" style={{ background: 'var(--ink)', borderRadius: 16, overflow: 'hidden', maxWidth: 540, margin: '0 auto', border: '2px solid var(--gold)', position: 'relative', boxShadow: '0 24px 80px rgba(0,0,0,0.2)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold))' }} />
              <div style={{ padding: '32px 32px 16px 32px', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🏅</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: '1.5rem', color: 'var(--warm-white)', marginBottom: 4 }}>Certificate of Completion</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.12em', marginBottom: 12 }}>DEVINE DIGITAL ACADEMY · DIGITAL MARKETING</div>
              </div>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: 'var(--charcoal)', display: 'flex', justifyContent: 'center' }}>
                <Image
                  src="/devine_certificate.jpg"
                  alt="Devine Digital Academy Certificate Sample"
                  fill
                  style={{
                    borderRadius: 8,
                    border: '1px solid rgba(201,168,76,0.3)',
                    boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>
            <div style={{ color: 'rgba(15,14,12,0.45)', fontSize: '0.85rem', marginTop: 24 }}>Issued upon successful course completion</div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="section-tag">FAQs</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, color: 'var(--ink)' }}>Common questions, answered</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: 'var(--warm-white)', border: `1px solid ${openFaq === i ? 'var(--gold)' : 'var(--mist)'}`, borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--ink)' }}>{faq.q}</span>
                  <ChevronDown size={18} style={{ color: 'var(--gold)', flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }} />
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', color: 'var(--slate)', fontSize: '0.9rem', lineHeight: 1.75, borderTop: '1px solid var(--mist)' }}>
                    <div style={{ paddingTop: 16 }}>{faq.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding" style={{ background: 'var(--ink)', textAlign: 'center', position: 'relative', overflow: 'hidden', paddingBottom: '120px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto' }}>
          <div className="section-tag">Limited Time Offer</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: 'var(--warm-white)', marginBottom: 20, lineHeight: 1.2 }}>
            Don&apos;t miss your chance to<br /><span className="gold-shimmer">build a skill that pays</span>
          </h2>
          <p style={{ color: 'rgba(250,247,242,0.6)', fontSize: '1.05rem', marginBottom: 48, lineHeight: 1.7 }}>
            Seats are limited. The price of ₹999 won&apos;t last.<br />Start your digital career today with a single click.
          </p>
          <a href={ENROLL_LINK} className="btn-primary" style={{ fontSize: '1.15rem', padding: '18px 52px' }}>
            Enroll Now — Just ₹999 <ArrowRight size={20} />
          </a>
          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {["Instant Access", "Lifetime Validity", "Certificate Included"].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(250,247,242,0.45)', fontSize: '0.82rem' }}>
                <CheckCircle2 size={13} style={{ color: 'var(--gold)', opacity: 0.7 }} /> {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#080807', padding: '48px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Image
              src="/devine_logo.png"
              alt="Devine Digital Academy Logo"
              width={32}
              height={32}
              style={{
                borderRadius: 6,
                objectFit: 'contain'
              }}
            />
            <span style={{ fontFamily: 'Playfair Display, serif', color: 'rgba(250,247,242,0.85)', fontSize: '1rem', fontWeight: 600 }}>Devine Digital Academy</span>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', fontSize: '0.88rem' }}>
            <a href="#curriculum" className="footer-link">Curriculum</a>
            <a href="#mentor" className="footer-link">Mentor</a>
            <a href="#reviews" className="footer-link">Reviews</a>
            <a href={ENROLL_LINK} className="footer-link-gold">Enroll Now →</a>
          </div>
          <div style={{ color: 'rgba(250,247,242,0.3)', fontSize: '0.78rem', fontFamily: 'DM Mono, monospace' }}>
            © 2026 Devine Digital Academy · All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
}
