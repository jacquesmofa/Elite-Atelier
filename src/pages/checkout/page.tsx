import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function CheckoutPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [cart, setCart] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  });

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartData);
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const shipping = 150;
  const total = subtotal + shipping;

  const handleStripeCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Prepare order data for Stripe
    const orderData = {
      items: cart.map(item => ({
        name: i18n.language === 'fr' ? item.nameFr : item.name,
        price: item.price,
        size: item.selectedSize,
        image: item.image
      })),
      shipping: shipping,
      total: total,
      customer: formData,
      currency: i18n.language === 'fr' ? 'eur' : 'usd'
    };

    try {
      // This will be replaced with actual Stripe integration
      // For now, simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(i18n.language === 'fr' 
        ? 'Commande passée avec succès! Merci pour votre achat.'
        : 'Order placed successfully! Thank you for your purchase.');
      
      localStorage.removeItem('cart');
      navigate('/');
    } catch (error) {
      alert(i18n.language === 'fr'
        ? 'Une erreur est survenue. Veuillez réessayer.'
        : 'An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const removeItem = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="pt-32 pb-24 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <i className="ri-shopping-bag-3-line text-8xl text-gray-300 mb-6"></i>
            <h1 className="text-black text-4xl font-bold mb-4">
              {i18n.language === 'fr' ? 'Votre panier est vide' : 'Your cart is empty'}
            </h1>
            <p className="text-gray-600 mb-8">
              {i18n.language === 'fr' 
                ? 'Découvrez notre collection de luxe' 
                : 'Discover our luxury collection'}
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="px-8 py-4 bg-black text-white rounded-full text-sm font-medium tracking-wider hover:bg-[#D4AF37] hover:text-black transition-all whitespace-nowrap cursor-pointer"
            >
              {i18n.language === 'fr' ? 'EXPLORER LA BOUTIQUE' : 'EXPLORE SHOP'}
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-32 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-black text-6xl font-bold tracking-wider mb-4">
              {t('common:checkout.title')}
            </h1>
            <p className="text-gray-600 text-lg mb-12">{t('common:checkout.subtitle')}</p>

            <form onSubmit={handleStripeCheckout}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column - Forms */}
                <div className="lg:col-span-2 space-y-12">
                  {/* Shipping Information */}
                  <div>
                    <h2 className="text-black text-2xl font-bold mb-6 flex items-center gap-3">
                      <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      {t('common:checkout.shippingInfo')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        name="firstName"
                        placeholder={t('common:checkout.firstName')}
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:border-[#D4AF37] outline-none transition-colors text-sm"
                        required
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder={t('common:checkout.lastName')}
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:border-[#D4AF37] outline-none transition-colors text-sm"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder={t('common:checkout.email')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:border-[#D4AF37] outline-none transition-colors text-sm"
                        required
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder={t('common:checkout.phone')}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:border-[#D4AF37] outline-none transition-colors text-sm"
                        required
                      />
                      <input
                        type="text"
                        name="address"
                        placeholder={t('common:checkout.address')}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:border-[#D4AF37] outline-none transition-colors md:col-span-2 text-sm"
                        required
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder={t('common:checkout.city')}
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:border-[#D4AF37] outline-none transition-colors text-sm"
                        required
                      />
                      <input
                        type="text"
                        name="country"
                        placeholder={t('common:checkout.country')}
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:border-[#D4AF37] outline-none transition-colors text-sm"
                        required
                      />
                      <input
                        type="text"
                        name="postalCode"
                        placeholder={t('common:checkout.postalCode')}
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:border-[#D4AF37] outline-none transition-colors md:col-span-2 text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Payment Information Notice */}
                  <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="ri-shield-check-line text-white text-xl"></i>
                      </div>
                      <div>
                        <h3 className="text-black text-lg font-bold mb-2">
                          {i18n.language === 'fr' ? 'Paiement Sécurisé' : 'Secure Payment'}
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed mb-4">
                          {i18n.language === 'fr'
                            ? 'Vous serez redirigé vers notre passerelle de paiement sécurisée Stripe pour finaliser votre achat. Nous acceptons toutes les cartes principales, Apple Pay et Google Pay.'
                            : 'You will be redirected to our secure Stripe payment gateway to complete your purchase. We accept all major cards, Apple Pay, and Google Pay.'}
                        </p>
                        <div className="flex items-center gap-4">
                          <i className="ri-bank-card-line text-2xl text-gray-600"></i>
                          <i className="ri-apple-line text-2xl text-gray-600"></i>
                          <i className="ri-google-line text-2xl text-gray-600"></i>
                          <i className="ri-mastercard-line text-2xl text-gray-600"></i>
                          <i className="ri-visa-line text-2xl text-gray-600"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="lg:col-span-1">
                  <div className="sticky top-32 bg-gray-50 rounded-2xl p-8">
                    <h2 className="text-black text-2xl font-bold mb-6">{t('common:checkout.orderSummary')}</h2>
                    
                    {/* Cart Items */}
                    <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                      {cart.map((item, index) => (
                        <div key={index} className="flex gap-4 pb-4 border-b border-gray-200">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0">
                            <img
                              src={item.image}
                              alt={i18n.language === 'fr' ? item.nameFr : item.name}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-black text-sm font-medium mb-1 truncate">
                              {i18n.language === 'fr' ? item.nameFr : item.name}
                            </h3>
                            <p className="text-gray-600 text-xs mb-2">
                              {i18n.language === 'fr' ? 'Taille' : 'Size'}: {item.selectedSize}
                            </p>
                            <p className="text-[#D4AF37] text-sm font-bold">
                              {i18n.language === 'fr' ? '€' : '$'}{item.price.toLocaleString()}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <i className="ri-close-line text-xl"></i>
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-gray-700">
                        <span>{t('common:checkout.subtotal')}</span>
                        <span>{i18n.language === 'fr' ? '€' : '$'}{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>{t('common:checkout.shipping')}</span>
                        <span>{i18n.language === 'fr' ? '€' : '$'}{shipping}</span>
                      </div>
                      <div className="pt-3 border-t-2 border-gray-300 flex justify-between text-black text-xl font-bold">
                        <span>{t('common:checkout.total')}</span>
                        <span className="text-[#D4AF37]">{i18n.language === 'fr' ? '€' : '$'}{total.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-4 bg-black text-white rounded-full text-sm font-medium tracking-wider hover:bg-[#D4AF37] hover:text-black transition-all whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing 
                        ? (i18n.language === 'fr' ? 'TRAITEMENT...' : 'PROCESSING...') 
                        : t('common:checkout.placeOrder')}
                    </button>

                    {/* Security Notice */}
                    <p className="text-xs text-gray-500 text-center mt-4">
                      {i18n.language === 'fr'
                        ? 'Paiement sécurisé par Stripe. Vos informations sont protégées.'
                        : 'Secure payment by Stripe. Your information is protected.'}
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}