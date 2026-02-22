import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Education", "Blog", "Contact"];

const SKILLS = {
  "Embedded & Microcontrollers": ["Embedded C", "C / C++", "STM32", "ESP32", "Arduino (ATmega)", "NodeMCU", "Raspberry Pi", "XMOS", "FreeRTOS", "KiCad"],
  "Communication Protocols": ["UART", "SPI", "I2C", "I2S", "Bluetooth", "Zigbee", "LoRa", "MQTT", "WebSocket", "CoAP", "AMQP", "HTTP/HTTPS"],
  "Web & Software": ["C# .NET WPF", "Python", "Shell Scripting", "HTML / CSS / JS", "React", "API Integration", "XML Configuration"],
  "Tools & Platforms": ["STM32CubeIDE", "Keil µVision", "Arduino IDE", "VS Code", "Visual Studio", "Proteus", "Linux", "ThingSpeak", "Adafruit IO"],
};

const EXPERIENCE = [
  {
    role: "Graduate Engineer Trainee",
    company: "Comcon Technologies Limited",
    location: "Okhla, New Delhi",
    period: "Oct 2025 – Present",
    points: [
      "Developed custom test automation software using C# WPF .NET Framework, reducing manual testing time by 80% and improving test coverage across 15+ product validation procedures.",
      "Designed modular XML-based test configuration system with APx500 backend integration, reducing development time by 90% and achieving ±0.1dB measurement accuracy.",
      "Completed Phase 1 firmware for USB Audio Interface on STM32 — bidirectional USB audio at 96kHz, USB Audio Class 1.0 compliant.",
      "Evaluated 20+ microcontroller and DAC/ADC solutions for USB Audio Class 2.0 (192kHz); gained hands-on exposure to circuit analysis and PCB design in KiCad.",
    ],
  },
  {
    role: "Embedded Systems Intern",
    company: "UniConverge Technologies",
    location: "Noida, U.P.",
    period: "Aug 2025 – Sep 2025",
    points: [
      "Tested and validated 5–25 custom PCB assemblies daily, achieving 92% first-pass yield and reducing debug time by 35% via systematic fault isolation.",
      "Resolved 50+ hardware and firmware issues across client projects, reducing post-deployment defects by 28%.",
      "Built a searchable database of 100+ test cases, cutting new team member onboarding time by 3 days.",
      "Configured and validated ESP32 Camera module integration and established testing protocols for video surveillance capabilities.",
    ],
  },
];

const PROJECTS = [
  {
    title: "LoRa-Based IoT Landslide Monitoring System",
    tags: ["ESP32", "LoRa", "MQTT", "IoT Cloud"],
    description:
      "Multi-sensor landslide detection system integrating soil moisture, vibration, and tilt sensors with ESP32. LoRa communication achieved 99.2% packet delivery at 180ms latency. MQTT-based cloud dashboard triggers SMS/email alerts within 30 seconds — 95% alert accuracy in simulated conditions.",
    link: "#",
  },
  {
    title: "Real-Time IoT Weather Monitoring System",
    tags: ["NodeMCU", "WebSocket", "DHT22", "JavaScript"],
    description:
      "Web-based weather monitoring system processing 120 data points/min with <100ms browser update latency. WebSocket achieved 40% faster transmission vs HTTP polling and 65% lower server load. Responsive dashboard supports 10+ concurrent users without performance degradation.",
    link: "#",
  },
  {
    title: "FreeRTOS-Based Multitasking System",
    tags: ["STM32", "FreeRTOS", "UART", "Embedded C"],
    description:
      "Real-time embedded application on STM32 managing 3 concurrent tasks — LED control, UART, and sensor processing — with 92% CPU utilization. Priority-based scheduler with queues and semaphores achieved <5ms response for critical tasks, 99.8% task completion, zero deadlocks.",
    link: "#",
  },
  {
    title: "USB Audio Interface Firmware (Phase 1)",
    tags: ["STM32", "USB Audio", "C", "Embedded C"],
    description:
      "Firmware for USB Audio Interface on STM32 implementing bidirectional USB audio at 96kHz sample rate and USB Audio Class 1.0 compliance. Part of R&D work at Comcon Technologies; Phase 2 targets USB Audio Class 2.0 at 192kHz.",
    link: "#",
  },
];

