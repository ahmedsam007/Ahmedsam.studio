import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Placeholder logo data - replace with your actual logo paths
const clientLogos = [
  '/images/logos/clients/placeholder_logo.svg', // Placeholder
  '/images/logos/clients/placeholder_logo.svg',
  '/images/logos/clients/placeholder_logo.svg',
  '/images/logos/clients/placeholder_logo.svg',
  '/images/logos/clients/placeholder_logo.svg',
  '/images/logos/clients/placeholder_logo.svg',
  '/images/logos/clients/placeholder_logo.svg',
  '/images/logos/clients/placeholder_logo.svg',
  '/images/logos/clients/placeholder_logo.svg',
  '/images/logos/clients/placeholder_logo.svg',
  '/images/logos/clients/placeholder_logo.svg',
  '/images/logos/clients/placeholder_logo.svg',
  // Add more placeholders or your real logos here
];

// Duplicate the array for seamless looping effect
const extendedLogos = [...clientLogos, ...clientLogos];

const Clients = () => {
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row 1: Scroll Left
      gsap.to(row1Ref.current, {
        xPercent: -20, // Adjust percentage for scroll distance
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom', // Start when top of section hits bottom of viewport
          end: 'bottom top', // End when bottom of section leaves top of viewport
          scrub: 1, // Smooth scrubbing effect
        },
      });

      // Row 2: Scroll Right
      gsap.to(row2Ref.current, {
        xPercent: 20, // Adjust percentage for scroll distance
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef); // Scope animations to the section

    // Cleanup function
    return () => ctx.revert();
  }, []);

  return (
    <section id="clients" ref={sectionRef} className="bg-white dark:bg-[#08070e] py-16 sm:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-semibold text-center text-gray-500 dark:text-gray-400 mb-12">
          Trusted by innovative companies worldwide
        </h2>
        
        {/* Row 1 (Scroll Left) */}
        <div ref={row1Ref} className="flex flex-nowrap w-max mb-8"> 
          {extendedLogos.map((logoSrc, index) => (
            <div key={`row1-${index}`} className="flex-shrink-0 mx-6 sm:mx-10 flex items-center justify-center h-12">
              <img 
                src={logoSrc} 
                alt={`Client Logo ${index + 1}`} 
                className="h-8 sm:h-10 w-auto object-contain filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* Row 2 (Scroll Right) */}
        <div ref={row2Ref} className="flex flex-nowrap w-max">
          {extendedLogos.map((logoSrc, index) => (
            <div key={`row2-${index}`} className="flex-shrink-0 mx-6 sm:mx-10 flex items-center justify-center h-12">
               <img 
                src={logoSrc} 
                alt={`Client Logo ${index + 1 + extendedLogos.length / 2}`} 
                className="h-8 sm:h-10 w-auto object-contain filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients; 