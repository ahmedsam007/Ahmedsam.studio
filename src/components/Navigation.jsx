import { useState } from 'react'

const Navigation = ({ darkMode, toggleDarkMode, language, toggleLanguage }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  
  const translations = {
    home: {
      en: 'Home',
      ar: 'الرئيسية'
    },
    features: {
      en: 'Features',
      ar: 'المميزات'
    },
    portfolio: {
      en: 'Portfolio',
      ar: 'أعمالي'
    },
    contact: {
      en: 'Contact',
      ar: 'تواصل'
    },
    langSwitch: {
      en: 'عربي',
      ar: 'English'
    }
  }
  
  return (
    <nav className="fixed w-full bg-white/80 dark:bg-dark-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <img 
                src="/images/logo-light.png" 
                alt="Ahmed Sam" 
                className="h-10 w-auto transition-all duration-300 dark:hidden"
              />
              <img 
                src="/images/logo-dark.png" 
                alt="Ahmed Sam" 
                className="h-10 w-auto transition-all duration-300 hidden dark:block"
              />
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium"
            >
              {translations.home[language]}
            </a>
            <a 
              href="#" 
              className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium"
            >
              {translations.features[language]}
            </a>
            <a 
              href="#" 
              className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium"
            >
              {translations.portfolio[language]}
            </a>
            <a 
              href="#" 
              className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium"
            >
              {translations.contact[language]}
            </a>
            
            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-dark-900"
            >
              {translations.langSwitch[language]}
            </button>
            
            {/* Theme Switcher */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-dark-900"
            >
              <i className="fas fa-sun dark:hidden"></i>
              <i className="fas fa-moon hidden dark:block"></i>
            </button>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 text-gray-800 dark:text-gray-200"
            >
              <i className="fas fa-sun dark:hidden"></i>
              <i className="fas fa-moon hidden dark:block"></i>
            </button>
            <button 
              onClick={toggleMenu}
              className="text-gray-600 dark:text-gray-300"
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-4">
              <a 
                href="#" 
                className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {translations.home[language]}
              </a>
              <a 
                href="#" 
                className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {translations.features[language]}
              </a>
              <a 
                href="#" 
                className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {translations.portfolio[language]}
              </a>
              <a 
                href="#" 
                className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {translations.contact[language]}
              </a>
              <button 
                onClick={toggleLanguage}
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 text-gray-800 dark:text-gray-200 w-fit"
              >
                {translations.langSwitch[language]}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation 