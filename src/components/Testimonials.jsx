import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css'; // Import the CSS file

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Accept language prop
const TestimonialsComponent = ({ language }) => {
    const containerRef = useRef(null);
    const headingRef = useRef(null);
    const titleRef = useRef(null);
    const animatedSubtitleRef = useRef(null);
    const cardsContainerRef = useRef(null);
    const cardRefs = useRef([]);
    const clotheslineRef = useRef(null);
    const clotheslineOverlayRef = useRef(null);

    // Mock testimonials data
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            company: "TechFlow Inc.",
            image: "https://images.unsplash.com/photo-1494790108375-2616b612b786?w=150&h=150&fit=crop&crop=face",
            review: "This platform revolutionized our development workflow. The efficiency gains have been incredible!"
        },
        {
            id: 2,
            name: "Ahmed Hassan",
            company: "Innovation Labs",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            review: "Outstanding service and support. Our team productivity increased by 300% since implementation."
        },
        {
            id: 3,
            name: "Maria Rodriguez",
            company: "Digital Dynamics",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            review: "The best investment we've made in our tech stack. Seamless integration and fantastic results."
        },
        {
            id: 4,
            name: "David Chen",
            company: "StartupForge",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            review: "Game-changing solution! Our development cycles are now 50% faster with better quality."
        },
        {
            id: 5,
            name: "Emma Thompson",
            company: "CloudTech Solutions",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
            review: "Exceptional platform with intuitive design. Our entire team adopted it within days."
        },
        {
            id: 6,
            name: "Mohamed Ali",
            company: "NextGen Apps",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
            review: "Incredible performance boost! This tool has become essential to our daily operations."
        }
    ];

    const cardColors = [
        'bg-teal-100 dark:bg-teal-900',
        'bg-rose-100 dark:bg-rose-900',
        'bg-sky-100 dark:bg-sky-900',
        'bg-amber-100 dark:bg-amber-900',
        'bg-violet-100 dark:bg-violet-900',
        'bg-lime-100 dark:bg-lime-900'
    ];

    // Translations for static text
    const translations = {
        en: {
            heading: "What Our Clients Say",
            subheading: "Real feedback from developers who transformed their workflow"
        },
        ar: {
            heading: "آراء عملائنا",
            subheading: "تعليقات حقيقية من المطورين الذين غيروا طريقة عملهم"
        }
    };

    const currentTexts = translations[language] || translations.en;

    useEffect(() => {
        const ctx = gsap.context(() => {
            // GSAP ScrollTrigger for title character animation
            if (titleRef.current) {
                const titleElement = titleRef.current;
                const text = currentTexts.heading;
                
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
                    charElement.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(220, 220, 220, 0.8) 100%)';
                    charElement.style.webkitBackgroundClip = 'text';
                    charElement.style.backgroundClip = 'text';
                    charElement.style.webkitTextFillColor = 'transparent';
                    charElement.style.color = 'transparent';
                    charElement.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.2)';
                    charElement.style.transform = 'translateY(100%)';
                    
                    charWrapper.appendChild(charElement);
                    titleElement.appendChild(charWrapper);
                    
                    return charElement;
                });

                // Create timeline for character animations
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: cardsContainerRef.current,
                        start: "top 90%",
                        end: "top 50%",
                        scrub: 0.3,
                        invalidateOnRefresh: true
                    }
                });

                // Animate each character with stagger
                chars.forEach((char, index) => {
                    tl.to(char, {
                        y: 0,
                        duration: 0.1,
                        ease: "power2.out"
                    }, index * 0.01);
                });
            }

            // Subtitle animation
            if (animatedSubtitleRef.current) {
                // Apply gradient styling to the subtitle
                const subtitleElement = animatedSubtitleRef.current;
                subtitleElement.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(220, 220, 220, 0.8) 100%)';
                subtitleElement.style.webkitBackgroundClip = 'text';
                subtitleElement.style.backgroundClip = 'text';
                subtitleElement.style.color = 'transparent';
                subtitleElement.style.webkitTextFillColor = 'transparent';
                
                // Set initial state - text hidden below the container
                gsap.set(subtitleElement, {
                    y: '100%',
                    opacity: 1
                });
                
                // Animate subtitle on scroll - move up to reveal
                gsap.to(subtitleElement, {
                    y: '0%',
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: cardsContainerRef.current,
                        start: "top 85%",
                        end: "top 45%",
                        scrub: 0.3
                    }
                });
            }

            const rotators = cardRefs.current;
            if (!rotators || rotators.length === 0) return;

            const container = cardsContainerRef.current;
            const triggerElement = containerRef.current;

            ScrollTrigger.create({
                trigger: triggerElement,
                start: 'top top',
                end: 'bottom bottom',
                pin: container,
            });

            gsap.fromTo(rotators, {
                x: '100vw',
                rotation: -10,
            }, {
                x: '-100vw',
                rotation: 10,
                ease: 'power2.inOut',
                stagger: {
                    amount: 0.2
                },
                scrollTrigger: {
                    trigger: triggerElement,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,
                }
            });
            
            gsap.from(container, {
                opacity: 0,
                duration: 1,
                ease: 'power3.inOut',
                scrollTrigger: {
                    trigger: triggerElement,
                    start: 'top 50%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Animate clothesline expanding from right center
            gsap.fromTo([clotheslineRef.current, clotheslineOverlayRef.current], {
                scaleX: 0,
            }, {
                scaleX: 1,
                duration: 1.5,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: triggerElement,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, [language]);

    return (
        <section 
            ref={containerRef}
            className="testimonials-futuristic relative py-24 md:py-32 overflow-visible"
        >
            <div className="container mx-auto px-4 relative z-20 overflow-visible">
                {/* Header */}
                <div ref={headingRef} className="text-center mb-20">
                    <h2 
                        ref={titleRef}
                        className="text-h1 font-extrabold -tracking-tight font-mona mb-6"
                        style={{ 
                            fontWeight: 700,
                            overflow: 'hidden'
                        }}
                    >
                        {currentTexts.heading}
                    </h2>
                    <div 
                        className="flex justify-center w-full"
                        style={{
                            overflow: 'hidden' // This creates the mask effect
                        }}
                    >
                        <p 
                            ref={animatedSubtitleRef}
                            className="text-xl max-w-2xl text-center"
                            style={{
                                margin: 0,
                                lineHeight: '1.6'
                            }}
                        >
                            {currentTexts.subheading}
                        </p>
                    </div>
                </div>

                {/* Testimonial Cards Container */}
                <div className="testimonials-cards-container relative h-[1400px] md:h-[1300px] overflow-visible">
                    {/* Clothesline */}
                    <div className="absolute top-[300px] -left-20 -right-20 z-0 overflow-visible">
                        <div ref={clotheslineRef} className="w-full h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent shadow-lg" style={{ transformOrigin: 'right center', scaleX: 0 }}></div>
                        {/* Rope texture overlay */}
                        <div ref={clotheslineOverlayRef} className="absolute inset-0 w-full h-1 opacity-30 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700" style={{ transformOrigin: 'right center', scaleX: 0 }}></div>
                    </div>
                    
                    <div 
                        ref={cardsContainerRef}
                        className="relative w-full h-full z-10 pt-[100px] pb-[100px] overflow-visible"
                    >
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                ref={el => cardRefs.current[index] = el}
                                className="testimonial-rotator absolute top-[50%] left-1/2"
                                style={{ 
                                    transform: 'translateX(-50%)',
                                    top: '42%',
                                    marginTop: '-16rem' // Position cards closer to the clothesline
                                }}
                            >
                                {/* Clothes Pegs */}
                                <div className="absolute -top-[40px] left-0 transform -translate-x-1/2 z-20">
                                    <div className="flex space-x-4">
                                        {/* Left Peg */}
                                        <div className="relative">
                                            <div className="w-4 h-12 bg-amber-700 rounded-t-lg shadow-md"></div>
                                            <div className="absolute top-3 left-1 w-2 h-2 bg-amber-800 rounded-full"></div>
                                            <div className="absolute bottom-0 left-0.5 w-3 h-2 bg-amber-600 rounded-b-md"></div>
                                            {/* Clamping fingers */}
                                            <div className="absolute -bottom-1 left-0 w-1.5 h-8 bg-amber-800 rounded-bl-md"></div>
                                            <div className="absolute -bottom-1 right-0 w-1.5 h-8 bg-amber-800 rounded-br-md"></div>
                                        </div>
                                        {/* Right Peg */}
                                        <div className="relative">
                                            <div className="w-4 h-12 bg-amber-700 rounded-t-lg shadow-md"></div>
                                            <div className="absolute top-3 left-1 w-2 h-2 bg-amber-800 rounded-full"></div>
                                            <div className="absolute bottom-0 left-0.5 w-3 h-2 bg-amber-600 rounded-b-md"></div>
                                            {/* Clamping fingers */}
                                            <div className="absolute -bottom-1 left-0 w-1.5 h-8 bg-amber-800 rounded-bl-md"></div>
                                            <div className="absolute -bottom-1 right-0 w-1.5 h-8 bg-amber-800 rounded-br-md"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div
                                    className={`testimonial-card w-80 md:w-96 h-[28rem] md:h-[32rem] flex flex-col justify-center rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 ${cardColors[index % cardColors.length]}`}
                                    style={{ 
                                        transform: 'translateX(-50%)',
                                        position: 'relative',
                                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 255, 255, 0.05)'
                                    }}
                                >
                                    {/* User Image */}
                                    <div className="flex justify-center mb-6">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Review Text */}
                                    <blockquote className="text-center mb-6 italic text-2xl leading-relaxed font-mono relative" style={{ letterSpacing: '-0.02em' }}>
                                        "{testimonial.review}"
                                    </blockquote>

                                    {/* User Info */}
                                    <div className="text-center">
                                        <h4 className="font-bold text-gray-900 dark:text-white text-2xl mb-1" style={{ fontFamily: 'Mona Sans, sans-serif' }}>
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-400 font-medium font-mono">
                                            {testimonial.company}
                                        </p>
                                    </div>

                                    {/* Decorative Elements */}
                                    <div className="quote-icon absolute top-4 left-4">
                                        <svg width="80" height="80" viewBox="0 0 512.5 512.5" className="quote-svg">
                                            <defs>
                                                <linearGradient id={`quoteGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="rgb(156, 163, 175)" stopOpacity="0" />
                                                    <stop offset="20%" stopColor="rgb(156, 163, 175)" stopOpacity="0.05" />
                                                    <stop offset="40%" stopColor="rgb(156, 163, 175)" stopOpacity="0.15" />
                                                    <stop offset="60%" stopColor="rgb(156, 163, 175)" stopOpacity="0.20" />
                                                    <stop offset="80%" stopColor="rgb(156, 163, 175)" stopOpacity="0.25" />
                                                    <stop offset="100%" stopColor="rgb(156, 163, 175)" stopOpacity="0.05" />
                                                </linearGradient>
                                                <linearGradient id={`quoteGradientDark-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="rgb(209, 213, 219)" stopOpacity="0" />
                                                    <stop offset="20%" stopColor="rgb(209, 213, 219)" stopOpacity="0.05" />
                                                    <stop offset="40%" stopColor="rgb(209, 213, 219)" stopOpacity="0.15" />
                                                    <stop offset="60%" stopColor="rgb(209, 213, 219)" stopOpacity="0.20" />
                                                    <stop offset="80%" stopColor="rgb(209, 213, 219)" stopOpacity="0.25" />
                                                    <stop offset="100%" stopColor="rgb(209, 213, 219)" stopOpacity="0.05" />
                                                </linearGradient>
                                            </defs>
                                            <path 
                                                d="M112.5,208.25c61.856,0,112,50.145,112,112s-50.144,112-112,112s-112-50.145-112-112l-0.5-16 c0-123.712,100.288-224,224-224v64c-42.737,0-82.917,16.643-113.137,46.863c-5.817,5.818-11.126,12.008-15.915,18.51 C100.667,208.723,106.528,208.25,112.5,208.25z M400.5,208.25c61.855,0,112,50.145,112,112s-50.145,112-112,112 s-112-50.145-112-112l-0.5-16c0-123.712,100.287-224,224-224v64c-42.736,0-82.918,16.643-113.137,46.863 c-5.818,5.818-11.127,12.008-15.916,18.51C388.666,208.723,394.527,208.25,400.5,208.25z"
                                                fill={`url(#quoteGradient-${index})`}
                                                className="quote-path light-mode-quote"
                                            />
                                            <path 
                                                d="M112.5,208.25c61.856,0,112,50.145,112,112s-50.144,112-112,112s-112-50.145-112-112l-0.5-16 c0-123.712,100.288-224,224-224v64c-42.737,0-82.917,16.643-113.137,46.863c-5.817,5.818-11.126,12.008-15.915,18.51 C100.667,208.723,106.528,208.25,112.5,208.25z M400.5,208.25c61.855,0,112,50.145,112,112s-50.145,112-112,112 s-112-50.145-112-112l-0.5-16c0-123.712,100.287-224,224-224v64c-42.736,0-82.918,16.643-113.137,46.863 c-5.818,5.818-11.127,12.008-15.916,18.51C388.666,208.723,394.527,208.25,400.5,208.25z"
                                                fill={`url(#quoteGradientDark-${index})`}
                                                className="quote-path dark-mode-quote"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsComponent;
