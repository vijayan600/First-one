import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/event.css";
import Footer from "../components/Footer";

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
      desc: "Experience the future of automation at our grand Robotics Expo! Witness cutting-edge humanoid robots, autonomous drones, AI-powered robotic arms, and innovative automation systems designed by our talented students and industry partners. This interactive exhibition features live demonstrations, hands-on workshops, and expert talks from leading roboticists. Explore applications in manufacturing, healthcare, agriculture, and space exploration. Perfect for tech enthusiasts, students, and professionals looking to understand the revolutionary impact of robotics on our daily lives.",
      date: "05 / 02 / 2026",
      venue: "Mechanical Block",
      extra: "Open for all departments",
    },
    {
      id: "industry-tech-talk",
      title: "INDUSTRY TECH TALK",
      poster: upcomingPoster2,
      desc: "Join us for an exclusive Industry Tech Talk featuring renowned experts from leading IT companies. Gain valuable insights into emerging technologies including Artificial Intelligence, Machine Learning, Cloud Computing, Blockchain, and Cybersecurity. Learn about current industry trends, career opportunities, essential skills for the modern workplace, and the future of technology. This interactive session includes live Q&A, networking opportunities with industry professionals, and guidance on building a successful tech career. Don't miss this chance to bridge the gap between academic learning and industry requirements.",
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
      winners: [
        { place: "1st", name: "Team Rhythm", category: "Dance", prize: "₹10,000" },
        { place: "2nd", name: "Melody Makers", category: "Music", prize: "₹7,000" },
        { place: "3rd", name: "Drama Squad", category: "Drama", prize: "₹5,000" }
      ]
    },
    {
      id: "blood-donation",
      title: "BLOOD DONATION CAMP",
      poster: pastPoster2,
      desc: "Social service initiative with medical support.",
      date: "20 / 12 / 2025",
      venue: "College Hospital",
      extra: "In association with Red Cross",
      winners: [
        { place: "1st", name: "Department of CSE", category: "Most Donors", prize: "Trophy & Certificate" },
        { place: "2nd", name: "Department of ECE", category: "Most Donors", prize: "Certificate" },
        { place: "3rd", name: "Department of Mech", category: "Most Donors", prize: "Certificate" }
      ]
    },
  ],
};

export default function EventPage() {
  const [tab, setTab] = useState("ongoing");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleViewDetails = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="event-navbar">
        <div className="nav-left" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img src={shaGold} alt="SHA" />
          <span className="nav-title">S & H ASSOCIATION</span>
        </div>

        <div className="nav-right" onClick={() => setMenuOpen(true)}>
          <span className="menu-icon">☰</span>
        </div>
      </header>

      {/* SIDE MENU - EXACT GALLERY STRUCTURE */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div 
          className="menu-overlay" 
          onClick={() => setMenuOpen(false)}
        ></div>
        
        <div className="menu-content" onClick={(e) => e.stopPropagation()}>
          {/* CLOSE BUTTON */}
          <button 
            className="close-btn" 
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>

          <div className="menu-header">
            <h2>SCIENCE & HUMANITIES ASSOCIATION</h2>
          </div>

          <nav className="menu-nav">
            <a 
              onClick={() => handleNavigation("/")}
              className={location.pathname === "/" ? "active" : ""}
            >
              <span className="menu-text">Home</span>
              
            </a>
            <a 
              onClick={() => handleNavigation("/events")}
              className={location.pathname.startsWith("/events") ? "active" : ""}
            >
              <span className="menu-text">Events</span>
            
            </a>
            <a 
              onClick={() => handleNavigation("/gallery")}
              className={location.pathname === "/gallery" ? "active" : ""}
            >
              <span className="menu-text">Gallery</span>
            
            </a>
            <a 
              onClick={() => handleNavigation("/cluster-members")}
              className={location.pathname === "/cluster-members" ? "active" : ""}
            >
              <span className="menu-text">Members</span>
             
            </a>
          
          </nav>

          <div className="menu-footer">
            <p>© 2026 SCIENCE & HUMANITIES ASSOCIATION</p>
          </div>
        </div>
      </div>

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

              {/* View Details Button */}
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

      {/* FOOTER */}
      <Footer />
    </>
  );
}