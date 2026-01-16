import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/event.css";

import shaGold from "../assets/sha-gold.png";

// Import posters with your naming convention
import ongoingPoster1 from "../assets/posters/ongoingposter1.jpg";
import ongoingPoster2 from "../assets/posters/ongoingposter2.jpg";
import ongoingPoster3 from "../assets/posters/ongoingposter3.jpg";
import upcomingPoster1 from "../assets/posters/upcomingposter1.jpg";
import upcomingPoster2 from "../assets/posters/upcomingposter2.jpg";
import pastPoster1 from "../assets/posters/pastposter1.jpg";
import pastPoster2 from "../assets/posters/pastposter2.jpg";

const EVENTS = {
  ongoing: [
    {
      id: "inaugural-function",
      tag: "NEXT EVENT",
      title: "INAUGURAL FUNCTION & GUEST LECTURE",
      poster: ongoingPoster1,
      desc: "Formal inauguration with lamp lighting, chief guest address and vision briefing.",
      date: "30 / 01 / 2026",
      venue: "Main Auditorium",
      extra: "Chief Guest: Industry Expert | Time: 9:30 AM",
    },
    {
      id: "student-orientation",
      tag: "LIVE",
      title: "STUDENT ORIENTATION PROGRAM",
      poster: ongoingPoster2,
      desc: "Introduction to departments, faculty members and campus facilities.",
      date: "30 / 01 / 2026",
      venue: "Seminar Hall A",
      extra: "For First Year Students | Time: 11:00 AM",
    },
    {
      id: "mini-hackathon",
      tag: "ONGOING",
      title: "MINI HACKATHON 26",
      poster: ongoingPoster3,
      desc: "8-hour team hackathon focused on real-world problem solving.",
      date: "30 / 01 / 2026",
      venue: "Innovation Lab",
      extra: "Team Size: 3–5 | Duration: 8 Hours",
    },
  ],

  upcoming: [
    {
      id: "robotics-expo",
      title: "ROBOTICS EXPO",
      poster: upcomingPoster1,
      desc: "Live demonstration of robots and automation projects.",
      date: "05 / 02 / 2026",
      venue: "Mechanical Block",
      extra: "Open for all departments",
    },
    {
      id: "industry-tech-talk",
      title: "INDUSTRY TECH TALK",
      poster: upcomingPoster2,
      desc: "Expert session on current industry trends and careers.",
      date: "10 / 02 / 2026",
      venue: "Conference Hall",
      extra: "Speaker from IT Industry",
    },
  ],

  past: [
    {
      id: "cultural-fest",
      title: "CULTURAL FEST",
      poster: pastPoster1,
      desc: "Celebration of culture through music, dance and drama.",
      date: "10 / 01 / 2026",
      venue: "Open Air Theatre",
      extra: "1000+ Participants",
    },
    {
      id: "blood-donation",
      title: "BLOOD DONATION CAMP",
      poster: pastPoster2,
      desc: "Social service initiative with medical support.",
      date: "20 / 12 / 2025",
      venue: "College Hospital",
      extra: "In association with Red Cross",
    },
  ],
};

export default function EventPage() {
  const [tab, setTab] = useState("ongoing");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="event-navbar">
        <div className="nav-left">
          <img src={shaGold} alt="SHA" />
          <span className="nav-title">S & H ASSOCIATION</span>
        </div>

        <div className="nav-right" onClick={() => setMenuOpen(true)}>
          <span style={{ fontSize: '28px', lineHeight: '1' }}>☰</span>
        </div>
      </header>

      {/* OVERLAY */}
      {menuOpen && (
        <div className={`menu-overlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />
      )}

      {/* MENU DRAWER */}
      <aside className={`menu-drawer ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ✕
        </button>

        <h2>S & H ASSOCIATION</h2>

        <nav className="menu-links">
          <a href="/">HOME</a>
          <a href="/events" className="active">EVENTS</a>
          <a href="/gallery">GALLERY</a>
          <a href="/members">MEMBERS</a>
          <a href="/contact">CONTACT</a>
        </nav>

        <footer>© 2024 S & H Association</footer>
      </aside>

      {/* PAGE */}
      <section className="event-page">
        <h1 className="page-title">Events & Activities</h1>

        {/* TABS */}
        <div className="event-tabs">
          {["ongoing", "upcoming", "past"].map((t) => (
            <button
              key={t}
              className={tab === t ? "active" : ""}
              onClick={() => setTab(t)}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* SCROLL */}
        <div className="event-scroll">
          {EVENTS[tab].map((e, i) => (
            <div className="event-card" key={i}>
              {/* Event Poster */}
              <div className="event-poster-wrapper">
                <img src={e.poster} alt={e.title} className="event-card-poster" />
              </div>

              {/* Event Title */}
              <h2>{e.title}</h2>

              {/* View Details Button - NOW BELOW POSTER */}
              <button 
                className="event-btn" 
                onClick={() => handleViewDetails(e.id)}
              >
                VIEW DETAILS →
              </button>
            </div>
          ))}
        </div>

        <p className="scroll-hint">← Swipe to explore more events →</p>
      </section>
    </>
  );
}