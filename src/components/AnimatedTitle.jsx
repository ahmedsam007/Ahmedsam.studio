import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShimmerText from './ShimmerText';

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ 
  children, 
  className = '', 
  shimmerVariant = 'rainbow',
  shimmerTrigger = 'scroll',
  delay = 0,
  splitType = 'chars', // 'chars', 'words', 'lines'
  animationType = 'slideUp', // 'slideUp', 'fade', 'scale', 'rotate'
  stagger = 0.05,
  ...props 
}) => {
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!titleRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const titleElement = titleRef.current;
      const text = typeof children === 'string' ? children : titleElement.textContent;
      
      // Clear existing content and create split elements
      titleElement.innerHTML = '';
      
      let elements = [];
      
      if (splitType === 'chars') {
        elements = text.split('').map((char, index) => {
          const charWrapper = document.createElement('span');
          charWrapper.style.display = 'inline-block';
          charWrapper.style.overflow = 'hidden';
          charWrapper.style.position = 'relative';
          
          const charElement = document.createElement('span');
          charElement.textContent = char === ' ' ? '\u00A0' : char;
          charElement.style.display = 'inline-block';
          
          // Apply initial animation state
          switch (animationType) {
            case 'slideUp':
              charElement.style.transform = 'translateY(100%)';
              break;
            case 'fade':
              charElement.style.opacity = '0';
              break;
            case 'scale':
              charElement.style.transform = 'scale(0)';
              break;
            case 'rotate':
              charElement.style.transform = 'rotateY(90deg)';
              break;
          }
          
          charWrapper.appendChild(charElement);
          titleElement.appendChild(charWrapper);
          
          return charElement;
        });
      } else if (splitType === 'words') {
        elements = text.split(' ').map((word, index) => {
          const wordElement = document.createElement('span');
          wordElement.textContent = word;
          wordElement.style.display = 'inline-block';
          wordElement.style.marginRight = '0.25em';
          
          // Apply initial animation state
          switch (animationType) {
            case 'slideUp':
              wordElement.style.transform = 'translateY(100%)';
              break;
            case 'fade':
              wordElement.style.opacity = '0';
              break;
            case 'scale':
              wordElement.style.transform = 'scale(0)';
              break;
            case 'rotate':
              wordElement.style.transform = 'rotateY(90deg)';
              break;
          }
          
          titleElement.appendChild(wordElement);
          return wordElement;
        });
      }

      // Create timeline for animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: false,
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true
        }
      });

      // Animate elements with stagger
      elements.forEach((element, index) => {
        let animationProps = {};
        
        switch (animationType) {
          case 'slideUp':
            animationProps = { y: 0, duration: 0.6, ease: "power2.out" };
            break;
          case 'fade':
            animationProps = { opacity: 1, duration: 0.8, ease: "power2.out" };
            break;
          case 'scale':
            animationProps = { scale: 1, duration: 0.6, ease: "back.out(1.7)" };
            break;
          case 'rotate':
            animationProps = { rotationY: 0, duration: 0.8, ease: "power2.out" };
            break;
        }
        
        tl.to(element, animationProps, index * stagger);
      });

    }, containerRef);

    return () => ctx.revert();
  }, [children, splitType, animationType, stagger]);

  return (
    <div ref={containerRef} className={`animated-title-container ${className}`} {...props}>
      <ShimmerText 
        variant={shimmerVariant}
        trigger={shimmerTrigger}
        delay={delay}
        ref={titleRef}
        className="animated-title-text"
      >
        {children}
      </ShimmerText>
    </div>
  );
};

export default AnimatedTitle; 