import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Portfolio({ isRTL }) {
  const items = [
    { src: '/images/project-1.png', title: 'Project Title 1', desc: 'Brief description of the project and its impact.' },
    { src: '/images/project-2.png', title: 'Project Title 2', desc: 'Another project showcasing specific UI/UX skills.' },
    { src: '/images/project-3.png', title: 'Project Title 3', desc: 'Highlighting problem-solving through design.' },
  ];

  return (
    <section id="portfolio" className="section">
      <div className="section-content container mx-auto px-4 py-20">
        <h2 className="section-title">
          {isRTL ? 'أعمال مميزة' : 'Featured Work'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="portfolio-item group">
              <img src={item.src} alt={item.title} className="portfolio-image" />
              <div className="portfolio-overlay">
                <h3 className="portfolio-title">{item.title}</h3>
                <p className="portfolio-description">{item.desc}</p>
                <span className="portfolio-link">
                  {isRTL ? 'عرض التفاصيل' : 'View Details'}{' '}
                  <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio; 