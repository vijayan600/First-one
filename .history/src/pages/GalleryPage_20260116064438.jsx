import { useState, useEffect } from "react";
import "../styles/gallery.css";
import GalleryCylinder from "../components/GalleryCylinder";

/* NAV LOGO */
import shaGold from "../assets/sha-gold.png";

/* IMPORT ALL 30 IMAGES */
import g1 from "../assets/gallery/g1.jpg";
import g2 from "../assets/gallery/g2.jpg";
import g3 from "../assets/gallery/g3.jpg";
import g4 from "../assets/gallery/g4.jpg";
import g5 from "../assets/gallery/g5.jpg";
import g6 from "../assets/gallery/g6.jpg";
import g7 from "../assets/gallery/g7.jpg";
import g8 from "../assets/gallery/g8.jpg";
import g9 from "../assets/gallery/g9.jpg";
import g10 from "../assets/gallery/g10.jpg";
import g11 from "../assets/gallery/g11.jpg";
import g12 from "../assets/gallery/g12.jpg";
import g13 from "../assets/gallery/g13.jpg";
import g14 from "../assets/gallery/g14.jpg";
import g15 from "../assets/gallery/g15.jpg";
import g16 from "../assets/gallery/g16.jpg";
import g17 from "../assets/gallery/g17.jpg";
import g18 from "../assets/gallery/g18.jpg";
import g19 from "../assets/gallery/g19.jpg";
import g20 from "../assets/gallery/g20.jpg";
import g21 from "../assets/gallery/g21.jpg";
import g22 from "../assets/gallery/g22.jpg";
import g23 from "../assets/gallery/g23.jpg";
import g24 from "../assets/gallery/g24.jpg";
import g25 from "../assets/gallery/g25.jpg";
import g26 from "../assets/gallery/g26.jpg";
import g27 from "../assets/gallery/g27.jpg";
import g28 from "../assets/gallery/g28.jpg";
import g29 from "../assets/gallery/g29.jpg";
import g30 from "../assets/gallery/g30.jpg";

/*  IMAGE ARRAY */
const images = [
  g1, g2, g3, g4, g5,
  g6, g7, g8, g9, g10,
  g11, g12, g13, g14, g15,
  g16, g17, g18, g19, g20,
  g21, g22, g23, g24, g25,
  g26, g27, g28, g29, g30
];

export default function GalleryPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Members", path: "/members" },
    { name: "Contact", path: "/contact" }
  ];

  //  Calculate midpoint dynamically so it works for any number of images
  const midpoint = Math.ceil(images.length / 2);

  // Prevent body scroll when menu is open
  useEffect(() => {
    const galleryBg = document.querySelector('.gallery-bg');
    
    if (menuOpen) {
      if (galleryBg) {
        galleryBg.style.overflow = 'hidden';
      }
    } else {
      if (galleryBg) {
        galleryBg.style.overflow = '';
      }
    }

    return () => {
      if (galleryBg) {
        galleryBg.style.overflow = '';
      }
    };
  }, [menuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  return (
    <div className="gallery-bg">

      {/*  NAVBAR */}
      <header className="gallery-navbar">
        <div className="nav-left">
          <img src={shaGold} alt="SHA Logo" />
          <span>S & H Association</span>
        </div>

        <div className="nav-right">
          <div 
            className="menu-icon" 
            onClick={() => setMenuOpen(!menuOpen)}
            role="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </div>
        </div>
      </header>

      {/*  PAGE TITLE */}
      <div className="gallery-page-content">
        <h1 className="gallery-title">Gallery</h1>

        {/* CYLINDRICAL GALLERY - Dynamically splits images in half */}
        <GalleryCylinder
          topImages={images.slice(0, midpoint)}
          bottomImages={images.slice(midpoint)}
        />
      </div>

      

      {/* 🔥 SIDE MENU */}
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div 
          className="menu-overlay" 
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        ></div>
        
        <div className="menu-content" onClick={(e) => e.stopPropagation()}>
          <div className="menu-header">
            <h2>S & H Association</h2>
          </div>

          <nav className="menu-nav">
            {menuItems.map((item, index) => (
              <a 
                key={index}
                href={item.path}
                className={`menu-item ${item.name === "Gallery" ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className="menu-text">{item.name}</span>
                <span className="menu-arrow">→</span>
              </a>
            ))}
          </nav>

          <div className="menu-footer">
            <p>© 2024 S & H Association</p>
          </div>
        </div>
      </div>

    </div>
  );
}