import { motion } from 'framer-motion'

const PrivacyPolicy = ({ language = 'en', onClose }) => {
  const content = {
    en: {
      title: "Privacy Policy & Cookie Usage",
      lastUpdated: "Last updated: December 2024",
      sections: {
        cookies: {
          title: "Cookie Usage",
          content: [
            "We use cookies to improve your experience on our website. Cookies are small text files that are stored on your device when you visit our website.",
            "We use the following types of cookies:",
            "• Necessary Cookies: These are essential for the website to function properly and cannot be disabled.",
            "• Analytics Cookies: These help us understand how visitors interact with our website by collecting and reporting information anonymously.",
            "• Marketing Cookies: These are used to deliver relevant advertisements and track the effectiveness of our advertising campaigns."
          ]
        },
        dataCollection: {
          title: "Data Collection",
          content: [
            "We collect information in the following ways:",
            "• Information you provide directly (contact forms, inquiries)",
            "• Information collected automatically (cookies, log files, device information)",
            "• Third-party sources (analytics providers, social media platforms)"
          ]
        },
        dataUse: {
          title: "How We Use Your Data",
          content: [
            "We use your personal data to:",
            "• Provide and improve our services",
            "• Communicate with you about our services",
            "• Analyze website usage and performance",
            "• Comply with legal obligations"
          ]
        },
        rights: {
          title: "Your Rights",
          content: [
            "You have the right to:",
            "• Access your personal data",
            "• Correct inaccurate data",
            "• Delete your data",
            "• Restrict processing",
            "• Data portability",
            "• Withdraw consent at any time"
          ]
        },
        contact: {
          title: "Contact Information",
          content: [
            "If you have any questions about this privacy policy or our cookie usage, please contact us at:",
            "Email: privacy@ahmedsam.studio",
            "We will respond to your inquiry within 30 days."
          ]
        }
      }
    },
    ar: {
      title: "سياسة الخصوصية واستخدام ملفات تعريف الارتباط",
      lastUpdated: "آخر تحديث: ديسمبر 2024",
      sections: {
        cookies: {
          title: "استخدام ملفات تعريف الارتباط",
          content: [
            "نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا الإلكتروني. ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارة موقعنا.",
            "نستخدم الأنواع التالية من ملفات تعريف الارتباط:",
            "• ملفات تعريف الارتباط الضرورية: هذه ضرورية لعمل الموقع بشكل صحيح ولا يمكن تعطيلها.",
            "• ملفات تعريف الارتباط التحليلية: تساعدنا في فهم كيفية تفاعل الزوار مع موقعنا من خلال جمع المعلومات والإبلاغ عنها بشكل مجهول.",
            "• ملفات تعريف الارتباط التسويقية: تستخدم لتقديم إعلانات ذات صلة وتتبع فعالية حملاتنا الإعلانية."
          ]
        },
        dataCollection: {
          title: "جمع البيانات",
          content: [
            "نجمع المعلومات بالطرق التالية:",
            "• المعلومات التي تقدمها مباشرة (نماذج الاتصال، الاستفسارات)",
            "• المعلومات المجمعة تلقائياً (ملفات تعريف الارتباط، ملفات السجل، معلومات الجهاز)",
            "• مصادر الطرف الثالث (مقدمي التحليلات، منصات التواصل الاجتماعي)"
          ]
        },
        dataUse: {
          title: "كيف نستخدم بياناتك",
          content: [
            "نستخدم بياناتك الشخصية لـ:",
            "• تقديم وتحسين خدماتنا",
            "• التواصل معك حول خدماتنا",
            "• تحليل استخدام الموقع والأداء",
            "• الامتثال للالتزامات القانونية"
          ]
        },
        rights: {
          title: "حقوقك",
          content: [
            "لديك الحق في:",
            "• الوصول إلى بياناتك الشخصية",
            "• تصحيح البيانات غير الدقيقة",
            "• حذف بياناتك",
            "• تقييد المعالجة",
            "• قابلية نقل البيانات",
            "• سحب الموافقة في أي وقت"
          ]
        },
        contact: {
          title: "معلومات الاتصال",
          content: [
            "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو استخدامنا لملفات تعريف الارتباط، يرجى الاتصال بنا على:",
            "البريد الإلكتروني: privacy@ahmedsam.studio",
            "سنرد على استفسارك في غضون 30 يوماً."
          ]
        }
      }
    }
  }

  const t = content[language] || content.en

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t.lastUpdated}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close privacy policy"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="space-y-6">
            {Object.entries(t.sections).map(([key, section]) => (
              <div key={key} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {section.title}
                </h3>
                <div className="space-y-3">
                  {section.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-600 dark:text-gray-300 leading-relaxed"
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors"
          >
            {language === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default PrivacyPolicy 