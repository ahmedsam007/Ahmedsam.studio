import React, { useEffect, useState, useRef } from 'react'
// Import GSAP and ScrollTrigger directly at the top level
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Story.css'; // Import the new CSS file

// Register the plugin immediately
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Story = ({ language = 'en' }) => {
  // Translations
  const translations = {
    title: {
      en: "My Story",
      ar: "قصتي"
    },
    subtitle: {
      en: "From Gaza to the world: A journey of passion, resilience, and creative innovation.",
      ar: "من غزة إلى العالم: رحلة من الشغف والمرونة والابتكار الإبداعي."
    },
   
    paragraph1: {
      en: "Born in Gaza, I leverage a T-shaped skillset—deep expertise in UI/UX complemented by broad knowledge of computational design, AI, and emerging technologies. Using iterative design methods, I conduct thorough research to understand each challenge. I then craft budget-conscious solutions that balance visual appeal with practical functionality. In international collaborations, I lead cross-time-zone initiatives, integrate diverse insights with cultural respect and openness, maintain an apolitical approach, and deliver stakeholder-aligned results on schedule.",
      ar: "ولدت ونشأت في غزة، واكتشفت شغفي بالتصميم في سن مبكرة. رغم التحديات، وجدت العزاء في إنشاء تجارب رقمية يمكن أن تتجاوز الحدود المادية."
    },
  }

  // References for GSAP animations
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const sectionContentRef = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const centerImageRef = useRef(null);
  // New refs for staggered animation
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageContainerRef = useRef(null);
  const textSectionRef = useRef(null);
  const titleLinesRef = useRef([]);
  // Add ref for animated title
  const animatedTitleRef = useRef(null);
  // Add ref for animated subtitle
  const animatedSubtitleRef = useRef(null);

  // Function to split text into lines
  const splitTextIntoLines = (text) => {
    return text.split(' ').reduce((acc, word, index, array) => {
      const currentLine = acc[acc.length - 1] || '';
      const newLine = currentLine + (currentLine ? ' ' : '') + word;
      
      // If this is the last word or adding this word would make the line too long
      if (index === array.length - 1 || newLine.length > 20) {
        if (currentLine) acc[acc.length - 1] = currentLine;
        if (index === array.length - 1) {
          acc.push(word);
        } else {
          acc.push(word);
        }
      } else {
        acc[acc.length - 1] = newLine;
      }
      return acc;
    }, []);
  };

  // GSAP animations for text and images
  useEffect(() => {
    // Create and add style element for simple word reveal
    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-text-animation', 'true');
    styleEl.textContent = `
      p > span {
        font-size: var(--fs-body-lg);
        line-height: var(--lh-body-lg);
        font-family: monospace;
        font-weight: 500;
        opacity: 0;
        color: white;
        filter: blur(8px);
        display: inline;
        transition: none;
      }
      .dark p > span {
        color: white;
      }
      html[lang="ar"] p > span {
        font-family: var(--font-subtitle-arabic);
      }
    `;
    document.head.appendChild(styleEl);

    // Initialize animations after a brief delay to ensure DOM is ready
    const initTimer = setTimeout(() => {
      setupAnimations();
    }, 300);

    function setupAnimations() {
      const spans = document.querySelectorAll('#textSection p > span');
      
      if (!spans.length || !leftImageRef.current || !rightImageRef.current || !centerImageRef.current) {
        console.log('Elements not ready, trying again in 200ms');
        setTimeout(setupAnimations, 200);
        return;
      }
      
      console.log(`Setting up animations for ${spans.length} spans and images`);
      
      try {
        // Text reveal animation
        const textTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#textSection',
            start: 'top center',
            end: 'bottom center',
            scrub: 2,
          },
        });
        
        textTl.fromTo(
          spans,
          { 
            opacity: 0, 
            filter: 'blur(8px)'
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.1,
            ease: 'power2.out',
          }
        );
        
        // Image reveal and rotation animations
        const imageContainer = document.querySelector('#imageContainer');
        
        // Initial state - all images are visible (like Creavora's approach)
        gsap.set([leftImageRef.current, rightImageRef.current], {
          opacity: 1,
          scale: 1,
          rotation: 0,
          x: 0,
          y: 0
        });
        
        // Center image stays visible and static
        gsap.set(centerImageRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0
        });
        
        // Exact Creavora animation style matching their HTML values
        // translateX + rotateZ only, no vertical movement
        const parallaxTl = gsap.timeline({
          scrollTrigger: {
            trigger: imageContainer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
        
        parallaxTl.to(leftImageRef.current, {
          rotation: -40, // 40-degree rotation to the left
          x: '-=100', // Move 100px to the left from current position
          y: '-=100', // Move 100px up from current position
          duration: 0.1, // Smooth transition
          ease: "none"
        }, 0)
        .to(rightImageRef.current, {
          rotation: 40, // 40-degree rotation to the right
          x: '+=100', // Move 100px to the right from current position
          y: '+=100', // Move 100px down from current position
          duration: 0.1 , // Smooth transition
          ease: "none"
        }, 0);
        // Center image remains completely static
        
        console.log('All animations setup completed');
      } catch (error) {
        console.error('Error setting up animations:', error);
      }
    }

    // Cleanup
    return () => {
      clearTimeout(initTimer);
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(st => st.kill());
      }
      // Remove style element
      const styleElement = document.querySelector('style[data-text-animation]');
      if (styleElement) styleElement.remove();
    };
  }, [language]);

  // Staggered entrance animation for main children
  useEffect(() => {
    const targets = [
      subtitleRef.current,
      imageContainerRef.current,
      textSectionRef.current
    ];
    gsap.set(targets, { opacity: 0, y: 60 });

    // Title line animation
    const titleLines = titleLinesRef.current;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });

    // Animate title lines first
    tl.fromTo(titleLines, 
      { 
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      }
    )
    // Then animate other elements
    .to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.18,
      ease: 'power3.out'
    }, '-=0.4');

    return () => {
      tl.kill();
    };
  }, []);

  // Separate useEffect for title character animation
  useEffect(() => {
    if (!animatedTitleRef.current) return;
    
    const titleText = translations.title[language];
    const characters = titleText.split('');
    
    // Clear previous content
    animatedTitleRef.current.innerHTML = '';
    
    // Create character spans
    characters.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space
      span.style.display = 'inline-block';
      span.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(220, 220, 220, 0.8) 100%)';
      span.style.webkitBackgroundClip = 'text';
      span.style.backgroundClip = 'text';
      span.style.color = 'transparent';
      span.style.webkitTextFillColor = 'transparent';
      span.style.opacity = '0';
      span.style.transform = 'translateY(100%)';
      animatedTitleRef.current.appendChild(span);
    });
    
    // Animate characters on scroll
    const titleAnimation = gsap.to(animatedTitleRef.current.children, {
      opacity: 1,
      y: 0,
      stagger: 0.02, // Reduced from 0.03 to make stagger faster
      ease: "power2.out",
      scrollTrigger: {
        trigger: animatedTitleRef.current,
        start: "top 80%",
        end: "top 40%", // Changed from "center 20%" to make animation complete faster
        scrub: 0.5 // Reduced from 1 to make animation more responsive to scroll
      }
    });
    
    return () => {
      if (titleAnimation.scrollTrigger) {
        titleAnimation.scrollTrigger.kill();
      }
      titleAnimation.kill();
    };
  }, [language]);

  // Separate useEffect for subtitle animation
  useEffect(() => {
    if (!animatedSubtitleRef.current) return;
    
    // Apply gradient styling to the subtitle
    const subtitleElement = animatedSubtitleRef.current;
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
    const subtitleAnimation = gsap.to(subtitleElement, {
      y: '0%', // Move to normal position
      ease: "power2.out",
      scrollTrigger: {
        trigger: subtitleElement.parentElement, // Trigger on the container
        start: "top 80%",
        end: "center 30%",
        scrub: 1
      }
    });
    
    return () => {
      if (subtitleAnimation.scrollTrigger) {
        subtitleAnimation.scrollTrigger.kill();
      }
      subtitleAnimation.kill();
    };
  }, [language]);

  const renderAnimatedParagraph = (text) => {
    const words = text.split(' ');
    
    return words.map((word, index) => (
      <span key={index}>{word}{index < words.length - 1 ? ' ' : ''}</span>
    ));
  };

  return (
    <section className="section mb-0" id="story" ref={sectionRef}>
      <div className="section-content pt-64" ref={sectionContentRef}>
        <div style={{ textAlign: 'center' }} ref={titleRef}>
          <h1 
            ref={animatedTitleRef}
            className="section-title text-h1 font-mona" 
            style={{ 
              fontWeight: 700,
              fontSize: '5rem',
              marginBottom: '2rem',
              overflow: 'hidden'
            }}
          >
            {/* Content will be dynamically created by GSAP animation */}
          </h1>
        </div>
        <div className="container mx-auto px-4" ref={subtitleRef}>
          <div 
            className="text-center mb-16 mx-auto"
            style={{
              maxWidth: '40%',
              height: 'auto',
              overflow: 'hidden' // This creates the mask effect
            }}
          >
            <p 
              ref={animatedSubtitleRef}
              className="text-body-lg" 
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                margin: 0,
                lineHeight: '1.6'
              }}>
              {translations.subtitle[language]}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative flex justify-center items-center h-[545px] mb-16" id="imageContainer" ref={imageContainerRef}>
              <img
                ref={leftImageRef}
                src="/images/leftStory.png"
                alt="Left"
                className="absolute z-10 w-[250px] h-[350px] object-cover rounded-2xl shadow-xl"
                style={{
                  left: 'calc(70% - 495px)',
                  top: '100px',
                }}
              />
              <img
                ref={rightImageRef}
                src="/images/rightStory.png"
                alt="Right"
                className="absolute z-10 w-[250px] h-[350px] object-cover rounded-2xl shadow-xl"
                style={{
                  right: 'calc(70% - 495px)',
                  top: '100px',
                }}
              />
              <img
                ref={centerImageRef}
                src="/images/Center.png"
                alt="My Story"
                className="relative z-30 w-[450px] h-[500px] object-cover rounded-2xl shadow-2xl"
                style={{
                  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                }}
              />
            </div>
            
            <div className="mb-16 w-full wrapper mt-24" id="textSection" ref={textSectionRef}>
              <p className="text-body-lg font-mono text-neutral-700 dark:text-neutral-200 max-w-prose mx-auto text-justify mb-48" ref={textRef}>
                {renderAnimatedParagraph(translations.paragraph1[language])}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story 