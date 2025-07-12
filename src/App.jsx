import { useState, useEffect, useRef } from 'react'

import Hero from './components/Hero'
import VideoSection from './components/VideoSection'
import Story from './components/Story'
import Portfolio from './components/Portfolio'
import TestimonialsComponent from './components/Testimonials'
import Services from './components/Services'
import Clients from './components/Clients'
import Certificate from './components/Certificate'
import StatsCounters from './components/StatsCounters'
import WhatsAppSection from './components/WhatsAppSection'
import UnifiedBackground from './components/UnifiedBackground'
import CookieConsent from './components/CookieConsent'
import StructuredData from './components/StructuredData'
import gsap from 'gsap'
import SectionTransition from './components/SectionTransition';
import WorkExperiences from './components/WorkExperiences';

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('en')
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isVideoSectionActive, setIsVideoSectionActive] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [runTransition, setRunTransition] = useState(false)

  const transitionTriggerRef = useRef(null)

  // Initialize dark mode based on user preference
  useEffect(() => {
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setDarkMode(false)
    }
  }, [])

  // Prevent translation API calls
  useEffect(() => {
    // Remove lang attribute to prevent Google Translate API calls
    const htmlElement = document.documentElement;
    htmlElement.removeAttribute('lang');
    
    // Disable Google Translate features
    const meta = document.createElement('meta');
    meta.name = 'google';
    meta.content = 'notranslate';
    document.head.appendChild(meta);
    
    // Add a class to block translation
    document.body.classList.add('notranslate');
    
    // Block Google Translate scripts if they exist
    const translateScripts = document.querySelectorAll('script[src*="translate.google"]');
    translateScripts.forEach(script => script.remove());
    
    // Clean up function
    return () => {
      document.head.querySelectorAll('meta[name="google"][content="notranslate"]').forEach(el => el.remove());
      document.body.classList.remove('notranslate');
    };
  }, []);
  
  // Handle dark mode toggle
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
      setDarkMode(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
      setDarkMode(true)
    }
  }

  // Handle language toggle - modified to avoid Google Translate API calls
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
    // Store language preference without setting HTML attributes
    localStorage.setItem('preferredLanguage', language === 'en' ? 'ar' : 'en');
    
    // Update text direction only
    document.documentElement.dir = language === 'en' ? 'rtl' : 'ltr'
    
    // Don't set lang attribute to avoid Google Translate API calls
    // document.documentElement.lang = language === 'en' ? 'ar' : 'en'
  }

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
      
      const videoSection = document.getElementById('video')
      let isVideoVisible = false
      if (videoSection) {
        const rect = videoSection.getBoundingClientRect()
        // Consider active if it's taking up a good portion of the screen
        isVideoVisible = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5
      }
      setIsVideoSectionActive(isVideoVisible)

      // Add 'active' and 'in-view' class to sections when they come into view
      document.querySelectorAll('.section').forEach(section => {
        const rect = section.getBoundingClientRect()
        const isVisible = 
          rect.top < window.innerHeight * 0.75 && 
          rect.bottom > window.innerHeight * 0.25
        
        if (isVisible) {
          section.classList.add('active')
          section.classList.add('in-view')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    // Initial check in case the page loads with the video section already visible
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // IntersectionObserver for section transition
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('[App.jsx] IntersectionObserver callback - entry.isIntersecting:', entry.isIntersecting, '!runTransition:', !runTransition);
        if (entry.isIntersecting && !runTransition) {
          console.log('[App.jsx] Transition trigger in view, setting runTransition to true.');
          setRunTransition(true);
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
      }
    );

    if (transitionTriggerRef.current) {
      observer.observe(transitionTriggerRef.current);
    }

    return () => {
      if (transitionTriggerRef.current) {
        observer.unobserve(transitionTriggerRef.current);
      }
    };
  }, [runTransition]); // Re-run if runTransition changes, to unobserve/re-observe if needed, or simply to use its latest value

  // Initialize circles animation
  useEffect(() => {
    const circles = document.querySelectorAll('.circle')
    gsap.from(circles, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out"
    });
  }, [])

  const handleTransitionComplete = () => {
    console.log('[App.jsx] handleTransitionComplete called.');
    setTimeout(() => {
        console.log('[App.jsx] setTimeout in handleTransitionComplete: setting runTransition to false.');
        setRunTransition(false); 
    }, 100); 
  };

  return (
    <>
      <StructuredData />
      <main style={{ overflowX: 'hidden' }}>
        <Hero 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          language={language} 
          toggleLanguage={toggleLanguage} 
        />
        <div className="regular-sections">
          <VideoSection />
          <div className="transition-container">
            <Story language={language} />
            <div ref={transitionTriggerRef} style={{ height: '1px' }} /> 
            <SectionTransition isActive={runTransition} onTransitionComplete={handleTransitionComplete} />
          </div>
          <WorkExperiences />
          <Services />
          <Portfolio language={language} />
          <StatsCounters />
          <Clients />
          <Certificate />
          <UnifiedBackground>
            <TestimonialsComponent language={language} />
            <WhatsAppSection language={language} showFooter={true} />
          </UnifiedBackground>
        </div>
      </main>
      <CookieConsent language={language} />
    </>
  )
}

export default App 