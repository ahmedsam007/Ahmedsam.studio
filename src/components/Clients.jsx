import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Client logos data with dark/light variants and correct paths
const clientLogos = [
  {
    name: 'UNHCR',
    location: 'Global',
    light: '/clients/black/UNHCR-black.svg',
    dark: '/clients/white/UNHCR-white.svg'
  },
  {
    name: 'CRM.com',
    location: 'Cyprus',
    light: '/clients/black/crm.com-black.png',
    dark: '/clients/white/crm.com-white.png'
  },
  {
    name: 'UNDP',
    location: 'Global',
    light: '/clients/black/UNDP-black.svg',
    dark: '/clients/white/UNDP-white.svg'
  },
  {
    name: 'NAMA',
    location: 'Qatar',
    light: '/clients/black/nama-dark.svg',
    dark: '/clients/white/nama-white.svg'
  },
  {
    name: 'UNRWA',
    location: 'Global',
    light: '/clients/black/unrwa-black.svg',
    dark: '/clients/white/unrwa-white.svg'
  },
  {
    name: 'Elham',
    location: 'Saudi Arabia',
    light: '/clients/black/elham.black.png',
    dark: '/clients/white/elham.white.png'
  },
  {
    name: 'Fasrly',
    location: 'Qatar',
    light: '/clients/black/fasrly-black.svg',
    dark: '/clients/white/fasrly-white.svg'
  },
  {
    name: 'Etr-Alklam',
    location: 'Saudi Arabia',
    light: '/clients/black/etr-alklam-black.svg',
    dark: '/clients/white/etr-alklam-white.svg'
  },
  {
    name: 'GEA',
    location: 'Saudi Arabia',
    light: '/clients/black/gea-black.svg',
    dark: '/clients/white/gea-white.svg'
  },
  {
    name: 'Camel Club',
    location: 'Saudi Arabia',
    light: '/clients/black/camel-club-black.svg',
    dark: '/clients/white/camel-club-white.svg'
  },
  {
    name: 'UNICC',
    location: 'Global',
    light: '/clients/black/unicc-black.svg',
    dark: '/clients/white/UNICC-white.svg'
  },
  {
    name: '3days',
    location: 'Saudi Arabia',
    light: '/clients/black/3days-black.svg',
    dark: '/clients/white/3days-white.svg'
  },
  {
    name: 'CTBTO',
    location: 'Global',
    light: '/clients/black/ctbto-black.svg',
    dark: '/clients/white/ctbto-white.svg'
  },
  {
    name: 'Elearning',
    location: 'Saudi Arabia',
    light: '/clients/black/elearning-black.svg',
    dark: '/clients/white/elearning-white.svg'
  },
  {
    name: 'Fatora',
    location: 'Qatar',
    light: '/clients/black/fatora-black.svg',
    dark: '/clients/white/fatora-white.svg'
  },

];

// Split all client logos into two rows: first 7 logos, then the rest
const firstRowLogos = clientLogos.slice(0, 7);
const secondRowLogos = clientLogos.slice(7);

// Calculate shift to hide one logo initially in second row (percentage of doubled content width)
const secondShift = 100 / (2 * secondRowLogos.length);

const Clients = () => {
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row 1: Scroll Left
      gsap.to(row1Ref.current, {
        xPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Row 2: Scroll Right with initial offset
      gsap.to(row2Ref.current, {
        startAt: { xPercent: -secondShift },
        xPercent: 15 ,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="clients" ref={sectionRef} className="bg-white dark:bg-[#08070e] py-16 sm:py-24 overflow-hidden">
      <div className="w-full">
        <h4 className="text-h5 font-semibold text-center text-gray-500 dark:text-gray-400 mb-24 font-mono">
          Trusted by innovative companies worldwide
        </h4>
        
        {/* Row 1 */}
        <div className="border border-gray-200 dark:border-gray-800">
          <div ref={row1Ref} className="flex flex-nowrap overflow-visible"> 
            {[...firstRowLogos, ...firstRowLogos].map((logo, index) => (
              <div 
                key={`row1-${logo.name}-${index}`}
                className="flex-none w-1/6 aspect-square border-l border-gray-200 dark:border-gray-800 flex items-center justify-center p-9 relative group"
              >
                <img 
                  src={logo.light}
                  className={`block dark:hidden h-16 w-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-300 ${['UNRWA','UNDP','CRM.com','NAMA', 'Elearning'].includes(logo.name) ? 'scale-150' : ''}`}
                  alt={`${logo.name} logo`}
                />
                <img 
                  src={logo.dark}
                  className={`hidden dark:block h-16 w-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-300 ${['UNRWA','UNDP','CRM.com','NAMA', 'Elearning'].includes(logo.name) ? 'scale-150' : ''}`}
                  alt={`${logo.name} logo`}
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{logo.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="border border-gray-200 dark:border-gray-800 border-t-0">
          <div ref={row2Ref} className="flex flex-nowrap overflow-visible">
            {[...secondRowLogos, ...secondRowLogos].map((logo, index) => (
              <div 
                key={`row2-${logo.name}-${index}`}
                className="flex-none w-1/6 aspect-square border-l border-gray-200 dark:border-gray-800 flex items-center justify-center p-9 relative group"
              >
                <img 
                  src={logo.light}
                  className={`block dark:hidden h-16 w-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-300 ${['UNRWA','UNDP','CRM.com','NAMA'].includes(logo.name) ? 'scale-150' : ''}`}
                  alt={`${logo.name} logo`}
                />
                <img 
                  src={logo.dark}
                  className={`hidden dark:block h-16 w-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-300 ${['UNRWA','UNDP','CRM.com','NAMA'].includes(logo.name) ? 'scale-150' : ''}`}
                  alt={`${logo.name} logo`}
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{logo.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients; 