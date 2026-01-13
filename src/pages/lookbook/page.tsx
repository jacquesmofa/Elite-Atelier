import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function LookbookPage() {
  const { t, i18n } = useTranslation();

  const looks = [
    {
      id: 1,
      title: i18n.language === 'fr' ? 'Élégance Parisienne' : 'Parisian Elegance',
      image: 'https://readdy.ai/api/search-image?query=elegant%20fashion%20model%20in%20luxury%20black%20evening%20ensemble%20full%20body%20shot%20on%20simple%20cream%20background%20high-end%20fashion%20photography%20sophisticated%20pose%20haute%20couture%20professional%20editorial%20style%20premium%20quality&width=800&height=1200&seq=lookbook1&orientation=portrait',
      items: ['Silk Evening Gown', 'Leather Clutch', 'Gold Heels']
    },
    {
      id: 2,
      title: i18n.language === 'fr' ? 'Sophistication Moderne' : 'Modern Sophistication',
      image: 'https://readdy.ai/api/search-image?query=fashion%20model%20in%20elegant%20white%20cashmere%20blazer%20and%20tailored%20pants%20full%20body%20shot%20on%20simple%20background%20high-end%20fashion%20photography%20sophisticated%20pose%20haute%20couture%20professional%20editorial%20style%20premium%20quality&width=800&height=1200&seq=lookbook2&orientation=portrait',
      items: ['Cashmere Blazer', 'Silk Palazzo Pants', 'Minimalist Jewelry']
    },
    {
      id: 3,
      title: i18n.language === 'fr' ? 'Luxe Décontracté' : 'Casual Luxury',
      image: 'https://readdy.ai/api/search-image?query=fashion%20model%20in%20elegant%20beige%20leather%20trench%20coat%20full%20body%20shot%20on%20simple%20background%20high-end%20fashion%20photography%20sophisticated%20pose%20haute%20couture%20professional%20editorial%20style%20premium%20quality&width=800&height=1200&seq=lookbook3&orientation=portrait',
      items: ['Leather Trench Coat', 'Pleated Midi Skirt', 'Designer Bag']
    },
    {
      id: 4,
      title: i18n.language === 'fr' ? 'Glamour de Soirée' : 'Evening Glamour',
      image: 'https://readdy.ai/api/search-image?query=fashion%20model%20in%20elegant%20gold%20embellished%20cocktail%20dress%20full%20body%20shot%20on%20simple%20background%20high-end%20fashion%20photography%20sophisticated%20pose%20haute%20couture%20professional%20editorial%20style%20premium%20quality&width=800&height=1200&seq=lookbook4&orientation=portrait',
      items: ['Embellished Cocktail Dress', 'Statement Earrings', 'Satin Heels']
    },
    {
      id: 5,
      title: i18n.language === 'fr' ? 'Minimalisme Chic' : 'Chic Minimalism',
      image: 'https://readdy.ai/api/search-image?query=fashion%20model%20in%20elegant%20structured%20shoulder%20dress%20full%20body%20shot%20on%20simple%20background%20high-end%20fashion%20photography%20sophisticated%20pose%20haute%20couture%20professional%20editorial%20style%20premium%20quality&width=800&height=1200&seq=lookbook5&orientation=portrait',
      items: ['Structured Shoulder Dress', 'Leather Belt', 'Classic Pumps']
    },
    {
      id: 6,
      title: i18n.language === 'fr' ? 'Raffinement Urbain' : 'Urban Refinement',
      image: 'https://readdy.ai/api/search-image?query=fashion%20model%20in%20elegant%20wool%20pencil%20skirt%20and%20silk%20blouse%20full%20body%20shot%20on%20simple%20background%20high-end%20fashion%20photography%20sophisticated%20pose%20haute%20couture%20professional%20editorial%20style%20premium%20quality&width=800&height=1200&seq=lookbook6&orientation=portrait',
      items: ['Wool Pencil Skirt', 'Silk Blouse', 'Designer Handbag']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=luxury%20fashion%20runway%20show%20models%20walking%20on%20elegant%20catwalk%20dramatic%20lighting%20sophisticated%20atmosphere%20high-end%20fashion%20photography%20professional%20editorial%20style%20premium%20quality&width=1920&height=1080&seq=lookbookhero&orientation=landscape"
            alt="Lookbook Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-[#D4AF37] text-sm tracking-[0.3em] mb-6">
              {t('common:lookbook.season')}
            </p>
            <h1 className="text-white text-7xl md:text-9xl font-bold tracking-[0.15em] leading-tight mb-8">
              LOOKBOOK
            </h1>
            <p className="text-white/90 text-xl font-light tracking-wide max-w-2xl mx-auto">
              {t('common:lookbook.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lookbook Grid */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {looks.map((look, index) => (
              <motion.div
                key={look.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[2/3] rounded-3xl overflow-hidden mb-6 shadow-xl">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Shop the Look Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button className="px-8 py-3 bg-white text-black rounded-full text-sm font-medium tracking-wider hover:bg-[#D4AF37] hover:text-white transition-all whitespace-nowrap">
                      {i18n.language === 'fr' ? 'ACHETER LE LOOK' : 'SHOP THE LOOK'}
                    </button>
                  </div>
                </div>

                <h3 className="text-black text-2xl font-bold mb-4">{look.title}</h3>
                <ul className="space-y-2">
                  {look.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-600 text-sm">
                      <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white text-5xl md:text-6xl font-bold mb-8">
              {i18n.language === 'fr' ? 'Prêt à Créer Votre Look?' : 'Ready to Create Your Look?'}
            </h2>
            <p className="text-white/80 text-lg mb-12">
              {i18n.language === 'fr' 
                ? 'Explorez notre collection complète et trouvez votre style signature'
                : 'Explore our full collection and find your signature style'}
            </p>
            <a
              href="/shop"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#D4AF37] text-black rounded-full text-sm font-medium tracking-wider hover:bg-[#F4CF67] transition-all whitespace-nowrap cursor-pointer"
            >
              {i18n.language === 'fr' ? 'EXPLORER LA BOUTIQUE' : 'EXPLORE SHOP'}
              <i className="ri-arrow-right-line text-lg"></i>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}