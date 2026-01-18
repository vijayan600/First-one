import { useEffect, useRef } from "react";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";

export default function AnimatedBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    /* ================= CONSTANTS ================= */
    const PARTICLE_COUNT = 12000;
    const SPARK_COUNT = 1500;
    const STAR_COUNT = 5000;
    const morphSpeed = 0.035;

    let scene, camera, renderer, composer, controls;
    let particles, sparkles, stars, shaderPoints, mainGroup;
    let currentPattern = 0;
    let isTrans = false;
    let prog = 0;

    let raycaster, mouse;
    let isHoveringParticles = false;

    const isMobile = "ontouchstart" in window;

    /* ================= LIGHTNING HELPERS ================= */
    const rand = (n = 1) => (Math.random() - 0.5) * n;
    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    /* ================= SHAPES ================= */
    const normalise = (points, size) => {
      const box = new THREE.Box3().setFromPoints(points);
      const maxDim = Math.max(...box.getSize(new THREE.Vector3()).toArray()) || 1;
      const center = box.getCenter(new THREE.Vector3());
      return points.map(p =>
        p.clone().sub(center).multiplyScalar(size / maxDim)
      );
    };

    const torusKnot = (n) => {
      const geo = new THREE.TorusKnotGeometry(10, 3, 600, 32);
      const pts = [];
      const pos = geo.attributes.position;
      for (let i = 0; i < n; i++) {
        pts.push(new THREE.Vector3().fromBufferAttribute(pos, i % pos.count));
      }
      geo.dispose();
      return normalise(pts, 50);
    };

    const dualHelix = (n) => {
      const pts = [];
      const turns = 5, radius = 15, height = 40;
      for (let i = 0; i < n; i++) {
        const isB = i % 2 === 0;
        const t = i / n;
        const a = t * Math.PI * 2 * turns + (isB ? Math.PI : 0);
        const y = t * height - height / 2;
        const r = radius + (isB ? 5 : -5);
        pts.push(new THREE.Vector3(
          Math.cos(a) * r,
          y,
          Math.sin(a) * r
        ));
      }
      return normalise(pts, 60);
    };

    const PATTERNS = [torusKnot, dualHelix];

    /* ================= INIT ================= */
    function init() {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2500);
      camera.position.set(0, 0, 140);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enabled = false;

      stars = makeStars();
      scene.add(stars);

      const palette = [0xff3c78, 0x00cfff, 0xb400ff, 0xffffff].map(c => new THREE.Color(c));
      particles = makeParticles(PARTICLE_COUNT, palette);
      sparkles = makeSparkles(SPARK_COUNT);
      shaderPoints = makeShaderPoints(3000);

      mainGroup = new THREE.Group();
      mainGroup.add(particles, sparkles, shaderPoints);

      positionTopRight();
      scene.add(mainGroup);

      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.0, 0.4, 0.85
      ));
      composer.addPass(new AfterimagePass());
      composer.addPass(new OutputPass());

      applyPattern(0);

      // Setup raycaster with larger threshold for easier detection
      raycaster = new THREE.Raycaster();
      raycaster.params.Points.threshold = 15; // Much larger threshold!
      mouse = new THREE.Vector2();

      // Event listeners
      if (!isMobile) {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("click", onClick);
      } else {
        window.addEventListener("touchstart", onTouchStart, { passive: true });
      }

      window.addEventListener("resize", onResize);
    }

    /* ================= EVENTS ================= */
    function onMouseMove(e) {
      // Convert mouse position to normalized device coordinates
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    function onClick(e) {
      if (isTrans) return;
      
      // Update mouse position on click
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Check intersection
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(particles);

      if (intersects.length > 0) {
        console.log("🎯 CLICK detected on particles! Morphing...");
        beginMorph();
      } else {
        console.log("❌ Clicked but no particles detected");
      }
    }

    function onTouchStart(e) {
      if (isTrans) return;

      const touch = e.touches[0];
      mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(particles);

      if (intersects.length > 0) {
        console.log("👆 TAP detected on particles! Morphing...");
        beginMorph();
      }
    }

    /* ================= MORPH ================= */
    function beginMorph() {
      isTrans = true;
      prog = 0;

      const next = (currentPattern + 1) % PATTERNS.length;
      const from = particles.geometry.attributes.position.array.slice();
      const pts = PATTERNS[next](PARTICLE_COUNT);
      const to = new Float32Array(PARTICLE_COUNT * 3);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        to[i * 3] = pts[i].x;
        to[i * 3 + 1] = pts[i].y;
        to[i * 3 + 2] = pts[i].z;
      }

      particles.userData = { from, to, next };
    }

    function applyPattern(i) {
      const pts = PATTERNS[i](PARTICLE_COUNT);
      const arr = particles.geometry.attributes.position.array;
      for (let j = 0; j < PARTICLE_COUNT; j++) {
        arr[j * 3] = pts[j].x;
        arr[j * 3 + 1] = pts[j].y;
        arr[j * 3 + 2] = pts[j].z;
      }
      particles.geometry.attributes.position.needsUpdate = true;
    }

    /* ================= ANIMATION ================= */
    function animate() {
      requestAnimationFrame(animate);

      mainGroup.rotation.y += 0.0005;

      // Check for hover every frame (only when not transitioning)
      if (!isTrans) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(particles);

        // If currently hovering and wasn't before - trigger morph
        if (intersects.length > 0 && !isHoveringParticles) {
          console.log("🎯 HOVER detected! Morphing...");
          beginMorph();
          isHoveringParticles = true;
        }
        // If no longer hovering - reset the flag so next hover can trigger
        else if (intersects.length === 0 && isHoveringParticles) {
          isHoveringParticles = false;
        }
      }

      if (isTrans) {
        prog += morphSpeed;
        const t = Math.min(prog, 1);
        const eased = easeOutExpo(t);
        const lightning = (1 - eased) * 6;

        const { from, to } = particles.userData;
        const arr = particles.geometry.attributes.position.array;

        for (let i = 0; i < arr.length; i += 3) {
          arr[i]     = from[i]     + (to[i]     - from[i])     * eased + rand(lightning);
          arr[i + 1] = from[i + 1] + (to[i + 1] - from[i + 1]) * eased + rand(lightning);
          arr[i + 2] = from[i + 2] + (to[i + 2] - from[i + 2]) * eased + rand(lightning);
        }

        particles.geometry.attributes.position.needsUpdate = true;

        if (prog >= 1) {
          currentPattern = particles.userData.next;
          isTrans = false;
          // Don't reset isHoveringParticles here - let it reset when mouse leaves
        }
      }

      composer.render();
    }

    /* ================= UTILS ================= */
    function positionTopRight() {
      const mobile = window.innerWidth < 768;
      const aspect = window.innerWidth / window.innerHeight;
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const viewHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const viewWidth = viewHeight * aspect;

      const scale = mobile ? 0.4 : 0.7;
      mainGroup.position.set(
        viewWidth / 2 - (mobile ? 15 : 40),
        viewHeight / 2 - (mobile ? 25 : 40),
        0
      );
      mainGroup.scale.set(scale, scale, scale);
    }

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      positionTopRight();
    }

    function makeStars() {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(STAR_COUNT * 3);
      for (let i = 0; i < STAR_COUNT; i++) {
        const r = 900 * Math.cbrt(Math.random());
        const phi = Math.random() * Math.PI * 2;
        const cost = 2 * Math.random() - 1;
        const theta = Math.acos(cost);
        pos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
        pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
        pos[i * 3 + 2] = r * Math.cos(theta);
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      return new THREE.Points(geo, new THREE.PointsMaterial({
        size: 1, color: 0xffffff, transparent: true, opacity: 0.7, depthWrite: false
      }));
    }

    function makeParticles(n, palette) {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(n * 3);
      const col = new Float32Array(n * 3);

      for (let i = 0; i < n; i++) {
        const base = palette[Math.floor(Math.random() * palette.length)];
        const c = base.clone().offsetHSL((Math.random() - 0.5) * 0.1, 0, 0);
        col.set([c.r, c.g, c.b], i * 3);
      }

      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));

      return new THREE.Points(geo, new THREE.PointsMaterial({
        size: 1.6,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        depthWrite: false
      }));
    }

    function makeSparkles(n) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
      return new THREE.Points(geo, new THREE.PointsMaterial({
        size: 1.2, color: 0xffffff, transparent: true, opacity: 0.9, depthWrite: false
      }));
    }

    function makeShaderPoints(n) {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 600;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 600;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 600;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

      return new THREE.Points(geo, new THREE.ShaderMaterial({
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexShader: `
          void main(){
            gl_PointSize = 2.0;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }`,
        fragmentShader: `
          void main(){
            float d = length(gl_PointCoord - vec2(0.5));
            float a = 1.0 - smoothstep(0.4,0.5,d);
            if(a < 0.01) discard;
            gl_FragColor = vec4(1.0,0.8,1.0,a);
          }`
      }));
    }

    init();
    animate();

    return () => {
      if (!containerRef.current) return;
      
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchstart", onTouchStart);
      
      if (renderer) {
        renderer.dispose();
        if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
      
      if (composer) composer.dispose();
      
      [particles, sparkles, stars, shaderPoints].forEach(obj => {
        if (obj?.geometry) obj.geometry.dispose();
        if (obj?.material) obj.material.dispose();
      });
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