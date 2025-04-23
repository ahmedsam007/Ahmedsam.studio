import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Contact({ isRTL }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (isSubmitted) setIsSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || isSubmitted) return;
    if (!formData.name || !formData.email || !formData.message) {
      alert(isRTL ? 'يرجى ملء جميع الحقول.' : 'Please fill in all fields.');
      return;
    }
    setIsSubmitting(true);
    console.log('Form Data Submitted:', formData);
    await new Promise(r => setTimeout(r, 1000));
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    setIsSubmitted(true);
    setIsSubmitting(false);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="section bg-gray-50 dark:bg-dark-800">
      <div className="section-content container mx-auto px-4 py-20">
        <h2 className="section-title">
          {isRTL ? 'تواصل معي' : 'Get In Touch'}
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-xl text-gray-700 dark:text-gray-300 mb-12">
            {isRTL
              ? 'هل لديك فكرة مشروع أو ترغب فقط في الدردشة حول التصميم؟ أحب أن أسمع منك!'
              : 'Have a project idea or just want to chat about design? I\'d love to hear from you!'
            }
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="contact-label">{isRTL ? 'الاسم' : 'Name'}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="contact-input"
                placeholder={isRTL ? 'اسمك الكامل' : 'Your Full Name'}
                disabled={isSubmitting || isSubmitted}
              />
            </div>
            <div>
              <label htmlFor="email" className="contact-label">{isRTL ? 'البريد الإلكتروني' : 'Email'}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="contact-input"
                placeholder={isRTL ? 'بريدك الإلكتروني' : 'your.email@example.com'}
                disabled={isSubmitting || isSubmitted}
              />
            </div>
            <div>
              <label htmlFor="message" className="contact-label">{isRTL ? 'الرسالة' : 'Message'}</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                className="contact-input"
                placeholder={isRTL ? 'كيف يمكنني مساعدتك؟' : 'How can I help you?'}
                disabled={isSubmitting || isSubmitted}
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className={`btn btn-primary group morph-button ${isSubmitted ? 'clicked' : ''}`}
                disabled={isSubmitting || isSubmitted}
              >
                <span className="button-text">
                  {isSubmitting
                    ? (isRTL ? 'جار الإرسال...' : 'Sending...')
                    : (isRTL ? 'إرسال الرسالة' : 'Send Message')
                  }
                  {!isSubmitting && (
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className={`ml-2 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'mr-2 ml-0 group-hover:-translate-x-1' : ''}`}
                    />
                  )}
                </span>
                <span className="checkmark">
                  <i className="fas fa-check"></i> {isRTL ? 'تم الإرسال!' : 'Sent!'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact; 