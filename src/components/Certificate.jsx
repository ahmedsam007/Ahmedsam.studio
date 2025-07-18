import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from './AnimatedTitle';
import AnimatedSubtitle from './AnimatedSubtitle';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const Certificate = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const certificateImageRef = useRef(null);
  const greenContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      // Calculate scroll progress - scaling stops when container fills screen
      const elementTop = rect.top;
      
      // Scale starts when element enters viewport and continues until it reaches edges
      const scaleStart = viewportHeight * 0.8; // Start when 80% in view
      const scaleEnd = -viewportHeight * 1.2; // Continue scaling until well past viewport
      
      let progress = 0;
      if (elementTop <= scaleStart && elementTop >= scaleEnd) {
        progress = (scaleStart - elementTop) / (scaleStart - scaleEnd);
        progress = Math.max(0, Math.min(1, progress));
      } else if (elementTop < scaleEnd) {
        progress = 1;
      }
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate the maximum scale needed to reach viewport edges
  const calculateMaxScale = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const containerMaxWidth = 1296; // Container's max width
    const containerAspectRatio = 1296 / 700; // Width/Height ratio
    
    // Calculate what scale would make container reach viewport edges
    const scaleToFillWidth = (viewportWidth * 1.1) / containerMaxWidth; // Add 10% buffer
    const scaleToFillHeight = (viewportHeight * 1.1) / (containerMaxWidth / containerAspectRatio);
    
    // Use the smaller scale to ensure it fits within viewport
    return Math.min(scaleToFillWidth, scaleToFillHeight, 1.3); // Cap at 1.3 max
  };

  const maxScale = calculateMaxScale();
  // Increase initial scale from 0.85 to 0.9 for a larger starting size
  const scaleValue = 0.95 + (scrollProgress * (maxScale - 0.95));
  
  // Calculate smooth border radius transition - starts reducing at 80% of max scale
  const radiusTransitionStart = maxScale * 0.8;
  const radiusTransitionEnd = maxScale * 0.9999;
  
  let radiusProgress = 0;
  if (scaleValue >= radiusTransitionStart) {
    radiusProgress = (scaleValue - radiusTransitionStart) / (radiusTransitionEnd - radiusTransitionStart);
    radiusProgress = Math.max(0, Math.min(1, radiusProgress));
  }
  
  // Smooth border radius: starts at full radius, smoothly transitions to 0
  const maxRadius = 40; // Equivalent to rounded-4xl (32px) on larger screens
  const currentRadius = maxRadius * (1 - radiusProgress);
  const borderRadius = `${currentRadius}px`;

  return (
    <section 
      ref={containerRef}
      className="optimized-render-block flex flex-col gap-8 md:gap-16 items-center w-full pt-40 pb-16 overflow-x-hidden"
      style={{ height: '150vh' }}
    >
      {/* Title and Description - fixed position at top */}
      <div className="flex flex-col gap-4 text-center max-w-[90vw] w-full mx-auto mb-16 md:mb-40">
        <AnimatedTitle 
          text="Certificate"
          triggerRef={greenContainerRef}
          className="text-h1 font-extrabold -tracking-tight font-mona"
          contextRef={containerRef}
          scrubValue={0.3}
        />
        <AnimatedSubtitle 
          text="This official Google UX Design Certificate demonstrates my expertise and builds trust with potential clients."
          triggerRef={greenContainerRef}
          className="text-body-lg font-mono !text-balance max-w-prose text-center"
          contextRef={containerRef}
          scrubValue={0.3}
        />
      </div>

      {/* Sticky container for the scaling animation - positioned lower to avoid overlap */}
      <div 
        ref={certificateImageRef}
        className="sticky top-[25vh] left-0 w-full h-[50vh] flex items-center justify-center mt-8"
      >
        {/* Image with animated futuristic green background */}
        <div 
          className="relative w-full max-w-[1296px] aspect-[1296/670] min-h-[420px] md:min-h-[520px] lg:w-[1296px] lg:h-[670px] overflow-hidden shadow-2xl flex items-start justify-center mx-auto px-4 md:px-8 bg-transparent pt-12 transition-all duration-100 ease-out"
          style={{
            transform: `scale(${scaleValue})`,
            transformOrigin: 'center center',
            borderRadius: borderRadius
          }}
        >
          {/* Animated green gradient background */}
          <div
            ref={greenContainerRef}
            className="absolute inset-0 z-0"
            style={{
              background: 'linear-gradient(120deg, #c2ffba 0%, #00e0ff 40%, #00ff99 70%, #c2ffba 100%)',
              backgroundSize: '300% 300%',
              animation: 'waveGradient 8s ease-in-out infinite',
            }}
          />
          {/* Keyframes for wave animation (must be inside JSX) */}
          <style>{`
            @keyframes waveGradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
          {/* Optional: noise overlay for texture */}
          <div className="absolute inset-0 z-10 bg-[url('/noise.avif')] mix-blend-soft-light opacity-100 w-full h-full" style={{backgroundSize: '1025px 1025px'}} />
          {/* Certificate image - bigger, bottom hidden */}
          <img
            src="/Google UX Design.png"
            alt="Google UX Design Certificate"
            className="absolute left-1/2 top-0 z-20 -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[70%] max-w-none h-auto object-contain rounded-xl border-white shadow-4xl bg-white/10 mt-0"
            style={{ bottom: '-15%', top: '10%', position: 'absolute', objectFit: 'contain', clipPath: 'inset(0px 0px -100px 0px)' }}
          />
        </div>
      </div>
    </section>
  );
};

export default Certificate; 