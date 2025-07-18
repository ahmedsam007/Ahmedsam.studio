import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ 
  text, 
  triggerRef, 
  className = "text-h1 font-extrabold -tracking-tight font-mona", 
  startTrigger = "top 90%",
  endTrigger = "top 50%",
  scrubValue = 0.3,
  staggerDelay = 0.01,
  style = {},
  contextRef = null // For GSAP context scoping
}) => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (!titleRef.current || !triggerRef?.current || !text) return;

    const ctx = gsap.context(() => {
      const titleElement = titleRef.current;
      
      // Clear existing content and create character spans
      titleElement.innerHTML = '';
      const chars = text.split('').map((char, index) => {
        const charWrapper = document.createElement('span');
        charWrapper.style.display = 'inline-block';
        charWrapper.style.overflow = 'hidden';
        charWrapper.style.position = 'relative';
        
        const charElement = document.createElement('span');
        charElement.textContent = char === ' ' ? '\u00A0' : char;
        charElement.style.display = 'inline-block';
        charElement.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(220, 220, 220, 0.8) 100%)';
        charElement.style.webkitBackgroundClip = 'text';
        charElement.style.backgroundClip = 'text';
        charElement.style.webkitTextFillColor = 'transparent';
        charElement.style.color = 'transparent';
        charElement.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.2)';
        charElement.style.transform = 'translateY(100%)';
        
        charWrapper.appendChild(charElement);
        titleElement.appendChild(charWrapper);
        
        return charElement;
      });

      // Create timeline for character animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: startTrigger,
          end: endTrigger,
          scrub: scrubValue,
          invalidateOnRefresh: true
        }
      });

      // Animate each character with stagger
      chars.forEach((char, index) => {
        tl.to(char, {
          y: 0,
          duration: 0.1,
          ease: "power2.out"
        }, index * staggerDelay);
      });

    }, contextRef || titleRef);

    return () => ctx.revert();
  }, [text, triggerRef, startTrigger, endTrigger, scrubValue, staggerDelay, contextRef]);

  return (
    <h2 
      ref={titleRef}
      className={className}
      style={{ 
        fontWeight: 700,
        overflow: 'hidden',
        ...style
      }}
    >
      {text}
    </h2>
  );
};

export default AnimatedTitle; 