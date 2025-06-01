import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Hero = () => {
  const canvasRef = useRef(null);
  const stickyContainerRef = useRef(null);
  const animatedTextRef = useRef(null);
  const additionalContentRef = useRef(null);
  const dotGridRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Setup canvas and context
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Starfield settings
    const numStars = 1900;
    const focalLength = canvas.width * 2;
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    const baseTrailLength = 2;
    const maxTrailLength = 30;
    let stars = [];
    let warpSpeed = 0;
    let animationActive = true;

    function initializeStars() {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * canvas.width,
          o: 0.5 + Math.random() * 0.5,
          trail: []
        });
      }
    }

    function moveStars() {
      stars.forEach(star => {
        const speed = 1 + warpSpeed * 50;
        star.z -= speed;
        if (star.z < 1) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
          star.trail = [];
        }
      });
    }

    function drawStars() {
      if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
      }
      const trailLength = Math.floor(baseTrailLength + warpSpeed * (maxTrailLength - baseTrailLength));
      const clearAlpha = 1 - warpSpeed * 0.8;
      ctx.fillStyle = `rgba(17,17,17,${clearAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        const px = (star.x - centerX) * (focalLength / star.z) + centerX;
        const py = (star.y - centerY) * (focalLength / star.z) + centerY;
        star.trail.push({ x: px, y: py });
        if (star.trail.length > trailLength) star.trail.shift();
        if (star.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(star.trail[0].x, star.trail[0].y);
          star.trail.forEach((p, i) => i > 0 && ctx.lineTo(p.x, p.y));
          ctx.strokeStyle = `rgba(209,255,255,${star.o})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.fillStyle = `rgba(209,255,255,${star.o})`;
        ctx.fillRect(px, py, 1, 1);
      });
    }

    function animate() {
      if (!animationActive) return;
      moveStars();
      drawStars();
      requestAnimationFrame(animate);
    }

    initializeStars();
    animate();

    // GSAP ScrollTrigger animations
    const warpTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: stickyContainerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: self => {
          const p = self.progress;
          if (p <= 0.6) warpSpeed = p / 0.6;
          else if (p <= 0.8) warpSpeed = 1;
          else warpSpeed = 1 - (p - 0.8) / 0.2;
        }
      }
    });

    const textTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: stickyContainerRef.current,
        start: '12% top',
        end: '20% top',
        scrub: 0.8
      }
    });
    textTimeline.to(animatedTextRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power3.out' });

    const exitTimeline = gsap.timeline({ scrollTrigger: { trigger: stickyContainerRef.current, start: 'bottom 20%', end: 'bottom -10%', scrub: true } });
    exitTimeline.to(animatedTextRef.current, { opacity: 0, y: -20, filter: 'blur(8px)', duration: 0.4, ease: 'power2.in' }, 0)
                .to('.webgl-section', { opacity: 0, scale: 0.95, ease: 'power2.inOut' }, 0.1);

    const additionalContentTimeline = gsap.timeline({ scrollTrigger: { trigger: '#additionalSection', start: 'top 80%', toggleActions: 'play none none none' } });
    additionalContentTimeline.to(additionalContentRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });

    const observer = new IntersectionObserver(entries => { entries.forEach(e => { animationActive = e.isIntersecting; if (animationActive) animate(); }); });
    observer.observe(stickyContainerRef.current);

    const handleResize = () => { initializeStars(); animate(); createDotGrid(); };
    window.addEventListener('resize', handleResize);

    function createDotGrid() {
      const grid = dotGridRef.current;
      grid.innerHTML = '';
      const fullWidth = window.innerWidth;
      const pad = 32;
      const height = 150 * 1.25;
      const cols = Math.ceil(fullWidth / 20);
      const rows = Math.ceil(height / 20);
      const sx = fullWidth / (cols - 1);
      const sy = height / (rows - 1);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const dot = document.createElement('div');
          dot.className = 'dot';
          dot.textContent = '✦';
          dot.style.left = `${x * sx - pad}px`;
          dot.style.top = `${y * sy}px`;
          grid.appendChild(dot);
        }
      }
    }
    createDotGrid();

    let isMoving=false, timeout;
    function update(event) {
      const rect = dotGridRef.current.getBoundingClientRect();
      const mx = event.clientX - rect.left;
      const my = event.clientY - rect.top;
      isMoving = true; clearTimeout(timeout);
      document.querySelectorAll('.dot').forEach(dot => {
        const dx = parseFloat(dot.style.left)+32 - mx;
        const dy = parseFloat(dot.style.top) - my;
        const dist = Math.hypot(dx,dy);
        const maxD = isMoving?150:100;
        if (dist<maxD) {
          const intensity = Math.pow(1-dist/maxD,1.5)*(isMoving?1.5:1);
          dot.style.color = `rgba(255,255,255,${Math.min(intensity,1)})`;
          const ang = Math.atan2(dy, dx);
          const pd = intensity*12;
          dot.style.transform = `translate(${Math.cos(ang)*pd}px,${Math.sin(ang)*pd}px) scale(${1+intensity*1.2})`;
        } else { dot.style.color = '#444'; dot.style.transform='none'; }
      });
      timeout = setTimeout(() => isMoving=false,100);
    }
    const gridEl = dotGridRef.current;
    gridEl.addEventListener('mousemove', update);
    gridEl.addEventListener('mouseleave', () => { document.querySelectorAll('.dot').forEach(d => { d.style.color='#444'; d.style.transform='none'; }); });

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      gridEl.removeEventListener('mousemove', update);
      gsap.core.getAll().forEach(t => t.kill());
    };
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.setAttribute('data-hero-styles', 'true');
    style.textContent = `
      .sticky-container { position: relative; height: 500vh; width:100%; overflow:hidden;}
      .webgl-section { position: sticky; top:0; width:100%; height:100vh; display:flex; justify-content:center; align-items:center; }
      .canvas-container { position:relative; width:100%; height:100%; }
      canvas#space { position:absolute; width:100%; height:100%; top:0; left:0; }
      .animated-text { position:absolute; left:50%; transform: translate(-50%, -50%) ; color:#fff; font-size:var(--fs-display); line-height:var(--lh-display); text-align:center; opacity:0; filter:blur(8px); font-family:var(--font-xl-display-latin); font-weight:700; }
      html[lang="ar"] .animated-text { font-family:var(--font-xl-display-arabic); font-weight:900; }
      .additional-section { width:100%; height:100vh; display:flex; justify-content:center; align-items:center; position:relative; color:#fff; }
      .additional-container { text-align:center; opacity:0; transform:translateY(30px); }
      .additional-title { font-size:var(--fs-h1); line-height:var(--lh-h1); font-family:var(--font-hero-section-latin); font-weight:800; margin-bottom:1.5rem; }
      html[lang="ar"] .additional-title { font-family:var(--font-hero-section-arabic); }
      .additional-subtitle { font-size:var(--fs-body-lg); line-height:var(--lh-body-lg); max-width:720px; margin:0 auto; font-family:var(--font-subtitle-latin); font-weight:500; }
      html[lang="ar"] .additional-subtitle { font-family:var(--font-subtitle-arabic); }
      .dot-grid { position:absolute; top:0; left:0; width:100%; height:100%; z-index:-1; pointer-events:none; }
      .dot { position:absolute; color:#444; user-select:none; font-size:14px; pointer-events:auto; transition:transform 0.3s cubic-bezier(0.34, 1.25, 0.6, 1), color 0.3s ease; }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.querySelectorAll('style[data-hero-styles="true"]').forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="hero-section" ref={stickyContainerRef}>
      <div className="sticky-container" id="stickyContainer">
        <div className="webgl-section" id="webglSection">
          <div className="canvas-container" id="canvasContainer">
            <canvas ref={canvasRef} id="space" />
            <div className="animated-text font-xl-display" id="animatedText" ref={animatedTextRef}>
              CLARITY<br />THROUGH<br />SIMPLICITY
            </div>
          </div>
        </div>
      </div>
      <div className="additional-section section-transition" id="additionalSection">
        <div className="additional-container" ref={additionalContentRef}>
          <h1 className="additional-title font-hero-section">THE ART OF REDUCTION</h1>
          <p className="additional-subtitle font-subtitle">In a world of constant noise and distraction, true creativity emerges from the space between thoughts. The power of simplicity lies not in what is added, but in what is carefully removed.</p>
          <p className="additional-subtitle font-subtitle">Our approach strips away the unnecessary, revealing the essential core of every project. We believe that when you eliminate the excess, what remains speaks with greater clarity and resonance.</p>
          <p className="additional-subtitle font-subtitle">This philosophy guides everything we create—from music production to visual design—allowing the authentic voice to emerge without interference.</p>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="coordinates"><p>34.0522° N, 118.2437° W</p></div>
        <div className="links"><span>Mindfulness</span><span>Presence</span></div>
        <div className="info"><p>Est. 2025 • Summer Days</p></div>
      </div>
      <div className="dot-grid" id="dotGrid" ref={dotGridRef}></div>
    </div>
  );
};

export default Hero; 