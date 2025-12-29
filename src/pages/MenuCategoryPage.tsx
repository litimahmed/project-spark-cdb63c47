import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChefHat, Wine, Clock, ArrowRight, UtensilsCrossed, Sparkles } from 'lucide-react';
import { 
  categoryData, 
  menuItems, 
  wineItems, 
  type MenuCategory, 
  type ExtendedMenuItem, 
  type WineItem 
} from '@/data/menuData';
import { MenuBadges } from '@/components/ui/menu-badge';
import { FloatingNav } from '@/components/shared/NavButtons';

const MenuCategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [category]);

  const currentCategory = category as MenuCategory;
  const categoryInfo = categoryData[currentCategory];
  
  if (!categoryInfo) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-luxury text-4xl text-gold italic mb-4">Catégorie non trouvée</h1>
          <Link to="/#menu" className="text-offwhite/70 hover:text-gold transition-colors">
            Retour au menu
          </Link>
        </div>
      </div>
    );
  }

  const isWine = currentCategory === 'vins';
  const items = isWine ? wineItems : menuItems[currentCategory];

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Floating Navigation */}
      <FloatingNav backTo="/#menu" backLabel="Retour" />

      {/* Cinematic Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${categoryInfo.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/60 to-charcoal" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 via-transparent to-charcoal/50" />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-10 w-32 h-32 border border-gold/20 rotate-45 hidden lg:block" />
          <div className="absolute bottom-1/4 right-10 w-24 h-24 border border-gold/15 -rotate-12 hidden lg:block" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gold/40 rounded-full" />
          <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-gold/30 rounded-full" />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className={`text-center px-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <p className="font-sans text-xs tracking-[0.5em] uppercase text-gold/80 mb-6">
              {categoryInfo.subtitle}
            </p>
            <h1 className="font-luxury text-5xl md:text-7xl lg:text-8xl text-offwhite mb-8 italic">
              {categoryInfo.title}
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-gold/60" />
              <div className="w-3 h-3 rotate-45 border border-gold/60" />
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-gold/60" />
            </div>
            <p className="font-sans text-sm md:text-base text-offwhite/60 max-w-xl mx-auto leading-relaxed">
              {categoryInfo.description}
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border border-gold/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Menu Items Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-[#0d0d0d] to-charcoal" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-burgundy/[0.02] rounded-full blur-[120px]" />
        
        {/* Decorative lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
          <div className="absolute bottom-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {isWine ? (
            /* Wine Grid */
            <div className="grid md:grid-cols-2 gap-8">
              {(items as WineItem[]).map((wine, index) => (
                <Link
                  key={wine.name}
                  to={`/menu/${currentCategory}/${wine.slug}`}
                  className={`group relative transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-gold/40 transition-all duration-700 p-8">
                    
                    <div className="relative">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gold/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative w-14 h-14 flex items-center justify-center bg-gold/10 border border-gold/30 rounded-full group-hover:border-gold group-hover:bg-gold/20 transition-all">
                              <Wine size={24} className="text-gold/80 group-hover:text-gold transition-colors" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-luxury text-2xl text-offwhite group-hover:text-gold transition-colors italic">
                              {wine.name}
                            </h3>
                            <p className="font-sans text-xs tracking-[0.15em] uppercase text-gold/60 mt-1">
                              {wine.region} {wine.year && `· ${wine.year}`}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-luxury text-3xl text-gold italic">{wine.price}€</span>
                          <p className="font-sans text-xs text-offwhite/40 mt-1">la bouteille</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="font-sans text-sm text-offwhite/50 leading-relaxed mb-6">
                        {wine.description}
                      </p>

                      {/* Grapes */}
                      {wine.grapes && (
                        <div className="mb-4">
                          <p className="font-sans text-xs tracking-[0.1em] uppercase text-gold/60 mb-2">Cépages</p>
                          <p className="font-sans text-sm text-offwhite/70">{wine.grapes}</p>
                        </div>
                      )}

                      {/* Tasting notes */}
                      {wine.notes && (
                        <div className="mb-4">
                          <p className="font-sans text-xs tracking-[0.1em] uppercase text-gold/60 mb-2">Notes de dégustation</p>
                          <div className="flex flex-wrap gap-2">
                            {wine.notes.map((note) => (
                              <span key={note} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-offwhite/60">
                                {note}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Pairings */}
                      {wine.pairsWith && (
                        <div className="pt-4 border-t border-white/5">
                          <p className="font-sans text-xs tracking-[0.1em] uppercase text-gold/60 mb-2">Accords parfaits</p>
                          <p className="font-sans text-sm text-offwhite/50">{wine.pairsWith.join(' · ')}</p>
                        </div>
                      )}

                      {/* See Details indicator */}
                      <div className="flex items-center justify-end gap-2 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="font-sans text-xs tracking-[0.1em] uppercase text-gold">Voir les détails</span>
                        <ArrowRight size={14} className="text-gold group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Food Grid */
            <div className="grid lg:grid-cols-2 gap-10">
              {(items as ExtendedMenuItem[]).map((item, index) => (
                <Link
                  key={item.name}
                  to={`/menu/${currentCategory}/${item.slug}`}
                  className={`group relative transition-all duration-700 block ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-gold/40 transition-all duration-700">
                    
                    {/* Image */}
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={item.image || categoryInfo.heroImage}
                        alt={`${item.name} - photo du plat`}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const img = e.currentTarget;
                          if (!img.dataset.fallback) {
                            img.dataset.fallback = '1';
                            img.src = categoryInfo.heroImage;
                          }
                        }}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4">
                        <MenuBadges badges={item.badges} size="sm" />
                      </div>

                      {/* Price badge */}
                      <div className="absolute top-4 right-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gold/40 blur-lg rounded-full" />
                          <div className="relative bg-charcoal/95 backdrop-blur-md px-5 py-2 rounded-full border border-gold/50">
                            <span className="font-luxury text-2xl text-gold italic">{item.price}€</span>
                          </div>
                        </div>
                      </div>

                      {/* Corner accents */}
                      <div className="absolute bottom-0 left-0 w-24 h-24">
                        <div className="absolute bottom-4 left-4 w-12 h-px bg-gold/0 group-hover:bg-gold/60 transition-all duration-500" />
                        <div className="absolute bottom-4 left-4 w-px h-12 bg-gold/0 group-hover:bg-gold/60 transition-all duration-500" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-24 h-24">
                        <div className="absolute bottom-4 right-4 w-12 h-px bg-gold/0 group-hover:bg-gold/60 transition-all duration-500" />
                        <div className="absolute bottom-4 right-4 w-px h-12 bg-gold/0 group-hover:bg-gold/60 transition-all duration-500" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative p-8">
                      {/* Title & Description */}
                      <h3 className="font-luxury text-2xl lg:text-3xl text-offwhite group-hover:text-gold transition-colors duration-500 mb-3 italic">
                        {item.name}
                      </h3>
                      <p className="font-sans text-sm text-offwhite/50 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Ingredients */}
                      {item.ingredients && (
                        <div className="mb-6">
                          <p className="font-sans text-xs tracking-[0.15em] uppercase text-gold/60 mb-3">Ingrédients</p>
                          <div className="flex flex-wrap gap-2">
                            {item.ingredients.map((ingredient) => (
                              <span key={ingredient} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-offwhite/60">
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Chef Note */}
                      {item.chefNote && (
                        <div className="bg-gold/5 border border-gold/20 rounded-2xl p-5 mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <ChefHat size={16} className="text-gold" />
                            <span className="font-sans text-xs tracking-[0.15em] uppercase text-gold">Note du Chef</span>
                          </div>
                          <p className="font-serif text-sm text-offwhite/70 italic leading-relaxed">
                            "{item.chefNote}"
                          </p>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-4">
                          {item.pairing && (
                            <div className="flex items-center gap-2">
                              <Wine size={14} className="text-burgundy" />
                              <span className="font-sans text-xs text-offwhite/50">
                                Accord: <span className="text-offwhite/70">{item.pairing}</span>
                              </span>
                            </div>
                          )}
                          {item.preparationTime && (
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-offwhite/40" />
                              <span className="font-sans text-xs text-offwhite/50">{item.preparationTime}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* See Details indicator */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="font-sans text-xs tracking-[0.1em] uppercase text-gold">Voir les détails</span>
                          <ArrowRight size={14} className="text-gold group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Explore Other Categories */}
      <section className="relative py-20 border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold/60 mb-3">Continuez l'exploration</p>
            <h2 className="font-luxury text-3xl md:text-4xl text-offwhite italic">Découvrir Plus</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {Object.entries(categoryData).map(([key, value]) => {
              if (key === currentCategory) return null;
              
              const getCategoryIcon = (categoryKey: string) => {
                switch (categoryKey) {
                  case 'entrees': return <UtensilsCrossed className="w-5 h-5" />;
                  case 'plats': return <UtensilsCrossed className="w-5 h-5" />;
                  case 'desserts': return <Sparkles className="w-5 h-5" />;
                  case 'vins': return <Wine className="w-5 h-5" />;
                  default: return <UtensilsCrossed className="w-5 h-5" />;
                }
              };
              
              return (
                <Link
                  key={key}
                  to={`/menu/${key}`}
                  className="group relative w-48 md:w-56 h-28 md:h-32 overflow-hidden"
                >
                  {/* Background with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 group-hover:border-gold/40 transition-all duration-500" />
                  
                  {/* Animated corner accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-transparent group-hover:border-gold/60 transition-all duration-500" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-transparent group-hover:border-gold/60 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-transparent group-hover:border-gold/60 transition-all duration-500" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-transparent group-hover:border-gold/60 transition-all duration-500" />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center gap-3">
                    <div className="text-gold/40 group-hover:text-gold transition-colors duration-500">
                      {getCategoryIcon(key)}
                    </div>
                    <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-offwhite/60 group-hover:text-offwhite transition-colors duration-500">
                      {value.title}
                    </span>
                  </div>
                  
                  {/* Bottom line animation */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-gold/0 via-gold to-gold/0 group-hover:w-3/4 transition-all duration-500" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-20 bg-gradient-to-t from-charcoal/80 to-transparent">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/50" />
            <div className="w-2 h-2 rotate-45 border border-gold/50" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/50" />
          </div>
          <p className="font-sans text-sm text-offwhite/50 mb-8 max-w-md mx-auto">
            Réservez votre table pour une expérience gastronomique inoubliable
          </p>
          <Link
            to="/reservations"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-charcoal font-sans text-sm tracking-[0.15em] uppercase rounded-full hover:bg-gold/90 transition-all duration-300 shadow-lg shadow-gold/30"
          >
            Réserver une Table
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MenuCategoryPage;