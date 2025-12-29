import { useState, useEffect, useRef } from 'react';
import { Clock, Phone, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Reservations = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="reservations"
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=2069&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-dental-dark/90" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Content */}
          <div
            className={`text-dental-light transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <p className="font-sans text-sm tracking-[0.2em] uppercase text-primary mb-4 font-medium">
              Prenez soin de votre sourire
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-6 font-semibold">
              Prendre <span className="text-primary">Rendez-vous</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-8 mx-auto" />
            <p className="font-sans text-dental-light/70 leading-relaxed mb-12 max-w-xl mx-auto text-lg">
              Réservez votre consultation en quelques clics. Notre équipe vous accueille 
              dans un environnement moderne et apaisant pour des soins dentaires de qualité.
            </p>

            {/* Info Cards */}
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="flex flex-col items-center gap-3 p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Clock className="text-primary" size={22} />
                </div>
                <div className="text-center">
                  <h4 className="font-heading text-lg font-semibold text-dental-light mb-1">Horaires</h4>
                  <p className="font-sans text-sm text-dental-light/60">
                    Lun - Ven: 9h - 19h
                  </p>
                  <p className="font-sans text-sm text-dental-light/60">
                    Sam: 9h - 13h
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Phone className="text-primary" size={22} />
                </div>
                <div className="text-center">
                  <h4 className="font-heading text-lg font-semibold text-dental-light mb-1">Téléphone</h4>
                  <a href="tel:+33142681234" className="font-sans text-sm text-dental-light/60 hover:text-primary transition-colors">
                    01 42 68 12 34
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <MapPin className="text-primary" size={22} />
                </div>
                <div className="text-center">
                  <h4 className="font-heading text-lg font-semibold text-dental-light mb-1">Adresse</h4>
                  <p className="font-sans text-sm text-dental-light/60">
                    123 Avenue de la Santé<br />75014 Paris
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to="/reservations"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-sans text-sm font-medium tracking-wide uppercase hover:bg-secondary transition-all duration-300 shadow-lg shadow-primary/30 rounded-full"
            >
              <span>Réserver un rendez-vous</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservations;