import React, { useEffect, useState } from 'react';
import './Loader.css';
import logoImage from '../assets/logo.png';

const Loader = ({ onLoadComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1800);

    const completeTimer = setTimeout(() => {
      if (onLoadComplete) {
        onLoadComplete();
      }
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(glitchInterval);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadComplete]);

  return (
    <div className={`cyber-cosmic-loader ${isExiting ? 'exit-animation' : ''}`}>
      {/* Space Stars Background */}
      <div className="stars-field">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1}s`,
            }}
          />
        ))}
      </div>

      {/* Nebula Clouds */}
      <div className="nebula-container">
        <div className="nebula nebula-purple"></div>
        <div className="nebula nebula-cyan"></div>
        <div className="nebula nebula-pink"></div>
      </div>

      {/* Neon Grid */}
      <div className="neon-grid">
        <div className="grid-perspective"></div>
      </div>

      {/* Cyber Scanlines */}
      <div className="scanlines"></div>

      {/* Main Content */}
      <div className="main-content">
        {/* HUD Frame */}
        <div className="hud-frame">
          <div className="hud-corner hud-tl"></div>
          <div className="hud-corner hud-tr"></div>
          <div className="hud-corner hud-bl"></div>
          <div className="hud-corner hud-br"></div>
          
          {/* Top HUD Bar */}
          <div className="hud-bar hud-top">
            <span className="hud-text">SYSTEM BOOT</span>
            <span className="hud-blink">▊</span>
          </div>
        </div>

        {/* Logo Section */}
        <div className="logo-section">
          {/* Holographic Circle */}
          <div className="holo-circle holo-1"></div>
          <div className="holo-circle holo-2"></div>
          <div className="holo-circle holo-3"></div>

          {/* Orbital Rings */}
          <div className="orbital-system">
            <div className="orbit-ring ring-1">
              <div className="orbit-planet planet-1"></div>
            </div>
            <div className="orbit-ring ring-2">
              <div className="orbit-planet planet-2"></div>
            </div>
            <div className="orbit-ring ring-3">
              <div className="orbit-planet planet-3"></div>
            </div>
          </div>

          {/* Neon Hexagon */}
          <svg className="hex-container" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="50%" stopColor="#ff00ff" />
                <stop offset="100%" stopColor="#00ffff" />
              </linearGradient>
            </defs>
            <polygon 
              points="50 1 95 25 95 75 50 99 5 75 5 25" 
              className="hex-glow"
            />
            <polygon 
              points="50 1 95 25 95 75 50 99 5 75 5 25" 
              className="hex-line hex-1"
            />
            <polygon 
              points="50 10 85 30 85 70 50 90 15 70 15 30" 
              className="hex-line hex-2"
            />
          </svg>

          {/* Logo Container */}
          <div className={`cyber-logo-frame ${glitchActive ? 'glitch' : ''}`}>
            <div className="logo-glow-cyber"></div>
            <img src={logoImage} alt="SHA" className="cyber-logo" />
            
            {/* Hologram Effect */}
            <div className="hologram-lines">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="holo-line" style={{ 
                  top: `${(i * 100) / 8}%`,
                  animationDelay: `${i * 0.1}s`
                }} />
              ))}
            </div>
          </div>

          {/* Energy Particles */}
          <div className="energy-field">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="energy-particle"
                style={{
                  transform: `rotate(${(i * 360) / 20}deg)`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Brand Text */}
        <div className="cyber-brand">
          <h1 className={`brand-title ${glitchActive ? 'glitch-text' : ''}`}>
            <span className="neon-text">SCIENCE</span>
            <span className="neon-ampersand">&</span>
            <span className="neon-text">HUMANITIES</span>
          </h1>
          <div className="brand-subtitle">
            <div className="subtitle-line"></div>
            <span className="subtitle-text">ASSOCIATION</span>
            <div className="subtitle-line"></div>
          </div>
        </div>

        {/* Cyber Progress */}
        <div className="progress-cyber">
          <div className="progress-header">
            <span className="progress-label">LOADING NEURAL NETWORK</span>
            <span className="progress-value">{progress}%</span>
          </div>
          
          <div className="progress-track-cyber">
            <div className="progress-fill-cyber" style={{ width: `${progress}%` }}>
              <div className="progress-light"></div>
              <div className="progress-segments">
                {[...Array(30)].map((_, i) => (
                  <div key={i} className="segment-bar"></div>
                ))}
              </div>
            </div>
            <div className="progress-glow-cyber" style={{ width: `${progress}%` }}></div>
          </div>


        </div>

        {/* Loading Dots */}
        <div className="loading-indicator">
          <div className="cyber-dot"></div>
          <div className="cyber-dot"></div>
          <div className="cyber-dot"></div>
        </div>
      </div>

      {/* Circuit Lines */}
      <svg className="circuit-overlay" viewBox="0 0 100 100">
        <path d="M 0 50 L 20 50" className="circuit-path" />
        <path d="M 80 50 L 100 50" className="circuit-path" />
        <path d="M 50 0 L 50 20" className="circuit-path" />
        <path d="M 50 80 L 50 100" className="circuit-path" />
        <circle cx="20" cy="50" r="2" className="circuit-node" />
        <circle cx="80" cy="50" r="2" className="circuit-node" />
        <circle cx="50" cy="20" r="2" className="circuit-node" />
        <circle cx="50" cy="80" r="2" className="circuit-node" />
      </svg>

      {/* Glitch Overlay */}
      {glitchActive && <div className="glitch-overlay"></div>}
    </div>
  );
};

export default Loader;