const BLOGS = [
  {
    title: "5G Technology & AI Applications in Wireless Systems",
    date: "2024",
    summary: "Technical article exploring how AI is being integrated into 5G wireless architectures — beamforming, network slicing, and intelligent resource management. Reached 120+ readers.",
    link: "#",
  },
  {
    title: "Micropatch Antennas for Modern Wireless Communication",
    date: "2024",
    summary: "In-depth article on micropatch antenna design, covering substrate selection, radiation patterns, and miniaturisation techniques for IoT and 5G applications.",
    link: "#",
  },
  {
    title: "Edge Intelligence: TinyML on Microcontrollers",
    date: "2025",
    summary: "Practical walkthrough of deploying machine learning models on resource-constrained embedded hardware, with examples from real IoT monitoring projects.",
    link: "#",
  },
];

const EDUCATION = [
  {
    degree: "B.Tech. in Electronics and Communication Engineering",
    institution: "IIMT College of Engineering",
    university: "Dr. A.P.J. Abdul Kalam Technical University",
    location: "Greater Noida, U.P.",
    period: "Oct 2021 – Aug 2025",
    cgpa: "8.08 / 10 (76.54%)",
    courses: ["Microprocessor & Microcontroller", "Embedded Systems", "Digital System Design", "Analog Devices", "Electronic Devices"],
  },
];

const CERTIFICATIONS = [
  { title: "Embedded Systems and IoT Certification", org: "The IoT Academy", period: "Mar 2025 – Oct 2025", detail: "6-month intensive program" },
  { title: "Arduino and AVR Certification", org: "Sofcon India Pvt. Ltd.", period: "Jul 2024 – Aug 2024", detail: "6-week intensive program" },
];

const ACHIEVEMENTS = [
  "Published 3 research papers including one in IEEE journal on embedded solutions and IoT applications.",
  "Represented college at District-level Science Exhibition, showcasing embedded systems project to 120+ attendees.",
  "Authored 2 technical articles on 5G technology and micropatch antennas, reaching 120+ readers in the engineering community.",
  "Participated in college Hackathon (2024) and completed 5+ technical bootcamps on IoT, Web Development and AI/ML.",
];

// ── HOOKS ──
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeSection({ id, children, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <section
      id={id}
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function SectionHeading({ num, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "44px" }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#c2680a", letterSpacing: "0.16em", opacity: 0.8 }}>
        {num}
      </span>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 700, color: "#1c1a2e", letterSpacing: "-0.01em" }}>
        {title}
      </h2>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #d4a57460, transparent)" }} />
    </div>
  );
}

