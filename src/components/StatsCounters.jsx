import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from './AnimatedTitle';
import AnimatedSubtitle from './AnimatedSubtitle';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    id: 'stat-1',
    value: '74K',
    numericValue: 74,
    unit: 'K',
    label: 'MONTHLY VISITS',
    description: 'After the full re-brand, CTBTO.org drew roughly 74000 visits in April 2025 alone—about 2480 people every day.'
  },
  {
    id: 'stat-2',
    value: '23M',
    numericValue: 23,
    unit: 'M',
    label: 'LEARNING MINUTES',
    description: 'Learners have completed 23 million minutes of courses on the e-learning platform we built for Elham.sa.'
  },
  {
    id: 'stat-3',
    value: '1M',
    numericValue: 1,
    unit: 'M',
    label: 'CAMPAIGN REACH',
    description: 'Our launch push sent 1 million users to Google Play and converted 50K of them into app downloads.'
  },
  {
    id: 'stat-4',
    value: '100K',
    numericValue: 100,
    unit: 'K',
    label: 'APP DOWNLOADS',
    description: 'The rewards app redesign hit 100000 installs on Google Play within its first year.'
  },
  {
    id: 'stat-5',
    value: '4x',
    numericValue: 4,
    unit: 'X',
    label: 'EFFICIENCY BOOST',
    description: 'Post-overhaul, UN teams complete key tasks on UNICC.org four times faster than before.'
  },
  {
    id: 'stat-6',
    value: '70+',
    numericValue: 70,
    unit: '+',
    label: 'PRODUCTS LAUNCHED',
    description: 'Over nine years, I\'ve shipped 70-plus digital products across 14 countries.'
  }
];

