import { useEffect, useRef, useState } from "react";

export default function GalleryCylinder({ topImages, bottomImages }) {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const wrapperRef = useRef(null);
  
  const [angle, setAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentAngle, setCurrentAngle] = useState(0);

  // 🔥 AUTO ROTATION
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (!isDragging) {
        setAngle((prev) => prev + 0.25);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging]);

  // 🔥 UPDATE TRANSFORMS
  useEffect(() => {
    if (topRef.current) {
      topRef.current.style.transform = `rotateX(-12deg) rotateY(${angle}deg)`;
    }
    if (bottomRef.current) {
      bottomRef.current.style.transform = `rotateX(-12deg) rotateY(${angle}deg)`;
    }
  }, [angle]);

  // 🔥 MOUSE/TOUCH HANDLERS - Don't interfere with image hover
  const handleStart = (clientX, target) => {
    // Don't start dragging if clicking directly on an image
    if (target.tagName === 'IMG') return;
    
    setIsDragging(true);
    setStartX(clientX);
    setCurrentAngle(angle);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    
    const diff = clientX - startX;
    const rotationChange = diff * 0.5; // Sensitivity
    setAngle(currentAngle + rotationChange);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  // Mouse events
  const handleMouseDown = (e) => {
    handleStart(e.clientX, e.target);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  // Touch events
  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientX, e.target);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  // 🔥 GET RADIUS BASED ON SCREEN SIZE
  const getRadius = () => {
    if (typeof window === 'undefined') return 340;
    
    const width = window.innerWidth;
    
    // Desktop - LARGER RADIUS to prevent image crash
    if (width > 1024) return 500;
    
    // Tablet
    if (width > 768) return 400;
    
    // Mobile - keep current size
    return 340;
  };

  // 🔥 FIXED: Calculate z-index based on position
  const calculateZIndex = (itemAngle, currentRotation) => {
    // Normalize angles to 0-360
    const normalizedItemAngle = ((itemAngle - currentRotation) % 360 + 360) % 360;
    
    // Items at the back (around 180deg) should have lower z-index
    // Items at the front (around 0deg/360deg) should have higher z-index
    if (normalizedItemAngle > 90 && normalizedItemAngle < 270) {
      // Back half - lower z-index
      return Math.floor(100 - Math.abs(180 - normalizedItemAngle));
    } else {
      // Front half - higher z-index
      const frontAngle = normalizedItemAngle > 180 ? 360 - normalizedItemAngle : normalizedItemAngle;
      return Math.floor(200 - frontAngle);
    }
  };

  // Render images around cylinder with dynamic z-index
  const renderItems = (items, isOffset = false) => {
    const total = items.length;
    const angleStep = 360 / total;
    const radius = getRadius();

    return items.map((img, i) => {
      const offset = isOffset ? angleStep / 2 : 0;
      const itemAngle = i * angleStep + offset;
      const zIndex = calculateZIndex(itemAngle, angle);

      return (
        <div
          key={i}
          className="cylinder-item"
          style={{
            transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
            zIndex: zIndex
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.zIndex = '999';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.zIndex = zIndex;
          }}
        >
          <img src={img} alt={`Gallery ${i + 1}`} loading="lazy" />
        </div>
      );
    });
  };

  return (
    <div 
      className="cylinder-wrapper"
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >

      {/* 🔥 TOP CYLINDER */}
      <div className="cylinder-track top-track">
        <div className="cylinder" ref={topRef}>
          {renderItems(topImages, false)}
        </div>
      </div>

      {/* 🔥 BOTTOM CYLINDER */}
      <div className="cylinder-track bottom-track">
        <div className="cylinder" ref={bottomRef}>
          {renderItems(bottomImages, true)}
        </div>
      </div>

    </div>
  );
}