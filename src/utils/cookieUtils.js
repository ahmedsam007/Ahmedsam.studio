// Cookie utility functions for managing user consent and preferences

export const COOKIE_CONSENT_KEY = 'cookieConsent';

/**
 * Get current cookie consent data
 * @returns {Object|null} Consent data or null if not set
 */
export const getCookieConsent = () => {
  try {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    return consent ? JSON.parse(consent) : null;
  } catch (error) {
    console.error('Error reading cookie consent:', error);
    return null;
  }
};

/**
 * Set cookie consent data
 * @param {Object} consentData - The consent data to store
 */
export const setCookieConsent = (consentData) => {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      ...consentData,
      timestamp: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error setting cookie consent:', error);
  }
};

/**
 * Clear cookie consent data
 */
export const clearCookieConsent = () => {
  try {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
  } catch (error) {
    console.error('Error clearing cookie consent:', error);
  }
};

/**
 * Check if user has consented to a specific cookie type
 * @param {string} cookieType - The type of cookie to check ('analytics', 'marketing', 'necessary')
 * @returns {boolean} Whether the user has consented
 */
export const hasConsentedTo = (cookieType) => {
  const consent = getCookieConsent();
  if (!consent) return false;
  
  // Necessary cookies are always allowed
  if (cookieType === 'necessary') return true;
  
  return consent.preferences && consent.preferences[cookieType] === true;
};

/**
 * Check if user has made any consent decision
 * @returns {boolean} Whether the user has made a decision
 */
export const hasConsentDecision = () => {
  const consent = getCookieConsent();
  return consent !== null;
};

/**
 * Initialize Google Analytics if consent is given
 */
export const initializeGoogleAnalytics = () => {
  if (!hasConsentedTo('analytics')) return;
  
  // Initialize Google Analytics
  const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 tracking ID
  
  // Create script element
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}', {
      anonymize_ip: true,
      cookie_flags: 'SameSite=Strict;Secure'
    });
  `;
  
  document.head.appendChild(script1);
  document.head.appendChild(script2);
};

/**
 * Initialize marketing pixels if consent is given
 */
export const initializeMarketingPixels = () => {
  if (!hasConsentedTo('marketing')) return;
  
  // Initialize Facebook Pixel, Google Ads, etc.
  console.log('Marketing pixels initialized');
};

/**
 * Remove tracking scripts and cookies
 */
export const removeTrackingScripts = () => {
  // Remove Google Analytics cookies
  const cookiesToRemove = ['_ga', '_ga_', '_gid', '_gat'];
  cookiesToRemove.forEach(cookie => {
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
  
  // Remove tracking scripts
  const scripts = document.querySelectorAll('script[src*="googletagmanager"], script[src*="google-analytics"]');
  scripts.forEach(script => script.remove());
};

/**
 * Update tracking based on current consent
 */
export const updateTracking = () => {
  const consent = getCookieConsent();
  if (!consent) return;
  
  if (consent.preferences.analytics) {
    initializeGoogleAnalytics();
  } else {
    // Remove analytics tracking
    removeTrackingScripts();
  }
  
  if (consent.preferences.marketing) {
    initializeMarketingPixels();
  }
};

/**
 * Check if consent is expired (older than 1 year)
 * @returns {boolean} Whether consent has expired
 */
export const isConsentExpired = () => {
  const consent = getCookieConsent();
  if (!consent || !consent.timestamp) return true;
  
  const consentDate = new Date(consent.timestamp);
  const now = new Date();
  const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  
  return consentDate < oneYearAgo;
};

/**
 * Reset consent if expired
 */
export const checkAndResetExpiredConsent = () => {
  if (isConsentExpired()) {
    clearCookieConsent();
    removeTrackingScripts();
  }
}; 