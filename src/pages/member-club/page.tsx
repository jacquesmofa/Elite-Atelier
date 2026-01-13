import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function MemberClubPage() {
  const { t, i18n } = useTranslation();

  const benefits = [
    {
      icon: 'ri-vip-crown-line',
      title: i18n.language === 'fr' ? 'Accès Exclusif' : 'Exclusive Access',
      description: i18n.language === 'fr' 
        ? 'Découvrez les collections avant leur lancement officiel'
        : 'Preview collections before official launch'
    },
    {
      icon: 'ri-user-star-line',
      title: i18n.language === 'fr' ? 'Styliste Personnel' : 'Personal Stylist',
      description: i18n.language === 'fr'
        ? 'Consultations privées avec nos experts en mode'
        : 'Private consultations with our fashion experts'
    },
    {
      icon: 'ri-calendar-event-line',
      title: i18n.language === 'fr' ? 'Événements VIP' : 'VIP Events',
      description: i18n.language === 'fr'
        ? 'Invitations aux défilés et soirées privées'
        : 'Invitations to runway shows and private events'
    },
    {
      icon: 'ri-gift-line',
      title: i18n.language === 'fr' ? 'Cadeaux Exclusifs' : 'Exclusive Gifts',
      description: i18n.language === 'fr'
        ? 'Pièces uniques et éditions limitées réservées aux membres'
        : 'Unique pieces and limited editions reserved for members'
    },
    {
      icon: 'ri-truck-line',
      title: i18n.language === 'fr' ? 'Livraison Prioritaire' : 'Priority Delivery',
      description: i18n.language === 'fr'
        ? 'Service de livraison premium gratuit dans le monde entier'
        : 'Free premium delivery service worldwide'
    },
    {
      icon: 'ri-percent-line',
      title: i18n.language === 'fr' ? 'Avantages Spéciaux' : 'Special Benefits',
      description: i18n.language === 'fr'
        ? 'Réductions exclusives et offres personnalisées'
        : 'Exclusive discounts and personalized offers'
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="relative h-screen overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=luxury%20VIP%20lounge%20interior%20elegant%20seating%20gold%20accents%20marble%20surfaces%20sophisticated%20atmosphere%20high-end%20exclusive%20club%20premium%20quality%20architectural%20photography&width=1920&height=1080&seq=memberclubhero&orientation=landscape"
              alt="Member's Club"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
          </div>
          <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mb-8 mx-auto">
                <i className="ri-vip-crown-fill text-white text-4xl"></i>
              </div>
              <h1 className="text-white text-7xl md:text-9xl font-bold tracking-[0.2em] leading-tight mb-8">
                {t('common:memberClub.title')}
              </h1>
              <p className="text-white/90 text-xl font-light tracking-wide mb-4">
                {t('common:memberClub.subtitle1')}
              </p>
              <p className="text-white/90 text-xl font-light tracking-wide mb-12">
                {t('common:memberClub.subtitle2')}
              </p>
              <button className="inline-flex items-center gap-4 px-12 py-5 bg-[#D4AF37] text-black rounded-full text-sm font-medium tracking-widest hover:bg-[#F4CF67] transition-all whitespace-nowrap cursor-pointer">
                {t('common:memberClub.joinCta')}
                <i className="ri-arrow-right-line text-lg"></i>
              </button>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-32 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <p className="text-[#D4AF37] text-sm tracking-[0.3em] mb-4">
                {i18n.language === 'fr' ? 'AVANTAGES MEMBRES' : 'MEMBER BENEFITS'}
              </p>
              <h2 className="text-black text-6xl font-bold mb-6">
                {i18n.language === 'fr' ? 'Privilèges Exclusifs' : 'Exclusive Privileges'}
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                {i18n.language === 'fr'
                  ? 'Rejoignez une communauté d\'élite et profitez d\'avantages exceptionnels conçus pour les personnalités les plus exigeantes'
                  : 'Join an elite community and enjoy exceptional benefits designed for the most discerning personalities'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className={`${benefit.icon} text-[#D4AF37] text-3xl`}></i>
                  </div>
                  <h3 className="text-black text-xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Tiers */}
        <section className="py-32 px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-white text-6xl font-bold mb-6">
                {i18n.language === 'fr' ? 'Niveaux d\'Adhésion' : 'Membership Tiers'}
              </h2>
              <p className="text-white/80 text-lg">
                {i18n.language === 'fr'
                  ? 'Choisissez le niveau qui correspond à votre style de vie'
                  : 'Choose the tier that matches your lifestyle'}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Gold Tier */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:border-[#D4AF37] transition-all"
              >
                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mb-6">
                  <i className="ri-medal-line text-white text-2xl"></i>
                </div>
                <h3 className="text-white text-2xl font-bold mb-4">
                  {i18n.language === 'fr' ? 'Or' : 'Gold'}
                </h3>
                <p className="text-[#D4AF37] text-4xl font-bold mb-6">
                  {i18n.language === 'fr' ? '€2,500' : '$2,500'}
                  <span className="text-white/60 text-base font-normal">/year</span>
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 text-white/80 text-sm">
                    <i className="ri-check-line text-[#D4AF37] text-xl mt-0.5"></i>
                    <span>{i18n.language === 'fr' ? 'Accès anticipé aux collections' : 'Early access to collections'}</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/80 text-sm">
                    <i className="ri-check-line text-[#D4AF37] text-xl mt-0.5"></i>
                    <span>{i18n.language === 'fr' ? 'Réduction de 10%' : '10% discount'}</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/80 text-sm">
                    <i className="ri-check-line text-[#D4AF37] text-xl mt-0.5"></i>
                    <span>{i18n.language === 'fr' ? 'Livraison gratuite' : 'Free shipping'}</span>
                  </li>
                </ul>
                <button className="w-full py-4 bg-white/10 text-white rounded-full text-sm font-medium tracking-wider hover:bg-white/20 transition-all whitespace-nowrap cursor-pointer">
                  {i18n.language === 'fr' ? 'REJOINDRE' : 'JOIN NOW'}
                </button>
              </motion.div>

              {/* Platinum Tier */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-[#D4AF37]/10 backdrop-blur-sm border-2 border-[#D4AF37] rounded-3xl p-10 transform scale-105"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-[#D4AF37] text-black text-xs font-bold tracking-wider rounded-full whitespace-nowrap">
                  {i18n.language === 'fr' ? 'RECOMMANDÉ' : 'RECOMMENDED'}
                </div>
                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mb-6">
                  <i className="ri-vip-diamond-line text-white text-2xl"></i>
                </div>
                <h3 className="text-white text-2xl font-bold mb-4">
                  {i18n.language === 'fr' ? 'Platine' : 'Platinum'}
                </h3>
                <p className="text-[#D4AF37] text-4xl font-bold mb-6">
                  {i18n.language === 'fr' ? '€5,000' : '$5,000'}
                  <span className="text-white/60 text-base font-normal">/year</span>
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 text-white/80 text-sm">
                    <i className="ri-check-line text-[#D4AF37] text-xl mt-0.5"></i>
                    <span>{i18n.language === 'fr' ? 'Tous les avantages Or' : 'All Gold benefits'}</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/80 text-sm">
                    <i className="ri-check-line text-[#D4AF37] text-xl mt-0.5"></i>
                    <span>{i18n.language === 'fr' ? 'Styliste personnel dédié' : 'Dedicated personal stylist'}</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/80 text-sm">
                    <i className="ri-check-line text-[#D4AF37] text-xl mt-0.5"></i>
                    <span>{i18n.language === 'fr' ? 'Réduction de 15%' : '15% discount'}</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/80 text-sm">
                    <i className="ri-check-line text-[#D4AF37] text-xl mt-0.5"></i>
                    <span>{i18n.language === 'fr' ? 'Invitations aux événements VIP' : 'VIP event invitations'}</span>
                  </li>
                </ul>
                <button className="w-full py-4 bg-[#D4AF37] text-black rounded-full text-sm font-medium tracking-wider hover:bg-[#F4CF67] transition-all whitespace-nowrap cursor-pointer">
                  {i18n.language === 'fr' ? 'REJOINDRE' : 'JOIN NOW'}
                </button>
              </motion.div>

              {/* Diamond Tier */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:border-[#D4AF37] transition-all"
              >
                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mb-6">
                  <i className="ri-vip-crown-fill text-white text-2xl"></i>
                </div>
                <h3 className="text-white text-2xl font-bold mb-4">
                  {i18n.language === 'fr' ? 'Diamant' : 'Diamond'}
                </h3>
                <p className="text-[#D4AF37] text-4xl font-bold mb-6">
                  {i18n.language === 'fr' ? '€10,000' : '$10,000'}
                  <span className="text-white/60 text-base font-normal">/year</span>
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 text-white/80 text-sm">
                    <i className="ri-check-line text-[#D4AF37] text-xl mt-0.5"></i>
                    <span>{i18n.language === 'fr' ? 'Tous les avantages Platine' : 'All Platinum benefits'}</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/80 text-sm">
                    <i className="ri-check-line text-[#D4AF37] text-xl mt-0.5"></i>
                    <span>{i18n.language === 'fr' ? 'Pièces sur mesure exclusives' : 'Exclusive bespoke pieces'}</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/80 text-sm">
                    <i className="ri-check-line text-[#D4AF37] text-xl mt-0.5"></i>
                    <span>{i18n.language === 'fr' ? 'Réduction de 20%' : '20% discount'}</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/80 text-sm">
                    <i className="ri-check-line text-[#D4AF37] text-xl mt-0.5"></i>
                    <span>{i18n.language === 'fr' ? 'Accès aux défilés privés' : 'Private runway show access'}</span>
                  </li>
                </ul>
                <button className="w-full py-4 bg-white/10 text-white rounded-full text-sm font-medium tracking-wider hover:bg-white/20 transition-all whitespace-nowrap cursor-pointer">
                  {i18n.language === 'fr' ? 'REJOINDRE' : 'JOIN NOW'}
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-black text-5xl md:text-6xl font-bold mb-8">
                {i18n.language === 'fr' ? 'Prêt à Rejoindre l\'Élite?' : 'Ready to Join the Elite?'}
              </h2>
              <p className="text-gray-600 text-lg mb-12">
                {i18n.language === 'fr'
                  ? 'Contactez notre équipe de conciergerie pour en savoir plus sur les avantages membres'
                  : 'Contact our concierge team to learn more about membership benefits'}
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-4 bg-black text-white rounded-full text-sm font-medium tracking-wider hover:bg-[#D4AF37] hover:text-black transition-all whitespace-nowrap cursor-pointer"
              >
                {i18n.language === 'fr' ? 'NOUS CONTACTER' : 'CONTACT US'}
                <i className="ri-arrow-right-line text-lg"></i>
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}