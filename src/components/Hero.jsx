import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import ScrollingLogos from './ScrollingLogos';
import ShimmerText from './ShimmerText';

const Hero = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const aHoleRef = useRef(null);

  useEffect(() => {
    // Add Google Fonts link
    const fontLink1 = document.createElement('link');
    fontLink1.rel = 'preconnect';
    fontLink1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(fontLink1);

    const fontLink2 = document.createElement('link');
    fontLink2.rel = 'preconnect';
    fontLink2.href = 'https://fonts.gstatic.com';
    fontLink2.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink2);

    const fontLink3 = document.createElement('link');
    fontLink3.href = 'https://fonts.googleapis.com/css2?family=Martian+Mono:wght@100..800&display=swap';
    fontLink3.rel = 'stylesheet';
    document.head.appendChild(fontLink3);

    // Add Orbitron font
    const fontLink4 = document.createElement('link');
    fontLink4.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap';
    fontLink4.rel = 'stylesheet';
    document.head.appendChild(fontLink4);

    // Add custom styles for hero section
    const style = document.createElement('style');
        style.textContent = `
      html, body {
        overscroll-behavior: none;
        -webkit-overflow-scrolling: touch;
      }

      .hero-container {
        position: relative;
        width: 100%;
        height: 100vh;
        background: #0a0a0a;
        overflow: hidden;
        touch-action: pan-y;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
      }

      .hero-text-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 20;
        text-align: center;
        color: white;
        width: 100%;
        max-width: 90vw;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      }

      .hero-main-title {
        font-family: 'Orbitron', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: clamp(3.2rem, 7vw, 5.5rem);
        font-weight: 700;
        line-height: 1.1;
        margin-bottom: 1rem;
        color: white;
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
      }

      .hero-subtitle {
        font-family: 'Martian Mono', monospace;
        font-size: 1.125rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 2rem;
        line-height: 1.4;
      }

      .hero-description {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: clamp(0.9rem, 1.5vw, 1rem);
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 2rem;
        line-height: 1.5;
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
      }

      .hero-cta-container {
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }

      .hero-cta-button {
        font-family: 'Martian Mono', monospace;
        font-size: 1rem;
        font-weight: 600;
        padding: 12px 24px;
        border: 2px solid white;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        text-decoration: none;
        border-radius: 8px;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        position: relative;
        overflow: hidden;
      }

      .hero-cta-button:hover {
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 0 25px rgba(255, 255, 255, 0.4);
        transform: translateY(-2px);
      }

      .hero-cta-button:before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
      }

      .hero-cta-button:hover:before {
        left: 100%;
      }

      .hero-secondary-button {
        font-family: 'Martian Mono', monospace;
        font-size: 1rem;
        font-weight: 600;
        padding: 12px 24px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        background: rgba(255, 255, 255, 0.05);
        color: white;
        text-decoration: none;
        border-radius: 8px;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
      }

      .hero-secondary-button:hover {
        border-color: rgba(255, 255, 255, 0.6);
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
      }

      @media (max-width: 768px) {
        .hero-text-container {
          padding: 0 16px;
        }

        .hero-main-title {
          font-size: clamp(2.5rem, 9vw, 4rem);
        }

        .hero-subtitle {
          font-size: 1rem;
        }

        .hero-cta-container {
          flex-direction: column;
          gap: 0.8rem;
        }

        .hero-cta-button,
        .hero-secondary-button {
          width: 100%;
          max-width: 280px;
          text-align: center;
        }
      }

      .hero-container a-hole {
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      a-hole:before {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        display: block;
        width: 150%;
        height: 140%;
        background: radial-gradient(ellipse at 50% 55%, transparent 10%, black 50%);
        transform: translate3d(-50%, -50%, 0);
        content: "";
      }

             a-hole:after {
         position: absolute;
         top: 50%;
         left: 50%;
         z-index: 5;
         display: block;
         width: 100%;
         height: 100%;
         background: radial-gradient(
           ellipse at 50% 75%,
           #00ff41 5%,
           #39ff14 15%,
           #00ff7f 25%,
           #66ffc2 35%,
           #7fffd4 45%,
           #a7f3d0 55%,
           #34d399 65%,
           #10b981 70%,
           transparent 75%
         );
         mix-blend-mode: overlay;
         transform: translate3d(-50%, -50%, 0);
         content: "";
       }

      @keyframes aura-glow {
        0% {
          background-position: 0 100%;
        }
        100% {
          background-position: 0 300%;
        }
      }

             a-hole .aura {
         position: absolute;
         top: -71.5%;
         left: 50%;
         z-index: 3;
         width: 30%;
         height: 140%;
         background: linear-gradient(
             20deg,
             #00ff41 0%,
             #39ff14 5%,
             #7fff00 10%,
             #adff2f 15%,
             #00ff7f 20%,
             #66ffc2 25%,
             #7fffd4 30%,
             #98ffb3 35%,
             #a7f3d0 40%,
             #bbf7d0 45%,
             #c6f6d5 50%,
             #d1fae5 55%,
             #6ee7b7 60%,
             #34d399 65%,
             #10b981 70%,
             #059669 75%,
             #047857 80%,
             #065f46 85%,
             #064e3b 90%,
             #022c22 95%,
             #00ff41 100%
           )
           0 100% / 100% 200%;
         border-radius: 0 0 100% 100%;
         filter: blur(50px);
         mix-blend-mode: plus-lighter;
         opacity: 0.8;
         transform: translate3d(-50%, 0, 0);
         animation: aura-glow 5s infinite linear;
       }

      a-hole .overlay {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
          transparent,
          transparent 1px,
          white 1px,
          white 2px
        );
        mix-blend-mode: overlay;
        opacity: 0.5;
      }

      a-hole canvas {
        display: block;
        width: 100%;
        height: 100%;
      }
    `;
    document.head.appendChild(style);

    // Import and load easing-utils
    const loadEasingUtils = async () => {
      try {
        const module = await import('https://esm.sh/easing-utils');
        window.easingUtils = module.default;
        
        // Define the AHole custom element
        class AHole extends HTMLElement {
          connectedCallback() {
            this.canvas = this.querySelector(".js-canvas");
            this.ctx = this.canvas.getContext("2d");
            this.discs = [];
            this.lines = [];
            
            this.setSize();
            this.setDiscs();
            this.setLines();
            this.setParticles();
            this.bindEvents();
            
            requestAnimationFrame(this.tick.bind(this));
          }

          bindEvents() {
            window.addEventListener("resize", this.onResize.bind(this));
          }

          onResize() {
            this.setSize();
            this.setDiscs();
            this.setLines();
            this.setParticles();
          }

          setSize() {
            this.rect = this.getBoundingClientRect();
            this.render = {
              width: this.rect.width,
              height: this.rect.height,
              dpi: window.devicePixelRatio
            };
            this.canvas.width = this.render.width * this.render.dpi;
            this.canvas.height = this.render.height * this.render.dpi;
          }

          setDiscs() {
            const { width, height } = this.rect;
            this.discs = [];
            
            this.startDisc = {
              x: width * 0.5,
              y: height * 0.45,
              w: width * 0.75,
              h: height * 0.7
            };

            this.endDisc = {
              x: width * 0.5,
              y: height * 0.95,
              w: 0,
              h: 0
            };

            const totalDiscs = 100;
            let prevBottom = height;
            this.clip = {};

            for (let i = 0; i < totalDiscs; i++) {
              const p = i / totalDiscs;
              const disc = this.tweenDisc({ p });
              const bottom = disc.y + disc.h;

              if (bottom <= prevBottom) {
                this.clip = {
                  disc: { ...disc },
                  i
                };
              }

              prevBottom = bottom;
              this.discs.push(disc);
            }

            this.clip.path = new Path2D();
            this.clip.path.ellipse(
              this.clip.disc.x,
              this.clip.disc.y,
              this.clip.disc.w,
              this.clip.disc.h,
              0,
              0,
              Math.PI * 2
            );
            this.clip.path.rect(
              this.clip.disc.x - this.clip.disc.w,
              0,
              this.clip.disc.w * 2,
              this.clip.disc.y
            );
          }

          setLines() {
            const { width, height } = this.rect;
            this.lines = [];
            const totalLines = 100;
            const linesAngle = (Math.PI * 2) / totalLines;

            for (let i = 0; i < totalLines; i++) {
              this.lines.push([]);
            }

            this.discs.forEach((disc) => {
              for (let i = 0; i < totalLines; i++) {
                const angle = i * linesAngle;
                const p = {
                  x: disc.x + Math.cos(angle) * disc.w,
                  y: disc.y + Math.sin(angle) * disc.h
                };
                this.lines[i].push(p);
              }
            });

            this.linesCanvas = new OffscreenCanvas(width, height);
            const ctx = this.linesCanvas.getContext("2d");

            this.lines.forEach((line, i) => {
              ctx.save();
              let lineIsIn = false;
              
              line.forEach((p1, j) => {
                if (j === 0) return;
                const p0 = line[j - 1];

                if (!lineIsIn && (ctx.isPointInPath(this.clip.path, p1.x, p1.y) || ctx.isPointInStroke(this.clip.path, p1.x, p1.y))) {
                  lineIsIn = true;
                } else if (lineIsIn) {
                  ctx.clip(this.clip.path);
                }

                ctx.beginPath();
                ctx.moveTo(p0.x, p0.y);
                ctx.lineTo(p1.x, p1.y);
                ctx.strokeStyle = "#444";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.closePath();
              });

              ctx.restore();
            });

            this.linesCtx = ctx;
          }

          setParticles() {
            const { width, height } = this.rect;
            this.particles = [];

            this.particleArea = {
              sw: this.clip.disc.w * 0.5,
              ew: this.clip.disc.w * 2,
              h: height * 0.85
            };
            this.particleArea.sx = (width - this.particleArea.sw) / 2;
            this.particleArea.ex = (width - this.particleArea.ew) / 2;

            const totalParticles = 100;
            for (let i = 0; i < totalParticles; i++) {
              const particle = this.initParticle(true);
              this.particles.push(particle);
            }
          }

          initParticle(start = false) {
            const sx = this.particleArea.sx + this.particleArea.sw * Math.random();
            const ex = this.particleArea.ex + this.particleArea.ew * Math.random();
            const dx = ex - sx;
            const vx = 0.1 + Math.random() * 0.5;
            const y = start ? this.particleArea.h * Math.random() : this.particleArea.h;
            const r = 0.5 + Math.random() * 4;
            const vy = 0.5 + Math.random();

                         return {
               x: sx,
               sx,
               dx,
               y,
               vy,
               p: 0,
               r,
               c: 'rgba(255, 255, 255, ' + Math.random() + ')'
             };
          }

          tweenValue(start, end, p, ease = false) {
            const delta = end - start;
            const easeFn = window.easingUtils?.[ease ? "ease" + ease.charAt(0).toUpperCase() + ease.slice(1) : "linear"] || ((t) => t);
            return start + delta * easeFn(p);
          }

          drawDiscs() {
            const { ctx } = this;
            ctx.strokeStyle = "#444";
            ctx.lineWidth = 2;

            const outerDisc = this.startDisc;
            ctx.beginPath();
            ctx.ellipse(outerDisc.x, outerDisc.y, outerDisc.w, outerDisc.h, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();

            this.discs.forEach((disc, i) => {
              if (i % 5 !== 0) return;

              if (disc.w < this.clip.disc.w - 5) {
                ctx.save();
                ctx.clip(this.clip.path);
              }

              ctx.beginPath();
              ctx.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, Math.PI * 2);
              ctx.stroke();
              ctx.closePath();

              if (disc.w < this.clip.disc.w - 5) {
                ctx.restore();
              }
            });
          }

          drawLines() {
            const { ctx, linesCanvas } = this;
            ctx.drawImage(linesCanvas, 0, 0);
          }

          drawParticles() {
            const { ctx } = this;
            ctx.save();
            ctx.clip(this.clip.path);

            this.particles.forEach((particle) => {
              ctx.fillStyle = particle.c;
              ctx.beginPath();
              ctx.rect(particle.x, particle.y, particle.r, particle.r);
              ctx.closePath();
              ctx.fill();
            });

            ctx.restore();
          }

          moveDiscs() {
            this.discs.forEach((disc) => {
              disc.p = (disc.p + 0.001) % 1;
              this.tweenDisc(disc);
            });
          }

          moveParticles() {
            this.particles.forEach((particle) => {
              particle.p = 1 - particle.y / this.particleArea.h;
              particle.x = particle.sx + particle.dx * particle.p;
              particle.y -= particle.vy;

              if (particle.y < 0) {
                particle.y = this.initParticle().y;
              }
            });
          }

          tweenDisc(disc) {
            disc.x = this.tweenValue(this.startDisc.x, this.endDisc.x, disc.p);
            disc.y = this.tweenValue(this.startDisc.y, this.endDisc.y, disc.p, "inExpo");
            disc.w = this.tweenValue(this.startDisc.w, this.endDisc.w, disc.p);
            disc.h = this.tweenValue(this.startDisc.h, this.endDisc.h, disc.p);
            return disc;
          }

          tick(time) {
            const { ctx } = this;
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.save();
            ctx.scale(this.render.dpi, this.render.dpi);

            this.moveDiscs();
            this.moveParticles();
            this.drawDiscs();
            this.drawLines();
            this.drawParticles();

            ctx.restore();
            requestAnimationFrame(this.tick.bind(this));
          }
        }

        // Define the custom element
        if (!customElements.get('a-hole')) {
          customElements.define("a-hole", AHole);
        }
      } catch (error) {
        console.error('Failed to load easing-utils:', error);
      }
    };

    loadEasingUtils();

    // Prevent unwanted scroll behaviors in hero section
    const handleTouchStart = (e) => {
      const heroContainer = document.querySelector('.hero-container');
      if (heroContainer && heroContainer.contains(e.target)) {
        // Allow only vertical scrolling for page navigation
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      }
    };

    const handleTouchMove = (e) => {
      const heroContainer = document.querySelector('.hero-container');
      if (heroContainer && heroContainer.contains(e.target)) {
        // Prevent horizontal scrolling and pull-to-refresh
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      }
    };

    const handleWheel = (e) => {
      const heroContainer = document.querySelector('.hero-container');
      if (heroContainer && heroContainer.contains(e.target)) {
        // Allow only vertical scrolling for page navigation
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.preventDefault();
        }
      }
    };

    // Add event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      document.head.querySelectorAll('style').forEach(el => {
        if (el.textContent?.includes('hero-container') || el.textContent?.includes('a-hole')) el.remove();
      });
      document.head.querySelectorAll('link').forEach(el => {
        if (el.href?.includes('fonts.googleapis.com')) el.remove();
      });
      
      // Remove event listeners
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="hero-container">
      {/* Navigation */}
      <Navigation 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        language={language} 
        toggleLanguage={toggleLanguage}
        className="relative z-50"
      />

      {/* Black Hole Effect */}
      <a-hole ref={aHoleRef}>
        <canvas className="js-canvas"></canvas>
        <div className="aura"></div>
        <div className="overlay"></div>
      </a-hole>

      {/* Hero Text Content */}
      <div className="hero-text-container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1,
            delay: 0.5,
            ease: "easeOut"
          }}
        >
          <ShimmerText 
            variant="rainbow"
            trigger="auto"
            delay={2000}
            duration={3000}
            tag="h1"
            className="hero-main-title"
          >
            {language === 'en' ? (
              <>
                Let&nbsp;Your&nbsp;Product's&nbsp;Gravity<br />
                Do&nbsp;the&nbsp;Selling.
              </>
            ) : 'دع جاذبية منتجك تقوم بالبيع.'}
          </ShimmerText>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 1,
            ease: "easeOut"
          }}
        >
          <ShimmerText 
            variant="gold"
            trigger="auto"
            delay={4000}
            duration={2500}
            tag="p"
            className="hero-subtitle"
          >
            {language === 'en' 
              ? (
                <>
                  We engineer interfaces so intuitive they attract customers<br />
                  like a black hole — no friction, just flow.
                </>
              ) 
              : (
                <>
                  نحن نصمم واجهات بديهية جداً تجذب العملاء<br />
                  كالثقب الأسود — بلا احتكاك، فقط تدفق.
                </>
              )
            }
          </ShimmerText>
        </motion.div>

        <motion.div 
          className="hero-cta-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            delay: 1.4,
            ease: "easeOut"
          }}
        >
          <a href="#contact" className="hero-cta-button">
            {language === 'en' ? 'Let\'s Create' : 'لنبدع معاً'}
          </a>
        </motion.div>
      </div>

      {/* Scrolling Client Logos */}
      <ScrollingLogos language={language} />
    </div>
  );
};

export default Hero; 