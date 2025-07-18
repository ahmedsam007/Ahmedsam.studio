import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomProjectCursor from './CustomProjectCursor';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

function Portfolio({ language = 'en' }) {
  const sectionRef = useRef(null);
  const gradientLineRef = useRef(null);
  const scrollLightRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  // Add ref for animated subtitle
  const animatedSubtitleRef = useRef(null);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const [leftArrowAnim, setLeftArrowAnim] = useState('');
  const [rightArrowAnim, setRightArrowAnim] = useState('');
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const intervalRef = useRef(null);
  const SLIDE_DURATION = 15000; // 15 seconds

  // External links for each slide
  const slideLinks = [
    'http://ctbto.org/', // CTBTO Official Website
    'https://dribbble.com/shots/21704329-Fit-Tech-Memvera-Mobile-APP', // 3Days Dribbble Shot
    'https://www.behance.net/gallery/202415365/eFOOM', // eFoom Behance Gallery
    'https://www.behance.net/gallery/202615529/Ernify-Local-Events-and-Activities', // Ernify Behance Gallery
    'https://www.behance.net/gallery/203247885/CRMCOM-eWallet-App', // Eko Smile CRM.COM eWallet App Behance Gallery
    'https://fasrly.com/' // Fasrly Website
  ];

    const features = [
    {
      id: 1,
      icon: (
        <img 
          src="/images/icons/ctbto icon.png" 
          alt="CTBTO Icon" 
          className="w-full h-full object-contain rounded-xl"
        />
      ),
      title: language === 'en' ? 'CTBTO - Nuclear Verification' : 'CTBTO - التحقق النووي',
      description: language === 'en' 
        ? 'Comprehensive Nuclear-Test-Ban Treaty Organization platform supporting global nuclear test monitoring and verification systems for a nuclear-test-free world.'
        : 'منظمة معاهدة الحظر الشامل للتجارب النووية - منصة تدعم مراقبة والتحقق من التجارب النووية عالمياً لعالم خالٍ من التجارب النووية.'
    },
    {
      id: 2,
      icon: (
        <img 
          src="/images/icons/3days icon.png" 
          alt="3Days Icon" 
          className="w-full h-full object-contain rounded-xl"
        />
      ),
      title: language === 'en' ? '3Days Fitness Club' : 'نادي 3Days الرياضي',
      description: language === 'en' 
        ? 'A revolutionary fitness club concept offering personalized training programs three days a week, combining efficiency with expert supervision.'
        : 'مفهوم ثوري لنادي رياضي يقدم برامج تدريب شخصية ثلاثة أيام في الأسبوع، يجمع بين الكفاءة والإشراف المختص.'
    },
    {
      id: 3,
      icon: (
        <img 
          src="/images/icons/efoom icon.png" 
          alt="eFoom Icon" 
          className="w-full h-full object-contain rounded-xl"
        />
      ),
      title: language === 'en' ? 'eFoom - Fourth Mills' : 'eFoom - المطاحن الرابعة',
      description: language === 'en' 
        ? 'Digital platform for a leading Saudi flour production company, supporting strategic food security across multiple regions in the Kingdom.'
        : 'منصة رقمية لشركة رائدة في إنتاج الدقيق السعودية، تدعم الأمن الغذائي الاستراتيجي عبر مناطق متعددة في المملكة.'
    },
    {
      id: 4,
      icon: (
        <img 
          src="/images/icons/ernify icon.png" 
          alt="Ernify Icon" 
          className="w-full h-full object-contain rounded-xl"
        />
      ),
      title: language === 'en' ? 'Ernify - Local Events & Activities' : 'Ernify - الفعاليات والأنشطة المحلية',
      description: language === 'en' 
        ? 'Mobile application connecting communities through local events and activities, featuring intuitive discovery and seamless participation experiences.'
        : 'تطبيق محمول يربط المجتمعات من خلال الفعاليات والأنشطة المحلية، مع اكتشاف بديهي وتجارب مشاركة سلسة.'
    },
    {
      id: 5,
      icon: (
        <img 
          src="/images/icons/eko smile icon.png" 
          alt="Eko Smile Icon" 
          className="w-full h-full object-contain rounded-xl"
        />
      ),
      title: language === 'en' ? 'Eko Smile - Rewards App' : 'Eko Smile - تطبيق المكافآت',
      description: language === 'en' 
        ? 'Mobile rewards application that brings smiles to users through engaging loyalty programs and seamless reward redemption experiences.'
        : 'تطبيق محمول للمكافآت يجلب الابتسامة للمستخدمين من خلال برامج الولاء الجذابة وتجارب استرداد المكافآت السلسة.'
    },
    {
      id: 6,
        icon: (
          <img 
            src="/images/icons/fasrly icon.png" 
            alt="Fasrly" 
            className="w-full h-full object-contain rounded-xl"
          />
        ),
        title: language === 'en' ? 'Fasrly Coaching Platform' : 'منصة فاسرلي للتدريب والإرشاد',
        description: language === 'en' 
          ? 'A comprehensive platform connecting advice seekers with qualified coaches and therapists online. Offering virtual sessions through chat, audio, video, and direct calls for life coaching, mental health, career guidance, and personal development.'
          : 'منصة شاملة تربط طالبي المشورة بمدربين ومعالجين مؤهلين عبر الإنترنت. تقدم جلسات افتراضية عبر الدردشة والصوت والفيديو والمكالمات المباشرة للتدريب الحياتي والصحة النفسية والإرشاد المهني والتطوير الشخصي.'
    }
  ];

  // GSAP ScrollTrigger for gradient line animation
  useEffect(() => {
    if (!gradientLineRef.current || !scrollLightRef.current) return;

    const ctx = gsap.context(() => {
      // Create the horizontal scroll-triggered light effect
      gsap.fromTo(scrollLightRef.current, 
        {
          x: "56px" // Start completely off-screen (width of w-64)
        },
        {
          x: () => gradientLineRef.current.offsetWidth + "px", // End at container width
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", 
            end: "center center",
            scrub: 1,
            invalidateOnRefresh: true // Recalculate on window resize
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // GSAP ScrollTrigger for title character animation
  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      const titleElement = titleRef.current;
      const text = language === 'en' ? "Crafted & Shipped." : "صُنع وشُحن.";
      
      // Clear existing content and create character spans
      titleElement.innerHTML = '';
      const chars = text.split('').map((char, index) => {
        const charWrapper = document.createElement('span');
        charWrapper.style.display = 'inline-block';
        charWrapper.style.overflow = 'hidden';
        charWrapper.style.position = 'relative';
        
        const charElement = document.createElement('span');
        charElement.textContent = char === ' ' ? '\u00A0' : char;
        charElement.style.display = 'inline-block';
        charElement.style.backgroundImage = 'linear-gradient(174deg, #25dff9, #21ff94)';
        charElement.style.webkitBackgroundClip = 'text';
        charElement.style.backgroundClip = 'text';
        charElement.style.webkitTextFillColor = 'transparent';
        charElement.style.color = 'transparent';
        charElement.style.transform = 'translateY(100%)';
        
        charWrapper.appendChild(charElement);
        titleElement.appendChild(charWrapper);
        
        return charElement;
      });

      // Create timeline for character animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          end: "top 40%", // Changed from "center 20%" to make animation complete faster
          scrub: 0.8, // Reduced from 1 to make animation more responsive to scroll
          invalidateOnRefresh: true
        }
      });

      // Animate each character with stagger
      chars.forEach((char, index) => {
        tl.to(char, {
          y: 0,
          duration: 0.1,
          ease: "power2.out"
        }, index * 0.01); // Already at 0.02 which is the faster stagger
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [language]);

  // Separate useEffect for subtitle animation
  useEffect(() => {
    if (!animatedSubtitleRef.current) return;
    
    const ctx = gsap.context(() => {
      // Apply gradient styling to the subtitle
      const subtitleElement = animatedSubtitleRef.current;
      subtitleElement.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(220, 220, 220, 0.8) 100%)';
      subtitleElement.style.webkitBackgroundClip = 'text';
      subtitleElement.style.backgroundClip = 'text';
      subtitleElement.style.color = 'transparent';
      subtitleElement.style.webkitTextFillColor = 'transparent';
      
      // Set initial state - text hidden below the container
      gsap.set(subtitleElement, {
        y: '100%', // Start completely below the visible area
        opacity: 1
      });
      
      // Animate subtitle on scroll - move up to reveal
      const subtitleAnimation = gsap.to(subtitleElement, {
        y: '0%', // Move to normal position
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current, // Same trigger as title for coordinated timing
          start: "top 85%",
          end: "top 45%",
          scrub: 0.8 // Same as title animation
        }
      });
      
      return () => {
        if (subtitleAnimation.scrollTrigger) {
          subtitleAnimation.scrollTrigger.kill();
        }
        subtitleAnimation.kill();
      };
    }, sectionRef);
    
    return () => ctx.revert();
  }, [language]);

  // Auto-advance functionality with progress
  useEffect(() => {
    setProgress(0);
    
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (SLIDE_DURATION / 100));

        if (newProgress >= 100) {
          setCurrentFeature(current => (current + 1) % features.length);
          return 0;
        }
        
        return newProgress;
      });
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentFeature, features.length]);

  // Cleanup cursor on unmount
  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  const goToFeature = (index) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setCurrentFeature(index);
    setProgress(0);
  };

  const prevFeature = () => {
    setLeftArrowAnim('animate-arrow-left');
    setTimeout(() => setLeftArrowAnim(''), 800);
    goToFeature((currentFeature - 1 + features.length) % features.length);
  };

  const nextFeature = () => {
    setRightArrowAnim('animate-arrow-right');
    setTimeout(() => setRightArrowAnim(''), 800);
    goToFeature((currentFeature + 1) % features.length);
  };

  const handleLeftHover = () => {
    if (currentFeature !== 0 && !leftArrowAnim) {
      setLeftArrowAnim('animate-arrow-left');
      setTimeout(() => setLeftArrowAnim(''), 800);
    }
  };

  const handleRightHover = () => {
    if (currentFeature !== features.length - 1 && !rightArrowAnim) {
      setRightArrowAnim('animate-arrow-right');
      setTimeout(() => setRightArrowAnim(''), 800);
    }
  };

  // Custom cursor handlers
  const handleImageMouseEnter = () => {
    setShowCustomCursor(true);
    document.body.style.cursor = 'none';
  };

  const handleImageMouseLeave = () => {
    setShowCustomCursor(false);
    document.body.style.cursor = 'auto';
  };

  const handleImageMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  // Click handler to open external links
  const handleImageClick = (slideIndex) => {
    if (slideLinks[slideIndex]) {
      window.open(slideLinks[slideIndex], '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section 
      data-section="bento_carousel" 
      id="portfolio" 
      ref={sectionRef} 
      className={`relative flex w-full flex-col overflow-x-clip px-8 lg:px-16 pb-52 ${language === 'ar' ? 'rtl' : 'ltr'}`}
    >
      {/* Enhanced Animated Gradient Line with GSAP Scroll Effect */}
      <div 
        ref={gradientLineRef}
        className="relative overflow-hidden ml-8 w-[calc(100%-4rem)] lg:ml-0 lg:w-full mb-12 h-px bg-white/30 opacity-0 lg:opacity-100"
      >
        {/* Scroll-triggered horizontal light effect */}
        <div 
          ref={scrollLightRef}
          className="absolute top-0 left-0 h-full w-64 transition-colors duration-300 bg-gradient-to-r from-transparent via-white to-transparent"
          style={{ 
            transform: 'translateX(-100%)'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes arrowLeft {
          0% { transform: translateX(0); opacity: 1; }
          17% { transform: translateX(5px); opacity: 0; }
          20% { transform: translateX(-5px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes arrowRight {
          0% { transform: translateX(0); opacity: 1; }
          17% { transform: translateX(5px); opacity: 0; }
          20% { transform: translateX(-5px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        .animate-arrow-left {
          animation: arrowLeft 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-arrow-right {
          animation: arrowRight 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>

      <div className="flex flex-col gap-16">
        {/* Header Section */}
        <div ref={headerRef} className="flex w-full gap-16 px-8 lg:px-0 flex-col justify-between lg:flex-row lg:gap-0">
          <h2 
            ref={titleRef}
            className="text-4xl lg:text-6xl font-bold max-w-2xl text-balance leading-tight"
          >
            {language === 'en' ? 'Crafted & Shipped.' : 'صُنع وشُحن.'}
          </h2>
          
          <div className="text-white flex flex-col gap-12 items-start lg:w-[calc(45%-1.5rem)] lg:mt-3">
            <div 
              className="max-w-2xl text-pretty"
              style={{
                overflow: 'hidden' // This creates the mask effect
              }}
            >
              <p 
                ref={animatedSubtitleRef}
                style={{
                  margin: 0,
                  lineHeight: '1.6'
                }}
              >
                {language === 'en' 
                  ? 'Apps and websites I\'ve designed and launched—solo as a freelancer, and shoulder-to-shoulder with in-house teams.'
                  : 'التطبيقات والمواقع التي صممتها وأطلقتها - بمفردي كمستقل، وجنباً إلى جنب مع الفرق الداخلية.'}
              </p>
            </div>
          </div>
        </div>
          
        {/* Bento Grid */}
        <div className="flex w-full flex-col sm:flex-row sm:gap-8 lg:gap-12">
                    {/* Left Box - iPhone Mockup */}
          <div className="bento-box relative flex aspect-[1/1.25] w-full overflow-clip lg:aspect-[0.95] lg:w-[calc(55%-1.5rem)] rounded-2xl lg:rounded-3xl" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="flex items-center justify-center w-full h-full relative overflow-hidden">
              {/* iPhone Image Carousel - Titan Style */}
              <div 
                className="relative w-full h-full overflow-hidden"
                style={{
                  willChange: 'transform',
                  contain: 'layout style paint'
                }}
              >
                <div 
                  className="flex w-full h-full"
                  style={{
                    transform: `translate3d(-${currentFeature * 100}%, 0, 0)`,
                    transition: 'transform 800ms cubic-bezier(0.4, 0, 0.2, 1)',
                    willChange: 'transform'
                  }}
                >
                  {/* Slide 1 - CTBTO */}
                  <div className="flex-shrink-0 w-full h-full flex items-center justify-center">
                    <img 
                      src="/images/ctbto.jpg"
                      alt="CTBTO Platform"
                      className="w-full h-full object-cover rounded-2xl lg:rounded-3xl transition-all duration-[800ms] cursor-none"
                      style={{
                        opacity: currentFeature === 0 ? 1 : 0.3,
                        transform: currentFeature === 0 ? 'scale(1)' : 'scale(0.85)',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
                      }}
                      onMouseEnter={handleImageMouseEnter}
                      onMouseLeave={handleImageMouseLeave}
                      onMouseMove={handleImageMouseMove}
                      onClick={() => handleImageClick(0)}
                    />
                  </div>
                  
                  {/* Slide 2 - 3Days Mockup */}
                  <div className="flex-shrink-0 w-full h-full flex items-center justify-center">
                    <img 
                      src="/images/3days mockup.png"
                      alt="3Days App Mockup"
                      className="w-full h-full object-cover rounded-2xl lg:rounded-3xl transition-all duration-[800ms] cursor-none"
                      style={{
                        opacity: currentFeature === 1 ? 1 : 0.3,
                        transform: currentFeature === 1 ? 'scale(1)' : 'scale(0.85)',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
                      }}
                      onMouseEnter={handleImageMouseEnter}
                      onMouseLeave={handleImageMouseLeave}
                      onMouseMove={handleImageMouseMove}
                      onClick={() => handleImageClick(1)}
                    />
                  </div>
                  
                  {/* Slide 3 - Efoom Mobile */}
                  <div className="flex-shrink-0 w-full h-full flex items-center justify-center">
                    <img 
                      src="/images/icons/efoom mobile.png"
                      alt="Efoom Mobile App"
                      className="w-full h-full object-cover rounded-2xl lg:rounded-3xl transition-all duration-[800ms] cursor-none"
                      style={{
                        opacity: currentFeature === 2 ? 1 : 0.3,
                        transform: currentFeature === 2 ? 'scale(1)' : 'scale(0.85)',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
                      }}
                      onMouseEnter={handleImageMouseEnter}
                      onMouseLeave={handleImageMouseLeave}
                      onMouseMove={handleImageMouseMove}
                      onClick={() => handleImageClick(2)}
                    />
                  </div>
                  
                  {/* Slide 4 - Ernify App */}
                  <div className="flex-shrink-0 w-full h-full flex items-center justify-center">
                    <img 
                      src="/images/Ernify app.webp"
                      alt="Ernify App"
                      className="w-full h-full object-cover rounded-2xl lg:rounded-3xl transition-all duration-[800ms] cursor-none"
                      style={{
                        opacity: currentFeature === 3 ? 1 : 0.3,
                        transform: currentFeature === 3 ? 'scale(1)' : 'scale(0.85)',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
                      }}
                      onMouseEnter={handleImageMouseEnter}
                      onMouseLeave={handleImageMouseLeave}
                      onMouseMove={handleImageMouseMove}
                      onClick={() => handleImageClick(3)}
                    />
                  </div>
                  
                  {/* Slide 5 - Eko Smile App */}
                  <div className="flex-shrink-0 w-full h-full flex items-center justify-center">
                    <img 
                      src="/images/icons/Eko smile app.png"
                      alt="Eko Smile App"
                      className="w-full h-full object-cover rounded-2xl lg:rounded-3xl transition-all duration-[800ms] cursor-none"
                      style={{
                        opacity: currentFeature === 4 ? 1 : 0.3,
                        transform: currentFeature === 4 ? 'scale(1)' : 'scale(0.85)',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
                      }}
                      onMouseEnter={handleImageMouseEnter}
                      onMouseLeave={handleImageMouseLeave}
                      onMouseMove={handleImageMouseMove}
                      onClick={() => handleImageClick(4)}
                    />
                  </div>
                  
                  {/* Slide 6 - Fasrly */}
                  <div className="flex-shrink-0 w-full h-full flex items-center justify-center">
                    <img 
                      src="/images/fasrly.jpg"
                      alt="Fasrly App"
                      className="w-full h-full object-cover rounded-2xl lg:rounded-3xl transition-all duration-[800ms] cursor-none"
                      style={{
                        opacity: currentFeature === 5 ? 1 : 0.3,
                        transform: currentFeature === 5 ? 'scale(1)' : 'scale(0.85)',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
                      }}
                      onMouseEnter={handleImageMouseEnter}
                      onMouseLeave={handleImageMouseLeave}
                      onMouseMove={handleImageMouseMove}
                      onClick={() => handleImageClick(5)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
                        {/* Disclaimer */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="text-white text-[10px] prose prose-strong:text-white prose-a:text-white prose-a:underline prose-a:underline-offset-[.2rem] opacity-30">
                <h7>{language === 'en' ? 'Displayed for portfolio purposes' : 'معروض لأغراض المحفظة'}</h7>
              </div>
                  </div>
          </div>

          {/* Right Box - Features Carousel */}
          <div className="bento-box no-padding relative -mt-16 flex aspect-[0.92] w-full sm:w-[150%] md:w-full sm:mt-0 lg:w-[calc(45%-1.5rem)] bg-white/90 dark:bg-gray-100 rounded-2xl lg:rounded-3xl">
            
            {/* Scrollable Content */}
            <div className="no-scrollbar flex w-full flex-nowrap items-center overflow-hidden select-none relative">
              {features.map((feature, index) => (
                <div 
                  key={feature.id}
                  className="text-black flex w-full shrink-0 snap-start items-center justify-center absolute inset-0 transition-all duration-700 ease-out"
                  style={{
                    transform: `translate3d(${(index - currentFeature) * 100}%, 0, 0)`,
                    opacity: index === currentFeature ? 1 : 0.3,
                    transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  }}
                >
                  <div className="flex max-w-lg flex-col items-center justify-center gap-10 p-8">
                    
                    {/* Icon */}
                    <div className="bg-black flex aspect-square w-16 items-center justify-center rounded-xl">
                      {feature.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="w-full text-center text-balance text-gray-700">
                      <p>
                        <strong 
                          className="block mb-4 font-medium text-black text-lg"
                          style={{
                            fontFamily: index === 0 ? 'Mona Space, monospace' : 'inherit'
                          }}
                        >
                          {feature.title}
                        </strong>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              
              {/* Left Arrow */}
              <button 
                aria-label="Previous"
                onClick={prevFeature}
                onMouseEnter={handleLeftHover}
                disabled={currentFeature === 0}
                className={`grid items-center justify-center relative h-[30px] w-[30px] overflow-hidden rounded-[0.629rem] text-black transition-colors rotate-180 ${
                  currentFeature === 0 
                    ? 'bg-black/5 opacity-30 cursor-not-allowed' 
                    : 'bg-black/5 hover:bg-black/10'
                }`}
              >
                <span className={`block flex-center ${leftArrowAnim}`}>
                  <svg width="10" height="8" fill="none">
                    <path fill="currentColor" d="m5.731 0-.564.564L8.199 3.6H.131v.8h8.068L5.167 7.436 5.731 8l4-4z"></path>
                  </svg>
                </span>
              </button>

              {/* Progress Indicators */}
              <div className="flex items-center rounded-[0.629rem] px-[1.2rem] text-black bg-black/5 h-[30px] w-[140px] justify-center">
                {features.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => goToFeature(index)}
                    className="group grid w-fit px-[0.2rem] py-[0.2rem]"
                    style={{ clipPath: 'inset(0.2rem round 3rem)' }}
                  >
                    <div 
                      className={`relative h-[4px] w-full bg-black/20 overflow-hidden transition-all duration-300 ease-out ${
                        index === currentFeature ? 'rounded-[2px]' : 'rounded-full'
                      }`}
                      style={{ 
                        width: index === currentFeature ? '60px' : '4px'
                      }}
                    >
                      {index === currentFeature && (
                        <div 
                          className="absolute h-full rounded-[2px] bg-black pointer-events-none transition-all duration-100 ease-linear"
                          style={{ 
                            opacity: 1,
                            width: `${progress}%`,
                            transform: 'none'
                          }}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Right Arrow */}
              <button 
                aria-label="Next"
                onClick={nextFeature}
                onMouseEnter={handleRightHover}
                disabled={currentFeature === features.length - 1}
                className={`grid items-center justify-center relative h-[30px] w-[30px] overflow-hidden rounded-[0.629rem] text-black transition-colors ${
                  currentFeature === features.length - 1 
                    ? 'bg-black/5 opacity-30 cursor-not-allowed' 
                    : 'bg-black/5 hover:bg-black/10'
                }`}
              >
                <span className={`block flex-center ${rightArrowAnim}`}>
                  <svg width="10" height="8" fill="none">
                    <path fill="currentColor" d="m5.731 0-.564.564L8.199 3.6H.131v.8h8.068L5.167 7.436 5.731 8l4-4z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Project Cursor */}
      <CustomProjectCursor 
        isVisible={showCustomCursor}
        mousePosition={mousePosition}
      />
    </section>
  );
}

export default Portfolio; 