import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars } from '@fortawesome/free-solid-svg-icons';

function Navbar({ isRTL, isDarkMode, toggleLanguage, setIsDarkMode, isMenuOpen, toggleMenu, scrollToSection }) {
  return (
    <nav className="fixed w-full bg-white/80 dark:bg-dark-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#hero" onClick={(e) => scrollToSection('hero', e)} className="flex items-center">
              <img src="/images/logo-light.png" alt="Ahmed Sam" className="h-10 w-auto transition-all duration-300 dark:hidden" />
              <img src="/images/logo-dark.png" alt="Ahmed Sam" className="h-10 w-auto transition-all duration-300 hidden dark:block" />
            </a>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#hero" onClick={(e) => scrollToSection('hero', e)} className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium" data-en="Home" data-ar="الرئيسية">{isRTL ? 'الرئيسية' : 'Home'}</a>
            <a href="#features" onClick={(e) => scrollToSection('features', e)} className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium" data-en="Features" data-ar="المميزات">{isRTL ? 'المميزات' : 'Features'}</a>
            <a href="#portfolio" onClick={(e) => scrollToSection('portfolio', e)} className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium" data-en="Portfolio" data-ar="أعمالي">{isRTL ? 'أعمالي' : 'Portfolio'}</a>
            <a href="#contact" onClick={(e) => scrollToSection('contact', e)} className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium" data-en="Contact" data-ar="تواصل">{isRTL ? 'تواصل' : 'Contact'}</a>
            {/* Language Switcher */}
            <button onClick={toggleLanguage} className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-dark-900" id="lang-toggle">
              <span className={isRTL ? 'hidden' : ''}>عربي</span>
              <span className={isRTL ? '' : 'hidden'}>English</span>
            </button>
            {/* Theme Toggle */}
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-dark-900" id="theme-toggle">
              <FontAwesomeIcon icon={faSun} className={isDarkMode ? 'hidden' : ''} />
              <FontAwesomeIcon icon={faMoon} className={isDarkMode ? '' : 'hidden'} />
            </button>
          </div>
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 text-gray-800 dark:text-gray-200" id="theme-toggle-mobile">
              <FontAwesomeIcon icon={faSun} className={isDarkMode ? 'hidden' : ''} />
              <FontAwesomeIcon icon={faMoon} className={isDarkMode ? '' : 'hidden'} />
            </button>
            <button onClick={toggleMenu} className="text-gray-600 dark:text-gray-300">
              <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </button>
          </div>
        </div>
        {/* Mobile Navigation Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
          <div className="flex flex-col space-y-4 items-start bg-white dark:bg-dark-800 p-4 rounded-md shadow-lg">
            <a href="#hero" onClick={(e) => scrollToSection('hero', e)} className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium">{isRTL ? 'الرئيسية' : 'Home'}</a>
            <a href="#features" onClick={(e) => scrollToSection('features', e)} className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium">{isRTL ? 'المميزات' : 'Features'}</a>
            <a href="#portfolio" onClick={(e) => scrollToSection('portfolio', e)} className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium">{isRTL ? 'أعمالي' : 'Portfolio'}</a>
            <a href="#contact" onClick={(e) => scrollToSection('contact', e)} className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 font-medium">{isRTL ? 'تواصل' : 'Contact'}</a>
            <button onClick={toggleLanguage} className="p-2 rounded-lg bg-gray-100 dark:bg-dark-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-dark-900 w-full text-left mt-2">
              <span className={isRTL ? 'hidden' : ''}>عربي</span>
              <span className={isRTL ? '' : 'hidden'}>English</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 