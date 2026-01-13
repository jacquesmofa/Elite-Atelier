import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-wider text-[#D4AF37]">
              THE ELITE ATELIER
            </h2>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{t('common:footer.tagline1')}</p>
              <p>{t('common:footer.tagline2')}</p>
              <p className="text-[#D4AF37] font-medium">{t('common:footer.tagline3')}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wider">{t('common:footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/shop" 
                  className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm"
                >
                  {t('common:nav.shop')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/lookbook" 
                  className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm"
                >
                  {t('common:nav.lookbook')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/member-club" 
                  className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm"
                >
                  {t('common:nav.memberClub')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm"
                >
                  {t('common:nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wider">{t('common:footer.newsletter')}</h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder={t('common:footer.emailPlaceholder')}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:border-[#D4AF37] outline-none transition-colors text-sm"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#D4AF37] text-black rounded-lg text-sm font-medium hover:bg-white transition-all whitespace-nowrap cursor-pointer"
              >
                {t('common:footer.newsletter')}
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-3">{t('common:footer.privacyNote')}</p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-6 tracking-wider">{t('common:footer.followUs')}</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer"
              >
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer"
              >
                <i className="ri-pinterest-line text-xl"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer"
              >
                <i className="ri-linkedin-line text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">{t('common:footer.copyright')}</p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">
                {t('common:footer.terms')}
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">
                {t('common:footer.privacy')}
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors">
                {t('common:footer.cookies')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}