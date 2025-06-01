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
    const cardsRef = useRef([]);
    const floatingElementsRef = useRef([]);
    
    // Define testimonial data with translations
    // !! IMPORTANT: Replace placeholder [Arabic...] strings with actual translations !!
    const testimonialsData = [
        {
            quote: {
                en: "Cursor is at least a 2x improvement over Copilot. It's amazing having an AI pair programmer, and is an incredible accelerator for me and my team.",
                ar: "كيرسور أفضل بمرتين على الأقل من كوبايلوت. من المدهش وجود مبرمج زوجي يعمل بالذكاء الاصطناعي، وهو مسرع لا يصدق لي ولفريقي."
            },
            imgSrc: "https://picsum.photos/seed/ben_bernard/60/60",
            alt: "Ben Bernard",
            name: { en: "Ben Bernard", ar: "بن برنارد" },
            company: { en: "Instacart", ar: "انستاكارت" },
            rating: 5
        },
        {
            quote: {
                en: "Cursor is awesome! Someone finally put GPT into a code editor in a seamless way. It's so elegant and easy. No more copying and pasting.",
                ar: "كيرسور رائع! أخيراً قام شخص ما بدمج GPT في محرر أكواد بطريقة سلسة. إنه أنيق وسهل للغاية. لا مزيد من النسخ واللصق."
            },
            imgSrc: "https://picsum.photos/seed/andrew_mccalip/60/60",
            alt: "Andrew McCalip",
            name: { en: "Andrew McCalip", ar: "أندرو ماكاليب" },
            company: { en: "Varda", ar: "فاردا" },
            rating: 5
        },
        {
            quote: {
                en: "I went from never hearing about Cursor to many IC engineers telling me it's their new favorite tool. Seemingly overnight!",
                ar: "انتقلت من عدم السماع عن كيرسور أبداً إلى سماع العديد من المهندسين يخبرونني أنه أداتهم المفضلة الجديدة."
            },
            imgSrc: "https://picsum.photos/seed/josh_miller/60/60",
            alt: "Josh Miller",
            name: { en: "Josh Miller", ar: "جوش ميلر" },
            company: { en: "The Browser Company", ar: "شركة المتصفح" },
            rating: 5
        },
        {
            quote: {
                en: "The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what I want to do.",
                ar: "إكمال التاب في كيرسور أثناء البرمجة يكون أحيانًا سحريًا لدرجة تتحدى الواقع - حوالي 25% من الوقت يتوقع بالضبط ما أريد القيام به."
            },
            imgSrc: "https://picsum.photos/seed/kevin_whinnery/60/60",
            alt: "Kevin Whinnery",
            name: { en: "Kevin Whinnery", ar: "كيفن وينري" },
            company: { en: "OpenAI", ar: "أوبن إيه آي" },
            rating: 5
        },
        {
            quote: {
                en: "Cursor is hands down my biggest workflow improvement in years",
                ar: "كيرسور هو بلا شك أكبر تحسين لسير عملي منذ سنوات."
            },
            imgSrc: "https://picsum.photos/seed/sawyer_hood/60/60",
            alt: "Sawyer Hood",
            name: { en: "Sawyer Hood", ar: "سوير هود" },
            company: { en: "Figma", ar: "فيجما" },
            rating: 5
        },
        {
            quote: {
                en: "Started using Cursor yesterday & i'm blown away. it's how Copilot should feel. i'm completely off VSCode now.",
                ar: "بدأت استخدام كيرسور بالأمس وأنا منبهر. هكذا يجب أن يكون كوبايلوت. لقد توقفت تمامًا عن استخدام VSCode الآن."
            },
            imgSrc: "https://picsum.photos/seed/sam_whitmore/60/60",
            alt: "Sam Whitmore",
            name: { en: "Sam Whitmore", ar: "سام ويتمور" },
            company: { en: "New Computer", ar: "نيو كمبيوتر" },
            rating: 5
        }
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
            // Animate heading
            gsap.fromTo(headingRef.current, 
                { 
                    opacity: 0, 
                    y: 50,
                    scale: 0.9
                },
                { 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // Animate cards with staggered 3D effect
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.set(card, {
                        rotationX: 15,
                        rotationY: 0,
                        z: -100,
                        opacity: 0
                    });

                    gsap.to(card, {
                        rotationX: 0,
                        rotationY: 0,
                        z: 0,
                        opacity: 1,
                        duration: 1.5,
                        delay: index * 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    });

                    // Hover animations
                    card.addEventListener('mouseenter', () => {
                        gsap.to(card, {
                            rotationY: 5,
                            rotationX: -5,
                            z: 50,
                            scale: 1.05,
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    });

                    card.addEventListener('mouseleave', () => {
                        gsap.to(card, {
                            rotationY: 0,
                            rotationX: 0,
                            z: 0,
                            scale: 1,
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    });
                }
            });

            // Floating elements animation
            floatingElementsRef.current.forEach((element, index) => {
                if (element) {
                    gsap.to(element, {
                        y: "random(-30, 30)",
                        x: "random(-20, 20)",
                        rotation: "random(-180, 180)",
                        duration: "random(4, 8)",
                        repeat: -1,
                        yoyo: true,
                        ease: "power1.inOut",
                        delay: index * 0.5
                    });
                }
            });

            // Continuous scroll animation for background elements
            gsap.to(".testimonials-bg-element", {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: "none"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <div
                key={i}
                className={`star ${i < rating ? 'filled' : ''}`}
            >
                ★
            </div>
        ));
    };

    return (
        <section 
            ref={containerRef}
            className="testimonials-futuristic relative py-24 md:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800 overflow-hidden"
        >
            {/* Floating background elements */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        ref={el => floatingElementsRef.current[i] = el}
                        className="testimonials-bg-element absolute opacity-10 dark:opacity-5"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `scale(${0.5 + Math.random() * 0.5})`
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div ref={headingRef} className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent mb-6">
                        {currentTexts.heading}
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {currentTexts.subheading}
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="testimonials-grid">
                    {testimonialsData.map((testimonial, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="testimonial-card-futuristic group"
                        >
                            {/* Card Inner */}
                            <div className="testimonial-card-inner">
                                {/* Rating Stars */}
                                <div className="rating-stars mb-6">
                                    {renderStars(testimonial.rating)}
                                </div>

                                {/* Quote */}
                                <blockquote className="quote-text mb-8">
                                    "{testimonial.quote[language] || testimonial.quote.en}"
                                </blockquote>

                                {/* Author */}
                                <div className="author-section">
                                    <div className="author-avatar">
                                        <img
                                            src={testimonial.imgSrc}
                                            alt={testimonial.alt}
                                            loading="lazy"
                                        />
                                        <div className="avatar-glow"></div>
                                    </div>
                                    <div className="author-details">
                                        <h4 className="author-name">
                                            {testimonial.name[language] || testimonial.name.en}
                                        </h4>
                                        <p className="author-company">
                                            {testimonial.company[language] || testimonial.company.en}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Glow Effect */}
                            <div className="card-glow"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsComponent;
