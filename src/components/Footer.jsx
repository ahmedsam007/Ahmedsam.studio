import React from 'react'

const Footer = ({ language }) => {
  // Translations for footer text
  const translations = {
    copyright: {
      en: "© 2025 Ahmed Sam. All rights reserved.",
      ar: "© 2025 أحمد سام. جميع الحقوق محفوظة."
    },
    navigation: {
      en: "Navigation",
      ar: "التنقل"
    },
    home: {
      en: "Home",
      ar: "الرئيسية"
    },
    about: {
      en: "About",
      ar: "حول"
    },
    work: {
      en: "Work",
      ar: "الأعمال"
    },
    contact: {
      en: "Contact",
      ar: "تواصل"
    },
    connect: {
      en: "Connect",
      ar: "تواصل"
    },
    getInTouch: {
      en: "Get in touch",
      ar: "تواصل معي"
    }
  }

  return (
    <footer className="w-full border-t border-gray-800 dark:border-gray-700 relative">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo and copyright */}
          <div className="flex flex-col space-y-4">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
              Ahmed Sam
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {translations.copyright[language]}
            </p>
          </div>
          
          {/* Column 2: Navigation */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {translations.navigation[language]}
            </h3>
            <div className="flex flex-col space-y-2">
              <a href="#home" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                {translations.home[language]}
              </a>
              <a href="#about" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                {translations.about[language]}
              </a>
              <a href="#work" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                {translations.work[language]}
              </a>
              <a href="#contact" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                {translations.contact[language]}
              </a>
            </div>
          </div>
          
          {/* Column 3: Social */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {translations.connect[language]}
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                <i className="fab fa-dribbble text-xl"></i>
              </a>
            </div>
            <div className="pt-4">
              <button className="gradient-border-button">
                <div className="inner-button">
                  <span className="text-white">{translations.getInTouch[language]}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-30"></div>
    </footer>
  )
}

export default Footer 