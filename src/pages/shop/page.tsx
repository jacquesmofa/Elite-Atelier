import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { products } from '../../mocks/products';

export default function ShopPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [cart, setCart] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartData);
  }, []);

  // Sort products based on selected criteria
  const getSortedProducts = () => {
    let sorted = [...products];
    
    switch(sortBy) {
      case 'popularity':
        sorted.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'purchases':
        sorted.sort((a, b) => b.purchases - a.purchases);
        break;
      case 'searches':
        sorted.sort((a, b) => b.searches - a.searches);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    if (filterCategory !== 'All') {
      sorted = sorted.filter(p => p.category === filterCategory);
    }

    return sorted;
  };

  const sortedProducts = getSortedProducts();
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const addToCart = (product: any, size: string) => {
    const cartItem = {
      ...product,
      selectedSize: size,
      addedAt: Date.now()
    };
    const newCart = [...cart, cartItem];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
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

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-black text-7xl font-bold tracking-wider mb-6">
              {i18n.language === 'fr' ? 'BOUTIQUE COLLECTION' : 'SHOP COLLECTION'}
            </h1>
            <p className="text-gray-600 text-xl mb-8">
              {i18n.language === 'fr' 
                ? '50 pièces de luxe exceptionnelles' 
                : '50 Exceptional Luxury Pieces'}
            </p>
            
            {/* Cart Summary */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => navigate('/checkout')}
                className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer whitespace-nowrap"
              >
                <i className="ri-shopping-bag-3-line text-xl"></i>
                <span className="font-medium">
                  {i18n.language === 'fr' ? 'Panier' : 'Cart'} ({cart.length})
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="sticky top-24 z-40 bg-white border-b border-gray-200 py-6 px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          {/* Category Filter */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">
              {i18n.language === 'fr' ? 'Catégorie:' : 'Category:'}
            </span>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                    filterCategory === cat
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">
              {i18n.language === 'fr' ? 'Trier par:' : 'Sort by:'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium cursor-pointer focus:border-[#D4AF37] outline-none"
            >
              <option value="popularity">{i18n.language === 'fr' ? 'Plus Populaire' : 'Most Popular'}</option>
              <option value="purchases">{i18n.language === 'fr' ? 'Plus Acheté' : 'Most Purchased'}</option>
              <option value="searches">{i18n.language === 'fr' ? 'Plus Recherché' : 'Most Searched'}</option>
              <option value="rating">{i18n.language === 'fr' ? 'Mieux Noté' : 'Highest Rated'}</option>
              <option value="price-high">{i18n.language === 'fr' ? 'Prix Décroissant' : 'Price: High to Low'}</option>
              <option value="price-low">{i18n.language === 'fr' ? 'Prix Croissant' : 'Price: Low to High'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-product-shop>
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4 bg-gray-50">
                  <div className="w-full h-96">
                    <img
                      src={product.image}
                      alt={i18n.language === 'fr' ? product.nameFr : product.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Overlay with Quick Add */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => openQuickAdd(product)}
                      className="px-8 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-[#D4AF37] transition-all whitespace-nowrap cursor-pointer"
                    >
                      {t('common:products.quickAdd')}
                    </button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.rating >= 4.8 && (
                      <span className="px-3 py-1 bg-[#D4AF37] text-black text-xs font-bold rounded-full">
                        {i18n.language === 'fr' ? 'TOP NOTÉ' : 'TOP RATED'}
                      </span>
                    )}
                    {product.purchases > 200 && (
                      <span className="px-3 py-1 bg-black text-white text-xs font-bold rounded-full">
                        {i18n.language === 'fr' ? 'BEST-SELLER' : 'BESTSELLER'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-black text-lg font-bold">
                    {i18n.language === 'fr' ? product.nameFr : product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-[#D4AF37] text-xl font-bold">
                      {i18n.language === 'fr' ? '€' : '$'}{product.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1">
                      <i className="ri-star-fill text-[#D4AF37] text-sm"></i>
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {product.purchases} {i18n.language === 'fr' ? 'achats' : 'purchases'} • {product.searches} {i18n.language === 'fr' ? 'recherches' : 'searches'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

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

      <Footer />
    </div>
  );
}