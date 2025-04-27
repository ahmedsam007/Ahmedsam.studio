import React from 'react';
import './Testimonials.css'; // Import the CSS file

// Accept language prop
const TestimonialsComponent = ({ language }) => {
    // Define testimonial data with translations
    // !! IMPORTANT: Replace placeholder [Arabic...] strings with actual translations !!
    const testimonialsCol1 = [
        {
            quote: {
                en: "Cursor is at least a 2x improvement over Copilot. It's amazing having an AI pair programmer, and is an incredible accelerator for me and my team.",
                ar: "[كيرسور أفضل بمرتين على الأقل من كوبايلوت. من المدهش وجود مبرمج زوجي يعمل بالذكاء الاصطناعي، وهو مسرع لا يصدق لي ولفريقي.]"
            },
            imgSrc: "https://picsum.photos/seed/ben_bernard/40/40",
            alt: "Ben Bernard",
            name: { en: "Ben Bernard", ar: "[بن برنارد]" },
            company: { en: "Instacart", ar: "[انستاكارت]" }
        },
        {
            quote: {
                en: "Cursor is awesome! Someone finally put GPT into a code editor in a seamless way. It's so elegant and easy. No more copying and pasting. I'm an hour in and already hooked.",
                ar: "[كيرسور رائع! أخيراً قام شخص ما بدمج GPT في محرر أكواد بطريقة سلسة. إنه أنيق وسهل للغاية. لا مزيد من النسخ واللصق. لقد استخدمته لساعة واحدة وأنا مدمن عليه بالفعل.]"
            },
            imgSrc: "https://picsum.photos/seed/andrew_mccalip/40/40",
            alt: "Andrew McCalip",
            name: { en: "Andrew McCalip", ar: "[أندرو ماكاليب]" },
            company: { en: "Varda", ar: "[فاردا]" }
        },
        {
            quote: {
                en: "I went from never hearing about Cursor to many IC engineers telling me it's their new favorite tool. Seemingly overnight! Pretty wild product-market fit.",
                ar: "[انتقلت من عدم السماع عن كيرسور أبداً إلى سماع العديد من المهندسين يخبرونني أنه أداتهم المفضلة الجديدة. يبدو الأمر وكأنه حدث بين عشية وضحاها! توافق مذهل مع السوق.]"
            },
            imgSrc: "https://picsum.photos/seed/josh_miller/40/40",
            alt: "Josh Miller",
            name: { en: "Josh Miller", ar: "[جوش ميلر]" },
            company: { en: "The Browser Company", ar: "[شركة المتصفح]" }
        },
        {
            quote: {
                en: "Cursor is so good, and literally gets better/more feature-rich every couple of weeks.",
                ar: "[كيرسور جيد جداً، وحرفياً يصبح أفضل وأكثر ثراءً بالميزات كل أسبوعين.]"
            },
            imgSrc: "https://picsum.photos/seed/morgan_mcguire/40/40",
            alt: "Morgan McGuire",
            name: { en: "Morgan McGuire", ar: "[مورغان ماكغواير]" },
            company: { en: "Weights & Biases", ar: "[ويتس آند بايسز]" }
        },
    ];

    const testimonialsCol2 = [
         {
            quote: {
                en: "The Cursor tab completion while coding is occasionally so magic it defies reality - about ~25% of the time it is anticipating exactly what I want to do.",
                ar: "[إكمال التاب في كيرسور أثناء البرمجة يكون أحيانًا سحريًا لدرجة تتحدى الواقع - حوالي 25% من الوقت يتوقع بالضبط ما أريد القيام به.]"
            },
            imgSrc: "https://picsum.photos/seed/kevin_whinnery/40/40",
            alt: "Kevin Whinnery",
            name: { en: "Kevin Whinnery", ar: "[كيفن وينري]" },
            company: { en: "OpenAI", ar: "[أوبن إيه آي]" }
        },
        {
            quote: {
                en: "Cursor is the best AI developer tool right now, avoid it at your own peril",
                ar: "[كيرسور هو أفضل أداة مطور ذكاء اصطناعي في الوقت الحالي، تجنبها على مسؤوليتك الخاصة.]"
            },
            imgSrc: "https://picsum.photos/seed/logan_kilpatrick/40/40",
            alt: "Logan Kilpatrick",
            name: { en: "Logan Kilpatrick", ar: "[لوغان كيلباتريك]" },
            company: { en: "Google", ar: "[جوجل]" }
        },
        {
            quote: {
                en: "I installed Cursor ... oh",
                ar: "[لقد قمت بتثبيت كيرسور ... أوه]"
            },
            imgSrc: "https://picsum.photos/seed/kent_dodds/40/40",
            alt: "Kent C. Dodds",
            name: { en: "Kent C. Dodds", ar: "[كينت سي دودس]" },
            company: { en: "Internet", ar: "[إنترنت]" }
        },
        {
            quote: {
                en: "Cursor is the best product I've used in a while - it's an AI enabled editor. I just asked it to write a README for a project I've been working on - analyzed the code-base and worked first time.",
                ar: "[كيرسور هو أفضل منتج استخدمته منذ فترة - إنه محرر مدعوم بالذكاء الاصطناعي. لقد طلبت منه للتو كتابة ملف README لمشروع كنت أعمل عليه - قام بتحليل قاعدة الأكواد وعمل بشكل صحيح من المرة الأولى.]"
            },
            imgSrc: "https://picsum.photos/seed/alex_maccaw/40/40",
            alt: "Alex MacCaw",
            name: { en: "Alex MacCaw", ar: "[أليكس ماكاو]" },
            company: { en: "Reflect", ar: "[ريفلكت]" }
        },
    ];

     const testimonialsCol3 = [
        {
            quote: {
                en: "Cursor is hands down my biggest workflow improvement in years",
                ar: "[كيرسور هو بلا شك أكبر تحسين لسير عملي منذ سنوات.]"
            },
            imgSrc: "https://picsum.photos/seed/sawyer_hood/40/40",
            alt: "Sawyer Hood",
            name: { en: "Sawyer Hood", ar: "[سوير هود]" },
            company: { en: "Figma", ar: "[فيجما]" }
        },
        {
            quote: {
                en: "Started using Cursor yesterday & i'm blown away. it's how Copilot should feel. i'm completely off VSCode now.",
                ar: "[بدأت استخدام كيرسور بالأمس وأنا منبهر. هكذا يجب أن يكون كوبايلوت. لقد توقفت تمامًا عن استخدام VSCode الآن.]"
            },
            imgSrc: "https://picsum.photos/seed/sam_whitmore/40/40",
            alt: "Sam Whitmore",
            name: { en: "Sam Whitmore", ar: "[سام ويتمور]" },
            company: { en: "New Computer", ar: "[نيو كمبيوتر]" }
        },
        {
            quote: {
                en: "After many recommendations, I finally switched from VSC to Cursor and ... wow! It's absolutely incredible. If you like Copilot (or if you don't), you'll be blown away by Cursor.",
                ar: "[بعد العديد من التوصيات، تحولت أخيرًا من VSC إلى كيرسور و ... واو! إنه مدهش للغاية. إذا كنت تحب كوبايلوت (أو إذا لم تكن تحبه)، فسوف تنبهر بكيرسور.]"
            },
            imgSrc: "https://picsum.photos/seed/johannes_schickling/40/40",
            alt: "Johannes Schickling",
            name: { en: "Johannes Schickling", ar: "[يوهانس شيكلينغ]" },
            company: { en: "Prisma", ar: "[بريما]" }
        },
        {
            quote: {
                en: "I love writing code and Cursor is a necessity. Cursor is steps ahead of my brain, proposing multi-line edits so I type \"tab\" more than anything else.",
                ar: "[أنا أحب كتابة الأكواد وكيرسور ضرورة. كيرسور يسبق تفكيري بخطوات، يقترح تعديلات متعددة الأسطر لذا أضغط \"تاب\" أكثر من أي شيء آخر.]"
            },
            imgSrc: "https://picsum.photos/seed/andrew_milich/40/40",
            alt: "Andrew Milich",
            name: { en: "Andrew Milich", ar: "[أندرو ميليتش]" },
            company: { en: "Notion", ar: "[نوشن]" }
        },
    ];

    // Translations for static text
    const translations = {
        en: {
            heading: "Happy Clients, Stunning Designs",
            subheading: "Hear what businesses say about our UI/UX design services."
        },
        ar: {
            heading: "عملاء سعداء، تصميمات مذهلة",
            subheading: "استمع إلى ما تقوله الشركات عن خدمات تصميم واجهة المستخدم وتجربة المستخدم لدينا."
        }
    };

    // Get current language texts or default to English
    const currentTexts = translations[language] || translations.en;

    // Function to render a column with duplicated items for seamless scroll
    // Add direction parameter (default to 'up')
    const renderColumn = (testimonials, delay, direction = 'up') => (
        // Conditionally add the class based on direction
        <div 
            className={`testimonial-column ${direction === 'down' ? 'scroll-direction-down' : ''}`}
            style={{ '--animation-delay': `${delay}` }}
        >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
                // Use testimonial-card class and correct inner structure
                <div className="testimonial-card" key={`${delay}-testimonial-${index}`}> 
                    {/* Access translated quote, fallback to English */}
                    <p className="quote">{testimonial.quote[language] || testimonial.quote.en}</p>
                    {/* Use author-info class */}
                    <div className="author-info">
                        <img src={testimonial.imgSrc} alt={testimonial.alt} /> 
                        <div>
                            {/* Access translated name, fallback to English */}
                            <span className="name">{testimonial.name[language] || testimonial.name.en}</span>
                             {/* Access translated company, fallback to English */}
                            <span className="company">{testimonial.company[language] || testimonial.company.en}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <section className="testimonials">
            {/* Use translated text */}
            <h2>{currentTexts.heading}</h2>
            <p className="subtitle">{currentTexts.subheading}</p>

            <div className="testimonial-grid-container">
                 {/* Column 1 scrolls up (default) */}
                {renderColumn(testimonialsCol1, '0s')}
                 {/* Column 2 scrolls down */}
                {renderColumn(testimonialsCol2, '-20s', 'down')}
                 {/* Column 3 scrolls up (default) */}
                {renderColumn(testimonialsCol3, '-40s')}
            </div>
        </section>
    );
};

export default TestimonialsComponent;
