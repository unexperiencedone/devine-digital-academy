"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight, CheckCircle2, BookOpen, Award,
  Shield, Globe, ChevronDown, X, Lock
} from "lucide-react";

const ENROLL_LINK = "https://rzp.io/rzp/G9oTVv8Z";

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});

  // Modal & Lead Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", phone: "", email: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const renderVideo = (videoId: string, title: string, aspectRatio: string = "56.25%") => {
    const isPlay = activeVideos[videoId];
    if (isPlay) {
      return (
        <div style={{ position: 'relative', paddingBottom: aspectRatio, height: 0, overflow: 'hidden', borderRadius: 8, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
            title={title}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    const getThumbnailUrl = (id: string) => {
      if (id === "2wx8YFyenbc") {
        return `https://img.youtube.com/vi/${id}/sddefault.jpg`;
      }
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    };

    return (
      <div 
        onClick={() => setActiveVideos(prev => ({ ...prev, [videoId]: true }))}
        className="video-facade-container"
        style={{ position: 'relative', paddingBottom: aspectRatio, height: 0, overflow: 'hidden', borderRadius: 8, boxShadow: '0 8px 30px rgba(0,0,0,0.3)', cursor: 'pointer' }}
      >
        <Image
          src={getThumbnailUrl(videoId)}
          alt={title}
          fill
          sizes={aspectRatio === "56.25%" ? "(max-width: 768px) 320px, 420px" : "(max-width: 768px) 180px, 230px"}
          style={{ objectFit: 'cover' }}
          className="video-facade-thumbnail"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
        <div className="video-facade-play-btn">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyCta(true);
      } else {
        setShowStickyCta(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openEnrollModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsModalOpen(true);
    setFormErrors({});
  };

  const closeEnrollModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLeadForm(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!leadForm.name.trim()) {
      errors.name = "Full name is required";
    }
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = leadForm.phone.replace(/[^0-9]/g, "");
    if (!cleanPhone) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(cleanPhone)) {
      errors.phone = "Enter a valid 10-digit phone number";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!leadForm.email.trim()) {
      errors.email = "Email address is required";
    } else if (!emailRegex.test(leadForm.email.trim())) {
      errors.email = "Enter a valid email address";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setIsSubmitting(true);
    try {
      const existingLeadsStr = localStorage.getItem("dda_leads");
      const leads = existingLeadsStr ? JSON.parse(existingLeadsStr) : [];
      leads.push({
        ...leadForm,
        phone: cleanPhone,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("dda_leads", JSON.stringify(leads));
    } catch (err) {
      console.error("Error saving lead locally:", err);
    }

    // Post to Next.js serverless route handler to securely log to Google Sheets
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: leadForm.name,
          phone: cleanPhone,
          email: leadForm.email,
        }),
      });
    } catch (err) {
      console.error("Error sending lead to serverless backend:", err);
    }

    trackEnrollClick();
    const prefilledUrl = `${ENROLL_LINK}?prefill[name]=${encodeURIComponent(leadForm.name)}&prefill[email]=${encodeURIComponent(leadForm.email)}&prefill[contact]=${encodeURIComponent(cleanPhone)}`;
    
    // Reset form and modal states
    setLeadForm({ name: "", phone: "", email: "" });
    setIsSubmitting(false);
    setIsModalOpen(false);

    window.location.href = prefilledUrl;
  };

  const siteUrl = "https://devinedigitalacademy.co.in";

  const trackEnrollClick = () => {
    if (typeof window !== "undefined") {
      const fbWindow = window as unknown as { fbq?: (event: string, action: string) => void };
      if (fbWindow.fbq) {
        fbWindow.fbq('track', 'InitiateCheckout');
      }
    }
  };

  const sharePresets = [
    {
      id: "value",
      label: "💰 Price & Skills Value",
      tagline: "Unbeatable price for elite marketing skills",
      description: "Get full practical training in Ads setup, client closing, and freelancing for just ₹999 instead of ₹15,000.",
      message: "🚀 Why pay ₹15,000+ for digital marketing training? Master Facebook Ads, Google Ads, Lead Generation & Freelancing in Hindi for just ₹999! Taught by Mr. Vivek Maurya (12+ years experience) with 100% practical, video-based training. Lifetime access & certificate included!",
    },
    {
      id: "mentor",
      label: "🎓 Expert Mentor Skillset",
      tagline: "Learn directly from a 12+ years expert",
      description: "Mr. Vivek Maurya teaches the exact marketing framework he uses to generate multi-crore revenue.",
      message: "🔥 Learn digital marketing from a true expert! Mr. Vivek Maurya (Co-Founder, Devine Digital Academy) is sharing his 12+ years of performance marketing experience in a complete practical course for only ₹999. Learn live ad setups, client acquisition, and high-income freelancing!",
    },
    {
      id: "wfh",
      label: "🏡 Work From Home",
      tagline: "Ideal path for students & housewives",
      description: "Build an independent freelance career and earn side income on your own schedule.",
      message: "💻 Want to work from home and earn a steady side income? Perfect for students and housewives! Learn high-demand digital marketing skills & client closing from 12+ years expert Mr. Vivek Maurya for just ₹999. Get certified and start freelancing from your mobile or laptop!",
    }
  ];

  const [activePreset, setActivePreset] = useState(sharePresets[0]);

  const handleCopyPreset = () => {
    navigator.clipboard.writeText(`${activePreset.message}\n\nJoin here: ${siteUrl}`);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(`${activePreset.message}\n\n#DevineDigitalAcademy #DigitalMarketing #WorkFromHome #FreelancingIndia #LearnInHindi #FacebookAds #GoogleAds`);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

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
    { image: "/students.png", title: "Students", desc: "Build income before graduation" },
    { image: "/housewives.png", title: "Housewives", desc: "Earn on your own schedule from home" },
    { image: "/job seekers.png", title: "Job Seekers", desc: "A skill set that gets you hired fast" },
    { image: "/professionals.png", title: "Professionals", desc: "Add a revenue stream to your career" },
    { image: "/wfh.png", title: "WFH Aspirants", desc: "Location-independent digital career" },
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
            <a href="#" onClick={openEnrollModal} className="btn-primary nav-enroll-btn" style={{ padding: '10px 24px', fontSize: '0.9rem', animation: 'none' }}>
              Register Now
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
                      priority
                      sizes="(max-width: 500px) 100vw, 300px"
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
                <a href="#" onClick={openEnrollModal} className="btn-primary" style={{ fontSize: '1.1rem', padding: '16px 44px' }}>
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
                    priority
                    sizes="300px"
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
              <div key={i} className="card-hover" style={{ background: 'var(--ink)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 12, padding: '24px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', marginBottom: 16, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1199px) 33vw, 200px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--gold-light)', marginBottom: 8 }}>{a.title}</div>
                <div style={{ color: 'rgba(250,247,242,0.78)', fontSize: '0.85rem', lineHeight: 1.5 }}>{a.desc}</div>
              </div>
            ))}
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
              <a href="#" onClick={openEnrollModal} className="btn-primary">
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
                  sizes="(max-width: 768px) 100vw, 450px"
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
            <a href="#" onClick={openEnrollModal} className="btn-primary" style={{ fontSize: '1.1rem' }}>
              Invest in Yourself Today <ArrowRight size={18} />
            </a>
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
                {renderVideo("2wx8YFyenbc", "Promo Video", "56.25%")}
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
                {renderVideo("YqWambOuoC0", "Aarti Rai Review", "177.77%")}
              </div>
              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--warm-white)', marginBottom: 4 }}>Aarti Rai</div>
                <p style={{ fontSize: '0.78rem', color: 'rgba(250,247,242,0.5)', lineHeight: 1.5 }}>Success story of lead gen &amp; digital marketing course completion.</p>
              </div>
            </div>

            {/* Doshant Singh Short Card */}
            <div className="bento-card-short">
              <div className="bento-video-wrapper-short">
                {renderVideo("eQh4P4bl5TA", "Doshant Singh Review", "177.77%")}
              </div>
              <div style={{ marginTop: 16, textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--warm-white)', marginBottom: 4 }}>Doshant Singh</div>
                <p style={{ fontSize: '0.78rem', color: 'rgba(250,247,242,0.5)', lineHeight: 1.5 }}>Student shares his results running ads and closing remote clients.</p>
              </div>
            </div>
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
                  sizes="(max-width: 768px) 100vw, 540px"
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

      {/* SOCIAL SHARE SECTION */}
      <section className="section-padding" style={{ background: 'var(--warm-white)', borderTop: '1px solid var(--mist)', borderBottom: '1px solid var(--mist)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-tag" style={{ background: 'rgba(42,92,69,0.08)', color: 'var(--accent)', borderColor: 'rgba(42,92,69,0.2)' }}>Spread the Word</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, color: 'var(--ink)' }}>
              Help Others Master High-Value Skills
            </h2>
            <p style={{ color: 'var(--slate)', marginTop: 12, fontSize: '1.05rem', maxWidth: 620, margin: '12px auto 0', lineHeight: 1.7 }}>
              Know a student, housewife, or job seeker who wants to build a successful digital career? Share this course with them. For just <strong style={{ color: 'var(--ink)' }}>₹999</strong>, they get lifetime access to <strong style={{ color: 'var(--ink)' }}>12+ years of expertise</strong>. Quality skill development should be accessible to everyone!
            </p>
          </div>

          <div className="share-hub-grid">
            {/* Column 1: Presets & Platform buttons */}
            <div className="share-controls-card">
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.25rem', color: 'var(--ink)', marginBottom: 16 }}>1. Select a Sharing Message Angle</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {sharePresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setActivePreset(preset)}
                    className={`preset-tab-btn ${activePreset.id === preset.id ? 'active' : ''}`}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>{preset.label}</span>
                      {activePreset.id === preset.id && <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700 }}>● Active</span>}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: activePreset.id === preset.id ? 'var(--slate)' : 'rgba(74,72,69,0.7)', marginTop: 4, textAlign: 'left' }}>
                      {preset.tagline}
                    </div>
                  </button>
                ))}
              </div>

              <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.25rem', color: 'var(--ink)', marginBottom: 16 }}>2. Share or Copy Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(activePreset.message + "\n\nJoin here: " + siteUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-platform-btn share-wa"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.019-5.114-2.875-6.973C16.588 1.909 14.11 1.15 12.01 1.15c-5.44 0-9.865 4.42-9.869 9.866-.001 1.777.464 3.51 1.346 5.035L2.43 20.317l4.217-1.163zM18.22 15.71c-.3-.15-1.782-.88-2.062-.982-.28-.1-.484-.15-.688.15-.204.3-.79.982-.969 1.185-.18.203-.359.23-.659.08-1.09-.54-1.92-1.02-2.68-2.33-.2-.35-.04-.54.11-.69.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.688-1.66-.943-2.27-.248-.6-.508-.52-.688-.53-.178-.01-.382-.01-.587-.01-.205 0-.537.08-.817.388-.28.308-1.07 1.045-1.07 2.55 0 1.506 1.096 2.96 1.247 3.16.15.2 2.155 3.29 5.22 4.61.73.31 1.3.5 1.74.64.733.23 1.4.2 1.92.12.58-.09 1.782-.73 2.03-1.43.25-.7.25-1.29.17-1.43-.07-.14-.27-.22-.57-.37z"/>
                    </svg>
                    WhatsApp
                  </a>

                  {/* Telegram */}
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(activePreset.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-platform-btn share-tg"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                    Telegram
                  </a>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {/* Threads */}
                  <a
                    href={`https://threads.net/intent/post?text=${encodeURIComponent(activePreset.message + "\n\nJoin here: " + siteUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-platform-btn share-threads"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12.002 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.398 17.202h-2.148l-3.32-4.475-3.32 4.475H5.464l4.474-6.03L5.614 5.202h2.152l3.072 4.14 3.07-4.14h2.152l-4.225 5.694 4.567 6.306z"/>
                    </svg>
                    Threads
                  </a>

                  {/* Twitter / X */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(activePreset.message)}&url=${encodeURIComponent(siteUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-platform-btn share-x"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Twitter / X
                  </a>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-platform-btn share-fb"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-platform-btn share-li"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9H7.12v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>

                {/* Primary Copy Button */}
                <button
                  onClick={handleCopyPreset}
                  className="share-hub-copy-primary"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  {copiedText ? "Message & Link Copied! 🚀" : "Copy Message & Link"}
                </button>
              </div>
            </div>

            {/* Column 2: Simulated Live Preview */}
            <div className="share-preview-card">
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.25rem', color: 'var(--ink)', marginBottom: 16 }}>Live Share Preview</h3>
              <div className="simulated-bubble">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {/* Prefilled Text Preview */}
                  <div style={{ color: 'var(--ink)', fontSize: '0.88rem', background: '#FDFBF7', padding: '12px 14px', borderRadius: '12px 12px 0 12px', border: '1px solid var(--mist)', lineHeight: 1.5, position: 'relative', wordBreak: 'break-word', whiteSpace: 'pre-wrap', textAlign: 'left' }}>
                    {activePreset.message}
                    <div style={{ color: 'var(--gold)', marginTop: 8, fontWeight: 700 }}>
                      Join here: https://devinedigitalacademy.co.in
                    </div>
                  </div>

                  {/* Simulated Rich Link Card */}
                  <div style={{ background: '#FAF8F5', border: '1px solid var(--mist)', borderRadius: 12, overflow: 'hidden', maxWidth: 360, alignSelf: 'flex-end', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                    <div style={{ position: 'relative', width: '100%', height: 180, background: 'var(--ink)' }}>
                      <Image
                        src="/devine_logo.png"
                        alt="Devine Digital Academy Preview"
                        fill
                        sizes="360px"
                        style={{ objectFit: 'contain', padding: 20 }}
                      />
                    </div>
                    <div style={{ padding: '12px 14px', borderTop: '1px solid var(--mist)' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--slate)', fontFamily: 'DM Mono, monospace', letterSpacing: '0.02em', textTransform: 'uppercase', marginBottom: 2 }}>devinedigitalacademy.co.in</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 4 }}>Master Digital Marketing &amp; Start Freelancing for just ₹999</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--slate)', lineHeight: 1.4 }}>{activePreset.description}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instagram Helper Section */}
              <div className="insta-helper-card" style={{ marginTop: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: '1.25rem' }}>📸</span>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>Instagram Sharing Guide</div>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--slate)', lineHeight: 1.5, marginBottom: 12, textAlign: 'left' }}>
                  Instagram doesn&apos;t support direct links in post captions. Use this curated text block with hashtags for your Post, Reels, or Story caption:
                </p>
                <div style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid var(--mist)', borderRadius: 8, padding: 12, fontSize: '0.78rem', color: 'var(--slate)', fontFamily: 'DM Sans, sans-serif', wordBreak: 'break-word', maxHeight: 90, overflowY: 'auto', marginBottom: 12, lineHeight: 1.4, textAlign: 'left' }}>
                  {activePreset.message} #DevineDigitalAcademy #DigitalMarketing #WorkFromHome #FreelancingIndia #LearnInHindi #FacebookAds #GoogleAds
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    onClick={handleCopyCaption}
                    className="insta-copy-btn"
                  >
                    Copy Instagram Caption {copiedCaption ? "✓" : ""}
                  </button>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="insta-launch-btn"
                  >
                    Open Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
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
          <a href="#" onClick={openEnrollModal} className="btn-primary" style={{ fontSize: '1.15rem', padding: '18px 52px' }}>
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
            <a href="#" onClick={openEnrollModal} className="footer-link-gold">Enroll Now →</a>
          </div>
          <div style={{ color: 'rgba(250,247,242,0.3)', fontSize: '0.78rem', fontFamily: 'DM Mono, monospace' }}>
            © 2026 Devine Digital Academy · All rights reserved
          </div>
        </div>
      </footer>

      {/* STICKY BOTTOM MOBILE CTA */}
      <div className={`sticky-mobile-cta ${showStickyCta ? 'visible' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', color: 'var(--slate)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Devine Digital Academy</span>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 6 }}>
            ₹999
            <span style={{ fontSize: '0.72rem', fontWeight: 400, color: 'var(--slate)', textDecoration: 'line-through' }}>₹10,000</span>
          </span>
        </div>
        <a href="#" onClick={openEnrollModal} className="sticky-mobile-cta-btn">
          Enroll Now <ArrowRight size={14} />
        </a>
      </div>

      {/* LEAD CAPTURE MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeEnrollModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Complete Enrollment</h3>
                <p className="modal-subtitle">Enter details to proceed to payment</p>
              </div>
              <button className="modal-close-btn" onClick={closeEnrollModal} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="modal-body">
              <div className="form-group">
                <label htmlFor="modal-name" className="form-label">Full Name</label>
                <input
                  id="modal-name"
                  type="text"
                  name="name"
                  value={leadForm.name}
                  onChange={handleInputChange}
                  className={`form-input ${formErrors.name ? 'input-error' : ''}`}
                  placeholder="e.g. Rahul Sharma"
                  autoComplete="name"
                  required
                />
                {formErrors.name && (
                  <span className="input-error-msg">{formErrors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="modal-phone" className="form-label">WhatsApp Number</label>
                <input
                  id="modal-phone"
                  type="tel"
                  name="phone"
                  value={leadForm.phone}
                  onChange={handleInputChange}
                  className={`form-input ${formErrors.phone ? 'input-error' : ''}`}
                  placeholder="e.g. 9876543210"
                  autoComplete="tel"
                  required
                />
                {formErrors.phone && (
                  <span className="input-error-msg">{formErrors.phone}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="modal-email" className="form-label">Email Address</label>
                <input
                  id="modal-email"
                  type="email"
                  name="email"
                  value={leadForm.email}
                  onChange={handleInputChange}
                  className={`form-input ${formErrors.email ? 'input-error' : ''}`}
                  placeholder="e.g. rahul@example.com"
                  autoComplete="email"
                  required
                />
                {formErrors.email && (
                  <span className="input-error-msg">{formErrors.email}</span>
                )}
              </div>

              <button type="submit" className="modal-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Processing..."
                ) : (
                  <>
                    Enroll Now — ₹999 <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div className="security-badge">
                <Lock size={12} style={{ color: 'var(--gold)', marginRight: 4 }} /> 256-Bit SSL Secure Payment Gateway
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
