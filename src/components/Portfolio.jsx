import { useRef, useEffect, useState, createRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Portfolio({ language = 'en' }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const imageRefsMap = useRef(new Map());

  function getImageRef(id) {
    if (!imageRefsMap.current.has(id)) {
      imageRefsMap.current.set(id, createRef());
    }
    return imageRefsMap.current.get(id);
  }

  const projects = [
    { 
      id: 1, 
      title: language === 'en' ? 'Responsive Web App' : 'تطبيق ويب متجاوب',
      image: '/images/1.webp',
      category: language === 'en' ? 'Web Development' : 'تطوير الويب',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: '#'
    },
    { 
      id: 2, 
      title: language === 'en' ? 'E-commerce Platform' : 'منصة تجارة إلكترونية',
      image: '/images/2.webp',
      category: language === 'en' ? 'Full Stack' : 'تطوير متكامل',
      technologies: ['Next.js', 'Express', 'PostgreSQL'],
      link: '#'
    },
    { 
      id: 3, 
      title: language === 'en' ? 'Mobile App' : 'تطبيق جوال',
      image: '/images/3.webp',
      category: language === 'en' ? 'Mobile Development' : 'تطوير الجوال',
      technologies: ['React Native', 'Firebase'],
      link: '#'
    },
    { 
      id: 4, 
      title: language === 'en' ? 'Interactive Dashboard' : 'لوحة تحكم تفاعلية',
      image: '/images/4.webp',
      category: language === 'en' ? 'Data Visualization' : 'تصور البيانات',
      technologies: ['D3.js', 'Vue.js', 'Python'],
      link: '#'
    },
    { 
      id: 5, 
      title: language === 'en' ? 'AI-Powered Service' : 'خدمة مدعومة بالذكاء الاصطناعي',
      image: '/images/5.webp',
      category: language === 'en' ? 'Machine Learning' : 'تعلم الآلة',
      technologies: ['TensorFlow', 'Python', 'AWS'],
      link: '#'
    },
    {
      id: 6,
      title: language === 'en' ? 'Blockchain Application' : 'تطبيق بلوكتشين',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: language === 'en' ? 'Web3' : 'ويب 3',
      technologies: ['Solidity', 'Ethereum', 'Web3.js'],
      link: '#'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
        }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const cards = document.querySelectorAll('.portfolio-card');
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    }
  }, [isVisible]);

  const handleMouseMove = (event, itemId) => {
    const card = event.currentTarget;
    const image = imageRefsMap.current.get(itemId)?.current;

    if (!card || !image) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const maxRotate = 15;

    const rotateX = -((y - centerY) / centerY) * maxRotate;
    const rotateY = ((x - centerX) / centerX) * maxRotate;

    image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = (itemId) => {
    const image = imageRefsMap.current.get(itemId)?.current;

    if (!image) return;

    image.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <section id="portfolio" ref={sectionRef} className={`section py-24 md:py-32 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title text-h1 font-hero-section mb-6">
            {language === 'en' ? 'Portfolio' : 'معرض الأعمال'}
          </h2>
          <p className="text-body-lg font-subtitle text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'A collection of projects showcasing my expertise in web development, design, and creative problem-solving.'
              : 'مجموعة من المشاريع التي تبرز خبرتي في تطوير الويب والتصميم وحل المشكلات بشكل إبداعي.'}
          </p>
        </div>
          
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((item) => (
            <div 
              key={item.id} 
              className="portfolio-card group relative overflow-hidden rounded-xl shadow-2xl 
                         bg-white/10 dark:bg-black/20 backdrop-blur-lg border border-white/20 dark:border-black/30
                         transition-all duration-500 ease-in-out hover:shadow-glow hover:scale-105 hover:border-white/40"
              onMouseMove={(e) => handleMouseMove(e, item.id)}
              onMouseLeave={() => handleMouseLeave(item.id)}
            >
              <a href={item.link} className="block h-full">
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                    <img 
                      ref={getImageRef(item.id)}
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-100 ease-out"
                    />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h3 className="text-white text-h3 font-subtitle mb-2 drop-shadow-md">{item.title}</h3>
                    <div className="text-sky-300 dark:text-sky-400 text-sm font-medium">{item.category}</div>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-white/20 dark:bg-black/30 text-white/80 dark:text-white/70 rounded-full text-xs font-medium border border-white/30 dark:border-black/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-white/10 dark:border-black/20">
                    <span className="text-sm text-sky-400 dark:text-sky-300 font-subtitle group-hover:text-white transition-colors duration-300">
                      {language === 'en' ? 'View Project' : 'عرض المشروع'} <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio; 