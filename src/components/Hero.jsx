import { useEffect } from 'react'

const Hero = ({ language }) => {
  // Translations
  const translations = {
    subheading: {
      en: "UI/UX designer specializing in creating intuitive and engaging digital experiences that bring your vision to life.",
      ar: "مصمم واجهات المستخدم متخصص في إنشاء تجارب رقمية سهلة وجذابة تحول رؤيتك إلى واقع."
    },
    cta: {
      en: "Chat on WhatsApp",
      ar: "تواصل عبر واتساب"
    }
  }

  // Animation for hero characters and SVG
  useEffect(() => {
    const animateHeroChars = () => {
      const heroChars = document.querySelectorAll('.hero-char')
      
      // Reset all chars
      heroChars.forEach(char => {
        char.style.opacity = '0'
        char.style.transform = 'translateY(20px)'
      })
      
      // Animate each character with delay
      heroChars.forEach((char, index) => {
        setTimeout(() => {
          char.style.opacity = '1'
          char.style.transform = 'translateY(0)'
        }, 100 + (index * 50))
      })
    }
    
    animateHeroChars()
    
    // SVG animation
    const svg = document.querySelector('#hero svg')
    let isMouseOver = false
    let defaultAnimationFrame

    // Mouse following animation
    const handleMouseMove = (e) => {
      if (!svg) return
      
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      
      svg.style.transform = `translate(${x * 50}px, ${y * 50}px)`
      isMouseOver = true
    }

    // Default floating animation
    const defaultAnimation = () => {
      if (!svg || isMouseOver) return
      
      const time = Date.now() * 0.001
      const x = Math.sin(time * 0.5) * 20
      const y = Math.cos(time * 0.5) * 20
      
      svg.style.transform = `translate(${x}px, ${y}px)`
      defaultAnimationFrame = requestAnimationFrame(defaultAnimation)
    }

    // Start default animation
    defaultAnimation()

    // Add mouse event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', () => {
      isMouseOver = false
      defaultAnimation()
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', () => {
        isMouseOver = false
        defaultAnimation()
      })
      cancelAnimationFrame(defaultAnimationFrame)
    }
  }, [language])
  
  return (
    <section id="hero">
      {/* Blur effect SVG */}
      <svg className="absolute overflow-visible ai-style-change-1 w-[1500px] h-[1500px] sm:w-[1500px] sm:h-[1500px] blur-3xl opacity-70 transition-transform duration-300 ease-out" fill="none" viewBox="0 0 701 467" xmlns="http://www.w3.org/2000/svg">
        <g className="transform-gpu will-change-transform">
          <path className="will-change-transform" d="M407.64 132.674 511.646 108l81.075 17.082V326.27H419.103l-31.111-98.696 19.648-94.9Z" fill="#5DA200" data-svg-origin="387.99200439453125 108" style={{ transform: 'translate3d(0px, 0px, 0px)' }}></path>
          <path className="will-change-transform" d="m357.667 186.498 72.448-19.143 56.475 13.253v156.09H365.651l-21.671-76.572 13.687-73.628Z" fill="#FFC700" data-svg-origin="343.9800109863281 167.35499572753906" style={{ transform: 'translate3d(0px, 0px, 0px)' }}></path>
          <path className="will-change-transform" d="m471.471 217.57 58.714-9.647 45.77 6.679v78.666h-98.013l-17.563-38.591 11.092-37.107Z" fill="#FFC700" data-svg-origin="460.3790283203125 207.92300415039062" style={{ transform: 'translate3d(0px, 0px, 0px)' }}></path>
          <path className="will-change-transform" d="m160.042 229.351 80.266-16.432 62.569 11.376v133.988H168.888l-24.009-65.73 15.163-63.202Z" fill="#FFC700" data-svg-origin="144.87899780273438 212.91900634765625" style={{ transform: 'translate3d(0px, 0px, 0px)' }}></path>
          <path className="will-change-transform" d="m290.066 207.03 73.697-19.143 57.449 13.253v156.091H298.188l-22.044-76.573 13.922-73.628Z" fill="#FFC700" data-svg-origin="276.14398193359375 187.88699340820312" style={{ transform: 'translate3d(0px, 0px, 0px)' }}></path>
          <path className="will-change-transform" d="m136.004 208.083 73.697-19.143 57.449 13.253v156.09H144.127l-22.045-76.572 13.922-73.628Z" fill="#FFC700" data-svg-origin="122.08200073242188 188.9399871826172" style={{ transform: 'translate3d(0px, 0px, 0px)' }}></path>
          <path className="will-change-transform" d="m243.752 200.799 86.172-18.321 67.174 12.683v149.388H253.249l-25.776-73.284 16.279-70.466Z" fill="#7C5FE4" data-svg-origin="227.47299194335938 182.47799682617188" style={{ transform: 'translate3d(0px, 0px, 0px)' }}></path>
          <path className="will-change-transform" d="m417.299 212.382 39.278-7.668 30.618 5.309v62.518h-65.567l-11.749-30.669 7.42-29.49Z" fill="#A40099" data-svg-origin="409.8790588378906 204.71400451660156" style={{ transform: 'translate3d(0px, 0px, 0px)' }}></path>
          <path className="will-change-transform" d="m145.653 194.349 93.505-19.143 72.89 13.253v156.09h-156.09l-27.97-76.573 17.665-73.627Z" fill="#FF69C4" data-svg-origin="127.98797607421875 175.20599365234375" style={{ transform: 'translate3d(0px, 0px, 0px)' }}></path>
          <path className="will-change-transform" d="m117.665 194.349 93.505-19.143 72.89 13.253v156.09H127.97L100 267.976l17.665-73.627Z" fill="#C91884" data-svg-origin="100 175.20599365234375" style={{ transform: 'translate3d(0px, 0px, 0px)' }}></path>
        </g>
      </svg>
      
      <div className="section-content">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-4xl mx-auto text-center">
            {/* Headline with Animation */}
            <h1 className="text-[82px] font-bold mb-8 leading-tight">
              <span className="hero-gradient-text">
                <span className="hero-char">C</span>
                <span className="hero-char">r</span>
                <span className="hero-char">a</span>
                <span className="hero-char">f</span>
                <span className="hero-char">t</span>
                <span className="hero-char">i</span>
                <span className="hero-char">n</span>
                <span className="hero-char">g</span>
                <span className="hero-char">&nbsp;</span>
                <span className="hero-char">D</span>
                <span className="hero-char">i</span>
                <span className="hero-char">g</span>
                <span className="hero-char">i</span>
                <span className="hero-char">t</span>
                <span className="hero-char">a</span>
                <span className="hero-char">l</span>
              </span>
              <br />
              <span className="hero-gradient-text">
                <span className="hero-char">E</span>
                <span className="hero-char">x</span>
                <span className="hero-char">p</span>
                <span className="hero-char">e</span>
                <span className="hero-char">r</span>
                <span className="hero-char">i</span>
                <span className="hero-char">e</span>
                <span className="hero-char">n</span>
                <span className="hero-char">c</span>
                <span className="hero-char">e</span>
                <span className="hero-char">s</span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
              {translations.subheading[language]}
            </p>

            {/* CTA Button */}
            <div className="button-container relative">
              <a href="https://wa.me/+972598702740" target="_blank" rel="noopener noreferrer" className="gradient-border-button inline-block">
                <div className="inner-button bg-white dark:bg-dark-900">
                  <i className="fab fa-whatsapp mr-3 text-[#25D366] text-lg relative z-10"></i>
                  <span className="relative z-10 text-white dark:text-white font-medium">
                    {translations.cta[language]}
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Logos Section */}
          <div className="mt-32">
            <div className="max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
              <div className="relative w-full mx-auto max-w-4xl opacity-90 dark:opacity-70 overflow-hidden before:content-[''] before:absolute before:inset-0 before:w-full before:bg-[linear-gradient(to_right,hsl(var(--background-default))_0%,transparent_30%,transparent_70%,hsl(var(--background-default))_100%)] before:z-10 flex flex-nowrap px-5 lg:px-12 justify-center gap-4 lg:gap-8" style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent 100%)' }}>
                {/* First track of logos */}
                <div className="gap-4 lg:gap-8 flex flex-nowrap items-center w-fit animate-[marquee_90000ms_linear_both_infinite] will-change-transform motion-reduce:animate-none motion-reduce:will-change-none">
                  <LogoItem srcLight="/images/logos/light/cursor.png" srcDark="/images/logos/dark/cursor.png" alt="Cursor" height="4" />
                  <LogoItem srcLight="/images/logos/light/figma.svg" srcDark="/images/logos/dark/figma.svg" alt="Figma" height="4" />
                  <LogoItem srcLight="/images/logos/light/midjourney.svg" srcDark="/images/logos/dark/midjourney.svg" alt="Midjourney" height="4" />
                  <LogoItem srcLight="/images/logos/light/slack.svg" srcDark="/images/logos/dark/slack.svg" alt="Slack" height="4" />
                  <LogoItem srcLight="/images/logos/light/framer.svg" srcDark="/images/logos/dark/framer.svg" alt="Framer" height="4" />
                  <LogoItem srcLight="/images/logos/light/jira.svg" srcDark="/images/logos/dark/jira.svg" alt="Jira" height="4" />
                </div>
                
                {/* Second track of logos (identical to first for seamless looping) */}
                <div className="gap-4 lg:gap-8 flex flex-nowrap items-center w-fit animate-[marquee_90000ms_linear_both_infinite] will-change-transform motion-reduce:animate-none motion-reduce:will-change-none">
                  <LogoItem srcLight="/images/logos/light/cursor.png" srcDark="/images/logos/dark/cursor.png" alt="Cursor" height="4" />
                  <LogoItem srcLight="/images/logos/light/figma.svg" srcDark="/images/logos/dark/figma.svg" alt="Figma" height="4" />
                  <LogoItem srcLight="/images/logos/light/midjourney.svg" srcDark="/images/logos/dark/midjourney.svg" alt="Midjourney" height="4" />
                  <LogoItem srcLight="/images/logos/light/slack.svg" srcDark="/images/logos/dark/slack.svg" alt="Slack" height="4" />
                  <LogoItem srcLight="/images/logos/light/framer.svg" srcDark="/images/logos/dark/framer.svg" alt="Framer" height="4" />
                  <LogoItem srcLight="/images/logos/light/jira.svg" srcDark="/images/logos/dark/jira.svg" alt="Jira" height="4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Logo component for the marquee
