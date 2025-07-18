import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const ScrollingLogos = ({ language }) => {
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  
  // List of design tool logos
  const logos = [
    { name: 'Figma', src: '/images/logos/light/figma.svg', alt: 'Figma' },
    { name: 'Framer', src: '/images/logos/light/framer.svg', alt: 'Framer' },
    { name: 'Cursor', src: '/images/logos/light/cursor.png', alt: 'Cursor AI' },
    { name: 'Adobe Firefly', src: '/images/logos/dark/adobefirefly.svg', alt: 'Adobe Firefly' },
    { name: 'Midjourney', src: '/images/logos/light/midjourney.svg', alt: 'Midjourney' },
    { name: 'Jira', src: '/images/logos/light/jira.svg', alt: 'Jira' },
    { name: 'Slack', src: '/images/logos/light/slack.svg', alt: 'Slack' },
  ];

  // Duplicate logos multiple times for seamless scrolling with fewer items
  const allLogos = [...logos, ...logos, ...logos, ...logos];

  useEffect(() => {
    const animate = () => {
      if (trackRef.current) {
        const speed = isHovered ? 0.05 : 0.15; // Slow: 0.05, Fast: 0.15
        positionRef.current += speed;
        
        // Reset position when we've scrolled through half the content
        if (positionRef.current >= 50) {
          positionRef.current = 0;
        }
        
        trackRef.current.style.transform = `translateX(-${positionRef.current}%)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scrolling-logos-container {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        z-index: 15;
        padding: 30px 0;
        background: transparent;
        min-height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .scrolling-logos-title {
        text-align: center;
        color: rgba(255, 255, 255, 0.6);
        font-family: 'Martian Mono', monospace;
        font-size: 0.8rem;
        font-weight: 400;
        margin-bottom: 15px;
        text-transform: uppercase;
        letter-spacing: 2px;
      }

      .scrolling-logos-track {
        display: flex;
        width: fit-content;
        will-change: transform;
      }

      .logo-item {
        flex-shrink: 0;
        width: 120px;
        height: 60px;
        margin: 0 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;
      }

      .logo-item img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        filter: brightness(0.8) contrast(1.1);
        transition: all 0.3s ease;
      }

      .logo-item img[alt="Cursor AI"] {
        filter: brightness(1.5) contrast(1.2) invert(1);
        border-radius: 6px;
        padding: 6px;
      }

      .logo-item img[alt="Adobe Firefly"] {
        filter: brightness(1.0) contrast(1.1);
        border-radius: 6px;
        padding: 4px;
      }

      .logo-item img[alt="Framer"],
      .logo-item img[alt="Slack"] {
        padding: 6px;
        border-radius: 6px;
      }

      .logo-item img[alt="Figma"],
      .logo-item img[alt="Jira"] {
        padding: 10px;
        border-radius: 6px;
        max-width: 70%;
        max-height: 70%;
      }

      @media (max-width: 768px) {
        .scrolling-logos-container {
          bottom: 0;
          padding: 25px 0;
        }
        
        .logo-item {
          width: 100px;
          height: 50px;
          margin: 0 20px;
        }
      }

      @media (max-width: 480px) {
        .scrolling-logos-container {
          padding: 20px 0;
        }

        .logo-item {
          width: 80px;
          height: 40px;
          margin: 0 15px;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.querySelectorAll('style').forEach(el => {
        if (el.textContent?.includes('scrolling-logos-container')) el.remove();
      });
    };
  }, []);

  const handleLogoMouseEnter = () => {
    setIsHovered(true);
  };

  const handleLogoMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div 
      className="scrolling-logos-container"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1,
        delay: 1.8,
        ease: "easeOut"
      }}
    >
      <motion.div 
        className="scrolling-logos-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          delay: 2.2,
          ease: "easeOut"
        }}
      >
        {language === 'en' ? 'Powered by Industry-Leading Tools' : 'مدعوم بأدوات رائدة في الصناعة'}
      </motion.div>
      <motion.div 
        ref={trackRef}
        className="scrolling-logos-track"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 1.2,
          delay: 2.5,
          ease: "easeOut"
        }}
        onMouseEnter={handleLogoMouseEnter}
        onMouseLeave={handleLogoMouseLeave}
      >
        {allLogos.map((logo, index) => (
          <motion.div 
            key={`${logo.name}-${index}`} 
            className="logo-item"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6,
              delay: 2.8 + (index * 0.05),
              ease: "easeOut"
            }}
          >
            <img 
              src={logo.src} 
              alt={logo.alt}
              loading="lazy"
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ScrollingLogos; 