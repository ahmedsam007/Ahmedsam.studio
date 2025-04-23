import { useState, useEffect, useRef } from 'react'
import Cursor from './components/Cursor'
import './App.css'
import './components.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VideoSection from './components/VideoSection'
import Story from './components/Story'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })
  
  const [isScrollingVideo, setIsScrollingVideo] = useState(false)
  const [isScrollingVideoFurther, setIsScrollingVideoFurther] = useState(false)
  const [isRTL, setIsRTL] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.lang === 'ar'
    }
    return false
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [heroAnimated, setHeroAnimated] = useState(false)

  const heroRef = useRef(null)
  const videoSectionRef = useRef(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    localStorage.theme = isDarkMode ? 'dark' : 'light'
  }, [isDarkMode])

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = isRTL ? 'ar' : 'en'
    localStorage.lang = isRTL ? 'ar' : 'en'
  }, [isRTL])

  // Effect for Custom Cursor
  useEffect(() => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item'); // Add other selectors as needed

    if (!cursorDot || !cursorCircle) return;

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      cursorDot.style.left = `${x}px`;
      cursorDot.style.top = `${y}px`;
      cursorCircle.style.left = `${x}px`;
      cursorCircle.style.top = `${y}px`;
    };

    const handleMouseOver = () => {
      cursorDot.classList.add('hover');
      cursorCircle.classList.add('hover');
    };

    const handleMouseOut = () => {
      cursorDot.classList.remove('hover');
      cursorCircle.classList.remove('hover');
    };

    const handleMouseDown = () => {
      cursorDot.classList.add('active');
      cursorCircle.classList.add('active');
    };

    const handleMouseUp = () => {
      cursorDot.classList.remove('active');
      cursorCircle.classList.remove('active');
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    interactiveElements.forEach(el => {
      el.addEventListener('mouseover', handleMouseOver);
      el.addEventListener('mouseout', handleMouseOut);
    });

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []); // Empty dependency array means this runs once on mount

  const toggleLanguage = () => {
    setIsRTL(!isRTL)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId, event) => {
    event.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMenuOpen(false)
    }
  }

  const animateHeroChars = () => {
    const firstLineChars = document.querySelectorAll('.hero-gradient-text:first-child .hero-char')
    const secondLineChars = document.querySelectorAll('.hero-gradient-text:last-child .hero-char')
    const allChars = [...firstLineChars, ...secondLineChars]

    allChars.forEach(char => {
      char.style.opacity = '0'
      char.style.transform = 'translateY(20px)'
    })

    allChars.forEach((char, index) => {
      setTimeout(() => {
        char.style.opacity = '1'
        char.style.transform = 'translateY(0)'
      }, 50 + (index * 30))
    })
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-dark-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Custom Cursor Elements - Logic needs migration */}
      <div className="cursor-dot"></div>
      <div className="cursor-circle"></div>
      
      <Cursor /> {/* Keep existing Cursor component? Needs review */}

      {/* Navigation */}
      <Navbar
        isRTL={isRTL}
        isDarkMode={isDarkMode}
        toggleLanguage={toggleLanguage}
        setIsDarkMode={setIsDarkMode}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        scrollToSection={scrollToSection}
      />

      <main>
        <div className="fixed-scroll-sections">
          {/* Hero Section */}
          <Hero isRTL={isRTL} scrollToSection={scrollToSection} heroRef={heroRef} />

          {/* Video Section */}
          <VideoSection
            isScrollingVideo={isScrollingVideo}
            isScrollingVideoFurther={isScrollingVideoFurther}
          />
        </div>
        <div className="regular-sections">
          {/* Story Section */}
          <Story isRTL={isRTL} />
          {/* Portfolio Section */}
          <Portfolio isRTL={isRTL} />
          {/* Contact Section */}
          <Contact isRTL={isRTL} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <div className="flex justify-center space-x-6 mb-8">
            {/* Social Links */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="footer-social-link"><FontAwesomeIcon icon={faWhatsapp} /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="footer-social-link"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="footer-social-link"><FontAwesomeIcon icon={faLinkedin} /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="footer-social-link"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="footer-social-link"><FontAwesomeIcon icon={faDribbble} /></a>
          </div>
          <p className="mb-2">&copy; {new Date().getFullYear()} Ahmed Sam. {isRTL ? 'كل الحقوق محفوظة.' : 'All rights reserved.'}</p>
          <p>{isRTL ? 'صُنع بحب في غزة ❤️' : 'Made with ❤️ in Gaza.'}</p>
        </div>
      </footer>

    </div>
  )
}

export default App; 