import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import VideoSection from './components/VideoSection'
import Story from './components/Story'
import Portfolio from './components/Portfolio'
import GlobalReach from './components/GlobalReach'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState('en')
  const [scrollPosition, setScrollPosition] = useState(0)

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
      
      // Add 'active' class to sections when they come into view
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

  return (
    <>
      <CustomCursor />
      
      <Navigation 
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
          <GlobalReach />
        </div>
      </main>

      <Footer language={language} />
    </>
  )
}

export default App 