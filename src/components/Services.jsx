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

  useEffect(() => {
    const pinHeightEl = pinHeightRef.current;
    const containerEl = containerRef.current;
    const circles = circlesRef.current.filter(Boolean);
    const sectionEl = sectionRef.current;
    const leftHandEl = leftHandRef.current; // Get hand elements
    const rightHandEl = rightHandRef.current;

    if (!pinHeightEl || !containerEl || !circles.length || !sectionEl || !leftHandEl || !rightHandEl) {
      console.warn('GSAP Services Animation: Missing required elements.');
      return;
    }
    
    // Set scroll height for card reveals - aiming for ~3500px total
    const scrollPixelsPerCard = 400; // Calculated: 3500px / 9 cards ≈ 389
    const pinDurationHeight = circles.length * scrollPixelsPerCard;
    pinHeightEl.style.height = `${pinDurationHeight}px`;
    
    // Set a fixed padding bottom instead of using the full pin duration height
    sectionEl.style.paddingBottom = '1200px';

    // Set initial state for hands (invisible and lower)
    gsap.set([leftHandEl, rightHandEl], { opacity: 0, y: 50 });

    const ctx = gsap.context(() => {
      // Pin the container
      gsap.to(containerEl, {
        scrollTrigger: {
          trigger: pinHeightEl,
          start: 'top top+=50', 
          end: 'bottom bottom',
          pin: containerEl,
          scrub: true,
        }
      });

      // --- HAND ANIMATIONS --- 
      // Animate TO opacity: 1 and y: 0 at the start
      gsap.to([leftHandEl, rightHandEl], {
          opacity: 1,
          y: 0, // Animate to original vertical position
          ease: "power1.inOut", // Add easing
          scrollTrigger: {
            trigger: pinHeightEl,
            start: 'top top+=50',  
            end: 'top top+=300',   // Increase duration slightly for smoother feel
            scrub: true,
          }
        }
      );

      // Animate TO opacity: 0 and y: 50 at the end
      gsap.to([leftHandEl, rightHandEl], { 
        opacity: 0,
        y: 50, // Animate down
        ease: "power1.inOut", // Add easing
        scrollTrigger: {
          trigger: pinHeightEl,
          start: 'bottom bottom-=300', // Increase duration slightly
          end: 'bottom bottom',       
          scrub: true,
        }
      });
      // --- END HAND ANIMATIONS ---

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
            start: `top+=${progress * pinDurationHeight * 0.9} top+=320`, // Add offset to avoid navbar
            end: `top+=${progress * pinDurationHeight * 0.9 + 10} top+=200`,
            scrub: 1,
          }
        });

        // Keep text upright
        gsap.to(card, {
          rotation: -targetAngle, // Counter-rotate the card content to keep text upright
          scrollTrigger: {
            trigger: pinHeightEl,
            start: `top+=${progress * pinDurationHeight * 0.9} top+=220`,
            end: `top+=${progress * pinDurationHeight * 0.9 + 10} top+=200`,
            scrub: 1,
          }
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      if (pinHeightEl) pinHeightEl.style.height = '';
      if (sectionEl) sectionEl.style.paddingBottom = '';
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="services-section section relative bg-gray-950 py-80 md:py-320 mt-20">
      {/* Section title moved above cards */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-extrabold text-amber-50/90 relative z-20 mb-2">
          Services made for <span className="block">your journey</span>
        </h2>
        <p className="text-lg md:text-xl text-purple-300/80 font-light">
          Design services built just for SaaS success
        </p>
      </div>
      
      {/* Pin Height Element - Determines scroll duration */}
      <div ref={pinHeightRef} className="services-pin-height relative w-full">
        {/* Container to be Pinned */}
        <div ref={containerRef} className="services-container relative w-full h-screen flex items-center justify-center overflow-visible pt-24">
          
          {/* Add Hand Images Here */}
          <img 
            ref={leftHandRef}
            src="/images/left.png" 
            alt="Left Hand" 
            className="absolute bottom-[-16rem] left-1/2 transform -translate-x-[calc(55%+400px)] w-[74rem] h-auto object-contain z-0 opacity-0 pointer-events-none"
            // Changed to svg
          />
          <img 
            ref={rightHandRef}
            src="/images/right.png" 
            alt="Right Hand" 
            className="absolute bottom-[-16rem] right-1/2 transform translate-x-[calc(55%+390px)] w-[74rem] h-auto object-contain z-0 opacity-0 pointer-events-none"
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
                  <h3 className="text-2xl md:text-3xl font-light text-[#ffffff] tracking-wide mb-4 relative z-10">
                    {service.name}
                  </h3>
                  
                  {/* Main Content */}
                  <div className="flex-1 flex flex-col justify-center w-full relative z-10">
                    <p className="text-xl md:text-2xl font-medium text-[#ffffff] leading-relaxed mb-8">
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
                    <p className="text-lg text-[#ffffff] font-light italic">Ahmed's Studio</p>
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