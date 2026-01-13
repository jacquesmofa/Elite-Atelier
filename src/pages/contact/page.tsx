import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formElement = e.target as HTMLFormElement;
      const formDataToSend = new URLSearchParams();
      
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);

      const response = await fetch('https://readdy.ai/api/form/d5i6a89ia7n1eqcqut3g', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSend.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-black text-7xl font-bold tracking-wider mb-6">
              {t('common:contact.title')}
            </h1>
            <p className="text-gray-600 text-xl">{t('common:contact.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form id="contact-form" onSubmit={handleSubmit} className="space-y-6" data-readdy-form>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder={t('common:contact.name')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:border-[#D4AF37] outline-none transition-colors text-sm"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder={t('common:contact.email')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:border-[#D4AF37] outline-none transition-colors text-sm"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder={t('common:contact.subject')}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:border-[#D4AF37] outline-none transition-colors text-sm"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder={t('common:contact.message')}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    maxLength={500}
                    className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:border-[#D4AF37] outline-none transition-colors resize-none text-sm"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {formData.message.length}/500 {i18n.language === 'fr' ? 'caractères' : 'characters'}
                  </p>
                </div>
                
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                    {i18n.language === 'fr'
                      ? 'Message envoyé avec succès! Nous vous répondrons sous peu.'
                      : 'Message sent successfully! We will respond shortly.'}
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                    {i18n.language === 'fr'
                      ? 'Une erreur est survenue. Veuillez réessayer.'
                      : 'An error occurred. Please try again.'}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-black text-white rounded-full text-sm font-medium tracking-wider hover:bg-[#D4AF37] hover:text-black transition-all whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting 
                    ? (i18n.language === 'fr' ? 'ENVOI...' : 'SENDING...') 
                    : t('common:contact.send')}
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-black text-3xl font-bold mb-8">{t('common:contact.info')}</h2>
                
                <div className="space-y-8">
                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-map-pin-line text-[#D4AF37] text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-black text-lg font-bold mb-2">
                        {i18n.language === 'fr' ? 'Boutique Toronto' : 'Toronto Flagship'}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {i18n.language === 'fr' 
                          ? '100 Queen Street West, Toronto, ON M5H 2N2, Canada'
                          : '100 Queen Street West, Toronto, ON M5H 2N2, Canada'}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-phone-line text-[#D4AF37] text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-black text-lg font-bold mb-2">{t('common:contact.phone')}</h3>
                      <p className="text-gray-600 text-sm">+1 (416) 555-0100</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-mail-line text-[#D4AF37] text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-black text-lg font-bold mb-2">{t('common:contact.email')}</h3>
                      <p className="text-gray-600 text-sm">concierge@eliteatelier.com</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-time-line text-[#D4AF37] text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-black text-lg font-bold mb-2">{t('common:contact.hours')}</h3>
                      <p className="text-gray-600 text-sm">
                        {i18n.language === 'fr' 
                          ? 'Lundi - Samedi: 10:00 - 19:00'
                          : 'Monday - Saturday: 10:00 AM - 7:00 PM'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-xl h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.8267607935!2d-79.38716!3d43.65107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d68bf33a9b%3A0x15edd8c4de1c7581!2s100%20Queen%20St%20W%2C%20Toronto%2C%20ON%20M5H%202N2%2C%20Canada!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}