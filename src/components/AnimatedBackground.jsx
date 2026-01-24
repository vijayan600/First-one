import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function AnimatedBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    /* ================= CONSTANTS ================= */
    const STAR_COUNT = 5000;

    let scene, camera, renderer;
    let stars;

    /* ================= INIT ================= */
    function init() {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2500);
      camera.position.set(0, 0, 140);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);

      stars = makeStars();
      scene.add(stars);

      window.addEventListener("resize", onResize);
    }

    /* ================= ANIMATION ================= */
    function animate() {
      requestAnimationFrame(animate);

      // Rotate stars to create movement and tails
      stars.rotation.x += 0.0003;
      stars.rotation.y += 0.0005;

      renderer.render(scene, camera);
    }

    /* ================= UTILS ================= */
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function makeStars() {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(STAR_COUNT * 3);
      const colors = new Float32Array(STAR_COUNT * 3);
      const sizes = new Float32Array(STAR_COUNT);

      for (let i = 0; i < STAR_COUNT; i++) {
        const r = 900 * Math.cbrt(Math.random());
        const phi = Math.random() * Math.PI * 2;
        const cost = 2 * Math.random() - 1;
        const theta = Math.acos(cost);
        pos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
        pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
        pos[i * 3 + 2] = r * Math.cos(theta);

        // Add color variation with bright blue-white lightning effect
        const brightness = Math.random();
        if (brightness > 0.85) {
          // Bright lightning stars (blue-white)
          colors[i * 3] = 0.6 + Math.random() * 0.4;
          colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
          colors[i * 3 + 2] = 1.0;
          sizes[i] = 2 + Math.random() * 2;
        } else if (brightness > 0.7) {
          // Bright white stars
          colors[i * 3] = 1.0;
          colors[i * 3 + 1] = 1.0;
          colors[i * 3 + 2] = 1.0;
          sizes[i] = 1.5 + Math.random() * 1.5;
        } else {
          // Normal stars
          colors[i * 3] = 0.7 + Math.random() * 0.3;
          colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
          colors[i * 3 + 2] = 0.7 + Math.random() * 0.3;
          sizes[i] = 0.5 + Math.random() * 1;
        }
      }

      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      return new THREE.Points(geo, new THREE.PointsMaterial({
        size: 1,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      }));
    }

    init();
    animate();

    return () => {
      if (!containerRef.current) return;
      
      window.removeEventListener("resize", onResize);
      
      if (renderer) {
        renderer.dispose();
        if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
      
      if (stars?.geometry) stars.geometry.dispose();
      if (stars?.material) stars.material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1
      }}
    />
  );
}