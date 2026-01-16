import { useEffect, useRef } from 'react';

function AnimatedBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let scene, camera, renderer, controls, clock;
    let particles, stars;
    let currentPattern = 0, isTrans = false, prog = 0;
    let animationId;
    let morphInterval;

    const loadAnimation = async () => {
      try {
        const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.162.0/build/three.module.js');
        const { OrbitControls } = await import('https://cdn.jsdelivr.net/npm/three@0.162.0/examples/jsm/controls/OrbitControls.js');

        const container = containerRef.current;
        if (!container) return;

        const PARTICLE_COUNT = 6000;
        const STAR_COUNT = 2000;

        function normalise(points, size) {
          const box = new THREE.Box3().setFromPoints(points);
          const maxDim = Math.max(...box.getSize(new THREE.Vector3()).toArray()) || 1;
          const center = box.getCenter(new THREE.Vector3());
          return points.map(p => p.clone().sub(center).multiplyScalar(size / maxDim));
        }

        function torusKnot(n) {
          const geo = new THREE.TorusKnotGeometry(10, 3, 400, 32);
          const pts = [];
          const pos = geo.attributes.position;
          for (let i = 0; i < n; i++) {
            pts.push(new THREE.Vector3().fromBufferAttribute(pos, i % pos.count));
          }
          return normalise(pts, 40);
        }

        function dualHelix(n) {
          const pts = [];
          const turns = 5, radius = 12, height = 35;
          for (let i = 0; i < n; i++) {
            const isB = i % 2 === 0;
            const t = i / n;
            const angle = t * Math.PI * 2 * turns + (isB ? Math.PI : 0);
            const y = t * height - height / 2;
            const r = radius + (isB ? 4 : -4);
            pts.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r));
          }
          return normalise(pts, 50);
        }

        const PATTERNS = [torusKnot, dualHelix];

        function makeStars() {
          const geo = new THREE.BufferGeometry();
          const pos = new Float32Array(STAR_COUNT * 3);
          for (let i = 0; i < STAR_COUNT; i++) {
            const r = 600 * Math.cbrt(Math.random());
            const phi = Math.random() * 2 * Math.PI;
            const cost = 2 * Math.random() - 1;
            const theta = Math.acos(cost);
            pos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
            pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
            pos[i * 3 + 2] = r * Math.cos(theta);
          }
          geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
          return new THREE.Points(geo, new THREE.PointsMaterial({ 
            size: 0.8, 
            color: 0xffffff, 
            transparent: true, 
            opacity: 0.5, 
            depthWrite: false 
          }));
        }

        function makeParticles(n, palette) {
          const geo = new THREE.BufferGeometry();
          const pos = new Float32Array(n * 3);
          const col = new Float32Array(n * 3);
          for (let i = 0; i < n; i++) {
            const base = palette[Math.floor(Math.random() * palette.length)];
            const c = base.clone().offsetHSL((Math.random() - 0.5) * 0.1, 0, 0);
            pos[i * 3] = pos[i * 3 + 1] = pos[i * 3 + 2] = 0;
            col[i * 3] = c.r;
            col[i * 3 + 1] = c.g;
            col[i * 3 + 2] = c.b;
          }
          geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
          geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
          return new THREE.Points(geo, new THREE.PointsMaterial({ 
            size: 1.2, 
            vertexColors: true, 
            transparent: true, 
            opacity: 0.8, 
            depthWrite: false 
          }));
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

        function beginMorph() {
          isTrans = true;
          prog = 0;
          const next = (currentPattern + 1) % PATTERNS.length;
          const from = particles.geometry.attributes.position.array.slice();
          const toVec = PATTERNS[next](PARTICLE_COUNT);
          const to = new Float32Array(PARTICLE_COUNT * 3);
          for (let j = 0; j < PARTICLE_COUNT; j++) {
            to[j * 3] = toVec[j].x;
            to[j * 3 + 1] = toVec[j].y;
            to[j * 3 + 2] = toVec[j].z;
          }
          particles.userData = { from, to, next };
        }

        // Initialize
        scene = new THREE.Scene();
        clock = new THREE.Clock();

        const width = container.offsetWidth;
        const height = container.offsetHeight;

        camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
        camera.position.set(0, 0, 80);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.3;
        controls.enableZoom = false;

        stars = makeStars();
        scene.add(stars);

        const palette = [0xff3c78, 0x00cfff, 0xb400ff, 0xffffff].map(c => new THREE.Color(c));
        particles = makeParticles(PARTICLE_COUNT, palette);
        scene.add(particles);

        applyPattern(currentPattern);

        // Auto morph
        morphInterval = setInterval(() => {
          if (!isTrans) beginMorph();
        }, 5000);

        // Resize handler
        const handleResize = () => {
          const width = container.offsetWidth;
          const height = container.offsetHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        };
        window.addEventListener('resize', handleResize);

        // Animation loop
        function animate() {
          animationId = requestAnimationFrame(animate);
          const dt = clock.getDelta();

          if (isTrans) {
            prog += 0.02;
            const eased = prog >= 1 ? 1 : 1 - Math.pow(1 - prog, 3);
            const { from, to } = particles.userData;
            const arr = particles.geometry.attributes.position.array;
            for (let i = 0; i < arr.length; i++) {
              arr[i] = from[i] + (to[i] - from[i]) * eased;
            }
            particles.geometry.attributes.position.needsUpdate = true;
            if (prog >= 1) {
              currentPattern = particles.userData.next;
              isTrans = false;
            }
          }

          controls.update();
          renderer.render(scene, camera);
        }

        animate();

        // Cleanup
        return () => {
          clearInterval(morphInterval);
          cancelAnimationFrame(animationId);
          window.removeEventListener('resize', handleResize);
          if (renderer && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
            renderer.dispose();
          }
        };

      } catch (error) {
        console.error('Failed to load animation:', error);
      }
    };

    const cleanup = loadAnimation();

    return () => {
      if (cleanup && typeof cleanup.then === 'function') {
        cleanup.then(fn => fn && fn());
      }
    };
  }, []);

  return <div ref={containerRef} id="animated-bg-container" style={{ width: '100%', height: '100%' }}></div>;
}

export default AnimatedBackground;