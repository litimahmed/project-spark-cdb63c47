import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Wine, ArrowRight, ChefHat, Salad, UtensilsCrossed, Cake } from "lucide-react";
import { menuItems, wineItems, type MenuCategory, type ExtendedMenuItem, type WineItem } from "@/data/menuData";
import { MenuBadges } from "@/components/ui/menu-badge";
import PageHeader from "@/components/shared/PageHeader";

// Menu categories with icons
const categories = [
  { id: "entrees" as const, label: "Entrées", icon: Salad },
  { id: "plats" as const, label: "Plats", icon: UtensilsCrossed },
  { id: "desserts" as const, label: "Desserts", icon: Cake },
  { id: "vins" as const, label: "Vins", icon: Wine },
];

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("entrees");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  const isWineCategory = activeCategory === "vins";
  const currentItems = isWineCategory ? wineItems : menuItems[activeCategory as Exclude<MenuCategory, 'vins'>];

  return (
    <div className="min-h-screen">
      <PageHeader />

      {/* Hero Section - Dark */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end justify-center overflow-hidden bg-charcoal pb-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/30 to-charcoal" />
        
        {/* Decorative Elements */}
        <div className="absolute top-32 left-10 w-32 h-32 border border-gold/20 rotate-45 hidden md:block" />
        <div className="absolute bottom-24 right-16 w-24 h-24 border border-gold/30 rotate-12 hidden md:block" />
        
        {/* Hero Content */}
        <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="w-2 h-2 bg-gold rounded-full" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
          
          <h1 className="font-luxury text-5xl md:text-7xl tracking-wide text-offwhite mb-4 italic drop-shadow-lg">
            Notre Carte
          </h1>
          
          <p className="font-sans text-sm md:text-base text-offwhite/80 tracking-[0.3em] uppercase drop-shadow-md">
            Une Symphonie Culinaire
          </p>
        </div>
      </section>

      {/* Category Navigation - Creative Pill Design */}
      <section className="bg-[#FAF8F5] py-6 sticky top-16 z-40 border-b border-charcoal/10">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <div className="inline-flex items-center bg-charcoal/5 rounded-2xl p-1.5 gap-1">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`relative flex items-center gap-2 font-sans text-xs tracking-[0.1em] uppercase py-3 px-5 md:px-6 rounded-xl transition-all duration-300 whitespace-nowrap ${
                      activeCategory === category.id
                        ? 'text-charcoal bg-white shadow-md shadow-charcoal/10'
                        : 'text-charcoal/50 hover:text-charcoal'
                    }`}
                  >
                    <Icon size={16} className={`transition-colors duration-300 ${activeCategory === category.id ? 'text-gold' : ''}`} />
                    <span className="hidden sm:inline">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items - Light Section */}
      <section className="bg-[#FAF8F5] py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold mb-4">
              {activeCategory === "entrees" && "Commencez Votre Voyage"}
              {activeCategory === "plats" && "Le Cœur du Repas"}
              {activeCategory === "desserts" && "Finales Sucrées"}
              {activeCategory === "vins" && "Sélection du Sommelier"}
            </p>
            <h2 className="font-luxury text-4xl md:text-5xl text-charcoal italic">
              {categories.find(c => c.id === activeCategory)?.label}
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
          </div>

          {isWineCategory ? (
            /* Wine Grid - Elegant cards on light bg */
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {(currentItems as WineItem[]).map((wine, index) => (
                <Link
                  key={wine.slug}
                  to={`/menu/vins/${wine.slug}`}
                  className={`group relative bg-white rounded-2xl overflow-hidden border border-charcoal/10 hover:border-gold/40 transition-all duration-500 hover:shadow-xl hover:shadow-charcoal/10 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 flex items-center justify-center bg-burgundy/10 border border-burgundy/30 rounded-full group-hover:border-burgundy group-hover:bg-burgundy/20 transition-all">
                          <Wine size={24} className="text-burgundy/80 group-hover:text-burgundy transition-colors" />
                        </div>
                        <div>
                          <h3 className="font-luxury text-xl text-charcoal group-hover:text-burgundy transition-colors italic">
                            {wine.name}
                          </h3>
                          <p className="font-sans text-xs tracking-[0.1em] uppercase text-charcoal/50 mt-1">
                            {wine.region} {wine.year && `· ${wine.year}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-luxury text-2xl text-gold italic">{wine.price}€</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-sans text-sm text-charcoal/60 leading-relaxed mb-4">
                      {wine.description}
                    </p>

                    {/* Tasting notes */}
                    {wine.notes && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {wine.notes.slice(0, 3).map((note) => (
                          <span key={note} className="px-3 py-1 bg-charcoal/5 rounded-full text-xs text-charcoal/60">
                            {note}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* See Details */}
                    <div className="flex items-center gap-2 text-gold opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="font-sans text-xs tracking-[0.1em] uppercase">Voir les détails</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-burgundy/0 via-burgundy to-burgundy/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </Link>
              ))}
            </div>
          ) : (
            /* Food Grid - Cards with images on light bg */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(currentItems as ExtendedMenuItem[]).map((item, index) => (
                <Link
                  key={item.slug}
                  to={`/menu/${activeCategory}/${item.slug}`}
                  className={`group relative bg-white rounded-2xl overflow-hidden border border-charcoal/10 hover:border-gold/40 transition-all duration-500 hover:shadow-2xl hover:shadow-charcoal/10 hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image || `https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop`}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4">
                      <MenuBadges badges={item.badges} size="sm" />
                    </div>

                    {/* Price */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full border border-charcoal/10">
                      <span className="font-luxury text-xl text-gold italic">{item.price}€</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-luxury text-xl text-charcoal group-hover:text-gold transition-colors duration-300 mb-2 italic">
                      {item.name}
                    </h3>
                    <p className="font-sans text-sm text-charcoal/60 leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Chef note preview */}
                    {item.chefNote && (
                      <div className="flex items-start gap-2 mb-4 p-3 bg-gold/5 rounded-lg">
                        <ChefHat size={14} className="text-gold mt-0.5 flex-shrink-0" />
                        <p className="font-serif text-xs text-charcoal/60 italic line-clamp-2">
                          {item.chefNote}
                        </p>
                      </div>
                    )}

                    {/* See Details */}
                    <div className="flex items-center justify-between pt-4 border-t border-charcoal/10">
                      {item.pairing && (
                        <div className="flex items-center gap-2">
                          <Wine size={14} className="text-burgundy" />
                          <span className="font-sans text-xs text-charcoal/50">{item.pairing}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gold opacity-0 group-hover:opacity-100 transition-all duration-500 ml-auto">
                        <span className="font-sans text-xs tracking-[0.1em] uppercase">Détails</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Dark */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop')" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-charcoal/85" />
        
        {/* Background glow effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/[0.05] rounded-full blur-[150px]" />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-24 h-24 border border-gold/10 rotate-45 hidden lg:block" />
        <div className="absolute bottom-10 right-10 w-20 h-20 border border-gold/15 -rotate-12 hidden lg:block" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Decorative frame */}
            <div className="relative py-12">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold" />
                <div className="w-2 h-2 bg-gold rounded-full" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold" />
              </div>

              <h2 className="font-luxury text-3xl md:text-4xl text-offwhite italic mb-4">
                Prêt à Vivre l'Expérience ?
              </h2>
              <p className="font-sans text-offwhite/50 mb-10 max-w-md mx-auto">
                Réservez votre table et laissez-nous créer une soirée inoubliable pour vous.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/reservations"
                  onClick={() => window.scrollTo(0, 0)}
                  className="px-10 py-4 bg-gold text-charcoal font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold/90 transition-all shadow-lg shadow-gold/30"
                >
                  Réserver une Table
                </Link>
                <Link
                  to="/"
                  className="px-10 py-4 bg-transparent text-offwhite font-sans text-xs tracking-[0.2em] uppercase border border-offwhite/30 hover:border-gold hover:text-gold transition-all"
                >
                  Retour à l'Accueil
                </Link>
              </div>

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal border-t border-offwhite/10 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="font-sans text-sm text-offwhite/40 tracking-wider">
            © {new Date().getFullYear()} Le Sept. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MenuPage;
