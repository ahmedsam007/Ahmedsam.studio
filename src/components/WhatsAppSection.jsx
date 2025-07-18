import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingIndicator from './LoadingIndicator';
import AnimatedTitle from './AnimatedTitle';
import AnimatedSubtitle from './AnimatedSubtitle';

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
    const greenContainerRef = useRef(null);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [showMeetingPopup, setShowMeetingPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [meetingForm, setMeetingForm] = useState({
        clientName: '',
        meetingDate: '',
        meetingTime: '',
        message: ''
    });

    // Translations
    const translations = {
        en: {
            staticText: "Let's discuss your",
            words: ['project', 'ideas', 'goals', 'success', 'vision'],
            subtitle: 'Ready to transform your business? Start the conversation today.',
            whatsappButton: 'Chat on WhatsApp',
            meetingButton: 'Schedule Meeting',
            popupTitle: 'Schedule a Meeting',
            popupSubtitle: 'Book a 1-hour consultation session',
            clientNameLabel: 'Full Name',
            clientNamePlaceholder: 'Enter your full name',
            dateLabel: 'Meeting Date',
            timeLabel: 'Meeting Time',
            messageLabel: 'Message (Optional)',
            messagePlaceholder: 'Tell me about your project...',
            cancelButton: 'Cancel',
            scheduleButton: 'Schedule Meeting',
            successTitle: 'Success!',
            successMessage: 'Meeting request sent successfully!',
            successSubtitle: 'Your meeting request has been sent via WhatsApp. We\'ll get back to you soon.',
            successButton: 'Close',
            errorMessage: 'Please fill in all required fields'
        },
        ar: {
            staticText: 'دعنا نناقش',
            words: ['مشروعك', 'أفكارك', 'أهدافك', 'نجاحك', 'رؤيتك'],
            subtitle: 'هل أنت مستعد لتحويل عملك؟ ابدأ المحادثة اليوم.',
            whatsappButton: 'محادثة عبر واتساب',
            meetingButton: 'جدولة اجتماع',
            popupTitle: 'جدولة اجتماع',
            popupSubtitle: 'احجز جلسة استشارة لمدة ساعة واحدة',
            clientNameLabel: 'الاسم الكامل',
            clientNamePlaceholder: 'أدخل اسمك الكامل',
            dateLabel: 'تاريخ الاجتماع',
            timeLabel: 'وقت الاجتماع',
            messageLabel: 'رسالة (اختياري)',
            messagePlaceholder: 'أخبرني عن مشروعك...',
            cancelButton: 'إلغاء',
            scheduleButton: 'جدولة اجتماع',
            successTitle: 'تم بنجاح!',
            successMessage: 'تم إرسال طلب الاجتماع بنجاح!',
            successSubtitle: 'تم إرسال طلب الاجتماع عبر الواتساب. سنعاود الاتصال بك قريباً.',
            successButton: 'إغلاق',
            errorMessage: 'يرجى ملء جميع الحقول المطلوبة'
        }
    };

    const currentTexts = translations[language] || translations.en;

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMeetingForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle meeting form submission
    const handleMeetingSubmit = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!meetingForm.clientName || !meetingForm.meetingDate || !meetingForm.meetingTime) {
            alert(currentTexts.errorMessage);
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate form processing delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Format the meeting details message
            const meetingMessage = `NEW MEETING REQUEST

Client: ${meetingForm.clientName}
Date: ${meetingForm.meetingDate}
Time: ${meetingForm.meetingTime}
Duration: 1 hour

${meetingForm.message ? `Message: ${meetingForm.message}` : ''}

Please confirm this meeting schedule.`;

            // Your WhatsApp number (replace with your actual number)
            const yourWhatsAppNumber = '972598702740'; // Replace with your WhatsApp number (without + sign)
            
            // Create WhatsApp link to send message to you
            const whatsappLink = `https://wa.me/${yourWhatsAppNumber}?text=${encodeURIComponent(meetingMessage)}`;
            
            // Open WhatsApp with the meeting details
            window.open(whatsappLink, '_blank');
            
            // Show success message
            setShowMeetingPopup(false);
            setShowSuccessPopup(true);
            
            // Reset form
            setMeetingForm({
                clientName: '',
                meetingDate: '',
                meetingTime: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Get minimum date (today)
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    // Generate time slots for business hours (9 AM to 6 PM)
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 9; hour <= 17; hour++) {
            const time24 = `${hour.toString().padStart(2, '0')}:00`;
            const time12 = hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`;
            slots.push({ value: time24, label: time12 });
        }
        return slots;
    };

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
        <>
            <style jsx global>{`
                @property --angle {
                    syntax: "<angle>";
                    initial-value: 0deg;
                    inherits: false;
                }

                @keyframes breathe {
                    0%, 100% { 
                        transform: scale(1); 
                        opacity: 0.9;
                    }
                    50% { 
                        transform: scale(1.02); 
                        opacity: 1;
                    }
                }

                @keyframes glow-pulse {
                    0%, 100% { 
                        opacity: 0.9;
                    }
                    50% { 
                        opacity: 1;
                    }
                }

                .glow-card {
                    position: relative;
                    border-radius: 1rem;
                    background: transparent;
                    padding: 0;
                    z-index: 5;
                }

                .glow-card-inner {
                    position: relative;
                    border-radius: 1rem;
                    background: #10291a;
                    border: 2px solid #22c55e;
                    padding: 1rem 2.5rem;
                    margin: 0.25rem;
                    z-index: 10;
                    width: calc(100% - 0.5rem);
                    min-height: calc(100% - 0.5rem);
                    display: block;
                }

                @media (min-width: 768px) {
                    .glow-card-inner {
                        padding: 2.5rem;
                    }
                }

                .glow-card::before,
                .glow-card::after {
                    content: '';
                    position: absolute;
                    inset: -1rem;
                    z-index: -1;
                    border-radius: 1.5rem;
                    background: linear-gradient(var(--angle), 
                        #39ff14,    /* Neon green */
#39ff14,    /* Deep navy */
                        #39ff14,    /* Mint */
                        #39ff14,    /* Electric blue */
                        #40e0d0,    /* Purple */
                        #40e0d0,    /* Coral */
#40e0d0     /* Back to neon green for smooth loop */
                    );
                    animation: rotate-border 8s linear infinite;
                }

                .glow-card::after {
                    filter: blur(24px);
                    opacity: 0.8;
                }

                @keyframes rotate-border {
                    0% { --angle: 0deg; }
                    100% { --angle: 360deg; }
                }
                







                
                                    /* Custom styling for date input calendar icon */
                    input[type="date"] {
                        color-scheme: dark;
                        background-color: #0d1f13;
                    }
                    
                    input[type="date"]::-webkit-calendar-picker-indicator {
                        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3e%3c/rect%3e%3cline x1='16' y1='2' x2='16' y2='6'%3e%3c/line%3e%3cline x1='8' y1='2' x2='8' y2='6'%3e%3c/line%3e%3cline x1='3' y1='10' x2='21' y2='10'%3e%3c/line%3e%3c/svg%3e");
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: 18px 18px;
                        cursor: pointer;
                        width: 24px;
                        height: 24px;
                    }
                    
                    input[type="date"]::-webkit-inner-spin-button,
                    input[type="date"]::-webkit-clear-button {
                        display: none;
                    }
                    
                    /* Custom styling for select dropdown arrow */
                    select {
                        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
                        background-repeat: no-repeat;
                        background-position: right 18px center;
                        background-size: 16px 16px;
                        padding-right: 40px;
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;
                    }
                    
                    /* Popup title font styling */
                    .popup-title {
                        font-family: 'Mona Sans', sans-serif;
                    }

                    /* Logo gradient animation */
                    .animate-gradient-logo {
                        filter: hue-rotate(0deg);
                        animation: gradientShift 4s ease-in-out infinite;
                    }

                    @keyframes gradientShift {
                        0% { filter: hue-rotate(0deg) brightness(1) saturate(1); }
                        25% { filter: hue-rotate(90deg) brightness(1.1) saturate(1.2); }
                        50% { filter: hue-rotate(180deg) brightness(1.2) saturate(1.4); }
                        75% { filter: hue-rotate(270deg) brightness(1.1) saturate(1.2); }
                        100% { filter: hue-rotate(360deg) brightness(1) saturate(1); }
                    }
            `}</style>
            <section 
                ref={sectionRef}
                className="relative min-h-screen pb-10"
                style={{ marginTop: '-140px', paddingTop: '160px' }}
            >
            {/* Animated Background Grid */}
            <div ref={gridRef} className="absolute inset-0 opacity-10 z-20">
                {createGridDots()}
            </div>
            
            {/* Section Title - Same style as Certificate section */}
            <div className="container mx-auto px-4 relative z-30 flex flex-col gap-4 text-center max-w-[90vw] w-full mx-auto mb-16 md:mb-20">
                <AnimatedTitle 
                    text="Let's Work Together"
                    triggerRef={greenContainerRef}
                    className="text-h1 font-extrabold -tracking-tight font-mona"
                    contextRef={sectionRef}
                    scrubValue={0.3}
                />
                <AnimatedSubtitle 
                    text="Get in touch to explore how we can collaborate and create something amazing together."
                    triggerRef={greenContainerRef}
                    className="text-body-lg font-mono !text-balance max-w-prose text-center"
                    contextRef={sectionRef}
                    scrubValue={0.3}
                />
            </div>
            
            <div className="container mx-auto px-4 relative z-30 flex justify-center items-center min-h-[70vh]">
                {/* Main Card Block */}
                <div ref={greenContainerRef} className="glow-card w-full max-w-5xl">
                    <div className="glow-card-inner">
                        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-6 relative">
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
                                        href="https://wa.me/972598702740"
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
                                        onClick={() => setShowMeetingPopup(true)}
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
                </div>
            </div>

            {/* Meeting Scheduling Popup */}
            {showMeetingPopup && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1a2f2a] rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border border-green-500/30">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-white popup-title">{currentTexts.popupTitle}</h3>
                                <p className="text-sm text-white/70">{currentTexts.popupSubtitle}</p>
                            </div>
                            <button
                                onClick={() => setShowMeetingPopup(false)}
                                className="text-white/60 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleMeetingSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    {currentTexts.clientNameLabel}
                                </label>
                                <input
                                    type="text"
                                    name="clientName"
                                    value={meetingForm.clientName}
                                    onChange={handleInputChange}
                                    placeholder={currentTexts.clientNamePlaceholder}
                                    className="w-full px-3 py-2 bg-[#0d1f13] border border-green-500/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                                    required
                                />
                            </div>



                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    {currentTexts.dateLabel}
                                </label>
                                <input
                                    type="date"
                                    name="meetingDate"
                                    value={meetingForm.meetingDate}
                                    onChange={handleInputChange}
                                    min={getMinDate()}
                                    className="w-full px-3 py-2 bg-[#0d1f13] border border-green-500/30 rounded-md text-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    {currentTexts.timeLabel}
                                </label>
                                <select
                                    name="meetingTime"
                                    value={meetingForm.meetingTime}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-[#0d1f13] border border-green-500/30 rounded-md text-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                                    required
                                >
                                    <option value="">Select time</option>
                                    {generateTimeSlots().map(slot => (
                                        <option key={slot.value} value={slot.value}>
                                            {slot.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    {currentTexts.messageLabel}
                                </label>
                                <textarea
                                    name="message"
                                    value={meetingForm.message}
                                    onChange={handleInputChange}
                                    placeholder={currentTexts.messagePlaceholder}
                                    rows="3"
                                    className="w-full px-3 py-2 bg-[#0d1f13] border border-green-500/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 resize-none"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowMeetingPopup(false)}
                                    className="flex-1 px-4 py-2 bg-transparent border border-white/30 text-white rounded-md hover:bg-white/10 transition-colors"
                                >
                                    {currentTexts.cancelButton}
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <LoadingIndicator 
                                                type="inline" 
                                                size="small" 
                                                darkMode={true}
                                            />
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        currentTexts.scheduleButton
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Success Popup - Modern 2025 Design */}
            {showSuccessPopup && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="relative bg-gradient-to-br from-green-400/20 to-emerald-600/20 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-green-400/30 shadow-2xl transform"
                         style={{
                             animation: 'breathe 3s ease-in-out infinite',
                             animationDelay: '0.5s'
                         }}>
                        {/* Glassmorphism Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                        
                        {/* Success Animation Ring */}
                        <div className="relative z-10 flex flex-col items-center text-center">
                            {/* Animated Success Icon */}
                            <div className="mb-6 relative">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                                    <svg className="w-10 h-10 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                {/* Ripple Effect */}
                                <div className="absolute inset-0 w-20 h-20 bg-green-400/30 rounded-full animate-ping"></div>
                                <div className="absolute inset-0 w-20 h-20 bg-green-400/20 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                            </div>
                            
                            {/* Success Content */}
                            <h3 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-green-300 to-emerald-200 bg-clip-text text-transparent popup-title">
                                {currentTexts.successTitle}
                            </h3>
                            <p className="text-lg font-semibold text-white/90 mb-2">
                                {currentTexts.successMessage}
                            </p>
                            <p className="text-sm text-white/70 mb-6 leading-relaxed">
                                {currentTexts.successSubtitle}
                            </p>
                            
                            {/* Modern Button */}
                            <button
                                onClick={() => setShowSuccessPopup(false)}
                                className="relative px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-green-400/50"
                            >
                                <span className="relative z-10">{currentTexts.successButton}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                            
                            {/* Floating Particles - Changed to + signs */}
                            <div className="absolute top-4 left-4 w-4 h-4 text-green-300 flex items-center justify-center font-bold text-lg">+</div>
                            <div className="absolute top-4 right-4 w-4 h-4 text-emerald-300 flex items-center justify-center font-bold text-lg">+</div>
                            <div className="absolute bottom-4 left-4 w-4 h-4 text-green-400 flex items-center justify-center font-bold text-lg">+</div>
                            <div className="absolute bottom-4 right-4 w-4 h-4 text-emerald-400 flex items-center justify-center font-bold text-lg">+</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer merged here */}
            {showFooter && (
              <footer className="text-neutral-100 py-16 relative z-40 mt-24" style={{background: 'transparent'}}>
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
                  {/* Left: Logo and Legal Links */}
                  <div className="flex flex-col items-start gap-4">
                                         {/* Logo */}
                     <div className="mb-2">
                       <img 
                         src="/images/icons/Ahmedsam_logo.svg" 
                         alt="Ahmed Sam Logo" 
                         className="h-10 w-auto animate-gradient-logo"
                         style={{ maxWidth: '200px' }}
                       />
                     </div>
                    {/* Legal Links */}
                    <div className="flex flex-wrap gap-6 text-sm font-medium">
                      {legalLinks.map(link => (
                        <a key={link.label} href={link.href} className="hover:underline opacity-90 hover:opacity-100 transition-opacity">
                          {link.label}
                        </a>
                      ))}
                    </div>
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
        </>
    );
};

export default WhatsAppSection; 