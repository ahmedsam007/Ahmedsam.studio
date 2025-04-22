import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faArrowRight } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import LogosMarquee from './LogosMarquee';

function Hero({ isRTL, scrollToSection, heroRef }) {
  return (
    <section id="hero" ref={heroRef} className="section">
      {/* Background SVG */}
      <svg
        className="absolute overflow-visible ai-style-change-1 w-[1000px] h-[1000px] sm:w-[2000px] sm:h-[2000px]"
        fill="none"
        viewBox="0 0 701 467"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="transform-gpu">
          {/* ... (copy all <path> elements from static HTML) ... */}
        </g>
      </svg>
      {/* Content */}
      <div className="section-content">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-4xl mx-auto text-center">
            {/* Headline Animation */}
            <h1 className="text-[82px] font-bold mb-8 leading-tight section-title-ani">
              <span className="hero-gradient-text section-title-ani">
                {/* First line chars */}
                {(isRTL ? 'صياغة التجارب' : 'Crafting Digital').split('').map((char, idx) => (
                  <span key={`l1-${idx}`} className="hero-char section-title-char">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
              <br />
              <span className="hero-gradient-text section-title-ani">
                {/* Second line chars */}
                {(isRTL ? 'الرقمية' : 'Experiences').split('').map((char, idx) => (
                  <span key={`l2-${idx}`} className="hero-char section-title-char">
                    {char}
                  </span>
                ))}
              </span>
            </h1>
            {/* Subheading */}
            <p className="text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
              {isRTL
                ? 'مصمم واجهات المستخدم متخصص في إنشاء تجارب رقمية سهلة وجذابة تحول رؤيتك إلى واقع.'
                : 'UI/UX designer specializing in creating intuitive and engaging digital experiences that bring your vision to life.'
              }
            </p>
            {/* CTA Button */}
            <div className="button-container relative">
              <a
                href="https://wa.me/+972598702740"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-border-button inline-block"
              >
                <div className="inner-button bg-white dark:bg-dark-900">
                  <FontAwesomeIcon icon={faWhatsapp} className="mr-3 text-[#25D366] text-lg relative z-10" />
                  <span className="relative z-10">
                    {isRTL ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                  </span>
                </div>
              </a>
            </div>
            {/* Logos Marquee from static HTML */}
            <LogosMarquee />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero; 