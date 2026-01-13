import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { products } from '../../mocks/products';

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');

  const addToCart = (product: any, size: string) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ ...product, selectedSize: size, addedAt: Date.now() });
    localStorage.setItem('cart', JSON.stringify(cart));
    setSelectedProduct(null);
    setSelectedSize('');
  };

  const openQuickAdd = (product: any) => {
    setSelectedProduct(product);
    setSelectedSize('');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Cinematic Video */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=cinematic%20high-fashion%20runway%20model%20in%20elegant%20black%20haute%20couture%20gown%20walking%20on%20luxury%20fashion%20show%20catwalk%20dramatic%20lighting%20sophisticated%20atmosphere%20high-end%20fashion%20photography%20professional%20model%20in%20designer%20dress%20premium%20quality%20editorial%20style&width=1920&height=1080&seq=hero1&orientation=landscape"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h1 className="text-white text-7xl md:text-[120px] font-bold tracking-[0.15em] leading-tight mb-4">
              {t('common:hero.title1')}
            </h1>
            <h1 className="text-[#D4AF37] text-7xl md:text-[120px] font-bold tracking-[0.15em] leading-tight mb-4 animate-shimmer">
              {t('common:hero.title2')}
            </h1>
            <h1 className="text-white text-7xl md:text-[120px] font-bold tracking-[0.15em] leading-tight mb-12">
              {t('common:hero.title3')}
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-light tracking-wide mb-16">
              {t('common:hero.subtitle')}
            </p>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Link
                to="/shop"
                className="group px-10 py-4 bg-black border-2 border-[#D4AF37] text-white rounded-full text-sm font-medium tracking-widest hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-300 flex items-center gap-3 whitespace-nowrap cursor-pointer"
              >
                {t('common:hero.exploreCta')}
                <i className="ri-arrow-right-line text-lg group-hover:translate-x-1 transition-transform"></i>
              </Link>
              <Link
                to="/member-club"
                className="group px-10 py-4 bg-transparent border-2 border-white text-[#D4AF37] rounded-full text-sm font-medium tracking-widest hover:bg-white/10 transition-all duration-300 flex items-center gap-3 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-vip-crown-line text-lg"></i>
                {t('common:hero.memberCta')}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[#D4AF37] text-xs tracking-widest">{t('common:hero.discover')}</span>
          <motion.i
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="ri-arrow-down-line text-[#D4AF37] text-2xl"
          ></motion.i>
        </motion.div>
      </section>

      {/* Trust Signals Marquee */}
      <div className="bg-black py-4 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center text-[#D4AF37] text-sm tracking-[0.1em] font-medium">
              <span className="px-8">{t('common:trust.delivery')}</span>
              <span className="text-[#D4AF37]/30">•</span>
              <span className="px-8">{t('common:trust.payment')}</span>
              <span className="text-[#D4AF37]/30">•</span>
              <span className="px-8">{t('common:trust.stylist')}</span>
              <span className="text-[#D4AF37]/30">•</span>
              <span className="px-8">{t('common:trust.benefits')}</span>
              <span className="text-[#D4AF37]/30">•</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Featured Lookbook Section */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-16 items-center">
            {/* Left Column */}
            <div className="md:col-span-2">
              <p className="text-[#D4AF37] text-sm tracking-widest mb-6">({t('common:lookbook.season')})</p>
              <h2 className="text-black text-6xl md:text-8xl font-bold leading-tight mb-10">
                {t('common:lookbook.title1')}
                <br />
                {t('common:lookbook.title2')}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-12">
                {t('common:lookbook.description')}
              </p>
              <Link
                to="/lookbook"
                className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full text-sm font-medium tracking-wider hover:bg-[#D4AF37] transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                {t('common:lookbook.viewCta')}
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>

            {/* Right Column - Staggered Images */}
            <div className="md:col-span-3 relative h-[600px]">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="absolute top-0 left-0 w-[55%] h-[70%] rounded-3xl overflow-hidden shadow-2xl z-10 cursor-pointer"
              >
                <img
                  src="https://readdy.ai/api/search-image?query=elegant%20fashion%20model%20in%20luxury%20black%20evening%20gown%20full%20body%20shot%20on%20simple%20cream%20background%20high-end%20fashion%20photography%20sophisticated%20pose%20haute%20couture%20dress%20professional%20editorial%20style%20premium%20quality&width=800&height=1000&seq=look1&orientation=portrait"
                  alt="Lookbook 1"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="absolute bottom-0 right-0 w-[50%] h-[60%] rounded-3xl overflow-hidden shadow-2xl z-20 cursor-pointer"
              >
                <img
                  src="https://readdy.ai/api/search-image?query=close-up%20luxury%20fabric%20texture%20detail%20silk%20material%20high-end%20fashion%20photography%20sophisticated%20weave%20pattern%20premium%20quality%20textile%20elegant%20draping&width=800&height=1000&seq=look2&orientation=portrait"
                  alt="Lookbook 2"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="absolute top-[20%] right-[5%] w-[20%] h-[50%] rounded-3xl overflow-hidden shadow-2xl z-30 cursor-pointer"
              >
                <img
                  src="https://readdy.ai/api/search-image?query=luxury%20fashion%20accessory%20gold%20jewelry%20detail%20on%20simple%20background%20high-end%20product%20photography%20sophisticated%20design%20premium%20quality%20elegant%20styling&width=400&height=800&seq=look3&orientation=portrait"
                  alt="Lookbook 3"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid Showcase */}
      <section className="py-24 px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <p className="text-[#D4AF37] text-xs tracking-[0.2em] mb-4">{t('common:products.label')}</p>
            <h2 className="text-white text-6xl font-bold mb-6">{t('common:products.title')}</h2>
            <div className="w-16 h-px bg-[#D4AF37] mx-auto"></div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12" data-product-shop>
            {products.slice(0, 8).map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => openQuickAdd(product)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl mb-4 bg-white">
                  <div className="w-full h-96">
                    <img
                      src={product.image}
                      alt={i18n.language === 'fr' ? product.nameFr : product.name}
                      className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                    <i className="ri-add-circle-line text-[#D4AF37] text-5xl"></i>
                    <span className="text-white text-sm tracking-wider">{t('common:products.quickAdd')}</span>
                  </div>
                  {/* Badges */}
                  {product.rating >= 4.8 && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#D4AF37] text-black text-xs font-bold rounded-full">
                        {i18n.language === 'fr' ? 'TOP NOTÉ' : 'TOP RATED'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <h3 className="text-white text-base font-medium">
                    {i18n.language === 'fr' ? product.nameFr : product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-[#D4AF37] text-lg font-bold">
                      {i18n.language === 'fr' ? '€' : '$'}{product.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1">
                      <i className="ri-star-fill text-[#D4AF37] text-sm"></i>
                      <span className="text-sm text-white/70">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-[#D4AF37] text-sm tracking-wider hover:gap-4 transition-all cursor-pointer"
            >
              {t('common:products.viewAll')}
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Add Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8" onClick={() => setSelectedProduct(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Product Image */}
              <div className="rounded-2xl overflow-hidden bg-gray-50">
                <div className="w-full h-96">
                  <img
                    src={selectedProduct.image}
                    alt={i18n.language === 'fr' ? selectedProduct.nameFr : selectedProduct.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-black text-3xl font-bold mb-4">
                    {i18n.language === 'fr' ? selectedProduct.nameFr : selectedProduct.name}
                  </h2>
                  <p className="text-[#D4AF37] text-3xl font-bold mb-6">
                    {i18n.language === 'fr' ? '€' : '$'}{selectedProduct.price.toLocaleString()}
                  </p>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      <i className="ri-star-fill text-[#D4AF37]"></i>
                      <span className="font-medium">{selectedProduct.rating}</span>
                    </div>
                    <span className="text-gray-400">|</span>
                    <span className="text-sm text-gray-600">
                      {selectedProduct.purchases} {i18n.language === 'fr' ? 'achats' : 'purchases'}
                    </span>
                  </div>

                  {/* Size Selection */}
                  <div className="mb-8">
                    <h3 className="text-black text-sm font-bold mb-3">
                      {i18n.language === 'fr' ? 'SÉLECTIONNER LA TAILLE' : 'SELECT SIZE'}
                    </h3>
                    <div className="grid grid-cols-4 gap-3">
                      {['XS', 'S', 'M', 'L'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                            selectedSize === size
                              ? 'bg-black text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => selectedSize && addToCart(selectedProduct, selectedSize)}
                  disabled={!selectedSize}
                  className={`w-full py-4 rounded-full text-sm font-medium tracking-wider transition-all whitespace-nowrap ${
                    selectedSize
                      ? 'bg-black text-white hover:bg-[#D4AF37] hover:text-black cursor-pointer'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {t('common:products.addToCart')}
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </motion.div>
        </div>
      )}

      {/* Testimonial Section */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left - Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative aspect-[3/4] rounded-[32px] overflow-hidden shadow-2xl"
            >
              <img
                src="https://readdy.ai/api/search-image?query=elegant%20sophisticated%20woman%20client%20portrait%20in%20luxury%20boutique%20setting%20neutral%20elegant%20pose%20high-end%20fashion%20photography%20professional%20style%20premium%20quality%20soft%20lighting%20refined%20atmosphere&width=800&height=1000&seq=testimonial1&orientation=portrait"
                alt="Client"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Right - Content */}
            <div>
              <p className="text-gray-500 text-sm mb-12">({t('common:testimonial.label')})</p>
              <div className="mb-10">
                <span className="text-[#D4AF37] text-8xl font-serif leading-none">"</span>
                <p className="text-gray-700 text-2xl font-serif italic leading-relaxed mt-4">
                  {t('common:testimonial.quote')}
                </p>
                <span className="text-[#D4AF37] text-8xl font-serif leading-none">"</span>
              </div>
              <div>
                <p className="text-[#D4AF37] mb-1">—</p>
                <p className="text-black text-lg font-bold">{t('common:testimonial.author')}</p>
                <p className="text-gray-500 text-sm">{t('common:testimonial.title')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Member's Club CTA */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=luxury%20fashion%20boutique%20interior%20marble%20floors%20gold%20fixtures%20elegant%20lighting%20high-end%20retail%20space%20sophisticated%20atmosphere%20premium%20quality%20architectural%20photography&width=1920&height=1080&seq=memberclub1&orientation=landscape"
            alt="Member's Club"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-white text-7xl md:text-[100px] font-bold tracking-[0.2em] mb-10">
              {t('common:memberClub.title')}
            </h2>
            <p className="text-white text-xl font-light mb-2">{t('common:memberClub.subtitle1')}</p>
            <p className="text-white text-xl font-light mb-12">{t('common:memberClub.subtitle2')}</p>
            <Link
              to="/member-club"
              className="inline-flex items-center gap-4 px-12 py-5 bg-black border-[3px] border-[#D4AF37] text-white rounded-full text-sm font-medium tracking-widest hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center">
                <i className="ri-vip-crown-fill text-white text-xl"></i>
              </div>
              {t('common:memberClub.joinCta')}
              <i className="ri-arrow-right-up-line text-lg"></i>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-8 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="text-gray-500 text-xs tracking-widest mb-4">({t('common:features.label')})</p>
            <h2 className="text-black text-7xl font-bold leading-tight">
              {t('common:features.title1')}
              <br />
              {t('common:features.title2')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/60 rounded-xl p-12"
            >
              <i className="ri-truck-line text-5xl text-black mb-8"></i>
              <h3 className="text-black text-xl font-bold mb-4">{t('common:features.delivery.title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                {t('common:features.delivery.description')}
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/60 rounded-xl p-12"
            >
              <i className="ri-shield-check-line text-5xl text-black mb-8"></i>
              <h3 className="text-black text-xl font-bold mb-4">{t('common:features.secure.title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                {t('common:features.secure.description')}
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/60 rounded-xl p-12"
            >
              <i className="ri-customer-service-2-line text-5xl text-black mb-8"></i>
              <h3 className="text-black text-xl font-bold mb-4">{t('common:features.concierge.title')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed font-light">
                {t('common:features.concierge.description')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}