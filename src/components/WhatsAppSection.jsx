import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const legalLinks = [
  { label: 'Cookies Policy', href: '#' },
  { label: 'Legal Terms', href: '#' },
  { label: 'Privacy Policy', href: '#' },
];

const connectLinks = [
  { label: 'Behance', href: '#' },
  { label: 'X(Twitter)', href: '#' },
  { label: 'Linkedin', href: '#' },
  { label: 'Dribbble', href: '#' },
  { label: 'Upwork', href: '#' },
  { label: 'Mostaql', href: '#' },
];

const WhatsAppSection = ({ language = 'en', showFooter = false }) => {
    const sectionRef = useRef(null);
    const badgeRef = useRef(null);
    const textContainerRef = useRef(null);
    const gridRef = useRef(null);
    const buttonsRef = useRef(null);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Translations
    const translations = {
        en: {
            staticText: "Let's discuss your",
            words: ['project', 'ideas', 'goals', 'success', 'vision'],
            subtitle: 'Ready to transform your business? Start the conversation today.',
            whatsappButton: 'Chat on WhatsApp',
            meetingButton: 'Schedule Meeting'
        },
        ar: {
            staticText: 'دعنا نناقش',
            words: ['مشروعك', 'أفكارك', 'أهدافك', 'نجاحك', 'رؤيتك'],
            subtitle: 'هل أنت مستعد لتحويل عملك؟ ابدأ المحادثة اليوم.',
            whatsappButton: 'محادثة عبر واتساب',
            meetingButton: 'جدولة اجتماع'
        }
    };

    const currentTexts = translations[language] || translations.en;

    // Typewriter effect
    useEffect(() => {
        const words = currentTexts.words;
        const currentWord = words[currentWordIndex];
        const typingSpeed = 150;
        const deletingSpeed = 100;
        const pauseTime = 2000;

        const type = () => {
            if (isDeleting) {
                setDisplayText(currentWord.substring(0, displayText.length - 1));
                if (displayText === '') {
                    setIsDeleting(false);
                    setCurrentWordIndex((prevIndex) => 
                        prevIndex === words.length - 1 ? 0 : prevIndex + 1
                    );
                }
            } else {
                setDisplayText(currentWord.substring(0, displayText.length + 1));
                if (displayText === currentWord) {
                    setTimeout(() => setIsDeleting(true), pauseTime);
                    return;
                }
            }
        };

        const timeout = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentWordIndex, currentTexts.words]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Floating animation for badge
            gsap.to(badgeRef.current, {
                y: -20,
                duration: 2,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true
            });

            // Section entrance animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.fromTo(textContainerRef.current, 
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
            )
            .fromTo(badgeRef.current, 
                { opacity: 0, x: 50, scale: 0.8 },
                { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out" },
                "-=0.5"
            )
            .fromTo(buttonsRef.current, 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                "-=0.3"
            );

            // Grid animation
            const gridDots = gridRef.current.querySelectorAll('.grid-dot');
            gsap.fromTo(gridDots, 
                { opacity: 0, scale: 0 },
                { 
                    opacity: 0.2, 
                    scale: 1, 
                    duration: 0.5,
                    stagger: {
                        amount: 2,
                        from: "random"
                    },
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Create grid dots
    const createGridDots = () => {
        const dots = [];
        const spacing = 40;
        const cols = Math.ceil(window.innerWidth / spacing);
        const rows = Math.ceil(600 / spacing);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                dots.push(
                    <div
                        key={`${i}-${j}`}
                        className="grid-dot absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{
                            left: `${j * spacing}px`,
                            top: `${i * spacing}px`,
                        }}
                    />
                );
            }
        }
        return dots;
    };

    return (
        <section 
            ref={sectionRef}
            className="relative min-h-screen pt-24 md:pt-32 pb-10"
        >
            {/* Animated Background Grid */}
            <div ref={gridRef} className="absolute inset-0 opacity-10 z-20">
                {createGridDots()}
            </div>
            
            <div className="container mx-auto px-4 relative z-30 flex justify-center items-center min-h-[70vh]">
                {/* Main Card Block */}
                <div className="w-full max-w-5xl bg-[#10291a]/60 rounded-2xl flex flex-col lg:flex-row items-center justify-between p-4 md:p-10 gap-6 relative overflow-hidden border border-green-500/20"
                    style={{ boxShadow: '0 0 40px rgba(34, 197, 94, 0.05)' }}>
                    {/* Center Vertical Divider */}
                    <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 z-10 rounded"
                        style={{ width: '0.5px', backgroundColor: '#22c55e' }}></div>
                    {/* Left Side - Animated Text & Buttons */}
                    <div ref={textContainerRef} className="flex-1 basis-1/2 text-left lg:pr-10 flex flex-col h-full">
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                            {currentTexts.staticText}
                            <br />
                            <span className="relative inline-block">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200">
                                    {displayText}
                                </span>
                                    <span className="animate-pulse ml-1 text-green-300">|</span>
                            </span>
                        </h1>
                            <p className="text-base md:text-lg text-white/80 mb-6 max-w-md">
                            {currentTexts.subtitle}
                        </p>
                        </div>
                        {/* Action Buttons */}
                        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-2 mt-auto justify-start">
                            <a
                                href="https://wa.me/YOUR_PHONE_NUMBER"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-3 py-1.5 bg-white text-green-700 font-bold text-sm rounded-md hover:bg-green-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-1.5"
                            >
                                <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.888 3.685"/>
                                </svg>
                                {currentTexts.whatsappButton}
                            </a>
                            <button
                                onClick={() => {
                                    // Add your calendar booking logic here
                                    console.log('Schedule meeting clicked');
                                }}
                                className="group relative px-3 py-1.5 bg-transparent border-2 border-green-400 text-white font-bold text-sm rounded-md hover:bg-green-50 hover:text-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-1.5"
                            >
                                <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {currentTexts.meetingButton}
                            </button>
                        </div>
                    </div>
                    {/* Right Side - Floating Badge */}
                    <div className="flex-1 basis-1/2 flex items-center justify-center">
                        <div ref={badgeRef} className="relative flex items-center justify-center w-full h-full">
                            {/* Certificate Badge with Clipping Mask */}
                            <div className="w-[22rem] h-[22rem] md:w-[28rem] md:h-[28rem] flex items-center justify-center"
                                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)' }}>
                                <img 
                                    src="/images/badge.png" 
                                    alt="Certificate Badge" 
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer merged here */}
            {showFooter && (
              <footer className="text-neutral-100 py-16 relative z-40" style={{background: 'transparent'}}>
                {/* Dotted Divider with larger spacing */}
                <div
                  className="w-full mb-8"
                  style={{
                    borderTop: '2px dotted rgba(255, 255, 255, 0.3)',
                    borderTopStyle: 'dotted',
                    borderTopWidth: '2px',
                    borderImage: 'repeating-linear-gradient(to right, rgba(255, 255, 255, 0.3) 0 2px, transparent 1px 16px) 30',
                  }}
                ></div>
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                  {/* Left: Legal Links */}
                  <div className="flex flex-wrap gap-6 text-sm font-medium">
                    {legalLinks.map(link => (
                      <a key={link.label} href={link.href} className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                        {link.label}
                      </a>
                    ))}
                  </div>
                  {/* Right: Connect Text Links */}
                  <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                    <span className="font-semibold text-base mr-2">Connect:</span>
                    {connectLinks.map((link, idx) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-sm font-medium opacity-90 hover:opacity-100 transition-opacity"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </footer>
            )}
        </section>
    );
};

export default WhatsAppSection; 