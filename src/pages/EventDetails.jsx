import { useParams, useNavigate } from "react-router-dom";
import "../styles/eventdetails.css";

// Import posters (same as EventPage)
import ongoingPoster1 from "../assets/posters/ongoingposter1.jpg";
import ongoingPoster2 from "../assets/posters/ongoingposter2.jpg";
import ongoingPoster3 from "../assets/posters/ongoingposter3.jpg";
import upcomingPoster1 from "../assets/posters/upcomingposter1.jpg";
import upcomingPoster2 from "../assets/posters/upcomingposter2.jpg";
import pastPoster1 from "../assets/posters/pastposter1.jpg";
import pastPoster2 from "../assets/posters/pastposter2.jpg";

// Event data with posters
const EVENT_DATA = {
  "inaugural-function": {
    poster: ongoingPoster1,
    category: "CONFERENCE",
    title: "Inaugural Function & Guest Lecture",
    date: "30 / 01 / 2026",
    time: "9:30 AM",
    venue: "Main Auditorium",
    description: "Join us for the formal inauguration ceremony featuring lamp lighting, chief guest address, and vision briefing for the upcoming academic year. This event marks the beginning of new opportunities and achievements.",
    type: "ongoing"
  },
  "student-orientation": {
    poster: ongoingPoster2,
    category: "ORIENTATION",
    title: "Student Orientation Program",
    date: "30 / 01 / 2026",
    time: "11:00 AM",
    venue: "Seminar Hall A",
    description: "Comprehensive introduction to departments, faculty members and campus facilities. Designed specifically for first-year students to familiarize themselves with the academic environment.",
    type: "ongoing"
  },
  "mini-hackathon": {
    poster: ongoingPoster3,
    category: "HACKATHON",
    title: "Mini Hackathon 26",
    date: "30 / 01 / 2026",
    time: "8 Hours",
    venue: "Innovation Lab",
    description: "An intensive 8-hour team hackathon focused on solving real-world problems. Collaborate with peers, showcase your coding skills, and compete for exciting prizes.",
    type: "ongoing"
  },
  "robotics-expo": {
    poster: upcomingPoster1,
    category: "EXPO",
    title: "Robotics Expo",
    date: "05 / 02 / 2026",
    time: "10:00 AM",
    venue: "Mechanical Block",
    description: "Experience the future of automation at our grand Robotics Expo! Witness cutting-edge humanoid robots, autonomous drones, AI-powered robotic arms, and innovative automation systems designed by our talented students and industry partners. This interactive exhibition features live demonstrations, hands-on workshops, and expert talks from leading roboticists. Explore applications in manufacturing, healthcare, agriculture, and space exploration. Perfect for tech enthusiasts, students, and professionals looking to understand the revolutionary impact of robotics on our daily lives.",
    type: "upcoming"
  },
  "industry-tech-talk": {
    poster: upcomingPoster2,
    category: "SEMINAR",
    title: "Industry Tech Talk",
    date: "10 / 02 / 2026",
    time: "2:00 PM",
    venue: "Conference Hall",
    description: "Join us for an exclusive Industry Tech Talk featuring renowned experts from leading IT companies. Gain valuable insights into emerging technologies including Artificial Intelligence, Machine Learning, Cloud Computing, Blockchain, and Cybersecurity. Learn about current industry trends, career opportunities, essential skills for the modern workplace, and the future of technology. This interactive session includes live Q&A, networking opportunities with industry professionals, and guidance on building a successful tech career. Don't miss this chance to bridge the gap between academic learning and industry requirements.",
    type: "upcoming"
  },
  "cultural-fest": {
    poster: pastPoster1,
    category: "FESTIVAL",
    title: "Cultural Fest",
    date: "10 / 01 / 2026",
    time: "Full Day",
    venue: "Open Air Theatre",
    description: "A grand celebration of culture through music, dance, and drama. Over 1000 participants showcased their talents in this memorable event.",
    type: "past",
    winners: [
      { place: "1st", name: "Team Rhythm", category: "Dance", prize: "₹10,000" },
      { place: "2nd", name: "Melody Makers", category: "Music", prize: "₹7,000" },
      { place: "3rd", name: "Drama Squad", category: "Drama", prize: "₹5,000" }
    ]
  },
  "blood-donation": {
    poster: pastPoster2,
    category: "SOCIAL SERVICE",
    title: "Blood Donation Camp",
    date: "20 / 12 / 2025",
    time: "9:00 AM - 4:00 PM",
    venue: "College Hospital",
    description: "Social service initiative conducted in association with Red Cross. A meaningful contribution to society with full medical support and care.",
    type: "past",
    winners: [
      { place: "1st", name: "Department of CSE", category: "Most Donors", prize: "Trophy & Certificate" },
      { place: "2nd", name: "Department of ECE", category: "Most Donors", prize: "Certificate" },
      { place: "3rd", name: "Department of Mech", category: "Most Donors", prize: "Certificate" }
    ]
  },
};

export default function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = EVENT_DATA[eventId];

  if (!event) {
    return (
      <div className="event-details-error">
        <h2>Event not found</h2>
        <button onClick={() => navigate("/events")}>Back to Events</button>
      </div>
    );
  }

  return (
    <div className="event-details-page">
      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/events")}>
        ← Back
      </button>

      {/* Desktop: Side by Side | Mobile: Stacked */}
      <div className="event-details-content-wrapper">
        {/* Event Poster */}
        <div className="event-poster-container">
          <img src={event.poster} alt={event.title} className="event-poster" />
        </div>

        {/* Event Details */}
        <div className="event-details-info">
          {/* Event Category Badge */}
          <div className="event-category-badge">{event.category}</div>

          {/* Event Title */}
          <h1 className="event-details-title">{event.title}</h1>

          {/* Event Meta Info */}
          <div className="event-meta-tags">
            <span className="meta-tag">📅 {event.date}</span>
            <span className="meta-tag">⏰ {event.time}</span>
            <span className="meta-tag">📍 {event.venue}</span>
          </div>

          {/* About This Event Section */}
          <div className="about-event-section">
            <h2 className="about-heading">
              About This <span className="highlight">Event</span>
            </h2>
            <p className="event-description">{event.description}</p>
          </div>

          {/* Winners Section - Only for Past Events */}
          {event.type === "past" && event.winners && (
            <div className="winners-section">
              <h2 className="about-heading">
                Event <span className="highlight">Winners</span>
              </h2>
              <div className="winners-list">
                {event.winners.map((winner, index) => (
                  <div key={index} className="winner-item">
                    <div className="winner-place">{winner.place} Place</div>
                    <div className="winner-name">{winner.name}</div>
                    <div className="winner-category">{winner.category}</div>
                    <div className="winner-prize">🏆 {winner.prize}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

      

          {/* Register Button - Only for Ongoing Events */}
          {event.type === "ongoing" && (
            <button className="register-button">Register Now</button>
          )}
        </div>
      </div>
    </div>
  );
}