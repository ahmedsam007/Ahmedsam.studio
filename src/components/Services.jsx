import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  { 
    name: 'Landing Pages', 
    icon: '/images/logos/services/landing-pages.svg', 
    description: 'Crafting high-converting landing pages that transform visitors into customers.' 
  },
  { 
    name: 'Web App Design', 
    icon: '/images/logos/services/web-app-design.svg', 
    description: 'Designing intuitive and engaging web applications that users love to interact with.' 
  },
  { 
    name: 'Copywriting', 
    icon: '/images/logos/services/copywriting.svg', 
    description: 'Compelling copy that communicates your value proposition and drives conversions.' 
  },
  { 
    name: 'Mobile App Design', 
    icon: '/images/logos/services/mobile-app-design.svg', 
    description: 'User-centric mobile experiences that deliver functionality with elegance on iOS and Android.' 
  },
  { 
    name: 'Design Systems', 
    icon: '/images/logos/services/design-systems.svg', 
    description: 'Building scalable and consistent design systems that grow with your product.' 
  },
  { 
    name: 'Front-end Development', 
    icon: '/images/logos/services/framer-development.svg', 
    description: 'Bringing designs to life with clean, efficient code that performs flawlessly.' 
  },
  { 
    name: 'Conversion Optimisation', 
    icon: '/images/logos/services/conversion-optimisation.svg', 
    description: 'Optimizing funnels to boost conversion rates and maximize your ROI.' 
  },
  { 
    name: 'UX Strategy', 
    icon: '/images/logos/services/ux-strategy.svg', 
    description: 'Developing user-focused strategies that ensure your product succeeds in the market.' 
  },
  { 
    name: 'Implementation Support', 
    icon: '/images/logos/services/implementation-support.svg', 
    description: 'Guiding teams to implement designs effectively, ensuring the final product matches the vision.' 
  },
];

// Define dark gradient backgrounds inspired by dark themes
const cardGradients = [
  'linear-gradient(135deg, #0a192f 0%, #020c1b 100%)', // Deep Navy -> Near Black
  'linear-gradient(135deg, #2a0f4e 0%, #1a0a30 100%)', // Deep Purple -> Darker Purple
  'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)', // Charcoal Gray -> Darker Gray
  'linear-gradient(135deg, #083344 0%, #022c3a 100%)', // Dark Teal -> Dark Blue
  'linear-gradient(135deg, #4a0e0e 0%, #1c0606 100%)', // Dark Maroon -> Near Black
  'linear-gradient(135deg, #064e3b 0%, #022c22 100%)', // Dark Emerald -> Very Dark Green
  'linear-gradient(135deg, #1f2937 0%, #111827 100%)', // Cool Gray -> Darker Cool Gray
  'linear-gradient(135deg, #3b0764 0%, #1e1b4b 100%)', // Indigo/Purple -> Dark Blue
  'linear-gradient(135deg, #0d1117 0%, #010409 100%)', // Very Dark Blue -> Black
];

