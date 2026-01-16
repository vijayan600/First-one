import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import kecLogo from "../assets/kec-logo.png";
import "../styles/navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <>
      {/* NAVBAR */}
      <header className={`main-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-left">
          <img src={logo} className="nav-logo" alt="SHA" />
          <span className="nav-title">SHA</span>
          {/* S & H Association text appears when scrolled */}
          <span className={`nav-association-text ${scrolled ? '' : 'hidden'}`}>
            S & H Association
          </span>
        </div>

        <div className={`nav-center ${scrolled ? 'hidden' : ''}`}>
          <img src={kecLogo} className="nav-kec" alt="KEC" />
        </div>

        <div className="nav-right">
          <span className="nav-menu" onClick={() => setOpen(true)}>
            ☰
          </span>
        </div>
      </header>

      {/* OVERLAY */}
      {open && <div className="menu-overlay" onClick={() => setOpen(false)} />}

      {/* STYLED MENU DRAWER */}
      <aside className={`menu-drawer ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          ✕
        </button>

        <div className="menu-header">
          <h2>S & H ASSOCIATION</h2>
        </div>

        <nav className="menu-links">
          <a href="/" className={window.location.pathname === "/" ? "active" : ""}>
            HOME
          </a>
          <a href="/events" className={window.location.pathname === "/events" ? "active" : ""}>
            EVENTS
          </a>
          <a href="/gallery" className={window.location.pathname === "/gallery" ? "active" : ""}>
            GALLERY
          </a>
          <a href="/members" className={window.location.pathname === "/members" ? "active" : ""}>
            MEMBERS
          </a>
          <a href="/contact" className={window.location.pathname === "/contact" ? "active" : ""}>
            CONTACT
          </a>
        </nav>

        <div className="menu-footer">
          <p>© 2024 S & H Association</p>
        </div>
      </aside>
    </>
  );
}

export default Navbar;