import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/clustermembers.css";

// Import Footer component
import Footer from "../components/Footer";

// Import SHA logo - replace with your actual path
import shaGold from "../assets/sha-gold.png";

// Import member images m1 to m30 (PNG format)
import m1 from "../assets/members/m1.png";
import m2 from "../assets/members/m2.png";
import m3 from "../assets/members/m3.png";
import m4 from "../assets/members/m4.png";
import m5 from "../assets/members/m5.png";
import m6 from "../assets/members/m6.png";
import m7 from "../assets/members/m7.png";
import m8 from "../assets/members/m8.png";
import m9 from "../assets/members/m9.png";
import m10 from "../assets/members/m10.png";
import m11 from "../assets/members/m11.png";
import m12 from "../assets/members/m12.png";
import m13 from "../assets/members/m13.png";
import m14 from "../assets/members/m14.png";
import m15 from "../assets/members/m15.png";
import m16 from "../assets/members/m16.png";
import m17 from "../assets/members/m17.png";
import m18 from "../assets/members/m18.png";
import m19 from "../assets/members/m19.png";
import m20 from "../assets/members/m20.png";
import m21 from "../assets/members/m21.png";
import m22 from "../assets/members/m22.png";
import m23 from "../assets/members/m23.png";
import m24 from "../assets/members/m24.png";
import m25 from "../assets/members/m25.png";
import m26 from "../assets/members/m26.png";
import m27 from "../assets/members/m27.png";
import m28 from "../assets/members/m28.png";
import m29 from "../assets/members/m29.png";
import m30 from "../assets/members/m30.png";

// Updated member data - 5 Clusters with 6 members each
const MEMBERS = [
  // CLUSTER 1 - 6 members
  { id: 1, name: "Arun Kumar", dept: "CSE", year: "II", cluster: "Cluster 1", image: m1 },
  { id: 2, name: "Priya Sharma", dept: "ECE", year: "II", cluster: "Cluster 1", image: m2 },
  { id: 3, name: "Karthik Raj", dept: "EEE", year: "II", cluster: "Cluster 1", image: m3 },
  { id: 4, name: "Divya S", dept: "Mech", year: "II", cluster: "Cluster 1", image: m4 },
  { id: 5, name: "Ravi M", dept: "Civil", year: "II", cluster: "Cluster 1", image: m5 },
  { id: 26, name: "Shalini V", dept: "Mech", year: "II", cluster: "Cluster 1", image: m26 },
  
  // CLUSTER 2 - 6 members
  { id: 6, name: "Sneha R", dept: "IT", year: "II", cluster: "Cluster 2", image: m6 },
  { id: 7, name: "Vijay Kumar V", dept: "CSE", year: "II", cluster: "Cluster 2", image: m7 },
  { id: 8, name: "Anjali M", dept: "ECE", year: "II", cluster: "Cluster 2", image: m8 },
  { id: 9, name: "Suresh B", dept: "EEE", year: "II", cluster: "Cluster 2", image: m9 },
  { id: 10, name: "Lakshmi P", dept: "Mechatronics", year: "II", cluster: "Cluster 2", image: m10 },
  { id: 27, name: "Prakash L", dept: "CSE", year: "II", cluster: "Cluster 2", image: m27 },
  
  // CLUSTER 3 - 6 members
  { id: 11, name: "Rajesh K", dept: "CSE", year: "II", cluster: "Cluster 3", image: m11 },
  { id: 12, name: "Meera S", dept: "IT", year: "II", cluster: "Cluster 3", image: m12 },
  { id: 13, name: "Ganesh R", dept: "ECE", year: "II", cluster: "Cluster 3", image: m13 },
  { id: 14, name: "Kavya L", dept: "EEE", year: "II", cluster: "Cluster 3", image: m14 },
  { id: 15, name: "Harish V", dept: "Mech", year: "II", cluster: "Cluster 3", image: m15 },
  { id: 28, name: "Shruti K", dept: "IT", year: "II", cluster: "Cluster 3", image: m28 },
  
  // CLUSTER 4 - 6 members
  { id: 16, name: "Pooja R", dept: "CSE", year: "II", cluster: "Cluster 4", image: m16 },
  { id: 17, name: "Naveen K", dept: "IT", year: "II", cluster: "Cluster 4", image: m17 },
  { id: 18, name: "Swathi M", dept: "ECE", year: "II", cluster: "Cluster 4", image: m18 },
  { id: 19, name: "Deepak S", dept: "EEE", year: "II", cluster: "Cluster 4", image: m19 },
  { id: 20, name: "Nithya B", dept: "Civil", year: "II", cluster: "Cluster 4", image: m20 },
  { id: 29, name: "Arjun M", dept: "ECE", year: "II", cluster: "Cluster 4", image: m29 },
  
  // CLUSTER 5 - 6 members
  { id: 21, name: "Ramesh P", dept: "Mechatronics", year: "II", cluster: "Cluster 5", image: m21 },
  { id: 22, name: "Vani S", dept: "CSE", year: "II", cluster: "Cluster 5", image: m22 },
  { id: 23, name: "Krishna M", dept: "IT", year: "II", cluster: "Cluster 5", image: m23 },
  { id: 24, name: "Bhavana R", dept: "ECE", year: "II", cluster: "Cluster 5", image: m24 },
  { id: 25, name: "Mohan K", dept: "EEE", year: "II", cluster: "Cluster 5", image: m25 },
  { id: 30, name: "Rekha S", dept: "EEE", year: "II", cluster: "Cluster 5", image: m30 },
];

// Group members by cluster
const groupByCluster = (members) => {
  const clusters = {};
  members.forEach((member) => {
    if (!clusters[member.cluster]) {
      clusters[member.cluster] = [];
    }
    clusters[member.cluster].push(member);
  });
  return clusters;
};

export default function ClusterMembers() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const clusteredMembers = groupByCluster(MEMBERS);

  return (
    <>
      {/* NAVBAR */}
      <header className="members-navbar">
        <div className="nav-left" onClick={() => handleNavigation("/")} style={{ cursor: 'pointer' }}>
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

        <h2>SCIENCE & HUMANITIES ASSOCIATION</h2>

        <nav className="menu-links">
          <a onClick={() => handleNavigation("/")}>HOME</a>
          <a onClick={() => handleNavigation("/events")}>EVENTS</a>
          <a onClick={() => handleNavigation("/gallery")}>GALLERY</a>
          <a onClick={() => handleNavigation("/cluster-members")} className="active">MEMBERS</a>
   
        </nav>

        <footer>© 2026 SCIENCE & HUMANITIES ASSOCIATION</footer>
      </aside>

      {/* PAGE */}
      <section className="members-page">
        <h1 className="page-title">Cluster Members</h1>

        <div className="members-container">
          {Object.keys(clusteredMembers).map((clusterName) => (
            <div key={clusterName} className="cluster-section">
              <h2 className="cluster-heading">{clusterName}</h2>
              
              <div className="members-grid">
                {clusteredMembers[clusterName].map((member) => (
                  <div key={member.id} className="member-card-small">
                    <div className="member-photo">
                      <img src={member.image} alt={member.name} />
                    </div>
                    <div className="member-details">
                      <h3 className="member-name">{member.name}</h3>
                      <p className="member-dept">{member.dept}</p>
                      <p className="member-year">Year {member.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER - Added here */}
      <Footer />
    </>
  );
}