import React, { useEffect, useState } from 'react';
import './Loader.css';
import logoImage from '../assets/logo.png';

const Loader = ({ onLoadComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Exit animation timer
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2000);

    // Complete timer
    const completeTimer = setTimeout(() => {
      if (onLoadComplete) {
        onLoadComplete();
      }
    }, 2600);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadComplete]);

  return (
    <div className={`simple-loader ${isExiting ? 'exit-animation' : ''}`}>
      <div className="loader-content">
        {/* Logo */}
        <div className="logo-container">
          <img src={logoImage} alt="SHA" className="logo-image" />
        </div>

        {/* Title */}
        <div className="brand-section">
          <h1 className="brand-title">SCIENCE & HUMANITIES</h1>
          <div className="brand-divider"></div>
          <p className="brand-subtitle">ASSOCIATION</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;