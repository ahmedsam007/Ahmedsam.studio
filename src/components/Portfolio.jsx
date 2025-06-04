import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

function Portfolio({ language = 'en' }) {
  const sectionRef = useRef(null);
  const gradientLineRef = useRef(null);
  const scrollLightRef = useRef(null);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);
  const [leftArrowAnim, setLeftArrowAnim] = useState('');
  const [rightArrowAnim, setRightArrowAnim] = useState('');
  const intervalRef = useRef(null);
  const SLIDE_DURATION = 15000; // 15 seconds

    const features = [
    {
      id: 1,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" fill="none">
          <circle cx="7" cy="4.125" r="3.5" stroke="#fff" strokeLinecap="round"></circle>
          <path stroke="#fff" strokeLinecap="round" d="M13 13.875v0a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v0"></path>
        </svg>
      ),
      title: language === 'en' ? 'Human Service' : 'خدمة بشرية',
      description: language === 'en' 
        ? 'All Titan clients have access to a dedicated wealth advisor.'
        : 'جميع عملاء تيتان لديهم إمكانية الوصول إلى مستشار ثروات مخصص.'
    },
    {
      id: 2,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" fill="none">
          <path stroke="#F8F8F8" d="m1.08 9 5.84-5 3 3 7-6m0 0h-4.08m4.08 0v4"></path>
        </svg>
      ),
      title: language === 'en' ? 'Fully Managed Investing' : 'استثمار مُدار بالكامل',
      description: language === 'en' 
        ? 'We manage your wealth—so you don\'t have to stress.'
        : 'نحن ندير ثروتك - لذا لا داعي للتوتر.'
    },
    {
      id: 3,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="20" fill="none">
          <path stroke="#F8F8F8" d="M5.272 2.714C5.272 1.768 6.046 1 7 1s1.728.768 1.728 1.714m.864 13.715C9.592 17.849 8.432 19 7 19a2.58 2.58 0 0 1-2.592-2.571zm-8.187-2.987-.258.585c-.5 1.133.337 2.402 1.583 2.402h8.54c1.246 0 2.083-1.27 1.583-2.402l-.258-.585a4.26 4.26 0 0 1-.356-1.948l.232-4.264c.133-2.453-1.837-4.516-4.314-4.516H5.843c-2.477 0-4.447 2.063-4.314 4.516l.232 4.264a4.26 4.26 0 0 1-.356 1.948Z"></path>
        </svg>
      ),
      title: language === 'en' ? 'Real-Time Updates' : 'تحديثات فورية',
      description: language === 'en' 
        ? 'Get video updates on your investments from our team.'
        : 'احصل على تحديثات فيديو حول استثماراتك من فريقنا.'
    },
    {
      id: 4,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
          <path stroke="#F8F8F8" strokeLinecap="round" strokeLinejoin="round" d="M8 1.5v1m0 11v1m5.5-6.5h1m-11 0h1m4.5-4.5L9 4m-1 7l1 1M4 4l1 1m7 7l1 1"></path>
          <circle cx="8" cy="8" r="3" stroke="#F8F8F8" strokeLinecap="round" strokeLinejoin="round"></circle>
        </svg>
      ),
      title: language === 'en' ? 'Security & Protection' : 'الأمان والحماية',
      description: language === 'en' 
        ? 'Bank-level security with insurance protection for your investments.'
        : 'أمان على مستوى البنوك مع حماية التأمين لاستثماراتك.'
    },
    {
      id: 5,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" fill="none">
          <path stroke="#F8F8F8" strokeLinecap="round" strokeLinejoin="round" d="M1 7h16m-8-6v12M5 1v2m8-2v2M3 13h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z"></path>
        </svg>
      ),
      title: language === 'en' ? 'Performance Analytics' : 'تحليلات الأداء',
      description: language === 'en' 
        ? 'Detailed insights and analytics to track your portfolio performance.'
        : 'رؤى مفصلة وتحليلات لتتبع أداء محفظتك الاستثمارية.'
    },
    {
      id: 6,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="18" fill="none">
          <path stroke="#F8F8F8" strokeLinecap="round" strokeLinejoin="round" d="M3 1h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z"></path>
          <path stroke="#F8F8F8" strokeLinecap="round" strokeLinejoin="round" d="M6 14h.01"></path>
        </svg>
      ),
      title: language === 'en' ? 'Mobile Access' : 'الوصول المحمول',
      description: language === 'en' 
        ? 'Manage your investments anywhere with our mobile app.'
        : 'أدر استثماراتك في أي مكان باستخدام تطبيقنا المحمول.'
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
        <div className="flex w-full gap-16 px-8 lg:px-0 flex-col justify-between lg:flex-row lg:gap-0">
          <h2 
            className="text-4xl lg:text-6xl font-bold max-w-2xl text-balance leading-tight"
            style={{
              WebkitTextFillColor: 'transparent',
              backgroundImage: 'linear-gradient(174deg, #25dff9, #21ff94)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text'
            }}
          >
            {language === 'en' ? (
              <>
                Crafted & Shipped.
              </>
            ) : (
              <>
                صُنع وشُحن.
              </>
            )}
          </h2>
          
          <div className="text-white flex flex-col gap-12 items-start lg:w-[calc(45%-1.5rem)] lg:mt-3">
            <div className="max-w-2xl text-pretty">
              <p className="opacity-70">
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
                className="relative w-3/4 h-3/4 overflow-hidden"
                style={{
                  willChange: 'transform',
                  contain: 'layout style paint'
                }}
              >
                <div 
                  className="flex w-full h-full"
                  style={{
                    transform: `translate3d(${currentFeature === 1 ? -100 : 0}%, 0, 0)`,
                    transition: 'transform 800ms cubic-bezier(0.4, 0, 0.2, 1)',
                    willChange: 'transform'
                  }}
                >
                  {/* Slide 1 - Default iPhone */}
                  <div className="flex-shrink-0 w-full h-full flex items-center justify-center">
                    <img 
                      src="/images/iphone.png"
                      alt="iPhone Portfolio Default"
                      className="w-full h-full object-contain transition-all duration-[800ms]"
                      style={{
                        opacity: currentFeature === 1 ? 0.2 : 1,
                        transform: currentFeature === 1 ? 'scale(0.85)' : 'scale(1)',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
                      }}
                    />
                  </div>
                  
                  {/* Slide 2 - Feature iPhone */}
                  <div className="flex-shrink-0 w-full h-full flex items-center justify-center">
                    <img 
                      src="/images/iphone2.png"
                      alt="iPhone Portfolio Feature 2"
                      className="w-full h-full object-contain transition-all duration-[800ms]"
                      style={{
                        opacity: currentFeature === 1 ? 1 : 0,
                        transform: currentFeature === 1 ? 'scale(1)' : 'scale(0.8)',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
                      }}
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
                        <strong className="block mb-4 font-medium text-black text-lg">
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
    </section>
  );
}

export default Portfolio; 