function GlassCard({ children, style = {}, hover = true, className = "" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={className}
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: hovered ? "rgba(255,252,235,0.82)" : "rgba(255,251,230,0.65)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: hovered ? "1px solid rgba(210,160,80,0.45)" : "1px solid rgba(210,160,80,0.25)",
        borderRadius: "18px",
        padding: "28px",
        boxShadow: hovered
          ? "0 8px 40px rgba(180,100,20,0.13), 0 1px 0 rgba(255,255,255,0.7) inset"
          : "0 4px 24px rgba(180,100,20,0.08), 0 1px 0 rgba(255,255,255,0.6) inset",
        transform: hovered ? "translateY(-3px)" : "none",
        transition: "all 0.25s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── MAIN COMPONENT ──
export default function App() {
  const [activeNav, setActiveNav] = useState("About");
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 150);
    const onScroll = () => {
      const scrollY = window.scrollY + 80;
      NAV_LINKS.forEach(l => {
        const el = document.getElementById(l.toLowerCase());
        if (el && scrollY >= el.offsetTop) setActiveNav(l);
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 62;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #fdf4ec; overflow-x: hidden; }
        a { text-decoration: none; color: inherit; }
        ::selection { background: #fde68a99; color: #1c1a2e; }

        /* ── BACKGROUND LAYERS ── */
        .page-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 80% 60% at 15% 20%, rgba(255,200,130,0.38) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 85% 10%, rgba(210,170,255,0.22) 0%, transparent 55%),
            radial-gradient(ellipse 70% 60% at 80% 85%, rgba(255,185,110,0.28) 0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at 10% 80%, rgba(200,160,255,0.18) 0%, transparent 55%),
            radial-gradient(ellipse 100% 100% at 50% 50%, rgba(253,244,236,1) 40%, rgba(240,225,255,0.5) 100%);
        }
        .line-pattern {
          position: fixed; inset: 0; z-index: 1; opacity: 0.18; pointer-events: none;
          background-image:
            repeating-linear-gradient(135deg, transparent, transparent 38px, rgba(180,120,40,0.35) 38px, rgba(180,120,40,0.35) 39px),
            repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(140,90,200,0.18) 60px, rgba(140,90,200,0.18) 61px);
        }
        .dot-pattern {
          position: fixed; inset: 0; z-index: 1; pointer-events: none;
          background-image: radial-gradient(circle, rgba(180,110,30,0.22) 1px, transparent 1px);
          background-size: 32px 32px; opacity: 0.55;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%);
        }
        .rule-lines {
          position: fixed; inset: 0; z-index: 1; pointer-events: none;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(160,100,40,0.09) 79px, rgba(160,100,40,0.09) 80px),
            repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(160,100,40,0.07) 79px, rgba(160,100,40,0.07) 80px);
        }

        /* ── NAVBAR ── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          height: 58px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 4%;
          background: rgba(18,14,28,0.94);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border-bottom: 1px solid rgba(180,130,60,0.2);
          box-shadow: 0 2px 24px rgba(0,0,0,0.2);
        }
        .logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px; font-weight: 700; color: #f5ead0;
          letter-spacing: 0.02em; flex-shrink: 0; cursor: pointer;
        }
        .logo span { color: #f59e0b; }

        .nav-links { display: flex; gap: 2px; align-items: center; }
        .nav-item {
          padding: 5px 11px; border-radius: 6px;
          font-size: 12.5px; font-weight: 500; letter-spacing: 0.02em;
          color: #a89880; cursor: pointer; transition: all 0.2s;
          font-family: 'DM Sans', sans-serif; white-space: nowrap;
          border: 1px solid transparent;
        }
        .nav-item:hover { color: #f5ead0; background: rgba(255,255,255,0.07); }
        .nav-item.active {
          color: #f59e0b;
          background: rgba(245,158,11,0.11);
          border-color: rgba(245,158,11,0.2);
        }
        .nav-cta {
          padding: 7px 18px; flex-shrink: 0;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: #1c1206; border-radius: 8px;
          font-size: 13px; font-weight: 600; cursor: pointer; border: none;
          letter-spacing: 0.02em; transition: all 0.2s;
          box-shadow: 0 2px 12px rgba(245,158,11,0.3); margin-left: 8px;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(245,158,11,0.4); }

        /* ── BUTTONS ── */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 26px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #1c1206; border-radius: 10px; font-weight: 600; font-size: 14px;
          cursor: pointer; border: none; box-shadow: 0 3px 16px rgba(245,158,11,0.35);
          transition: all 0.2s; letter-spacing: 0.01em; font-family: 'DM Sans', sans-serif;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(245,158,11,0.45); }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 24px;
          background: rgba(255,251,230,0.5); color: #4a3f2e;
          border-radius: 10px; font-size: 14px; font-weight: 500; cursor: pointer;
          border: 1px solid rgba(200,160,80,0.4); backdrop-filter: blur(8px);
          transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .btn-ghost:hover { background: rgba(255,248,210,0.75); border-color: rgba(200,140,40,0.6); transform: translateY(-1px); }

        /* ── TAGS / CHIPS ── */
        .tag {
          display: inline-block; padding: 4px 12px; border-radius: 20px;
          font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500;
          background: rgba(245,158,11,0.12); color: #b45309;
          border: 1px solid rgba(245,158,11,0.3); letter-spacing: 0.03em;
        }
        .skill-chip {
          display: inline-block; padding: 6px 14px; border-radius: 8px;
          font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: #5a4e3a;
          background: rgba(255,245,210,0.6); border: 1px solid rgba(210,160,80,0.3);
          cursor: default; transition: all 0.2s;
        }
        .skill-chip:hover { background: rgba(255,236,153,0.75); border-color: rgba(210,140,30,0.55); color: #7c3e00; transform: translateY(-1px); }

        /* ── FORM ── */
        input, textarea {
          width: 100%; background: rgba(255,251,230,0.6);
          border: 1px solid rgba(210,160,80,0.3); border-radius: 10px;
          padding: 12px 16px; color: #2a2010; font-family: 'DM Sans', sans-serif;
          font-size: 14px; outline: none; backdrop-filter: blur(8px);
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        input:focus, textarea:focus {
          border-color: rgba(245,158,11,0.6); background: rgba(255,252,235,0.85);
          box-shadow: 0 0 0 3px rgba(245,158,11,0.1);
        }
        input::placeholder, textarea::placeholder { color: #b0a090; }

        /* ── STAT CARD ── */
        .stat-card {
          background: rgba(255,251,228,0.65); backdrop-filter: blur(16px);
          border: 1px solid rgba(210,160,80,0.28); border-radius: 14px;
          padding: 20px; text-align: center;
          box-shadow: 0 2px 16px rgba(180,100,20,0.07);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(180,100,20,0.12); }

        /* ── CONTENT ── */
        .content { position: relative; z-index: 10; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .hero-cols, .contact-cols { flex-direction: column !important; }
          .two-col, .three-col { grid-template-columns: 1fr !important; }
          .four-col { grid-template-columns: repeat(2,1fr) !important; }
          .hero-stack-card { display: none !important; }
        }
      `}</style>

      {/* ── BACKGROUND LAYERS ── */}
      <div className="page-bg" />
      <div className="line-pattern" />
      <div className="rule-lines" />
      <div className="dot-pattern" />

      {/* ══════════════════════════════
          NAVBAR — fixed, all sections
      ══════════════════════════════ */}
      <nav className="navbar">
        <span className="logo" onClick={() => scrollTo("about")}>SS<span>.</span></span>

        <div className="nav-links">
          {NAV_LINKS.map(l => (
            <span
              key={l}
              className={`nav-item ${activeNav === l ? "active" : ""}`}
              onClick={() => scrollTo(l)}
            >
              {l}
            </span>
          ))}
        </div>

        <button className="nav-cta" onClick={() => scrollTo("contact")}>Hire Me</button>
      </nav>

      <div className="content">

        {/* ══════════════════════════════
            ABOUT / HERO
        ══════════════════════════════ */}
        <section
          id="about"
          style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "80px 5% 60px" }}
        >
          <div style={{
            maxWidth: "1100px", width: "100%", margin: "0 auto",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "none" : "translateY(32px)",
            transition: "all 0.9s ease",
          }}>
            <div className="hero-cols" style={{ display: "flex", alignItems: "center", gap: "64px" }}>

              {/* Left copy */}
              <div style={{ flex: 1 }}>
                {/* Status badge */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "24px", padding: "6px 16px", background: "rgba(255,251,220,0.7)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "20px", backdropFilter: "blur(10px)" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 0 2px #bbf7d0", display: "inline-block" }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#7c5a10", letterSpacing: "0.12em" }}>OPEN TO OPPORTUNITIES</span>
                </div>

                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px,6.5vw,76px)", fontWeight: 700, color: "#1c1a2e", lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "10px" }}>
                  Snehil Shrey
                </h1>

                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#c2680a", marginBottom: "20px", letterSpacing: "0.06em" }}>
                  ECE Graduate &nbsp;·&nbsp; Embedded Software &nbsp;·&nbsp; IoT &nbsp;·&nbsp; AI / ML &nbsp;·&nbsp; Web Dev
                </p>

                <p style={{ fontSize: "15.5px", color: "#5c5040", lineHeight: 1.9, maxWidth: "530px", marginBottom: "16px" }}>
                  Electronics and Communication Engineering graduate specialising in Embedded Software
                  Development and IoT Solutions. Hands-on with ARM and AVR microcontrollers, firmware in
                  Embedded C, FreeRTOS, and end-to-end IoT cloud integration. Currently building test
                  automation software at Comcon Technologies.
                </p>

                {/* Contact chips */}
                <div style={{ display: "flex", gap: "8px", marginBottom: "36px", flexWrap: "wrap" }}>
                  {["+91-8750424771", "snehilshrey1010@gmail.com", "New Delhi, India"].map(d => (
                    <span key={d} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#9a7a4a", background: "rgba(255,245,210,0.7)", border: "1px solid rgba(210,160,80,0.3)", padding: "4px 12px", borderRadius: "20px" }}>{d}</span>
                  ))}
                </div>

                {/* CTA — only Download CV */}
                <button className="btn-ghost" onClick={() => window.open("#")}>
                  Download CV ↓
                </button>
              </div>

              {/* Right — core stack card */}
              <div className="hero-stack-card" style={{ flexShrink: 0, position: "relative" }}>
                <GlassCard hover={false} style={{ width: "290px", padding: "30px" }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#b08040", letterSpacing: "0.14em", marginBottom: "20px" }}>CORE STACK</p>
                  {[
                    { label: "MCUs",       value: "STM32 · ESP32 · Arduino" },
                    { label: "RTOS",       value: "FreeRTOS · Linux" },
                    { label: "Protocols",  value: "MQTT · I2C · SPI · LoRa" },
                    { label: "Software",   value: "C# WPF · Python · React" },
                    { label: "Cloud/IoT",  value: "AWS · ThingSpeak · Adafruit" },
                  ].map((r, i) => (
                    <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: i < 4 ? "1px solid rgba(210,160,80,0.18)" : "none" }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#a08060" }}>{r.label}</span>
                      <span style={{ fontSize: "12px", color: "#2a2010", fontWeight: 600 }}>{r.value}</span>
                    </div>
                  ))}
                </GlassCard>
                <div style={{ position: "absolute", top: "-18px", right: "-22px", background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#fff", padding: "7px 15px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, boxShadow: "0 4px 16px rgba(245,158,11,0.4)" }}>CGPA 8.08 / 10</div>
                <div style={{ position: "absolute", bottom: "-16px", left: "-22px", background: "rgba(255,251,230,0.88)", border: "1px solid rgba(210,160,80,0.4)", backdropFilter: "blur(12px)", padding: "7px 15px", borderRadius: "20px", fontSize: "12px", color: "#7c5a10", fontWeight: 500, boxShadow: "0 4px 16px rgba(180,100,20,0.12)" }}>ECE · B.Tech 2025</div>
              </div>
            </div>

            {/* Stats row */}
            <div className="four-col" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginTop: "80px" }}>
              {[
                { num: "3+", label: "Projects Built" },
                { num: "2",  label: "Work Experiences" },
                { num: "3",  label: "Research Papers" },
                { num: "10+",label: "Technologies" },
              ].map(s => (
                <div key={s.label} className="stat-card">
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "34px", fontWeight: 700, color: "#d97706" }}>{s.num}</div>
                  <div style={{ fontSize: "13px", color: "#8a7050", marginTop: "4px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SKILLS ══ */}
        <FadeSection id="skills" style={{ padding: "88px 5%" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <SectionHeading num="02" title="Technical Skills" />
            <div className="two-col" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "20px" }}>
              {Object.entries(SKILLS).map(([cat, items]) => (
                <GlassCard key={cat}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10.5px", color: "#c2680a", letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: "16px" }}>{cat}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {items.map(s => <span key={s} className="skill-chip">{s}</span>)}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* ══ EXPERIENCE ══ */}
        <FadeSection id="experience" style={{ padding: "88px 5%" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <SectionHeading num="03" title="Professional Experience" />
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {EXPERIENCE.map((e, i) => (
                <GlassCard key={i} style={{ display: "flex", gap: "24px" }}>
                  <div style={{ flexShrink: 0, width: "3px", borderRadius: "4px", background: "linear-gradient(180deg,#f59e0b 0%,#c084fc 100%)" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
                      <div>
                        <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#1c1a2e" }}>{e.role}</h3>
                        <p style={{ fontSize: "14px", color: "#c2680a", marginTop: "2px" }}>
                          {e.company} <span style={{ color: "#b0a080", fontSize: "13px" }}>· {e.location}</span>
                        </p>
                      </div>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", color: "#a08060", background: "rgba(255,240,200,0.7)", border: "1px solid rgba(210,160,80,0.3)", padding: "4px 12px", borderRadius: "20px", alignSelf: "flex-start", backdropFilter: "blur(8px)" }}>{e.period}</span>
                    </div>
                    <ul style={{ marginTop: "12px", listStyle: "none", display: "flex", flexDirection: "column", gap: "9px" }}>
                      {e.points.map((p, j) => (
                        <li key={j} style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#5c5040", lineHeight: 1.7 }}>
                          <span style={{ color: "#d97706", flexShrink: 0, fontWeight: 700, marginTop: "1px" }}>›</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* ══ PROJECTS ══ */}
        <FadeSection id="projects" style={{ padding: "88px 5%" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <SectionHeading num="04" title="Projects" />
            <div className="two-col" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "20px" }}>
              {PROJECTS.map((p, i) => (
                <GlassCard key={i} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#b0a080", letterSpacing: "0.1em" }}>PROJECT_{String(i + 1).padStart(2, "0")}</span>
                    <a href={p.link}
                      style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(255,240,190,0.6)", border: "1px solid rgba(210,160,80,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", color: "#a08040", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(245,158,11,0.18)"; e.currentTarget.style.color = "#b45309"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,240,190,0.6)"; e.currentTarget.style.color = "#a08040"; }}
                    >↗</a>
                  </div>
                  <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#1c1a2e", letterSpacing: "-0.01em" }}>{p.title}</h3>
                  <p style={{ fontSize: "14px", color: "#5c5040", lineHeight: 1.78, flex: 1 }}>{p.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* ══ EDUCATION ══ */}
        <FadeSection id="education" style={{ padding: "88px 5%" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <SectionHeading num="05" title="Education & Certifications" />
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {EDUCATION.map((e, i) => (
                <GlassCard key={i} style={{ display: "flex", gap: "24px" }}>
                  <div style={{ flexShrink: 0, width: "3px", borderRadius: "4px", background: "linear-gradient(180deg,#f59e0b 0%,#c084fc 100%)" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
                      <div>
                        <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#1c1a2e" }}>{e.degree}</h3>
                        <p style={{ fontSize: "14px", color: "#c2680a", marginTop: "3px" }}>{e.institution}</p>
                        <p style={{ fontSize: "13px", color: "#a08060", marginTop: "2px" }}>{e.university} · {e.location}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", color: "#a08060", background: "rgba(255,240,200,0.7)", border: "1px solid rgba(210,160,80,0.3)", padding: "4px 12px", borderRadius: "20px", display: "inline-block" }}>{e.period}</span>
                        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#d97706", marginTop: "8px", fontWeight: 600 }}>CGPA: {e.cgpa}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginTop: "8px" }}>
                      {e.courses.map(c => (
                        <span key={c} className="tag" style={{ background: "rgba(192,132,252,0.1)", color: "#7c3aed", borderColor: "rgba(192,132,252,0.3)" }}>{c}</span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              ))}

              <div className="two-col" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "16px" }}>
                {CERTIFICATIONS.map((c, i) => (
                  <GlassCard key={i} style={{ padding: "22px 26px" }}>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#c2680a", letterSpacing: "0.1em", marginBottom: "8px" }}>CERTIFICATION</p>
                    <h4 style={{ fontSize: "15px", fontWeight: 600, color: "#1c1a2e", marginBottom: "4px" }}>{c.title}</h4>
                    <p style={{ fontSize: "13px", color: "#c2680a" }}>{c.org}</p>
                    <p style={{ fontSize: "12px", color: "#a08060", marginTop: "4px", fontFamily: "'JetBrains Mono', monospace" }}>{c.detail} · {c.period}</p>
                  </GlassCard>
                ))}
              </div>

              <GlassCard>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10.5px", color: "#c2680a", letterSpacing: "0.13em", marginBottom: "16px" }}>NOTABLE ACHIEVEMENTS</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {ACHIEVEMENTS.map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#5c5040", lineHeight: 1.7 }}>
                      <span style={{ color: "#d97706", flexShrink: 0, fontWeight: 700, marginTop: "1px" }}>★</span>{a}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </FadeSection>

        {/* ══ BLOG ══ */}
        <FadeSection id="blog" style={{ padding: "88px 5%" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <SectionHeading num="06" title="Blog & Articles" />
            <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
              {BLOGS.map((b, i) => (
                <a key={i} href={b.link} style={{ textDecoration: "none", color: "inherit" }}>
                  <GlassCard style={{ height: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10.5px", color: "#c2680a", letterSpacing: "0.08em" }}>{b.date}</span>
                    <h3 style={{ fontSize: "15.5px", fontWeight: 600, color: "#1c1a2e", lineHeight: 1.45 }}>{b.title}</h3>
                    <p style={{ fontSize: "13.5px", color: "#5c5040", lineHeight: 1.75, flex: 1 }}>{b.summary}</p>
                    <span style={{ fontSize: "13px", color: "#d97706", fontWeight: 600, marginTop: "6px" }}>Read more →</span>
                  </GlassCard>
                </a>
              ))}
            </div>
          </div>
        </FadeSection>

        {/* ══ CONTACT ══ */}
        <FadeSection id="contact" style={{ padding: "88px 5% 120px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <SectionHeading num="07" title="Contact" />
            <div className="contact-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "52px", alignItems: "start" }}>
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 700, color: "#1c1a2e", lineHeight: 1.2, marginBottom: "18px", letterSpacing: "-0.02em" }}>
                  Let's build something real together
                </h2>
                <p style={{ fontSize: "15px", color: "#5c5040", lineHeight: 1.88, marginBottom: "36px" }}>
                  Whether it's an embedded system, an IoT pipeline, test automation, or a web app — I'm always open to interesting problems and collaborations.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { icon: "✉", label: "Email",    value: "snehilshrey1010@gmail.com",   href: "mailto:snehilshrey1010@gmail.com" },
                    { icon: "⬡", label: "LinkedIn", value: "linkedin.com/in/snehil-shrey", href: "https://linkedin.com/in/snehil-shrey" },
                    { icon: "◈", label: "GitHub",   value: "github.com/SnehilShrey",       href: "https://github.com/SnehilShrey" },
                    { icon: "◎", label: "Location", value: "New Delhi, India",              href: "#" },
                  ].map(c => (
                    <a key={c.label} href={c.href}
                      style={{ display: "flex", alignItems: "center", gap: "16px", padding: "13px 18px", background: "rgba(255,251,230,0.65)", border: "1px solid rgba(210,160,80,0.28)", borderRadius: "12px", backdropFilter: "blur(12px)", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,248,210,0.82)"; e.currentTarget.style.borderColor = "rgba(245,158,11,0.45)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,251,230,0.65)"; e.currentTarget.style.borderColor = "rgba(210,160,80,0.28)"; e.currentTarget.style.transform = "none"; }}
                    >
                      <span style={{ fontSize: "17px", color: "#d97706", width: "22px", textAlign: "center" }}>{c.icon}</span>
                      <div>
                        <div style={{ fontSize: "11px", color: "#b0a080", marginBottom: "2px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em" }}>{c.label}</div>
                        <div style={{ fontSize: "14px", color: "#2a2010", fontWeight: 500 }}>{c.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <GlassCard hover={false} style={{ padding: "32px" }}>
                <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                    <input placeholder="Your Name" />
                    <input placeholder="Your Email" type="email" />
                  </div>
                  <input placeholder="Subject" />
                  <textarea placeholder="Tell me about your project or opportunity..." rows={6} style={{ resize: "vertical" }} />
                  <button className="btn-primary" type="submit" style={{ alignSelf: "flex-start" }}>Send Message ↗</button>
                </form>
              </GlassCard>
            </div>
          </div>
        </FadeSection>

        {/* ══ FOOTER ══ */}
        <footer style={{ padding: "22px 5%", borderTop: "1px solid rgba(210,160,80,0.2)", background: "rgba(255,250,230,0.5)", backdropFilter: "blur(12px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", position: "relative", zIndex: 10 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: "#1c1a2e", fontWeight: 700 }}>
            Snehil Shrey<span style={{ color: "#d97706" }}>.</span>
          </span>
          <span style={{ fontSize: "13px", color: "#a09070" }}>Designed & built with React · {new Date().getFullYear()}</span>
          <div style={{ display: "flex", gap: "22px" }}>
            {[
              { label: "GitHub",   href: "https://github.com/SnehilShrey" },
              { label: "LinkedIn", href: "https://linkedin.com/in/snehil-shrey" },
              { label: "Email",    href: "mailto:snehilshrey1010@gmail.com" },
            ].map(l => (
              <a key={l.label} href={l.href} style={{ fontSize: "13px", color: "#a09070", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#d97706"}
                onMouseLeave={e => e.target.style.color = "#a09070"}
              >{l.label}</a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
