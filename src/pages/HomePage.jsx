import heroImg from "../assets/hero-building.jpg";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";
import Footer from "../components/Footer"; // ADD THIS LINE

// Import gallery images
import g1 from "../assets/gallery/g1.jpg";
import g2 from "../assets/gallery/g2.jpg";
import g3 from "../assets/gallery/g3.jpg";
import g4 from "../assets/gallery/g4.jpg";

// Import faculty images
import f1 from "../assets/faculty/f1.jpg";
import f2 from "../assets/faculty/f2.jpg";
import f3 from "../assets/faculty/f3.jpg";
import f4 from "../assets/faculty/f4.jpg";
import f5 from "../assets/faculty/f5.jpg";
import f6 from "../assets/faculty/f6.jpg";
import f7 from "../assets/faculty/f7.jpg";
import f8 from "../assets/faculty/f8.jpg";
import f9 from "../assets/faculty/f9.jpg";
import f10 from "../assets/faculty/f10.jpg";

// Import student coordinator images
import s1 from "../assets/students/s1.jpg";
import s2 from "../assets/students/s2.jpg";
import s3 from "../assets/students/s3.jpg";
import s4 from "../assets/students/s4.jpg";
import s5 from "../assets/students/s5.jpg";
import s6 from "../assets/students/s6.jpg";
import s7 from "../assets/students/s7.jpg";
import s8 from "../assets/students/s8.jpg";
import s9 from "../assets/students/s9.jpg";
import s10 from "../assets/students/s10.jpg";

const facultyData = [
  { img: f1, name: "Dr. A", dept: "Dept of MTS" },
  { img: f2, name: "Dr. B", dept: "Dept of MTS" },
  { img: f3, name: "Dr. C", dept: "Dept of Physics" },
  { img: f4, name: "Dr. D", dept: "Dept of Chemistry" },
  { img: f5, name: "Dr. E", dept: "Dept of Mathematics" },
  { img: f6, name: "Dr. F", dept: "Dept of Biology" },
  { img: f7, name: "Dr. G", dept: "Dept of English" },
  { img: f8, name: "Dr. H", dept: "Dept of History" },
  { img: f9, name: "Dr. I", dept: "Dept of Mathematics" },
  { img: f10, name: "Dr. J", dept: "Dept of ENGLISH" },
];

const studentData = [
  { img: s1, name: "Student A", year: " Mechatronics" },
  { img: s2, name: "Student B", year: " Mechatronics" },
  { img: s3, name: "Student C", year: " ECE" },
  { img: s4, name: "Student D", year: " EEE" },
  { img: s5, name: "Student E", year: " CSE" },
  { img: s6, name: "Student F", year: " ECE" },
  { img: s7, name: "Student G", year: " Mechatronics" },
  { img: s8, name: "Student H", year: " IT" },
  { img: s9, name: "Student I", year: " Mechatronics" },
  { img: s10, name: "Student J", year: " ECE" },
];

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-scroll">
      {/*   HOME 1   */}
      <section className="screen home1-desktop">
        {/* HERO */}
        <div className="home1-hero-wrapper">
          <img src={heroImg} alt="Hero" className="home1-hero-img" />

          <div className="home1-hero-content">
            <img src={logo} alt="SHA Logo" className="home1-center-logo" />
            <h1>Science and Humanities Association</h1>

            <button
              className="btn-primary"
              onClick={() => navigate("/events")}
            >
              View Events
            </button>

            <div className="down-arrow">↓</div>
          </div>
        </div>

        {/* ABOUT */}
        <div className="about-card">
          <h2 className="about-title">Science & Humanities Association</h2>

          <p>
            The <span className="highlight">Science & Humanities Association (SHA)</span> is one of the
            largest associations of <strong>Kongu Engineering College (Autonomous)</strong>.
          </p>

          <p>
            SHA represents the Department of Science & Humanities, comprising four distinguished
            departments: <strong>Mathematics, Physics, Chemistry,</strong> and <strong>English</strong>.
            It also represents all first-year B.E./B.Tech students, serving as a common platform
            that brings together young minds from diverse disciplines.
          </p>

          <p>
            The association is presided over by the Dean of Science & Humanities and is organized
            into six clusters, each headed by a Secretary, Joint Secretary, Treasurer, and Joint
            Treasurer, along with a team of executive members.
          </p>

          <p className="closing-line">
            Through its initiatives, SHA promotes academic excellence, leadership, and holistic
            development beyond the classroom.
          </p>
        </div>
      </section>

      {/*   HOME 2 WITH NEW ANIMATED BACKGROUND   */}
      <section className="screen home2">
        {/* NEW Three.js Animated Background */}
        <AnimatedBackground />

        {/* Content */}
        <div className="home2-content">
          <div className="home2-top">
            <span>Gallery</span>
          </div>

          <div className="home2-grid">
            <div className="gallery-box">
              <img src={g1} alt="Gallery 1" />
            </div>
            <div className="gallery-box">
              <img src={g2} alt="Gallery 2" />
            </div>
            <div className="gallery-box">
              <img src={g3} alt="Gallery 3" />
            </div>
            <div className="gallery-box">
              <img src={g4} alt="Gallery 4" />
            </div>
          </div>

          <button
            className="home2-btn"
            onClick={() => navigate("/gallery")}
          >
            View Gallery
          </button>
        </div>
      </section>

      {/*   HOME 3   */}
      <section className="screen home3">
        {/* FACULTY COORDINATORS */}
        <h2>Faculty Coordinators</h2>
        
        <div className="coordinator-carousel">
          {facultyData.map((faculty, index) => (
            <div className="coordinator-card" key={index}>
              <div className="coordinator-avatar">
                <img src={faculty.img} alt={faculty.name} />
              </div>
              <p className="coordinator-name">{faculty.name}</p>
              <span className="coordinator-dept">{faculty.dept}</span>
            </div>
          ))}
        </div>

        <p className="swipe-hint">← Swipe to see more →</p>

        {/* STUDENT COORDINATORS */}
        <h2 style={{ marginTop: '40px' }}>Student Coordinators</h2>

        <div className="coordinator-carousel">
          {studentData.map((student, index) => (
            <div className="coordinator-card" key={index}>
              <div className="coordinator-avatar">
                <img src={student.img} alt={student.name} />
              </div>
              <p className="coordinator-name">{student.name}</p>
              <span className="coordinator-dept">{student.year}</span>
            </div>
          ))}
        </div>

        <p className="swipe-hint">← Swipe to see more →</p>
      </section>

      {/* ADD FOOTER HERE */}
      <Footer />
    </div>
  );
}

export default HomePage;