import React from 'react'

const Story = ({ language }) => {
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
    beginning: {
      en: "The Beginning",
      ar: "البداية"
    },
    paragraph1: {
      en: "Born and raised in Gaza, I discovered my passion for design at an early age. Despite the challenges, I found solace in creating digital experiences that could transcend physical boundaries.",
      ar: "ولدت ونشأت في غزة، واكتشفت شغفي بالتصميم في سن مبكرة. رغم التحديات، وجدت العزاء في إنشاء تجارب رقمية يمكن أن تتجاوز الحدود المادية."
    },
    paragraph2: {
      en: "My journey began with simple sketches and evolved into a deep understanding of user-centered design principles.",
      ar: "بدأت رحلتي برسومات بسيطة وتطورت إلى فهم عميق لمبادئ التصميم المتمحور حول المستخدم."
    }
  }

  return (
    <section className="section" id="story">
      <div className="section-bg"></div>
      <div className="section-content">
        <h2 className="section-title">{translations.title[language]}</h2>
        <div className="container mx-auto px-4">
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
            {translations.subtitle[language]}
          </p>
          
          <div className="max-w-4xl mx-auto">
            {/* Story Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{translations.beginning[language]}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {translations.paragraph1[language]}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {translations.paragraph2[language]}
                </p>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-500/10 rounded-2xl transform rotate-3"></div>
                  <img src="/images/mysorty.png" alt="My Story" className="rounded-2xl shadow-xl relative z-10 w-full h-[545px] object-cover" />
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-12">
              {/* Timeline Item 1 */}
              <div className="relative pl-8 border-l-2 border-primary-500">
                <div className="absolute left-[-9px] top-0 w-4 h-4 bg-primary-500 rounded-full"></div>
                <div className="mb-2">
                  <span className="text-primary-500 font-semibold">2018</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">First UI Project</h4>
                <p className="text-gray-600 dark:text-gray-300">Launched my first mobile app design, reaching 10,000+ users.</p>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative pl-8 border-l-2 border-primary-500">
                <div className="absolute left-[-9px] top-0 w-4 h-4 bg-primary-500 rounded-full"></div>
                <div className="mb-2">
                  <span className="text-primary-500 font-semibold">2020</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Joined UNICC</h4>
                <p className="text-gray-600 dark:text-gray-300">Started as a Senior UI/UX Designer at the United Nations International Computing Centre, contributing to global digital solutions.</p>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative pl-8 border-l-2 border-primary-500">
                <div className="absolute left-[-9px] top-0 w-4 h-4 bg-primary-500 rounded-full"></div>
                <div className="mb-2">
                  <span className="text-primary-500 font-semibold">2023</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Global Impact</h4>
                <p className="text-gray-600 dark:text-gray-300">Collaborated with international teams on projects reaching millions of users.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story 