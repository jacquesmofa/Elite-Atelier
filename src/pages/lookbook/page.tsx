import { useTranslation } from 'react-i18next';
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { lookbookCollections } from '../../mocks/lookbookCollections';

export default function LookbookPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCollection, setSelectedCollection] = useState<any>(null);
  const [cartNotification, setCartNotification] = useState(false);
  const [addedItemName, setAddedItemName] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const itemsPerPage = 12;

  // Hero media rotation - Video first, then images
  const heroMedia = [
    { type: 'video', src: 'https://www.pexels.com/download/video/9510020/', duration: 10000 },
    { type: 'image', src: 'https://readdy.ai/api/search-image?query=elegant%20fashion%20model%20in%20luxury%20black%20evening%20gown%20haute%20couture%20full%20body%20shot%20dramatic%20lighting%20sophisticated%20pose%20high-end%20designer%20dress%20professional%20editorial%20style%20premium%20quality%20simple%20background&width=1920&height=1080&seq=lookbook-hero-img1&orientation=landscape', duration: 5000 },
    { type: 'image', src: 'https://readdy.ai/api/search-image?query=stunning%20fashion%20model%20in%20sophisticated%20white%20luxury%20dress%20haute%20couture%20elegant%20pose%20dramatic%20lighting%20high-end%20fashion%20photography%20professional%20editorial%20style%20premium%20quality%20simple%20background&width=1920&height=1080&seq=lookbook-hero-img2&orientation=landscape', duration: 5000 },
    { type: 'image', src: 'https://readdy.ai/api/search-image?query=beautiful%20model%20in%20elegant%20gold%20evening%20gown%20luxury%20fashion%20photography%20dramatic%20lighting%20sophisticated%20atmosphere%20haute%20couture%20dress%20professional%20editorial%20style%20premium%20quality%20simple%20background&width=1920&height=1080&seq=lookbook-hero-img3&orientation=landscape', duration: 5000 },
    { type: 'image', src: 'https://readdy.ai/api/search-image?query=fashion%20model%20in%20luxury%20designer%20outfit%20haute%20couture%20sophisticated%20pose%20dramatic%20lighting%20high-end%20fashion%20photography%20professional%20editorial%20style%20premium%20quality%20simple%20background&width=1920&height=1080&seq=lookbook-hero-img4&orientation=landscape', duration: 5000 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % heroMedia.length);
    }, heroMedia[currentMediaIndex].duration);

    return () => clearInterval(timer);
  }, [currentMediaIndex]);

  const categories = ['All', ...Array.from(new Set(lookbookCollections.map(item => item.category)))];

  // Filter and search
  const filteredItems = useMemo(() => {
    let filtered = [...lookbookCollections];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.titleFr.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.season.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const openCollection = (collection: any) => {
    setSelectedCollection(collection);
    document.body.style.overflow = 'hidden';
  };

  const closeCollection = () => {
    setSelectedCollection(null);
    document.body.style.overflow = 'auto';
  };

  const addToCart = (item: any) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ ...item, addedAt: Date.now() });
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show success notification
    setAddedItemName(i18n.language === 'fr' ? item.nameFr : item.name);
    setCartNotification(true);
    setTimeout(() => setCartNotification(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Cart Notification */}
      <AnimatePresence>
        {cartNotification && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-32 left-1/2 -translate-x-1/2 z-[60] bg-[#D4AF37] text-black px-8 py-4 rounded-full shadow-2xl flex items-center gap-3"
          >
            <i className="ri-checkbox-circle-fill text-2xl"></i>
            <div>
              <p className="font-bold text-sm">
                {i18n.language === 'fr' ? 'Ajouté au panier!' : 'Added to cart!'}
              </p>
              <p className="text-xs opacity-80">{addedItemName}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Video & Image Rotation */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          {heroMedia.map((media, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentMediaIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {media.type === 'video' ? (
                <video
                  src={media.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={media.src}
                  alt={`Hero ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#D4AF37] text-sm tracking-[0.3em] mb-6">
              {i18n.language === 'fr' ? 'COLLECTIONS EXCLUSIVES' : 'EXCLUSIVE COLLECTIONS'}
            </p>
            <h1 className="text-white text-7xl md:text-[100px] font-bold tracking-wider mb-6">
              {i18n.language === 'fr' ? 'LOOKBOOK' : 'LOOKBOOK'}
            </h1>
            <p className="text-white/80 text-xl font-light max-w-2xl mx-auto mb-12">
              {i18n.language === 'fr'
                ? 'Découvrez nos collections saisonnières et trouvez l\'inspiration pour votre prochain événement'
                : 'Explore our seasonal collections and find inspiration for your next event'}
            </p>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-8 py-4 bg-white text-black rounded-full text-sm font-medium hover:bg-[#D4AF37] transition-all cursor-pointer whitespace-nowrap"
            >
              <i className="ri-filter-3-line mr-2"></i>
              {i18n.language === 'fr' ? 'Filtres & Recherche' : 'Filters & Search'}
            </button>
          </motion.div>
        </div>

        {/* Media Progress Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
          {heroMedia.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentMediaIndex(index)}
              className={`h-1 rounded-full transition-all cursor-pointer ${
                index === currentMediaIndex
                  ? 'w-12 bg-[#D4AF37]'
                  : 'w-8 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Filters Panel - Collapsible */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 py-6 px-8 shadow-sm">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={i18n.language === 'fr' ? 'Rechercher des collections, saisons...' : 'Search collections, seasons...'}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full text-sm focus:border-[#D4AF37] outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer"
                  >
                    <i className="ri-close-line text-lg"></i>
                  </button>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="px-6 py-3 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-all whitespace-nowrap cursor-pointer"
              >
                <i className="ri-refresh-line mr-2"></i>
                {i18n.language === 'fr' ? 'Réinitialiser' : 'Clear All'}
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                {i18n.language === 'fr' ? 'Catégorie:' : 'Category:'}
              </span>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600">
              {i18n.language === 'fr'
                ? `Affichage de ${paginatedItems.length} sur ${filteredItems.length} collections`
                : `Showing ${paginatedItems.length} of ${filteredItems.length} collections`}
            </div>
          </div>
        </div>
      )}

      {/* Lookbook Grid */}
      <div className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          {paginatedItems.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {paginatedItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => openCollection(item)}
                  >
                    <div className="relative overflow-hidden rounded-2xl mb-4 bg-gray-50 shadow-lg hover:shadow-2xl transition-shadow duration-500">
                      <div className="w-full h-[500px]">
                        <img
                          src={item.image}
                          alt={i18n.language === 'fr' ? item.titleFr : item.title}
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <p className="text-sm mb-2 text-[#D4AF37]">{item.season}</p>
                          <p className="text-sm font-light mb-4 line-clamp-2">
                            {i18n.language === 'fr' ? item.descriptionFr : item.description}
                          </p>
                          <div className="flex items-center gap-2 text-[#D4AF37]">
                            <span className="text-sm font-medium">
                              {i18n.language === 'fr' ? 'Voir la collection' : 'View Collection'}
                            </span>
                            <i className="ri-arrow-right-line group-hover:translate-x-2 transition-transform"></i>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-black/80 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                          {item.category}
                        </span>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#D4AF37] text-black text-xs font-bold rounded-full shadow-lg">
                          {item.items.length} {i18n.language === 'fr' ? 'PIÈCES' : 'PIECES'}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-black text-xl font-bold mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {i18n.language === 'fr' ? item.titleFr : item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.season}</p>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-[#D4AF37] cursor-pointer'
                    }`}
                  >
                    <i className="ri-arrow-left-s-line text-xl"></i>
                  </button>

                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 7) {
                      pageNum = i + 1;
                    } else if (currentPage <= 4) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 3) {
                      pageNum = totalPages - 6 + i;
                    } else {
                      pageNum = currentPage - 3 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all cursor-pointer ${
                          currentPage === pageNum
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-[#D4AF37] cursor-pointer'
                    }`}
                  >
                    <i className="ri-arrow-right-s-line text-xl"></i>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {i18n.language === 'fr' ? 'Aucune collection trouvée' : 'No collections found'}
              </h3>
              <p className="text-gray-600 mb-6">
                {i18n.language === 'fr'
                  ? 'Essayez d\'ajuster vos filtres ou votre recherche'
                  : 'Try adjusting your filters or search query'}
              </p>
              <button
                onClick={clearFilters}
                className="px-8 py-3 bg-black text-white rounded-full hover:bg-[#D4AF37] transition-all cursor-pointer whitespace-nowrap"
              >
                {i18n.language === 'fr' ? 'Réinitialiser les filtres' : 'Clear All Filters'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Collection Detail Modal */}
      <AnimatePresence>
        {selectedCollection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 overflow-y-auto backdrop-blur-sm"
            onClick={closeCollection}
          >
            <div className="min-h-screen py-20 px-8" onClick={(e) => e.stopPropagation()}>
              <div className="max-w-7xl mx-auto">
                {/* Collection Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-16"
                >
                  <p className="text-[#D4AF37] text-sm tracking-[0.3em] mb-4">
                    {selectedCollection.season}
                  </p>
                  <h2 className="text-white text-6xl md:text-7xl font-bold mb-6 tracking-wide">
                    {i18n.language === 'fr' ? selectedCollection.titleFr : selectedCollection.title}
                  </h2>
                  <p className="text-white/70 text-lg mb-8 max-w-3xl mx-auto font-light">
                    {i18n.language === 'fr' ? selectedCollection.descriptionFr : selectedCollection.description}
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <span className="px-5 py-2 bg-white/10 text-white text-sm rounded-full backdrop-blur-md border border-white/20">
                      {selectedCollection.category}
                    </span>
                    <span className="px-5 py-2 bg-[#D4AF37] text-black text-sm font-bold rounded-full shadow-lg">
                      {selectedCollection.items.length} {i18n.language === 'fr' ? 'PIÈCES' : 'PIECES'}
                    </span>
                  </div>
                </motion.div>

                {/* Collection Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  {selectedCollection.items.map((item: any, index: number) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group"
                    >
                      <div className="relative overflow-hidden rounded-2xl mb-4 bg-white shadow-2xl">
                        <div className="w-full h-[500px]">
                          <img
                            src={item.image}
                            alt={i18n.language === 'fr' ? item.nameFr : item.name}
                            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-8 gap-4">
                          <p className="text-white/90 text-sm px-6 text-center font-light leading-relaxed">
                            {i18n.language === 'fr' ? item.descriptionFr : item.description}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(item);
                            }}
                            className="px-8 py-3 bg-[#D4AF37] text-black rounded-full text-sm font-bold hover:bg-white hover:scale-105 transition-all whitespace-nowrap cursor-pointer shadow-xl"
                          >
                            <i className="ri-shopping-bag-line mr-2"></i>
                            {i18n.language === 'fr' ? 'AJOUTER AU PANIER' : 'ADD TO CART'}
                          </button>
                        </div>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
                            <i className="ri-heart-line text-black text-lg"></i>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-white text-lg font-bold group-hover:text-[#D4AF37] transition-colors">
                          {i18n.language === 'fr' ? item.nameFr : item.name}
                        </h3>
                        <p className="text-[#D4AF37] text-xl font-bold">
                          {i18n.language === 'fr' ? '€' : '$'}{item.price.toLocaleString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Close Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <button
                    onClick={closeCollection}
                    className="px-12 py-4 bg-white text-black rounded-full text-sm font-bold hover:bg-[#D4AF37] hover:scale-105 transition-all whitespace-nowrap cursor-pointer shadow-2xl"
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    {i18n.language === 'fr' ? 'RETOUR AUX COLLECTIONS' : 'BACK TO COLLECTIONS'}
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Fixed Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              onClick={closeCollection}
              className="fixed top-8 right-8 w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:rotate-90 transition-all cursor-pointer z-50 shadow-2xl"
            >
              <i className="ri-close-line text-3xl"></i>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}