// Component for animating a single digit
const AnimatedDigit = ({ digit, delay = 0, play }) => {
  const digitRef = useRef(null);
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  useEffect(() => {
    if (digitRef.current) {
      const allDigitSpans = Array.from(digitRef.current.querySelectorAll('.digit-value'));
      
      if (play) {
        // Set initial state - all digits hidden below
        gsap.set(allDigitSpans, {
          y: 50,
          opacity: 0,
        });
        
        const targetDigit = parseInt(digit);
        if (isNaN(targetDigit) || targetDigit < 0 || targetDigit > 9) {
          return; 
        }
        
        // Animate the target digit into view
        gsap.to(allDigitSpans[targetDigit], {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: delay,
          ease: "back.out(1.7)"
        });
      } else {
        // Reset to hidden state
        gsap.set(allDigitSpans, {
          y: 50,
          opacity: 0,
        });
      }
    }
  }, [digit, delay, play]);

  return (
    <div className="relative overflow-hidden" ref={digitRef}>
      <span className="invisible">{digit}</span>
      <div className="absolute inset-0">
        {digits.map((d) => (
          <span 
            key={d} 
            className="absolute top-0 left-0 digit-value" 
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
};

// Component for animated number with digits
const AnimatedNumber = ({ value, unit, play }) => {
  const numberRef = useRef(null);
  const unitRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    if (play) {
      // Create animated object for the counter
      const counter = { value: 0 };
      
      // Animate the counter from 0 to target value
      gsap.to(counter, {
        value: value,
        duration: 2,
        delay: 0.3,
        ease: "power2.out",
        onUpdate: () => {
          // Format the number based on the original value format
          if (value.toString().includes('.')) {
            // Handle decimal numbers
            setDisplayValue(counter.value.toFixed(1));
          } else {
            // Handle integers
            setDisplayValue(Math.round(counter.value));
          }
        }
      });
      
      // Animate unit
      if (unitRef.current) {
        gsap.fromTo(
          unitRef.current,
          { opacity: 0, y: 20 },
          { 
            opacity: 1,
            y: 0,
            duration: 0.6, 
            delay: 1.8,
            ease: "back.out(1.7)"
          }
        );
      }
    } else {
      // Reset states
      setDisplayValue(0);
      if (unitRef.current) {
        gsap.set(unitRef.current, { opacity: 0, y: 20 });
      }
    }
  }, [play, value]);

  return (
    <div className="flex items-baseline">
      {/* Animated number display */}
      <span ref={numberRef}>
        {displayValue}
      </span>
      
      {/* Unit */}
      <span 
        className="ml-1" 
        ref={unitRef} 
        style={{ opacity: 0, transform: 'translateY(20px)' }}
      >
        {unit}
      </span>
    </div>
  );
};

const StatsCounters = () => {
  const statRefs = useRef([]);
  const sectionRef = useRef(null);
  const statsGridRef = useRef(null);
  const [animationsActivated, setAnimationsActivated] = useState(false);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    let stInstance = null;

    if (currentSectionRef) {
      stInstance = ScrollTrigger.create({
        trigger: currentSectionRef,
        start: "top 80%",
        onEnter: () => {
          setAnimationsActivated(true);
        },
        once: true
      });
    }

    return () => {
      if (stInstance) {
        stInstance.kill();
      }
    };
  }, []);

  return (
    <section className="w-full bg-[#08070e] relative" ref={sectionRef}>
      {/* Background vertical lines spanning entire section */}
      <div className="absolute top-0 left-20 right-20 pointer-events-none z-0" style={{ height: 'calc(100% + 245px)' }}>
        <div className="relative w-full h-full">
          {/* Evenly distributed vertical lines */}
          <div className="absolute top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" style={{ left: '0%' }}></div>
          <div className="absolute top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" style={{ left: '16.67%' }}></div>
          <div className="absolute top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" style={{ left: '33.33%' }}></div>
          <div className="absolute top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" style={{ left: '50%' }}></div>
          <div className="absolute top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" style={{ left: '66.67%' }}></div>
          <div className="absolute top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" style={{ left: '83.33%' }}></div>
          <div className="absolute top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" style={{ left: '100%' }}></div>
        </div>
      </div>
      
      <div className="w-full px-20 relative z-10">
        <div className="spacer-section--s h-8"></div>
        
        <div className="wrap w-full">
          {/* Description section */}
          <div className="w-full mb-16">
            <div className="padding-container max-w-4xl mx-auto text-center">
              <div className="spacer-section--l h-16"></div>
              <AnimatedTitle 
                text="Numbers Talk"
                triggerRef={statsGridRef}
                className="text-h1 font-extrabold -tracking-tight font-mona mb-8"
                contextRef={sectionRef}
                scrubValue={0.5}
              />
              <AnimatedSubtitle 
                text="From strategy and product design to go-to-market, we turn ideas into traction."
                triggerRef={statsGridRef}
                className="text-lg font-mono leading-relaxed"
                containerClassName="flex justify-center w-full"
                contextRef={sectionRef}
                scrubValue={0.5}
              />
              <div className="spacer-section--s h-8"></div>
            </div>
          </div>

          {/* Stats grid with borders */}
          <div 
            ref={statsGridRef}
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-gray-200 dark:border-gray-800 bg-[#08070f]"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.id}
                className="wrap border-r border-b border-gray-200 dark:border-gray-800 last:border-r-0 md:last:border-r lg:last:border-r-0"
                ref={el => statRefs.current[i] = el}
              >
                <div className="container_wrap p-8 lg:p-12">
                  <div className="spacer-element-hc h-4"></div>
                  
                  <div className="heading-style-counters text-[120px] font-bold text-green-600 dark:text-green-500 hubot-sans leading-none">
                    <AnimatedNumber 
                      value={stat.numericValue} 
                      unit={stat.unit}
                      play={animationsActivated}
                    />
                  </div>
                  
                  <div className="spacer-hssh-hssxs h-4"></div>
                  
                  <h3 className="heading-style-xs font-sans uppercase text-sm tracking-wider font-bold text-gray-900 dark:text-gray-100">
                    {stat.label}
                  </h3>
                  
                  <div className="spacer-hxs-tsm h-4"></div>
                  
                  <p className="text-size-m text-sm text-gray-600 dark:text-gray-300 leading-snug">
                    {stat.description}
                  </p>
                  
                  <div className="spacer-tss-gap h-8"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Spacer grid */}
          <div className="w-full grid">
            <div className="spacer-square h-16"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsCounters;