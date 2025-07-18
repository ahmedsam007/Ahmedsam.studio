import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const AnimatedSubtitle = ({ 
  text, 
  triggerRef, 
  className = "text-body-lg font-mono !text-balance max-w-prose text-center", 
  startTrigger = "top 85%",
  endTrigger = "top 45%",
  scrubValue = 0.3,
  style = {},
  containerClassName = "flex justify-center w-full",
  contextRef = null // For GSAP context scoping
}) => {
  const subtitleRef = useRef(null);

  useEffect(() => {
    if (!subtitleRef.current || !triggerRef?.current) return;
    
    const ctx = gsap.context(() => {
      // Apply gradient styling to the subtitle
      const subtitleElement = subtitleRef.current;
      subtitleElement.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(220, 220, 220, 0.8) 100%)';
      subtitleElement.style.webkitBackgroundClip = 'text';
      subtitleElement.style.backgroundClip = 'text';
      subtitleElement.style.color = 'transparent';
      subtitleElement.style.webkitTextFillColor = 'transparent';
      
      // Set initial state - text hidden below the container
      gsap.set(subtitleElement, {
        y: '100%', // Start completely below the visible area
        opacity: 1
      });
      
      // Animate subtitle on scroll - move up to reveal
      gsap.to(subtitleElement, {
        y: '0%', // Move to normal position
        ease: "power2.out",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: startTrigger,
          end: endTrigger,
          scrub: scrubValue
        }
      });
      
    }, contextRef || subtitleRef);
    
    return () => ctx.revert();
  }, [triggerRef, startTrigger, endTrigger, scrubValue, contextRef]);

  return (
    <div 
      className={containerClassName}
      style={{
        overflow: 'hidden' // This creates the mask effect
      }}
    >
      <p 
        ref={subtitleRef}
        className={className}
        style={{
          margin: 0,
          lineHeight: '1.6',
          ...style
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default AnimatedSubtitle; 