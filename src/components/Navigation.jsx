import { useState, useEffect } from 'react'

const Navigation = ({ darkMode, toggleDarkMode, language, toggleLanguage, className }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(true)
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  
  const translations = {
    home: {
      en: 'Home',
      ar: 'الرئيسية'
    },
    story: {
      en: 'Story',
      ar: 'قصتي'
    },
    portfolio: {
      en: 'Portfolio',
      ar: 'أعمالي'
    },
    services: {
      en: 'Services',
      ar: 'خدماتي'
    },
    contact: {
      en: 'Contact',
      ar: 'تواصل'
    }
  }
  
  // Menu items definition using the translations
  const menuItems = [
    { name: 'Home', href: '#hero', translationKey: 'home' },
    { name: 'Story', href: '#story', translationKey: 'story' },
    { name: 'Portfolio', href: '#portfolio', translationKey: 'portfolio' },
    { name: 'Services', href: '#services', translationKey: 'services' },
    { name: 'Contact', href: '#contact', translationKey: 'contact' },
  ]

  useEffect(() => {
    // Set initial scrollY post-mount for correct comparison on first scroll event.
    if (typeof window !== 'undefined') {
      setLastScrollY(window.scrollY)
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const headerHeightThreshold = 80 // Approx. header height, adjust if needed
      const scrollDelta = 5 // Min scroll distance to trigger visibility change

      // Determine header visibility based on scroll direction
      if (currentScrollY > lastScrollY + scrollDelta && currentScrollY > headerHeightThreshold) {
        setHeaderVisible(false) // Scrolling down
      } else if (currentScrollY < lastScrollY - scrollDelta || currentScrollY <= 10) {
        setHeaderVisible(true) // Scrolling up or very near the top
      }

      // Update 'scrolled' state for gradient background effect
      if (currentScrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      setLastScrollY(currentScrollY <= 0 ? 0 : currentScrollY) // Update last scroll position
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [lastScrollY]) // Re-attach listener if lastScrollY changes
  
  return (
    <header 
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-in-out ${headerVisible ? 'translate-y-0' : '-translate-y-full'} ${className || ''}`}
    >
      {/* Gradient overlay - visibility controlled by 'scrolled' state */}
      <div 
        className={`pointer-events-none absolute inset-x-0 h-32 lg:h-24 duration-200 bg-gradient-to-b ${darkMode ? (scrolled ? 'from-dark-900/75' : 'from-transparent') : (scrolled ? 'from-black/75' : 'from-transparent')} ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
      </div>
      
      <div className="w-full relative px-6 xl:px-12">
        <nav className="flex items-center justify-between gap-4 duration-200 py-4 lg:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center">
            <img 
              src="/images/icons/ahmedsam_logo.png" 
              alt="ahmedsam logo" 
              className="h-10 w-auto" 
              style={{ maxHeight: '40px', width: 'auto', display: 'block' }}
            />
          </a>

          {/* Action Buttons */}
          <div className="flex gap-2 items-center">
            {/* Language Toggle Button - Always shows عربي */}
            <button
              onClick={toggleLanguage}
              className={`relative isolate inline-flex items-center justify-center border text-base/6 uppercase font-mono tracking-widest shrink-0 px-4 py-2 sm:text-sm gap-x-3 rounded-full transition-all duration-200 ${
                darkMode 
                  ? 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50' 
                  : 'bg-transparent text-primary border-primary/25 hover:bg-secondary/20'
              }`}
            >
              <span className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"></span>
              عربي
            </button>
            
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className={`relative isolate inline-flex items-center justify-center border text-base/6 uppercase font-mono tracking-widest shrink-0 aspect-square px-4 py-2 sm:text-sm rounded-full transition-all duration-200 ${
                darkMode 
                  ? 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50' 
                  : 'bg-transparent text-primary border-primary/25 hover:bg-secondary/20'
              }`}
            >
              <span className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"></span>
              {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            </button>

            {/* Menu Toggle Button */}
            <button
              type="button"
              onClick={toggleMenu}
              className={`relative isolate inline-flex items-center justify-center border text-base/6 uppercase font-mono tracking-widest shrink-0 aspect-square px-4 py-2 sm:text-sm rounded-full transition-all duration-200 ${
                darkMode 
                  ? 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50' 
                  : 'bg-transparent text-primary border-primary/25 hover:bg-secondary/20'
              }`}
            >
              <span className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"></span>
              <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`backdrop-blur border-t border-gray-200 dark:border-gray-700 shadow-lg ${darkMode ? 'bg-dark-800/95' : 'bg-white/95' }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm block px-3 py-2 mono-tag font-medium text-primary/70 dark:text-gray-300 hover:bg-secondary/10 dark:hover:bg-dark-700 hover:text-primary dark:hover:text-primary-400 transition-colors"
              >
                {translations[item.translationKey][language]}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navigation 