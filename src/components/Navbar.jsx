import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import shaGold from "../assets/sha-gold.png";
import kecLogo from "../assets/kec-logo.png";
import "../styles/navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.querySelector('.home-scroll');
      if (scrollContainer) {
        setScrolled(scrollContainer.scrollTop > 50);
      } else {
        setScrolled(window.scrollY > 50);
      }
    };

    const scrollContainer = document.querySelector('.home-scroll');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Logo clicked - navigating to home");
    
    if (location.pathname === "/") {
      const scrollContainer = document.querySelector('.home-scroll');
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const scrollContainer = document.querySelector('.home-scroll');
        if (scrollContainer) {
          scrollContainer.scrollTo({ top: 0, behavior: 'auto' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      }, 100);
    }
  };

  const currentLogo = isHomePage ? logo : shaGold;

  return (
    <>
      <header className={`main-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div 
          className="nav-left" 
          onClick={handleLogoClick}
          style={{ cursor: 'pointer', pointerEvents: 'auto' }}
        >
          <img src={currentLogo} className="nav-logo" alt="SHA" />
          <span className="nav-title">SHA</span>
          <span className={`nav-association-text ${scrolled ? '' : 'hidden'}`}>
            Science & Humanities Association
          </span>
        </div>

        <div 
          className={`nav-center ${scrolled ? 'hidden' : ''}`} 
          onClick={handleLogoClick}
          style={{ cursor: 'pointer', pointerEvents: 'auto' }}
        >
          <img src={kecLogo} className="nav-kec" alt="KEC" />
        </div>

        <div className="nav-right">
          <span className="nav-menu" onClick={() => setOpen(true)}>
            ☰
          </span>
        </div>
      </header>

      {open && <div className="menu-overlay" onClick={() => setOpen(false)} />}

      <aside className={`menu-drawer ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          ✕
        </button>

        <div className="menu-header">
          <h2>Science & Humanities Association</h2>
        </div>

        <nav className="menu-links">
          <a 
            onClick={() => handleNavigation("/")} 
            className={location.pathname === "/" ? "active" : ""}
          >
            HOME
          </a>
          <a 
            onClick={() => handleNavigation("/events")} 
            className={location.pathname === "/events" ? "active" : ""}
          >
            EVENTS
          </a>
          <a 
            onClick={() => handleNavigation("/gallery")} 
            className={location.pathname === "/gallery" ? "active" : ""}
          >
            GALLERY
          </a>
          <a 
            onClick={() => handleNavigation("/cluster-members")} 
            className={location.pathname === "/cluster-members" ? "active" : ""}
          >
            MEMBERS
          </a>
        
        </nav>

        <div className="menu-footer">
          <p>© 2026 Science & Humanities Association</p>
        </div>
      </aside>
    </>
  );
}

export default Navbar;