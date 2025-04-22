import React from 'react';

function Story({ isRTL }) {
  return (
    <section id="story" className="section bg-gray-50 dark:bg-dark-800">
      <div className="section-content container mx-auto px-4 py-20">
        <h2 className="section-title">
          {isRTL ? 'قصتي كمصمم' : 'My Design Story'}
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src="/images/ahmed-sam.png"
              alt="Ahmed Sam Portrait"
              className="rounded-lg shadow-lg w-full max-w-md mx-auto"
            />
          </div>
          <div className="md:w-1/2 space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              {isRTL
                ? 'مرحباً! أنا أحمد سام، مصمم واجهات وتجربة مستخدم شغوف مقيم في غزة. بدأ حبي للتصميم برغبة بسيطة في جعل التكنولوجيا أسهل وأكثر متعة للجميع.'
                : 'Hello! I\'m Ahmed Sam, a passionate UI/UX designer based in Gaza. My love for design started with a simple desire: to make technology easier and more enjoyable for everyone.'
              }
            </p>
            <p>
              {isRTL
                ? 'منذ أن بدأت رحلتي، عملت مع مجموعة متنوعة من العملاء، من الشركات الناشئة إلى الشركات الكبرى، لمساعدتهم على تحويل الأفكار المعقدة إلى واجهات سهلة الاستخدام وجميلة المظهر. أؤمن بأن التصميم الرائع يكمن في تقاطع الجماليات والوظائف وسهولة الاستخدام.'
                : 'Since starting my journey, I\'ve worked with a diverse range of clients, from startups to established companies, helping them transform complex ideas into user-friendly and visually appealing interfaces. I believe great design lies at the intersection of aesthetics, functionality, and usability.'
              }
            </p>
            <p>
              {isRTL
                ? 'هدفي دائمًا هو فهم المستخدمين النهائيين وإنشاء تجارب لا تبدو جيدة فحسب، بل تشعر بالبديهية وتحل مشاكل حقيقية. أنا متحمس دائمًا لتعلم تقنيات جديدة واستكشاف أحدث اتجاهات التصميم.'
                : 'My goal is always to understand the end-users and create experiences that not only look good but feel intuitive and solve real problems. I\'m always excited to learn new technologies and explore the latest design trends.'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Story; 