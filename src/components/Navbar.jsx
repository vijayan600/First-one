import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import shaGold from "../assets/sha-gold.png";
import kecLogo from "../assets/kec-logo.png";
import "../styles/navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [showKecLogo, setShowKecLogo] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (isHomePage) {
      setShowKecLogo(true);
    } else {
      setShowKecLogo(false);
    }

    const handleScroll = () => {
      if (!isHomePage) return;

      const scrollContainer = document.querySelector('.home-scroll');
      const home1Section = document.querySelector('.home1-desktop');
      
      if (!home1Section) return;
      
      // Get scroll position
      let scrollTop = 0;
      if (scrollContainer) {
        scrollTop = scrollContainer.scrollTop;
      } else {
        scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      }
      
      const home1Height = home1Section.offsetHeight;
      const threshold = home1Height * 0.7;
      
      console.log('Scroll:', scrollTop, '| Home1 Height:', home1Height, '| Threshold:', threshold);
      
      if (scrollTop > threshold) {
        console.log('✓ HOME2 REACHED - Hiding KEC, showing text');
        setShowKecLogo(false);
      } else {
        console.log('✓ HOME1 - Showing KEC, hiding text');
        setShowKecLogo(true);
      }
    };

    const scrollContainer = document.querySelector('.home-scroll');
    
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll);
      document.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isHomePage, location.pathname]);

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
      <header className="main-navbar">
        <div 
          className="nav-left" 
          onClick={handleLogoClick}
          style={{ cursor: 'pointer', pointerEvents: 'auto' }}
        >
          <img src={currentLogo} className="nav-logo" alt="SHA" />
          {(!showKecLogo || !isHomePage) && (
            <span className="nav-association-text">
              S & H Association
            </span>
          )}
        </div>

        {showKecLogo && isHomePage && (
          <div 
            className="nav-center" 
            onClick={handleLogoClick}
            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          >
            <img src={kecLogo} className="nav-kec" alt="KEC" />
          </div>
        )}

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