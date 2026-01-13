import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);
  }, [location]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en';
    i18n.changeLanguage(newLang);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-black/30 backdrop-blur-sm'
        }`}
      >
        <div className="w-full px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="https://public.readdy.ai/ai/img_res/4c6e8350-b4e7-4af9-9f6a-2decab3eb687.png"
                alt="The Elite Atelier"
                className="h-12 w-auto"
              />
            </Link>

            {/* Center Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className={`px-6 py-2 text-sm font-medium tracking-widest transition-all duration-300 whitespace-nowrap ${
                  isActive('/')
                    ? 'text-[#D4AF37]'
                    : isScrolled
                    ? 'text-black hover:text-[#D4AF37]'
                    : 'text-white hover:text-[#D4AF37]'
                }`}
              >
                {t('common:nav.home')}
              </Link>
              <div className={`w-px h-4 ${isScrolled ? 'bg-black/20' : 'bg-white/30'}`} />
              <Link
                to="/shop"
                className={`px-6 py-2 text-sm font-medium tracking-widest transition-all duration-300 whitespace-nowrap ${
                  isActive('/shop')
                    ? 'text-[#D4AF37]'
                    : isScrolled
                    ? 'text-black hover:text-[#D4AF37]'
                    : 'text-white hover:text-[#D4AF37]'
                }`}
              >
                {t('common:nav.shop')}
              </Link>
              <div className={`w-px h-4 ${isScrolled ? 'bg-black/20' : 'bg-white/30'}`} />
              <Link
                to="/lookbook"
                className={`px-6 py-2 text-sm font-medium tracking-widest transition-all duration-300 whitespace-nowrap ${
                  isActive('/lookbook')
                    ? 'text-[#D4AF37]'
                    : isScrolled
                    ? 'text-black hover:text-[#D4AF37]'
                    : 'text-white hover:text-[#D4AF37]'
                }`}
              >
                {t('common:nav.lookbook')}
              </Link>
              <div className={`w-px h-4 ${isScrolled ? 'bg-black/20' : 'bg-white/30'}`} />
              <Link
                to="/member-club"
                className={`px-6 py-2 text-sm font-medium tracking-widest transition-all duration-300 whitespace-nowrap ${
                  isActive('/member-club')
                    ? 'text-[#D4AF37]'
                    : isScrolled
                    ? 'text-black hover:text-[#D4AF37]'
                    : 'text-white hover:text-[#D4AF37]'
                }`}
              >
                {t('common:nav.memberClub')}
              </Link>
              <div className={`w-px h-4 ${isScrolled ? 'bg-black/20' : 'bg-white/30'}`} />
              <Link
                to="/contact"
                className={`px-6 py-2 text-sm font-medium tracking-widest transition-all duration-300 whitespace-nowrap ${
                  isActive('/contact')
                    ? 'text-[#D4AF37]'
                    : isScrolled
                    ? 'text-black hover:text-[#D4AF37]'
                    : 'text-white hover:text-[#D4AF37]'
                }`}
              >
                {t('common:nav.contact')}
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 whitespace-nowrap ${
                  isScrolled
                    ? 'border-black/20 bg-white/50'
                    : 'border-white/30 bg-white/10'
                }`}
              >
                <span
                  className={`text-xs font-medium tracking-wider transition-all duration-300 ${
                    i18n.language === 'en'
                      ? 'text-[#D4AF37]'
                      : isScrolled
                      ? 'text-black/50'
                      : 'text-white/50'
                  }`}
                >
                  EN
                </span>
                <div className={`w-px h-3 ${isScrolled ? 'bg-black/20' : 'bg-white/30'}`} />
                <span
                  className={`text-xs font-medium tracking-wider transition-all duration-300 ${
                    i18n.language === 'fr'
                      ? 'text-[#D4AF37]'
                      : isScrolled
                      ? 'text-black/50'
                      : 'text-white/50'
                  }`}
                >
                  FR
                </span>
              </button>

              {/* Search Icon */}
              <button
                onClick={() => setShowSearch(true)}
                className={`w-10 h-10 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isScrolled ? 'text-black hover:text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'
                }`}
              >
                <i className="ri-search-line text-xl"></i>
              </button>

              {/* Cart Icon */}
              <Link
                to="/checkout"
                className={`relative w-10 h-10 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isScrolled ? 'text-black hover:text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'
                }`}
              >
                <i className="ri-shopping-bag-3-line text-xl"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
          >
            <button
              onClick={() => setShowSearch(false)}
              className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center text-black hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-3xl"></i>
            </button>

            <div className="w-full max-w-4xl px-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('common:search.placeholder')}
                  className="w-full text-5xl font-light text-black placeholder-black/30 bg-transparent border-b-2 border-black/20 focus:border-[#D4AF37] outline-none pb-4 transition-colors"
                  autoFocus
                />
                <i className="ri-search-line absolute right-0 bottom-4 text-4xl text-[#D4AF37]"></i>
              </div>
              <p className="mt-8 text-sm text-black/50 tracking-widest">{t('common:search.suggestions')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}