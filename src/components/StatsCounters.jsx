import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    id: 'stat-1',
    value: '5M',
    numericValue: 5,
    unit: 'M',
    label: 'MONTHLY VISITS',
    description: 'Covid-19 Tracker we built for STAT (Boston Globe) recorded 3 to 5 million visits monthly during the pandemic.'
  },
  {
    id: 'stat-2',
    value: '10x',
    numericValue: 10,
    unit: 'x',
    label: 'ORGANIC TRAFFIC INCREASE',
    description: 'PureGlobal saw a 10x increase in organic traffic within a year after we updated their brand and website.'
  },
  {
    id: 'stat-3',
    value: '13K',
    numericValue: 13,
    unit: 'K',
    label: 'DAILY VISITS',
    description: 'Lovb.com, which we redesigned, now sees 13,000 daily visits — up from 800 the year before.'
  },
  {
    id: 'stat-4',
    value: '20x',
    numericValue: 20,
    unit: 'x',
    label: 'ORGANIC TRAFFIC INCREASE',
    description: 'Stringomedia experienced a 20x traffic boost within six months of launching their revamped brand and website.'
  },
  {
    id: 'stat-5',
    value: '80%',
    numericValue: 80,
    unit: '%',
    label: 'ORGANIC KEYWORD GROWTH',
    description: "Since launching Hiatus Spa's new site, their visibility in organic search terms increased by 80%."
  },
  {
    id: 'stat-6',
    value: '1.2K',
    numericValue: 1.2,
    unit: 'K',
    label: 'DAILY VISITS',
    description: 'Hubmeded.com reached 1,200 daily visits within six months of launch.'
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
      <div className="absolute top-0 left-20 right-20 pointer-events-none z-0" style={{ height: 'calc(100% + 213px)' }}>
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
              <h2 className="text-h1 font-extrabold -tracking-tight bg-gradient-to-b from-[#fff] via-[#e0e0e0] to-[#b0b0b0] bg-clip-text text-transparent dark:from-[#eaeaea] dark:via-[#bdbdbd] dark:to-[#888] font-mona mb-8">
                Results that speak for themselves
              </h2>
              <p className="text-lg uppercase text-gray-300 dark:text-gray-200 font-mono leading-relaxed">
                We help companies with strategy, digital product design, and marketing - supporting everything from early-stage concepting to go-to-market execution.
              </p>
              <div className="spacer-section--s h-8"></div>
            </div>
          </div>

          {/* Stats grid with borders */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-gray-200 dark:border-gray-800 bg-[#08070f]">
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
                  
                  <h3 className="heading-style-xs font-mono uppercase text-sm tracking-wider font-bold text-gray-900 dark:text-gray-100">
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