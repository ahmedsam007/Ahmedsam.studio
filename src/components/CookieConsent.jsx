import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  getCookieConsent, 
  setCookieConsent, 
  updateTracking, 
  checkAndResetExpiredConsent 
} from '../utils/cookieUtils'
import PrivacyPolicy from './PrivacyPolicy'

const CookieConsent = ({ language = 'en' }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isAccepted, setIsAccepted] = useState(null)

  // Translation content
  const content = {
    en: {
      title: "We use cookies",
      description: "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies.",
      acceptAll: "Accept All",
      rejectAll: "Reject All",
      manage: "Manage Preferences",
      learnMore: "Learn More",
      necessary: "Necessary Cookies",
      analytics: "Analytics Cookies",
      marketing: "Marketing Cookies",
      necessaryDesc: "Required for the website to function properly.",
      analyticsDesc: "Help us understand how visitors interact with our website.",
      marketingDesc: "Used to deliver relevant advertisements to you.",
      save: "Save Preferences",
      close: "Close"
    },
    ar: {
      title: "نحن نستخدم ملفات تعريف الارتباط",
      description: "نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وتقديم محتوى مخصص وتحليل حركة المرور. بالنقر على 'قبول الكل'، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
      acceptAll: "قبول الكل",
      rejectAll: "رفض الكل",
      manage: "إدارة التفضيلات",
      learnMore: "معرفة المزيد",
      necessary: "ملفات تعريف الارتباط الضرورية",
      analytics: "ملفات تعريف الارتباط التحليلية",
      marketing: "ملفات تعريف الارتباط التسويقية",
      necessaryDesc: "مطلوبة لعمل الموقع بشكل صحيح.",
      analyticsDesc: "تساعدنا في فهم كيفية تفاعل الزوار مع موقعنا.",
      marketingDesc: "تستخدم لتقديم إعلانات ذات صلة لك.",
      save: "حفظ التفضيلات",
      close: "إغلاق"
    }
  }

  const [showManageDialog, setShowManageDialog] = useState(false)
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: true,
    marketing: true
  })

  const t = content[language] || content.en

  // Check if user has already made a choice
  useEffect(() => {
    // Check if consent has expired and reset if needed
    checkAndResetExpiredConsent()
    
    const consent = getCookieConsent()
    if (consent) {
      setIsAccepted(consent.accepted)
      setPreferences(consent.preferences || preferences)
      // Update tracking based on existing consent
      updateTracking()
    } else {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    const consentData = {
      accepted: true,
      preferences: {
        necessary: true,
        analytics: true,
        marketing: true
      }
    }
    
    setCookieConsent(consentData)
    setIsAccepted(true)
    setIsVisible(false)
    
    // Enable tracking scripts
    updateTracking()
  }

  const handleRejectAll = () => {
    const consentData = {
      accepted: false,
      preferences: {
        necessary: true,
        analytics: false,
        marketing: false
      }
    }
    
    setCookieConsent(consentData)
    setIsAccepted(false)
    setIsVisible(false)
    
    // Disable non-necessary tracking
    updateTracking()
  }

  const handleSavePreferences = () => {
    const consentData = {
      accepted: true,
      preferences: preferences
    }
    
    setCookieConsent(consentData)
    setIsAccepted(true)
    setIsVisible(false)
    setShowManageDialog(false)
    
    // Enable tracking based on preferences
    updateTracking()
  }

  const togglePreference = (key) => {
    if (key === 'necessary') return // Can't disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-2xl"
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 
                id="cookie-consent-title"
                className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
              >
                {t.title}
              </h3>
              <p 
                id="cookie-consent-description"
                className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                {t.description}{' '}
                <button
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium"
                >
                  {t.learnMore}
                </button>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 lg:ml-8">
              <button
                onClick={() => setShowManageDialog(true)}
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors underline"
              >
                {t.manage}
              </button>
              
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {t.rejectAll}
              </button>
              
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors"
              >
                {t.acceptAll}
              </button>
            </div>
          </div>
        </div>

        {/* Manage Preferences Dialog */}
        <AnimatePresence>
          {showManageDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowManageDialog(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t.manage}
                  </h4>
                  <button
                    onClick={() => setShowManageDialog(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                    aria-label={t.close}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                        {t.necessary}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t.necessaryDesc}
                      </p>
                    </div>
                    <div className="ml-4 flex items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Always On</span>
                    </div>
                  </div>
                  
                  {/* Analytics Cookies */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                        {t.analytics}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t.analyticsDesc}
                      </p>
                    </div>
                    <div className="ml-4 flex items-center">
                      <button
                        onClick={() => togglePreference('analytics')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.analytics ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  
                  {/* Marketing Cookies */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                        {t.marketing}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t.marketingDesc}
                      </p>
                    </div>
                    <div className="ml-4 flex items-center">
                      <button
                        onClick={() => togglePreference('marketing')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          preferences.marketing ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            preferences.marketing ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setShowManageDialog(false)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    {t.close}
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors"
                  >
                    {t.save}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacyPolicy && (
          <PrivacyPolicy
            language={language}
            onClose={() => setShowPrivacyPolicy(false)}
          />
        )}
      </AnimatePresence>
    </AnimatePresence>
  )
}

export default CookieConsent 