const LogoItem = ({ src, srcLight, srcDark, alt, height }) => {
  // Convert height prop to actual size in rem
  const getHeightClass = (h) => {
    switch(h) {
      case '2': return 'h-8';  // 2rem = 32px
      case '3': return 'h-6';  // 1.5rem = 24px
      case '4': return 'h-4';  // 1rem = 16px
      case '5': return 'h-3';  // 0.75rem = 12px
      default: return 'h-4';
    }
  };

  const heightClass = getHeightClass(height);

  return (
    <div className={`flex items-center justify-center ${heightClass} w-max !inline-block`}>
      {srcLight && srcDark ? (
        <>
          <img 
            src={srcLight} 
            alt={alt} 
            className={`${heightClass} w-auto block dark:hidden [filter:brightness(0)_opacity(0.7)] hover:opacity-100 transition-opacity`} 
            draggable="false" 
          />
          <img 
            src={srcDark} 
            alt={alt} 
            className={`${heightClass} w-auto hidden dark:block opacity-70 hover:opacity-100 transition-opacity`} 
            draggable="false" 
          />
        </>
      ) : (
        <>
          <img 
            src={src} 
            alt={alt} 
            className={`${heightClass} w-auto block dark:hidden [filter:brightness(0)_opacity(0.7)] hover:opacity-100 transition-opacity`} 
            draggable="false" 
          />
          <img 
            src={src} 
            alt={alt} 
            className={`${heightClass} w-auto hidden dark:block opacity-70 hover:opacity-100 transition-opacity`} 
            draggable="false" 
          />
        </>
      )}
    </div>
  )
}

export default Hero 