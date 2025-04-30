import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import VideoSection from './components/VideoSection'
import Story from './components/Story'
import Portfolio from './components/Portfolio'
import Footer from './components/Footer'
import GreenGlobe from './components/finished'
import TestimonialsComponent from './components/Testimonials'
import Services from './components/Services'
import Clients from './components/Clients'
import gsap from 'gsap'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('en')
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isVideoSectionActive, setIsVideoSectionActive] = useState(false)
  const [hovered, setHovered] = useState(null)

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

  // Handle language toggle
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
    // Update document direction
    document.documentElement.dir = language === 'en' ? 'rtl' : 'ltr'
    document.documentElement.lang = language === 'en' ? 'ar' : 'en'
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
        console.log('Checking section:', section.id);
        const rect = section.getBoundingClientRect()
        const isVisible = 
          rect.top < window.innerHeight * 0.75 && 
          rect.bottom > window.innerHeight * 0.25
        
        if (isVisible) {
          console.log('Section IS visible, adding in-view:', section.id);
          section.classList.add('active')
          section.classList.add('in-view')
        } else {
          console.log('Section NOT visible:', section.id);
          // Optional: remove class if needed
          // section.classList.remove('active') 
          // section.classList.remove('in-view')
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

  // Initialize sections to be in-view
  useEffect(() => {
    const hero = document.getElementById('hero')
    if (hero) {
      setTimeout(() => {
        hero.classList.add('in-view')
      }, 100)
    }
  }, [])

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

  return (
    <>
      <Navigation 
        className={isVideoSectionActive ? 'hide-nav' : ''}
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        language={language}
        toggleLanguage={toggleLanguage}
      />
      
      <main>
        <div className="fixed-scroll-sections">
          <Hero language={language} />
        </div>
        
        <div className="regular-sections">
          <VideoSection />
          <Story language={language} />
          <Portfolio language={language} />
          <Services />
          <GreenGlobe/>
          <Clients/>
          <TestimonialsComponent />
        </div>
      </main>

      <Footer language={language} />
    </>
  )
}

export default App 