const Services = () => {
  const sectionRef = useRef(null);
  const pinHeightRef = useRef(null);
  const containerRef = useRef(null);
  const circlesRef = useRef([]);
  const leftHandRef = useRef(null); // Ref for left hand
  const rightHandRef = useRef(null); // Ref for full right hand
  const titleRef = useRef(null); // Ref for the main title
  const workExpSectionRef = useRef(null); // Ref for the work experiences section

  useEffect(() => {
    const pinHeightEl = pinHeightRef.current;
    const containerEl = containerRef.current;
    const circles = circlesRef.current.filter(Boolean);
    const sectionEl = sectionRef.current;
    const leftHandEl = leftHandRef.current; // Get hand elements
    const rightHandEl = rightHandRef.current;
    const titleEl = titleRef.current; // Get title element
    
    // Find the work experiences section
    workExpSectionRef.current = document.querySelector('.work-exp-section');

    if (!pinHeightEl || !containerEl || !circles.length || !sectionEl || !leftHandEl || !rightHandEl || !titleEl) {
      console.warn('GSAP Services Animation: Missing required elements.');
      return;
    }
    
    // Fix z-index for Services section to prevent overlap with WorkExperiences
    sectionEl.style.position = 'relative';
    sectionEl.style.zIndex = '2'; // Higher than work experiences section
    sectionEl.style.backgroundColor = '#000000'; // Ensure solid background to prevent content showing through
    
    // Set scroll height for card reveals - aiming for ~3500px total
    const scrollPixelsPerCard = 900; // Calculated: 3500px / 9 cards ≈ 389
    // Pin duration now only covers up to the last card's reveal (60% of original)
    const pinDurationHeight = circles.length * scrollPixelsPerCard * 0.6;
    pinHeightEl.style.height = `${pinDurationHeight}px`;
    
    // Set a fixed padding bottom instead of using the full pin duration height
    sectionEl.style.paddingBottom = '800px';

    // Set initial state for hands (invisible, lower, and off-screen horizontally)
    gsap.set(leftHandEl, { opacity: 0, xPercent: -150, yPercent: 20 });
    gsap.set(rightHandEl, { opacity: 0, xPercent: 150, yPercent: 20 });

    const ctx = gsap.context(() => {
      // Create ScrollTrigger for z-index management
      ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
          // When services section enters viewport, ensure it's above work experiences
          sectionEl.style.zIndex = '2';
          
          // Add scrolled-past class to work experiences section if it exists
          if (workExpSectionRef.current) {
            workExpSectionRef.current.classList.add('scrolled-past');
            const workExpContainer = workExpSectionRef.current.querySelector('.work-exp-container');
            if (workExpContainer) {
              workExpContainer.classList.add('scrolled-past');
            }
          }
        },
        onLeaveBack: () => {
          // When scrolling back up and leaving services section
          if (workExpSectionRef.current) {
            // Remove scrolled-past class from work experiences section
            workExpSectionRef.current.classList.remove('scrolled-past');
            const workExpContainer = workExpSectionRef.current.querySelector('.work-exp-container');
            if (workExpContainer) {
              workExpContainer.classList.remove('scrolled-past');
            }
          }
        }
      });
      
      // Pin the container
      gsap.to(containerEl, {
        scrollTrigger: {
          trigger: pinHeightEl,
          start: 'top top+=50', 
          end: 'bottom bottom',
          pin: containerEl,
          scrub: true,
          // Add hand animation to the pinning scrub
          onUpdate: (self) => {
            // Complete hand animation within the first 10% of the pin duration (before first card animates)
            const handProgress = Math.min(1, self.progress / 0.1); // Scale progress (0-1) to happen within self.progress (0-0.1)
            handTimeline.progress(handProgress); // Apply scaled progress
          }
        }
      });

      // Animate the main title
      gsap.to(titleEl, {
        scale: 3,
        opacity: 0,
        yPercent: -50, // Moves the title up relative to its height
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: titleEl,
          start: "top 25%", // Animation starts when the top of the title is 25% from the viewport top
          end: "top -25%",  // Animation ends when the top of the title is 25% of its height above the viewport top
          scrub: 1.5,
          // markers: true, // Uncomment for debugging
        }
      });

      // Define hand animations (remain paused)
      const leftHandTween = gsap.fromTo(leftHandEl,
        { opacity: 0, xPercent: -20, yPercent: 20 }, // From Off-left, slightly down
        { // Explicit 'to' state
          opacity: 1,
          yPercent: 0, // Centered vertically relative to its height
          xPercent: -35, // Move less towards center, keeping it further left
          ease: "power2.inOut",
          duration: 1, // Duration doesn't matter much when scrubbed
          // paused: true // Keep it controlled by timeline
        }
      );

      const rightHandTween = gsap.fromTo(rightHandEl,
        { opacity: 0, xPercent: 20, yPercent: 20 }, // From Off-right, slightly down
        { // Explicit 'to' state
          opacity: 1,
          yPercent: 0, // Shift down slightly
          xPercent: 35, // Move less towards center, keeping it further right
          ease: "power2.inOut",
          duration: 1,
          // paused: true // Keep it controlled by timeline
        }
      );

      // Create the hand animation timeline (remains paused)
      const handTimeline = gsap.timeline({ paused: true })
        .add(leftHandTween)
        .add(rightHandTween, 0);

      // Card positioning and angle configuration
      const cardAngle = 20; // 20 degree rotation
      const cardSpacing = 40; // horizontal spacing between stacked cards
      const cardVerticalOffset = -60; // Position cards slightly higher than center
      const leftSideOffset = -100; // Position for left side cards
      const rightSideOffset = 100; // Position for right side cards

      // Set initial state for all cards - hide them off screen
      circles.forEach((circle, index) => {
        if (!circle) return;
        
        // Determine if card should come from left or right
        const fromRight = index % 2 === 0;
        
        // Set initial position off screen
        gsap.set(circle, {
          x: fromRight ? '150vw' : '-150vw', // Start off right or left screen
          opacity: 0,
          scale: 1.4,
          rotation: fromRight ? cardAngle : -cardAngle, // Opposite angle based on side
          zIndex: index // Higher index = higher z-index
        });
      });

      // Reveal cards one by one on scroll
      circles.forEach((circle, index) => {
        if (!circle) return;
        const card = circle.querySelector('.service-card');
        if (!card) return;
        
        // Calculate when this card should appear
        const progress = index / (circles.length - 1);
        
        // Determine if card comes from left or right
        const fromRight = index % 2 === 0;
        
        // Target position - alternating sides
        const targetX = fromRight ? rightSideOffset : leftSideOffset;
        const targetAngle = fromRight ? cardAngle : -cardAngle;
        
        // Cards now appear from 10% to 90% of the (shortened) pin duration
        const cardRevealStart = 0.1 * pinDurationHeight + progress * pinDurationHeight * 0.75;
        
        // Animate each card into view
        gsap.to(circle, {
          x: targetX,
          y: cardVerticalOffset,
          opacity: 1,
          scale: 1,
          rotation: targetAngle,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pinHeightEl,
            start: `top+=${cardRevealStart} top+=400`, // now always after hands
            end:   `top+=${cardRevealStart + 10} top+=200`,
            scrub: 1,
          }
        });

        // Keep text upright
        gsap.to(card, {
          rotation: -targetAngle, // Counter-rotate the card content to keep text upright
          scrollTrigger: {
            trigger: pinHeightEl,
            start: `top+=${cardRevealStart} top+=400`, // match card reveal timing
            end:   `top+=${cardRevealStart + 10} top+=200`,
            scrub: 1,
          }
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      if (pinHeightEl) pinHeightEl.style.height = '';
      if (sectionEl) sectionEl.style.paddingBottom = '';
      if (sectionEl) sectionEl.style.zIndex = '';
    };
  }, []);

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="services-section section relative bg-gray-950 py-80 md:py-320 mt-0" 
      style={{ 
        marginTop: '-2px', 
        paddingTop: '0',
        position: 'relative', 
        zIndex: 2
      }}
    >
      {/* Section title moved above cards */}
      <div className="text-center mb-16">
        <h2 
          ref={titleRef} 
          className="section-title text-h1 font-mona relative z-20 mb-2" 
          style={{ 
            fontWeight: 700,
            fontSize: '5rem',
            marginBottom: '2rem',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(156, 163, 175, 0.7) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'white', /* Fallback color */
            display: 'inline-block',
            width: '100%',
            paddingTop: '12rem',
            opacity: 1,
            visibility: 'visible'
          }}
        >
          Services made for <br/><span>your journey</span>
        </h2>
      </div>
      
      {/* Pin Height Element - Determines scroll duration */}
      <div 
        ref={pinHeightRef} 
        className="services-pin-height relative w-full mt-0 pt-0" 
        style={{ marginTop: '0', paddingTop: '0' }}
      >
        {/* Container to be Pinned */}
        <div ref={containerRef} className="services-container relative w-full h-screen flex items-center justify-center overflow-visible pt-24">
          
          {/* Add Hand Images Here */}
          <img 
            ref={leftHandRef}
            src="/images/left.png" 
            alt="Left Hand" 
            className="absolute w-[74rem] h-auto object-contain z-0 pointer-events-none opacity-0" // Simplified CSS
            // Changed to svg
          />
          <img 
            ref={rightHandRef}
            src="/images/right.png" 
            alt="Right Hand" 
            className="absolute w-[74rem] h-auto object-contain z-0 pointer-events-none opacity-0" // Simplified CSS
             // This is the full hand (behind cards)
          />

          {/* Cards Container */}
          <div className="cards-wrapper relative w-full h-full flex items-center justify-center overflow-visible">
            {servicesData.map((service, index) => (
              <div
                key={index}
                ref={el => circlesRef.current[index] = el}
                className="service-circle absolute inset-0 flex items-center justify-center"
                style={{ zIndex: index + 20 }} // Increase card z-index to be above hands (z-10)
              >
                <div
                  className="service-card relative w-[95%] max-w-[400px] md:max-w-[500px] aspect-[4/5] rounded-[2rem] border border-white/20 shadow-2xl shadow-black/50 p-10 flex flex-col items-start justify-between text-left transition-transform duration-300 ease-out hover:scale-105 group overflow-hidden origin-bottom"
                  style={{ background: cardGradients[index % cardGradients.length] }}
                >
                  {/* Service Name */}
                  <h3 className="text-[#ffffff] tracking-wide mb-4 relative z-10 font-mona" style={{ 
                    fontWeight: '600',
                    fontSize: 'clamp(1.5rem, 3vw + 0.4rem, 2.5rem)',
                    lineHeight: '1.3'
                  }}>
                    {service.name}
                  </h3>
                  
                  {/* Main Content */}
                  <div className="flex-1 flex flex-col justify-center w-full relative z-10">
                    <p className="text-body-lg font-medium text-[#ffffff] leading-relaxed mb-8 max-w-prose">
                      "{service.description}"
                    </p>
                  </div>
                  
                  {/* Footer/Attribution */}
                  <div className="flex justify-between items-center w-full relative z-10">
                    {/* Icon container with circle */}
                    <div className="bg-white/10 rounded-full p-3 w-14 h-14 flex items-center justify-center">
                      {/* Icon as "logo" - slightly larger */}
                      <img src={service.icon} alt={service.name} className="w-8 h-8" />
                    </div>
                    {/* "Author" attribution */}
                    <p className="text-sm text-[#ffffff] font-light italic">Ahmed's Studio</p>
                  </div>
                  
                  {/* CSS Gradient Debug */}
                  <div
                    className="absolute inset-0 z-50 pointer-events-none" // High z-index, full opacity, no blend
                    style={{
                      backgroundImage: `linear-gradient(45deg, rgba(255,0,0,0.5) 50%, transparent 50%)`, // Simple red diagonal lines
                      backgroundSize: '10px 10px' // Larger size for visibility
                    }}
                  >
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 