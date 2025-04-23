import React from 'react'

const Portfolio = ({ language }) => {
  // Translations
  const translations = {
    title: {
      en: "Portfolio",
      ar: "المشاريع"
    },
    subtitle: {
      en: "Showcasing a collection of innovative UI/UX design projects that push boundaries.",
      ar: "عرض مجموعة من مشاريع تصميم واجهات المستخدم المبتكرة التي تتخطى الحدود."
    },
    viewAll: {
      en: "View All Projects",
      ar: "عرض جميع المشاريع"
    }
  }

  // Portfolio items
  const portfolioItems = [
    { id: 1, image: "/images/1.webp", alt: "UI/UX Design Project 1" },
    { id: 2, image: "/images/2.webp", alt: "UI/UX Design Project 2" },
    { id: 3, image: "/images/3.webp", alt: "UI/UX Design Project 3" },
    { id: 4, image: "/images/4.webp", alt: "UI/UX Design Project 4" },
    { id: 5, image: "/images/5.webp", alt: "UI/UX Design Project 5" }
  ]

  return (
    <section className="section" id="portfolio">
      <div className="section-bg"></div>
      <div className="section-content">
        <h2 className="section-title">{translations.title[language]}</h2>
        <div className="container mx-auto px-4">
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
            {translations.subtitle[language]}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map(item => (
              <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={item.image} 
                  alt={item.alt} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-primary-500 text-white px-4 py-2 rounded-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <a href="#" className="inline-flex items-center px-8 py-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition duration-300 font-medium">
              {translations.viewAll[language]} <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portfolio 